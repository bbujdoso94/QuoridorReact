import React from 'react'
import {send} from './MyWebsocket';

const Cell = (props) => {

    function MouseOver(event) {
        if (props.className.includes("corner")){
            return;
        }
        event.target.style.boxSizing="border-box";
        event.target.style.border = "4px solid yellow";
        if (props.className.includes("wall")
            && props.className.includes("horizontal")){
            let adjacentCorner = document.getElementById(`${props.id + 1}`);
            adjacentCorner.style.boxSizing="border-box";
            adjacentCorner.style.border = "4px solid yellow";
            let adjacentWall = document.getElementById(`${props.id + 2}`);
            adjacentWall.style.boxSizing="border-box";
            adjacentWall.style.border = "4px solid yellow";
        }
        if (props.className.includes("wall")
        && props.className.includes("vertical")){
        let adjacentCorner = document.getElementById(`${props.id + 17}`);
        adjacentCorner.style.boxSizing="border-box";
        adjacentCorner.style.border = "4px solid yellow";
        let adjacentWall = document.getElementById(`${props.id + 34}`);
        adjacentWall.style.boxSizing="border-box";
        adjacentWall.style.border = "4px solid yellow";
        }
      }



      function MouseOut(event){
        event.target.style.boxSizing="";
        event.target.style.border = "";
        if (props.className.includes("wall")
        && props.className.includes("horizontal")){
            let adjacent = document.getElementById(`${props.id + 1}`);
            adjacent.style.boxSizing="";
            adjacent.style.border = "";
            let adjacentWall = document.getElementById(`${props.id + 2}`);
            adjacentWall.style.boxSizing="";
            adjacentWall.style.border = "";
        }
        if (props.className.includes("wall")
        && props.className.includes("vertical")){
        let adjacentCorner = document.getElementById(`${props.id + 17}`);
        adjacentCorner.style.boxSizing="";
        adjacentCorner.style.border = "";
        let adjacentWall = document.getElementById(`${props.id + 34}`);
        adjacentWall.style.boxSizing="";
        adjacentWall.style.border = "";
        }
      }

    
    return (
            <div onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={() => send(props.id)} id ={props.id} className={props.className}></div> 
    )
}

export default Cell;