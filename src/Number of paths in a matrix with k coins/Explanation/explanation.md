# Number of Paths in a Matrix with K Coins

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

You are given a matrix `mat` of size `n x m`. Each cell contains some coins `mat[i][j]`.
Starting at the **top-left** cell `(0,0)`, you may move only **right** or **down** until you reach the **bottom-right** cell `(n-1, m-1)`.
Count how many distinct paths collect **exactly `k` coins**.

Return the count (it is guaranteed to fit in a 32-bit integer).

---

## Constraints

* `1 ≤ k ≤ 100`
* `1 ≤ n, m ≤ 100`
* `0 ≤ mat[i][j] ≤ 200`
* Moves allowed: **Right** `(i, j+1)` and **Down** `(i+1, j)`

---

## Intuition

I thought of this as a standard grid DP problem.
Every path to `(i, j)` must come from either the **top** `(i-1, j)` or the **left** `(i, j-1)`.
If I also track the **sum of coins** I have collected so far, then for each cell and each possible sum, I can count the ways.

Formally, if `val = mat[i][j]`, then:

```
ways to reach (i, j) with sum s
  = ways to reach (i-1, j) with sum (s - val)
  + ways to reach (i, j-1) with sum (s - val)
```

---

## Approach

1. Let `dp[i][j][s]` be the number of ways to reach cell `(i, j)` with **exact** sum `s`.
2. **Base:** `dp[0][0][mat[0][0]] = 1` (if `mat[0][0] ≤ k`).
3. Iterate all cells row-wise. For each cell value `val = mat[i][j]` and each sum `s` from `val` to `k`, do:

   * Add ways from **top** if `i > 0`.
   * Add ways from **left** if `j > 0`.
4. The answer is `dp[n-1][m-1][k]`.

Space can be optimized to `O(m * k)` by rolling rows, but the straightforward 3D DP is clean and safe under constraints.

---

## Data Structures Used

* 3D DP array `dp[n][m][k+1]` storing integer counts.
  (Optional optimization: 2D array `dp[m][k+1]` with row-rolling.)

---

## Operations & Behavior Summary

* For every cell `(i, j)` and target sum `s`:

  * Combine counts from its valid predecessors using `s - mat[i][j]`.
* Ignore sums `< mat[i][j]` because they are impossible for that cell.
* If `mat[0][0] > k`, there are **0** valid paths.

---

## Complexity

* **Time Complexity:** `O(n * m * k)` — we fill states for each cell and each possible sum `0..k`.
* **Space Complexity:**

  * **Naive DP:** `O(n * m * k)` for the 3D table.
  * **Optimized:** `O(m * k)` using two rows (previous and current).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int numberOfPath(vector<vector<int>>& mat, int k) {
        int n = mat.size(), m = mat[0].size();
        // dp[i][j][s]: ways to reach (i,j) with exact sum s
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(m, vector<int>(k+1, 0)));

        if (mat[0][0] <= k) dp[0][0][mat[0][0]] = 1;

        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                if (i == 0 && j == 0) continue;
                int val = mat[i][j];
                for (int s = val; s <= k; ++s) {
                    long long ways = 0;
                    if (i > 0) ways += dp[i-1][j][s - val];
                    if (j > 0) ways += dp[i][j-1][s - val];
                    dp[i][j][s] = (int)ways; // guaranteed to fit 32-bit
                }
            }
        }
        return dp[n-1][m-1][k];
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int numberOfPath(int[][] mat, int k) {
        int n = mat.length, m = mat[0].length;
        int[][][] dp = new int[n][m][k + 1];

        if (mat[0][0] <= k) dp[0][0][mat[0][0]] = 1;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (i == 0 && j == 0) continue;
                int val = mat[i][j];
                for (int s = val; s <= k; s++) {
                    int ways = 0;
                    if (i > 0) ways += dp[i - 1][j][s - val];
                    if (j > 0) ways += dp[i][j - 1][s - val];
                    dp[i][j][s] = ways;
                }
            }
        }
        return dp[n - 1][m - 1][k];
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} mat
 * @param {number} k
 * @returns {number}
 */
class Solution {
    numberOfPath(mat, k) {
        const n = mat.length, m = mat[0].length;
        const dp = Array.from({ length: n }, () =>
            Array.from({ length: m }, () => new Array(k + 1).fill(0))
        );

        if (mat[0][0] <= k) dp[0][0][mat[0][0]] = 1;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (i === 0 && j === 0) continue;
                const val = mat[i][j];
                for (let s = val; s <= k; s++) {
                    let ways = 0;
                    if (i > 0) ways += dp[i - 1][j][s - val];
                    if (j > 0) ways += dp[i][j - 1][s - val];
                    dp[i][j][s] = ways;
                }
            }
        }
        return dp[n - 1][m - 1][k];
    }
}
```

### Python3

```python
class Solution:
    def numberOfPath(self, mat, k):
        n, m = len(mat), len(mat[0])
        dp = [[[0]*(k+1) for _ in range(m)] for __ in range(n)]

        if mat[0][0] <= k:
            dp[0][0][mat[0][0]] = 1

        for i in range(n):
            for j in range(m):
                if i == 0 and j == 0:
                    continue
                val = mat[i][j]
                for s in range(val, k+1):
                    ways = 0
                    if i > 0:
                        ways += dp[i-1][j][s - val]
                    if j > 0:
                        ways += dp[i][j-1][s - val]
                    dp[i][j][s] = ways

        return dp[n-1][m-1][k]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. **Define the state**
   `dp[i][j][s]` = number of ways to reach `(i, j)` with exactly `s` coins.

2. **Initialize**

   * If `mat[0][0] ≤ k`, set `dp[0][0][mat[0][0]] = 1`.
   * This means: there is exactly one way to start at `(0,0)` with that sum — by starting there.

3. **Iterate cells**

   * Traverse rows `i = 0..n-1`, columns `j = 0..m-1`.
   * Skip `(0,0)` since it’s already initialized.

4. **Transition for each sum**

   * Let `val = mat[i][j]`.
   * For each sum `s` from `val` to `k`:

     * Coming from **top** contributes `dp[i-1][j][s - val]` if `i > 0`.
     * Coming from **left** contributes `dp[i][j-1][s - val]` if `j > 0`.
     * Sum them to get `dp[i][j][s]`.

5. **Answer**

   * After the loops, the result is `dp[n-1][m-1][k]`.

6. **Why it works**

   * We only move right or down, so all paths to `(i, j)` must pass through its immediate predecessors.
   * We preserve exact sums by subtracting the current cell `val` when referencing predecessor states.

---

## Examples

**Example 1**

```
k = 12
mat =
[
  [1, 2, 3],
  [4, 6, 5],
  [3, 2, 1]
]
Output: 2
Explanation:
Paths with sum 12:
(1 + 2 + 6 + 2 + 1), (1 + 2 + 3 + 5 + 1)
```

**Example 2**

```
k = 16
mat =
[
  [1, 2, 3],
  [4, 6, 5],
  [9, 8, 7]
]
Output: 0
Explanation:
No path collects exactly 16 coins.
```

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 -O2 main.cpp -o app
./app
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

```bash
node main.js
```

### Python3

```bash
python3 main.py
```

Each `main.*` should:

* Build the matrix `mat`, set `k`, create `Solution` instance, and print `solution.numberOfPath(mat, k)`.

---

## Notes & Optimizations

* **Space Optimization:** Use two rows `prev[m][k+1]` and `curr[m][k+1]` to reduce space to `O(m*k)`. Update `curr` left-to-right using `prev[j]` (top) and `curr[j-1]` (left), then swap.
* **Early Skips:** If a cell’s value `val > k`, skip processing sums (no valid sum can include it by itself).
* **Bounds:** Problem guarantees result fits in 32-bit `int`, so no modulo is required.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
