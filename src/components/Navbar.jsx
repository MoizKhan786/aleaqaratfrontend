import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-white cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Real Estate App
        </div>
        <div className="text-amber-500 flex gap-5 md:gap-20 sm:gap-10 items-center">
          <h1
            className="hover:text-amber-500 cursor-pointer"
            onClick={() => {
              navigate("/list");
            }}
          >
            List Your Property
          </h1>
          <div className="text-amber-500">Welcome, {username || "User"}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
