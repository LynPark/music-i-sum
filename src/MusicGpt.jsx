import { useState, useEffect } from "react";
import OpenAI from "openai";

const MusicGpt = () => {
  const [music, setMusic] = useState({ title: "", singer: "" });
  const [error, setError] = useState(null);

  const question = "Recommend me one random song";

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
          temperature: 0.5,
          max_tokens: 200,
        });
        const [title, singer] = answer.choices[0].message.content.split("by");
        setMusic({ title, singer });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchResponse();
  }, []);

  const { title, singer } = music;

  return (
    <>
      {music ? (
        <>
          <h2>{question}</h2>
          <h3>
            {title}-{singer}
          </h3>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      {error && <h1>Error: {error}</h1>}
    </>
  );
};

export default MusicGpt;
