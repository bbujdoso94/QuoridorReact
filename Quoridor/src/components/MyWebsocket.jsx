import React, {useContext} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";
import axios from "axios";
import { Link } from 'react-router-dom';
import { GameIDContext } from "./GameIDContext";



let socket ='';
let stompClient = '';
let gameIdglob;
let playerId = "player2";

export const send = (celldata, gameID)=> {
  let cellId = celldata;
  if (stompClient && stompClient.connected) {
    const msg = { 
      cellId: cellId,
      player:playerId
    };
    stompClient.send("/app/game/" + gameID, JSON.stringify(msg), {});
  }
}

export const disconnect = () => {
  if (stompClient) {
    stompClient.disconnect();
  }
}

export const MyWebsocket = () => {

  const setContextGameID = useContext(GameIDContext)[1];

  const setGameData = useContext(GameContext)[1];

    const subscribeToEndpoint = () =>{
      socket = new SockJS("https://vast-river-12441.herokuapp.com/gs-guide-websocket");
      stompClient = Stomp.over(socket);
      stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe("/runninggame/" + gameIdglob +"/" + playerId, data => {
          if(JSON.parse(data.body).invalidMove){
            alert(JSON.parse(data.body).errorMsg)
            return
          } else if (JSON.parse(data.body).winner != null){
            alert(JSON.parse(data.body).winner)
            disconnect();
            window.location.href="/";
          }
        setGameData(JSON.parse(data.body));
        })},
        error => {
          console.log(error);
        ;
      })}
      

  const createGame =()=> {
    axios.get("https://vast-river-12441.herokuapp.com/fetchNextGame")
    .then(data =>{
    gameIdglob = data.data.gameId;
    playerId = data.data.player;
    setContextGameID(data.data.gameId);
  }).then(()=>{subscribeToEndpoint()})}

  function addGameId(inputGameId){
    console.log(inputGameId);
    gameIdglob = inputGameId;
    setContextGameID(inputGameId);
  }

  return (
      <>
          <div className="websocketComponents">
          <div className ="explUseOfSite"> Hello Quoridor gamer! As you can see, there are 2 options to start a game here:
            <ul>
              <li>Create a new game, and you will be given a GameId, which you can share with your friend.</li>
              <li>Use the GameId that your friend gave you to join an existing game!</li>
            </ul>
          </div>
            <Link to="/game">
              <button onClick={createGame}className="createGameButton">Create Game</button><br/>
            </Link>
            <h1 className="headerForMainPage"> Or enter Game ID: </h1>
            <input className = "inputForGameId" id="gameIDInput" placeholder = "Game ID" onChange={(e)=>addGameId(e.target.value)}></input>
            <br></br>
            <Link to="/game">
              <button onClick={subscribeToEndpoint}className="joinGameButton">Join Game</button>
            </Link>
            <br></br>
            <div className = "gameRules">
              You can find the official game rules here : <a href="https://www.ultraboardgames.com/quoridor/game-rules.php">GameRules</a>
            </div>
            <footer className="footer">Disclaimer: This is a fan-made game based on Quoridor</footer>
          </div>
          <br/>
      </>
  )
}

export default MyWebsocket;
