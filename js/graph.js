const CELL_SIZE = 8;
const CELL_GAP = 0;
const WALL = "X";
const OPEN_SPACE = "O";
const TARGET = "C";
const SOURCE = "S";

export default class Graph {
    cells;
    gridDimension;
    grid;
    mode;

    constructor(graphElement, gridDimension, grid) {
        this.gridDimension = gridDimension;
        this.grid = grid;
        this.mode = null;
        graphElement.style.setProperty("--grid-size", gridDimension);
        graphElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        graphElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);
        this.cells = this.processGrid(graphElement, gridDimension, this);
        this.updateGrid(grid);
    }

    processGrid(graphElement, gridDimension, graph) {
        const cells = [];
        for (let index = 0; index < gridDimension * gridDimension; index++) {
            const cell = document.createElement("article");
            cell.classList.add("cell");
            cell.addEventListener("click", () => {
                this.setClickState(index, graph);
            });
            cells.push(cell);
            graphElement.append(cell);
        }
        return cells;
    }


    updateCell(row, col, distance) {
        const cellIndex = row * this.gridDimension + col;
        const cell = this.cells[cellIndex];
        cell.innerText = distance;
        cell.style.backgroundColor = "#cdb4db"; // Purple color
    }

    setMode(mode) {
        this.mode = mode;
    }

    updateGrid(grid) {
        this.grid = grid;
        console.log("updated grid", this.grid);
        for (let row = 0; row < this.gridDimension; row++) {
            for (let col = 0; col < this.gridDimension; col++) {
                const cellIndex = row * this.gridDimension + col;
                const cell = this.cells[cellIndex];
                const cellType = grid[row][col];
                cell.style.backgroundColor = this.getColor(cellType);
            }
        }
    }

    addWall(row, col) {
        if (row >= 0 && row < this.gridDimension && col >= 0
            && col < this.gridDimension && this.grid[row][col] !== TARGET && this.grid[row][col] !== SOURCE) {
            if (this.grid[row][col] !== WALL) {
                this.grid[row][col] = WALL;
                this.updateGrid(this.grid);
            }
        }
    }

    getColor(cellType) {
        if (cellType === WALL) {
            return "#333";
        } else if (cellType === OPEN_SPACE) {
            return "#F2E9DC";
        } else if (cellType === TARGET) {
            return "#eb5160";
        } else if (cellType === SOURCE) {
            return "#a3f7b5";
        }
    }

    addSource(row, col) {
        if (!this.hasSource && row >= 0 && row < this.gridDimension
            && col >= 0 && col < this.gridDimension && this.grid[row][col] !== WALL) {
            if (this.grid[row][col] === OPEN_SPACE) {
                this.grid[row][col] = SOURCE;
                this.sourceRow = row;
                this.sourceCol = col;
                this.hasSource = true;
                this.updateGrid(this.grid);
                this.enableButton(this);
            }
        }
    }

    addTarget(row, col) {
        if (!this.hasTarget && row >= 0 && row < this.gridDimension
            && col >= 0 && col < this.gridDimension && this.grid[row][col] !== WALL) {
            if (this.grid[row][col] === OPEN_SPACE) {
                this.grid[row][col] = TARGET;
                this.hasTarget = true;
                this.updateGrid(this.grid);
                this.enableButton(this);
            }
        }
    }

    removeCell(row, col) {
        if (row >= 0 && row < this.gridDimension && col >= 0 && col < this.gridDimension) {
            if (this.grid[row][col] === WALL || this.grid[row][col] === TARGET || this.grid[row][col] === SOURCE) {
                if (this.grid[row][col] === TARGET) {
                    this.hasTarget = false;
                }
                if (this.grid[row][col] === SOURCE) {
                    this.hasSource = false;
                }
                this.grid[row][col] = "O";
                this.updateGrid(this.grid);
                this.enableButton(this);
            }
        }
    }

    clearGrid() {
        this.grid = Array.from({ length: this.gridDimension }, () =>
            Array(this.gridDimension).fill("O")
        );

        this.cells.forEach((cell, index) => {
            setTimeout(() => {
                cell.innerHTML = '';
                if (index % 2 === 0) {
                    cell.classList.add('scaledown')
                } else {
                    cell.classList.add('scaleup')
                }
            }, index * 20);
        });

        const animationDuration = this.cells.length * 20;
        setTimeout(() => {
            this.cells.forEach(link => {
                link.classList.remove('scaledown');
                link.classList.remove('scaleup');
            });
        }, animationDuration);

        this.hasTarget = false;
        this.hasSource = false;
        this.mode = null;
        const stepsReport = document.querySelector('p.p-data');
        stepsReport.innerHTML = `The path is 0 steps`;
        this.updateGrid(this.grid);
        this.enableButton(this);
        this.enableAllButtons()
    }

    setClickState(index, graph) {
        const row = Math.floor(index / graph.gridDimension);
        const col = index % graph.gridDimension;
        if (graph.mode === WALL) {
            graph.addWall(row, col);
        } else if (graph.mode === TARGET) {
            graph.addTarget(row, col);
        } else if (graph.mode === OPEN_SPACE) {
            graph.removeCell(row, col);
        } else if (graph.mode == SOURCE) {
            graph.addSource(row, col);
        }
    }

    enableButton(graph) {
        const targetButton = document.querySelector("button.target");
        const sourceButton = document.querySelector("button.source");
        targetButton.disabled = graph.hasTarget;
        sourceButton.disabled = graph.hasSource;
    }

    disableAllButtons() {
        const buttons = document.querySelectorAll("button#action");
        buttons.forEach(btn => {
            btn.disabled = true;
        });
    };

    enableClear() {
        const clearButton = document.querySelector("button.clear");
        clearButton.disabled = false;
    }

    enableAllButtons() {
        const buttons = document.querySelectorAll("button#action");
        buttons.forEach(btn => {
            btn.disabled = false;
        });
    };
}