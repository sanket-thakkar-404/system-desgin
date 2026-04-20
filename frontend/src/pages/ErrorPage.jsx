import { useRouteError, useNavigate } from "react-router";
import { AlertCircle, Home, RotateCcw } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F4F7FE] p-4 font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl shadow-gray-200/50 text-center border border-white">
        
        {/* Icon */}
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
          <AlertCircle size={40} className="text-red-500" />
        </div>

        {/* Text Area */}
        <h1 className="text-4xl font-black text-[#1B2559] mb-4 tracking-tight">
          Oops!
        </h1>
        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
          {error.statusText || error.message || "Something went wrong while loading this page. Please try again or return to dashboard."}
        </p>

        {/* Error Details (Optional Debug Info) */}
        {error.data && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-left border border-gray-100 italic text-xs text-gray-400">
             Error: {error.data}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-brand-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/30 hover:scale-[1.02] transition-all active:scale-[0.98]"
          >
            <Home size={20} />
            Back to Dashboard
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white text-gray-600 border border-gray-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
          >
            <RotateCcw size={20} />
            Try Refreshing
          </button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs font-bold text-gray-300 uppercase tracking-widest">
          System Error Logs
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;