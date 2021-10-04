import React from 'react'
import {send} from './MyWebsocket';

const Cell = (props) => {
    
    return (
            <div onClick={() => send(props.id)} id ={props.id} className={props.className}></div> 
    )
}

export default Cell;