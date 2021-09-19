import './App.css';
import SockJS from 'sockjs';
import Stomp from 'stompjs';

function App() {

  var stompClient = null;

  function setConnected(connected) {
      document.getElementById("connect").prop("disabled", connected);
      document.getElementById("#disconnect").prop("disabled", !connected);
      if (connected) {
        document.getElementById("#conversation").show();
      }
      else {
        document.getElementById("#conversation").hide();
      }
      document.getElementById("#greetings").html("");
  }

  function connect() {
      var socket = new SockJS('/gs-guide-websocket');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
          setConnected(true);
          console.log('Connected: ' + frame);
          stompClient.subscribe('/topic/greetings', function (greeting) {
              console.log(JSON.parse(greeting.body).content);
          });
      });
  }

  function disconnect() {
      if (stompClient !== null) {
          stompClient.disconnect();
      }
      setConnected(false);
      console.log("Disconnected");
  }

  function sendName() {
      stompClient.send("/app/hello", {}, JSON.stringify({'name': document.querySelector("#name").val()}));
  }

  function showGreeting(message) {
    document.getElementById("#greetings").append("<tr><td>" + message + "</td></tr>");
  }

  document.addEventListener('load', (function () {
    document.querySelectorAll("form").addEventListener('submit', (e) => {
      e.preventDefault();
    })

    document.querySelector("#connect").addEventListener('click', connect);
    document.querySelector( "#disconnect" ).addEventListener('click', disconnect);
    document.querySelector( "#send" ).addEventListener('click', sendName);
  }));

  return (
    <div className="App">
      <div id="main-content" class="container">
        <div className="row">
          <div className="col-md-6">
            <form className="form-inline">
              <div className="form-group">
                <label for="connect">WebSocket connection:</label>
                <button id="connect" className="btn btn-default" type="submit">Connect</button>
                <button id="disconnect" className="btn btn-default" type="submit" disabled="disabled">Disconnect
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <form className="form-inline">
              <div className="form-group">
                <label for="name">What is your name?</label>
                <input type="text" id="name" className="form-control" placeholder="Your name here..."></input>
              </div>
              <button id="send" className="btn btn-default" type="submit">Send</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <table id="conversation" className="table table-striped">
              <thead>
              <tr>
                <th>Greetings</th>
              </tr>
              </thead>
              <tbody id="greetings">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
