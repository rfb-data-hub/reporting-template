import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SectionSelector from './components/SectionSelector';
import FormSection from './components/FormSection';
import DownloadSection from './components/DownloadSection';
import { sectionsTemplate } from './data/sectionsTemplate';
import { generateWordDocument } from './utils/documentGenerator';

function App() {
  // Move getEssentialSections outside of component or use useMemo
  const essentialSections = useMemo(() => {
    return Object.keys(sectionsTemplate).filter(section => sectionsTemplate[section].essential);
  }, []);

  const [selectedSections, setSelectedSections] = useState(new Set(essentialSections));
  const [formValues, setFormValues] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize form values for pre-selected essential sections
  useEffect(() => {
    const initialFormValues = {};
    essentialSections.forEach(section => {
      initialFormValues[section] = {};
    });
    setFormValues(initialFormValues);
  }, [essentialSections]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Step 1: Section Selection */}
          <SectionSelector
            sections={sectionsTemplate}
            selectedSections={selectedSections}
            onToggleSection={handleToggleSection}
          />

          {/* Step 2: Form Sections */}
          {selectedSections.size > 0 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-semibold text-sm">2</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Section Details</h2>
              </div>
              
              {Array.from(selectedSections)
                .sort((a, b) => a.localeCompare(b))
                .map((section) => (
                  <FormSection
                    key={section}
                    title={section}
                    fields={sectionsTemplate[section].fields}
                    values={formValues[section] || {}}
                    onChange={handleFieldChange}
                  />
                ))}
            </div>
          )}

          {/* Step 3: Download Section */}
          {selectedSections.size > 0 && (
            <DownloadSection
              selectedSections={selectedSections}
              formValues={formValues}
              onGenerateReport={handleGenerateReport}
              isGenerating={isGenerating}
            />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2025 Flow Battery Reporting Template. Open source project.
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/rfb-data-hub/reporting-template#readme" className="text-sm text-gray-500 hover:text-gray-700" target="_blank" rel="noopener noreferrer">Documentation</a>
              <a href="https://github.com/rfb-data-hub/reporting-template" className="text-sm text-gray-500 hover:text-gray-700" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://github.com/rfb-data-hub/reporting-template/issues" className="text-sm text-gray-500 hover:text-gray-700" target="_blank" rel="noopener noreferrer">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
