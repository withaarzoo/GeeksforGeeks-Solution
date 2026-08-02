# Sequences where Adjacent Divide | Dynamic Programming Solution (C++, Java, JavaScript, Python)

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

---

## Problem Summary

Given two integers `n` and `m`, the goal is to count how many arrays of length `n` can be formed using numbers from `1` to `m`.

The important condition is that every pair of adjacent elements must satisfy at least one of these:

- The first number divides the second.
- The second number divides the first.

The answer can become very large, so it should be returned modulo `10^9 + 7`.

This is a classic Dynamic Programming problem where the current state depends only on the previous element. Instead of generating every possible array, we count all valid sequences efficiently using DP and number theory.

---

## Constraints

| Constraint | Value |
|------------|-------|
| `1 ≤ n ≤ 10^3` |
| `1 ≤ m ≤ 10^3` |

---

## Intuition

The first thing I noticed was that the validity of an array depends only on two neighboring elements.

That means I never need to remember the entire sequence. I only need to know the last value placed in the array.

This immediately suggests Dynamic Programming.

If I know how many valid sequences end with every possible value, I can extend those sequences by choosing another value that satisfies the divisibility condition.

The only challenge is finding all valid previous values quickly. I solve that by precomputing divisors and iterating through multiples.

---

## Approach

I solve the problem in the following steps.

1. Create a DP table where each state stores the number of valid sequences ending with a particular value.

2. Initialize every number from `1` to `m` as a valid sequence of length `1`.

3. Precompute all divisors for every number.

4. For every sequence length from `2` to `n`:
   - Visit every possible ending value.
   - Add contributions from all of its divisors.
   - Add contributions from all of its multiples.
   - Remove the duplicate contribution because a number is both its own divisor and multiple.

5. After filling the DP table, sum all values in the final row.

This avoids checking every possible pair repeatedly and keeps the solution efficient.

---

## Data Structures Used

### Dynamic Programming Table

Stores the number of valid sequences for every sequence length and ending value.

Why it is used:

- Prevents repeated calculations.
- Makes every transition straightforward.

### Divisor List

Stores all divisors of every number from `1` to `m`.

Why it is used:

- Avoids recomputing divisors during every DP transition.
- Makes transitions much faster.

---

## Operations & Behavior Summary

The algorithm works in four major stages.

1. Precompute the divisors of every number.

2. Initialize the DP table for sequences of length `1`.

3. Build longer sequences by extending shorter ones using valid divisibility relationships.

4. Add all possible ending states to produce the final answer.

Each DP transition only looks at numbers that can legally appear before the current value.

---

## Complexity

| Type | Complexity | Explanation |
|------|------------|-------------|
| Time Complexity | `O(n × m × log m)` | `n` is the sequence length and `m` is the maximum allowed value. Divisors and multiples together take approximately `O(m log m)` work for each DP layer. |
| Space Complexity | `O(n × m)` | The DP table stores one state for every sequence length and every possible ending value. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int count(int n, int m) {
        const int MOD = 1000000007;

        // Store all divisors for every number
        std::vector<std::vector<int>> divisors(m + 1);

        // Build divisor lists using sieve idea
        for (int d = 1; d <= m; d++) {
            for (int multiple = d; multiple <= m; multiple += d) {
                divisors[multiple].push_back(d);
            }
        }

        // dp[len][value] = number of valid arrays
        std::vector<std::vector<long long>> dp(n + 1,
                                               std::vector<long long>(m + 1, 0));

        // Every value can start a sequence
        for (int v = 1; v <= m; v++)
            dp[1][v] = 1;

        // Build DP
        for (int len = 2; len <= n; len++) {
            for (int v = 1; v <= m; v++) {

                // Previous value is a divisor of v
                for (int d : divisors[v]) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][d]) % MOD;
                }

                // Previous value is a multiple of v
                for (int mult = v; mult <= m; mult += v) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][mult]) % MOD;
                }

                // v was counted twice
                dp[len][v] = (dp[len][v] - dp[len - 1][v] + MOD) % MOD;
            }
        }

        // Sum all sequences ending with any value
        long long ans = 0;
        for (int v = 1; v <= m; v++) {
            ans = (ans + dp[n][v]) % MOD;
        }

        return (int)ans;
    }
};
```

### Java

```java
class Solution {
    public int count(int n, int m) {
        final int MOD = 1000000007;

        // Store divisors for every number
        java.util.ArrayList<Integer>[] divisors = new java.util.ArrayList[m + 1];
        for (int i = 0; i <= m; i++) {
            divisors[i] = new java.util.ArrayList<>();
        }

        // Precompute divisors
        for (int d = 1; d <= m; d++) {
            for (int multiple = d; multiple <= m; multiple += d) {
                divisors[multiple].add(d);
            }
        }

        // DP table
        long[][] dp = new long[n + 1][m + 1];

        // Base case
        for (int v = 1; v <= m; v++) {
            dp[1][v] = 1;
        }

        // Fill DP
        for (int len = 2; len <= n; len++) {
            for (int v = 1; v <= m; v++) {

                // Add all divisors
                for (int d : divisors[v]) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][d]) % MOD;
                }

                // Add all multiples
                for (int mult = v; mult <= m; mult += v) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][mult]) % MOD;
                }

                // Remove duplicate count
                dp[len][v] = (dp[len][v] - dp[len - 1][v] + MOD) % MOD;
            }
        }

        long ans = 0;

        // Sum final answers
        for (int v = 1; v <= m; v++) {
            ans = (ans + dp[n][v]) % MOD;
        }

        return (int) ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */

class Solution {
    count(n, m) {
        const MOD = 1000000007;

        // Store divisors for every value
        const divisors = Array.from({ length: m + 1 }, () => []);

        // Precompute divisor lists
        for (let d = 1; d <= m; d++) {
            for (let multiple = d; multiple <= m; multiple += d) {
                divisors[multiple].push(d);
            }
        }

        // DP table
        const dp = Array.from({ length: n + 1 }, () =>
            Array(m + 1).fill(0)
        );

        // Base case
        for (let v = 1; v <= m; v++) {
            dp[1][v] = 1;
        }

        // Build DP
        for (let len = 2; len <= n; len++) {
            for (let v = 1; v <= m; v++) {

                // Add all divisors
                for (const d of divisors[v]) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][d]) % MOD;
                }

                // Add all multiples
                for (let mult = v; mult <= m; mult += v) {
                    dp[len][v] = (dp[len][v] + dp[len - 1][mult]) % MOD;
                }

                // Remove duplicate count
                dp[len][v] =
                    (dp[len][v] - dp[len - 1][v] + MOD) % MOD;
            }
        }

        let ans = 0;

        // Sum every ending value
        for (let v = 1; v <= m; v++) {
            ans = (ans + dp[n][v]) % MOD;
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def count(self, n: int, m: int) -> int:
        MOD = 1000000007

        # Store divisors for every number
        divisors = [[] for _ in range(m + 1)]

        # Precompute divisor lists
        for d in range(1, m + 1):
            for multiple in range(d, m + 1, d):
                divisors[multiple].append(d)

        # DP table
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        # Base case
        for v in range(1, m + 1):
            dp[1][v] = 1

        # Fill DP
        for length in range(2, n + 1):
            for v in range(1, m + 1):

                # Previous value is a divisor
                for d in divisors[v]:
                    dp[length][v] = (dp[length][v] + dp[length - 1][d]) % MOD

                # Previous value is a multiple
                for mult in range(v, m + 1, v):
                    dp[length][v] = (dp[length][v] + dp[length - 1][mult]) % MOD

                # Remove duplicate contribution
                dp[length][v] = (dp[length][v] - dp[length - 1][v]) % MOD

        # Sum all possible ending values
        return sum(dp[n][1:]) % MOD
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall algorithm is exactly the same in every language. Only the syntax changes.

First, a divisor list is created.

Instead of checking whether one number divides another during every DP transition, all divisors are computed once at the beginning. This preprocessing saves a large amount of repeated work.

Next, the Dynamic Programming table is initialized.

Each state represents the number of valid sequences of a particular length ending with a specific value.

For sequences of length `1`, every number between `1` and `m` is already a valid sequence.

Then the algorithm starts building longer sequences.

For every sequence length and every ending value:

- Add contributions from every divisor.
- Add contributions from every multiple.
- Subtract one duplicate contribution because the current number belongs to both groups.

Each transition represents extending an already valid sequence by one more number.

Finally, every sequence of length `n` ends with some value between `1` and `m`.

Adding all of these DP states together gives the total number of valid arrays.

The C++, Java, JavaScript, and Python implementations all follow this exact logic. The only differences are language syntax, container types, and iteration style.

---

## Examples

### Example 1

**Input**

```text
n = 3
m = 3
```

**Output**

```text
17
```

**Trace**

- Build all sequences of length `1`.
- Extend them using valid divisibility pairs.
- Continue until length `3`.
- The total number of valid sequences is `17`.

---

### Example 2

**Input**

```text
n = 1
m = 10
```

**Output**

```text
10
```

**Trace**

Since the array contains only one element, every value from `1` to `10` is valid.

---

### Example 3

**Input**

```text
n = 2
m = 2
```

**Output**

```text
4
```

**Trace**

The valid arrays are:

```text
[1,1]
[1,2]
[2,1]
[2,2]
```

All adjacent pairs satisfy the divisibility condition.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run with Node.js:

```bash
node solution.js
```

---

### Python3

Run:

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- Dynamic Programming is the most natural solution because every state depends only on the previous element.
- Precomputing divisors avoids repeated factorization and improves performance.
- Iterating through multiples is simpler than checking every possible value.
- The duplicate contribution must be removed because every number is both its own divisor and its own multiple.
- Always perform modulo operations during DP updates to prevent integer overflow.
- This approach scales much better than generating every possible array, whose complexity would be exponential.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
