import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiCalendar, // Replacement for maintenance/schedule icon
  FiBarChart2,
  FiClipboard, // Replacement for registration icon
  FiUsers,
  FiChevronRight,
  FiChevronLeft,
  FiTrendingUp,
} from "react-icons/fi";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className="bg-valmet-blue text-white h-screen fixed transition-all duration-300 z-20 flex flex-col"
      style={{ width: isCollapsed ? "4rem" : "16rem" }}
    >
      {/* Header */}
      <div className="p-4 text-xl font-bold border-b border-valmet-orange flex justify-between items-center">
        {!isCollapsed && <span>Valmet</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:text-valmet-orange text-2xl transition-transform"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex-1">
        {/* Scheduling */}
        <Link
          to="/"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Scheduling"
        >
          <FiCalendar className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Scheduling
            </span>
          )}
        </Link>

        {/* Monitoring */}
        <Link
          to="/acompanhamento"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Monitoring"
        >
          <FiBarChart2 className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Monitoring
            </span>
          )}
        </Link>

        {/* KPIs */}
        <Link
          to="/kpis"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="KPIs"
        >
          <FiTrendingUp className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              KPIs
            </span>
          )}
        </Link>

        {/* Registrations */}
        <Link
          to="/cadastros/bus"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Registrations"
        >
          <FiClipboard className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Registrations
            </span>
          )}
        </Link>

        {/* Users */}
        <Link
          to="/usuarios"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Users"
        >
          <FiUsers className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Users
            </span>
          )}
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-valmet-orange/30 text-sm">
        {!isCollapsed && (
          <div className="text-center text-white/70">v1.0.0</div>
        )}
      </div>
    </div>
  );
}
