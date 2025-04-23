import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    <div className="flex min-h-screen bg-valmet-gray">
      <Sidebar />
      <div className="flex-1 transition-all duration-300 overflow-auto">
        <Header />
        <main className="p-6" style={{ 
          marginLeft: '4rem', // Largura da sidebar colapsada
          transition: 'margin-left 0.3s ease'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
