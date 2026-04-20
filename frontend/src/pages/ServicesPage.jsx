import React, { useState, useEffect } from "react";
import { Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../features/services/serviceSlice";

import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import RenderServiceRow from "../components/RenderServiceRow";
import { serviceColumns } from "../config/Columns";

const ServicesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const filteredServices = services.filter(
    (service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="relative space-y-6 animate-in fade-in duration-700 h-full">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex-1 max-w-2xl">
          <SearchBar
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <button
            onClick={() => navigate("/service/assign")}
            className="flex-1 xl:flex-none border border-brand-blue/20 bg-brand-blue/5 text-brand-blue px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-blue/10 transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <UserPlus size={18} /> Assign Service
          </button>

          <button
            onClick={() => navigate("/service/create")}
            className="flex-1 xl:flex-none bg-brand-blue text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/30 hover:scale-[1.02] transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <Plus size={20} /> Add Service
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm">
        <div className="overflow-x-auto">
          <Table
            renderRow={(item) => (
              <RenderServiceRow
                key={item.id}
                service={item}
                onClick={() => console.log("View Service", item)}
              />
            )}
            columns={serviceColumns}
            data={paginatedServices}
            loading={loading}
          />
        </div>

        <div className="px-8 py-6 bg-gray-50/30 flex items-center justify-between border-t border-gray-50">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-brand-blue transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                  page === currentPage
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                    : "text-gray-400 hover:bg-white hover:text-brand-blue"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-brand-blue transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
      
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
    </div>
  );
};

export default ServicesPage;
