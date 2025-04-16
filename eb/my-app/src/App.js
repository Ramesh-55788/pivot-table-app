import React, { useState } from "react";

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithExponentialBackoff(fn, maxRetries = 5, baseDelay = 500) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn();
      return result;
    } 
    catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      const delay = baseDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 100;
      await wait(delay + jitter);
    }
  }
}

function App() {
  const [message, setMessage] = useState("Click the button to start");
  const [count, setCount] = useState(0);

  const simulateAPI = async () => {
    setCount(prev => prev + 1);
    if (count < 3) {
      throw new Error("API failure");
    }
    return "Data fetched successfully";
  };

  const handleClick = async () => {
    setMessage("Loading...");
    try {
      const result = await retryWithExponentialBackoff(simulateAPI);
      setMessage(result);
    } 
    catch (error) {
      setMessage("Failed after multiple attempts");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Exponential Backoff Retry</h1>
      <p>{message}</p>
      <button onClick={handleClick} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Try API Call
      </button>
    </div>
  );
}

export default App;
