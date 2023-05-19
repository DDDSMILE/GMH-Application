import { Configuration, OpenAIApi } from "openai";

export const sendChatGPT = async (message) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Tôi muốn ăn món ${message}`,
      temperature: 0.6,
      max_tokens: 2048,
    });

    return response.data.choices[0].text;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return error.message;
    }
  }
};
