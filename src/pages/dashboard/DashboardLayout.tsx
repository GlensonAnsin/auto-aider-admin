import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="bg-[#f2f4f7] w-full h-screen p-10">
        <Outlet />
      </main>
    </div>
  );
}
