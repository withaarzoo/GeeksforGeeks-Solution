# Snake and Ladder Problem

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

The Snake and Ladder Problem gives us an `n x n` board where cells are numbered from `1` to `n*n`.

I start from cell `1` and need to reach cell `n*n` using the minimum possible number of dice throws.

The special part is that I have complete control over every dice throw. In one throw, I can choose any number from `1` to `6`.

The board can contain:

* Ladders, which move me forward.
* Snakes, which move me backward.

If I land on the starting cell of a snake or ladder, I must immediately move to its corresponding ending cell.

The ladder array `lad[]` contains pairs:

`[start, end]`

Similarly, the snake array `sn[]` contains pairs:

`[start, end]`

The goal is to return the minimum number of dice throws needed to reach cell `n*n`.

If the final cell cannot be reached, I return `-1`.

## Constraints

| Constraint                                         | Meaning                                         |
| -------------------------------------------------- | ----------------------------------------------- |
| `1 <= n <= 10^3`                                   | The board has at most `10^6` cells              |
| `1 <= lad.size(), sn.size(), lad[i], sn[i] <= n^2` | Snake and ladder positions are within the board |
| `lad.size()` is even                               | Ladders are represented as start-end pairs      |
| `sn.size()` is even                                | Snakes are represented as start-end pairs       |

## Intuition

My first observation was that every dice throw costs exactly one move.

From any cell, I can choose one of six possible next positions. That means I can think of every board cell as a state, and each possible dice result as a connection to another state.

For example, if I am at cell `5`, I can try:

`6, 7, 8, 9, 10, 11`

If one of these cells contains a snake or ladder, I immediately jump to its destination.

This looks like a shortest-path problem where every move has the same cost. That is exactly where Breadth-First Search, or BFS, works well.

BFS checks all positions reachable in one throw, then all positions reachable in two throws, then three throws, and so on.

So the first time I reach the final cell, I know that I have found the minimum number of dice throws.

## Approach

I first create a `jump` array to store snakes and ladders.

If there is a ladder from `3` to `22`, I store:

`jump[3] = 22`

If there is a snake from `17` to `4`, I store:

`jump[17] = 4`

For cells without a snake or ladder, the value remains `0`.

Then I start BFS from cell `1`.

For every current cell, I try all six possible dice values.

For each possible move:

1. Calculate the next cell.
2. Ignore it if it goes beyond `n*n`.
3. Check whether the next cell has a snake or ladder.
4. If it does, immediately move to its destination.
5. If the resulting cell has not been visited, mark it as visited.
6. Add it to the BFS queue with one additional throw.

The `visited` array prevents the same cell from being processed repeatedly.

If BFS reaches `n*n`, I return the number of throws.

If the queue becomes empty without reaching the destination, I return `-1`.

## Data Structures Used

| Data Structure  | Purpose                                                                       |
| --------------- | ----------------------------------------------------------------------------- |
| `jump` array    | Stores the destination of every snake and ladder                              |
| `visited` array | Keeps track of cells that have already been explored                          |
| BFS queue       | Stores cells that need to be processed next along with their number of throws |

The `jump` array makes snake and ladder lookup an `O(1)` operation.

The queue is needed because BFS processes states level by level.

The `visited` array prevents unnecessary repeated work and keeps the BFS efficient.

## Operations & Behavior Summary

The algorithm can be summarized as follows:

1. Calculate the total number of cells as `n*n`.
2. Create the `jump` array.
3. Store every ladder as a direct jump.
4. Store every snake as a direct jump.
5. Start BFS from cell `1`.
6. Mark cell `1` as visited.
7. Take the next cell from the queue.
8. Try dice values from `1` to `6`.
9. Calculate the destination for each dice value.
10. Ignore positions beyond the final cell.
11. Apply a snake or ladder if the destination starts one.
12. Add the resulting cell to the queue if it has not been visited.
13. Increase the throw count by `1`.
14. Return the throw count when `n*n` is reached.
15. Return `-1` if the destination cannot be reached.

## Complexity

| Type             | Complexity | Explanation                                                                                                        |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------ |
| Time Complexity  | `O(n²)`    | There are `n²` cells, and each cell checks at most 6 dice moves. Since 6 is constant, the total is `O(n²)`.        |
| Space Complexity | `O(n²)`    | The `jump` array, `visited` array, and BFS queue can each require space proportional to the number of board cells. |

Here, `n` represents the dimension of the square board, so the total number of cells is `n²`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minThrows(int n, vector<int>& lad, vector<int>& sn) {
        int total = n * n; // Total number of cells on the board.

        vector<int> jump(total + 1, 0); // Stores the destination of each snake or ladder.

        // Store all ladders as start -> end.
        for (int i = 0; i < (int)lad.size(); i += 2) {
            jump[lad[i]] = lad[i + 1];
        }

        // Store all snakes as start -> end.
        for (int i = 0; i < (int)sn.size(); i += 2) {
            jump[sn[i]] = sn[i + 1];
        }

        vector<bool> visited(total + 1, false); // Prevents visiting the same cell repeatedly.

        // Each pair stores: {current cell, number of throws used}.
        queue<pair<int, int>> q;

        q.push({1, 0}); // Start from cell 1 with zero throws.
        visited[1] = true; // Mark the starting cell as visited.

        while (!q.empty()) {
            auto [cell, throws] = q.front(); // Get the current cell and its throw count.
            q.pop(); // Remove the current state from the queue.

            // BFS guarantees this is the minimum number of throws.
            if (cell == total) {
                return throws;
            }

            // Try every possible dice value from 1 to 6.
            for (int dice = 1; dice <= 6; dice++) {
                int next = cell + dice; // Move forward according to the dice result.

                // Ignore moves that go beyond the final cell.
                if (next > total) {
                    continue;
                }

                // If the cell contains a snake or ladder, take it immediately.
                if (jump[next] != 0) {
                    next = jump[next];
                }

                // Process the cell only if it has not been visited before.
                if (!visited[next]) {
                    visited[next] = true; // Mark it before adding it to the queue.

                    // This move uses exactly one additional dice throw.
                    q.push({next, throws + 1});
                }
            }
        }

        // If BFS finishes without reaching the final cell, it is impossible.
        return -1;
    }
};
```

### Java

```java
class Solution {
    public int minThrows(int n, int[] lad, int[] sn) {
        int total = n * n; // Total number of cells on the board.

        int[] jump = new int[total + 1]; // Stores the destination of each snake or ladder.

        // Store all ladders as start -> end.
        for (int i = 0; i < lad.length; i += 2) {
            jump[lad[i]] = lad[i + 1];
        }

        // Store all snakes as start -> end.
        for (int i = 0; i < sn.length; i += 2) {
            jump[sn[i]] = sn[i + 1];
        }

        boolean[] visited = new boolean[total + 1]; // Prevents visiting the same cell repeatedly.

        // Each array stores: {current cell, number of throws used}.
        Queue<int[]> queue = new ArrayDeque<>();

        queue.offer(new int[]{1, 0}); // Start from cell 1 with zero throws.
        visited[1] = true; // Mark the starting cell as visited.

        while (!queue.isEmpty()) {
            int[] current = queue.poll(); // Get the next BFS state.

            int cell = current[0]; // Current cell.
            int throws = current[1]; // Number of throws used to reach this cell.

            // BFS guarantees that this is the minimum number of throws.
            if (cell == total) {
                return throws;
            }

            // Try every possible dice value from 1 to 6.
            for (int dice = 1; dice <= 6; dice++) {
                int next = cell + dice; // Move forward according to the dice result.

                // Ignore moves that go beyond the final cell.
                if (next > total) {
                    continue;
                }

                // If the cell contains a snake or ladder, take it immediately.
                if (jump[next] != 0) {
                    next = jump[next];
                }

                // Process the cell only if it has not been visited before.
                if (!visited[next]) {
                    visited[next] = true; // Mark it before adding it to the queue.

                    // This move uses exactly one additional dice throw.
                    queue.offer(new int[]{next, throws + 1});
                }
            }
        }

        // If BFS finishes without reaching the final cell, it is impossible.
        return -1;
    }
}
```

### JavaScript

```javascript
class Solution {
    minThrows(n, lad, sn) {
        const total = n * n; // Total number of cells on the board.

        const jump = new Array(total + 1).fill(0); // Stores the destination of each snake or ladder.

        // Store all ladders as start -> end.
        for (let i = 0; i < lad.length; i += 2) {
            jump[lad[i]] = lad[i + 1];
        }

        // Store all snakes as start -> end.
        for (let i = 0; i < sn.length; i += 2) {
            jump[sn[i]] = sn[i + 1];
        }

        const visited = new Array(total + 1).fill(false); // Prevents visiting the same cell repeatedly.

        // Each element stores: [current cell, number of throws used].
        const queue = [[1, 0]];

        let head = 0; // Index of the next state to process.

        visited[1] = true; // Mark the starting cell as visited.

        while (head < queue.length) {
            const [cell, throws] = queue[head++]; // Get the next BFS state.

            // BFS guarantees that this is the minimum number of throws.
            if (cell === total) {
                return throws;
            }

            // Try every possible dice value from 1 to 6.
            for (let dice = 1; dice <= 6; dice++) {
                let next = cell + dice; // Move forward according to the dice result.

                // Ignore moves that go beyond the final cell.
                if (next > total) {
                    continue;
                }

                // If the cell contains a snake or ladder, take it immediately.
                if (jump[next] !== 0) {
                    next = jump[next];
                }

                // Process the cell only if it has not been visited before.
                if (!visited[next]) {
                    visited[next] = true; // Mark it before adding it to the queue.

                    // This move uses exactly one additional dice throw.
                    queue.push([next, throws + 1]);
                }
            }
        }

        // If BFS finishes without reaching the final cell, it is impossible.
        return -1;
    }
};
```

### Python3

```python
class Solution:
    def minThrows(self, n, lad, sn):
        total = n * n  # Total number of cells on the board.

        jump = [0] * (total + 1)  # Stores the destination of each snake or ladder.

        # Store all ladders as start -> end.
        for i in range(0, len(lad), 2):
            jump[lad[i]] = lad[i + 1]

        # Store all snakes as start -> end.
        for i in range(0, len(sn), 2):
            jump[sn[i]] = sn[i + 1]

        visited = [False] * (total + 1)  # Prevents visiting the same cell repeatedly.

        # Each element stores: (current cell, number of throws used).
        queue = [(1, 0)]

        head = 0  # Index of the next state to process.

        visited[1] = True  # Mark the starting cell as visited.

        while head < len(queue):
            cell, throws = queue[head]  # Get the next BFS state.
            head += 1  # Move to the next state in the queue.

            # BFS guarantees that this is the minimum number of throws.
            if cell == total:
                return throws

            # Try every possible dice value from 1 to 6.
            for dice in range(1, 7):
                next_cell = cell + dice  # Move forward according to the dice result.

                # Ignore moves that go beyond the final cell.
                if next_cell > total:
                    continue

                # If the cell contains a snake or ladder, take it immediately.
                if jump[next_cell] != 0:
                    next_cell = jump[next_cell]

                # Process the cell only if it has not been visited before.
                if not visited[next_cell]:
                    visited[next_cell] = True  # Mark it before adding it to the queue.

                    # This move uses exactly one additional dice throw.
                    queue.append((next_cell, throws + 1))

        # If BFS finishes without reaching the final cell, it is impossible.
        return -1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### 1. Calculate the total number of cells

The board contains `n` rows and `n` columns.

Therefore:

`total = n * n`

For example, when `n = 6`, the board contains `36` cells, so cell `36` is the destination.

This value is calculated once and used throughout the BFS.

### 2. Build the snake and ladder mapping

I use an array called `jump`.

Initially, every position contains `0`.

For a ladder such as:

`3 -> 22`

I store the destination at the starting position:

`jump[3] = 22`

For a snake such as:

`17 -> 4`

I store:

`jump[17] = 4`

This makes checking for a snake or ladder very fast.

Instead of searching through the complete snake and ladder arrays every time I land on a cell, I can directly check `jump[cell]`.

That keeps each lookup at `O(1)`.

### 3. Process the input pairs

The ladder and snake arrays contain values in pairs.

For example:

`lad = [3, 22, 5, 8, 11, 35]`

represents:

* `3 -> 22`
* `5 -> 8`
* `11 -> 35`

So I process the array two elements at a time.

The same logic applies to the snake array.

### 4. Start BFS from cell 1

I start at cell `1`.

At this point, I have made zero dice throws.

So the first BFS state is:

`(1, 0)`

The first value represents the current cell.

The second value represents the number of throws used to reach it.

I also mark cell `1` as visited.

### 5. Process one BFS state

I remove one state from the front of the queue.

Suppose the current state is:

`(8, 2)`

This means I am currently at cell `8` and I needed `2` throws to reach it.

Before exploring further, I check whether cell `8` is the final destination.

If it is, I return `2`.

### 6. Try all possible dice values

From every cell, I try six possible moves:

`1, 2, 3, 4, 5, 6`

Suppose I am at cell `8`.

The possible destinations before applying snakes or ladders are:

`9, 10, 11, 12, 13, 14`

Each one represents one possible dice throw.

### 7. Ignore positions beyond the board

If the board ends at cell `36`, a move that produces cell `37` or higher is invalid.

So I simply skip that move.

This is important because the algorithm must never create a state outside the board.

### 8. Apply snakes and ladders immediately

Suppose I land on cell `11`, and there is a ladder:

`11 -> 35`

I do not put cell `11` into the BFS queue.

Instead, I immediately change the destination to cell `35`.

The same rule applies to snakes.

If I land on `17` and have:

`17 -> 4`

then the resulting position becomes `4`.

This directly follows the problem statement.

### 9. Check the visited array

After applying a snake or ladder, I check whether the resulting cell has already been visited.

If it has, I skip it.

There is no benefit in processing the same state again because BFS has already found the shortest way to reach that cell.

If it has not been visited, I mark it as visited and put it into the queue.

### 10. Increase the throw count

Every transition from one cell to another represents exactly one dice throw.

Therefore, if the current state needs `throws` moves, the new state needs:

`throws + 1`

This is why BFS naturally gives the minimum number of dice throws.

### 11. Why BFS is the right algorithm

The important property is that every move has the same cost.

Whether I roll `1`, `2`, `3`, `4`, `5`, or `6`, I have still used exactly one dice throw.

So the board can be treated as an unweighted graph.

BFS finds the shortest path in an unweighted graph.

Here, the shortest path represents the minimum number of dice throws.

### 12. Why I do not use DFS

DFS can find a path, but the first path it finds is not necessarily the shortest path.

I could make DFS explore many unnecessary paths before finding the optimal one.

BFS avoids this problem because it explores the board according to the number of throws used.

It first explores all positions reachable in one throw, then two throws, then three throws, and so on.

### 13. Why I do not use Dijkstra's algorithm

Dijkstra's algorithm is useful when graph edges can have different non-negative costs.

Here, every dice throw costs exactly `1`.

Using Dijkstra would add unnecessary complexity.

BFS is simpler and gives the required shortest path directly.

### 14. JavaScript queue optimization

In JavaScript, repeatedly using `shift()` on a large array can be inefficient because elements may need to be moved after removing the first element.

Instead, I can maintain a `head` index.

The queue remains an array, while `head` tells me which element should be processed next.

This keeps queue operations efficient.

### 15. Python queue optimization

The same idea is useful in Python.

Instead of repeatedly using `pop(0)`, I can keep a `head` index.

Using `pop(0)` can require shifting the remaining elements, while accessing an element by index is constant time.

### 16. When the answer is `-1`

If BFS finishes and the destination cell was never reached, there is no valid sequence of moves that reaches `n*n`.

In that situation, the required result is:

`-1`

## Examples

### Example 1

#### Input

```text
n = 6
lad = [3, 22, 5, 8, 11, 35]
sn = [17, 4, 19, 7, 34, 21, 9]
```

#### Expected Output

```text
3
```

#### Trace

One optimal path is:

`1 -> 5`

This uses one throw of `4`.

Then the ladder takes:

`5 -> 8`

Next:

`8 -> 11`

using a throw of `3`.

The ladder takes:

`11 -> 35`

Finally:

`35 -> 36`

using a throw of `1`.

So the destination is reached in `3` dice throws.

### Example 2

#### Input

```text
n = 3
lad = [2, 8]
sn = [7, 3]
```

#### Expected Output

```text
2
```

#### Trace

I start at cell `1`.

I choose a dice value of `1`:

`1 -> 2`

Cell `2` has a ladder:

`2 -> 8`

Then I use another throw of `1`:

`8 -> 9`

Cell `9` is the destination.

Therefore, the minimum number of throws is `2`.

### Example 3

Consider a board where the final cell can be reached directly from the starting cell within one dice throw.

If `n = 2`, the board contains cells `1` through `4`.

From cell `1`, I can choose a dice value of `3`:

`1 -> 4`

So the answer is:

```text
1
```

This also shows why I should always check all six possible dice values from every position.

## How to Use / Run Locally

### C++

Save the solution in a file such as `solution.cpp`.

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Then run:

```bash
./solution
```

If the solution is being submitted directly to GeeksforGeeks, the platform provides the driver code and input handling, so only the `Solution` class is required.

### Java

Save the solution as `Solution.java`.

Compile it using:

```bash
javac Solution.java
```

Then run:

```bash
java Solution
```

For GeeksforGeeks submissions, use the required `Solution` class and method signature provided by the problem.

### JavaScript

Save the solution as `solution.js`.

Run it with Node.js:

```bash
node solution.js
```

Make sure Node.js is installed on your system.

For GeeksforGeeks, the platform handles the input and calls the required method.

### Python3

Save the solution as `solution.py`.

Run it using:

```bash
python3 solution.py
```

For GeeksforGeeks, the required `Solution` class and method are called by the platform's driver code.

## Notes & Optimizations

The main optimization is storing every snake and ladder in the `jump` array.

Without this mapping, I would have to search the snake and ladder arrays whenever I land on a cell. With the mapping, I can check the destination in constant time.

The `visited` array is also important. Without it, the BFS could repeatedly process the same cells through different paths, causing unnecessary work.

The board can contain up to `10^6` cells because `n` can be as large as `10^3`. That is why the solution should avoid unnecessary nested searches or repeated traversal of the snake and ladder lists.

BFS is preferred over DFS because the problem asks for the minimum number of throws.

Dijkstra's algorithm is unnecessary because every dice throw has the same cost.

One important edge case is `n = 1`. In that case, the starting cell is already the destination, so the answer is `0`.

Another important case is when a snake or ladder is encountered after a dice move. The jump must be applied immediately before considering the resulting cell for the next BFS step.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
