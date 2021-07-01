import React from "react";
import Button from "./Button";

const NotFound = (props) => {
  const { text, link } = props;

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col text-center">
          <h2 className="text-center pb-3">Sorry, that page was not found</h2>
          <Button text="Return to Home Page" link="/" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
