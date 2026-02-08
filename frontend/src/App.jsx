import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [files, setFiles] = useState([])
  const [format, setFormat] = useState("excel")
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [isSuccessful, setIsSuccessful] = useState(false)

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
    const formData = new FormData()


    //If error prevent submission, displaying error message
    if (isError) return setErrorMsg("")

    // Check for upload limits
    if (files.length < minUploads) {
      setIsError(true)
      setErrorMsg("Please upload at least 2 files")
      return;
    } else if (files.length > maxUploads) {
      setIsError(true)
      setErrorMsg("Please upload a maximum of 5 files")
      return;
    }

    //pepare form Dara
    files.forEach(file => {
      formData.append("files", file); // add all files
    });
    const apiUrl = `/api/merge?format=${format}`; //format query

    //post data 
    axios.post(`/api/merge?format=${format}`, formData, { responseType: "blob" })
      .then(res => {
        const url = window.URL.createObjectURL(res.data); // temporary URL for download
        const a = document.createElement("a");
        a.href = url;
        a.download = format === "csv" ? "merged.csv" : "merged.xlsx"; // choose filename
        a.click(); // trigger download
        window.URL.revokeObjectURL(url); // clean up
      })
      .catch(err => {
        setIsError(true);
        setErrorMsg(err.response?.data?.detail || "Upload failed");
      });


    // Reser error state and proceed with successful upload
    setIsError(false)
    setIsSuccessful(true)
  }


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
            {isSuccessful && <div className="success-text">Valid Files</div>}
          </form>
          {/* Downlaod section */}
          <div className="card-downloads"></div>
        </div>
      </div>
    </>

  )
}

export default App
