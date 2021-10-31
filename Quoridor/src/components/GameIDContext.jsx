import React from 'react'
import { createContext, useState } from 'react'

export const GameIDContext = createContext();

const GameIDPovider = (props) => {
    const [gameID, setGameID] = useState(0);

    return (
        <GameIDPovider value={[gameID, setGameID]}>
            <div>
                {props.children}
            </div>
        </GameIDPovider>
    )
}

export default GameIDPovider;
