import React from 'react';

interface TextareaProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
    label,
    placeholder,
    value,
    onChange,
    rows = 4,
    error,
    errorMessage,
    helperText,
    disabled,
    required
}) => {
    return (
        <div className="mb-4">
            <label className={`block mb-2 ${required ? 'after:content-"*" after:text-red-500' : ''}`}>{label}</label>
            <textarea
                className={`w-full border rounded-md p-2 ${error ? 'border-red-500' : 'border-gray-300'} resize-none`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                disabled={disabled}
            />
            {helperText && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
            {error && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
            <span className="text-gray-500 text-sm mt-1">{value.length} characters</span>
        </div>
    );
};

export default Textarea;