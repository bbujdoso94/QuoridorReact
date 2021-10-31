import "./App.css";
import MyWebsocket from "./components/MyWebsocket";
import GameProvider from "./components/GameContext"; 
import BoardStateProvider from "./components/BoardStateContext"
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import { Board } from "./components/Board";

function App() {
  return (
    <BoardStateProvider>
      <GameProvider>
        <div className="App">
        
        <Router>
          <Route exact path = "/" component={MyWebsocket}/>
          <Route exact path = "/game" component={Board}/>
        </Router>  
        </div>
      </GameProvider>
    </BoardStateProvider>
  );
}
export default App;
