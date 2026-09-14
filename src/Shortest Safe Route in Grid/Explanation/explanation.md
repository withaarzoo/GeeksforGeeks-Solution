# Shortest Safe Route in Grid

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

## Problem Summary

The problem gives a 2D matrix containing only `0` and `1`.

A `0` represents a landmine, while `1` represents a normally safe cell. However, a cell is also considered unsafe if it is directly adjacent to a landmine.

I need to find the shortest safe route from **any safe cell in the leftmost column** to **any safe cell in the rightmost column**.

I can move only in four directions:

* Up
* Down
* Left
* Right

The route must never enter a landmine or a cell directly adjacent to one.

If there is no possible safe route, I return `-1`.

For example:

```text
1 0 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 0 1
1 1 1 1 0
```

The main challenge is that I cannot simply treat every `1` as usable. I first need to remove the cells that are unsafe because of nearby landmines.

After that, the problem becomes a shortest path problem in a grid.

## Constraints

| Constraint            | Meaning                                              |
| --------------------- | ---------------------------------------------------- |
| `1 <= n, m <= 10^3`   | The matrix can have up to 1000 rows and 1000 columns |
| `0 <= mat[i][j] <= 1` | Every matrix cell contains either `0` or `1`         |

The solution needs to handle up to `n * m = 10^6` cells efficiently.

## Intuition

My first thought was to search for a path from the first column to the last column.

But there is an important condition that makes the problem different from a normal grid shortest path problem.

A landmine affects not only itself but also its four directly connected neighbors.

So before running a shortest path algorithm, I first mark all unsafe cells.

Once I do that, I can forget about the landmine rule during the actual path search. I only need to move through safe cells.

For the shortest path itself, I use BFS.

BFS works well here because every movement has the same cost: one step.

There can also be multiple possible starting cells in the first column. Instead of running BFS separately from every starting cell, I put all safe starting cells into the queue at the beginning.

This is called multi-source BFS.

There is one important detail about the answer. The problem counts the cells in the route, including the starting cell.

So if the route is:

```text
(0,0) -> (0,1) -> (0,2) -> (0,3)
```

the answer is:

```text
1      2      3      4
```

not `3`.

That means I initialize every starting cell with distance `1`.

## Approach

I solve the problem in two main phases.

### 1. Mark all unsafe cells

I scan the complete matrix.

Whenever I find a `0`, I mark:

```text
the landmine itself
        +
its up neighbor
        +
its down neighbor
        +
its left neighbor
        +
its right neighbor
```

as unsafe.

I check the matrix boundaries before marking neighbors because a landmine can be located at an edge or corner.

For example:

```text
1 1 1
1 0 1
1 1 1
```

The center cell is a landmine.

Therefore:

```text
X X X
X X X
X X X
```

All cells are unsafe in this small example.

### 2. Run multi-source BFS

After identifying unsafe cells, I check every cell in the first column.

If a cell is safe, I add it to the BFS queue with distance `1`.

Then I repeatedly take a cell from the queue and check its four neighbors.

A neighbor can be added only when:

```text
inside the matrix
AND
it contains 1
AND
it is not unsafe
AND
it has not been visited
```

Whenever I move to a new cell, I increase the route length by `1`.

The first time BFS reaches the rightmost column, I return that distance.

If BFS finishes without reaching the rightmost column, I return `-1`.

## Data Structures Used

### Unsafe Matrix

I use a separate `unsafe` matrix to store whether each cell is blocked because of a landmine.

This keeps the original `mat` unchanged.

### Visited Matrix

I use a `visited` matrix to make sure every safe cell is processed only once.

Without it, BFS could repeatedly visit the same cells through different paths.

### Queue

I use a queue for BFS.

Each queue element stores:

```text
row
column
route length
```

For example:

```text
(2, 3, 7)
```

means that I reached row `2`, column `3`, using a route containing `7` cells.

## Operations & Behavior Summary

The algorithm can be summarized as:

```text
Read the matrix
      |
      v
Find every landmine (0)
      |
      v
Mark each landmine and its
four direct neighbors unsafe
      |
      v
Find all safe cells in the first column
      |
      v
Put all of them into the BFS queue
with distance = 1
      |
      v
Take one cell from the queue
      |
      v
Check up, down, left and right
      |
      v
Ignore invalid, unsafe or visited cells
      |
      v
Add valid cells with distance + 1
      |
      v
Reach last column?
   /          \
 Yes           No
 |              |
Return dist   Continue BFS
                |
                v
          Queue becomes empty
                |
                v
              Return -1
```

This gives me an `O(n * m)` solution, which is suitable for the given constraints.

## Complexity

| Type             | Complexity | Explanation                                                                                     |
| ---------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n * m)` | I scan every cell to mark unsafe cells and BFS visits every cell at most once                   |
| Space Complexity | `O(n * m)` | The unsafe matrix, visited matrix and BFS queue can each require space proportional to the grid |

Here:

* `n` = number of rows
* `m` = number of columns

Since `n` and `m` can both be up to `1000`, an `O(n * m)` approach is much better than repeatedly searching from every possible starting cell.

## Multi-language Solutions

### C++

```cpp

class Solution {
  public:
    int shortestPath(vector<vector<int>> &mat) {
        int n = mat.size();                         // Number of rows.
        int m = mat[0].size();                      // Number of columns.

        vector<vector<int>> unsafe(n, vector<int>(m, 0));
        // unsafe[r][c] = 1 means this cell cannot be used in the route.

        int dr[4] = {-1, 1, 0, 0};
        // Row changes for up, down, left, and right.

        int dc[4] = {0, 0, -1, 1};
        // Column changes for up, down, left, and right.

        // I first find every landmine and mark it and its direct neighbors unsafe.
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (mat[r][c] == 0) {
                    unsafe[r][c] = 1;
                    // The landmine itself cannot be used.

                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d];
                        int nc = c + dc[d];
                        // Calculate one of the four neighboring cells.

                        if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                            unsafe[nr][nc] = 1;
                            // A cell directly adjacent to a landmine is also unsafe.
                        }
                    }
                }
            }
        }

        vector<vector<int>> visited(n, vector<int>(m, 0));
        // visited prevents the same cell from being added to BFS more than once.

        queue<tuple<int, int, int>> q;
        // Each item stores row, column, and route length.

        // I can start from any safe cell in the first column.
        // The starting cell counts as part of the route, so its distance is 1.
        for (int r = 0; r < n; r++) {
            if (mat[r][0] == 1 && !unsafe[r][0]) {
                q.push({r, 0, 1});
                // Distance 1 means the starting cell itself is counted.

                visited[r][0] = 1;
                // Mark it immediately so it is not inserted again.
            }
        }

        // BFS explores routes in increasing order of their length.
        while (!q.empty()) {
            auto [r, c, dist] = q.front();
            q.pop();
            // Take the next cell and its current route length.

            if (c == m - 1) {
                return dist;
                // The first last-column cell reached has the shortest route.
            }

            // Try moving in all four directions.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                // Calculate the neighboring cell.

                if (nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    mat[nr][nc] == 1 &&
                    !unsafe[nr][nc] &&
                    !visited[nr][nc]) {

                    visited[nr][nc] = 1;
                    // Mark before inserting so the cell enters the queue only once.

                    q.push({nr, nc, dist + 1});
                    // Moving to this cell adds one cell to the route length.
                }
            }
        }

        return -1;
        // No safe route could reach the rightmost column.
    }
};

```

### Java

```java

class Solution {
    int shortestPath(int[][] mat) {
        int n = mat.length;                         // Number of rows.
        int m = mat[0].length;                      // Number of columns.

        boolean[][] unsafe = new boolean[n][m];
        // unsafe[r][c] tells me whether this cell cannot be used.

        int[] dr = {-1, 1, 0, 0};
        // Row changes for up, down, left, and right.

        int[] dc = {0, 0, -1, 1};
        // Column changes for up, down, left, and right.

        // I first mark every landmine and its four direct neighbors as unsafe.
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (mat[r][c] == 0) {
                    unsafe[r][c] = true;
                    // The landmine itself is unsafe.

                    for (int d = 0; d < 4; d++) {
                        int nr = r + dr[d];
                        int nc = c + dc[d];
                        // Calculate one neighboring position.

                        if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                            unsafe[nr][nc] = true;
                            // Direct neighbors of a landmine are also unsafe.
                        }
                    }
                }
            }
        }

        boolean[][] visited = new boolean[n][m];
        // This prevents processing the same cell repeatedly.

        Queue<int[]> q = new ArrayDeque<>();
        // Each element stores row, column, and route length.

        // Every safe cell in the first column can be a starting point.
        // I use distance 1 because the starting cell counts in the route length.
        for (int r = 0; r < n; r++) {
            if (mat[r][0] == 1 && !unsafe[r][0]) {
                q.offer(new int[]{r, 0, 1});
                // Start the route with length 1.

                visited[r][0] = true;
                // Mark immediately to avoid duplicate queue entries.
            }
        }

        // BFS explores all shorter routes before longer routes.
        while (!q.isEmpty()) {
            int[] current = q.poll();
            // Remove the next cell from the queue.

            int r = current[0];                     // Current row.
            int c = current[1];                     // Current column.
            int dist = current[2];                  // Number of cells in the route so far.

            if (c == m - 1) {
                return dist;
                // The first rightmost-column cell reached gives the minimum route length.
            }

            // Try all four possible movements.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                // Calculate the next cell.

                if (nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    mat[nr][nc] == 1 &&
                    !unsafe[nr][nc] &&
                    !visited[nr][nc]) {

                    visited[nr][nc] = true;
                    // Mark before inserting so this cell is added only once.

                    q.offer(new int[]{nr, nc, dist + 1});
                    // The new cell increases the route length by one.
                }
            }
        }

        return -1;
        // BFS finished without finding a safe route to the last column.
    }
}
```

### JavaScript

```javascript

/**
 * @param {number[][]} mat
 * @return {number}
 */
class Solution {
    shortestPath(mat) {
        const n = mat.length;                       // Number of rows.
        const m = mat[0].length;                    // Number of columns.

        const unsafe = Array.from(
            { length: n },
            () => Array(m).fill(false)
        );
        // unsafe[r][c] tells me whether this cell cannot be used.

        const dr = [-1, 1, 0, 0];
        // Row changes for up, down, left, and right.

        const dc = [0, 0, -1, 1];
        // Column changes for up, down, left, and right.

        // I first mark every landmine and its four direct neighbors as unsafe.
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < m; c++) {
                if (mat[r][c] === 0) {
                    unsafe[r][c] = true;
                    // The landmine itself cannot be used.

                    for (let d = 0; d < 4; d++) {
                        const nr = r + dr[d];
                        const nc = c + dc[d];
                        // Calculate one neighboring position.

                        if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                            unsafe[nr][nc] = true;
                            // A direct neighbor of a landmine is also unsafe.
                        }
                    }
                }
            }
        }

        const visited = Array.from(
            { length: n },
            () => Array(m).fill(false)
        );
        // visited prevents the same cell from entering BFS more than once.

        const queue = [];
        let head = 0;
        // I use a pointer instead of shift(), because shift() is O(n).

        // Every safe cell in the first column is a possible starting point.
        // The starting cell counts, so its route length is 1.
        for (let r = 0; r < n; r++) {
            if (mat[r][0] === 1 && !unsafe[r][0]) {
                queue.push([r, 0, 1]);
                // Start with route length 1 because the starting cell is counted.

                visited[r][0] = true;
                // Mark immediately to prevent duplicate entries.
            }
        }

        // BFS processes routes in increasing order of their length.
        while (head < queue.length) {
            const [r, c, dist] = queue[head++];
            // Read the next BFS state.

            if (c === m - 1) {
                return dist;
                // The first last-column cell reached has the shortest route.
            }

            // Try moving in all four directions.
            for (let d = 0; d < 4; d++) {
                const nr = r + dr[d];
                const nc = c + dc[d];
                // Calculate the next cell.

                if (
                    nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    mat[nr][nc] === 1 &&
                    !unsafe[nr][nc] &&
                    !visited[nr][nc]
                ) {
                    visited[nr][nc] = true;
                    // Mark before inserting so this cell is queued only once.

                    queue.push([nr, nc, dist + 1]);
                    // Moving to the next cell increases the route length by one.
                }
            }
        }

        return -1;
        // No safe route reaches the rightmost column.
    }
};
```

### Python3

```python

from collections import deque

class Solution:
    def shortestPath(self, mat: list[list[int]]) -> int:
        n = len(mat)                              # Number of rows.
        m = len(mat[0])                           # Number of columns.

        unsafe = [[False] * m for _ in range(n)]
        # unsafe[r][c] tells me whether this cell cannot be used.

        directions = [
            (-1, 0),                              # Up.
            (1, 0),                               # Down.
            (0, -1),                              # Left.
            (0, 1)                                # Right.
        ]

        # I first mark every landmine and its four direct neighbors as unsafe.
        for r in range(n):
            for c in range(m):
                if mat[r][c] == 0:
                    unsafe[r][c] = True
                    # The landmine itself is unsafe.

                    for dr, dc in directions:
                        nr = r + dr
                        nc = c + dc
                        # Calculate one neighboring position.

                        if 0 <= nr < n and 0 <= nc < m:
                            unsafe[nr][nc] = True
                            # A direct neighbor of a landmine is also unsafe.

        visited = [[False] * m for _ in range(n)]
        # visited prevents processing the same cell more than once.

        q = deque()
        # Each queue item stores row, column, and route length.

        # Every safe cell in the first column can be a starting point.
        # I start with length 1 because the starting cell is part of the route.
        for r in range(n):
            if mat[r][0] == 1 and not unsafe[r][0]:
                q.append((r, 0, 1))
                # The first cell contributes one to the route length.

                visited[r][0] = True
                # Mark immediately so it cannot be inserted again.

        # BFS explores smaller route lengths before larger ones.
        while q:
            r, c, dist = q.popleft()
            # Get the next cell and its current route length.

            if c == m - 1:
                return dist
                # The first cell reached in the last column gives the shortest route.

            # Try all four possible movements.
            for dr, dc in directions:
                nr = r + dr
                nc = c + dc
                # Calculate the next cell.

                if (
                    0 <= nr < n and
                    0 <= nc < m and
                    mat[nr][nc] == 1 and
                    not unsafe[nr][nc] and
                    not visited[nr][nc]
                ):
                    visited[nr][nc] = True
                    # Mark before adding to avoid duplicate queue entries.

                    q.append((nr, nc, dist + 1))
                    # The new cell adds one to the route length.

        return -1
        # No safe route could reach the rightmost column.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The implementation is based on the same algorithm in all four languages. The main differences are only in syntax and the standard queue/data structure APIs.

### C++

I first get the number of rows and columns from the matrix.

Then I create an `unsafe` matrix of the same size.

I scan every cell. Whenever the value is `0`, I mark that cell as unsafe and also mark its valid four neighbors as unsafe.

I use two direction arrays to represent movement:

```text
(-1, 0) -> up
( 1, 0) -> down
( 0,-1) -> left
( 0, 1) -> right
```

After that, I create a `visited` matrix and a queue.

Every safe cell in column `0` becomes a BFS starting point. I put it into the queue with distance `1`, because the starting cell is counted in the route length.

During BFS, I remove one state from the queue.

If its column is `m - 1`, I immediately return its distance because BFS reaches cells in increasing route length.

Otherwise, I check its four neighbors.

For every valid neighbor, I mark it visited and add it to the queue with:

```text
current distance + 1
```

If the queue becomes empty without reaching the last column, I return `-1`.

### Java

The Java implementation follows exactly the same idea.

I use a `boolean[][]` for the unsafe and visited matrices because I only need to store true or false.

For BFS, I use an `ArrayDeque`.

Each queue element contains:

```text
row
column
distance
```

I initialize every safe cell in the first column with distance `1`.

One important Java detail is that I should mark a cell as visited when I add it to the queue, not when I remove it.

That prevents the same cell from being inserted multiple times.

The four-direction movement is handled using the `dr` and `dc` arrays.

### JavaScript

The JavaScript version also follows the same BFS logic.

I use nested arrays for `unsafe` and `visited`.

For the BFS queue, I use an array together with a `head` pointer.

I avoid using:

```text
queue.shift()
```

for every BFS operation because removing the first element from a JavaScript array can require shifting the remaining elements.

Instead, I keep:

```text
head = 0
```

and read:

```text
queue[head]
```

then increment `head`.

This keeps queue processing efficient.

The starting cells are inserted with distance `1`, which makes the returned answer represent the number of cells in the route.

### Python3

In Python, I use `deque` from the `collections` module for BFS.

`deque.popleft()` is efficient, so it is a natural choice for the queue.

I create two matrices:

```text
unsafe
visited
```

Then I scan the matrix and mark all landmines and their direct neighbors.

After that, every safe cell in the first column is inserted into the queue with distance `1`.

For every queue element, I test the four possible directions.

If a neighboring cell is valid, safe and unvisited, I add it with distance `dist + 1`.

When BFS reaches the final column, I return the current distance.

If no route reaches the final column, I return `-1`.

### Why BFS is used

I use BFS instead of DFS because this is a shortest path problem where every move has the same cost.

Suppose I have:

```text
Start
  |
  v
 A ---- B
 |      |
 C ---- D ---- End
```

BFS explores by distance:

```text
Distance 1 -> Start
Distance 2 -> A
Distance 3 -> B, C
Distance 4 -> D
...
```

So when BFS reaches the destination, I know that no shorter route exists.

A normal DFS does not have this property. DFS can go deep into a longer route before discovering a shorter one.

## Examples

### Example 1

Input:

```text
mat = [
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0]
]
```

Output:

```text
6
```

One shortest safe route contains 6 cells:

```text
(0,0)
   |
   v
(1,0)
   |
   v
(2,0) -> (2,1) -> (2,2)
                         |
                         v
                      (1,2)
                         |
                         v
                      (1,3)
```

The route length is:

```text
1 -> 2 -> 3 -> 4 -> 5 -> 6
```

So the answer is `6`.

### Example 2

Input:

```text
mat = [
    [1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1]
]
```

Output:

```text
-1
```

The landmine is in the middle of the grid.

Its direct neighbors are also unsafe:

```text
1  X  X  X  1
1  X  X  X  1
1  X  X  X  1
```

The safe cells on the left and right sides are separated by the unsafe region, so no safe route can reach the final column.

Therefore, I return `-1`.

### Example 3

Input:

```text
n = 7
m = 4

mat = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1]
]
```

Output:

```text
4
```

A safe route exists along the first row:

```text
(0,0) -> (0,1) -> (0,2) -> (0,3)
   1        2        3        4
```

The answer is `4`.

The important detail is that the starting cell is counted. There are three moves, but four cells in the route.

## How to Use / Run Locally

The solution can be copied into a local competitive programming environment and tested with custom input according to the platform's required input format.

### C++

Save the implementation as:

```text
solution.cpp
```

Compile it with:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

On Windows, the generated executable can be run as:

```bash
solution.exe
```

### Java

Save the implementation as:

```text
Solution.java
```

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

### JavaScript

Save the implementation as:

```text
solution.js
```

Run it with Node.js:

```bash
node solution.js
```

You can check whether Node.js is installed with:

```bash
node --version
```

### Python3

Save the implementation as:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

You can check the Python version with:

```bash
python3 --version
```

On some Windows systems, the command may be:

```bash
python solution.py
```

## Notes & Optimizations

The most important detail is to correctly interpret the required answer.

The starting cell counts as part of the route.

Therefore:

```text
Start -> Next -> Next -> End
  1       2      3      4
```

has answer `4`, not `3`.

Another important point is that I should mark unsafe cells before starting BFS.

If I only check whether `mat[r][c] == 1` during BFS, I could accidentally walk into a cell that is next to a landmine.

I also use multi-source BFS instead of running BFS separately from every safe cell in the first column.

Running BFS separately could repeat a large amount of work. Multi-source BFS lets all possible starting positions grow together in a single traversal.

I mark cells as visited when they enter the queue. This prevents duplicate queue entries and keeps BFS linear.

For JavaScript, using a `head` pointer instead of `shift()` keeps queue operations efficient.

The solution uses `O(n * m)` extra memory because of the `unsafe` and `visited` matrices. This is a reasonable tradeoff for the given constraints and keeps the implementation simple and reliable.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
