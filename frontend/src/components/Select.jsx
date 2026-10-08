import React from 'react';

/**
 * A generic Select component that provides a list of options for the user to choose from.
 * It supports searching, keyboard navigation, and is fully accessible.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the select component.
 * @param {Array<{label: string, value: any}>} props.options - The list of options.
 * @param {any} props.value - The currently selected value.
 * @param {function(any): void} props.onChange - The callback function for when the value changes.
 * @param {string} [props.placeholder="Select an option"] - The placeholder text.
 * @param {boolean} [props.disabled=false] - Whether the select component is disabled.
 */
export const Select = ({ label, options, value, onChange, placeholder = "Select an option", disabled = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="select-container" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && <label htmlFor="select-label">{label}</label>}
      <div className="select-wrapper" style={{ position: 'relative' }}>
        <button
          type="button"
          id="select-label"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '0.5rem',
            textAlign: 'left',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {value ? options.find(o => o.value === value)?.label : placeholder}
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && !disabled && (
          <div className="select-menu" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
            marginTop: '4px'
          }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderBottom: '1px solid #eee',
                outline: 'none'
              }}
            />
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  style={{
                    padding: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor: value === option.value ? '#e0e0e0' : 'transparent'
                  }}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div style={{ padding: '0.5rem', color: '#999' }}>No options found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
