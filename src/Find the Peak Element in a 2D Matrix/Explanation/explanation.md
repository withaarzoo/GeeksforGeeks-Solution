# Find the Peak Element in a 2D Matrix

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

Given a 2D matrix `mat[][]`, the task is to find **any peak element**.

An element is considered a **peak** if it is **greater than or equal to** its four immediate neighbors:

* Top
* Bottom
* Left
* Right

For boundary elements (edges and corners), missing neighbors are treated as **negative infinity**.

If multiple peak elements exist, returning **any one** of them is acceptable.

---

## Constraints

* `1 ≤ n × m ≤ 10^6`
* `-10^6 ≤ mat[i][j] ≤ 10^6`
* Matrix can have **one row, one column, or both**

---

## Intuition

When I started thinking about this problem, I realized something important:

The problem **does not ask for the maximum element**, it only asks for **any valid peak**.

So instead of applying complex logic or binary search, I thought:

> “If I carefully check every element and compare it with its four neighbors, I can directly find a peak.”

This idea is simple, easy to debug, and guarantees correctness for all edge cases.

---

## Approach

Here is how I solved the problem step by step:

1. Get the number of rows `n` and columns `m`.
2. Traverse the matrix using two loops.
3. For each cell `(i, j)`:

   * Store the current value.
   * Safely fetch its four neighbors.
   * If a neighbor is out of bounds, treat it as `-∞`.
4. Compare the current value with all four neighbors.
5. If it is greater than or equal to all of them, return its position.
6. Since at least one peak always exists, this approach always works.

---

## Data Structures Used

* **2D array / matrix**
* No extra data structures are used.

---

## Operations & Behavior Summary

* Sequential traversal of the matrix
* Constant-time neighbor comparison
* Early exit as soon as a peak is found
* Handles:

  * Single row
  * Single column
  * Edge and corner cells
  * Negative values

---

## Complexity

### Time Complexity

**O(n × m)**

* `n` → number of rows
* `m` → number of columns
* Each cell is visited once.

### Space Complexity

**O(1)**

* Only a few variables are used.
* No extra memory allocation.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    vector<int> findPeakGrid(vector<vector<int>>& mat) {
        int n = mat.size();
        int m = mat[0].size();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                int curr = mat[i][j];

                int up = (i > 0) ? mat[i - 1][j] : INT_MIN;
                int down = (i < n - 1) ? mat[i + 1][j] : INT_MIN;
                int left = (j > 0) ? mat[i][j - 1] : INT_MIN;
                int right = (j < m - 1) ? mat[i][j + 1] : INT_MIN;

                if (curr >= up && curr >= down &&
                    curr >= left && curr >= right) {
                    return {i, j};
                }
            }
        }
        return {-1, -1};
    }
};
```

---

### Java

```java
class Solution {
    public ArrayList<Integer> findPeakGrid(int[][] mat) {
        int n = mat.length;
        int m = mat[0].length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                int curr = mat[i][j];

                int up = (i > 0) ? mat[i - 1][j] : Integer.MIN_VALUE;
                int down = (i < n - 1) ? mat[i + 1][j] : Integer.MIN_VALUE;
                int left = (j > 0) ? mat[i][j - 1] : Integer.MIN_VALUE;
                int right = (j < m - 1) ? mat[i][j + 1] : Integer.MIN_VALUE;

                if (curr >= up && curr >= down &&
                    curr >= left && curr >= right) {
                    ArrayList<Integer> ans = new ArrayList<>();
                    ans.add(i);
                    ans.add(j);
                    return ans;
                }
            }
        }
        return new ArrayList<>();
    }
}
```

---

### JavaScript

```javascript
class Solution {
    findPeakGrid(mat) {
        let n = mat.length;
        let m = mat[0].length;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {

                let curr = mat[i][j];

                let up = i > 0 ? mat[i - 1][j] : -Infinity;
                let down = i < n - 1 ? mat[i + 1][j] : -Infinity;
                let left = j > 0 ? mat[i][j - 1] : -Infinity;
                let right = j < m - 1 ? mat[i][j + 1] : -Infinity;

                if (curr >= up && curr >= down &&
                    curr >= left && curr >= right) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
}
```

---

### Python3

```python
class Solution:
    def findPeakGrid(self, mat):
        n = len(mat)
        m = len(mat[0])

        for i in range(n):
            for j in range(m):
                curr = mat[i][j]

                up = mat[i - 1][j] if i > 0 else float('-inf')
                down = mat[i + 1][j] if i < n - 1 else float('-inf')
                left = mat[i][j - 1] if j > 0 else float('-inf')
                right = mat[i][j + 1] if j < m - 1 else float('-inf')

                if curr >= up and curr >= down and \
                   curr >= left and curr >= right:
                    return [i, j]

        return [-1, -1]
```

---

## Step-by-step Detailed Explanation

* I move through the matrix one cell at a time.
* For every cell, I check its four neighbors.
* If a neighbor does not exist, I treat it as very small.
* If the current value is not smaller than any neighbor, it is a peak.
* I immediately return the index when I find one.

This keeps the logic clear and safe.

---

## Examples

**Input**

```
[[10, 20, 15],
 [21, 30, 14],
 [7, 16, 32]]
```

**Output**

```
[1, 1]
```

Explanation: `30` is greater than or equal to all its neighbors.

---

## How to Use / Run Locally

1. Clone the repository
2. Choose the language folder
3. Compile or run the file:

   * C++: `g++ file.cpp && ./a.out`
   * Java: `javac Solution.java && java Solution`
   * Python: `python3 solution.py`
   * JavaScript: `node solution.js`

---

## Notes & Optimizations

* This solution prioritizes **clarity and correctness**.
* Binary Search optimization exists but is more complex.
* This approach is ideal for:

  * Learning
  * Interviews
  * Debugging
  * Guaranteed correctness

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
