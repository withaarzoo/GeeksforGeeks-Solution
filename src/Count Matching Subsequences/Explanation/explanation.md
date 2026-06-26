# Count Matching Subsequences | Dynamic Programming Solution

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

This problem asks us to count how many subsequences of `s1` are exactly equal to `s2`.

A subsequence is formed by deleting zero or more characters from a string without changing the order of the remaining characters.

We are given:

* `s1`: the main string
* `s2`: the target string

We need to return the number of different subsequences of `s1` that match `s2`.

The answer must be returned modulo `1e9+7`.

This is a classic dynamic programming on strings problem and a very common DSA interview pattern.

## Constraints

| Constraint     |                    Value |
| -------------- | -----------------------: |
| Length of `s1` | `1 <= s1.size() <= 10^3` |
| Length of `s2` | `1 <= s2.size() <= 10^3` |
| Output         |     Count modulo `1e9+7` |

## Intuition

At first, the problem looks like something I could solve by checking every possible subsequence of `s1`. But that would explode very quickly because each character creates two choices: take it or skip it.

So I looked for a smarter way to count only the valid matches.

The key idea is that I do not need to build subsequences directly. I only need to know how many ways I can form a prefix of `s2` using a prefix of `s1`. That makes dynamic programming a natural fit.

## Approach

I use DP where `dp[i][j]` means:

the number of ways to form the first `j` characters of `s2` using the first `i` characters of `s1`.

The base cases are simple:

* An empty `s2` can always be formed in exactly one way: by choosing nothing.
* A non-empty `s2` cannot be formed from an empty `s1`.

So I set:

* `dp[i][0] = 1` for all `i`
* `dp[0][j] = 0` for all `j > 0`

Then I fill the table one row at a time.

For each character in `s1`, I have two choices:

* skip it
* use it if it matches the current character in `s2`

So if `s1[i-1] != s2[j-1]`, I can only skip it:

* `dp[i][j] = dp[i-1][j]`

If they match, I can either skip or use it:

* `dp[i][j] = dp[i-1][j] + dp[i-1][j-1]`

I apply modulo `1e9+7` after every addition to keep numbers within range.

The final answer is `dp[n][m]`.

## Data Structures Used

| Data Structure    | Why I Used It                                                   |
| ----------------- | --------------------------------------------------------------- |
| 2D DP table       | Stores the count of ways for every prefix pair of `s1` and `s2` |
| Strings           | Input strings used for character-by-character comparison        |
| Integer variables | Store lengths and modular values safely                         |

## Operations & Behavior Summary

1. Read both strings.
2. Create a DP table of size `(n+1) x (m+1)`.
3. Set every `dp[i][0] = 1` because the empty target string is always possible.
4. Traverse `s1` from left to right.
5. For each position, traverse `s2` from left to right.
6. Carry forward the count when skipping the current character of `s1`.
7. Add extra ways when the current characters match.
8. Return the count stored in the last cell of the table.

## Complexity

| Metric           | Complexity | Explanation                                                           |
| ---------------- | ---------- | --------------------------------------------------------------------- |
| Time Complexity  | `O(n * m)` | I fill each DP cell once, where `n = len(s1)` and `m = len(s2)`       |
| Space Complexity | `O(n * m)` | I store the full DP table to keep the counting logic simple and clear |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countWays(string &s1, string &s2) {
        // Mod value given in the problem
        const int MOD = 1000000007;

        int n = s1.size();
        int m = s2.size();

        // dp[i][j] = ways to form first j characters of s2
        // using first i characters of s1
        vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));

        // Empty string can always be formed in one way
        for (int i = 0; i <= n; i++)
            dp[i][0] = 1;

        // Fill the DP table
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {

                // Skip current character of s1
                dp[i][j] = dp[i - 1][j];

                // If characters match, include current character as well
                if (s1[i - 1] == s2[j - 1]) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD;
                }
            }
        }

        // Final answer
        return dp[n][m];
    }
};
```

### Java

```java
class Solution {
    public static int countWays(String s1, String s2) {

        // Mod value given in the problem
        final int MOD = 1000000007;

        int n = s1.length();
        int m = s2.length();

        // dp[i][j] stores the number of ways
        long[][] dp = new long[n + 1][m + 1];

        // Empty string can always be formed
        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        // Build the DP table
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {

                // Skip current character of s1
                dp[i][j] = dp[i - 1][j];

                // Include current character if both match
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD;
                }
            }
        }

        // Return final answer
        return (int) dp[n][m];
    }
}
```

### JavaScript

```javascript
class Solution {
    countWays(s1, s2) {

        // Mod value given in the problem
        const MOD = 1000000007;

        const n = s1.length;
        const m = s2.length;

        // Create DP table filled with 0
        const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

        // Empty string can always be formed
        for (let i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        // Fill the DP table
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {

                // Skip current character
                dp[i][j] = dp[i - 1][j];

                // Include current character if it matches
                if (s1[i - 1] === s2[j - 1]) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD;
                }
            }
        }

        // Final answer
        return dp[n][m];
    }
}
```

### Python3

```python
class Solution:
    def countWays(self, s1, s2):
        # Mod value given in the problem
        MOD = 1000000007

        n = len(s1)
        m = len(s2)

        # dp[i][j] = ways to form first j characters of s2
        # using first i characters of s1
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        # Empty string can always be formed
        for i in range(n + 1):
            dp[i][0] = 1

        # Fill the DP table
        for i in range(1, n + 1):
            for j in range(1, m + 1):

                # Skip current character
                dp[i][j] = dp[i - 1][j]

                # Include current character if both characters match
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - 1]) % MOD

        # Return the final answer
        return dp[n][m]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages.

I start by creating a DP table where each entry tells me how many ways I can build a prefix of `s2` from a prefix of `s1`.

Then I handle the base case for an empty target string. That part matters because there is always exactly one way to match an empty string: ignore everything.

After that, I compare characters one by one.

If the current characters do not match, I cannot use the current character from `s1` to help form `s2`, so I just copy the previous count.

If they do match, I gain one more option. I can either:

* ignore the current character, or
* use it and continue from the smaller subproblem

That is why the transition adds two counts together.

This pattern is very common in subsequence counting problems. The important part is that I always look at smaller prefixes, so I never count the same subproblem twice.

The modulo step is important because the number of subsequences can grow very fast. Without modulo, the result can overflow normal integer limits.

## Examples

### Example 1

**Input:**

* `s1 = "geeksforgeeks"`
* `s2 = "gks"`

**Expected Output:**

* `4`

**Trace:**
I look for all ways to pick `g`, then `k`, then `s` in order.
There are 4 valid combinations, so the answer is 4.

### Example 2

**Input:**

* `s1 = "problemoftheday"`
* `s2 = "geek"`

**Expected Output:**

* `0`

**Trace:**
The target string contains characters that do not appear in the right pattern inside `s1`, so no subsequence can match it.

### Example 3

**Input:**

* `s1 = "aaaaa"`
* `s2 = "aa"`

**Expected Output:**

* `10`

**Trace:**
I can choose any 2 positions out of 5 while keeping order.
That gives `C(5,2) = 10`.

## How to Use / Run Locally

### C++

1. Copy the C++ solution into a file like `main.cpp`.
2. Compile it using:

   ```bash
   g++ -std=c++17 -O2 -o main main.cpp
   ```

3. Run it using:

   ```bash
   ./main
   ```

### Java

1. Save the solution in `Solution.java`.
2. Compile it using:

   ```bash
   javac Solution.java
   ```

3. Run it using:

   ```bash
   java Solution
   ```

### JavaScript

1. Save the solution in `solution.js`.
2. Run it using Node.js:

   ```bash
   node solution.js
   ```

### Python3

1. Save the solution in `solution.py`.
2. Run it using:

   ```bash
   python3 solution.py
   ```

## Notes & Optimizations

The DP solution is clean and easy to understand, but it uses `O(n * m)` space. That is fine for the given constraints.

A useful optimization is to reduce space to `O(m)` by using a 1D DP array and updating it in reverse. That works because each state only depends on the previous row.

I kept the full 2D version here because it is easier to explain, debug, and trust when learning the pattern.

This problem is a strong example of:

* subsequence counting
* dynamic programming on strings
* prefix-based DP
* modular arithmetic in DSA

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
