import Button from "./Button";
import { IoMdAdd, IoMdShare } from "react-icons/io";
import Card from "./Card";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import API_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  hint: string;
  createdAt: string;
}

const Display = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [contents, setContents] = useState<Content[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const hintRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleShare = () => {
    alert("Share functionality coming soon!");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (
      !titleRef.current?.value ||
      !linkRef.current?.value ||
      !typeRef.current?.value ||
      !hintRef.current?.value
    ) {
      alert("Please fill all fields");
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
      alert("Failed to add content");
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
      alert("Failed to fetch data");
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
      alert("Failed to delete content");
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
            startIcon={<IoMdShare />}
            text="Share Data"
            type="secondary"
            handleClick={handleShare}
          />
        </div>
      </div>
      <p className="text-slate-400">Store What Matters</p>

      <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
        {contents.map((content) => (
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
        {contents.map((content) => (
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
        {contents.map((content) => (
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
        {contents.map((content) => (
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
