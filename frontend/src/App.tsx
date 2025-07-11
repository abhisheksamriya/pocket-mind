import DashBoard from "./pages/DashBoard";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SharePage from "./pages/SharePage";

const App = () => {
  return (
    <BrowserRouter>
      {/*Toaster here */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/:shareId" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
