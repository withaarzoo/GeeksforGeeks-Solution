# Longest Increasing Path in Matrix

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You are given a matrix with n rows and m columns. Your job is to find the length of the longest path where every next value is strictly greater than the previous one.

From any cell you can move only up, down, left or right. You cannot move diagonally or go outside the matrix. You also cannot visit the same cell twice in one path.

The function receives the matrix along with its dimensions n and m and must return a single integer — the length of the longest strictly increasing path.

This is a classic dynamic programming on grid problem that appears often in coding interviews and competitive programming contests under names like longest increasing path in a matrix or matrix longest increasing path DFS.

## Constraints

- 1 ≤ n, m ≤ 1000
- 0 ≤ matrix[i][j] ≤ 2³⁰

Because n and m can both reach 1000, any solution slower than O(n × m) will time out. The expected time and auxiliary space are both O(n × m).

## Intuition

When I first looked at the problem I noticed that the path is forced to keep climbing. Once you leave a cell you never return to it, so the graph formed by the cells is a directed acyclic graph (DAG).

That observation immediately suggests that a simple depth-first search can explore every possible increasing path. The problem is that doing a fresh DFS from every cell would be far too slow for a 1000 × 1000 grid.

The key insight is that the longest path starting from any cell never changes. If I store that length the first time I compute it, later calls can just look it up. This turns the exponential search into a linear scan over the cells.

## Approach

I keep a memoization table of the same size as the input matrix. Every entry starts at zero, which means “not calculated yet”.

For every cell I launch a DFS that answers the question: “What is the longest strictly increasing path that begins at this cell?”

Inside the DFS I first check the memo. If the value is already known I return it at once. Otherwise I examine the four possible neighbors. For each neighbor that stays inside the grid and has a strictly larger value I recursively ask for its longest path and keep the maximum. I add one for the current cell, write the result into the memo, and return it.

After I have run the DFS for every cell, the answer is simply the largest number that appears in the memo table.

This approach guarantees that each cell is processed only once, giving the required O(n × m) time bound.

## Data Structures Used

- 2-D memoization array (size n × m) – stores the longest path length starting from each cell so we never recompute the same sub-problem.
- Direction array of four pairs – lets us loop over up, down, left and right without writing four almost identical if-statements.
- Recursion stack – used by the DFS; in the worst case it can grow to O(n × m) when the matrix forms one long increasing path.

No extra queues, heaps or sets are required.

## Operations & Behavior Summary

1. Allocate a memo table filled with zeros.
2. For every cell (i, j) call the DFS helper.
3. Inside DFS:
   - If memo[i][j] is already positive, return it.
   - Otherwise set best = 1 (the cell itself).
   - For each of the four directions check the neighbor.
   - If the neighbor is valid and larger, update best with 1 + DFS(neighbor).
   - Store best in memo[i][j] and return it.
4. Keep a global maximum while iterating over all cells.
5. Return that maximum.

The whole process visits each cell a constant number of times thanks to memoization.

## Complexity

| Complexity          | Value     | Explanation                                                                 |
|---------------------|-----------|-----------------------------------------------------------------------------|
| Time Complexity     | O(n × m)  | Each of the n × m cells is computed exactly once; later lookups are O(1).   |
| Space Complexity    | O(n × m)  | Memo table of size n × m plus the recursion stack in the worst case.        |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int longIncPath(vector<vector<int>> &matrix, int n, int m) {
        vector<vector<int>> memo(n, vector<int>(m, 0));
        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        function<int(int,int)> dfs = [&](int i, int j) {
            if (memo[i][j] != 0) return memo[i][j];
            int best = 1;
            for (auto& d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < n && nj >= 0 && nj < m && matrix[ni][nj] > matrix[i][j]) {
                    best = max(best, 1 + dfs(ni, nj));
                }
            }
            return memo[i][j] = best;
        };
        int ans = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                ans = max(ans, dfs(i, j));
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int longIncPath(int[][] matrix, int n, int m) {
        int[][] memo = new int[n][m];
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        int ans = 0;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                ans = Math.max(ans, dfs(matrix, memo, dirs, i, j, n, m));
        return ans;
    }
    private int dfs(int[][] matrix, int[][] memo, int[][] dirs, int i, int j, int n, int m) {
        if (memo[i][j] != 0) return memo[i][j];
        int best = 1;
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < n && nj >= 0 && nj < m && matrix[ni][nj] > matrix[i][j]) {
                best = Math.max(best, 1 + dfs(matrix, memo, dirs, ni, nj, n, m));
            }
        }
        return memo[i][j] = best;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[][]} matrix
 * @param {number} n
 * @param {number} m
 * @return {number}
 */

class Solution {
    longIncPath(matrix, n, m) {
        const memo = Array.from({length: n}, () => Array(m).fill(0));
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        const dfs = (i, j) => {
            if (memo[i][j] !== 0) return memo[i][j];
            let best = 1;
            for (const [di, dj] of dirs) {
                const ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < n && nj >= 0 && nj < m && matrix[ni][nj] > matrix[i][j]) {
                    best = Math.max(best, 1 + dfs(ni, nj));
                }
            }
            return memo[i][j] = best;
        };
        let ans = 0;
        for (let i = 0; i < n; i++)
            for (let j = 0; j < m; j++)
                ans = Math.max(ans, dfs(i, j));
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def longIncPath(self, matrix, n, m):
        memo = [[0] * m for _ in range(n)]
        dirs = [(-1,0),(1,0),(0,-1),(0,1)]
        def dfs(i, j):
            if memo[i][j] != 0:
                return memo[i][j]
            best = 1
            for di, dj in dirs:
                ni, nj = i + di, j + dj
                if 0 <= ni < n and 0 <= nj < m and matrix[ni][nj] > matrix[i][j]:
                    best = max(best, 1 + dfs(ni, nj))
            memo[i][j] = best
            return best
        ans = 0
        for i in range(n):
            for j in range(m):
                ans = max(ans, dfs(i, j))
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

I start by creating a memo table of size n by m and fill every entry with 0. Zero is my signal that the cell has never been processed.

I also prepare a small constant list of the four direction offsets. This keeps the code clean and makes it easy to add or remove directions later.

The recursive helper receives the current row and column. Its first action is to look at the memo. If the entry is already greater than zero the answer is known and the function returns immediately. This single check is what turns the algorithm from exponential into linear.

When the memo still shows zero I know I must compute the value. I initialise a local variable best to 1 because a path of length one is always possible.

Then I loop over the four offsets. For each offset I calculate the neighbour coordinates and test three conditions:

- the neighbour lies inside the matrix,
- its value is strictly larger than the current cell,
- therefore a legal increasing step exists.

If all three conditions hold I make a recursive call on that neighbour, add one, and keep the largest result I have seen.

After the loop finishes I write the final best value into the memo and return it. From this moment any later call that reaches the same cell obtains the answer in constant time.

In the main driver I simply walk through every cell, call the helper, and track the global maximum. Because every cell is processed only once, the total work stays proportional to the number of cells.

Edge cases are handled naturally:

- A single-cell matrix returns 1.
- A matrix where every value is identical returns 1.
- A strictly decreasing matrix also returns 1.
- A long snake-like increasing path uses the recursion stack but still finishes in linear time thanks to memoization.

## Examples

**Example 1**

Input:
```
n = 3, m = 3
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]
```

Output: 5

Trace: One possible path is 1 → 2 → 3 → 6 → 9. The DFS starting at cell (0,0) discovers length 5; every other starting cell yields a shorter or equal length, so the answer is 5.

**Example 2**

Input:
```
n = 3, m = 3
matrix = [[3, 4, 5],
          [6, 2, 6],
          [2, 2, 1]]
```

Output: 4

Trace: The path 3 → 4 → 5 → 6 is found when DFS starts at (0,0). Other starting points give shorter paths, confirming the maximum is 4.

**Example 3**

Input:
```
n = 2, m = 2
matrix = [[1, 1],
          [1, 1]]
```

Output: 1

Trace: No cell has a strictly larger neighbour, so every DFS returns 1 and the global answer stays 1.

## How to Use / Run Locally

**C++**
1. Save the code in a file named `main.cpp`.
2. Compile with `g++ -std=c++17 main.cpp -o main`.
3. Run with `./main`. You may need to add a small driver that reads n, m and the matrix if you want interactive testing.

**Java**
1. Save the code in `Solution.java`.
2. Compile with `javac Solution.java`.
3. Run with `java Solution`. Again, add a main method that constructs a matrix and calls the function for local tests.

**JavaScript**
1. Save the code in `solution.js`.
2. Run with Node.js: `node solution.js`.
3. You can also paste the class into any modern browser console.

**Python3**
1. Save the code in `solution.py`.
2. Run with `python3 solution.py`.
3. Add a few print statements at the bottom to test the examples above.

In all languages remember that the function expects the matrix and its dimensions; you must supply them yourself when testing locally.

## Notes & Optimizations

- The recursion depth can reach n × m on a pathological input. Most online judges accept this, but if you ever hit a stack-overflow limit you can convert the DFS into an iterative topological-order DP.
- Because the values can be as large as 2³⁰, do not use any arithmetic that could overflow a 32-bit integer; the path length itself never exceeds n × m, so a plain int is safe.
- An alternative bottom-up approach exists: process cells in increasing order of their values and update a DP table. That version also runs in O(n × m) after sorting, but the memoized DFS is simpler to implement and usually faster in practice.
- The same technique works for any grid path problem that forms a DAG (longest decreasing path, longest path with alternating parity, etc.).

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
