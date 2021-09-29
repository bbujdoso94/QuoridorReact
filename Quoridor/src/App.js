import "./App.css";
import MyWebsocket from "./components/MyWebsocket";
import { Board } from "./components/Board";
import GameProvider from "./components/GameContext"; 

function App() {
  return (
    <div className="App">
      <GameProvider>
        <h1>Base</h1>
        Added
        <MyWebsocket></MyWebsocket>
        <Board></Board>
      </GameProvider>
    </div>
  );
}
export default App;
