import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const serviceUrl =
    process.env.UNDERCUT_SERVICE_URL || "http://localhost:3000/";
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log(`Making request at ${serviceUrl}`);
    const response = await fetch(serviceUrl);
    const apiData = await response.json();
    console.log(apiData);
    setData(apiData.message);
    console.log(`Received data from our api: ${JSON.stringify(apiData)}`);
    return apiData;
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Undercut <span role="img">💇</span>
        </p>

        <form>
            <label>
                Location: 
                <input type="text" location="location" />
            </label>
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
