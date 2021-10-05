import React, {useContext, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";
import {BoardStateContext} from "./BoardStateContext";
import {Board} from "./Board";


let connected =false;
let socket ='';
let stompClient = '';


export const  send = (celldata)=> {
  let send_message = celldata - 1;
  if (stompClient && stompClient.connected) {
    const msg = { name: send_message };
    stompClient.send("/app/hello", JSON.stringify(msg), {});
  }
}
export const MyWebsocket = () => {

  const [input, setInput] = useState("");

  const[gameData, setGameData] = useContext(GameContext);
  const[boardState, setBoardState] = useContext(BoardStateContext);


  function move (response){
  response = JSON.parse(response)
    const newCell = {"type":"stepField",
    "player":"player1",
    "direction":"none",
    "wallType":"none",
    "id":response.cellId
    }    
    let tmpBoardState = [...boardState];
    tmpBoardState[response[0].cellId] = newCell;
    setBoardState(tmpBoardState)
    console.log("boardState set to:");
    console.log(boardState);
    console.log("gamedata")
    console.log(gameData)
  }


  const connect =()=> {
    socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        connected = true;
        stompClient.subscribe("/topic/greetings", data => { //define the callback function to decide what happens with the return data
        setGameData(JSON.parse(data.body).content);
        setInput(JSON.parse(data.body).content);
        move(gameData);
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
      <br></br>
      <Board input={input}></Board>
      </div>
      <br/>
      </>
  )
}

export default MyWebsocket;
