import { useLoaderData } from 'react-router';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type { User } from '../../interfaces/user';

export default function CarOwners() {
  dayjs.extend(utc);
  const { res } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    const sortedUsers = [...res].sort((a: User, b: User) => b.user_id - a.user_id);

    if (!searchQuery.trim()) {
      return sortedUsers;
    }

    const query = searchQuery.toLowerCase();
    return sortedUsers.filter((user: User) => {
      const firstname = user.firstname?.toLowerCase() || '';
      const lastname = user.lastname?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const mobileNum = user.mobile_num?.toLowerCase() || '';
      const userId = user.user_id.toString();

      return (
        firstname.includes(query) ||
        lastname.includes(query) ||
        email.includes(query) ||
        mobileNum.includes(query) ||
        userId.includes(query)
      );
    });
  }, [res, searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

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
          <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-3xl text-[#000B58] font-bold">Car Owners</h1>
          <p className="font-montserrat text-sm sm:text-base text-[#555] mt-2">View all users and its details</p>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <div>
              <p className="font-montserrat text-xl font-bold">{filteredUsers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Items Per Page Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-4">
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
          </label>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-montserrat text-sm text-[#333]">Show:</label>
          <select
            className="select select-bordered bg-white font-montserrat text-sm sm:text-base w-24 text-[#333]"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="font-montserrat text-sm text-[#555]">
          Showing {filteredUsers.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{' '}
          {filteredUsers.length} entries
          {searchQuery && ` (filtered from ${res.length} total entries)`}
        </p>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white">
        <table className="table">
          <thead>
            <tr className="border-b-1 border-[#eaeaea]">
              <th className="font-montserrat text-sm sm:text-base text-[#333]">ID</th>
              <th className="font-montserrat text-sm sm:text-base text-[#333]">First Name</th>
              <th className="font-montserrat text-sm sm:text-base text-[#333]">Last Name</th>
              <th className="font-montserrat text-sm sm:text-base text-[#333]">Gender</th>
              <th className="font-montserrat text-sm sm:text-base text-[#333]">Email</th>
              <th className="font-montserrat text-sm sm:text-base text-[#333]">Mobile Number</th>
              <th className="font-montserrat text-sm sm:text-base text-[#333]">Date Created</th>
            </tr>
          </thead>
          <tbody className="divide-y-1 divide-[#eaeaea]">
            {currentUsers.length > 0 ? (
              currentUsers.map((item: User) => (
                <tr key={item.user_id}>
                  <td className="font-montserrat text-sm sm:text-base text-[#555]">{item.user_id}</td>
                  <td className="font-montserrat text-sm sm:text-base text-[#555]">{item.firstname}</td>
                  <td className="font-montserrat text-sm sm:text-base text-[#555]">{item.lastname}</td>
                  <td className="font-montserrat text-sm sm:text-base text-[#555]">{item.gender}</td>
                  <td className="font-montserrat text-sm sm:text-base text-[#555]">{item.email || 'N/A'}</td>
                  <td className="font-montserrat text-sm sm:text-base text-[#555]">{item.mobile_num}</td>
                  <td className="font-montserrat text-sm sm:text-base text-[#555]">
                    {dayjs(item.creation_date).utc(true).format('DD/MM/YYYY')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <p className="font-montserrat text-base text-[#555]">No car owners found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredUsers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <div className="font-montserrat text-sm text-[#555]">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
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
