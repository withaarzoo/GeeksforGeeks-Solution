# Path With Minimum Effort

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

I am given a 2D integer grid `mat` of size `n * m`. I must find a path from the top-left cell `(0,0)` to the bottom-right cell `(n-1,m-1)` moving only up/down/left/right between adjacent cells. Each step between adjacent cells has an **edge cost** equal to the absolute difference between their values. The **cost of a path** is the **maximum** edge cost among all steps in that path. I must return the **minimum possible path cost** among all possible paths.

In short: minimize the **maximum absolute difference** between consecutive cells along the path.

---

## Constraints

* `1 <= n, m <= 100`
* `0 <= mat[i][j] <= 10^6`

(These are typical constraints — adjust if your judge gives different limits.)

---

## Intuition

I thought about how the path cost is defined as the *maximum* edge along the route. That reminded me of two common strategies for such "minimize the maximum" problems:

1. A Dijkstra-like solution where instead of summing edge weights, I propagate the **maximum-so-far** along a path and always pick the unexplored node with the smallest such maximum. This is guaranteed correct because relaxing a node updates its best possible maximum-edge.
2. Binary search on the answer (`X`) and check if there exists a path from start to end using only edges with weight ≤ `X`. Use BFS/DFS for the feasibility check. Binary search over `X` (range of values) and BFS is often faster in languages where priority-queue overhead is expensive (like JavaScript).

I used the Dijkstra-style solution for C++, Java, and Python for clarity and optimality. For JavaScript (to avoid TLE in many judges) I provided the binary-search + BFS approach with micro-optimizations (fast queue, packing coords).

---

## Approach

1. If grid has one cell, return `0` (no edges).
2. Dijkstra-style approach (C++/Java/Python):

   * Maintain `dist[r][c]` = minimum possible *maximum-edge* needed to reach `(r,c)`.
   * Initialize all `dist` to INF except `dist[0][0] = 0`.
   * Use a min-heap keyed by `dist`. When exploring neighbors, compute `edge = abs(mat[r][c] - mat[nr][nc])` and `newCost = max(dist[r][c], edge)`. If `newCost < dist[nr][nc]`, update and push into heap.
   * The first time we pop destination we have the optimal answer.
3. Binary-search + BFS approach (JavaScript):

   * Compute `low = 0`, `high = max(mat) - min(mat)`.
   * For a mid-limit `mid`, run BFS from `(0,0)` and allow only moves whose `abs(diff) <= mid`.
   * If BFS reaches destination, `mid` is feasible; shrink `high`. Otherwise, increase `low`.
   * Return minimal feasible `mid`.

---

## Data Structures Used

* 2D vector / array `dist` to store best-known `maximum-edge` cost to each cell.
* Min-heap / priority queue (for Dijkstra-style).
* BFS queue (for feasibility checks in binary search approach).
* 2D boolean visited array for BFS.
* Simple arrays to represent 4-directional movement.

---

## Operations & Behavior Summary

* **Edge weight** between two adjacent cells = `abs(mat[r][c] - mat[nr][nc])`.
* **Path cost** = maximum edge weight across the path.
* **Relaxation** for neighbor: `newCost = max(currentCost, edge)`.
* In Dijkstra-style we pop the smallest `currentCost` from min-heap and relax neighbors (like Dijkstra but with `max` as accumulate function).
* In binary-search we check existence of path that uses only edges ≤ `limit`.

---

## Complexity

* **Dijkstra-style (C++, Java, Python):**
  *Time Complexity:* `O(n*m * log(n*m))` — there are `n*m` nodes; each push/pop is `O(log(n*m))`.
  *Space Complexity:* `O(n*m)` for `dist`, visited structures, and heap.
* **Binary-search + BFS (JavaScript):**
  *Time Complexity:* `O(n*m * logW)` where `W = maxValue - minValue`. `logW` typically ≤ 20 for reasonable ranges.
  *Space Complexity:* `O(n*m)` for visited and queue.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int minCostPath(vector<vector<int>>& mat) {
        int n = mat.size();
        if (n == 0) return 0;
        int m = mat[0].size();
        if (n == 1 && m == 1) return 0;
        
        const int INF = 1e9;
        vector<vector<int>> dist(n, vector<int>(m, INF));
        using T = tuple<int,int,int>; // (cost, r, c)
        priority_queue<T, vector<T>, greater<T>> pq;
        
        dist[0][0] = 0;
        pq.emplace(0, 0, 0);
        int dr[4] = {1,-1,0,0};
        int dc[4] = {0,0,1,-1};
        
        while (!pq.empty()) {
            auto [cost, r, c] = pq.top(); pq.pop();
            if (cost != dist[r][c]) continue;
            if (r == n-1 && c == m-1) return cost;
            for (int k = 0; k < 4; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
                int edge = abs(mat[r][c] - mat[nr][nc]);
                int newCost = max(cost, edge);
                if (newCost < dist[nr][nc]) {
                    dist[nr][nc] = newCost;
                    pq.emplace(newCost, nr, nc);
                }
            }
        }
        return dist[n-1][m-1];
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int minCostPath(int[][] mat) {
        int n = mat.length;
        if (n == 0) return 0;
        int m = mat[0].length;
        if (n == 1 && m == 1) return 0;
        
        final int INF = Integer.MAX_VALUE / 2;
        int[][] dist = new int[n][m];
        for (int i = 0; i < n; ++i) Arrays.fill(dist[i], INF);
        
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        dist[0][0] = 0;
        pq.offer(new int[]{0, 0, 0}); // cost, r, c
        
        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};
        
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int cost = cur[0], r = cur[1], c = cur[2];
            if (cost != dist[r][c]) continue;
            if (r == n-1 && c == m-1) return cost;
            for (int k = 0; k < 4; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
                int edge = Math.abs(mat[r][c] - mat[nr][nc]);
                int newCost = Math.max(cost, edge);
                if (newCost < dist[nr][nc]) {
                    dist[nr][nc] = newCost;
                    pq.offer(new int[]{newCost, nr, nc});
                }
            }
        }
        return dist[n-1][m-1];
    }
}
```

### JavaScript

> **Note:** To avoid TLE in many JS judges, I use binary-search on the answer + BFS with micro-optimizations (fast queue via head/tail, packed coordinates).

```javascript
/**
 * @param {number[][]} mat
 * @returns {number}
 */
class Solution {
  minCostPath(mat) {
    const n = mat.length;
    if (n === 0) return 0;
    const m = mat[0].length;
    if (n === 1 && m === 1) return 0;

    // compute bounds for binary search
    let minV = Number.MAX_SAFE_INTEGER, maxV = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < m; ++j) {
        const v = mat[i][j];
        if (v < minV) minV = v;
        if (v > maxV) maxV = v;
      }
    }
    let low = 0, high = maxV - minV;
    const dr = [1, -1, 0, 0];
    const dc = [0, 0, 1, -1];

    const canReach = (limit) => {
      const vis = Array.from({length: n}, () => Array(m).fill(false));
      const q = new Array(n * m);
      let head = 0, tail = 0;
      q[tail++] = (0 << 16) | 0;
      vis[0][0] = true;
      while (head < tail) {
        const packed = q[head++];
        const r = packed >>> 16;
        const c = packed & 0xFFFF;
        if (r === n - 1 && c === m - 1) return true;
        const baseVal = mat[r][c];
        for (let k = 0; k < 4; ++k) {
          const nr = r + dr[k], nc = c + dc[k];
          if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
          if (vis[nr][nc]) continue;
          if (Math.abs(baseVal - mat[nr][nc]) <= limit) {
            vis[nr][nc] = true;
            q[tail++] = (nr << 16) | nc;
          }
        }
      }
      return false;
    };

    // binary search
    let ans = high;
    while (low <= high) {
      const mid = (low + high) >>> 1;
      if (canReach(mid)) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return ans;
  }
}
```

### Python3

```python
import heapq

class Solution:
    def minCostPath(self, mat):
        n = len(mat)
        if n == 0:
            return 0
        m = len(mat[0])
        if n == 1 and m == 1:
            return 0
        
        INF = 10**18
        dist = [[INF]*m for _ in range(n)]
        dist[0][0] = 0
        heap = [(0, 0, 0)]  # (cost, r, c)
        dr = [1, -1, 0, 0]
        dc = [0, 0, 1, -1]
        
        while heap:
            cost, r, c = heapq.heappop(heap)
            if cost != dist[r][c]:
                continue
            if r == n-1 and c == m-1:
                return cost
            for k in range(4):
                nr, nc = r + dr[k], c + dc[k]
                if nr < 0 or nr >= n or nc < 0 or nc >= m:
                    continue
                edge = abs(mat[r][c] - mat[nr][nc])
                newCost = max(cost, edge)
                if newCost < dist[nr][nc]:
                    dist[nr][nc] = newCost
                    heapq.heappush(heap, (newCost, nr, nc))
        return dist[n-1][m-1]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I will explain the important blocks of logic. The same logic applies across languages; differences are syntactic.

### 1. Base cases

* If `n == 0` -> return `0` (empty grid safety).
* If `n == 1 && m == 1` -> return `0` because no edges exist.

### 2. Dijkstra-style main idea (C++/Java/Python)

* I create `dist` initialized to INF for every cell; `dist[0][0] = 0`.
* I use a min-heap keyed by `dist` (store `(cost, r, c)`).
* While heap not empty:

  * Pop the node with smallest `cost`. If popped `cost` is stale (not equal to `dist[r][c]`), skip it.
  * If this node is destination, return `cost` immediately — this is optimal.
  * For each of four neighbors `(nr, nc)` inside bounds:

    * Compute `edge = abs(mat[r][c] - mat[nr][nc])`.
    * New path's maximum becomes `newCost = max(cost, edge)`.
    * If `newCost < dist[nr][nc]`, update `dist[nr][nc] = newCost` and push into heap.
* Return `dist[n-1][m-1]` (fallback if not popped earlier).

Why this works: we are propagating the minimum possible "maximum edge so far" to each node. The min-heap ensures we always expand the node with currently smallest maximum, so the first time we reach the target is with the smallest possible value.

### 3. Binary-search + BFS (JavaScript)

* I compute `low = 0` and `high = maxValue - minValue` because no edge can exceed this difference.
* For a mid `limit`, I run BFS starting from `(0,0)` allowing moves only where `abs(mat[r][c] - mat[nr][nc]) <= limit`.
* If BFS reaches `(n-1,m-1)`, `limit` is feasible; try lower `limit`.
* Otherwise increase `limit`.
* Use an efficient queue: an array with head/tail indices to avoid `shift()` overhead.
* Pack coordinates into a 32-bit integer `(r<<16) | c` for fewer allocations & faster operations.

Why this works: If a path exists whose maximum edge is ≤ `X`, BFS constrained by edges ≤ `X` will find it. Binary searching finds the minimal such `X`.

---

## Examples

Example 1:

```
Input:
mat = [
  [7, 2, 6, 5],
  [3, 1,10, 8]
]
Output: 4

Explanation:
One valid route: 7 -> 3 -> 1 -> 2 -> 6 -> 5
Edge diffs: |7-3|=4, |3-1|=2, |1-2|=1, |2-6|=4, |6-5|=1
Maximum edge = 4. It's not possible to have smaller maximum-edge for any path.
```

Example 2:

```
Input:
mat = [
 [2,2,2,1],
 [8,1,2,7],
 [2,2,2,8],
 [2,1,4,7],
 [2,2,2,2]
]
Output: 0

Explanation:
There exists a path that steps only on cells with equal values (2), so all edge diffs are 0.
```

---

## How to use / Run locally

### C++

1. Save the C++ class into a `.cpp` file and add a `main()` wrapper to read input and call `Solution().minCostPath(mat)`.
2. Compile:

   ```
   g++ -O2 -std=c++17 solution.cpp -o solution
   ./solution
   ```

### Java

1. Save code in `Solution.java` and add a `public static void main(String[] args)` to read input and call `new Solution().minCostPath(mat)`.
2. Compile & run:

   ```
   javac Solution.java
   java Solution
   ```

### JavaScript (Node.js)

1. Save `Solution` class in `solution.js`. Add a small runner to parse/test input and call `new Solution().minCostPath(mat)`.
2. Run:

   ```
   node solution.js
   ```

### Python3

1. Save code in `solution.py` and add:

   ```python
   if __name__ == "__main__":
       mat = [[...], ...]
       print(Solution().minCostPath(mat))
   ```

2. Run:

   ```
   python3 solution.py
   ```

---

## Notes & Optimizations

* In languages where heap operations are expensive (JS), use binary-search + BFS. In other languages C++/Java/Python a Dijkstra-style with an efficient heap is simple and fast.
* For BFS in binary-search:

  * Avoid `Array.shift()` in JS. Use a circular buffer or head/tail indices.
  * Avoid creating many small objects (pack coordinates into integers).
* For very large value ranges, `high` may be up to `10^6`. `log2(10^6) ≈ 20`, so binary-search means ~20 BFS runs — acceptable for `n*m <= 10000`.
* If memory is tight, I can implement `dist` as a flattened 1D array.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
