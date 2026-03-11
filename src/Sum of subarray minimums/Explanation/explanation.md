# Sum of Subarray Minimums

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

## Problem Summary

Given an array `arr[]` of positive integers, compute the total sum of the minimum elements of every possible subarray.

More formally: For every subarray `arr[i..j]` (where `0 <= i <= j < n`), find `min(arr[i..j])`. Sum all those minima and return the result.

It is guaranteed the total sum fits within a 32-bit unsigned integer for problem constraints on typical platforms; however implementations should use at least 64-bit integers to avoid overflow during intermediate calculations.

## Constraints

* `1 <= arr.size() <= 3 * 10^4`
* `1 <= arr[i] <= 10^3`

## Intuition

I thought about generating every subarray and finding its minimum. That is straightforward and obvious at first. But with `n` up to `3 * 10^4`, the number of subarrays is `n * (n + 1) / 2`, which becomes too large to handle in quadratic time.

Then I changed perspective: instead of computing minimum for every subarray, I asked "for a fixed element `arr[i]`, in how many subarrays is it the minimum?" If I can compute the number of subarrays for which `arr[i]` is the minimum, then its total contribution to the final sum is `arr[i] * count`.

To compute that count efficiently for every element I used a monotonic increasing stack to find, for each index `i`:

* how many consecutive elements to the left are strictly larger (so `arr[i]` remains the minimum), and
* how many consecutive elements to the right are greater or equal (to avoid double counting equal minima on the right).

The product of those two distances gives the number of subarrays where `arr[i]` is the unique minimum chosen under our tie-breaking convention. Summing `arr[i] * left * right` over all `i` yields the answer.

## Approach

1. For each index `i`, find **left[i]** = number of contiguous elements ending at `i` (including `i`) such that `arr[i]` is strictly less than every element to its left within that range. This can be computed by a pass using a monotonic stack that stores indices of increasing values; we pop while the stack top value is greater than `arr[i]`.
2. For each index `i`, find **right[i]** = number of contiguous elements starting at `i` (including `i`) such that `arr[i]` is less than or equal to every element to its right within that range. This is a reverse pass with a monotonic stack where we pop while stack top value is greater than or equal to `arr[i]`.
3. The number of subarrays where `arr[i]` is the minimum is `left[i] * right[i]`.
4. Contribution of `arr[i]` to the result is `arr[i] * left[i] * right[i]`.
5. Sum all contributions using a 64-bit accumulator and return the total.

Important tie-breaking detail: to avoid counting the same subarray's minimum more than once when there are equal values, the left side uses a strictly greater (`>`) comparison while the right side uses `>=` so that when equal elements appear, only the one earlier in the array accounts for subarrays spanning them in a consistent manner.

## Data Structures Used

* **Array / Vector** for input and for storing `left[]` and `right[]` distances.
* **Stack** (monotonic stack holding indices) for both left and right passes.
* **64-bit integer** accumulator (e.g., `long long` / `long`) to safely accumulate final sums.

## Operations & Behavior Summary

* `push(index)` onto stack when current element becomes a candidate for future comparisons.
* `pop()` indices from stack while the stack-top element violates the monotonic property relative to the current element.
* For each index `i`:

  * `left[i]` is computed during a left-to-right pass.
  * `right[i]` is computed during a right-to-left pass.
  * Multiply `arr[i] * left[i] * right[i]` and add to the accumulator.

## Complexity

* **Time Complexity:** `O(n)` — each element is pushed and popped from the stack at most once during each pass. Two passes plus a final linear combination yield linear time.

  * `n` is the number of elements in the input array.
* **Space Complexity:** `O(n)` — for `left[]`, `right[]` arrays and the stack in the worst case.

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int sumSubMins(vector<int> &arr) {
        int n = arr.size();
        vector<int> left(n), right(n);
        stack<int> st;

        // Left pass: distance to previous strictly less element
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && arr[st.top()] > arr[i]) st.pop();
            left[i] = st.empty() ? (i + 1) : (i - st.top());
            st.push(i);
        }

        // Clear stack for next pass
        while (!st.empty()) st.pop();

        // Right pass: distance to next less or equal element
        for (int i = n - 1; i >= 0; --i) {
            while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();
            right[i] = st.empty() ? (n - i) : (st.top() - i);
            st.push(i);
        }

        long long ans = 0;
        for (int i = 0; i < n; ++i) ans += (long long)arr[i] * left[i] * right[i];

        return (int)ans; // cast safe under problem guarantees
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int sumSubMins(int[] arr) {
        int n = arr.length;
        int[] left = new int[n];
        int[] right = new int[n];
        Deque<Integer> st = new ArrayDeque<>();

        // Left pass: distance to previous strictly less element
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && arr[st.peek()] > arr[i]) st.pop();
            left[i] = st.isEmpty() ? (i + 1) : (i - st.peek());
            st.push(i);
        }

        st.clear();

        // Right pass: distance to next less or equal element
        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && arr[st.peek()] >= arr[i]) st.pop();
            right[i] = st.isEmpty() ? (n - i) : (st.peek() - i);
            st.push(i);
        }

        long ans = 0;
        for (int i = 0; i < n; i++) ans += (long)arr[i] * left[i] * right[i];

        return (int)ans; // safe under problem constraints
    }
}
```

### JavaScript

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @returns {number}
     */
    sumSubMins(arr) {
        const n = arr.length;
        const left = new Array(n);
        const right = new Array(n);
        const st = [];

        // Left pass: distance to previous strictly less element
        for (let i = 0; i < n; ++i) {
            while (st.length && arr[st[st.length - 1]] > arr[i]) st.pop();
            left[i] = st.length ? (i - st[st.length - 1]) : (i + 1);
            st.push(i);
        }

        st.length = 0;

        // Right pass: distance to next less or equal element
        for (let i = n - 1; i >= 0; --i) {
            while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop();
            right[i] = st.length ? (st[st.length - 1] - i) : (n - i);
            st.push(i);
        }

        let ans = 0n; // use BigInt for safety in JS if desired
        for (let i = 0; i < n; ++i) {
            // convert to BigInt to avoid float precision issues for large sums
            ans += BigInt(arr[i]) * BigInt(left[i]) * BigInt(right[i]);
        }

        return Number(ans); // convert back to Number if within safe range
    }
}
```

### Python3

```python3
class Solution:
    def sumSubMins(self, arr):
        n = len(arr)
        left = [0] * n
        right = [0] * n
        st = []

        # Left pass: distance to previous strictly less element
        for i in range(n):
            while st and arr[st[-1]] > arr[i]:
                st.pop()
            left[i] = i + 1 if not st else i - st[-1]
            st.append(i)

        st.clear()

        # Right pass: distance to next less or equal element
        for i in range(n - 1, -1, -1):
            while st and arr[st[-1]] >= arr[i]:
                st.pop()
            right[i] = (n - i) if not st else (st[-1] - i)
            st.append(i)

        ans = 0
        for i in range(n):
            ans += arr[i] * left[i] * right[i]

        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I walk through the algorithm with careful line-by-line explanation. I use the array `arr = [3, 1, 2, 4]` as an example to illustrate intermediate values.

### Common idea (applies to all languages)

1. We will perform two linear passes.

   * First pass (left-to-right) computes `left[i]` = how many choices of starting index `L` (with `0 <= L <= i`) make `arr[i]` the minimum of `arr[L..i]`.
   * Second pass (right-to-left) computes `right[i]` = how many choices of ending index `R` (with `i <= R < n`) make `arr[i]` the minimum of `arr[i..R]` under our tie-breaking rule.
2. For each `i`, the number of subarrays where `arr[i]` is the minimum is `left[i] * right[i]`.
3. Sum `arr[i] * left[i] * right[i]` over all `i`.

### Example walk-through: `arr = [3, 1, 2, 4]`

* Left pass computes:

  * `left[0] = 1` (no smaller to the left of 3)
  * `left[1] = 2` (1 is smaller than 3 and can extend to index 0)
  * `left[2] = 1` (previous smaller is at index 1)
  * `left[3] = 1` (previous smaller is at index 2)

* Right pass computes:

  * `right[3] = 1` (no smaller/equal to the right of 4)
  * `right[2] = 1` (next less or equal to the right — none)
  * `right[1] = 3` (next less or equal is beyond array end — extends to the end)
  * `right[0] = 1` (next less is at index 1)

* Contributions:

  * index 0: `3 * 1 * 1 = 3`
  * index 1: `1 * 2 * 3 = 6`
  * index 2: `2 * 1 * 1 = 2`
  * index 3: `4 * 1 * 1 = 4`
  * total = `15`

(You can verify this by enumerating subarrays and their minima.)

### Language-specific notes

* **C++**: Use `long long` for accumulation. Use `vector<int>` and `stack<int>` for indices.
* **Java**: Use `long` for accumulation and `Deque<Integer>` (ArrayDeque) as the stack substitute.
* **JavaScript**: JavaScript `Number` is a floating-point type; for absolute safety with large sums use `BigInt`. The example returns a `Number` after converting from `BigInt` where appropriate.
* **Python3**: Python integers are arbitrary precision, so simple integer addition is safe.

## Examples

**Example 1**

```
Input: arr = [10, 20]
Subarrays: [10], [20], [10,20]
Minima: 10, 20, 10
Output: 40
```

**Example 2**

```
Input: arr = [1, 2, 3, 4]
Output: 20
```

## How to use / Run locally

1. Clone or download the repository.
2. Create a source file for the preferred language and paste the corresponding solution.
3. Compile / Run:

   * **C++** (g++):

     ```bash
     g++ -std=c++17 -O2 solution.cpp -o solution
     ./solution
     ```

   * **Java**:

     ```bash
     javac Solution.java
     java Solution
     ```

   * **JavaScript** (Node.js):

     ```bash
     node solution.js
     ```

   * **Python3**:

     ```bash
     python3 solution.py
     ```

4. For testing, write a small driver that reads input arrays and prints `sumSubMins(arr)`.

## Notes & Optimizations

* This monotonic stack technique is a common pattern for range-counting problems (next/previous less/greater). Recognizing where to apply it is an important skill for competitive programming and interviews.
* The tie-breaking (`>` on the left pass and `>=` on the right pass) is deliberate. It ensures each subarray's minimum is accounted for exactly once even when duplicate values exist.
* If memory is critical, you can compute `right[i]` on the fly during the second pass and immediately add contributions to the answer to avoid storing both `left[]` and `right[]` arrays simultaneously; but keep stack memory for the pass.
* Use 64-bit integers during accumulation to avoid overflow in intermediate steps.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
