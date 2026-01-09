# Subarrays With At Most K Distinct Integers

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

You are given an array of positive integers and an integer k. Your task is to count how many subarrays exist such that the number of distinct integers in the subarray is at most k.

A subarray is a continuous part of the array.

## Constraints

* 1 ≤ array size ≤ 2 × 10⁴
* 1 ≤ k ≤ 2 × 10⁴
* 1 ≤ arr[i] ≤ 10⁹

## Intuition

When I first read the problem, I noticed two important keywords: subarrays and at most k distinct elements. Subarrays always hint toward sliding window problems. A brute force approach would be too slow because checking every subarray and counting distinct elements would take too much time.

So I thought about maintaining a window where the number of distinct elements is always valid. If I can keep such a window, I can count how many subarrays end at each index efficiently.

## Approach

I use the sliding window technique with two pointers.

I keep expanding the right pointer and add elements to a frequency map.

If the number of distinct elements becomes greater than k, I shrink the window from the left until it becomes valid again.

For every valid window, all subarrays ending at the current right index are valid. I count them using (right - left + 1).

This way, I can solve the problem in linear time.

## Data Structures Used

* Hash Map / Dictionary to store frequencies of elements in the current window
* Two pointers for sliding window

## Operations & Behavior Summary

* Expand window by moving right pointer
* Update frequency map
* Shrink window when distinct count exceeds k
* Count valid subarrays ending at each index

## Complexity

Time Complexity: O(n)
Each element is added and removed from the window at most once.

Space Complexity: O(k)
The frequency map stores at most k distinct elements.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countAtMostK(vector<int> &arr, int k) {
        if (k == 0) return 0;
        unordered_map<int, int> freq;
        int left = 0;
        long long ans = 0;

        for (int right = 0; right < arr.size(); right++) {
            freq[arr[right]]++;
            while (freq.size() > k) {
                freq[arr[left]]--;
                if (freq[arr[left]] == 0) freq.erase(arr[left]);
                left++;
            }
            ans += (right - left + 1);
        }
        return ans;
    }
};
```

### Java

```java
class Solution {
    public int countAtMostK(int arr[], int k) {
        if (k == 0) return 0;
        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        long ans = 0;

        for (int right = 0; right < arr.length; right++) {
            freq.put(arr[right], freq.getOrDefault(arr[right], 0) + 1);
            while (freq.size() > k) {
                freq.put(arr[left], freq.get(arr[left]) - 1);
                if (freq.get(arr[left]) == 0) freq.remove(arr[left]);
                left++;
            }
            ans += (right - left + 1);
        }
        return (int) ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    countAtMostK(arr, k) {
        if (k === 0) return 0;
        let freq = new Map();
        let left = 0;
        let ans = 0;

        for (let right = 0; right < arr.length; right++) {
            freq.set(arr[right], (freq.get(arr[right]) || 0) + 1);
            while (freq.size > k) {
                freq.set(arr[left], freq.get(arr[left]) - 1);
                if (freq.get(arr[left]) === 0) freq.delete(arr[left]);
                left++;
            }
            ans += (right - left + 1);
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def countAtMostK(self, arr, k):
        if k == 0:
            return 0
        freq = {}
        left = 0
        ans = 0

        for right in range(len(arr)):
            freq[arr[right]] = freq.get(arr[right], 0) + 1
            while len(freq) > k:
                freq[arr[left]] -= 1
                if freq[arr[left]] == 0:
                    del freq[arr[left]]
                left += 1
            ans += right - left + 1
        return ans
```

## Step-by-step Detailed Explanation

* Initialize left pointer, answer, and frequency map
* Move right pointer and add element to the map
* If distinct count exceeds k, move left pointer and adjust frequencies
* Once window is valid, count all subarrays ending at right
* Repeat until end of array

The same logic applies to all languages. Only syntax changes.

## Examples

Input: arr = [1, 2, 2, 3], k = 2
Output: 9

Input: arr = [1, 1, 1], k = 1
Output: 6

## How to use / Run locally

* Copy the solution code in your preferred language
* Compile and run using standard compiler or interpreter
* Call the countAtMostK function with your input array and k value

## Notes & Optimizations

* This approach avoids nested loops
* Works efficiently even for large inputs
* Can be extended to find subarrays with exactly k distinct elements

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
