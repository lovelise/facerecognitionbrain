import React from "react";
import "./FaceRcongnition.css";

const FaceRecognition = ({ input, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" alt=" " src={input} width="500px" height="auto" />
        {box.map((value, key) => {
          return (
            <div
              className="bounding-box"
              style={{
                top: value.topRow,
                right: value.rightCol,
                bottom: value.bottomRow,
                left: value.leftCol,
              }}
              key={key}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
