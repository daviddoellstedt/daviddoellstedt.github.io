

export function oobCheck(grid, r, c) {
    return r < grid.length && r >= 0 && c < grid[0].length && c >= 0;
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


    // window.alert(temp === [-1, -1])
    while(temp_parent !== 1){
        path.push(temp_parent);
        temp_parent = parent_nodes[temp_parent[0]][temp_parent[1]];
    }
    path.pop();
    return path.reverse();

}

export function isItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        // This if statement depends on the format of your array
        if (array[i][0] === item[0] && array[i][1] === item[1]) {
            return true;   // Found it
        }
    }
    return false;   // Not found
}