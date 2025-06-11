import React, { useRef, useState, useEffect } from "react";

const CropperWithZoomButtons = ({ imageSrc, onCancel, onCropDone }) => {
  const cropSize = 320;
  const minZoom = 1;
  const maxZoom = 3;

  const [zoom, setZoom] = useState(1);
  const [boxTop, setBoxTop] = useState(90); // Initial vertical position of crop box
  const [dragStartY, setDragStartY] = useState(null);

  const imgRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((z) => {
      const newZoom = e.deltaY < 0 ? z + 0.05 : z - 0.05;
      return Math.min(maxZoom, Math.max(minZoom, newZoom));
    });
  };

  const handleMouseDown = (e) => {
    setDragStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (dragStartY === null) return;
    const deltaY = e.clientY - dragStartY;
    setBoxTop((prev) => {
      const newTop = Math.max(0, Math.min(prev + deltaY, 500 - cropSize)); // clamp within bounds
      return newTop;
    });
    setDragStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setDragStartY(null);
  };

  const handleCrop = () => {
  const canvas = document.createElement("canvas");
  canvas.width = cropSize;
  canvas.height = cropSize;
  const ctx = canvas.getContext("2d");

  const img = imgRef.current;
  const wrapper = wrapperRef.current;
  if (!img || !wrapper) return;

  const naturalWidth = img.naturalWidth;
  const naturalHeight = img.naturalHeight;

  const displayedWidth = wrapper.offsetWidth;
  const displayedHeight = wrapper.offsetHeight;

  // Effective displayed size after zoom
  const scaledWidth = displayedWidth * zoom;
  const scaledHeight = displayedHeight * zoom;

  // Offset of the crop box in the scaled image
  const cropLeft = (displayedWidth / 2) - (cropSize / 2);
  const cropTop = boxTop;

  // Calculate what portion of the original image to crop
  const sx = (cropLeft / scaledWidth) * naturalWidth;
  const sy = (cropTop / scaledHeight) * naturalHeight;
  const sWidth = (cropSize / scaledWidth) * naturalWidth;
  const sHeight = (cropSize / scaledHeight) * naturalHeight;

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cropSize, cropSize);

  const cropped = canvas.toDataURL("image/png");
  onCropDone(cropped);
};


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ userSelect: "none" }}
    >
      <div
        className="relative w-[500px] h-[500px] overflow-hidden"
        ref={wrapperRef}
      >
        {/* Fixed Image */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt="Crop"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            pointerEvents: "none",
          }}
        />

        {/* Crop Box (Draggable vertically) */}
        <div
          className="absolute border-2 border-white z-10 cursor-grab"
          style={{
            width: cropSize,
            height: cropSize,
            left: "50%",
            transform: "translateX(-50%)",
            top: `${boxTop}px`,
            boxSizing: "border-box",
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Grid lines */}
          <div className="absolute top-0 left-[33.33%] w-[1px] h-full bg-white opacity-50" />
          <div className="absolute top-0 left-[66.66%] w-[1px] h-full bg-white opacity-50" />
          <div className="absolute left-0 top-[33.33%] h-[1px] w-full bg-white opacity-50" />
          <div className="absolute left-0 top-[66.66%] h-[1px] w-full bg-white opacity-50" />
        </div>

        {/* Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropperWithZoomButtons;
