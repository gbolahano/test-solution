/* eslint-disable no-unused-vars */

import { NavLink } from "react-router-dom";

export const MainNavbar = () => {
  return (
    <div className="bg-white py-3 w-auto border-gray-500 flex items-center min-w-max pr-6 shadow-lg px-10">
      <NavLink
        to="/"
        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-md p-2"
      >
        LetsDeel
      </NavLink>
      <nav className="flex space-x-4 mx-auto">
        <NavLink
          className="flex hover:underline underline-offset-4 decoration-sky-500 items-center text-gray-700 text-md"
          to="/"
        >
          <span className="whitespace-nowrap">My Contracts</span>
        </NavLink>

        <NavLink
          className="flex hover:underline underline-offset-4 decoration-sky-500 items-center text-gray-700 text-md"
          to="/jobs"
        >
          <span className="whitespace-nowrap">Jobs</span>
        </NavLink>
        <NavLink
          className="flex hover:underline underline-offset-4 decoration-sky-500 items-center text-gray-700 text-md"
          to="/best-profession"
        >
          <span className="whitespace-nowrap">Best profession</span>
        </NavLink>
        <NavLink
          className="flex hover:underline underline-offset-4 decoration-sky-500 items-center text-gray-700 text-md"
          to="/best-clients"
        >
          <span className="whitespace-nowrap">Best Clients</span>
        </NavLink>
      </nav>
    </div>
  );
};
