import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const apiKey = 'sk-v8kxtmVwmOQd7O3T7NL_YyCt_IVgT5XHGhslgpmYreT3BlbkFJuynuYb14ec3Ju45QLHFiH4g8FG1pL0DtpFTuY0txsA'; // Replace with your OpenAI API key

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

app.post('/api/message', async (req, res) => {
  const userText = req.body.text;
  const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  
  const requestBody = {
    prompt: `You are a booking assistant. User query: ${userText}`,
    max_tokens: 150,
    temperature: 0.7
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    res.json({ response: data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    res.status(500).json({ response: 'Sorry, I could not process your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
