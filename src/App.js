import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const serviceUrl =
    process.env.UNDERCUT_SERVICE_URL || "http://localhost:3000";
  const [data, setData] = useState([]);

  const [message, setMessage] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log(`Making get request at ${serviceUrl}`);
    const response = await fetch(serviceUrl);
    const apiData = await response.json();
    console.log(apiData);
    setData(apiData.message);
    console.log(`Received data from our api: ${JSON.stringify(apiData)}`);
    return apiData;
  };

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const postUrl = `${serviceUrl}/message`;
    const response = await fetch(postUrl, {
      method: "post",
      body: { message: event.target.value },
    });
    console.log(
      `Response from POST request is: ${JSON.stringify(response.JSON)}`
    );
  };

  const handleMessageChange = (event) => {
    console.log(`value be: ${event.target.value}`);
    setMessage(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Undercut <span role="img">💇</span>
        </p>

        <form onSubmit={handleMessageSubmit}>
          <label>
            Message:
            <input type="text" onChange={handleMessageChange} />
          </label>
          <p>Your Message is: {message}</p>
          <input type="submit" value="Submit" />
        </form>

        <p>
          Received data from our api: <strong>{data}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
