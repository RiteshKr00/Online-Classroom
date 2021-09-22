import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Toast from "../Toast/Toast";
import Studentsvg from "../../assets/children.svg";
const axios = require("axios");
const LoginAsStudent = () => {
  const { state, dispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const Login = async () => {
    try {
      if (username.length < 3 || username.length > 15) {
        Toast("Name length be from 3 to 15 characters", 2);
        return;
      }

      if (password.length < 5) {
        Toast("Length of the password must be at least 5", 2);
        return;
      }

      const response = await axios.post("/api/auth/signin", {
        username: username,
        password: password,
        role: "Student",
      });
      console.log(response);
      console.log(response.data);
      localStorage.removeItem("loggedTeacher");
      localStorage.setItem("loggedStudent", JSON.stringify(response.data));
      dispatch({ type: "USER", payload: response.data });
      history.push("/classjoined");
      Toast(response.data.message, 1);
      Toast("LoggedIn Successfully", 1);
    } catch (err) {
      console.log(err.response.data);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };

  return (
    <div className="h-screen  ">
      <div className={"bg-secondary p-2"}>
        <div className="w-full max-w-md bg-primary m-auto rounded-lg border border-gray-200 shadow-lg py-5 px-10 md:px-20">
          <h2 className="text-2xl text-center"><Link to={"/student"}>Student</Link></h2>{" "}
          <img className="mx-auto max-w-md" src={Studentsvg} alt="dfsd" />
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={
                "w-full p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div className="flex justify-center item-center">
            <button
              id="signup"
              type="submit"
              className={
                "my-4 py-1 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
              }
              onClick={() => Login()}
            >
              Login
            </button>
          </div>{" "}
          <div className="py-2 flex justify-center item-center">
            <h2>
              Don't have an account ?
              <Link
                to="/signupstudent"
                className="text-gray-900  hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                SignUp
              </Link>
            </h2>
          </div>
          <div className="flex justify-center item-center">
            <Link
              to="/resetpassword"
              className="text-gray-900  hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              Forget Password ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAsStudent;
