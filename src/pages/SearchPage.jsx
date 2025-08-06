import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <main style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>
        Search Results for: <em>{query}</em>
      </h2>

      {loading && <p>Loading results...</p>}

      {!loading && results.length === 0 && (
        <p>
          No results found for "<strong>{query}</strong>".
        </p>
      )}

      <div className="search-grid">
        {results.map((item) => (
          <div key={item.id.videoId} className="video-card">
            <iframe
              width="100%"
              height="150"
              src={`https://www.youtube.com/embed/${item.id.videoId}`}
              title={item.snippet.title}
              allowFullScreen
              style={{ border: "none", borderRadius: "6px" }}
            ></iframe>
            <p className="title">{item.snippet.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default SearchPage;
