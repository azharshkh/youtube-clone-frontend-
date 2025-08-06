import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../services/firebase";

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideo() {
      try {
        const docRef = doc(db, "videos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setVideo(docSnap.data());
        }
      } catch (error) {
        console.error("Error loading video:", error);
      }
    }

    fetchVideo();
  }, [id]);

  if (!video) return <p className="loading-text">Loading...</p>;

  const isEmbed =
    video.videoUrl.includes("youtube.com") ||
    video.videoUrl.includes("vimeo.com");

  return (
    <div className="video-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="video-wrapper">
        {isEmbed ? (
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video controls>
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <h2 className="video-title">{video.title}</h2>
      <p className="video-description">{video.description}</p>
    </div>
  );
}

export default VideoPage;
