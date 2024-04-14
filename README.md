# CodeFest 2024 - EWU 4/13/2024

# Project Title: Maze Path Finder - Team Guac and Roll

# Brief Overview

This project showcases a breadth first search and depth first search on a maze. Ultimately, a path from the start point and end point is rendered visually.

 The graph is represented by an adjacency matrix but limited to (n x n) dimensions instead of (m x n).

Additionally, the user has the ability to build the maze using walls, a start node, end node, and delete node properties. This means each maze can be unique.

# Problem your project aims to solve
Many graph interview problems require B.F.S and D.F.S. intuition. Creating a visualizer might aid in developing familarity with graph traversals. 

# Details how we developed our project
We opted to use JavaScript without a framework. Our style of programming is object oriented. CSS provided the colors used in the traversals.

- The `bfs.js` file contains the breadth first search algorithm.
- The `dfs.js` file contains the depth first search algorithm.
- The `graph.js` file contains the maze building logic. 
- The `ui.js` file contains the user interface logic such as click events and output.
- The  `graphs.txt` file contains different sized grid graphs.

Group Members: Roger Benjume. Evelyn Barragan.