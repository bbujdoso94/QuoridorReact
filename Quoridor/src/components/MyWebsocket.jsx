import React, {useContext} from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import {GameContext} from "./GameContext";

//let connected =false;
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

  const [boardState, setBoardState] = useContext(GameContext);
  const[setGameData] = useContext(GameContext);


  const connect =()=> {
    socket = new SockJS("https://dry-mountain-12518.herokuapp.com/gs-guide-websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect(
      {},
      (frame) => {
        //connected = true;
        stompClient.subscribe("/topic/greetings", data => { //define the callback function to decide what happens with the return data
        setGameData(JSON.parse(data.body).content);
        move(JSON.parse(data.body).content);
        
        });
      },
      error => {
        console.log(error);
        //connected = false;
      }
    );
  }

  function move(response) {
    response = JSON.parse(response)
    const newCell = {"type":"stepField",
    "player":"player1",
    "direction":"none",
    "wallType":"none",
    "id":response.cellId
    }    
    let tmpBoardState = [...boardState];
    console.log("response: ")
    console.log(response)
    tmpBoardState[response[0].cellId] = newCell;
    console.log("tempboardstate: ");
    console.log(tmpBoardState)
    setBoardState(tmpBoardState)
    console.log("newboardstate  ")
    console.log(boardState)
  }

  const disconnect =()=> {
    if (stompClient) {
      stompClient.disconnect();
    }
    //connected = false;
  }

  //const tickleConnection =()=> {
    //connected ? disconnect() : connect();
  //} 

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
