# Longest Subarray with Majority Greater than K

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

Given an array arr[] and an integer k, the task is to find the length of the longest subarray in which the count of elements greater than k is strictly more than the count of elements less than or equal to k.

In simple words, inside the subarray:

count(> k) > count(<= k)

We need to return the maximum possible length of such a subarray.

---

## Constraints

* 1 <= arr.size() <= 10^6
* 1 <= arr[i] <= 10^6
* 0 <= k <= 10^6

The solution must be efficient because the input size can be very large.

---

## Intuition

When I first saw the problem, I realized that comparing two counts inside every subarray directly would be too slow.

So I simplified the condition.

If an element is greater than k, I treat it as +1.
If an element is less than or equal to k, I treat it as -1.

Now the condition becomes:

Find the longest subarray whose sum is greater than 0.

Because:

sum = count(>k) - count(<=k)

If sum > 0, then count(>k) is greater.

Now the problem becomes much easier and can be solved using prefix sum and hashing.

---

## Approach

1. Traverse the array once.
2. Convert each element:

   * If arr[i] > k, add +1 to prefix sum.
   * Else, add -1.
3. Maintain a running prefix sum.
4. If prefix sum becomes positive at index i, then subarray from 0 to i is valid.
5. Store the first occurrence of each prefix sum in a hashmap.
6. If prefixSum - 1 exists earlier, it means we found a valid positive subarray.
7. Keep updating the maximum length.

This ensures we solve the problem in linear time.

---

## Data Structures Used

* Integer variable for prefix sum
* HashMap / unordered_map / Map / dictionary to store first occurrence of prefix sums

---

## Operations & Behavior Summary

* Transform elements into +1 and -1
* Maintain cumulative sum
* Check for positive prefix
* Use hashmap to track earliest occurrence
* Update maximum length dynamically

---

## Complexity

Time Complexity: O(n)
We traverse the array only once.

Space Complexity: O(n)
We store prefix sums in a hashmap in the worst case.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int longestSubarray(vector<int> &arr, int k) {
        unordered_map<int, int> mp;
        int prefixSum = 0;
        int maxLen = 0;
        
        for(int i = 0; i < arr.size(); i++) {
            if(arr[i] > k)
                prefixSum += 1;
            else
                prefixSum -= 1;
            
            if(prefixSum > 0) {
                maxLen = i + 1;
            } else {
                if(mp.find(prefixSum) == mp.end())
                    mp[prefixSum] = i;
                
                if(mp.find(prefixSum - 1) != mp.end())
                    maxLen = max(maxLen, i - mp[prefixSum - 1]);
            }
        }
        return maxLen;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int longestSubarray(int[] arr, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int prefixSum = 0;
        int maxLen = 0;
        
        for(int i = 0; i < arr.length; i++) {
            if(arr[i] > k)
                prefixSum += 1;
            else
                prefixSum -= 1;
            
            if(prefixSum > 0) {
                maxLen = i + 1;
            } else {
                if(!map.containsKey(prefixSum))
                    map.put(prefixSum, i);
                
                if(map.containsKey(prefixSum - 1))
                    maxLen = Math.max(maxLen, i - map.get(prefixSum - 1));
            }
        }
        return maxLen;
    }
}
```

### JavaScript

```javascript
class Solution {
    longestSubarray(arr, k) {
        let map = new Map();
        let prefixSum = 0;
        let maxLen = 0;
        
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] > k)
                prefixSum += 1;
            else
                prefixSum -= 1;
            
            if(prefixSum > 0) {
                maxLen = i + 1;
            } else {
                if(!map.has(prefixSum))
                    map.set(prefixSum, i);
                
                if(map.has(prefixSum - 1))
                    maxLen = Math.max(maxLen, i - map.get(prefixSum - 1));
            }
        }
        return maxLen;
    }
}
```

### Python3

```python
class Solution:
    def longestSubarray(self, arr, k):
        prefix_sum = 0
        max_len = 0
        mp = {}
        
        for i in range(len(arr)):
            if arr[i] > k:
                prefix_sum += 1
            else:
                prefix_sum -= 1
            
            if prefix_sum > 0:
                max_len = i + 1
            else:
                if prefix_sum not in mp:
                    mp[prefix_sum] = i
                
                if (prefix_sum - 1) in mp:
                    max_len = max(max_len, i - mp[prefix_sum - 1])
        
        return max_len
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize prefixSum = 0 and maxLen = 0.
2. Traverse the array from left to right.
3. Convert element to +1 if greater than k, else -1.
4. Add it to prefixSum.
5. If prefixSum becomes positive, update maxLen to i + 1.
6. If prefixSum is not positive:

   * Store its first occurrence if not already stored.
   * Check if prefixSum - 1 exists in map.
   * If yes, compute length and update maxLen.
7. After full traversal, return maxLen.

This logic is identical in all four languages. Only syntax changes.

---

## Examples

Input:
arr = [1, 2, 3, 4, 1]
k = 2

Output:
3

Explanation:
Subarray [2, 3, 4] or [3, 4, 1] satisfies the condition.

---

Input:
arr = [6, 5, 3, 4]
k = 2

Output:
4

Explanation:
All elements are greater than 2.

---

## How to use / Run locally

C++

* Compile using g++ filename.cpp
* Run using ./a.out

Java

* Compile using javac Solution.java
* Run using java Solution

JavaScript

* Run using node filename.js

Python

* Run using python filename.py

---

## Notes & Optimizations

* We store only the first occurrence of prefix sum to maximize length.
* The solution works in linear time and handles large constraints.
* No nested loops are used.
* Suitable for competitive programming.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
