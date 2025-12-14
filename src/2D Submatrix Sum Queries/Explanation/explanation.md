# 2D Submatrix Sum Queries

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given a 2D integer matrix and multiple queries.
Each query asks for the **sum of elements inside a submatrix** defined by:

* Top-left corner `(r1, c1)`
* Bottom-right corner `(r2, c2)`

My task is to return the sum for **each query efficiently**.

---

## Constraints

* `1 ≤ n × m, q ≤ 10^5`
* `0 ≤ mat[i][j] ≤ 10^4`
* `0 ≤ r1 ≤ r2 < n`
* `0 ≤ c1 ≤ c2 < m`

Because the number of queries can be very large, a brute-force solution will be too slow.

---

## Intuition

When I first saw this problem, I realized one thing quickly:

If I calculate the sum for each query by looping through the submatrix,
the solution will be **too slow** for large inputs.

So I thought:

> “Why should I calculate the same sums again and again?”

That’s when I decided to use a **2D Prefix Sum**, where I pre-calculate sums once and reuse them for all queries.

---

## Approach

I solved this problem using **2D Prefix Sum**.

Here is how I did it step by step:

1. I created a `prefix` matrix of the same size as the original matrix.
2. Each cell `prefix[i][j]` stores the sum of elements from `(0,0)` to `(i,j)`.
3. I filled the prefix matrix using a fixed mathematical formula.
4. For each query, I calculated the submatrix sum in **O(1)** time using the prefix matrix.
5. I stored all answers in a list and returned it.

This makes the solution fast and scalable.

---

## Data Structures Used

* 2D Array (Prefix Sum Matrix)
* List / ArrayList / Vector (to store query results)

No advanced data structures are required.

---

## Operations & Behavior Summary

* Prefix matrix is built **only once**
* Each query uses **four prefix values**
* Overlapping area is handled using subtraction
* Every query runs in constant time

---

## Complexity

**Time Complexity**

* Prefix matrix creation: `O(n × m)`
* Processing all queries: `O(q)`
* Total: `O(n × m + q)`

**Space Complexity**

* Prefix matrix: `O(n × m)`
* Output list: `O(q)`

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> prefixSum2D(vector<vector<int>> &mat, vector<vector<int>> &queries) {

        int n = mat.size(), m = mat[0].size();
        vector<vector<int>> prefix(n, vector<int>(m, 0));

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                prefix[i][j] = mat[i][j];
                if (i > 0) prefix[i][j] += prefix[i - 1][j];
                if (j > 0) prefix[i][j] += prefix[i][j - 1];
                if (i > 0 && j > 0) prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        vector<int> result;

        for (auto &q : queries) {
            int r1 = q[0], c1 = q[1], r2 = q[2], c2 = q[3];
            int sum = prefix[r2][c2];

            if (r1 > 0) sum -= prefix[r1 - 1][c2];
            if (c1 > 0) sum -= prefix[r2][c1 - 1];
            if (r1 > 0 && c1 > 0) sum += prefix[r1 - 1][c1 - 1];

            result.push_back(sum);
        }

        return result;
    }
};
```

---

### Java

```java
class Solution {
    public ArrayList<Integer> prefixSum2D(int[][] mat, int[][] queries) {

        int n = mat.length, m = mat[0].length;
        int[][] prefix = new int[n][m];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                prefix[i][j] = mat[i][j];
                if (i > 0) prefix[i][j] += prefix[i - 1][j];
                if (j > 0) prefix[i][j] += prefix[i][j - 1];
                if (i > 0 && j > 0) prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        ArrayList<Integer> result = new ArrayList<>();

        for (int[] q : queries) {
            int r1 = q[0], c1 = q[1], r2 = q[2], c2 = q[3];
            int sum = prefix[r2][c2];

            if (r1 > 0) sum -= prefix[r1 - 1][c2];
            if (c1 > 0) sum -= prefix[r2][c1 - 1];
            if (r1 > 0 && c1 > 0) sum += prefix[r1 - 1][c1 - 1];

            result.add(sum);
        }

        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    prefixSum2D(mat, queries) {

        const n = mat.length, m = mat[0].length;
        const prefix = Array.from({ length: n }, () => Array(m).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                prefix[i][j] = mat[i][j];
                if (i > 0) prefix[i][j] += prefix[i - 1][j];
                if (j > 0) prefix[i][j] += prefix[i][j - 1];
                if (i > 0 && j > 0) prefix[i][j] -= prefix[i - 1][j - 1];
            }
        }

        const result = [];

        for (const [r1, c1, r2, c2] of queries) {
            let sum = prefix[r2][c2];
            if (r1 > 0) sum -= prefix[r1 - 1][c2];
            if (c1 > 0) sum -= prefix[r2][c1 - 1];
            if (r1 > 0 && c1 > 0) sum += prefix[r1 - 1][c1 - 1];
            result.push(sum);
        }

        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def prefixSum2D(self, mat, queries):

        n, m = len(mat), len(mat[0])
        prefix = [[0]*m for _ in range(n)]

        for i in range(n):
            for j in range(m):
                prefix[i][j] = mat[i][j]
                if i > 0:
                    prefix[i][j] += prefix[i-1][j]
                if j > 0:
                    prefix[i][j] += prefix[i][j-1]
                if i > 0 and j > 0:
                    prefix[i][j] -= prefix[i-1][j-1]

        result = []

        for r1, c1, r2, c2 in queries:
            total = prefix[r2][c2]
            if r1 > 0:
                total -= prefix[r1-1][c2]
            if c1 > 0:
                total -= prefix[r2][c1-1]
            if r1 > 0 and c1 > 0:
                total += prefix[r1-1][c1-1]
            result.append(total)

        return result
```

---

## Step-by-step Detailed Explanation

1. I created a prefix matrix to store cumulative sums.
2. Each prefix cell stores the sum of elements above and left.
3. I removed double-counted areas using subtraction.
4. For each query, I used four prefix values to compute the result.
5. This made every query run in constant time.

---

## Examples

**Input**

```
Matrix:
1 2 3
1 1 0
4 2 2

Query: [0, 0, 1, 1]
```

**Output**

```
5
```

---

## How to Use / Run Locally

1. Clone the repository
2. Choose your preferred language file
3. Compile and run using standard compiler/interpreter
4. Pass matrix and queries as input

---

## Notes & Optimizations

* This solution avoids repeated calculations
* Works efficiently for large inputs
* Can be extended to dynamic updates using Fenwick Tree or Segment Tree

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
