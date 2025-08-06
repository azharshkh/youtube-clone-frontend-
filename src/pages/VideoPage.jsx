import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, doc, getDoc } from "../services/firebase";

function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideo() {
      const docRef = doc(db, "videos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setVideo(docSnap.data());
      }
    }

    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  const isEmbed =
    video.videoUrl.includes("youtube.com") ||
    video.videoUrl.includes("vimeo.com");

  return (
    <div className="video-page">
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#202020",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Back to Home
      </button>

      {isEmbed ? (
        <iframe
          width="100%"
          height="400"
          src={video.videoUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video width="100%" height="400" controls>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <h2>{video.title}</h2>
      <p>{video.description}</p>
    </div>
  );
}

export default VideoPage;
