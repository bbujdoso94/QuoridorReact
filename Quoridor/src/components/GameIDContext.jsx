import React from 'react'
import { createContext, useState } from 'react'

export const GameIDContext = createContext();

export const GameIDPovider = (props) => {
    const [gameID, setGameID] = useState();

    return (
        <GameIDContext.Provider value={[gameID, setGameID]}>
            <div>
                {props.children}
            </div>
        </GameIDContext.Provider>
    )
}

export default GameIDPovider;
