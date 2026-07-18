# Cut Matrix | Dynamic Programming Solution | GeeksforGeeks

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

The **Cut Matrix** problem asks us to divide a binary matrix into exactly **k** pieces using horizontal and vertical cuts.

Each piece must contain at least one `1`. After making a horizontal cut, only the bottom part can be divided further. Likewise, after making a vertical cut, only the right part can be divided again.

The goal is to calculate the total number of different valid ways to make these cuts. Since the answer can become very large, it must be returned modulo **1,000,000,007**.

This is a classic **Dynamic Programming on Matrix** problem that also makes use of **2D suffix sums** to speed up repeated calculations.

## Constraints

| Constraint | Value |
|------------|-------|
| Rows (n) | 1 ≤ n ≤ 200 |
| Columns (m) | 1 ≤ m ≤ 200 |
| Pieces (k) | 1 ≤ k ≤ 200 |

## Intuition

The first thing I noticed was that every valid piece must contain at least one `1`. That means before making any cut, I need a fast way to know whether a submatrix still contains a `1`.

Checking every submatrix repeatedly would be far too slow. So instead, I build a **2D suffix sum** that tells me how many `1`s exist in every remaining submatrix.

Once I can answer that question in constant time, the problem naturally becomes a Dynamic Programming problem where each state represents the number of ways to cut a particular submatrix into a given number of pieces.

The remaining challenge is making the transitions fast enough, which is where precomputed valid cut positions and suffix DP sums help.

## Approach

I solve the problem in several simple steps.

1. Build a 2D suffix sum array to count how many `1`s exist in every remaining submatrix.
2. If the entire matrix contains fewer than `k` ones, immediately return `0`.
3. Precompute the next valid horizontal cut for every cell.
4. Precompute the next valid vertical cut for every cell.
5. Initialize Dynamic Programming for one piece.
6. For every additional piece, compute the next DP table.
7. Use suffix sums on the DP table so every transition can be calculated efficiently.
8. Return the answer stored for the complete matrix.

This approach avoids checking every possible cut repeatedly and keeps the solution efficient enough for the given constraints.

## Data Structures Used

| Data Structure | Purpose |
|---------------|---------|
| 2D Array | Store the original matrix |
| 2D Suffix Sum | Count the number of `1`s inside any remaining submatrix |
| DP Table | Store the number of valid ways for every subproblem |
| Next Row Array | Store the first valid horizontal cut |
| Next Column Array | Store the first valid vertical cut |
| Suffix DP Arrays | Speed up DP transitions |

## Operations & Behavior Summary

The algorithm works in the following order.

1. Count the number of `1`s in every suffix submatrix.
2. Quickly reject impossible cases.
3. Find the next valid horizontal cut for every position.
4. Find the next valid vertical cut for every position.
5. Initialize the base DP state.
6. Build suffix sums over the current DP table.
7. Calculate the next DP table using only valid cuts.
8. Repeat until exactly `k` pieces are created.
9. Return the final answer.

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n × m × k)** | Every DP layer processes the complete matrix once. |
| Space Complexity | **O(n × m)** | The solution stores suffix sums, helper arrays, and only the current DP layer. |

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int findWays(vector<vector<int>>& matrix, int k) {
        const int MOD = 1000000007;

        int rows = matrix.size();
        int cols = matrix[0].size();

        // suffixOnes[r][c] = number of 1s inside submatrix (r,c) -> bottom-right
        vector<vector<int>> suffixOnes(rows + 1, vector<int>(cols + 1));

        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 0; c--) {
                suffixOnes[r][c] =
                    matrix[r][c]
                    + suffixOnes[r + 1][c]
                    + suffixOnes[r][c + 1]
                    - suffixOnes[r + 1][c + 1];
            }
        }

        // Even the best cutting strategy cannot create more pieces than total 1s.
        if (suffixOnes[0][0] < k)
            return 0;

        vector<vector<int>> nextRow(rows, vector<int>(cols, rows));
        vector<vector<int>> nextCol(rows, vector<int>(cols, cols));

        // First row where a horizontal cut becomes valid.
        for (int c = 0; c < cols; c++) {
            for (int r = rows - 1; r >= 0; r--) {
                if (suffixOnes[r][c] > suffixOnes[r + 1][c])
                    nextRow[r][c] = r + 1;
                else if (r + 1 < rows)
                    nextRow[r][c] = nextRow[r + 1][c];
            }
        }

        // First column where a vertical cut becomes valid.
        for (int r = 0; r < rows; r++) {
            for (int c = cols - 1; c >= 0; c--) {
                if (suffixOnes[r][c] > suffixOnes[r][c + 1])
                    nextCol[r][c] = c + 1;
                else if (c + 1 < cols)
                    nextCol[r][c] = nextCol[r][c + 1];
            }
        }

        vector<vector<int>> dp(rows + 1, vector<int>(cols + 1));

        // One piece is always valid if this submatrix still contains a 1.
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                dp[r][c] = suffixOnes[r][c] ? 1 : 0;

        for (int pieces = 2; pieces <= k; pieces++) {

            vector<vector<int>> rowSuffix(rows + 1, vector<int>(cols + 1));
            vector<vector<int>> colSuffix(rows + 1, vector<int>(cols + 1));

            for (int r = rows - 1; r >= 0; r--) {
                for (int c = cols - 1; c >= 0; c--) {
                    rowSuffix[r][c] = (rowSuffix[r + 1][c] + dp[r][c]) % MOD;
                    colSuffix[r][c] = (colSuffix[r][c + 1] + dp[r][c]) % MOD;
                }
            }

            vector<vector<int>> current(rows + 1, vector<int>(cols + 1));

            for (int r = 0; r < rows; r++) {
                for (int c = 0; c < cols; c++) {

                    // Need at least one 1 for every remaining piece.
                    if (suffixOnes[r][c] < pieces)
                        continue;

                    long long ways = 0;

                    if (nextRow[r][c] < rows + 1)
                        ways += rowSuffix[nextRow[r][c]][c];

                    if (nextCol[r][c] < cols + 1)
                        ways += colSuffix[r][nextCol[r][c]];

                    current[r][c] = ways % MOD;
                }
            }

            dp.swap(current);
        }

        return dp[0][0];
    }
};
```

### Java

```java
class Solution {

    public int findWays(int[][] matrix, int k) {

        final int MOD = 1000000007;

        int rows = matrix.length;
        int cols = matrix[0].length;

        int[][] suffixOnes = new int[rows + 1][cols + 1];

        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 0; c--) {
                suffixOnes[r][c] =
                        matrix[r][c]
                        + suffixOnes[r + 1][c]
                        + suffixOnes[r][c + 1]
                        - suffixOnes[r + 1][c + 1];
            }
        }

        if (suffixOnes[0][0] < k)
            return 0;

        int[][] nextRow = new int[rows][cols];
        int[][] nextCol = new int[rows][cols];

        for (int[] row : nextRow)
            java.util.Arrays.fill(row, rows);

        for (int[] row : nextCol)
            java.util.Arrays.fill(row, cols);

        for (int c = 0; c < cols; c++) {
            for (int r = rows - 1; r >= 0; r--) {
                if (suffixOnes[r][c] > suffixOnes[r + 1][c])
                    nextRow[r][c] = r + 1;
                else if (r + 1 < rows)
                    nextRow[r][c] = nextRow[r + 1][c];
            }
        }

        for (int r = 0; r < rows; r++) {
            for (int c = cols - 1; c >= 0; c--) {
                if (suffixOnes[r][c] > suffixOnes[r][c + 1])
                    nextCol[r][c] = c + 1;
                else if (c + 1 < cols)
                    nextCol[r][c] = nextCol[r][c + 1];
            }
        }

        int[][] dp = new int[rows + 1][cols + 1];

        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                dp[r][c] = suffixOnes[r][c] > 0 ? 1 : 0;

        for (int pieces = 2; pieces <= k; pieces++) {

            int[][] rowSuffix = new int[rows + 1][cols + 1];
            int[][] colSuffix = new int[rows + 1][cols + 1];

            for (int r = rows - 1; r >= 0; r--) {
                for (int c = cols - 1; c >= 0; c--) {
                    rowSuffix[r][c] = (rowSuffix[r + 1][c] + dp[r][c]) % MOD;
                    colSuffix[r][c] = (colSuffix[r][c + 1] + dp[r][c]) % MOD;
                }
            }

            int[][] current = new int[rows + 1][cols + 1];

            for (int r = 0; r < rows; r++) {
                for (int c = 0; c < cols; c++) {

                    if (suffixOnes[r][c] < pieces)
                        continue;

                    long ways = 0;

                    ways += rowSuffix[nextRow[r][c]][c];
                    ways += colSuffix[r][nextCol[r][c]];

                    current[r][c] = (int) (ways % MOD);
                }
            }

            dp = current;
        }

        return dp[0][0];
    }
}
```

### JavaScript

```javascript
class Solution {
    findWays(matrix, k) {

        const MOD = 1000000007;

        const rows = matrix.length;
        const cols = matrix[0].length;

        // suffixOnes[r][c] stores the number of 1s in the submatrix
        // starting from (r, c) to the bottom-right corner.
        const suffixOnes = Array.from(
            { length: rows + 1 },
            () => Array(cols + 1).fill(0)
        );

        for (let r = rows - 1; r >= 0; r--) {
            for (let c = cols - 1; c >= 0; c--) {
                suffixOnes[r][c] =
                    matrix[r][c]
                    + suffixOnes[r + 1][c]
                    + suffixOnes[r][c + 1]
                    - suffixOnes[r + 1][c + 1];
            }
        }

        // Impossible to create k valid pieces.
        if (suffixOnes[0][0] < k) {
            return 0;
        }

        const nextRow = Array.from(
            { length: rows },
            () => Array(cols).fill(rows)
        );

        const nextCol = Array.from(
            { length: rows },
            () => Array(cols).fill(cols)
        );

        // Find the first valid horizontal cut.
        for (let c = 0; c < cols; c++) {
            for (let r = rows - 1; r >= 0; r--) {
                if (suffixOnes[r][c] > suffixOnes[r + 1][c]) {
                    nextRow[r][c] = r + 1;
                } else if (r + 1 < rows) {
                    nextRow[r][c] = nextRow[r + 1][c];
                }
            }
        }

        // Find the first valid vertical cut.
        for (let r = 0; r < rows; r++) {
            for (let c = cols - 1; c >= 0; c--) {
                if (suffixOnes[r][c] > suffixOnes[r][c + 1]) {
                    nextCol[r][c] = c + 1;
                } else if (c + 1 < cols) {
                    nextCol[r][c] = nextCol[r][c + 1];
                }
            }
        }

        let dp = Array.from(
            { length: rows + 1 },
            () => Array(cols + 1).fill(0)
        );

        // Base case: one valid piece.
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (suffixOnes[r][c] > 0) {
                    dp[r][c] = 1;
                }
            }
        }

        for (let pieces = 2; pieces <= k; pieces++) {

            const rowSuffix = Array.from(
                { length: rows + 1 },
                () => Array(cols + 1).fill(0)
            );

            const colSuffix = Array.from(
                { length: rows + 1 },
                () => Array(cols + 1).fill(0)
            );

            for (let r = rows - 1; r >= 0; r--) {
                for (let c = cols - 1; c >= 0; c--) {
                    rowSuffix[r][c] =
                        (rowSuffix[r + 1][c] + dp[r][c]) % MOD;

                    colSuffix[r][c] =
                        (colSuffix[r][c + 1] + dp[r][c]) % MOD;
                }
            }

            const current = Array.from(
                { length: rows + 1 },
                () => Array(cols + 1).fill(0)
            );

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {

                    if (suffixOnes[r][c] < pieces) {
                        continue;
                    }

                    let ways = 0;

                    ways += rowSuffix[nextRow[r][c]][c];
                    ways += colSuffix[r][nextCol[r][c]];

                    current[r][c] = ways % MOD;
                }
            }

            dp = current;
        }

        return dp[0][0];
    }
}
```

### Python3

```python
class Solution:

    def findWays(self, matrix, k):

        MOD = 10 ** 9 + 7

        rows = len(matrix)
        cols = len(matrix[0])

        # suffix_ones[r][c] stores the number of 1s in the submatrix
        # starting from (r, c) to the bottom-right corner.
        suffix_ones = [[0] * (cols + 1) for _ in range(rows + 1)]

        for r in range(rows - 1, -1, -1):
            for c in range(cols - 1, -1, -1):
                suffix_ones[r][c] = (
                    matrix[r][c]
                    + suffix_ones[r + 1][c]
                    + suffix_ones[r][c + 1]
                    - suffix_ones[r + 1][c + 1]
                )

        # Impossible to create k valid pieces.
        if suffix_ones[0][0] < k:
            return 0

        next_row = [[rows] * cols for _ in range(rows)]
        next_col = [[cols] * cols for _ in range(rows)]

        # Find the first valid horizontal cut.
        for c in range(cols):
            for r in range(rows - 1, -1, -1):
                if suffix_ones[r][c] > suffix_ones[r + 1][c]:
                    next_row[r][c] = r + 1
                elif r + 1 < rows:
                    next_row[r][c] = next_row[r + 1][c]

        # Find the first valid vertical cut.
        for r in range(rows):
            for c in range(cols - 1, -1, -1):
                if suffix_ones[r][c] > suffix_ones[r][c + 1]:
                    next_col[r][c] = c + 1
                elif c + 1 < cols:
                    next_col[r][c] = next_col[r][c + 1]

        dp = [[0] * (cols + 1) for _ in range(rows + 1)]

        # Base case: one valid piece.
        for r in range(rows):
            for c in range(cols):
                if suffix_ones[r][c] > 0:
                    dp[r][c] = 1

        for pieces in range(2, k + 1):

            row_suffix = [[0] * (cols + 1) for _ in range(rows + 1)]
            col_suffix = [[0] * (cols + 1) for _ in range(rows + 1)]

            for r in range(rows - 1, -1, -1):
                for c in range(cols - 1, -1, -1):
                    row_suffix[r][c] = (
                        row_suffix[r + 1][c] + dp[r][c]
                    ) % MOD

                    col_suffix[r][c] = (
                        col_suffix[r][c + 1] + dp[r][c]
                    ) % MOD

            current = [[0] * (cols + 1) for _ in range(rows + 1)]

            for r in range(rows):
                for c in range(cols):

                    if suffix_ones[r][c] < pieces:
                        continue

                    ways = (
                        row_suffix[next_row[r][c]][c]
                        + col_suffix[r][next_col[r][c]]
                    ) % MOD

                    current[r][c] = ways

            dp = current

        return dp[0][0]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in every language. Only the syntax changes.

The first step is building the 2D suffix sum array. Every cell stores the number of `1`s inside the rectangle starting from that position and extending to the bottom-right corner. This lets us know instantly whether a remaining submatrix is valid.

Next, the algorithm checks whether the total number of `1`s is smaller than `k`. If it is, forming `k` valid pieces is impossible, so the answer is immediately `0`.

The algorithm then precomputes the first valid horizontal and vertical cuts for every position. Doing this once prevents repeated searching during Dynamic Programming.

The base DP state represents creating exactly one piece. Any submatrix containing at least one `1` contributes one valid way.

For every additional piece, a new DP table is built.

Instead of trying every possible cut one by one, suffix sums of the previous DP table are used. This allows the algorithm to add all valid transitions in constant time.

After each iteration, the old DP table is replaced with the newly computed one, keeping memory usage low.

Finally, the value corresponding to the complete matrix is returned.

The C++, Java, JavaScript, and Python implementations all follow this same sequence. The only differences are language syntax, array declarations, and loop styles.

## Examples

### Example 1

**Input**

```
matrix = [[1,0,0],[1,1,1],[0,0,0]]
k = 3
```

**Output**

```
3
```

**Explanation**

The matrix can be divided into three valid pieces in exactly three different ways while ensuring every piece contains at least one `1`.

---

### Example 2

**Input**

```
matrix = [[0,0],[1,1]]
k = 2
```

**Output**

```
1
```

**Explanation**

Only one valid vertical cut keeps at least one `1` inside every piece.

---

### Example 3

**Input**

```
matrix = [[1,0],[0,0]]
k = 1
```

**Output**

```
1
```

**Explanation**

No cut is required because the original matrix already forms one valid piece.

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd <repository-folder>
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

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

### JavaScript

Run with Node.js

```bash
node solution.js
```

### Python3

Run

```bash
python solution.py
```

## Notes & Optimizations

- A simple recursive solution would be far too slow.
- Dynamic Programming removes repeated calculations.
- The 2D suffix sum allows every submatrix query to be answered in constant time.
- Precomputing the next valid cut avoids unnecessary searching.
- Reusing only the current DP layer reduces memory usage from `O(n × m × k)` to `O(n × m)`.
- The algorithm handles large matrices efficiently within the given constraints.
- Every answer is computed modulo **1,000,000,007** to avoid integer overflow.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
