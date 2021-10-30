import "./App.css";
import MyWebsocket from "./components/MyWebsocket";
import GameProvider from "./components/GameContext"; 
import BoardStateProvider from "./components/BoardStateContext"

function App() {
  return (
    <BoardStateProvider>
      <GameProvider>
        <div className="App">
              <MyWebsocket></MyWebsocket>
              {/* <Board></Board> */}
        </div>
      </GameProvider>
    </BoardStateProvider>
  );
}
export default App;
