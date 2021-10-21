import React from 'react'
import {send} from './MyWebsocket';

const Cell = (props) => {

    function MouseOver(event) {
        event.target.style.boxSizing="border-box";
        event.target.style.border = "4px solid yellow";
      }
      function MouseOut(event){
        event.target.style.boxSizing="";
        event.target.style.border = "";
      }

    
    return (
            <div onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={() => send(props.id)} id ={props.id} className={props.className}></div> 
    )
}

export default Cell;