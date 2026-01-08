# Count Subarray with k Odds

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

I am given an array of positive integers and an integer `k`.
My task is to count how many **continuous subarrays** contain **exactly `k` odd numbers**.

A subarray must be continuous, meaning elements must be taken in order without skipping.

---

## Constraints

* 1 ≤ k ≤ size of array ≤ 10⁵
* 1 ≤ arr[i] ≤ 10⁹
* Array contains only positive integers

The solution must be efficient and work for large inputs.

---

## Intuition

When I first looked at the problem, I noticed that counting subarrays with **exactly** `k` odd numbers directly is tricky.

Then I remembered an important idea:

If I can count
subarrays with **at most `k` odd numbers**
and
subarrays with **at most `k - 1` odd numbers**,

their difference will give me subarrays with **exactly `k` odd numbers**.

So my core idea became:

exactly k odds
= atMost(k) − atMost(k − 1)

This simplifies the problem a lot.

---

## Approach

1. I create a helper function `atMost(k)`
   It counts how many subarrays contain **at most `k` odd numbers**.

2. I use the **sliding window (two pointers)** technique:

   * One pointer expands the window
   * The other shrinks it when odd count becomes too large

3. For every valid window ending at index `r`,
   I add `(r - l + 1)` subarrays.

4. Finally, I subtract:

   * subarrays with at most `k - 1` odds
     from
   * subarrays with at most `k` odds

5. The result is subarrays with **exactly `k` odd numbers**.

---

## Data Structures Used

* Two pointers (left and right indices)
* Integer variables for counting odds and result

No extra data structures are used.

---

## Operations & Behavior Summary

* Traverse array once using sliding window
* Count odd numbers using modulo operation
* Adjust window when odd count exceeds limit
* Accumulate valid subarray counts
* Compute final answer using subtraction trick

---

## Complexity

**Time Complexity:**
O(n)
Each element is processed at most twice by the sliding window.

**Space Complexity:**
O(1)
Only constant extra space is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int atMost(vector<int>& arr, int k) {
        int left = 0, oddCount = 0, result = 0;

        for (int right = 0; right < arr.size(); right++) {
            if (arr[right] % 2 == 1)
                oddCount++;

            while (oddCount > k) {
                if (arr[left] % 2 == 1)
                    oddCount--;
                left++;
            }

            result += (right - left + 1);
        }
        return result;
    }

    int countSubarrays(vector<int>& arr, int k) {
        return atMost(arr, k) - atMost(arr, k - 1);
    }
};
```

---

### Java

```java
class Solution {

    private int atMost(int[] arr, int k) {
        int left = 0, oddCount = 0, result = 0;

        for (int right = 0; right < arr.length; right++) {
            if (arr[right] % 2 == 1)
                oddCount++;

            while (oddCount > k) {
                if (arr[left] % 2 == 1)
                    oddCount--;
                left++;
            }

            result += (right - left + 1);
        }
        return result;
    }

    public int countSubarrays(int[] arr, int k) {
        return atMost(arr, k) - atMost(arr, k - 1);
    }
}
```

---

### JavaScript

```javascript
class Solution {
    atMost(arr, k) {
        let left = 0, oddCount = 0, result = 0;

        for (let right = 0; right < arr.length; right++) {
            if (arr[right] % 2 === 1)
                oddCount++;

            while (oddCount > k) {
                if (arr[left] % 2 === 1)
                    oddCount--;
                left++;
            }

            result += (right - left + 1);
        }
        return result;
    }

    countSubarrays(arr, k) {
        return this.atMost(arr, k) - this.atMost(arr, k - 1);
    }
}
```

---

### Python3

```python
class Solution:
    def atMost(self, arr, k):
        left = 0
        odd_count = 0
        result = 0

        for right in range(len(arr)):
            if arr[right] % 2 == 1:
                odd_count += 1

            while odd_count > k:
                if arr[left] % 2 == 1:
                    odd_count -= 1
                left += 1

            result += (right - left + 1)

        return result

    def countSubarrays(self, arr, k):
        return self.atMost(arr, k) - self.atMost(arr, k - 1)
```

---

## Step-by-step Detailed Explanation

1. I move the right pointer to expand the window.
2. I count odd numbers inside the window.
3. If odd count becomes greater than allowed, I move the left pointer.
4. Every valid window contributes multiple subarrays.
5. I repeat this until the array ends.
6. I subtract results to get exactly `k` odd subarrays.

This approach is fast and works for large inputs.

---

## Examples

**Input:**
arr = [2, 5, 6, 9], k = 2

**Output:**
2

**Explanation:**
Valid subarrays are:
[2, 5, 6, 9] and [5, 6, 9]

---

## How to Use / Run Locally

1. Clone the repository
2. Copy the solution for your preferred language
3. Compile and run using standard compiler
4. Pass the array and value of `k` as input

Example for C++:

```bash
g++ solution.cpp
./a.out
```

---

## Notes & Optimizations

* Sliding window avoids nested loops
* No extra memory required
* Works efficiently for large inputs
* Interview-friendly and easy to explain

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
