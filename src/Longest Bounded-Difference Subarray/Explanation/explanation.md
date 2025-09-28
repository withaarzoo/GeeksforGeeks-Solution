# Longest Bounded-Difference Subarray

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

Given an array of positive integers `arr[]` and a non-negative integer `x`, find the **longest contiguous subarray** such that the absolute difference between any two elements in the subarray is **not greater than** `x`. If multiple such subarrays exist, return the one that starts at the **smallest index**.

Return the subarray values (not just length).

**Example:**

* Input: `arr = [8, 4, 5, 6, 7]`, `x = 3` → Output: `[4, 5, 6, 7]`
* Input: `arr = [1, 10, 12, 13, 14]`, `x = 2` → Output: `[12, 13, 14]`

## Constraints

* `1 <= arr.size() <= 10^5`
* `1 <= arr[i] <= 10^9`
* `0 <= x <= 10^9`

These constraints suggest we need an algorithm that runs in roughly linear time and uses only modest extra space.

## Intuition

I thought: I need the longest contiguous window where `max(window) - min(window) <= x`.
That is the sliding-window idea. But to check validity efficiently while expanding and shrinking the window, I must know the current window's minimum and maximum in O(1). To do that, I keep two monotonic deques (double-ended queues):

* One deque keeps indices of candidate maximums in **decreasing** order of values (front = current max).
* The other keeps indices of candidate minimums in **increasing** order of values (front = current min).

With these, I can expand the right side and shrink the left side while maintaining O(1) access to window max/min.

## Approach

1. Initialize two empty deques `maxD` (decreasing values) and `minD` (increasing values).
2. Use two pointers `l = 0` and iterate `r` from 0 to `n-1` (right end of window).
3. For each new `r`:

   * Remove from the back of `maxD` any indices whose values are `<= arr[r]`, then push `r` (preserve decreasing order).
   * Remove from the back of `minD` any indices whose values are `>= arr[r]`, then push `r` (preserve increasing order).
4. While `arr[maxD.front()] - arr[minD.front()] > x`, move `l` to the right (shrink window). If `maxD.front()` or `minD.front()` equals `l`, pop it from the front because that index leaves the window.
5. After the window becomes valid, check its length `r - l + 1`. If it's strictly longer than the best so far, update the best start and length. (Use `>` not `>=` so ties keep the smallest starting index.)
6. After the loop, return the slice `arr[bestL : bestL + bestLen]`.

## Data Structures Used

* `deque<int>` (or language equivalent) to store indices.
* Integer variables for pointers, best start and best length.

## Operations & Behavior Summary

* `push_back(index)`: add a candidate index for future consideration.
* `pop_back()`: remove dominated candidates (they can't be optimal while newer index exists).
* `pop_front()`: remove indices that fall out of the left boundary `l`.
* `front/back` access to read current min/max indices.
* `slice` (or equivalent) to return the final subarray.

These operations ensure each index is pushed and popped at most once from each deque ⇒ O(n) total deque operations.

## Complexity

* **Time Complexity:** `O(n)` where `n` is `arr.size()`.

  * Each array index is added and removed at most once from each deque.
  * The `l` and `r` pointers each move forward at most `n` steps.

* **Space Complexity:** `O(n)` worst-case for the deques (usually much less). We store indices only, plus few integers.

---

## Multi-language Solutions

Below are clean, commented implementations in C++, Java, JavaScript and Python3.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> longestSubarray(vector<int>& arr, int x) {
        int n = arr.size();
        if (n == 0) return {};
        deque<int> maxD; // indices of candidates for max, values decreasing
        deque<int> minD; // indices of candidates for min, values increasing

        int l = 0;
        int bestL = 0, bestLen = 0;

        for (int r = 0; r < n; ++r) {
            // maintain decreasing max deque
            while (!maxD.empty() && arr[r] > arr[maxD.back()]) maxD.pop_back();
            maxD.push_back(r);

            // maintain increasing min deque
            while (!minD.empty() && arr[r] < arr[minD.back()]) minD.pop_back();
            minD.push_back(r);

            // shrink window from left while invalid
            while (!maxD.empty() && !minD.empty() && (long long)arr[maxD.front()] - arr[minD.front()] > x) {
                if (maxD.front() == l) maxD.pop_front();
                if (minD.front() == l) minD.pop_front();
                ++l;
            }

            int len = r - l + 1;
            if (len > bestLen) { // strictly greater -> ensures smallest starting index for ties
                bestLen = len;
                bestL = l;
            }
        }

        return vector<int>(arr.begin() + bestL, arr.begin() + bestL + bestLen);
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> longestSubarray(int[] arr, int x) {
        int n = arr.length;
        ArrayList<Integer> result = new ArrayList<>();
        if (n == 0) return result;

        Deque<Integer> maxD = new ArrayDeque<>(); // indices, values decreasing
        Deque<Integer> minD = new ArrayDeque<>(); // indices, values increasing

        int l = 0, bestL = 0, bestLen = 0;

        for (int r = 0; r < n; r++) {
            // maintain max deque (decreasing)
            while (!maxD.isEmpty() && arr[r] > arr[maxD.peekLast()]) maxD.pollLast();
            maxD.offerLast(r);

            // maintain min deque (increasing)
            while (!minD.isEmpty() && arr[r] < arr[minD.peekLast()]) minD.pollLast();
            minD.offerLast(r);

            // shrink window if invalid
            while (!maxD.isEmpty() && !minD.isEmpty() && (long)arr[maxD.peekFirst()] - arr[minD.peekFirst()] > x) {
                if (maxD.peekFirst() == l) maxD.pollFirst();
                if (minD.peekFirst() == l) minD.pollFirst();
                l++;
            }

            int len = r - l + 1;
            if (len > bestLen) { // strictly greater to prefer smaller start index on ties
                bestLen = len;
                bestL = l;
            }
        }

        for (int i = bestL; i < bestL + bestLen; i++) result.add(arr[i]);
        return result;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} x
 * @returns {number[]}
 */
class Solution {
    longestSubarray(arr, x) {
        const n = arr.length;
        if (n === 0) return [];
        const maxD = []; // store indices, decreasing order by value
        const minD = []; // store indices, increasing order by value
        let l = 0, bestL = 0, bestLen = 0;

        for (let r = 0; r < n; r++) {
            while (maxD.length && arr[r] > arr[maxD[maxD.length - 1]]) maxD.pop();
            maxD.push(r);

            while (minD.length && arr[r] < arr[minD[minD.length - 1]]) minD.pop();
            minD.push(r);

            while (maxD.length && minD.length && (arr[maxD[0]] - arr[minD[0]] > x)) {
                if (maxD[0] === l) maxD.shift();
                if (minD[0] === l) minD.shift();
                l++;
            }

            const len = r - l + 1;
            if (len > bestLen) {
                bestLen = len;
                bestL = l;
            }
        }

        return arr.slice(bestL, bestL + bestLen);
    }
}
```

### Python3

```python3
from collections import deque

class Solution:
    def longestSubarray(self, arr, x):
        n = len(arr)
        if n == 0:
            return []
        maxD = deque()  # indices, values decreasing
        minD = deque()  # indices, values increasing

        l = 0
        bestL = 0
        bestLen = 0

        for r in range(n):
            # maintain max deque (decreasing values)
            while maxD and arr[r] > arr[maxD[-1]]:
                maxD.pop()
            maxD.append(r)

            # maintain min deque (increasing values)
            while minD and arr[r] < arr[minD[-1]]:
                minD.pop()
            minD.append(r)

            # shrink while invalid
            while maxD and minD and arr[maxD[0]] - arr[minD[0]] > x:
                if maxD[0] == l:
                    maxD.popleft()
                if minD[0] == l:
                    minD.popleft()
                l += 1

            cur_len = r - l + 1
            if cur_len > bestLen:  # strictly greater -> keep smallest start for ties
                bestLen = cur_len
                bestL = l

        return arr[bestL: bestL + bestLen]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the algorithm step-by-step and map it to the code. The logic is the same in every implementation; only syntax changes.

1. **Initialize:**

   * `maxD` and `minD` are empty deques. They will store indices, not values.
   * `l = 0` (left pointer); `bestL = 0`, `bestLen = 0` track the best answer seen.

2. **Iterate `r` from 0 to n-1:**

   * For the incoming index `r`, update `maxD` by popping from the back until the last index points to a value greater than `arr[r]`. This ensures `maxD` is in decreasing order of values.
   * Append `r` to `maxD`.
   * Similarly update `minD` by popping from the back while `arr[r]` is smaller or equal than the back's value. Then append `r`.

3. **Check window validity:**

   * The current maximum is at `arr[maxD.front()]` and current minimum is at `arr[minD.front()]`.
   * If `max - min > x`, the window `[l..r]` isn't valid. Move `l` forward until `max - min <= x`.
   * When moving `l`, if any deque's front equals the leaving index `l`, pop it from the front.

4. **Record best window:**

   * After the window becomes valid, compute `len = r - l + 1`.
   * If `len > bestLen`, update `bestLen` and `bestL`. Using `>` preserves the smallest starting index in case of ties.

5. **Return answer:**

   * Slice the original array from `bestL` to `bestL + bestLen` and return it.

**Why this is correct:**

* Deques maintain monotonic order, giving O(1) access to current window `max` and `min`.
* Each index enters/pops at most once from each deque → linear work.
* The sliding window explores all possible left/right positions implicitly; the best valid window is found.

---

## Examples

1. `arr = [8,4,5,6,7], x = 3` → output `[4,5,6,7]` (window indexes [1..4])
2. `arr = [1,10,12,13,14], x = 2` → output `[12,13,14]` (window indexes [2..4])
3. `arr = [5,5,5,5], x = 0` → output `[5,5,5,5]` (whole array)
4. `arr = [1,100,2,3,4,5], x = 3` → output `[2,3,4,5]`

---

## How to use / Run locally

### C++

1. Put the code in a file `solution.cpp` and add a `main()` to test it, or integrate into your testing harness.
2. Compile: `g++ -std=c++17 solution.cpp -O2 -o solution`
3. Run: `./solution`

### Java

1. Save as `Solution.java`. Add a `main()` method to create `Solution` and call `longestSubarray` with test cases.
2. Compile: `javac Solution.java`
3. Run: `java Solution`

### JavaScript (Node.js)

1. Save the class into `solution.js` and write a small test snippet at the end to create instance and log result.
2. Run: `node solution.js`

### Python3

1. Save as `solution.py`. Add a test harness at the bottom under `if __name__ == "__main__":`.
2. Run: `python3 solution.py`

**Tip:** For quick testing, wrap the class usage in a small main/test wrapper that prints results for sample inputs.

---

## Notes & Optimizations

* The algorithm is already optimal in time complexity `O(n)` for these constraints.
* Space is optimal up to storing indices in deques. In practice the deques rarely hold `O(n)` elements simultaneously.
* If only the length (not the actual elements) is required, memory usage is the same asymptotically; returning just length avoids slicing cost.
* Use 64-bit arithmetic (long/long long) when subtracting `arr[max] - arr[min]` if values may be large (up to `10^9`). In the code we cast to `long`/`long long` where appropriate.

---

## Author

[Aarzoo Islam](https://bento.me/withaarzoo)
