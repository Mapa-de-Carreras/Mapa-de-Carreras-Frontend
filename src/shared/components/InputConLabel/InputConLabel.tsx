import { useState } from "react";
import { X } from "lucide-react";

interface InputConLabelProps {
  label: string;
  name: string;
  placeholder?: string;
  supportingText?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function InputConLabel({
  label,
  name,
  placeholder,
  supportingText,
  value = "",
  onChange,
}: InputConLabelProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onChange?.("");
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-500 text-sm mb-1">
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={name}
          name={name}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full border-b border-gray-400 focus:border-black outline-none py-1 pr-7 text-black bg-transparent"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-0 p-1 text-gray-600 hover:text-black"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {supportingText && (
        <p className="text-gray-400 text-xs mt-1">{supportingText}</p>
      )}
    </div>
  );
}
