import React from 'react'
import { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [gameData, setGameData] = useState('[{"type": "wall"}]');


    return (
        <GameContext.Provider value={[gameData, setGameData]}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;

// {
//     type: "stepField",
//     player:"player2",
//     direction: "none",
//     wallType:"none",
//     id:"0"
// },{
//     type:"wall",
//     player:"none",
//     direction:"vertical",
//     wallType:"empty",
//     id: "1"
// }