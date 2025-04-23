import { FiTrendingUp, FiBarChart2, FiCalendar } from 'react-icons/fi';

export default function KPIs() {
  return (
    <div className="ml-16 p-6 w-[calc(100%-4rem)]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FiTrendingUp className="text-valmet-orange" />
          Indicadores de Performance
        </h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        <FiBarChart2 className="mx-auto text-4xl mb-4" />
        <p>Página de KPIs em construção</p>
        <p className="text-sm">(Dados serão exibidos aqui)</p>
      </div>
    </div>
  );
}
