import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [logs, setLogs] = useState([])
  const [buttonText, setButtonText] = useState("Add New Log.");
  const [greeting, setGreeting] = useState("Loading...")

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setGreeting(res.data.message))
      .catch(err => {
        console.error("Error fetching data:", err);
        setGreeting("Server is not responding 😢");
      })
  }, [])

  const AddLogRow = () => {
    setLogs([...logs, { id: Date.now() }]);
    setButtonText("New Log Added.");
    setTimeout(() => {
      setButtonText("Add New Log");
    }, 5000);
    console.log("Added Log.")
  };

  const DeleteLog = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  
  const RenderLogRow = (log) => {
    return (
      <div className='taskRow' key={log.id}>
        <input className='dateInput' type='date'/>
        <input className='hourInput' placeholder='#' min='0' max='35' type='number'/>
        <select className='acftInput'>
          <option value="C150">C150</option>
          <option value="C172">C172</option>
          <option value="SR22">SR22</option>
          <input placeholder='-' className='commentsInput'/>
        </select>
        <input placeholder='-' className='commentsInput'/>
        <button onClick={() => DeleteLog(log.id)}>Delete</button>
      </div>
    );
  };

  
  return (
    <div>
        <h1 className='titleText'>Flight Log Tracker</h1>
        <button className='buttonNewText' onClick={AddLogRow}>
          {buttonText} ({logs.length})
        </button>
        <div className='taskRowContainer'>
          <div className="taskHeader">
            <h2>Date</h2>
            <h2>Hours</h2>
            <h2>ACFT Type</h2>
            <h2>Comments</h2>
          </div>

          {logs.map((log) => (
          <div key={log.id}>{RenderLogRow(log)}</div>
          ))}

        </div>
    </div>
  )
}

export default App


