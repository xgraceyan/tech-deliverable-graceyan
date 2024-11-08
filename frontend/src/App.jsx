import { useState } from "react";
import "./App.scss";

import axios from "axios";
import moment from "moment";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleGetSubmit = (e) => {
    e.preventDefault();
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="container container-md">
        {/* TODO: include an icon for the quote book */}
        <h1>Hack at UCI Tech Deliverable</h1>

        <div className="text-center" id="header">
          <img src="images/quotebook.png" alt="" className="logo" />
          <div className="spacer-sm"></div>
          <h1 className="text-white fw-bold">Hack at UCI Tech Deliverable</h1>
        </div>

        <div className="spacer-md"></div>

        <div id="add-quote" className="container-side-lg">
          <div
            className="card shadow-lg border border-0 rounded-md"
            id="add-card"
          >
            <div className="container-md container-side-lg">
              <div className="card-title">
                <h2 className="text-center fw-bold bold-color">
                  Submit a quote
                </h2>
              </div>
              <div className="card-body">
                {/* TODO: implement custom form submission logic to not refresh the page */}
                <form onSubmit={handlePostSubmit}>
                  <label
                    htmlFor="input-name"
                    className="form-label fw-medium light-color text-start"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="input-name"
                    className="form-control"
                    placeholder="Peter the Anteater"
                    required
                    onChange={handleNameChange}
                  />
                  <div className="spacer-sm"></div>
                  <label
                    htmlFor="input-message"
                    className="form-label fw-medium light-color text-start"
                  >
                    Quote
                  </label>
                  <input
                    type="text"
                    name="message"
                    id="input-message"
                    className="form-control"
                    placeholder="Zot Zot Zot!"
                    required
                    onChange={handleMessageChange}
                  />
                  <div className="spacer-md"></div>
                  <div id="button-space" className="text-center">
                    <button type="submit" className="btn btn-primary form-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <h2>Previous Quotes</h2>
        {/* TODO: Display the actual quotes from the database */}
        <div className="messages">
          <p>Peter Anteater</p>
          <p>Zot Zot Zot!</p>
          <p>Every day</p>
        </div>
      </div>
    </div>
  );
}

export default App;
