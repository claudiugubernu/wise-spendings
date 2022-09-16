import React from "react";

const ProgressBar = ({ variant, progress }) => {
  return (
    <div className="progress-bar-wrapper mv-20 m-mv-20">
      <div className="progress-bar">
        <span
          className={`${variant} progress`}
          style={{
            width: progress + "%",
          }}
        ></span>
      </div>
    </div>
  );
};

export default ProgressBar;
