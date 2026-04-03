# Print Diagonally

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given an `n x n` square matrix, I need to return all elements of its anti-diagonals from top to bottom.

In an anti-diagonal traversal:

* First diagonal contains only the first element.
* Second diagonal contains the next top-right element and then the lower-left element.
* This continues until all diagonals are covered.

For example:

```text
1 2 3
4 5 6
7 8 9
```

The anti-diagonal order will be:

```text
[1, 2, 4, 3, 5, 7, 6, 8, 9]
```

---

## Constraints

```text
1 <= n <= 10^3
0 <= mat[i][j] <= 10^6
```

---

## Intuition

I noticed that all elements belonging to the same anti-diagonal have the same sum of row index and column index.

```text
row + col = diagonal_number
```

For example:

```text
Matrix:
1 2 3
4 5 6
7 8 9
```

* Diagonal 0 -> (0,0) -> [1]
* Diagonal 1 -> (0,1), (1,0) -> [2,4]
* Diagonal 2 -> (0,2), (1,1), (2,0) -> [3,5,7]

So, if I loop through all possible diagonal numbers and collect all valid elements where:

```text
i + j = d
```

I can build the final answer.

---

## Approach

1. Create an empty result array.
2. Traverse all possible anti-diagonals from `0` to `2*n - 2`.
3. For every diagonal:

   * Find the valid row range.
   * Calculate the column using:

```text
col = diagonal - row
```

1. Push all valid matrix elements into the answer array.
2. Return the final answer.

---

## Data Structures Used

* Array / Vector / List for storing the final answer.
* Matrix traversal using nested loops.

---

## Operations & Behavior Summary

| Operation          | Description                          |
| ------------------ | ------------------------------------ |
| Traverse diagonals | Loop from `0` to `2*n - 2`           |
| Find row range     | Keep row index inside matrix bounds  |
| Find column        | `col = diagonal - row`               |
| Store answer       | Add current matrix element to result |

---

## Complexity

* Time Complexity: `O(n^2)`

  * I visit every matrix element exactly once.

* Space Complexity: `O(n^2)`

  * I use an extra array to store the final traversal.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> diagView(vector<vector<int>> mat) {
        int n = mat.size();
        vector<int> ans;

        // Total anti-diagonals = 2*n - 1
        for (int d = 0; d <= 2 * n - 2; d++) {

            // Valid row range for current diagonal
            int rowStart = max(0, d - n + 1);
            int rowEnd = min(n - 1, d);

            // Traverse current diagonal
            for (int i = rowStart; i <= rowEnd; i++) {
                int j = d - i;
                ans.push_back(mat[i][j]);
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    static ArrayList<Integer> diagView(int mat[][]) {
        int n = mat.length;
        ArrayList<Integer> ans = new ArrayList<>();

        // Total anti-diagonals = 2*n - 1
        for (int d = 0; d <= 2 * n - 2; d++) {

            // Valid row range for current diagonal
            int rowStart = Math.max(0, d - n + 1);
            int rowEnd = Math.min(n - 1, d);

            // Traverse current diagonal
            for (int i = rowStart; i <= rowEnd; i++) {
                int j = d - i;
                ans.add(mat[i][j]);
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    diagView(mat) {
        let n = mat.length;
        let ans = [];

        // Total anti-diagonals = 2*n - 1
        for (let d = 0; d <= 2 * n - 2; d++) {

            // Valid row range for current diagonal
            let rowStart = Math.max(0, d - n + 1);
            let rowEnd = Math.min(n - 1, d);

            // Traverse current diagonal
            for (let i = rowStart; i <= rowEnd; i++) {
                let j = d - i;
                ans.push(mat[i][j]);
            }
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def diagView(self, mat):
        n = len(mat)
        ans = []

        # Total anti-diagonals = 2*n - 1
        for d in range(2 * n - 1):

            # Valid row range for current diagonal
            row_start = max(0, d - n + 1)
            row_end = min(n - 1, d)

            # Traverse current diagonal
            for i in range(row_start, row_end + 1):
                j = d - i
                ans.append(mat[i][j])

        return ans
```

---

## Step-by-step Detailed Explanation

### C++

```cpp
int n = mat.size();
```

This gets the size of the square matrix.

```cpp
for (int d = 0; d <= 2 * n - 2; d++)
```

This loop goes through every anti-diagonal.

```cpp
int rowStart = max(0, d - n + 1);
int rowEnd = min(n - 1, d);
```

This keeps the row index inside matrix bounds.

```cpp
int j = d - i;
```

This calculates the column because:

```text
i + j = d
```

```cpp
ans.push_back(mat[i][j]);
```

This stores the current matrix element.

### Java

```java
int n = mat.length;
```

Gets matrix size.

```java
for (int d = 0; d <= 2 * n - 2; d++)
```

Loops through all diagonals.

```java
int rowStart = Math.max(0, d - n + 1);
int rowEnd = Math.min(n - 1, d);
```

Keeps indices valid.

```java
int j = d - i;
```

Calculates column index.

```java
ans.add(mat[i][j]);
```

Stores the current value.

### JavaScript

```javascript
let n = mat.length;
```

Gets matrix size.

```javascript
for (let d = 0; d <= 2 * n - 2; d++)
```

Traverses all diagonals.

```javascript
let rowStart = Math.max(0, d - n + 1);
let rowEnd = Math.min(n - 1, d);
```

Keeps row index valid.

```javascript
let j = d - i;
```

Finds the column index.

```javascript
ans.push(mat[i][j]);
```

Adds current element to answer.

### Python3

```python
n = len(mat)
```

Gets matrix size.

```python
for d in range(2 * n - 1):
```

Loops through all anti-diagonals.

```python
row_start = max(0, d - n + 1)
row_end = min(n - 1, d)
```

Keeps row inside valid range.

```python
j = d - i
```

Finds the column index.

```python
ans.append(mat[i][j])
```

Stores the element.

---

## Examples

### Example 1

```text
Input:
mat = [
  [1, 2],
  [3, 4]
]

Output:
[1, 2, 3, 4]
```

### Example 2

```text
Input:
mat = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

Output:
[1, 2, 4, 3, 5, 7, 6, 8, 9]
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* I do not need any extra matrix or hash map.
* I directly compute the correct row and column.
* Every matrix element is visited only once.
* This is already the optimal solution for this problem.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
