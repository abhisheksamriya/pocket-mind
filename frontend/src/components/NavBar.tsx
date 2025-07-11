import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";
import { type ReactElement } from "react";
import { BsFillCollectionFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import API_URL from "../config";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  activeType: string;
  setActiveType: (type: string) => void;
};

const NavBar = ({ id, setActiveType, activeType }: Props) => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await axios.delete(`${API_URL}/api/v1/auth/signout/${id}`);
      navigate("/");
      alert("your account is deleted");
    } catch (error) {
      console.log("/");
    }
  };

  return (
    <nav className="bg-screen fixed w-72 h-[95.5vh] mt-5 ml-5 rounded-2xl hidden md:block">
      <div className="pl-5 pt-7 font-mono relative h-full w-full">
        <a href="/dashboard">
          <img src={logo} alt="logo" className="w-[220px]" />
        </a>
        <div className="flex flex-col gap-8 text-lg mt-15 text-slate-400 font-normal pl-5">
          <Link
            activeType={activeType}
            onClick={() => setActiveType("All")}
            task="All"
            startIcon={<BsFillCollectionFill />}
          />
          <Link
            activeType={activeType}
            onClick={() => setActiveType("Twitter")}
            task="Twitter"
            startIcon={<FaTwitter />}
          />
          <Link
            activeType={activeType}
            onClick={() => setActiveType("Youtube")}
            task="Youtube"
            startIcon={<FaYoutube />}
          />
          <Link
            activeType={activeType}
            onClick={() => setActiveType("Linkdin")}
            task="Linkdin"
            startIcon={<FaLinkedin />}
          />
          <Link
            activeType={activeType}
            onClick={() => setActiveType("Instagram")}
            task="Instagram"
            startIcon={<FaInstagram />}
          />
        </div>
        <div className="absolute bottom-10 pl-5">
          <button
            onClick={handleLogOut}
            className="cursor-pointer bg-brand py-3 px-6 rounded-3xl text-white flex justify-center items-center gap-2 "
          >
            Log Out
            <FiLogOut />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Link = ({
  startIcon,
  url,
  task,
  onClick,
  activeType,
}: {
  startIcon: ReactElement;
  url?: string;
  task: string;
  onClick: () => void;
  activeType: string;
}) => {
  const isActive = activeType.toLowerCase() === task.toLowerCase();
  return (
    <a
      onClick={onClick}
      href={url}
      className={`flex gap-4 items-center hover:text-brand active:text-brand cursor-pointer ${
        isActive ? "text-brand transition-all" : ""
      }`}
    >
      {startIcon}
      {task}
    </a>
  );
};

export default NavBar;
