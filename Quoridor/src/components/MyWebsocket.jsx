import React, {useContext,useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";
import {Board} from "./Board";
import axios from "axios";

let socket ='';
let stompClient = '';
let gameIdglob;
let playerId = "player2";

export const  send = (celldata)=> {
  let cellId = celldata;
  if (stompClient && stompClient.connected) {
    const msg = { 
      cellId: cellId,
      player:playerId
    };
    stompClient.send("/app/game/" + gameIdglob, JSON.stringify(msg), {});
  }
}
export const MyWebsocket = () => {

  const setGameData = useContext(GameContext)[1];

  let [gameId,setgameId] = useState(0);

    const subscribeToEndpoint = () =>{
      socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
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
            return
          }
        setGameData(JSON.parse(data.body));
        })},
        error => {
          console.log(error);
        ;
      })}
      

  const createGame =()=> {
    axios.get("http://127.0.0.1:8080/fetchNextGame")
    .then(data =>{
    gameId = setgameId(data.data.gameId);
    gameIdglob = data.data.gameId;
    playerId = data.data.player;
  }).then(()=>{subscribeToEndpoint()})}

   const disconnect =()=> {
    if (stompClient) {
      stompClient.disconnect();
    }
  }

  function addGameId(inputGameId){
    console.log(inputGameId);
    gameIdglob = inputGameId;
    gameId = setgameId(inputGameId);
  }

  return (
      <>
      <div className="websocketComponents">
      <h1 className="gameIdDiv">{gameId}</h1>
      <button onClick={createGame}>Create Game</button><br/>
      <input placeholder = "Game ID" onChange={(e)=>addGameId(e.target.value)}></input>
      <br></br>
      <button onClick={subscribeToEndpoint}>Join Game</button>
      <button onClick={disconnect}>Disconnect</button> 
      <br></br>
      </div>
      <Board></Board>
      <br/>
      </>
  )
}

export default MyWebsocket;
