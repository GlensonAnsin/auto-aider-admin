import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />

      <main className="bg-[#f2f4f7] w-full h-full p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
