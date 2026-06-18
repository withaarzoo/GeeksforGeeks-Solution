# Coverage of all Zeros in a Binary Matrix | GeeksforGeeks Solution

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

The **Coverage of all Zeros in a Binary Matrix** problem asks us to calculate the total coverage value of every `0` present in a binary matrix.

For each zero cell, we check four directions:

* Left
* Right
* Up
* Down

A direction contributes `1` to the coverage if there is at least one `1` somewhere between the current zero cell and the matrix boundary in that direction.

The final answer is the sum of coverage values of all zero cells.

This is a popular **matrix problem** on GeeksforGeeks that tests observation skills, matrix traversal, and efficient counting techniques.

## Constraints

| Constraint    | Value        |
| ------------- | ------------ |
| Rows          | 1 ≤ n ≤ 100  |
| Columns       | 1 ≤ m ≤ 100  |
| Matrix Values | Only 0 and 1 |

## Intuition

When I first looked at the problem, my instinct was to check all four directions separately for every zero cell.

That works, but it wastes time because the same rows and columns get scanned repeatedly.

Then I noticed something important:

For each direction, I don't need to know how many `1`s exist. I only need to know whether at least one `1` exists.

Once I realized that, the problem became a counting problem instead of a searching problem.

By keeping track of how many `1`s exist in rows and columns, I can determine coverage in constant time for each cell.

This allows the entire matrix to be processed efficiently.

## Approach

1. Count the total number of `1`s present in every column.
2. Traverse the matrix row by row.
3. For each row:

   * Calculate the total number of `1`s in that row.
   * Maintain a count of `1`s already seen on the left.
4. Whenever a zero cell is found:

   * Check whether there is any `1` on the left.
   * Check whether there is any `1` on the right.
   * Check whether there is any `1` above.
   * Check whether there is any `1` below.
5. Add all valid directional contributions.
6. Update column information after finishing the current row.
7. Return the final coverage sum.

This approach avoids repeatedly scanning rows and columns.

## Data Structures Used

| Data Structure    | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| Matrix            | Stores the binary grid                            |
| Array             | Stores total number of `1`s in each column        |
| Array             | Stores number of `1`s seen above the current row  |
| Integer Variables | Maintain row totals, left-side counts, and answer |

No additional matrix is required.

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Read the matrix dimensions.
2. Compute total `1`s for every column.
3. Start traversing rows.
4. Compute total `1`s in the current row.
5. Keep track of `1`s already encountered in the row.
6. For every zero cell:

   * Determine left coverage.
   * Determine right coverage.
   * Determine upward coverage.
   * Determine downward coverage.
7. Add the coverage value to the answer.
8. Update column prefix information.
9. Continue until all rows are processed.
10. Return the total coverage.

## Complexity

| Metric           | Complexity | Explanation                                               |
| ---------------- | ---------- | --------------------------------------------------------- |
| Time Complexity  | O(n × m)   | Every matrix cell is processed a constant number of times |
| Space Complexity | O(m)       | Only column-related arrays are used                       |

Where:

* `n` = number of rows
* `m` = number of columns

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findCoverage(vector<vector<int>>& mat) {
        // Get matrix dimensions so I can scan it safely.
        int n = mat.size();
        int m = mat[0].size();

        // colTotal[j] stores total number of 1s in column j.
        vector<int> colTotal(m, 0);

        // First pass: count total 1s in every column.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                colTotal[j] += mat[i][j];
            }
        }

        // colPrefix[j] stores number of 1s seen in column j in rows above the current row.
        vector<int> colPrefix(m, 0);

        int ans = 0;

        // Second pass: compute coverage for every zero cell.
        for (int i = 0; i < n; i++) {
            // rowTotal stores total number of 1s in the current row.
            int rowTotal = 0;
            for (int j = 0; j < m; j++) {
                rowTotal += mat[i][j];
            }

            // leftOnes stores number of 1s already seen to the left in the current row.
            int leftOnes = 0;

            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 0) {
                    int coverage = 0;

                    // If I have already seen a 1 on the left, left direction is covered.
                    if (leftOnes > 0) coverage++;

                    // If there is at least one 1 after this cell in the row, right is covered.
                    if (rowTotal - leftOnes > 0) coverage++;

                    // If there is at least one 1 above this cell, up is covered.
                    if (colPrefix[j] > 0) coverage++;

                    // If there is at least one 1 below this cell, down is covered.
                    if (colTotal[j] - colPrefix[j] > 0) coverage++;

                    ans += coverage;
                } else {
                    // Current cell is 1, so it may help future zero cells on the right.
                    leftOnes++;
                }
            }

            // After finishing the row, update column prefixes with the current row's 1s.
            // I do this at the end so the current row is not counted in "up".
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    colPrefix[j]++;
                }
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int findCoverage(int[][] mat) {
        // Get matrix size so I can scan all cells correctly.
        int n = mat.length;
        int m = mat[0].length;

        // colTotal[j] stores the total number of 1s in column j.
        int[] colTotal = new int[m];

        // First pass: count all 1s in every column.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                colTotal[j] += mat[i][j];
            }
        }

        // colPrefix[j] stores the number of 1s seen in column j in rows above the current row.
        int[] colPrefix = new int[m];

        int ans = 0;

        // Second pass: compute the coverage of every zero cell.
        for (int i = 0; i < n; i++) {
            // rowTotal stores the total number of 1s in the current row.
            int rowTotal = 0;
            for (int j = 0; j < m; j++) {
                rowTotal += mat[i][j];
            }

            // leftOnes stores how many 1s I have already seen on the left side of this row.
            int leftOnes = 0;

            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 0) {
                    int coverage = 0;

                    // Left direction is covered if I have seen at least one 1 before this cell.
                    if (leftOnes > 0) coverage++;

                    // Right direction is covered if there is at least one 1 after this cell.
                    if (rowTotal - leftOnes > 0) coverage++;

                    // Up direction is covered if there is at least one 1 above this cell.
                    if (colPrefix[j] > 0) coverage++;

                    // Down direction is covered if there is at least one 1 below this cell.
                    if (colTotal[j] - colPrefix[j] > 0) coverage++;

                    ans += coverage;
                } else {
                    // Current cell is 1, so it can help zero cells on its right.
                    leftOnes++;
                }
            }

            // Update column prefixes only after finishing the row.
            // This keeps the current row out of the "up" count.
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    colPrefix[j]++;
                }
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    findCoverage(mat) {
        // Get matrix dimensions so I can traverse it cleanly.
        const n = mat.length;
        const m = mat[0].length;

        // colTotal[j] stores the total number of 1s in column j.
        const colTotal = new Array(m).fill(0);

        // First pass: count 1s in every column.
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                colTotal[j] += mat[i][j];
            }
        }

        // colPrefix[j] stores how many 1s I have already seen above the current row in column j.
        const colPrefix = new Array(m).fill(0);

        let ans = 0;

        // Second pass: compute coverage for each zero cell.
        for (let i = 0; i < n; i++) {
            // rowTotal stores total 1s in the current row.
            let rowTotal = 0;
            for (let j = 0; j < m; j++) {
                rowTotal += mat[i][j];
            }

            // leftOnes stores how many 1s are already on the left of the current cell.
            let leftOnes = 0;

            for (let j = 0; j < m; j++) {
                if (mat[i][j] === 0) {
                    let coverage = 0;

                    // Check left side.
                    if (leftOnes > 0) coverage++;

                    // Check right side.
                    if (rowTotal - leftOnes > 0) coverage++;

                    // Check upper side.
                    if (colPrefix[j] > 0) coverage++;

                    // Check lower side.
                    if (colTotal[j] - colPrefix[j] > 0) coverage++;

                    ans += coverage;
                } else {
                    // A 1 helps future cells on the right side.
                    leftOnes++;
                }
            }

            // Update column prefixes after the row is fully processed.
            // I do this here so the current row does not affect the "up" check.
            for (let j = 0; j < m; j++) {
                if (mat[i][j] === 1) {
                    colPrefix[j]++;
                }
            }
        }

        return ans;
    }
};
```

### Python3

```python
class Solution:
    def findCoverage(self, mat):
        # Get matrix dimensions so I can scan every cell.
        n = len(mat)
        m = len(mat[0])

        # colTotal[j] stores the total number of 1s in column j.
        colTotal = [0] * m

        # First pass: count all 1s in every column.
        for i in range(n):
            for j in range(m):
                colTotal[j] += mat[i][j]

        # colPrefix[j] stores the number of 1s seen above the current row in column j.
        colPrefix = [0] * m

        ans = 0

        # Second pass: compute coverage for every zero cell.
        for i in range(n):
            # rowTotal stores the total number of 1s in the current row.
            rowTotal = sum(mat[i])

            # leftOnes stores the number of 1s already seen on the left side of the row.
            leftOnes = 0

            for j in range(m):
                if mat[i][j] == 0:
                    coverage = 0

                    # Left direction is covered if there is at least one 1 before this cell.
                    if leftOnes > 0:
                        coverage += 1

                    # Right direction is covered if there is at least one 1 after this cell.
                    if rowTotal - leftOnes > 0:
                        coverage += 1

                    # Up direction is covered if there is at least one 1 above this cell.
                    if colPrefix[j] > 0:
                        coverage += 1

                    # Down direction is covered if there is at least one 1 below this cell.
                    if colTotal[j] - colPrefix[j] > 0:
                        coverage += 1

                    ans += coverage
                else:
                    # Current cell is 1, so it can help zero cells to the right.
                    leftOnes += 1

            # Update column prefixes only after the whole row is done.
            # This keeps the current row out of the "up" check.
            for j in range(m):
                if mat[i][j] == 1:
                    colPrefix[j] += 1

        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Count Column Totals

Before calculating coverage, I count how many `1`s exist in every column.

This information later helps determine whether a zero cell has any `1`s below it.

Without this preprocessing step, I would need to scan downward repeatedly, which would increase the time complexity.

### Step 2: Process Each Row

For every row, I calculate the total number of `1`s present in that row.

This value allows me to quickly determine whether there are any `1`s to the right of the current cell.

### Step 3: Maintain Left Information

While moving from left to right, I maintain a running count of the `1`s already encountered.

Whenever I reach a zero cell:

* If the count is greater than zero, the left side is covered.
* Otherwise, the left side is not covered.

This removes the need to scan left repeatedly.

### Step 4: Check Right Coverage

The total number of row `1`s is already known.

By subtracting the `1`s already seen on the left, I can determine whether any `1`s remain on the right side.

If at least one remains, the right direction contributes to the coverage.

### Step 5: Check Up Coverage

A column prefix array stores how many `1`s have appeared in previous rows.

If this count is greater than zero, then at least one `1` exists above the current cell.

### Step 6: Check Down Coverage

The total number of `1`s in a column is known.

Subtracting the number of `1`s already seen above gives the number of remaining `1`s below.

If the result is greater than zero, downward coverage exists.

### Step 7: Add Coverage

For each zero cell, the valid directional contributions are added together.

The resulting value represents the coverage of that specific cell.

That value is then added to the final answer.

### Step 8: Update Column Information

After processing an entire row, column prefix counts are updated.

This is important because the current row should not be considered part of the "up" direction while it is still being processed.

### Why This Works

Each direction is evaluated using previously computed counts instead of repeated scans.

As a result:

* Every cell is handled efficiently.
* No unnecessary traversal occurs.
* The solution remains linear with respect to matrix size.

## Examples

### Example 1

**Input**

```text
[
 [1, 1, 1, 0],
 [1, 0, 0, 1]
]
```

**Output**

```text
8
```

**Trace**

* Zero at (0,3) → Coverage = 2
* Zero at (1,1) → Coverage = 3
* Zero at (1,2) → Coverage = 3

Total = 2 + 3 + 3 = 8

---

### Example 2

**Input**

```text
[
 [0,1,0],
 [0,1,1],
 [0,0,0]
]
```

**Output**

```text
6
```

**Trace**

Coverage values:

* (0,0) → 1
* (0,2) → 1
* (1,0) → 2
* (2,0) → 0
* (2,1) → 1
* (2,2) → 1

Total = 6

---

### Example 3

**Input**

```text
[
 [0,1]
]
```

**Output**

```text
1
```

**Trace**

* Right direction contains a `1`
* Other directions contain no `1`

Coverage = 1

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
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

Run using Node.js:

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

## Notes & Optimizations

* A brute-force solution would scan four directions for every zero cell.
* That approach can become significantly slower because rows and columns are traversed repeatedly.
* Using row counts and column counts avoids redundant work.
* The solution achieves linear traversal of the matrix.
* Only column-based auxiliary storage is required.
* The approach handles:

  * Single-row matrices
  * Single-column matrices
  * Matrices containing only zeros
  * Matrices containing only ones
  * Sparse and dense binary matrices

This makes the solution efficient, scalable, and suitable for competitive programming interviews and coding contests.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)