import "./App.css";
import MyWebsocket from "./components/MyWebsocket";
import { Board } from "./components/Board";
import GameProvider from "./components/GameContext"; 
import BoardStateProvider from "./components/BoardStateContext"

function App() {
  return (
    <BoardStateProvider>
      <GameProvider>
        <div className="App">
            <h1>Base</h1>
            Added
              <MyWebsocket></MyWebsocket>
              {/* <Board></Board> */}
        </div>
      </GameProvider>
    </BoardStateProvider>
  );
}
export default App;
