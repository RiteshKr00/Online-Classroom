import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import LoginAsStudent from "./Components/Login/LoginAsStudent";
import LoginAsTeacher from "./Components/Login/LoginAsTeacher";
import Navbar from "./Components/NavBar/Navbar";
import SignUpAsStudent from "./Components/SignUp/SignUpAsStudent";
import SignUpAsTeacher from "./Components/SignUp/SignUpAsTeacher";
import { ToastContainer } from "react-toastify";
import ClassesCreated from "./Components/Classes/ClassesCreated";
import ClassesJoined from "./Components/Classes/ClassesJoined";
import CreateClass from "./Components/Classes/CreateClass";
import JoinClass from "./Components/Classes/JoinClass";
import { reducer, initialState } from "./reducers/useReducer";
import SubjectDashboard from "./Components/SubjectDashboard/SubjectDashboard";
import SubjectDashboardStudent from "./Components/SubjectDashboard/SubjectDashboardStudent";
import CreateAssignment from "./Components/CreateAssignment/CreateAssignment";
import Profile from "./Components/Profile/Profile";
import Landing from "./Components/Landing/Landing";
import Student from "./Components/Home/Student";
import Teacher from "./Components/Home/Teacher";
import ProtectedRoute from "./Components/Protected/ProtectedRoutes";
import Chat from "./Components/Chat/Chat";
import ChatWindow from "./Components/Chat/ChatWindow";

export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();
  //if user close application state is destroyed so we must update state agin when opened
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("loggedStudent"));
    const teacher = JSON.parse(localStorage.getItem("loggedTeacher"));
    if (teacher) {
      var user = JSON.parse(localStorage.getItem("loggedTeacher"));
    } else if (student) {
      user = JSON.parse(localStorage.getItem("loggedStudent"));
    }
    console.log(user);
    if (user) {
      dispatch({ type: "USER", payload: user }); //search for token user details in browser
    } else {
      // history.push("/");
    }
  }, []);
  return (
    <>
      {state !== null ? <Navbar /> : ""}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/teacher" component={Teacher} />
        <Route exact path="/student" component={Student} />{" "}
        <Route exact path="/Chat" component={Chat} />
        <Route exact path="/chatwindow" component={ChatWindow} />
        <Route exact path="/signupteacher" component={SignUpAsTeacher} />
        <Route exact path="/signupstudent" component={SignUpAsStudent} />
        <Route exact path="/loginteacher" component={LoginAsTeacher} />
        <Route exact path="/loginstudent" component={LoginAsStudent} />
        <ProtectedRoute exact path="/classcreated" component={ClassesCreated} />
        {/* <Route exact path="/classcreated">
          <ClassesCreated />
        </Route> */}
        <ProtectedRoute exact path="/classjoined" component={ClassesJoined} />
        <ProtectedRoute exact path="/createclass" component={CreateClass} />
        <ProtectedRoute exact path="/joinclass" component={JoinClass} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute
          path="/subjectdashboard/:subjectId"
          component={SubjectDashboard}
        />
        <ProtectedRoute
          path="/subjectdashboardstudent/:subjectId"
          component={SubjectDashboardStudent}
        />
        <ProtectedRoute
          path="/createassignment/:subjectId"
          component={CreateAssignment}
        />
      </Switch>
    </>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
        <ToastContainer />
      </BrowserRouter>{" "}
    </UserContext.Provider>
  );
}

export default App;
