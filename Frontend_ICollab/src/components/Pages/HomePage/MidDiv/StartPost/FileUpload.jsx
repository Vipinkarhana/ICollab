import React, { useState } from "react";
import { ImageUp, Youtube} from "lucide-react"; 

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null); 
  const [fileType, setFileType] = useState(""); 
  const [height, setHeight] = useState("100px"); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); 

    setHeight(file.type.startsWith("image") ? "300px" : "400px"); 
  };

  const handlePhotoClick = () => {
    document.getElementById("photoInput").click();
    setFileType("photo");
  };

  const handleVideoClick = () => {
    document.getElementById("videoInput").click();
    setFileType("video");
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
        <button onClick={handlePhotoClick} className="">
          <ImageUp color="gray" size={26} />
        </button>

        <button onClick={handleVideoClick} className="">
          <Youtube color="gray" size={28}/>
        </button>
      </div>

      <input
        type="file"
        id="photoInput"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <input
        type="file"
        id="videoInput"
        accept="video/*"
        className="hidden"
        onChange={handleFileChange}
      />

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
