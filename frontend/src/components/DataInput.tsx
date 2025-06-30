// DataInput.tsx
import type { RefObject } from "react";

const DataInput = ({
  title,
  subtitle,
  buttonText,
  emailRef,
  passRef,
  handleClick,
}: {
  title: string;
  subtitle?: string;
  buttonText: string;
  emailRef: RefObject<HTMLInputElement | null>;
  passRef: RefObject<HTMLInputElement | null>;
  handleClick: () => void;
}) => {
  return (
    <div className="bg-white p-8 md:w-[25vw] w-[90vw] rounded-2xl shadow-2xl text-black flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">{title}</h1>
      {subtitle && (
        <p className="text-sm text-gray-600 text-center">{subtitle}</p>
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
        className="bg-brand py-3 px-4 rounded-xl text-white font-semibold hover:bg-brand-dark transition-all"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default DataInput;
