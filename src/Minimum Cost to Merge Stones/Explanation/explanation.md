# Minimum Cost to Merge Stones

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given an array `stones[]` where the `i`th element represents the number of stones in the `i`th pile. In one move, you can **merge exactly `k` consecutive piles** into **one** pile, and the cost of this move is equal to the **total number of stones** in those `k` piles.

Determine the **minimum total cost** required to merge all the piles into one single pile. If it is not possible to merge all piles into one according to the rules, return `-1`.

---

## Constraints

* `1 ≤ stones.size() ≤ 30`
* `2 ≤ k ≤ 30`
* `1 ≤ stones[i] ≤ 100`

Important feasibility condition:

* Each merge reduces the number of piles by `k-1`. To reach exactly 1 pile from `n` piles, `(n - 1)` must be divisible by `(k - 1)`. If not, merging to a single pile is impossible.

---

## Intuition

I thought about how merges change the number of piles: every time I merge `k` piles into one, the number of piles decreases by `k-1`. So to end with a single pile, `(n - 1)` must be divisible by `(k - 1)`. If that condition fails, it's impossible.

Then I realized the problem is an interval dynamic programming problem: compute the minimum cost to merge each subarray `stones[i..j]` into valid pile counts, and when an interval can be reduced to `1` pile, add the sum of that interval as the final merge cost.

---

## Approach

1. Check feasibility: if `(n - 1) % (k - 1) != 0` return `-1`.
2. Build prefix sums to get interval sums in `O(1)`.
3. Use a DP table `dp[i][j]` for the minimum cost to merge interval `i..j` into the fewest possible piles (consistent with rules).
4. Initialize `dp[i][i] = 0` for all `i`.
5. Fill `dp` for increasing interval lengths `len = 2..n`:

   * For each `i`, `j = i + len - 1`:

     * Try splitting the interval into `[i..m]` and `[m+1..j]` and take `min(dp[i][m] + dp[m+1][j])`. To reduce unnecessary splits, step `m` by `k-1` because only those splits can lead to valid pile counts.
     * If `(len - 1) % (k - 1) == 0`, we can merge the interval into one pile and must add the sum of the interval to `dp[i][j]`.
6. Return `dp[0][n-1]`.

This is an interval DP (bottom-up) with prefix sums.

---

## Data Structures Used

* **2D array** `dp[n][n]` — stores minimum costs for subarrays.
* **1D array** `pref[n+1]` — prefix sums to compute interval sums quickly.
* Integer and long long (or language-equivalent) for costs.

---

## Operations & Behavior Summary

* **Feasibility check**: `(n - 1) % (k - 1) == 0`
  If false → return `-1`.
* **Merge operation**: merging `k` consecutive piles costs the sum of their stones.
* **DP state transition**: combine two optimal subproblems and add interval sum if the interval can be reduced to 1 pile.
* **Split stepping**: only try split indices `m` that differ by multiples of `(k - 1)` — this prunes impossible intermediate pile counts.

---

## Complexity

* **Time Complexity:** `O(n^3)` worst-case, where `n = stones.length`.
  Explanation: loops over interval length (`O(n)`), start index (`O(n)`), and splits (`O(n)`) → `O(n^3)`. Using the `k-1` step on splits reduces the constant factor.
* **Space Complexity:** `O(n^2)` for `dp`, plus `O(n)` for prefix sums.

---

## Multi-language Solutions

Below are full implementations in four languages. Each follows the same DP approach described above.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int mergeStones(vector<int> &stones, int k) {
        int n = stones.size();
        if ((n - 1) % (k - 1) != 0) return -1;

        vector<int> pref(n + 1, 0);
        for (int i = 0; i < n; ++i) pref[i + 1] = pref[i] + stones[i];
        auto rangeSum = [&](int i, int j) { return pref[j + 1] - pref[i]; };

        const long long INF = 1e15;
        vector<vector<long long>> dp(n, vector<long long>(n, 0));

        for (int len = 2; len <= n; ++len) {
            for (int i = 0; i + len - 1 < n; ++i) {
                int j = i + len - 1;
                dp[i][j] = INF;
                // try splits stepping by k-1
                for (int m = i; m < j; m += (k - 1)) {
                    dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j]);
                }
                // if we can merge into 1 pile, add sum
                if ((len - 1) % (k - 1) == 0) dp[i][j] += rangeSum(i, j);
            }
        }
        return (int)dp[0][n - 1];
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public static int mergeStones(int[] stones, int k) {
        int n = stones.length;
        if ((n - 1) % (k - 1) != 0) return -1;

        int[] pref = new int[n + 1];
        for (int i = 0; i < n; ++i) pref[i + 1] = pref[i] + stones[i];

        final long INF = (long)1e15;
        long[][] dp = new long[n][n];

        for (int len = 2; len <= n; ++len) {
            for (int i = 0; i + len - 1 < n; ++i) {
                int j = i + len - 1;
                dp[i][j] = INF;
                for (int m = i; m < j; m += (k - 1)) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);
                }
                if ((len - 1) % (k - 1) == 0) dp[i][j] += pref[j + 1] - pref[i];
            }
        }
        return (int)dp[0][n - 1];
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} stones
 * @param {number} k
 * @return {number}
 */
class Solution {
    mergeStones(stones, k) {
        const n = stones.length;
        if ((n - 1) % (k - 1) !== 0) return -1;

        const pref = new Array(n + 1).fill(0);
        for (let i = 0; i < n; ++i) pref[i + 1] = pref[i] + stones[i];
        const rangeSum = (i, j) => pref[j + 1] - pref[i];

        const INF = 1e15;
        const dp = Array.from({ length: n }, () => new Array(n).fill(0));

        for (let len = 2; len <= n; ++len) {
            for (let i = 0; i + len - 1 < n; ++i) {
                const j = i + len - 1;
                dp[i][j] = INF;
                for (let m = i; m < j; m += (k - 1)) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m + 1][j]);
                }
                if ((len - 1) % (k - 1) === 0) dp[i][j] += rangeSum(i, j);
            }
        }
        return dp[0][n - 1];
    }
}
```

### Python3

```python
class Solution:
    def mergeStones(self, stones, k):
        n = len(stones)
        if (n - 1) % (k - 1) != 0:
            return -1

        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] + stones[i]
        def range_sum(i, j):
            return pref[j + 1] - pref[i]

        INF = 10**15
        dp = [[0] * n for _ in range(n)]

        for length in range(2, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                dp[i][j] = INF
                m = i
                while m < j:
                    dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j])
                    m += (k - 1)
                if (length - 1) % (k - 1) == 0:
                    dp[i][j] += range_sum(i, j)
        return dp[0][n - 1]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the logic in a step-by-step manner using the Python implementation for clarity. The same steps apply to other languages (only syntax differs).

1. **Feasibility Check**

   ```python
   if (n - 1) % (k - 1) != 0:
       return -1
   ```

   * I check whether it is possible to reduce `n` piles into 1 pile. Each merge reduces piles by `k-1`, so `(n-1)` must be divisible by `(k-1)`. If not, we cannot get to one pile.

2. **Compute Prefix Sums**

   ```python
   pref = [0] * (n + 1)
   for i in range(n):
       pref[i + 1] = pref[i] + stones[i]
   ```

   * I build `pref` where `pref[t]` is sum of first `t` stones. Then `range_sum(i, j)` = `pref[j+1] - pref[i]`.

3. **Initialize DP Table**

   ```python
   dp = [[0] * n for _ in range(n)]
   ```

   * `dp[i][j]` = minimum cost to merge `stones[i..j]` into as few piles as allowed. For single element intervals cost is zero.

4. **Iterate Over Interval Lengths**

   ```python
   for length in range(2, n + 1):
       for i in range(0, n - length + 1):
           j = i + length - 1
           dp[i][j] = INF
           ...
   ```

   * We compute solutions for all intervals from small to large so when we compute a bigger interval all subintervals are already solved.

5. **Try Valid Splits**

   ```python
   m = i
   while m < j:
       dp[i][j] = min(dp[i][j], dp[i][m] + dp[m + 1][j])
       m += (k - 1)
   ```

   * We split the interval into `[i..m]` and `[m+1..j]`. Only splitting positions `m` with step `k-1` are considered because only those splits keep intermediate pile counts valid. This is the critical pruning step.

6. **Add Final Merge Cost When Possible**

   ```python
   if (length - 1) % (k - 1) == 0:
       dp[i][j] += range_sum(i, j)
   ```

   * If the interval length allows being merged into a single pile (i.e., `(len - 1)` divisible by `(k - 1)`), we add the total sum of the interval for the final merge.

7. **Return the Answer**

   ```python
   return dp[0][n - 1]
   ```

   * The minimal cost to merge the whole array is stored in `dp[0][n-1]`. If initial check failed, we returned `-1`.

---

## Examples

**Example 1**

```
Input: stones = [1, 2, 3], k = 2
Output: 9
Explanation:
Merge 1 and 2 -> cost = 3, array becomes [3,3]
Merge 3 and 3 -> cost = 6, array becomes [6]
Total = 3 + 6 = 9
```

**Example 2**

```
Input: stones = [1,5,3,2,4], k = 2
Output: 35
Explanation (one optimal way shown in prompt):
Total cost = 6 + 5 + 9 + 15 = 35
```

**Example 3**

```
Input: stones = [1,5,3,2,4], k = 4
Output: -1
Explanation: Impossible to get one pile with merges of 4 piles at a time.
```

---

## How to use / Run locally

### Python

1. Save the Python code to `solution.py`.
2. Create a small wrapper to call the method:

```python
if __name__ == "__main__":
    stones = [1,2,3]
    k = 2
    print(Solution().mergeStones(stones, k))
```

3. Run:

```bash
python3 solution.py
```

### C++

1. Save code in `solution.cpp`. Add a `main()` to read input or hardcode tests.
2. Compile:

```bash
g++ -std=c++17 solution.cpp -O2 -o solution
```

3. Run:

```bash
./solution
```

### Java

1. Save code in `Solution.java` (wrap into a class with a `main` if needed).
2. Compile:

```bash
javac Solution.java
```

3. Run:

```bash
java Solution
```

### JavaScript (Node.js)

1. Save code in `solution.js`. Add invocation code to create `Solution()` instance and call `mergeStones`.
2. Run:

```bash
node solution.js
```

---

## Notes & Optimizations

* The main optimization is **splitting with step `k-1`**. This ensures we only try splits that preserve valid pile counts in subintervals.
* For `n ≤ 30`, `O(n^3)` is acceptable. For larger `n`, this approach may be too slow.
* We used `long long` / big integer equivalent to avoid overflow of running costs (`INF` large).
* If you need to reconstruct the actual sequence of merges, store split choices in an auxiliary table during DP.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
