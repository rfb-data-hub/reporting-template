import React, { useState, useEffect } from 'react';

const AutoSaveIndicator = ({ lastSaved, onClearData }) => {
  const [showSavingIndicator, setShowSavingIndicator] = useState(false);

  // Show "saving..." indicator briefly when lastSaved changes
  useEffect(() => {
    if (lastSaved) {
      setShowSavingIndicator(true);
      const timer = setTimeout(() => setShowSavingIndicator(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  if (!lastSaved) return null;

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex items-center space-x-3 z-50 group">
      <div className="flex items-center space-x-2">
        {showSavingIndicator ? (
          <>
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-sm">
              <div className="text-blue-600 font-medium">Saving...</div>
            </div>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <div className="text-gray-900 font-medium">
                Auto-saved <span className="text-gray-500 font-normal">{formatTime(lastSaved)}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {!showSavingIndicator && (
        <button
          onClick={onClearData}
          className="ml-1 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
          title="Clear saved data"
        >
          <svg className="w-4 h-4" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
      
      {/* Tooltip explaining data storage */}
      <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Data is automatically saved in your browser locally and persists after closing. Click the trash icon to clear all saved data from the browser cache.
      </div>
    </div>
  );
};

export default AutoSaveIndicator;
