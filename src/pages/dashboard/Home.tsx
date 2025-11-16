import { useLoaderData, NavLink } from 'react-router';
import { CartesianGrid, Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

export default function Home() {
  const { res1, res2, res3, res4, res5, res6 } = useLoaderData();

  const data1 = [
    { name: 'Jan', carOwners: res5.jan },
    { name: 'Feb', carOwners: res5.feb },
    { name: 'Mar', carOwners: res5.mar },
    { name: 'Apr', carOwners: res5.apr },
    { name: 'May', carOwners: res5.may },
    { name: 'Jun', carOwners: res5.jun },
    { name: 'Jul', carOwners: res5.jul },
    { name: 'Aug', carOwners: res5.aug },
    { name: 'Sep', carOwners: res5.sep },
    { name: 'Oct', carOwners: res5.oct },
    { name: 'Nov', carOwners: res5.nov },
    { name: 'Dec', carOwners: res5.dec },
  ];

  const data2 = [
    { name: 'Jan', shops: res6.jan },
    { name: 'Feb', shops: res6.feb },
    { name: 'Mar', shops: res6.mar },
    { name: 'Apr', shops: res6.apr },
    { name: 'May', shops: res6.may },
    { name: 'Jun', shops: res6.jun },
    { name: 'Jul', shops: res6.jul },
    { name: 'Aug', shops: res6.aug },
    { name: 'Sep', shops: res6.sep },
    { name: 'Oct', shops: res6.oct },
    { name: 'Nov', shops: res6.nov },
    { name: 'Dec', shops: res6.dec },
  ];

  // Calculate growth percentages for this month
  const currentMonthIndex = new Date().getMonth();
  const lastMonthCO = currentMonthIndex > 0 ? (Object.values(res5)[currentMonthIndex - 1] as number) : 0;
  const currentMonthCO = Object.values(res5)[currentMonthIndex] as number;
  const coGrowth = lastMonthCO > 0 ? (((currentMonthCO - lastMonthCO) / lastMonthCO) * 100).toFixed(1) : '0';

  const lastMonthRS = currentMonthIndex > 0 ? (Object.values(res6)[currentMonthIndex - 1] as number) : 0;
  const currentMonthRS = Object.values(res6)[currentMonthIndex] as number;
  const rsGrowth = lastMonthRS > 0 ? (((currentMonthRS - lastMonthRS) / lastMonthRS) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl text-[#000B58] font-bold">
            Welcome back, {res1.firstname}!
          </h1>
          <p className="font-montserrat text-sm sm:text-base text-gray-500 mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="card bg-gradient-to-br from-[#000B58] to-[#1a2670] text-white shadow-xl">
          <div className="card-body p-5 lg:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-montserrat opacity-80 uppercase tracking-wide mb-1">
                  Total Car Owners
                </p>
                <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-2">{res2.toLocaleString()}</h2>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <span className={`font-semibold ${Number(coGrowth) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {Number(coGrowth) >= 0 ? '↑' : '↓'} {Math.abs(Number(coGrowth))}%
                  </span>
                  <span className="opacity-70">vs last month</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-[#780606] to-[#a01010] text-white shadow-xl">
          <div className="card-body p-5 lg:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-montserrat opacity-80 uppercase tracking-wide mb-1">
                  Registered Shops
                </p>
                <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-2">{res3.toLocaleString()}</h2>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <span className={`font-semibold ${Number(rsGrowth) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {Number(rsGrowth) >= 0 ? '↑' : '↓'} {Math.abs(Number(rsGrowth))}%
                  </span>
                  <span className="opacity-70">vs last month</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 3.348 3h17.304a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl">
          <div className="card-body p-5 lg:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-montserrat opacity-80 uppercase tracking-wide mb-1">
                  Scans Today
                </p>
                <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-2">{res4.toLocaleString()}</h2>
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <span className="opacity-70">Active diagnostics</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NavLink
          to="/car-owners"
          className="card bg-white hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#000B58]"
        >
          <div className="card-body p-4 flex-row items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#000B58"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-montserrat text-sm text-gray-500">View All</p>
              <h3 className="font-montserrat text-base font-semibold text-[#000B58]">Car Owners</h3>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/repair-shops"
          className="card bg-white hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#780606]"
        >
          <div className="card-body p-4 flex-row items-center gap-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#780606"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 3.348 3h17.304a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-montserrat text-sm text-gray-500">View All</p>
              <h3 className="font-montserrat text-base font-semibold text-[#780606]">Repair Shops</h3>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/account-approval"
          className="card bg-white hover:shadow-lg transition-shadow border border-gray-200 hover:border-emerald-600"
        >
          <div className="card-body p-4 flex-row items-center gap-3">
            <div className="bg-emerald-50 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#059669"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-montserrat text-sm text-gray-500">Pending</p>
              <h3 className="font-montserrat text-base font-semibold text-emerald-700">Approvals</h3>
            </div>
          </div>
        </NavLink>

        <div className="card bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:shadow-lg transition-shadow">
          <div className="card-body p-4 flex-row items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
              </svg>
            </div>
            <div>
              <p className="font-montserrat text-sm opacity-80">System</p>
              <h3 className="font-montserrat text-base font-semibold">Analytics</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-white shadow-xl border border-gray-200">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-montserrat text-base sm:text-lg font-bold text-[#000B58]">
                  Car Owner Registrations
                </h2>
                <p className="font-montserrat text-xs sm:text-sm text-gray-500 mt-1">Past 12 months</p>
              </div>
              <div className="text-base bg-[#000B58] p-2 rounded-lg  bg-blue-50 text-[#000B58] border-none font-montserrat font-semibold">
                +{currentMonthCO} this month
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data1}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  labelClassName="font-montserrat text-[#000B58]"
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="carOwners" name="Registrations" fill="#000B58" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card bg-white shadow-xl border border-gray-200">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-montserrat text-base sm:text-lg font-bold text-[#780606]">
                  Repair Shop Registrations
                </h2>
                <p className="font-montserrat text-xs sm:text-sm text-gray-500 mt-1">Past 12 months</p>
              </div>
              <div className="text-base bg-[#000B58] p-2 rounded-lg  bg-red-50 text-[#780606] border-none font-montserrat font-semibold">
                +{currentMonthRS} this month
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  labelClassName="font-montserrat text-[#780606]"
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="shops" name="Registrations" fill="#780606" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
