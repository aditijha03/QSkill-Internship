import React, { useState, useCallback, useEffect } from "react";

function App() {
  // Step 1: useState to hold the random string
  const [randomString, setRandomString] = useState("");

  // Step 2: useCallback to memoize the generator function
  const generateString = useCallback(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomString(result);
  }, []);

  // Step 3: useEffect to log whenever the string changes
  useEffect(() => {
    if (randomString) {
      console.log("New random string generated:", randomString);
    }
  }, [randomString]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Random String Generator</h1>
      <button onClick={generateString}>Generate String</button>
      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        {randomString ? randomString : "Click the button to generate a string"}
      </p>
    </div>
  );
}

export default App;