// const express = require("express");
// const router = express.Router();
// const Together = require("together-ai");

// const { checkAPIStatus, createTTSJob } = require("../services/service");

// const API_KEY = process.env.TOGETHER_API_KEY;
// const together = new Together({ apiKey: API_KEY });

// if (!API_KEY) {
//   console.error("API Key not found in environment variables.");
//   throw new Error("API Key not found in environment variables");
// }

// router.get("/test", async (req, res) => {
//   res.status(200).json({ message: "Working...", status: 200 });
// });

// router.get("/recipeStream", async (req, res) => {
//   const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query;

//   const prompt = `
//     Create a recipe based on the following:
//     Ingredients: ${ingredients || "None specified"}
//     Meal Type: ${mealType}
//     Cuisine Preference: ${cuisine || "None specified"}
//     Cooking Time: ${cookingTime}
//     Complexity: ${complexity}
//     Include preparation steps and provide a suitable name.
//     Format your response in *Markdown* to make it easier to render on webpage.
//   `;

//   try {
//     const response = await together.chat.completions.create({
//       model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
//       messages: [
//         {
//           role: "system",
//           content: "You are a wonder Chef and can deliver recipes of any kind.",
//         },
//         { role: "user", content: prompt },
//       ],
//       stream: true,
//       temperature: 0.7,
//       top_p: 0.7,
//       top_k: 50,
//       repetition_penalty: 1,
//     });

//     let recepie = "";
//     for await (const chunk of response) {
//       recepie += chunk.choices[0]?.delta?.content || "";
//     }

//     const recipeRegex = /receipe/gi;
//     const formattedRecipe = recepie.replace(
//       recipeRegex,
//       '<strong style="font-size: 1.2em;">$&</strong>'
//     );

//     res.status(200).json({
//       success: true,
//       message: formattedRecipe,
//       imageUrl: null,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error generating recipe. " + error.message,
//     });
//   }
// });

// router.post("/tts", async (req, res) => {
//   let { text } = req.body;

//   if (!text || text.trim() === "") {
//     throw new Error("No text available");
//   }
//   try {
//     text = text.replace(/[^a-zA-Z0-9\s]/g, "");
//     console.log("Received text:", text);
//     const createJobResponse = await createTTSJob({ text });
//     const { eta, id } = createJobResponse?.data;
//     if (!id) {
//       throw new Error("Failed to create TTS job ID.");
//     }
//     const jobStatusResponse = await checkAPIStatus(eta, id);

//     console.log("Job status URL:", jobStatusResponse);
//   } catch (error) {
//     console.log("Speech generation failed", error);
//     throw error;
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Together = require("together-ai");

const { checkAPIStatus, createTTSJob } = require("../services/service");

const API_KEY = process.env.TOGETHER_API_KEY;
const together = new Together({ apiKey: API_KEY });

if (!API_KEY) {
  console.error("API Key not found in environment variables.");
  throw new Error("API Key not found in environment variables");
}

router.get("/test", async (req, res) => {
  res.status(200).json({ message: "Working...", status: 200 });
});

router.get("/recipeStream", async (req, res) => {
  const { ingredients, mealType, cuisine, cookingTime, complexity } = req.query;

  if (!ingredients) {
    return res.status(400).json({
      success: false,
      message: "No ingredients provided.",
    });
  }

  const validationPrompt = `Identify if all ingredients from [${ingredients}] list are valid, "do not assume" valid ingredient.
If any of the ingredient is not an actual recipe ingredient, return exactly the format no other text or explanation required:
{
 success: false,
 message: "INVALID INGREDIENTS from the [${ingredients}], comma separated"
}
 Ingredients: ${ingredients}
Otherwise proceed with recipe generation.

Create a detailed recipe based on the following:
      - Ingredients: ${ingredients}
      - Meal Type: ${mealType || "Any"}
      - Cuisine Preference: ${cuisine || "Any"}
      - Cooking Time: ${cookingTime || "Flexible"}
      - Complexity: ${complexity || "Moderate"}

After recipe generation provide below info in html readable markdown table format.
 Nutritional Information - Calories, Carbs, Proteins, Fats
 Health Benefits of each ingredient
 Shopping list with quantity

### Nutritional Information:
| Calories | Carbs (g) | Protein (g) | Fat (g) |
|----------|----------|------------|--------|
| XYZ kcal | XYZ g    | XYZ g      | XYZ g  |

### Health Benefits:
| Ingredient | Health Benefits |
|------------|----------------|
| XYZ        | XYZ benefits   |
| XYZ        | XYZ benefits   |

### Shopping List:
| Ingredient | Quantity |
|------------|---------|
| XYZ        | XYZ     |
| XYZ        | XYZ     |

      Format your response in *Markdown*.

`;

  try {
    console.log("🔍 Sending validation request...");

    const validationResponse = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content: "You are a master chef and can create detailed recipes.",
        },
        { role: "user", content: validationPrompt },
      ],
      stream: true,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
    });
    const validationResult =
      validationResponse.choices?.[0]?.message?.content?.trim() || "";
    console.log("✅ Validation Result:", validationResult);

    const errorStrings = [
      "invalid ingredients",
      "not a valid",
      "success: false",
    ];
    if (errorStrings.some((item) => validationResult.includes(item))) {
      return res.status(400).json({
        success: false,
        message: "Invalid ingredients found.",
        invalidIngredients: validationResult,
      });
    }

    console.log("✅ Ingredients are valid. Generating recipe...");
    // res.status(200).json({
    //   success: true,
    //   message: "All ingredients are valid. You can generate a recipe now.",
    //   validationOutput: validationResult,
    // });
    // } catch (error) {
    //   console.error("Error during validation:", error);
    //   res.status(500).json({
    //     success: false,
    //     message: "Validation failed: " + error.message,
    //   });
    // }
    // Step 2: Generate Recipe
    /* const recipePrompt = `
      Create a detailed recipe based on the following:
      - Ingredients: ${ingredients}
      - Meal Type: ${mealType || "Any"}
      - Cuisine Preference: ${cuisine || "Any"}
      - Cooking Time: ${cookingTime || "Flexible"}
      - Complexity: ${complexity || "Moderate"}
      Include preparation steps and provide a suitable name.
      Format your response in *Markdown*.
    `;

    const recipeResponse = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content: "You are a master chef and can create detailed recipes.",
        },
        { role: "user", content: recipePrompt },
      ],
      stream: true,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
    });
 */

    // let recipe = "";
    let recipe = ""; // Return full recipe

    for await (const chunk of validationResponse) {
      recipe += chunk.choices[0]?.delta?.content || "";
    }

    console.log("✅ Recipe generated successfully!", validationResponse);

    res.status(200).json({
      success: true,
      message: recipe,
      imageUrl: null,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating recipe. " + error.message,
    });
  }
});

router.post("/tts", async (req, res) => {
  let { text } = req.body;

  if (!text || text.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "No text available" });
  }

  try {
    text = text.replace(/[^a-zA-Z0-9\s]/g, "");
    console.log("🎤 Received text for TTS:", text);

    const createJobResponse = await createTTSJob({ text });
    const { eta, id } = createJobResponse?.data;

    if (!id) {
      throw new Error("Failed to create TTS job ID.");
    }

    const jobStatusResponse = await checkAPIStatus(eta, id);
    console.log("🔊 Job status URL:", jobStatusResponse);

    res.status(200).json({
      success: true,
      message: "TTS job created successfully.",
      jobStatus: jobStatusResponse,
    });
  } catch (error) {
    console.log("❌ Speech generation failed", error);
    res.status(500).json({
      success: false,
      message: "TTS generation failed. " + error.message,
    });
  }
});

module.exports = router;
