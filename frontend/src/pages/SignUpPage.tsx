import { useRef, useState } from "react";
import DataInput from "../components/DataInput";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [error, setError] = useState(""); // Add error state

  const handleSignUp = async () => {
    setError(""); // Reset error on new attempt

    try {
      await axios.post(`${API_URL}/api/v1/auth/signup`, {
        username: emailRef.current?.value,
        password: passRef.current?.value,
      });

      // Clear input fields only if signup successful
      if (emailRef.current) emailRef.current.value = "";
      if (passRef.current) passRef.current.value = "";

      navigate("/signin");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Show backend error message
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-brand via-teal-600 to-emerald-800">
      <div>
        {error && (
          <p className=" absolute text-red-500 text-xl border-1 bg-white py-2 text-center mb-4">
            {error}
          </p>
        )}
        <DataInput
          buttonText="Create Account"
          title="Welcome to PocketMind"
          subtitle="Create your account to get started"
          emailRef={emailRef}
          passRef={passRef}
          handleClick={handleSignUp}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
