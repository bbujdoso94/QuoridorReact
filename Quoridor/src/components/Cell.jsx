import React from 'react'
import MyWebsocket from './MyWebsocket';
import {send} from './MyWebsocket';


export const Cell = (props) => {

    let modulo = (props.cell+1) % 9;


    let rightMost = modulo === 0 ? true : false;

    let lastRow = props.cell >= 72 ? true : false;
    
    return (
        <React.Fragment>

            { !rightMost       

            ? !lastRow 
            
                ?

                <div className={`column notRightEdge notLastRow`} data-col={props.cell} data-player={props.player}>
                <div className="cell" onClick={send}></div>
                <div className="border vertic-border"></div>
                <div className="border horiz-border"></div>
                <div className="corner"></div>
                </div>

                : 
                    <div className={`column notRightEdge lastRow`} data-col={props.cell} data-player={props.player}>
                    <div className="cell" onClick={send}></div>
                    <div className="border vertic-border"></div>
                    </div>

            :  !lastRow 
            
                ?

                <div className={`column rightMost notLastRow`} data-col={props.cell} data-player={props.player}>            
                <div className="cell" onClick={send}></div>
                <div className="border horiz-border"></div>
                </div>
                
                :

                <div className={`column rightMost lastRow`} data-col={props.cell} data-player={props.player}>
                <div className="cell" onClick={send}></div>
                </div>
        }

        </React.Fragment>
    )
}
