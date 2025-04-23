import { useState } from "react";
import FiltrableDropdown from "../components/FiltrableDropdown";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi"; // Ícones importados

const permissoes = ["Admin", "Gerente", "Supervisor", "Técnico"];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Admin", email: "admin@valmet.com", permissao: "Admin" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUsuario, setEditUsuario] = useState(null);
  const [filter, setFilter] = useState("");

  const handleSave = () => {
    if (editUsuario?.nome.trim() && editUsuario?.email.trim()) {
      if (editUsuario.id) {
        setUsuarios(
          usuarios.map((u) => (u.id === editUsuario.id ? editUsuario : u))
        );
      } else {
        setUsuarios([...usuarios, { ...editUsuario, id: Date.now() }]);
      }
      setIsModalOpen(false);
      setEditUsuario(null);
    }
  };

  return (
    <div className="ml-16 p-6 w-[calc(100%-4rem)]">
      {" "}
      {/* Layout expandido */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold whitespace-nowrap">Usuários</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Filtrar usuários..."
            className="border p-2 rounded h-10 flex-grow min-w-[200px]"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            onClick={() => {
              setEditUsuario({ nome: "", email: "", permissao: "Técnico" });
              setIsModalOpen(true);
            }}
            className="bg-valmet-blue text-white px-4 py-2 rounded h-10 hover:bg-blue-700 flex items-center gap-1"
          >
            <FiPlus className="w-4 h-4" />
            <span>Novo Usuário</span>
          </button>
        </div>
      </div>
      {/* Tabela com ícones */}
      <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                Permissão
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {usuarios
              .filter(
                (user) =>
                  user.nome.toLowerCase().includes(filter.toLowerCase()) ||
                  user.email.toLowerCase().includes(filter.toLowerCase())
              )
              .map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {usuario.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {usuario.permissao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-end gap-4">
                      {/* Ícone Editar */}
                      <button
                        onClick={() => {
                          setEditUsuario(usuario);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                        title="Editar usuário"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>

                      {/* Ícone Excluir */}
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Tem certeza que deseja remover este usuário?"
                            )
                          ) {
                            setUsuarios(
                              usuarios.filter((u) => u.id !== usuario.id)
                            );
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                        title="Remover usuário"
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editUsuario?.id ? "Editar Usuário" : "Novo Usuário"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md p-2"
                    value={editUsuario?.nome || ""}
                    onChange={(e) =>
                      setEditUsuario({ ...editUsuario, nome: e.target.value })
                    }
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-md p-2"
                    value={editUsuario?.email || ""}
                    onChange={(e) =>
                      setEditUsuario({ ...editUsuario, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permissão
                  </label>
                  <FiltrableDropdown
                    options={permissoes}
                    selected={editUsuario?.permissao || "Técnico"}
                    onSelect={(value) =>
                      setEditUsuario({ ...editUsuario, permissao: value })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditUsuario(null);
                  }}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-valmet-blue text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
