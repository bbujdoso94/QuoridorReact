import React from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export const MyWebsocket = () => {

    let connected =false;
    let socket ='';
    let stompClient = '';
    const  send = ()=> {
           let send_message = 'My message!';
           if (stompClient && stompClient.connected) {
             const msg = { name: send_message };
             stompClient.send("/app/hello", JSON.stringify(msg), {});
           }
         }
        const connect =()=> {
          socket = new SockJS("http://127.0.0.1:8080/gs-guide-websocket");
          stompClient = Stomp.over(socket);
          stompClient.connect(
            {},
            frame => {
              connected = true;
              stompClient.subscribe("/topic/greetings", tick => {
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