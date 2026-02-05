import React, { useState, useCallback, useEffect } from "react";

function App() {
  const [randomString, setRandomString] = useState("");

  const generateString = useCallback(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomString(result);
  }, []);

  useEffect(() => {
    if (randomString) {
      console.log("Generated String:", randomString);
    }
  }, [randomString]);

  return (
  //   <div style={{ textAlign: "center", marginTop: "50px" }}>
  //     <h1>Random String Generator</h1>
  //     <button onClick={generateString}>Generate String</button>
  //     <p style={{ fontSize: "20px", marginTop: "20px" }}>
  //       {randomString || "Click the button to generate a string"}
  //     </p>
  //   </div>
  // );
  <div className="app-container">
    <h1>Random String Generator</h1>
    <button onClick={generateString}>Generate String</button>
    <p className="random-string">
      {randomString || "Click the button to generate a string"}
    </p>
  </div>
);
}

export default App;