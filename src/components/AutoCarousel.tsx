import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Maximize2 } from 'lucide-react';

interface AutoCarouselProps {
  images: string[];
  titles?: string[];
  isArch: boolean;
  folderUrl?: string;
}

export const AutoCarousel: React.FC<AutoCarouselProps> = ({ images, titles, isArch, folderUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [selectedImg, setSelectedImg] = useState<{ url: string; title?: string } | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setScrollWidth(containerRef.current.scrollWidth / 2);
    }
  }, [images]);

  return (
    <div className="space-y-3">
      {folderUrl && (
        <div className="flex justify-end">
          <a
            href={folderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono border rounded transition-all ${
              isArch 
                ? "border-black text-black hover:bg-black hover:text-white" 
                : "border-white/10 text-neon-cyan hover:bg-neon-cyan/10"
            }`}
          >
            <span>OPEN DRIVE FOLDER ({images.length} DRAWINGS)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <div 
        className="relative w-full overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r pointer-events-none ${isArch ? "from-white to-transparent" : "from-[#0a0a0c] to-transparent"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l pointer-events-none ${isArch ? "from-white to-transparent" : "from-[#0a0a0c] to-transparent"}`} />
        
        <motion.div
          ref={containerRef}
          className="flex gap-4 w-max py-2"
          animate={{ x: isPaused ? undefined : [0, -scrollWidth] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: Math.max(25, images.length * 3.5)
          }}
        >
          {[...images, ...images].map((img, idx) => {
            const actualIdx = idx % images.length;
            const title = titles ? titles[actualIdx] : undefined;
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedImg({ url: img, title })}
                className="w-72 md:w-96 shrink-0 cursor-pointer group/card relative"
              >
                <div className={`relative overflow-hidden rounded-lg border transition-all duration-300 group-hover/card:scale-[1.02] ${
                  isArch 
                    ? "border-gray-200 bg-gray-50 shadow-sm group-hover/card:border-black" 
                    : "border-white/10 bg-white/5 group-hover/card:border-neon-cyan/50 shadow-lg"
                }`}>
                  <img 
                    src={img} 
                    alt={title || `Interior drawing ${actualIdx + 1}`}
                    loading="lazy"
                    className="w-full h-52 md:h-64 object-contain bg-white/95 p-2"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-3 py-1.5 rounded bg-black/80 text-white text-xs font-mono flex items-center gap-1.5 border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5 text-neon-cyan" />
                      EXPAND DRAWING
                    </span>
                  </div>
                </div>
                {title && (
                  <p className={`text-[11px] font-mono truncate mt-1.5 px-1 ${isArch ? "text-gray-700 font-medium" : "text-gray-300"}`}>
                    {title}
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal for Expanded View */}
      {selectedImg && (
        <div 
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="absolute top-4 right-4 text-white/70 font-mono text-xs px-3 py-1 border border-white/20 rounded bg-black/50">
            CLICK ANYWHERE TO CLOSE
          </div>
          {selectedImg.title && (
            <div className="text-white font-mono text-sm mb-3 px-4 py-1.5 bg-white/10 rounded border border-white/10 max-w-xl truncate">
              {selectedImg.title}
            </div>
          )}
          <img 
            src={selectedImg.url} 
            alt={selectedImg.title || "Expanded Drawing"} 
            className="max-w-full max-h-[80vh] object-contain rounded border border-white/20 bg-white"
          />
        </div>
      )}
    </div>
  );
};
