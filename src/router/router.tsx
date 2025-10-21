import { createBrowserRouter } from 'react-router';
import Login from '../pages/auth/Login';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Home from '../pages/dashboard/Home';
import AccountApproval from '../pages/dashboard/AccountApproval';
import ProtectedRoute from '../components/ProtectedRoute';
import { getAdminInfo, getAllUnAppShops, getUnAppShopInfo } from '../services/backendApi';
import ViewAccountApproval from '../pages/dashboard/ViewAccountApproval';

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
      {
        path: 'account-approval/:shop_id',
        element: <ViewAccountApproval />,
        loader: async ({ params }) => {
          return { res: await getUnAppShopInfo(Number(params.shop_id)) };
        },
      },
    ],
  },
]);

export default router;
