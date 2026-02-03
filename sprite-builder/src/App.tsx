import React, { useEffect } from "react";
import "./App.css";
import { loadImage } from "canvas";
import paletteSwap from "@cnakazawa/palette-swap";
import ace1 from "./male/ace1.png";
import ace2 from "./male/ace2.png";
import aaron from "./male/aaron.png";
import { url } from "node:inspector";
const App = () => {
  const [headIndex, setHeadIndex] = React.useState(0);
  const images = [ace1, ace2, aaron]; // Use the imported images directly
  const [urls, setUrls] = React.useState<Array<string>>([]);
  const [urlIndex, setUrlIndex] = React.useState(1);
  const headStyles = {
    backgroundImage: `url(${urls[urlIndex]})`,
    width: "16px",
    height: "24px",
    imageRendering: "pixelated" as const,
    scale: "8",
  };

  const drawCanvas = () => {
    const canvas = document.getElementById(
      "gameCanvas",
    ) as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        const spriteSheet = new Image();
        spriteSheet.src = urls[urlIndex];

        spriteSheet.onload = () => {
          drawImageOnCanvas(spriteSheet);
        };
      }
    }
  };

  const drawImageOnCanvas = (image: HTMLImageElement) => {
    const canvas = document.getElementById(
      "gameCanvas",
    ) as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        // Drawing code goes here, once the image is ready
        const sx = 0; // Source X
        const sy = 0; // Source Y
        const sw = 16; // Source width
        const sh = 24; // Source height
        const dx = 50; // Destination X
        const dy = 50; // Destination Y
        const dw = 256; // Destination width
        const dh = 384; // Destination height
        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
      }
    }
  };
  const runPaletteSwap = async () => {
    const results = paletteSwap(
      await loadImage(images[headIndex]),
      new Map([
        ["Green", new Map([])],
        [
          "Blue",
          new Map([
            ["#405038", "#2f3249"],
            ["#607848", "#5880b8"],
            ["#88a060", "#789aca"],
          ]),
        ],
      ]) as any,
    );
    const variants: Array<string> = [];
    results.forEach((canvas, index) => {
      const url = canvas.toDataURL("image/png");
      variants.push(url);
      setUrls(variants);
    });
  };
  useEffect(() => {
    runPaletteSwap();
  }, [headIndex]);
  useEffect(() => {
    drawCanvas();
  }, [urls, urlIndex]);
  return (
    <div className="App">
      <header className="App-header">
        <div className="w-96 flex justify-between -mt-16">
          <button
            className="bg-sky-700 text-white rounded-lg p-2 w-16 shadow-md"
            onClick={() =>
              setHeadIndex((headIndex - 1 + images.length) % images.length)
            }
          >
            <i className="fa fa-angle-left"></i>
          </button>

          <div className="" style={headStyles}></div>
          <button
            className="bg-sky-700 text-white rounded-lg p-2 w-16 shadow-md"
            onClick={() => setHeadIndex((headIndex + 1) % images.length)}
          >
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
