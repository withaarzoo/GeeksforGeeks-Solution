# Replace O's with X's — README

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given a 2D grid of characters where each cell is either `'O'` or `'X'`, replace all `'O'`s that are **completely surrounded** by `'X'` (in four directions: up, down, left, right) with `'X'`.
Any `'O'` that is on the border, or connected to a border `'O'` through other `'O'`s, **must remain** `'O'`.

---

## Constraints

* `1 ≤ grid.size() (n) ≤ 100`
* `1 ≤ grid[0].size() (m) ≤ 100`
* Grid entries are characters `'O'` or `'X'`.

---

## Intuition

I thought about which `O` cells I should **not** flip. If an `O` can reach the border (either it's on the border or connected via other `O`s), it cannot be fully surrounded. So I decided:

1. Find all `O` cells that are connected to the border.
2. Temporarily mark them so I know they’re safe.
3. Flip any remaining `O` to `X` (these are surrounded).
4. Restore the temporary marks back to `O`.

This avoids flipping border-connected regions.

---

## Approach

1. Traverse the border cells (top row, bottom row, left column, right column).
2. Each border `'O'` discovered: run a BFS (queue) to visit and mark all connected `'O'` cells with a temporary marker (e.g., `'T'`).
3. After processing borders, iterate every cell:

   * If cell is `'O'` → it was not connected to border → change to `'X'`.
   * If cell is `'T'` → restore to `'O'`.
4. Done. The BFS ensures we mark only safe `'O'`s. We never revisit already marked cells.

---

## Data Structures Used

* Grid (`vector<vector<char>>`, `char[][]`, or nested arrays) — input and modified in-place.
* Queue (`queue`, `Deque`, or array used as queue) — for BFS.
* Small constant-size arrays for four directions.

I avoid using a separate visited matrix by marking in-place with a temporary character `'T'`.

---

## Operations & Behavior Summary

* **Scan borders**: O(m + n) operations to check border cells.
* **BFS**: visits each `'O'` that is border-connected exactly once. Each neighbor check is O(1).
* **Final pass**: O(n*m) to flip and restore cells.
* All operations are in-place except the BFS queue.

---

## Complexity

* **Time Complexity:** `O(n * m)` where `n` is number of rows and `m` is number of columns. Each cell is visited a constant number of times (BFS marks each `'O'` once; final sweep touches each cell once).
* **Space Complexity:** `O(n * m)` worst-case due to BFS queue (if all cells are `'O'` they may be enqueued). In typical cases space is much smaller.

---

## Multi-language Solutions

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    void fill(vector<vector<char>>& grid) {
        if (grid.empty()) return;
        int n = grid.size();
        int m = grid[0].size();
        queue<pair<int,int>> q;

        auto pushIfO = [&](int r, int c) {
            if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] == 'O') {
                grid[r][c] = 'T'; // temporary mark
                q.push({r, c});
            }
        };

        // Push all border 'O's
        for (int i = 0; i < n; ++i) {
            pushIfO(i, 0);
            pushIfO(i, m - 1);
        }
        for (int j = 0; j < m; ++j) {
            pushIfO(0, j);
            pushIfO(n - 1, j);
        }

        // BFS to mark all 'O's connected to borders
        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (int k = 0; k < 4; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 'O') {
                    grid[nr][nc] = 'T';
                    q.push({nr, nc});
                }
            }
        }

        // Flip interior 'O' -> 'X' and restore 'T' -> 'O'
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (grid[i][j] == 'O') grid[i][j] = 'X';
                else if (grid[i][j] == 'T') grid[i][j] = 'O';
            }
        }
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public void fill(char[][] grid) {
        if (grid == null || grid.length == 0) return;
        int n = grid.length;
        int m = grid[0].length;
        Queue<int[]> q = new LinkedList<>();

        // Step 1: push all border 'O's and mark them 'T'
        for (int i = 0; i < n; i++) {
            pushIfO(grid, n, m, q, i, 0);
            pushIfO(grid, n, m, q, i, m - 1);
        }
        for (int j = 0; j < m; j++) {
            pushIfO(grid, n, m, q, 0, j);
            pushIfO(grid, n, m, q, n - 1, j);
        }

        // BFS
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1];
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 'O') {
                    grid[nr][nc] = 'T';
                    q.offer(new int[]{nr, nc});
                }
            }
        }

        // Flip surrounded O -> X and restore T -> O
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 'O') grid[i][j] = 'X';
                else if (grid[i][j] == 'T') grid[i][j] = 'O';
            }
        }
    }

    private void pushIfO(char[][] grid, int n, int m, Queue<int[]> q, int r, int c) {
        if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] == 'O') {
            grid[r][c] = 'T';
            q.offer(new int[]{r, c});
        }
    }
}
```

---

### JavaScript

```javascript
class Solution {
    fill(grid) {
        if (!grid || grid.length === 0) return;
        const n = grid.length, m = grid[0].length;
        const q = [];

        function pushIfO(r, c) {
            if (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] === 'O') {
                grid[r][c] = 'T';
                q.push([r, c]);
            }
        }

        for (let i = 0; i < n; i++) {
            pushIfO(i, 0);
            pushIfO(i, m - 1);
        }
        for (let j = 0; j < m; j++) {
            pushIfO(0, j);
            pushIfO(n - 1, j);
        }

        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        while (q.length) {
            const [r, c] = q.shift();
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 'O') {
                    grid[nr][nc] = 'T';
                    q.push([nr, nc]);
                }
            }
        }

        // Final pass
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < m; c++) {
                if (grid[r][c] === 'O') grid[r][c] = 'X';
                else if (grid[r][c] === 'T') grid[r][c] = 'O';
            }
        }
    }
}
```

---

### Python3

```python
from collections import deque

class Solution:
    def fill(self, grid):
        if not grid:
            return
        n, m = len(grid), len(grid[0])
        q = deque()

        def push_if_o(r, c):
            if 0 <= r < n and 0 <= c < m and grid[r][c] == 'O':
                grid[r][c] = 'T'
                q.append((r, c))

        # push border 'O's
        for i in range(n):
            push_if_o(i, 0)
            push_if_o(i, m - 1)
        for j in range(m):
            push_if_o(0, j)
            push_if_o(n - 1, j)

        dirs = [(-1,0),(1,0),(0,-1),(0,1)]
        while q:
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 'O':
                    grid[nr][nc] = 'T'
                    q.append((nr, nc))

        # flip interior O -> X and restore T -> O
        for r in range(n):
            for c in range(m):
                if grid[r][c] == 'O':
                    grid[r][c] = 'X'
                elif grid[r][c] == 'T':
                    grid[r][c] = 'O'
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I will describe the process in clear steps; each language uses the same algorithm.

1. **Check empty grid**

   * If grid is empty, return immediately.

2. **Identify grid size**

   * `n` = number of rows, `m` = number of columns.

3. **Prepare BFS queue**

   * Use `queue<pair<int,int>>` (C++), `Queue<int[]>` (Java), array acting as queue (JS), `collections.deque` (Python).

4. **Border scan**

   * For every cell on the top row, bottom row, leftmost column, and rightmost column:

     * If it’s `'O'`, mark as `'T'` and enqueue it.
   * This ensures we start BFS from all border-connected regions simultaneously (multi-source BFS).

5. **BFS**

   * While the queue is not empty:

     * Pop a cell `(r, c)`.
     * For each of 4 neighbors `(r-1,c)`, `(r+1,c)`, `(r,c-1)`, `(r,c+1)`:

       * If neighbor is within bounds and is `'O'`, mark it `'T'` and enqueue.
   * Result: all `'O'`s connected to borders are marked `'T'`.

6. **Final sweep**

   * For each cell:

     * If cell is `'O'`, it means it was **not** border-connected → change to `'X'`.
     * If cell is `'T'`, it was border-connected → restore to `'O'`.

7. **Return / finish**

   * Grid is updated in-place.

### Why mark `'T'` instead of using visited[]?

* Marking prevents a separate visited matrix, saving memory and keeping algorithm simple. `'T'` is a temporary marker distinct from `'O'` and `'X'`.

---

## Examples

Input:

```
[
 ['X','X','X','X'],
 ['X','O','X','X'],
 ['X','O','O','X'],
 ['X','O','X','X'],
 ['X','X','O','O']
]
```

Process:

* Border `O`s: bottom-right two `O`s remain safe (connected to border).
* Interior `O`s not connected to border become `X`.

Output:

```
[
 ['X','X','X','X'],
 ['X','X','X','X'],
 ['X','X','X','X'],
 ['X','X','X','X'],
 ['X','X','O','O']
]
```

---

## How to use / Run locally

### C++

1. Create a file `solution.cpp` and paste the C++ class code. Add a `main()` to test or integrate with your driver on GFG.
2. Compile:

   ```
   g++ -std=c++17 solution.cpp -o solution
   ```

3. Run:

   ```
   ./solution
   ```

### Java

1. Save `Solution.java` with the `Solution` class above.
2. Add a `Main` class with `main` to create a `char[][]` and call `new Solution().fill(grid);` and print result.
3. Compile:

   ```
   javac Solution.java
   ```

4. Run:

   ```
   java Main
   ```

### JavaScript (Node.js)

1. Save `solution.js`. Wrap the class usage in a small driver:

   ```javascript
   const grid = [
     ['X','X','X','X'],
     ['X','O','X','X'],
     ['X','O','O','X'],
     ['X','O','X','X'],
     ['X','X','O','O']
   ];
   const sol = new Solution();
   sol.fill(grid);
   console.log(grid);
   ```

2. Run:

   ```
   node solution.js
   ```

### Python3

1. Save `solution.py` and add a test driver:

   ```python
   grid = [['X','X','X','X'],
           ['X','O','X','X'],
           ['X','O','O','X'],
           ['X','O','X','X'],
           ['X','X','O','O']]
   Solution().fill(grid)
   print(grid)
   ```

2. Run:

   ```
   python3 solution.py
   ```

---

## Notes & Optimizations

* I used BFS to avoid recursion depth issues. A DFS recursive solution is shorter but may hit recursion limits on large grids.
* Temporary marker `'T'` is chosen so it doesn’t conflict with `'X'` or `'O'`.
* This approach modifies the grid in-place, so it’s memory-efficient (no visited[][]).
* Worst-case queue size is `O(n*m)`, unavoidable when almost entire grid is `'O'`.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
