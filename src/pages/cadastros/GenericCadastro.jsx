import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FiltrableDropdown from "../../components/FiltrableDropdown";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Ícones importados

const tiposCadastro = [
  { value: "bus", label: "BUs" },
  { value: "clientes", label: "Clientes" },
  { value: "atividades", label: "Atividades" },
  { value: "itens", label: "Itens" },
];

export default function GenericCadastro() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Dados mockados
  const mockData = {
    bus: ["BU Araucária", "BU Curitiba"],
    clientes: ["Valmet Internal", "Klabin", "Suzano"],
    atividades: ["Calibração", "Troca de Peças"],
    itens: ["Item 1", "Item 2"],
  };

  // Carrega dados conforme o tipo
  useEffect(() => {
    if (tipo && mockData[tipo]) {
      setItens(mockData[tipo]);
    } else {
      navigate("/cadastros/bus");
    }
  }, [tipo, navigate]);

  const handleSave = () => {
    if (editItem.trim()) {
      const newItems = [...itens];
      if (editIndex !== null) {
        newItems[editIndex] = editItem;
      } else {
        newItems.push(editItem);
      }
      setItens(newItems);
      setIsModalOpen(false);
    }
  };

  const sortedItems = [...itens]
    .filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );

  return (
    <div className="ml-16 p-6 w-[calc(100%-4rem)]">
      {/* Cabeçalho com Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full">
          <h2 className="text-xl font-semibold whitespace-nowrap">
            Cadastro de:
          </h2>
          <FiltrableDropdown
            options={tiposCadastro.map((t) => t.label)}
            selected={tiposCadastro.find((t) => t.value === tipo)?.label || ""}
            onSelect={(label) => {
              const novo = tiposCadastro.find((t) => t.label === label)?.value;
              if (novo) navigate(`/cadastros/${novo}`);
            }}
            className="min-w-[250px] w-full max-w-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            className="border p-2 rounded h-10 flex-grow min-w-[200px]"
            placeholder="Filtrar..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          {/* Botão de Ordenação */}
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="bg-gray-100 hover:bg-gray-200 border p-2 rounded h-10 min-w-[100px] flex items-center justify-center"
          >
            {sortOrder === "asc" ? "A-Z ↓" : "Z-A ↑"}
          </button>

          <button
            onClick={() => {
              setEditItem("");
              setEditIndex(null);
              setIsModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded h-10 whitespace-nowrap"
          >
            + Adicionar{" "}
            {tiposCadastro.find((t) => t.value === tipo)?.label.slice(0, -1)}
          </button>
        </div>
      </div>

      {/* Tabela com Ícones */}
      <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{item}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-end gap-4">
                    {/* Ícone de Edição */}
                    <button
                      onClick={() => {
                        setEditItem(item);
                        setEditIndex(index);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                      title="Editar"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>

                    {/* Ícone de Exclusão */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Confirmar remoção?`)) {
                          setItens(itens.filter((_, i) => i !== index));
                        }
                      }}
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                      title="Remover"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-medium mb-4">
              {editIndex !== null ? "Editar" : "Adicionar"}{" "}
              {tiposCadastro.find((t) => t.value === tipo)?.label.slice(0, -1)}
            </h3>
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
              value={editItem}
              onChange={(e) => setEditItem(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder={`Nome do ${tiposCadastro
                .find((t) => t.value === tipo)
                ?.label.slice(0, -1)}`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
