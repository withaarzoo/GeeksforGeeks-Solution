# Subsets with Products of Distinct Primes

An optimized Dynamic Programming and Bitmask solution for the GeeksforGeeks problem **Subsets with Products of Distinct Primes**. This repository explains the intuition, approach, complexity analysis, and provides implementations in multiple programming languages. The solution is designed to run efficiently within the given constraints while remaining beginner-friendly and easy to understand.

---

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

In this problem, we are given an integer array where every element is between `1` and `30`.

Our goal is to count how many different subsets have a product that can be written as the multiplication of one or more **distinct prime numbers**.

A product is considered valid only if:

- Every prime factor appears exactly once.
- No prime is repeated in the final product.
- Different subsets are counted separately if they use different array indices, even when the values are the same.

Since the answer can become very large, we return it modulo `10^9 + 7`.

This problem is a good example of combining **Dynamic Programming**, **Bitmasking**, and **Prime Factorization** to solve a counting problem efficiently.

---

## Constraints

| Constraint | Value |
| ------------ | ------- |
| `1 ≤ arr.size() ≤ 10^5` | Array size |
| `1 ≤ arr[i] ≤ 30` | Value of each element |
| Answer | Modulo `10^9 + 7` |

---

## Intuition

The first thing I noticed was that every valid product must contain only distinct prime factors.

That immediately tells me that numbers like `4`, `8`, `12`, `18`, and similar values can never be part of any valid subset because they already contain repeated prime factors.

Since every array value is at most `30`, there are only ten prime numbers that matter.

```
2, 3, 5, 7, 11, 13, 17, 19, 23, 29
```

Instead of remembering which numbers I have selected, I only need to remember which prime factors have already been used.

A bitmask is perfect for this because each bit can represent one prime.

Once I realized this, the problem naturally became a Bitmask Dynamic Programming problem.

---

## Approach

I solve the problem in the following order.

1. Store the ten prime numbers up to `30`.

2. Precompute the prime factor mask for every number from `2` to `30`.

3. If a number contains any repeated prime factor, mark it as invalid.

4. Count all occurrences of `1` separately because `1` never changes the product.

5. Create a DP array where every index represents a unique combination of used prime factors.

6. Process each valid array element one by one.

7. Only combine two masks when they have no common prime factors.

8. After processing every number, sum all valid DP states.

9. Remove the empty subset.

10. Multiply the answer by `2^(number of ones)` because every `1` can either be included or skipped independently.

---

## Data Structures Used

| Data Structure | Purpose |
| --------------- | --------- |
| Array | Stores the prime masks for every number from `1` to `30` |
| Dynamic Programming Array | Counts how many subsets produce each prime mask |
| Bitmask | Represents which prime numbers are already present in the current product |
| Prime List | Stores all prime numbers up to `30` |

---

## Operations & Behavior Summary

The algorithm performs the following major operations.

- Precompute the prime factor mask for every possible number.
- Ignore numbers containing repeated prime factors.
- Count occurrences of `1` separately.
- Initialize the DP array.
- Process every valid number exactly once.
- Merge masks only when no prime overlaps.
- Update the DP table.
- Sum every valid DP state.
- Remove the empty subset.
- Multiply the answer by all possible choices of `1`.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | `O(n × 2^10)` | `n` is the size of the array. There are only `1024` possible prime masks. |
| Space Complexity | `O(2^10)` | A DP array of size `1024` is used along with a few small helper arrays. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int countSubsets(vector<int> &arr) {
        const int MOD = 1000000007;

        // All prime numbers up to 30
        vector<int> primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};

        // mask[x] stores the prime factor mask of x
        // -1 means x contains a repeated prime factor and is invalid
        vector<int> mask(31, 0);

        // Precompute mask for every value from 2 to 30
        for (int x = 2; x <= 30; x++) {
            int cur = x;
            int bits = 0;
            bool ok = true;

            for (int i = 0; i < 10; i++) {
                int p = primes[i];

                // Count how many times this prime divides the number
                int cnt = 0;
                while (cur % p == 0) {
                    cur /= p;
                    cnt++;
                }

                // If a prime appears more than once,
                // this number can never be used
                if (cnt > 1) {
                    ok = false;
                    break;
                }

                // Store this prime in the mask
                if (cnt == 1)
                    bits |= (1 << i);
            }

            mask[x] = ok ? bits : -1;
        }

        // dp[mask] = number of ways to build this prime mask
        vector<long long> dp(1 << 10, 0);
        dp[0] = 1;

        int ones = 0;

        for (int x : arr) {

            // Count ones separately
            if (x == 1) {
                ones++;
                continue;
            }

            // Ignore numbers having repeated prime factors
            if (mask[x] == -1)
                continue;

            int curMask = mask[x];

            // Traverse backwards so one element is used only once
            for (int m = (1 << 10) - 1; m >= 0; m--) {

                // If both masks share any prime,
                // choosing both would repeat that prime
                if ((m & curMask) != 0)
                    continue;

                dp[m | curMask] = (dp[m | curMask] + dp[m]) % MOD;
            }
        }

        long long ans = 0;

        // Sum every valid state
        for (long long ways : dp)
            ans = (ans + ways) % MOD;

        // Remove the empty subset
        ans = (ans - 1 + MOD) % MOD;

        // Every 1 can either be taken or skipped
        long long mul = 1;
        while (ones--) {
            mul = (mul * 2) % MOD;
        }

        return (ans * mul) % MOD;
    }
};
```

### Java

```java
class Solution {
    public int countSubsets(int[] arr) {

        final int MOD = 1000000007;

        // All prime numbers up to 30
        int[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};

        // mask[x] stores the prime factor mask
        // -1 means invalid number
        int[] mask = new int[31];

        // Precompute masks
        for (int x = 2; x <= 30; x++) {

            int cur = x;
            int bits = 0;
            boolean ok = true;

            for (int i = 0; i < 10; i++) {

                int p = primes[i];
                int cnt = 0;

                // Count occurrences of this prime
                while (cur % p == 0) {
                    cur /= p;
                    cnt++;
                }

                // Repeated prime makes the number invalid
                if (cnt > 1) {
                    ok = false;
                    break;
                }

                // Add this prime to the mask
                if (cnt == 1)
                    bits |= (1 << i);
            }

            mask[x] = ok ? bits : -1;
        }

        // DP over all masks
        long[] dp = new long[1 << 10];
        dp[0] = 1;

        int ones = 0;

        for (int x : arr) {

            // Count ones separately
            if (x == 1) {
                ones++;
                continue;
            }

            // Skip invalid numbers
            if (mask[x] == -1)
                continue;

            int curMask = mask[x];

            // Traverse backwards to avoid reusing the same element
            for (int m = (1 << 10) - 1; m >= 0; m--) {

                // Shared prime means invalid selection
                if ((m & curMask) != 0)
                    continue;

                dp[m | curMask] = (dp[m | curMask] + dp[m]) % MOD;
            }
        }

        long ans = 0;

        // Sum all states
        for (long v : dp)
            ans = (ans + v) % MOD;

        // Remove empty subset
        ans = (ans - 1 + MOD) % MOD;

        // Multiply by 2^ones
        long mul = 1;
        while (ones-- > 0)
            mul = (mul * 2) % MOD;

        return (int) ((ans * mul) % MOD);
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    countSubsets(arr) {

        const MOD = 1000000007n;

        // All prime numbers up to 30
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

        // mask[x] stores the prime mask
        // -1 means invalid number
        const mask = new Array(31).fill(0);

        // Precompute masks
        for (let x = 2; x <= 30; x++) {

            let cur = x;
            let bits = 0;
            let ok = true;

            for (let i = 0; i < 10; i++) {

                let cnt = 0;

                // Count occurrences of each prime
                while (cur % primes[i] === 0) {
                    cur /= primes[i];
                    cnt++;
                }

                // Repeated prime makes it invalid
                if (cnt > 1) {
                    ok = false;
                    break;
                }

                // Store this prime in the mask
                if (cnt === 1)
                    bits |= (1 << i);
            }

            mask[x] = ok ? bits : -1;
        }

        // DP over masks
        const dp = new Array(1 << 10).fill(0n);
        dp[0] = 1n;

        let ones = 0;

        for (const x of arr) {

            // Count ones separately
            if (x === 1) {
                ones++;
                continue;
            }

            // Ignore invalid numbers
            if (mask[x] === -1)
                continue;

            const curMask = mask[x];

            // Traverse backwards
            for (let m = (1 << 10) - 1; m >= 0; m--) {

                // Cannot repeat any prime
                if ((m & curMask) !== 0)
                    continue;

                dp[m | curMask] = (dp[m | curMask] + dp[m]) % MOD;
            }
        }

        let ans = 0n;

        // Sum every state
        for (const v of dp)
            ans = (ans + v) % MOD;

        // Remove empty subset
        ans = (ans - 1n + MOD) % MOD;

        // Multiply by 2^ones
        let mul = 1n;
        while (ones--)
            mul = (mul * 2n) % MOD;

        return Number((ans * mul) % MOD);
    }
}
```

### Python3

```python
class Solution:
    def countSubsets(self, arr):
        MOD = 1000000007

        # All prime numbers up to 30
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

        # mask[x] stores the prime factor mask
        # -1 means the number has repeated prime factors
        mask = [0] * 31

        # Precompute masks
        for x in range(2, 31):
            cur = x
            bits = 0
            ok = True

            for i, p in enumerate(primes):

                cnt = 0

                # Count how many times this prime divides the number
                while cur % p == 0:
                    cur //= p
                    cnt += 1

                # Repeated prime makes the number invalid
                if cnt > 1:
                    ok = False
                    break

                # Add this prime to the mask
                if cnt == 1:
                    bits |= (1 << i)

            mask[x] = bits if ok else -1

        # DP over all masks
        dp = [0] * (1 << 10)
        dp[0] = 1

        ones = 0

        for x in arr:

            # Count ones separately
            if x == 1:
                ones += 1
                continue

            # Ignore invalid numbers
            if mask[x] == -1:
                continue

            cur_mask = mask[x]

            # Traverse backwards so each element is used once
            for m in range((1 << 10) - 1, -1, -1):

                # Shared prime means repeated prime in product
                if m & cur_mask:
                    continue

                dp[m | cur_mask] = (dp[m | cur_mask] + dp[m]) % MOD

        # Sum every valid state
        ans = (sum(dp) - 1) % MOD

        # Every 1 can be chosen or skipped
        ans = (ans * pow(2, ones, MOD)) % MOD

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall algorithm remains exactly the same in every programming language. Only the syntax changes.

### Step 1

Store the ten prime numbers that can appear in the factorization of any value from `1` to `30`.

These primes are used to build the bitmask representation.

---

### Step 2

Precompute the prime factor mask for every number.

While factorizing a number, count how many times each prime divides it.

If any prime divides the number more than once, mark that number as invalid because it already contains repeated prime factors.

Otherwise, set the corresponding bit in the mask.

For example,

| Number | Prime Mask |
| -------- | ------------ |
| 2 | 0000000001 |
| 3 | 0000000010 |
| 6 | 0000000011 |
| 10 | 0000000101 |
| 30 | 0000000111 |

---

### Step 3

Count how many times the value `1` appears.

The number `1` never changes the product, so it can be handled separately after the DP finishes.

---

### Step 4

Create a Dynamic Programming array.

Each DP state represents one unique set of prime factors already used.

Initially,

```
dp[0] = 1
```

This means there is exactly one way to choose nothing.

---

### Step 5

Process every valid number from the array.

Before combining it with an existing subset, check whether both masks share any common prime.

```
(mask & currentMask) == 0
```

If this condition is true, both subsets can be merged safely.

Otherwise, that combination would repeat a prime factor, so it must be skipped.

---

### Step 6

Update the DP array from right to left.

This is the standard 0/1 Knapsack style update.

Traversing backwards guarantees that every array element is used at most once during the current iteration.

---

### Step 7

After processing every element, add together all DP states.

Subtract one because the empty subset is also counted.

---

### Step 8

Finally, multiply the answer by

```
2^(count of ones)
```

Every occurrence of `1` doubles the number of valid subsets because it may be selected or skipped without changing the product.

---

## Examples

### Example 1

**Input**

```
arr = [1, 2, 3, 4]
```

**Output**

```
6
```

**Trace**

- Ignore `4` because it contains repeated prime factors.
- Valid numbers are `2` and `3`.
- Build all valid subsets.
- Finally include or exclude the single `1`.
- Total valid subsets = `6`.

---

### Example 2

**Input**

```
arr = [2, 2, 3]
```

**Output**

```
5
```

**Trace**

Each `2` comes from a different index, so both are treated as separate choices.

Valid subsets are:

```
[2]
[2]
[3]
[2,3]
[2,3]
```

Answer = `5`.

---

### Example 3

**Input**

```
arr = [4, 8, 9]
```

**Output**

```
0
```

**Trace**

Every number contains repeated prime factors.

No valid subset exists.

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run using Node.js

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- Numbers containing repeated prime factors are ignored immediately.
- The DP contains only `1024` states because there are only ten prime numbers up to `30`.
- Backward DP traversal prevents using the same array element multiple times.
- The value `1` is processed separately, making the transition logic much simpler.
- Bitmasking keeps both memory usage and execution time very small.
- This is the standard optimized solution for this GeeksforGeeks Dynamic Programming and Bitmask problem.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
