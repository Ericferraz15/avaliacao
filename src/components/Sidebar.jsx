import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiBarChart2,
  FiDatabase,
  FiUsers,
  FiChevronRight,
  FiChevronLeft,
  FiTrendingUp, // Ícone para KPIs
} from "react-icons/fi";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className="bg-valmet-blue text-white h-screen fixed transition-all duration-300 z-20 flex flex-col"
      style={{ width: isCollapsed ? "4rem" : "16rem" }}
    >
      {/* Cabeçalho */}
      <div className="p-4 text-xl font-bold border-b border-valmet-orange flex justify-between items-center">
        {!isCollapsed && <span>Valmet</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:text-valmet-orange text-2xl transition-transform"
          title={isCollapsed ? "Expandir" : "Recolher"}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Links de Navegação */}
      <nav className="mt-4 flex-1">
        {/* Programação */}
        <Link
          to="/"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Programação"
        >
          <FiHome className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Programação
            </span>
          )}
        </Link>

        {/* Acompanhamento */}
        <Link
          to="/acompanhamento"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Acompanhamento"
        >
          <FiBarChart2 className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Acompanhamento
            </span>
          )}
        </Link>

        {/* KPIs (Novo item) */}
        <Link
          to="/kpis"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Indicadores (KPIs)"
        >
          <FiTrendingUp className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              KPIs
            </span>
          )}
        </Link>

        {/* Cadastros */}
        <Link
          to="/cadastros/bus"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Cadastros"
        >
          <FiDatabase className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Cadastros
            </span>
          )}
        </Link>

        {/* Usuários */}
        <Link
          to="/usuarios"
          className="flex py-3 px-4 hover:bg-valmet-orange items-center group transition-colors"
          title="Usuários"
        >
          <FiUsers className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 group-hover:translate-x-1 transition-transform">
              Usuários
            </span>
          )}
        </Link>
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-valmet-orange/30 text-sm">
        {!isCollapsed && (
          <div className="text-center text-white/70">v1.0.0</div>
        )}
      </div>
    </div>
  );
}
