# Maximize Number of 1's

## Table of Contents

1. Problem Summary
2. Constraints
3. Intuition
4. Approach
5. Data Structures Used
6. Operations & Behavior Summary
7. Complexity
8. Multi-language Solutions

   * C++
   * Java
   * JavaScript
   * Python3
9. Step-by-step Detailed Explanation
10. Examples
11. How to use / Run locally
12. Notes & Optimizations
13. Author

---

## Problem Summary

Given a binary array `arr[]` consisting only of `0`s and `1`s, and an integer `k`, I am allowed to flip **at most `k` zeros into ones**.

My task is to find the **maximum number of consecutive 1’s** that can be obtained after performing the operation at most `k` times.

This problem focuses on finding the longest valid subarray under a specific constraint.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `0 ≤ k ≤ arr.size()`
* `arr[i]` can be only `0` or `1`

---

## Intuition

When I first looked at the problem, I realized something important.

If I can flip at most `k` zeros, then I can allow **at most `k` zeros inside a subarray**.

If a subarray has `k` or fewer zeros, I can flip all of them and treat the entire subarray as **all 1’s**.

So instead of flipping elements directly, I changed the problem in my mind to:

> Find the longest subarray that contains **at most `k` zeros**.

This immediately pointed me toward the **sliding window (two pointer)** technique.

---

## Approach

I solved this using a sliding window strategy.

1. I use two pointers: `left` and `right`.
2. I expand the window by moving `right` forward.
3. I keep track of how many zeros are inside the window.
4. If the zero count becomes greater than `k`, I shrink the window from the left.
5. At every step, I calculate the current window length.
6. I store the maximum window length found.

This guarantees that the window always contains a valid subarray where zeros can be flipped.

---

## Data Structures Used

* No extra data structures are required.
* Only integer variables and pointers are used.

---

## Operations & Behavior Summary

* Expand window → include more elements
* Count zeros inside the window
* Shrink window when zero count exceeds `k`
* Continuously update the maximum valid window size

The window always represents a valid subarray where flips are possible.

---

## Complexity

**Time Complexity:** `O(n)`

* `n` is the length of the array
* Each element is processed at most twice

**Space Complexity:** `O(1)`

* No extra space is used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxOnes(vector<int>& arr, int k) {
        int left = 0, zeroCount = 0, maxLen = 0;

        for (int right = 0; right < arr.size(); right++) {
            if (arr[right] == 0) zeroCount++;

            while (zeroCount > k) {
                if (arr[left] == 0) zeroCount--;
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};
```

---

### Java

```java
class Solution {
    public int maxOnes(int arr[], int k) {
        int left = 0, zeroCount = 0, maxLen = 0;

        for (int right = 0; right < arr.length; right++) {
            if (arr[right] == 0) zeroCount++;

            while (zeroCount > k) {
                if (arr[left] == 0) zeroCount--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxOnes(arr, k) {
        let left = 0, zeroCount = 0, maxLen = 0;

        for (let right = 0; right < arr.length; right++) {
            if (arr[right] === 0) zeroCount++;

            while (zeroCount > k) {
                if (arr[left] === 0) zeroCount--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

---

### Python3

```python
class Solution:
    def maxOnes(self, arr, k):
        left = 0
        zero_count = 0
        max_len = 0

        for right in range(len(arr)):
            if arr[right] == 0:
                zero_count += 1

            while zero_count > k:
                if arr[left] == 0:
                    zero_count -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

* I move the `right` pointer to expand the window.
* Each time I encounter a `0`, I increase the zero counter.
* If zero count becomes more than `k`, I move `left` forward.
* While shrinking, if a `0` leaves the window, I decrease zero count.
* At every valid window, I calculate `right - left + 1`.
* I update the maximum length.

This logic remains exactly the same across all languages.

---

## Examples

**Input:** `arr = [1, 0, 1], k = 1`
**Output:** `3`

**Input:** `arr = [1, 0, 0, 1, 0, 1, 0, 1], k = 2`
**Output:** `5`

**Input:** `arr = [1, 1], k = 2`
**Output:** `2`

---

## How to use / Run locally

1. Copy the code for your preferred language.
2. Paste it into your local compiler or IDE.
3. Provide the input array and value of `k`.
4. Run the program to get the result.

---

## Notes & Optimizations

* This solution is already optimal.
* Brute force approaches would fail due to time limits.
* Sliding window is the best approach here.

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
