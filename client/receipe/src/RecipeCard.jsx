import React, { useEffect, useState } from "react";


const API_BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('API_BASE_URL: ', API_BASE_URL);

const RecipeCard = ({ recipeContent }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("Less than 30 minutes");
  const [complexity, setComplexity] = useState("Beginner");

  /*   useEffect(() => {
    fetch(`${API_BASE_URL}/recipeStream`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, []); */

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
     .then(response => response.text()) // Read response as text first
      .then(text => {
        return JSON.parse(text); // Convert to JSON manually if needed
      })
  .then(data => {
    if(data.success) {
      recipeContent(data.message);
      // reset form
      setIngredients("")
      setCuisine("")
      setComplexity("Beginner")
      setCookingTime("Less than 30 minutes")
      setMealType("Breakfast")     

    }
  })
  .catch(error => console.error("Fetch Error:", error));
  };

  return (
    <div className="w-[400px] border rounded-lg shadow-lg p-6">
      <h2 className="font-bold text-xl mb-4">Recipe Generator</h2>

      <label className="block mb-2">Ingredients</label>
      <input
        type="text"
        className="border rounded w-full p-2 mb-4"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <label className="block mb-2">Meal Type</label>
      <select
        className="border rounded w-full p-2 mb-4"
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
      >
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snack</option>
      </select>

      <label className="block mb-2">Cuisine</label>
      <input
        type="text"
        className="border rounded w-full p-2 mb-4"
        placeholder="e.g., Italian, Mexican"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />

      <label className="block mb-2">Cooking Time</label>
      <select
        className="border rounded w-full p-2 mb-4"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
      >
        <option>Less than 30 minutes</option>
        <option>30-60 minutes</option>
        <option>More than 1 hour</option>
      </select>

      <label className="block mb-2">Complexity</label>
      <select
        className="border rounded w-full p-2 mb-4"
        value={complexity}
        onChange={(e) => setComplexity(e.target.value)}
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={handleSubmit}
      >
        Generate Recipe
      </button>
    </div>
  );
};

export default RecipeCard;
