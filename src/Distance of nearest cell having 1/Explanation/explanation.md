# Distance of nearest cell having 1

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

Given a binary `grid[][]` where each cell contains either `0` or `1`, find for every cell the **minimum Manhattan distance** to the nearest cell having value `1`. The Manhattan distance between `(i1, j1)` and `(i2, j2)` is `|i1 - i2| + |j1 - j2|`. You must return a matrix of the same size where each cell contains that minimum distance. It's guaranteed there is at least one `1` in the grid.

---

## Constraints

* `1 ≤ grid.size() ≤ 200` (rows)
* `1 ≤ grid[0].size() ≤ 200` (columns)
* Each `grid[i][j]` is either `0` or `1`.

---

## Intuition

I thought about finding the nearest `1` for each `0`. Running a BFS from every `0` independently would repeat a lot of work. So I reversed the idea: start BFS from **all `1` cells at once** (multi-source BFS). As BFS expands level-by-level from all `1`s, the first time a `0` cell is reached gives its shortest distance to any `1`. This way each cell is visited once and distances are computed in optimal time.

---

## Approach

1. Create a `dist` matrix same size as `grid`. Initialize distances for `1` cells to `0` and others to `-1` (unknown).
2. Push all coordinates of cells that contain `1` into a queue (these are the BFS sources).
3. Perform BFS: pop a cell, check its 4 neighbors (up, down, left, right). If neighbor is unvisited (`dist == -1`), set `dist[neighbor] = dist[current] + 1` and push neighbor.
4. Continue until the queue is empty. `dist` now holds minimal Manhattan distances to nearest `1`.

This is a **multi-source BFS** pattern on a grid with uniform edge weights (1).

---

## Data Structures Used

* 2D Array / Vector for `dist`.
* Queue (FIFO) for BFS.
* Optional visited boolean grid (or reuse `dist == -1` to indicate unvisited).

---

## Operations & Behavior Summary

* Initialization: O(m * n) to prepare `dist` and enqueue all `1`s.
* BFS: each cell is enqueued/processed at most once; each cell checks up to 4 neighbors.
* Final `dist` contains shortest Manhattan distances to a nearest `1`.

---

## Complexity

* **Time Complexity:** `O(m * n)` — where `m` = rows and `n` = columns. Each cell is visited once and we consider at most 4 neighbors for each visit.
* **Space Complexity:** `O(m * n)` — for the `dist` array and worst-case BFS queue size.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<vector<int>> nearest(vector<vector<int>>& grid) {
        int m = grid.size();
        if (m == 0) return {};
        int n = grid[0].size();

        vector<vector<int>> dist(m, vector<int>(n, -1));
        queue<pair<int,int>> q;

        // enqueue all 1-cells with distance 0
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] == 1) {
                    dist[i][j] = 0;
                    q.push({i, j});
                }
            }
        }

        // 4-directional moves
        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};

        // multi-source BFS
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (int k = 0; k < 4; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }

        return dist;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<ArrayList<Integer>> nearest(int[][] grid) {
        int m = grid.length;
        if (m == 0) return new ArrayList<>();
        int n = grid[0].length;

        int[][] dist = new int[m][n];
        boolean[][] vis = new boolean[m][n];
        for (int i = 0; i < m; i++) Arrays.fill(dist[i], -1);

        Queue<int[]> q = new LinkedList<>();

        // initialize queue with all 1's
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    dist[i][j] = 0;
                    vis[i][j] = true;
                    q.offer(new int[]{i, j});
                }
            }
        }

        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1];
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    dist[nr][nc] = dist[r][c] + 1;
                    q.offer(new int[]{nr, nc});
                }
            }
        }

        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            ArrayList<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; j++) row.add(dist[i][j]);
            result.add(row);
        }
        return result;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[][]} grid
 * @returns {number[][]}
 */
class Solution {
    nearest(grid) {
        const m = grid.length;
        if (m === 0) return [];
        const n = grid[0].length;
        const dist = Array.from({length: m}, () => Array(n).fill(-1));

        const q = [];
        let head = 0;

        // enqueue all 1-cells
        for (let i = 0; i < m; ++i) {
            for (let j = 0; j < n; ++j) {
                if (grid[i][j] === 1) {
                    dist[i][j] = 0;
                    q.push([i, j]);
                }
            }
        }

        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

        while (head < q.length) {
            const [r, c] = q[head++];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] === -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push([nr, nc]);
                }
            }
        }

        return dist;
    }
}
```

---

### Python3

```python
from collections import deque

class Solution:
    def nearest(self, grid):
        m = len(grid)
        if m == 0:
            return []
        n = len(grid[0])

        dist = [[-1] * n for _ in range(m)]
        q = deque()

        # initialize queue with all 1's
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    dist[i][j] = 0
                    q.append((i, j))

        dirs = [(-1,0), (1,0), (0,-1), (0,1)]

        while q:
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr, nc))

        return dist
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain key blocks that are common across implementations. The code is essentially the same algorithm implemented in different languages.

1. **Initialize `dist` and queue of sources**

   * I create an output matrix `dist` with the same dimensions as `grid`.
   * For each cell:

     * If `grid[i][j] == 1`, set `dist[i][j] = 0` and push `(i, j)` into the BFS queue.
     * If `grid[i][j] == 0`, set `dist[i][j] = -1` (means the cell is not visited yet).

   Reason: All `1` cells are distance 0 to themselves and will be the starting points for BFS.

2. **Define neighbor moves**

   * Use 4-directional move vectors: up, down, left, right.
   * These represent one-step Manhattan moves.

3. **Multi-source BFS loop**

   * While the queue is not empty:

     * Pop current cell `(r, c)`.
     * For each neighbor `(nr, nc)`:

       * If neighbor is in bounds and not visited (`dist[nr][nc] == -1`):

         * Set `dist[nr][nc] = dist[r][c] + 1`.
         * Push `(nr, nc)` into queue.
   * Because BFS expands in layers, the first time we set `dist[nr][nc]` is the shortest path from the nearest `1`.

4. **Return `dist`**

   * Once BFS completes, `dist` contains the desired minimum distances for all cells.

---

## Examples

Input:

```
grid = [
 [0, 1, 1, 0],
 [1, 1, 0, 0],
 [0, 0, 1, 1]
]
```

Output:

```
[
 [1, 0, 0, 1],
 [0, 0, 1, 1],
 [1, 1, 0, 0]
]
```

Input:

```
grid = [
 [1, 0, 1],
 [1, 1, 0],
 [1, 0, 0]
]
```

Output:

```
[
 [0, 1, 0],
 [0, 0, 1],
 [0, 1, 2]
]
```

---

## How to use / Run locally

### C++

1. Put the `nearest` function in a driver `main()` where you build `grid` and call it.
2. Compile:

```bash
g++ -std=c++17 -O2 solution.cpp -o solution
./solution
```

### Java

1. Place `Solution` class in `Solution.java`, and add a `main` method to instantiate `Solution` and test `nearest`.
2. Compile & run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Save the class and driver/test code in `solution.js`.
2. Run:

```bash
node solution.js
```

### Python3

1. Save code in `solution.py`, add a test harness to call `Solution().nearest(grid)`.
2. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* Using `dist == -1` as "not visited" avoids an extra `visited` array (saves memory).
* The BFS queue can hold up to `O(m*n)` items in worst case. This is expected and accounted in space complexity.
* This algorithm is optimal for this problem: BFS with multiple sources gives the shortest distances in `O(m*n)`.
* For very large grids where memory is constrained, consider streaming or block processing patterns (but those are complex and rarely needed within given constraints).
* If diagonal moves were allowed (not in this problem), neighbor list would be extended and the metric would be Chebyshev or different — but here we use Manhattan distance and 4-neighbors.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
