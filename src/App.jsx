import React, { useState } from "react";
import Checkbox from "./components/Checkbox";
import "./App.css";
import zxcvbn from "zxcvbn";

function App() {
  const [password, setPassword] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [type, setType] = useState("input");
  const [score, setScore] = useState(null);

  const [handleText, sethandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPassword({
      ...password,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    const characterCodes = Array.from(Array(26), (_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((letter) =>
      String.fromCharCode(letter)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = password;

    const generateTheWorld = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(uppercase ? upperCaseLetters : []),
        ...(lowercase ? lowerCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];

      const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
      };

      const shuffledCharacters = shuffleArray(availableCharacters).slice(
        0,
        length
      );
      sethandleText(shuffledCharacters.join(""));
    };

    generateTheWorld(length, uppercase, lowercase, numbers, symbols);
  }

  function testStrengthPassword(e) {
    const passwordValue = e.target.value;
    const result = zxcvbn(passwordValue);
    setScore(result.score);
  }

  function showHide() {
    setType(type === "input" ? "password" : "input");
  }

  return (
    <div className="App">
      <div className="card">
        <h2>Password Generator</h2>
        <div className="cont1">
          <input
            type="text"
            value={handleText}
            onChange={(e) => sethandleText(e.target.value)}
            className="password-box x"
          />
          <button
            className="copy-button y"
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </div>
        <br />
        <div>
          <div className="cont">
            <div>
              <label>Password length</label>
            </div>
            <div>
              <input
                type="number"
                className="pass"
                value={password.length}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>
          </div>
          <div className="cont">
            <div className="checkbox-container">
              <div>
                <label className="checkbox-label">
                  Include uppercase letters
                </label>
              </div>
              <div>
                <Checkbox
                  value={password.uppercase}
                  onChange={handleChangeUppercase}
                />
              </div>
            </div>
          </div>
          <div className="cont">
            <div className="checkbox-container">
              <div>
                <label className="checkbox-label">
                  Include lowercase letters
                </label>
              </div>
              <div>
                <Checkbox
                  value={password.lowercase}
                  onChange={handleChangeLowercase}
                />
              </div>
            </div>
          </div>
          <div className="cont">
            <div className="checkbox-container">
              <div>
                <label className="checkbox-label">Include numbers</label>
              </div>
              <div>
                <Checkbox
                  value={password.numbers}
                  onChange={handleChangeNumbers}
                />
              </div>
            </div>
          </div>
          <div className="cont">
            <div className="checkbox-container">
              <div>
                <label className="checkbox-label">Include symbols</label>
              </div>
              <div>
                <Checkbox
                  value={password.symbols}
                  onChange={handleChangeSymbols}
                />
              </div>
            </div>
          </div>
          <br />
        </div>
        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        </div>
      </div>
      <br />
      <br />
      <label className="label-password">
        <h2>Password Strength</h2>
        <input
          type={type}
          className="input-password"
          onChange={testStrengthPassword}
        />
        <span className="show-password" onClick={showHide}>
          {type === "input" ? "Hide" : "Show"}
        </span>
        <span className="strength-password" data-score={score} />
      </label>
      <br />
      <br />
      <a href="https://github.com/dropbox/zxcvbn" target="-blank">
        zxcvbn
      </a>{" "}
      powered strength tester
      <br />
      <br />
      <div className="erdemlabel">
        <a
          href="https://github.com/erdemonal11"
          target="_blank"
          className="erdemlabel"
        >
          erdemapps.
        </a>
      </div>
    </div>
  );
}

export default App;
