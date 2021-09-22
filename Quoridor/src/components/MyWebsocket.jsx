import React from "react";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export const MyWebsocket = () => {

    let connected =false;
    let socket ='';
    let stompClient = '';
    const  send = ()=> {
          let send_message = 'hello !';
          if (stompClient && stompClient.connected) {
            const msg = { name: send_message };
            stompClient.send("/app/hello", JSON.stringify(msg), {});
          }
        }
        const connect =()=> {
          socket = new SockJS("https://dry-mountain-12518.herokuapp.com/gs-guide-websocket");
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
        </div>
    )
}

export default MyWebsocket;