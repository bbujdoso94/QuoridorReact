import "./App.css";
import MyWebsocket from "./components/MyWebsocket";
import { Board } from "./components/Board";

function App() {
  return (
    <div className="App">
      <h1>Base</h1>
      <p>
        Added
        <MyWebsocket></MyWebsocket>
      </p>
      <Board></Board>
    </div>
  );
}

export default App;
