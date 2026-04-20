import React from "react";
import { X, Phone, Mail, Hash, MapPin, ShieldCheck, User, Building, Zap } from "lucide-react";

const TeamDetailDrawer = ({ isOpen, onClose, member, navigate, getStatusStyle }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#F4F7FE] shadow-2xl animate-in slide-in-from-right duration-500">
        <div className="h-full flex flex-col bg-white rounded-l-[40px] border-l border-white overflow-y-auto">
          {/* Panel Header */}
          <div className="p-8 pb-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100/50 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(member.status)}`}
              >
                {member.status}
              </span>
            </div>
          </div>

          {/* Member Profile Summary */}
          <div className="px-8 pb-8 border-b border-gray-50 mt-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-indigo-600 to-blue-400 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-indigo-600/30">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#1B2559] leading-tight mb-1">
                  {member.name}
                </h2>
                <div className="flex items-center gap-2">
                    <p className="text-xs font-black text-brand-blue uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                        {member.role}
                    </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-[2px] mb-6">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <DetailItem
                  icon={Hash}
                  label="Employee ID"
                  value={member.id}
                />
                <DetailItem
                  icon={Phone}
                  label="Mobile Number"
                  value={member.phone}
                />
                <DetailItem
                  icon={Mail}
                  label="Email Address"
                  value={member.email}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-[2px] mb-6">
                Professional Details
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <DetailItem
                  icon={ShieldCheck}
                  label="Primary Role"
                  value={member.role}
                />
                <DetailItem
                  icon={Building}
                  label="Department"
                  value={member.department || "N/A"}
                />
                <DetailItem
                  icon={Zap}
                  label="Problem Solver For"
                  value={member.problemSolver || "N/A"}
                />
                <DetailItem
                  icon={MapPin}
                  label="Base Location"
                  value={member.location || "Corporate Office"}
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-auto p-8 flex gap-4 bg-gray-50/50">
            <button
              onClick={() =>
                navigate("/team/create", {
                  state: { member: member },
                })
              }
              className="flex-1 bg-brand-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 hover:scale-[1.02] transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component
const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 bg-[#F4F7FE]/50 p-4 rounded-2xl border border-transparent hover:border-brand-blue/5 transition-all">
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-[#1B2559]">{value}</p>
    </div>
  </div>
);

export default TeamDetailDrawer;
