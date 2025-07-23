import { CgProfile } from "react-icons/cg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import icon from "../assets/icon.png";

const Profile = ({
  username,
  dark,
  handleToggle,
}: {
  username: string;
  dark: boolean;
  handleToggle: () => void;
}) => {
  return (
    <div className="ml-5 mt-5 md:max-w-[82vw] mr-5 mb-2 bg-screen p-3 md:p-6 rounded-2xl flex justify-between items-center">
      <a href="/dashboard">
        <img src={icon} alt="icon" className="w-[60px]" />
      </a>
      <div>
        <div className="flex items-center gap-4">
          <button
            className="bg-brand md:p-3.5 p-2 rounded-full text-xl text-white cursor-pointer"
            onClick={handleToggle}
          >
            {dark ? <MdLightMode /> : <MdDarkMode />}
          </button>
          <CgProfile className=" text-4xl md:text-5xl text-brand" />
          <span className="hidden md:block">{username}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
