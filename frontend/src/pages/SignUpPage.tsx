// SignUpPage.tsx
import { useRef } from "react";
import DataInput from "../components/DataInput";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    await axios.post(`${API_URL}/api/v1/auth/signup`, {
      username: emailRef.current?.value,
      password: passRef.current?.value,
    });
    emailRef.current!.value = "";
    passRef.current!.value = "";
    navigate("/signin");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-brand via-teal-600 to-emerald-800">
      <DataInput
        buttonText="Create Account"
        title="Welcome to PocketMind"
        subtitle="Create your account to get started"
        emailRef={emailRef}
        passRef={passRef}
        handleClick={handleSignUp}
      />
    </div>
  );
};

export default SignUpPage;
