import React, {useState, useEffect, useContext} from 'react';
import { Cell } from './Cell';
import { GameContext } from './GameContext';

export const Board = () => {

    const [gameData, setGameDate] = useContext(GameContext);

    const [boardState, setBoardState] = useState();

    useEffect(() => {
        setBoardState(gameData);
        console.log("boardState set to:");
        console.log(gameData);
    }, [gameData]);

    let myBoard = [];

    for (let index = 0; index < 9; index++){
        let row = [];
        for (let col = 0; col < 9; col++){
            row.push(col+9*index);
        }
        myBoard.push(row);
    }

    return (
        <div className="board-container">
            {myBoard.map((x,i)=>
            <div key={i} className="row">{x.map(cell =>{
                if(cell === 4){
                    return <Cell key={cell} cell={cell} player="player1"/>
                    
                    // <div key={cell} data-col={cell} data-player="player1" className="column">
                    //             <div className="cell"></div>
                    //             <div className="horiz-border"></div>
                    //             <div className="vertic-border"></div>
                    //         </div>
                }
                if (cell === 76){
                    return <Cell key={cell} cell={cell} player="player2"/>
                }
                return <Cell key={cell} cell={cell} player="empty"/>
            }
            )}
            </div>
            
            )}
        </div>
    )
}
