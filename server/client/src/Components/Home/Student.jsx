import React from "react";
import { Link } from "react-router-dom";
import Studentsvg from "../../assets/children.svg";

const Student = () => {
  return (
    <div className=" md:h-screen">
      <div>
        <h1 className="p-12 font-medium text-2xl ">
          {" "}
          <Link to={"/"}>Online Classroom</Link>
        </h1>
      </div>
      <div className="flex md:flex-row flex-col justify-around">
        <img className="mx-auto max-w-md" src={Studentsvg} alt="dfsd" />

        <div className="m-auto ">
          <div className="h-80 max-w-sm bg-primary rounded-lg  shadow-lg my-8 px-10 md:px-20">
            <h2 className="text-2xl text-center pt-8 pb-5 	">Student</h2>
            <div className="flex justify-center item-center">
              <Link
                to={"/loginstudent"}
                className={
                  "w-40 my-4 py-2 px-4  bg-secondary hover:text-white rounded hover:bg-black    active:bg-secondary"
                }
              >
                Login
              </Link>
            </div>{" "}
            <h3 className="text-center">Don't Have An Account?</h3>
            <div className="flex justify-center item-center">
              {" "}
              <br />
              <Link
                to={"/signupstudent"}
                className={
                  "w-40 my-4 py-2 px-4  bg-secondary hover:text-white rounded hover:bg-black    active:bg-secondary"
                }
              >
                Signup
              </Link>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
