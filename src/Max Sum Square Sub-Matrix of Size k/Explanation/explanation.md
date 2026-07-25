# Max Sum Square Sub-Matrix of Size K

A clean and optimized solution for the **Max Sum Square Sub-Matrix of Size K** problem from GeeksforGeeks using the **2D Prefix Sum Algorithm**. This repository explains the intuition, approach, complexity analysis, and provides implementations in multiple programming languages.

The solution is designed for beginners as well as competitive programmers who want to understand how **prefix sums in a matrix** can reduce repeated calculations and achieve an efficient `O(n²)` solution.

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

You are given an `n × n` matrix containing both positive and negative integers, along with an integer `k`.

Your task is to find the **maximum possible sum** among all `k × k` square sub-matrices.

Instead of calculating every square from scratch, the goal is to find an efficient solution that avoids repeating the same calculations again and again.

### Input

- A square matrix `mat[][]`
- An integer `k`

### Output

- Return the maximum sum among all possible `k × k` square sub-matrices.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Matrix Size | `1 ≤ n ≤ 1000` |
| Square Size | `1 ≤ k ≤ n` |
| Matrix Value | `-1000 ≤ mat[i][j] ≤ 1000` |

---

## Intuition

My first thought was to check every possible `k × k` square and calculate its sum.

That works, but it repeats the same additions many times. For large matrices, that becomes very slow.

I realized that every square overlaps with many other squares. So instead of adding the same numbers repeatedly, I can preprocess the matrix once using a **2D Prefix Sum**.

Once the prefix sum matrix is ready, I can calculate the sum of any square in constant time. Then I only need to check every possible square and keep the maximum answer.

---

## Approach

I solve the problem in two main steps.

First, I build a **2D prefix sum matrix**.

Each cell stores the sum of every element from the top-left corner `(0,0)` up to that position.

After that, I consider every possible `k × k` square.

For each square:

1. Find its top-left and bottom-right coordinates.
2. Use the prefix sum matrix to calculate the square's sum in constant time.
3. Compare it with the current maximum.
4. Update the answer whenever I find a larger sum.

Finally, I return the maximum sum.

---

## Data Structures Used

### Matrix

Stores the original input values.

### 2D Prefix Sum Matrix

Stores cumulative sums so that the sum of any rectangular region can be calculated in constant time.

### Integer Variables

Used for:

- Current square sum
- Maximum answer
- Matrix indices

---

## Operations & Behavior Summary

The algorithm performs these major steps:

1. Read the input matrix.
2. Build a 2D prefix sum matrix.
3. Visit every possible `k × k` square.
4. Calculate its sum using the prefix matrix.
5. Compare it with the best answer found so far.
6. Return the largest sum.

The key advantage is that every square sum is calculated in `O(1)` time after preprocessing.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | `O(n²)` | Building the prefix sum matrix takes `O(n²)`, and checking every possible square also takes `O(n²)`. Each square sum is computed in constant time. |
| Space Complexity | `O(n²)` | An additional prefix sum matrix of size `n × n` is used. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maximumSum(vector<vector<int>>& mat, int k) {
        int n = mat.size();

        // Prefix sum matrix
        vector<vector<int>> prefix(n, vector<int>(n, 0));

        // Build the prefix sum matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {

                // Current cell value
                prefix[i][j] = mat[i][j];

                // Add the sum from the top
                if (i > 0)
                    prefix[i][j] += prefix[i - 1][j];

                // Add the sum from the left
                if (j > 0)
                    prefix[i][j] += prefix[i][j - 1];

                // Remove the overlapping area counted twice
                if (i > 0 && j > 0)
                    prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        // Store the maximum square sum
        int ans = INT_MIN;

        // Iterate through every possible k x k square
        for (int i = k - 1; i < n; i++) {
            for (int j = k - 1; j < n; j++) {

                // Coordinates of the top-left corner
                int r = i - k + 1;
                int c = j - k + 1;

                // Start with the complete prefix sum
                int sum = prefix[i][j];

                // Remove the area above the square
                if (r > 0)
                    sum -= prefix[r - 1][j];

                // Remove the area left of the square
                if (c > 0)
                    sum -= prefix[i][c - 1];

                // Add back the overlapping area
                if (r > 0 && c > 0)
                    sum += prefix[r - 1][c - 1];

                // Update the maximum answer
                ans = max(ans, sum);
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int maximumSum(int[][] mat, int k) {

        int n = mat.length;

        // Prefix sum matrix
        int[][] prefix = new int[n][n];

        // Build the prefix sum matrix
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {

                // Current cell value
                prefix[i][j] = mat[i][j];

                // Add the sum from the top
                if (i > 0)
                    prefix[i][j] += prefix[i - 1][j];

                // Add the sum from the left
                if (j > 0)
                    prefix[i][j] += prefix[i][j - 1];

                // Remove the overlapping area
                if (i > 0 && j > 0)
                    prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        // Store the maximum answer
        int ans = Integer.MIN_VALUE;

        // Check every possible k x k square
        for (int i = k - 1; i < n; i++) {
            for (int j = k - 1; j < n; j++) {

                // Top-left corner
                int r = i - k + 1;
                int c = j - k + 1;

                // Current square sum
                int sum = prefix[i][j];

                // Remove upper part
                if (r > 0)
                    sum -= prefix[r - 1][j];

                // Remove left part
                if (c > 0)
                    sum -= prefix[i][c - 1];

                // Add overlap
                if (r > 0 && c > 0)
                    sum += prefix[r - 1][c - 1];

                // Update answer
                ans = Math.max(ans, sum);
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    maximumSum(mat, k) {

        const n = mat.length;

        // Prefix sum matrix
        const prefix = Array.from({ length: n }, () => Array(n).fill(0));

        // Build the prefix sum matrix
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {

                // Current cell value
                prefix[i][j] = mat[i][j];

                // Add top value
                if (i > 0)
                    prefix[i][j] += prefix[i - 1][j];

                // Add left value
                if (j > 0)
                    prefix[i][j] += prefix[i][j - 1];

                // Remove overlap
                if (i > 0 && j > 0)
                    prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        // Store maximum answer
        let ans = -Infinity;

        // Check every possible k x k square
        for (let i = k - 1; i < n; i++) {
            for (let j = k - 1; j < n; j++) {

                // Top-left corner
                const r = i - k + 1;
                const c = j - k + 1;

                // Current square sum
                let sum = prefix[i][j];

                // Remove upper part
                if (r > 0)
                    sum -= prefix[r - 1][j];

                // Remove left part
                if (c > 0)
                    sum -= prefix[i][c - 1];

                // Add overlap
                if (r > 0 && c > 0)
                    sum += prefix[r - 1][c - 1];

                // Update answer
                ans = Math.max(ans, sum);
            }
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maximumSum(self, mat, k):

        n = len(mat)

        # Prefix sum matrix
        prefix = [[0] * n for _ in range(n)]

        # Build the prefix sum matrix
        for i in range(n):
            for j in range(n):

                # Current cell value
                prefix[i][j] = mat[i][j]

                # Add value from top
                if i > 0:
                    prefix[i][j] += prefix[i - 1][j]

                # Add value from left
                if j > 0:
                    prefix[i][j] += prefix[i][j - 1]

                # Remove overlapping area
                if i > 0 and j > 0:
                    prefix[i][j] -= prefix[i - 1][j - 1]

        # Store the maximum answer
        ans = float("-inf")

        # Check every possible k x k square
        for i in range(k - 1, n):
            for j in range(k - 1, n):

                # Top-left corner
                r = i - k + 1
                c = j - k + 1

                # Current square sum
                total = prefix[i][j]

                # Remove upper area
                if r > 0:
                    total -= prefix[r - 1][j]

                # Remove left area
                if c > 0:
                    total -= prefix[i][c - 1]

                # Add overlapping area
                if r > 0 and c > 0:
                    total += prefix[r - 1][c - 1]

                # Update answer
                ans = max(ans, total)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages.

The only difference is the syntax used to declare arrays, loops, and variables.

### Step 1

Read the input matrix.

This matrix contains all the original values.

### Step 2

Create another matrix of the same size.

This will store the prefix sums.

Each cell represents the total sum from the top-left corner to that position.

### Step 3

Fill the prefix matrix.

For every cell:

- Start with its own value.
- Add the value above it.
- Add the value to its left.
- Subtract the overlapping region because it gets counted twice.

After this step, every rectangle sum becomes easy to calculate.

### Step 4

Loop through every possible `k × k` square.

Instead of checking every element inside the square, calculate its sum directly using the prefix matrix.

This makes every query extremely fast.

### Step 5

Keep comparing every square's sum with the current maximum.

Whenever a larger sum appears, update the answer.

### Step 6

After every square has been checked, return the maximum value.

Since the algorithm processes each cell only a constant number of times, it stays efficient even for large matrices.

---

## Examples

### Example 1

**Input**

```text
k = 3

mat =
[
 [1, 2, -1, 4],
 [-8, -3, 4, 2],
 [3, 8, 10, -8],
 [-4, -1, 1, 7]
]
```

**Output**

```text
20
```

**Explanation**

The best `3 × 3` square is:

```text
-3   4   2
 8  10  -8
-1   1   7
```

Its sum is `20`.

---

### Example 2

**Input**

```text
k = 1

mat =
[
 [4]
]
```

**Output**

```text
4
```

**Explanation**

There is only one possible square.

So the answer is `4`.

---

### Example 3

**Input**

```text
k = 2

mat =
[
 [1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]
]
```

**Output**

```text
28
```

**Explanation**

The best square is:

```text
5 6
8 9
```

Its total sum is `28`.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project folder.

```bash
cd <repository-folder>
```

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

Run using Node.js.

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

- This solution uses the **2D Prefix Sum Algorithm**, which is one of the standard techniques for matrix range sum problems.
- Calculating every square separately would take `O(n² × k²)`, which becomes too slow for large inputs.
- Using prefix sums reduces each square sum calculation to constant time.
- The algorithm works correctly even when the matrix contains negative values.
- When `k = 1`, the answer is simply the largest element in the matrix.
- When `k = n`, the answer becomes the sum of the entire matrix.
- This approach is widely used in competitive programming and coding interviews for rectangle sum and matrix query problems.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
