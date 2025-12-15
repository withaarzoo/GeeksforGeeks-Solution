# Count Indices to Balance Even and Odd Sums

---

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

I am given an integer array `arr[]`.

My task is to **count how many indices** exist such that:

* If I remove the element at that index
* And shift all elements after it one position left
* Then the **sum of elements at even indices** becomes **equal** to the **sum of elements at odd indices**

I need to return the count of such indices.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `0 ≤ arr[i] ≤ 10^4`

This means my solution must be **fast and memory-efficient**.

---

## Intuition

When I first saw the problem, I realized something important.

If I remove an element:

* All elements **after that index shift left**
* Because of this shift:

  * Even index elements become odd
  * Odd index elements become even

So I thought:

> “Instead of deleting elements again and again, why not calculate the result smartly using prefix sums?”

This idea helped me reduce the time complexity from slow brute force to **O(n)**.

---

## Approach

1. First, I calculate:

   * Total sum of elements at even indices
   * Total sum of elements at odd indices

2. I maintain two prefix sums:

   * `leftEven` → sum of even indices before current index
   * `leftOdd` → sum of odd indices before current index

3. For every index `i`:

   * I remove `arr[i]` from total sums
   * Right side elements shift index parity
   * I calculate new even and odd sums

4. If both sums are equal, I increase my answer count.

5. I repeat this for all indices.

---

## Data Structures Used

* Simple integer variables
* No extra arrays or hash maps

This keeps the solution **memory efficient**.

---

## Operations & Behavior Summary

* One full scan to compute total sums
* One scan to test each index
* Constant time operations per index
* No element is physically removed

---

## Complexity

* **Time Complexity:** `O(n)`

  * `n` is the size of the array
  * Each element is processed once

* **Space Complexity:** `O(1)`

  * Only constant extra variables are used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int cntWays(vector<int>& arr) {
        int totalEven = 0, totalOdd = 0;
        
        for (int i = 0; i < arr.size(); i++) {
            if (i % 2 == 0) totalEven += arr[i];
            else totalOdd += arr[i];
        }

        int leftEven = 0, leftOdd = 0, count = 0;

        for (int i = 0; i < arr.size(); i++) {
            if (i % 2 == 0) totalEven -= arr[i];
            else totalOdd -= arr[i];

            if (leftEven + totalOdd == leftOdd + totalEven)
                count++;

            if (i % 2 == 0) leftEven += arr[i];
            else leftOdd += arr[i];
        }

        return count;
    }
};
```

---

### Java

```java
class Solution {
    public int cntWays(int[] arr) {
        int totalEven = 0, totalOdd = 0;

        for (int i = 0; i < arr.length; i++) {
            if (i % 2 == 0) totalEven += arr[i];
            else totalOdd += arr[i];
        }

        int leftEven = 0, leftOdd = 0, count = 0;

        for (int i = 0; i < arr.length; i++) {
            if (i % 2 == 0) totalEven -= arr[i];
            else totalOdd -= arr[i];

            if (leftEven + totalOdd == leftOdd + totalEven)
                count++;

            if (i % 2 == 0) leftEven += arr[i];
            else leftOdd += arr[i];
        }

        return count;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    cntWays(arr) {
        let totalEven = 0, totalOdd = 0;

        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) totalEven += arr[i];
            else totalOdd += arr[i];
        }

        let leftEven = 0, leftOdd = 0, count = 0;

        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) totalEven -= arr[i];
            else totalOdd -= arr[i];

            if (leftEven + totalOdd === leftOdd + totalEven)
                count++;

            if (i % 2 === 0) leftEven += arr[i];
            else leftOdd += arr[i];
        }

        return count;
    }
}
```

---

### Python3

```python
class Solution:
    def cntWays(self, arr):
        total_even = 0
        total_odd = 0

        for i in range(len(arr)):
            if i % 2 == 0:
                total_even += arr[i]
            else:
                total_odd += arr[i]

        left_even = 0
        left_odd = 0
        count = 0

        for i in range(len(arr)):
            if i % 2 == 0:
                total_even -= arr[i]
            else:
                total_odd -= arr[i]

            if left_even + total_odd == left_odd + total_even:
                count += 1

            if i % 2 == 0:
                left_even += arr[i]
            else:
                left_odd += arr[i]

        return count
```

---

## Step-by-step Detailed Explanation (All Languages)

1. I calculate total even and odd index sums.
2. I track left side sums using prefix logic.
3. When removing index `i`, I adjust totals.
4. Right side elements change index parity.
5. I compare new even and odd sums.
6. If equal, I count the index.

This logic stays **exactly the same** in all languages.

---

## Examples

### Example 1

**Input:** `[2, 1, 6, 4]`
**Output:** `1`
**Reason:** Removing index `1` balances both sums.

### Example 2

**Input:** `[1, 1, 1]`
**Output:** `3`
**Reason:** Removing any index gives equal sums.

---

## How to use / Run locally

1. Copy the solution code in your preferred language
2. Add a main function / test case
3. Compile and run

Example (C++):

```bash
g++ solution.cpp
./a.out
```

---

## Notes & Optimizations

* No brute force used
* No extra memory allocated
* Works efficiently for large input sizes
* Interview and contest friendly approach

---

## Author

* **Md Aarzoo Islam**
  🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
