# Max Sum Subarray of Size K

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an array of integers and a number `k`.
My task is to find the **maximum sum of any contiguous subarray of size `k`**.

A subarray must be continuous.
I must return only the maximum possible sum.

---

## Constraints

* 1 ≤ array size ≤ 10⁶
* 1 ≤ array elements ≤ 10⁶
* 1 ≤ k ≤ array size

The solution must be fast and memory efficient.

---

## Intuition

When I read the problem, the first thing I noticed was that the subarray size `k` is fixed.

That means I do not need to check all possible subarrays of different sizes.
I only need to focus on subarrays of **exactly size `k`**.

If I calculate each subarray sum from scratch, it will take too much time.
So I thought of a better way.

If I already know the sum of one window, I can reuse it by:

* Adding the next element
* Removing the previous element

This idea is called the **Sliding Window technique**.

---

## Approach

1. I calculate the sum of the first `k` elements.
2. I store this sum as my current maximum.
3. I move the window one step to the right.
4. I add the new element and subtract the old element.
5. I compare the current sum with the maximum sum.
6. I repeat this until the array ends.
7. Finally, I return the maximum sum.

---

## Data Structures Used

* Array
* Integer variables for tracking sums

No extra data structures are required.

---

## Operations & Behavior Summary

* One pass through the array
* Fixed-size window movement
* Constant memory usage
* Efficient for very large inputs

---

## Complexity

**Time Complexity:** O(n)
`n` is the number of elements in the array.
I traverse the array only once.

**Space Complexity:** O(1)
Only a few variables are used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxSubarraySum(vector<int>& arr, int k) {
        int windowSum = 0;

        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        int maxSum = windowSum;

        for (int i = k; i < arr.size(); i++) {
            windowSum += arr[i];
            windowSum -= arr[i - k];
            maxSum = max(maxSum, windowSum);
        }

        return maxSum;
    }
};
```

---

### Java

```java
class Solution {
    public int maxSubarraySum(int[] arr, int k) {
        int windowSum = 0;

        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        int maxSum = windowSum;

        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i];
            windowSum -= arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }

        return maxSum;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxSubarraySum(arr, k) {
        let windowSum = 0;

        for (let i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        let maxSum = windowSum;

        for (let i = k; i < arr.length; i++) {
            windowSum += arr[i];
            windowSum -= arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }

        return maxSum;
    }
}
```

---

### Python3

```python
class Solution:
    def maxSubarraySum(self, arr, k):
        window_sum = sum(arr[:k])
        max_sum = window_sum

        for i in range(k, len(arr)):
            window_sum += arr[i]
            window_sum -= arr[i - k]
            max_sum = max(max_sum, window_sum)

        return max_sum
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I start by summing the first `k` elements.
2. This gives me the first valid subarray sum.
3. I store it as the maximum sum.
4. Then I move the window forward one index at a time.
5. Each move:

   * Adds the new element entering the window
   * Removes the element leaving the window
6. I update the maximum sum if the current sum is larger.
7. After finishing the loop, the maximum sum is the answer.

This logic is exactly the same in all four languages.

---

## Examples

**Input**
arr = [100, 200, 300, 400], k = 2

**Output**
700

**Explanation**
300 + 400 gives the maximum sum.

---

**Input**
arr = [1, 4, 2, 10, 23, 3, 1, 0, 20], k = 4

**Output**
39

---

## How to Use / Run Locally

1. Copy the solution code in your preferred language.
2. Create a class named `Solution`.
3. Call the `maxSubarraySum` function with your array and `k`.
4. Print or return the result.

This code works on:

* GeeksforGeeks
* Local IDE
* Online compilers

---

## Notes & Optimizations

* Sliding Window avoids nested loops.
* Works efficiently even for very large arrays.
* This is the optimal solution for fixed-size subarray problems.
* Very common in interviews.

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
