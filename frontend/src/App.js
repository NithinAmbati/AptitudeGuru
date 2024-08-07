import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateLogin from "./pages/Students/CandidateLogin";
import CandidateSignUp from "./pages/Students/CandidateSignUp";
import EmployerLogin from "./pages/Employees/EmployerLogin";
import EmployerSignUp from "./pages/Employees/EmployerSignUp";
import EmployerHome from "./pages/Employees/EmployerHome";
import StudentHome from "./pages/Students/StudentHome";
import Home from "./pages/Home";
import AddJob from "./pages/Employees/AddJobs";
import StudentProfile from "./pages/Students/StudentProfile";
import DetailedJobDescription from "./pages/DetailedDescription";
import JobPostingHomePage from "./pages/Employees/JobPostingHomePage";
import EmployerProfile from "./pages/Employees/Employerprofile";
import JobsPosted from "./pages/Employees/JobsPosted";
import Applications from "./pages/Applications";
import NotFound from "./pages/NotFound";
import ViewStudent from "./pages/Employees/viewStudents";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/student/login" element={<CandidateLogin />} />
      <Route exact path="/student/signup" element={<CandidateSignUp />} />
      <Route exact path="/employer/login" element={<EmployerLogin />} />
      <Route exact path="/employer/signup" element={<EmployerSignUp />} />
      <Route exact path="/employer" element={<EmployerHome />} />
      <Route exact path="/student" element={<StudentHome />} />
      <Route
        exact
        path="/student/jobs/:id"
        element={<DetailedJobDescription />}
      />
      <Route
        exact
        path="/employer/jobs/posting"
        element={<JobPostingHomePage />}
      />
      <Route exact path="/employer/jobs/posting/post" element={<AddJob />} />
      <Route exact path="/employer/jobs/posted" element={<JobsPosted />} />
      <Route
        exact
        path="/employer/jobs/posted/:id"
        element={<Applications />}
      />
      <Route exact path="/employer/profile" element={<EmployerProfile />} />
      <Route exact path="/employer/view-students" element={<ViewStudent />} />
      <Route exact path="/student/profile" element={<StudentProfile />} />

      <Route path="/not-found" Component={NotFound} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
