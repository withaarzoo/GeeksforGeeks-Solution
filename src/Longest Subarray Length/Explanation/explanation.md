# Longest Subarray Length

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

Given an array `arr` of integers, find the length of the longest contiguous subarray such that **every element in that subarray is less than or equal to the subarray's length**. More formally, find the maximum `L` such that there exists some subarray of length `L` where for every element `x` in that subarray, `x <= L`.

> We present an O(n) solution using monotonic stacks to compute for every element the maximal span (window) in which that element is the maximum. If the element value is ≤ the span length, that span is a valid candidate.

## Constraints

* Typical constraints this solution targets (adapt as needed):

  * `1 <= n <= 1e5` (array length)
  * `0 <= arr[i] <= 1e9` (array values)
* The solution is linear time O(n) and uses O(n) extra space, so it scales to large arrays.

## Intuition

If a subarray of length `L` is valid, then its maximum element must be `<= L`. That suggests we only need to consider windows where a particular element is the maximum; for each element we can compute the farthest span where it remains the maximum (exclusive nearest greater element on left and right). If that span length is `len`, and the element value `arr[i] <= len`, then the span is valid. The answer is the largest such `len` over all elements.

## Approach

1. For every index `i`, find `left[i]`: nearest index to the left with `arr[left[i]] > arr[i]` (or -1 if none). This marks the start boundary where `arr[i]` stops being the maximum.
2. For every index `i`, find `right[i]`: nearest index to the right with `arr[right[i]] > arr[i]` (or `n` if none). This marks the end boundary.
3. The largest window where `arr[i]` is the maximum is `(right[i] - left[i] - 1)`.
4. If `arr[i] <= (right[i] - left[i] - 1)`, that window is valid. Track the maximum valid window length across all `i`.

We compute `left` and `right` with monotonic decreasing stacks (indices of elements in strictly decreasing order) in two passes: left-to-right and right-to-left.

## Data Structures Used

* Arrays / slices for `left[]` and `right[]` boundaries.
* A stack (or deque) storing indices to compute nearest strictly greater element on each side.

## Operations & Behavior Summary

* Single linear pass (left-to-right) to compute nearest strictly greater to the left for each element.
* Single linear pass (right-to-left) to compute nearest strictly greater to the right for each element.
* One final pass to compute span lengths and check validity (`arr[i] <= span`), taking the maximum.

## Complexity

* **Time Complexity:** O(n) — each element is pushed/popped to/from the stack at most once in each pass.
* **Space Complexity:** O(n) — for `left`, `right`, and the stack.

## Multi-language Solutions

Below are implementations in multiple languages following the same algorithm.

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestSubarray(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return 0;
        vector<int> left(n), right(n);
        stack<int> st;

        // nearest strictly greater to the left
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && arr[st.top()] <= arr[i]) st.pop();
            left[i] = st.empty() ? -1 : st.top();
            st.push(i);
        }

        while (!st.empty()) st.pop();

        // nearest strictly greater to the right
        for (int i = n - 1; i >= 0; --i) {
            while (!st.empty() && arr[st.top()] <= arr[i]) st.pop();
            right[i] = st.empty() ? n : st.top();
            st.push(i);
        }

        int ans = 0;
        for (int i = 0; i < n; ++i) {
            int len = right[i] - left[i] - 1;
            if (arr[i] <= len) ans = max(ans, len);
        }
        return ans;
    }
};

// Example usage (uncomment to run):
// int main() {
//     Solution s;
//     vector<int> arr = {3, 4, 1};
//     cout << s.longestSubarray(arr) << "\n"; // expected 1
// }
```

### Java

```java
import java.util.*;

class Solution {
    public static int longestSubarray(int[] arr) {
        int n = arr.length;
        if (n == 0) return 0;
        int[] left = new int[n];
        int[] right = new int[n];
        Deque<Integer> st = new ArrayDeque<>();

        for (int i = 0; i < n; ++i) {
            while (!st.isEmpty() && arr[st.peek()] <= arr[i]) st.pop();
            left[i] = st.isEmpty() ? -1 : st.peek();
            st.push(i);
        }

        st.clear();

        for (int i = n - 1; i >= 0; --i) {
            while (!st.isEmpty() && arr[st.peek()] <= arr[i]) st.pop();
            right[i] = st.isEmpty() ? n : st.peek();
            st.push(i);
        }

        int ans = 0;
        for (int i = 0; i < n; ++i) {
            int len = right[i] - left[i] - 1;
            if (arr[i] <= len) ans = Math.max(ans, len);
        }
        return ans;
    }

    // Example usage:
    // public static void main(String[] args) {
    //     int[] arr = {3, 4, 1};
    //     System.out.println(longestSubarray(arr)); // expected 1
    // }
}
```

### JavaScript

```javascript
class Solution {
    longestSubarray(arr) {
        const n = arr.length;
        if (n === 0) return 0;
        const left = new Array(n);
        const right = new Array(n);
        const st = [];

        for (let i = 0; i < n; ++i) {
            while (st.length > 0 && arr[st[st.length - 1]] <= arr[i]) st.pop();
            left[i] = st.length === 0 ? -1 : st[st.length - 1];
            st.push(i);
        }

        st.length = 0;

        for (let i = n - 1; i >= 0; --i) {
            while (st.length > 0 && arr[st[st.length - 1]] <= arr[i]) st.pop();
            right[i] = st.length === 0 ? n : st[st.length - 1];
            st.push(i);
        }

        let ans = 0;
        for (let i = 0; i < n; ++i) {
            const len = right[i] - left[i] - 1;
            if (arr[i] <= len) ans = Math.max(ans, len);
        }
        return ans;
    }
}

// Example usage:
// const sol = new Solution();
// console.log(sol.longestSubarray([3, 4, 1])); // expected 1
```

### Python3

```python
class Solution:
    def longestSubarray(self, arr):
        n = len(arr)
        if n == 0:
            return 0

        left = [0] * n
        right = [0] * n
        st = []  # stack of indices

        # nearest strictly greater to the left
        for i in range(n):
            while st and arr[st[-1]] <= arr[i]:
                st.pop()
            left[i] = st[-1] if st else -1
            st.append(i)

        st.clear()

        # nearest strictly greater to the right
        for i in range(n - 1, -1, -1):
            while st and arr[st[-1]] <= arr[i]:
                st.pop()
            right[i] = st[-1] if st else n
            st.append(i)

        ans = 0
        for i in range(n):
            length = right[i] - left[i] - 1
            if arr[i] <= length:
                ans = max(ans, length)
        return ans

# Example usage:
# s = Solution()
# print(s.longestSubarray([3, 4, 1]))  # expected 1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

This section breaks the algorithm down into precise steps — the implementations above all follow the same flow.

1. **Initialization**

   * Let `n = arr.length`.
   * Prepare `left[n]`, `right[n]`. The stack `st` will store indices of elements in strictly decreasing order of values.

2. **Left Pass (nearest strictly greater to the left)**

   * Iterate `i` from `0` to `n-1`.
   * While `st` is not empty and `arr[st.top] <= arr[i]`, pop.
   * After popping, if `st` is empty, `left[i] = -1` (no greater element to left); else `left[i] = st.top()`.
   * Push `i` onto `st`.

3. **Clear stack** and prepare for the right pass.

4. **Right Pass (nearest strictly greater to the right)**

   * Iterate `i` from `n-1` down to `0`.
   * While `st` is not empty and `arr[st.top] <= arr[i]`, pop.
   * After popping, if `st` is empty, `right[i] = n` (no greater element to right); else `right[i] = st.top()`.
   * Push `i` onto `st`.

5. **Compute spans and validate**

   * For each index `i`, the span length where `arr[i]` is the maximum equals `right[i] - left[i] - 1`.
   * If `arr[i] <= span`, then that span is valid. Keep the maximum valid span.

6. **Return** the maximum valid span length found.

**Why this works**: Each span considered is maximal for being dominated by `arr[i]` (i.e., `arr[i]` is the greatest in that span). If even the maximal span for a particular value doesn't satisfy `arr[i] <= span`, then no smaller span where it's the maximum will ever beat a larger span that contains it; but we check every index's maximal span, so we cover all possible windows that are candidates by virtue of containing their maximum.

## Examples

* `arr = [1]` → output: `1` (single element 1 ≤ 1)
* `arr = [2, 1]` → output: `2` (whole array of length 2, both elements ≤ 2)
* `arr = [3, 4, 1]` → output: `1` (only subarray `[1]` satisfies `x ≤ length` for all elements inside)
* `arr = [3, 3, 3]` → output: `3` (entire array length 3, each element 3 ≤ 3)

## How to use / Run locally

### C++

1. Save the C++ code to `solution.cpp` and include a `main` to read input or run examples.
2. Compile: `g++ -std=c++17 solution.cpp -O2 -o solution`
3. Run: `./solution`

### Java

1. Save as `Solution.java` and include a `main` (provided examples show how).
2. Compile: `javac Solution.java`
3. Run: `java Solution`

### JavaScript (Node.js)

1. Save code into `solution.js` and add example calls at the bottom.
2. Run: `node solution.js`

### Python

1. Save into `solution.py`.
2. Run: `python3 solution.py`

## Notes & Optimizations

* This monotonic-stack method is optimal in time for a single pass solution.
* Alternative approaches:

  * Binary search on answer `L` and check whether a subarray of length `L` exists whose maximum ≤ `L`. Checking can be done with a deque (sliding window maximum), giving `O(n log n)` overall.
  * Segment tree / sparse table for range maxima with binary-search for the longest valid window around each position — more complex and usually slower in practice for this specific problem.
* Edge cases:

  * Empty array should return `0`.
  * All large values bigger than any possible window length will lead to result `0` or `1` depending on existence of `<=1` values.

## Author

Md. Aarzoo Islam
