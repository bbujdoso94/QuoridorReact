import React, {useEffect, useContext,ReactDOM} from 'react';
import { GameContext } from './GameContext';
import { BoardStateContext } from './BoardStateContext';
import Cell from './Cell';
import initBoard from './data/initBoard.json';

export const Board = (props) => {

    const [gameData] = useContext(GameContext);
    const [boardState] = useContext(BoardStateContext);

    useEffect(() => {
        console.log("triggerelődök");
    },[boardState])


    return (
        <div className="container">
            <h5>{props.input}</h5>
            {boardState.map(celljson => {
                return <Cell id={celljson.id} className={`${celljson.type} ${celljson.player} ${celljson.direction} ${celljson.wallType}`}></Cell>
            })}
        </div>
        )
    }

