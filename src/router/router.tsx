import { createBrowserRouter } from 'react-router';
import Login from '../pages/auth/Login';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Home from '../pages/dashboard/Home';
import AccountApproval from '../pages/dashboard/AccountApproval';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'account-approval', element: <AccountApproval /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
