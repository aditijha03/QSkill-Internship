import React, { useState } from "react";
import api from "./api";
import qs from "qs"; // install this with `npm install qs`

const Translator = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("es");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateText = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = qs.stringify({
        source_language: "en",
        target_language: language,
        text: text,
      });

      console.log("Sending request to /translate with:", payload);

      const response = await api.post("/translate", payload);

      console.log("Translate response:", response.data);

      const translatedText = response.data.data.translatedText;
      setTranslated(translatedText);
    } catch (err) {
      console.error("Translation error:", err);
      setError("Translation failed. Check API key, host, or response format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🌍 Text Translator</h1>

      <textarea
        className="w-full max-w-md p-3 border rounded-lg mb-4"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="w-full max-w-md p-2 border rounded-lg mb-4"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
        <option value="ja">Japanese</option>
      </select>

      <button
        onClick={translateText}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {error && (
        <p className="mt-4 text-red-600 font-semibold">{error}</p>
      )}

      {translated && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg w-full max-w-md">
          <h2 className="font-semibold">Translated Text:</h2>
          <p className="mt-2 text-gray-700">{translated}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
 
