import React from "react";
import { Eye, Briefcase, User, ShieldCheck, Hash } from "lucide-react";

const RenderServiceRow = ({ service }) => {
  return (
    <tr key={service.id} className="hover:bg-gray-50/50 transition-colors group">
      <td className="px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/5 flex items-center justify-center text-brand-blue shadow-sm shadow-brand-blue/5">
            <Briefcase size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1B2559]">{service.serviceName}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
           <Hash size={14} />
           {service.id}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
            <ShieldCheck size={14} />
          </div>
          <p className="text-sm font-semibold text-[#1B2559]/70">{service.leadAuthority}</p>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
            <User size={14} />
          </div>
          <p className="text-sm font-semibold text-[#1B2559]/70">{service.teamLead}</p>
        </div>
      </td>
    </tr>
  );
};

export default RenderServiceRow;
