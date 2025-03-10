// import React, { useState } from "react";
// import "./index.css"; // Import the CSS file

// const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
// console.log("API_BASE_URL: ", API_BASE_URL);

// const RecipeCard = ({ recipeContent }) => {
//   const [ingredients, setIngredients] = useState("");
//   const [mealType, setMealType] = useState("Breakfast");
//   const [cuisine, setCuisine] = useState("");
//   const [cookingTime, setCookingTime] = useState("Less than 30 minutes");
//   const [complexity, setComplexity] = useState("Beginner");
//   const [image, setImage] = useState("/images/food.jpeg");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const queryParams = {
//       ingredients,
//       mealType,
//       cuisine,
//       cookingTime,
//       complexity,
//     };

//     const queryString = Object.keys(queryParams)
//       .map(
//         (key) =>
//           `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
//       )
//       .join("&");

//     const url = `${API_BASE_URL}/recipeStream?${queryString}`;
//     const response = await fetch(url)
//       .then((response) => response.text()) // Read response as text first
//       .then((text) => {
//         return JSON.parse(text); // Convert to JSON manually if needed
//       })
//       .then((data) => {
//         if (data.success) {
//           recipeContent(data.message);
//           // reset form
//           setIngredients("");
//           setCuisine("");
//           setComplexity("Beginner");
//           setCookingTime("Less than 30 minutes");
//           setMealType("Breakfast");
//         }
//       })
//       .catch((error) => console.error("Fetch Error:", error));
//   };

//   return (
//     <div className="head">
//       <h1>Food Receipe </h1>
//       <div className="recipe-card">
//         {/* <h2>Receipe Generator</h2> */}

//         <div className="image-container">
//           <img src={image} alt="Recipe" />
//         </div>

//         <label>Ingredients</label>
//         <input
//           type="text"
//           placeholder="Enter ingredients (comma-separated)"
//           value={ingredients}
//           onChange={(e) => setIngredients(e.target.value)}
//         />

//         <label>Meal Type</label>
//         <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
//           <option>Breakfast</option>
//           <option>Lunch</option>
//           <option>Dinner</option>
//           <option>Snack</option>
//         </select>

//         <label>Cuisine</label>
//         <input
//           type="text"
//           placeholder="e.g., Italian, Mexican"
//           value={cuisine}
//           onChange={(e) => setCuisine(e.target.value)}
//         />

//         <label>Cooking Time</label>
//         <select
//           value={cookingTime}
//           onChange={(e) => setCookingTime(e.target.value)}
//         >
//           <option>Less than 30 minutes</option>
//           <option>30-60 minutes</option>
//           <option>More than 1 hour</option>
//         </select>

//         <label>Complexity</label>
//         <select
//           value={complexity}
//           onChange={(e) => setComplexity(e.target.value)}
//         >
//           <option>Beginner</option>
//           <option>Intermediate</option>
//           <option>Advanced</option>
//         </select>

//         <button onClick={handleSubmit}>Generate Recipe</button>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;
import React, { useState } from "react";
import "./index.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
console.log("API_BASE_URL: ", API_BASE_URL);

const RecipeCard = ({ recipeContent, setRecipeImage }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("Less than 30 minutes");
  const [complexity, setComplexity] = useState("Beginner");
  const [image, setImage] = useState("/images/food7.jpg");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${API_BASE_URL}/recipeStream?${queryString}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch recipe");

      const data = await response.json();

      if (data.success) {
        recipeContent(data.message);
        setImage(data.imageUrl || "/images/food7.jpg"); // Update image from API
        setRecipeImage(data.imageUrl || "/images/food7.jpg");
        // Reset form
        setIngredients("");
        setCuisine("");
        setComplexity("Beginner");
        setCookingTime("Less than 30 minutes");
        setMealType("Breakfast");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  // const generateImage = async (ingredients) => {
  //   try {
  //     const response = await fetch("http://your-server-url/generate-image", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ingredients }),
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       console.log("Generated Image URL:", data.imageUrl);
  //     } else {
  //       console.error("Failed to generate image");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div className="head">
      <h1>Food Recipe</h1>
      <div className="recipe-card" style={{ backgroundImage: `url(${image})` }}>
        {/* <div className="image-container">
          <img src={image} alt="Recipe" />
        </div> */}

        <div>
          <label>Ingredients</label>
          <input
            type="text"
            placeholder="Enter ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <div>
          <label>Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>

        <div>
          <label>Cuisine</label>
          <input
            type="text"
            placeholder="e.g., Italian, Mexican"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>

        <div>
          <label>Cooking Time</label>
          <select
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          >
            <option>Less than 30 minutes</option>
            <option>30-60 minutes</option>
            <option>More than 1 hour</option>
          </select>
        </div>

        <div>
          <label>Complexity</label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div>
          <button onClick={handleSubmit}>Generate Recipe</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
