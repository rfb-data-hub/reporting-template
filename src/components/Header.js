import React, { useState, useEffect, useRef } from 'react';

const Header = ({ lastSaved, onClearData, isSaving = false }) => {
  const [indicatorFixed, setIndicatorFixed] = useState(false);
  const headerRef = useRef(null);
  const indicatorRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      // Prüfe ob der Indicator-Container sticky werden soll
      if (indicatorRef.current) {
        const containerRect = indicatorRef.current.getBoundingClientRect();
        // Wenn die Oberkante des Containers den oberen Bildschirmrand erreicht
        setIndicatorFixed(containerRect.top <= 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white" ref={headerRef}>
        {/* Main header content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-1 relative">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Interactive Reporting Template
            </h1>
            <div className="text-xl text-primary-100 max-w-4xl mx-auto mb-8">
              <p>
                This interactive reporting template for flow battery studies is based on the{' '}
                <a 
                  href="https://rfb-data-hub.github.io/experimental-guidelines/" 
                  className="text-white underline decoration-primary-200 hover:decoration-white transition-colors duration-200 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  community document on experimental guidelines
                </a>
                .{' '}
                Select relevant sections, fill out the form, and download a Word document and metadata file to support your manuscript.
              </p>
              <p className="mt-4 font-bold">Thank you for making flow battery research more transparent and reproducible!</p>
            </div>
          </div>
        </div>
      </div>

      {/* AutoSave Indicator Container - direkt unter dem Header */}
      {lastSaved && (
        <div 
          ref={indicatorRef}
          className={`bg-gradient-to-r from-primary-600 to-primary-800 transition-all duration-300 ${
            indicatorFixed ? 'sticky top-0 z-50 shadow-lg' : ''
          }`}
        >          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            indicatorFixed ? 'py-3' : 'py-3'
          }`}>
            {/* Sticky content - mit smooth transitions */}
            <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
              indicatorFixed ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
            }`}>
              {/* Header Title - left side */}
              <div className={`transition-all duration-500 ease-in-out ${
                indicatorFixed 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}>
                <h2 className="text-white font-semibold text-lg whitespace-nowrap">
                  Interactive Reporting Template
                </h2>
              </div>

              {/* AutoSave Indicator - right side */}
              <div className={`inline-flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm transition-all duration-500 ease-in-out ${
                indicatorFixed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                {isSaving ? (
                  <svg className="w-4 h-4 mr-2 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                <div className="text-white text-sm">
                  {isSaving ? 'Saving...' : 'Form Saved'} 
                  <span className="ml-2 text-xs text-white/70">{formatTime(lastSaved)}</span>
                </div>
                {onClearData && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) {
                        onClearData();
                      }
                    }}
                    className="ml-3 p-1 text-white/40 hover:text-red-400 hover:bg-red-600/30 rounded transition-colors duration-200"
                    title="Clear all saved data from browser storage"
                    type="button"
                  >
                    <svg 
                      className="w-3.5 h-3.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Badges - smooth hide/show transition */}
            <div className={`flex justify-center transition-all duration-500 ease-in-out ${
              indicatorFixed ? 'opacity-0 translate-y-2 h-0 overflow-hidden mb-0' : 'opacity-100 translate-y-0 h-auto mb-8'
            }`}>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  Word Export
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Metadata Export
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Local Auto Save
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
