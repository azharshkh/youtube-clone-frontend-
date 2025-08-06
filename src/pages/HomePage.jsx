import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../services/firebase";
import VideoCard from "../components/VideoCard";

function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const videoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videoList);
    }

    fetchVideos();
  }, []);

  return (
    <div className="home-container">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default HomePage;
