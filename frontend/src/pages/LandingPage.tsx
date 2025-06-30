import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/signin")}>Register Now</button>
    </div>
  );
};

export default LandingPage;
