import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Users,
  Search,
  CheckCircle2,
  Briefcase,
  ShieldCheck,
  LayoutGrid,
  Zap,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/clients/clientSlice";
import { fetchServices, assignServiceToClient } from "../features/services/serviceSlice";
import BackHeader from "./common/BackHeader";

const AssignService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { clients, loading: clientsLoading } = useSelector((state) => state.clients);
  const { services, loading: servicesLoading } = useSelector((state) => state.services);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]); // Array of { serviceCode, serviceName, assignedTo }

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchServices());
  }, [dispatch]);

  // Transform internal data for this component's specific needs
  const clientOptions = clients.map((item) => ({ id: item.id, name: item.clientName })).filter((c) => c.id);
  const serviceOptions = services.map((item) => ({
    code: item.id,
    name: item.serviceName,
    teamMembers: item.teamLead,
  })).filter((s) => s.code);

  const handleClientChange = (e) => {
    setSelectedClientId(e.target.value);
  };

  const toggleService = (service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.serviceCode === service.code);
      if (exists) {
        return prev.filter((s) => s.serviceCode !== service.code);
      } else {
        return [
          ...prev,
          {
            serviceCode: service.code,
            serviceName: service.name,
            assignedTo: service.teamMembers || "Unassigned",
          },
        ];
      }
    });
  };

  const handleSelectAll = (filtered) => {
    if (selectedServices.length === filtered.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(
        filtered.map((s) => ({
          serviceCode: s.code,
          serviceName: s.name,
          assignedTo: s.teamMembers || "Unassigned",
        })),
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (assignLoading) return;

    const client = clientOptions.find((c) => c.id === selectedClientId);
    if (!selectedClientId || selectedServices.length === 0) {
      alert("Please select a Client and at least one Service");
      return;
    }

    try {
      setAssignLoading(true);
      const payload = {
        clientId: selectedClientId,
        clientName: client?.name || "",
        services: selectedServices,
      };
      await dispatch(assignServiceToClient(payload)).unwrap();
      alert(`${selectedServices.length} services assigned successfully!`);
      navigate("/service");
    } catch (error) {
      console.error(error);
      alert(error || "Error assigning services");
    } finally {
      setAssignLoading(false);
    }
  };

  const filteredServices = serviceOptions.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (clientsLoading || servicesLoading)
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-10 h-10 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
        <p className="text-gray-400 font-bold animate-pulse">Loading System Data...</p>
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col">
      <BackHeader to="/service" label="Back to Services" />

      <div className="pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-white p-6 sm:p-10">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-[#1B2559] tracking-tight mb-3">
              Bulk Service Assignment
            </h2>
            <p className="text-gray-400 font-medium text-lg">
              Map multiple services to a specific client profile.
            </p>
            <div className="h-1 w-20 bg-brand-blue rounded-full mt-4" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-50 pb-2 flex items-center gap-2">
                <Users size={14} /> 1. Target Client
              </h3>
              <div className="relative group">
                <label className="text-sm font-bold text-[#1B2559] ml-1 mb-2 block">
                  Assign To Client <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                     <Users size={20} />
                   </div>
                   <select
                    value={selectedClientId}
                    onChange={handleClientChange}
                    className="w-full bg-[#F4F7FE] border-2 border-transparent focus:border-brand-blue/20 focus:bg-white outline-none pl-12 pr-4 py-4 rounded-2xl text-sm font-bold transition-all text-[#1B2559] appearance-none cursor-pointer"
                  >
                    <option value="">-- Select Client Profile --</option>
                    {clientOptions.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-2">
                    <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                        <LayoutGrid size={14} /> 2. Select Services ({selectedServices.length})
                    </h3>
                    {filteredServices.length > 0 && (
                        <button
                        type="button"
                        onClick={() => handleSelectAll(filteredServices)}
                        className="text-[10px] font-black uppercase tracking-widest text-brand-blue hover:underline"
                        >
                        {selectedServices.length === filteredServices.length
                            ? "Deselect All"
                            : "Select All Filtered"}
                        </button>
                    )}
                </div>

              <div className="space-y-6">
                <div className="relative group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                     <Search size={18} />
                   </div>
                   <input
                    type="text"
                    placeholder="Search services by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#F4F7FE] border-2 border-transparent focus:border-brand-blue/20 focus:bg-white outline-none pl-12 pr-4 py-3.5 rounded-2xl text-sm font-semibold transition-all text-[#1B2559] placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar p-1">
                {filteredServices.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">
                    No services matching "{searchTerm}"
                    </div>
                ) : (
                    filteredServices.map((service) => {
                    const isSelected = selectedServices.some(
                        (s) => s.serviceCode === service.code,
                    );
                    return (
                        <div
                        key={service.code}
                        onClick={() => toggleService(service)}
                        className={`group p-4 rounded-3xl border-2 transition-all cursor-pointer select-none flex flex-col gap-3 h-full ${
                            isSelected
                            ? "bg-brand-blue border-brand-blue text-white shadow-xl shadow-brand-blue/20 translate-y-[-2px]"
                            : "bg-[#F4F7FE] border-transparent text-[#1B2559] hover:border-brand-blue/20 hover:bg-white"
                        }`}
                        >
                        <div className="flex items-start justify-between">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isSelected ? "bg-white/20" : "bg-white text-brand-blue shadow-sm"}`}>
                                <Briefcase size={16} />
                            </div>
                            {isSelected && <CheckCircle2 size={18} className="text-white" />}
                        </div>
                        
                        <div>
                            <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${isSelected ? "text-white/60" : "text-gray-400"}`}>
                                {service.code}
                            </p>
                            <p className="text-sm font-black leading-tight line-clamp-2">
                                {service.name}
                            </p>
                        </div>

                        <div className={`mt-auto flex items-center gap-2 pt-2 border-t ${isSelected ? "border-white/10" : "border-gray-50"}`}>
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isSelected ? "bg-white/20" : "bg-white text-indigo-400 shadow-sm"}`}>
                                <ShieldCheck size={12} />
                            </div>
                            <span className={`text-[9px] font-bold ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                                {service.teamMembers || "Global"}
                            </span>
                        </div>
                        </div>
                    );
                    })
                )}
                </div>
              </div>
            </div>

            <div className="pt-6">
                {selectedServices.length > 0 && selectedClientId && (
                    <div className="p-8 bg-brand-blue rounded-[32px] text-white mb-8 animate-in zoom-in-95 duration-300 shadow-2xl shadow-brand-blue/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap size={120} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-white/60 mb-4">
                                Assignment Overview
                            </h4>
                            <div className="space-y-1">
                                <p className="text-3xl font-black tracking-tight">
                                    {selectedServices.length} Services
                                </p>
                                <p className="text-white/70 font-bold">
                                    to be assigned to <span className="text-white underline decoration-2 underline-offset-4">{clientOptions.find((c) => c.id === selectedClientId)?.name}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full flex justify-center py-5 px-4 rounded-[22px] shadow-2xl shadow-brand-blue/30 text-lg font-black text-white bg-brand-blue hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    disabled={
                    !selectedClientId ||
                    selectedServices.length === 0 ||
                    assignLoading
                    }
                >
                    {assignLoading
                    ? "Processing Assignment..."
                    : `Assign ${selectedServices.length || ""} Selected Services`}
                </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-10 text-xs font-bold text-gray-300 uppercase tracking-[4px]">
          Bulk Mapping Controller
        </p>
      </div>
    </div>
  );
};

export default AssignService;
