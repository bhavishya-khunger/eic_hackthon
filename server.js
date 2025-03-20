import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/suggestions", async (req, res) => {
  try {
    const { lastMessage } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Suggest three short responses to continue this conversation:" },
          { role: "user", content: lastMessage }
        ],
        max_tokens: 20,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    if (response.data.choices) {
      res.json(response.data.choices.map(choice => choice.message.content));
    } else {
      res.json(["Could you elaborate?", "Interesting!", "Let's continue."]);
    }
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json(["Try again later.", "Hmm, not sure.", "Let's continue."]);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
