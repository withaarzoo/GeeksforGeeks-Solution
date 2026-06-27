# Ways to Tile the Floor | GeeksforGeeks DSA Solution

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

In this GeeksforGeeks dynamic programming problem, I need to count how many ways I can completely tile a floor of size `n × m` using tiles of size `1 × m`.

The tile can be placed in two ways:

* Horizontally, which covers one full row.
* Vertically, which covers `m` rows and one column.

The goal is to find the total number of valid tilings with no overlap and no uncovered cells.

**Input:** Two integers `n` and `m`
**Output:** Number of ways to tile the floor modulo `10^9 + 7`

This is a classic DSA problem based on dynamic programming, recurrence relation, and combinatorics.

## Constraints

* `1 <= n <= 10^5`
* `2 <= m <= 10^5`

## Intuition

When I first looked at the problem, I noticed that every valid tiling starts with one of only two choices.

Either I place one tile horizontally, which covers exactly one row, or I place a full block of vertical tiles, which covers `m` rows at once.

That observation is the main reason this problem becomes a DP problem. I do not need to try all placements manually. I just need to count the number of ways for smaller floors and build the answer from them.

## Approach

I define `dp[i]` as the number of ways to tile a floor of size `i × m`.

Then I think about the last move:

* If I place one horizontal tile first, the remaining problem becomes `dp[i - 1]`.
* If I place `m` vertical tiles together, the remaining problem becomes `dp[i - m]`.

So the recurrence becomes:

`dp[i] = dp[i - 1] + dp[i - m]`

Now I handle the base cases carefully:

* If `i < m`, only horizontal placement is possible, so there is exactly one way.
* If `i == m`, there are exactly two ways:

  * all tiles horizontal
  * all tiles vertical

I compute the answer iteratively from smaller values to larger ones. This avoids recursion and keeps the solution efficient.

Since the answer can be very large, I take modulo `10^9 + 7` at each step.

## Data Structures Used

* **DP array / list**: I use this to store answers for smaller subproblems. This makes the recurrence fast and easy to reuse.
* **No extra complex data structure**: I do not need a stack, queue, or hash map because the problem has a simple linear DP structure.

## Operations & Behavior Summary

* Start from the smallest floor sizes.
* Fill the DP table one state at a time.
* For each `i`, count:

  * ways using one horizontal tile first
  * ways using a vertical block first when allowed
* Add both values together.
* Apply modulo.
* Return `dp[n]` as the final answer.

## Complexity

| Complexity |  Value | Explanation                                                       |
| ---------- | -----: | ----------------------------------------------------------------- |
| Time       | `O(n)` | I compute each DP state once, from `1` to `n`.                    |
| Space      | `O(n)` | I store all DP values in an array so I can reuse earlier answers. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countWays(int n, int m) {
        // Mod value given in the problem
        const int MOD = 1000000007;

        // dp[i] = number of ways to tile i x m floor
        vector<long long> dp(n + 1, 0);

        // Base case: empty floor has one valid way
        dp[0] = 1;

        // Build answer from smaller floors
        for (int i = 1; i <= n; i++) {

            // Always possible to place one horizontal tile
            dp[i] = dp[i - 1];

            // Vertical placement is possible only when at least m rows exist
            if (i >= m) {
                dp[i] = (dp[i] + dp[i - m]) % MOD;
            }
        }

        // Return final answer
        return dp[n];
    }
};
```

### Java

```java
class Solution {
    public int countWays(int n, int m) {

        // Mod value given in the problem
        final int MOD = 1000000007;

        // dp[i] stores number of ways for i x m floor
        long[] dp = new long[n + 1];

        // Empty floor has one valid arrangement
        dp[0] = 1;

        // Compute answers iteratively
        for (int i = 1; i <= n; i++) {

            // Place one horizontal tile first
            dp[i] = dp[i - 1];

            // If vertical placement is possible, add those ways
            if (i >= m) {
                dp[i] = (dp[i] + dp[i - m]) % MOD;
            }
        }

        // Return answer after modulo
        return (int) dp[n];
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
class Solution {
    countWays(n, m) {

        // Mod value given in the problem
        const MOD = 1000000007;

        // dp[i] stores number of ways for i x m floor
        const dp = new Array(n + 1).fill(0);

        // Empty floor has one valid arrangement
        dp[0] = 1;

        // Compute DP from smaller floors
        for (let i = 1; i <= n; i++) {

            // Place one horizontal tile
            dp[i] = dp[i - 1];

            // Add ways after placing m vertical tiles
            if (i >= m) {
                dp[i] = (dp[i] + dp[i - m]) % MOD;
            }
        }

        // Final answer
        return dp[n];
    }
}
```

### Python3

```python
class Solution:
 def countWays(self, n, m):
  # Mod value given in the problem
  MOD = 1000000007

  # dp[i] stores number of ways for i x m floor
  dp = [0] * (n + 1)

  # Empty floor has one valid arrangement
  dp[0] = 1

  # Build DP table
  for i in range(1, n + 1):

   # Place one horizontal tile
   dp[i] = dp[i - 1]

   # Add ways formed by placing m vertical tiles
   if i >= m:
    dp[i] = (dp[i] + dp[i - m]) % MOD

  # Return answer
  return dp[n]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages, so I explain it once clearly.

I start by creating a DP array of size `n + 1`. The extra slot is useful because I want to use 1-based indexing for the problem states. `dp[0]` represents an empty floor.

Then I set `dp[0] = 1`. This may look small, but it is important. An empty floor has exactly one valid tiling: do nothing. This base value helps the recurrence work properly when `i == m`.

After that, I loop from `1` to `n`.

For each `i`, I first consider placing one horizontal tile. That covers one row and leaves `i - 1` rows behind. So I add `dp[i - 1]`.

Then I check whether vertical placement is possible. A vertical tile has height `m`, so I can only use this option when `i >= m`. If that condition is true, I add `dp[i - m]`.

This gives the total number of valid tilings for the current floor size.

I apply modulo after each addition so that the number stays within range and matches the problem requirement.

At the end, `dp[n]` gives the total number of ways to tile the whole floor.

This works well because the problem has overlapping subproblems. Once I know the answer for a smaller floor, I never need to recalculate it.

## Examples

### Example 1

**Input:** `n = 4, m = 4`
**Output:** `2`

**Trace:**

* All tiles horizontal
* All tiles vertical

So there are exactly 2 valid tilings.

### Example 2

**Input:** `n = 2, m = 3`
**Output:** `1`

**Trace:**

* Vertical placement is not possible because the floor height is smaller than the tile height.
* The only possible tiling is placing both rows horizontally.

So the answer is 1.

### Example 3

**Input:** `n = 5, m = 3`
**Output:** `2`

**Trace:**

* For smaller rows, I can only place horizontal tiles.
* Once I reach enough height, I can also place a vertical block.
* The recurrence counts both valid paths.

## How to Use / Run Locally

For **C++**, save the solution in a `.cpp` file and compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

For **Java**, save it in a file named `Solution.java` and run:

```bash
javac Solution.java
java Solution
```

For **JavaScript**, save it as `solution.js` and run:

```bash
node solution.js
```

For **Python3**, save it as `solution.py` and run:

```bash
python3 solution.py
```

## Notes & Optimizations

This problem has a very clean recurrence, so the main challenge is understanding the state correctly.

A few important points:

* The recurrence only works because the tile size is fixed at `1 × m`.
* The answer grows quickly, so modulo arithmetic is required.
* A recursive solution would be slower and may cause stack depth issues for large `n`.
* Space can be optimized further to `O(m)` or even `O(1)` in some cases by keeping only the needed previous values, but the simplest and safest approach is the full DP array.

This is a good example of a tiling DP problem where pattern recognition matters more than heavy coding.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)