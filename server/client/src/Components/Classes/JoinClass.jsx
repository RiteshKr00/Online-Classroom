import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Toast/Toast";
const axios = require("axios");
const JoinClass = () => {
  const [code, setCode] = useState("");
  const history = useHistory();

  const Join = async () => {
    try {
      console.log("here");
      if (code.length < 3) {
        Toast("Code length Should be greater than 3", 2);
        return;
      }

      const response = await axios.post(
        "/api/student/joinclass",
        {
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("loggedStudent"))
              ? JSON.parse(localStorage.getItem("loggedStudent")).accessToken
              : "",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      //   history.push("/loginteacher");
      Toast(response.data.message, 1);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };

  return (
    <div className="h-screen bg-blue-300">
      <div className={"flex py-8 "}>
        <div className="w-full max-w-md bg-blue-500 m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 text-primary	">
            Online Classroom
          </h2>
          <h3 className="text-center  pb-5 text-primary	">Join a Class</h3>
          <div>
            <label htmlFor="code">Class Code</label>
            <input
              type="code"
              id="code"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
              onClick={() => Join()}
            >
              Join Class
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default JoinClass;
