import React, { useState } from "react";
import { ImageUp, Youtube } from "lucide-react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [height, setHeight] = useState("100px");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setHeight(file.type.startsWith("image") ? "300px" : "400px");
  };

  return (
    <div className="px-2">
      <div
        className="flex gap-4"
        style={{
          height: height,
          transition: "height 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div className="relative w-10 h-10">
          <button className="w-10 h-10 flex justify-center items-center">
            <ImageUp color="gray" size={26} />
          </button>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0"
            onChange={(e) => {
              setFileType("photo");
              handleFileChange(e);
            }}
          />
        </div>

        <div className="relative w-10 h-10">
          <button className="w-10 h-10 flex justify-center items-center">
            <Youtube color="gray" size={28} />
          </button>
          <input
            type="file"
            accept="video/*"
            className="absolute inset-0 opacity-0"
            onChange={(e) => {
              setFileType("video");
              handleFileChange(e);
            }}
          />
        </div>
      </div>

      {selectedFile && (
        <div className="mt-4">
          <p>
            Selected {fileType}: {selectedFile.name}
          </p>
          <div>
            {fileType === "photo" && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="w-48 h-48 object-cover"
              />
            )}
            {fileType === "video" && (
              <video controls className="w-48">
                <source
                  src={URL.createObjectURL(selectedFile)}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
