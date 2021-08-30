import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Toast/Toast";
const axios = require("axios");
const CreateClass = () => {
  const [subjectName, setSubjectName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const Create = async () => {
    try {
      console.log("here");
      if (subjectName.length < 3) {
        Toast("Enter Full Name", 2);
        return;
      }
      if (code < 3) {
        Toast("Enter A Code greater than 3 Digit", 2);
        return;
      }

      console.log("here");
      const response = await axios.post(
        "/api/teacher/createclass",
        {
          name: subjectName,
          code: code,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("loggedTeacher"))
              .accessToken,
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
          <h3 className="text-center  pb-5 text-primary	">Create a Class</h3>
          <div>
            <label htmlFor="subjectName">Subject Name</label>
            <input
              type="text"
              id="subjectName"
              placeholder="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className={
                "w-full p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={
                "w-full  p-2 text-primary rounded-md transition duration-150 ease-in-out mb-4"
              }
            />
          </div>
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
              onClick={() => Create()}
            >
              Create Class
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default CreateClass;
