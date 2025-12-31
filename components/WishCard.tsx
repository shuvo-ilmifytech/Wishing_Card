
import React from 'react';
import { CardData } from '../types';

interface WishCardProps {
  data: CardData;
  id?: string;
}

const Sparkles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-60">
    {[...Array(15)].map((_, i) => (
      <svg
        key={i}
        className="absolute animate-pulse"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 12 + 4}px`,
          height: `${Math.random() * 12 + 4}px`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
          fill={i % 3 === 0 ? "#27ae60" : "white"}
        />
      </svg>
    ))}
  </div>
);

const WishCard: React.FC<WishCardProps> = ({ data, id }) => {
  const scale = data.userInfo.imageScale || 1;

  return (
    <div 
      id={id}
      className="relative w-full aspect-[4/5] bg-[#050505] overflow-hidden shadow-2xl flex flex-col font-montserrat text-white select-none"
      style={{ minWidth: '400px', backgroundColor: '#050505' }}
    >
      <Sparkles />
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-radial-gradient from-[#27ae60]/10 to-transparent opacity-30 pointer-events-none"></div>

      {/* Top Left Sharp Accent */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#27ae60] z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
      
      {/* Bottom Right Geometric Patterns */}
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-80 z-0">
         <svg viewBox="0 0 200 200" className="w-full h-full">
            <path fill="#27ae60" d="M200 140 L200 200 L140 200 Z" />
            <path fill="#27ae60" opacity="0.5" d="M200 100 L200 200 L100 200 Z" />
            <path fill="#27ae60" opacity="0.2" d="M200 60 L200 200 L60 200 Z" />
         </svg>
      </div>

      {/* Spacing for layout balance since logo is removed */}
      <div className="relative z-20 px-10 pt-16 flex justify-end items-start w-full">
        <span className="text-[10px] font-black tracking-[0.2em] italic text-[#27ae60] uppercase whitespace-nowrap">iLMIFYTECH AGENCY 2026</span>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-12 text-center -mt-8">
        
        {/* Happy New Year Titles */}
        <div className="space-y-1 mb-4">
          <h2 className="text-[#27ae60] text-xl font-black tracking-[0.4em] leading-none">HAPPY</h2>
          <h3 className="text-white text-4xl font-black tracking-tighter uppercase leading-none">New Year</h3>
        </div>

        {/* Wish Message */}
        <div className="relative max-w-sm mx-auto py-2 px-6 mb-6">
           <svg className="absolute -top-3 left-0 w-5 h-5 text-[#27ae60] opacity-40" fill="currentColor" viewBox="0 0 24 24">
             <path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16 16L18 16C18.552 16 19 15.552 19 15L19 13C19 12.448 18.552 12 18 12L15 12C13.899 12 13 11.101 13 10L13 7C13 5.899 13.899 5 15 5L18 5C19.101 5 20 5.899 20 7L20 15C20 18.314 17.314 21 14.017 21ZM4.017 21L4.017 18C4.017 16.899 4.899 16 6 16L8 16C8.552 16 9 15.552 9 15L9 13C9 12.448 8.552 12 8 12L5 12C3.899 12 3 11.101 3 10L3 7C3 5.899 3.899 5 5 5L8 5C9.101 5 10 5.899 10 7L10 15C10 18.314 7.314 21 4.017 21Z" />
           </svg>
           <p className="text-zinc-200 text-sm md:text-[14px] font-semibold leading-relaxed italic px-6 text-center">
             {data.wish}
           </p>
           <svg className="absolute -bottom-3 right-0 w-5 h-5 text-[#27ae60] opacity-40 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
             <path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16 16L18 16C18.552 16 19 15.552 19 15L19 13C19 12.448 18.552 12 18 12L15 12C13.899 12 13 11.101 13 10L13 7C13 5.899 13.899 5 15 5L18 5C19.101 5 20 5.899 20 7L20 15C20 18.314 17.314 21 14.017 21ZM4.017 21L4.017 18C4.017 16.899 4.899 16 6 16L8 16C8.552 16 9 15.552 9 15L9 13C9 12.448 8.552 12 8 12L5 12C3.899 12 3 11.101 3 10L3 7C3 5.899 3.899 5 5 5L8 5C9.101 5 10 5.899 10 7L10 15C10 18.314 7.314 21 4.017 21Z" />
           </svg>
        </div>

        <div className="h-[2px] w-12 bg-[#27ae60]/40 mb-8"></div>

        {/* Headshot */}
        <div className="relative mb-6">
          <div className="absolute -inset-6 bg-[#27ae60]/10 rounded-full blur-3xl"></div>
          <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full border-[6px] border-[#27ae60] p-1 shadow-2xl overflow-hidden bg-zinc-900 ring-4 ring-black/50">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              {data.userInfo.userImage ? (
                <img 
                  src={data.userInfo.userImage} 
                  alt={data.userInfo.name} 
                  className="w-full h-full object-cover" 
                  style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-800">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
              )}
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white text-black px-4 py-1 rounded-full font-black text-[10px] italic shadow-xl z-20">
            2026
          </div>
        </div>

        {/* Identity Details */}
        <div className="w-full flex flex-col items-center">
           <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-tight mb-2 break-words max-w-full">{data.userInfo.name}</h3>
        </div>
      </div>

      {/* Global Footer Branding */}
      <div className="relative z-10 px-10 pb-[16px] flex flex-col items-center justify-center gap-1 opacity-40 mt-auto">
         <div className="flex items-center justify-center w-full gap-4">
            <div className="h-[1px] flex-1 bg-white/20"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white">ilmifytech.com</span>
            <div className="h-[1px] flex-1 bg-white/20"></div>
         </div>
      </div>
    </div>
  );
};

export default WishCard;
