import { Route, Routes } from "react-router";
import "./App.css";
import "./styles/AdminTheme.css";
import "./styles/InstitutionTheme.css";
import RegisterPage from "./pages/auth/Register.page";
import LoginPage from "./pages/auth/Login.page";
import OtpVerificationPage from "./pages/auth/OtpVerification.page";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "sonner";
import DobVerificationPage from "./pages/auth/DobVerification.page";
import StudentsPage from "./pages/admin/StudentsPage";
import InstructorsPage from "./pages/admin/InstructorsPage";
import InstitutionInstructorsPage from "./pages/institution/InstructorsPage";
import InstitutionsPage from "./pages/admin/InstitutionsPage";
import RequestsPage from "./pages/admin/RequestsPage";
import InstitutionOnboardingPage from "./pages/institution/InstitutionOnboarding.page";
import RequestStatusPage from "./pages/institution/RequestStatus.page";
import InstitutionDetailPage from "./pages/admin/InstitutionDetailPage";
import WorkInProgressPage from "./pages/WorkInProgress.page";
import { ProtectRoute } from "./ProtectRoute";
import { RestrictRoute } from "./RestrictRoute";
import { RestrictInstitutionRoute } from "./RestrictInstitutionRoute";
import { RestrictAdminRoute } from "./RestrictAdminRoute";
import { RestrictInstructorRoute } from "./RestrictInstructorRoute";
import AdminLoginPage from "./pages/auth/AdminLogin.page";
import { RestrictStudentRoute } from "./RestrictStudentRoute";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#5b18ba",
            color: "#FFFFFF",
            border: "1px solid rgba(255,255,255,0.40)",
            borderRadius: "16px",
            boxShadow: "0 20px 50px rgba(17,20,38,0.25)",
            padding: "16px 18px",
            textAlign : "center"
          },
        }}
      />
      <Routes>
        <Route path="/" element={<RestrictStudentRoute><LandingPage /></RestrictStudentRoute>} />

        {/* Auth */}
        <Route path="/institution/register" element={<RestrictRoute><RegisterPage /></RestrictRoute>} />
        <Route path="/institution/login" element={<RestrictRoute><LoginPage /></RestrictRoute>} />
        <Route path="/student/register" element={<RestrictRoute><RegisterPage /></RestrictRoute>} />
        <Route path="/student/login" element={<RestrictRoute><LoginPage /></RestrictRoute>} />
        <Route path="/student/dob/verification/:id" element={<RestrictRoute><DobVerificationPage /></RestrictRoute>} />
        <Route path="/instructor/login" element={<RestrictRoute><LoginPage /></RestrictRoute>} />
        <Route path="/auth/verify/otp" element={<RestrictRoute><OtpVerificationPage /></RestrictRoute>} />
        <Route path="/admin/login" element={<RestrictRoute><AdminLoginPage /></RestrictRoute>} />

        {/* Admin Side */}
        <Route path="/admin/dashboard" element={<ProtectRoute><RestrictAdminRoute>< WorkInProgressPage /></RestrictAdminRoute></ProtectRoute>} />
        <Route path="/admin/students" element={<ProtectRoute><RestrictAdminRoute><StudentsPage /></RestrictAdminRoute></ProtectRoute>} />
        <Route path="/admin/instructors" element={<ProtectRoute><RestrictAdminRoute><InstructorsPage /></RestrictAdminRoute></ProtectRoute>} />
        <Route path="/admin/institutions" element={<ProtectRoute><RestrictAdminRoute><InstitutionsPage /></RestrictAdminRoute></ProtectRoute>} />
        <Route path="/admin/institutions/:id" element={<ProtectRoute><RestrictAdminRoute><InstitutionDetailPage /></RestrictAdminRoute></ProtectRoute>} />
        <Route path="/admin/requests" element={<ProtectRoute><RestrictAdminRoute><RequestsPage /></RestrictAdminRoute></ProtectRoute>} />

        {/* Institution Side */}
        <Route path="/institution/dashboard" element={<ProtectRoute><RestrictInstitutionRoute>< WorkInProgressPage /></RestrictInstitutionRoute></ProtectRoute>} />
        <Route path="/institution/onboarding/:id" element={<ProtectRoute><RestrictInstitutionRoute><InstitutionOnboardingPage/></RestrictInstitutionRoute></ProtectRoute>}/>
        <Route path="/institution/requests/:id" element={<ProtectRoute><RestrictInstitutionRoute><RequestStatusPage/></RestrictInstitutionRoute></ProtectRoute>} />
        <Route path="/institution/instructors" element={<ProtectRoute><RestrictInstitutionRoute><InstitutionInstructorsPage /></RestrictInstitutionRoute></ProtectRoute>} />

        {/* Instructor Side */}
        <Route path="/instructor/dashboard" element={<ProtectRoute><RestrictInstructorRoute>< WorkInProgressPage /></RestrictInstructorRoute></ProtectRoute>} />



      </Routes>
    </>
  );
}

export default App;
