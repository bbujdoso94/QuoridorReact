import React from 'react'

export const Cell = (props) => {

    let modulo = (props.cell+1) % 9;


    let rightMost = modulo === 0 ? "rightMost" : "";

    let lastRow = props.cell >= 72 ? "lastRow" : "";
    
    return (
        <div className={`column ${rightMost} ${lastRow}`} data-col={props.cell} data-player={props.player}>
            <div className="cell"></div>


            <div className="border vertic-border"></div>
            <div className="border horiz-border"></div>

            <div className="corner"></div>


            
        
        </div>
    )
}
