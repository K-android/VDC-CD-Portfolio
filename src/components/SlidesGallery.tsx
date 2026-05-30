import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  RefreshCw, 
  LogOut, 
  ExternalLink, 
  BookOpen, 
  KeyRound, 
  Image as ImageIcon 
} from "lucide-react";
import { 
  googleSignIn, 
  googleSignOut, 
  initAuth, 
  fetchPresentationSlides, 
  SlidePages, 
  extractPresentationId 
} from "../lib/googleSlides";

interface SlidesGalleryProps {
  projectId: string;
  isArch: boolean;
}

export default function SlidesGallery({ projectId, isArch }: SlidesGalleryProps) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);

  // Slides State
  const [presentationIdOrUrl, setPresentationIdOrUrl] = useState<string>("");
  const [slides, setSlides] = useState<SlidePages[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  // Detect if we are running in an iframe environment on mount
  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  // Load configured Presentation ID from localStorage for this project ID on mount
  useEffect(() => {
    const saved = localStorage.getItem(`slides-id-${projectId}`);
    if (saved) {
      setPresentationIdOrUrl(saved);
    } else {
      // Provide an educational Google Slides Tutorial deck as default
      setPresentationIdOrUrl("1EAYk1UT3vZ5HMW86vXg8pAs04975XlKLa2IqZbeLYpI");
    }
  }, [projectId]);

  // Read slide elements when token or presentation ID changes
  useEffect(() => {
    if (token && presentationIdOrUrl) {
      handleLoadSlides();
    } else {
      setSlides([]);
    }
  }, [token, projectId]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error("Firebase Auth sign in failed: ", err);
      if (err.code === "auth/popup-closed-by-user" || err.message?.includes("closed-by-user") || err.message?.includes("popup")) {
        setError("Sign-in popup was closed or blocked. For a successful connection inside secure sandbox previews, please open the app in a new tab first.");
      } else {
        setError(err.message || "Authentication failed. Please check browser popups & block permissions.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await googleSignOut();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setSlides([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoadSlides = async () => {
    if (!token) return;
    const resolvedId = extractPresentationId(presentationIdOrUrl);
    if (!resolvedId) {
      setError("Please input a valid Presentation ID or Google URL.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const pages = await fetchPresentationSlides(resolvedId, token);
      setSlides(pages);
      setActiveIndex(0);
      setIsEditMode(false);
      // Persist configuration in localStorage so choices remain secure across reboots
      localStorage.setItem(`slides-id-${projectId}`, resolvedId);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unable to retrieve presentation slides.");
      setSlides([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideId = extractPresentationId(presentationIdOrUrl);
  const slidesUrl = `https://docs.google.com/presentation/d/${slideId}/edit`;

  // Styling schemes depending on active sub-theme mapping (VDC terminal vs ARCH studio gallery)
  const isDark = !isArch;
  const themeAccent = isArch ? "text-black border-black" : "text-neon-cyan border-neon-cyan";
  const themeLabelClass = isArch ? "text-gray-800" : "text-neon-cyan";
  const themeCardBg = isArch ? "bg-gray-50 border-gray-100" : "bg-[#0b0e11] border-terminal-border/20";
  const buttonAccent = isArch 
    ? "bg-black text-white hover:bg-gray-800" 
    : "bg-transparent text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/15";

  return (
    <div className={`mt-8 border rounded-xl overflow-hidden font-sans transition-colors duration-700 ${
      isDark ? "bg-[#080a0c] border-terminal-border/40" : "bg-white border-gray-100"
    }`}>
      {/* Header Panel */}
      <div className={`px-4 py-3 border-b flex justify-between items-center ${
        isDark ? "border-terminal-border/20 bg-[#0c1013]" : "bg-gray-50/80 border-gray-100"
      }`}>
        <div className="flex items-center gap-2">
          <BookOpen className={`w-3.5 h-3.5 ${isDark ? "text-neon-cyan" : "text-black"}`} />
          <span className={`font-mono text-[9px] md:text-xs font-bold uppercase tracking-widest ${
            isDark ? "text-white" : "text-black"
          }`}>
            WORKSPACE_SLIDES_ENGINE
          </span>
        </div>

        {/* User profile details / sign-out controls */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] md:text-[9.5px] text-gray-500 hidden sm:inline">
              Link: {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className={`p-1.5 rounded-md hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer`}
              title="Disconnect Google Drive/Slides Workspace"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] md:text-[9.5px] text-gray-500">
              [SEAMLESS_VIEW_MODE]
            </span>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`p-1 rounded text-[10px] font-mono border hover:bg-white/10 ${
                isDark ? "text-gray-400 border-terminal-border/30" : "text-black border-gray-200"
              }`}
              title="Configure Custom Slide Link"
            >
              {isEditMode ? "Close Settings" : "Settings"}
            </button>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-6 min-h-[220px] flex flex-col justify-center">
        {/* If edit mode is enabled without being logged in, show config tools */}
        {isEditMode && !user ? (
          <div className="space-y-4 max-w-md mx-auto w-full">
            <div className="text-center py-2">
              <KeyRound className={`w-6 h-6 mx-auto mb-2 opacity-60 ${isDark ? "text-neon-cyan" : "text-black"}`} />
              <h4 className={`text-xs font-semibold tracking-tight uppercase mb-1 ${isDark ? "text-white" : "text-black"}`}>
                Configure Slides Presentation Link
              </h4>
              <p className="text-[10px] text-gray-500 mb-4 leading-normal">
                Set a custom presentation ID. Any public slides copy will be loaded seamlessly for your visitors.
              </p>
            </div>

            <div>
              <label className={`block font-mono text-[9px] uppercase tracking-wider mb-2 ${themeLabelClass}`}>
                Google Slides Presentation Link or ID
              </label>
              <input
                type="text"
                value={presentationIdOrUrl}
                onChange={(e) => setPresentationIdOrUrl(e.target.value)}
                placeholder="Paste presentation URL or deck ID"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const resolvedId = extractPresentationId(presentationIdOrUrl);
                    if (resolvedId) {
                      localStorage.setItem(`slides-id-${projectId}`, resolvedId);
                      setIsEditMode(false);
                      setError(null);
                    }
                  }
                }}
                className={`w-full px-3 py-2 text-xs font-mono rounded-lg outline-none transition-colors border ${
                  isDark 
                    ? "bg-[#0b0d10] border-terminal-border/25 text-white focus:border-neon-cyan/60" 
                    : "bg-gray-50 border-gray-200 text-black focus:border-black"
                }`}
              />
              <p className="text-[9px] text-gray-500 mt-1.5 leading-relaxed">
                Press Enter to save. The presentation must be shared as "Anyone with link can view" for embedding.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const resolvedId = extractPresentationId(presentationIdOrUrl);
                  if (resolvedId) {
                    localStorage.setItem(`slides-id-${projectId}`, resolvedId);
                    setIsEditMode(false);
                    setError(null);
                  } else {
                    setError("Invalid Presentation ID.");
                  }
                }}
                className={`flex-1 font-mono text-[10px] uppercase font-bold py-2 rounded-lg transition-all duration-300 ${buttonAccent}`}
              >
                Apply Custom Link
              </button>
              <button
                onClick={() => handleLogin()}
                disabled={isLoggingIn}
                className={`flex-1 font-mono text-[10px] uppercase font-bold py-2 rounded-lg transition-all duration-300 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1.5`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                {isLoggingIn ? "Syncing..." : "Connect Google API"}
              </button>
            </div>

            {error && (
              <p className="text-[10px] font-mono text-red-400 text-center">{error}</p>
            )}

            <button
              onClick={() => setIsEditMode(false)}
              className="w-full text-center text-[10px] font-mono underline hover:text-gray-400 text-gray-500 cursor-pointer block"
            >
              Back to presentation player
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* If offline but we have a valid presentation ID, show beautiful seamless interactive player */}
            {!user && slideId ? (
              <div className="space-y-4">
                <div className={`relative overflow-hidden aspect-video border rounded-lg bg-[#07090b] shadow-xl ${
                  isDark ? "border-terminal-border/20 shadow-black/80" : "border-gray-200 shadow-black/5"
                }`}>
                  <iframe
                    src={`https://docs.google.com/presentation/d/${slideId}/embed?start=false&loop=false&delayms=10000`}
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allowFullScreen={true}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    title={`Google Slides Portfolio View - ${projectId}`}
                  />
                </div>

                {/* Info and external link buttons */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex gap-2">
                    <a
                      href={slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[9.5px] uppercase transition-all ${
                        isDark 
                          ? "bg-[#0b0e11] text-[#00f2ff]/80 hover:text-[#00f2ff] border border-neon-cyan/20 hover:bg-neon-cyan/5" 
                          : "bg-gray-100 text-black hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Presentation File
                    </a>
                  </div>
                  <span className="font-mono text-[9px] text-gray-500">
                    ID: {slideId.substring(0, 10)}...
                  </span>
                </div>
              </div>
            ) : needsAuth ? (
              // Fallback block if slideId is somehow not found
              <div className="text-center py-6 max-w-sm mx-auto">
                <KeyRound className={`w-8 h-8 mx-auto mb-3 opacity-60 ${isDark ? "text-neon-cyan" : "text-black"}`} />
                <h4 className={`text-xs md:text-sm font-semibold tracking-tight uppercase mb-1.5 ${isDark ? "text-white" : "text-black"}`}>
                  Unlock Dynamic Slideshow
                </h4>
                <p className="text-[10px] md:text-xs text-gray-500 mb-4 leading-normal">
                  No slides deck id configured. Connect your Google account to select presentation files or open settings to paste an ID.
                </p>

                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button w-full flex justify-center items-center py-2 px-3 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer text-sm font-medium text-gray-700"
                >
                  <div className="gsi-material-button-content-wrapper flex items-center justify-center gap-3.5">
                    <div className="gsi-material-button-icon w-4 h-4 flex items-center justify-center">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      </svg>
                    </div>
                    <span className="gsi-material-button-contents font-sans font-medium text-xs leading-none">
                      {isLoggingIn ? "Configuring Session..." : "Connect Google Account"}
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Loading / Error States for logged in users retrieving thumbnails manually */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <RefreshCw className={`w-6 h-6 animate-spin mb-3 ${isDark ? "text-neon-cyan" : "text-black"}`} />
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 animate-pulse">
                      RESOLVING_PRESENTATION_TILES...
                    </span>
                  </div>
                )}

                {error && (
                  <div className="p-3 border border-red-500/10 bg-red-500/5 rounded-lg text-center">
                    <p className="text-[10px] font-mono text-red-400 mb-3">{error}</p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setIsEditMode(true);
                          setError(null);
                        }}
                        className="px-2.5 py-1 font-mono text-[9px] uppercase border border-red-400/25 text-red-300 hover:bg-red-400/10 transition-colors"
                      >
                        Adjust Presentation ID
                      </button>
                      <button
                        onClick={handleLoadSlides}
                        className="px-2.5 py-1 font-mono text-[9px] uppercase bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        Retry Link
                      </button>
                    </div>
                  </div>
                )}

                {/* Slider Showcase UI of logged-in API retrieved thumbnails */}
                {!isLoading && !error && slides.length > 0 && (
                  <div className="space-y-4">
                    {/* Responsive Slide frame container */}
                    <div className={`relative overflow-hidden aspect-video border rounded-lg group/slides bg-black flex items-center justify-center ${
                      isDark ? "border-terminal-border/20 shadow-2xl shadow-black/80" : "border-gray-200 shadow-xl shadow-black/5"
                    }`}>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeIndex}
                          src={slides[activeIndex].thumbnailUrl}
                          alt={`Slide page ${activeIndex + 1}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="w-full h-full object-contain select-none"
                        />
                      </AnimatePresence>

                      <button
                        onClick={handlePrev}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 transition-all cursor-pointer opacity-0 group-hover/slides:opacity-100 border border-white/5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 transition-all cursor-pointer opacity-0 group-hover/slides:opacity-100 border border-white/5"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/75 backdrop-blur-md rounded border border-white/5 text-[9px] font-mono text-white/80">
                        SLIDE {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Sub controls footer row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditMode(true)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[9.5px] uppercase transition-all ${
                            isDark 
                              ? "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/15" 
                              : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <Sliders className="w-3.5 h-3.5 text-gray-400" />
                          Swap Deck
                        </button>

                        <a
                          href={slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[9.5px] uppercase transition-all ${
                            isDark 
                              ? "bg-[#0b0e11] text-[#00f2ff]/80 hover:text-[#00f2ff] border border-neon-cyan/20 hover:bg-neon-cyan/5" 
                              : "bg-gray-50 text-black hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open origin
                        </a>
                      </div>

                      <div className="flex gap-1.5 overflow-x-auto max-w-[120px] sm:max-w-none py-1">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveIndex(idx);
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                              activeIndex === idx 
                                ? (isDark ? "bg-neon-cyan scale-125" : "bg-black scale-125") 
                                : (isDark ? "bg-white/20 hover:bg-white/40" : "bg-black/20 hover:bg-black/40")
                            }`}
                            title={`Go to slide page ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
