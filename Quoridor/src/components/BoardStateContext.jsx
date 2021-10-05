import React from 'react';
import { createContext, useState } from 'react';
import initBoard from './data/initBoard.json';

export const BoardStateContext = createContext();

const BoardStateProvider = (props) => {

    const [boardState, setboardState] = useState(initBoard.allCells);

    return (
        <BoardStateContext.Provider value={[boardState, setboardState]}>
        <div>
            {props.children}
        </div>
        </BoardStateContext.Provider>
    )
}

export default BoardStateProvider;