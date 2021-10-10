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
        if(prevBoardRef.current === dontUseEffect) {
            prevBoardRef.current = "";
            return;
        } else {
            prevBoardRef.current = dontUseEffect;
            const newCell = {"type":"stepField",
            "player":gameData[0].player,
            "direction":"none",
            "wallType":"none",
            "id":gameData[0].cellId
            }
            let tmpBoardState = [...boardState];
            for (let i = 0; i<tmpBoardState.length; i++){
                if(tmpBoardState[i].player ===newCell.player){
                    tmpBoardState[i].player = "player0";
                }
            }
            tmpBoardState[gameData[0].cellId] = newCell;
            setBoardState(tmpBoardState)   
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

