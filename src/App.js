import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SectionSelector from './components/SectionSelector';
import FormSection from './components/FormSection';
import DownloadSection from './components/DownloadSection';
import { sectionsTemplate } from './data/sectionsTemplate';
import { generateBothReports } from './utils/documentGenerator';

function App() {
  // Move getEssentialSections outside of component or use useMemo
  const essentialSections = useMemo(() => {
    return Object.keys(sectionsTemplate).filter(section => sectionsTemplate[section].essential);
  }, []);

  // Load data from localStorage on initial load
  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem('flowBatteryReportData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        return {
          selectedSections: new Set(parsed.selectedSections || essentialSections),
          formValues: parsed.formValues || {},
          reportTitle: parsed.reportTitle || '',
          authorName: parsed.authorName || '',
          studyDate: parsed.studyDate || new Date().toISOString().split('T')[0],
          lastSaved: parsed.lastSaved || null
        };
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    // If no data in localStorage, initialize empty form values for essential sections
    const initialFormValues = {};
    essentialSections.forEach(section => {
      initialFormValues[section] = {};
    });
    
    return {
      selectedSections: new Set(essentialSections),
      formValues: initialFormValues,
      reportTitle: '',
      authorName: '',
      studyDate: new Date().toISOString().split('T')[0],
      lastSaved: null
    };
  }, [essentialSections]);

  // Only call loadFromLocalStorage once on mount
  const [initialData] = useState(() => loadFromLocalStorage());
  
  const [selectedSections, setSelectedSections] = useState(initialData.selectedSections);
  const [formValues, setFormValues] = useState(initialData.formValues);
  const [reportTitle, setReportTitle] = useState(initialData.reportTitle);
  const [authorName, setAuthorName] = useState(initialData.authorName);
  const [studyDate, setStudyDate] = useState(initialData.studyDate);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(initialData.lastSaved);
  const [showRestoreNotification, setShowRestoreNotification] = useState(false);

  // Show restore notification if data was loaded from localStorage
  useEffect(() => {
    if (initialData.lastSaved) {
      setShowRestoreNotification(true);
      const timer = setTimeout(() => setShowRestoreNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [initialData.lastSaved]);

  // Auto-save to localStorage
  const saveToLocalStorage = useCallback(async (sections, values, metadata) => {
    setIsSaving(true);
    try {
      const dataToSave = {
        selectedSections: Array.from(sections),
        formValues: values,
        reportTitle: metadata.reportTitle,
        authorName: metadata.authorName,
        studyDate: metadata.studyDate,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('flowBatteryReportData', JSON.stringify(dataToSave));
      setLastSaved(dataToSave.lastSaved);
      
      // Simulate a brief delay to show the spinner
      await new Promise(resolve => setTimeout(resolve, 750));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Auto-save whenever selectedSections or formValues change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedSections.size > 0 || Object.keys(formValues).length > 0) {
        saveToLocalStorage(selectedSections, formValues, { 
          reportTitle, 
          authorName, 
          studyDate 
        });
      }
    }, 300); // Save after 300ms of inactivity

    return () => clearTimeout(timeoutId);
  }, [selectedSections, formValues, reportTitle, authorName, studyDate, saveToLocalStorage]);

  // Clear localStorage function
  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem('flowBatteryReportData');
      
      // Reset all states to initial values
      const initialFormValues = {};
      essentialSections.forEach(section => {
        initialFormValues[section] = {};
      });
      
      setSelectedSections(new Set(essentialSections));
      setFormValues(initialFormValues);
      setReportTitle('');
      setAuthorName('');
      setStudyDate(new Date().toISOString().split('T')[0]);
      setLastSaved(null);
      
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
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
      await generateBothReports(reportData);
      // Success notification could be added here
    } catch (error) {
      alert('Failed to generate the reports. Please try again.');
      console.error('Document generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        lastSaved={lastSaved}
        onClearData={clearSavedData}
        isSaving={isSaving}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restore notification */}
        {showRestoreNotification && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-blue-800 mb-1">
                  Data restored from browser storage
                </h4>
                <p className="text-sm text-blue-700">
                  Your previous work has been automatically loaded from local browser storage. You can continue where you left off!
                </p>
              </div>
              <button
                onClick={() => setShowRestoreNotification(false)}
                className="text-blue-400 hover:text-blue-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

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
          <DownloadSection
            selectedSections={selectedSections}
            formValues={formValues}
            reportTitle={reportTitle}
            setReportTitle={setReportTitle}
            authorName={authorName}
            setAuthorName={setAuthorName}
            studyDate={studyDate}
            setStudyDate={setStudyDate}
            onGenerateReport={handleGenerateReport}
            isGenerating={isGenerating}
          />
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
