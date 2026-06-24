# Rat Maze With Multiple Jumps

A beginner-friendly Backtracking solution for the Rat Maze With Multiple Jumps problem. This repository contains an optimized approach to find a valid path from the top-left cell to the bottom-right cell in a matrix where each cell represents the maximum jump length allowed. The solution follows the required priority rules: shorter jumps first and right movement before downward movement.

This problem is a popular Matrix Backtracking Problem frequently asked in coding interviews, competitive programming contests, and DSA practice platforms.

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

Given an `n × n` matrix, each cell contains a number representing the maximum number of steps a rat can jump either to the right or downward.

The rat starts from the top-left corner `(0, 0)` and must reach the bottom-right corner `(n - 1, n - 1)`.

A cell containing `0` is blocked and cannot be used as part of the path.

The goal is to return a matrix where:

- `1` represents cells included in the chosen path.
- `0` represents cells not included in the path.

If no valid path exists, return:

```text
[[-1]]
```

Additional rules:

- Prefer the shortest jump length first.
- For equal jump lengths, moving right should be preferred before moving down.

This is a classic Backtracking Matrix Problem that tests recursion, path exploration, and decision-making.

---

## Constraints

| Constraint | Value |
|------------|--------|
| Matrix Size | 1 ≤ n ≤ 50 |
| Cell Value | 0 ≤ mat[i][j] ≤ 20 |

---

## Intuition

The first observation is that from every cell, multiple moves may be possible.

Unlike a normal maze where movement is restricted to one step, here we can jump several cells at once. That means we need to explore multiple possibilities before deciding which path is correct.

Backtracking is a natural fit because:

- We try a move.
- Continue exploring.
- If it leads to failure, undo the move.
- Try another option.

Since the problem explicitly asks us to choose shorter jumps first and prefer right movement before downward movement, we can simply follow that order during recursion.

The first valid path discovered automatically becomes the required answer.

---

## Approach

1. Create an answer matrix filled with `0`.
2. Start exploring from cell `(0,0)`.
3. If the destination is reached:
   - Mark it as part of the path.
   - Return success.
4. Ignore:
   - Out-of-bound positions.
   - Cells containing `0`.
5. Mark the current cell as part of the path.
6. Try every jump length from `1` to the maximum value in the current cell.
7. For each jump:
   - Move right first.
   - Move down second.
8. If any recursive call succeeds:
   - Return success immediately.
9. If all jumps fail:
   - Remove the current cell from the path.
   - Mark it as a dead end.
   - Backtrack.
10. If the starting cell cannot reach the destination:
    - Return `[[-1]]`.

---

## Data Structures Used

### 1. Matrix (`vector<vector<int>>`, `int[][]`, `Array`, `list`)

Used to store:

- Input maze
- Output path

### 2. Recursion Stack

Used internally by the backtracking algorithm to remember previously visited decisions.

### 3. Integer Variables

Used for:

- Row index
- Column index
- Jump length
- Matrix size

No extra visited matrix is required because failed cells are converted into dead ends.

---

## Operations & Behavior Summary

The algorithm performs the following actions:

1. Start at `(0,0)`.
2. Mark current cell as part of the path.
3. Read the maximum jump value.
4. Try all jump lengths in ascending order.
5. Attempt moving right.
6. If right fails, attempt moving down.
7. Continue recursively.
8. If destination is reached:
   - Stop immediately.
9. If all moves fail:
   - Undo the path marking.
   - Mark the cell as unusable.
10. Return the final path matrix.

This behavior guarantees:

- Shortest jump priority.
- Right-first priority.
- Efficient pruning of dead-end states.

---

## Complexity

| Metric | Complexity |
|----------|------------|
| Time Complexity | O(n² × k) |
| Space Complexity | O(1) Auxiliary Space |

Where:

- `n` = size of matrix
- `k` = maximum value present in the matrix

### Time Complexity Explanation

Each cell is processed at most once because failed cells are permanently marked as dead ends. Processing a cell may require checking up to `k` jump lengths.

### Space Complexity Explanation

No additional data structure is used for memoization. Apart from recursion and the required answer matrix, the algorithm uses constant auxiliary memory.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  private:
    // Helper function to find the path using backtracking
    bool solve(int i, int j, vector<vector<int>>& mat, vector<vector<int>>& ans, int n) {
        // If we reach the bottom-right cell, mark it and return success
        if (i == n - 1 && j == n - 1) {
            ans[i][j] = 1;
            return true;
        }
        
        // If the current cell is out of bounds or blocked, return failure
        if (i >= n || j >= n || mat[i][j] == 0) {
            return false;
        }
        
        // Mark the current cell as part of the path
        ans[i][j] = 1;
        int jumps = mat[i][j];
        
        // Try all jump lengths starting from the shortest possible jump
        for (int k = 1; k <= jumps; k++) {
            // Prefer moving right over moving down
            if (solve(i, j + k, mat, ans, n)) return true;
            if (solve(i + k, j, mat, ans, n)) return true;
        }
        
        // If no jumps work, backtrack by unmarking the cell in the answer
        ans[i][j] = 0;
        // Mark the cell as a dead end in the input matrix to prevent revisiting
        mat[i][j] = 0;
        
        return false;
    }

  public:
    vector<vector<int>> shortestDist(vector<vector<int>>& mat) {
        int n = mat.size();
        // Initialize the answer matrix with 0s
        vector<vector<int>> ans(n, vector<int>(n, 0));
        
        // Start the recursion from the top-left cell
        if (solve(0, 0, mat, ans, n)) {
            return ans;
        }
        
        // If no path is found, return [[-1]]
        return {{-1}};
    }
};
```

### Java

```java
class Solution {
    // Helper function to explore paths
    private boolean solve(int i, int j, int[][] mat, int[][] ans, int n) {
        // Base case: destination reached
        if (i == n - 1 && j == n - 1) {
            ans[i][j] = 1;
            return true;
        }
        
        // Base case: invalid position or blocked cell
        if (i >= n || j >= n || mat[i][j] == 0) {
            return false;
        }
        
        // Add current cell to the path
        ans[i][j] = 1;
        int jumps = mat[i][j];
        
        // Iterate through all possible jump sizes incrementally
        for (int k = 1; k <= jumps; k++) {
            // Check right jump first, then down jump
            if (solve(i, j + k, mat, ans, n)) return true;
            if (solve(i + k, j, mat, ans, n)) return true;
        }
        
        // Backtrack: remove from path
        ans[i][j] = 0;
        // Optimize: mark this cell as useless so we never process it again
        mat[i][j] = 0;
        
        return false;
    }

    public ArrayList<ArrayList<Integer>> shortestDist(int[][] mat) {
        int n = mat.length;
        int[][] ans = new int[n][n];
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        
        // If a valid path is found, format the 2D array into an ArrayList
        if (solve(0, 0, mat, ans, n)) {
            for (int i = 0; i < n; i++) {
                ArrayList<Integer> row = new ArrayList<>();
                for (int j = 0; j < n; j++) {
                    row.add(ans[i][j]);
                }
                result.add(row);
            }
        } else {
            // If no path exists, return an ArrayList containing just -1
            ArrayList<Integer> noPath = new ArrayList<>();
            noPath.add(-1);
            result.add(noPath);
        }
        
        return result;
    }
}
```

### JavaScript

```javascript
class Solution {
    shortestDist(mat) {
        const n = mat.length;
        // Create an n x n matrix filled with zeros for the answer
        const ans = Array.from({ length: n }, () => Array(n).fill(0));
        
        // Inner recursive function to keep track of state
        const solve = (i, j) => {
            // If we hit the bottom-right corner, we found the path
            if (i === n - 1 && j === n - 1) {
                ans[i][j] = 1;
                return true;
            }
            
            // If we go off the grid or land on a 0, the path is invalid
            if (i >= n || j >= n || mat[i][j] === 0) {
                return false;
            }
            
            // Assume this cell is part of the final answer
            ans[i][j] = 1;
            const jumps = mat[i][j];
            
            // Try jumping right, then down, for each jump length
            for (let k = 1; k <= jumps; k++) {
                if (solve(i, j + k)) return true;
                if (solve(i + k, j)) return true;
            }
            
            // If we exit the loop, no jump worked. Undo the assumption.
            ans[i][j] = 0;
            // Mark the cell in the input as 0 to avoid checking it again later
            mat[i][j] = 0;
            
            return false;
        };
        
        // Start from cell (0,0)
        if (solve(0, 0)) {
            return ans;
        }
        
        // Return [[-1]] as requested if nothing works
        return [[-1]];
    }
}
```

### Python3

```python
class Solution:
    def shortestDist(self, mat):
        n = len(mat)
        # Prepare the answer grid with zeros
        ans = [[0] * n for _ in range(n)]
        
        # Define a nested helper function for clean recursion
        def solve(i, j):
            # Check if we are at the destination
            if i == n - 1 and j == n - 1:
                ans[i][j] = 1
                return True
            
            # Check if coordinates are bad or cell is a dead end
            if i >= n or j >= n or mat[i][j] == 0:
                return False
                
            # Temporarily flag this cell as part of the successful path
            ans[i][j] = 1
            jumps = mat[i][j]
            
            # Loop through jump lengths starting from 1 to prioritize short jumps
            for k in range(1, jumps + 1):
                # Always test moving to the right before moving down
                if solve(i, j + k):
                    return True
                if solve(i + k, j):
                    return True
                    
            # The current cell led to dead ends, so we clean up
            ans[i][j] = 0
            # Mutate the input matrix to block future paths from wasting time here
            mat[i][j] = 0
            
            return False
            
        # Kick off the search at the origin
        if solve(0, 0):
            return ans
            
        # Return a matrix with a single -1 if we fail completely
        return [[-1]]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic remains exactly the same across all language implementations.

### Step 1: Create the Answer Matrix

Before exploring the maze, create a matrix filled with zeros.

This matrix will store the final path.

Initially:

```text
0 0 0
0 0 0
0 0 0
```

---

### Step 2: Start From the Top-Left Cell

The rat always begins from:

```text
(0,0)
```

This becomes the first recursive call.

---

### Step 3: Check for Destination

Before doing anything else, check whether the current cell is:

```text
(n-1, n-1)
```

If yes:

- Mark it as part of the path.
- Return success.

---

### Step 4: Validate the Current Position

A move becomes invalid if:

- Row exceeds matrix size.
- Column exceeds matrix size.
- Cell value equals `0`.

Such positions immediately return failure.

---

### Step 5: Mark Current Cell

Since we are currently exploring through this cell, mark it as:

```text
1
```

inside the answer matrix.

This means:

> "I believe this cell might belong to the final path."

---

### Step 6: Read Jump Capacity

The current cell value determines how far the rat can jump.

Example:

```text
mat[i][j] = 4
```

Possible moves:

```text
Right 1
Right 2
Right 3
Right 4

Down 1
Down 2
Down 3
Down 4
```

---

### Step 7: Try Smaller Jumps First

The problem requires shortest jumps first.

Therefore:

```text
1 → 2 → 3 → 4
```

must be attempted in ascending order.

This guarantees the correct path selection.

---

### Step 8: Prefer Right Before Down

For every jump length:

```text
Right
Then
Down
```

Example:

```text
Jump = 2

Try:
(i, j+2)

If unsuccessful:

Try:
(i+2, j)
```

This matches the problem requirements exactly.

---

### Step 9: Continue Recursively

Every successful move repeats the same process:

- Validate
- Mark
- Explore
- Backtrack if needed

until either:

- Destination is found
- All possibilities are exhausted

---

### Step 10: Backtrack

If every jump fails:

- Remove current cell from the answer matrix.
- Mark the cell as a dead end.

This prevents future recursion from wasting time on the same failing location.

---

### Step 11: Return Final Result

If destination becomes reachable:

Return:

```text
Path Matrix
```

Otherwise:

```text
[[-1]]
```

---

## Examples

### Example 1

#### Input

```text
mat =
[
 [2,1,0,0],
 [3,0,0,1],
 [0,1,0,1],
 [0,0,0,1]
]
```

#### Output

```text
[
 [1,0,0,0],
 [1,0,0,1],
 [0,0,0,1],
 [0,0,0,1]
]
```

#### Trace

```text
(0,0)
↓
(1,0)
→→→
(1,3)
↓
(2,3)
↓
(3,3)
```

Destination reached successfully.

---

### Example 2

#### Input

```text
mat =
[
 [2,1,0,0],
 [2,0,0,1],
 [0,1,0,1],
 [0,0,0,1]
]
```

#### Output

```text
[[-1]]
```

#### Trace

Every possible path eventually lands on a blocked cell.

No valid route exists.

---

### Example 3

#### Input

```text
mat =
[
 [1,1],
 [1,1]
]
```

#### Output

```text
[
 [1,1],
 [0,1]
]
```

#### Trace

```text
(0,0)
→
(0,1)
↓
(1,1)
```

Shortest valid path is found immediately.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ main.cpp -o main
```

Run:

```bash
./main
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run:

```bash
node solution.js
```

---

### Python3

Run:

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

### Important Edge Cases

1. Single cell matrix.
2. Starting cell contains `0`.
3. Large jump values.
4. Multiple valid paths.
5. Completely blocked routes.

### Why Dead-End Marking Helps

When a cell is proven incapable of reaching the destination, it is converted into a blocked cell.

This avoids:

- Repeated exploration
- Duplicate recursion
- Unnecessary computations

### Alternative Approaches

Other possible solutions include:

- Dynamic Programming
- BFS Path Search
- DFS with Memoization

However, Backtracking with pruning is simple, intuitive, and aligns perfectly with the problem requirements.

### Key Interview Topics Covered

- Backtracking
- Recursion
- Matrix Traversal
- DFS
- Path Finding
- State Pruning
- Competitive Programming
- Data Structures and Algorithms

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
