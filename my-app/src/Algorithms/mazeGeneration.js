import {getDirections, oobCheck, isItemInArray} from './helperFunctions.js';

const dirs = getDirections(false);

export function getMaze(rows, cols, start, goal){
    //CURRENT PRIM'S ALGORITHM
    const prim_start = [Math.floor(Math.random() * ((rows - 1)/2)) * 2 + 1, Math.floor(Math.random() * ((cols - 1)/2)) * 2 + 1]; //random start (odd numbers only)
    let maze = generateInit(rows, cols, start, goal, prim_start);
    let frontier = getFirstFrontiers(maze, dirs, prim_start);

    while (frontier.length !== 0){
        let choice = Math.floor(Math.random() * frontier.length);
        const [c_r, c_c] = frontier[choice];
        maze[c_r][c_c] = 0;
        frontier.splice(choice, 1);

        const neighbors = [];

        for (const dir of dirs) {

            const n_r = c_r + 2 * dir[0];
            const n_c = c_c + 2 * dir[1];

            if (oobCheck(maze, n_r, n_c)){
                if (maze[n_r][n_c] === 0){
                    neighbors.push([n_r, n_c]);
                }
                else if (!isItemInArray(frontier, [n_r, n_c])){
                    frontier.push([n_r, n_c]);
                }
            }
        }

        if (neighbors.length === 0){continue;}

        choice = Math.floor(Math.random() * neighbors.length);
        const chosen_neighbor = neighbors[choice]
        maze[((chosen_neighbor[0] + c_r)/2)][((chosen_neighbor[1] + c_c)/2)] = 0
    }
    return maze;
}

function generateInit(rows, cols, start, goal, prim_start){
    let grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(1);
        }
        grid.push(currentRow);
    }
    grid[start[0]][start[1]] = 0;
    grid[goal[0]][goal[1]] = 0;
    grid[prim_start[0]][prim_start[1]] = 0;
    return grid
}

function getFirstFrontiers(maze, dirs, start){
    //random start for maze generation (

    let f = []
    for (const dir of dirs) {
        const nr = start[0] + 2 * dir[0]
        const nc = start[1] + 2 * dir[1]
        if (oobCheck(maze, nr, nc) && maze[nr][nc] === 1) {
            f.push([nr, nc])
        }
    }
    return f;
}
