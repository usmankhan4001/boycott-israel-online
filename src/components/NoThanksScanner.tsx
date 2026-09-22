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
  Sparkles
} from 'lucide-react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';

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
  const [activeTab, setActiveTab] = useState<'camera' | 'manual'>('camera');
  const [manualInput, setManualInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [scanResult, setScanResult] = useState<{
    code: string;
    isBoycott: boolean;
    is729: boolean;
    product?: ProductItem;
  } | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMountedRef = useRef(true);

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
  }, [isOpen, activeTab, scanResult]);

  const startScanner = async () => {
    try {
      setCameraError('');
      
      const targetElement = document.getElementById('no-thanks-camera-view');
      if (!targetElement) {
        return;
      }

      if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
        setCameraError('Camera scanning requires a secure HTTPS connection. Please type or paste barcode below.');
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your current browser. Please enter barcode manually.');
        return;
      }

      // Stop previous instance if any
      await stopScanner();

      const html5QrCode = new Html5Qrcode('no-thanks-camera-view', {
        verbose: false,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.QR_CODE
        ]
      });
      scannerRef.current = html5QrCode;
      setIsScanning(true);

      const qrboxConfig = (viewfinderWidth: number, viewfinderHeight: number) => {
        const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
        return {
          width: Math.max(Math.floor(minEdge * 0.85), 200),
          height: Math.max(Math.floor(minEdge * 0.5), 120)
        };
      };

      const config = { 
        fps: 15, 
        qrbox: qrboxConfig
      };

      // Try environment (back) camera first
      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          handleCheckCode(decodedText);
        },
        () => {}
      );
    } catch (e: any) {
      console.warn('Camera failed with environment facingMode, attempting fallback...', e);
      try {
        if (scannerRef.current && isMountedRef.current) {
          // Fallback to default user camera
          await scannerRef.current.start(
            { facingMode: 'user' },
            { fps: 15, qrbox: (w, h) => ({ width: Math.min(w * 0.8, 260), height: Math.min(h * 0.5, 140) }) },
            (decodedText) => {
              handleCheckCode(decodedText);
            },
            () => {}
          );
        }
      } catch (errFallback) {
        console.warn('Camera fallback failed:', errFallback);
        setIsScanning(false);
        setCameraError('Camera permission was denied or camera is in use. Please type barcode (729...) or brand name below.');
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
        // silent safe catch
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
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

    // Stop scanner safely
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#18181B] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🇵🇸</span>
            <div>
              <h3 className="text-base font-black text-white">Barcode & 729 Scanner</h3>
              <p className="text-[11px] text-gray-400">Instant camera detection or Israeli 729 prefix check</p>
            </div>
          </div>
          <button
            onClick={() => { stopScanner(); onClose(); }}
            className="p-1.5 rounded-full hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Visible when no result is active) */}
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
                <span>Camera Scanner</span>
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'manual' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Barcode className="w-3.5 h-3.5" />
                <span>Manual Lookup</span>
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
                      {isCelebrity ? 'COMPLICIT ENDORSER ALERT' : 'DO NOT BUY! BOYCOTT TARGET'}
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-widest mt-0.5 opacity-90">
                      {isCelebrity ? 'Demanded Action: Cancel brand contracts' : 'This item directly finances apartheid & oppression'}
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
                            ? '🚨 Registered in Israel (GS1 729 Barcode Prefix)' 
                            : isCelebrity
                              ? `Promotes: ${scanResult.product?.endorsedBrands?.join(', ') || scanResult.product?.parentCompany}`
                              : `Parent: ${scanResult.product?.parentCompany || 'Boycotted Conglomerate'}`}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-200 leading-relaxed pt-1">
                      {scanResult.is729
                        ? 'Barcodes starting with 729 are registered directly in Israel, channeling export proceeds to the Israeli economy.'
                        : scanResult.product?.boycottReason}
                    </p>
                  </div>

                  {/* If CELEBRITY: show demand card (NO ALTERNATIVES) */}
                  {isCelebrity ? (
                    <div className="bg-white rounded-xl p-4 text-black text-left space-y-2 shadow-md">
                      <div className="text-xs font-black text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Public Accountability Demand:</span>
                      </div>
                      <p className="text-xs text-zinc-700 leading-relaxed">
                        Do not patronize campaigns, events, or products promoted by this figure until sponsorship deals with boycotted multinationals are terminated.
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
                          <span>View Full Record & Timeline</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    /* If NORMAL PRODUCT: Safe local alternatives */
                    scanResult.product && scanResult.product.alternatives.length > 0 && (
                      <div className="bg-white rounded-xl p-4 text-black text-left space-y-2 shadow-md">
                        <div className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Buy These Safe Local Alternatives:</span>
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
                          Add Safe Alternative to Grocery List
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
                      Scan Another
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
                        <span>Evidence</span>
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
                      SAFE TO BUY!
                    </h2>
                    <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mt-0.5">
                      Not found on the boycott list
                    </p>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 text-xs text-gray-200 leading-relaxed text-left border border-white/20">
                    No Israeli 729 barcode prefix or boycotted parent conglomerate match found for <strong className="text-white">"{scanResult.code}"</strong>.
                  </div>

                  <button
                    onClick={resetScan}
                    className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Scan Another Product
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Camera View Mode (Persistently mounted in DOM to prevent React removeChild reconciliation errors) */}
          <div 
            style={{ display: !scanResult && activeTab === 'camera' ? 'block' : 'none' }}
            className="space-y-3"
          >
            <div className="relative w-full min-h-[250px] bg-black rounded-2xl overflow-hidden border-2 border-dashed border-rose-500/40 flex items-center justify-center">
              {/* Isolated camera mount point — NO React children inside */}
              <div id="no-thanks-camera-view" className="w-full h-full" />
              
              {/* Sibling overlay for loading state */}
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 pointer-events-none p-4 text-center">
                  <span>Initializing camera viewfinder...</span>
                </div>
              )}
            </div>

            {cameraError && (
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs">
                {cameraError}
              </div>
            )}

            <div className="pt-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckCode(manualInput)}
                  placeholder="Quick barcode (729...) or brand name"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-white text-xs focus:outline-none focus:border-rose-500 font-medium"
                />
                <button
                  onClick={() => handleCheckCode(manualInput)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md active:scale-95 transition-all"
                >
                  Check
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center font-medium">
              Align barcode inside frame. Barcodes with <strong>729</strong> (Israel) or matching boycotted multinationals are instantly identified.
            </p>
          </div>

          {/* Manual Input View Mode */}
          <div 
            style={{ display: !scanResult && activeTab === 'manual' ? 'block' : 'none' }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Enter Barcode (e.g. 729...) or Brand Name:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckCode(manualInput)}
                  placeholder="e.g. 72900123 or Pepsi, KFC, Oreo..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-rose-500 font-medium"
                  autoFocus
                />
                <button
                  onClick={() => handleCheckCode(manualInput)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md active:scale-95 transition-all"
                >
                  Verify
                </button>
              </div>
            </div>

            {/* Quick sample tests */}
            <div>
              <span className="text-[11px] text-gray-400 block mb-1.5 font-bold">Quick Barcode & Brand Checks:</span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { label: 'Israeli Barcode (72900123)', val: '72900123' },
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
