import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function App() {
  return (
    <div className="flex min-h-screen bg-valmet-gray">
      <Sidebar />
      <div className="flex-1 ml-16 transition-all duration-300">
        <Header />
        <main className="p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
