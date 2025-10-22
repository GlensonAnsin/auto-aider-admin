import Logo from '../assets/auto-aider-logo-white.png';
import { NavLink } from 'react-router';
import { clearTokens } from '../utils/tokenStorage';

export default function Sidebar() {
  const handleLogout = async () => {
    await clearTokens();
  };

  return (
    <div className="drawer-open h-full">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" defaultChecked />
      <div className="drawer-side h-full">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="is-drawer-close:w-20 is-drawer-open:w-64 bg-base-200 flex flex-col items-start h-full">
          <div className="bg-[#000B58] w-full">
            <img src={Logo} alt="logo" width={150} height={150} className="justify-self-center" />
            <h1 className="font-montserrat text-xl is-drawer-close:hidden text-center">Admin Panel</h1>
          </div>

          <ul className="menu w-full grow bg-[#000B58]">
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right p-0 is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center hover:bg-white/10"
                data-tip="Home"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  className="inline-block size-9 my-1.5"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M9 20H7C5.89543 20 5 19.1046 5 18V10.9199C5 10.336 5.25513 9.78132 5.69842 9.40136L10.6984 5.11564C11.4474 4.47366 12.5526 4.47366 13.3016 5.11564L18.3016 9.40136C18.7449 9.78132 19 10.336 19 10.9199V18C19 19.1046 18.1046 20 17 20H15M9 20V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20M9 20H15"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <span className="is-drawer-close:hidden font-montserrat text-base">Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/account-approval"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right p-0 is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center hover:bg-white/10"
                data-tip="Account Approval"
              >
                <svg
                  fill="#ffffff"
                  viewBox="0 0 16.00 16.00"
                  id="request-send-16px"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                  strokeWidth="0.00016"
                  className="inline-block size-9 my-1.5"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      id="Path_44"
                      data-name="Path 44"
                      d="M-18,11a2,2,0,0,0,2-2,2,2,0,0,0-2-2,2,2,0,0,0-2,2A2,2,0,0,0-18,11Zm0-3a1,1,0,0,1,1,1,1,1,0,0,1-1,1,1,1,0,0,1-1-1A1,1,0,0,1-18,8Zm2.5,4h-5A2.5,2.5,0,0,0-23,14.5,1.5,1.5,0,0,0-21.5,16h7A1.5,1.5,0,0,0-13,14.5,2.5,2.5,0,0,0-15.5,12Zm1,3h-7a.5.5,0,0,1-.5-.5A1.5,1.5,0,0,1-20.5,13h5A1.5,1.5,0,0,1-14,14.5.5.5,0,0,1-14.5,15ZM-7,2.5v5A2.5,2.5,0,0,1-9.5,10h-2.793l-1.853,1.854A.5.5,0,0,1-14.5,12a.493.493,0,0,1-.191-.038A.5.5,0,0,1-15,11.5v-2a.5.5,0,0,1,.5-.5.5.5,0,0,1,.5.5v.793l1.146-1.147A.5.5,0,0,1-12.5,9h3A1.5,1.5,0,0,0-8,7.5v-5A1.5,1.5,0,0,0-9.5,1h-7A1.5,1.5,0,0,0-18,2.5v3a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5v-3A2.5,2.5,0,0,1-16.5,0h7A2.5,2.5,0,0,1-7,2.5Zm-7.854,3.646L-12.707,4H-14.5a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.191.038.506.506,0,0,1,.271.271A.5.5,0,0,1-11,3.5v3a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5V4.707l-2.146,2.147A.5.5,0,0,1-14.5,7a.5.5,0,0,1-.354-.146A.5.5,0,0,1-14.854,6.146Z"
                      transform="translate(23)"
                    ></path>{' '}
                  </g>
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
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                  className="inline-block size-9 my-1.5"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                      stroke="#ffffff"
                      strokeWidth="1.6799999999999997"
                      strokeLinecap="round"
                    ></path>{' '}
                    <path
                      d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                      stroke="#ffffff"
                      strokeWidth="1.6799999999999997"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{' '}
                  </g>
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
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="inline-block size-8 my-1.5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
