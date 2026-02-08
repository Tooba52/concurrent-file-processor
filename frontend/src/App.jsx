import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("Excel");
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
    const maxUploads = 2;
    const minUploads = 5;

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


    // Reser error state and proceed with successful upload
    setIsError(false)
    setIsSuccessful(true)

    //send files to API
    //handle response 
    //create temp link for download 
  }


  return (
    <>
      <h1>File Merger</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="title"> Upload Your Files</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input type="file" multiple onChange={handleFileChange} />
            {isError && <div className="error-text">{errorMsg}</div>}
            <button type="submit">Upload</button>
            {isSuccessful && <div className="success-text">Valid Files</div>}

          </form>
        </div>
      </div>
    </>

  )
}

export default App
