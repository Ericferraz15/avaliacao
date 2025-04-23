export default function Header({ title = "Shopfloor Daily Control" }) {
  return (
    <header className="bg-white shadow-sm p-4 border-b flex justify-between items-center ml-16"> {/* Adicionei ml-16 */}
      <h1 className="text-xl font-semibold text-valmet-blue">{title}</h1>
      <div className="flex items-center space-x-4">
        <span className="text-valmet-dark">Usuário</span>
        <div className="w-8 h-8 rounded-full bg-valmet-gray"></div>
      </div>
    </header>
  );
}
