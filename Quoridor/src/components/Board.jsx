import React, {useState, useEffect, useContext} from 'react';
import { Cell } from './Cell';
import { GameContext } from './GameContext';
import Cell2 from './Cell2';

export const Board = () => {

    const [gameData, setGameDate] = useContext(GameContext);

    const [boardState, setBoardState] = useState([]);

    useEffect(() => {
        setBoardState(gameData);
        console.log("boardState set to:");
        console.log(gameData);
    }, [gameData]);

    return (
        <div className="container">
            {boardState.map(celljson => {
                return <Cell2 id={celljson.id} className={`${celljson.type} ${celljson.player} ${celljson.direction} ${celljson.wallType}`}></Cell2>
            })}
        </div>

        )
    }

