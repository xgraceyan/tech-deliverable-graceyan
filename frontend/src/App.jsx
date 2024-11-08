import { useState } from "react";
import "./App.scss";

import axios from "axios";
import moment from "moment";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const maxAgeToTimestamp = () => {
    // Converts the max age select option into timestamps relative to now
    var now = moment();
    if (maxAge == "week")
      return now.subtract(7, "days").format("YYYY-MM-DDTHH:mm:ss");
    if (maxAge == "month") {
      return now.subtract(1, "month").format("YYYY-MM-DDTHH:mm:ss");
    }
    if (maxAge == "year") {
      return now.subtract(1, "year").format("YYYY-MM-DDTHH:mm:ss");
    }
    if (maxAge == "all") {
      return 0;
    }
  };

  const fetchQuotes = () => {
    // Fetches quotes from database based on max age selection
    const timestamp = maxAgeToTimestamp();
    if (timestamp == 0) {
      axios
        .get(`/api/quote`)
        .then((res) => {
          setQuotes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`/api/quote?min_t=${timestamp}`)
        .then((res) => {
          setQuotes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleGetSubmit = (e) => {
    e.preventDefault();
    fetchQuotes();
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
