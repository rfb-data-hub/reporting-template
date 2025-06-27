import React, { useState } from 'react';

const DownloadSection = ({ selectedSections, formValues, onGenerateReport, isGenerating }) => {
  const [reportTitle, setReportTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [studyDate, setStudyDate] = useState(new Date().toISOString().split('T')[0]);
  
  const totalFields = Array.from(selectedSections).reduce((acc, section) => {
    return acc + (formValues[section] ? Object.keys(formValues[section]).length : 0);
  }, 0);
  
  const completedFields = Array.from(selectedSections).reduce((acc, section) => {
    if (!formValues[section]) return acc;
    return acc + Object.values(formValues[section]).filter(v => v && v.trim()).length;
  }, 0);
  
  const completionPercentage = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

  const handleDownload = () => {
    onGenerateReport({
      title: reportTitle || 'Flow Battery Study Report',
      author: authorName || 'Unknown Author',
      date: studyDate,
      selectedSections,
      formValues
    });
  };

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-secondary-600 font-semibold text-sm">2</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Download Report</h2>
      </div>

      {selectedSections.size === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414L11 4.414V15a1 1 0 11-2 0V4.414L7.707 5.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sections selected</h3>
          <p className="text-gray-500">Select at least one section above to enable report generation.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Report Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Title
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Flow Battery Study Report"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Study Date
              </label>
              <input
                type="date"
                className="form-input"
                value={studyDate}
                onChange={(e) => setStudyDate(e.target.value)}
              />
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Report Progress</h3>
              <span className="text-2xl font-bold text-primary-600">{completionPercentage}%</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Sections selected:</span>
                <span className="font-medium">{selectedSections.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Fields completed:</span>
                <span className="font-medium">{completedFields} of {totalFields}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              {completionPercentage < 100 && (
                <>Missing fields will be marked as "Not specified" in the report.</>
              )}
            </div>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`btn-primary flex items-center px-8 py-3 text-lg ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
              } transition-all duration-200`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Word Report
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadSection;
