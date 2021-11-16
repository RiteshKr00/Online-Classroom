import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Toast from "../Toast/Toast";
const axios = require("axios");
const CreateAssignment = () => {
  const [details, setDetails] = useState("");
  const [deadline, setDeadline] = useState();
  console.log(deadline);

  const { subjectId } = useParams();

  const Create = async () => {
    try {
      const response = await axios.post(
        "/api/teacher/createassignment",
        {
          details: details,
          subjectId: subjectId,
          deadline: deadline,
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
    <div className="h-screen bg-blue-300 ">
      <div className={"flex  py-8 "}>
        <div className="w-full max-w-md bg-primary m-auto rounded-lg border border-gray-200 shadow-lg py-10 px-10 md:px-20">
          <h2 className="text-2xl text-center pt-4 pb-5 	">
            Online Classroom
          </h2>{" "}
          <h3 className="text-center  pb-5 	">Create Assignment</h3>
          <div>
            <label htmlFor="username">Details</label>

            <textarea
              type="text"
              id="details"
              placeholder="Description of Assignment"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="rounded bg-gradient-to-r from-green-200 to-blue-200 outline-none w-full my-2 py-2 border-b-4"
            />
          </div>
          <div>
            <label htmlFor="due">Due Date</label>
            <DatePicker
              id="due"
              className={
                "w-full  p-2  rounded-md transition duration-150 ease-in-out mb-4"
              }
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
          <div className="flex justify-center item-center">
            <button
              id="signup"
              type="submit"
              className={
                "my-4 py-2 px-4 text-white rounded bg-gray-700 hover:bg-gray-800  active:border-black"
              }
              onClick={() => Create()}
            >
              Create Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
