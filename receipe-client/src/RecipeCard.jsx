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
// import React, { useState } from "react";
// import "./index.css";

// const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
// console.log("API_BASE_URL: ", API_BASE_URL);

// const RecipeCard = ({ recipeContent, setRecipeImage, invalidIngredients }) => {
//   const [ingredients, setIngredients] = useState("");
//   const [mealType, setMealType] = useState("Breakfast");
//   const [cuisine, setCuisine] = useState("");
//   const [cookingTime, setCookingTime] = useState("Less than 30 minutes");
//   const [complexity, setComplexity] = useState("Beginner");
//   const [image, setImage] = useState("/images/food7.jpg");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!ingredients.trim()) {
//       setErrorMessage("Please enter ingredients first.");
//       return;
//     }
//     setErrorMessage("");
//     const queryParams = {
//       ingredients,
//       mealType,
//       cuisine,
//       cookingTime,
//       complexity,
//     };
//     const queryString = new URLSearchParams(queryParams).toString();
//     const url = `${API_BASE_URL}/recipeStream?${queryString}`;

//     try {
//       const response = await fetch(url);
//       // if (!response.ok) throw new Error("Failed to fetch recipe");

//       const data = await response.json();
//       if (data.success) {
//         console.log(data.message);
//         recipeContent(data.message.replace(/\\n/g, "\n"));
//         setImage(data.imageUrl || "/images/food7.jpg"); // Update image from API
//         setRecipeImage(data.imageUrl || "/images/food7.jpg");
//       } else {
//         console.log("invalid ingredient");
//         console.log(data.invalidIngredients, data.invalidIngredients.message);
//         invalidIngredients(data.invalidIngredients.message);
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       // Reset form
//       setIngredients("");
//       setCuisine("");
//       setComplexity("Beginner");
//       setCookingTime("Less than 30 minutes");
//       setMealType("Breakfast");
//     }
//   };

//   return (
//     <div className="head">
//       <h1>Food Recipe</h1>
//       <div className="recipe-card" style={{ backgroundImage: `url(${image})` }}>
//         {/* <div className="image-container">
//           <img src={image} alt="Recipe" />
//         </div> */}

//         <div>
//           <label>Ingredients</label>
//           <input
//             type="text"
//             placeholder="Enter ingredients (comma-separated)"
//             value={ingredients}
//             onChange={(e) => setIngredients(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>Meal Type</label>
//           <select
//             value={mealType}
//             onChange={(e) => setMealType(e.target.value)}
//           >
//             <option>Breakfast</option>
//             <option>Lunch</option>
//             <option>Dinner</option>
//             <option>Snack</option>
//           </select>
//         </div>

//         <div>
//           <label>Cuisine</label>
//           <input
//             type="text"
//             placeholder="e.g., Italian, Mexican,Indian"
//             value={cuisine}
//             onChange={(e) => setCuisine(e.target.value)}
//           />
//         </div>

//         <div>
//           <label>Cooking Time</label>
//           <select
//             value={cookingTime}
//             onChange={(e) => setCookingTime(e.target.value)}
//           >
//             <option>Less than 30 minutes</option>
//             <option>30-60 minutes</option>
//             <option>More than 1 hour</option>
//           </select>
//         </div>

//         <div>
//           <label>Complexity</label>
//           <select
//             value={complexity}
//             onChange={(e) => setComplexity(e.target.value)}
//           >
//             <option>Beginner</option>
//             <option>Intermediate</option>
//             <option>Advanced</option>
//           </select>
//         </div>

//         <div>
//           <button onClick={handleSubmit}>Generate Recipe</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;
import React, { useState } from "react";
import "./index.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
console.log("API_BASE_URL: ", API_BASE_URL);

const RecipeCard = ({
  recipeContent,
  // setRecipeImage,
  invalidIngredients,
  // setIsLoading,
}) => {
  const [formData, setFormData] = useState({
    ingredients: "",
    mealType: "Breakfast",
    cuisine: "",
    cookingTime: "Less than 30 minutes",
    complexity: "Beginner",
  });

  const [image, setImage] = useState("/images/food7.jpg");
  const [errorMessage, setErrorMessage] = useState("");
  // const [IsLoading, , setIsLoading] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ingredients.trim()) {
      setErrorMessage("Please enter ingredients first.");
      return;
    }

    setErrorMessage("");
    // setIsLoading(true);

    try {
      const queryString = new URLSearchParams(formData).toString();
      const response = await fetch(
        `${API_BASE_URL}/recipeStream?${queryString}`
      );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("data", data);
      if (data.success) {
        recipeContent(data.message.replace(/\\n/g, "\n"));
        // setImage(data.imageUrl || "/images/food7.jpg");
        // setRecipeImage(data.imageUrl || "/images/food7.jpg");
      } else {
        // invalidIngredients(data.invalidIngredients?.message || []);
        // Handle invalid ingredients case
        const invalidItems = data.invalidIngredients || [];
        const errorMsg =
          invalidItems.length > 0
            ? `Invalid ingredients: ${invalidItems.join(", ")}`
            : data.message || "Invalid ingredients found";
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setErrorMessage(error.message || "Failed to fetch recipe");
    } finally {
      // setIsLoading(false);
      setFormData({
        ingredients: "",
        mealType: "Breakfast",
        cuisine: "",
        cookingTime: "Less than 30 minutes",
        complexity: "Beginner",
      });
    }
  };

  return (
    <div className="head">
      <h1>Food Recipe</h1>

      <div className="recipe-card" style={{ backgroundImage: `url(${image})` }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Ingredients</label>
            <input
              type="text"
              name="ingredients"
              placeholder="Enter ingredients (comma-separated)"
              value={formData.ingredients}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Meal Type</label>
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
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
              name="cuisine"
              placeholder="e.g., Italian, Mexican, Indian"
              value={formData.cuisine}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Cooking Time</label>
            <select
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
            >
              <option>Less than 30 minutes</option>
              <option>30-60 minutes</option>
              <option>More than 1 hour</option>
            </select>
          </div>

          <div>
            <label>Complexity</label>
            <select
              name="complexity"
              value={formData.complexity}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {errorMessage && (
            <div>
              <p className="error">{errorMessage}</p>
            </div>
          )}

          <div>
            <button type="submit">Generate Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeCard;
