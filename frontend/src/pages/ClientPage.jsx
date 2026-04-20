import React, { useState, useEffect } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/clients/clientSlice";

import SearchBar from "../components/SearchBar";
import ClientDetailDrawer from "../components/ClientDetailDrawer";
import Table from "../components/Table";
import RenderRow from "../components/RenderRow";
import { clientColumns } from "../config/Columns";

const ClientPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const filteredClients = clients.filter(
    (item) =>
      item.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailId?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active": return "bg-green-50 text-green-600 border-green-100";
      case "Pending": return "bg-orange-50 text-orange-600 border-orange-100";
      case "Inactive": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const handleViewDetail = (client) => {
    setSelectedClient(client);
    setIsPanelOpen(true);
  };

  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }
    for (const i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const pages = getVisiblePages();

  return (
    <div className="relative space-y-6 animate-in fade-in duration-700 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <SearchBar
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => navigate("/client/create")}
          className="bg-brand-blue text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/30 hover:scale-[1.02] transition-all active:scale-[0.98] whitespace-nowrap"
        >
          <Plus size={20} /> Add Client
        </button>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm">
        <div className="overflow-x-auto">
          <Table
            renderRow={(item) => (
              <RenderRow
                key={item.id}
                client={item}
                onClick={() => handleViewDetail(item)}
              />
            )}
            columns={clientColumns}
            data={paginatedClients}
            loading={loading}
          />
        </div>

        <div className="px-8 py-6 bg-gray-50/30 flex items-center justify-between border-t border-gray-50">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-brand-blue transition-colors disabled:opacity-30 disabled:hover:text-gray-400"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <div className="flex items-center gap-2">
            {pages.map((page, idx) => (
              <button
                key={idx}
                onClick={() => (page !== "..." ? goToPage(page) : null)}
                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                  page === currentPage
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                    : page === "..." 
                    ? "text-gray-300 cursor-default"
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
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {isPanelOpen && selectedClient && (
        <ClientDetailDrawer
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          client={selectedClient}
          navigate={navigate}
          getStatusStyle={getStatusStyle}
        />
      )}
      
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
    </div>
  );
};

export default ClientPage;
