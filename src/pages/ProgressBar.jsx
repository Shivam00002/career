import React, { useState } from "react";

export const ProgressBar = (props) => {
//  console.log("p",props.progress);
  //const [currentPage] = progress;
console.log(props.currentPage)
  
  return (

    <div id="prog" > 
    <div >
      <div
      id="progress-line"
        style={{
          width: `${props.progress}%`,
          height: "3px",
          background:   "rgb(38, 133, 243)",
          transition: "width 0.2s",
          borderRadius : "7px"
        }}
      />

    </div>
<div className="pages">
    {`Page ${props.currentPage} Off ${props.totalPages}`}
    </div>
    </div>
  );
};

export default ProgressBar;
