import "./App.css";
import AddMessage from "./components/AddMessage";
import Button from "./components/Button";
import MessageList from "./components/MessageList";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <h1>CYF Chat Server</h1>
      <MessageList />
      <AddMessage />
      <div className="btn-container">
        <Search />
        <Button />
      </div>
    </div>
  );
}

export default App;
