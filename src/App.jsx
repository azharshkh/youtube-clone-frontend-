import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import SearchPage from "./pages/SearchPage";
import Header from "./components/Header";

import "./index.css";

const themes = ["light", "dark", "youtubeRed", "retro"];

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Header />

      {/* Theme Selector */}
      <div style={{ padding: "1rem" }}>
        <label>
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<VideoPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
