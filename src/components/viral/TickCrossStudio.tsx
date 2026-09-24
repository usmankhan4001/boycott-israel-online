import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Share2, 
  Download, 
  Sparkles, 
  Check, 
  X, 
  QrCode, 
  Layout, 
  Copy, 
  Palette, 
  Smartphone, 
  Monitor, 
  Square,
  Flame,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { generateQRMatrix } from '../../utils/qrCodeGenerator';
import { useTranslation } from '../../i18n/useTranslation';

type AspectRatio = '1:1' | '9:16' | '16:9';

interface PresetPair {
  id: string;
  category: string;
  boycottName: string;
  boycottParent: string;
  boycottReason: string;
  alternativeName: string;
  alternativeOrigin: string;
  alternativeTagline: string;
}

const PRESET_PAIRS: PresetPair[] = [
  {
    id: 'cola-swap',
    category: 'Beverages',
    boycottName: 'Coca-Cola / Pepsi',
    boycottParent: 'The Coca-Cola Co. & PepsiCo Inc.',
    boycottReason: 'Factories in illegal Atarot settlements; billions in dividend flight to Wall Street.',
    alternativeName: 'Pakola & Gourmet Cola',
    alternativeOrigin: '100% Pakistani Owned 🇵🇰',
    alternativeTagline: 'Made with local cane sugar, supports domestic jobs & retains 100% wealth.'
  },
  {
    id: 'fast-food-swap',
    category: 'Burgers & Fast Food',
    boycottName: "McDonald's / KFC",
    boycottParent: "McDonald's Corp / Yum! Brands",
    boycottReason: 'Provided 100k+ free meals and military discounts to IDF combat forces in Gaza.',
    alternativeName: 'Daily Deli / Cheezious / Ranchers',
    alternativeOrigin: '100% Pakistani Owned 🇵🇰',
    alternativeTagline: 'Fresh halal local meat, Pakistani chefs, circulating capital domestically.'
  },
  {
    id: 'tea-swap',
    category: 'Tea & Warm Drinks',
    boycottName: 'Lipton / Yellow Label',
    boycottParent: 'Unilever / ekaterra (CVC Partners)',
    boycottReason: 'Major investments in Israeli start-ups; historic colonial plantation exploitation.',
    alternativeName: 'Tapal Danedar / Kashmiri Tea',
    alternativeOrigin: '100% Pakistani Owned 🇵🇰',
    alternativeTagline: 'Pure orthodox tea leaves, zero plastic teabag leaching, national pioneer.'
  },
  {
    id: 'detergent-swap',
    category: 'Household Care',
    boycottName: 'Ariel / Tide / Surf Excel',
    boycottParent: 'Procter & Gamble / Unilever',
    boycottReason: 'Decades of Israeli defense fund ties and heavy chemical endocrine disruptors.',
    alternativeName: 'Sufi Soap / Brite / BreeO',
    alternativeOrigin: '100% Pakistani Owned 🇵🇰',
    alternativeTagline: 'Cold-pressed natural vegetable oils, gentle on skin and local rivers.'
  },
  {
    id: 'noodles-swap',
    category: 'Snacks & Noodles',
    boycottName: 'Maggi Noodles / Knorr',
    boycottParent: 'Nestlé S.A. / Unilever',
    boycottReason: 'Nestlé owns 100% of Israeli food giant Osem operating in Sderot and Kiryat Malachi.',
    alternativeName: 'Shoop Noodles / Shan Foods',
    alternativeOrigin: '100% Pakistani Owned 🇵🇰',
    alternativeTagline: 'Rich domestic spices, no artificial synthetic colors, 100% Pakistani made.'
  }
];

export const TickCrossStudio: React.FC = () => {
  const { isUrdu } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('cola-swap');
  
  // Custom Editable Fields
  const [boycottName, setBoycottName] = useState<string>(PRESET_PAIRS[0].boycottName);
  const [boycottParent, setBoycottParent] = useState<string>(PRESET_PAIRS[0].boycottParent);
  const [boycottReason, setBoycottReason] = useState<string>(PRESET_PAIRS[0].boycottReason);
  
  const [altName, setAltName] = useState<string>(PRESET_PAIRS[0].alternativeName);
  const [altOrigin, setAltOrigin] = useState<string>(PRESET_PAIRS[0].alternativeOrigin);
  const [altTagline, setAltTagline] = useState<string>(PRESET_PAIRS[0].alternativeTagline);

  const [dossierUrl, setDossierUrl] = useState<string>('https://boycottisraelonline.com');
  const [campaignHashtag, setCampaignHashtag] = useState<string>('#BoycottGenocide #BuyTayyib');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Apply Preset
  const handleSelectPreset = (p: PresetPair) => {
    setSelectedPresetId(p.id);
    setBoycottName(p.boycottName);
    setBoycottParent(p.boycottParent);
    setBoycottReason(p.boycottReason);
    setAltName(p.alternativeName);
    setAltOrigin(p.alternativeOrigin);
    setAltTagline(p.alternativeTagline);
  };

  // Render Canvas
  const renderGraphic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 1080;
    let height = 1080;
    if (aspectRatio === '9:16') {
      width = 1080;
      height = 1920;
    } else if (aspectRatio === '16:9') {
      width = 1920;
      height = 1080;
    }

    canvas.width = width;
    canvas.height = height;

    // 1. Background Fill
    ctx.fillStyle = '#09090b'; // zinc-950
    ctx.fillRect(0, 0, width, height);

    // 2. Header Area
    const headerHeight = aspectRatio === '9:16' ? 240 : 160;
    
    // Top Gradient bar
    const topGrad = ctx.createLinearGradient(0, 0, width, 0);
    topGrad.addColorStop(0, '#e11d48'); // rose-600
    topGrad.addColorStop(0.5, '#059669'); // emerald-600
    topGrad.addColorStop(1, '#0284c7'); // sky-600
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, width, 12);

    // Takweyat / Boycott Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 38px Inter, system-ui, sans-serif';
    ctx.fillText('TAKWEYAT • EVIDENCE DOSSIER', 50, 70);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '700 22px Inter, system-ui, sans-serif';
    ctx.fillText(campaignHashtag, 50, 110);

    // 3. Dual Split Body Cards (Left: Boycott Target ✖ | Right: Local Alternative ✔)
    const cardMarginX = 50;
    const cardMarginTop = headerHeight;
    const footerHeight = aspectRatio === '9:16' ? 260 : 180;
    const cardHeight = height - cardMarginTop - footerHeight;
    
    const cardSpacing = 30;
    const cardWidth = (width - cardMarginX * 2 - cardSpacing) / 2;

    // --- LEFT CARD: BOYCOTT TARGET (RED) ---
    const leftX = cardMarginX;
    // Card Background
    ctx.fillStyle = '#1c1917'; // warm dark zinc
    roundRect(ctx, leftX, cardMarginTop, cardWidth, cardHeight, 32);
    ctx.fill();

    // Red Left Border Accent
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Red Cross Badge
    ctx.fillStyle = '#e11d48';
    roundRect(ctx, leftX + 40, cardMarginTop + 40, 56, 56, 16);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 32px Inter, sans-serif';
    ctx.fillText('✖', leftX + 54, cardMarginTop + 80);

    ctx.fillStyle = '#f43f5e';
    ctx.font = '900 20px Inter, sans-serif';
    ctx.fillText('DO NOT BUY • BOYCOTT TARGET', leftX + 115, cardMarginTop + 76);

    // Target Name
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px Inter, sans-serif';
    wrapText(ctx, boycottName, leftX + 40, cardMarginTop + 160, cardWidth - 80, 50);

    // Parent Company
    ctx.fillStyle = '#fb7185';
    ctx.font = '700 24px Inter, sans-serif';
    wrapText(ctx, `Parent: ${boycottParent}`, leftX + 40, cardMarginTop + 240, cardWidth - 80, 32);

    // Reason Box
    ctx.fillStyle = '#292524';
    roundRect(ctx, leftX + 40, cardMarginTop + 300, cardWidth - 80, cardHeight - 340, 20);
    ctx.fill();

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 24px Inter, sans-serif';
    wrapText(ctx, `Evidence & Crime: ${boycottReason}`, leftX + 65, cardMarginTop + 360, cardWidth - 130, 38);


    // --- RIGHT CARD: LOCAL TAYYIB ALTERNATIVE (GREEN) ---
    const rightX = leftX + cardWidth + cardSpacing;
    // Card Background
    ctx.fillStyle = '#06281e'; // deep emerald dark
    roundRect(ctx, rightX, cardMarginTop, cardWidth, cardHeight, 32);
    ctx.fill();

    // Green Border Accent
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Green Tick Badge
    ctx.fillStyle = '#10b981';
    roundRect(ctx, rightX + 40, cardMarginTop + 40, 56, 56, 16);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 32px Inter, sans-serif';
    ctx.fillText('✔', rightX + 54, cardMarginTop + 80);

    ctx.fillStyle = '#34d399';
    ctx.font = '900 20px Inter, sans-serif';
    ctx.fillText('RECOMMENDED • TAYYIB ALTERNATIVE', rightX + 115, cardMarginTop + 76);

    // Alt Name
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px Inter, sans-serif';
    wrapText(ctx, altName, rightX + 40, cardMarginTop + 160, cardWidth - 80, 50);

    // Alt Origin
    ctx.fillStyle = '#6ee7b7';
    ctx.font = '700 24px Inter, sans-serif';
    wrapText(ctx, altOrigin, rightX + 40, cardMarginTop + 240, cardWidth - 80, 32);

    // Alt Wholesome Box
    ctx.fillStyle = '#064e3b';
    roundRect(ctx, rightX + 40, cardMarginTop + 300, cardWidth - 80, cardHeight - 340, 20);
    ctx.fill();

    ctx.fillStyle = '#ecfdf5';
    ctx.font = '500 24px Inter, sans-serif';
    wrapText(ctx, `Why Support: ${altTagline}`, rightX + 65, cardMarginTop + 360, cardWidth - 130, 38);


    // 4. Footer Area with Dynamic QR Code & Slogan
    const footerY = height - footerHeight + 20;

    // Slogan Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 28px Inter, sans-serif';
    ctx.fillText('EVERY RUPEE IS A VOTE — BUILD SOVEREIGNTY', 50, footerY + 50);

    ctx.fillStyle = '#71717a';
    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillText('Scan QR to verify live corporate complicity dossiers & supply chain analysis', 50, footerY + 90);

    // Draw Dynamic QR Code on Bottom Right
    const qrSize = footerHeight - 40;
    const qrX = width - cardMarginX - qrSize;
    const qrY = footerY;

    // QR container background
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 16);
    ctx.fill();

    // Render QR Code Matrix
    const qrMatrix = generateQRMatrix(dossierUrl);
    const matrixSize = qrMatrix.length;
    const cellSize = qrSize / matrixSize;

    ctx.fillStyle = '#000000';
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if (qrMatrix[r][c]) {
          ctx.fillRect(
            qrX + c * cellSize,
            qrY + r * cellSize,
            Math.ceil(cellSize),
            Math.ceil(cellSize)
          );
        }
      }
    }
  }, [aspectRatio, boycottName, boycottParent, boycottReason, altName, altOrigin, altTagline, dossierUrl, campaignHashtag]);

  // Helper function for rounded rect on canvas
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Helper text wrapping
  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  useEffect(() => {
    renderGraphic();
  }, [renderGraphic]);

  // Download Graphic
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Takweyat-Boycott-Swap-${aspectRatio.replace(':', 'x')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Web Share API
  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (navigator.share && canvas.toBlob) {
      canvas.toBlob(async blob => {
        if (!blob) return;
        const file = new File([blob], 'takweyat-swap.png', { type: 'image/png' });
        try {
          await navigator.share({
            title: `${boycottName} ✖ vs ${altName} ✔ - Takweyat Boycott`,
            text: `Boycott ${boycottName} and switch to ${altName}! Verify the evidence on Takweyat.`,
            files: [file]
          });
        } catch (err) {
          // Fallback to text copy
          handleCopyText();
        }
      });
    } else {
      handleCopyText();
    }
  };

  const handleCopyText = () => {
    const text = `🚨 *BOYCOTT:* ${boycottName} (${boycottParent})\nReason: ${boycottReason}\n\n✅ *BUY LOCAL & TAYYIB:* ${altName} (${altOrigin})\n${altTagline}\n\n📲 Verify full evidence at: ${dossierUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white border border-zinc-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Viral Social Studio</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            "Tick vs. Cross" Social Canvas Creator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            Generate high-res 1:1, 9:16 (WhatsApp Status / Instagram Story), and 16:9 social graphics with split-screen boycott comparisons and verifiable dynamic QR codes.
          </p>
        </div>
      </div>

      {/* Studio Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Controls & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Aspect Ratio Switcher */}
          <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
              Format & Aspect Ratio:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setAspectRatio('1:1')}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border text-xs font-black transition-all ${
                  aspectRatio === '1:1'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <Square className="w-4 h-4" />
                <span>1:1 Square</span>
              </button>

              <button
                onClick={() => setAspectRatio('9:16')}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border text-xs font-black transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>9:16 Story</span>
              </button>

              <button
                onClick={() => setAspectRatio('16:9')}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 border text-xs font-black transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>16:9 Banner</span>
              </button>
            </div>
          </div>

          {/* Preset Picker */}
          <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
              Select Preset Pair:
            </span>
            <div className="space-y-1.5">
              {PRESET_PAIRS.map(preset => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full p-3 rounded-2xl text-left border transition-all flex items-center justify-between text-xs font-bold ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    <div>
                      <p className="text-zinc-900 dark:text-zinc-100 font-black">{preset.boycottName} ➔ {preset.alternativeName}</p>
                      <p className="text-[10px] text-zinc-400">{preset.category}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Editable Fields */}
          <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-500 block">
              Customize Text & Details:
            </span>

            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] font-bold text-rose-500 block mb-1">✖ Boycott Target Name</label>
                <input
                  type="text"
                  value={boycottName}
                  onChange={e => setBoycottName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-rose-500 block mb-1">✖ Boycott Reason / Complicity</label>
                <textarea
                  rows={2}
                  value={boycottReason}
                  onChange={e => setBoycottReason(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-500 block mb-1">✔ Local Alternative Name</label>
                <input
                  type="text"
                  value={altName}
                  onChange={e => setAltName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-500 block mb-1">✔ Alternative Why Support / Tagline</label>
                <textarea
                  rows={2}
                  value={altTagline}
                  onChange={e => setAltTagline(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-semibold resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 block mb-1">🔗 Target Evidence URL for QR Code</label>
                <input
                  type="text"
                  value={dossierUrl}
                  onChange={e => setDossierUrl(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live High-Res Canvas Preview & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full max-w-md aspect-auto overflow-hidden rounded-2xl shadow-inner border border-zinc-800">
              <canvas
                ref={canvasRef}
                className="w-full h-auto block rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res PNG</span>
            </button>

            <button
              onClick={handleShare}
              className="py-3.5 px-5 rounded-2xl bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-zinc-700 active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>Share to WhatsApp / Story</span>
            </button>

            <button
              onClick={handleCopyText}
              className="py-3.5 px-4 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              title="Copy formatted text message"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedNotification ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
