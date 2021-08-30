import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Toast/Toast";
const axios = require("axios");
const SignUpAsStudent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const Register = async () => {
    try {
      if (username.length < 3 || username.length > 15) {
        Toast("Name length be from 3 to 15 characters", 2);
        return;
      }
      if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        Toast("Invalid Email", 2);
        return;
      }
      if (password.length < 5) {
        Toast("Length of the password must be at least 5", 2);
        return;
      }

      const response = await axios.post("/api/auth/student/signup", {
        username: username,
        email: email,
        password: password,
        role: "Student",
      });
      console.log(response);
      console.log(response.data);
      history.push("/loginstudent");
      Toast(response.data.message, 1);
    } catch (err) {
      console.log(err.response.data);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };

  return (
    <div className="h-screen bg-blue-300">
      <div className={" flex  py-8 "}>
        <div className="w-full max-w-md bg-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
            Online Classroom
          </h2>{" "}
          <h3 className="text-center  pb-5 text-primary	">Student</h3>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
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
                "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
              }
              onClick={() => Register()}
            >
              Signup
            </button>
          </div>{" "}
          <div className="py-2 flex justify-center item-center">
            <h2>
              Already have an account ?
              <Link
                to="/login"
                className="text-gray-300  hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpAsStudent;