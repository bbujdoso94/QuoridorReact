import React from 'react'
import { createContext, useState } from 'react';

export const GameContext = createContext();

export default function GameProvider(props) {

    const [gameData, setGameData] = useState(
        {id: 0}
    );

    return (
        <GameContext.Provider value={[gameData, setGameData]}>
            {props.children}
        </GameContext.Provider>
    )
}
