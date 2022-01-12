import React from 'react'

export default function WallDisplay(props) {
    let wallsLeft = props.wallsLeft;
    return (
        <div>
            maradék falak : {wallsLeft}
        </div>
    )
}
