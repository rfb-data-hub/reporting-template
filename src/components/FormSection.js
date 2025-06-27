import React from 'react';

const FormSection = ({ title, fields, values, onChange }) => {
  const handleFieldChange = (fieldName, value) => {
    onChange(title, fieldName, value);
  };

  const getRequiredFields = () => {
    return fields.filter(field => field.required).map(field => field.name);
  };

  const getCompletedRequiredFields = () => {
    const requiredFields = getRequiredFields();
    return requiredFields.filter(fieldName => values[fieldName] && values[fieldName].trim() !== '');
  };

  const requiredFieldsCount = getRequiredFields().length;
  const completedRequiredFields = getCompletedRequiredFields().length;
  const allRequiredFieldsCompleted = requiredFieldsCount === completedRequiredFields;

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        
        {/* Progress indicator for required fields */}
        {requiredFieldsCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Required: {completedRequiredFields}/{requiredFieldsCount}
            </span>
            <div className={`w-3 h-3 rounded-full ${allRequiredFieldsCompleted ? 'bg-green-500' : 'bg-orange-400'}`} />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fields.map((field) => {
          const fieldName = field.name;
          const isRequired = field.required;
          const hasValue = values[fieldName] && values[fieldName].trim() !== '';
          
          return (
            <div key={fieldName} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {fieldName}
                {isRequired && (
                  <span className="text-red-500 ml-1" title="Required field">*</span>
                )}
                {fieldName.includes('(') && (
                  <span className="text-gray-500 text-xs ml-1">
                    {fieldName.match(/\((.*?)\)/)?.[1]}
                  </span>
                )}
              </label>
              {fieldName.toLowerCase().includes('structure') || fieldName.toLowerCase().includes('reaction') ? (
                <textarea
                  className={`form-textarea h-20 ${isRequired && !hasValue ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={`Enter ${fieldName.toLowerCase()}...${isRequired ? ' (required)' : ''}`}
                  value={values[fieldName] || ''}
                  onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                  required={isRequired}
                />
              ) : (
                <input
                  type="text"
                  className={`form-input ${isRequired && !hasValue ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder={`Enter ${fieldName.toLowerCase()}...${isRequired ? ' (required)' : ''}`}
                  value={values[fieldName] || ''}
                  onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                  required={isRequired}
                />
              )}
              {isRequired && !hasValue && (
                <p className="text-sm text-red-600">This field is required</p>
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
