# k Times Appearing Adjacent Two 1's | Count Binary Strings with Exactly k Adjacent 1s

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

This GeeksforGeeks problem asks us to count how many binary strings of length `n` contain exactly `k` adjacent pairs of `1`s.

A binary string is made only of `0` and `1`.

For example, in the string `1110`, the adjacent `1` pairs are:

* positions 1 and 2
* positions 2 and 3

So the count is `2`.

The task is to return the total number of such strings modulo `10^9 + 7`.

### Input

* `n`: length of the binary string
* `k`: exact number of adjacent `"11"` pairs

### Output

* The number of binary strings of length `n` with exactly `k` adjacent `1`s next to each other

## Constraints

| Constraint               | Meaning                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| `1 <= n, k <= 10^3`      | The string length and required adjacent pair count can both be large |
| Answer modulo `10^9 + 7` | The result must be returned under modular arithmetic                 |

## Intuition

My first thought was that I do not need to remember the whole string while building it.

The only thing that matters at each step is:

* how many adjacent `"11"` pairs I have already formed
* what the last bit is

That is enough because a new adjacent pair can only appear when I append a `1` after another `1`.

So I realized this is a classic dynamic programming problem on binary strings. I just need to build the answer one character at a time and keep track of the last bit and the current pair count.

## Approach

I use dynamic programming to count valid binary strings.

I define a state like this:

`dp[length][pairs][last]`

Here:

* `length` means how many characters are already placed
* `pairs` means how many adjacent `"11"` pairs have been formed
* `last` means the last bit of the current string, either `0` or `1`

Now I extend every valid string by one more bit.

If I add `0`:

* the number of adjacent `"11"` pairs does not change
* the last bit becomes `0`

If I add `1`:

* if the previous bit was `0`, no new pair is formed
* if the previous bit was `1`, one new adjacent pair is formed

I start with strings of length `1`:

* `"0"`
* `"1"`

Both have `0` adjacent pairs.

Then I fill the DP table from length `2` up to `n`.

At the end, the answer is:

`dp[n][k][0] + dp[n][k][1]`

because valid strings can end in either `0` or `1`.

## Data Structures Used

* `3D DP array`: used to store counts for every length, pair count, and last bit. This makes the transition simple and easy to understand.
* `Modulo arithmetic`: used to keep values inside the required range and avoid overflow.

## Operations & Behavior Summary

1. Start with the two single-bit strings: `0` and `1`.
2. For every next length, try appending `0` and `1` to all previously counted strings.
3. Update the pair count only when the new bit is `1` and the previous bit was also `1`.
4. Keep all counts modulo `10^9 + 7`.
5. Return the sum of all valid strings of length `n` with exactly `k` pairs.

## Complexity

| Type             | Complexity | Explanation                                                                                                    |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n * k)` | For each length from `1` to `n`, I process every pair count from `0` to `k`, and each state does constant work |
| Space Complexity | `O(n * k)` | I store DP values for every length, every pair count, and both ending bits                                     |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countStrings(int n, int k) {
        const int MOD = 1000000007;

        // dp[length][pairs][lastBit]
        vector<vector<vector<long long>>> dp(
            n + 1,
            vector<vector<long long>>(k + 1, vector<long long>(2, 0))
        );

        // Base case: strings of length 1
        dp[1][0][0] = 1; // "0"
        dp[1][0][1] = 1; // "1"

        // Build strings from length 2 to n
        for (int len = 2; len <= n; len++) {
            for (int pairs = 0; pairs <= k; pairs++) {

                // Previous string ended with 0

                // Append 0 -> still ends with 0, pair count unchanged
                dp[len][pairs][0] =
                    (dp[len][pairs][0] + dp[len - 1][pairs][0]) % MOD;

                // Append 1 -> ends with 1, no new "11" pair
                dp[len][pairs][1] =
                    (dp[len][pairs][1] + dp[len - 1][pairs][0]) % MOD;

                // Previous string ended with 1

                // Append 0 -> pair count unchanged
                dp[len][pairs][0] =
                    (dp[len][pairs][0] + dp[len - 1][pairs][1]) % MOD;

                // Append 1 -> creates one new adjacent "11" pair
                if (pairs > 0) {
                    dp[len][pairs][1] =
                        (dp[len][pairs][1] + dp[len - 1][pairs - 1][1]) % MOD;
                }
            }
        }

        // Strings ending with either 0 or 1
        return (dp[n][k][0] + dp[n][k][1]) % MOD;
    }
};
```

### Java

```java
class Solution {
    public int countStrings(int n, int k) {

        final int MOD = 1000000007;

        // dp[length][pairs][lastBit]
        long[][][] dp = new long[n + 1][k + 1][2];

        // Base case
        dp[1][0][0] = 1;
        dp[1][0][1] = 1;

        // Build the answer
        for (int len = 2; len <= n; len++) {
            for (int pairs = 0; pairs <= k; pairs++) {

                // Previous last bit was 0

                // Append 0
                dp[len][pairs][0] =
                        (dp[len][pairs][0] + dp[len - 1][pairs][0]) % MOD;

                // Append 1
                dp[len][pairs][1] =
                        (dp[len][pairs][1] + dp[len - 1][pairs][0]) % MOD;

                // Previous last bit was 1

                // Append 0
                dp[len][pairs][0] =
                        (dp[len][pairs][0] + dp[len - 1][pairs][1]) % MOD;

                // Append 1 creates one more "11"
                if (pairs > 0) {
                    dp[len][pairs][1] =
                            (dp[len][pairs][1] + dp[len - 1][pairs - 1][1]) % MOD;
                }
            }
        }

        return (int)((dp[n][k][0] + dp[n][k][1]) % MOD);
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @returns {number}
 */
class Solution {
    countStrings(n, k) {

        const MOD = 1000000007;

        // dp[length][pairs][lastBit]
        const dp = Array.from({ length: n + 1 }, () =>
            Array.from({ length: k + 1 }, () => [0, 0])
        );

        // Base case
        dp[1][0][0] = 1;
        dp[1][0][1] = 1;

        // Build strings
        for (let len = 2; len <= n; len++) {
            for (let pairs = 0; pairs <= k; pairs++) {

                // Previous last bit was 0

                // Append 0
                dp[len][pairs][0] =
                    (dp[len][pairs][0] + dp[len - 1][pairs][0]) % MOD;

                // Append 1
                dp[len][pairs][1] =
                    (dp[len][pairs][1] + dp[len - 1][pairs][0]) % MOD;

                // Previous last bit was 1

                // Append 0
                dp[len][pairs][0] =
                    (dp[len][pairs][0] + dp[len - 1][pairs][1]) % MOD;

                // Append 1 creates one new pair
                if (pairs > 0) {
                    dp[len][pairs][1] =
                        (dp[len][pairs][1] + dp[len - 1][pairs - 1][1]) % MOD;
                }
            }
        }

        return (dp[n][k][0] + dp[n][k][1]) % MOD;
    }
}
```

### Python3

```python
class Solution:
    def countStrings(self, n, k): 
        MOD = 1000000007

        # dp[length][pairs][lastBit]
        dp = [[[0] * 2 for _ in range(k + 1)] for _ in range(n + 1)]

        # Base case
        dp[1][0][0] = 1
        dp[1][0][1] = 1

        # Build strings of increasing length
        for length in range(2, n + 1):
            for pairs in range(k + 1):

                # Previous last bit was 0

                # Append 0
                dp[length][pairs][0] = (
                    dp[length][pairs][0] + dp[length - 1][pairs][0]
                ) % MOD

                # Append 1
                dp[length][pairs][1] = (
                    dp[length][pairs][1] + dp[length - 1][pairs][0]
                ) % MOD

                # Previous last bit was 1

                # Append 0
                dp[length][pairs][0] = (
                    dp[length][pairs][0] + dp[length - 1][pairs][1]
                ) % MOD

                # Append 1 creates one extra adjacent "11"
                if pairs > 0:
                    dp[length][pairs][1] = (
                        dp[length][pairs][1] + dp[length - 1][pairs - 1][1]
                    ) % MOD

        # Count strings ending with either 0 or 1
        return (dp[n][k][0] + dp[n][k][1]) % MOD
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages, so I explain it once in a way that applies to each version.

I begin by creating a DP structure where each state remembers:

* the current string length
* how many `"11"` pairs have already appeared
* what the last bit is

That last bit is important. Without it, I would not know whether appending `1` creates a new adjacent pair or not.

For the base case, I set:

* `"0"` as one valid string of length `1` with `0` pairs
* `"1"` as one valid string of length `1` with `0` pairs

Then I move forward length by length.

For every valid state, I try two choices:

* append `0`
* append `1`

Appending `0` is easy. It never creates a new `"11"` pair.

Appending `1` depends on the previous bit:

* if the previous bit was `0`, the pair count stays the same
* if the previous bit was `1`, the pair count increases by `1`

That is the whole idea of the transition.

I use modulo arithmetic after every update because the number of strings grows very fast.

At the end, I do not care whether the string ends in `0` or `1`. Both are valid, so I add both counts for `dp[n][k][0]` and `dp[n][k][1]`.

### Why this works well in every language

The approach is only based on arrays, loops, and simple integer updates. That makes it easy to translate into C++, Java, JavaScript, and Python3 without changing the core logic.

## Examples

### Example 1

**Input:** `n = 3, k = 2`

**Output:** `1`

**Trace:**
The only valid string is `111`.
It has two adjacent `"11"` pairs:

* first and second `1`
* second and third `1`

### Example 2

**Input:** `n = 5, k = 2`

**Output:** `6`

**Trace:**
The valid strings include:

* `00111`
* `01110`
* `01101`
* `10111`
* `11011`
* `11100`

Each one has exactly two adjacent `"11"` pairs.

### Example 3

**Input:** `n = 4, k = 0`

**Output:** `8`

**Trace:**
Here I need binary strings of length `4` with no adjacent `1`s.
The DP counts all such strings, and the result is `8`.

## How to Use / Run Locally

### C++

Compile and run with:

```bash
g++ -std=c++17 -O2 -o main main.cpp
./main
```

### Java

Compile and run with:

```bash
javac Solution.java
java Solution
```

### JavaScript

Run with Node.js:

```bash
node solution.js
```

### Python3

Run with:

```bash
python3 solution.py
```

## Notes & Optimizations

A few things matter here.

First, the state must include the last bit. If I remove that, I lose the information needed to detect a new `"11"` pair.

Second, this is a standard dynamic programming solution for counting binary strings with adjacent 1s. It is much better than brute force, because brute force would need to check all `2^n` strings.

Third, if memory needs to be reduced, I can optimize the DP space using only the previous length layer instead of storing all lengths. That would reduce space from `O(n * k)` to `O(k)`, but the full version is easier to understand and explain.

This solution is a clean fit for the GeeksforGeeks problem because it is simple, fast, and easy to implement in all required languages.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
