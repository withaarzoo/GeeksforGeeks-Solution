class Solution {
 public:
  // Recursive helper function to find all paths
  void findPaths(int row, int col, vector<vector<int>>& maze, int n,
                 vector<string>& result, string& currentPath,
                 vector<vector<bool>>& visited) {
    // Base Case: If we have reached the destination cell
    if (row == n - 1 && col == n - 1) {
      result.push_back(currentPath);
      return;
    }

    // Mark the current cell as visited
    visited[row][col] = true;

    // --- Explore in lexicographical order: D, L, R, U ---

    // 1. Down
    if (row + 1 < n && !visited[row + 1][col] && maze[row + 1][col] == 1) {
      currentPath.push_back('D');
      findPaths(row + 1, col, maze, n, result, currentPath, visited);
      currentPath.pop_back(); // Backtrack
    }

    // 2. Left
    if (col - 1 >= 0 && !visited[row][col - 1] && maze[row][col - 1] == 1) {
      currentPath.push_back('L');
      findPaths(row, col - 1, maze, n, result, currentPath, visited);
      currentPath.pop_back(); // Backtrack
    }

    // 3. Right
    if (col + 1 < n && !visited[row][col + 1] && maze[row][col + 1] == 1) {
      currentPath.push_back('R');
      findPaths(row, col + 1, maze, n, result, currentPath, visited);
      currentPath.pop_back(); // Backtrack
    }

    // 4. Up
    if (row - 1 >= 0 && !visited[row - 1][col] && maze[row - 1][col] == 1) {
      currentPath.push_back('U');
      findPaths(row - 1, col, maze, n, result, currentPath, visited);
      currentPath.pop_back(); // Backtrack
    }

    // Unmark the current cell to allow it to be part of other paths
    visited[row][col] = false;
  }

  vector<string> ratInMaze(vector<vector<int>>& maze) {
    int n = maze.size();
    vector<string> result;
    string currentPath = "";

    // If the starting cell is blocked, no path is possible
    if (maze[0][0] == 0) {
      return result;
    }

    // A visited matrix to keep track of cells in the current path
    vector<vector<bool>> visited(n, vector<bool>(n, false));

    // Start the backtracking process from the source cell (0, 0)
    findPaths(0, 0, maze, n, result, currentPath, visited);

    return result;
  }
};