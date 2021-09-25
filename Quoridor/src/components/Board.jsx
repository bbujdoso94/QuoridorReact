import React from 'react';
import { Cell } from './Cell';

export const Board = () => {


    let myBoard = [];

    for (let index = 0; index < 9; index++){
        let row = [];
        for (let col = 0; col < 9; col++){
            row.push(col+9*index);
        }
        myBoard.push(row);
    }

    //4, 76



    return (
        <div>
            My board
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
