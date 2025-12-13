# Swap Diagonals of a Square Matrix

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

Given a **square matrix**, my task is to **swap the elements of the major diagonal and the minor diagonal**.

* **Major Diagonal**: Elements where `row index == column index`
* **Minor Diagonal**: Elements where `row index + column index == n - 1`

The swapping must be done **row-wise** and **in place**.

---

## Constraints

* `1 ≤ n ≤ 500` (matrix size)
* `1 ≤ mat[i][j] ≤ 10⁶`
* The matrix is always **square** (`n x n`)

---

## Intuition

When I looked at the problem, I noticed something simple.

For every row in a square matrix:

* There is **one major diagonal element**
* There is **one minor diagonal element**

So instead of doing anything complex, I just:

* Go row by row
* Swap the two diagonal elements of the **same row**

No extra matrix.
No unnecessary loops.
Just a clean swap.

---

## Approach

1. I store the matrix size in `n`
2. I loop from `i = 0` to `n - 1`
3. For each row `i`:

   * Major diagonal index → `mat[i][i]`
   * Minor diagonal index → `mat[i][n - 1 - i]`
4. I swap these two values
5. Done. The matrix is modified in place

---

## Data Structures Used

* Only the **input matrix**
* No additional arrays or collections

---

## Operations & Behavior Summary

* One loop over rows
* One swap operation per row
* Middle element (in odd-sized matrix) remains unchanged automatically
* Works for all valid square matrices

---

## Complexity

**Time Complexity:** `O(n)`

* I perform one swap for each row

**Space Complexity:** `O(1)`

* No extra memory used (in-place operation)

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    void swapDiagonal(vector<vector<int>> &mat) {
        int n = mat.size();

        for (int i = 0; i < n; i++) {
            swap(mat[i][i], mat[i][n - 1 - i]);
        }
    }
};
```

---

### Java

```java
class Solution {
    public void swapDiagonal(int[][] mat) {
        int n = mat.length;

        for (int i = 0; i < n; i++) {
            int temp = mat[i][i];
            mat[i][i] = mat[i][n - 1 - i];
            mat[i][n - 1 - i] = temp;
        }
    }
}
```

---

### JavaScript

```javascript
class Solution {
    swapDiagonal(mat) {
        const n = mat.length;

        for (let i = 0; i < n; i++) {
            let temp = mat[i][i];
            mat[i][i] = mat[i][n - 1 - i];
            mat[i][n - 1 - i] = temp;
        }
    }
}
```

---

### Python3

```python
class Solution:
    def swapDiagonal(self, mat):
        n = len(mat)

        for i in range(n):
            mat[i][i], mat[i][n - 1 - i] = mat[i][n - 1 - i], mat[i][i]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Let’s take this matrix as an example:

```
0 1 2
3 4 5
6 7 8
```

### Step 1: Matrix size

```
n = 3
```

### Step 2: Loop row by row

#### Row 0

* Major diagonal → `mat[0][0] = 0`
* Minor diagonal → `mat[0][2] = 2`
* After swap → `2 1 0`

#### Row 1

* Major and minor both point to `mat[1][1]`
* Value remains unchanged

#### Row 2

* Major diagonal → `mat[2][2] = 8`
* Minor diagonal → `mat[2][0] = 6`
* After swap → `8 7 6`

### Final Output

```
2 1 0
3 4 5
8 7 6
```

---

## Examples

### Example 1

**Input**

```
[[0,1,2],
 [3,4,5],
 [6,7,8]]
```

**Output**

```
[[2,1,0],
 [3,4,5],
 [8,7,6]]
```

---

### Example 2

**Input**

```
[[2,3],
 [5,4]]
```

**Output**

```
[[3,2],
 [4,5]]
```

---

## How to Use / Run Locally

1. Clone the repository
2. Open the file in your preferred language
3. Call `swapDiagonal()` with a square matrix
4. Print or inspect the matrix after function execution

Works perfectly on:

* GeeksforGeeks
* Local IDE
* Competitive programming platforms

---

## Notes & Optimizations

* This is the **most optimal solution**
* No extra space required
* Very common **matrix interview question**
* Always remember:
  **Same row + diagonal positions → direct swap**

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
