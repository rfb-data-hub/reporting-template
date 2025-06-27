import React from 'react';

const FormSection = ({ title, fields, values, onChange }) => {
  const handleFieldChange = (field, value) => {
    onChange(title, field, value);
  };

  return (
    <div className="section-card">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field}
              {field.includes('(') && (
                <span className="text-gray-500 text-xs ml-1">
                  {field.match(/\((.*?)\)/)?.[1]}
                </span>
              )}
            </label>
            {field.toLowerCase().includes('structure') || field.toLowerCase().includes('reaction') ? (
              <textarea
                className="form-textarea h-20"
                placeholder={`Enter ${field.toLowerCase()}...`}
                value={values[field] || ''}
                onChange={(e) => handleFieldChange(field, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="form-input"
                placeholder={`Enter ${field.toLowerCase()}...`}
                value={values[field] || ''}
                onChange={(e) => handleFieldChange(field, e.target.value)}
              />
            )}
          </div>
        ))}
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
