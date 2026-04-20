const SectionHeader = ({
  title,
  description,
  showLine = true,
  align = "left", // left | center
  className = "",
}) => {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""} ${className}`}>
      <h2 className="text-4xl font-black text-[#1B2559] tracking-tight mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-gray-400 font-medium text-lg">
          {description}
        </p>
      )}

      {showLine && (
        <div
          className={`h-1 w-20 bg-brand-blue rounded-full mt-4 ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
      )}
    </div>
  );
};

export default SectionHeader;