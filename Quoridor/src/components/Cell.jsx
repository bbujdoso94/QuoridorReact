import React from 'react'
import {send} from './MyWebsocket';

const Cell = (props) => {

    function MouseOver(event) {
        if (props.className.includes("corner")
            || props.className.includes("reserved")){
            return;
        }

        //Excluding last walls on edges
        if (props.className.includes("wall")
            && (props.id >= 274 || props.id % 34 === 0)){
                console.log("entered")
                return;
        }

        let adjacentCorner = null;
        let adjacentWall = null;

        if (props.className.includes("wall")
            && props.className.includes("horizontal")){
            
            adjacentCorner = document.getElementById(`${props.id + 1}`);
            adjacentWall = document.getElementById(`${props.id + 2}`);

        }
        if (props.className.includes("wall")
        && props.className.includes("vertical")){
        
            adjacentCorner = document.getElementById(`${props.id + 17}`);
            adjacentWall = document.getElementById(`${props.id + 34}`);
        
        }

        if (props.className.includes("stepField")){
            event.target.style.boxSizing="border-box";
            event.target.style.border = "4px solid yellow";
        }
        if (props.className.includes("wall")){
            if ( ! adjacentCorner.classList.contains("reserved")
                && ! adjacentWall.classList.contains("reserved")){
                event.target.style.boxSizing="border-box";
                event.target.style.border = "4px solid yellow";
                adjacentCorner.style.boxSizing="border-box";
                adjacentCorner.style.border = "4px solid yellow";
                adjacentWall.style.boxSizing="border-box";
                adjacentWall.style.border = "4px solid yellow";
                }
        }
        
      }



      function MouseOut(event){
        event.target.style.boxSizing="";
        event.target.style.border = "";
        if (props.className.includes("wall")
        && ! props.className.includes("reserved")
        && props.id % 34 !== 0
        && props.className.includes("horizontal")){
            let adjacent = document.getElementById(`${props.id + 1}`);
            adjacent.style.border = "";
            let adjacentWall = document.getElementById(`${props.id + 2}`);
            adjacentWall.style.border = "";
        }
        if (props.className.includes("wall")
        && ! props.className.includes("reserved")
        && props.id < 274
        && props.className.includes("vertical")){
        let adjacentCorner = document.getElementById(`${props.id + 17}`);
        adjacentCorner.style.border = "";
        let adjacentWall = document.getElementById(`${props.id + 34}`);
        adjacentWall.style.border = "";
        }
      }

      function validateAndSend(){
        //Excluding last walls on edges
        if (props.className.includes("wall")
        && (props.id >= 274 || props.id % 34 === 0)){
            alert("invalid move")
            return;
        }

        if ((props.className.includes("wall") || props.className.includes("corner"))
            && props.className.includes("reserved")){
                alert("invalid move")
                return;
        }

        let adjacentCorner = null;
        let adjacentWall = null;

        //Excluding walls with occupied neighbour
        if (props.className.includes("wall")
        && props.className.includes("horizontal")){
        
        adjacentCorner = document.getElementById(`${props.id + 1}`);
        adjacentWall = document.getElementById(`${props.id + 2}`);

        }
        if (props.className.includes("wall")
        && props.className.includes("vertical")){
        
        adjacentCorner = document.getElementById(`${props.id + 17}`);
        adjacentWall = document.getElementById(`${props.id + 34}`);
    
        }

        if (props.className.includes("wall")
        
        && (adjacentCorner.classList.contains("reserved")
        || adjacentWall.classList.contains("reserved"))){
            alert("invalid move")
            return;
        }    

        send(props.id);

      }

    
    return (
            <div onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={(event) => {validateAndSend();MouseOut(event)}} id ={props.id} className={props.className}></div> 
    )
}

export default Cell;