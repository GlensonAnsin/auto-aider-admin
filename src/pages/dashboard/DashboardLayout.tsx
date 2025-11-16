import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />

      <main className="bg-[#f2f4f7] w-full h-full p-4 sm:p-6 md:p-8 lg:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
