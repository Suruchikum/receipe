// import React, { useEffect, useState } from "react";
// import "./index.css";

// const API_BASE_URL = process.env.REACT_APP_BASE_URL;
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
//     <div className="w-[400px] border rounded-lg shadow-lg p-6">
//       {/* <h2 className="head">Recipe Generator</h2> */}
//       <h2
//         className="font-bold text-xl mb-4"
//         style={{

//           textAlign: "center",
//           fontWeight: "bold",
//           fontSize: "24px",
//           color: "green",
//           textDecoration: "underline",
//         }}
//       >
//         Recipe Generator
//       </h2>{" "}
//       <div
//         className="image-container"
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src={image}
//           alt="Recipe"
//           style={{
//             width: "1500px",
//             height: "400px",
//             // objectFit: "cover",
//             borderRadius: "5px",
//             boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
//           }}
//         />
//       </div>{" "}
//       <label className="block mb-2">Ingredients</label>
//       <input
//         type="text"
//         className="border rounded w-full p-2 mb-4"
//         placeholder="Enter ingredients (comma-separated)"
//         value={ingredients}
//         onChange={(e) => setIngredients(e.target.value)}
//       />
//       <label className="block mb-2">Meal Type</label>
//       <select
//         className="border rounded w-full p-2 mb-4"
//         value={mealType}
//         onChange={(e) => setMealType(e.target.value)}
//       >
//         <option>Breakfast</option>
//         <option>Lunch</option>
//         <option>Dinner</option>
//         <option>Snack</option>
//       </select>
//       <label className="block mb-2">Cuisine</label>
//       <input
//         type="text"
//         className="border rounded w-full p-2 mb-4"
//         placeholder="e.g., Italian, Mexican"
//         value={cuisine}
//         onChange={(e) => setCuisine(e.target.value)}
//       />
//       <label className="block mb-2">Cooking Time</label>
//       <select
//         className="border rounded w-full p-2 mb-4"
//         value={cookingTime}
//         onChange={(e) => setCookingTime(e.target.value)}
//       >
//         <option>Less than 30 minutes</option>
//         <option>30-60 minutes</option>
//         <option>More than 1 hour</option>
//       </select>
//       <label className="block mb-2">Complexity</label>
//       <select
//         className="border rounded w-full p-2 mb-4"
//         value={complexity}
//         onChange={(e) => setComplexity(e.target.value)}
//       >
//         <option>Beginner</option>
//         <option>Intermediate</option>
//         <option>Advanced</option>
//       </select>
//       <button
//         className="bg-blue-500 text-white p-2 rounded w-full"
//         onClick={handleSubmit}
//       >
//         Generate Recipe
//       </button>
//     </div>
//   );
// };

// export default RecipeCard;
import React, { useState } from "react";
import "./index.css"; // Import the CSS file

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
console.log("API_BASE_URL: ", API_BASE_URL);

const RecipeCard = ({ recipeContent }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("Less than 30 minutes");
  const [complexity, setComplexity] = useState("Beginner");
  const [image, setImage] = useState("/images/food.jpeg");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };

    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      )
      .join("&");

    const url = `${API_BASE_URL}/recipeStream?${queryString}`;
    const response = await fetch(url)
      .then((response) => response.text()) // Read response as text first
      .then((text) => {
        return JSON.parse(text); // Convert to JSON manually if needed
      })
      .then((data) => {
        if (data.success) {
          recipeContent(data.message);
          // reset form
          setIngredients("");
          setCuisine("");
          setComplexity("Beginner");
          setCookingTime("Less than 30 minutes");
          setMealType("Breakfast");
        }
      })
      .catch((error) => console.error("Fetch Error:", error));
  };

  return (
    <div className="head">
      <h1>Food Receipe </h1>
      <div className="recipe-card">
        {/* <h2>Receipe Generator</h2> */}

        <div className="image-container">
          <img src={image} alt="Recipe" />
        </div>

        <label>Ingredients</label>
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Meal Type</label>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snack</option>
        </select>

        <label>Cuisine</label>
        <input
          type="text"
          placeholder="e.g., Italian, Mexican"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />

        <label>Cooking Time</label>
        <select
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        >
          <option>Less than 30 minutes</option>
          <option>30-60 minutes</option>
          <option>More than 1 hour</option>
        </select>

        <label>Complexity</label>
        <select
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <button onClick={handleSubmit}>Generate Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;
