import React, {useEffect, useContext, useRef} from 'react';
import { GameContext } from './GameContext';
import { BoardStateContext } from './BoardStateContext';
import Cell from './Cell';

export const Board = (props) => {

    const dontUseEffect = "don't useEffect";
    const prevBoardRef = useRef(dontUseEffect);
    const [gameData] = useContext(GameContext);
    const [boardState, setBoardState] = useContext(BoardStateContext);

    useEffect(() => {
        console.log("Board useEffect ran.");
        let response = JSON.parse(gameData);

        if(prevBoardRef.current == dontUseEffect) {
            prevBoardRef.current = "";
            return;
        } else {
            prevBoardRef.current = dontUseEffect;
            const newCell = {"type":"stepField",
            "player":"player1",
            "direction":"none",
            "wallType":"none",
            "id":response.cellId
            }
            let tmpBoardState = [...boardState];
            tmpBoardState[response[0].cellId] = newCell;
            setBoardState(tmpBoardState)
            console.log("boardState set to:");
            console.log(boardState);
            console.log("gamedata:")
            console.log(gameData)    
        }
    },[gameData, boardState, setBoardState])


    return (
        <div className="container">
            <h5>{props.input}</h5>
            {boardState.map(celljson => {
                return <Cell id={celljson.id} className={`${celljson.type} ${celljson.player} ${celljson.direction} ${celljson.wallType}`}></Cell>
            })}
        </div>
        )
    }

