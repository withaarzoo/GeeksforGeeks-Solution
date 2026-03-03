# Longest Subarray with At Most Two Distinct Integers

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given an array of positive integers, the task is to find the length of the longest subarray that contains at most two distinct integers.

A subarray must be contiguous. The goal is to maximize its length while ensuring that no more than two unique numbers exist inside it.

---

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 1 ≤ arr[i] ≤ 10^5

---

## Intuition

When I read this problem, I immediately noticed two important things:

1. The subarray must be continuous.
2. We are allowed at most two distinct integers.

Whenever I see a problem asking for the longest subarray under a restriction, I think about the Sliding Window technique.

Instead of checking every possible subarray, which would be very slow, I can maintain a window and adjust it dynamically.

If the number of distinct integers becomes more than two, I shrink the window from the left.

This way, I can solve the problem efficiently in linear time.

---

## Approach

1. Use two pointers: left and right.
2. Maintain a frequency map to store counts of elements inside the window.
3. Expand the right pointer one step at a time.
4. Add the current element to the frequency map.
5. If the number of distinct elements becomes greater than 2:

   * Move the left pointer forward.
   * Reduce frequency of elements.
   * Remove elements whose frequency becomes zero.
6. After adjusting the window, update the maximum length.
7. Continue until the right pointer reaches the end of the array.

---

## Data Structures Used

* HashMap / unordered_map / Map / Dictionary

  * Used to store element frequencies.
* Two pointers (left and right)

  * Used to manage the sliding window.

---

## Operations & Behavior Summary

* Each element is added to the window once.
* Each element is removed from the window at most once.
* The window dynamically adjusts to maintain at most two distinct integers.
* Maximum length is updated during each valid window expansion.

---

## Complexity

Time Complexity: O(n)

* Each element is visited at most twice.
* n is the size of the array.

Space Complexity: O(1)

* The frequency map stores at most 3 elements temporarily.
* Since this number is constant, space complexity is constant.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int totalElements(vector<int> &arr) {
        unordered_map<int, int> freq;
        int left = 0;
        int maxLen = 0;
        
        for (int right = 0; right < arr.size(); right++) {
            freq[arr[right]]++;
            
            while (freq.size() > 2) {
                freq[arr[left]]--;
                if (freq[arr[left]] == 0) {
                    freq.erase(arr[left]);
                }
                left++;
            }
            
            maxLen = max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int totalElements(int[] arr) {
        HashMap<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        int maxLen = 0;
        
        for (int right = 0; right < arr.length; right++) {
            freq.put(arr[right], freq.getOrDefault(arr[right], 0) + 1);
            
            while (freq.size() > 2) {
                freq.put(arr[left], freq.get(arr[left]) - 1);
                if (freq.get(arr[left]) == 0) {
                    freq.remove(arr[left]);
                }
                left++;
            }
            
            maxLen = Math.max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
}
```

### JavaScript

```javascript
class Solution {
    totalElements(arr) {
        let freq = new Map();
        let left = 0;
        let maxLen = 0;
        
        for (let right = 0; right < arr.length; right++) {
            freq.set(arr[right], (freq.get(arr[right]) || 0) + 1);
            
            while (freq.size > 2) {
                freq.set(arr[left], freq.get(arr[left]) - 1);
                if (freq.get(arr[left]) === 0) {
                    freq.delete(arr[left]);
                }
                left++;
            }
            
            maxLen = Math.max(maxLen, right - left + 1);
        }
        
        return maxLen;
    }
}
```

### Python3

```python
class Solution:
    def totalElements(self, arr):
        freq = {}
        left = 0
        maxLen = 0
        
        for right in range(len(arr)):
            freq[arr[right]] = freq.get(arr[right], 0) + 1
            
            while len(freq) > 2:
                freq[arr[left]] -= 1
                if freq[arr[left]] == 0:
                    del freq[arr[left]]
                left += 1
            
            maxLen = max(maxLen, right - left + 1)
        
        return maxLen
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize a frequency map to store element counts.
2. Set left pointer to 0.
3. Start iterating with right pointer from 0 to n-1.
4. Add arr[right] to the map.
5. If map size becomes greater than 2:

   * Reduce frequency of arr[left].
   * Remove it if frequency becomes zero.
   * Move left pointer forward.
6. Calculate current window length as right - left + 1.
7. Update maximum length.
8. Continue until the loop ends.

This logic remains identical across all languages. Only syntax changes.

---

## Examples

Input:
arr = [2, 1, 2]
Output:
3

Input:
arr = [3, 1, 2, 2, 2, 2]
Output:
5

---

## How to use / Run locally

C++:

* Compile using g++ filename.cpp
* Run using ./a.out

Java:

* Compile using javac Solution.java
* Run using java Solution

JavaScript:

* Run using node filename.js

Python3:

* Run using python filename.py

---

## Notes & Optimizations

* Brute force approach would take O(n^2).
* Sliding window reduces it to O(n).
* This pattern works for similar problems like longest substring with K distinct characters.
* Always shrink the window only when constraint breaks.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
