import React, {useContext} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";
import {Board} from "./Board";
import axios from "axios";


let socket ='';
let stompClient = '';
let gameId = 0;
let playerId = "player2";

export const  send = (celldata)=> {
  let cellId = celldata;
  if (stompClient && stompClient.connected) {
    const msg = { 
      cellId: cellId,
      player:playerId
    };
    stompClient.send("/app/game/" + gameId, JSON.stringify(msg), {});
  }
}
export const MyWebsocket = () => {

  const setGameData = useContext(GameContext)[1];

    const subscribeToEndpoint = () =>{
      socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
      stompClient = Stomp.over(socket);
      stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe("/runninggame/" + gameId +"/" + playerId, data => {
          if(JSON.parse(data.body).invalidMove){
            alert("Invalid move !")
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
    gameId = data.data.gameId;
    playerId = data.data.player;
  }).then(()=>{subscribeToEndpoint()})}

   const disconnect =()=> {
    if (stompClient) {
      stompClient.disconnect();
    }
  }

  function addGameId(inputGameId){
    console.log(inputGameId);
    gameId = inputGameId;
  }

  return (
      <>
      <div>
      Websocket component
      <button onClick={createGame}>Create Game</button><br/>
      <input onChange={(e)=>addGameId(e.target.value)}></input>
      <button onClick={subscribeToEndpoint}>Join Game</button>
      <button onClick={disconnect}>Disconnect</button> 
      <br></br>
      <Board></Board>
      </div>
      <br/>
      </>
  )
}

export default MyWebsocket;
