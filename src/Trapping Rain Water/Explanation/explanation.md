# Trapping Rain Water

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

Given an array `arr[]` of non-negative integers representing the height of blocks, and the width of each block is 1, we need to calculate how much rainwater can be trapped between the blocks.

Water can only be trapped when there are taller blocks on both sides.

---

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 0 ≤ arr[i] ≤ 10^3

---

## Intuition

When I first looked at this problem, I imagined buildings of different heights. If rain falls, water will collect in the gaps between taller buildings.

I realized one important thing: water trapped at any position depends on the tallest building on its left and the tallest building on its right.

For any index i:

water[i] = min(maxLeft, maxRight) - height[i]

If this value is positive, water is trapped. Otherwise, no water is trapped.

Instead of storing extra arrays for left and right maximums, I optimized it using the two-pointer technique to achieve constant space.

---

## Approach

1. Initialize two pointers: `left = 0` and `right = n - 1`.
2. Maintain two variables: `leftMax` and `rightMax`.
3. While `left < right`:

   * If `arr[left] < arr[right]`, process the left side.
   * Otherwise, process the right side.
4. Update maximums accordingly.
5. Add trapped water when current height is smaller than its boundary maximum.
6. Continue until pointers meet.
7. Return total trapped water.

---

## Data Structures Used

* Integer variables for tracking maximums.
* Two pointers for traversal.
* No extra arrays are used.

---

## Operations & Behavior Summary

* Compare heights at both ends.
* Move the pointer pointing to the smaller height.
* Update maximum boundaries.
* Calculate trapped water using boundary difference.
* Continue until both pointers meet.

---

## Complexity

Time Complexity: O(n)

* We traverse the array only once.
* n is the number of elements in the array.

Space Complexity: O(1)

* Only a few extra variables are used.
* No additional data structures are required.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxWater(vector<int> &arr) {
        int n = arr.size();
        if(n <= 2) return 0;
        
        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while(left < right) {
            if(arr[left] < arr[right]) {
                if(arr[left] >= leftMax) {
                    leftMax = arr[left];
                } else {
                    water += leftMax - arr[left];
                }
                left++;
            } else {
                if(arr[right] >= rightMax) {
                    rightMax = arr[right];
                } else {
                    water += rightMax - arr[right];
                }
                right--;
            }
        }
        
        return water;
    }
};
```

### Java

```java
class Solution {
    public int maxWater(int arr[]) {
        int n = arr.length;
        if(n <= 2) return 0;
        
        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while(left < right) {
            if(arr[left] < arr[right]) {
                if(arr[left] >= leftMax) {
                    leftMax = arr[left];
                } else {
                    water += leftMax - arr[left];
                }
                left++;
            } else {
                if(arr[right] >= rightMax) {
                    rightMax = arr[right];
                } else {
                    water += rightMax - arr[right];
                }
                right--;
            }
        }
        
        return water;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxWater(arr) {
        const n = arr.length;
        if (n <= 2) return 0;
        
        let left = 0;
        let right = n - 1;
        let leftMax = 0;
        let rightMax = 0;
        let water = 0;
        
        while (left < right) {
            if (arr[left] < arr[right]) {
                if (arr[left] >= leftMax) {
                    leftMax = arr[left];
                } else {
                    water += leftMax - arr[left];
                }
                left++;
            } else {
                if (arr[right] >= rightMax) {
                    rightMax = arr[right];
                } else {
                    water += rightMax - arr[right];
                }
                right--;
            }
        }
        
        return water;
    }
}
```

### Python3

```python
class Solution:
    def maxWater(self, arr):
        n = len(arr)
        if n <= 2:
            return 0
        
        left = 0
        right = n - 1
        leftMax = 0
        rightMax = 0
        water = 0
        
        while left < right:
            if arr[left] < arr[right]:
                if arr[left] >= leftMax:
                    leftMax = arr[left]
                else:
                    water += leftMax - arr[left]
                left += 1
            else:
                if arr[right] >= rightMax:
                    rightMax = arr[right]
                else:
                    water += rightMax - arr[right]
                right -= 1
        
        return water
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize two pointers at both ends of the array.
2. Maintain two variables to store maximum height seen so far from left and right.
3. Compare heights at both pointers.
4. Move the pointer pointing to the smaller height.
5. Update the corresponding maximum boundary.
6. If current height is smaller than boundary, add the difference to total water.
7. Continue until pointers meet.
8. Return the accumulated water.

This logic works the same in C++, Java, JavaScript, and Python.

---

## Examples

Input: [3, 0, 0, 2, 0, 4]
Output: 10

Input: [1, 2, 3, 4]
Output: 0

Input: [2, 1, 5, 3, 1, 0, 4]
Output: 9

---

## How to use / Run locally

C++:

* Compile using g++
* Run the executable

Java:

* Compile using javac
* Run using java Solution

JavaScript:

* Run using Node.js

Python3:

* Run using python3 filename.py

---

## Notes & Optimizations

* Two-pointer method reduces space complexity to O(1).
* More efficient than prefix and suffix arrays.
* Works efficiently for large constraints up to 10^5.
* Handles edge cases where array length is less than 3.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
