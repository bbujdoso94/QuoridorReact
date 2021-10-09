import React, {useContext} from 'react'
import MyWebsocket from './MyWebsocket';
import {send} from './MyWebsocket';
import { GameContext } from './GameContext';

const Cell = (props) => {
    
    return (
            <div onClick={() => send(props.id,)} id ={props.id} className={props.className}></div> 
    )
}

export default Cell;