# Maximum Product Subarray

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

I am given an integer array that can contain **positive numbers, negative numbers, and zero**.
My task is to find the **maximum product of a contiguous subarray**.

The subarray must be continuous, and the final answer is guaranteed to fit in a 32-bit integer.

---

## Constraints

* 1 ≤ arr.size() ≤ 10⁶
* -10 ≤ arr[i] ≤ 10

This means the solution must be **fast and memory-efficient**.

---

## Intuition

When I first looked at this problem, I realized one important thing:

This is **not a normal Kadane’s Algorithm** problem.

Why?

* A negative number can turn a big positive product into a negative one
* Two negative numbers can create a **larger positive product**
* Zero breaks the subarray completely

So I thought:
👉 *At every index, I must track both the maximum and the minimum product.*

Because today’s minimum product can become tomorrow’s maximum when multiplied by a negative number.

That idea solves everything.

---

## Approach

1. I maintain two variables:

   * `maxEnding` → maximum product ending at current index
   * `minEnding` → minimum product ending at current index

2. I initialize both with the first element of the array.

3. I iterate through the array from index `1`.

4. If the current number is **negative**, I swap `maxEnding` and `minEnding`.

5. I update:

   * `maxEnding = max(current, maxEnding × current)`
   * `minEnding = min(current, minEnding × current)`

6. I keep updating the global result.

7. Finally, I return the result.

This approach runs in **one pass** and uses **constant space**.

---

## Data Structures Used

* No extra data structures
* Only simple variables

This keeps the solution memory-efficient.

---

## Operations & Behavior Summary

* Handles negative numbers correctly
* Handles zero by resetting subarrays
* Works for single-element arrays
* Efficient for very large input sizes

---

## Complexity

* **Time Complexity:** `O(n)`
  I traverse the array once.
  `n` = number of elements in the array.

* **Space Complexity:** `O(1)`
  I only use constant extra variables.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxProduct(vector<int> &arr) {
        int maxEnding = arr[0];
        int minEnding = arr[0];
        int result = arr[0];

        for (int i = 1; i < arr.size(); i++) {
            if (arr[i] < 0)
                swap(maxEnding, minEnding);

            maxEnding = max(arr[i], maxEnding * arr[i]);
            minEnding = min(arr[i], minEnding * arr[i]);

            result = max(result, maxEnding);
        }
        return result;
    }
};
```

---

### Java

```java
class Solution {
    int maxProduct(int[] arr) {
        int maxEnding = arr[0];
        int minEnding = arr[0];
        int result = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < 0) {
                int temp = maxEnding;
                maxEnding = minEnding;
                minEnding = temp;
            }

            maxEnding = Math.max(arr[i], maxEnding * arr[i]);
            minEnding = Math.min(arr[i], minEnding * arr[i]);

            result = Math.max(result, maxEnding);
        }
        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxProduct(arr) {
        let maxEnding = arr[0];
        let minEnding = arr[0];
        let result = arr[0];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < 0) {
                [maxEnding, minEnding] = [minEnding, maxEnding];
            }

            maxEnding = Math.max(arr[i], maxEnding * arr[i]);
            minEnding = Math.min(arr[i], minEnding * arr[i]);

            result = Math.max(result, maxEnding);
        }
        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def maxProduct(self, arr):
        maxEnding = arr[0]
        minEnding = arr[0]
        result = arr[0]

        for i in range(1, len(arr)):
            if arr[i] < 0:
                maxEnding, minEnding = minEnding, maxEnding

            maxEnding = max(arr[i], maxEnding * arr[i])
            minEnding = min(arr[i], minEnding * arr[i])

            result = max(result, maxEnding)

        return result
```

---

## Step-by-step Detailed Explanation

1. I start with the first element as both max and min product.
2. While iterating:

   * If the number is negative, I swap max and min.
3. I decide whether to:

   * Start a new subarray
   * Or extend the previous one
4. I update the answer at every step.
5. At the end, I return the maximum product found.

---

## Examples

**Input:**
`[-2, 6, -3, -10, 0, 2]`

**Output:**
`180`

**Explanation:**
Subarray `[6, -3, -10]` gives the maximum product.

---

**Input:**
`[2, 3, 4]`

**Output:**
`24`

**Explanation:**
All elements are positive, so product of all elements is the answer.

---

## How to use / Run locally

1. Copy the code in your preferred language.
2. Compile and run using:

   * C++: `g++ file.cpp && ./a.out`
   * Java: `javac file.java && java Solution`
   * Python: `python file.py`
   * JavaScript: `node file.js`

---

## Notes & Optimizations

* This solution avoids extra arrays.
* Works efficiently for very large inputs.
* Interview-safe and production-ready.
* Commonly asked in FAANG-level interviews.

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
