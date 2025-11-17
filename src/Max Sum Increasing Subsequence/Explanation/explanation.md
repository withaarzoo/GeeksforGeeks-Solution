# Max Sum Increasing Subsequence

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

Given an array of **positive integers** `arr[]`, find the **maximum sum** of a subsequence such that the elements of the subsequence form a **strictly increasing** sequence.
Return the largest possible sum among all strictly increasing subsequences.

Example:
Input: `[1, 101, 2, 3, 100]` → Output: `106` (subsequence: `[1, 2, 3, 100]`)

---

## Constraints

* `1 ≤ arr.size() ≤ 10^3` (n ≤ 1000)
* `1 ≤ arr[i] ≤ 10^5`
* Elements are positive integers.
  These constraints make an O(n²) dynamic programming solution acceptable.

---

## Intuition

I thought about the problem like this: for every element at index `i`, the best strictly increasing subsequence **that ends at `i`** must include `arr[i]`. So the maximum sum ending at `i` equals `arr[i]` plus the best sum among subsequences ending at any earlier index `j` where `arr[j] < arr[i]`. I store that "best ending sum" for each index and then take the maximum across all indices.

---

## Approach

1. Create an array `dp` of size `n`, where `dp[i]` stores the maximum sum of a strictly increasing subsequence that **ends** at index `i`.
2. Initialize `dp[i] = arr[i]` for all `i` (the subsequence containing only `arr[i]`).
3. For each `i` from `0` to `n-1`, check all `j` from `0` to `i-1`. If `arr[j] < arr[i]`, we can append `arr[i]` to the subsequence ending at `j`. So update:
   `dp[i] = max(dp[i], dp[j] + arr[i])`.
4. Keep a running maximum answer `ans = max(ans, dp[i])` while processing.
5. Return `ans`.

This is straightforward dynamic programming with nested loops.

---

## Data Structures Used

* **Array / Vector** `dp[]` (size `n`) to store the maximum sum ending at each index.
* The input array `arr[]`.

No additional complex structures are required for the O(n²) solution.

---

## Operations & Behavior Summary

* Initialize `dp[i] = arr[i]` for all i.
* For each element `i`, scan left (previous indices) to find values `< arr[i]`.
* Update `dp[i]` by adding `arr[i]` to the best `dp[j]` where `arr[j] < arr[i]`.
* Maintain a global maximum `ans`.

This is a deterministic, in-place DP computation that completes after visiting each pair `(j, i)` with `j < i` once.

---

## Complexity

* **Time Complexity:** `O(n²)` — I check every pair `(j, i)` with `0 ≤ j < i < n`. Here `n` is the number of elements in `arr`. Given constraints `n ≤ 1000`, this is efficient enough.
* **Space Complexity:** `O(n)` — for the `dp` array. Apart from input storage, no extra memory is needed.

> Note: For larger `n` or if element values are large and frequent queries of "best sum for values < x" are needed, we can optimize to `O(n log M)` using a Fenwick Tree or Segment Tree on compressed values where `M` is the number of distinct values.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

/*
  Solution:
  dp[i] = maximum sum of a strictly increasing subsequence that ends at index i.
  Initialize dp[i] = arr[i]. For each i, try to extend all j < i with arr[j] < arr[i].
*/
class Solution {
  public:
    int maxSumIS(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return 0;

        vector<int> dp(n);
        int ans = 0;

        for (int i = 0; i < n; ++i) {
            dp[i] = arr[i]; // at least arr[i] itself
            for (int j = 0; j < i; ++j) {
                if (arr[j] < arr[i]) {
                    dp[i] = max(dp[i], dp[j] + arr[i]);
                }
            }
            ans = max(ans, dp[i]);
        }
        return ans;
    }
};

// Example usage (not part of the class; for manual testing):
// int main() {
//     Solution sol;
//     vector<int> arr = {1, 101, 2, 3, 100};
//     cout << sol.maxSumIS(arr) << "\n"; // prints 106
//     return 0;
// }
```

---

### Java

```java
/*
  Solution:
  dp[i] = maximum sum of a strictly increasing subsequence that ends at i.
  Initialize dp[i] = arr[i]. For each i, check j < i and arr[j] < arr[i] to extend.
*/
class Solution {
    public int maxSumIS(int arr[]) {
        int n = arr.length;
        if (n == 0) return 0;

        int[] dp = new int[n];
        int ans = 0;

        for (int i = 0; i < n; i++) {
            dp[i] = arr[i]; // subsequence with only arr[i]
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + arr[i]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}

// Example usage:
// public static void main(String[] args) {
//     Solution s = new Solution();
//     int[] arr = {1,101,2,3,100};
//     System.out.println(s.maxSumIS(arr)); // 106
// }
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 *
 * dp[i] stores max sum of strictly increasing subsequence ending at i.
 */
class Solution {
    maxSumIS(arr) {
        const n = arr.length;
        if (n === 0) return 0;

        const dp = new Array(n);
        let ans = 0;

        for (let i = 0; i < n; i++) {
            dp[i] = arr[i]; // at least arr[i]
            for (let j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + arr[i]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}

// Example usage:
// const sol = new Solution();
// console.log(sol.maxSumIS([1,101,2,3,100])); // 106
```

---

### Python3

```python
class Solution:
 def maxSumIS(self, arr):
  # arr: list[int]
  n = len(arr)
  if n == 0:
   return 0

  # dp[i] = max sum of strictly increasing subsequence ending at i
  dp = [0] * n
  ans = 0

  for i in range(n):
   dp[i] = arr[i]  # subsequence containing only arr[i]
   for j in range(i):
    if arr[j] < arr[i]:
     # extend subsequence at j by arr[i]
     if dp[j] + arr[i] > dp[i]:
      dp[i] = dp[j] + arr[i]
   if dp[i] > ans:
    ans = dp[i]
  return ans

# Example usage:
# s = Solution()
# print(s.maxSumIS([1,101,2,3,100]))  # 106
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the logic step by step; these steps apply to all language versions — the code differences are only syntax.

1. **Get the length `n` of the input array.**

   * If `n == 0`, return `0`, because there is no subsequence.

2. **Create `dp` array of length `n`.**

   * `dp[i]` will store the maximum sum of a strictly increasing subsequence that ends at index `i`.

3. **Initialize `dp[i] = arr[i]` for all `i`.**

   * The smallest increasing subsequence ending at `i` is the item itself, so `dp[i]` must be at least `arr[i]`.

4. **Double loop:** outer loop `i` from `0` to `n-1`, inner loop `j` from `0` to `i-1`.

   * For each pair `(j, i)` where `j < i`, if `arr[j] < arr[i]`, then we can append `arr[i]` to any strictly increasing subsequence ending at `j`.
   * So we compute candidate: `dp[j] + arr[i]`. If candidate > `dp[i]`, update `dp[i] = candidate`.

5. **Maintain `ans` as maximum of all `dp[i]`.**

   * After updating `dp[i]`, we set `ans = max(ans, dp[i])`.

6. **Return `ans`.**

   * This is the maximum sum among all strictly increasing subsequences.

**Why does this work?**
Because every strictly increasing subsequence ends at some index `i`. By computing the best sum that ends specifically at each `i` using previously computed results, we build up global optimal answers using optimal substructure. The `dp` table ensures we don't recompute those best-ending sums repeatedly.

---

## Examples

1. `arr = [1, 101, 2, 3, 100]`

   * `dp` progression → `[1, 101, 3, 6, 106]`
   * Answer: `106` (`[1,2,3,100]`)

2. `arr = [4, 1, 2, 3]`

   * Answer: `6` (`[1,2,3]`)

3. `arr = [4, 1, 2, 4]`

   * Answer: `7` (`[1,2,4]`)

---

## How to use / Run locally

### C++

1. Create a file `max_sum_is.cpp` and paste the C++ code (and example `main`) into it.
2. Compile and run:

```bash
g++ -std=c++17 max_sum_is.cpp -O2 -o max_sum_is
./max_sum_is
```

### Java

1. Create `Solution.java` with the Java class and a `main` method for testing.
2. Compile and run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Create `max_sum_is.js` with the JS code and example usage at the bottom.
2. Run with Node:

```bash
node max_sum_is.js
```

### Python3

1. Create `max_sum_is.py` and add the Python class and a small test:

```python
if __name__ == "__main__":
    s = Solution()
    print(s.maxSumIS([1,101,2,3,100]))
```

2. Run:

```bash
python3 max_sum_is.py
```

---

## Notes & Optimizations

* The provided solution is **simple**, **clear**, and optimal for `n ≤ 1000`.
* If `n` can be much larger (e.g., up to `10^5`), the O(n²) solution becomes too slow. Optimizations:

  * Use **coordinate compression** and a **Fenwick Tree (BIT)** or **Segment Tree** storing the best sum for values. For each `arr[i]`, query the maximum sum among values `< arr[i]` in `O(log M)` where `M` = number of distinct values. Then update the data structure with `value = dpValue` at `arr[i]`'s compressed index.
  * That yields `O(n log M)` time and `O(M)` extra space.
* For this problem (constraints given on GfG), the O(n²) approach is the best tradeoff between simplicity and performance.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
