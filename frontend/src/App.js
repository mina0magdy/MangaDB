import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CourseViewPage from "./pages/CourseViewPage";
import AdminAddNewUser from "./pages/AdminAddNewUser";
import InstructorCoursesPage from "./pages/InstructorCoursesPage";
import AddCoursePage from "./pages/AddCoursePage";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/UI/Footer/Footer";
import FAQS from "./pages/FAQS";
import InstructorWallet from "./pages/IntructorWallet";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/resetpassword"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path="/home/:id" element={<HomePage></HomePage>}></Route>
        <Route
          path="/searchresults/:id"
          element={<SearchResultsPage></SearchResultsPage>}
        ></Route>
        <Route
          path="/coursedetails/:id"
          element={<CourseDetailsPage></CourseDetailsPage>}
        ></Route>
        <Route
          path="/courseview/:id"
          element={<CourseViewPage></CourseViewPage>}
        ></Route>
        <Route
          path="/profile/:id"
          element={<InstructorProfilePage></InstructorProfilePage>}
        ></Route>
        <Route
          path="/admin/:id"
          element={<AdminAddNewUser></AdminAddNewUser>}
        ></Route>
        <Route
          path="courses/:id"
          element={<InstructorCoursesPage></InstructorCoursesPage>}
        ></Route>
        <Route
          path="addcourse/:id"
          element={<AddCoursePage></AddCoursePage>}
        ></Route>
        <Route
          path="myWallet/:id"
          element={<InstructorWallet></InstructorWallet>}
        ></Route>
        <Route path="FAQS" element={<FAQS></FAQS>}></Route>
      </Routes>

      <Footer></Footer>
    </Fragment>
  );
}
export default App;
