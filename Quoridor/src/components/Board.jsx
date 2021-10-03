import React, {useState, useEffect, useContext} from 'react';
import { GameContext } from './GameContext';
import Cell from './Cell';
import initBoard from './data/initBoard.json';



export const Board = () => {

    const [gameData, setGameDate] = useContext(GameContext);
    const [boardState, setBoardState] = useState(initBoard.allCells);
    

    function move(response) {
        response = JSON.parse(response)
        const newCell = {"type":"stepField",
        "player":"player1",
        "direction":"none",
        "wallType":"none",
        "id":response.cellId
        }    
        let tmpBoardState = [...boardState];
        console.log("response: ")
        console.log(response)
        tmpBoardState[response[0].cellId] = newCell;
        console.log("tempboardstate: ");
        console.log(tmpBoardState)
        setBoardState(tmpBoardState)
        console.log("newboardstate  ")
        console.log(boardState)
    }
    
    
    useEffect(() => {
        move(gameData);
        //setBoardState(JSON.parse(gameData));
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

