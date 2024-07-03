import { useState } from "react";
import OpenAI from "openai";

const GptPrompt = () => {
  const [response, setResponse] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [temp, setTemp] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        temperature: parseFloat(temp),
        max_tokens: 200,
      });
      const message = result.choices[0].message.content;
      setResponse(message);
      console.log();
    } catch (error) {
      setResponse(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            placeholder="질문을 입력하세요."
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: "300px",
            }}
          />
          <input
            type="number"
            min="0.0"
            max="2.0"
            step="0.1"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            style={{
              width: "50px",
            }}
          />
          <button disabled={loading || prompt.length === 0} type="submit">
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
      {response && (
        <div>
          <div>
            <strong>temperature: </strong>
            {temp}
          </div>
          <div>
            <strong>답변: </strong>
            {response}
          </div>
        </div>
      )}
    </>
  );
};

export default GptPrompt;
