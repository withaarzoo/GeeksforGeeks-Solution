# Row with Max 1s

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

I am given a 2D binary matrix where:

* Each element is either `0` or `1`
* Each row is sorted in non-decreasing order (all 0s first, then 1s)

My task is to find the **index of the first row that contains the maximum number of 1s**.

If no row contains any `1`, I must return `-1`.

The indexing is **0-based**.

---

## Constraints

* 1 ≤ number of rows, columns ≤ 10³
* Each element in the matrix is either `0` or `1`
* Rows are sorted in non-decreasing order

---

## Intuition

When I read the problem, the most important clue was that **each row is already sorted**.

That means:

* All `0`s come before `1`s
* If I find the **first occurrence of `1`** in a row
* I can easily calculate how many `1`s are present

So I thought:

* Why scan the whole row?
* I can use **binary search** to find the first `1` faster

Then I just compare counts for each row and return the row index with the maximum number of `1`s.

---

## Approach

1. Initialize:

   * `maxOnes = 0`
   * `answer = -1`

2. Traverse each row of the matrix.

3. For every row:

   * Apply **binary search** to find the first `1`
   * If no `1` is found, skip the row

4. Calculate number of `1`s:

   ```
   ones = totalColumns - firstOneIndex
   ```

5. If this count is greater than `maxOnes`:

   * Update `maxOnes`
   * Store current row index

6. After checking all rows, return `answer`.

---

## Data Structures Used

* 2D Array / Matrix
* Primitive variables for tracking maximum count and index

No extra data structures are used.

---

## Operations & Behavior Summary

* Binary search is applied **row-wise**
* Only the first `1` position matters
* First row with maximum `1`s is returned
* Efficient for large matrices

---

## Complexity

**Time Complexity:**
O(n log m)

* `n` = number of rows
* `m` = number of columns
* Binary search (`log m`) for each row

**Space Complexity:**
O(1)

* No additional memory used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int rowWithMax1s(vector<vector<int>> &arr) {
        int n = arr.size();
        int m = arr[0].size();
        
        int maxOnes = 0;
        int answer = -1;
        
        for (int i = 0; i < n; i++) {
            int low = 0, high = m - 1;
            int firstOne = -1;
            
            while (low <= high) {
                int mid = low + (high - low) / 2;
                
                if (arr[i][mid] == 1) {
                    firstOne = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            
            if (firstOne != -1) {
                int onesCount = m - firstOne;
                if (onesCount > maxOnes) {
                    maxOnes = onesCount;
                    answer = i;
                }
            }
        }
        return answer;
    }
};
```

---

### Java

```java
class Solution {
    public int rowWithMax1s(int arr[][]) {
        int n = arr.length;
        int m = arr[0].length;
        
        int maxOnes = 0;
        int answer = -1;
        
        for (int i = 0; i < n; i++) {
            int low = 0, high = m - 1;
            int firstOne = -1;
            
            while (low <= high) {
                int mid = low + (high - low) / 2;
                
                if (arr[i][mid] == 1) {
                    firstOne = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            
            if (firstOne != -1) {
                int onesCount = m - firstOne;
                if (onesCount > maxOnes) {
                    maxOnes = onesCount;
                    answer = i;
                }
            }
        }
        return answer;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    rowWithMax1s(arr) {
        const n = arr.length;
        const m = arr[0].length;
        
        let maxOnes = 0;
        let answer = -1;
        
        for (let i = 0; i < n; i++) {
            let low = 0, high = m - 1;
            let firstOne = -1;
            
            while (low <= high) {
                let mid = Math.floor((low + high) / 2);
                
                if (arr[i][mid] === 1) {
                    firstOne = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            
            if (firstOne !== -1) {
                let onesCount = m - firstOne;
                if (onesCount > maxOnes) {
                    maxOnes = onesCount;
                    answer = i;
                }
            }
        }
        return answer;
    }
}
```

---

### Python3

```python
class Solution:
    def rowWithMax1s(self, arr):
        n = len(arr)
        m = len(arr[0])
        
        max_ones = 0
        answer = -1
        
        for i in range(n):
            low, high = 0, m - 1
            first_one = -1
            
            while low <= high:
                mid = (low + high) // 2
                if arr[i][mid] == 1:
                    first_one = mid
                    high = mid - 1
                else:
                    low = mid + 1
            
            if first_one != -1:
                ones = m - first_one
                if ones > max_ones:
                    max_ones = ones
                    answer = i
        
        return answer
```

---

## Step-by-step Detailed Explanation (All Languages)

1. Each row is sorted → binary search is possible
2. Binary search finds the **first 1**
3. Number of 1s = total columns − index of first 1
4. Track the maximum count
5. Store the first row index that achieves this
6. Return `-1` if no row contains `1`

---

## Examples

**Input:**
`[[0,1,1,1], [0,0,1,1], [1,1,1,1], [0,0,0,0]]`

**Output:**
`2`

**Explanation:**
Row 2 has the highest number of `1`s (4).

---

## How to Use / Run Locally

1. Clone the repository
2. Open the file in your preferred language
3. Compile / Run using:

   * `g++` for C++
   * `javac` for Java
   * `node` for JavaScript
   * `python3` for Python

---

## Notes & Optimizations

* Binary search improves performance from O(n × m) to O(n log m)
* No extra memory is used
* First row is returned in case of tie
* Can be further optimized to **O(n + m)** using top-right traversal

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
