import React, { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Briefcase, 
  ShieldCheck, 
  User, 
  Save 
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../features/services/serviceSlice";
import FormField from "./common/FormFiled";
import BackHeader from "./common/BackHeader";
import SectionHeader from "./common/SectionHeader";

const AddService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.services);

  const [formData, setFormData] = useState({
    serviceName: "",
    leadAuthority: "",
    teamLead: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.leadAuthority || !formData.serviceName) {
      alert("Lead Authority and Service Name are required");
      return;
    }
    try {
      await dispatch(addService(formData)).unwrap();
      alert("Service added successfully!");
      navigate("/service");
    } catch (error) {
      console.error(error);
      alert(error || "Error adding service");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <BackHeader to="/service" label="Back to Services"/>

      <div className="pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-white p-6 sm:p-10">
          <SectionHeader title="Add New Service" description=" Define a new service for the system catalog."/>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
                Service Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                <div className="md:col-span-2">
                  <FormField
                    label="Service Name"
                    name="serviceName"
                    icon={Briefcase}
                    placeholder="e.g. GST Filing, Consent to Establish"
                    value={formData.serviceName}
                    handleChange={handleChange}
                    required
                  />
                </div>
                <FormField
                  label="Lead Authority"
                  name="leadAuthority"
                  icon={ShieldCheck}
                  placeholder="e.g. CECB, Income Tax Dept"
                  value={formData.leadAuthority}
                  handleChange={handleChange}
                  required
                />
                <FormField
                  label="Team Lead"
                  name="teamLead"
                  icon={User}
                  placeholder="e.g. Vikas Thakur"
                  value={formData.teamLead}
                  handleChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-brand-blue text-white py-5 rounded-[22px] font-bold flex items-center justify-center gap-3 shadow-2xl shadow-brand-blue/30 hover:scale-[1.01] transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? "Creating..." : (
                  <>
                    <Save size={22} />
                    Create Service
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-10 text-xs font-bold text-gray-300 uppercase tracking-[4px]">
          System Service Catalog
        </p>
      </div>
    </div>
  );
};

export default AddService;
