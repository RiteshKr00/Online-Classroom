import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SubjectDashboard = () => {
  const { subjectId } = useParams();
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
      setCategories((prevstate) => {
        return { ...prevstate, Assignment: response.data };
      });
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
  let [categories, setCategories] = useState({
    Assignment: [],
    Test: [],
    calender: [],
  });

  return (
    <div className="h-screen bg-blue-300 ">
      <div className="mx-auto w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-yellow-300 rounded-xl">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 bg-blue-500"
                )}
              >
                {
                  <Link to={`/createassignment/${subjectId}`}>
                    <button className="bg-blue-800 hover:bg-yellow-300 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                      Create
                    </button>
                  </Link>
                }
                <ul>
                  {console.log(posts)}
                  {posts
                    ? posts.length === 0
                      ? "No Work/test"
                      : posts.map((post) => (
                          <li
                            key={post._id}
                            className="relative p-3 rounded-md hover:bg-coolGray-100 hover:bg-yellow-300"
                          >
                            <h3 className="text-sm font-medium leading-5">
                              {post.details}
                            </h3>

                            <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                              <li>Due : {post.deadline.substring(0, 10)}</li>
                              <li>&middot;</li>
                              {/* <li>{post.subject} comments</li>
                        <li>&middot;</li>
                        <li>{post.shareCount} shares</li> */}
                            </ul>

                            <Link
                              to="#"
                              href="http:"
                              className={classNames(
                                "absolute inset-0 rounded-md",
                                "focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"
                              )}
                            >
                              .
                            </Link>
                          </li>
                        ))
                    : "Loading ...."}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
export default SubjectDashboard;
