# Ways to Reach Origin - Dynamic Programming Grid Paths Solution

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You start at a point (x, y) on a 2D grid and need to reach the origin (0, 0). From any position you can only move left (decrease x by 1) or down (decrease y by 1). The task is to count the total number of distinct paths that take you from (x, y) all the way to (0, 0). Because the number of paths can grow very large, the answer must be returned modulo 10^9 + 7.

This is a classic grid path counting problem that appears often in competitive programming contests and DSA interviews. The input consists of two non-negative integers x and y. The output is a single integer representing the number of valid paths under the given movement rules.

## Constraints

- 0 ≤ x, y ≤ 500

These limits mean a simple dynamic programming table of size roughly 501 × 501 is perfectly acceptable in both time and memory.

## Intuition

The first thing I noticed is that every valid path consists of exactly x left moves and y down moves. The only difference between paths is the order in which those moves are taken. That is exactly the definition of a binomial coefficient: C(x + y, x) or C(x + y, y).

Because x and y can be as large as 500, computing the binomial coefficient directly with factorials would overflow even 64-bit integers. A dynamic programming approach that builds the answer cell by cell avoids big-integer arithmetic and automatically handles the required modulo operation.

## Approach

I create a 2-D table dp where dp[i][j] stores the number of ways to reach the origin from the point (i, j).

Base cases are straightforward:
- When j = 0 I can only move left, so there is exactly one path.
- When i = 0 I can only move down, so again there is exactly one path.

For every other cell the recurrence is:

dp[i][j] = (dp[i-1][j] + dp[i][j-1]) % (10^9 + 7)

I fill the table in order of increasing i and increasing j so that the two values I need have already been computed. When the loops finish, dp[x][y] holds the final answer.

## Data Structures Used

- 2-D array / matrix (dp table)  
  Used to store the number of ways for every intermediate point (i, j). A simple rectangular array is chosen because both dimensions are small (≤ 500) and random access is required for the recurrence.

No other data structures are needed. A 1-D rolling array could reduce space further, but the plain 2-D table keeps the code clear and matches the expected complexity.

## Operations & Behavior Summary

1. Allocate a table of size (x+1) by (y+1) and initialize every entry to zero.
2. Set the entire first column (j = 0) to 1 and the entire first row (i = 0) to 1.
3. For every remaining cell, add the value coming from the left neighbor and the value coming from the upper neighbor, then take modulo 10^9+7.
4. Return the value stored at position (x, y).

The algorithm never revisits a cell, so each entry is written exactly once.

## Complexity

| Type              | Complexity | Explanation                                                                 |
|-------------------|------------|-----------------------------------------------------------------------------|
| Time Complexity   | O(x · y)   | Every cell of the (x+1)×(y+1) table is visited once and updated in constant time. |
| Space Complexity  | O(x · y)   | A full 2-D table of size (x+1)×(y+1) is allocated.                          |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int ways(int x, int y) {
        const int MOD = 1000000007;
        vector<vector<int>> dp(x + 1, vector<int>(y + 1, 0));
        for (int i = 0; i <= x; i++) dp[i][0] = 1;
        for (int j = 0; j <= y; j++) dp[0][j] = 1;
        for (int i = 1; i <= x; i++) {
            for (int j = 1; j <= y; j++) {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
        return dp[x][y];
    }
};
```

### Java
```java
class Solution {
    public int ways(int x, int y) {
        final int MOD = 1000000007;
        int[][] dp = new int[x + 1][y + 1];
        for (int i = 0; i <= x; i++) dp[i][0] = 1;
        for (int j = 0; j <= y; j++) dp[0][j] = 1;
        for (int i = 1; i <= x; i++) {
            for (int j = 1; j <= y; j++) {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
        return dp[x][y];
    }
}
```

### JavaScript
```javascript
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */

class Solution {
    ways(x, y) {
        const MOD = 1000000007;
        const dp = Array.from({ length: x + 1 }, () => Array(y + 1).fill(0));
        for (let i = 0; i <= x; i++) dp[i][0] = 1;
        for (let j = 0; j <= y; j++) dp[0][j] = 1;
        for (let i = 1; i <= x; i++) {
            for (let j = 1; j <= y; j++) {
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD;
            }
        }
        return dp[x][y];
    }
}
```

### Python3
```python
class Solution:
    def ways(self, x: int, y: int) -> int:
        MOD = 10**9 + 7
        dp = [[0] * (y + 1) for _ in range(x + 1)]
        for i in range(x + 1):
            dp[i][0] = 1
        for j in range(y + 1):
            dp[0][j] = 1
        for i in range(1, x + 1):
            for j in range(1, y + 1):
                dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % MOD
        return dp[x][y]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

I begin by declaring the constant MOD = 1000000007 so the remainder operation is always performed with the correct value.

Next I allocate the dp table. In C++ and Java this is done with a vector of vectors or a native 2-D array. In JavaScript I use Array.from to create an array of arrays. In Python I use a list comprehension. All of them produce a rectangular matrix of size (x+1) by (y+1) filled with zeros.

I then set the base cases. A single loop walks along the x-axis (j = 0) and another loop walks along the y-axis (i = 0), writing 1 into every cell. These two lines guarantee that any path that stays on an axis has a correct answer.

The nested loops that follow are the heart of the solution. For each i from 1 to x and each j from 1 to y I compute

dp[i][j] = (dp[i-1][j] + dp[i][j-1]) % MOD

Because the loops run in increasing order, both neighboring cells already contain their final values. The modulo operation keeps every intermediate result inside the 32-bit integer range required by the problem.

After the loops finish, the single cell dp[x][y] contains the number of paths from the original starting point to the origin. That value is returned.

Edge cases are handled automatically:
- If x = 0 or y = 0 the base-case loops already set the answer to 1.
- If both are zero the answer is also 1 (the empty path).

No language-specific tricks are required; the same reasoning works everywhere.

## Examples

**Example 1**  
Input: x = 3, y = 0  
Output: 1  

Trace: Because y is zero the only possible sequence is three left moves: (3,0) → (2,0) → (1,0) → (0,0). The DP table’s first column is filled with 1s, so dp[3][0] is simply 1.

**Example 2**  
Input: x = 3, y = 6  
Output: 84  

Trace: The table is filled cell by cell. After processing all 4×7 cells the value at dp[3][6] equals C(9,3) = 84, which is already smaller than the modulus, so the answer is 84.

**Example 3**  
Input: x = 1, y = 1  
Output: 2  

Trace: The two possible paths are left-then-down and down-then-left. The recurrence gives dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2.

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `solution.cpp`.  
2. Compile with `g++ -std=c++17 solution.cpp -o solution`.  
3. Run with `./solution` and supply the values of x and y according to the problem’s input format.

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution` and provide input as required.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node.js: `node solution.js`.  
3. Read input from standard input or hard-code test values for quick checks.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run with `python3 solution.py`.  
3. Supply x and y through standard input or a simple test harness.

In all cases you can add a small main/driver function that reads two integers and prints the result of the `ways` method for local testing.

## Notes & Optimizations

- The pure combinatorial formula C(x+y, x) mod 10^9+7 can also be used. It requires modular inverses (or pre-computed factorials and inverse factorials). The DP approach is simpler to implement under the given constraints and matches the expected O(x·y) complexity.
- Space can be reduced to O(min(x,y)) by keeping only the previous row (or column) of the DP table. This is a useful exercise once the basic solution is working.
- When x = 0 or y = 0 the answer is always 1, which is already covered by the base cases.
- The modulus is applied at every addition so intermediate values never overflow a 32-bit signed integer.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)