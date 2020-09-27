import React, {Component} from 'react';
import Node from'./Node/Node.jsx';
import {BFS} from '../Algorithms/BFS.js'
import {getPath} from '../Algorithms/helperFunctions.js'
import {getMaze} from '../Algorithms/mazeGeneration.js'

import './PathfindingVisualizer.css';

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const GOAL_NODE_ROW = 30;
const GOAL_NODE_COL = 69;
const goal = [GOAL_NODE_ROW, GOAL_NODE_COL];
const start = [START_NODE_ROW, START_NODE_COL];
const GRID_ROWS = 35; //odd
const GRID_COLS = 75; //odd

export default class PathfindingVisualizer extends Component{

    constructor(props){
        super(props);
        this.state = {
            nodes: [],
        };
    }

    componentWillMount(){

        const nodes = [];
        for (let row = 0; row < GRID_ROWS; row++){
            const currentRow = [];
            for (let col = 0; col < GRID_COLS; col++){

                const currentNode = {
                  row, col, isStart: row === start[0] && col === start[1], isFinish: row === goal[0] && col === goal[1],
                };
                currentRow.push(currentNode);

            }
            nodes.push(currentRow);

        }
        this.setState({nodes});

    }

    // componentDidMount() {
    //     const {nodes} = this.state;
    //     nodes[0][0].isFinish = true;
    //     this.setState({nodes});
    //
    // }

    maze_method(){
        const maze = getMaze(GRID_ROWS, GRID_COLS, start, goal);
        for(let i = 0; i < maze.length; i++){
            for(let j = 0; j < maze[0].length; j++) {
                // const node = [i, j]
                if (maze[i][j] === 1) {

                    setTimeout(() => {
                           // document.getElementById(`node-${i}-${j}`).className = 'node node-wall';
                            document.getElementById(`node-${i}-${j}`).isWall = true;
                           // window.alert(document.getElementById(`node-${i}-${j}`).isWall)
                            document.getElementById(`node-${i}-${j}`).className = 'node node-wall';
                        },
                        15 * i + 15 * j);
                }
            }
        }
            // const {r, c} = node;
            // window.alert(node[0]);
            //const node = visitedNodes[i];



    }

    test_method(nodes){
      //  const {grid} = this.state;
        const [visitedNodes, parentNodes] = BFS(nodes, start , goal);
        const path = getPath(parentNodes, start, goal);


        //for(const node of visitedNodes){
        for(let i = 0; i < visitedNodes.length; i++){
           // const {r, c} = node;
           // window.alert(node[0]);
            const node = visitedNodes[i];
            setTimeout(() => {
                document.getElementById(`node-${node[0]}-${node[1]}`).className = 'node node-visited';},
            10 * i);

            if (i === visitedNodes.length - 1){
                for(let j = 0; j < path.length; j++){
                    // const {r, c} = node;
                    // window.alert(node[0]);
                    const node = path[j];
                    setTimeout(() => {
                            document.getElementById(`node-${node[0]}-${node[1]}`).className = 'node node-bestPath';},
                        (10 * i) + 35 * j);
                }
            }
        }



    }


    render(){
        const {nodes} = this.state;
       // console.log(nodes)
      // window.alert(nodes[0][0].isFinish);
//this.test_method(nodes);
        return(
            <>
            <div>
            <button className="run_button" onClick={() => this.test_method(nodes)}>
                Run Breadth First Search
            </button>
            </div>
                <div>
                    <button className="run_button" onClick={() => this.maze_method()}>
                        Generate Maze (Prim)
                    </button>
                </div>

            <div className="grid">
                {nodes.map((row, rowIdx) => {
                   // window.alert(row)
                    return(
                        <div className= "row" key={rowIdx}>

                            <style>
                                background-color: #154312;
                            </style>
                            {row.map((node, nodeIdx) => {
                                const {row, col, isStart, isFinish} = node;
                                //window.alert(row)
                                return (
                                    <Node
                                        key={nodeIdx}
                                        row = {row}
                                        col = {col}
                                        isStart = {isStart}
                                        isFinish = {isFinish}
                                        >

                                    </Node>
                                );

                            })}
                        </div>
                    );
                })}
            </div>
            </>
        );



    }


}