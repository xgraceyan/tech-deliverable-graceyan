import React from "react";
import moment from "moment";
import "../App.scss";
import "./Quote.css";

function Quote(props) {
  const { name, message, time } = props.quote;
  return (
    <div className="card quote-card">
      <div className="container-sm container-side-sm">
        <div className="card-body ">
          <h3 className="text-wrap fw-bold bold-color">{message}</h3>
          <div className="text-end quote-info">
            <h4 className="bold-color">— {name}</h4>
            <p className="light-color my-0 fst-italic">
              at {moment(time).format("dddd, MMMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
