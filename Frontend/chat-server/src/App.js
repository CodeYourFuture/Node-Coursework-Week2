import './App.css';
import { useState } from 'react';
import FormToSend from './FormToSend';

function App() {
  const [allData, setAllData] = useState([])

  return (
    <div className="App">
      <div className="messages-holder">
        <h1>Chat Server App</h1>
        <FormToSend allData={allData} setAllData={setAllData} />

      </div>
    </div>
  );
}

export default App;
