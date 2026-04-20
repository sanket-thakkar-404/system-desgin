const SaveButton = ({
  label,
  icon: Icon,
  type = "submit",
  fullWidth = true,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`
        ${fullWidth ? "w-full" : ""}
        bg-brand-blue text-white py-5 rounded-[22px]
        font-bold flex items-center justify-center gap-3
        shadow-2xl shadow-brand-blue/30
        hover:scale-[1.01] transition-all active:scale-[0.99]
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? (
        "Processing..."
      ) : (
        <>
          {Icon && <Icon size={22} />}
          {label}
        </>
      )}
    </button>
  );
};
export default SaveButton;
