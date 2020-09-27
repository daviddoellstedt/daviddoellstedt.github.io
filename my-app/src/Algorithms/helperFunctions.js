
export function oobCheck(grid, r, c) {
    return r < grid.length && r >= 0 && c < grid[0].length && c >= 0;
}

export function oobCheckPadded(grid, r, c) {
    return r < grid.length - 1 && r > 0 && c < grid[0].length - 1 && c > 0;
}

export function getDirections(diagonal){
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    if(diagonal){
        dirs.push([1, 1]); dirs.push([-1, 1]); dirs.push([1, -1]); dirs.push([-1, -1]);
    }
    return dirs;
}

export function getPath(parent_nodes, start, goal){

    let path = [];
    let temp_parent = parent_nodes[goal[0]][goal[1]];

    while(temp_parent !== 1 && temp_parent !== 0){
        path.push(temp_parent);
        temp_parent = parent_nodes[temp_parent[0]][temp_parent[1]];
    }
    path.pop();
    return path.reverse();

}

export function isItemInArray(array, item) {
    //check if a [1 x 2] coordinate is in list of coordinates
    for (let i = 0; i < array.length; i++) {

        if (array[i][0] === item[0] && array[i][1] === item[1]) {
            return true;
        }
    }
    return false;
}

export function getAllNodes(grid) {
    let open_nodes = [];
    for (let i = 0; i < grid.length; i++){
        let row = [];
        for (let j = 0; j < grid[0].length; j++) {
            if(document.getElementById(`node-${i}-${j}`).isWall) {
                row.push(0);
            }
            else{
                row.push(1);
            }
        }
        open_nodes.push(row);
    }
    return open_nodes;
}

export function isCoordOdd(coord) { return (coord[0] % 2 && coord[1] % 2);}