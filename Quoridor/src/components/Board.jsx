import React, {useEffect,useContext} from 'react';
import { GameContext } from './GameContext';
import Cell from './Cell';


export const Board = () => {

    const [gameState] = useContext(GameContext);
    
    
    useEffect(() => {
        //setBoardState(JSON.parse(gameData));
        console.log("boardState set to:");
        console.log(gameState);
        
    }, [gameState]);
    
    return (
        <div className="container">
             {gameState.map(celljson => {
                return <Cell key={celljson.id} id={celljson.id} className={`${celljson.type} ${celljson.player} ${celljson.direction} ${celljson.wallType}`}></Cell>
            })}
        </div>
        )
    }

