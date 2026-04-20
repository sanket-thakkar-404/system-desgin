import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

import { TeamMembers } from "../MockData";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import RenderTeamRow from "../components/RenderTeamRow";
import TeamDetailDrawer from "../components/TeamDetailDrawer";
import { teamMemberColumns } from "../config/Columns";

const TeamPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredMembers = TeamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);

  // Pagination Logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-600 border-green-100";
      case "Pending":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "Inactive":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const handleViewDetail = (member) => {
    setSelectedMember(member);
    setIsPanelOpen(true);
  };

  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="relative space-y-6 animate-in fade-in duration-700 h-full">
      {/* Search & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <SearchBar
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button 
          onClick={() => navigate('/team/create')}
          className="bg-brand-blue text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/30 hover:scale-[1.02] transition-all active:scale-[0.98] whitespace-nowrap"
        >
          <Plus size={20} /> Add Team Member
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-50 shadow-sm">
        <div className="overflow-x-auto">
          <Table
            renderRow={(item) => (
              <RenderTeamRow
                key={item.id}
                member={item}
                onClick={() => handleViewDetail(item)}
              />
            )}
            columns={teamMemberColumns}
            data={paginatedMembers}
            loading={loading}
          />
        </div>

        {/* Pagination Footer */}
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

      {/* Side Detail Panel (Drawer) */}
      <TeamDetailDrawer
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        member={selectedMember}
        navigate={navigate}
        getStatusStyle={getStatusStyle}
      />
    </div>
  );
};

export default TeamPage;
