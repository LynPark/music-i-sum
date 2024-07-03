import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const GptTest = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const openai = new OpenAI({
          apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true,
        });
        const chatCompletion = await openai.chat.completions.create({
          messages: [{ role: "user", content: "What is your name?" }],
          model: "gpt-3.5-turbo",
        });
        const message = chatCompletion.choices[0].message.content;
        setResponse(message);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResponse();
  }, []);

  return (
    <>
      {response ? (
        <>
          <h1>Q. What is your name?</h1>
          <h2>{response}</h2>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      {error && <h1>Error: {error}</h1>}
    </>
  );
};

export default GptTest;
