import React from "react";

const RenderRow = ({ client, onClick }) => {
  const {
    id,
    clientName,
    industry,
    mobile,
    emailId,
  } = client;

  // 🔹 initials for avatar
  const initials = clientName
    ? clientName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "--";

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      {/* 🔹 Client Info */}
      <td className="px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-sm font-black">
            {initials}
          </div>

          {/* Name + Email */}
          <div>
            <p className="text-sm font-bold text-[#1B2559]">
              {clientName || "N/A"}
            </p>
            <p className="text-xs text-gray-400">
              {emailId || "No Email"}
            </p>
          </div>
        </div>
      </td>

      {/* 🔹 ID */}
      <td className="px-6 py-4 text-sm font-semibold text-gray-500">
        {id || "--"}
      </td>

      {/* 🔹 Industry */}
      <td className="px-6 py-4 text-sm text-[#1B2559]/70">
        {industry || "--"}
      </td>

      {/* 🔹 Mobile */}
      <td className="px-6 py-4 text-sm text-[#1B2559]/70">
        {mobile || "--"}
      </td>

      {/* 🔹 Action */}
      <td className="px-8 py-4 text-right">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition"
        >
          View Detail
        </button>
      </td>
    </tr>
  );
};

export default RenderRow;