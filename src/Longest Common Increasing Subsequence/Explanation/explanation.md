# Longest Common Increasing Subsequence (LCIS)

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
* [Step-by-step Detailed Explanation (line-by-line)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given two integer arrays `a[]` and `b[]`, find the **length** of the **Longest Common Increasing Subsequence (LCIS)**. LCIS is a subsequence that is present in **both arrays** and is **strictly increasing**.

Example:

* Input: `a = [3, 4, 9, 1]`, `b = [5, 3, 8, 9, 10, 2, 1]`
  Output: `2`
  Explanation: The LCIS is `[3, 9]` (length = 2).

---

## Constraints

* `1 ≤ a.size(), b.size() ≤ 10^3`
* `1 ≤ a[i], b[i] ≤ 10^4`
* Expected complexity hint: Time O(n * m), Aux space O(m)

---

## Intuition

I thought about how to track a subsequence that must be both common and strictly increasing. Instead of trying to build entire subsequences explicitly, I decided to track the **best length of LCIS that ends exactly at each element of `b`**. So I maintain an array `dp` where `dp[j]` = length of LCIS that ends with `b[j]`.
For each `a[i]`, I scan through `b` keeping a running best (`current`) of `dp[j]` values for `b[j] < a[i]`. If I find `a[i] == b[j]`, I can extend `current` by 1 to possibly update `dp[j]`. This yields a clear O(n*m) DP approach using only O(m) extra space.

---

## Approach

1. Initialize `dp` array of size `m = len(b)` with zeros. `dp[j]` represents LCIS length ending at `b[j]`.
2. For each `a[i]`:

   * Set `current = 0`. `current` holds the maximum `dp[j]` seen so far for `b[j] < a[i]`.
   * Iterate `j` from `0` to `m-1`:

     * If `a[i] == b[j]`: `dp[j] = max(dp[j], current + 1)` — we can extend a best prefix (values < `a[i]`) by this equal value.
     * Else if `a[i] > b[j]`: `current = max(current, dp[j])` — `b[j]` can be a prefix for future matches equal to `a[i]`.
     * Else (`a[i] < b[j]`): do nothing.
3. Answer is `max(dp)` after processing all `a[i]`.

This is straightforward and memory-efficient (only `dp` of size `m`).

---

## Data Structures Used

* 1D array `dp` of length `m` (where `m = len(b)`) to store LCIS lengths that end at each index of array `b`.
* A few scalar variables: `current`, loop indices.

---

## Operations & Behavior Summary

* Outer loop: iterate over all elements of `a` — `n` iterations.
* Inner loop: iterate over all elements of `b` — `m` iterations.
* Updates to `dp[j]` happen only when `a[i] == b[j]`.
* `current` accumulates the best prefix LCIS length for `b[j] < a[i]`.
* Final answer is the maximum value in `dp`.

---

## Complexity

* **Time Complexity:** `O(n * m)` where `n = len(a)` and `m = len(b)`. For every `a[i]` we scan `b`.
* **Space Complexity:** `O(m)` for the `dp` array. Constant extra space besides `dp`.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int LCIS(vector<int> &a, vector<int> &b) {
        int n = a.size(), m = b.size();
        if (n == 0 || m == 0) return 0;

        vector<int> dp(m, 0); // dp[j] = LCIS length ending at b[j]

        for (int i = 0; i < n; ++i) {
            int current = 0; // best LCIS length for values < a[i]
            for (int j = 0; j < m; ++j) {
                if (a[i] == b[j]) {
                    dp[j] = max(dp[j], current + 1);
                } else if (a[i] > b[j]) {
                    current = max(current, dp[j]);
                }
            }
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

### Java

```java
class Solution {
    public int LCIS(int[] a, int[] b) {
        int n = a.length, m = b.length;
        if (n == 0 || m == 0) return 0;

        int[] dp = new int[m]; // dp[j] = LCIS length ending at b[j]

        for (int i = 0; i < n; ++i) {
            int current = 0;
            for (int j = 0; j < m; ++j) {
                if (a[i] == b[j]) {
                    dp[j] = Math.max(dp[j], current + 1);
                } else if (a[i] > b[j]) {
                    current = Math.max(current, dp[j]);
                }
            }
        }

        int ans = 0;
        for (int x : dp) ans = Math.max(ans, x);
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number}
 */
class Solution {
    LCIS(a, b) {
        const n = a.length, m = b.length;
        if (n === 0 || m === 0) return 0;

        const dp = new Array(m).fill(0);

        for (let i = 0; i < n; ++i) {
            let current = 0;
            for (let j = 0; j < m; ++j) {
                if (a[i] === b[j]) {
                    dp[j] = Math.max(dp[j], current + 1);
                } else if (a[i] > b[j]) {
                    current = Math.max(current, dp[j]);
                }
            }
        }

        return Math.max(...dp);
    }
}
```

### Python3

```python
class Solution:
    def LCIS(self, a, b):
        n, m = len(a), len(b)
        if n == 0 or m == 0:
            return 0

        dp = [0] * m  # dp[j] = LCIS length ending at b[j]

        for i in range(n):
            current = 0
            for j in range(m):
                if a[i] == b[j]:
                    dp[j] = max(dp[j], current + 1)
                elif a[i] > b[j]:
                    current = max(current, dp[j])
        return max(dp) if dp else 0
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll walk through the Python version line-by-line (the other languages mirror the same logic).

```python
class Solution:
    def LCIS(self, a, b):
        n, m = len(a), len(b)
        if n == 0 or m == 0:
            return 0
```

* I read lengths `n` and `m`. If either array is empty, there's no common subsequence, so return 0.

```python
        dp = [0] * m  # dp[j] = LCIS length ending at b[j]
```

* I initialize `dp` array with zeros. `dp[j]` will keep the best LCIS length that ends exactly at `b[j]`.

```python
        for i in range(n):
            current = 0
            for j in range(m):
```

* For each element `a[i]`, I reset `current` to 0. `current` tracks the best dp value we have seen for `b[k] < a[i]`.
* Then I scan all `b[j]`.

```python
                if a[i] == b[j]:
                    dp[j] = max(dp[j], current + 1)
```

* When `a[i] == b[j]`, I can extend any LCIS that ended with a value smaller than `a[i]`. The best such length is `current`, so potential new length is `current + 1`. I update `dp[j]` if this is better.

```python
                elif a[i] > b[j]:
                    current = max(current, dp[j])
```

* If `a[i] > b[j]`, then `b[j]` is a valid prefix candidate for later equal values. I update `current` to be the largest `dp[j]` among those `b[j]` values smaller than `a[i]`.

* If `a[i] < b[j]`, I do nothing — `b[j]` cannot be a prefix for `a[i]` because it would break increasing property.

```python
        return max(dp) if dp else 0
```

* The result is the maximum value in `dp`, which is the length of the longest common increasing subsequence.

**Note:** The C++, Java, and JavaScript implementations follow the same structure: `dp` array, nested loops, `current` variable, and updates when `a[i] == b[j]` or `a[i] > b[j]`.

---

## Examples

1. **Example 1**

   * Input: `a = [3, 4, 9, 1]`, `b = [5, 3, 8, 9, 10, 2, 1]`
   * Output: `2` (LCIS: `[3, 9]`)

2. **Example 2**

   * Input: `a = [1, 1, 4, 3]`, `b = [1, 1, 3, 4]`
   * Output: `2` (One LCIS is `[1, 4]` or `[1, 3]`)

3. **Edge Cases**

   * If either array is empty → output `0`.
   * If no common elements → output `0`.
   * If arrays share one element → output `1`.

---

## How to use / Run locally

### C++

1. Save the C++ code to `LCIS.cpp` (wrap usage in `main()` or integrate into your judge harness).
2. Compile:

   ```
   g++ -std=c++17 -O2 LCIS.cpp -o LCIS
   ```

3. Run:

   ```
   ./LCIS
   ```

### Java

1. Save as `Solution.java` (include a `main` if you want to test manually).
2. Compile:

   ```
   javac Solution.java
   ```

3. Run:

   ```
   java Solution
   ```

### JavaScript (Node.js)

1. Save the class to `lcis.js`, add test harness at bottom:

   ```javascript
   const sol = new Solution();
   console.log(sol.LCIS([3,4,9,1],[5,3,8,9,10,2,1]));
   ```

2. Run:

   ```
   node lcis.js
   ```

### Python3

1. Save to `lcis.py`, add:

   ```python
   if __name__ == "__main__":
       sol = Solution()
       print(sol.LCIS([3,4,9,1], [5,3,8,9,10,2,1]))
   ```

2. Run:

   ```
   python3 lcis.py
   ```

---

## Notes & Optimizations

* This algorithm is optimal in the typical sense for LCIS: it runs in `O(n*m)` time and `O(m)` space and is simple to implement.
* There is **no known standard** `O((n+m) log something)` solution for LCIS because the requirement that the subsequence be common to both arrays prevents a straightforward application of the patience-sorting LIS trick.
* If you also need to **reconstruct the actual LCIS sequence** (not just length), you can store predecessor indices in an auxiliary array and reconstruct after finishing. That adds `O(m)` extra arrays (or paired arrays) and careful bookkeeping, still O(n*m) time.
* Be careful with duplicate values: algorithm handles duplicates correctly because we use `>` when updating `current` and compare `==` for extension. If you want strictly increasing subsequences, duplicates in arrays are treated correctly (we only extend from strictly smaller values).
* If arrays are small (≤ 1000), this solution is fast and fine. For very large inputs, you'll be limited by the `n*m` complexity.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
