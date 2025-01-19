const express = require("express");
const router = express.Router();
const Together = require("together-ai");

const API_KEY = process.env.TOGETHER_API_KEY;
const together = new Together({ apiKey: API_KEY });

if (!API_KEY) {
  console.error("API Key not found in environment variables.");
  throw Error({
    succes: false,
    message: "API Key not found in environment variables",
  });
}

router.get("/recipeStream", async (req, res) => {
  const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query;

  const prompt = `
    Create a recipe based on the following:
    Ingredients: ${ingredients || "None specified"}
    Meal Type: ${mealType}
    Cuisine Preference: ${cuisine || "None specified"}
    Cooking Time: ${cookingTime}
    Complexity: ${complexity}
    Include preparation steps and provide a suitable name.
    Format your resonse in *Markdown* to make it easier to render on webpage.
  `;

  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content:
            "You are wonder Cheff and can deliver receipies of any kind.",
        },
        { role: "user", content: prompt },
      ],
      stream: true,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stream: true,
    });
    let recepie = "";
    for await (const chunk of response) {
      recepie += chunk.choices[0]?.delta?.content || "";
    }
    res.status(400).json({
      success: true,
      message: recepie,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating recipe." + error.message,
    });
  }
});

module.exports = router;
