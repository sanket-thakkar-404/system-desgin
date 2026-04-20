import React, { useEffect } from "react";
import { 
  Users, 
  Briefcase, 
  UserCircle, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/clients/clientSlice";
import { fetchServices } from "../features/services/serviceSlice";
// TeamMembers is still mock because there is no API/Slice for it yet.
import { TeamMembers } from "../MockData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { clients, loading: clientsLoading } = useSelector((state) => state.clients);
  const { services, loading: servicesLoading } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchServices());
  }, [dispatch]);

  const stats = [
    {
      label: "Total Clients",
      count: clients.length,
      icon: Users,
      color: "from-blue-600 to-blue-400",
      bg: "bg-blue-50",
      trend: "+12.5%",
      description: "Active business profiles"
    },
    {
      label: "Total Services",
      count: services.length,
      icon: Briefcase,
      color: "from-indigo-600 to-indigo-400",
      bg: "bg-indigo-50",
      trend: "+4.2%",
      description: "Service catalog items"
    },
    {
      label: "Team Members",
      count: TeamMembers.length,
      icon: UserCircle,
      color: "from-purple-600 to-purple-400",
      bg: "bg-purple-50",
      trend: "+2 new",
      description: "Staff & consultants"
    }
  ];

  const isLoading = clientsLoading || servicesLoading;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#1B2559] tracking-tight">
          System Overview
        </h1>
        <p className="text-gray-400 font-medium">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="group relative bg-white p-8 rounded-[35px] border border-transparent hover:border-brand-blue/10 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-500 cursor-default"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={28} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg border border-green-100 uppercase tracking-widest">
                <ArrowUpRight size={10} />
                {stat.trend}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-black uppercase tracking-[2px]">
                {stat.label}
              </p>
              <h2 className="text-4xl font-black text-[#1B2559] tracking-tighter">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  stat.count < 10 ? `0${stat.count}` : stat.count
                )}
              </h2>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <p className="text-[11px] font-bold text-gray-400 italic">
                    {stat.description}
                </p>
                <div className={`w-2 h-2 rounded-full animate-pulse bg-gradient-to-r ${stat.color}`} />
            </div>

            {/* Decorative background element */}
            <div className="absolute -bottom-2 -right-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <stat.icon size={120} />
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Quick Actions or Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <div className="bg-white p-8 rounded-[35px] border border-gray-50 flex flex-col justify-center min-h-[200px] relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-black text-[#1B2559] mb-2">Performance Metrics</h3>
                <p className="text-sm text-gray-400 font-medium">Real-time system health and synchronization status.</p>
                <div className="mt-6 flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                {i}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs font-bold text-brand-blue">View full report →</p>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-linear-to-l from-brand-blue/5 to-transparent flex items-center justify-center">
                  <TrendingUp size={80} className="text-brand-blue opacity-10 group-hover:scale-110 transition-transform duration-700" />
              </div>
          </div>

          <div className="bg-linear-to-br from-brand-blue to-indigo-700 p-8 rounded-[35px] text-white flex flex-col justify-center relative overflow-hidden shadow-xl shadow-brand-blue/20">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2">System Status</h3>
                <p className="text-white/70 text-sm font-medium italic">All services are currently operational.</p>
                <div className="mt-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[2px]">Cloud Synced</span>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
