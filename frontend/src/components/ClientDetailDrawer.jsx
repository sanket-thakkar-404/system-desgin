import React from "react";
import {
  X,
  Phone,
  Mail,
  Building,
  Hash,
  MapPin,
  Calendar,
} from "lucide-react";

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 bg-[#F4F7FE]/60 p-4 rounded-2xl hover:bg-white transition">
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm">
      <Icon size={18} />
    </div>

    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-semibold text-[#1B2559]">
        {value || "--"}
      </p>
    </div>
  </div>
);

const ClientDetailDrawer = ({
  isOpen,
  onClose,
  client,
  navigate,
  getStatusStyle,
}) => {
  if (!isOpen || !client) return null;

  const {
    id,
    clientName,
    mobile,
    emailId,
    industry,
    address,
    createdAt,
    status,
  } = client;

  // 🔹 initials avatar
  const initials = clientName
    ? clientName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "--";

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl rounded-l-[40px] flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <X size={18} />
          </button>

          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle?.(
              status
            )}`}
          >
            {status || "Active"}
          </span>
        </div>

        {/* Profile */}
        <div className="p-6 flex items-center gap-4 border-b">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-blue-400 flex items-center justify-center text-white text-lg font-bold">
            {initials}
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#1B2559]">
              {clientName || "Unknown"}
            </h2>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Hash size={12} /> {id || "--"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
              Contact
            </h3>
            <DetailItem icon={Phone} label="Mobile" value={mobile} />
            <DetailItem icon={Mail} label="Email" value={emailId} />
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
              Business
            </h3>
            <DetailItem icon={Building} label="Industry" value={industry} />
            <DetailItem icon={Calendar} label="Created" value={createdAt} />
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">
              Location
            </h3>
            <DetailItem icon={MapPin} label="Address" value={address} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <button
            onClick={() =>
              navigate("/client/create", { state: { client } })
            }
            className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailDrawer;