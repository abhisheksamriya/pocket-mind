import { useState } from "react";
import DashBoard from "./pages/DashBoard";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={<SignUpPage loading={loading} setLoading={setLoading} />}
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
