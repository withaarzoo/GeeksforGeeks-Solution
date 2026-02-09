# Find Kth Rotation

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

I am given an array of **distinct integers** that was originally sorted in increasing order.
This array is then **right-rotated k times**.

My task is to **find the value of k**, which means:

* How many times the array was rotated to the right.

### Example

Original array:
`[1, 2, 3, 4, 5]`

After 1 right rotation:
`[5, 1, 2, 3, 4]`

So, the answer is `1`.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `1 ≤ arr[i] ≤ 10^7`
* All elements are **distinct**
* Expected Time Complexity: `O(log n)`
* Expected Space Complexity: `O(1)`

---

## Intuition

When I first looked at the problem, I noticed something important.

The array was **sorted first**, then rotated.

I know one key fact:

> In a rotated sorted array, the **smallest element tells us the rotation count**.

So I thought:

* If the smallest element is at index `0`, the array is not rotated.
* If the smallest element is at index `k`, then the array was rotated `k` times to the right.

Now the problem became simple for me:
👉 **Just find the index of the minimum element efficiently.**

---

## Approach

Here is how I solved it step by step:

1. I used **Binary Search** because the array is sorted and rotated.
2. I compared the middle element with the last element.
3. If `arr[mid] > arr[high]`, the minimum element must be on the right side.
4. Otherwise, the minimum element is on the left side (or at mid).
5. I kept shrinking the search space.
6. When `low == high`, that index is the smallest element.
7. That index is my answer `k`.

---

## Data Structures Used

* No extra data structure used.
* Only integer variables (`low`, `high`, `mid`).

---

## Operations & Behavior Summary

* Uses binary search to reduce time complexity.
* Works for all rotated and non-rotated arrays.
* Directly returns rotation count without modifying the array.
* Safe for large input sizes.

---

## Complexity

* **Time Complexity:** `O(log n)`
  Binary search reduces the search space by half each time.

* **Space Complexity:** `O(1)`
  No extra memory is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findKRotation(vector<int> &arr) {
        int low = 0, high = arr.size() - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] > arr[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
};
```

---

### Java

```java
class Solution {
    public int findKRotation(int arr[]) {
        int low = 0, high = arr.length - 1;

        while (low < high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] > arr[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    findKRotation(arr) {
        let low = 0;
        let high = arr.length - 1;

        while (low < high) {
            let mid = Math.floor((low + high) / 2);

            if (arr[mid] > arr[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}
```

---

### Python3

```python
class Solution:
    def findKRotation(self, arr):
        low, high = 0, len(arr) - 1

        while low < high:
            mid = (low + high) // 2

            if arr[mid] > arr[high]:
                low = mid + 1
            else:
                high = mid

        return low
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I start with two pointers:

   * `low` at the beginning
   * `high` at the end

2. I calculate `mid` safely to avoid overflow.

3. If the middle element is **greater than the last element**:

   * The smallest element cannot be on the left.
   * I move `low = mid + 1`.

4. Otherwise:

   * The smallest element is on the left or at `mid`.
   * I move `high = mid`.

5. When the loop ends:

   * `low` and `high` meet at the smallest element.
   * That index is exactly the number of right rotations.

This logic is identical in all four languages.

---

## Examples

### Example 1

Input:

```bash
[5, 1, 2, 3, 4]
```

Output:

```bash
1
```

### Example 2

Input:

```bash
[1, 2, 3, 4, 5]
```

Output:

```bash
0
```

---

## How to Use / Run Locally

1. Copy the code for your preferred language.
2. Create a file (e.g., `solution.cpp`, `Solution.java`, `solution.js`, `solution.py`).
3. Compile and run using your local compiler or interpreter.
4. Pass the array as input and print the returned value.

---

## Notes & Optimizations

* Works only because elements are **distinct**.
* No need to sort the array.
* Faster than linear scan for large inputs.
* This approach is commonly asked in interviews.

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
