# Maximum subarray sum 2

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

You are given an integer array `arr[]` of length `n` and two integers `a` and `b`. Find the maximum possible **sum** of a contiguous subarray whose length is **at least** `a` and **at most** `b`.

In other words, choose indices `l` and `r` (0-based) such that `a <= (r - l + 1) <= b`, and maximize `sum(arr[l..r])`.

---

## Constraints

* `1 <= n = arr.size() <= 10^5`
* `-10^5 <= arr[i] <= 10^5`
* `1 <= a <= b <= n`

> Sums can be as large as `n * 10^5`, so use 64-bit integers (`long long` / `long` / Python `int`).

---

## Intuition

I thought about how to compute any subarray sum quickly. If I build a prefix sums array `prefix[]` where `prefix[i]` is the sum of the first `i` elements, then the sum of `arr[l..r]` equals `prefix[r+1] - prefix[l]`.

Because the length must be between `a` and `b`, for a fixed right endpoint `r` (inclusive), the left endpoint `l` must lie in a range. So I can maximize `prefix[r+1] - prefix[l]` by subtracting the **minimum** prefix within that allowed range. That suggests maintaining a sliding-window minimum over the prefix array. A deque (monotonic queue) can keep this in `O(1)` amortized per operation.

---

## Approach

1. Build prefix sums `prefix[0..n]` where `prefix[0] = 0` and `prefix[i] = prefix[i-1] + arr[i-1]`.
2. For each right endpoint `r` from `0` to `n-1`, consider the exclusive prefix index `R = r + 1`.

   * Valid left prefix indices `L` satisfy `R - b <= L <= R - a` (also clip to `0..n`).
3. Maintain a deque of candidate prefix indices `L` whose prefix values are in non-decreasing order. The deque's front will be the index with the minimum prefix in the current window.
4. For every `R`:

   * Remove indices from the front that are `< R - b` (out of the window).
   * Add `R - a` (if >= 0) into the deque while maintaining the monotonic property (pop from back while `prefix[back] >= prefix[R-a]`).
   * If deque is not empty, candidate answer = `prefix[R] - prefix[deque.front()]`.
   * Update global maximum.

This results in an `O(n)` algorithm.

---

## Data Structures Used

* **Array / vector** for prefix sums (`O(n)` space).
* **Deque (double-ended queue)** to maintain indices of prefix sums in a sliding window while keeping them sorted by `prefix` value.

---

## Operations & Behavior Summary

* Build prefix sums in `O(n)`.
* For each `R` in `1..n`:

  * Slide the window bounds (`R-b` to `R-a`).
  * Maintain the deque so that it contains only indices inside the window and `prefix` values are increasing from front to back.
  * Compute `prefix[R] - prefix[deque.front()]` as the best subarray sum ending at index `R-1`.
* The deque ensures each index is pushed and popped at most once -> total `O(n)` deque operations.

---

## Complexity

* **Time Complexity:** `O(n)`, where `n` is the length of `arr`. Each prefix index is inserted and removed at most once into/from the deque.
* **Space Complexity:** `O(n)` for the prefix array and `O(b)` (<= `O(n)`) for the deque. Overall `O(n)` auxiliary space.

---

## Multi-language Solutions

Below are clean, optimized implementations in C++, Java, JavaScript, and Python3. Each is commented and uses 64-bit integers where appropriate.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Returns the maximum subarray sum for lengths in [a, b]
    long long maxSubarrSum(const vector<int>& arr, int a, int b) {
        int n = (int)arr.size();
        if (n == 0) return 0;

        // Build prefix sums: prefix[i] = sum of arr[0..i-1]
        vector<long long> prefix(n + 1, 0);
        for (int i = 1; i <= n; ++i) prefix[i] = prefix[i - 1] + (long long)arr[i - 1];

        deque<int> dq;               // stores indices of prefix in increasing prefix value order
        long long ans = LLONG_MIN;

        for (int R = 1; R <= n; ++R) {
            int leftBound = max(0, R - b);  // smallest allowed left prefix index
            int newIdx = R - a;             // index that becomes available at this R

            // remove indices that are out of the window [leftBound, R - a]
            while (!dq.empty() && dq.front() < leftBound) dq.pop_front();

            // if a new index becomes available, insert it while maintaining increasing prefix values
            if (newIdx >= 0) {
                while (!dq.empty() && prefix[dq.back()] >= prefix[newIdx]) dq.pop_back();
                dq.push_back(newIdx);
            }

            // best subarray ending at R-1 uses min prefix in deque (if exists)
            if (!dq.empty()) ans = max(ans, prefix[R] - prefix[dq.front()]);
        }

        return ans;
    }
};
```

---

### Java

```java
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    // Returns the maximum subarray sum for lengths in [a, b]
    public long maxSubarrSum(int[] arr, int a, int b) {
        int n = arr.length;
        if (n == 0) return 0L;

        long[] prefix = new long[n + 1];
        prefix[0] = 0L;
        for (int i = 1; i <= n; ++i) prefix[i] = prefix[i - 1] + (long)arr[i - 1];

        Deque<Integer> dq = new ArrayDeque<>();
        long ans = Long.MIN_VALUE;

        for (int R = 1; R <= n; ++R) {
            int leftBound = Math.max(0, R - b);
            int newIdx = R - a;

            while (!dq.isEmpty() && dq.peekFirst() < leftBound) dq.pollFirst();

            if (newIdx >= 0) {
                while (!dq.isEmpty() && prefix[dq.peekLast()] >= prefix[newIdx]) dq.pollLast();
                dq.offerLast(newIdx);
            }

            if (!dq.isEmpty()) ans = Math.max(ans, prefix[R] - prefix[dq.peekFirst()]);
        }

        return ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
class Solution {
    maxSubarrSum(arr, a, b) {
        const n = arr.length;
        if (n === 0) return 0;

        // prefix sums
        const prefix = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; ++i) prefix[i] = prefix[i - 1] + arr[i - 1];

        // deque simulated with array + head pointer
        const dq = [];
        let head = 0;
        let ans = Number.NEGATIVE_INFINITY;

        for (let R = 1; R <= n; ++R) {
            const leftBound = Math.max(0, R - b);
            const newIdx = R - a;

            // pop front while out of window
            while (head < dq.length && dq[head] < leftBound) head++;

            if (newIdx >= 0) {
                while (head < dq.length && prefix[dq[dq.length - 1]] >= prefix[newIdx]) dq.pop();
                dq.push(newIdx);
            }

            if (head < dq.length) {
                const candidate = prefix[R] - prefix[dq[head]];
                if (candidate > ans) ans = candidate;
            }
        }

        return ans;
    }
}
```

---

### Python3

```python3
from collections import deque

class Solution:
    def maxSubarrSum(self, arr, a, b):
        n = len(arr)
        if n == 0:
            return 0

        # prefix sums: prefix[i] = sum of arr[0..i-1]
        prefix = [0] * (n + 1)
        for i in range(1, n + 1):
            prefix[i] = prefix[i-1] + arr[i-1]

        dq = deque()    # stores indices with increasing prefix values
        ans = -10**30

        for R in range(1, n + 1):
            leftBound = max(0, R - b)
            newIdx = R - a

            # remove indices out of the window
            while dq and dq[0] < leftBound:
                dq.popleft()

            # insert new index while maintaining increasing prefix values
            if newIdx >= 0:
                while dq and prefix[dq[-1]] >= prefix[newIdx]:
                    dq.pop()
                dq.append(newIdx)

            if dq:
                ans = max(ans, prefix[R] - prefix[dq[0]])

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I explain the logic block-by-block. The code is the same algorithm in all languages; I will describe using simple steps and point to corresponding code parts.

### 1) Build prefix sums

* Purpose: Transform subarray sum queries `sum(arr[l..r])` into `prefix[r+1] - prefix[l]` which is O(1).
* Implementation (all languages): loop from `i = 1` to `n` and set `prefix[i] = prefix[i-1] + arr[i-1]`.

### 2) Window for valid left indices

* For a current right-exclusive prefix index `R` (which corresponds to ending index `r = R - 1`), the allowed left prefix indices `L` satisfy:

  * `R - b <= L <= R - a` (clamped to `0..n`).
* This ensures subarray length `len = R - L` is in `[a, b]`.

### 3) Monotonic deque

* I keep a deque of prefix indices where prefix values are increasing from front to back.
* Why? The front of the deque will be the minimum prefix value in the current window. `prefix[R] - prefix[minL]` is then maximal for this `R`.
* When adding index `newIdx = R - a`: I pop from back while `prefix[back] >= prefix[newIdx]` because `newIdx` dominates those (smaller or equal prefix and more recent), so they are never useful.
* When sliding forward, I pop from front if the index is less than `R - b` (out of window).

### 4) Answer update

* After maintaining deque, if it's not empty candidate = `prefix[R] - prefix[dq.front()]`.
* Keep `ans = max(ans, candidate)`.

### 5) Implementation details per language

* **C++:** `vector<long long> prefix` and `deque<int> dq`. Use `LLONG_MIN` for initial `ans`.
* **Java:** `long[] prefix`, `ArrayDeque<Integer> dq`. Return `long`.
* **JavaScript:** Use `Number.NEGATIVE_INFINITY` for `ans`. Simulate deque with an array and `head` pointer for efficient pops from front.
* **Python3:** Use `collections.deque` and Python `int` (unbounded) so overflow is not an issue.

---

## Examples

### Example 1

Input: `arr = [4, 5, -1, -2, 6]`, `a = 2`, `b = 4`
Output: `9`
Explanation: subarray `[4, 5]` has length 2 and sum 9.

### Example 2

Input: `arr = [-1, 3, -1, -2, 5, 3, -5, 2, 2]`, `a = 3`, `b = 5`
Output: `8`
Explanation: subarray `[3, -1, -2, 5, 3]` has length 5 and sum 8.

---

## How to use / Run locally

Place the chosen language's code into a file and either add a small driver (main) that reads input and prints the method's return value, or call the function from your test harness.

**C++** (example):

1. Save the class code into `solution.cpp` and add a `main()` that creates a `Solution` object and calls `maxSubarrSum` with a sample array.
2. Compile: `g++ -std=c++17 solution.cpp -O2 -o solution`
3. Run: `./solution`

**Java**:

1. Save the code to `Solution.java`. Add a `public static void main(String[] args)` method that constructs an array and calls `new Solution().maxSubarrSum(...)` and prints the result.
2. Compile: `javac Solution.java`
3. Run: `java Solution`

**JavaScript** (Node.js):

1. Save code to `solution.js`. Add a small block at the end to create example arrays and print `new Solution().maxSubarrSum(arr, a, b)`.
2. Run: `node solution.js`

**Python3**:

1. Save code to `solution.py`. Add a sample execution block at the bottom:

```py
if __name__ == '__main__':
    arr = [4, 5, -1, -2, 6]
    print(Solution().maxSubarrSum(arr, 2, 4))
```

2. Run: `python3 solution.py`

---

## Notes & Optimizations

* Using prefix sums + monotonic deque yields `O(n)` time. This is optimal since we must at least read all elements.
* Memory: We store a prefix array and a deque. If memory is very constrained, it is possible to avoid a full prefix array by pairing prefix value with index and storing them directly in the deque; but the code above is clearer and still `O(n)` memory.
* Always use 64-bit integers (`long long` / `long`) in typed languages because partial sums can exceed 32-bit range.
* Edge cases to consider in tests: all negative numbers, `a == b`, `a == 1`, `b == n`, minimum and maximum values for elements.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
