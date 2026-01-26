import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("Excel");

  // Stores the selected files in state
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  }

  // Sends files to backend, gets the merged file, triggers download
  const handleUpload = (e) => {
    //validate more then 2 files
    //validate corrcet file type JSON CSV XLSX
    //send files to API
    //handle response 
    //create temp link for download 

  }

  return (
    <>
      <h1>File Merger</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="excel">Excel</option>
        <option value="csv">CSV</option>
      </select>
      <button onClick={handleUpload}>Merge Files</button>
    </>

  )
}

export default App
