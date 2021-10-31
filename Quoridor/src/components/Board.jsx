import React, {useEffect, useContext, useRef} from 'react';
import { GameContext } from './GameContext';
import { BoardStateContext } from './BoardStateContext';
import Cell from './Cell';
import { disconnect } from './MyWebsocket';
import { Link } from 'react-router-dom';

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
            let newCell = {};
            prevBoardRef.current = dontUseEffect;
            if (gameData.cellId % 2 === 1 
                && gameData.cellId % 34 > 0 
                && gameData.cellId % 34 < 18){
                newCell = {"type":"stepField",
                "player":gameData.player,
                "direction":"none",
                "wallType":"none",
                "id":gameData.cellId
            }
                let tmpBoardState = [...boardState];
                for (let i = 0; i<tmpBoardState.length; i++){
                    if(tmpBoardState[i].player ===newCell.player){
                        tmpBoardState[i].player = "player0";
                    }
            }
                tmpBoardState[gameData.cellId-1] = newCell;
                setBoardState(tmpBoardState)
            } else if (gameData.cellId % 2 === 0
                && gameData.cellId % 34 > 0 
                && gameData.cellId % 34 < 18){
                    newCell = {"type":"wall",
                    "player": "player0",
                    "direction":"horizontal",
                    "wallType":"solid",
                    "id":gameData.cellId
                }
                    let tmpBoardState = [...boardState];
                    tmpBoardState[gameData.cellId-1] = newCell;
                    let corner = {"type":"corner",
                    "player": "player0",
                    "direction":"none",
                    "wallType":"solid",
                    "id":`${+gameData.cellId + 17}`
                    }         
                    tmpBoardState[+gameData.cellId + 16] = corner;
                    let nextWall = {"type":"wall",
                    "player": "player0",
                    "direction":"horizontal",
                    "wallType":"solid",
                    "id":`${+gameData.cellId + 34}`
                    }  
                    tmpBoardState[+gameData.cellId + 33] = nextWall;
                    setBoardState(tmpBoardState)    
            
            //last vertical wall (id % 34 === 0)is invalid move         
            } else if (gameData.cellId % 34 >= 18){
                    newCell = {"type":"wall",
                    "player": "player0",
                    "direction":"vertical",
                    "wallType":"solid",
                    "id":gameData.cellId
                    }
                    let tmpBoardState = [...boardState];
                    tmpBoardState[gameData.cellId-1] = newCell;
                    
                    let corner = {"type":"corner",
                    "player": "player0",
                    "direction":"none",
                    "wallType":"solid",
                    "id":`${+gameData.cellId + 1}`
                    }         
                    tmpBoardState[+gameData.cellId] = corner;
                    
                    let nextWall = {"type":"wall",
                    "player": "player0",
                    "direction":"vertical",
                    "wallType":"solid",
                    "id":`${+gameData.cellId + 2}`
                    }  
                    tmpBoardState[+gameData.cellId + 1] = nextWall;
                    setBoardState(tmpBoardState)    
            }     
        
        }
    },[gameData, boardState, setBoardState])


    return (
        <div className="container">
            <h5>{props.input}</h5>
            {boardState.map(celljson => {
                return <Cell key = {celljson.id} id={celljson.id} className={`${celljson.type} ${celljson.player} ${celljson.direction} ${celljson.wallType}`}></Cell>
            })}
            <Link to="/">
                <button onClick={disconnect}>Disconnect</button> 
            </Link>
        </div>
        )
    }

