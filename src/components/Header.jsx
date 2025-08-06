import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="yt-header">
      <div className="yt-left">
        <Link to="/" className="yt-logo">
          MyYouTube
        </Link>
      </div>

      <form onSubmit={handleSearch} className="yt-search-form">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="yt-search-input"
        />
        <button type="submit" className="yt-search-btn">
          🔍
        </button>
      </form>

      <div className="yt-right">
        {/* Future: Add icons like upload, account, etc. */}
      </div>
    </header>
  );
}

export default Header;
