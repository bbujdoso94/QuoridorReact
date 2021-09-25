import React from 'react'

export const Board = () => {


    let myBoard = [];

    for (let index = 0; index < 9; index++){
        let row = [];
        for (let col = 0; col < 9; col++){
            row.push(col+1);
        }
        myBoard.push(row);
    }



    return (
        <div>
            My board
            {myBoard.map(x=>
            <div className="row">{x.map(cell =>
                <div className="column"></div>
            )}</div>
            )}
            
        </div>
    )
}
