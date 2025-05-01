import React, { useState } from "react";
import { firebaseConfig, openAiKey } from "./config";

export default function App() {
  const [meal, setMeal] = useState("");
  const [mealResult, setMealResult] = useState("");

  const handleMealSubmit = async () => {
    if (!openAiKey) return setMealResult("Missing OpenAI Key");
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Give UK nutritional breakdown of: ${meal}` }],
        max_tokens: 150
      })
    });
    const data = await res.json();
    setMealResult(data?.choices?.[0]?.message?.content || "No result");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Fitness Tracker</h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Log a Meal</h2>
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          placeholder="e.g., Chicken wrap with Nando's sauce"
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleMealSubmit}
        >
          Get Macros
        </button>
        {mealResult && (
          <div className="mt-4 bg-gray-50 p-3 rounded border">
            <pre className="whitespace-pre-wrap">{mealResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
