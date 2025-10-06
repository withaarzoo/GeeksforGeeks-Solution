# The Knight's Tour Problem

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

I am given an `n × n` chessboard and a Knight starting at the top-left corner `(0, 0)`. My task is to find a valid Knight's Tour — a sequence of knight moves that visits each square **exactly once**. If a valid tour exists, I must return the order in which each cell is visited (a 2D matrix where value at cell = step index starting from `0`). If no solution exists, I should return `-1`.

---

## Constraints

* `1 ≤ n ≤ 6` (board size is small; exhaustive/backtracking is feasible)
* Knight moves follow chess rules: 8 possible L-shaped moves.

---

## Intuition

I thought of this as a path-finding/backtracking puzzle: the knight must cover all squares without revisiting. Simple brute-force backtracking will find a solution but can be slow because the branching factor is up to 8. To prune the search heavily, I use **Warnsdorff’s heuristic**: always try the next move that has the fewest onward moves (minimum degree). This tends to lead me to a full tour quickly for small boards.

Edge cases I noticed:

* `n = 1` trivially returns `[[0]]`.
* For `n = 2, 3, 4` a closed solution is impossible (for many typical knight-tour rules — I use a sentinel `-1` for these small n in my code to avoid long wasted searches).

---

## Approach

1. Handle trivial and impossible sizes:

   * If `n == 1` return the `1×1` board with `0`.
   * If `2 ≤ n < 5` return `-1` (no solution in practical terms for this problem).
2. Initialize `board[n][n]` with `-1` to mark unvisited cells.
3. Put the knight at `(0,0)` and mark as step `0`.
4. Use recursive DFS/backtracking:

   * If `step == n*n`, we have visited all squares → success.
   * From current `(r,c)`, gather all valid unvisited knight moves.
   * For each candidate, compute its degree (number of unvisited moves from that candidate).
   * Sort candidates by ascending degree (Warnsdorff).
   * Try each in that order: mark, recurse, if fail then backtrack (unmark).
5. If DFS finds a tour, return the board. Otherwise, return `-1`.

---

## Data Structures Used

* `board` — 2D array / list of lists (`n × n`) to store visit steps (`-1` for unvisited).
* `dr`, `dc` — arrays containing 8 knight move offsets.
* A list/vector structure to hold candidate moves with associated degrees (for sorting).
* Recursion stack (implicit) to track the DFS path.

---

## Operations & Behavior Summary

* Initialize board with `-1`.
* Place start `(0,0) = 0`.
* For each recursion:

  * Generate valid knight moves.
  * Compute degree for each candidate.
  * Sort candidates (smallest degree first).
  * Try each candidate recursively.
* Backtrack by resetting `board[r][c] = -1` when a path fails.
* Return the final board if successful; otherwise return `-1` sentinel.

---

## Complexity

* **Time Complexity:**
  The theoretical worst-case for naive backtracking is exponential (up to `O(8^(n*n))`) since each square can branch to up to 8 moves. However, with Warnsdorff's heuristic and the problem constraint `n ≤ 6`, the practical runtime is small and manageable.

  Here `n` refers to the board side length; the total cells are `n*n`.

* **Space Complexity:**
  `O(n^2)` for the `board`. Recursion call stack can be up to `n*n` deep, so auxiliary space is also `O(n^2)` in the worst case.

---

## Multi-language Solutions

> I return a 2D structure with visit-step indices if a solution exists. If no solution exists I return `[[ -1 ]]` to keep the return type consistent across languages. If a driver expects an integer `-1`, adapt accordingly.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Return n x n matrix with step indices, or {{-1}} when impossible.
    vector<vector<int>> knightTour(int n) {
        if (n == 1) return vector<vector<int>>(1, vector<int>(1, 0));
        if (n > 1 && n < 5) return vector<vector<int>>(1, vector<int>(1, -1));

        vector<vector<int>> board(n, vector<int>(n, -1));
        int dr[8] = {2,1,-1,-2,-2,-1,1,2}; // knight row moves
        int dc[8] = {1,2,2,1,-1,-2,-2,-1}; // knight column moves

        // Count unvisited moves from (r,c)
        auto degree = [&](int r, int c) {
            int cnt = 0;
            for (int k = 0; k < 8; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1)
                    ++cnt;
            }
            return cnt;
        };

        function<bool(int,int,int)> dfs = [&](int r, int c, int step) -> bool {
            if (step == n * n) return true; // all visited

            // collect valid moves with their degrees
            vector<pair<int, pair<int,int>>> moves;
            for (int k = 0; k < 8; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1)
                    moves.push_back({ degree(nr, nc), {nr, nc} });
            }
            // Warnsdorff: try less-degree moves first
            sort(moves.begin(), moves.end());

            for (auto &m : moves) {
                int nr = m.second.first, nc = m.second.second;
                board[nr][nc] = step;
                if (dfs(nr, nc, step + 1)) return true;
                board[nr][nc] = -1; // backtrack
            }
            return false;
        };

        board[0][0] = 0;
        if (dfs(0, 0, 1)) return board;
        return vector<vector<int>>(1, vector<int>(1, -1));
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    int n;
    int[][] board;
    final int[] dr = {2,1,-1,-2,-2,-1,1,2};
    final int[] dc = {1,2,2,1,-1,-2,-2,-1};

    public ArrayList<ArrayList<Integer>> knightTour(int n) {
        this.n = n;
        if (n == 1) {
            ArrayList<ArrayList<Integer>> res = new ArrayList<>();
            res.add(new ArrayList<>(Arrays.asList(0)));
            return res;
        }
        if (n > 1 && n < 5) {
            ArrayList<ArrayList<Integer>> res = new ArrayList<>();
            res.add(new ArrayList<>(Arrays.asList(-1)));
            return res;
        }

        board = new int[n][n];
        for (int i = 0; i < n; ++i) Arrays.fill(board[i], -1);

        board[0][0] = 0;
        if (!dfs(0, 0, 1)) {
            ArrayList<ArrayList<Integer>> res = new ArrayList<>();
            res.add(new ArrayList<>(Arrays.asList(-1)));
            return res;
        }

        // convert board to ArrayList<ArrayList<Integer>>
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            ArrayList<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; ++j) row.add(board[i][j]);
            result.add(row);
        }
        return result;
    }

    private int degree(int r, int c) {
        int cnt = 0;
        for (int k = 0; k < 8; ++k) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1) ++cnt;
        }
        return cnt;
    }

    private boolean dfs(int r, int c, int step) {
        if (step == n * n) return true;

        ArrayList<int[]> moves = new ArrayList<>();
        for (int k = 0; k < 8; ++k) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] == -1) {
                moves.add(new int[]{degree(nr,nc), nr, nc});
            }
        }
        moves.sort(Comparator.comparingInt(a -> a[0])); // ascending degree

        for (int[] m : moves) {
            int nr = m[1], nc = m[2];
            board[nr][nc] = step;
            if (dfs(nr, nc, step + 1)) return true;
            board[nr][nc] = -1; // backtrack
        }
        return false;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @returns {number[][]} board or [[-1]] if impossible
 */
class Solution {
    knightTour(n) {
        if (n === 1) return [[0]];
        if (n > 1 && n < 5) return [[-1]];

        const board = Array.from({length: n}, () => Array(n).fill(-1));
        const dr = [2,1,-1,-2,-2,-1,1,2];
        const dc = [1,2,2,1,-1,-2,-2,-1];

        const degree = (r, c) => {
            let cnt = 0;
            for (let k = 0; k < 8; ++k) {
                const nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] === -1) cnt++;
            }
            return cnt;
        };

        function dfs(r, c, step) {
            if (step === n * n) return true;
            const moves = [];
            for (let k = 0; k < 8; ++k) {
                const nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && board[nr][nc] === -1) {
                    moves.push([degree(nr,nc), nr, nc]);
                }
            }
            moves.sort((a,b) => a[0] - b[0]); // Warnsdorff

            for (const m of moves) {
                const [_, nr, nc] = m;
                board[nr][nc] = step;
                if (dfs(nr, nc, step + 1)) return true;
                board[nr][nc] = -1;
            }
            return false;
        }

        board[0][0] = 0;
        if (dfs(0, 0, 1)) return board;
        return [[-1]];
    }
}
```

### Python3

```python
class Solution:
    def knightTour(self, n):
        # Return an n x n list of lists with step indices,
        # or [[-1]] if impossible.
        if n == 1:
            return [[0]]
        if n > 1 and n < 5:
            return [[-1]]

        board = [[-1] * n for _ in range(n)]
        dr = [2,1,-1,-2,-2,-1,1,2]
        dc = [1,2,2,1,-1,-2,-2,-1]

        def degree(r, c):
            cnt = 0
            for k in range(8):
                nr, nc = r + dr[k], c + dc[k]
                if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == -1:
                    cnt += 1
            return cnt

        def dfs(r, c, step):
            if step == n * n:
                return True
            moves = []
            for k in range(8):
                nr, nc = r + dr[k], c + dc[k]
                if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == -1:
                    moves.append((degree(nr, nc), nr, nc))
            moves.sort()  # Warnsdorff: try lower degree first
            for _, nr, nc in moves:
                board[nr][nc] = step
                if dfs(nr, nc, step + 1):
                    return True
                board[nr][nc] = -1
            return False

        board[0][0] = 0
        if dfs(0, 0, 1):
            return board
        return [[-1]]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the core idea and main parts of the code (the same logic maps to all language versions). I’ll walk through the key blocks.

### 1. Board Initialization

* Create a 2D board filled with `-1` to mark unvisited cells:

  * C++: `vector<vector<int>> board(n, vector<int>(n, -1));`
  * Python: `board = [[-1] * n for _ in range(n)]`
  * JavaScript: `Array.from({length: n}, () => Array(n).fill(-1))`
  * Java: `board = new int[n][n]; fill with -1`

This `-1` sentinel helps check quickly if a cell has been visited.

### 2. Knight Moves

* Define arrays of length 8 representing the knight's L-shaped moves (row & column deltas). Example:

  * `dr = {2,1,-1,-2,-2,-1,1,2}, dc = {1,2,2,1,-1,-2,-2,-1}`

### 3. Degree Function (Warnsdorff heuristic)

* For a candidate cell `(r,c)`, `degree(r,c)` counts how many valid and unvisited moves are available from there.
* We use this degree to order candidate moves and reduce branching.

### 4. DFS / Backtracking

* `dfs(r, c, step)`:

  * Base case: if `step == n*n` → we've placed steps `0` through `n*n-1` → success.
  * Generate all valid knight moves from `(r,c)` that are still `-1`.
  * Build a list of `[degree, nr, nc]` for each candidate move.
  * Sort the candidates by `degree` ascending (Warnsdorff).
  * For each candidate:

    * Mark `board[nr][nc] = step`
    * Recurse `dfs(nr, nc, step + 1)`
    * If recursion fails, reset `board[nr][nc] = -1` (backtrack).
  * If none succeed, return `false`.

### 5. Starting the Search

* Mark `board[0][0] = 0` and start DFS with `step = 1`.
* If DFS returns `true`, return the `board` matrix.
* If it fails, return `[[ -1 ]]`.

---

## Examples

**Example 1**

```
Input: n = 5
Output: a 5x5 matrix (one possible solution)
Example returned board:
[[0, 11, 2, 17, 20],
 [3, 16, 19, 12, 7],
 [10, 1, 6, 21, 18],
 [15, 4, 23, 8, 13],
 [24, 9, 14, 5, 22]]
```

This means (0,0) visited at step 0, (0,2) visited at step 2, etc.

**Example 2**

```
Input: n = 4
Output: -1  (no valid full knight tour found for this configuration in our approach)
```

---

## How to use / Run locally

**Notes:** The code snippets above are organized as a `Solution` class with a `knightTour` method. To run them as standalone programs you can wrap them with a small driver that reads `n`, calls the method, and prints the board.

### C++

1. Create `knight_tour.cpp` and paste the class. Add a `main()` to instantiate `Solution`, call `knightTour(n)`, and print.
2. Compile & run:

```bash
g++ -std=c++17 knight_tour.cpp -O2 -o knight_tour
./knight_tour
```

### Java

1. Put code into `Solution.java`. Add a `public static void main(String[] args)` that reads `n`, calls `new Solution().knightTour(n)`, and prints rows.
2. Compile & run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node)

1. Save to `knight_tour.js` and add a driver at the bottom:

```javascript
const s = new Solution();
const board = s.knightTour(5);
console.log(board.map(r => r.join(' ')).join('\n'));
```

2. Run:

```bash
node knight_tour.js
```

### Python3

1. Save the class to `knight_tour.py` and append:

```python
if __name__ == "__main__":
    n = 5
    s = Solution()
    b = s.knightTour(n)
    for row in b:
        print(' '.join(map(str,row)))
```

2. Run:

```bash
python3 knight_tour.py
```

---

## Notes & Optimizations

* **Warnsdorff's heuristic** is the main optimization: choosing the move with the fewest onward moves reduces dead-ends and drastically prunes search.
* For `n <= 6` this approach is practical. For larger `n`, enhanced heuristics or heuristics combined with backtracking or known closed-form tours are used.
* I bail out early for `n = 2, 3, 4` (return `-1`) to avoid unnecessary work. Depending on problem expectations you might want to remove that guard to attempt a full search.
* The code stores the step index in the board; this lets me return a full ordering instead of just yes/no.
* Memory usage is dominated by the `board` (`O(n^2)`).

---

## Author

**[Aarzoo Islam](https://bento.me/withaarzoo)**
