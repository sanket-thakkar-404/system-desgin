import React from "react";
import { Eye, Hash, ShieldCheck, User } from "lucide-react";

const RenderTeamRow = ({ member, onClick }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border-green-100";
      case "Pending":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "Inactive":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-black text-indigo-600 border-2 border-white shadow-sm">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1B2559]">{member.name}</p>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border mt-1 inline-block ${getStatusStyle(member.status)}`}>
              {member.role}
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
           <Hash size={14} />
           {member.id}
        </div>
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-[#1B2559]/70">{member.email}</p>
      </td>

      <td className="px-6 py-4 text-sm font-semibold text-[#1B2559]/70">
        {member.phone}
      </td>

      <td className="px-8 py-4 text-right">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95"
        >
          <Eye size={14} /> View Detail
        </button>
      </td>
    </tr>
  );
};

export default RenderTeamRow;
