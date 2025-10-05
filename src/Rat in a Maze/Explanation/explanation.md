# Rat in a Maze

This repository contains the solution to the classic "Rat in a Maze" problem, implemented in C++, Java, JavaScript, and Python3. The solution uses a backtracking algorithm to find all possible paths from a starting cell to an ending cell in a grid.

## Table of Contents

* [Problem Summary](https://www.google.com/search?q=%23problem-summary)
* [Constraints](https://www.google.com/search?q=%23constraints)
* [Intuition](https://www.google.com/search?q=%23intuition)
* [Approach](https://www.google.com/search?q=%23approach)
* [Data Structures Used](https://www.google.com/search?q=%23data-structures-used)
* [Operations & Behavior Summary](https://www.google.com/search?q=%23operations--behavior-summary)
* [Complexity](https://www.google.com/search?q=%23complexity)
* [Multi-language Solutions](https://www.google.com/search?q=%23multi-language-solutions)
  * [C++](https://www.google.com/search?q=%23c)
  * [Java](https://www.google.com/search?q=%23java)
  * [JavaScript](https://www.google.com/search?q=%23javascript)
  * [Python3](https://www.google.com/search?q=%23python3)
* [Step-by-step Detailed Explanation](https://www.google.com/search?q=%23step-by-step-detailed-explanation)
* [Examples](https://www.google.com/search?q=%23examples)
* [How to Use / Run Locally](https://www.google.com/search?q=%23how-to-use--run-locally)
* [Notes & Optimizations](https://www.google.com/search?q=%23notes--optimizations)
* [Author](https://www.google.com/search?q=%23author)

-----

## Problem Summary

Given an `n x n` square matrix `maze`, a rat is placed at the starting position `(0, 0)`. The goal is to find all possible paths the rat can take to reach the destination at `(n-1, n-1)`.

* The maze contains `0`s and `1`s. `0` represents a blocked cell, and `1` represents an open cell the rat can travel through.
* The rat can move in four directions: **U**p, **D**own, **L**eft, and **R**ight.
* The rat cannot revisit any cell within the same path.
* The final list of paths must be returned in **lexicographically sorted** order.

-----

## Constraints

* `2 <= n <= 5`
* `0 <= maze[i][j] <= 1`

-----

## Intuition

The problem of finding every possible path in a grid is a natural fit for a **backtracking** algorithm. I thought of it as exploring a maze myself. I'd start at the beginning and try one direction. If that path leads to a dead end (a wall or a place I've already been), I would have to "backtrack" to the last intersection and try a different direction.

This translates to a recursive approach. The recursive function explores a path, and if it hits the destination, the path is saved. If it hits a wall or an invalid cell, it returns, effectively "backtracking" to the previous state.

To handle the lexicographical ordering requirement, a simple and efficient trick is to explore the possible moves in their alphabetical order at every step: **D**own, **L**eft, **R**ight, **U**p. This ensures that the paths are discovered and stored in the correct sorted order, eliminating the need for a final sorting step.

-----

## Approach

1. **Initial Check:** Verify if the starting cell `(0, 0)` is open. If it's blocked (`0`), no solution is possible, so we return an empty list.
2. **Initialization:** Create a `result` list to store the path strings and a `visited` 2D array of the same size as the maze to keep track of cells visited in the current path.
3. **Recursive Backtracking:**
      * Define a recursive helper function `findPaths(row, col, currentPath, ...)` that explores the maze.
      * **Base Case:** If the current `(row, col)` is the destination `(n-1, n-1)`, add the `currentPath` to the `result` list and return.
      * **Recursive Step:**
        a. Mark the current cell `(row, col)` as visited.
        b. Try to move in each of the four directions in lexicographical order: Down, Left, Right, Up.
        c. For each valid move (within bounds, not blocked, and not visited), append the corresponding character to `currentPath` and make a recursive call for the new cell.
        d. After the recursive call returns, **backtrack** by removing the character just added.
      * **Backtrack:** After exploring all directions from `(row, col)`, unmark the cell as visited. This is crucial as it allows the cell to be part of other potential paths.
4. **Start the Process:** Initiate the algorithm by calling the recursive function from the starting cell `(0, 0)`.
5. **Return Result:** Return the populated `result` list.

-----

## Data Structures Used

* **2D Array/Vector (`maze`)**: To represent the input grid.
* **2D Boolean Array (`visited`)**: To keep track of visited cells for the current recursive path, preventing cycles.
* **List of Strings (`result`)**: To accumulate all valid paths found.
* **String / StringBuilder (`currentPath`)**: To construct the path string as we traverse the maze recursively.

-----

## Operations & Behavior Summary

The algorithm performs a **Depth-First Search (DFS)** on the grid. It starts at `(0,0)` and explores as far as possible down one path. When it can no longer move forward, it backtracks to the previous cell and explores an alternative direction. By marking and unmarking cells in a `visited` grid, it ensures that each path is simple (contains no repeated cells). The exploration order `(D, L, R, U)` guarantees the output is lexicographically sorted.

-----

## Complexity

* **Time Complexity:** $O(4^{n^2})$
  * In the worst case, we explore every possible path. From each of the $n^2$ cells, there are at most 4 choices. This leads to an exponential time complexity.
* **Space Complexity:** $O(n^2)$
  * This is due to the `visited` matrix which requires $O(n^2)$ space, and the recursion call stack, which can go as deep as $O(n^2)$ in the worst case.

-----

## Multi-language Solutions

### C++

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

class Solution {
 public:
  void findPaths(int row, int col, std::vector<std::vector<int>>& maze, int n,
                 std::vector<std::string>& result, std::string& currentPath,
                 std::vector<std::vector<bool>>& visited) {
    if (row == n - 1 && col == n - 1) {
      result.push_back(currentPath);
      return;
    }

    visited[row][col] = true;

    // D, L, R, U
    if (row + 1 < n && !visited[row + 1][col] && maze[row + 1][col] == 1) {
      currentPath.push_back('D');
      findPaths(row + 1, col, maze, n, result, currentPath, visited);
      currentPath.pop_back();
    }
    if (col - 1 >= 0 && !visited[row][col - 1] && maze[row][col - 1] == 1) {
      currentPath.push_back('L');
      findPaths(row, col - 1, maze, n, result, currentPath, visited);
      currentPath.pop_back();
    }
    if (col + 1 < n && !visited[row][col + 1] && maze[row][col + 1] == 1) {
      currentPath.push_back('R');
      findPaths(row, col + 1, maze, n, result, currentPath, visited);
      currentPath.pop_back();
    }
    if (row - 1 >= 0 && !visited[row - 1][col] && maze[row - 1][col] == 1) {
      currentPath.push_back('U');
      findPaths(row - 1, col, maze, n, result, currentPath, visited);
      currentPath.pop_back();
    }
    visited[row][col] = false;
  }

  std::vector<std::string> ratInMaze(std::vector<std::vector<int>>& maze) {
    int n = maze.size();
    std::vector<std::string> result;
    std::string currentPath = "";
    if (maze[0][0] == 0) return result;
    
    std::vector<std::vector<bool>> visited(n, std::vector<bool>(n, false));
    findPaths(0, 0, maze, n, result, currentPath, visited);
    return result;
  }
};
```

### Java

```java
import java.util.ArrayList;

class Solution {
    public ArrayList<String> ratInMaze(int[][] maze) {
        int n = maze.length;
        ArrayList<String> result = new ArrayList<>();
        if (maze[0][0] == 0) return result;
        
        boolean[][] visited = new boolean[n][n];
        findPaths(0, 0, maze, n, result, new StringBuilder(), visited);
        return result;
    }

    private void findPaths(int row, int col, int[][] maze, int n, ArrayList<String> result, StringBuilder currentPath, boolean[][] visited) {
        if (row == n - 1 && col == n - 1) {
            result.add(currentPath.toString());
            return;
        }

        visited[row][col] = true;
        
        // D, L, R, U
        if (row + 1 < n && !visited[row + 1][col] && maze[row + 1][col] == 1) {
            currentPath.append('D');
            findPaths(row + 1, col, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1);
        }
        if (col - 1 >= 0 && !visited[row][col - 1] && maze[row][col - 1] == 1) {
            currentPath.append('L');
            findPaths(row, col - 1, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1);
        }
        if (col + 1 < n && !visited[row][col + 1] && maze[row][col + 1] == 1) {
            currentPath.append('R');
            findPaths(row, col + 1, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1);
        }
        if (row - 1 >= 0 && !visited[row - 1][col] && maze[row - 1][col] == 1) {
            currentPath.append('U');
            findPaths(row - 1, col, maze, n, result, currentPath, visited);
            currentPath.deleteCharAt(currentPath.length() - 1);
        }
        visited[row][col] = false;
    }
}
```

### JavaScript

```javascript
class Solution {
    ratInMaze(maze) {
        const n = maze.length;
        const result = [];
        if (maze[0][0] === 0) return result;

        const visited = Array(n).fill(null).map(() => Array(n).fill(false));
        this.findPaths(0, 0, maze, n, result, '', visited);
        return result;
    }

    findPaths(row, col, maze, n, result, currentPath, visited) {
        if (row === n - 1 && col === n - 1) {
            result.push(currentPath);
            return;
        }

        visited[row][col] = true;

        // D, L, R, U
        if (row + 1 < n && !visited[row + 1][col] && maze[row + 1][col] === 1) {
            this.findPaths(row + 1, col, maze, n, result, currentPath + 'D', visited);
        }
        if (col - 1 >= 0 && !visited[row][col - 1] && maze[row][col - 1] === 1) {
            this.findPaths(row, col - 1, maze, n, result, currentPath + 'L', visited);
        }
        if (col + 1 < n && !visited[row][col + 1] && maze[row][col + 1] === 1) {
            this.findPaths(row, col + 1, maze, n, result, currentPath + 'R', visited);
        }
        if (row - 1 >= 0 && !visited[row - 1][col] && maze[row - 1][col] === 1) {
            this.findPaths(row - 1, col, maze, n, result, currentPath + 'U', visited);
        }

        visited[row][col] = false;
    }
}
```

### Python3

```python
class Solution:
    def ratInMaze(self, maze):
        n = len(maze)
        result = []
        if maze[0][0] == 0:
            return result

        visited = [[False for _ in range(n)] for _ in range(n)]
        self.find_paths(0, 0, maze, n, result, "", visited)
        return result

    def find_paths(self, row, col, maze, n, result, current_path, visited):
        if row == n - 1 and col == n - 1:
            result.append(current_path)
            return

        visited[row][col] = True

        # D, L, R, U
        if row + 1 < n and not visited[row + 1][col] and maze[row + 1][col] == 1:
            self.find_paths(row + 1, col, maze, n, result, current_path + 'D', visited)
        if col - 1 >= 0 and not visited[row][col - 1] and maze[row][col - 1] == 1:
            self.find_paths(row, col - 1, maze, n, result, current_path + 'L', visited)
        if col + 1 < n and not visited[row][col + 1] and maze[row][col + 1] == 1:
            self.find_paths(row, col + 1, maze, n, result, current_path + 'R', visited)
        if row - 1 >= 0 and not visited[row - 1][col] and maze[row - 1][col] == 1:
            self.find_paths(row - 1, col, maze, n, result, current_path + 'U', visited)

        visited[row][col] = False
```

-----

## Step-by-step Detailed Explanation

The core logic is encapsulated in the recursive `findPaths` (or `find_paths`) helper function, which works as follows across all languages:

1. **Base Case**: The function first checks if the current `(row, col)` is the destination. If `row == n-1` and `col == n-1`, we've found a path\! We add the `currentPath` string to our `result` and return to stop this branch of exploration.
2. **Mark Current Cell**: We set `visited[row][col] = true`. This acts as a marker to ensure we don't loop back to this cell within the same path exploration.
3. **Explore Neighbors**: The function then checks all four neighbors in a fixed, lexicographical order (Down, Left, Right, Up). For each neighbor, it verifies three conditions:
      * Is it within the maze boundaries? (e.g., for Down, `row + 1 < n`)
      * Has it been visited already in this path? (e.g., `!visited[row + 1][col]`)
      * Is it an open cell? (e.g., `maze[row + 1][col] == 1`)
4. **Recursive Call**: If a neighbor is a valid cell to move to, we append the corresponding direction character ('D', 'L', 'R', or 'U') to our `currentPath` and make a recursive call to `findPaths` with the neighbor's coordinates.
5. **Backtrack**: This is the most critical step. After a recursive call returns (meaning it has fully explored that path), we must undo our move.
      * In C++ and Java, we explicitly pop the last character from the string builder (`currentPath.pop_back()` or `currentPath.deleteCharAt(...)`).
      * In Python and JavaScript, since strings are immutable and we pass `currentPath + 'D'`, the backtracking of the path string happens automatically when the function returns.
      * Crucially, after trying all four directions from `(row, col)`, we set `visited[row][col] = false`. This "unmarks" the cell, making it available for future paths that might need to pass through it.

-----

## Examples

**Example 1:**

* **Input:** `maze[][] = [[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]]`
* **Output:** `["DDRDRR", "DRDDRR"]`

**Example 2:**

* **Input:** `maze[][] = [[1, 1], [1, 0]]`
* **Output:** `[]` (The destination is blocked).

-----

## How to Use / Run Locally

To run these solutions, you can copy the code into a file and execute it. You'll need to create a `main` function or equivalent entry point to instantiate the `Solution` class and call the `ratInMaze` method with a sample maze.

**C++:**

```sh
g++ -std=c++17 your_file.cpp -o solution
./solution
```

**Java:**

```sh
javac Solution.java
java MainClass # (Where MainClass contains your main method)
```

**JavaScript:**

```sh
node your_file.js
```

**Python3:**

```sh
python3 your_file.py
```

-----

## Notes & Optimizations

* **Lexicographical Ordering**: The main optimization is exploring directions in the order **D, L, R, U**. This generates paths in sorted order naturally, avoiding a potentially costly sort of the final `result` list.
* **Memory Efficiency**: In languages like C++ and Java, modifying a single `currentPath` object (string or StringBuilder) by appending and removing characters is more memory-efficient than creating new string objects at each recursive call (e.g., `currentPath + 'D'`).

-----

## Author

* **Social:** [withaarzoo](https://bento.me/withaarzoo)
