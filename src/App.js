import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SectionSelector from './components/SectionSelector';
import FormSection from './components/FormSection';
import DownloadSection from './components/DownloadSection';
import { sectionsTemplate } from './data/sectionsTemplate';
import { generateWordDocument } from './utils/documentGenerator';

function App() {
  const [selectedSections, setSelectedSections] = useState(new Set());
  const [formValues, setFormValues] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleToggleSection = useCallback((section, isSelected) => {
    setSelectedSections(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(section);
        // Initialize form values for this section
        if (!formValues[section]) {
          setFormValues(prevValues => ({
            ...prevValues,
            [section]: {}
          }));
        }
      } else {
        newSet.delete(section);
        // Remove form values for this section
        setFormValues(prevValues => {
          const newValues = { ...prevValues };
          delete newValues[section];
          return newValues;
        });
      }
      return newSet;
    });
  }, [formValues]);

  const handleFieldChange = useCallback((section, field, value) => {
    setFormValues(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  }, []);

  const handleGenerateReport = async (reportData) => {
    if (selectedSections.size === 0) {
      alert('Please select at least one section before generating the report.');
      return;
    }

    setIsGenerating(true);
    try {
      await generateWordDocument(reportData);
      // Success notification could be added here
    } catch (error) {
      alert('Failed to generate the Word document. Please try again.');
      console.error('Document generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Convert selectedSections set to array for consistent ordering
  const selectedSectionsArray = Array.from(selectedSections).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Section Selector */}
          <SectionSelector
            sections={sectionsTemplate}
            selectedSections={selectedSections}
            onToggleSection={handleToggleSection}
          />

          {/* Dynamic Form Sections */}
          {selectedSectionsArray.length > 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Fill Out Your Report</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Complete the forms below for each selected section. You can leave fields empty if not applicable.
                </p>
              </div>

              {selectedSectionsArray.map((section) => (
                <FormSection
                  key={section}
                  title={section}
                  fields={sectionsTemplate[section]}
                  values={formValues[section] || {}}
                  onChange={handleFieldChange}
                />
              ))}
            </div>
          )}

          {/* Download Section */}
          <DownloadSection
            selectedSections={selectedSections}
            formValues={formValues}
            onGenerateReport={handleGenerateReport}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Built with React and deployed on GitHub Pages. 
              <a 
                href="https://github.com/rfb-data-hub/reporting-template" 
                className="text-primary-600 hover:text-primary-700 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                View source code
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
