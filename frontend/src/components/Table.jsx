import React from "react";

const Table = ({ columns, data, renderRow, loading }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          
          {/* Header */}
          <thead>
            <tr className="border-b border-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest ${col.className || ""}`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-8 py-20 text-center text-gray-400 font-bold"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
                    Loading Client...
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => renderRow(item))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-8 py-20 text-center text-gray-400 font-bold"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Table;