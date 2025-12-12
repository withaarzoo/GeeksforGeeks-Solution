# Transpose of Matrix

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

I am given a **square matrix** of size `n x n`. My task is to compute its **transpose**. The transpose of a matrix is obtained by converting all rows to columns and all columns to rows — equivalently, swap every element `mat[i][j]` with `mat[j][i]`.

I will do this **in-place** (without using an additional `n x n` matrix) by swapping symmetric elements across the main diagonal.

---

## Constraints

* `1 <= n <= 10^3` (matrix dimension)
* `-10^9 <= mat[i][j] <= 10^9` (value range)
* Matrix is **square** (number of rows = number of columns)

---

## Intuition

I thought that for a square matrix the transpose can be formed by swapping elements across the main diagonal. Every element at position `(i, j)` should go to `(j, i)`. If I only swap when `j > i` (elements above the diagonal), each pair is swapped exactly once and I don't overwrite values or need extra space.

---

## Approach

1. Let `n` be the size of the matrix (`n = number of rows`).
2. Loop `i` from `0` to `n-1`.
3. For each `i`, loop `j` from `i+1` to `n-1`.
4. Swap `mat[i][j]` with `mat[j][i]`.
5. After all swaps, the matrix is transposed. Return the matrix.

This is done in-place and touches each off-diagonal element once.

---

## Data Structures Used

* 2D array / vector / list (`mat`) to hold the matrix.
* A temporary variable (constant additional space) to swap values.

---

## Operations & Behavior Summary

* **Swap** operation for symmetric cells `(i, j)` and `(j, i)`.
* **Loops**: nested loops to visit all pairs above the main diagonal.
* **In-place modification**: the input matrix `mat` is modified directly to its transpose.

---

## Complexity

* **Time Complexity:** `O(n^2)` — I iterate through the upper triangle of the matrix (roughly `n*(n-1)/2` swaps). `n` is the matrix dimension. This is optimal because the matrix has `n^2` elements and we must at least read each element.
* **Space Complexity:** `O(1)` extra space — only a constant temporary variable is used for swaps; no extra matrix is allocated.

---

## Multi-language Solutions

### C++

```c++
#include <vector>
using namespace std;

class Solution {
  public:
    vector<vector<int>> transpose(vector<vector<int>>& mat) {
        int n = mat.size();
        // For each pair (i, j) with j > i, swap mat[i][j] and mat[j][i]
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int tmp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = tmp;
            }
        }
        return mat;
    }
};
```

### Java

```java
import java.util.ArrayList;

class Solution {
    public ArrayList<ArrayList<Integer>> transpose(int[][] mat) {
        int n = mat.length;
        // Transpose in-place by swapping mat[i][j] with mat[j][i] for j > i
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int tmp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = tmp;
            }
        }
        // Convert to required return type ArrayList<ArrayList<Integer>>
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            ArrayList<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; ++j) row.add(mat[i][j]);
            res.add(row);
        }
        return res;
    }
}
```

### JavaScript

```javascript
class Solution {
    transpose(mat) {
        const n = mat.length;
        // Swap symmetric elements above diagonal
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const tmp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = tmp;
            }
        }
        return mat;
    }
}
```

### Python3

```python3
class Solution:
    def transpose(self, mat):
        n = len(mat)
        # Swap only for indices where j > i
        for i in range(n):
            for j in range(i + 1, n):
                tmp = mat[i][j]
                mat[i][j] = mat[j][i]
                mat[j][i] = tmp
        return mat
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the important parts so I can teach this to a friend.

**Common steps (applies to all languages):**

1. `n = length(mat)`

   * I find the size of the square matrix. Because it's square, rows == columns.

2. Outer loop `i = 0 .. n-1`

   * I fix the current row index `i`. I will swap elements in row `i` that are to the right of the diagonal.

3. Inner loop `j = i+1 .. n-1`

   * I only consider `j > i` (above diagonal). This prevents double-swapping and avoids swapping diagonal elements (which are already in correct place).

4. Swap `mat[i][j]` and `mat[j][i]` using a temporary variable `tmp`

   * This moves the value at `(i, j)` to `(j, i)` and vice versa.

5. After loops finish, `mat` is transposed in-place.

**Line-by-line (C++ example):**

```c++
// int n = mat.size();
int n = mat.size();       // get matrix dimension

// for i from 0 to n-1
for (int i = 0; i < n; ++i) {
    // for j from i+1 to n-1 (only upper triangle)
    for (int j = i + 1; j < n; ++j) {
        int tmp = mat[i][j];   // store value at (i, j)
        mat[i][j] = mat[j][i]; // copy symmetric value into (i, j)
        mat[j][i] = tmp;       // put stored value into (j, i)
    }
}
```

* This exactly performs the transpose by swapping symmetric elements.

**Notes for Java:** After the swap on the `int[][]`, I convert the matrix to the `ArrayList<ArrayList<Integer>>` return type because some platforms expect that type.

**Notes for JavaScript & Python:** The same logic applies; the language-specific syntax for loops and swapping differ slightly, but the idea is identical.

---

## Examples

**Example 1**
Input:

```
mat = [
 [1, 1, 1, 1],
 [2, 2, 2, 2],
 [3, 3, 3, 3],
 [4, 4, 4, 4]
]
```

Output:

```
[
 [1, 2, 3, 4],
 [1, 2, 3, 4],
 [1, 2, 3, 4],
 [1, 2, 3, 4]
]
```

**Example 2**
Input:

```
mat = [
 [1, 2],
 [9, -2]
]
```

Output:

```
[
 [1, 9],
 [2, -2]
]
```

---

## How to use / Run locally

### C++

1. Save code in `transpose.cpp` with a small main function to test (or use integrated judge).
2. Compile:

```bash
g++ -std=c++17 transpose.cpp -O2 -o transpose
```

3. Run:

```bash
./transpose
```

### Java

1. Save `Solution` class and a `Main` with `public static void main` for testing.
2. Compile:

```bash
javac Solution.java Main.java
```

3. Run:

```bash
java Main
```

### JavaScript (Node.js)

1. Save code to `transpose.js` and add a small test harness.
2. Run:

```bash
node transpose.js
```

### Python3

1. Save code to `transpose.py` and add a testing block:

```python
if __name__ == "__main__":
    mat = [[1,2],[9,-2]]
    print(Solution().transpose(mat))
```

2. Run:

```bash
python3 transpose.py
```

---

## Notes & Optimizations

* This method works only because the matrix is **square**. For non-square matrices (m x n), we must allocate a new matrix of size `n x m` and copy `res[j][i] = mat[i][j]`.
* The in-place swapping avoids extra memory and is cache-friendly.
* Time complexity `O(n^2)` is optimal because we need to visit all elements at least once.
* If the platform requires a different return type (like `ArrayList` in Java), convert at the end as shown.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
