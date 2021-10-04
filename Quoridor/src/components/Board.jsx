import React, {useEffect, useState, useContext} from 'react';
import { GameContext } from './GameContext';
import Cell from './Cell';
import initBoard from './data/initBoard.json';


export const Board = () => {

    const [gameData] = useContext(GameContext);
    const [boardState] = useState(initBoard.allCells);
    
    useEffect(() => {
        //setBoardState(JSON.parse(gameData));
        console.log("boardState set to:");
        console.log(boardState);
        
    }, [gameData,boardState]);
    
    return (
        <div className="container">
            {boardState.map(celljson => {
                return <Cell key={celljson.id} id={celljson.id} className={`${celljson.type} ${celljson.player} ${celljson.direction} ${celljson.wallType}`}></Cell>
            })}
        </div>
        )
    }

