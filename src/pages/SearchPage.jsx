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

        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setResults([]);
        }
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
    <div style={{ padding: "1rem" }}>
      <h2>
        Search Results for: <em>{query}</em>
      </h2>

      {loading && <p>Loading results...</p>}

      {!loading && results.length === 0 && (
        <p>
          No results found for "<strong>{query}</strong>".
        </p>
      )}

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {results.map((item) => (
          <div
            key={item.id.videoId}
            style={{ border: "1px solid #ccc", padding: "0.5rem" }}
          >
            <iframe
              width="100%"
              height="150"
              src={`https://www.youtube.com/embed/${item.id.videoId}`}
              title={item.snippet.title}
              allowFullScreen
            ></iframe>
            <p>
              <strong>{item.snippet.title}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
