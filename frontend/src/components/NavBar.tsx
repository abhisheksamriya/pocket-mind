import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";
import type { ReactElement } from "react";
import { BsFillCollectionFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  return (
    <nav className="bg-screen fixed w-72 h-[95vh] mt-5 ml-5 rounded-2xl hidden md:block">
      <div className="pl-5 pt-7 font-mono relative h-full w-full">
        <a href="/dashboard">
          <img src={logo} alt="logo" className="w-[220px]" />
        </a>
        <div className="flex flex-col gap-8 text-lg mt-15 text-slate-400 font-normal pl-5">
          <Link task="All" startIcon={<BsFillCollectionFill />} />
          <Link task="Twitter" startIcon={<FaTwitter />} />
          <Link task="Youtube" startIcon={<FaYoutube />} />
          <Link task="Linkdin" startIcon={<FaLinkedin />} />
          <Link task="Instagram" startIcon={<FaInstagram />} />
        </div>
        <div className="absolute bottom-10 pl-5">
          <button className="cursor-pointer bg-brand py-3 px-6 rounded-3xl text-white flex justify-center items-center gap-2 ">
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
}: {
  startIcon: ReactElement;
  url?: string;
  task: string;
}) => {
  return (
    <a
      href={url}
      className="flex gap-4 items-center hover:text-brand active:text-brand cursor-pointer"
    >
      {startIcon}
      {task}
    </a>
  );
};

export default NavBar;
