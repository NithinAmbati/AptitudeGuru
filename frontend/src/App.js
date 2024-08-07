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
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import UnAuthorized from "./UnAuthorized";
import CheckAlreadyLogged from "./protectedRoutes/CheckAlreadyLogged";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CheckAlreadyLogged component={Home} />} />
      <Route
        path="/student/login"
        element={<CheckAlreadyLogged component={CandidateLogin} />}
      />
      <Route
        path="/student/signup"
        element={<CheckAlreadyLogged component={CandidateSignUp} />}
      />
      <Route
        path="/employer/login"
        element={<CheckAlreadyLogged component={EmployerLogin} />}
      />
      <Route
        path="/employer/signup"
        element={<CheckAlreadyLogged component={EmployerSignUp} />}
      />
      <Route
        path="/employer"
        element={
          <ProtectedRoute component={EmployerHome} requiredRole="employer" />
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute component={StudentHome} requiredRole="student" />
        }
      />

      <Route
        path="/student/jobs/:id"
        element={
          <ProtectedRoute
            component={DetailedJobDescription}
            requiredRole="student"
          />
        }
      />

      <Route
        path="/employer/jobs/posting"
        element={
          <ProtectedRoute
            component={JobPostingHomePage}
            requiredRole="employer"
          />
        }
      />

      <Route
        path="/employer/jobs/posting/post"
        element={<ProtectedRoute component={AddJob} requiredRole="employer" />}
      />

      <Route
        path="/employer/jobs/posted"
        element={
          <ProtectedRoute component={JobsPosted} requiredRole="employer" />
        }
      />
      <Route
        exact
        path="/employer/jobs/posted/:id"
        element={
          <ProtectedRoute component={Applications} requiredRole="employer" />
        }
      />
      <Route
        exact
        path="/employer/profile"
        element={
          <ProtectedRoute component={EmployerProfile} requiredRole="employer" />
        }
      />
      <Route
        exact
        path="/employer/view-students"
        element={
          <ProtectedRoute component={ViewStudent} requiredRole="employer" />
        }
      />
      <Route
        exact
        path="/student/profile"
        element={
          <ProtectedRoute component={StudentProfile} requiredRole="student" />
        }
      />

      <Route path="/unauthorized" element={UnAuthorized} />
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
