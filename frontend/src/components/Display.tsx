import Button from "./Button";
import { IoMdAdd, IoMdShare } from "react-icons/io";
import Card from "./Card";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import API_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  hint: string;
  createdAt: string;
}
type Props = {
  activeType: string;
};

const Display = ({ activeType }: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [contents, setContents] = useState<Content[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const hintRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const filteredContents = contents.filter((item) =>
    activeType === "All"
      ? true
      : item.type.toLowerCase() === activeType.toLowerCase()
  );

  const handleAdd = () => {
    setOpen(true);
  };

  const handleShare = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to share.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!data?.hash) {
        toast.error("Something went wrong, no hash received.");
        return;
      }

      const fullLink = `${window.location.origin}/${data.hash}`;
      if (!navigator.clipboard) {
        toast.error("Clipboard not supported in this browser.");
        return;
      }
      await navigator.clipboard.writeText(fullLink);
      toast.success("Link copied to clipboard!");
    } catch (error: any) {
      console.error("Share error:", error?.response?.data || error.message);
      toast.error("Failed to generate share link.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (
      !titleRef.current?.value ||
      !linkRef.current?.value ||
      !typeRef.current?.value ||
      !hintRef.current?.value
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/v1/content`,
        {
          type: typeRef.current.value,
          link: linkRef.current.value,
          title: titleRef.current.value,
          hint: hintRef.current.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchData();

      typeRef.current.value = "";
      titleRef.current.value = "";
      linkRef.current.value = "";
      hintRef.current.value = "";
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add content");
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContents(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data");
    }
  };

  const handleDeleteContent = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete content");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetchData();
  }, []);

  return (
    <div className="p-5 md:p-7">
      <div className="flex justify-between">
        <h1 className="text-xl md:text-3xl font-semibold">All Notes</h1>
        <div className="flex gap-4">
          <Button
            startIcon={<IoMdAdd />}
            text="Add Content"
            type="primary"
            handleClick={handleAdd}
          />
          <Button
            disabled={loading}
            startIcon={<IoMdShare />}
            text={loading ? "Sharing..." : "Share Data"}
            type="secondary"
            handleClick={handleShare}
          />
        </div>
      </div>
      <p className="text-slate-400">Store What Matters</p>

      <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
        {filteredContents.map((content) => (
          <Card
            key={content._id}
            title={content.title}
            handleDeleteContent={() => handleDeleteContent(content._id)}
            link={content.link}
            hint={content.hint}
            time={content.createdAt}
            type={content.type}
          />
        ))}
      </div>

      <Form
        open={open}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        hintRef={hintRef}
        titleRef={titleRef}
        linkRef={linkRef}
        typeRef={typeRef}
      />
    </div>
  );
};

export default Display;
