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
  console.log("sending move");
  let cellId = celldata;
  if (stompClient && stompClient.connected) {
    const msg = { 
      cellId: cellId,
      player:playerId
    };
      console.log("the json sent is : ")
    console.log(msg);
    stompClient.send("/app/game/" + gameId, JSON.stringify(msg), {});
  }
  console.log("Message:");
}
export const MyWebsocket = () => {

  const setGameData = useContext(GameContext)[1];

    const subscribeToEndpoint = () =>{
      socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
      stompClient = Stomp.over(socket);
      console.log(stompClient);
      
      console.log("futok")
      console.log(stompClient);
      stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe("/runninggame/" + gameId +"/" + playerId, data => {
          console.log("DATA ITT ")
        console.log(data) 
        setGameData(JSON.parse(data.body));
        })},
        error => {
          console.log(error);
        ;
      })}
      

  const createGame =()=> {
    axios.get("http://127.0.0.1:8080/fetchNextGame")
    .then(data =>{
      console.log("fetching fetch endpoint")
      console.log(data);
    gameId = data.data.boardId;
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
