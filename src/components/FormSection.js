import React from 'react';

const FormSection = ({ title, fields, values, onChange }) => {
  const handleFieldChange = (fieldName, value) => {
    onChange(title, fieldName, value);
  };

  // Extract the letter from the title (e.g., "A" from "A. Molecules & Redox Couples")
  const sectionLetter = title.split('.')[0];
  // Remove the letter and dot from the title (e.g., "Molecules & Redox Couples")
  const cleanTitle = title.substring(title.indexOf('.') + 1).trim();

  const getEssentialFields = () => {
    return fields.filter(field => field.essential).map(field => field.name);
  };

  const getCompletedEssentialFields = () => {
    const essentialFields = getEssentialFields();
    return essentialFields.filter(fieldName => values[fieldName] && values[fieldName].trim() !== '');
  };

  const essentialFieldsCount = getEssentialFields().length;
  const completedEssentialFields = getCompletedEssentialFields().length;
  const allEssentialFieldsCompleted = essentialFieldsCount === completedEssentialFields;

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-primary-600 font-semibold text-sm">{sectionLetter}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{cleanTitle}</h3>
        </div>
        
        {/* Progress indicator for essential fields */}
        {essentialFieldsCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Essential: {completedEssentialFields}/{essentialFieldsCount}
            </span>
            <div className={`w-3 h-3 rounded-full ${allEssentialFieldsCompleted ? 'bg-green-500' : 'bg-orange-400'}`} />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fields.map((field) => {
          const fieldName = field.name;
          const isEssential = field.essential;
          const hasValue = values[fieldName] && values[fieldName].trim() !== '';
          
          return (
            <div key={fieldName} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {fieldName}
                {isEssential && (
                  <span className="text-orange-500 ml-1" title="Essential field">*</span>
                )}
                {fieldName.includes('(') && (
                  <span className="text-gray-500 text-xs ml-1">
                    {fieldName.match(/\((.*?)\)/)?.[1]}
                  </span>
                )}
              </label>
              {fieldName.toLowerCase().includes('structure') || fieldName.toLowerCase().includes('reaction') ? (
                <textarea
                  className={`form-textarea h-20 ${isEssential && !hasValue ? 'border-orange-300 focus:border-orange-500 focus:ring-orange-500' : ''}`}
                  placeholder={`Enter ${fieldName.toLowerCase()}...${isEssential ? ' (essential)' : ''}`}
                  value={values[fieldName] || ''}
                  onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className={`form-input ${isEssential && !hasValue ? 'border-orange-300 focus:border-orange-500 focus:ring-orange-500' : ''}`}
                  placeholder={`Enter ${fieldName.toLowerCase()}...${isEssential ? ' (essential)' : ''}`}
                  value={values[fieldName] || ''}
                  onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                />
              )}
              {isEssential && !hasValue && (
                <p className="text-sm text-orange-600">This field is essential for a complete report</p>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {Object.values(values).filter(v => v && v.trim()).length} of {fields.length} fields completed
          </div>
          <div className="flex-1 max-w-xs ml-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.values(values).filter(v => v && v.trim()).length / fields.length) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
