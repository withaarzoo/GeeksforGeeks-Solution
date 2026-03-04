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

## Problem Summary

Given an integer array `arr` and a number `k`, the task is to find the maximum XOR value of any subarray having exactly `k` elements.

A subarray means a contiguous part of the array. We must consider every possible subarray of length `k` and compute its XOR. Among all those values, we return the maximum XOR.

Example

Input

arr = [2, 5, 8, 1, 1, 3]
k = 3

Output

15

Explanation

The XOR of the first subarray [2, 5, 8] is 15, which is the maximum among all subarrays of size 3.

## Constraints

1 ≤ arr.size ≤ 10^6
0 ≤ arr[i] ≤ 10^6
1 ≤ k ≤ arr.size

## Intuition

When I first looked at the problem, I noticed the subarray size is fixed. That means I only need to check subarrays that contain exactly `k` elements.

The straightforward approach would be to compute XOR for every possible subarray of size `k`. However, recalculating XOR every time would take too long when the array size is large.

Then I remembered a property of XOR.

A ^ B ^ B = A

This means if we XOR a value twice, it cancels itself.

Because of this property, I realized I can maintain a sliding window of size `k`. When the window moves forward, I remove the outgoing element using XOR and add the incoming element using XOR. This allows the XOR value to update in constant time.

## Approach

1. Compute the XOR of the first `k` elements.
2. Store this value as the current window XOR.
3. Also store it as the current maximum XOR.
4. Slide the window one position at a time.
5. When the window moves:

   * Remove the element leaving the window using XOR
   * Add the element entering the window using XOR
6. Update the maximum XOR if the current XOR is larger.
7. Continue until the array ends.
8. Return the maximum XOR found.

## Data Structures Used

Array

The input array is used directly.

Variables

Two variables are used to track

* current window XOR
* maximum XOR value

No additional data structures are required.

## Operations & Behavior Summary

1. Compute XOR of the first window.
2. Slide the window across the array.
3. Remove outgoing element using XOR.
4. Add incoming element using XOR.
5. Update maximum XOR value.

## Complexity

Time Complexity

O(n)

Where `n` is the size of the array. Each element is processed only once.

Space Complexity

O(1)

Only a few variables are used. No extra memory structures are required.

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int maxSubarrayXOR(vector<int>& arr, int k) {
        int n = arr.size();

        int currXor = 0;

        for(int i = 0; i < k; i++)
            currXor ^= arr[i];

        int maxXor = currXor;

        for(int i = k; i < n; i++) {
            currXor ^= arr[i - k];
            currXor ^= arr[i];
            maxXor = max(maxXor, currXor);
        }

        return maxXor;
    }
};
```

### Java

```java
class Solution {
    public int maxSubarrayXOR(int[] arr, int k) {

        int n = arr.length;

        int currXor = 0;

        for(int i = 0; i < k; i++)
            currXor ^= arr[i];

        int maxXor = currXor;

        for(int i = k; i < n; i++) {
            currXor ^= arr[i - k];
            currXor ^= arr[i];
            maxXor = Math.max(maxXor, currXor);
        }

        return maxXor;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxSubarrayXOR(arr, k) {

        let n = arr.length;

        let currXor = 0;

        for(let i = 0; i < k; i++)
            currXor ^= arr[i];

        let maxXor = currXor;

        for(let i = k; i < n; i++) {
            currXor ^= arr[i - k];
            currXor ^= arr[i];
            maxXor = Math.max(maxXor, currXor);
        }

        return maxXor;
    }
}
```

### Python3

```python
class Solution:
    def maxSubarrayXOR(self, arr, k):

        n = len(arr)

        curr_xor = 0

        for i in range(k):
            curr_xor ^= arr[i]

        max_xor = curr_xor

        for i in range(k, n):
            curr_xor ^= arr[i - k]
            curr_xor ^= arr[i]
            max_xor = max(max_xor, curr_xor)

        return max_xor
```

## Step-by-step Detailed Explanation

First we compute the XOR of the first window of size `k`.

Example

arr = [2,5,8,1,1,3]
k = 3

First window

2 ^ 5 ^ 8 = 15

This becomes our current XOR and maximum XOR.

Next we move the window one step to the right.

Window becomes

[5,8,1]

We remove the outgoing element 2

currentXor = 15 ^ 2

Then add the new element 1

currentXor = result ^ 1

Now this gives the XOR for the new window.

We compare this value with the maximum XOR and update if needed.

This process repeats for every step until the end of the array.

Because XOR allows quick removal and addition of elements, we do not need to recompute the XOR from scratch.

## Examples

Example 1

Input

arr = [2, 5, 8, 1, 1, 3]
k = 3

Output

15

Example 2

Input

arr = [1, 2, 4, 5, 6]
k = 2

Output

6

Explanation

The subarray [2,4] produces XOR 6 which is the maximum.

## How to use / Run locally

1. Copy the code for your preferred programming language.
2. Create a file such as `solution.cpp`, `Solution.java`, `solution.js`, or `solution.py`.
3. Paste the code into the file.
4. Compile and run using your language compiler.

Example C++

```
g++ solution.cpp
./a.out
```

Example Python

```
python solution.py
```

## Notes & Optimizations

* Sliding window allows constant time updates.
* XOR properties make removal and addition efficient.
* Avoid recomputing XOR for every subarray.
* This keeps the solution linear time even for very large arrays.

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
