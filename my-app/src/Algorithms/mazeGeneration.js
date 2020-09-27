import {getDirections, oobCheck, isItemInArray, oobCheckPadded, isCoordOdd} from './helperFunctions.js';

const dirs = getDirections(false);

//PRIM'S ALGORITHM
export function getMaze(rows, cols, start, goal){
    const prim_start = getPrimStart(rows, cols);
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
        const [chosen_r, chosen_c] = neighbors[choice]
        maze[((chosen_r + c_r)/2)][((chosen_c + c_c)/2)] = 0
    }

    const [s_r, s_c] = start;
    const [g_r, g_c] = goal;
    maze[s_r][s_c] = 0;
    maze[g_r][g_c] = 0;
    //do a check to see if start or goal is surrounded by black, open up a neighbor square to avoid this
    const start_inds = isSurrounded(maze, start, dirs);
    if (start_inds[0] !== -1){
        let choice = Math.floor(Math.random() * start_inds.length);
        maze[s_r + dirs[start_inds[choice]][0]][s_c + dirs[start_inds[choice]][1]] = 0;
    }

    const goal_inds = isSurrounded(maze, goal, dirs);
    if (goal_inds[0] !== -1){
        let choice = Math.floor(Math.random() * goal_inds.length);
        maze[g_r + dirs[goal_inds[choice]][0]][g_c + dirs[goal_inds[choice]][1]] = 0;
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
    // grid[start[0]][start[1]] = 0;
    // grid[goal[0]][goal[1]] = 0;

    //clear the area around start and goal
    const dirs = getDirections(false);

    for(const dir of dirs){

        // if(isCoordOdd(start)) {
        //     for(let i = 1; i <= 1; i++) {
        //         if (oobCheckPadded(grid, start[0] + i * dir[0], start[1] + i * dir[1])) {
        //             grid[start[0] + i * dir[0]][start[1] + i * dir[1]] = 0;
        //         }
        //     }
        // }
        //
        // if(isCoordOdd(goal)) {
        //     for(let i = 1; i <= 1; i++) {
        //         if (oobCheckPadded(grid, goal[0] + i * dir[0], goal[1] + i * dir[1])) {
        //             grid[goal[0] + i * dir[0]][goal[1] + i * dir[1]] = 0;
        //         }
        //     }
        // }
    }

    grid[prim_start[0]][prim_start[1]] = 0;
    return grid;
}

function getFirstFrontiers(maze, dirs, maze_start){
    //random start for maze generation (

    let f = []
    for (const dir of dirs) {
        const nr = maze_start[0] + 2 * dir[0];
        const nc = maze_start[1] + 2 * dir[1];
        if (oobCheck(maze, nr, nc) && maze[nr][nc] === 1) {
            f.push([nr, nc])
        }
    }

    return f;
}

function getPrimStart(rows, cols){
    return [Math.floor(Math.random() * ((rows - 1)/2)) * 2 + 1, Math.floor(Math.random() * ((cols - 1)/2)) * 2 + 1]; //random start (odd numbers only)
}

function isSurrounded(maze, coord, dirs){

    let inds = [];
    for(let i = 0; i < dirs.length; i++){
        const nr = coord[0] + dirs[i][0];
        const nc = coord[1] + dirs[i][1];

        if (!oobCheck(maze, nr, nc)){
            //do nothing
        }
        else if(maze[nr][nc] === 1){
            inds.push(i);
        }
        else{
            return [-1];
        }
    }
    return inds;
}