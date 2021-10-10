import React, {useContext, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";
import {BoardStateContext} from "./BoardStateContext";
import {Board} from "./Board";
import axios from "axios";


let connected =false;
let socket ='';
let stompClient = '';
let gameId = 0;


export const  send = (celldata)=> {
  let send_message = celldata - 1;
  if (stompClient && stompClient.connected) {
    const msg = { name: send_message};
    stompClient.send("/app/hello/" + gameId, JSON.stringify(msg), {});
  }
}
export const MyWebsocket = () => {


  const[gameData, setGameData] = useContext(GameContext);
  const[boardState, setBoardState] = useContext(BoardStateContext);

  const connect =()=> {
    axios.get("http://127.0.0.1:8080/fetchNextGame")
    .then(data =>{
    connected = true;
    gameId = data.data.gameId;
    socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe("/topic/greetings/" + gameId, data => {
          console.log("DATA ITT ")
        console.log(data) 
        setGameData(JSON.parse(data.body));
        })});
      },
      error => {
        console.log(error);
        connected = false;
      }
    );
  }

  const disconnect =()=> {
    if (stompClient) {
      stompClient.disconnect();
    }
    connected = false;
  }

  const tickleConnection =()=> {
    connected ? disconnect() : connect();
  } 

  return (
      <>
      <div>
      Websocket component
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button> 
      <br></br>
      <Board></Board>
      </div>
      <br/>
      </>
  )
}

export default MyWebsocket;
