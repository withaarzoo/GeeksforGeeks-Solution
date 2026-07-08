# Towers Reaching Both Stations

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

The **Towers Reaching Both Stations** problem is a matrix traversal and graph search problem.

We are given an `n x m` matrix where each cell represents the signal strength of a communication tower.

There are two control stations:

* Station P covers the top and left boundaries of the matrix.
* Station Q covers the bottom and right boundaries of the matrix.

A signal can move from one tower to a neighbouring tower in four directions:

* Up
* Down
* Left
* Right

The signal can move only when the next tower has a signal strength less than or equal to the current tower.

The task is to count how many towers can eventually send their signal to both Station P and Station Q.

The input is the matrix of signal strengths.

The output is a single integer representing the number of towers that can reach both stations.

This problem is closely related to matrix DFS, multi-source graph traversal, reverse traversal, and the Atlantic Pacific Water Flow problem.

## Constraints

| Constraint            | Value                    |
| --------------------- | ------------------------ |
| Number of rows `n`    | `1 <= n <= 10^3`         |
| Number of columns `m` | `1 <= m <= 10^3`         |
| Tower signal strength | `1 <= mat[i][j] <= 10^3` |
| Allowed directions    | North, South, East, West |

The matrix can contain up to one million cells, so checking every possible path separately would be too slow.

## Intuition

My first thought was to start from every tower and check whether its signal could reach both stations.

That approach works logically, but it repeats the same work many times. Two nearby towers may follow almost the same path, yet I would search that path again for each tower.

The key observation is that the movement rule becomes easier when I reverse the direction of the search.

Normally, a signal can move from a tower with value `x` to a neighbouring tower with value `y` when:

`y <= x`

If I start from a station boundary and search backward, I can move from the current cell to a neighbour when:

`neighbour >= current`

This reverse traversal finds every tower that can eventually send a signal to that station.

So instead of searching from every tower, I only need two multi-source searches:

1. Start from the top and left boundaries to find all towers that can reach Station P.
2. Start from the bottom and right boundaries to find all towers that can reach Station Q.
3. Count the towers found by both searches.

This reduces the problem to two simple matrix traversals.

## Approach

I create two visited matrices.

The first matrix stores whether each tower can reach Station P.

The second matrix stores whether each tower can reach Station Q.

For Station P, I use every cell from the top row and left column as a starting point.

For Station Q, I use every cell from the bottom row and right column as a starting point.

Then I run an iterative Depth First Search from each group of starting cells.

During the reverse DFS, I check the four neighbouring cells.

I move to a neighbour only when:

1. The neighbour is inside the matrix.
2. The neighbour has not already been visited.
3. The neighbour's signal strength is greater than or equal to the current tower's strength.

The third condition is the reverse version of the original signal movement rule.

After both searches finish, I scan the entire matrix.

If a tower is marked as reachable in both visited matrices, I increase the answer.

The final count is the number of towers that can reach both Station P and Station Q.

## Data Structures Used

### Matrix

The input matrix stores the signal strength of every communication tower.

Each position `(i, j)` represents one tower.

### Two Visited Matrices

I use one visited matrix for each station.

The first one tracks all towers that can reach Station P.

The second one tracks all towers that can reach Station Q.

Two separate matrices are necessary because a tower may reach:

* Only Station P
* Only Station Q
* Both stations
* Neither station

### Stack

I use a stack for iterative DFS.

The matrix can contain up to `10^6` cells. A recursive DFS may create too many function calls and cause a stack overflow.

An explicit stack avoids that problem while keeping the same DFS logic.

### Direction Arrays

I use four direction pairs to move through the matrix:

* Down
* Up
* Right
* Left

This keeps the neighbour-checking logic short and avoids writing the same code four times.

## Operations & Behavior Summary

The algorithm works in the following order:

1. Read the number of rows and columns from the matrix.
2. Create one visited matrix for Station P.
3. Create another visited matrix for Station Q.
4. Add all top-row cells and left-column cells as starting points for Station P.
5. Run reverse DFS from those starting points.
6. During the search, move only to towers with equal or greater signal strength.
7. Add all bottom-row cells and right-column cells as starting points for Station Q.
8. Run the same reverse DFS for Station Q.
9. Scan every cell in the matrix.
10. Count a cell if both visited matrices mark it as reachable.
11. Return the final count.

In plain pseudocode, the main idea is:

```text
Find all towers that can reach P using reverse traversal
Find all towers that can reach Q using reverse traversal
Count towers present in both results
```

## Complexity

| Complexity       | Value      | Explanation                                                                                         |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n * m)` | Each cell is visited at most once during the Station P search and once during the Station Q search. |
| Space Complexity | `O(n * m)` | Two visited matrices are used, and the DFS stack may also contain matrix cells in the worst case.   |

Here, `n` is the number of rows and `m` is the number of columns in the matrix.

Even though two DFS traversals are performed, the total time is still `O(n * m)` because constant factors are ignored in Big O notation.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countCoordinates(vector<vector<int>>& mat) {
        // Store the number of rows and columns.
        int n = mat.size();
        int m = mat[0].size();

        // reachP[i][j] is true if this tower can reach Station P.
        // reachQ[i][j] is true if this tower can reach Station Q.
        vector<vector<bool>> reachP(n, vector<bool>(m, false));
        vector<vector<bool>> reachQ(n, vector<bool>(m, false));

        // These four pairs represent down, up, right, and left movement.
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};

        // This lambda runs reverse DFS from all boundary cells of one station.
        auto dfs = [&](vector<pair<int, int>>& sources,
                       vector<vector<bool>>& visited) {
            // I use a vector as an explicit stack to avoid recursion depth problems.
            vector<pair<int, int>> st;

            // Add every source cell once.
            for (auto [r, c] : sources) {
                if (!visited[r][c]) {
                    visited[r][c] = true;
                    st.push_back({r, c});
                }
            }

            // Process cells until there are no reachable cells left.
            while (!st.empty()) {
                auto [r, c] = st.back();
                st.pop_back();

                // Check all four neighbouring cells.
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d];
                    int nc = c + dc[d];

                    // Skip cells outside the matrix.
                    if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                        continue;

                    // Skip cells already found for this station.
                    if (visited[nr][nc])
                        continue;

                    // In reverse, I can move only to an equal or higher tower.
                    if (mat[nr][nc] < mat[r][c])
                        continue;

                    // This tower can also reach the same station.
                    visited[nr][nc] = true;
                    st.push_back({nr, nc});
                }
            }
        };

        // Collect the top row and left column for Station P.
        vector<pair<int, int>> sourcesP;
        for (int j = 0; j < m; j++)
            sourcesP.push_back({0, j});
        for (int i = 0; i < n; i++)
            sourcesP.push_back({i, 0});

        // Collect the bottom row and right column for Station Q.
        vector<pair<int, int>> sourcesQ;
        for (int j = 0; j < m; j++)
            sourcesQ.push_back({n - 1, j});
        for (int i = 0; i < n; i++)
            sourcesQ.push_back({i, m - 1});

        // Find all towers that can reach each station.
        dfs(sourcesP, reachP);
        dfs(sourcesQ, reachQ);

        // Count towers that can reach both stations.
        int answer = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (reachP[i][j] && reachQ[i][j])
                    answer++;
            }
        }

        return answer;
    }
};
```

### Java

```java
class Solution {
    public int countCoordinates(int[][] mat) {
        // Store the number of rows and columns.
        int n = mat.length;
        int m = mat[0].length;

        // These matrices store which towers can reach each station.
        boolean[][] reachP = new boolean[n][m];
        boolean[][] reachQ = new boolean[n][m];

        // These four pairs represent down, up, right, and left movement.
        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};

        // Build the source cells for Station P.
        java.util.ArrayDeque<int[]> stackP = new java.util.ArrayDeque<>();

        // Add every cell from the top row.
        for (int j = 0; j < m; j++) {
            if (!reachP[0][j]) {
                reachP[0][j] = true;
                stackP.push(new int[]{0, j});
            }
        }

        // Add every cell from the left column.
        for (int i = 0; i < n; i++) {
            if (!reachP[i][0]) {
                reachP[i][0] = true;
                stackP.push(new int[]{i, 0});
            }
        }

        // Run reverse DFS for Station P.
        while (!stackP.isEmpty()) {
            int[] cell = stackP.pop();
            int r = cell[0];
            int c = cell[1];

            // Check all four neighbouring cells.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];

                // Skip invalid coordinates.
                if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                    continue;

                // Skip cells already visited for Station P.
                if (reachP[nr][nc])
                    continue;

                // Reverse movement is allowed only to an equal or higher tower.
                if (mat[nr][nc] < mat[r][c])
                    continue;

                // This tower can also reach Station P.
                reachP[nr][nc] = true;
                stackP.push(new int[]{nr, nc});
            }
        }

        // Build the source cells for Station Q.
        java.util.ArrayDeque<int[]> stackQ = new java.util.ArrayDeque<>();

        // Add every cell from the bottom row.
        for (int j = 0; j < m; j++) {
            if (!reachQ[n - 1][j]) {
                reachQ[n - 1][j] = true;
                stackQ.push(new int[]{n - 1, j});
            }
        }

        // Add every cell from the right column.
        for (int i = 0; i < n; i++) {
            if (!reachQ[i][m - 1]) {
                reachQ[i][m - 1] = true;
                stackQ.push(new int[]{i, m - 1});
            }
        }

        // Run reverse DFS for Station Q.
        while (!stackQ.isEmpty()) {
            int[] cell = stackQ.pop();
            int r = cell[0];
            int c = cell[1];

            // Check all four neighbouring cells.
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];

                // Skip invalid coordinates.
                if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                    continue;

                // Skip cells already visited for Station Q.
                if (reachQ[nr][nc])
                    continue;

                // Reverse movement is allowed only to an equal or higher tower.
                if (mat[nr][nc] < mat[r][c])
                    continue;

                // This tower can also reach Station Q.
                reachQ[nr][nc] = true;
                stackQ.push(new int[]{nr, nc});
            }
        }

        // Count towers that can reach both stations.
        int answer = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (reachP[i][j] && reachQ[i][j])
                    answer++;
            }
        }

        return answer;
    }
}
```

### JavaScript

```javascript
class Solution {
    countCoordinates(mat) {
        // Store the number of rows and columns.
        const n = mat.length;
        const m = mat[0].length;

        // These matrices store which towers can reach each station.
        const reachP = Array.from({ length: n }, () => Array(m).fill(false));
        const reachQ = Array.from({ length: n }, () => Array(m).fill(false));

        // These four pairs represent down, up, right, and left movement.
        const dr = [1, -1, 0, 0];
        const dc = [0, 0, 1, -1];

        // This function runs reverse DFS from all boundary cells of one station.
        const dfs = (sources, visited) => {
            // I use an array as a stack to avoid recursive call stack problems.
            const stack = [];

            // Add every source cell once.
            for (const [r, c] of sources) {
                if (!visited[r][c]) {
                    visited[r][c] = true;
                    stack.push([r, c]);
                }
            }

            // Process every cell that can reach this station.
            while (stack.length > 0) {
                const [r, c] = stack.pop();

                // Check all four neighbouring cells.
                for (let d = 0; d < 4; d++) {
                    const nr = r + dr[d];
                    const nc = c + dc[d];

                    // Skip coordinates outside the matrix.
                    if (nr < 0 || nr >= n || nc < 0 || nc >= m)
                        continue;

                    // Skip cells already found for this station.
                    if (visited[nr][nc])
                        continue;

                    // In reverse, I can move only to an equal or higher tower.
                    if (mat[nr][nc] < mat[r][c])
                        continue;

                    // This tower can also reach the same station.
                    visited[nr][nc] = true;
                    stack.push([nr, nc]);
                }
            }
        };

        // Collect the top row and left column for Station P.
        const sourcesP = [];
        for (let j = 0; j < m; j++)
            sourcesP.push([0, j]);
        for (let i = 0; i < n; i++)
            sourcesP.push([i, 0]);

        // Collect the bottom row and right column for Station Q.
        const sourcesQ = [];
        for (let j = 0; j < m; j++)
            sourcesQ.push([n - 1, j]);
        for (let i = 0; i < n; i++)
            sourcesQ.push([i, m - 1]);

        // Find all towers that can reach each station.
        dfs(sourcesP, reachP);
        dfs(sourcesQ, reachQ);

        // Count towers that can reach both stations.
        let answer = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (reachP[i][j] && reachQ[i][j])
                    answer++;
            }
        }

        return answer;
    }
}
```

### Python3

```python
class Solution:
    def countCoordinates(self, mat):
        # Store the number of rows and columns.
        n = len(mat)
        m = len(mat[0])

        # These matrices store which towers can reach each station.
        reachP = [[False] * m for _ in range(n)]
        reachQ = [[False] * m for _ in range(n)]

        # These four pairs represent down, up, right, and left movement.
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        # This function runs reverse DFS from all boundary cells of one station.
        def dfs(sources, visited):
            # I use a list as a stack to avoid recursion depth problems.
            stack = []

            # Add every source cell once.
            for r, c in sources:
                if not visited[r][c]:
                    visited[r][c] = True
                    stack.append((r, c))

            # Process every cell that can reach this station.
            while stack:
                r, c = stack.pop()

                # Check all four neighbouring cells.
                for dr, dc in directions:
                    nr = r + dr
                    nc = c + dc

                    # Skip coordinates outside the matrix.
                    if nr < 0 or nr >= n or nc < 0 or nc >= m:
                        continue

                    # Skip cells already found for this station.
                    if visited[nr][nc]:
                        continue

                    # In reverse, I can move only to an equal or higher tower.
                    if mat[nr][nc] < mat[r][c]:
                        continue

                    # This tower can also reach the same station.
                    visited[nr][nc] = True
                    stack.append((nr, nc))

        # Collect the top row and left column for Station P.
        sourcesP = []
        for j in range(m):
            sourcesP.append((0, j))
        for i in range(n):
            sourcesP.append((i, 0))

        # Collect the bottom row and right column for Station Q.
        sourcesQ = []
        for j in range(m):
            sourcesQ.append((n - 1, j))
        for i in range(n):
            sourcesQ.append((i, m - 1))

        # Find all towers that can reach each station.
        dfs(sourcesP, reachP)
        dfs(sourcesQ, reachQ)

        # Count towers that can reach both stations.
        answer = 0
        for i in range(n):
            for j in range(m):
                if reachP[i][j] and reachQ[i][j]:
                    answer += 1

        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core algorithm is the same in C++, Java, JavaScript, and Python3. Only the syntax and stack implementation change slightly.

### Step 1: Store the Matrix Size

First, I get the number of rows and columns.

I need these values throughout the solution for boundary checks and matrix traversal.

The number of rows is `n`.

The number of columns is `m`.

Every valid cell must satisfy:

```text
0 <= row < n
0 <= column < m
```

Without this check, the program could try to access a position outside the matrix.

### Step 2: Create Two Reachability Matrices

I create two boolean matrices with the same size as the input matrix.

The first matrix stores whether a tower can reach Station P.

The second matrix stores whether a tower can reach Station Q.

Initially, every value is false because no tower has been processed yet.

When a tower is discovered during a search, its value becomes true.

I cannot use one shared visited matrix because I need to compare the two independent search results at the end.

### Step 3: Define the Four Possible Directions

A signal can move only vertically or horizontally.

So I check four neighbours for every cell:

```text
(row + 1, column)
(row - 1, column)
(row, column + 1)
(row, column - 1)
```

Diagonal movement is not allowed.

Using direction arrays makes this part easier to maintain.

### Step 4: Collect the Starting Cells for Station P

Station P covers the top and left boundaries.

So every cell in the top row can directly reach Station P.

Every cell in the left column can also directly reach Station P.

These boundary cells become the starting points of the first reverse DFS.

The top-left corner belongs to both boundaries. It may appear twice while collecting the sources, so I use the visited matrix to make sure it is processed only once.

### Step 5: Run Reverse DFS for Station P

I place all valid starting cells into the stack.

Then I repeatedly remove one cell from the stack and inspect its four neighbours.

For each neighbour, I check whether it is inside the matrix.

Next, I check whether it has already been visited.

Finally, I compare the signal strengths.

Suppose the current cell has strength `3` and a neighbouring cell has strength `5`.

The original signal can move from `5` to `3`.

So during the reversed search, I can move from `3` to `5`.

That is why the reverse condition is:

```text
neighbour strength >= current strength
```

Every neighbour that passes this condition is marked as reachable for Station P.

### Step 6: Collect the Starting Cells for Station Q

Station Q covers the bottom and right boundaries.

I use every cell from the bottom row and right column as a starting point.

The bottom-right corner belongs to both boundaries, so the visited check again prevents duplicate processing.

### Step 7: Run Reverse DFS for Station Q

I repeat the same reverse traversal.

The only difference is that the search starts from Station Q's boundaries.

After this search finishes, the second visited matrix contains every tower that can eventually send a signal to Station Q.

### Step 8: Find the Intersection

Now I have two complete reachability results.

For every cell `(i, j)`, I check:

```text
reachable from P search AND reachable from Q search
```

If both values are true, that tower can reach both stations.

I increase the answer for every such cell.

### C++ Behavior

In C++, a `vector` can be used as an explicit stack.

Adding a cell to the end is efficient, and removing the last cell is also efficient.

A lambda function can keep the DFS logic reusable, so the same traversal does not need to be written twice.

### Java Behavior

In Java, `ArrayDeque` is a good choice for an iterative DFS stack.

It provides efficient push and pop operations.

A two-dimensional `boolean` array stores the visited state for each station.

### JavaScript Behavior

In JavaScript, an array can work as a stack.

`push()` adds a new cell.

`pop()` removes the most recently added cell.

This matches the Last In, First Out behavior required for DFS.

### Python3 Behavior

In Python3, a list works efficiently as a stack when using:

```text
append()
pop()
```

The search logic stays the same as the other languages.

Using an iterative stack is safer than recursive DFS because Python has a limited recursion depth.

## Examples

### Example 1

Input:

```text
mat = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4]
]
```

Expected Output:

```text
7
```

Brief trace:

The first reverse traversal starts from the top and left boundaries and marks every tower that can reach Station P.

The second reverse traversal starts from the bottom and right boundaries and marks every tower that can reach Station Q.

After comparing both visited matrices, seven towers appear in both results.

So the final answer is `7`.

### Example 2

Input:

```text
mat = [
  [2, 2],
  [2, 2]
]
```

Expected Output:

```text
4
```

Brief trace:

Every tower has the same signal strength.

Since equal-strength movement is allowed, every tower can connect through the matrix to both station boundaries.

All four towers are counted.

### Example 3

Input:

```text
mat = [
  [1]
]
```

Expected Output:

```text
1
```

Brief trace:

The matrix contains only one tower.

That tower lies on the top, bottom, left, and right boundaries at the same time.

It can directly reach both stations.

So the answer is `1`.

## How to Use / Run Locally

Create a separate source file for the language you want to test.

The solution classes are written in the GeeksforGeeks format, so the platform provides the input handling automatically. If you run the code locally, you may need to add your own `main` function or test code.

### Run the C++ Solution

Save the code in a file named:

```text
solution.cpp
```

Compile it:

```bash
g++ solution.cpp -o solution
```

Run it:

```bash
./solution
```

On Windows, run:

```bash
solution.exe
```

### Run the Java Solution

Save the code in:

```text
Solution.java
```

Compile it:

```bash
javac Solution.java
```

Run it:

```bash
java Solution
```

Make sure the file name matches the public class name if you add a public class for local testing.

### Run the JavaScript Solution

Save the code in:

```text
solution.js
```

Make sure Node.js is installed.

Run the file with:

```bash
node solution.js
```

For local testing, add a sample matrix and print the returned answer.

### Run the Python3 Solution

Save the code in:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

On some systems, the command may be:

```bash
python solution.py
```

For local testing, create a matrix, call `countCoordinates`, and print the result.

## Notes & Optimizations

The most important optimization is reversing the direction of the search.

A direct approach that starts from every tower would repeat many paths and become too slow for a large matrix.

The multi-source DFS approach processes each cell only a constant number of times.

Iterative DFS is preferred over recursive DFS because the matrix can contain up to one million cells. A long recursive path may exceed the recursion limit or call stack size.

Breadth First Search can also solve this problem.

Instead of a stack, I could use a queue. The final time and space complexity would remain `O(n * m)`.

The order in which cells are visited does not matter. I only need to know whether each cell is reachable.

Equal signal strengths must be allowed during traversal. The original rule says the next tower can have a signal strength less than or equal to the current tower. Because of that, the reverse condition must use greater than or equal to, not strictly greater than.

Single-row and single-column matrices also work with the same logic. Some boundary cells may belong to both stations, and the visited checks handle these duplicates correctly.

The solution is a useful example of reverse graph traversal, multi-source DFS, matrix reachability, and finding the intersection of two reachable sets.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
