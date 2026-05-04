import React from 'react';
import { Upload, X, FileText } from 'lucide-react';

function FileUpload({
  label,
  name,
  value,
  onChange,
  accept = 'image/*',
  required = false,
  helperText,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(name, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange(name, null);
  };

  return (
    <div style={{ width: '100%' }}>
      <label
        className={required ? 'label label--required' : 'label'}
      >
        {label}
      </label>

      {!value ? (
        <label
          htmlFor={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--sp-2)',
            padding: 'var(--sp-5)',
            border: '2px dashed var(--border)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-card)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--brand-accent)';
            e.currentTarget.style.backgroundColor = 'rgba(24, 119, 242, 0.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
          }}
        >
          <Upload size={24} style={{ color: 'var(--muted)' }} />
          <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--muted)' }}>
            Click to upload
          </span>
          <input
            id={name}
            name={name}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      ) : (
        <div
          style={{
            position: 'relative',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          {value.startsWith('data:application/pdf') ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-4)', color: 'var(--muted)' }}>
              <FileText size={32} />
              <span style={{ fontSize: 'var(--fs-sm)' }}>PDF document uploaded</span>
            </div>
          ) : (
            <img
              src={value}
              alt="Preview"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '200px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          )}
          <button
            type="button"
            onClick={handleClear}
            className="btn btn--ghost btn--icon"
            style={{
              position: 'absolute',
              top: 'var(--sp-2)',
              right: 'var(--sp-2)',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow-2)',
            }}
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {helperText && (
        <p className="helper-text">{helperText}</p>
      )}
    </div>
  );
}

export default FileUpload;
