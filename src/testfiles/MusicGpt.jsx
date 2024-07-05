import { useState, useEffect } from "react";
import OpenAI from "openai";

const MusicGpt = () => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const q = "여름에 어울리는 한국 아이돌그룹 노래를 3곡 추천해 줘.";
  const f =
    '답변은 다음과 같은 json 형식을 따라야 함 { "idx": , "artistName":"", "songName":"", } 양쪽 대괄호는 빼고 출력';
  const question = q + f;

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const openai = new OpenAI({
          apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true,
        });
        const answer = await openai.chat.completions.create({
          messages: [{ role: "user", content: question }],
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
  }, []);

  return (
    <>
      <h2>{q}</h2>
      <div>
        {result.length > 0 ? (
          <ul>
            {result.map((track) => (
              <li key={track.idx}>
                <p>
                  {track.songName} - {track.artistName}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
      {error && <h1>Error: {error}</h1>}
    </>
  );
};

export default MusicGpt;
