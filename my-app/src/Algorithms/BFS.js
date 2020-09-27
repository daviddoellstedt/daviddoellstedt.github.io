//BFS
//return all nodes in the order they were visited, along with the previous node that they came from.
import {getDirections, oobCheck} from './helperFunctions.js';


export function BFS(grid, start, goal){
    if(start === goal){return false;}
    //start = [r,c]
    //generate a grid of unexplored nodes. 1 = unexplored (and available), 0 = explored or unavailable.
    let openNodes = getAllNodes(grid);
    //let parentNodes = openNodes;
    let parentNodes = getAllNodes(grid);
    let visited_nodes_inorder = [];
    console.log(visited_nodes_inorder);
    //window.alert("sa");

    //create directionals
    const dirs = getDirections(false);

    let qr = [];
    let qc = [];
    //let qp = [];
    const [s_r, s_c] = start;
    const [g_r, g_c] = goal;
    let curr_r;
    let curr_c;
    //let curr_p;
    let new_r;
    let new_c;
    let found = false;
    openNodes[s_r][s_c] = 0;

    // window.alert(s_r);

    qr.push(s_r);
    qc.push(s_c);
   // qp.push([-1, -1]);


    //window.alert("wha");
    while(qr.length !== 0 && !found) {
       // window.alert(qr.length);
        curr_r = qr[0];
        curr_c = qc[0];
      //  curr_p = qp[0];
        qr.shift();
        qc.shift();
     //   qp.shift();
        if (curr_r !== s_r || curr_c !== s_c){
            visited_nodes_inorder.push([curr_r, curr_c]);
        }

        for (const dir of dirs) {

            new_r = curr_r + dir[0];
            new_c = curr_c + dir[1];

          //  window.alert(dir);


            if(oobCheck(openNodes, new_r, new_c) && openNodes[new_r][new_c] === 1){
                parentNodes[new_r][new_c] = [curr_r, curr_c];

                if(new_r === g_r && new_c === g_c){
                    //we've hit our goal
                  //  visited_nodes_inorder.push([new_r, new_c]);
                    found = true;
                    break;
                }
                openNodes[new_r][new_c] = 0;
                qr.push(new_r);
                qc.push(new_c);

                //qp.push([curr_r, curr_c]);
            }
        }
    }


    return [visited_nodes_inorder, parentNodes];
}


function getAllNodes(grid) {
    let open_nodes = [];
    for (let i = 0; i < grid.length; i++){
        let row = [];
        for (let j = 0; j < grid[0].length; j++) {
            row.push(1);
        }
        open_nodes.push(row);
    }
    return open_nodes;
}