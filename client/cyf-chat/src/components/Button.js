import React from "react";
// import AllMessages from "./buttons/AllMessages";
import LatestMessages from "./buttons/LatestMessages";

const Button = () => {
  return (
    <div className="btn">
      <LatestMessages />
      <div>
        {/* <AllMessages /> */}
      </div>
    </div>
  );
};

export default Button;
