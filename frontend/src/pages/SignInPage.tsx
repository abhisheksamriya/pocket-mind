import { useRef } from "react";
import DataInput from "../components/DataInput";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/signin`, {
        username: emailRef.current?.value,
        password: passRef.current?.value,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err) {
      console.error("Sign In Failed", err);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-brand via-teal-600 to-emerald-800">
      <DataInput
        buttonText="Sign In"
        title="Welcome Back"
        subtitle="Sign in to continue"
        emailRef={emailRef}
        passRef={passRef}
        handleClick={handleSignIn}
      />
    </div>
  );
};

export default SignInPage;
