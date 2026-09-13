import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  X, 
  Camera, 
  Search, 
  AlertOctagon, 
  CheckCircle, 
  ArrowRight, 
  Plus, 
  Barcode, 
  Info,
  RotateCcw
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

  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      setScanResult(null);
      return;
    }

    if (activeTab === 'camera') {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen, activeTab]);

  const startScanner = async () => {
    try {
      setCameraError('');
      setIsScanning(true);
      const html5QrCode = new Html5Qrcode('no-thanks-camera-view');
      scannerRef.current = html5QrCode;

      const config = { fps: 12, qrbox: { width: 280, height: 160 } };
      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          handleCheckCode(decodedText);
          stopScanner();
        },
        () => {}
      );
    } catch (e: any) {
      console.warn('Camera failed:', e);
      setCameraError('Camera access unavailable. Please type the barcode or brand name below.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {}
    }
    setIsScanning(false);
  };

  const handleCheckCode = (code: string) => {
    const clean = code.trim();
    if (!clean) return;

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([40, 60, 40]);
    }

    const is729 = clean.startsWith('729');
    
    // Check product database
    const matched = products.find(p => 
      p.name.toLowerCase().includes(clean.toLowerCase()) ||
      p.parentCompany.toLowerCase().includes(clean.toLowerCase()) ||
      (p.israelBarcode && clean.includes(p.israelBarcode))
    );

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
    if (activeTab === 'camera') {
      startScanner();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-md bg-[#18181B] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇵🇸</span>
            <div>
              <h3 className="text-base font-black text-white">Barcode Scanner</h3>
              <p className="text-[11px] text-gray-400">729 Israel code & boycott check</p>
            </div>
          </div>
          <button
            onClick={() => { stopScanner(); onClose(); }}
            className="p-1.5 rounded-full hover:bg-white/[0.1] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        {!scanResult && (
          <div className="px-4 pt-3">
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/50 border border-white/[0.08] text-xs font-bold">
              <button
                onClick={() => setActiveTab('camera')}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'camera' ? 'bg-red-600 text-white' : 'text-gray-400'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Live Camera</span>
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'manual' ? 'bg-red-600 text-white' : 'text-gray-400'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Type Code / Name</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-4 space-y-4 overflow-y-auto">
          
          {/* Result View */}
          {scanResult ? (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              
              {scanResult.isBoycott ? (
                /* 🚨 NO THANKS! BOYCOTT SCREEN */
                <div className="bg-red-600 rounded-3xl p-6 text-white text-center space-y-4 shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto text-white">
                    <AlertOctagon className="w-10 h-10 stroke-[2.5]" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase">
                      NO THANKS!
                    </h2>
                    <p className="text-xs font-bold text-red-100 uppercase tracking-widest mt-0.5">
                      This item is on the boycott list
                    </p>
                  </div>

                  {/* Scanned product info */}
                  <div className="bg-black/30 rounded-2xl p-4 text-left border border-white/20 space-y-2">
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
                      <div>
                        <div className="font-extrabold text-base text-white">
                          {scanResult.product ? scanResult.product.name : `Barcode: ${scanResult.code}`}
                        </div>
                        <div className="text-xs text-red-200">
                          {scanResult.is729 
                            ? '🚨 Registered in Israel (GS1 729 Barcode)' 
                            : `Parent: ${scanResult.product?.parentCompany || 'Boycotted Entity'}`}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-200 leading-relaxed pt-1">
                      {scanResult.is729
                        ? 'Products with barcodes starting with 729 are manufactured in or exported directly from Israel, directly funding military operations.'
                        : scanResult.product?.boycottReason}
                    </p>
                  </div>

                  {/* Safe alternatives */}
                  {scanResult.product && scanResult.product.alternatives.length > 0 && (
                    <div className="bg-white rounded-2xl p-4 text-black text-left space-y-2 shadow-md">
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
                        className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Plus className="w-4 h-4" />
                        Add Safe Alternative to Grocery List
                      </button>
                    </div>
                  )}

                  <button
                    onClick={resetScan}
                    className="w-full py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Scan Another Product
                  </button>
                </div>
              ) : (
                /* ✅ SAFE SCREEN */
                <div className="bg-emerald-600 rounded-3xl p-6 text-white text-center space-y-4 shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto text-white">
                    <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase">
                      SAFE TO BUY!
                    </h2>
                    <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mt-0.5">
                      Not found on the boycott list
                    </p>
                  </div>

                  <div className="bg-black/30 rounded-2xl p-4 text-xs text-gray-200 leading-relaxed text-left border border-white/20">
                    No Israeli 729 barcode prefix or direct boycott match found for <strong className="text-white">"{scanResult.code}"</strong>.
                  </div>

                  <button
                    onClick={resetScan}
                    className="w-full py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Scan Another Product
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Live Camera or Manual Input */
            <div className="space-y-4">
              {activeTab === 'camera' ? (
                <div className="space-y-3">
                  <div 
                    id="no-thanks-camera-view"
                    className="w-full min-h-[280px] bg-black rounded-2xl overflow-hidden border-2 border-dashed border-red-500/40 relative flex items-center justify-center text-xs text-gray-400"
                  >
                    {!isScanning && <span>Opening camera view...</span>}
                  </div>

                  {cameraError && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                      {cameraError}
                    </div>
                  )}

                  <p className="text-[11px] text-gray-400 text-center font-medium">
                    Align barcode inside the camera frame. The app will immediately tell you if it's boycotted or safe.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
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
                        placeholder="e.g. 7290012345 or Oreo, Lays..."
                        className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-red-500 font-medium"
                      />
                      <button
                        onClick={() => handleCheckCode(manualInput)}
                        className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-md"
                      >
                        Check
                      </button>
                    </div>
                  </div>

                  {/* Sample tests */}
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1.5">Quick Test Samples:</span>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {[
                        { label: 'Israeli Date Box (72900123)', val: '72900123' },
                        { label: 'SodaStream (72901234)', val: '72901234' },
                        { label: 'Oreo Biscuit', val: 'Oreo' },
                        { label: 'Lays Chips', val: 'Lays' }
                      ].map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setManualInput(s.val);
                            handleCheckCode(s.val);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-white/[0.08] text-gray-300 border border-white/[0.06] text-[11px]"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
