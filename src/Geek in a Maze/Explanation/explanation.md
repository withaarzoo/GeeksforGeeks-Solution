# Geek in a Maze

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

Geek is placed inside a maze represented by a 2D matrix of size `n × m`.

Each cell is either an empty cell, represented by `'.'`, or an obstacle, represented by `'#'`. Geek starts at position `(r, c)` and can move up, down, left, or right.

The movement rules are slightly different from a normal maze traversal problem:

* Geek can make at most `u` upward moves.
* Geek can make at most `d` downward moves.
* There is no limit on left or right moves.
* Geek cannot move outside the maze.
* Geek cannot visit an obstacle.
* If the starting cell is an obstacle, the answer is `0`.

The goal is to find the total number of distinct empty cells Geek can visit.

This problem is a graph traversal problem where the important part is not the total number of moves. Instead, I need to track how many upward and downward moves are required to reach each cell.

## Constraints

| Constraint             | Value          |
| ---------------------- | -------------- |
| Number of rows         | `1 ≤ n ≤ 10^6` |
| Number of columns      | `1 ≤ m ≤ 10^6` |
| Starting row           | `0 ≤ r < n`    |
| Starting column        | `0 ≤ c < m`    |
| Maximum upward moves   | `0 ≤ u ≤ 10^6` |
| Maximum downward moves | `0 ≤ d ≤ 10^6` |

The solution needs to avoid checking every possible path separately because the maze can be large and many paths may reach the same cell.

## Intuition

My first instinct was to use BFS because the maze can be viewed as a graph where every empty cell is connected to its valid adjacent cells.

But I noticed that normal BFS does not directly solve the problem. Reaching the same cell through different paths can use a different number of upward moves, and that matters because upward movement is limited.

Then I noticed something useful. If I know the minimum number of upward moves used to reach a cell, I can calculate the number of downward moves from the row difference.

For a cell at row `i`:

`downMoves = upMoves + (i - r)`

So I do not need to store both values separately.

This turns the problem into finding the minimum number of upward moves needed to reach every cell. Moving upward has a cost of `1`, while moving down, left, or right has a cost of `0`.

That makes 0-1 BFS a natural fit for this Geek in a Maze solution.

## Approach

I use 0-1 BFS to find the minimum number of upward moves needed to reach every reachable empty cell.

The approach works like this:

1. Check whether the starting cell is an obstacle. If it is, return `0`.
2. Create a distance matrix where each cell stores the minimum number of upward moves needed to reach it.
3. Start from `(r, c)` with `0` upward moves.
4. Process all four possible directions.
5. Moving upward adds a cost of `1`.
6. Moving down, left, or right adds a cost of `0`.
7. Use a deque so that zero-cost moves are processed before one-cost moves.
8. After 0-1 BFS finishes, calculate the downward moves required for every reachable cell.
9. Count the cell only if both the upward and downward limits are satisfied.

This gives an efficient solution for the maze traversal problem without storing every possible movement combination.

## Data Structures Used

### Distance Matrix

I use a 2D distance matrix to store the minimum number of upward moves needed to reach each cell.

This is important because the same cell can be reached through multiple paths. I only want to keep the path that uses the fewest upward moves.

### Deque

I use a deque for 0-1 BFS.

A move with cost `0` is added to the front of the deque. A move with cost `1` is added to the back.

This allows the algorithm to process cheaper paths first without using a priority queue.

### Direction Arrays

I use small direction arrays to represent the four possible moves: up, down, left, and right.

This keeps the maze traversal logic simple and avoids repeating similar code.

## Operations & Behavior Summary

The algorithm starts by checking whether Geek can stand on the starting cell.

Next, it treats every empty cell as a node in a graph.

For each reachable cell, it checks its four neighbors.

* An upward move increases the upward move count.
* A downward move does not increase the upward move count.
* Left and right moves also do not increase it.
* Obstacles and cells outside the maze are ignored.

The algorithm always keeps the smallest known number of upward moves for every cell.

After all reachable cells are processed, it calculates how many downward moves are required to reach each one.

Finally, it counts every cell where both movement limits are valid.

## Complexity

| Type             | Complexity | Explanation                                                                                                |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n × m)` | Each reachable cell and its adjacent moves are processed a constant number of times using 0-1 BFS.         |
| Space Complexity | `O(n × m)` | The distance matrix stores information for the maze cells, and the deque can also contain reachable cells. |

Here, `n` is the number of rows and `m` is the number of columns in the maze.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int numberOfCells(int r, int c, int u, int d, vector<vector<char>> &mat) {
        // Store the number of rows and columns for easy access.
        int n = mat.size();
        int m = mat[0].size();

        // If the starting cell itself is blocked, Geek cannot visit any cell.
        if (mat[r][c] == '#') {
            return 0;
        }

        // INF represents a cell that has not been reached yet.
        const int INF = 1e9;

        // dist[i][j] stores the minimum number of upward moves
        // needed to reach cell (i, j).
        vector<vector<int>> dist(n, vector<int>(m, INF));

        // A deque is used for 0-1 BFS because every edge has cost 0 or 1.
        deque<pair<int, int>> dq;

        // Geek starts here without making any upward move.
        dist[r][c] = 0;
        dq.push_front({r, c});

        // Direction arrays for up, down, left, and right.
        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};

        // Process cells until there are no more reachable states.
        while (!dq.empty()) {
            // Take the cell with the current smallest useful upward cost.
            auto [x, y] = dq.front();
            dq.pop_front();

            // Try all four adjacent cells.
            for (int dir = 0; dir < 4; dir++) {
                int nx = x + dr[dir];
                int ny = y + dc[dir];

                // Ignore cells outside the maze.
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
                    continue;
                }

                // Geek cannot move through an obstacle.
                if (mat[nx][ny] == '#') {
                    continue;
                }

                // Only an upward move increases the number of upward moves.
                int cost = (dir == 0 ? 1 : 0);

                // Update the cell only if this path uses fewer upward moves.
                if (dist[x][y] + cost < dist[nx][ny]) {
                    dist[nx][ny] = dist[x][y] + cost;

                    // Cost 0 edges are processed first to maintain 0-1 BFS order.
                    if (cost == 0) {
                        dq.push_front({nx, ny});
                    } else {
                        // Cost 1 edges are processed after all current cost 0 paths.
                        dq.push_back({nx, ny});
                    }
                }
            }
        }

        // Count every cell that satisfies both movement limits.
        int answer = 0;

        // Check all cells in the maze.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // Skip unreachable cells and obstacles.
                if (mat[i][j] == '#' || dist[i][j] == INF) {
                    continue;
                }

                // dist[i][j] is the minimum number of upward moves.
                long long upMoves = dist[i][j];

                // Vertical displacement determines downward moves.
                long long downMoves = upMoves + (i - r);

                // Count the cell only if both limits are respected.
                if (upMoves <= u && downMoves <= d) {
                    answer++;
                }
            }
        }

        // Return the number of distinct reachable empty cells.
        return answer;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int numberOfCells(int r, int c, int u, int d, char[][] mat) {
        // Store the maze dimensions.
        int n = mat.length;
        int m = mat[0].length;

        // Geek cannot start from an obstacle.
        if (mat[r][c] == '#') {
            return 0;
        }

        // INF marks cells that have not been reached.
        final int INF = Integer.MAX_VALUE / 2;

        // dist[i][j] stores the minimum upward moves needed to reach (i, j).
        int[][] dist = new int[n][m];

        // Initialize every cell as unreachable.
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], INF);
        }

        // ArrayDeque works as the deque required by 0-1 BFS.
        Deque<Integer> deque = new ArrayDeque<>();

        // Start with zero upward moves.
        dist[r][c] = 0;
        deque.offerFirst(r * m + c);

        // Direction arrays for up, down, left, and right.
        int[] dr = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};

        // Run 0-1 BFS.
        while (!deque.isEmpty()) {
            // Decode the row and column from the stored cell index.
            int id = deque.pollFirst();
            int x = id / m;
            int y = id % m;

            // Try all four adjacent cells.
            for (int dir = 0; dir < 4; dir++) {
                int nx = x + dr[dir];
                int ny = y + dc[dir];

                // Ignore positions outside the maze.
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
                    continue;
                }

                // Obstacles cannot be visited.
                if (mat[nx][ny] == '#') {
                    continue;
                }

                // Moving upward costs 1, while every other move costs 0.
                int cost = (dir == 0) ? 1 : 0;

                // Relax the path if fewer upward moves are required.
                if (dist[x][y] + cost < dist[nx][ny]) {
                    dist[nx][ny] = dist[x][y] + cost;

                    // Put cost 0 moves at the front for immediate processing.
                    if (cost == 0) {
                        deque.offerFirst(nx * m + ny);
                    } else {
                        // Put cost 1 moves at the back.
                        deque.offerLast(nx * m + ny);
                    }
                }
            }
        }

        // Store the number of cells Geek can actually visit.
        int answer = 0;

        // Check every cell after shortest paths are known.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                // Skip blocked or unreachable cells.
                if (mat[i][j] == '#' || dist[i][j] == INF) {
                    continue;
                }

                // Get the minimum number of upward moves.
                long upMoves = dist[i][j];

                // Calculate downward moves from the final row displacement.
                long downMoves = upMoves + (i - r);

                // Count the cell only when both movement limits are satisfied.
                if (upMoves <= u && downMoves <= d) {
                    answer++;
                }
            }
        }

        // Return the final count.
        return answer;
    }
}
```

### JavaScript

```javascript
/*
 * @param {number} r
 * @param {number} c
 * @param {number} u
 * @param {number} d
 * @param {character[][]} mat
 * @return {number}
 */

class Solution {
    numberOfCells(r, c, u, d, mat) {
        // Store the number of rows and columns.
        const n = mat.length;
        const m = mat[0].length;

        // Geek cannot visit anything if the starting cell is blocked.
        if (mat[r][c] === '#') {
            return 0;
        }

        // INF represents a cell that has not been reached.
        const INF = Number.MAX_SAFE_INTEGER;

        // dist[i * m + j] stores the minimum upward moves for cell (i, j).
        const dist = new Array(n * m).fill(INF);

        // A circular deque is used to support O(1) insertion at both ends.
        // The capacity is enough for all possible queued relaxations in the grid.
        const capacity = 4 * n * m + 5;
        const deque = new Int32Array(capacity);
        let front = 2 * n * m;
        let back = front;

        // Helper function to move an index backward in the circular deque.
        const prevIndex = (index) => (index - 1 + capacity) % capacity;

        // Helper function to move an index forward in the circular deque.
        const nextIndex = (index) => (index + 1) % capacity;

        // Store the starting cell with zero upward moves.
        const start = r * m + c;
        dist[start] = 0;
        deque[back] = start;
        back = nextIndex(back);

        // Direction arrays for up, down, left, and right.
        const dr = [-1, 1, 0, 0];
        const dc = [0, 0, -1, 1];

        // Continue until the deque becomes empty.
        while (front !== back) {
            // Remove a cell from the front.
            const id = deque[front];
            front = nextIndex(front);

            // Convert the one-dimensional index back to row and column.
            const x = Math.floor(id / m);
            const y = id % m;

            // Try all four possible adjacent cells.
            for (let dir = 0; dir < 4; dir++) {
                const nx = x + dr[dir];
                const ny = y + dc[dir];

                // Ignore cells outside the maze.
                if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
                    continue;
                }

                // Ignore obstacles.
                if (mat[nx][ny] === '#') {
                    continue;
                }

                // Only moving upward increases the upward move count.
                const cost = dir === 0 ? 1 : 0;
                const nextId = nx * m + ny;

                // Relax the path if this route uses fewer upward moves.
                if (dist[id] + cost < dist[nextId]) {
                    dist[nextId] = dist[id] + cost;

                    // A cost 0 move goes to the front of the deque.
                    if (cost === 0) {
                        front = prevIndex(front);
                        deque[front] = nextId;
                    } else {
                        // A cost 1 move goes to the back of the deque.
                        deque[back] = nextId;
                        back = nextIndex(back);
                    }
                }
            }
        }

        // Count all cells that satisfy the upward and downward limits.
        let answer = 0;

        // Check every cell in the maze.
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const id = i * m + j;

                // Skip obstacles and unreachable cells.
                if (mat[i][j] === '#' || dist[id] === INF) {
                    continue;
                }

                // The shortest path gives the minimum upward moves.
                const upMoves = dist[id];

                // The row difference gives the required downward moves.
                const downMoves = upMoves + (i - r);

                // Count the cell only if both allowed limits are respected.
                if (upMoves <= u && downMoves <= d) {
                    answer++;
                }
            }
        }

        // Return the number of valid reachable cells.
        return answer;
    }
}
```

### Python3

```python
from collections import deque


class Solution:
    def numberOfCells(self, r: int, c: int, u: int, d: int, mat: list[list[int]]) -> int:
        # Store the maze dimensions.
        n = len(mat)
        m = len(mat[0])

        # Geek cannot start from a blocked cell.
        if mat[r][c] == '#':
            return 0

        # INF marks cells that have not been reached.
        INF = float('inf')

        # dist[i][j] stores the minimum upward moves needed to reach (i, j).
        dist = [[INF] * m for _ in range(n)]

        # deque supports O(1) insertion at both the front and back.
        dq = deque()

        # The starting cell needs zero upward moves.
        dist[r][c] = 0
        dq.appendleft((r, c))

        # Direction arrays for up, down, left, and right.
        dr = [-1, 1, 0, 0]
        dc = [0, 0, -1, 1]

        # Run 0-1 BFS until every useful state is processed.
        while dq:
            # Take the next cell from the front.
            x, y = dq.popleft()

            # Try all four adjacent positions.
            for direction in range(4):
                nx = x + dr[direction]
                ny = y + dc[direction]

                # Skip positions outside the maze.
                if nx < 0 or nx >= n or ny < 0 or ny >= m:
                    continue

                # Geek cannot enter an obstacle.
                if mat[nx][ny] == '#':
                    continue

                # Moving upward costs 1; every other move costs 0.
                cost = 1 if direction == 0 else 0

                # Update only when this path uses fewer upward moves.
                if dist[x][y] + cost < dist[nx][ny]:
                    dist[nx][ny] = dist[x][y] + cost

                    # Process zero-cost moves first.
                    if cost == 0:
                        dq.appendleft((nx, ny))
                    else:
                        # Process upward moves after zero-cost moves.
                        dq.append((nx, ny))

        # Store the total number of cells Geek can visit.
        answer = 0

        # Check every cell after calculating minimum upward moves.
        for i in range(n):
            for j in range(m):
                # Ignore obstacles and unreachable cells.
                if mat[i][j] == '#' or dist[i][j] == INF:
                    continue

                # Get the minimum upward moves required.
                up_moves = dist[i][j]

                # Calculate downward moves using the final row difference.
                down_moves = up_moves + (i - r)

                # Count the cell only if both movement limits are valid.
                if up_moves <= u and down_moves <= d:
                    answer += 1

        # Return the total number of reachable empty cells.
        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core algorithm is the same in C++, Java, JavaScript, and Python3. The main difference is only the syntax and the way each language handles the deque and 2D arrays.

### 1. Checking the Starting Cell

The first check handles the simplest edge case.

If `mat[r][c]` is an obstacle, Geek cannot start moving at all. In that case, the answer is immediately `0`.

Handling this case early keeps the rest of the algorithm simple.

### 2. Storing Minimum Upward Moves

For every cell, I store the minimum number of upward moves needed to reach it.

Initially, every cell is marked as unreachable using a large value.

The starting cell gets a value of `0` because Geek begins there without making any move.

I do not store the total number of steps because left and right moves are unlimited. The total path length is not what determines whether a cell can be visited.

### 3. Understanding the Movement Cost

The key idea behind this DSA solution is the movement cost.

Moving from row `x` to row `x - 1` means moving upward, so that move has cost `1`.

Moving down, left, or right has cost `0`.

The cost does not mean the actual number of physical steps. It only represents whether the move consumes one of Geek's limited upward moves.

### 4. Processing Moves with 0-1 BFS

A deque is used instead of a normal queue.

If a move has cost `0`, the next cell is added to the front.

If a move has cost `1`, the next cell is added to the back.

This ensures that paths using fewer upward moves are processed first.

A normal BFS would treat every move equally, while a priority queue would work but would add unnecessary logarithmic overhead. Since the edge costs are only `0` and `1`, 0-1 BFS is the better choice.

### 5. Updating a Cell Only When the Path Is Better

A cell may be reached more than once.

For example, one path may reach a cell using five upward moves, while another path reaches the same cell using only two.

I keep the path with two upward moves because it leaves more of the upward movement limit available.

If the new path does not improve the current distance, it is ignored.

This prevents unnecessary processing and keeps only the best state for every cell.

### 6. Calculating Downward Moves

After finding the minimum upward moves, I calculate the downward moves using the row difference.

The relation is:

`downMoves = upMoves + (currentRow - startRow)`

This works because every upward move decreases the row number by one and every downward move increases it by one.

For example, if Geek starts at row `3`, reaches row `5`, and uses `2` upward moves, then the path must contain `4` downward moves.

The final row difference is:

`5 - 3 = 2`

So:

`downMoves = 2 + 2 = 4`

### 7. Checking Both Limits

A reachable cell is counted only when:

`upMoves ≤ u`

and

`downMoves ≤ d`

This final check makes sure that Geek has not exceeded either vertical movement limit.

The result is the number of distinct empty cells that can be visited.

## Examples

### Example 1

Input: `r = 1, c = 0, u = 1, d = 1`

Maze:

`[['.', '.', '.'], ['.', '#', '.'], ['#', '.', '.']]`

Expected Output: `5`

Brief trace:

Geek starts at `(1, 0)`.

The cell `(1, 1)` is blocked, and `(2, 0)` is also blocked.

Geek can move upward to `(0, 0)` using one upward move. From there, Geek can move horizontally to other reachable cells without using additional upward moves.

The total number of valid reachable empty cells is `5`.

### Example 2

Input: `r = 2, c = 1, u = 2, d = 2`

Maze:

`[['.', '.', '.'], ['.', '#', '.'], ['.', '.', '.']]`

Expected Output: `8`

Brief trace:

Geek starts at `(2, 1)`.

The center cell `(1, 1)` is an obstacle, so it cannot be visited.

Every other empty cell can be reached while staying within the limit of two upward moves and two downward moves.

The answer is `8`.

### Example 3

Input: `r = 0, c = 0, u = 2, d = 2`

Maze:

`[['#', '.'], ['.', '.']]`

Expected Output: `0`

Brief trace:

The starting cell `(0, 0)` is an obstacle.

Geek cannot begin the traversal, so no cell can be visited.

The answer is `0`.

## How to Use / Run Locally

### C++

1. Save the solution in a file named `solution.cpp`.
2. Compile it using:

`g++ -std=c++17 solution.cpp -o solution`

1. Run the compiled program:

`./solution`

On Windows, run:

`solution.exe`

### Java

1. Save the solution in a file named `Solution.java`.
2. Make sure a Java Development Kit is installed.
3. Compile the file:

`javac Solution.java`

1. Run the program:

`java Solution`

### JavaScript

1. Save the solution in a file named `solution.js`.
2. Make sure Node.js is installed.
3. Run the file:

`node solution.js`

### Python3

1. Save the solution in a file named `solution.py`.
2. Make sure Python 3 is installed.
3. Run the file:

`python3 solution.py`

On some systems, the command may be:

`python solution.py`

For GeeksforGeeks submissions, only the required `Solution` class and function should be submitted according to the platform's expected format.

## Notes & Optimizations

* If the starting cell is an obstacle, the answer must be `0`.
* Left and right moves are unlimited, so they are treated as zero-cost moves.
* The distance matrix stores only the minimum number of upward moves. Storing both upward and downward counts would use more state than necessary.
* A normal BFS is not enough because upward moves have a different meaning from the other moves.
* Dijkstra's algorithm could solve the problem, but 0-1 BFS is more efficient because every edge cost is either `0` or `1`.
* The formula for downward moves avoids adding another dimension to the state.
* The solution processes each cell efficiently, making it suitable for large maze traversal and competitive programming constraints.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
