import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  if (state) {
    if ((state.role = "Student")) {
      history.push("/classjoined");
    } else if (state.role === "Teacher") {
      history.push("/classcreated");
    }
  }
  return (
    <div>
      <div className="bg-blue-300 h-screen">
        <div className={"flex  py-8"}>
          <div className="w-full max-w-md bg-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
            <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
              Online Classroom
            </h2>
            <div>
              <h1 className="text-bold text-xl py-4">SignUp</h1>
              <Link
                to={"/signupstudent"}
                className={
                  "mx-2 my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
                }
              >
                As Student
              </Link>
              <Link
                to={"/signupteacher"}
                className={
                  "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
                }
              >
                As Teacher
              </Link>
            </div>
            <div>
              <h1 className="text-bold text-xl py-4">Login</h1>
              <Link
                to={"/loginstudent"}
                className={
                  "mx-2 my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
                }
              >
                As Student
              </Link>
              <Link
                to={"/loginteacher"}
                className={
                  "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
                }
              >
                As Teacher
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
