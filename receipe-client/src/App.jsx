import React, { useState } from "react";

import RecipeCard from "./RecipeCard";
import Markdown from "react-markdown";

// import axios from "axios";
function App() {
  // const [text, setText] = useState("");
  // const [audioUrl, setAudioUrl] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  async function generateVoice(text) {
    try {
      const response = await fetch("http://localhost:4700/api/tts", {
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

  const readRecipe = () => {
    if (!recipeText) return;

    const utterance = new SpeechSynthesisUtterance(recipeText);
    console.log(utterance.pitch, utterance.rate);
    utterance.lang = "en-US";

    // Get the available voices
    const voices = speechSynthesis.getVoices();
    // Find the voice you want (replace "hi-IN" with the actual voice name or a more robust search)
    let selectedVoice = null;
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name.includes("hi-IN") || voices[i].lang === "hi-IN") {
        // Use includes for partial matches
        selectedVoice = voices[i];
        break;
      }
    }
    utterance.voice = selectedVoice ?? null;
    console.log(utterance);

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
    console.log("stopped speaking ");
  };

  const toggleSpeech = () => {
    if (speechSynthesis.speaking) {
      if (isPaused) {
        speechSynthesis.resume();
        console.log("Speech resumed");
      } else {
        speechSynthesis.pause();
        console.log("Speech paused");
      }
      setIsPaused((prev) => !prev);
    }
  };

  async function checkJobStatus(jobId) {
    try {
      const response = await fetch(
        `http://localhost:4700/api/tts/status?id=${jobId}`
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
        {recipeText && (
          <div className="speakersGroup">
            <button onClick={readRecipe} disabled={isSpeaking}>
              {" "}
              🔊 Read recipe
            </button>
            <button onClick={toggleSpeech} disabled={!isSpeaking}>
              {isPaused ? "▶️ Resume" : "⏸️ Pause"}
            </button>
          </div>
        )}
        {/* Recipe Output Box */}
        <div className="recepieContainer">
          {<Markdown>{recipeText}</Markdown> ||
            "Your recipe will appear here..."}
        </div>
      </div>
    </div>
  );
}

export default App;
