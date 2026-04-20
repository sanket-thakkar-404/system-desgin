import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const BackHeader = ({
  to = "/",
  label = "Back",
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`sticky top-0 z-20 py-6 bg-white -mx-4 px-4 ${className}`}>
      <button
        onClick={() => navigate(to)}
        className="flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold text-sm transition-colors group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        {label}
      </button>
    </div>
  );
};

export default BackHeader;