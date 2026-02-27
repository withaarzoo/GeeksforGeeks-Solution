# Number of Submatrix Have Sum X

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

Given a matrix `mat[][]` of size `n x m` and an integer `x`, we need to find the number of square submatrices whose sum of elements is equal to `x`.

Only square submatrices are allowed. Rectangles are not valid.

---

## Constraints

* 1 ≤ n, m ≤ 100
* -10^3 ≤ mat[i][j] ≤ 10^3
* -10^9 ≤ x ≤ 10^9

---

## Intuition

When I first looked at the problem, I thought about generating all possible square submatrices and calculating their sum one by one.

But calculating the sum repeatedly for each square would be expensive.

So I asked myself:

How can I calculate the sum of any square in constant time?

That is when I decided to use a 2D Prefix Sum Matrix.

If I preprocess the matrix once using prefix sums, I can compute the sum of any square in O(1) time.

Then I just need to try every possible square and count how many have sum equal to x.

---

## Approach

Step 1: Build a 2D prefix sum matrix.

Each cell prefix[i][j] stores the sum of elements from (0,0) to (i,j).

Step 2: For every cell (i,j), treat it as the top-left corner of a square.

Step 3: Try all possible square sizes from that point.

Step 4: Use prefix sum formula to calculate the square sum in O(1).

Step 5: If sum equals x, increment the count.

Return the final count.

---

## Data Structures Used

* 2D Array for prefix sum
* Integer counter variable

No extra heavy data structures are required.

---

## Operations & Behavior Summary

1. Precompute prefix matrix
2. Iterate through all possible top-left positions
3. Expand square size
4. Compute sum using prefix formula
5. Compare with x
6. Count valid squares

---

## Complexity

Time Complexity: O(n *m* min(n, m))

We iterate over every cell and try possible square sizes.
In worst case, this becomes 100 *100* 100 = 10^6 operations.

Space Complexity: O(n * m)

We use an additional prefix matrix.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countSquare(vector<vector<int>>& mat, int x) {
        int n = mat.size();
        int m = mat[0].size();
        
        vector<vector<long long>> prefix(n, vector<long long>(m, 0));
        
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                prefix[i][j] = mat[i][j];
                
                if(i > 0) prefix[i][j] += prefix[i-1][j];
                if(j > 0) prefix[i][j] += prefix[i][j-1];
                if(i > 0 && j > 0) prefix[i][j] -= prefix[i-1][j-1];
            }
        }
        
        int count = 0;
        
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                for(int size = 1; i + size - 1 < n && j + size - 1 < m; size++) {
                    int r = i + size - 1;
                    int c = j + size - 1;
                    
                    long long sum = prefix[r][c];
                    
                    if(i > 0) sum -= prefix[i-1][c];
                    if(j > 0) sum -= prefix[r][j-1];
                    if(i > 0 && j > 0) sum += prefix[i-1][j-1];
                    
                    if(sum == x) count++;
                }
            }
        }
        
        return count;
    }
};
```

### Java

```java
class Solution {
    public int countSquare(int[][] mat, int x) {
        int n = mat.length;
        int m = mat[0].length;
        
        long[][] prefix = new long[n][m];
        
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                prefix[i][j] = mat[i][j];
                
                if(i > 0) prefix[i][j] += prefix[i-1][j];
                if(j > 0) prefix[i][j] += prefix[i][j-1];
                if(i > 0 && j > 0) prefix[i][j] -= prefix[i-1][j-1];
            }
        }
        
        int count = 0;
        
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                for(int size = 1; i + size - 1 < n && j + size - 1 < m; size++) {
                    int r = i + size - 1;
                    int c = j + size - 1;
                    
                    long sum = prefix[r][c];
                    
                    if(i > 0) sum -= prefix[i-1][c];
                    if(j > 0) sum -= prefix[r][j-1];
                    if(i > 0 && j > 0) sum += prefix[i-1][j-1];
                    
                    if(sum == x) count++;
                }
            }
        }
        
        return count;
    }
}
```

### JavaScript

```javascript
class Solution {
    countSquare(mat, x) {
        let n = mat.length;
        let m = mat[0].length;
        
        let prefix = Array.from({length: n}, () => Array(m).fill(0));
        
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                prefix[i][j] = mat[i][j];
                
                if(i > 0) prefix[i][j] += prefix[i-1][j];
                if(j > 0) prefix[i][j] += prefix[i][j-1];
                if(i > 0 && j > 0) prefix[i][j] -= prefix[i-1][j-1];
            }
        }
        
        let count = 0;
        
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < m; j++) {
                for(let size = 1; i + size - 1 < n && j + size - 1 < m; size++) {
                    let r = i + size - 1;
                    let c = j + size - 1;
                    
                    let sum = prefix[r][c];
                    
                    if(i > 0) sum -= prefix[i-1][c];
                    if(j > 0) sum -= prefix[r][j-1];
                    if(i > 0 && j > 0) sum += prefix[i-1][j-1];
                    
                    if(sum === x) count++;
                }
            }
        }
        
        return count;
    }
}
```

### Python3

```python
class Solution:
    def countSquare(self, mat, x):
        n = len(mat)
        m = len(mat[0])
        
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
        
        count = 0
        
        for i in range(n):
            for j in range(m):
                size = 1
                while i + size - 1 < n and j + size - 1 < m:
                    r = i + size - 1
                    c = j + size - 1
                    
                    total = prefix[r][c]
                    
                    if i > 0:
                        total -= prefix[i-1][c]
                    if j > 0:
                        total -= prefix[r][j-1]
                    if i > 0 and j > 0:
                        total += prefix[i-1][j-1]
                    
                    if total == x:
                        count += 1
                        
                    size += 1
        
        return count
```

---

## Step-by-step Detailed Explanation

1. We first build a prefix sum matrix.

   prefix[i][j] stores sum from (0,0) to (i,j).

2. For each cell:

   prefix[i][j] = mat[i][j]
   * top
   * left
   * top-left

   We subtract top-left because it gets added twice.

3. After building prefix matrix, we iterate over every cell as a possible top-left corner.

4. For each starting point, we increase square size gradually.

5. We compute square sum using:

   sum = prefix[r][c]
   * prefix[i-1][c]
   * prefix[r][j-1]
   * prefix[i-1][j-1]

6. If sum equals x, we increase count.

7. Finally return count.

---

## Examples

Input:

mat = [[2,4,7,8,10],
[3,1,1,1,1],
[9,11,1,2,1],
[12,-17,1,1,1]]

x = 10

Output:
3

---

## How to use / Run locally

C++:

Compile using:

```bash
g++ filename.cpp
./a.out
```

Java:

```bash
javac Solution.java
java Solution
```

Python:

```bash
python3 filename.py
```

JavaScript:

```bash
node filename.js
```

---

## Notes & Optimizations

* Prefix sum prevents recalculating sums repeatedly.
* Using long long or long is important because sums can exceed integer range.
* Time complexity is safe under given constraints.
* This solution is clean and interview friendly.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
