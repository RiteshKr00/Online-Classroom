import React, { useContext } from "react";
import Classsvg from "../../assets/classroom.svg";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
const Landing = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  if (state) {
    console.log(state.role);
    if (state.role === "Student") {
      history.push("/classjoined");
    } else if (state.role === "Teacher") {
      history.push("/classcreated");
    }
  }

  return (
    <div className=" md:h-screen">
      <div>
        <h1 className="p-12 font-medium text-2xl ">Online Classroom</h1>
      </div>
      <div className="flex md:flex-row flex-col justify-around">
        <img className="mx-auto max-w-md" src={Classsvg} alt="dfsd" />

        <div className="m-auto ">
          <div className="h-80 max-w-sm bg-primary rounded-lg  shadow-lg my-8 px-10 md:px-20">
            <h2 className="text-2xl text-center pt-8 pb-5 	">
              <Link to={"/"}>Online Classroom</Link>
            </h2>
            {/* <h3 className="text-center  pb-5 text-primary	">Teacher</h3>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Your Username"
                className={
                  "w-full p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
                }
              />
            </div> */}{" "}
            <h1 className="text-center">Enter As </h1>
            <div className="flex justify-center item-center">
              <Link
                to={"/student"}
                className={
                  "w-40 my-4 py-2 px-14  bg-secondary hover:text-white rounded hover:bg-black    active:bg-secondary"
                }
              >
                Student
              </Link>
            </div>{" "}
            <div className="flex justify-center item-center">
              {" "}
              <br />
              <Link
                to={"/teacher"}
                className={
                  "w-40 my-4 py-2 px-14  bg-secondary hover:text-white rounded hover:bg-black    active:bg-secondary"
                }
              >
                Teacher
              </Link>
            </div>{" "}
            <div className="text-center">
              {" "}
              <h5>or</h5>
              <Link
                to={"/chat"}
                className={
                  "bg-secondary hover:text-gray-500 rounded hover:bg-black active:bg-secondary"
                }
              >
                <h1>Join Global Chat👨‍💻</h1>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
