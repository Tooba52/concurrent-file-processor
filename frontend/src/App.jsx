import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [files, setFiles] = useState([])
  const [format, setFormat] = useState("excel")
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null);

  // function to store the selected files in state
  const handleFileChange = (e) => {
    //Get selcted file
    const selectedFiles = Array.from(e.target.files);
    setIsSuccessful(false)

    const allowedTypes = ["application/json", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    const maxFileSize = 50 * 1024 * 1024; // 50 MB

    // Check for invalidFile, if exists promt error message
    // File size validation to be added
    const invalidFile = selectedFiles.find(file => !allowedTypes.includes(file.type));
    if (invalidFile) {
      setIsError(true);
      setErrorMsg("Only JSON, XLSX and CSV files are allowed");
      return;
    }

    setIsError(false)
    setFiles(selectedFiles)
  }



  // function to handle file submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const maxUploads = 5;
    const minUploads = 2;

    if (files.length < minUploads) {
      setIsError(true)
      setErrorMsg("Please upload at least 2 files")
      return;
    }

    if (files.length > maxUploads) {
      setIsError(true)
      setErrorMsg("Please upload a maximum of 5 files")
      return;
    }

    const formData = new FormData()
    files.forEach(file => formData.append("files", file));

    axios.post(`/api/merge?format=${format}`, formData, {
      responseType: "blob"
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setDownloadUrl(url);
        setIsSuccessful(true);
        setIsError(false);
      })
      .catch(err => {
        console.error(err);
        setIsError(true);
        setErrorMsg("Upload failed");
      });
  };


  return (
    <>
      <h1>File Merger</h1>
      <div className="card">
        {/* Header Section */}
        <div className="card-header">
          <h2 className="title"> Upload Your Files</h2>
        </div>
        {/* Main body section */}
        <div className="card-body">
          {/* Format select section */}
          <div className="card-format">
            <p>Select Prefered download format</p>
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          {/* File uploading section */}
          <form onSubmit={handleSubmit}>
            <input type="file" multiple onChange={handleFileChange} />
            {isError && <div className="error-text">{errorMsg}</div>}
            <button type="submit">Upload</button>
            {downloadUrl && (
              <div className="success-text">
                Download your file here:{" "}
                <a
                  href={downloadUrl}
                  download={format === "csv" ? "merged.csv" : "merged.xlsx"}
                >
                  Click to download
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </>

  )
}

export default App
