import { useState, useEffect } from "react";
import OpenAI from "openai";

const MusicGpt = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("");
  const [details, setDetails] = useState("");
  const [songNum, setSongNum] = useState(1);
  const [question, setQuestion] = useState("");
  const [searchQ, setSearchQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const f =
      '답변은 다음과 같은 json 형식을 따라야 함 { "idx": , "artistName":"", "songName":"", } 양쪽 대괄호는 빼고 출력';
    const query = `${theme} ${details} 노래를 ${songNum}곡 추천해 줘!`;
    setQuestion(query);
    setSearchQ(query + f);
  };

  useEffect(() => {
    const fetchResponse = async () => {
      if (!searchQ) return; // searchQ가 비어있으면 실행하지 않음

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

        // JSON 형식에 맞게 응답 내용 파싱
        const jsonResponse = content
          .trim()
          .split("\n")
          .map((line) => {
            const match = line.match(/{.*}/);
            return match ? JSON.parse(match[0]) : null;
          })
          .filter((item) => item !== null);

        setResult(jsonResponse);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchResponse();
  }, [searchQ]);

  console.log(searchQ, result);

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
      {searchQ && <h3 style={{ marginTop: "10px" }}>{question}</h3>}
      <div>
        <ul>
          {result.map((track) => (
            <li key={track.idx}>
              <p>
                {track.songName} - {track.artistName}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {error && <h1>Error: {error}</h1>}
    </>
  );
};

export default MusicGpt;
