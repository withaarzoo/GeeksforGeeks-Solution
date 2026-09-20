# Largest Subsquare Surrounded by X

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

You are given a square matrix of size n x n. Every cell in the matrix contains either the character 'X' or the character 'O'.

Your task is to find the side length of the largest square submatrix whose entire boundary is made up of 'X' characters. The cells inside the square can be anything. Only the four sides matter.

If a single cell is 'X', it counts as a valid square of size 1. If no valid square exists at all, return 0.

This is a classic matrix problem often seen on GeeksforGeeks and other competitive programming platforms. It tests your ability to handle 2D grids efficiently and think about border checks without scanning every possible square from scratch.

## Constraints

- 1 ≤ n ≤ 1000 (where n is the side length of the matrix)
- The matrix is always square: mat.size() == mat[i].size()
- Each cell contains only 'X' or 'O'

Because n can be as large as 1000, a solution that runs in O(n³) time is acceptable and expected.

## Intuition

When I first looked at this problem, checking every possible square and then scanning its four borders felt too slow. For n = 1000 that would easily become O(n⁴) or worse.

I realized I only need to know, for every cell, how far a continuous run of 'X' extends to the left and how far it extends upward. Once I have those two pieces of information, I can treat any cell as a possible bottom-right corner of a square. The precomputed values immediately tell me the maximum possible side length that could end at that cell. Then I only need two extra checks to confirm the top and left borders.

This observation turns an expensive search into a clean O(n³) process that still finds the largest valid square.

## Approach

I build two helper matrices of the same size as the input.

- One matrix stores the number of consecutive 'X' cells ending at the current position when moving left.
- The other stores the same information when moving up.

After these tables are ready, I look at every cell that contains an 'X'. For that cell I take the smaller of its left-count and up-count. That number is the largest side length I need to test.

I try that side length and every smaller length. For each candidate side s I check two things:

1. The horizontal count at the cell located s-1 rows above me is at least s (this guarantees the top border is solid).
2. The vertical count at the cell located s-1 columns to my left is at least s (this guarantees the left border is solid).

The bottom and right borders are already guaranteed by the way I chose the maximum side. The first time both checks pass, I record that side length and stop looking at smaller sizes for the current cell.

At the end I simply return the largest side length I found.

## Data Structures Used

- Two 2D integer arrays (or vectors / lists) of size n x n  
  These store the consecutive horizontal and vertical 'X' counts. They give O(1) lookup for border lengths and are the only extra space needed beyond the input.

No other advanced data structures are required. Plain arrays keep the solution simple and fast enough for the given constraints.

## Operations & Behavior Summary

1. Read the size of the matrix.
2. Create and fill the horizontal consecutive-count table.
3. Create and fill the vertical consecutive-count table.
4. Initialize the answer to 0.
5. For every cell that holds an 'X':
   - Compute the largest possible side that can end at this cell.
   - Test side lengths from large to small.
   - For each side, verify the top and left borders using the precomputed tables.
   - Update the global answer as soon as a valid side is found.
6. Return the final answer.

The algorithm never examines a square larger than necessary and never rescans borders cell by cell.

## Complexity

| Type              | Complexity | Explanation                                                                 |
|-------------------|------------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n³)      | Building the two tables takes O(n²). For each of the n² cells we may examine up to n possible side lengths, giving the cubic term. |
| Space Complexity  | O(n²)      | Two extra n × n tables are allocated to store consecutive counts.           |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int largestSubsquare(vector<vector<char>> &mat) {
        int n = mat.size();
        if (n == 0) return 0;
        vector<vector<int>> hor(n, vector<int>(n, 0));
        vector<vector<int>> ver(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 'X') {
                    hor[i][j] = (j == 0) ? 1 : hor[i][j - 1] + 1;
                    ver[i][j] = (i == 0) ? 1 : ver[i - 1][j] + 1;
                }
            }
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 'X') {
                    int maxSide = min(hor[i][j], ver[i][j]);
                    for (int s = maxSide; s > ans; s--) {
                        if (hor[i - s + 1][j] >= s && ver[i][j - s + 1] >= s) {
                            ans = s;
                            break;
                        }
                    }
                }
            }
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int largestSubsquare(char mat[][]) {
        int n = mat.length;
        if (n == 0) return 0;
        int[][] hor = new int[n][n];
        int[][] ver = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 'X') {
                    hor[i][j] = (j == 0) ? 1 : hor[i][j - 1] + 1;
                    ver[i][j] = (i == 0) ? 1 : ver[i - 1][j] + 1;
                }
            }
        }
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 'X') {
                    int maxSide = Math.min(hor[i][j], ver[i][j]);
                    for (int s = maxSide; s > ans; s--) {
                        if (hor[i - s + 1][j] >= s && ver[i][j - s + 1] >= s) {
                            ans = s;
                            break;
                        }
                    }
                }
            }
        }
        return ans;
    }
};
```

### JavaScript
```javascript
/**
 * @param {string[][]} mat
 * @return {number}
 */
class Solution {
    largestSubsquare(mat) {
        let n = mat.length;
        if (n === 0) return 0;
        let hor = Array.from({length: n}, () => Array(n).fill(0));
        let ver = Array.from({length: n}, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 'X') {
                    hor[i][j] = (j === 0) ? 1 : hor[i][j - 1] + 1;
                    ver[i][j] = (i === 0) ? 1 : ver[i - 1][j] + 1;
                }
            }
        }
        let ans = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (mat[i][j] === 'X') {
                    let maxSide = Math.min(hor[i][j], ver[i][j]);
                    for (let s = maxSide; s > ans; s--) {
                        if (hor[i - s + 1][j] >= s && ver[i][j - s + 1] >= s) {
                            ans = s;
                            break;
                        }
                    }
                }
            }
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def largestSubsquare(self, mat):
        n = len(mat)
        if n == 0:
            return 0
        hor = [[0] * n for _ in range(n)]
        ver = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if mat[i][j] == 'X':
                    hor[i][j] = 1 if j == 0 else hor[i][j - 1] + 1
                    ver[i][j] = 1 if i == 0 else ver[i - 1][j] + 1
        ans = 0
        for i in range(n):
            for j in range(n):
                if mat[i][j] == 'X':
                    maxSide = min(hor[i][j], ver[i][j])
                    for s in range(maxSide, ans, -1):
                        if hor[i - s + 1][j] >= s and ver[i][j - s + 1] >= s:
                            ans = s
                            break
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. Only syntax changes.

I start by getting the side length n of the matrix. If the matrix is empty I return 0 immediately so the rest of the code never deals with zero-size arrays.

Next I create two n-by-n tables. In C++ and Java they are 2D vectors or arrays of integers. In JavaScript I use Array.from to build nested arrays. In Python I use list comprehensions. All of them start filled with zeros.

I then walk every cell once. Whenever the current cell is 'X' I set the horizontal count: if I am in the first column the value is 1, otherwise I add one to the value of the cell on my left. I do the exact same thing for the vertical direction using the cell above me. Cells that contain 'O' keep the value 0. After this pass every position knows how far a solid run of 'X' extends left and up from itself.

I keep a variable that stores the largest valid side found so far and initialize it to 0.

I walk the matrix a second time. I skip any cell that is not 'X' because a square cannot end on an 'O'. For a valid cell I compute the maximum possible side as the minimum of its horizontal and vertical counts. I then try every side from that maximum down to a value larger than the current answer. There is no point testing smaller sizes once a bigger answer already exists.

For a candidate side s I perform two constant-time lookups:
- Look at the cell s-1 rows above the current cell and check its horizontal count. If it is at least s the entire top border is 'X'.
- Look at the cell s-1 columns to the left and check its vertical count. If it is at least s the entire left border is 'X'.

If both conditions hold I update the answer and break out of the inner loop for that cell. Continuing would only find smaller or equal sizes.

After every cell has been examined the answer variable holds the side length of the largest square whose four borders are completely filled with 'X'. I return that value.

Edge cases are handled naturally:
- A single isolated 'X' produces side length 1.
- An all-'O' matrix produces 0.
- The whole matrix being 'X' produces n.

## Examples

**Example 1**

Input:
```
X X X O
X O X X
X X X O
X O X X
```

Output: 3

The square that starts at the top-left cell and ends at row 2, column 2 has all four borders made of 'X'. No larger square exists.

**Example 2**

Input:
```
X X
X X
```

Output: 2

The entire matrix is already a valid square surrounded by 'X'.

**Example 3**

Input:
```
O O
O X
```

Output: 1

Only one cell contains 'X', so the largest possible square has side length 1.

## How to Use / Run Locally

**C++**  
Save the code in a file named `main.cpp`. Compile with:  
`g++ -std=c++17 main.cpp -o main`  
Run with:  
`./main`

**Java**  
Save the code in a file named `Solution.java`. Compile with:  
`javac Solution.java`  
Run with:  
`java Solution`

**JavaScript**  
Save the code in a file named `solution.js`. Run with Node.js:  
`node solution.js`

**Python3**  
Save the code in a file named `solution.py`. Run with:  
`python3 solution.py`

In each case you will need to add a small main / driver section that reads the matrix and prints the result, because the provided snippets only contain the core function.

## Notes & Optimizations

The expected time complexity on GeeksforGeeks for this problem is O(n³) with O(n²) extra space, which matches the solution above.

You could try to stop early once you find a square of size n, but in the worst case you still need to examine most cells, so the asymptotic bound does not improve.

An alternative approach is to iterate possible side lengths from largest to smallest and stop at the first valid square. That version can be faster on some test cases but still has the same worst-case complexity.

Remember that the inside of the square does not matter at all. Only the four borders need to be solid 'X'. The precomputed tables make those border checks extremely cheap.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)