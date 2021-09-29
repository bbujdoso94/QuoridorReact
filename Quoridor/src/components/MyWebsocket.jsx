import React from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

let connected =false;
let socket ='';
let stompClient = '';

export const  send = ()=> {
  let send_message = 'My message!';
  if (stompClient && stompClient.connected) {
    const msg = { name: send_message };
    stompClient.send("/app/hello", JSON.stringify(msg), {});
  }
}

export const MyWebsocket = () => {
  
        const connect =()=> {
          socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
          stompClient = Stomp.over(socket);
          stompClient.connect(
            {},
            frame => {
              connected = true;
              stompClient.subscribe("/topic/greetings", data => { console.log("kiscica" + JSON.parse(data.body).content) //define the callback function to decide what happens with the return data
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
        <div>
        Websocket component
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={send}>Send</button>
        </div>
    )
}

export default MyWebsocket;
