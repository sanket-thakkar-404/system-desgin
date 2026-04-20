import React, { useState, useEffect } from "react";
import { getClientById, editClients } from "../features/clients/services/client.service";

const EditClient = ({ clientId, onBack }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    gstin: "",
    pan: "",
    industry: "",
    category: "",
    contactPerson: "",
    mobile: "",
    email: "",
    address: "",
    stateCode: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await getClientById(clientId);
        const data = response.data; // This is the [col0, col1, ...] array
        
        if (data) {
          setFormData({
            clientName: data[1] || "",
            gstin: data[2] || "",
            pan: data[3] || "",
            industry: data[4] || "",
            category: data[5] || "",
            contactPerson: data[6] || "",
            mobile: data[7] || "",
            email: data[8] || "",
            address: data[9] || "",
            stateCode: data[10] || "",
          });
        }
      } catch (error) {
        console.error("Error fetching client for edit:", error);
        alert("Could not load client details");
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.clientName || !formData.mobile) {
      alert("Client Name and Mobile are required");
      return;
    }

    try {
      const res = await editClients(clientId, formData);
      console.log(res);
      alert("Client updated successfully!");
      onBack(); // Go back to the list
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Error updating client");
    }
  };

  if (loading) return <div className="text-center py-20">Loading Client Data...</div>;

  const inputClasses = "w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5 ml-1";

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans tracking-wide">
      <div className="bg-white/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-8 sm:p-10 w-full max-w-4xl border border-white/40">
        
        <div className="flex items-center mb-10">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
           ← 
          </button>
          <div className="text-left">
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 sm:text-4xl">
              Edit Client Details
            </h2>
            <p className="mt-1 text-sm text-gray-500 font-medium">
              Update the profile for client ID: {clientId}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
          {/* Client Name */}
          <div className="col-span-1">
            <label className={labelClasses}>Client Name <span className="text-red-500">*</span></label>
            <input
              name="clientName"
              placeholder="e.g. Acme Corp"
              value={formData.clientName}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Contact Person */}
          <div className="col-span-1">
            <label className={labelClasses}>Contact Person</label>
            <input
              name="contactPerson"
              placeholder="e.g. John Doe"
              value={formData.contactPerson}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Mobile */}
          <div className="col-span-1">
            <label className={labelClasses}>Mobile Number <span className="text-red-500">*</span></label>
            <input
              name="mobile"
              type="number"
              placeholder="+91 00000 00000"
              value={formData.mobile}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className={labelClasses}>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* GSTIN */}
          <div className="col-span-1">
            <label className={labelClasses}>GSTIN</label>
            <input
              name="gstin"
              placeholder="Ex: 22AAAAA0000A1Z5"
              value={formData.gstin}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* PAN */}
          <div className="col-span-1">
            <label className={labelClasses}>PAN</label>
            <input
              name="pan"
              placeholder="Ex: ABCDE1234F"
              value={formData.pan}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Industry */}
          <div className="col-span-1">
            <label className={labelClasses}>Industry</label>
            <input
              name="industry"
              placeholder="e.g. Technology, Retail"
              value={formData.industry}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Category */}
          <div className="col-span-1">
            <label className={labelClasses}>Category</label>
            <input
              name="category"
              placeholder="e.g. Premium, Standard"
              value={formData.category}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* State Code */}
          <div className="col-span-1 md:col-span-2">
            <label className={labelClasses}>State Code</label>
            <input
              name="stateCode"
              placeholder="e.g. 24 (Gujarat)"
              value={formData.stateCode}
              onChange={handleChange}
              className={`${inputClasses} md:w-1/2`}
            />
          </div>

          {/* Address */}
          <div className="col-span-1 md:col-span-2">
            <label className={labelClasses}>Full Address</label>
            <textarea
              name="address"
              placeholder="Enter complete billing or shipping address..."
              value={formData.address}
              onChange={handleChange}
              className={`${inputClasses} h-32 resize-none`}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-4 flex gap-4">
            <button
               type="button"
               onClick={onBack}
               className="w-1/3 py-4 px-4 rounded-xl border border-gray-300 text-lg font-bold text-gray-600 hover:bg-gray-50 transition-all font-sans"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 flex justify-center py-4 px-4 rounded-xl shadow-lg shadow-blue-500/30 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              Update Client Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClient;
