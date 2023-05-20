import React, { useState } from "react";

export const ProgressBar = (props) => {
  console.log("p",props.progress);
  //const [currentPage] = progress;
console.log(props.currentPage)
  

  return (
    <div id="prog" className="flex  gap-2"> 
    <div className="progress">
      <div
        style={{
          width: `${props.progress}%`,
          height: "9px",
          background:  "rgb(59, 134, 238)",
          transition: "width 0.2s",
          borderRadius : "7px"
        }}
      />
    </div>

    <div className="mt-[-9px]">
    {`Page ${props.currentPage} Off 6`}
    </div>

   
    </div>
  );
};

export default ProgressBar;
