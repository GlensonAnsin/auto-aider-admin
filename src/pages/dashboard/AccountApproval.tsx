/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from 'react';
import { NavLink, useLoaderData } from 'react-router';

interface Shop {
  shopID: number;
  profileBG: string;
  shopName: string;
  ownerFirstName: string;
  ownerLastName: string;
  mobileNum?: string;
  creationDate?: string;
}

export default function AccountApproval() {
  const { res } = useLoaderData();
  const [unapprovedShops, setUnapprovedShops] = useState<Shop[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  useEffect(() => {
    const unapprovedShopsData: Shop[] = [];

    res.forEach((item: any) => {
      unapprovedShopsData.push({
        shopID: item.repair_shop_id,
        profileBG: item.profile_bg,
        shopName: item.shop_name,
        ownerFirstName: item.owner_firstname,
        ownerLastName: item.owner_lastname,
        mobileNum: item.mobile_num,
        creationDate: item.creation_date,
      });
    });

    setUnapprovedShops(unapprovedShopsData);
  }, [res]);

  // Filter shops based on search query
  const filteredShops = useMemo(() => {
    if (!searchQuery.trim()) {
      return unapprovedShops;
    }

    const query = searchQuery.toLowerCase();
    return unapprovedShops.filter((shop: Shop) => {
      const shopName = shop.shopName?.toLowerCase() || '';
      const ownerName = `${shop.ownerFirstName} ${shop.ownerLastName}`.toLowerCase();
      const shopID = shop.shopID.toString();
      const mobileNum = shop.mobileNum?.toLowerCase() || '';

      return (
        shopName.includes(query) || ownerName.includes(query) || shopID.includes(query) || mobileNum.includes(query)
      );
    });
  }, [unapprovedShops, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShops = filteredShops.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Pagination helpers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-3xl text-[#000B58] font-bold">
            Account Approval
          </h1>
          <p className="font-montserrat text-sm sm:text-base text-[#555] mt-2">
            Review and approve pending shop registrations
          </p>
        </div>

        {/* Stats Badge */}
        <div className="bg-[#000B58] text-white px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-montserrat text-xl font-bold">{filteredShops.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="input input-bordered flex items-center gap-2 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#333" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow font-montserrat text-sm sm:text-base text-[#333]"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="btn btn-ghost btn-xs btn-circle"
                title="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-montserrat text-sm text-[#333]">Per page:</label>
          <select
            className="select select-bordered bg-white font-montserrat text-sm sm:text-base w-24 text-[#333]"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      {filteredShops.length > 0 && (
        <div className="mb-4">
          <p className="font-montserrat text-sm text-[#555]">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredShops.length)} of {filteredShops.length}{' '}
            {searchQuery && `result(s)`}
          </p>
        </div>
      )}

      {/* Shop Cards Grid */}
      {currentShops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentShops.map((item: Shop) => (
            <div
              key={item.shopID}
              className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#eaeaea]"
            >
              <div className="card-body p-5">
                {/* Header with Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg p-3 flex-shrink-0" style={{ background: item.profileBG }}>
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
                  <div className="flex-1 min-w-0">
                    <h3 className="font-montserrat text-lg font-bold text-[#000B58] truncate" title={item.shopName}>
                      {item.shopName}
                    </h3>
                    <p className="font-montserrat text-xs text-[#555] mt-1">ID: #{item.shopID}</p>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-[#555]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <p className="font-montserrat text-sm text-[#333] truncate">
                      {item.ownerFirstName} {item.ownerLastName}
                    </p>
                  </div>
                  {item.mobileNum && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-[#555]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                      </svg>
                      <p className="font-montserrat text-sm text-[#555] truncate">{item.mobileNum}</p>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className="badge badge-warning gap-1 font-montserrat text-xs">
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

                {/* Action Button */}
                <NavLink
                  to={`/account-approval/${item.shopID}`}
                  className="btn btn-sm bg-[#000B58] hover:bg-[#000B58]/75 border-none text-white w-full font-montserrat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  View Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-box shadow-lg p-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-20 h-20 mx-auto text-[#ccc] mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <h3 className="font-montserrat text-xl font-bold text-[#333] mb-2">
            {searchQuery ? 'No matching shops found' : 'No pending approvals'}
          </h3>
          <p className="font-montserrat text-sm text-[#555] mb-4">
            {searchQuery
              ? 'Try adjusting your search terms or clear the search to see all pending shops.'
              : 'All shop registrations have been reviewed. New submissions will appear here.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="btn btn-sm bg-[#000B58] hover:bg-[#000B58]/75 border-none text-white font-montserrat"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredShops.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <div className="font-montserrat text-sm text-[#555]">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* First Page */}
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="btn btn-sm bg-white border-[#eaeaea] hover:bg-[#000B58] hover:text-white disabled:bg-[#f5f5f5] disabled:border-[#eaeaea] disabled:text-[#999]"
              title="First Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#333"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Previous Page */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm bg-white border-[#eaeaea] hover:bg-[#000B58] hover:text-white disabled:bg-[#f5f5f5] disabled:border-[#eaeaea] disabled:text-[#999]"
              title="Previous Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#333"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && goToPage(page)}
                disabled={page === '...' || page === currentPage}
                className={`btn btn-sm ${
                  page === currentPage
                    ? 'bg-[#000B58] text-white border-[#000B58]'
                    : 'bg-white text-[#333] border-[#eaeaea] hover:bg-[#000B58] hover:text-white'
                } ${
                  page === '...' ? 'cursor-default hover:bg-white hover:text-[#333]' : ''
                } disabled:bg-[#000B58] disabled:text-white disabled:border-[#000B58]`}
              >
                {page}
              </button>
            ))}

            {/* Next Page */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-sm bg-white border-[#eaeaea] hover:bg-[#000B58] hover:text-white disabled:bg-[#f5f5f5] disabled:border-[#eaeaea] disabled:text-[#999]"
              title="Next Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#333"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Last Page */}
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="btn btn-sm bg-white border-[#eaeaea] hover:bg-[#000B58] hover:text-white disabled:bg-[#f5f5f5] disabled:border-[#eaeaea] disabled:text-[#999]"
              title="Last Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#333"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
