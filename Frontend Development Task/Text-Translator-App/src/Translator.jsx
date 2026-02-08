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

// import { useState } from "react";
// import api from "./api";

// const Translator = () => {
//   const [text, setText] = useState("");
//   const [sourceLang, setSourceLang] = useState("auto");
//   const [targetLang, setTargetLang] = useState("es");
//   const [translatedText, setTranslatedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

// //   const translateText = async () => {
// //     if (!text.trim()) return;

// //     setLoading(true);
// //     setError("");
// //     setTranslatedText("");

// //     try {
// //       const params = new URLSearchParams();
// //       params.append("source_language", sourceLang);
// //       params.append("target_language", targetLang);
// //       params.append("text", text);

// //       const response = await api.post("/translate", params);
// //       setTranslatedText(response.data.data.translatedText);
// //     } catch (err) {
// //       console.error(err);
// //       setError("Translation failed.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const translateText = async () => {
//   if (!text.trim()) return;

//   setLoading(true);
//   setError("");
//   setTranslatedText("");

//   try {
//     let source = sourceLang;

//     // Step 1: Auto-detect if selected
//     if (sourceLang === "auto") {
//       const detectParams = new URLSearchParams();
//       detectParams.append("text", text);

//       console.log("Detect request body:", detectParams.toString());
//       console.log("Detect headers:", api.defaults.headers);

//       const detectResponse = await api.post("/detect", detectParams);
//       console.log("Detect response:", detectResponse.data);

//       source = detectResponse.data.data.language;
//     }

//     // Step 2: Translate
//     const translateParams = new URLSearchParams();
//     translateParams.append("source_language", source);
//     translateParams.append("target_language", targetLang);
//     translateParams.append("text", text);

//     console.log("Translate request body:", translateParams.toString());
//     console.log("Translate headers:", api.defaults.headers);

//     const response = await api.post("/translate", translateParams);
//     console.log("Translate response:", response.data);

//     setTranslatedText(response.data.data.translatedText);
//   } catch (err) {
//     console.error("Translation error:", err);
//     setError("Translation failed.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-center mb-4">
//           Text Translator
//         </h1>

//         <textarea
//           className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           rows={4}
//           placeholder="Enter text..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         <select
//           className="w-full p-2 border rounded-lg mb-3"
//           value={sourceLang}
//           onChange={(e) => setSourceLang(e.target.value)}
//         >
//           <option value="auto">Auto Detect</option>
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//           <option value="es">Spanish</option>
//           <option value="fr">French</option>
//           <option value="de">German</option>
//         </select>

//         <select
//           className="w-full p-2 border rounded-lg mb-4"
//           value={targetLang}
//           onChange={(e) => setTargetLang(e.target.value)}
//         >
//           <option value="es">Spanish</option>
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//           <option value="fr">French</option>
//           <option value="de">German</option>
//         </select>

//         <button
//           onClick={translateText}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
//         >
//           {loading ? "Translating..." : "Translate"}
//         </button>

//         {error && (
//           <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
//         )}

//         {translatedText && (
//           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//             <h2 className="font-semibold mb-1">Translated Text</h2>
//             <p className="text-gray-700">{translatedText}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Translator;


// import React, { useState } from "react";
// import api from "./api";

// const Translator = () => {
//   const [text, setText] = useState("");
//   const [sourceLang, setSourceLang] = useState("auto");
//   const [targetLang, setTargetLang] = useState("es");
//   const [translatedText, setTranslatedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const translateText = async () => {
//     if (!text.trim()) return;

//     setLoading(true);
//     setError("");
//     setTranslatedText("");

//     try {
//       let source = sourceLang;

//       // Step 1: Detect source language if "auto" is selected
//       if (sourceLang === "auto") {
//         const detectParams = new URLSearchParams();
//         detectParams.append("text", text);

//         console.log("Detect request body:", detectParams.toString());
//         console.log("Detect headers:", api.defaults.headers);

//         const detectResponse = await api.post("/detect", detectParams);
//         console.log("Detect response:", detectResponse.data);

//         source = detectResponse.data.data.language || "en"; // fallback to English
//       }

//       // Step 2: Translate using detected or chosen source
//       const translateParams = new URLSearchParams();
//       translateParams.append("source_language", source);
//       translateParams.append("target_language", targetLang);
//       translateParams.append("text", text);

//       console.log("Translate request body:", translateParams.toString());
//       console.log("Translate headers:", api.defaults.headers);

//       const response = await api.post("/translate", translateParams);
//       console.log("Translate response:", response.data);

//       setTranslatedText(response.data.data.translatedText);
//     } catch (err) {
//       console.error("Translation error:", err);
//       setError("Translation failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-center mb-4">Text Translator</h1>

//         <textarea
//           className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           rows={4}
//           placeholder="Enter text..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         <select
//           className="w-full p-2 border rounded-lg mb-3"
//           value={sourceLang}
//           onChange={(e) => setSourceLang(e.target.value)}
//         >
//           <option value="auto">Auto Detect</option>
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//           <option value="es">Spanish</option>
//           <option value="fr">French</option>
//           <option value="de">German</option>
//         </select>

//         <select
//           className="w-full p-2 border rounded-lg mb-4"
//           value={targetLang}
//           onChange={(e) => setTargetLang(e.target.value)}
//         >
//           <option value="es">Spanish</option>
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//           <option value="fr">French</option>
//           <option value="de">German</option>
//         </select>

//         <button
//           onClick={translateText}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
//         >
//           {loading ? "Translating..." : "Translate"}
//         </button>

//         {error && (
//           <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
//         )}

//         {translatedText && !loading && (
//           <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//             <h2 className="font-semibold mb-1">Translated Text</h2>
//             <p className="text-gray-700">{translatedText}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Translator;