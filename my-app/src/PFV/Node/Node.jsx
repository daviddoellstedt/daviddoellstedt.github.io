import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    render(){
        const {row, col, isFinish, isStart, isWall} = this.props;
        const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start': isWall? 'node-wall': '';
        //const isWall={isWall};
        return <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}

            >

        </div>;
    }
}


export const DEFAULT_NODE = {

    r: 0,
    c: 0,

}