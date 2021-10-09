import React, {useEffect, useContext, useRef} from 'react';
import { GameContext } from './GameContext';
import { BoardStateContext } from './BoardStateContext';
import Cell from './Cell';

export const Board = (props) => {

    const dontUseEffect = "don't useEffect";
    const prevBoardRef = useRef(dontUseEffect);
    const [gameData] = useContext(GameContext);
    const [boardState, setBoardState] = useContext(BoardStateContext);


    function move (response){
        prevBoardRef.current = dontUseEffect;
            const newCell = {"type":"stepField",
            "player":"player1",
            "direction":"none",
            "wallType":"none",
            "id":response[0].cellId
            }
            console.log("New cell data : " + newCell)
            let tmpBoardState = [...boardState];
            tmpBoardState[response[0].cellId] = newCell;
            setBoardState(tmpBoardState)
            console.log("boardState set to:");
            console.log(boardState);
            console.log("gamedata:")
            console.log(gameData)    

    }
    useEffect(() => {
        console.log("Board useEffect ran.");
        console.log(gameData);
        let response = JSON.parse(gameData);
        console.log("visszakapott json response: " + response + response[0].cellId)

        if(prevBoardRef.current === dontUseEffect) {
            prevBoardRef.current = "";
            return;
        } else {
            move()
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

