import { useRef, useState, useEffect } from "react";
import DataInput from "../components/DataInput";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: () => void;
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");

    try {
      await axios.post(`${API_URL}/api/v1/auth/signup`, {
        username: emailRef.current?.value,
        password: passRef.current?.value,
      });

      if (emailRef.current) emailRef.current.value = "";
      if (passRef.current) passRef.current.value = "";

      navigate("/signin");
    } catch (err: any) {
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
