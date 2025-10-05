class Solution {
  ratInMaze(maze) {
    const n = maze.length;
    const result = [];

    // If the starting cell is blocked, no path is possible
    if (maze[0][0] === 0) {
      return result;
    }

    // A visited matrix to keep track of cells in the current path
    const visited = Array(n)
      .fill(null)
      .map(() => Array(n).fill(false));

    // Start the backtracking process from the source cell (0, 0)
    this.findPaths(0, 0, maze, n, result, "", visited);

    return result;
  }

  // Recursive helper function to find all paths
  findPaths(row, col, maze, n, result, currentPath, visited) {
    // Base Case: If we have reached the destination cell
    if (row === n - 1 && col === n - 1) {
      result.push(currentPath);
      return;
    }

    // Mark the current cell as visited
    visited[row][col] = true;

    // --- Explore in lexicographical order: D, L, R, U ---

    // 1. Down
    if (row + 1 < n && !visited[row + 1][col] && maze[row + 1][col] === 1) {
      this.findPaths(row + 1, col, maze, n, result, currentPath + "D", visited);
    }

    // 2. Left
    if (col - 1 >= 0 && !visited[row][col - 1] && maze[row][col - 1] === 1) {
      this.findPaths(row, col - 1, maze, n, result, currentPath + "L", visited);
    }

    // 3. Right
    if (col + 1 < n && !visited[row][col + 1] && maze[row][col + 1] === 1) {
      this.findPaths(row, col + 1, maze, n, result, currentPath + "R", visited);
    }

    // 4. Up
    if (row - 1 >= 0 && !visited[row - 1][col] && maze[row - 1][col] === 1) {
      this.findPaths(row - 1, col, maze, n, result, currentPath + "U", visited);
    }

    // Unmark the current cell to allow it to be part of other paths (backtracking)
    visited[row][col] = false;
  }
}
