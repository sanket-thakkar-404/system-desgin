import React, { useState, useEffect } from "react";
import { getClients } from "../features/clients/services/client.service";

const GetClients = ({ onEdit }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getClients();
        console.log("API Response:", response);
        
        // Handle both cases: if response is directly the array or if it's an object with a 'data' key
        const rawData = Array.isArray(response) ? response : (response.data || []);
        
        // Transform the raw 2D array into objects
        const mappedClients = rawData.map((row, index) => ({
          id: index,
          clientCode: row[0],
          clientName: row[1],
          gstin: row[2],
          pan: row[3],
          industry: row[4],
          category: row[5],
          contactPerson: row[6],
          mobile: row[7],
          email: row[8],
          address: row[9],
          stateCode: row[10],
        }));

        setClients(mappedClients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const tableHeaderClasses = "px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50 sticky top-0";
  const tableDataClasses = "px-4 py-4 whitespace-nowrap text-sm text-gray-700 border-b border-gray-100";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[95%] mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Clients Directory
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and view all registered clients with their full details.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent shadow-md text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5">
              + Add New Client
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="shadow-2xl overflow-hidden border border-gray-200 sm:rounded-2xl bg-white">
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" className={tableHeaderClasses}>Code</th>
                        <th scope="col" className={tableHeaderClasses}>Client Name</th>
                        <th scope="col" className={tableHeaderClasses}>GSTIN</th>
                        <th scope="col" className={tableHeaderClasses}>PAN</th>
                        <th scope="col" className={tableHeaderClasses}>Industry</th>
                        <th scope="col" className={tableHeaderClasses}>Category</th>
                        <th scope="col" className={tableHeaderClasses}>Contact Person</th>
                        <th scope="col" className={tableHeaderClasses}>Mobile</th>
                        <th scope="col" className={tableHeaderClasses}>Email</th>
                        <th scope="col" className={tableHeaderClasses}>Address</th>
                        <th scope="col" className={tableHeaderClasses}>State Code</th>
                        <th scope="col" className={`${tableHeaderClasses} text-right`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan="12" className="px-6 py-10 text-center text-gray-500 italic">
                            Loading clients...
                          </td>
                        </tr>
                      ) : clients.length === 0 ? (
                        <tr>
                          <td colSpan="12" className="px-6 py-10 text-center text-gray-500 italic">
                            No clients found.
                          </td>
                        </tr>
                      ) : (
                        clients.map((client, index) => (
                          <tr key={client.id || index} className="hover:bg-blue-50/40 transition-colors duration-150">
                            <td className={tableDataClasses}>{client.clientCode || "N/A"}</td>
                            <td className={`${tableDataClasses} font-semibold text-blue-900`}>{client.clientName}</td>
                            <td className={tableDataClasses}>{client.gstin || "N/A"}</td>
                            <td className={tableDataClasses}>{client.pan || "N/A"}</td>
                            <td className={tableDataClasses}>
                              <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                                {client.industry || "N/A"}
                              </span>
                            </td>
                            <td className={tableDataClasses}>{client.category || "N/A"}</td>
                            <td className={tableDataClasses}>{client.contactPerson || "N/A"}</td>
                            <td className={tableDataClasses}>{client.mobile}</td>
                            <td className={tableDataClasses}>{client.email || "N/A"}</td>
                            <td className={`${tableDataClasses} max-w-xs truncate`} title={client.address}>
                              {client.address || "N/A"}
                            </td>
                            <td className={tableDataClasses}>{client.stateCode || "N/A"}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-100">
                              <button 
                                onClick={() => onEdit(client.clientCode)}
                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors mr-2 cursor-pointer"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetClients;
