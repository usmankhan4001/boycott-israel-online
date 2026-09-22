import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  X, 
  ScanLine, 
  Camera, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Info, 
  ShieldAlert,
  Plus
} from 'lucide-react';
import { ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  onAddToGrocery: (product: ProductItem) => void;
}

export const BarcodeScannerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  products,
  onAddToGrocery
}) => {
  const [activeMode, setActiveMode] = useState<'camera' | 'manual'>('camera');
  const [manualCode, setManualCode] = useState('');
  const [scanError, setScanError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    code: string;
    is729: boolean;
    product?: ProductItem;
    status: 'boycott' | 'safe' | 'unknown' | null;
  }>({ code: '', is729: false, status: null });

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    if (activeMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeMode]);

  const startCamera = async () => {
    try {
      setScanError('');
      setIsScanning(true);
      const html5QrCode = new Html5Qrcode('barcode-reader-box');
      html5QrCodeRef.current = html5QrCode;

      const config = { fps: 10, qrbox: { width: 250, height: 150 } };
      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          handleDetectedCode(decodedText);
          stopCamera();
        },
        () => {
          // ignore scan frame errors
        }
      );
    } catch (err: any) {
      console.warn('Camera scan initialization failed:', err);
      setScanError('Camera access not permitted or unavailable. Use manual code entry below.');
      setIsScanning(false);
    }
  };

  const stopCamera = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch (e) {
        // silent safe catch
      }
    }
    setIsScanning(false);
  };

  const handleDetectedCode = (code: string) => {
    const clean = code.trim();
    if (!clean) return;

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([25, 50, 25]);
    }

    const is729 = clean.startsWith('729');
    
    // Look up in database
    const matched = products.find(p => 
      p.name.toLowerCase().includes(clean.toLowerCase()) ||
      p.parentCompany.toLowerCase().includes(clean.toLowerCase()) ||
      (p.israelBarcode && clean.includes(p.israelBarcode))
    );

    if (is729) {
      setScanResult({
        code: clean,
        is729: true,
        product: matched,
        status: 'boycott'
      });
    } else if (matched) {
      setScanResult({
        code: clean,
        is729: false,
        product: matched,
        status: 'boycott'
      });
    } else {
      setScanResult({
        code: clean,
        is729: false,
        status: 'unknown'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#1C1C1E] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Modal Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/[0.08] text-white">
              <ScanLine className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">729 Barcode Scanner</h3>
              <p className="text-xs text-gray-400">GS1 Israel prefix & boycott brand detector</p>
            </div>
          </div>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="p-1.5 rounded-full hover:bg-white/[0.08] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="px-5 pt-4">
          <div className="grid grid-cols-2 p-1 rounded-xl bg-black/50 border border-white/[0.06] text-xs font-semibold">
            <button
              onClick={() => setActiveMode('camera')}
              className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeMode === 'camera' ? 'bg-[#3A3A3C] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Live Camera Scanner</span>
            </button>

            <button
              onClick={() => setActiveMode('manual')}
              className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeMode === 'manual' ? 'bg-[#3A3A3C] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Manual Entry</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          
          {activeMode === 'camera' ? (
            <div className="space-y-3">
              <div className="relative w-full min-h-[260px] bg-black rounded-2xl overflow-hidden border border-white/[0.1] flex items-center justify-center">
                {/* Isolated pure camera DOM node */}
                <div id="barcode-reader-box" className="w-full h-full" />
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 pointer-events-none p-4 text-center">
                    <span>Starting camera...</span>
                  </div>
                )}
              </div>

              {scanError && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                  {scanError}
                </div>
              )}

              <p className="text-[11px] text-gray-400 text-center">
                Point your camera at any retail barcode. The scanner will automatically detect Israeli 729 origin codes and boycotted manufacturers.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Enter Barcode Digits or Brand Name:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDetectedCode(manualCode)}
                    placeholder="e.g. 729000123456 or Brand name..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleDetectedCode(manualCode)}
                    className="ios-btn px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    Check
                  </button>
                </div>
              </div>

              {/* Quick Sample Barcodes */}
              <div>
                <span className="text-[11px] text-gray-400 block mb-1.5 font-medium">Test Barcode Samples:</span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    { label: 'Israeli Date Box (72900123)', val: '72900123' },
                    { label: 'SodaStream (72901234)', val: '72901234' },
                    { label: 'Ahava Minerals (72900456)', val: '72900456' },
                    { label: 'Oreo (Mondelez)', val: 'Oreo' }
                  ].map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setManualCode(s.val);
                        handleDetectedCode(s.val);
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

          {/* Scan Results Card */}
          {scanResult.status && (
            <div className="animate-in fade-in duration-200">
              {scanResult.status === 'boycott' && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-white space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>
                      {scanResult.is729 ? '🚨 DIRECT ISRAELI BARCODE (PREFIX 729)' : '⚠️ BOYCOTTED BRAND DETECTED'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed">
                    {scanResult.is729 
                      ? 'This barcode is officially registered in Israel (GS1 Israel). Purchasing this item directly transfers money to Israeli corporations and state taxes.' 
                      : scanResult.product?.boycottReason || 'This brand is complicit with the occupation of Palestine.'}
                  </p>

                  {scanResult.product && scanResult.product.alternatives.length > 0 && (
                    <div className="pt-2 border-t border-red-500/20">
                      <span className="text-xs font-bold text-emerald-400 block mb-1.5">
                        ✓ Verified Safe Alternatives:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {scanResult.product.alternatives.map((alt, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
                            {alt.name} ({alt.country})
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          onAddToGrocery(scanResult.product!);
                          onClose();
                        }}
                        className="ios-btn w-full mt-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        Add Safe Alternative to Grocery Plan
                      </button>
                    </div>
                  )}
                </div>
              )}

              {scanResult.status === 'unknown' && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-white space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>No Direct 729 Israel Code Match</span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    No Israeli manufacturer code (729) found. However, multinational brands (Nestle, Unilever, P&G) may produce locally with domestic barcodes. Check the brand name in the search tab.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Explanation on 729 Rule */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] text-[11px] text-gray-400 space-y-1">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              The 729 Barcode Standard:
            </span>
            <p>
              In global barcode registry GS1, prefixes 729 designate products manufactured in or exported directly from Israel.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
