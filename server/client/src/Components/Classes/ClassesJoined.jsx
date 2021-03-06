import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Toast/Toast";
const axios = require("axios");
const ClassesJoined = () => {
  const [classes, setClasses] = useState(null);

  const FetchClasses = async () => {
    try {
      const response = await axios.get("/api/student/classjoined", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedStudent"))
            .accessToken,
        },
      });
      console.log(response);
      console.log(response.data);
      setClasses(response.data);
      console.log(classes);
      //   history.push("/loginteacher");
      Toast(response.data.message, 1);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      Toast(err.response.data.error, 2);
      Toast(err.response.data.message, 2);
    }
  };

  useEffect(() => {
    FetchClasses();
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="h-screen  ">
      <div className={" "}>
        <h1 className="text-2xl text-center py-4">SUBJECT (Joined)</h1>
        <div className="flex flex-wrap py-4 justify-center">
          {classes ? (
            classes.length === 0 ? (
              <div>No class Joined</div>
            ) : (
              classes.map((item) => {
                return (
                  <Link to={`/subjectdashboardstudent/${item._id}`}>
                    <div
                      key={item._id}
                      className="m-2 w-80 bg-primary rounded-lg border border-gray-200 shadow-lg py-2 px-10 md:px-20"
                    >
                      <h2 className="text-2xl hover:underline text-center pt-4 pb-5 	">
                        <Link to={`/subjectdashboardstudent/${item._id}`}>
                          {" "}
                          {item.name}
                        </Link>
                      </h2>
                      <h3>Code : {item.code}</h3>
                      <p>Description : {item.description}</p>
                    </div>
                  </Link>
                );
              })
            )
          ) : (
            "Loading ...."
          )}{" "}
          {/* <div className="m-2 w-80 bg-blue-500 rounded-lg border border-gray-200 shadow-lg py-2 px-10 md:px-20">
            <h2 className="text-2xl  text-center pt-4 pb-5 text-primary	">
              English
            </h2>
            <h3>code</h3>
            <p>Description</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ClassesJoined;
