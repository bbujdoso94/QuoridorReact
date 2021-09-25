import React from 'react'

export const Cell = (props) => {
    return (
        <div className="column" data-col={props.cell} data-player={props.player}>
            <div className="cell"></div>
            <div className="horiz-border"></div>
            <div className="vertic-border"></div>
        </div>
    )
}
