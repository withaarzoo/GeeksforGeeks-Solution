# Kth Missing Positive Number in a Sorted Array

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

I am given a **sorted array of distinct positive integers**.
Some positive numbers are missing from this array.

My task is to find the **kth missing positive number**.

### Example

```
Input:  arr = [2, 3, 4, 7, 11], k = 5
Output: 9
```

---

## Constraints

* 1 ≤ arr.length ≤ 10⁵
* 1 ≤ k ≤ 10⁵
* 1 ≤ arr[i] ≤ 10⁶
* Array is sorted and contains only distinct positive integers

---

## Intuition

When I first saw this problem, I noticed the array is **sorted**.
That immediately told me:

> If something is sorted, **binary search** can be useful.

I also realized something important:

* In a perfect array without missing numbers
  the value at index `i` should be `i + 1`

So if `arr[i]` is bigger than `i + 1`,
that difference tells me **how many numbers are missing** before that index.

This idea became the base of my solution.

---

## Approach

1. I use **binary search** on the array.
2. For any index `mid`, I calculate:

   ```
   missing = arr[mid] - (mid + 1)
   ```

3. If `missing < k`,
   it means I need to search on the right side.
4. If `missing >= k`,
   I move to the left side.
5. After binary search ends,
   the answer is:

   ```
   left + k
   ```

This gives me the exact kth missing positive number.

---

## Data Structures Used

* No extra data structure
* Only variables for binary search

---

## Operations & Behavior Summary

* Binary search over indices
* Constant-time missing count calculation
* No array modification
* Works efficiently for large inputs

---

## Complexity

**Time Complexity:** `O(log n)`

* `n` is the size of the array
* Binary search reduces steps significantly

**Space Complexity:** `O(1)`

* No extra memory used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int kthMissing(vector<int> &arr, int k) {
        int left = 0, right = arr.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int missing = arr[mid] - (mid + 1);

            if (missing < k)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left + k;
    }
};
```

---

### Java

```java
class Solution {
    public int kthMissing(int[] arr, int k) {
        int left = 0, right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int missing = arr[mid] - (mid + 1);

            if (missing < k)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left + k;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    kthMissing(arr, k) {
        let left = 0, right = arr.length - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            let missing = arr[mid] - (mid + 1);

            if (missing < k)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left + k;
    }
}
```

---

### Python3

```python
class Solution:
    def kthMissing(self, arr, k):
        left, right = 0, len(arr) - 1

        while left <= right:
            mid = (left + right) // 2
            missing = arr[mid] - (mid + 1)

            if missing < k:
                left = mid + 1
            else:
                right = mid - 1

        return left + k
```

---

## Step-by-step Detailed Explanation (All Languages)

1. Start binary search with `left = 0` and `right = n - 1`
2. Calculate `mid`
3. Count missing numbers before `mid`
4. Compare missing count with `k`
5. Move left or right accordingly
6. After loop ends, return `left + k`

This logic is identical in **C++, Java, JavaScript, and Python**.

---

## Examples

### Example 1

```
Input:  arr = [2, 3, 4, 7, 11], k = 5
Output: 9
```

### Example 2

```
Input:  arr = [1, 2, 3], k = 2
Output: 5
```

### Example 3

```
Input:  arr = [3, 5, 9, 10], k = 1
Output: 1
```

---

## How to use / Run locally

1. Copy the code for your preferred language
2. Paste it into your compiler or IDE
3. Provide input array and `k`
4. Run the program

No external libraries required.

---

## Notes & Optimizations

* Binary search is required to meet time limits
* Linear scan will fail for large inputs
* Formula `arr[i] - (i + 1)` is the key insight
* Works even when missing numbers are before the first element

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
