import React from 'react'

export const Cell = (props) => {
    return (
        <div className="column" data-col={props.cell} data-player={props.player}>
            <div className="cell"></div>
            <div className="border horiz-border"></div>
            <div className="border vertic-border"></div>
        </div>
    )
}
