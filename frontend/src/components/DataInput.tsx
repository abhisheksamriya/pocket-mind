// DataInput.tsx
import type { RefObject } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  title: string;
  subtitle?: string;
  buttonText: string;
  emailRef: RefObject<HTMLInputElement | null>;
  nameRef?: RefObject<HTMLInputElement | null>;
  passRef: RefObject<HTMLInputElement | null>;
  handleClick: () => void;
  loading: boolean;
};

const DataInput = ({
  title,
  subtitle,
  buttonText,
  emailRef,
  passRef,
  handleClick,
  loading,
  nameRef,
}: Props) => {
  const location = useLocation();
  return (
    <div className="bg-white p-8 md:w-[25vw] w-[90vw] rounded-2xl shadow-2xl text-black flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      {subtitle && (
        <p className="text-sm text-gray-600 text-center">{subtitle}</p>
      )}
      {location.pathname == "/signup" && (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Username</label>
          <input
            type="email"
            ref={nameRef}
            placeholder="Enter your username"
            className="border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
          className="border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Password</label>
        <input
          ref={passRef}
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
        />
      </div>

      <button
        className="bg-brand py-3 px-4 rounded-xl text-white font-semibold hover:bg-brand-dark transition-all disabled:cursor-not-allowed"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "loading" : buttonText}
      </button>
      {location.pathname == "/signup" ? (
        <div className="text-center text-lg">
          Already a member?{" "}
          <a className="underline text-brand" href="/signin">
            Login here
          </a>
        </div>
      ) : (
        <div className="text-center text-lg">
          Don't have account?{" "}
          <a className="underline text-brand" href="signup">
            Register
          </a>
        </div>
      )}
    </div>
  );
};

export default DataInput;
