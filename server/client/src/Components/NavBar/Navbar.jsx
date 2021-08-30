import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  console.log(state);
  const NavOption = () => {
    if (state) {
      console.log(state.role);
      if (state.role === "Teacher") {
        return (
          <>
            <Link
              to="/createclass"
              className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
            >
              Create Class
            </Link>

            <Link
              to="/classcreated"
              className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
            >
              Classes Created
            </Link>
            <Link
              to="/profile"
              className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
          </>
        );
      } else if (state.role === "Student") {
        return (
          <>
            <Link
              to="/joinclass"
              className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
            >
              Join Class
            </Link>

            <Link
              to="/classjoined"
              className=" hover:bg-gray-700  px-3 py-2 rounded-md text-sm font-medium"
            >
              Classes Joined
            </Link>

            <Link
              to="/profile"
              className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </Link>
          </>
        );
      }
    } else {
      console.log("oogrdfew")
      return (
        <>
          <Link
            to="/loginstudent"
            className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            LoginAsStudent
          </Link>
          <Link
            to="/loginteacher"
            className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            LoginAsTeacher
          </Link>

          <Link
            to="/signupstudent"
            className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            SignUpAsStudent
          </Link>
          <Link
            to="/signupteacher"
            className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            SignUpAsTeacher
          </Link>
        </>
      );
    }
  };
  useEffect(() => {}, [state]);

  return (
    <header className="bg-yellow-300 md:sticky top-0 z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          className="ml-3 text-xl title-font font-medium text-red mb-4 md:mb-0"
          to={"/"}
        >
          <h1> Online Classroom</h1>
        </Link>

        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <NavOption />
        </nav>
        {/* "inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0" */}

        <div className={` mr-0`}>
          <button
            className={`${
              state ? "" : "hidden "
            }bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/");
            }}
          >
            LogOut
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
