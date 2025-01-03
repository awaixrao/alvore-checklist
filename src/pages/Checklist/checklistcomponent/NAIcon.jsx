import React from "react";

const NAIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    {...props}
  >
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dy=".3em"
      fontSize="14"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fill="#800080" // Purple color
    >
      N/A
    </text>
  </svg>
);

export default NAIcon;
