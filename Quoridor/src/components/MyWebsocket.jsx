import React, {useContext} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";

let connected =false;
let socket ='';
let stompClient = '';


export const  send = (celldata)=> {
  let send_message = celldata;
  if (stompClient && stompClient.connected) {
    const msg = { name: send_message };
    stompClient.send("/app/hello", JSON.stringify(msg), {});
  }
}
export const MyWebsocket = () => {

  const[gameData, setGameData] = useContext(GameContext);
  
  const connect =()=> {
    socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        connected = true;
        stompClient.subscribe("/topic/greetings", data => { //define the callback function to decide what happens with the return data
        setGameData(JSON.parse(data.body).content);
        });
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
      </div>
      <br/>
      </>
  )
}

export default MyWebsocket;
