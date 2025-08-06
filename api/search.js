// youtube-clone/api/search.js

export default async function handler(req, res) {
  const query = req.query.q;

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!query || !apiKey) {
    return res.status(400).json({ error: "Missing search query or API key" });
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${apiKey}&maxResults=12`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data.items);
  } catch (error) {
    console.error("YouTube API error:", error);
    res.status(500).json({ error: "YouTube API error" });
  }
}
