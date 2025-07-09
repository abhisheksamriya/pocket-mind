import { useEffect, useRef, useState } from "react";
import DataInput from "../components/DataInput";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/v1/auth/signin`, {
        username: emailRef.current?.value,
        password: passRef.current?.value,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      setLoading(false);
      navigate("/dashboard");
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-brand via-teal-600 to-emerald-800">
      <div className="relative">
        {error && (
          <p className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded text-lg w-95 text-center text-bold shadow-lg animate-bounce">
            {error}
          </p>
        )}
        <DataInput
          loading={loading}
          buttonText="Sign In"
          title="Welcome Back"
          subtitle="Sign in to continue"
          emailRef={emailRef}
          passRef={passRef}
          handleClick={handleSignIn}
        />
      </div>
    </div>
  );
};

export default SignInPage;
