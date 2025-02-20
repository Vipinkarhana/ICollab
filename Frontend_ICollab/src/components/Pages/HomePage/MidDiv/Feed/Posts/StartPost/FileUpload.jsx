import React, { useState, useCallback, useMemo, useEffect } from "react";
import { ImageUp, Youtube, X, ChevronLeft, ChevronRight } from "lucide-react";
import useAlert from "../../../../../../Common/UseAlert";
import { useDispatch } from "react-redux";
import { addDraft } from "../../../../../../../Redux/Slices/PostSlice";

const FilePreview = React.memo(({ selectedFile }) => {
  const isURL = typeof selectedFile === "string";
  let fileUrl;
  let fileType;

  if (isURL) {
    fileUrl = selectedFile;
    const extension = fileUrl.split(".").pop().toLowerCase();
    
    // Determine file type based on extension
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const videoExtensions = ["mp4", "webm", "ogg"];

    if (imageExtensions.includes(extension)) {
      fileType = "photo";
    } else if (videoExtensions.includes(extension)) {
      fileType = "video";
    } else {
      fileType = "unknown"; // Unsupported format
    }
  } else {
    fileUrl = URL.createObjectURL(selectedFile?.file);
    fileType = selectedFile?.type; // Keep the original type for selected files
  }

  const cleanup = () => {
    if (!isURL) {
      URL.revokeObjectURL(fileUrl);
    }
  };

  return fileType === "photo" ? (
    <img
      src={fileUrl}
      alt="Selected"
      className="w-auto h-80 rounded-md object-cover object-center"
      onLoad={cleanup}
    />
  ) : fileType === "video" ? (
    <video controls className="w-full h-42 rounded-md" onLoadedData={cleanup}>
      <source src={fileUrl} type="video/mp4" />
    </video>
  ) : (
    <p>Unsupported file type</p>
  );
});


const FileUpload = ({selectedFiles, setSelectedFiles}) => {
  const [showSuccess, showWarning, showError] = useAlert();
  const dispatch = useDispatch();

  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = useCallback(
    (event, fileType) => {
      const files = Array.from(event.target.files);

      if (files.length === 0) return;

      if (
        fileType === "video" &&
        selectedFiles?.length > 0 &&
        currentType === "video"
      ) {
        showError("You can only upload ONE video at a time!");
        return;
      }

      if (currentType && currentType !== fileType) {
        showError("You can only select photos OR a single video!");
        return;
      }

      if (fileType === "photo") {
        setSelectedFiles((prevFiles) => [
          ...prevFiles,
          ...files.map((file) => ({ file, type: fileType })),
        ]);
      } else {
        setSelectedFiles([{ file: files[0], type: fileType }]);
      }

      setCurrentType(fileType);
      setCurrentIndex(0);

      event.target.value = "";
    },
    [currentType, selectedFiles, showError]
  );

  const removeFile = useCallback(() => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(currentIndex, 1);
1
      if (updatedFiles.length === 0) {
        setCurrentType(null);
      }

      return updatedFiles;
    });

    setCurrentIndex((prevIndex) =>
      prevIndex >= selectedFiles?.length - 1
        ? Math.max(prevIndex - 1, 0)
        : prevIndex
    );
  }, [currentIndex, selectedFiles]);

  const nextSlide = useCallback(() => {
    if (selectedFiles?.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % selectedFiles?.length);
    }
  }, [selectedFiles]);

  const prevSlide = useCallback(() => {
    if (selectedFiles?.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + selectedFiles?.length) % selectedFiles.length
      );
    }
  }, [selectedFiles]);

  return (
    <div className="px-1 flex flex-col justify-start items-start w-full h-auto">
      <div className="flex gap-4">
        <div className="relative w-10 h-10">
          <button className="w-10 h-10 flex justify-center items-center">
            <ImageUp color="gray" size={26} />
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => handleFileChange(e, "photo")}
          />
        </div>

        <div className="relative w-10 h-10">
          <button className="w-10 h-10 flex justify-center items-center">
            <Youtube color="gray" size={28} />
          </button>
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              handleFileChange(e, "video");
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {selectedFiles?.length > 0 && selectedFiles[currentIndex] && (
        <div className="mt-4 relative w-full h-full flex items-center justify-between">
          <button
            className="absolute left-1 bg-gray-500 text-white p-2 rounded-full z-10"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="relative w-full h-full flex justify-center items-center">
            <button
              className="absolute bg-red-400 text-white p-1 rounded-full right-3 -mt-56 z-10"
              onClick={removeFile}
            >
              <X color="white" size={24} />
            </button>

            <FilePreview
              file={selectedFiles[currentIndex].file}
              type={selectedFiles[currentIndex].type}
              selectedFile={selectedFiles[currentIndex]}
            />
          </div>
          <button
            className="absolute right-1 bg-gray-500 text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
