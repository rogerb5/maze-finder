import Graph from './graph.js';
import { BFS } from './bfs.js';

const wallButton = document.querySelector("button.wall");
const targetButton = document.querySelector("button.target");
const sourceButton = document.querySelector("button.source");
const clearButton = document.querySelector("button.clear");
const removeButton = document.querySelector("button.remove");
const buttons = document.querySelectorAll("button#action");
const bfsButton = document.querySelector('button.bfs-button');
const aboutButton = document.querySelector('button.about');
const aboutSection = document.querySelector('section.about');
const closeButton = document.querySelector('button.close');
const modalTitle = document.querySelector('h1.modal-title');
const dfsButton = document.querySelector('button.dfs-button');

// use other graphs found in graphs.txt to create different sizes of grid
const defaultGrid = [
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"]
];

wallButton.addEventListener("click", () => {
    graph.setMode("X");
});

targetButton.addEventListener("click", () => {
    graph.setMode("C");
});

sourceButton.addEventListener("click", () => {
    graph.setMode("S");
});

removeButton.addEventListener("click", () => {
    graph.setMode("O");
});

clearButton.addEventListener("click", () => {
    graph.clearGrid();
    graph.enableAllButtons();
});

closeButton.addEventListener("click", () => {
    aboutSection.classList.remove('active');
});

aboutButton.addEventListener("click", () => {
    aboutSection.classList.add('active');
});
bfsButton.addEventListener("click", () => {
    if (graph.hasSource) {
        const result = BFS(graph.grid, graph.sourceRow, graph.sourceCol, graph);
        console.log(result);
    } else {
        throw new Error('No Source Node Found!');
    }
});
dfsButton.addEventListener("click", () => {
    if (graph.hasSource) {
        const result = BFS(graph.grid, graph.sourceRow, graph.sourceCol, graph);
        console.log(result);
    } else {
        throw new Error('No Source Node Found!');
    }
});

function buttonState() {
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((otherBtn) => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove("active");
                }
            });
            btn.classList.add("active");
        });
    });
}

const gridDimension = defaultGrid.length;
const graphElement = document.querySelector("main.graph");
const graph = new Graph(graphElement, gridDimension, defaultGrid);
buttonState();