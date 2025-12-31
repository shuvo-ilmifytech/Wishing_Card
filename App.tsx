
import React, { useState, useRef, useCallback } from 'react';
import WishCard from './components/WishCard';
import Button from './components/Button';
import { generatePersonalizedWish } from './services/geminiService';
import { CardData, UserInfo } from './types';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ 
    name: '', 
    userImage: '',
    imageScale: 1.0 
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo(prev => ({ ...prev, userImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name) return;

    setIsGenerating(true);
    const wish = await generatePersonalizedWish(userInfo);
    setCardData({
      userInfo,
      wish,
      theme: 'gold', 
    });
    setIsGenerating(false);

    setTimeout(() => {
        const previewElement = document.getElementById('preview-anchor');
        previewElement?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const handleDownload = useCallback(async () => {
    const node = document.getElementById('final-card');
    if (!node) {
      alert("Card element not found. Please generate the card first.");
      return;
    }

    setIsDownloading(true);
    
    try {
      // Small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 800));

      // Attempt 1: html-to-image (Higher fidelity for CSS gradients/clip-paths)
      try {
        const dataUrl = await htmlToImage.toPng(node, {
          cacheBust: true,
          pixelRatio: 3, // Even higher res
          backgroundColor: '#050505',
          skipFonts: false,
        });

        if (dataUrl && dataUrl.length > 2000) {
          triggerDownload(dataUrl);
          setIsDownloading(false);
          return;
        }
      } catch (e) {
        console.warn("Primary download method failed, trying fallback...", e);
      }

      // Attempt 2: html2canvas
      const canvas = await html2canvas(node, {
        backgroundColor: '#050505',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      
      const canvasDataUrl = canvas.toDataURL('image/png');
      triggerDownload(canvasDataUrl);
      
    } catch (err) {
      console.error('All download methods failed:', err);
      alert("Download failed. Please take a high-quality screenshot of your card!");
    } finally {
      setIsDownloading(false);
    }
  }, [userInfo.name]);

  const triggerDownload = (url: string) => {
    const link = document.createElement('a');
    link.download = `iLMIFYTECH-2026-${userInfo.name.replace(/\s+/g, '-')}.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#27ae60]/30 font-montserrat">
      {/* Corporate Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-2xl px-10 py-5 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-[#27ae60] p-1 rounded-lg">
             <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
             </svg>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block"></div>
          <span className="text-sm font-black tracking-tight text-white uppercase hidden md:block">iLMIFY<span className="text-[#27ae60]">TECH</span> Portal</span>
        </div>
        <div className="flex gap-4 items-center">
           <span className="text-[9px] font-black tracking-widest uppercase text-[#27ae60] bg-green-500/5 px-4 py-2 rounded-full border border-green-500/10">Card Engine v4.0</span>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-44 pb-32 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-24 items-start">
          
          {/* Form Side */}
          <div className="xl:col-span-6 space-y-12">
            <header className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white">
                HAPPY <br /> <span className="text-[#27ae60] italic">NEW YEAR.</span>
              </h1>
              <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                Generate your celebratory 2026 iLMIFYTECH agency card. <br />
                <span className="text-zinc-300 font-bold italic underline decoration-[#27ae60] decoration-4">From ilm, to innovation.</span>
              </p>
            </header>

            <form onSubmit={handleGenerate} className="space-y-10 bg-zinc-900/30 p-10 rounded-[3.5rem] border border-white/5 backdrop-blur-3xl shadow-3xl">
              
              {/* Photo & Resize */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative w-36 h-36 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer hover:border-[#27ae60] transition-all bg-zinc-950 overflow-hidden shadow-inner ring-8 ring-black/20"
                >
                  {userInfo.userImage ? (
                    <img 
                      src={userInfo.userImage} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" 
                      style={{ transform: `scale(${userInfo.imageScale})` }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-10 h-10 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        <span className="text-[10px] font-black tracking-widest text-zinc-800 uppercase">Profile Photo</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <h4 className="text-lg font-bold text-white tracking-tight">Frame Alignment</h4>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">Zoom and position your photo to match agency standards.</p>
                  
                  {userInfo.userImage && (
                    <div className="space-y-3 pt-2">
                       <input 
                         type="range" 
                         min="0.5" 
                         max="2.5" 
                         step="0.05" 
                         value={userInfo.imageScale}
                         onChange={(e) => setUserInfo({...userInfo, imageScale: parseFloat(e.target.value)})}
                         className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#27ae60]"
                       />
                       <div className="flex justify-between text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                          <span>Zoom -</span>
                          <span>Zoom +</span>
                       </div>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.4em]">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-[#27ae60]/20 focus:border-[#27ae60] transition-all font-bold placeholder:text-zinc-800"
                  placeholder="E.g. Wali Ullah Shuvo"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                isLoading={isGenerating} 
                className="w-full bg-[#27ae60] hover:bg-[#2ecc71] text-black py-6 rounded-2xl font-black text-xl tracking-tight shadow-[0_25px_50px_-12px_rgba(39,174,96,0.3)] transition-all active:scale-95"
              >
                {cardData ? 'REFRESH MY CARD' : 'GENERATE MY 2026 CARD'}
              </Button>
            </form>
          </div>

          {/* Card Preview Side */}
          <div className="xl:col-span-6 relative flex flex-col items-center">
            <div id="preview-anchor" className="absolute -top-32"></div>
            <div className="w-full max-w-xl sticky top-32">
              <div className="mb-10 flex justify-between items-end border-b border-white/5 pb-6">
                 <div>
                    <span className="text-[#27ae60] font-black text-[10px] uppercase tracking-[0.5em]">Agency Asset</span>
                    <h3 className="text-4xl font-black mt-2 tracking-tighter">Social Card</h3>
                 </div>
                 <div className="text-right">
                    <span className="text-zinc-800 font-black text-8xl leading-none italic select-none">26</span>
                 </div>
              </div>
              
              <div className="relative group">
                {cardData ? (
                  <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
                    <div className="shadow-[0_50px_100px_rgba(0,0,0,0.9)] rounded-[2rem] overflow-hidden bg-black">
                       <WishCard data={cardData} id="final-card" />
                    </div>
                    <div className="flex gap-6">
                      <Button 
                        onClick={handleDownload} 
                        isLoading={isDownloading}
                        className="flex-1 bg-white text-black hover:bg-zinc-200 rounded-2xl py-5 font-black tracking-[0.2em] text-[12px] shadow-2xl"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        DOWNLOAD HIGH-RES PNG
                      </Button>
                      <Button onClick={() => window.print()} variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-2xl py-5 px-10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-zinc-900/10 border-2 border-dashed border-zinc-800 rounded-[3.5rem] flex flex-col items-center justify-center p-20 text-center">
                    <div className="w-28 h-28 bg-zinc-950 rounded-[2rem] flex items-center justify-center mb-10 border border-white/5 animate-pulse">
                      <svg className="w-12 h-12 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 className="text-3xl font-black text-zinc-700 tracking-tight uppercase">Ready to Create</h3>
                    <p className="text-zinc-800 text-sm mt-4 font-bold max-w-xs uppercase tracking-widest italic">Generate your professional identity card to see the preview here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-black border-t border-white/5 py-24 px-10">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-5">
              <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                <svg className="w-6 h-6 text-[#27ae60]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-lg font-black tracking-tighter text-white">iLMIFY<span className="text-[#27ae60]">TECH</span></span>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em]">Agency Identity 2026</span>
            </div>
            <p className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.5em] leading-loose">
              &copy; iLMIFYTECH AGENCY. FROM ILM TO INNOVATION. ALL ASSETS PROTECTED.
            </p>
          </div>
          
          <div className="flex gap-12 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
            <a href="https://ilmifytech.com" target="_blank" className="hover:text-[#27ae60] transition-colors">Corporate Site</a>
            <a href="#" className="hover:text-[#27ae60] transition-colors">Career Portal</a>
            <a href="#" className="hover:text-[#27ae60] transition-colors">Identity Guidelines</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
