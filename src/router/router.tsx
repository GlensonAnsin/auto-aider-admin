import { createBrowserRouter } from 'react-router';
import Login from '../pages/auth/Login';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Home from '../pages/dashboard/Home';
import AccountApproval from '../pages/dashboard/AccountApproval';
import ProtectedRoute from '../components/ProtectedRoute';
import {
  getAdminInfo,
  getAllUnAppShops,
  getUnAppShopInfo,
  getAllUsers,
  getAllShops,
  countAllCO,
  countAllRS,
  countScansToday,
  newlyRegisteredCO,
  newlyRegisteredRS,
} from '../services/backendApi';
import ViewAccountApproval from '../pages/dashboard/ViewAccountApproval';
import CarOwners from '../pages/dashboard/CarOwners';
import RepairShops from '../pages/dashboard/RepairShops';

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
          return {
            res1: await getAdminInfo(),
            res2: await countAllCO(),
            res3: await countAllRS(),
            res4: await countScansToday(),
            res5: await newlyRegisteredCO(),
            res6: await newlyRegisteredRS(),
          };
        },
      },
      {
        path: 'car-owners',
        element: <CarOwners />,
        loader: async () => {
          return { res: await getAllUsers() };
        },
      },
      {
        path: 'repair-shops',
        element: <RepairShops />,
        loader: async () => {
          return { res: await getAllShops() };
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
