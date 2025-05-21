import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/Auth/Login";
import RegisterEmployee from "../pages/Auth/RegisterEmployee";
import RegisterJobSeeker from "../pages/Auth/RegisterJobSeeker";
import EmployerDashboard from "../pages/Dashboards/EmployerDashboard";
import CandidateDashboard from "../pages/Dashboards/CandidateDashboard";
import Applicants from "../pages/Applicant/Applicants";
import PostJob from "../pages/Job/PostJob";
import Jobs from "../pages/Job/Jobs";
import ApplyPage from "../pages/Job/ApplyPage";
import Applications from "../pages/Applicant/Applications";
import PrivateRoute from "../routes/PrivateRoute";
import MyJobs from "../pages/Job/MyJobs";
import ProfileEmployer from "../pages/Profile/ProfileEmployer";
import Reports from "../pages/Report/Reports";
import Inbox from "../pages/Notifications/Inbox";
import Notifications from "../pages/Notifications/Notifications";
import SavedJobs from "../pages/Profile/SavedJobs";
import ResumeBuilder from "../pages/Profile/ResumeBuilder";
import JobDetails from "../pages/Job/JobDetails";
import Dashboard from "../pages/Dashboards/Dashboard";
import NotFound from "../pages/Misc/NotFound";
import ServiceDetails from "../pages/Profile/ServiceDetails";
import PopularServices from "../components/home/PopularServices";
import Home from "../components/home/Home";
import FreelancerDetails from "../components/home/FreelancerDetails";
import AboutUs from "../components/shared/AboutUs";
import Contact from "../components/shared/Contact";
import Services from "../components/home/Services";
import PaymentPage from "../components/home/PaymentPage";
import NewSeoServices from "../components/home/NewSeoServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Default redirect from "/" to "/home"
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <RegisterEmployee />,
      },
      {
        path: "candidate",
        element: <RegisterJobSeeker />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute allowedRoles={["Employer", "Candidate"]} />
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
        path: "dashboard/:role",
        element: <Dashboard />,
      },
      {
        path: "applicants",
        element: <Applicants />,
      },
      {
        path: "post-job",
        element: <PostJob />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "my-jobs",
        element: <MyJobs />,
      },
      {
        path: "profile",
        element: <ProfileEmployer />,
      },
      {
        path: "apply/:id",
        element: <ApplyPage />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "inbox",
        element: <Inbox />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "savejobs",
        element: <SavedJobs />,
      },
      {
        path: "resume",
        element: <ResumeBuilder />,
      },
      {
        path: "job/:id",
        element: <JobDetails />,
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "services",
        element: <Services></Services>
      },
      {
        path: "services",
        element: <NewSeoServices></NewSeoServices>
      },
      {
        path: "freelancer/:id",
        element: <FreelancerDetails />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/payment",
        element: <PaymentPage></PaymentPage>
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
