import Graph from "./graph.js";

const stepsReport = document.querySelector('p.p-data');

// BFS shortest path algorithm
export const BFS = async (grid, startRow, startCol, graph) => {
    graph.disableAllButtons(); // Disable buttons before BFS traversal
    const queue = [[startRow, startCol, 0]];
    const visited = new Set([startRow + ',' + startCol]);
    const prev = {};
    while (queue.length > 0) {
        const [row, col, distance] = queue.shift();
        if (grid[row][col] === 'C') {
            graph.cells[row * graph.gridDimension + col].style.backgroundColor = "#ff5c98";
            let currentNode = row + ',' + col;
            while (prev[currentNode] !== undefined) {
                const [prevRow, prevCol] = prev[currentNode];
                graph.cells[prevRow * graph.gridDimension + prevCol].style.backgroundColor = "#ff5c98";
                currentNode = prevRow + ',' + prevCol;
            }
            graph.enableClear();
            stepsReport.innerHTML = `The path is ${distance} steps`;
            return distance;
        }
        const deltas = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (let delta of deltas) {
            const [deltaRow, deltaCol] = delta;
            const neighborRow = row + deltaRow;
            const neighborCol = col + deltaCol;
            const neighborPos = neighborRow + ',' + neighborCol;
            const rowInbounds = 0 <= neighborRow && neighborRow < grid.length;
            const colInbounds = 0 <= neighborCol && neighborCol < grid[0].length;
            if (rowInbounds && colInbounds && !visited.has(neighborPos) && grid[neighborRow][neighborCol] !== 'X') {
                visited.add(neighborPos);
                prev[neighborPos] = [row, col];
                queue.push([neighborRow, neighborCol, distance + 1]);
                await new Promise((resolve) => setTimeout(resolve, 100));
                graph.updateCell(neighborRow, neighborCol, distance + 1);
            }
        }
    }
    graph.enableClear();
    stepsReport.innerHTML = `The shortest path is 0 steps`;
    return -1;
};

// Maybe a DFS depth first search now?