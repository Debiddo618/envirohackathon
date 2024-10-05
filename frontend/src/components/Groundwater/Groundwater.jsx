import React from "react";

const Groundwater = ({ value }) => {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      ></div>
      <svg width="250" height="150" viewBox="0 0 250 150">
        <circle
          cx="125"
          cy="125"
          r={radius}
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="20"
        />
        <circle
          cx="125"
          cy="125"
          r={radius}
          fill="none"
          stroke="#00aaff"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 125 125)"
        />
        <text x="125" y="140" textAnchor="middle" fontSize="20" fill="#333">
          {value}%
        </text>
      </svg>
      <div>Groundwater Meter</div>
    </div>
  );
};

export default Groundwater;