import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useGroceryStore } from '../../stores/groceryStore';
import { useUIStore } from '../../stores/uiStore';
import { useTranslation } from '../../i18n/useTranslation';
import { ProductItem } from '../../types';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  AlertOctagon, 
  CheckCircle2, 
  Plus, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const { products } = useProducts();
  const { addItem } = useGroceryStore();
  const { showToast } = useUIStore();
  const { isUrdu } = useTranslation();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [matchedProduct, setMatchedProduct] = useState<ProductItem | null>(null);
  const [isBoycottMatch, setIsBoycottMatch] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoAudio, setAutoAudio] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      stopListening();
      stopSpeaking();
      setTranscript('');
      setMatchedProduct(null);
      setIsBoycottMatch(null);
      setErrorMessage('');
      return;
    }

    // Auto-start listening on open for seamless elder accessibility
    startListening();

    return () => {
      stopListening();
      stopSpeaking();
    };
  }, [isOpen]);

  const handleHaptic = (pattern: number | number[] = 10) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  };

  const startListening = () => {
    setErrorMessage('');
    setTranscript('');
    setMatchedProduct(null);
    setIsBoycottMatch(null);
    stopSpeaking();

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage(
        isUrdu
          ? 'آپ کا براؤزر وائس اسپیچ ریکگنیشن کو سپورٹ نہیں کرتا۔ براہ کرم کروم یا ایج استعمال کریں۔'
          : 'Speech recognition is not supported in this browser. Please use Chrome, Safari or Edge.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = isUrdu ? 'ur-PK' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        handleHaptic(15);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          processVoiceQuery(text);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMessage(isUrdu ? 'مائیکروفون کی اجازت نہیں ملی۔' : 'Microphone permission denied.');
        } else if (event.error !== 'no-speech') {
          setErrorMessage(isUrdu ? 'آواز سمجھ نہیں آسکی، دوبارہ کوشش کریں۔' : 'Could not recognize voice. Please try again.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setErrorMessage(isUrdu ? 'مائیکروفون شروع نہیں ہو سکا۔' : 'Could not initialize microphone.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if (!autoAudio || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = isUrdu ? 'ur-PK' : 'en-US';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS playback error:', e);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const processVoiceQuery = (query: string) => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return;

    handleHaptic([20, 50, 20]);

    // Match against products
    const match = products.find(p => 
      p.name.toLowerCase().includes(cleanQuery) ||
      p.parentCompany.toLowerCase().includes(cleanQuery) ||
      (p.tags && p.tags.some(t => cleanQuery.includes(t.toLowerCase())))
    );

    if (match) {
      setMatchedProduct(match);
      setIsBoycottMatch(true);

      const altName = match.alternatives?.[0]?.name || 'a verified local brand';
      const speechMsg = isUrdu
        ? `توجہ فرمائیں: ${match.name} بائیکاٹ لسٹ میں شامل ہے۔ اس کے بجائے آپ ${altName} خرید سکتے ہیں۔`
        : `Attention: ${match.name} is on the boycott list. A safe local alternative is ${altName}.`;

      speakText(speechMsg);
    } else {
      setMatchedProduct(null);
      setIsBoycottMatch(false);

      const speechMsg = isUrdu
        ? `یہ برانڈ یا نام بائیکاٹ لسٹ میں موجود نہیں ہے۔ یہ محفوظ معلوم ہوتا ہے۔`
        : `No boycott record found for "${query}". This brand appears clean.`;

      speakText(speechMsg);
    }
  };

  const handleAddSwap = () => {
    if (!matchedProduct) return;
    handleHaptic(10);
    const alt = matchedProduct.alternatives?.[0]?.name || 'Local Safe Swap';
    const country = matchedProduct.alternatives?.[0]?.country || 'Pakistan';

    addItem({
      id: `voice-alt-${matchedProduct.id}-${Date.now()}`,
      name: matchedProduct.name,
      category: matchedProduct.category,
      isBoycott: true,
      parentCompany: matchedProduct.parentCompany,
      boycottReason: matchedProduct.boycottReason,
      chosenAlternative: alt,
      alternativeCountry: country,
      suggestedAlternatives: matchedProduct.alternatives,
      checked: false,
      quantity: 1,
      unit: 'item',
    });

    showToast(isUrdu ? `✓ ${alt} شاپنگ لسٹ میں شامل کر دیا گیا!` : `✓ Added ${alt} to shopping list!`);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in ${isUrdu ? 'font-urdu' : ''}`}>
      <div 
        className="relative w-full max-w-md bg-zinc-900 text-white rounded-3xl border border-zinc-700/80 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-rose-600 text-white shadow-xs">
              <Mic className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-black text-white">
                {isUrdu ? 'آواز کے ذریعے تلاش' : 'Voice Conscience Search'}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {isUrdu ? 'بزرگوں اور فوری جانچ کے لیے' : 'Elder & Hands-Free Accessibility'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopSpeaking();
                setAutoAudio(!autoAudio);
              }}
              className={`p-2 rounded-xl border transition-colors ${
                autoAudio 
                  ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40' 
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}
              title={autoAudio ? 'Audio readout enabled' : 'Audio readout muted'}
            >
              {autoAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                stopListening();
                stopSpeaking();
                onClose();
              }}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Pulse Microphone Trigger */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 ${
              isListening
                ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-2 border-zinc-700'
            }`}
          >
            {isListening ? (
              <Mic className="w-8 h-8 animate-bounce" />
            ) : (
              <MicOff className="w-8 h-8 text-zinc-400" />
            )}
          </button>

          <span className="text-xs font-bold text-zinc-400">
            {isListening 
              ? (isUrdu ? 'سن رہا ہے... بولیں (جیسے: "Pepsi" یا "Surf Excel")' : 'Listening... Speak brand name clearly')
              : (isUrdu ? 'بولنے کے لیے مائیک کو دبائیں' : 'Tap microphone to speak')}
          </span>
        </div>

        {/* Real-Time Transcript Display */}
        {transcript && (
          <div className="p-3.5 rounded-2xl bg-zinc-800/80 border border-zinc-700 text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
              {isUrdu ? 'آپ کی آواز' : 'Detected Query'}
            </span>
            <p className="text-base font-black text-white italic">
              "{transcript}"
            </p>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs text-center font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Result: Boycott Match */}
        {isBoycottMatch === true && matchedProduct && (
          <div className="p-4 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-white space-y-3 animate-in zoom-in-95">
            <div className="flex items-center gap-2.5">
              <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                  {isUrdu ? 'بائیکاٹ ہدف' : 'Boycott Target Detected'}
                </span>
                <h4 className="text-sm font-black text-white truncate">
                  {matchedProduct.name}
                </h4>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {matchedProduct.boycottReason}
            </p>

            {matchedProduct.alternatives && matchedProduct.alternatives.length > 0 && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isUrdu ? 'محفوظ پاکستانی متبادل:' : 'Safe Alternative:'}
                  </span>
                  <span className="font-bold text-white">
                    {matchedProduct.alternatives[0].name}
                  </span>
                </div>

                <button
                  onClick={handleAddSwap}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'طیب لسٹ میں شامل کریں' : 'Add to Tayyib List'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Result: Safe Match */}
        {isBoycottMatch === false && transcript && (
          <div className="p-4 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-white text-center space-y-2 animate-in zoom-in-95">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-black text-emerald-300">
              {isUrdu ? 'کوئی بائیکاٹ ریکارڈ نہیں ملا' : 'No Complicity Record Found'}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isUrdu 
                ? `"${transcript}" کے خلاف کوئی اسرائیلی یا استحصالی ریکارڈ درج نہیں۔ یہ استعمال کے لیے محفوظ ہے۔`
                : `"${transcript}" is not listed in the boycott database. Appears clean for local consumption.`}
            </p>
          </div>
        )}

        {/* Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
          <button
            onClick={() => {
              setTranscript('');
              setMatchedProduct(null);
              setIsBoycottMatch(null);
              startListening();
            }}
            className="text-zinc-400 hover:text-white font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'دوبارہ بولیں' : 'Speak Again'}</span>
          </button>

          <button
            onClick={() => {
              stopListening();
              stopSpeaking();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs"
          >
            {isUrdu ? 'بند کریں' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
