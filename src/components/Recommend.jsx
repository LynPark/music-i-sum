import { useState, useEffect } from "react";
import OpenAI from "openai";

const Recommend = ({ setRecommendations }) => {
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("");
  const [details, setDetails] = useState("");
  const [songNum, setSongNum] = useState(1);
  const [question, setQuestion] = useState("");
  const [searchQ, setSearchQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const f =
      '답변은 다음과 같은 json 형식을 따라야 함 { "trackId": , "artistName":"", "trackName":"", } 양쪽 대괄호는 빼고 출력';
    const query = `${theme} ${details} 노래를 ${songNum}곡 추천해 줘!`;
    setQuestion(query);
    setSearchQ(query + f);
  };

  useEffect(() => {
    const fetchResponse = async () => {
      if (!searchQ) return;

      try {
        const openai = new OpenAI({
          apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true,
        });
        const answer = await openai.chat.completions.create({
          messages: [{ role: "user", content: searchQ }],
          model: "gpt-3.5-turbo",
          temperature: 0,
          max_tokens: 300,
        });

        const content = answer.choices[0].message.content;
        console.log("OpenAI 응답:", content);

        const jsonResponse = content
          .trim()
          .split("\n")
          .map((line) => {
            const match = line.match(/{.*}/);
            return match ? JSON.parse(match[0]) : null;
          })
          .filter((item) => item !== null);

        setRecommendations(jsonResponse);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchResponse();
  }, [searchQ, setRecommendations]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="테마"
          />{" "}
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="장르 또는 국가"
          />{" "}
          노래를{" "}
          <input
            type="number"
            value={songNum}
            onChange={(e) => setSongNum(e.target.value)}
            style={{ width: "30px" }}
          />
          곡 추천해 줘!
          <button
            disabled={!songNum}
            type="submit"
            style={{ marginLeft: "10px" }}
          >
            Q
          </button>
        </form>
      </div>
      {error && <h1>Error: {error}</h1>}
    </>
  );
};

export default Recommend;
