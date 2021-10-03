import React, {useState, useEffect, useContext} from 'react';
import { GameContext } from './GameContext';
import Cell from './Cell';

export const Board = () => {

    const [gameData, setGameDate] = useContext(GameContext);

    const [boardState, setBoardState] = useState([]);

    useEffect(() => {
        setBoardState(JSON.parse(gameData));
        console.log("boardState set to:");
        console.log(gameData);
    }, [gameData]);

    return (
        <div className="container">
            {boardState.map(celljson => {
                return <Cell id={celljson.id} className={`${celljson.type} ${celljson.player} ${celljson.direction} ${celljson.wallType}`}></Cell>
            })}
        </div>
        )
    }

