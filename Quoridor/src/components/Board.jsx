import React from 'react'

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
            {myBoard.map(x=>
            <div className="row">{x.map(cell =>{
                if(cell == 4){
                    return <div data-col={cell} data-player="player1" className="column"></div>
                }
                if (cell == 76){
                    return <div data-col={cell} data-player="player2" className="column"></div>
                }
                return <div onClick={x=>console.log({cell})} data-col={cell} data-player="empty" className="column"></div>
                
            }
            )}</div>
            )}
            
        </div>
    )
}
