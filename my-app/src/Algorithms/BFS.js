import {getDirections, oobCheck, getAllNodes, isItemInArray} from './helperFunctions.js';

//BFS: return all nodes in the order they were visited, along with the previous node that they came from.
export function BFS(grid, start, goal){
    if(isItemInArray([start], goal)){return false;}
    const [s_r, s_c] = start;
    const [g_r, g_c] = goal;

    //generate a grid of unexplored nodes. 1 = unexplored (and available), 0 = explored or unavailable.
    let openNodes = getAllNodes(grid);
    let parentNodes = getAllNodes(grid);
    let visited_nodes_inorder = [];
    const dirs = getDirections(false);

    let found = false;
    openNodes[s_r][s_c] = 0;
    let q = [];
    q.push([s_r, s_c]);

    while(q.length !== 0 && !found) {
        const curr = q[0];
        q.shift();
        if (curr[0] !== s_r || curr[1] !== s_c){
            visited_nodes_inorder.push(curr);
        }

        for (const dir of dirs) {

            const n_r = curr[0] + dir[0];
            const n_c = curr[1] + dir[1];

            if(oobCheck(openNodes, n_r, n_c) && openNodes[n_r][n_c] === 1){
                parentNodes[n_r][n_c] = curr;

                if(n_r === g_r && n_c === g_c){
                    //we've hit our goal
                    found = true;
                    break;
                }
                openNodes[n_r][n_c] = 0;
                q.push([n_r, n_c]);
            }
        }
    }
    return [visited_nodes_inorder, parentNodes];
}
