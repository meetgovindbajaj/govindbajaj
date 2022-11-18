import React, { useState } from "react";
const Regular = () => {
  const [file, setFile] = useState(null);
  const [inputContainsFile, setInputContainsFile] = useState(false);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);
  const [imageId, setImageId] = useState(null);
  // const [progress, setProgress] = useState(null);
  const [previewSource, setPreviewSource] = useState(undefined);
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setInputContainsFile(true);
    setImageId(null);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
    return previewSource;
  };
  const fileUploadHandler = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJh");
    const fd = new FormData();
    fd.append("image", file, file.name);
    const res = await fetch("/image/upload", {
      method: "POST",
      headers: myHeaders,
      body: fd,
    });
    let data = await res.json();
    Object.assign(data, data);
    setImageId(data.id);
    setFile(null);
    setInputContainsFile(false);
    setCurrentlyUploading(false);
    setInputContainsFile(false);
    setCurrentlyUploading(false);
  };

  const handleClick = () => {
    if (inputContainsFile) {
      setCurrentlyUploading(true);
      fileUploadHandler();
    }
  };
  return (
    <>
      <div className="regular">
        <div className="image-section">
          {imageId ? (
            <>
              <a
                className="link"
                href={`/#/image/${imageId}`}
                target="_blank"
                rel="noreferrer"
              >
                {imageId}
              </a>
              <hr />
            </>
          ) : file ? (
            <>
              <img
                className="image"
                src={previewFile(file)}
                alt="regular version"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setInputContainsFile(false);
                }}
              >
                DELETE SELECTED IMAGE
              </button>
              <hr />
            </>
          ) : (
            <p className="nopic">no pic yet</p>
          )}
        </div>
        <div className="inputcontainer">
          {currentlyUploading ? (
            <img src={""} className="loadingdots" alt="upload in progress" />
          ) : (
            <>
              <input
                className="file-input"
                onChange={handleFile}
                accept=".png,.jpg,.jpeg,.gif"
                type="file"
                name="file"
                id="file"
              />
              <label
                className={`inputlabel ${file && "file-selected"}`}
                htmlFor="file"
                onClick={handleClick}
              >
                {file ? <>SUBMIT</> : <>UPLOAD IMAGE</>}
              </label>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Regular;
