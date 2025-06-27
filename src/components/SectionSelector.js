import React from 'react';

const SectionSelector = ({ sections, selectedSections, onToggleSection }) => {
  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
          <span className="text-primary-600 font-semibold text-sm">1</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Template Sections</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Select the sections you need for your flow battery report. Each selected section will generate a form below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(sections).map((section) => (
          <label
            key={section}
            className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="form-checkbox mt-1"
              checked={selectedSections.has(section)}
              onChange={(e) => onToggleSection(section, e.target.checked)}
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors duration-200">
                {section}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                {sections[section].length} fields
              </p>
            </div>
          </label>
        ))}
      </div>
      
      {selectedSections.size > 0 && (
        <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-secondary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-secondary-800">
              {selectedSections.size} section{selectedSections.size !== 1 ? 's' : ''} selected
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionSelector;
