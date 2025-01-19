const express = require("express");
const router = express.Router();
const Together = require("together-ai");

const API_KEY = process.env.TOGETHER_API_KEY;
const together = new Together({ apiKey: API_KEY });

router.get("/infer", async (req, res) => {
  const { prompt, model } = req.query;

  if (!prompt) {
    return res
      .status(400)
      .json({ success: false, message: "Prompt is required." });
  }

  try {
    const response = await together.chat.completions.create({
      model: model || "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
      messages: [
        { role: "system", content: "You are an AI assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      top_p: 0.9,
      top_k: 50,
      repetition_penalty: 1,
      stream: false,
    });

    const result =
      response.choices[0]?.message?.content || "No response generated.";

    res.json({ success: true, response: result });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing request." });
  }
});

module.exports = router;
