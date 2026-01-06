# Max XOR Subarray of Size K

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

Given an integer array `arr[]` and an integer `k`, the task is to find the **maximum XOR value** of any **subarray of size k**.

A subarray is a continuous part of the array.
We must consider only those subarrays whose length is exactly `k`.

---

## Constraints

* 1 ≤ arr.size() ≤ 10⁶
* 0 ≤ arr[i] ≤ 10⁶
* 1 ≤ k ≤ arr.size()

These constraints clearly tell me that:

* A brute-force approach will not work.
* I need a linear time solution.

---

## Intuition

When I read the problem, I noticed that the subarray size is fixed.

So instead of checking every possible subarray again and again,
I thought about using a **sliding window**.

XOR has a special property:

* `x ^ x = 0`
* XOR is reversible

This means I can remove the left element and add the right element using XOR in constant time.

That made the solution very clear:

* Calculate XOR for the first window
* Slide the window one step at a time
* Update XOR efficiently
* Track the maximum value

---

## Approach

1. Compute XOR of the first `k` elements.
2. Store it as the initial answer.
3. Slide the window from left to right.
4. For every move:

   * Remove the element leaving the window using XOR.
   * Add the new element entering the window using XOR.
5. Update the maximum XOR.
6. Return the final result.

This way, I only traverse the array once.

---

## Data Structures Used

No extra data structures are used.

Only basic variables are required:

* Integer variables for XOR calculation
* One variable to store the maximum result

---

## Operations & Behavior Summary

* XOR calculation happens in O(1)
* Sliding window moves one step at a time
* No nested loops
* No extra memory usage
* Fully optimized for large input sizes

---

## Complexity

**Time Complexity:** O(n)
Here `n` is the number of elements in the array.
Each element is processed only once.

**Space Complexity:** O(1)
No extra space is used apart from variables.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxSubarrayXOR(vector<int>& arr, int k) {
        int currXor = 0;

        for (int i = 0; i < k; i++) {
            currXor ^= arr[i];
        }

        int maxXor = currXor;

        for (int i = k; i < arr.size(); i++) {
            currXor ^= arr[i - k];
            currXor ^= arr[i];
            maxXor = max(maxXor, currXor);
        }

        return maxXor;
    }
};
```

---

### Java

```java
class Solution {
    public int maxSubarrayXOR(int[] arr, int k) {
        int currXor = 0;

        for (int i = 0; i < k; i++) {
            currXor ^= arr[i];
        }

        int maxXor = currXor;

        for (int i = k; i < arr.length; i++) {
            currXor ^= arr[i - k];
            currXor ^= arr[i];
            maxXor = Math.max(maxXor, currXor);
        }

        return maxXor;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxSubarrayXOR(arr, k) {
        let currXor = 0;

        for (let i = 0; i < k; i++) {
            currXor ^= arr[i];
        }

        let maxXor = currXor;

        for (let i = k; i < arr.length; i++) {
            currXor ^= arr[i - k];
            currXor ^= arr[i];
            maxXor = Math.max(maxXor, currXor);
        }

        return maxXor;
    }
}
```

---

### Python3

```python
class Solution:
    def maxSubarrayXOR(self, arr, k):
        curr_xor = 0

        for i in range(k):
            curr_xor ^= arr[i]

        max_xor = curr_xor

        for i in range(k, len(arr)):
            curr_xor ^= arr[i - k]
            curr_xor ^= arr[i]
            max_xor = max(max_xor, curr_xor)

        return max_xor
```

---

## Step-by-step Detailed Explanation

1. I first calculate the XOR of the first `k` elements.
2. This gives me the XOR of the first valid subarray.
3. I store it as the maximum result for now.
4. Then I start sliding the window:

   * Remove the leftmost element using XOR.
   * Add the new element entering the window.
5. XOR automatically adjusts because XORing the same value twice cancels it.
6. After each move, I update the maximum XOR.
7. After the loop ends, I return the maximum value found.

This is fast, clean, and perfect for large inputs.

---

## Examples

**Input**

```bash
arr = [2, 5, 8, 1, 1, 3], k = 3
```

**Output**

```bash
15
```

**Explanation**
2 ^ 5 ^ 8 = 15, which is the maximum possible.

---

**Input**

```bash
arr = [1, 2, 4, 5, 6], k = 2
```

**Output**

```bash
6
```

---

## How to use / Run locally

1. Clone the repository
2. Open the file in your preferred language
3. Compile or run using standard commands

   * C++: g++ file.cpp
   * Java: javac Solution.java
   * JavaScript: node file.js
   * Python: python3 file.py

---

## Notes & Optimizations

* This solution avoids recalculating XOR for every subarray.
* Sliding window makes it optimal.
* Works efficiently even for very large arrays.
* This is the best possible approach for this problem.

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
