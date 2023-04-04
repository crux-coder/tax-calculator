import React from "react";
import { useRef } from "react";
import image from "../assets/UPLATNICA.jpg";
import { useEffect } from "react";
import { useState } from "react";
const Canvas = ({ phrases , user}) => {
  const canvasRef = useRef();
  const [canvasHeight, setCanvasHeight] = useState();
  const [canvasWidth, setCanvasWidth] = useState();
  useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      let drawimg = document.createElement("img");
      drawimg.setAttribute("src", image);
      drawimg.onload = () => {
        const context = canvas.getContext("2d");
        context.drawImage(drawimg, 0, 0);
        setCanvasHeight(drawimg.height);
        setCanvasWidth(drawimg.width);
        context.font = '10px Arial';
        context.fillText(user.name , 175,27);
      };
    };
  }, [canvasHeight, canvasWidth, user]);

  return (
    <>
      <canvas
        ref={canvasRef}
        height={canvasHeight}
        width={canvasWidth}
        style={{
          border: "solid 2px white",
          width: '100%'
        }}
      ></canvas>
    </>
  );
};

export default Canvas;
