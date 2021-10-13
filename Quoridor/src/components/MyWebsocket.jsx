import React, {useContext} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";
import {Board} from "./Board";
import axios from "axios";


let socket ='';
let stompClient = '';
let gameId = 0;


export const  send = (celldata)=> {
  let cellId = celldata;
  if (stompClient && stompClient.connected) {
    const msg = { 
      cellId: cellId,
      player:"player2"
    };
    console.log(msg);
    stompClient.send("/app/hello/" + gameId, JSON.stringify(msg), {});
  }
}
export const MyWebsocket = () => {


  const setGameData = useContext(GameContext)[1];

  const connect =()=> {
    axios.get("http://127.0.0.1:8080/fetchNextGame")
    .then(data =>{
      console.log("fetching fetch endpoint")
      console.log(data);
    gameId = data.data.boardId;
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
      }
    );
  }

  const disconnect =()=> {
    if (stompClient) {
      stompClient.disconnect();
    }
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
