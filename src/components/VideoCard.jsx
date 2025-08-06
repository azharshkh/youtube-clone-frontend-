import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
        <img src={video.thumbnail} alt={video.title} className="thumbnail" />
        <h3 className="title">{video.title}</h3>
      </Link>
    </div>
  );
}

export default VideoCard;
