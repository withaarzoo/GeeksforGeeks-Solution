# Chocolates Pickup

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

## Problem Summary

I am given a 2D grid of size n x m where each cell contains chocolates. Two robots start from the top row:

* Robot 1 starts at (0, 0)
* Robot 2 starts at (0, m-1)

Both robots move to the next row at each step and can move to three positions: left diagonal, down, or right diagonal.

The goal is to find the maximum chocolates both robots can collect.

Rules:

* If both robots land on the same cell, chocolates are counted once.
* Robots cannot go outside the grid.
* Both must reach the last row.

## Constraints

* 2 <= n, m <= 70
* 0 <= grid[i][j] <= 100

## Intuition

I thought of this as two people moving simultaneously from top to bottom. At every step, both robots have 3 choices, so total 9 combinations.

This clearly suggests a Dynamic Programming problem because there are overlapping subproblems and optimal substructure.

So I decided to track three variables:

* row
* col1 (robot 1 position)
* col2 (robot 2 position)

## Approach

1. Define DP state:
   dp[row][col1][col2] = maximum chocolates from this state

2. Base Case:
   Last row — directly take values from grid

3. Transition:
   Try all 9 moves for both robots

4. If both robots are on same cell, count once

5. Use bottom-up DP to optimize space

## Data Structures Used

* 2D arrays for DP (m x m)
* Temporary matrix for rolling computation

## Operations & Behavior Summary

* Iterate row from bottom to top
* For each pair of columns (c1, c2)
* Try all 9 possible moves
* Take maximum possible chocolates

## Complexity

* Time Complexity: O(n *m* m * 9)
* Space Complexity: O(m * m)

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int maxChocolate(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(m, 0));

        for (int c1 = 0; c1 < m; c1++) {
            for (int c2 = 0; c2 < m; c2++) {
                if (c1 == c2)
                    dp[c1][c2] = grid[n-1][c1];
                else
                    dp[c1][c2] = grid[n-1][c1] + grid[n-1][c2];
            }
        }

        for (int row = n-2; row >= 0; row--) {
            vector<vector<int>> temp(m, vector<int>(m, 0));

            for (int c1 = 0; c1 < m; c1++) {
                for (int c2 = 0; c2 < m; c2++) {
                    int maxi = 0;

                    for (int d1 = -1; d1 <= 1; d1++) {
                        for (int d2 = -1; d2 <= 1; d2++) {
                            int nc1 = c1 + d1;
                            int nc2 = c2 + d2;

                            if (nc1 >= 0 && nc1 < m && nc2 >= 0 && nc2 < m) {
                                int val = dp[nc1][nc2];

                                if (c1 == c2)
                                    val += grid[row][c1];
                                else
                                    val += grid[row][c1] + grid[row][c2];

                                maxi = max(maxi, val);
                            }
                        }
                    }

                    temp[c1][c2] = maxi;
                }
            }

            dp = temp;
        }

        return dp[0][m-1];
    }
};
```

### Java

```java
class Solution {
    public int maxChocolate(int grid[][]) {
        int n = grid.length;
        int m = grid[0].length;

        int[][] dp = new int[m][m];

        for (int c1 = 0; c1 < m; c1++) {
            for (int c2 = 0; c2 < m; c2++) {
                if (c1 == c2)
                    dp[c1][c2] = grid[n-1][c1];
                else
                    dp[c1][c2] = grid[n-1][c1] + grid[n-1][c2];
            }
        }

        for (int row = n - 2; row >= 0; row--) {
            int[][] temp = new int[m][m];

            for (int c1 = 0; c1 < m; c1++) {
                for (int c2 = 0; c2 < m; c2++) {

                    int max = 0;

                    for (int d1 = -1; d1 <= 1; d1++) {
                        for (int d2 = -1; d2 <= 1; d2++) {

                            int nc1 = c1 + d1;
                            int nc2 = c2 + d2;

                            if (nc1 >= 0 && nc1 < m && nc2 >= 0 && nc2 < m) {
                                int val = dp[nc1][nc2];

                                if (c1 == c2)
                                    val += grid[row][c1];
                                else
                                    val += grid[row][c1] + grid[row][c2];

                                max = Math.max(max, val);
                            }
                        }
                    }

                    temp[c1][c2] = max;
                }
            }

            dp = temp;
        }

        return dp[0][m-1];
    }
}
```

### JavaScript

```javascript
class Solution {
    maxChocolate(grid) {
        let n = grid.length;
        let m = grid[0].length;

        let dp = Array.from({ length: m }, () => Array(m).fill(0));

        for (let c1 = 0; c1 < m; c1++) {
            for (let c2 = 0; c2 < m; c2++) {
                dp[c1][c2] = (c1 === c2)
                    ? grid[n-1][c1]
                    : grid[n-1][c1] + grid[n-1][c2];
            }
        }

        for (let row = n - 2; row >= 0; row--) {
            let temp = Array.from({ length: m }, () => Array(m).fill(0));

            for (let c1 = 0; c1 < m; c1++) {
                for (let c2 = 0; c2 < m; c2++) {

                    let maxVal = 0;

                    for (let d1 = -1; d1 <= 1; d1++) {
                        for (let d2 = -1; d2 <= 1; d2++) {

                            let nc1 = c1 + d1;
                            let nc2 = c2 + d2;

                            if (nc1 >= 0 && nc1 < m && nc2 >= 0 && nc2 < m) {
                                let val = dp[nc1][nc2];

                                if (c1 === c2)
                                    val += grid[row][c1];
                                else
                                    val += grid[row][c1] + grid[row][c2];

                                maxVal = Math.max(maxVal, val);
                            }
                        }
                    }

                    temp[c1][c2] = maxVal;
                }
            }

            dp = temp;
        }

        return dp[0][m-1];
    }
}
```

### Python3

```python
class Solution:
    def maxChocolate(self, grid):
        n = len(grid)
        m = len(grid[0])

        dp = [[0]*m for _ in range(m)]

        for c1 in range(m):
            for c2 in range(m):
                if c1 == c2:
                    dp[c1][c2] = grid[n-1][c1]
                else:
                    dp[c1][c2] = grid[n-1][c1] + grid[n-1][c2]

        for row in range(n-2, -1, -1):
            temp = [[0]*m for _ in range(m)]

            for c1 in range(m):
                for c2 in range(m):
                    maxi = 0

                    for d1 in [-1, 0, 1]:
                        for d2 in [-1, 0, 1]:

                            nc1 = c1 + d1
                            nc2 = c2 + d2

                            if 0 <= nc1 < m and 0 <= nc2 < m:
                                val = dp[nc1][nc2]

                                if c1 == c2:
                                    val += grid[row][c1]
                                else:
                                    val += grid[row][c1] + grid[row][c2]

                                maxi = max(maxi, val)

                    temp[c1][c2] = maxi

            dp = temp

        return dp[0][m-1]
```

## Step-by-step Detailed Explanation

1. Initialize dp for last row
2. Move from bottom to top
3. For each cell pair (c1, c2), try all 9 moves
4. Skip invalid moves
5. Add chocolates based on same or different cells
6. Store maximum
7. Final answer is dp[0][m-1]

## Examples

Input:
[[4,1,2],[3,6,1],[1,6,6],[3,1,2]]
Output:
32

## How to use / Run locally

* Copy code into your compiler
* Provide grid as input
* Call function maxChocolate

## Notes & Optimizations

* Reduced space using rolling DP
* Avoided recursion to prevent stack overflow
* Efficient for constraints up to 70

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
