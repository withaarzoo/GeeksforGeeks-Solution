# Longest Possible Route in a Matrix with Hurdles

A beginner-friendly solution to the GeeksforGeeks **Longest Possible Route in a Matrix with Hurdles** problem using **Backtracking (DFS)**. This repository explains the intuition, approach, complexity analysis, and provides solutions in multiple programming languages.

Keywords: Longest Possible Route in a Matrix with Hurdles, GeeksforGeeks Solution, GFG Backtracking Solution, DFS Matrix Problem, Longest Path in Matrix, Matrix Traversal, Recursive DFS, Competitive Programming, DSA.

---

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

---

## Problem Summary

In this problem, we are given a binary matrix where:

- `1` represents a cell that we can visit.
- `0` represents a blocked cell.

We are also given the coordinates of a source cell and a destination cell.

The goal is to find the **longest possible path** from the source to the destination while following these rules:

- We can move only in four directions:
  - Up
  - Down
  - Left
  - Right
- A cell can be visited only once in a single path.
- If the destination cannot be reached, we must return `-1`.

Unlike shortest path problems, this question asks for the **maximum number of moves**, which makes Backtracking with Depth First Search (DFS) the natural choice.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number of rows (`n`) | `1 ≤ n ≤ 10` |
| Number of columns (`m`) | `1 ≤ m ≤ 10` |
| Matrix values | `0` or `1` |
| Source and destination | Always inside the matrix |

---

## Intuition

My first thought was to use BFS because it works well for path problems.

Then I noticed something important.

The problem is asking for the **longest** simple path, not the shortest one.

That immediately rules out BFS.

Since every cell can only be visited once and the matrix size is very small (`10 × 10`), I realized that trying every possible valid path is completely acceptable.

So I used **Depth First Search (DFS)** along with **Backtracking**.

Whenever I visit a cell, I mark it as visited. After exploring every possible direction from that cell, I unmark it so other paths can use it again.

This guarantees that every valid path is explored.

---

## Approach

I solved the problem using recursive DFS.

1. Check whether the source or destination cell is blocked.
2. If either one is blocked, return `-1`.
3. Start DFS from the source.
4. If the current cell becomes the destination, return `0`.
5. Mark the current cell as visited.
6. Try moving in all four directions.
7. Skip moves that go outside the matrix, enter blocked cells, or revisit already visited cells.
8. Recursively explore every valid neighbor.
9. Keep the maximum path length among all valid routes.
10. Before returning, unmark the current cell so it can be used by another path.

This is the classic Backtracking pattern.

---

## Data Structures Used

### Matrix

Stores the input grid containing blocked and traversable cells.

### Visited Matrix

Keeps track of the cells already used in the current path so they are not revisited.

### Direction Arrays

Stores the four movement directions.

This avoids writing repetitive movement logic.

### Recursion Stack

DFS naturally uses recursion to explore every possible path.

---

## Operations & Behavior Summary

The algorithm performs these steps:

1. Validate the source and destination.
2. Start DFS from the source.
3. Mark the current cell as visited.
4. Explore Up, Down, Left, and Right.
5. Ignore invalid or blocked cells.
6. Continue recursively.
7. Update the answer whenever a longer valid path is found.
8. Backtrack by unmarking the current cell.
9. Return the longest distance.
10. If no path exists, return `-1`.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | `O(4^(n × m))` | In the worst case, DFS explores many possible simple paths. The search space grows exponentially. |
| Space Complexity | `O(n × m)` | Extra space is used for the visited matrix and the recursion stack. |

Where:

- `n` = number of rows
- `m` = number of columns

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int n, m;

    // Directions: Up, Down, Left, Right
    int dx[4] = {-1, 1, 0, 0};
    int dy[4] = {0, 0, -1, 1};

    // DFS returns the longest distance from (x, y) to destination
    int dfs(vector<vector<int>>& mat, vector<vector<bool>>& vis,
            int x, int y, int xd, int yd) {

        // Destination reached
        if (x == xd && y == yd)
            return 0;

        // Mark current cell as visited
        vis[x][y] = true;

        int ans = -1;

        // Try all four directions
        for (int k = 0; k < 4; k++) {

            int nx = x + dx[k];
            int ny = y + dy[k];

            // Check whether next cell is valid
            if (nx >= 0 && nx < n &&
                ny >= 0 && ny < m &&
                mat[nx][ny] == 1 &&
                !vis[nx][ny]) {

                // Explore further
                int cur = dfs(mat, vis, nx, ny, xd, yd);

                // If destination is reachable through this path
                if (cur != -1)
                    ans = max(ans, cur + 1);
            }
        }

        // Backtrack so this cell can be reused
        vis[x][y] = false;

        return ans;
    }

    int longestPath(vector<vector<int>>& mat, int xs, int ys, int xd, int yd) {

        n = mat.size();
        m = mat[0].size();

        // If source or destination is blocked
        if (mat[xs][ys] == 0 || mat[xd][yd] == 0)
            return -1;

        // Visited matrix to avoid revisiting cells
        vector<vector<bool>> vis(n, vector<bool>(m, false));

        return dfs(mat, vis, xs, ys, xd, yd);
    }
};
```

### Java

```java
class Solution {

    int n, m;

    // Four possible directions
    int[] dx = {-1, 1, 0, 0};
    int[] dy = {0, 0, -1, 1};

    // DFS returns longest distance from current cell
    int dfs(int[][] mat, boolean[][] vis, int x, int y, int xd, int yd) {

        // Destination reached
        if (x == xd && y == yd)
            return 0;

        // Mark current cell as visited
        vis[x][y] = true;

        int ans = -1;

        // Explore all four directions
        for (int k = 0; k < 4; k++) {

            int nx = x + dx[k];
            int ny = y + dy[k];

            // Check whether next cell is valid
            if (nx >= 0 && nx < n &&
                ny >= 0 && ny < m &&
                mat[nx][ny] == 1 &&
                !vis[nx][ny]) {

                int cur = dfs(mat, vis, nx, ny, xd, yd);

                // Update answer if destination is reachable
                if (cur != -1)
                    ans = Math.max(ans, cur + 1);
            }
        }

        // Backtrack
        vis[x][y] = false;

        return ans;
    }

    public int longestPath(int[][] mat, int xs, int ys, int xd, int yd) {

        n = mat.length;
        m = mat[0].length;

        // Source or destination is blocked
        if (mat[xs][ys] == 0 || mat[xd][yd] == 0)
            return -1;

        boolean[][] vis = new boolean[n][m];

        return dfs(mat, vis, xs, ys, xd, yd);
    }
}
```

### JavaScript

```javascript
class Solution {

    // DFS returns longest distance from current cell
    dfs(mat, vis, x, y, xd, yd) {

        // Destination reached
        if (x === xd && y === yd)
            return 0;

        // Mark current cell as visited
        vis[x][y] = true;

        let ans = -1;

        const dx = [-1, 1, 0, 0];
        const dy = [0, 0, -1, 1];

        // Explore all four directions
        for (let k = 0; k < 4; k++) {

            let nx = x + dx[k];
            let ny = y + dy[k];

            // Check whether next cell is valid
            if (
                nx >= 0 &&
                nx < this.n &&
                ny >= 0 &&
                ny < this.m &&
                mat[nx][ny] === 1 &&
                !vis[nx][ny]
            ) {

                let cur = this.dfs(mat, vis, nx, ny, xd, yd);

                // Update answer if destination is reachable
                if (cur !== -1)
                    ans = Math.max(ans, cur + 1);
            }
        }

        // Backtrack
        vis[x][y] = false;

        return ans;
    }

    longestPath(mat, xs, ys, xd, yd) {

        this.n = mat.length;
        this.m = mat[0].length;

        // Source or destination is blocked
        if (mat[xs][ys] === 0 || mat[xd][yd] === 0)
            return -1;

        // Visited matrix
        const vis = Array.from(
            { length: this.n },
            () => Array(this.m).fill(false)
        );

        return this.dfs(mat, vis, xs, ys, xd, yd);
    }
};
```

### Python3

```python
class Solution:

    # DFS returns longest distance from current cell
    def dfs(self, mat, vis, x, y, xd, yd):

        # Destination reached
        if x == xd and y == yd:
            return 0

        # Mark current cell as visited
        vis[x][y] = True

        ans = -1

        # Four possible directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for dx, dy in directions:

            nx = x + dx
            ny = y + dy

            # Check whether next cell is valid
            if (
                0 <= nx < self.n and
                0 <= ny < self.m and
                mat[nx][ny] == 1 and
                not vis[nx][ny]
            ):

                cur = self.dfs(mat, vis, nx, ny, xd, yd)

                # Update answer if destination is reachable
                if cur != -1:
                    ans = max(ans, cur + 1)

        # Backtrack
        vis[x][y] = False

        return ans

    def longestPath(self, mat, xs, ys, xd, yd):

        self.n = len(mat)
        self.m = len(mat[0])

        # Source or destination is blocked
        if mat[xs][ys] == 0 or mat[xd][yd] == 0:
            return -1

        # Visited matrix
        vis = [[False] * self.m for _ in range(self.n)]

        return self.dfs(mat, vis, xs, ys, xd, yd)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is exactly the same in every language.

Only the syntax changes.

### Step 1

Read the matrix dimensions.

Create a visited matrix having the same size.

Initially every value is `false`.

---

### Step 2

Check whether the source or destination is blocked.

If either cell contains `0`, immediately return `-1`.

There is no valid path.

---

### Step 3

Create a recursive DFS function.

Its job is to find the longest path from the current position to the destination.

---

### Step 4

If the current position is already the destination, return `0`.

This becomes the base case of the recursion.

---

### Step 5

Mark the current cell as visited.

This prevents revisiting the same cell and creating cycles.

Without this step, recursion could continue forever.

---

### Step 6

Try moving in four directions.

- Up
- Down
- Left
- Right

For every move, check:

- Inside matrix boundaries
- Traversable cell
- Not already visited

Only valid moves are explored.

---

### Step 7

Recursively explore the neighboring cell.

If that recursive call successfully reaches the destination, add one move to its answer.

Keep the maximum value.

---

### Step 8

After exploring every direction, unmark the current cell.

This is called Backtracking.

Without backtracking, future paths would never be able to reuse this cell, producing incorrect answers.

---

### Step 9

Return the best answer found.

If every possible direction fails, return `-1`.

Eventually, the main function returns either:

- The maximum path length
- `-1` if no path exists

---

## Examples

### Example 1

**Input**

```text
Matrix =
1 1 1
1 1 1
1 1 1

Source = (0,0)
Destination = (2,2)
```

**Output**

```text
8
```

**Trace**

The algorithm explores every possible simple path and finally returns the longest one that reaches the destination.

---

### Example 2

**Input**

```text
Matrix =
1 0 1
1 0 1
1 1 1

Source = (0,0)
Destination = (2,2)
```

**Output**

```text
4
```

**Trace**

The blocked cells force the path to move around them. DFS checks every possible route and keeps the longest valid one.

---

### Example 3

**Input**

```text
Matrix =
1 0
0 1

Source = (0,0)
Destination = (1,1)
```

**Output**

```text
-1
```

**Trace**

No valid path exists because both neighboring cells are blocked.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project folder.

```bash
cd your-repository
```

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run using Node.js.

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- This problem is a classic Backtracking problem.
- BFS cannot solve it because BFS finds the shortest path instead of the longest path.
- Since the matrix size is at most `10 × 10`, exploring every possible simple path is acceptable.
- The visited matrix is necessary to prevent cycles.
- Backtracking is equally important because every recursive path must restore the matrix before returning.
- There is no polynomial-time algorithm for finding the longest simple path in a general graph, which is why exponential search is expected here.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
