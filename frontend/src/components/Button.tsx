import type { ReactElement } from "react";

const Button = ({
  type,
  text,
  startIcon,
  handleClick,
}: {
  type: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className={`border-1 py-3 px-3 hover:scale-105 duration-100 transition-all rounded-3xl flex gap-3 justify-center items-center cursor-pointer ${
        type === "primary"
          ? "bg-brand text-white"
          : "bg-white text-brand border-brand"
      }`}
    >
      <div>{startIcon}</div>
      <p className="hidden md:flex">{text}</p>
    </button>
  );
};

export default Button;
