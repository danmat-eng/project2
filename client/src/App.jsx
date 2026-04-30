import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios' // Make sure you've run: npm install axios

function logRow({date, hours, acft, comments}) {

  return (
    <div>
      <input className='dateInput' type='date'/>
      <input className='hourInput' placeholder='#' min='0' max='35' type='number'/>
      <select className='acftInput'>
        <option value="C150">C150</option>
        <option value="C172">C172</option>
        <option value="SR22">SR22</option>
        <input placeholder='-' className='commentsInput'/>
      </select>
    </div>
  )
}

function App() {
  const [newLog, setNewLog] = useState(0)
  const [greeting, setGreeting] = useState("Loading...")

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setGreeting(res.data.message))
      .catch(err => {
        console.error("Error fetching data:", err);
        setGreeting("Server is not responding 😢");
      })
  }, [])

  return (
    <div>
        <h1 className='titleText'>Flight Log Tracker</h1>
        <button className='buttonNewText' onClick={() => setNewLog(newLog + 1)}>
          Added New Tasks: {newLog}
        </button>
        <div className='taskRowContainer'>
          <div className="taskHeader">
            <h2>Date</h2>
            <h2>Hours</h2>
            <h2>ACFT Type</h2>
            <h2>Comments</h2>
          </div>
          <div className='taskRow'>
            <input className='dateInput' type='date'></input>
            <input className='hourInput' placeholder='#' min='0' max='35' type='number'></input>
            <select className='acftInput'>
              <option value="C150">C150</option>
              <option value="C172">C172</option>
              <option value="SR22">SR22</option>
            </select>
            <input placeholder='-' className='commentsInput'></input>
          </div>
        </div>
    </div>
  )
}

export default App


