import Graph from "./graph.js";

const stepsReport = document.querySelector('p.p-data');
// DFS 
export const DFS = async (grid, startRow, startCol, graph) => {
    graph.disableAllButtons(); // Disable buttons before DFS traversal
    const stack = [[startRow, startCol, 0]];
    const visited = new Set([startRow + ',' + startCol]);
    const prev = {};
    while (stack.length > 0) {
        const [row, col, distance] = stack.pop();
        if (grid[row][col] === 'C') {
            graph.cells[row * graph.gridDimension + col].style.backgroundColor = "#ff5c98";
            let currentNode = row + ',' + col;
            while (prev[currentNode] !== undefined) {
                const [prevRow, prevCol] = prev[currentNode];
                graph.cells[prevRow * graph.gridDimension + prevCol].style.backgroundColor = "#ff5c98";
                currentNode = prevRow + ',' + prevCol;
            }
            graph.enableClear();
            stepsReport.innerHTML = `The shortest path is ${distance} steps`;
            return distance;
        }
        const deltas = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (let delta of deltas) {
            const [deltaRow, deltaCol] = delta;
            const neighborRow = row + deltaRow;
            const neighborCol = col + deltaCol;
            const neighborPos = neighborRow + ',' + neighborCol;
            const rowInbounds = 0 <= neighborRow && neighborRow < grid.length;
            if (rowInbounds) {
                const colInbounds = 0 <= neighborCol && neighborCol < grid[0].length;
                if (colInbounds) {
                    if (grid[neighborRow][neighborCol] !== 'W' && !visited.has(neighborPos)) {
                        stack.push([neighborRow, neighborCol, distance + 1]);
                        visited.add(neighborPos);
                        prev[neighborPos] = [row, col];
                    }
                }
            }
        }
        }
    }