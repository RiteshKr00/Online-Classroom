import React from "react";
import Teachersvg from "../../assets/teacher.svg";
const Home = () => {
  return (
    <div className=" md:h-screen">
      <div>
        <h1 className="p-12 font-medium text-2xl ">Online Classroom</h1>
      </div>
      <div className="flex md:flex-row flex-col justify-around">
        <img className="mx-auto max-w-md" src={Teachersvg} alt="dfsd" />

        <div className="m-auto ">
          <div className="h-80 max-w-sm bg-primary rounded-lg  shadow-lg my-8 px-10 md:px-20">
            <h2 className="text-2xl text-center pt-8 pb-5 	">
              Online Classroom
            </h2>
            <div className="flex justify-center item-center">
              <button
                className={
                  "w-40 my-4 py-2 px-4  bg-secondary hover:text-white rounded hover:bg-black    active:bg-secondary"
                }
              >
                Login
              </button>
            </div>{" "}
            <h3 className="text-center">Don't Have An Account?</h3>
            <div className="flex justify-center item-center">
              {" "}
              <br />
              <button
                className={
                  "w-40 my-4 py-2 px-4  bg-secondary hover:text-white rounded hover:bg-black    active:bg-secondary"
                }
              >
                Signup
              </button>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
