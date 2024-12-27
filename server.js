
require('dotenv').config(); // Load the `.env` file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');  // Update to use OpenAI directly

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI API
//const openai = new OpenAI({
//  apiKey: });
const apiKey = process.env.OPENAI_API_KEY;


// Define API endpoint
app.post('/api/query', async (req, res) => {
  const userQuery = req.body.query;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are ChatGPT, and you must only respond to queries related to electronics, IoT, IoT components, sensors, actuators, and IoT programming. The response name should be 'answer'." },
        { role: "user", content: userQuery }
      ]
    });
    
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: "Error fetching response from OpenAI API" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
