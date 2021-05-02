import React from "react";

const Loader = ({ message }) => {
  return (
    <div className="loader p-4">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated d-block"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "100%" }}
        ></div>
      </div>
      <h5 className="mt-3 text-center">{message}</h5>
    </div>
  );
};

export default Loader;
