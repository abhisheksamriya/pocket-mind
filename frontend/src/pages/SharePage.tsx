import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../config";
import Card from "../components/Card"; // same card you used before

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  hint: string;
  createdAt: string;
}

const SharedPage = () => {
  const { shareId } = useParams();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/brain/${shareId}`);
        setUsername(res.data.username);
        setContent(res.data.content);
      } catch (error) {
        console.error("Invalid link or error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedData();
  }, [shareId]);

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">Shared by {username}</h1>
      <p className="text-slate-500 mb-4">Public shared content</p>

      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {content.map((item) => (
          <Card
            key={item._id}
            title={item.title}
            link={item.link}
            hint={item.hint}
            time={item.createdAt}
            type={item.type}
            handleDeleteContent={() => {}} // don't allow delete in shared
          />
        ))}
      </div>
    </div>
  );
};

export default SharedPage;
