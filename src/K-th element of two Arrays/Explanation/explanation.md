# K-th Element of Two Sorted Arrays

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
* Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given **two sorted arrays** `a[]` and `b[]`, and an integer `k`.
My task is to find the element that would appear at the **k-th position** if both arrays were merged into **one sorted array**.

Important point:
I am **not allowed** to actually merge the arrays because the size can be very large.

---

## Constraints

* `1 ≤ size of a, b ≤ 10^6`
* `1 ≤ k ≤ size(a) + size(b)`
* `0 ≤ a[i], b[i] ≤ 10^8`
* Arrays are already sorted

---

## Intuition

When I first looked at this problem, my natural thought was:

> “Let me merge both arrays and pick the k-th element.”

But after seeing the constraints, I realized this approach would be **slow and memory-heavy**.

So I thought again.

Since both arrays are **already sorted**, I can use **binary search** instead of merging.
The k-th element depends on how many elements I take from the first array and how many from the second.

That idea led me to the **binary search on partitions** approach.

---

## Approach

I solve this problem using **Binary Search** in the following way:

1. I always apply binary search on the **smaller array**.
2. I divide both arrays into left and right parts.
3. The left part must contain **exactly k elements**.
4. I check if all elements in the left part are **smaller than or equal to** the right part.
5. If the partition is correct, the answer is the **maximum element on the left side**.
6. If not, I move my binary search window accordingly.

This avoids merging and keeps the solution fast.

---

## Data Structures Used

* Arrays only
* No extra data structures are used

---

## Operations & Behavior Summary

* Binary search to find the correct partition
* Comparison of boundary elements
* Constant space usage
* No array merging

---

## Complexity

* **Time Complexity:**
  `O(log(min(n, m)))`
  where `n` and `m` are the sizes of the two arrays.

* **Space Complexity:**
  `O(1)`
  No extra space is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int kthElement(vector<int> &a, vector<int> &b, int k) {
        if (a.size() > b.size())
            return kthElement(b, a, k);

        int n = a.size(), m = b.size();
        int low = max(0, k - m), high = min(k, n);

        while (low <= high) {
            int cutA = (low + high) / 2;
            int cutB = k - cutA;

            int leftA = (cutA == 0) ? INT_MIN : a[cutA - 1];
            int leftB = (cutB == 0) ? INT_MIN : b[cutB - 1];
            int rightA = (cutA == n) ? INT_MAX : a[cutA];
            int rightB = (cutB == m) ? INT_MAX : b[cutB];

            if (leftA <= rightB && leftB <= rightA)
                return max(leftA, leftB);
            else if (leftA > rightB)
                high = cutA - 1;
            else
                low = cutA + 1;
        }
        return -1;
    }
};
```

---

### Java

```java
class Solution {
    public int kthElement(int a[], int b[], int k) {
        if (a.length > b.length)
            return kthElement(b, a, k);

        int n = a.length, m = b.length;
        int low = Math.max(0, k - m);
        int high = Math.min(k, n);

        while (low <= high) {
            int cutA = (low + high) / 2;
            int cutB = k - cutA;

            int leftA = (cutA == 0) ? Integer.MIN_VALUE : a[cutA - 1];
            int leftB = (cutB == 0) ? Integer.MIN_VALUE : b[cutB - 1];
            int rightA = (cutA == n) ? Integer.MAX_VALUE : a[cutA];
            int rightB = (cutB == m) ? Integer.MAX_VALUE : b[cutB];

            if (leftA <= rightB && leftB <= rightA)
                return Math.max(leftA, leftB);
            else if (leftA > rightB)
                high = cutA - 1;
            else
                low = cutA + 1;
        }
        return -1;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    kthElement(a, b, k) {
        if (a.length > b.length)
            return this.kthElement(b, a, k);

        let n = a.length, m = b.length;
        let low = Math.max(0, k - m);
        let high = Math.min(k, n);

        while (low <= high) {
            let cutA = Math.floor((low + high) / 2);
            let cutB = k - cutA;

            let leftA = (cutA === 0) ? -Infinity : a[cutA - 1];
            let leftB = (cutB === 0) ? -Infinity : b[cutB - 1];
            let rightA = (cutA === n) ? Infinity : a[cutA];
            let rightB = (cutB === m) ? Infinity : b[cutB];

            if (leftA <= rightB && leftB <= rightA)
                return Math.max(leftA, leftB);
            else if (leftA > rightB)
                high = cutA - 1;
            else
                low = cutA + 1;
        }
        return -1;
    }
}
```

---

### Python3

```python
class Solution:
    def kthElement(self, a, b, k):
        if len(a) > len(b):
            return self.kthElement(b, a, k)

        n, m = len(a), len(b)
        low, high = max(0, k - m), min(k, n)

        while low <= high:
            cutA = (low + high) // 2
            cutB = k - cutA

            leftA = float('-inf') if cutA == 0 else a[cutA - 1]
            leftB = float('-inf') if cutB == 0 else b[cutB - 1]
            rightA = float('inf') if cutA == n else a[cutA]
            rightB = float('inf') if cutB == m else b[cutB]

            if leftA <= rightB and leftB <= rightA:
                return max(leftA, leftB)
            elif leftA > rightB:
                high = cutA - 1
            else:
                low = cutA + 1

        return -1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I ensure binary search is done on the smaller array.
2. I calculate how many elements should be taken from each array.
3. I compare boundary elements around the partition.
4. If the partition is valid, I return the maximum element on the left.
5. If not, I adjust the binary search range.

The same logic is followed in **all languages**.

---

## Examples

**Input:**
`a = [2, 3, 6, 7, 9]`
`b = [1, 4, 8, 10]`
`k = 5`

**Output:**
`6`

**Explanation:**
Merged order would be `[1,2,3,4,6,7,8,9,10]`.
The 5th element is `6`.

---

## How to use / Run locally

1. Copy the solution code in your preferred language.
2. Paste it into your local compiler or IDE.
3. Provide arrays and `k` as input.
4. Run the program to get the result.

---

## Notes & Optimizations

* No merging is done
* Works efficiently for large inputs
* Interview-preferred solution
* Same logic works for median of two sorted arrays

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
