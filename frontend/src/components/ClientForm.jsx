import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  User,
  Phone,
  Mail,
  Building,
  Hash,
  MapPin,
  Globe,
  Tag,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addClient, updateClient } from "../features/clients/clientSlice";
import FormFiled from "./common/FormFiled";
import SaveButton from "./common/SaveButton";
import BackHeader from "./common/BackHeader";

const ClientForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.clients);
  
  const editData = location.state?.client;

  const [formData, setFormData] = useState({
    name: "",
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

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        gstin: editData.gstin || "",
        pan: editData.pan || "",
        industry: editData.industry || "",
        category: editData.category || "Premium",
        contactPerson: editData.contactPerson || "",
        mobile: editData.mobile || "",
        email: editData.email || "",
        address: editData.address || "",
        stateCode: editData.stateCode || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile) {
      alert("Client Name and Mobile are required");
      return;
    }

    try {
      if (editData) {
        await dispatch(updateClient({ id: editData.id, data: formData })).unwrap();
        alert("Client profile updated successfully!");
      } else {
        await dispatch(addClient(formData)).unwrap();
        alert("Client profile registered successfully!");
      }
      navigate("/client");
    } catch (error) {
      console.error("Form submission error:", error);
      alert(error || "Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <BackHeader to="/client" label="Back to Clients" />

      <div className="pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-white p-6">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-[#1B2559] tracking-tight mb-3">
              {editData ? "Edit Client Profile" : "Register Client"}
            </h2>
            <p className="text-gray-400 font-medium text-lg">
              {editData
                ? "Update the details for this client in the system."
                : "Create a new client profile in the system."}
            </p>
            <div className="h-1 w-20 bg-brand-blue rounded-full mt-4" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                <FormFiled
                  label="Client Name"
                  name="name"
                  icon={Building}
                  placeholder="e.g. Acme Corporation"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormFiled
                  label="Contact Person"
                  name="contactPerson"
                  icon={User}
                  placeholder="e.g. John Doe"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
                <FormFiled
                  label="Mobile Number"
                  name="mobile"
                  icon={Phone}
                  placeholder="+91 00000 00000"
                  type="number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                <FormFiled
                  label="Email Address"
                  name="email"
                  icon={Mail}
                  placeholder="john@acme.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
                Business Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                <FormFiled
                  label="GSTIN"
                  name="gstin"
                  icon={Hash}
                  placeholder="Ex: 22AAAAA0000A1Z5"
                  value={formData.gstin}
                  onChange={handleChange}
                />
                <FormFiled
                  label="PAN Card"
                  name="pan"
                  icon={Tag}
                  placeholder="Ex: ABCDE1234F"
                  value={formData.pan}
                  onChange={handleChange}
                />
                <FormFiled
                  label="Industry Type"
                  name="industry"
                  icon={Globe}
                  placeholder="e.g. Tech, Retail"
                  value={formData.industry}
                  onChange={handleChange}
                />
                <FormFiled
                  label="Client Category"
                  name="category"
                  icon={Tag}
                  placeholder="e.g. Premium, B2B"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
                Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                <FormFiled
                  label="State Code"
                  name="stateCode"
                  icon={MapPin}
                  placeholder="e.g. 24 (Gujarat)"
                  value={formData.stateCode}
                  onChange={handleChange}
                />
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-[#1B2559] ml-1">
                    Full Address
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-5 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                      <MapPin size={18} />
                    </span>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter complete office/billing address..."
                      className="w-full bg-[#F4F7FE] border-2 border-transparent focus:border-brand-blue/20 focus:bg-white outline-none pl-12 pr-4 py-4 rounded-2xl text-sm font-semibold transition-all text-[#1B2559] placeholder:text-gray-400 h-32 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <SaveButton
                label={editData ? "Update Client Details" : "Register Client Profile"}
                icon={Save}
                loading={loading}
              />
            </div>
          </form>
        </div>

        <p className="text-center mt-10 text-xs font-bold text-gray-300 uppercase tracking-[4px]">
          Secure System Registration
        </p>
      </div>
    </div>
  );
};

export default ClientForm;
