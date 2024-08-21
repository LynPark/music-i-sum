import axios from 'axios';


const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const getAIResponse = async (input) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt: input,
      model: "gpt-4o-mini",
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching AI response", error);
    return "Sorry, something went wrong.";
  }
};
