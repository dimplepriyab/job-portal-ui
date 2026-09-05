import { useState, useRef, useEffect, useId } from "react";

const CookiePolicyInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const popoverId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={popoverId}
        className="group relative font-sans font-normal text-sm bg-transparent border-0 p-0 rounded-none cursor-pointer hover:text-white hover:!translate-y-0 hover:!shadow-none transition-colors duration-300"
      >
        <span className="relative z-10">Cookie Policy</span>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -inset-2"></div>
      </button>

      {isOpen && (
        <div
          id={popoverId}
          role="dialog"
          aria-label="Cookie Policy summary"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 sm:w-80 z-50 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-4 text-left animate-scaleIn"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-t-2xl"></div>

          <div className="flex items-start justify-between gap-3 mb-2">
            <h5 className="text-white font-semibold text-sm">Cookie Policy</h5>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close cookie policy popover"
              className="text-gray-400 hover:text-white transition-colors leading-none text-lg bg-transparent border-0 p-0"
            >
              &times;
            </button>
          </div>

          <p className="text-gray-300 text-xs leading-relaxed">
            We use cookies to keep you signed in, remember your preferences,
            and understand how you use JobPortal so we can improve your
            experience. You can control or disable cookies anytime in your
            browser settings.
          </p>

          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-800 border-b border-r border-gray-700 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default CookiePolicyInfo;
