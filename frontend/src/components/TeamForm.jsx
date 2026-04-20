import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  ShieldCheck,
  MapPin,
  Save,
  Building,
  Zap,
} from "lucide-react";
import FormField from "./common/FormFiled";

const TeamForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.member;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    department: "",
    problemSolver: "",
  });

  // Pre-fill data if in Edit Mode
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        role: editData.role || "",
        location: editData.location || "",
        department: editData.department || "",
        problemSolver: editData.problemSolver || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      alert("Name, Email and Role are required");
      return;
    }

    if (editData) {
        console.log("Updating team member:", formData);
        alert("Member profile updated successfully!");
    } else {
        console.log("Creating team member:", formData);
        alert("Member registered successfully!");
    }

    navigate("/team");
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Sticky Top Header Buttons */}
      <div className="sticky top-0 z-20 py-6 bg-white -mx-4 px-4">
        <button
          onClick={() => navigate("/team")}
          className="flex items-center gap-2 text-gray-400 hover:text-brand-blue font-bold text-sm transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Team
        </button>
      </div>

      <div className="pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-white p-6 sm:p-10">
          {/* Header Title */}
          <div className="mb-12">
            <h2 className="text-4xl font-black text-[#1B2559] tracking-tight mb-3">
              {editData ? "Edit Member Profile" : "Add Team Member"}
            </h2>
            <p className="text-gray-400 font-medium text-lg">
              {editData 
                ? "Update the details for this team member." 
                : "Register a new member to the system team."}
            </p>
            <div className="h-1 w-20 bg-brand-blue rounded-full mt-4" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Personal Details */}
            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                <FormField
                  label="Full Name"
                  name="name"
                  icon={User}
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  handleChange={handleChange}
                  required
                />
                <FormField
                  label="Mobile Number"
                  name="phone"
                  icon={Phone}
                  placeholder="+91 00000 00000"
                  type="tel"
                  value={formData.phone}
                  handleChange={handleChange}
                  required
                />
                <FormField
                  label="Email Address"
                  name="email"
                  icon={Mail}
                  placeholder="rahul@example.com"
                  type="email"
                  value={formData.email}
                  handleChange={handleChange}
                  required
                />
                <FormField
                  label="Base Location"
                  name="location"
                  icon={MapPin}
                  placeholder="e.g. Mumbai, Delhi"
                  value={formData.location}
                  handleChange={handleChange}
                />
              </div>
            </div>

            {/* Section 2: Professional Role */}
            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2">
                Professional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                <FormField
                  label="Designation / Role"
                  name="role"
                  icon={ShieldCheck}
                  placeholder="e.g. Senior Accountant, Auditor"
                  value={formData.role}
                  handleChange={handleChange}
                  required
                />
                <FormField
                  label="Department"
                  name="department"
                  icon={Building}
                  placeholder="e.g. Accounts, Legal, IT"
                  value={formData.department}
                  handleChange={handleChange}
                />
                <div className="md:col-span-2">
                    <FormField
                    label="Problem Solver For"
                    name="problemSolver"
                    icon={Zap}
                    placeholder="e.g. Taxation & Audit, GST Appeals"
                    value={formData.problemSolver}
                    handleChange={handleChange}
                    />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-brand-blue text-white py-5 rounded-[22px] font-bold flex items-center justify-center gap-3 shadow-2xl shadow-brand-blue/30 hover:scale-[1.01] transition-all active:scale-[0.99]"
              >
                <Save size={22} />
                {editData ? "Update Member Profile" : "Register Team Member"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-10 text-xs font-bold text-gray-300 uppercase tracking-[4px]">
          Secure Team Access Control
        </p>
      </div>
    </div>
  );
};

export default TeamForm;
