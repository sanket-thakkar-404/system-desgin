import React from "react";

const FormField = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-[#1B2559] ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative group">
        {Icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Icon size={18} />
          </span>
        )}

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-[#F4F7FE] border-2 border-transparent focus:border-blue-200 focus:bg-white outline-none pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold transition-all text-[#1B2559] placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default FormField;
