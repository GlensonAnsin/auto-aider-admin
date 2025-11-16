import Logo from '../assets/auto-aider-logo-white.png';
import { NavLink } from 'react-router';
import { clearTokens } from '../utils/tokenStorage';
import { useState } from 'react';

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await clearTokens();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navbar - Only visible on small screens */}
      <div className="lg:hidden bg-[#000B58] w-full shadow-lg sticky top-0 z-50">
        <div className="navbar px-4">
          <div className="flex-1">
            <img src={Logo} alt="logo" className="h-12 w-auto" />
            <span className="ml-3 font-montserrat text-lg font-semibold text-white">Admin Panel</span>
          </div>
          <div className="flex-none">
            <button
              className="btn btn-ghost btn-circle text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="bg-[#000B58] border-t border-white/10 shadow-lg">
            <ul className="menu menu-vertical w-full p-2">
              <li>
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="font-montserrat text-base">Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/car-owners"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <span className="font-montserrat text-base">Car Owners</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/repair-shops"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 3.348 3h17.304a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                    />
                  </svg>
                  <span className="font-montserrat text-base">Repair Shops</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/account-approval"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  <span className="font-montserrat text-base">Account Approval</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  <span className="font-montserrat text-base">Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Sidebar - Only visible on large screens */}
      <div className="hidden lg:block drawer-open h-full">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" defaultChecked />
        <div className="drawer-side h-full">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="is-drawer-close:w-20 is-drawer-open:w-64 bg-base-200 flex flex-col items-start h-full">
            <div className="bg-[#000B58] w-full p-4">
              <img src={Logo} alt="logo" width={150} height={150} className="mx-auto" />
              <h1 className="font-montserrat text-xl is-drawer-close:hidden text-center text-white mt-2">
                Admin Panel
              </h1>
            </div>

            <ul className="menu w-full grow bg-[#000B58]">
              <li>
                <NavLink
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right p-0 is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center hover:bg-white/10"
                  data-tip="Home"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="inline-block size-6 my-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="is-drawer-close:hidden font-montserrat text-base">Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/car-owners"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right p-0 is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center hover:bg-white/10"
                  data-tip="Car Owners"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="inline-block size-6 my-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <span className="is-drawer-close:hidden font-montserrat text-base">Car Owners</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/repair-shops"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right p-0 is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center hover:bg-white/10"
                  data-tip="Repair Shops"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="inline-block size-6 my-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 3.348 3h17.304a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                    />
                  </svg>
                  <span className="is-drawer-close:hidden font-montserrat text-base">Repair Shops</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/account-approval"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right p-0 is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center hover:bg-white/10"
                  data-tip="Account Approval"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="inline-block size-6 my-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                  <span className="is-drawer-close:hidden font-montserrat text-base">Account Approval</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  onClick={handleLogout}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right p-0 is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center hover:bg-white/10"
                  data-tip="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="inline-block size-6 my-1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  <span className="is-drawer-close:hidden font-montserrat text-base">Logout</span>
                </NavLink>
              </li>
            </ul>

            {/* button to open/close drawer */}
            <div
              className="p-2 w-full is-drawer-close:tooltip is-drawer-close:tooltip-right bg-[#000B58]"
              data-tip="Open"
            >
              <label
                htmlFor="my-drawer-4"
                className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180 hover:bg-white/10 border-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="inline-block size-6 my-1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
