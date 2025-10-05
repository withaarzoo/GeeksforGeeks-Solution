class Solution:
    def ratInMaze(self, maze):
        n = len(maze)
        result = []

        # If the starting cell is blocked, no path is possible
        if maze[0][0] == 0:
            return result

        # A visited matrix to keep track of cells in the current path
        visited = [[False for _ in range(n)] for _ in range(n)]

        # Start the backtracking process from the source cell (0, 0)
        self.find_paths(0, 0, maze, n, result, "", visited)

        return result

    # Recursive helper function to find all paths
    def find_paths(self, row, col, maze, n, result, current_path, visited):
        # Base Case: If we have reached the destination cell
        if row == n - 1 and col == n - 1:
            result.append(current_path)
            return

        # Mark the current cell as visited
        visited[row][col] = True

        # --- Explore in lexicographical order: D, L, R, U ---

        # 1. Down
        if row + 1 < n and not visited[row + 1][col] and maze[row + 1][col] == 1:
            self.find_paths(row + 1, col, maze, n, result, current_path + 'D', visited)

        # 2. Left
        if col - 1 >= 0 and not visited[row][col - 1] and maze[row][col - 1] == 1:
            self.find_paths(row, col - 1, maze, n, result, current_path + 'L', visited)

        # 3. Right
        if col + 1 < n and not visited[row][col + 1] and maze[row][col + 1] == 1:
            self.find_paths(row, col + 1, maze, n, result, current_path + 'R', visited)

        # 4. Up
        if row - 1 >= 0 and not visited[row - 1][col] and maze[row - 1][col] == 1:
            self.find_paths(row - 1, col, maze, n, result, current_path + 'U', visited)

        # Unmark the current cell to allow it to be part of other paths (backtracking)
        visited[row][col] = False