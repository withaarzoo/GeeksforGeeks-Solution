# Perimeter of Shapes in Binary Matrix

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

## Problem Summary

You are given a binary matrix of size n by m. Every cell holds either a 0 or a 1. The task is to calculate the total perimeter of all shapes formed by the cells that contain 1.

Two cells are considered adjacent only when they share a full side (not just a corner). A single cell with value 1 has a perimeter of 4. When two 1-cells touch, they share an edge and the combined perimeter becomes 6.

The goal of this DSA problem is to return one integer: the sum of the perimeters of every connected group of 1s that appears in the matrix.

## Constraints

- 1 ≤ n, m ≤ 1000
- Each cell of the matrix contains only 0 or 1
- Time limit expects an O(n × m) solution
- Extra memory should stay constant (O(1) auxiliary space)

## Intuition

The first thing that stands out is that every isolated 1 contributes exactly four sides. Whenever two 1s become neighbors, each of them loses one side, so the total perimeter drops by two.  

That observation immediately suggests a simple counting strategy: walk through the whole matrix once, add four for every 1 you meet, then subtract two for every horizontal or vertical pair of neighboring 1s. No need to flood-fill or keep track of components. The shared edges themselves are enough to give the correct perimeter of shapes in a binary matrix.

## Approach

1. Read the number of rows n and the number of columns m.  
2. Initialize a variable that will hold the final perimeter to zero.  
3. Visit every cell of the matrix.  
4. When the current cell is 1, add 4 to the answer.  
5. Check the cell immediately to the right. If it also contains 1, subtract 2.  
6. Check the cell immediately below. If it also contains 1, subtract 2.  
7. After the whole matrix has been scanned, the variable already stores the required total perimeter.  

By examining only the right and down neighbors we guarantee that every shared edge is counted exactly once.

## Data Structures Used

- The input 2-D matrix itself. No additional arrays, queues or maps are required.  
- A few integer variables for the answer and the loop indices.  

Keeping the solution free of extra data structures helps meet the O(1) auxiliary-space requirement while still solving the binary-matrix perimeter problem efficiently.

## Operations & Behavior Summary

- Start with peri = 0.  
- For each cell (i, j):  
  - If mat[i][j] == 1, increase peri by 4.  
  - If a right neighbor exists and is also 1, decrease peri by 2.  
  - If a lower neighbor exists and is also 1, decrease peri by 2.  
- Return peri.  

This single linear pass computes the complete perimeter of every shape formed by the 1-cells.

## Complexity

| Metric            | Value   | Explanation                                                                 |
|-------------------|---------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n × m)| Every cell is examined a constant number of times.                          |
| Space Complexity  | O(1)    | Only a handful of integer variables are used; no extra matrix or list is allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int findPerimeter(vector<vector<int>> &mat) {
        int n = mat.size();
        int m = mat[0].size();
        int peri = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    peri += 4;
                    if (j + 1 < m && mat[i][j + 1] == 1) peri -= 2;
                    if (i + 1 < n && mat[i + 1][j] == 1) peri -= 2;
                }
            }
        }
        return peri;
    }
};
```

### Java
```java
class Solution {
    static int findPerimeter(int[][] mat) {
        int n = mat.length;
        int m = mat[0].length;
        int peri = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) {
                    peri += 4;
                    if (j + 1 < m && mat[i][j + 1] == 1) peri -= 2;
                    if (i + 1 < n && mat[i + 1][j] == 1) peri -= 2;
                }
            }
        }
        return peri;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[][]} mat
 * @returns {number}
 */

class Solution {
    findPerimeter(mat) {
        let n = mat.length;
        let m = mat[0].length;
        let peri = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (mat[i][j] === 1) {
                    peri += 4;
                    if (j + 1 < m && mat[i][j + 1] === 1) peri -= 2;
                    if (i + 1 < n && mat[i + 1][j] === 1) peri -= 2;
                }
            }
        }
        return peri;
    }
}
```

### Python3
```python
class Solution:
    def findPerimeter(self, mat: List[List[int]]) -> int:
        n = len(mat)
        m = len(mat[0])
        peri = 0
        for i in range(n):
            for j in range(m):
                if mat[i][j] == 1:
                    peri += 4
                    if j + 1 < m and mat[i][j + 1] == 1:
                        peri -= 2
                    if i + 1 < n and mat[i + 1][j] == 1:
                        peri -= 2
        return peri
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all four languages, so the reasoning stays the same.

First we store the dimensions. n becomes the number of rows and m the number of columns. An integer variable called peri is set to zero; this will accumulate the answer.

We then run two nested loops that together visit every cell exactly once. Inside the inner loop we test whether the current cell holds a 1. Only those cells matter for the perimeter calculation.

When a 1 is found we immediately add four. That accounts for the four edges of an isolated square. Next we look one step to the right, but only if that column is still inside the matrix. If the right-hand cell is also a 1 we subtract two because the shared vertical edge disappears from both cells. The same test is performed for the cell directly below: if it exists and equals 1 we again subtract two for the shared horizontal edge.

We deliberately ignore the left and upper neighbors. Checking all four directions would cause every shared edge to be subtracted twice and produce an incorrect result. Restricting the checks to right and down guarantees each adjacency is processed exactly once.

After both loops finish, peri already contains the total perimeter of all shapes. We simply return that value. The same sequence of decisions appears in the C++, Java, JavaScript and Python implementations, only the syntax differs.

## Examples

**Example 1**  
Input:  
[[0,1,0,0,0],  
 [1,1,1,0,0],  
 [1,0,0,0,0]]  

Output: 12  

Trace: Five cells contain 1. Each contributes 4, giving 20. There are four shared edges (the middle row has two horizontal shares and the first column has two vertical shares). Subtracting 2 × 4 = 8 yields 12, which matches the required perimeter of the single connected shape.

**Example 2**  
Input:  
[[1,0],  
 [1,1]]  

Output: 8  

Trace: Three cells are 1. Base contribution = 12. Two shared edges exist (one vertical between the two cells in the first column, one horizontal between the two cells in the second row). Subtracting 4 produces 8.

**Example 3**  
Input:  
[[1]]  

Output: 4  

Trace: A single cell. No neighbors, so the perimeter stays at 4.

## How to Use / Run Locally

**C++**  
1. Copy the solution into a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o perimeter`.  
3. Run with `./perimeter` and feed the matrix through standard input or hard-code a test case inside `main`.

**Java**  
1. Place the class in `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution` after adding a small driver that builds a sample matrix and prints the result.

**JavaScript**  
1. Save the class in `solution.js`.  
2. Execute with Node: `node solution.js`.  
3. Inside the file create a matrix and call `new Solution().findPerimeter(mat)`.

**Python3**  
1. Save the class in `solution.py`.  
2. Run with `python3 solution.py`.  
3. At the bottom of the file build a test matrix and print the return value of `Solution().findPerimeter(mat)`.

All four versions expect a 2-D list/array of integers and return a single integer.

## Notes & Optimizations

- The solution already runs in linear time relative to the size of the matrix, which is optimal for this problem.  
- Because we never allocate extra memory proportional to n or m, the algorithm stays friendly even when both dimensions reach the upper limit of 1000.  
- An alternative recursive flood-fill approach would also work but would use O(n × m) stack space in the worst case and is therefore less desirable under the given constraints.  
- Watch for the single-cell edge case and for matrices that contain no 1s at all; both are handled correctly by the same counting logic.  
- The method works for any number of disconnected shapes; each shape’s perimeter is simply added into the global total.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)