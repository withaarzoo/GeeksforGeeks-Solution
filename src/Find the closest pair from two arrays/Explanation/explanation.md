# Problem Title

Find the Closest Pair from Two Sorted Arrays

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

Given two sorted arrays arr1[] and arr2[] and a number x, the task is to find one pair such that the sum of elements (one element from each array) is closest to x.

If multiple pairs have the same minimum difference, we can return any one of them.

## Constraints

1 <= arr1.size(), arr2.size() <= 10^5
1 <= arr1[i], arr2[i] <= 10^9
1 <= x <= 10^9

## Intuition

When I first looked at the problem, I noticed that both arrays are already sorted. That is a very important hint.

If the arrays were not sorted, I might have checked all possible pairs. But that would take O(n * m) time, which is too slow.

Since both arrays are sorted, I thought about using the two-pointer technique. One pointer starts from the beginning of the first array and the other starts from the end of the second array.

This way, I can increase or decrease the sum intelligently and find the closest pair in linear time.

## Approach

1. Start pointer i at index 0 of arr1.
2. Start pointer j at index m - 1 of arr2.
3. Keep track of the minimum difference found so far.
4. While i < n and j >= 0:

   * Calculate sum = arr1[i] + arr2[j]
   * Calculate difference = abs(sum - x)
   * Update answer if this difference is smaller
   * If sum > x, move j left to decrease sum
   * Else move i right to increase sum
5. Return the best pair found.

## Data Structures Used

* Two pointers (integer variables)
* Simple variables to store minimum difference and result pair

No extra data structures like hash maps or extra arrays are used.

## Operations & Behavior Summary

* Compare current sum with target x
* Update best pair if current difference is smaller
* Move pointers intelligently based on comparison
* Stop when any pointer goes out of range

## Complexity

Time Complexity: O(n + m)
Each pointer moves at most once through its array.

Space Complexity: O(1)
Only constant extra variables are used.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> findClosestPair(vector<int> &arr1, vector<int> &arr2, int x) {
        int n = arr1.size();
        int m = arr2.size();
        
        int i = 0;
        int j = m - 1;
        
        int minDiff = INT_MAX;
        int bestA = 0, bestB = 0;
        
        while (i < n && j >= 0) {
            int sum = arr1[i] + arr2[j];
            int diff = abs(sum - x);
            
            if (diff < minDiff) {
                minDiff = diff;
                bestA = arr1[i];
                bestB = arr2[j];
            }
            
            if (sum > x) {
                j--;
            } else {
                i++;
            }
        }
        
        return {bestA, bestB};
    }
};
```

### Java

```java
class Solution {
    public static ArrayList<Integer> findClosestPair(int arr1[], int arr2[], int x) {
        int n = arr1.length;
        int m = arr2.length;
        
        int i = 0;
        int j = m - 1;
        
        int minDiff = Integer.MAX_VALUE;
        int bestA = 0, bestB = 0;
        
        while (i < n && j >= 0) {
            int sum = arr1[i] + arr2[j];
            int diff = Math.abs(sum - x);
            
            if (diff < minDiff) {
                minDiff = diff;
                bestA = arr1[i];
                bestB = arr2[j];
            }
            
            if (sum > x) {
                j--;
            } else {
                i++;
            }
        }
        
        ArrayList<Integer> result = new ArrayList<>();
        result.add(bestA);
        result.add(bestB);
        return result;
    }
}
```

### JavaScript

```javascript
class Solution {
    findClosestPair(arr1, arr2, x) {
        let n = arr1.length;
        let m = arr2.length;
        
        let i = 0;
        let j = m - 1;
        
        let minDiff = Number.MAX_SAFE_INTEGER;
        let bestA = 0, bestB = 0;
        
        while (i < n && j >= 0) {
            let sum = arr1[i] + arr2[j];
            let diff = Math.abs(sum - x);
            
            if (diff < minDiff) {
                minDiff = diff;
                bestA = arr1[i];
                bestB = arr2[j];
            }
            
            if (sum > x) {
                j--;
            } else {
                i++;
            }
        }
        
        return [bestA, bestB];
    }
}
```

### Python3

```python
class Solution:
    def findClosestPair(arr1, arr2, x):
        n = len(arr1)
        m = len(arr2)
        
        i = 0
        j = m - 1
        
        minDiff = float('inf')
        bestA = 0
        bestB = 0
        
        while i < n and j >= 0:
            curr_sum = arr1[i] + arr2[j]
            diff = abs(curr_sum - x)
            
            if diff < minDiff:
                minDiff = diff
                bestA = arr1[i]
                bestB = arr2[j]
            
            if curr_sum > x:
                j -= 1
            else:
                i += 1
        
        return [bestA, bestB]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize two pointers:

   * i = 0 for arr1
   * j = m - 1 for arr2

2. Initialize minDiff with a very large value.

3. Loop while i < n and j >= 0.

4. Calculate current sum using arr1[i] and arr2[j].

5. Compute absolute difference between sum and x.

6. If this difference is smaller than previous minimum, update:

   * minDiff
   * best pair

7. If sum is greater than x, move j left because we need a smaller sum.

8. If sum is less than or equal to x, move i right because we need a larger sum.

9. Continue until one pointer goes out of range.

10. Return the stored best pair.

This logic works because arrays are sorted and we adjust pointers in a way that always moves toward a better solution.

## Examples

Example 1
Input: arr1 = [1, 4, 5, 7], arr2 = [10, 20, 30, 40], x = 32
Output: [1, 30]

Example 2
Input: arr1 = [1, 4, 5, 7], arr2 = [10, 20, 30, 40], x = 50
Output: [7, 40]

## How to use / Run locally

C++

* Compile using g++ file.cpp
* Run using ./a.out

Java

* Compile using javac Solution.java
* Run using java Solution

JavaScript

* Run using node file.js

Python

* Run using python file.py

## Notes & Optimizations

* This solution works only because arrays are sorted.
* If arrays were not sorted, we would need sorting first.
* Sorting would increase time complexity to O(n log n + m log m).
* Two-pointer technique ensures linear traversal.

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
