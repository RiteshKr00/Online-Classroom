import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Toast from "../Toast/Toast";
const LoginAsTeacher = () => {
  const { state, dispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const Login = async () => {
    try {
      console.log("here");
      if (username.length < 3 || username.length > 15) {
        Toast("Name length be from 3 to 15 characters", 2);
        return;
      }
      if (password.length < 5) {
        Toast("Length of the password must be at least 5", 2);
        return;
      }
      console.log("here");
      const response = await axios.post("/api/auth/signin", {
        username: username,
        password: password,
        role: "Teacher",
      });
      console.log(response);
      console.log(response.data);
      localStorage.removeItem("loggedStudent");
      localStorage.setItem("loggedTeacher", JSON.stringify(response.data));
      dispatch({ type: "USER", payload: response.data });
      history.push("/classcreated");
      Toast(response.data.message, 1);
      Toast("LoggedIn Successfully", 1);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };

  return (
    <div className="h-screen bg-blue-300 ">
      <div className={"flex  py-8 "}>
        <div className="w-full max-w-md bg-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
            Online Classroom
          </h2>
          <h3 className="text-center  pb-5 text-primary	">Teacher</h3>
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
              className={
                "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
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
                to="/signupteacher"
                className="text-gray-300  hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                SignUp
              </Link>
            </h2>
          </div>
          <div className="flex justify-center item-center">
            <Link
              to="/resetpassword"
              className="text-gray-300  hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Forget Password ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAsTeacher;
