// const express = require("express");
// const router = express.Router();
// const Together = require("together-ai");
// // const { OpenAI } = require("openai");

// const { checkAPIStatus, createTTSJob } = require("../services/service");

// const API_KEY = process.env.TOGETHER_API_KEY;
// const together = new Together({ apiKey: API_KEY });
// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// if (!API_KEY) {
//   console.error("API Key not found in environment variables.");
//   throw Error({
//     succes: false,
//     message: "API Key not found in environment variables",
//   });
// }

// router.get("/test", async (req, res) => {
//   // const image = await openai.images.generate({
//   //   model: "dall-e-3",
//   //   prompt: "One Image of food. Image aspect ratio 16:9",
//   // });

//   //   console.log(image.data);
//   res
//     .status(200)
//     .json({ message: "Working...", status: 200, image: image.data });
// });
// /* const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// }); */
// // const openai = new OpenAIApi(configuration);

// // router.post("/generate-image", async (req, res) => {
// //   const { ingredients } = req.body;

// //   const prompt = `Create a delicious dish image using the following ingredients: ${ingredients.join(
// //     ", "
// //   )}.`;

// //   try {
// //     const response = await openai.createImage({
// //       prompt: prompt,
// //       n: 1,
// //       size: "512x512",
// //     });

// //     const imageUrl = response.data.data[0].url;
// //     res.status(200).json({ success: true, imageUrl });
// //   } catch (error) {
// //     console.error("Error generating image:", error);
// //     res.status(500).json({ success: false, message: "Error generating image" });
// //   }
// // });

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
//     Format your resonse in *Markdown* to make it easier to render on webpage.
//   `;

//   try {
//     const response = await together.chat.completions.create({
//       model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are wonder Cheff and can deliver receipies of any kind.",
//         },
//         { role: "user", content: prompt },
//       ],
//       stream: true,
//       temperature: 0.7,
//       top_p: 0.7,
//       top_k: 50,
//       repetition_penalty: 1,
//       stream: true,
//     });
//     let recepie = "";
//     for await (const chunk of response) {
//       recepie += chunk.choices[0]?.delta?.content || "";
//     }
//     res.status(200).json({
//       success: true,
//       message: recepie,
//       imageUrl: null, //`${req.protocol}://${req.get("host")}/images/food.jpeg`,
//     });

//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error generating recipe." + error.message,
//     });
//   }
// });
// const recipeRegex = /receipe/gi;

// // Replace each occurrence with the word wrapped in <strong> tags and styled with a larger font size
// const formattedRecipe = recipe.replace(
//   recipeRegex,
//   '<strong style="font-size: 1.2em;">$&</strong>'
// );

// router.post("/tts", async (req, res) => {
//   let { text } = req.body;

//   if (!text || text.trim() === "") {
//     throw new Error("No text available");
//   }
//   try {
//     text = text.replace(/[^a-zA-Z0-9\s]/g, "");
//     console.log("received text", text);
//     const createJobResponse = await createTTSJob({ text });
//     const { eta, id } = createJobResponse?.data;
//     if (!id) {
//       throw new Error("Failed to create TTS job id ");
//     }
//     const jobStatusResponse = await checkAPIStatus(eta, id);

//     console.log("job status URL ", jobStatusResponse);
//   } catch (error) {
//     console.log("Speed generation failed", error);
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

  const prompt = `
    Create a recipe based on the following:
    Ingredients: ${ingredients || "None specified"}
    Meal Type: ${mealType}
    Cuisine Preference: ${cuisine || "None specified"}
    Cooking Time: ${cookingTime}
    Complexity: ${complexity}
    Include preparation steps and provide a suitable name.
    Format your response in *Markdown* to make it easier to render on webpage.
  `;

  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content: "You are a wonder Chef and can deliver recipes of any kind.",
        },
        { role: "user", content: prompt },
      ],
      stream: true,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
    });

    let recepie = "";
    for await (const chunk of response) {
      recepie += chunk.choices[0]?.delta?.content || "";
    }

    const recipeRegex = /receipe/gi;
    const formattedRecipe = recepie.replace(
      recipeRegex,
      '<strong style="font-size: 1.2em;">$&</strong>'
    );

    res.status(200).json({
      success: true,
      message: formattedRecipe,
      imageUrl: null,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating recipe. " + error.message,
    });
  }
});

router.post("/tts", async (req, res) => {
  let { text } = req.body;

  if (!text || text.trim() === "") {
    throw new Error("No text available");
  }
  try {
    text = text.replace(/[^a-zA-Z0-9\s]/g, "");
    console.log("Received text:", text);
    const createJobResponse = await createTTSJob({ text });
    const { eta, id } = createJobResponse?.data;
    if (!id) {
      throw new Error("Failed to create TTS job ID.");
    }
    const jobStatusResponse = await checkAPIStatus(eta, id);

    console.log("Job status URL:", jobStatusResponse);
  } catch (error) {
    console.log("Speech generation failed", error);
    throw error;
  }
});

module.exports = router;
