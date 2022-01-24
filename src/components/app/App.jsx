import React, { useState } from "react";
import "../../styles/app/app.css";
import axios from "axios";

export default function App() {
  const [file, setFile] = useState(null);

  async function colorizeImage(e) {
    e.preventDefault();
    try {
      if (file) {
        const data = new FormData();
        const filename = file.name;
        data.append("name", filename);
        data.append("image", file);
        try {
          await axios.post("http://127.0.0.1:5000//predict", data);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {}
  }

  return (
    <div className="app__container">
      <div className="title">
        <h1>Image Colorizer</h1>
        <p>
          Let there be colorful! Colorize pictures with AI, turning black and
          white photos to color in seconds.
        </p>
      </div>
      <main>
        <div className="input__container">
          <div className="header"></div>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className="input__upload__pic"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file ? (
            <img src={URL.createObjectURL(file)} alt="" className="pic" />
          ) : (
            <label htmlFor="fileInput">
              <p className="upload__button">Upload Image</p>
            </label>
          )}
        </div>
        <button type="submit" className="colorize" onClick={colorizeImage}>
          Colorize
        </button>
        <div className="output__container">
          <div className="header"></div>
        </div>
      </main>
    </div>
  );
}
