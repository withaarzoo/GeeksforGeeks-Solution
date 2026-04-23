# Two Equal Sum Subarrays

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an array of integers `arr[]`, return `true` if it is possible to split the array into two **contiguous subarrays** such that the sum of both parts is equal. Otherwise, return `false`.

---

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 1 ≤ arr[i] ≤ 10^6

---

## Intuition

I thought about the problem in a very straightforward way.

If I want to split the array into two parts with equal sum, then the **total sum of the array must be even**.

If the total sum is odd, then there is no way to divide it into two equal parts.

If the total sum is even, then I just need to find a point where the prefix sum becomes equal to half of the total sum.

---

## Approach

1. Calculate the total sum of the array.
2. If the total sum is odd, return `false`.
3. Otherwise, set `target = total / 2`.
4. Traverse the array and keep a running sum.
5. If at any index the running sum becomes equal to `target`, return `true`.
6. If no such point is found, return `false`.

---

## Data Structures Used

* No extra data structures are used.
* Only variables are used to store sum values.

---

## Operations & Behavior Summary

* Linear traversal of the array.
* Continuous accumulation of prefix sum.
* Immediate return when condition is satisfied.

---

## Complexity

* Time Complexity: O(n)

  * We traverse the array once.
* Space Complexity: O(1)

  * No extra memory is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool canSplit(vector<int>& arr) {
        long long total = 0;
        for(int x : arr) total += x;

        if(total % 2 != 0) return false;

        long long target = total / 2;
        long long curr = 0;

        for(int i = 0; i < arr.size(); i++) {
            curr += arr[i];
            if(curr == target) return true;
        }

        return false;
    }
};
```

### Java

```java
class Solution {
    public boolean canSplit(int arr[]) {
        long total = 0;
        for(int x : arr) total += x;

        if(total % 2 != 0) return false;

        long target = total / 2;
        long curr = 0;

        for(int i = 0; i < arr.length; i++) {
            curr += arr[i];
            if(curr == target) return true;
        }

        return false;
    }
}
```

### JavaScript

```javascript
class Solution {
    canSplit(arr) {
        let total = 0;
        for(let x of arr) total += x;

        if(total % 2 !== 0) return false;

        let target = total / 2;
        let curr = 0;

        for(let i = 0; i < arr.length; i++) {
            curr += arr[i];
            if(curr === target) return true;
        }

        return false;
    }
}
```

### Python3

```python
class Solution:
    def canSplit(self, arr):
        total = sum(arr)

        if total % 2 != 0:
            return False

        target = total // 2
        curr = 0

        for num in arr:
            curr += num
            if curr == target:
                return True

        return False
```

---

## Step-by-step Detailed Explanation

### Step 1: Calculate Total Sum

We calculate the sum of all elements in the array.

### Step 2: Check Even or Odd

If the sum is odd, we return false because equal split is impossible.

### Step 3: Define Target

We define target as half of the total sum.

### Step 4: Traverse the Array

We iterate through the array while maintaining a running sum.

### Step 5: Compare Running Sum

If the running sum becomes equal to target, we return true.

### Step 6: Final Result

If we complete the loop without finding such a point, we return false.

---

## Examples

Input: [1, 2, 3, 4, 5, 5]
Output: true
Explanation: Split into [1,2,3,4] and [5,5]

Input: [4, 3, 2, 1]
Output: false

---

## How to use / Run locally

### C++

* Compile using: g++ file.cpp
* Run using: ./a.out

### Java

* Compile: javac Solution.java
* Run: java Solution

### JavaScript

* Run using Node.js: node file.js

### Python

* Run: python file.py

---

## Notes & Optimizations

* Early exit improves performance.
* No need for extra arrays or prefix storage.
* Works efficiently for large inputs.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
