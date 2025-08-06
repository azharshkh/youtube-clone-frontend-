import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoPage from "./pages/VideoPage";
import SearchPage from "./pages/SearchPage"; // ✅ new
import Header from "./components/Header";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<VideoPage />} />
        <Route path="/search" element={<SearchPage />} /> {/* ✅ new */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
