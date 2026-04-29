import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios' // Make sure you've run: npm install axios

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
    </div>
  )
}

export default App


