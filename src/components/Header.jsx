import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "../App"; // Import context from App
import "./Header.css";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const themes = ["light", "dark", "youtubeRed", "retro"];

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
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="yt-theme-select"
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
