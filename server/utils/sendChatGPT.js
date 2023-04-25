import { Configuration, OpenAIApi } from "openai";

export const sendChatGPT = async (message) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 50,
      n: 1,
      stop: "\n",
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
