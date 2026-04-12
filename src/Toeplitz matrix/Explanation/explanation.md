# Toeplitz Matrix

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

A Toeplitz matrix is a matrix where every diagonal from top-left to bottom-right contains the same value.

Given a matrix `mat[][]`, I need to determine whether it is a Toeplitz matrix or not.

I should return:

* `true` if the matrix is Toeplitz
* `false` otherwise

## Constraints

```text
1 ≤ mat.size(), mat[0].size() ≤ 40
0 ≤ mat[i][j] ≤ 100
```

## Intuition

I thought about the property of a Toeplitz matrix.

For every element in the matrix, except the first row and first column, the current element should be equal to its top-left diagonal element.

That means:

* `mat[i][j] == mat[i - 1][j - 1]`

So instead of checking each diagonal separately, I can simply compare every element with its top-left neighbor.

If I find even one mismatch, the matrix is not Toeplitz.

## Approach

1. Find the total number of rows and columns.
2. Start traversing from row `1` and column `1`.
3. For every element `(i, j)`, compare it with `(i - 1, j - 1)`.
4. If they are not equal, return `false`.
5. If all elements satisfy the condition, return `true`.

## Data Structures Used

* 2D Matrix / 2D Array
* Integer variables for rows and columns

No extra data structure is required.

## Operations & Behavior Summary

| Operation                 | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| Traverse matrix           | Visit each element except first row and first column |
| Compare diagonal elements | Check current element with top-left element          |
| Return false              | If any mismatch is found                             |
| Return true               | If all diagonal pairs are equal                      |

## Complexity

* Time Complexity: `O(n * m)`

  * `n` = number of rows
  * `m` = number of columns
  * I visit each cell once.

* Space Complexity: `O(1)`

  * No extra space is used.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isToeplitz(vector<vector<int>>& mat) {
        int rows = mat.size();
        int cols = mat[0].size();

        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                // Compare current element with top-left diagonal element
                if (mat[i][j] != mat[i - 1][j - 1]) {
                    return false;
                }
            }
        }

        return true;
    }
};
```

### Java

```java
class Solution {
    public boolean isToeplitz(int[][] mat) {
        int rows = mat.length;
        int cols = mat[0].length;

        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                // Compare current element with top-left diagonal element
                if (mat[i][j] != mat[i - 1][j - 1]) {
                    return false;
                }
            }
        }

        return true;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} mat
 * @return {boolean}
 */
class Solution {
    isToeplitz(mat) {
        let rows = mat.length;
        let cols = mat[0].length;

        for (let i = 1; i < rows; i++) {
            for (let j = 1; j < cols; j++) {
                // Compare current element with top-left diagonal element
                if (mat[i][j] !== mat[i - 1][j - 1]) {
                    return false;
                }
            }
        }

        return true;
    }
}
```

### Python3

```python
class Solution:
    def isToeplitz(self, mat):
        rows = len(mat)
        cols = len(mat[0])

        for i in range(1, rows):
            for j in range(1, cols):
                # Compare current element with top-left diagonal element
                if mat[i][j] != mat[i - 1][j - 1]:
                    return False

        return True
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Let the matrix be:

```text
6 7 8
4 6 7
1 4 6
```

### Step 1: Ignore first row and first column

The first row and first column do not have any top-left diagonal element.

So I start checking from:

```text
Row = 1
Column = 1
```

### Step 2: Compare each element with top-left diagonal element

I compare:

```text
mat[i][j] and mat[i - 1][j - 1]
```

#### Checking element at (1, 1)

```text
mat[1][1] = 6
mat[0][0] = 6
```

Both are equal.

#### Checking element at (1, 2)

```text
mat[1][2] = 7
mat[0][1] = 7
```

Both are equal.

#### Checking element at (2, 1)

```text
mat[2][1] = 4
mat[1][0] = 4
```

Both are equal.

#### Checking element at (2, 2)

```text
mat[2][2] = 6
mat[1][1] = 6
```

Both are equal.

Since all diagonal comparisons are equal, the matrix is Toeplitz.

### Important Condition

```cpp
if (mat[i][j] != mat[i - 1][j - 1]) {
    return false;
}
```

This line checks whether the Toeplitz property is broken.

If any pair is different, I immediately return `false`.

Otherwise, after checking the entire matrix, I return `true`.

## Examples

### Example 1

```text
Input:
mat = [[6, 7, 8],
       [4, 6, 7],
       [1, 4, 6]]

Output:
true
```

Explanation:

* Main diagonal = 6 -> 6 -> 6
* Another diagonal = 7 -> 7
* Another diagonal = 4 -> 4

All diagonals contain the same values.

### Example 2

```text
Input:
mat = [[6, 3, 8],
       [4, 9, 7],
       [1, 4, 6]]

Output:
false
```

Explanation:

* Main diagonal = 6 -> 9 -> 6

Since the diagonal elements are not equal, the matrix is not Toeplitz.

## How to use / Run locally

### C++

```bash
g++ filename.cpp -o output
./output
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node filename.js
```

### Python3

```bash
python filename.py
```

## Notes & Optimizations

* I do not need to store diagonals separately.
* I only compare the current element with its top-left element.
* This keeps the solution simple and memory efficient.
* The solution works for both square matrices and rectangular matrices.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
