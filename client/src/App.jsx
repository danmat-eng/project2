import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [logs, setLogs] = useState([])
  const [buttonText, setButtonText] = useState("Add New Log.");

  useEffect(() => {
    axios.get('http://localhost:5000/api/logs')
      .then(res => {
        setLogs(res.data);
      })
      .catch(err => console.error("Unable to read logs:", err))
  }, []);

  const AddLogRow = () => {
    const newLog = {
      id: Date.now(),
      date: '',
      hours: '',
      acftType: 'C150',
      comments: ''
    };
    setLogs([...logs, newLog]);
    setButtonText("New Log Added.");
    setTimeout(() => {
      setButtonText("Add New Log");
    }, 5000);
    console.log("Added Log.")
  }

  const DeleteLog = async (log) => {
    const updatedLogs = logs.filter(item => {
      if (log._id) return item._id !== log._id;
      return item.id !== log.id;
    });

    setLogs(updatedLogs);

    if (log._id) {
      try {
        await axios.delete(`http://localhost:5000/api/logs/${log._id}`)
        console.log("Deleted Log.");
      } catch(err) {
        console.error("Unable to delete Log:", err);
      } 
    }
  };

  const HandleInputChange = (id, field, value) => {
    setLogs(logs.map(log =>
      log.id === id ? { ...log, [field]: value } : log
    ));
  };

  const SaveLog = async (log) => {
    try {
      const response = await axios.post('http://localhost:5000/api/newLog', log);
      const savedLog = response.data

      setLogs(logs.map(item => (item.id === log.id ? savedLog : item)));
      setButtonText("Log Saved.");
      setTimeout(() => setButtonText("Add New Log"), 3000);
    } catch (err) {
      console.error("Unable to save log:", err);
      alert("Unable to save to datalogs.");
    }
  };

  
  const RenderLogRow = (log) => {
    return (
      <div className='taskRow' key={log.id}>
        <input className='dateInput' type='date' value={log.date} onChange={(e) => HandleInputChange(log.id, 'date', e.target.value)}/>
        <input className='hourInput' placeholder='#' min='0' max='35' type='number' value={log.hours} onChange={(e) => HandleInputChange(log.id, 'hours', e.target.value)}/>
        <select className='acftInput' value={log.acftType} onChange={(e) => HandleInputChange(log.id, 'acftType', e.target.value)}>
          <option value="C150">C150</option>
          <option value="C172">C172</option>
          <option value="SR22">SR22</option>
        </select>
        <input placeholder='-' className='commentsInput' value={log.comments} onChange={(e) => HandleInputChange(log.id, 'comments', e.target.value)}/>
        <button className='saveButton' onClick={() => SaveLog(log)}>Save</button>
        <button className = 'deleteButton' onClick={() => DeleteLog(log)}>Delete</button>
      </div>
    );
  };

  
  return (
    <div>
        <h1 className='titleText'>Flight Log Tracker</h1>
        <button className='buttonNewText' onClick={AddLogRow}>
          {buttonText}
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


