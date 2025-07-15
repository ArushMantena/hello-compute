import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

// Load environment variables (for API key)
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up OpenAI configuration
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// Chat endpoint for Coach Cat 🐾
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Send message to OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4o", // or use "gpt-3.5-turbo" for lower cost
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error with OpenAI:', error);
    res.status(500).json({ error: error.message || 'An error occurred' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 NutriScan backend running on port ${PORT}`);
});
