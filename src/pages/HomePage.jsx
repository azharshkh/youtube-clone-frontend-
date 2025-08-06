import { useEffect, useState } from "react";
import { db, collection, getDocs } from "../services/firebase";
import VideoCard from "../components/VideoCard";

function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const querySnapshot = await getDocs(collection(db, "videos"));
        const videoList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videoList);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <main className="home-container">
      {videos.length === 0 ? (
        <p style={{ padding: "1rem", textAlign: "center" }}>
          No videos available.
        </p>
      ) : (
        videos.map((video) => <VideoCard key={video.id} video={video} />)
      )}
    </main>
  );
}

export default HomePage;
