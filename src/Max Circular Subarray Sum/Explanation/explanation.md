# Max Circular Subarray Sum

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
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given a **circular array** of integers.
My task is to find the **maximum possible sum of a non-empty subarray**.

Because the array is circular, the subarray:

* can be completely inside the array (normal case), or
* can start from the end and wrap to the beginning (circular case).

I must return the **maximum sum** possible in both cases.

---

## Constraints

* 1 ≤ array size ≤ 10⁵
* −10⁴ ≤ array elements ≤ 10⁴

---

## Intuition

First, I remembered **Kadane’s Algorithm**, which gives the maximum subarray sum in a normal array.

Then I thought:

* In a circular array, the maximum sum can come from:

  1. A **normal subarray** (no wrapping)
  2. A **wrapping subarray** (end + beginning)

If the subarray wraps, that means I am **excluding one continuous minimum subarray** in the middle.

So:

* Wrapping sum = total array sum − minimum subarray sum

One important edge case:

* If **all elements are negative**, wrapping will give wrong result
* In that case, the answer is simply the **largest element**

---

## Approach

1. Use Kadane’s Algorithm to find **maximum subarray sum**
2. Use a modified Kadane to find **minimum subarray sum**
3. Calculate **total sum of array**
4. If all numbers are negative
   → return max subarray sum
5. Otherwise
   → answer = max(normal max, circular max)

---

## Data Structures Used

* No extra data structures
* Only variables for tracking sums

---

## Operations & Behavior Summary

* Single pass through array
* Constant extra space
* Works for large input sizes
* Handles all edge cases including all-negative arrays

---

## Complexity

**Time Complexity:**
O(n)
n = number of elements in the array

**Space Complexity:**
O(1)
Only constant extra variables used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxCircularSum(vector<int> &arr) {
        int total = 0;
        int maxEnd = arr[0], maxSum = arr[0];
        int minEnd = arr[0], minSum = arr[0];

        for(int x : arr) {
            total += x;
            maxEnd = max(x, maxEnd + x);
            maxSum = max(maxSum, maxEnd);

            minEnd = min(x, minEnd + x);
            minSum = min(minSum, minEnd);
        }

        if(maxSum < 0) return maxSum;
        return max(maxSum, total - minSum);
    }
};
```

---

### Java

```java
class Solution {
    public int maxCircularSum(int arr[]) {
        int total = 0;
        int maxEnd = arr[0], maxSum = arr[0];
        int minEnd = arr[0], minSum = arr[0];

        for(int x : arr) {
            total += x;
            maxEnd = Math.max(x, maxEnd + x);
            maxSum = Math.max(maxSum, maxEnd);

            minEnd = Math.min(x, minEnd + x);
            minSum = Math.min(minSum, minEnd);
        }

        if(maxSum < 0) return maxSum;
        return Math.max(maxSum, total - minSum);
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxCircularSum(arr) {
        let total = 0;
        let maxEnd = arr[0], maxSum = arr[0];
        let minEnd = arr[0], minSum = arr[0];

        for (let x of arr) {
            total += x;
            maxEnd = Math.max(x, maxEnd + x);
            maxSum = Math.max(maxSum, maxEnd);

            minEnd = Math.min(x, minEnd + x);
            minSum = Math.min(minSum, minEnd);
        }

        if (maxSum < 0) return maxSum;
        return Math.max(maxSum, total - minSum);
    }
}
```

---

### Python3

```python
class Solution:
    def maxCircularSum(self, arr):
        total = 0
        max_end = max_sum = arr[0]
        min_end = min_sum = arr[0]

        for x in arr:
            total += x
            max_end = max(x, max_end + x)
            max_sum = max(max_sum, max_end)

            min_end = min(x, min_end + x)
            min_sum = min(min_sum, min_end)

        if max_sum < 0:
            return max_sum

        return max(max_sum, total - min_sum)
```

---

## Step-by-step Detailed Explanation

1. I keep track of total array sum
2. `maxEnd` stores best subarray ending at current index
3. `maxSum` stores global maximum subarray
4. `minEnd` stores minimum subarray ending at current index
5. `minSum` stores global minimum subarray
6. Circular sum is calculated using
   total − minimum subarray sum
7. Final answer is the maximum of:

   * normal max sum
   * circular max sum

---

## Examples

Input
`[8, -8, 9, -9, 10, -11, 12]`

Output
`22`

Explanation
Subarray: `[12, 8, -8, 9, -9, 10]`

---

## How to use / Run locally

1. Copy the code for your language
2. Paste inside your compiler or IDE
3. Create an array input
4. Call `maxCircularSum()`
5. Print the result

---

## Notes & Optimizations

* Uses Kadane’s Algorithm twice
* No extra memory required
* Works efficiently for large inputs
* Handles edge cases correctly

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
