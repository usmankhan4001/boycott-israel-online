import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { 
  X, 
  Camera, 
  AlertOctagon, 
  CheckCircle, 
  Plus, 
  Barcode, 
  RotateCcw,
  Users,
  ExternalLink,
  Search,
  Upload,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { useTranslation } from '../i18n/useTranslation';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onAddToGrocery: (product: ProductItem) => void;
  onViewProof: (product: ProductItem) => void;
}

export const NoThanksScanner: React.FC<Props> = ({
  isOpen,
  onClose,
  products,
  onAddToGrocery,
  onViewProof
}) => {
  const { t, isUrdu } = useTranslation();
  const [activeTab, setActiveTab] = useState<'camera' | 'manual'>('camera');
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [availableCameras, setAvailableCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const [scanResult, setScanResult] = useState<{
    code: string;
    isBoycott: boolean;
    is729: boolean;
    product?: ProductItem;
  } | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMountedRef = useRef(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    isMountedRef.current = true;

    if (!isOpen) {
      stopScanner();
      setScanResult(null);
      setCameraError('');
      return;
    }

    if (activeTab === 'camera' && !scanResult) {
      const timer = setTimeout(() => {
        if (isMountedRef.current) {
          startScanner();
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      stopScanner();
    }

    return () => {
      isMountedRef.current = false;
      stopScanner();
    };
  }, [isOpen, activeTab, scanResult, selectedCameraIndex]);

  const initScannerEngine = () => {
    if (scannerRef.current) return scannerRef.current;

    const qrEngine = new Html5Qrcode('no-thanks-camera-view', {
      verbose: false,
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true
      },
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.CODE_93,
        Html5QrcodeSupportedFormats.ITF,
        Html5QrcodeSupportedFormats.DATA_MATRIX
      ]
    });

    scannerRef.current = qrEngine;
    return qrEngine;
  };

  const startScanner = async () => {
    try {
      setCameraError('');
      
      const targetElement = document.getElementById('no-thanks-camera-view');
      if (!targetElement) {
        return;
      }

      if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
        setCameraError(t.cameraErrorMsg);
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError(t.cameraErrorMsg);
        return;
      }

      await stopScanner();
      const qrEngine = initScannerEngine();
      setIsScanning(true);

      const scanConfig = {
        fps: 20,
        qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
          const minDim = Math.min(viewfinderWidth, viewfinderHeight);
          return {
            width: Math.max(Math.floor(minDim * 0.85), 220),
            height: Math.max(Math.floor(minDim * 0.55), 140)
          };
        }
      };

      // Try camera device enumeration
      let devices: { id: string; label: string }[] = [];
      try {
        devices = await Html5Qrcode.getCameras();
        if (devices && devices.length > 0) {
          setAvailableCameras(devices);
        }
      } catch (err) {
        console.warn('Camera enumeration error, falling back to facingMode:', err);
      }

      if (devices && devices.length > 0) {
        const targetCam = devices[selectedCameraIndex] || devices.find(d => 
          /back|rear|environment|wide|main/i.test(d.label)
        ) || devices[devices.length - 1];

        await qrEngine.start(
          targetCam.id,
          scanConfig,
          (decodedText) => handleCheckCode(decodedText),
          () => {}
        );
      } else {
        // Direct facingMode fallback
        await qrEngine.start(
          { facingMode: 'environment' },
          scanConfig,
          (decodedText) => handleCheckCode(decodedText),
          () => {}
        );
      }
    } catch (e: any) {
      console.warn('Primary camera start failed, attempting user camera fallback...', e);
      try {
        const qrEngine = initScannerEngine();
        await qrEngine.start(
          { facingMode: 'user' },
          { fps: 15 },
          (decodedText) => handleCheckCode(decodedText),
          () => {}
        );
      } catch (errFallback) {
        console.warn('All camera initialization failed:', errFallback);
        setIsScanning(false);
        setCameraError(t.cameraErrorMsg);
      }
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
      } catch (err) {
        // safe catch
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const switchCamera = () => {
    if (availableCameras.length > 1) {
      setSelectedCameraIndex(prev => (prev + 1) % availableCameras.length);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      await stopScanner();
      const qrEngine = initScannerEngine();
      const decodedText = await qrEngine.scanFile(file, true);
      handleCheckCode(decodedText);
    } catch (err) {
      alert(isUrdu ? 'تصویر سے بارکوڈ نہیں پڑھا جا سکا۔ براہ کرم دستی درج کریں۔' : 'Could not detect a clear barcode in this image. Please try another photo or enter manually.');
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCheckCode = (code: string) => {
    const clean = code.trim();
    if (!clean) return;

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch (e) {}
    }

    const is729 = clean.startsWith('729');
    
    // Check product database
    const matched = products.find(p => 
      p.name.toLowerCase().includes(clean.toLowerCase()) ||
      p.parentCompany.toLowerCase().includes(clean.toLowerCase()) ||
      (p.israelBarcode && clean.includes(p.israelBarcode)) ||
      (p.tags && p.tags.some(t => t.toLowerCase() === clean.toLowerCase()))
    );

    stopScanner();

    if (is729 || matched) {
      setScanResult({
        code: clean,
        isBoycott: true,
        is729: is729,
        product: matched
      });
    } else {
      setScanResult({
        code: clean,
        isBoycott: false,
        is729: false
      });
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setManualInput('');
  };

  if (!isOpen) return null;

  const isCelebrity = 
    scanResult?.product?.category === 'Celebrities & Endorsers' || 
    scanResult?.product?.categoryType === 'celebrity' || 
    (scanResult?.product?.id && scanResult.product.id.startsWith('celeb-'));

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in ${isUrdu ? 'font-urdu' : ''}`}>
      <div 
        className="relative w-full max-w-lg bg-[#18181B] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🇵🇸</span>
            <div>
              <h3 className="text-base font-black text-white">{t.scannerTitle}</h3>
              <p className="text-[11px] text-gray-400">{t.scannerSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => { stopScanner(); onClose(); }}
            className="p-1.5 rounded-full hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (When no active scan result) */}
        {!scanResult && (
          <div className="px-4 pt-3">
            <div className="grid grid-cols-2 p-1 rounded-xl bg-black/50 border border-white/[0.08] text-xs font-bold">
              <button
                onClick={() => setActiveTab('camera')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'camera' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{t.cameraScanner}</span>
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'manual' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Barcode className="w-3.5 h-3.5" />
                <span>{t.manualLookup}</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 space-y-4 overflow-y-auto">
          
          {/* Result View */}
          {scanResult && (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              
              {scanResult.isBoycott ? (
                /* 🚨 BOYCOTT SCREEN */
                <div className={`rounded-2xl p-6 text-white text-center space-y-4 shadow-xl ${
                  isCelebrity ? 'bg-purple-700' : 'bg-rose-600'
                }`}>
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto text-white">
                    {isCelebrity ? <Users className="w-8 h-8" /> : <AlertOctagon className="w-8 h-8 stroke-[2.5]" />}
                  </div>

                  <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      {isCelebrity ? t.complicitAlert : `${t.doNotBuy}! ${t.boycottTarget}`}
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-widest mt-0.5 opacity-90">
                      {isCelebrity ? t.complicitActionPrompt : t.financesOppression}
                    </p>
                  </div>

                  {/* Scanned product info */}
                  <div className="bg-black/35 rounded-xl p-4 text-left border border-white/20 space-y-2">
                    <div className="flex items-center gap-3">
                      {scanResult.product && (
                        <BrandLogo
                          name={scanResult.product.name}
                          domain={scanResult.product.domain}
                          logo={scanResult.product.logo}
                          size="md"
                          isBoycott={true}
                        />
                      )}
                      <div className="min-w-0">
                        <div className="font-extrabold text-base text-white truncate">
                          {scanResult.product ? scanResult.product.name : `Barcode: ${scanResult.code}`}
                        </div>
                        <div className="text-xs opacity-90 font-semibold truncate">
                          {scanResult.is729 
                            ? t.barcode729Label 
                            : isCelebrity
                              ? `${t.promotedBrands} ${scanResult.product?.endorsedBrands?.join(', ') || scanResult.product?.parentCompany}`
                              : `${t.parentCompany} ${scanResult.product?.parentCompany || 'Boycotted Conglomerate'}`}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-200 leading-relaxed pt-1">
                      {scanResult.is729
                        ? t.barcode729Desc
                        : scanResult.product?.boycottReason}
                    </p>
                  </div>

                  {/* If CELEBRITY: show demand card (NO ALTERNATIVES) */}
                  {isCelebrity ? (
                    <div className="bg-white rounded-xl p-4 text-black text-left space-y-2 shadow-md">
                      <div className="text-xs font-black text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>{t.ethicalDemands}:</span>
                      </div>
                      <p className="text-xs text-zinc-700 leading-relaxed">
                        {isUrdu 
                          ? 'اس شخصیت کے پروموٹ کردہ ایونٹس اور مصنوعات کا بائیکاٹ کریں جب تک بائیکاٹ کمپنیوں سے معاہدے ختم نہ ہوں۔' 
                          : 'Do not patronize campaigns, events, or products promoted by this figure until sponsorship deals with boycotted multinationals are terminated.'}
                      </p>
                      {scanResult.product && (
                        <button
                          onClick={() => {
                            onViewProof(scanResult.product!);
                            onClose();
                          }}
                          className="w-full mt-2 py-2.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{t.viewRecord}</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    /* If NORMAL PRODUCT: Safe local alternatives */
                    scanResult.product && scanResult.product.alternatives.length > 0 && (
                      <div className="bg-white rounded-xl p-4 text-black text-left space-y-2 shadow-md">
                        <div className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>{t.buySafeAltsPrompt}</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {scanResult.product.alternatives.slice(0, 4).map((alt, i) => (
                            <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                              {alt.name} ({alt.country})
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            onAddToGrocery(scanResult.product!);
                            onClose();
                          }}
                          className="w-full mt-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          {t.addAltToGrocery}
                        </button>
                      </div>
                    )
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={resetScan}
                      className="flex-1 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t.scanAnother}
                    </button>
                    {scanResult.product && !isCelebrity && (
                      <button
                        onClick={() => {
                          onViewProof(scanResult.product!);
                          onClose();
                        }}
                        className="py-2.5 px-3 rounded-xl bg-black/40 hover:bg-black/60 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{t.shareEvidence}</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* ✅ SAFE SCREEN */
                <div className="bg-emerald-600 rounded-2xl p-6 text-white text-center space-y-4 shadow-xl">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto text-white">
                    <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase">
                      {t.safeToBuy}
                    </h2>
                    <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mt-0.5">
                      {t.safeDesc}
                    </p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 text-xs text-gray-200 leading-relaxed text-left border border-white/20">
                    {t.noMatchFound} <strong className="text-white">"{scanResult.code}"</strong>.
                  </div>

                  <button
                    onClick={resetScan}
                    className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t.scanAnother}
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Camera View Mode */}
          <div 
            style={{ display: !scanResult && activeTab === 'camera' ? 'block' : 'none' }}
            className="space-y-3"
          >
            <div className="relative w-full min-h-[280px] bg-black rounded-2xl overflow-hidden border-2 border-dashed border-rose-500/40 flex items-center justify-center">
              {/* Isolated camera mount point — NO React children inside */}
              <div 
                id="no-thanks-camera-view" 
                className="w-full min-h-[280px]" 
                style={{ width: '100%', minHeight: '280px' }}
              />
              
              {/* Sibling overlay for loading state */}
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 pointer-events-none p-4 text-center bg-black/60 backdrop-blur-xs">
                  <div className="space-y-2">
                    <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <span>{t.accessingCamera}</span>
                  </div>
                </div>
              )}

              {/* Scanning visual laser line */}
              {isScanning && (
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.9)] pointer-events-none animate-pulse" />
              )}
            </div>

            {cameraError && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs">
                {cameraError}
              </div>
            )}

            {/* Camera Tools & Image Upload */}
            <div className="flex items-center gap-2">
              {availableCameras.length > 1 && (
                <button
                  onClick={switchCamera}
                  className="px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.switchCamera}</span>
                </button>
              )}

              <label className="flex-1 px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-rose-400" />
                <span>{isProcessingImage ? t.scanningImage : t.scanFromPhoto}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Quick Barcode / Brand input directly under camera */}
            <div className="pt-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckCode(manualInput)}
                  placeholder={isUrdu ? "بارکوڈ (729...) یا نام درج کریں" : "Or type barcode (729...) / brand name"}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-white text-xs focus:outline-none focus:border-rose-500 font-medium"
                />
                <button
                  onClick={() => handleCheckCode(manualInput)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md active:scale-95 transition-all"
                >
                  {t.check}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center font-medium">
              {t.alignBarcode}
            </p>
          </div>

          {/* Manual Input View Mode */}
          <div 
            style={{ display: !scanResult && activeTab === 'manual' ? 'block' : 'none' }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                {t.enterBarcodeOrName}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckCode(manualInput)}
                  placeholder={isUrdu ? "مثال: 72900123 یا Pepsi, KFC, Oreo..." : "e.g. 72900123 or Pepsi, KFC, Oreo..."}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-rose-500 font-medium"
                  autoFocus
                />
                <button
                  onClick={() => handleCheckCode(manualInput)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md active:scale-95 transition-all"
                >
                  {t.verify}
                </button>
              </div>
            </div>

            {/* Quick sample tests */}
            <div>
              <span className="text-[11px] text-gray-400 block mb-1.5 font-bold">{t.quickChecks}</span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { label: isUrdu ? 'اسرائیلی بارکوڈ (72900123)' : 'Israeli Barcode (72900123)', val: '72900123' },
                  { label: 'SodaStream (72901234)', val: '72901234' },
                  { label: 'McDonalds', val: "McDonald's" },
                  { label: 'KFC', val: 'KFC' },
                  { label: 'Oreo Biscuit', val: 'Oreo' },
                  { label: 'Lays Chips', val: 'Lays' }
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setManualInput(s.val);
                      handleCheckCode(s.val);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-gray-200 border border-white/[0.08] text-[11px] font-medium transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
