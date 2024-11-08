import { useState } from "react";
import "./App.scss";

import axios from "axios";
import moment from "moment";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [maxAge, setMaxAge] = useState("week");
  const [quotes, setQuotes] = useState([]);

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

  const submitQuote = () => {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);

    axios({
      method: "post",
      url: "/api/quote",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      if (res.data) {
        setQuotes([res.data[0], ...quotes]);
      }
      fetchQuotes();
    });
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
    submitQuote();
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

        <div className="spacer"></div>

        <h2 className="text-center fw-bold bold-color">Previous Quotes</h2>
        <p className="text-center form-label fw-medium light-color text-start">
          Select how recent quotes should be
        </p>

        <div className="spacer-sm"></div>
        <form
          className="row row-cols-lg-auto gx-5 gy-2 align-items-center d-flex justify-content-center"
          onSubmit={handleGetSubmit}
        >
          <div className="col-12 col-md-12 col-sm-8 d-flex justify-content-center align-items-center">
            <div id="select-quotes">
              <select
                name="quote-filter"
                id="quote-filter"
                onChange={handleMaxAgeChange}
                className="form-select dropdown light-color form-control"
              >
                <option value="week">Last week</option>
                <option value="month">Last month</option>
                <option value="year">Last year</option>
                <option value="all">All quotes</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-12 col-sm-4  d-flex justify-content-center align-items-stretch">
            <button
              type="submit"
              className="btn btn-primary form-btn-sm form-btn"
            >
              Go!
            </button>
          </div>
        </form>

        <div className="messages container-side">
          <pre>
            {quotes &&
              quotes.map((quote) => <Quote quote={quote} key={quote.time} />)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
