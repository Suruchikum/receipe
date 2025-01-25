import React, { useState } from "react";

import RecipeCard from "./RecipeCard";
import Markdown from "react-markdown";

// import axios from "axios";
function App() {
  // const [text, setText] = useState("");
  // const [audioUrl, setAudioUrl] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  async function generateVoice(text) {
    try {
      const response = await fetch("http://localhost:4800/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      console.log("TTS Job Created:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function checkJobStatus(jobId) {
    try {
      const response = await fetch(
        `http://localhost:4800/api/tts/status?id=${jobId}`
      );
      const data = await response.json();
      console.log("Job Status:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="App">
      <div className="flex flex-row h-full my-4 gap-2 justify-center">
        {/* Recipe Input Form */}
        <RecipeCard recipeContent={setRecipeText} />

        {/* Recipe Output Box */}
        <div className="w-[400px] h-[565px] text-xs text-gray-600 p-4 border rounded-lg shadow-xl whitespace-pre-line overflow-y-auto">
          {<Markdown>{recipeText}</Markdown> ||
            "Your recipe will appear here..."}
          <button onClick={() => generateVoice(recipeText)}>
            Convert to Speech
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
