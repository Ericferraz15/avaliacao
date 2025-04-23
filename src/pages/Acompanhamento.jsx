import { useState } from "react";
import {
  FiCalendar,
  FiTool,
  FiFilter,
  FiChevronUp,
  FiChevronDown,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";

// Áreas e cores correspondentes
const AREA_COLORS = {
  Usinagem: "#ED7D31",
  Caldeiraria: "#D0CECE",
  Conformação: "#0A15A4",
  "Eng.": "#FBAFE5",
  Qualidade: "#D7FFAF",
  "Jato/Pintura": "#00B0F0",
  "Serviço Ext.": "#E739DB",
  Supply: "#00CC99",
  "Mont/Decap": "#00FFFF",
  Ajustagem: "#BF9000",
  Expedição: "#92D050",
  Solda: "#FFFF00",
  Corte: "#000000",
  "Eng. Industrial": "#8735EB",
};

// Dados de exemplo com status
const mockData = [
  {
    id: 1,
    bu: "BU Araucária",
    pcs: "PCS-001",
    cliente: "Klabin",
    item: "Eixo Principal",
    dataEntrega: new Date(2025, 4, 5),
    dataReprog: null,
    status: "em_producao", // Novo campo status
    atividades: [
      {
        nome: "Troca de rolamentos",
        area: "Usinagem",
        inicio: new Date(2025, 4, 1),
        fim: new Date(2025, 4, 3),
        responsavel: "João Silva",
      },
    ],
  },
  {
    id: 2,
    bu: "BU Curitiba",
    pcs: "PCS-002",
    cliente: "Suzano",
    item: "Caldeira",
    dataEntrega: new Date(2025, 4, 10),
    dataReprog: new Date(2025, 4, 12), // Alterado para ficar atrasado
    status: "atrasado",
    atividades: [
      {
        nome: "Solda",
        area: "Caldeiraria",
        inicio: new Date(2025, 4, 1),
        fim: new Date(2025, 4, 1),
        responsavel: "Carlos",
      },
    ],
  },
  {
    id: 3,
    bu: "BU São Paulo",
    pcs: "PCS-003",
    cliente: "Eldorado",
    item: "Válvula de Controle",
    dataEntrega: new Date(2025, 4, 15),
    dataReprog: new Date(2025, 4, 13), // Adiantado
    status: "em_producao",
    atividades: [
      {
        nome: "Montagem",
        area: "Mont/Decap",
        inicio: new Date(2025, 4, 14),
        fim: new Date(2025, 4, 16),
        responsavel: "Ana",
      },
    ],
  },
  {
    id: 4,
    bu: "BU Araucária",
    pcs: "PCS-004",
    cliente: "Valmet Internal",
    item: "Rotor",
    dataEntrega: new Date(2025, 4, 20),
    dataReprog: null,
    status: "pausado",
    atividades: [
      {
        nome: "Balanceamento",
        area: "Usinagem",
        inicio: new Date(2025, 4, 18),
        fim: new Date(2025, 4, 19),
        responsavel: "Pedro",
      },
    ],
  },
  {
    id: 5,
    bu: "BU Curitiba",
    pcs: "PCS-005",
    cliente: "Klabin",
    item: "Bomba Hidráulica",
    dataEntrega: new Date(2025, 4, 25),
    dataReprog: null,
    status: "finalizado",
    atividades: [
      {
        nome: "Teste de Pressão",
        area: "Qualidade",
        inicio: new Date(2025, 4, 24),
        fim: new Date(2025, 4, 24),
        responsavel: "Mariana",
      },
    ],
  },
];

// Opções para os dropdowns
const buOptions = [...new Set(mockData.map((item) => item.bu))];
const clienteOptions = [...new Set(mockData.map((item) => item.cliente))];
const itemOptions = [...new Set(mockData.map((item) => item.item))];

// Cores para os status
const STATUS_COLORS = {
  em_producao: "bg-blue-100 text-blue-800",
  atrasado: "bg-red-100 text-red-800",
  pausado: "bg-yellow-100 text-yellow-800",
  finalizado: "bg-green-100 text-green-800",
};

const STATUS_LABELS = {
  em_producao: "Em Produção",
  atrasado: "Atrasado",
  pausado: "Pausado",
  finalizado: "Finalizado",
};

export default function Acompanhamento() {
  const [dateRange, setDateRange] = useState({
    start: new Date(2025, 4, 1),
    end: new Date(2025, 4, 30),
  });

  const [filters, setFilters] = useState({
    bu: "",
    pcs: "",
    cliente: "",
    item: "",
    area: "",
    status: "",
  });

  const [data, setData] = useState(mockData);
  const [showFilters, setShowFilters] = useState(false);

  // Contagem de status
  const statusCounts = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  const generateDateColumns = () => {
    const columns = [];
    const current = new Date(dateRange.start);

    while (current <= dateRange.end) {
      columns.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return columns;
  };

  const filteredData = data.filter((item) => {
    const today = new Date();
    const isAtrasado = item.dataReprog
      ? item.dataReprog > item.dataEntrega
      : false;

    // Verifica se o status atual corresponde ao filtro de status
    const statusMatch =
      filters.status === "" ||
      (filters.status === "atrasado" && isAtrasado) ||
      (filters.status !== "atrasado" && item.status === filters.status);

    return (
      (filters.bu === "" || item.bu === filters.bu) &&
      (filters.pcs === "" || item.pcs.includes(filters.pcs)) &&
      (filters.cliente === "" || item.cliente === filters.cliente) &&
      (filters.item === "" || item.item === filters.item) &&
      (filters.area === "" ||
        item.atividades.some((a) => a.area === filters.area)) &&
      item.dataEntrega >= dateRange.start &&
      item.dataEntrega <= dateRange.end &&
      statusMatch
    );
  });

  const handleAddReprog = (id) => {
    const item = data.find((item) => item.id === id);
    const defaultDate = new Date(item.dataEntrega);
    defaultDate.setDate(defaultDate.getDate() + 1);

    setData(
      data.map((item) =>
        item.id === id ? { ...item, dataReprog: defaultDate } : item
      )
    );
  };

  const handleUpdateReprog = (id, newDate) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, dataReprog: newDate } : item
      )
    );
  };

  const handleRemoveReprog = (id) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, dataReprog: null } : item
      )
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Acompanhamento de Manutenções</h1>

      {/* Resumo de Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-4 rounded-lg shadow ${STATUS_COLORS.em_producao}`}>
          <h3 className="font-bold text-lg">{STATUS_LABELS.em_producao}</h3>
          <p className="text-3xl font-bold">{statusCounts.em_producao || 0}</p>
          <p className="text-sm">Processos em andamento</p>
        </div>

        <div className={`p-4 rounded-lg shadow ${STATUS_COLORS.atrasado}`}>
          <h3 className="font-bold text-lg">{STATUS_LABELS.atrasado}</h3>
          <p className="text-3xl font-bold">
            {
              data.filter(
                (item) => item.dataReprog && item.dataReprog > item.dataEntrega
              ).length
            }
          </p>
          <p className="text-sm">Processos com atraso</p>
        </div>

        <div className={`p-4 rounded-lg shadow ${STATUS_COLORS.pausado}`}>
          <h3 className="font-bold text-lg">{STATUS_LABELS.pausado}</h3>
          <p className="text-3xl font-bold">{statusCounts.pausado || 0}</p>
          <p className="text-sm">Processos pausados</p>
        </div>

        <div className={`p-4 rounded-lg shadow ${STATUS_COLORS.finalizado}`}>
          <h3 className="font-bold text-lg">{STATUS_LABELS.finalizado}</h3>
          <p className="text-3xl font-bold">{statusCounts.finalizado || 0}</p>
          <p className="text-sm">Processos concluídos</p>
        </div>
      </div>

      {/* Botão para mostrar/ocultar filtros */}
      <div className="mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FiFilter />
          {showFilters ? (
            <>
              <FiChevronUp /> Ocultar Filtros
            </>
          ) : (
            <>
              <FiChevronDown /> Mostrar Filtros
            </>
          )}
        </button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
            {/* Dropdown BU */}
            <div>
              <label className="block text-sm font-medium mb-1">BU</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.bu}
                onChange={(e) => setFilters({ ...filters, bu: e.target.value })}
              >
                <option value="">Todos BUs</option>
                {buOptions.map((bu) => (
                  <option key={bu} value={bu}>
                    {bu}
                  </option>
                ))}
              </select>
            </div>

            {/* Input PCS */}
            <div>
              <label className="block text-sm font-medium mb-1">PCS</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={filters.pcs}
                onChange={(e) =>
                  setFilters({ ...filters, pcs: e.target.value })
                }
              />
            </div>

            {/* Dropdown Cliente */}
            <div>
              <label className="block text-sm font-medium mb-1">Cliente</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.cliente}
                onChange={(e) =>
                  setFilters({ ...filters, cliente: e.target.value })
                }
              >
                <option value="">Todos Clientes</option>
                {clienteOptions.map((cliente) => (
                  <option key={cliente} value={cliente}>
                    {cliente}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown Item */}
            <div>
              <label className="block text-sm font-medium mb-1">Item</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.item}
                onChange={(e) =>
                  setFilters({ ...filters, item: e.target.value })
                }
              >
                <option value="">Todos Itens</option>
                {itemOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Período */}
            <div>
              <label className="block text-sm font-medium mb-1">Período</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="flex-1 p-2 border rounded"
                  value={dateRange.start.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      start: new Date(e.target.value),
                    })
                  }
                />
                <input
                  type="date"
                  className="flex-1 p-2 border rounded"
                  value={dateRange.end.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      end: new Date(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            {/* Dropdown Área */}
            <div>
              <label className="block text-sm font-medium mb-1">Área</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.area}
                onChange={(e) =>
                  setFilters({ ...filters, area: e.target.value })
                }
              >
                <option value="">Todas áreas</option>
                {Object.keys(AREA_COLORS).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Todos Status</option>
                {Object.keys(STATUS_LABELS).map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão Limpar */}
            <div className="flex items-end">
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded"
                onClick={() =>
                  setFilters({
                    bu: "",
                    pcs: "",
                    cliente: "",
                    item: "",
                    area: "",
                    status: "",
                  })
                }
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legenda de Cores */}
      <div className="mb-6 p-4 bg-white border rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Legenda de Áreas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.entries(AREA_COLORS).map(([area, color]) => (
            <div key={area} className="flex items-center">
              <div
                className="w-4 h-4 mr-2 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border w-12">#</th>
              <th className="p-3 border min-w-[120px]">BU</th>
              <th className="p-3 border min-w-[100px]">PCS</th>
              <th className="p-3 border min-w-[150px]">Cliente</th>
              <th className="p-3 border min-w-[180px]">Item</th>
              <th className="p-3 border min-w-[100px]">Status</th>
              <th className="p-3 border min-w-[120px]">Data Entrega</th>
              <th className="p-3 border min-w-[140px]">Reprog.</th>
              {generateDateColumns().map((date) => (
                <th
                  key={date.toString()}
                  className="p-3 border text-center min-w-[100px]"
                >
                  {date.getDate()}/{date.getMonth() + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              const isAtrasado = item.dataReprog
                ? item.dataReprog > item.dataEntrega
                : false;
              const currentStatus = isAtrasado ? "atrasado" : item.status;

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{item.bu}</td>
                  <td className="p-2 border">{item.pcs}</td>
                  <td className="p-2 border">{item.cliente}</td>
                  <td className="p-2 border font-medium">{item.item}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${STATUS_COLORS[currentStatus]}`}
                    >
                      {STATUS_LABELS[currentStatus]}
                    </span>
                  </td>
                  <td className="p-2 border">{formatDate(item.dataEntrega)}</td>
                  <td className="p-2 border">
                    {item.dataReprog ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="date"
                          className={`flex-1 p-1 border rounded ${
                            isAtrasado
                              ? "text-red-500 border-red-200 bg-red-50"
                              : item.dataReprog < item.dataEntrega
                              ? "text-green-500 border-green-200 bg-green-50"
                              : ""
                          }`}
                          value={item.dataReprog.toISOString().split("T")[0]}
                          onChange={(e) =>
                            handleUpdateReprog(
                              item.id,
                              new Date(e.target.value)
                            )
                          }
                        />
                        <button
                          onClick={() => handleRemoveReprog(item.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Remover reprogramação"
                        >
                          <FiX />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddReprog(item.id)}
                        className="w-full p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center justify-center gap-2"
                      >
                        <FiRefreshCw size={14} />
                        Reprogramar
                      </button>
                    )}
                  </td>

                  {generateDateColumns().map((date) => {
                    const atividades = item.atividades.filter(
                      (a) => date >= a.inicio && date <= a.fim
                    );

                    return (
                      <td
                        key={date.toString()}
                        className="p-1 border align-top"
                      >
                        <div className="flex flex-col gap-1 min-h-[80px]">
                          {atividades.map((atividade, idx) => (
                            <div
                              key={idx}
                              className="p-2 text-xs rounded flex items-start"
                              style={{
                                backgroundColor: AREA_COLORS[atividade.area],
                                color:
                                  atividade.area === "Corte"
                                    ? "white"
                                    : "black",
                              }}
                            >
                              <FiTool
                                className="mr-1 flex-shrink-0"
                                size={12}
                              />
                              <span className="truncate">{atividade.nome}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
