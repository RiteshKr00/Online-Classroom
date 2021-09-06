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
      if (!history.location.pathname.startsWith("/reset")) history.push("/");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signupteacher">
        <SignUpAsTeacher />
      </Route>{" "}
      <Route exact path="/signupstudent">
        <SignUpAsStudent />
      </Route>
      <Route exact path="/loginteacher">
        <LoginAsTeacher />
      </Route>
      <Route exact path="/loginstudent">
        <LoginAsStudent />
      </Route>
      <Route exact path="/classcreated">
        <ClassesCreated />
      </Route>
      <Route exact path="/classjoined">
        <ClassesJoined />
      </Route>{" "}
      <Route exact path="/createclass">
        <CreateClass />
      </Route>{" "}
      <Route exact path="/joinclass">
        <JoinClass />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>{" "}
      <Route path="/subjectdashboard/:subjectId">
        <SubjectDashboard />
      </Route>
      <Route path="/subjectdashboardstudent/:subjectId">
        <SubjectDashboardStudent />
      </Route>
      <Route path="/createassignment/:subjectId">
        <CreateAssignment />
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
        <ToastContainer />
      </BrowserRouter>{" "}
    </UserContext.Provider>
  );
}

export default App;
