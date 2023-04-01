import React from "react";
import { useRef } from "react";
import image from "../assets/Uplatnica.jpg";
import { useEffect } from "react";
import { useState } from "react";
const Canvas = ({ phrases }) => {
  const canvasRef = useRef();
  const [canvasHeight, setCanvasHeight] = useState();
  const [canvasWidth, setCanvasWidth] = useState();
  useEffect(() => {
    return () => {
      let drawimg = document.createElement("img");
      drawimg.setAttribute("src", image);
      drawimg.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        console.log(context);
        context.drawImage(drawimg, 0, 0);
        console.log(drawimg.height);
        setCanvasHeight(drawimg.height);
        setCanvasWidth(drawimg.width);
      };
    };
  }, [canvasHeight, canvasWidth]);

  return (
    <>
      <h1 style={{ color: "lightgray" }}>{phrases}</h1>
      <canvas
        ref={canvasRef}
        height={canvasHeight}
        width={canvasWidth}
        style={{ border: "solid 2px white" }}
      ></canvas>
    </>
  );
};

export default Canvas;
