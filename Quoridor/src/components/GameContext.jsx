import React from 'react'
import { createContext, useState } from 'react';
import initBoard from './data/initBoard.json';

export const GameContext = createContext();

export const GameProvider = (props) => {

    const [gameData, setGameData] = useState(JSON.stringify(initBoard.allCells));

    return (
        <GameContext.Provider value={[gameData, setGameData]}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider;