import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import AssignmentTeacher from "../SubjectDetail/AssignmentTeacher";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SubjectDashboard = () => {
  const { subjectId } = useParams();
  const detail = ["Assignment", "Meeting", "People"];
  return (
    <div className="h-screen bg-secondary">
      <div>
        <div className="mx-auto w-full max-w-md px-2 py-24 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex p-1 space-x-1 rounded-xl">
              {detail.map((item) => (
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm leading-5 font-medium  rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary ring-white ring-opacity-60",
                      selected
                        ? "bg-white shadow"
                        : " hover:bg-primary/[0.12] hover:text-white"
                    )
                  }
                >
                  {item}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  "bg-primary rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 bg-blue-500"
                )}
              >
                <AssignmentTeacher />
              </Tab.Panel>{" "}
              <Tab.Panel
                className={classNames(
                  "bg-primary rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 bg-blue-500"
                )}
              ></Tab.Panel>{" "}
              <Tab.Panel
                className={classNames(
                  "bg-primary rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 bg-blue-500"
                )}
              >
                <h1>Hello</h1> <h1>Hello</h1> <h1>Hello</h1>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};
export default SubjectDashboard;
