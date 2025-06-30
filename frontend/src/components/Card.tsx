import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import lockImg from "../assets/locker.png";
import Icon from "../assets/icon.png";

const Card = ({
  title,
  handleDeleteContent,
  link,
  hint,
  time,
  type,
}: {
  title: string;
  handleDeleteContent: () => void;
  link: string;
  hint: string;
  time: string;
  type: string;
}) => {
  // ✅ Function to get correct image based on type
  const getImage = () => {
    if (type === "youtube") {
      const videoId = extractYoutubeVideoId(link);
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` || lockImg;
    } else if (type === "twitter") {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYLc7JOkimEAV6oZrK8OAoBp168im8Ul_Lw&s";
    } else if (type === "linkedin") {
      return "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/49/07/ab/4907ab8d-04ad-a00b-1f43-ef1c91229bba/AppIcon-0-1x_U007emarketing-0-8-0-85-220-0.png/1200x630wa.png";
    } else if (type === "instagram") {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IyijjXfK1nZDBi5oJveCdFTph5RnCnqfXw&s";
    } else {
      return lockImg;
    }
  };

  const getIcon = () => {
    if (type === "youtube") {
      return <FaYoutube />;
    } else if (type === "twitter") {
      return <FaTwitter />;
    } else if (type === "linkedin") {
      return <FaLinkedin />;
    } else if (type === "instagram") {
      return <FaInstagram />;
    } else {
      return <img className="rounded-full w-8" src={Icon} alt="Icon" />;
    }
  };

  const extractYoutubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  return (
    <div className="flex flex-col gap-8 w-72 bg-white p-5 border shadow-md shadow-gray-400 border-gray-200 rounded-2xl">
      <div className="flex justify-between items-center text-lg font-bold">
        <div className="flex items-center gap-3">
          <p className="text-2xl">{getIcon()}</p>
          {title}
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <IoMdOpen
            className="hover:text-black cursor-pointer"
            onClick={() => {
              if (link) {
                window.open(link, "_blank");
              } else {
                alert("Invalid link");
              }
            }}
          />
          <MdDelete
            className="hover:text-black cursor-pointer"
            onClick={handleDeleteContent}
          />
        </div>
      </div>
      <div>
        <img
          src={getImage() || lockImg}
          alt="preview"
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="">
        <p className="pb-2">{hint}</p>
        <p className="text-center text-slate-400">
          Created On - {new Date(time).toISOString().slice(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default Card;
