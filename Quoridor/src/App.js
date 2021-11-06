import "./App.css";
import MyWebsocket from "./components/MyWebsocket";
import GameProvider from "./components/GameContext";
import BoardStateProvider from "./components/BoardStateContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Board } from "./components/Board";
import GameIDProvider from "./components/GameIDContext";

function App() {
  return (
    <BoardStateProvider>
      <GameProvider>
        <GameIDProvider>
          <div className="App">
            <Router>
              <Route exact path="/" component={MyWebsocket} />
              <Route exact path="/game" component={Board} />
            </Router>
          </div>
        </GameIDProvider>
      </GameProvider>
    </BoardStateProvider>
  );
}
export default App;
