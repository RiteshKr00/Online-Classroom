import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
const AssignmentTeacher = () => {
  const { subjectId } = useParams();
  const [assign, setAssign] = useState([]);
  console.log(subjectId);
  console.log("object");
  console.log(JSON.parse(localStorage.getItem("loggedTeacher")).accessToken);
  const FetchSubjectAssignment = async () => {
    try {
      //with get request data dont work use params to send data;
      const response = await axios({
        method: "get",
        url: "/api/teacher/assignmentcreated",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedTeacher"))
            .accessToken,
        },
        params: {
          subjectId: subjectId,
        },
      });

      console.log(response);
      console.log(response.data);
      setAssign(response.data);

      //   setClasses(response.data);
      //   console.log(classes);
      //   //   history.push("/loginteacher");
      //   Toast(response.data.message, 1);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      //   Toast(err.response.data.error, 2);
      //   Toast(err.response.data.message, 2);
    }
  };
  useEffect(() => {
    FetchSubjectAssignment();
  }, []);

  return (
    <div >
      {" "}
      {
        <Link to={`/createassignment/${subjectId}`}>
          <button className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 border border-white rounded">
            Create
          </button>
        </Link>
      }
      <ul>
        {assign
          ? assign.length === 0
            ? "No Work/test"
            : assign.map((post) => (
                <Link
                  to="#"
                  href="http:"
                  className={
                    ("absolute inset-0 rounded-md",
                    "focus:z-10 focus:outline-none focus:ring-2 ring-blue-400")
                  }
                >
                  <li
                    key={post._id}
                    className="relative p-3 rounded-md  hover:bg-secondary"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.details}
                    </h3>

                    <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                      <li>Due : {post.deadline.substring(0, 10)}</li>
                      <li>&middot;</li>
                    </ul>
                  </li>
                </Link>
              ))
          : "Loading ...."}
      </ul>
    </div>
  );
};

export default AssignmentTeacher;
