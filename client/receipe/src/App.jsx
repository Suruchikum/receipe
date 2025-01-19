import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Markdown from 'react-markdown'


function App() {
  const [recipeText, setRecipeText] = useState("");
 
  // Function to Handle Form Submission


  return (
    <div className="App">
      <div className="flex flex-row h-full my-4 gap-2 justify-center">
        {/* Recipe Input Form */}
        <RecipeCard  recipeContent={setRecipeText} />

        {/* Recipe Output Box */}
        <div className="w-[400px] h-[565px] text-xs text-gray-600 p-4 border rounded-lg shadow-xl whitespace-pre-line overflow-y-auto">
          {<Markdown>{recipeText}</Markdown> || "Your recipe will appear here..."}
         
        </div>
      </div>
    </div>
  );
}

export default App;
