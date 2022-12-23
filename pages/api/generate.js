import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Complete the conversation in a funnny and witty way imagining the conversation is for a date.
// Take the conversation forward in a funnny and witty way imagining the conversation is for a date.

let prompts = [
  "Take the conversation forward in a funnny and witty way imagining the conversation is for a date. They got matched on a dating platform for the first time and this is their first conversation. Reply for he only.\n",
  "Take the conversation forward in a funny and witty way. They are looking to get to know each other better so they can fall in love if interests align. Imagine they are talking the first time and that too in different cities. Reply for he only.\n"
]
const basePromptPrefix = prompts[0];

const generateAction = async (req, res) => {

  let input = `${basePromptPrefix}${req.body.userInput}`
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: input,
    temperature: 0.7,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  let response = basePromptOutput.text.replace("He:", "");
  let outputToReturn = input + response

  res.status(200).json({ output: outputToReturn, individualOutput: response});
};

export default generateAction;

