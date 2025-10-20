import { createBrowserRouter } from 'react-router';
import Login from '../pages/auth/Login';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Home from '../pages/dashboard/Home';
import AccountApproval from '../pages/dashboard/AccountApproval';
import ProtectedRoute from '../components/ProtectedRoute';
import { getAdminInfo, getAllUnAppShops } from '../services/backendApi';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          return { res: await getAdminInfo() };
        },
      },
      {
        path: 'account-approval',
        element: <AccountApproval />,
        loader: async () => {
          return { res: await getAllUnAppShops() };
        },
      },
    ],
  },
]);

export default router;
