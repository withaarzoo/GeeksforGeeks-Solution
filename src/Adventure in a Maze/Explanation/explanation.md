# Adventure in a Maze

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

Adventure in a Maze is a dynamic programming problem based on an `n x n` grid.

Each cell contains one of three values:

* `1` means I can move Right only.
* `2` means I can move Down only.
* `3` means I can move either Right or Down.

I start from the top-left cell `(0, 0)` and need to reach the bottom-right cell `(n - 1, n - 1)`.

I must follow the movement rule of every cell I visit. Moving outside the grid is not allowed.

For every valid path, the Adventure value is the sum of all cell values visited on that path, including the starting and ending cells.

The task is to find two things:

1. The total number of distinct valid paths from Entry to Exit.
2. The maximum possible Adventure among all valid paths.

The final answer is returned as:

```text
[totalPaths, maxAdventure]
```

The number of paths must be calculated modulo `10^9 + 7`.

If the destination cannot be reached at all, the expected result is:

```text
[0, 0]
```

This repository contains an optimized dynamic programming solution for the Adventure in a Maze problem in C++, Java, JavaScript, and Python3.

## Constraints

| Constraint      | Description                                |
| --------------- | ------------------------------------------ |
| `1 <= n <= 100` | The grid contains `n` rows and `n` columns |
| `grid[i][j]`    | Each cell contains only `1`, `2`, or `3`   |
| Movement        | Only Right and Down are allowed            |
| Path Count      | Returned modulo `10^9 + 7`                 |
| Adventure       | No modulo is required                      |

## Intuition

My first observation is that I can never move Left or Up.

So once I leave a cell, I can never come back to it. This makes the grid a natural fit for dynamic programming.

When I reach a cell `(i, j)`, there are only two possible ways I could have arrived there:

* From the left: `(i, j - 1)`
* From the top: `(i - 1, j)`

The important part is checking whether those previous cells actually allow the required movement.

For a move from the left, the left cell must contain `1` or `3`.

For a move from the top, the top cell must contain `2` or `3`.

I then keep two pieces of information for every reachable cell:

* How many valid paths reach it.
* What is the maximum Adventure value among those paths.

This lets me calculate both required answers during the same grid traversal.

There is one important edge case. If the destination cannot be reached, I should not return the internal unreachable marker as the answer. The problem expects `[0, 0]`.

## Approach

I use dynamic programming with two arrays.

The first array stores the number of valid paths reaching each column.

The second array stores the maximum Adventure value for reaching each column.

I process the grid row by row and each row from left to right.

For the current cell `(i, j)`, the previous value at column `j` represents the cell directly above it.

The value at column `j - 1` represents the cell directly to its left.

For the left transition, I check whether the left cell contains `1` or `3`.

For the top transition, I check whether the top cell contains `2` or `3`.

If a transition is valid, I add its path count to the current path count.

For Adventure, I add the current cell's value to the maximum Adventure of the selected predecessor.

If both directions are possible, I keep the larger Adventure value.

The path count is always taken modulo `10^9 + 7`.

I use `-1` internally to mark an unreachable cell. At the end, if the exit still has `-1`, I return `[0, 0]`.

## Data Structures Used

### `ways[]`

This array stores the number of valid ways to reach each column.

It is reused for every row, which reduces the extra space from `O(n²)` to `O(n)`.

### `best[]`

This array stores the maximum Adventure value for reaching each column.

A value of `-1` means that the corresponding cell is currently unreachable.

### Why only one-dimensional arrays?

For a cell `(i, j)`, I only need information from:

* The left cell `(i, j - 1)`
* The top cell `(i - 1, j)`

I do not need the complete DP table after a row has been processed.

So I can overwrite each column's old value after calculating its new value.

## Operations & Behavior Summary

The algorithm works in the following order:

1. Create the `ways` array for counting paths.
2. Create the `best` array for maximum Adventure values.
3. Initialize the starting cell with one path.
4. Set its Adventure to the value of the starting cell.
5. Traverse the grid from top-left to bottom-right.
6. For every cell, check whether it can be reached from the left.
7. If the left move is valid, add its path count and update the maximum Adventure.
8. Check whether the cell can be reached from the top.
9. If the top move is valid, add its path count and update the maximum Adventure.
10. Store the newly calculated state for the current cell.
11. Continue until the bottom-right cell is processed.
12. If the exit is unreachable, return `[0, 0]`.
13. Otherwise, return the total path count and maximum Adventure.

In simple pseudocode, the idea is:

```text
initialize start cell

for every row:
    for every column:
        if current cell is start:
            continue

        current paths = 0
        current best = unreachable

        if left cell can move Right:
            add left paths
            update best Adventure

        if top cell can move Down:
            add top paths
            update best Adventure

        save current paths and best Adventure

if exit is unreachable:
    return [0, 0]

return [number of paths, maximum Adventure]
```

## Complexity

| Type             | Complexity | Explanation                                                                                 |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n²)`    | I visit every cell of the `n x n` grid once and perform constant-time checks for each cell. |
| Space Complexity | `O(n)`     | I use two arrays of size `n` instead of storing a complete `n x n` DP table.                |

The optimized one-dimensional DP is useful here because `n` can be as large as `100`, while still keeping the implementation simple.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> findWays(vector<vector<int>>& grid) {
        int n = grid.size(); // Store the size of the n x n grid.
        const long long MOD = 1000000007LL; // Required modulo for the path count.

        // ways[j] stores the number of ways to reach column j.
        // Before processing a cell, it represents the top cell's value.
        vector<long long> ways(n, 0);

        // best[j] stores the maximum Adventure to reach column j.
        // -1 means that the cell is currently unreachable.
        vector<int> best(n, -1);

        // The entry cell is always the starting point.
        ways[0] = 1;

        // The Adventure starts with the value of the entry cell.
        best[0] = grid[0][0];

        // Process the grid row by row.
        for (int i = 0; i < n; ++i) {

            // Process every column from left to right.
            for (int j = 0; j < n; ++j) {

                // The starting cell has already been initialized.
                if (i == 0 && j == 0) {
                    continue;
                }

                // These variables store the new DP state for (i, j).
                long long currentWays = 0;
                int currentBest = -1;

                // Check whether we can enter (i, j) from the left.
                if (j > 0 &&
                    (grid[i][j - 1] == 1 || grid[i][j - 1] == 3) &&
                    best[j - 1] != -1) {

                    // Every path reaching the left cell can continue here.
                    currentWays = (currentWays + ways[j - 1]) % MOD;

                    // Add the current cell's value to the best left path.
                    currentBest = max(
                        currentBest,
                        best[j - 1] + grid[i][j]
                    );
                }

                // Check whether we can enter (i, j) from the top.
                // ways[j] and best[j] still contain the previous row's values.
                if (i > 0 &&
                    (grid[i - 1][j] == 2 || grid[i - 1][j] == 3) &&
                    best[j] != -1) {

                    // Every path reaching the top cell can continue here.
                    currentWays = (currentWays + ways[j]) % MOD;

                    // Add the current cell's value to the best top path.
                    currentBest = max(
                        currentBest,
                        best[j] + grid[i][j]
                    );
                }

                // Replace the old top state with the current cell's state.
                ways[j] = currentWays;
                best[j] = currentBest;
            }
        }

        // If the exit cannot be reached, both required answers are zero.
        if (best[n - 1] == -1) {
            return {0, 0};
        }

        // Return total valid paths and maximum Adventure.
        return {
            (int)ways[n - 1],
            best[n - 1]
        };
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> findWays(int[][] grid) {
        int n = grid.length; // Store the size of the n x n grid.
        final long MOD = 1000000007L; // Required modulo for the path count.

        // ways[j] stores the number of ways to reach column j.
        // Before processing a cell, it represents the top cell's value.
        long[] ways = new long[n];

        // best[j] stores the maximum Adventure to reach column j.
        // -1 means that the cell is currently unreachable.
        int[] best = new int[n];

        // Initially, every cell is considered unreachable.
        Arrays.fill(best, -1);

        // The entry cell is the only starting position.
        ways[0] = 1;

        // The starting Adventure includes the entry cell's value.
        best[0] = grid[0][0];

        // Process the grid row by row.
        for (int i = 0; i < n; i++) {

            // Process every column from left to right.
            for (int j = 0; j < n; j++) {

                // The starting cell has already been initialized.
                if (i == 0 && j == 0) {
                    continue;
                }

                // Store the new state for the current cell.
                long currentWays = 0;
                int currentBest = -1;

                // Check whether the current cell can be reached from the left.
                if (j > 0 &&
                    (grid[i][j - 1] == 1 || grid[i][j - 1] == 3) &&
                    best[j - 1] != -1) {

                    // Add all paths coming from the left.
                    currentWays = (currentWays + ways[j - 1]) % MOD;

                    // Update the best Adventure using the left cell.
                    currentBest = Math.max(
                        currentBest,
                        best[j - 1] + grid[i][j]
                    );
                }

                // Check whether the current cell can be reached from the top.
                // best[j] still represents the previous row at this point.
                if (i > 0 &&
                    (grid[i - 1][j] == 2 || grid[i - 1][j] == 3) &&
                    best[j] != -1) {

                    // Add all paths coming from the top.
                    currentWays = (currentWays + ways[j]) % MOD;

                    // Update the best Adventure using the top cell.
                    currentBest = Math.max(
                        currentBest,
                        best[j] + grid[i][j]
                    );
                }

                // Store the newly calculated state for this cell.
                ways[j] = currentWays;
                best[j] = currentBest;
            }
        }

        // If the exit is unreachable, the required answer is [0, 0].
        if (best[n - 1] == -1) {
            ArrayList<Integer> answer = new ArrayList<>();
            answer.add(0);
            answer.add(0);
            return answer;
        }

        // Create the result in the required format.
        ArrayList<Integer> answer = new ArrayList<>();

        // Add the total number of valid paths.
        answer.add((int) ways[n - 1]);

        // Add the maximum Adventure.
        answer.add(best[n - 1]);

        // Return [totalPaths, maxAdventure].
        return answer;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} grid
 * @return {number[]}
 */

class Solution {
    findWays(grid) {
        const n = grid.length; // Store the size of the n x n grid.
        const MOD = 1000000007; // Required modulo for the path count.

        // ways[j] stores the number of ways to reach column j.
        // It represents the top cell until the current cell is processed.
        const ways = new Array(n).fill(0);

        // best[j] stores the maximum Adventure for column j.
        // -1 means that the cell is unreachable.
        const best = new Array(n).fill(-1);

        // There is exactly one way to start at the entry cell.
        ways[0] = 1;

        // Include the entry cell in the Adventure.
        best[0] = grid[0][0];

        // Process rows from top to bottom.
        for (let i = 0; i < n; i++) {

            // Process columns from left to right.
            for (let j = 0; j < n; j++) {

                // The starting cell has already been initialized.
                if (i === 0 && j === 0) {
                    continue;
                }

                // Store the new state for the current cell.
                let currentWays = 0;
                let currentBest = -1;

                // Check whether we can move into this cell from the left.
                if (
                    j > 0 &&
                    (grid[i][j - 1] === 1 || grid[i][j - 1] === 3) &&
                    best[j - 1] !== -1
                ) {
                    // Add all paths reaching the left cell.
                    currentWays =
                        (currentWays + ways[j - 1]) % MOD;

                    // Update the maximum Adventure through the left cell.
                    currentBest = Math.max(
                        currentBest,
                        best[j - 1] + grid[i][j]
                    );
                }

                // Check whether we can move into this cell from the top.
                // best[j] still contains the previous row's state.
                if (
                    i > 0 &&
                    (grid[i - 1][j] === 2 || grid[i - 1][j] === 3) &&
                    best[j] !== -1
                ) {
                    // Add all paths reaching the top cell.
                    currentWays =
                        (currentWays + ways[j]) % MOD;

                    // Update the maximum Adventure through the top cell.
                    currentBest = Math.max(
                        currentBest,
                        best[j] + grid[i][j]
                    );
                }

                // Replace the old state with the current cell's state.
                ways[j] = currentWays;
                best[j] = currentBest;
            }
        }

        // No valid path means both answers must be zero.
        if (best[n - 1] === -1) {
            return [0, 0];
        }

        // Return total paths and maximum Adventure.
        return [
            ways[n - 1],
            best[n - 1]
        ];
    }
}
```

### Python3

```python
class Solution:
    def findWays(self, grid):
        n = len(grid)  # Store the size of the n x n grid.
        MOD = 10**9 + 7  # Required modulo for the path count.

        # ways[j] stores the number of ways to reach column j.
        # Before updating a cell, it represents the top cell.
        ways = [0] * n

        # best[j] stores the maximum Adventure for column j.
        # -1 means that the cell is unreachable.
        best = [-1] * n

        # There is exactly one way to start at the entry cell.
        ways[0] = 1

        # Include the entry cell in the initial Adventure.
        best[0] = grid[0][0]

        # Process rows from top to bottom.
        for i in range(n):

            # Process columns from left to right.
            for j in range(n):

                # The starting cell has already been initialized.
                if i == 0 and j == 0:
                    continue

                # Store the newly calculated state for this cell.
                current_ways = 0
                current_best = -1

                # Check whether the current cell can be reached from the left.
                if (
                    j > 0
                    and grid[i][j - 1] in (1, 3)
                    and best[j - 1] != -1
                ):
                    # Add all paths that reach the left cell.
                    current_ways = (
                        current_ways + ways[j - 1]
                    ) % MOD

                    # Update the maximum Adventure through the left cell.
                    current_best = max(
                        current_best,
                        best[j - 1] + grid[i][j]
                    )

                # Check whether the current cell can be reached from the top.
                # best[j] still represents the previous row here.
                if (
                    i > 0
                    and grid[i - 1][j] in (2, 3)
                    and best[j] != -1
                ):
                    # Add all paths that reach the top cell.
                    current_ways = (
                        current_ways + ways[j]
                    ) % MOD

                    # Update the maximum Adventure through the top cell.
                    current_best = max(
                        current_best,
                        best[j] + grid[i][j]
                    )

                # Store the newly calculated state.
                ways[j] = current_ways
                best[j] = current_best

        # If the exit is unreachable, the answer is [0, 0].
        if best[n - 1] == -1:
            return [0, 0]

        # Return the total paths and maximum Adventure.
        return [ways[n - 1], best[n - 1]]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### C++

The C++ implementation starts by reading the size of the grid and defining the modulo value `1000000007`.

I create two vectors of size `n`.

The first vector stores path counts.

The second vector stores maximum Adventure values.

I initialize every Adventure value to `-1`. This gives me a simple way to identify unreachable cells.

The starting cell is initialized with one path, and its Adventure is equal to `grid[0][0]`.

I then use nested loops to process the grid.

For every cell other than `(0, 0)`, I create temporary values for the current number of paths and the current maximum Adventure.

I first check the left cell.

If the left cell contains `1` or `3`, it allows a Right movement. If that cell is reachable, all paths reaching it can continue to the current cell.

I add those paths using modulo arithmetic.

For the Adventure value, I add the current cell's value to the best Adventure from the left.

I then perform the same check for the top cell.

A top cell containing `2` or `3` allows a Down movement.

After checking both directions, I overwrite the current column's stored state.

This overwrite is safe because the left value has already been saved in the temporary variables, while the top value was read before the overwrite.

At the end, I check whether the destination is still unreachable.

If it is, I return `{0, 0}`.

Otherwise, I return the stored path count and maximum Adventure.

### Java

The Java version follows exactly the same dynamic programming idea.

I use a `long[]` array for path counts because the number of paths can become large before the modulo operation.

The Adventure array uses `int` because the maximum Adventure is small for the given constraints.

I initialize the Adventure array with `-1` using `Arrays.fill()`.

The grid is processed row by row.

For every cell, I first calculate its new path count and maximum Adventure using temporary variables.

This is important because `ways[j]` and `best[j]` still contain information about the cell above the current cell.

After both the left and top transitions are checked, I replace those values with the state of the current cell.

If the bottom-right cell remains unreachable, I return an `ArrayList` containing `0` and `0`.

Otherwise, I put the final path count and maximum Adventure into the result list.

### JavaScript

The JavaScript implementation uses normal arrays to represent the one-dimensional DP states.

I initialize `ways` with zeros and `best` with `-1`.

The JavaScript `Number` type can safely handle the values involved in this problem, and the path count is reduced using the required modulo after every addition.

For every grid cell, I calculate temporary values named `currentWays` and `currentBest`.

The left transition uses the already updated value at `j - 1`.

The top transition uses the old value at `j`, because the current column has not yet been overwritten.

After both transitions are processed, the current state is stored back into `ways[j]` and `best[j]`.

Finally, I check whether the exit is reachable.

If not, I return `[0, 0]`.

### Python3

The Python implementation uses two lists of length `n`.

`ways` stores path counts, while `best` stores the maximum Adventure.

I use `-1` in `best` to represent an unreachable state.

The starting cell is initialized before the main traversal.

For every other cell, I create `current_ways` and `current_best`.

I check the left transition by verifying that the left cell contains `1` or `3`.

Then I check the top transition by verifying that the top cell contains `2` or `3`.

Whenever a valid transition exists, I update the current path count and maximum Adventure.

After both directions are processed, the current values replace the old values in the arrays.

At the end, an unreachable destination produces `[0, 0]`; otherwise, the final DP state is returned.

## Examples

### Example 1

Input:

```text
grid = [
    [3, 2],
    [1, 3]
]
```

Output:

```text
[2, 8]
```

There are two valid paths.

The first path is:

```text
(0,0) -> (0,1) -> (1,1)
```

Its Adventure is:

```text
3 + 2 + 3 = 8
```

The second path is:

```text
(0,0) -> (1,0) -> (1,1)
```

Its Adventure is:

```text
3 + 1 + 3 = 7
```

So there are `2` valid paths and the maximum Adventure is `8`.

### Example 2

Input:

```text
grid = [
    [1, 1, 3, 2, 1],
    [3, 2, 2, 2, 1],
    [1, 3, 3, 1, 3],
    [1, 2, 3, 1, 2],
    [1, 1, 1, 3, 1]
]
```

Output:

```text
[4, 18]
```

The DP finds four different valid paths from the top-left cell to the bottom-right cell.

Their Adventure values are:

```text
18, 17, 17, 16
```

Therefore:

```text
totalPaths = 4
maxAdventure = 18
```

### Example 3

Input:

```text
grid = [
    [2, 3, 3, 3, 1],
    [3, 2, 2, 2, 3],
    [2, 2, 1, 1, 3],
    [2, 1, 2, 3, 2],
    [2, 2, 3, 2, 3]
]
```

Output:

```text
[0, 0]
```

In this grid, the movement restrictions prevent any valid path from reaching the bottom-right cell.

The path count is therefore `0`.

Since there is no valid path, the maximum Adventure is also reported as `0`.

This case is important because an internal unreachable value such as `-1` must not be returned as the final answer.

## How to Use / Run Locally

The repository contains the same algorithm implemented in four programming languages.

### C++

Save the solution as:

```text
solution.cpp
```

Compile it using:

```text
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```text
./solution
```

If your solution is written specifically for GeeksforGeeks, keep the required `Solution` class and test it using the platform's driver code.

### Java

Save the solution as:

```text
Solution.java
```

Compile it using:

```text
javac Solution.java
```

Run it using:

```text
java Solution
```

For GeeksforGeeks, the platform provides the driver code, so normally only the `Solution` class needs to be submitted.

### JavaScript

Save the solution as:

```text
solution.js
```

Run it with Node.js:

```text
node solution.js
```

The GeeksforGeeks version uses the required `Solution` class and `findWays()` method.

### Python3

Save the solution as:

```text
solution.py
```

Run it using:

```text
python3 solution.py
```

For an online judge, submit the required `Solution` class and method without adding unnecessary input/output handling unless the platform specifically asks for it.

## Notes & Optimizations

The most important detail is that the direction is determined by the cell I am leaving.

For example, to move from `(i, j - 1)` to `(i, j)`, I check:

```text
grid[i][j - 1]
```

not:

```text
grid[i][j]
```

Similarly, to move from `(i - 1, j)` to `(i, j)`, I check:

```text
grid[i - 1][j]
```

The solution handles unreachable cells using `-1` internally.

However, `-1` should never be returned as the maximum Adventure. If the exit is unreachable, the correct result is `[0, 0]`.

The path count needs modulo `10^9 + 7` because the number of possible paths can become very large.

The maximum Adventure does not need modulo because its maximum possible value is small for `n <= 100`.

A straightforward two-dimensional DP solution also works and takes `O(n²)` space. I prefer the one-dimensional version because every cell only depends on the left and top states, so storing the complete DP table is unnecessary.

The movement restrictions also make this problem a good example of grid dynamic programming. Since every move goes either Right or Down, there are no cycles, and I can process the cells in topological order simply by going from top-left to bottom-right.

The main SEO keywords covered by this solution include Adventure in a Maze, GeeksforGeeks solution, DSA problem solution, dynamic programming, grid DP, path counting, maximum path sum, optimized DP, C++, Java, JavaScript, Python3, competitive programming, and coding interview preparation.

## Author

Md Aarzoo Islam — [Instagram](https://www.instagram.com/code.with.aarzoo/?utm_source=chatgpt.com)
