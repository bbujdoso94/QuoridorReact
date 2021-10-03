import React from 'react'
import { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [gameData, setGameData] = useState([
        {
            type:2,
            player:2,
            direction:2,
            wallType:2,
            id:2
        },{
            type:2,
            player:2,
            direction:2,
            wallType:2,
            id:2
        }
    ]);


    return (
        <GameContext.Provider value={[gameData, setGameData]}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;