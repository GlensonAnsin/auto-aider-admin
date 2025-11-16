import { useLoaderData, NavLink, useNavigate } from 'react-router';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { updateApprovalStatus } from '../../services/backendApi';
import { useState } from 'react';

export default function ViewAccountApproval() {
  const navigate = useNavigate();
  const { res } = useLoaderData();
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [rejectLoading, setRejectLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  const containerStyle = {
    width: '100%',
    height: window.innerWidth < 640 ? '300px' : window.innerWidth < 768 ? '400px' : '500px',
  };

  const center = {
    lat: parseFloat(res.latitude),
    lng: parseFloat(res.longitude),
  };

  const handleUpdateApprovalStatus = async (shopID: number, decision: string) => {
    try {
      if (decision === 'Approved') {
        setApproveLoading(true);
      } else {
        setRejectLoading(true);
        setShowRejectModal(false);
      }

      await updateApprovalStatus(shopID, decision);

      setAlert({
        type: 'success',
        message: decision === 'Approved' ? 'Shop approved successfully!' : 'Shop registration rejected',
      });

      alertTimer();
    } catch {
      setAlert({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });

      alertTimer();
    } finally {
      if (decision === 'Approved') {
        setApproveLoading(false);
      } else {
        setRejectLoading(false);
      }
    }
  };

  const alertTimer = () => {
    setTimeout(() => {
      setAlert(null);
      navigate('/account-approval');
    }, 2000);
  };

  return (
    <div className="pb-8">
      {/* Alert Notification */}
      {alert && (
        <div
          role="alert"
          className={`alert ${
            alert.type === 'success' ? 'alert-success' : 'alert-error'
          } fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 sm:w-auto max-w-md shadow-xl`}
        >
          {alert.type === 'success' ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-montserrat">{alert.message}</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-montserrat">{alert.message}</span>
            </>
          )}
        </div>
      )}

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-montserrat font-bold text-lg text-[#000B58] mb-4">Confirm Rejection</h3>
            <p className="font-montserrat text-base text-[#555] mb-6">
              Are you sure you want to reject <span className="font-bold">{res.shop_name}</span>? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setShowRejectModal(false)}
                className="btn bg-[#eaeaea] hover:bg-[#d5d5d5] border-none text-[#333] font-montserrat"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateApprovalStatus(res.repair_shop_id, 'Rejected')}
                disabled={rejectLoading}
                className="btn bg-[#780606] hover:bg-[#780606]/75 border-none text-white font-montserrat"
              >
                {rejectLoading ? <span className="loading loading-dots loading-sm"></span> : 'Confirm Rejection'}
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowRejectModal(false)}></div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <NavLink
          to="/account-approval"
          className="btn btn-circle btn-ghost hover:bg-[#000B58]/10"
          title="Back to Account Approval"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-[#000B58]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </NavLink>
        <div>
          <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-3xl text-[#000B58] font-bold">
            Shop Registration Review
          </h1>
          <p className="font-montserrat text-sm sm:text-base text-[#555] mt-1">
            Review and approve shop registration details
          </p>
        </div>
      </div>

      {/* Shop Header Card */}
      <div className="bg-gradient-to-r from-[#000B58] to-[#2A3A8E] rounded-box p-6 sm:p-8 shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div
            className="w-20 h-20 rounded-xl p-4 backdrop-blur-sm flex-shrink-0 border border-white"
            style={{ backgroundColor: res.profile_bg }}
          >
            <svg
              fill="#fff"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 253"
              className="w-full h-full"
            >
              <path d="M2,69c0,13.678,9.625,25.302,22,29.576V233H2v18h252v-18h-22V98.554c12.89-3.945,21.699-15.396,22-29.554v-8H2V69z M65.29,68.346c0,6.477,6.755,31.47,31.727,31.47c21.689,0,31.202-19.615,31.202-31.47c0,11.052,7.41,31.447,31.464,31.447 c21.733,0,31.363-20.999,31.363-31.447c0,14.425,9.726,26.416,22.954,30.154V233H42V98.594C55.402,94.966,65.29,82.895,65.29,68.346 z M254,54H2l32-32V2h189v20h-0.168L254,54z M167.877,202.446c0.13,1.168,0,2.551-0.303,3.849l-11.027-10.162l-9.946,10.854 l11.157,10.119c-1.297,0.432-2.551,0.735-3.849,0.735c-3.849,0.13-7.135-1.038-9.946-3.589c-2.811-2.681-4.324-5.795-4.454-9.643 c0-1.341,0.13-2.854,0.432-4.151l-2.681-2.551l-16.043-14.66L94.06,213.17c-1.643,2.205-4.195,3.719-7.135,3.719 c-4.757,0-8.605-3.849-8.605-8.605c0-2.551,0.995-4.887,2.941-6.53l28.195-29.233L92.417,156.91 c-1.341,0.605-2.854,0.908-4.151,0.908c-3.849,0.13-7.135-1.038-9.946-3.589s-4.324-5.665-4.454-9.514 c-0.13-1.168,0-2.551,0.303-3.849l11.157,10.119l9.86-10.811l-11.157-10.119c1.168-0.432,2.551-0.735,3.849-0.735 c3.849-0.13,7.135,1.038,9.946,3.589c2.811,2.508,4.324,5.795,4.454,9.643c0.13,1.297,0,2.551-0.303,3.849l17.557,16.087 l12.843-13.881l-19.2-16.908l17.427-19.849l49.341,43.417l-17.427,19.849l-19.719-17.384l-12.411,14.66l19.287,17.643 c1.297-0.432,2.551-0.735,3.849-0.735c3.849-0.13,7.135,1.038,9.946,3.589C166.277,195.397,167.79,198.511,167.877,202.446z"></path>
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-white mb-2">{res.shop_name}</h2>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="badge badge-lg bg-white/20 border-white/30 text-white font-montserrat">
                ID: #{res.repair_shop_id}
              </span>
              <span className="badge badge-lg badge-warning font-montserrat gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Pending Approval
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Owner Information Card */}
          <div className="card bg-white shadow-lg border border-[#eaeaea]">
            <div className="card-body p-6">
              <h3 className="font-montserrat text-xl font-bold text-[#000B58] mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Owner Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-montserrat text-sm font-semibold text-[#555] mb-1 block">First Name</label>
                  <p className="font-montserrat text-base text-[#333] bg-[#f9f9f9] p-3 rounded-lg">
                    {res.owner_firstname}
                  </p>
                </div>
                <div>
                  <label className="font-montserrat text-sm font-semibold text-[#555] mb-1 block">Last Name</label>
                  <p className="font-montserrat text-base text-[#333] bg-[#f9f9f9] p-3 rounded-lg">
                    {res.owner_lastname}
                  </p>
                </div>
                <div>
                  <label className="font-montserrat text-sm font-semibold text-[#555] mb-1 block">Mobile Number</label>
                  <p className="font-montserrat text-base text-[#333] bg-[#f9f9f9] p-3 rounded-lg flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-[#000B58]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                    {res.mobile_num}
                  </p>
                </div>
                <div>
                  <label className="font-montserrat text-sm font-semibold text-[#555] mb-1 block">Shop ID</label>
                  <p className="font-montserrat text-base text-[#333] bg-[#f9f9f9] p-3 rounded-lg">
                    #{res.repair_shop_id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Offered Card */}
          <div className="card bg-white shadow-lg border border-[#eaeaea]">
            <div className="card-body p-6">
              <h3 className="font-montserrat text-xl font-bold text-[#000B58] mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
                Services Offered
              </h3>
              <div className="flex flex-wrap gap-2">
                {res.services_offered.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="text-base bg-[#000B58] p-2 rounded-lg text-white font-montserrat border-none"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Location Map Card */}
          <div className="card bg-white shadow-lg border border-[#eaeaea]">
            <div className="card-body p-6">
              <h3 className="font-montserrat text-xl font-bold text-[#000B58] mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                Shop Location
              </h3>
              <div className="bg-[#f9f9f9] p-3 rounded-lg mb-4">
                <p className="font-montserrat text-sm text-[#555]">
                  <span className="font-semibold">Coordinates:</span> {res.latitude}, {res.longitude}
                </p>
              </div>
              {loadError ? (
                <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-[#eaeaea] rounded-lg flex items-center justify-center flex-col">
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-3">
                    <path
                      d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 "
                      stroke="none"
                      fillRule="evenodd"
                      fill="#780606"
                    ></path>
                  </svg>
                  <p className="font-montserrat text-base text-[#780606]">Failed to load map</p>
                  <p className="font-montserrat text-sm text-[#999] mt-1">Please check your internet connection</p>
                </div>
              ) : isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                  mapContainerClassName="rounded-lg"
                >
                  <Marker position={center} />
                </GoogleMap>
              ) : (
                <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-[#eaeaea] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-[#000B58]"></span>
                    <p className="font-montserrat text-sm text-[#555] mt-3">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions Card */}
          <div className="card bg-white shadow-lg border border-[#eaeaea]">
            <div className="card-body p-6">
              <h3 className="font-montserrat text-lg font-bold text-[#000B58] mb-4">Review Actions</h3>

              {/* Approve Button */}
              <button
                onClick={() => handleUpdateApprovalStatus(res.repair_shop_id, 'Approved')}
                disabled={approveLoading || rejectLoading}
                className="btn btn-lg bg-[#28a745] hover:bg-[#218838] border-none text-white w-full font-montserrat mb-3 disabled:bg-[#999]"
              >
                {approveLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Approve Shop
                  </>
                )}
              </button>

              {/* Reject Button */}
              <button
                onClick={() => setShowRejectModal(true)}
                disabled={approveLoading || rejectLoading}
                className="btn btn-lg btn-outline border-[#780606] text-[#780606] hover:text-white hover:bg-[#780606] hover:border-[#780606] w-full font-montserrat disabled:bg-[#999] disabled:border-[#999]"
              >
                {rejectLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject Shop
                  </>
                )}
              </button>

              <div className="divider my-1"></div>

              {/* Info Box */}
              <div className="bg-[#f0f8ff] border border-[#b8daff] rounded-lg p-4">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-[#004085] flex-shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <div>
                    <p className="font-montserrat text-xs font-semibold text-[#004085] mb-1">Review Guidelines</p>
                    <p className="font-montserrat text-xs text-[#004085]">
                      Please verify all shop details, services, and location before approving. Rejections cannot be
                      undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Stats Card */}
          <div className="card bg-white shadow-lg border border-[#eaeaea]">
            <div className="card-body p-6">
              <h3 className="font-montserrat text-lg font-bold text-[#000B58] mb-4">Registration Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-[#eaeaea]">
                  <span className="font-montserrat text-sm text-[#555]">Shop ID</span>
                  <span className="font-montserrat text-sm font-semibold text-[#333]">#{res.repair_shop_id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#eaeaea]">
                  <span className="font-montserrat text-sm text-[#555]">Services Count</span>
                  <span className="font-montserrat text-sm font-semibold text-[#333]">
                    {res.services_offered.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-montserrat text-sm text-[#555]">Status</span>
                  <span className="badge badge-warning font-montserrat text-xs">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
