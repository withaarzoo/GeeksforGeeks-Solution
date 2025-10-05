import java.util.ArrayList;

class Solution {
    public ArrayList<String> ratInMaze(int[][] maze) {
        int n = maze.length;
        ArrayList<String> result = new ArrayList<>();

        // If the starting cell is blocked, no path is possible
        if (maze[0][0] == 0) {
            return result;
        }

        // A visited matrix to keep track of cells in the current path
        boolean[][] visited = new boolean[n][n];

        // Start the backtracking process from the source cell (0, 0)
        findPaths(0, 0, maze, n, result, new StringBuilder(), visited);

        return result;
    }

    // Recursive helper function to find all paths
    private void findPaths(int row, int col, int[][] maze, int n, ArrayList<String> result, StringBuilder currentPath, boolean[][] visited) {
        // Base Case: If we have reached the destination cell
        if (row == n - 1 && col == n - 1) {
            result.add(currentPath.toString());
            return;
        }

        // Mark the current cell as visited
        visited[row][col] = true;

        // --- Explore in lexicographical order: D, L, R, U ---

        // 1. Down
        if (row + 1 < n && !visited[row + 1][col] && maze[row + 1][col] == 1) {
            currentPath.append('D');
            findPaths(row + 1, col, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1); // Backtrack
        }

        // 2. Left
        if (col - 1 >= 0 && !visited[row][col - 1] && maze[row][col - 1] == 1) {
            currentPath.append('L');
            findPaths(row, col - 1, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1); // Backtrack
        }

        // 3. Right
        if (col + 1 < n && !visited[row][col + 1] && maze[row][col + 1] == 1) {
            currentPath.append('R');
            findPaths(row, col + 1, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1); // Backtrack
        }

        // 4. Up
        if (row - 1 >= 0 && !visited[row - 1][col] && maze[row - 1][col] == 1) {
            currentPath.append('U');
            findPaths(row - 1, col, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1); // Backtrack
        }

        // Unmark the current cell to allow it to be part of other paths
        visited[row][col] = false;
    }
}