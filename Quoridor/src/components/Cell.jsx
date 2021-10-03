import React, {useContext} from 'react'
import MyWebsocket from './MyWebsocket';
import {send} from './MyWebsocket';
import { GameContext } from './GameContext';

const Cell = (props) => {

    // type :wall, stepField
    // player: 0,1,2
    // direction : horizontal, vertical, corner, none
    // wallType: empty, solid, none
    // id:
    return (
            <div id ={props.id} className={props.className}></div> 
    )
}

export default Cell;