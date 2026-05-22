# 1s Surrounded by 0s

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

This DSA grid problem asks us to count all `1s` in a binary matrix that are completely surrounded by `0s`.

The important detail is that movement is allowed only in four directions:

* Up
* Down
* Left
* Right

Diagonal movement is not allowed.

If a `1` is connected to any boundary `1`, then it can move outside the grid. Those cells should not be counted.

The final answer is the number of `1s` that are trapped inside the matrix and cannot escape through any connected path.

This problem is a classic graph traversal problem based on DFS or BFS in a 2D grid.

---

## Constraints

| Constraint    | Value         |
| ------------- | ------------- |
| Rows (`n`)    | `1 ≤ n ≤ 500` |
| Columns (`m`) | `1 ≤ m ≤ 500` |
| Grid Values   | `0` or `1`    |

---

## Intuition

The first thing I noticed was that checking whether every group of `1s` is surrounded or not would become messy.

So instead of finding enclosed regions directly, I thought about removing all regions that can escape.

Any `1` connected to the boundary is unsafe because it can move outside the matrix.

That means:

* Boundary `1s` are invalid
* Any `1` connected to them is also invalid
* Only the remaining `1s` should be counted

This immediately turns the problem into a DFS/BFS traversal problem.

I simply start from boundary `1s`, mark all reachable cells, and count the unvisited ones at the end.

---

## Approach

I used Depth First Search (DFS) to solve this problem efficiently.

Step-by-step strategy:

1. Create a visited matrix to track explored cells.
2. Traverse all boundary cells.
3. Whenever I find a boundary `1`, run DFS from that cell.
4. DFS marks every connected `1` as visited.
5. After processing all boundaries, iterate through the grid again.
6. Count all `1s` that were never visited.

Those unvisited `1s` are completely surrounded by `0s`.

This approach works because every escapable region gets removed first.

---

## Data Structures Used

| Data Structure   | Purpose                            |
| ---------------- | ---------------------------------- |
| 2D Grid          | Stores the binary matrix           |
| Visited Matrix   | Prevents revisiting the same cells |
| Recursion Stack  | Used internally by DFS traversal   |
| Direction Arrays | Helps move in 4 directions cleanly |

---

## Operations & Behavior Summary

The algorithm works in multiple stages:

1. Read the matrix dimensions.
2. Create a visited matrix initialized with `false`.
3. Start checking all boundary rows and columns.
4. If a boundary cell contains `1`, start DFS traversal.
5. DFS keeps moving in four directions and marks connected `1s`.
6. After all DFS calls finish, scan the matrix again.
7. Every unvisited `1` is trapped inside the grid.
8. Return the total count.

This is a standard flood-fill style graph traversal approach commonly used in matrix DFS problems.

---

## Complexity

| Type             | Complexity | Explanation                                       |
| ---------------- | ---------- | ------------------------------------------------- |
| Time Complexity  | `O(n × m)` | Every cell is visited at most once                |
| Space Complexity | `O(n × m)` | Extra visited matrix and recursion stack are used |

Where:

* `n` = number of rows
* `m` = number of columns

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // DFS function to mark all connected 1s
    void dfs(int row, int col,
             vector<vector<int>>& grid,
             vector<vector<int>>& vis,
             int n, int m) {
        
        // Mark current cell as visited
        vis[row][col] = 1;
        
        // Direction arrays for moving
        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};
        
        // Explore all 4 directions
        for(int i = 0; i < 4; i++) {
            int nr = row + dr[i];
            int nc = col + dc[i];
            
            // Check boundaries and valid unvisited 1
            if(nr >= 0 && nr < n &&
               nc >= 0 && nc < m &&
               grid[nr][nc] == 1 &&
               !vis[nr][nc]) {
                
                dfs(nr, nc, grid, vis, n, m);
            }
        }
    }
    
    int cntOnes(vector<vector<int>>& grid) {
        
        int n = grid.size();
        int m = grid[0].size();
        
        // Visited matrix
        vector<vector<int>> vis(n, vector<int>(m, 0));
        
        // Traverse first and last column
        for(int i = 0; i < n; i++) {
            
            // First column
            if(grid[i][0] == 1 && !vis[i][0]) {
                dfs(i, 0, grid, vis, n, m);
            }
            
            // Last column
            if(grid[i][m - 1] == 1 && !vis[i][m - 1]) {
                dfs(i, m - 1, grid, vis, n, m);
            }
        }
        
        // Traverse first and last row
        for(int j = 0; j < m; j++) {
            
            // First row
            if(grid[0][j] == 1 && !vis[0][j]) {
                dfs(0, j, grid, vis, n, m);
            }
            
            // Last row
            if(grid[n - 1][j] == 1 && !vis[n - 1][j]) {
                dfs(n - 1, j, grid, vis, n, m);
            }
        }
        
        int count = 0;
        
        // Count all unvisited 1s
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                
                // These cells are trapped inside
                if(grid[i][j] == 1 && !vis[i][j]) {
                    count++;
                }
            }
        }
        
        return count;
    }
};
```

### Java

```java
class Solution {
    
    // DFS function to mark connected 1s
    void dfs(int row, int col,
             int[][] grid,
             boolean[][] vis,
             int n, int m) {
        
        // Mark current cell visited
        vis[row][col] = true;
        
        // Direction arrays
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};
        
        // Explore all 4 directions
        for(int i = 0; i < 4; i++) {
            
            int nr = row + dr[i];
            int nc = col + dc[i];
            
            // Check valid unvisited 1
            if(nr >= 0 && nr < n &&
               nc >= 0 && nc < m &&
               grid[nr][nc] == 1 &&
               !vis[nr][nc]) {
                
                dfs(nr, nc, grid, vis, n, m);
            }
        }
    }
    
    int cntOnes(int[][] grid) {
        
        int n = grid.length;
        int m = grid[0].length;
        
        // Visited matrix
        boolean[][] vis = new boolean[n][m];
        
        // Check first and last column
        for(int i = 0; i < n; i++) {
            
            if(grid[i][0] == 1 && !vis[i][0]) {
                dfs(i, 0, grid, vis, n, m);
            }
            
            if(grid[i][m - 1] == 1 && !vis[i][m - 1]) {
                dfs(i, m - 1, grid, vis, n, m);
            }
        }
        
        // Check first and last row
        for(int j = 0; j < m; j++) {
            
            if(grid[0][j] == 1 && !vis[0][j]) {
                dfs(0, j, grid, vis, n, m);
            }
            
            if(grid[n - 1][j] == 1 && !vis[n - 1][j]) {
                dfs(n - 1, j, grid, vis, n, m);
            }
        }
        
        int count = 0;
        
        // Count trapped 1s
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                
                if(grid[i][j] == 1 && !vis[i][j]) {
                    count++;
                }
            }
        }
        
        return count;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
class Solution {
    
    // DFS function
    dfs(row, col, grid, vis, n, m) {
        
        // Mark visited
        vis[row][col] = true;
        
        // Direction arrays
        let dr = [-1, 1, 0, 0];
        let dc = [0, 0, -1, 1];
        
        // Explore all directions
        for(let i = 0; i < 4; i++) {
            
            let nr = row + dr[i];
            let nc = col + dc[i];
            
            // Check valid unvisited 1
            if(nr >= 0 && nr < n &&
               nc >= 0 && nc < m &&
               grid[nr][nc] === 1 &&
               !vis[nr][nc]) {
                
                this.dfs(nr, nc, grid, vis, n, m);
            }
        }
    }
    
    cntOnes(grid) {
        
        let n = grid.length;
        let m = grid[0].length;
        
        // Visited matrix
        let vis = Array.from(
            { length: n },
            () => Array(m).fill(false)
        );
        
        // Traverse first and last column
        for(let i = 0; i < n; i++) {
            
            if(grid[i][0] === 1 && !vis[i][0]) {
                this.dfs(i, 0, grid, vis, n, m);
            }
            
            if(grid[i][m - 1] === 1 && !vis[i][m - 1]) {
                this.dfs(i, m - 1, grid, vis, n, m);
            }
        }
        
        // Traverse first and last row
        for(let j = 0; j < m; j++) {
            
            if(grid[0][j] === 1 && !vis[0][j]) {
                this.dfs(0, j, grid, vis, n, m);
            }
            
            if(grid[n - 1][j] === 1 && !vis[n - 1][j]) {
                this.dfs(n - 1, j, grid, vis, n, m);
            }
        }
        
        let count = 0;
        
        // Count remaining 1s
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                
                if(grid[i][j] === 1 && !vis[i][j]) {
                    count++;
                }
            }
        }
        
        return count;
    }
}
```

### Python3

```python
class Solution:
    
    # DFS function to mark connected 1s
    def dfs(self, row, col, grid, vis, n, m):
        
        # Mark current cell visited
        vis[row][col] = True
        
        # Direction arrays
        dr = [-1, 1, 0, 0]
        dc = [0, 0, -1, 1]
        
        # Explore all 4 directions
        for i in range(4):
            
            nr = row + dr[i]
            nc = col + dc[i]
            
            # Check boundaries and valid unvisited 1
            if (0 <= nr < n and
                0 <= nc < m and
                grid[nr][nc] == 1 and
                not vis[nr][nc]):
                
                self.dfs(nr, nc, grid, vis, n, m)
    
    def cntOnes(self, grid):
        
        n = len(grid)
        m = len(grid[0])
        
        # Visited matrix
        vis = [[False for _ in range(m)] for _ in range(n)]
        
        # Traverse first and last column
        for i in range(n):
            
            if grid[i][0] == 1 and not vis[i][0]:
                self.dfs(i, 0, grid, vis, n, m)
            
            if grid[i][m - 1] == 1 and not vis[i][m - 1]:
                self.dfs(i, m - 1, grid, vis, n, m)
        
        # Traverse first and last row
        for j in range(m):
            
            if grid[0][j] == 1 and not vis[0][j]:
                self.dfs(0, j, grid, vis, n, m)
            
            if grid[n - 1][j] == 1 and not vis[n - 1][j]:
                self.dfs(n - 1, j, grid, vis, n, m)
        
        count = 0
        
        # Count all trapped 1s
        for i in range(n):
            for j in range(m):
                
                if grid[i][j] == 1 and not vis[i][j]:
                    count += 1
        
        return count
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains almost identical in all four languages.

First, a DFS function is created.

The purpose of this function is simple:

Whenever a boundary `1` is found, DFS explores every connected `1` so those cells can be marked as escapable.

The traversal moves only in four directions because diagonal movement is not allowed in the problem statement.

During DFS:

* The current cell is marked as visited
* Neighboring cells are checked
* Only valid unvisited `1s` are explored further

Boundary checking is extremely important here.

Without proper boundary checks, the program would try accessing invalid indexes and crash.

After writing DFS, the algorithm starts scanning all boundary cells:

* First row
* Last row
* First column
* Last column

If any boundary cell contains `1`, DFS starts from there.

This step removes all connected regions that can escape outside the matrix.

Once boundary traversal finishes, the grid is scanned one final time.

Now there are only two possibilities:

* Visited `1` → connected to boundary → not counted
* Unvisited `1` → trapped inside → counted

That final count becomes the answer.

This approach is efficient because it avoids repeatedly checking whether a region is enclosed.

Instead of proving which regions are trapped, the algorithm simply removes all regions that are not trapped.

That makes the implementation cleaner and faster.

---

## Examples

### Example 1

Input:

```text
grid = [
 [0,0,0,0],
 [1,0,1,0],
 [0,1,1,0],
 [0,0,0,0]
]
```

Output:

```text
3
```

Explanation:

The connected group:

```text
1
1 1
```

is fully enclosed by `0s`.

The left-side `1` touches the boundary indirectly, so it is not counted.

---

### Example 2

Input:

```text
grid = [
 [1,1,0,0,0,1],
 [0,1,1,0,1,0],
 [0,0,0,1,1,0],
 [0,0,0,1,1,0],
 [0,1,0,1,0,0],
 [1,1,0,0,0,1]
]
```

Output:

```text
6
```

Explanation:

The middle connected component is fully trapped inside the matrix.

All boundary-connected regions are ignored.

---

### Example 3

Input:

```text
grid = [
 [1,1,1],
 [1,1,1],
 [1,1,1]
]
```

Output:

```text
0
```

Explanation:

Every `1` is connected to the boundary, so all cells can escape outside the grid.

---

## How to Use / Run Locally

### Run C++ Solution

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Run Java Solution

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### Run JavaScript Solution

Run using Node.js:

```bash
node solution.js
```

---

### Run Python3 Solution

Run:

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

* DFS and BFS both work perfectly for this problem.
* BFS may avoid recursion depth issues in some languages.
* The solution is already optimal because every cell is processed only once.
* A separate visited matrix keeps the logic clean and prevents revisiting cells.
* Another optimization is modifying the original grid directly instead of using extra visited space.
* Edge cases to test:

  * Single row grid
  * Single column grid
  * Grid with all `0s`
  * Grid with all `1s`
  * Multiple disconnected components

This problem is a good example of matrix DFS, graph traversal, flood fill, and enclave detection in binary grids.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
