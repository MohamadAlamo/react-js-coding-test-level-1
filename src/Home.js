import "./App.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// "http://localhost:3000/#/pokedex"
function Home() {
  const [text, setText] = useState();
  const [isReady, setIsReady] = useState();
  const [isReadyToClick, setIsReadyToClick] = useState();
  function onClick() {
    if (isReady) {
      window.location = "http://localhost:3000/#/pokedex";
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={onClick}>
          <img
            hidden={false}
            src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
            className="App-logo"
            alt="logo"
            style={{ padding: "10px" }}
          />
        </div>

        <b>
          Requirement: Try to show the hidden image and make it clickable that
          goes to /pokedex when the input below is "Ready!" remember to hide the
          red text away when "Ready!" is in the textbox.
        </b>
        <p>Are you ready to be a pokemon master?</p>
        <input
          type="text"
          name="name"
          value={text}
          onKeyUp={setIsReady}
          onChangeText={(text) => {
            setText(text);
          }}
        />
        {!isReady ? (
          <span style={{ color: "red" }}>I am not ready yet!</span>
        ) : (
          <span style={{ color: "white" }}>I am ready</span>
        )}
      </header>
    </div>
  );
}

export default Home;
