import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Hero from "../components/Hero";
import Login from "../pages/Login";
import RegisterEmployee from "../pages/RegisterEmployee";
import RegisterJobSeeker from "../pages/RegisterJobSeeker";
import EmployerDashboard from "../pages/EmployerDashboard";
import CandidateDashboard from "../pages/CandidateDashboard";
import Applicants from "../pages/Applicants";
import PostJob from "../pages/PostJob";
import Jobs from "../pages/Jobs";
import ApplyPage from "../pages/ApplyPage";
import Applications from "../pages/Applications";
import PrivateRoute from "../routes/PrivateRoute"; // Import PrivateRoute
import MyJobs from "../pages/MyJobs";
import ProfileEmployer from "../pages/ProfileEmployer";
import Reports from "../pages/Reports";
import Inbox from "../pages/Inbox";
import Notifications from "../pages/Notifications";
import SavedJobs from "../pages/SavedJobs";
import ResumeBuilder from "../pages/ResumeBuilder";
import JobDetails from "../pages/JobDetails";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <MainLayout />
      
    ),
    children: [
      {
        path: "/home",
        element: <Hero />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <RegisterEmployee />,
      },
      {
        path: "/candidate",
        element: <RegisterJobSeeker />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute allowedRoles={['Employer', 'Candidate']} />
        ),
        children: [
          {
            path: "employer",
            element: <EmployerDashboard />,
          },
          {
            path: "candidate",
            element: <CandidateDashboard />,
          },
        ],
      },
      {
        path: "/applicants",
        element: <Applicants />,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/dashboard/:role",
        element: <Dashboard></Dashboard>
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
      {
        path: "/profile",
        element: <ProfileEmployer />,
      },
      {
        path: "/apply/:id",
        element: <ApplyPage />,
      },
      {
        path: "/applications",
        element: <Applications />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/savejobs",
        element: <SavedJobs />,
      },
      {
        path: "/resume",
        element: <ResumeBuilder />,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
     
    ],
    
  },
   {
        path: "*",
        element: <NotFound></NotFound>
      },
]);

export default router;
