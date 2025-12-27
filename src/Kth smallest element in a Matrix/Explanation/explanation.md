# Kth Smallest Element in a Matrix

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
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given a square matrix of size **n × n** where:

* Every **row** is sorted in non-decreasing order
* Every **column** is also sorted in non-decreasing order

My task is to find the **kth smallest element** in the entire matrix.

The challenge is to solve this **efficiently**, without flattening and sorting the matrix.

---

## Constraints

* 1 ≤ n ≤ 500
* 1 ≤ matrix[i][j] ≤ 10⁴
* 1 ≤ k ≤ n × n

---

## Intuition

When I first looked at the problem, I noticed something very important:

👉 The matrix is already sorted both row-wise and column-wise.

So I thought:

* Instead of sorting all elements again, I can **use this sorted property**
* I can **binary search on the answer**, not on the index

The idea is simple:

* Guess a number
* Count how many elements are **≤ that number**
* Use binary search to narrow down the answer

This approach is clean, fast, and perfect for large matrices.

---

## Approach

1. I take the **smallest value** from the matrix as `low`
2. I take the **largest value** from the matrix as `high`
3. I apply **binary search on this value range**

For each `mid` value:

* I count how many elements in the matrix are **≤ mid**
* If the count is less than `k`, I move right
* Otherwise, I move left

At the end, `low` will be my answer.

---

## Data Structures Used

* No extra data structures are used
* Only variables for binary search and counters

This keeps the solution **memory efficient**.

---

## Operations & Behavior Summary

* Binary search is performed on **value range**, not indices
* Counting is done in **O(n)** using matrix properties
* Rows and columns are never re-visited unnecessarily
* Works efficiently even for large matrices

---

## Complexity

**Time Complexity:**
O(n × log(max − min))

* `n` → matrix size
* `max − min` → range of values in matrix

**Space Complexity:**
O(1)

* No extra space used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int kthSmallest(vector<vector<int>> &mat, int k) {
        int n = mat.size();
        int low = mat[0][0];
        int high = mat[n - 1][n - 1];

        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            int col = n - 1;

            for (int row = 0; row < n; row++) {
                while (col >= 0 && mat[row][col] > mid) {
                    col--;
                }
                count += (col + 1);
            }

            if (count < k)
                low = mid + 1;
            else
                high = mid;
        }
        return low;
    }
};
```

---

### Java

```java
class Solution {
    public int kthSmallest(int[][] mat, int k) {
        int n = mat.length;
        int low = mat[0][0];
        int high = mat[n - 1][n - 1];

        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            int col = n - 1;

            for (int row = 0; row < n; row++) {
                while (col >= 0 && mat[row][col] > mid) {
                    col--;
                }
                count += (col + 1);
            }

            if (count < k)
                low = mid + 1;
            else
                high = mid;
        }
        return low;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    kthSmallest(mat, k) {
        const n = mat.length;
        let low = mat[0][0];
        let high = mat[n - 1][n - 1];

        while (low < high) {
            let mid = Math.floor((low + high) / 2);
            let count = 0;
            let col = n - 1;

            for (let row = 0; row < n; row++) {
                while (col >= 0 && mat[row][col] > mid) {
                    col--;
                }
                count += (col + 1);
            }

            if (count < k)
                low = mid + 1;
            else
                high = mid;
        }
        return low;
    }
}
```

---

### Python3

```python
class Solution:
    def kthSmallest(self, mat, k):
        n = len(mat)
        low = mat[0][0]
        high = mat[n - 1][n - 1]

        while low < high:
            mid = (low + high) // 2
            count = 0
            col = n - 1

            for row in range(n):
                while col >= 0 and mat[row][col] > mid:
                    col -= 1
                count += (col + 1)

            if count < k:
                low = mid + 1
            else:
                high = mid

        return low
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I start binary search between the smallest and largest values in the matrix
2. I calculate `mid`
3. From the top-right corner, I count how many elements are ≤ `mid`
4. If the count is smaller than `k`, I search in the higher range
5. Otherwise, I search in the lower range
6. When `low == high`, that value is the kth smallest element

This logic is identical in all four languages.

---

## Examples

**Input**

```
Matrix:
16 28 60 64
22 41 63 91
27 50 87 93
36 78 87 94

k = 3
```

**Output**

```
27
```

**Explanation:**
27 is the 3rd smallest element in the matrix.

---

## How to use / Run locally

1. Clone the repository
2. Open the file in your preferred language
3. Compile or run using standard compiler/interpreter
4. Pass the matrix and value of `k`

---

## Notes & Optimizations

* This solution avoids extra memory usage
* Much faster than flattening and sorting
* Perfect for large inputs
* Commonly asked in product-based interviews

---

## Author

* **Md Aarzoo Islam**
  *[https://bento.me/withaarzoo](https://bento.me/withaarzoo)*
