# Check if an Array is Max Heap

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

This problem is about checking whether a given array represents a valid max heap.

You are given an integer array. This array is considered as the level-order traversal of a binary tree. Your task is to verify if this tree satisfies the max heap property.

In a max heap:

* Every parent node must be greater than or equal to its children

So basically, you need to check if for every index in the array, the parent value is not smaller than its left and right child values.

Return true if it satisfies the max heap condition, otherwise return false.

This is a very common heap validation problem in data structures and algorithms.

## Constraints

* 1 ≤ n ≤ 10^5
* 1 ≤ arr[i] ≤ 10^5

## Intuition

When I first saw the problem, I noticed that the array is given in level-order form. That immediately reminded me of how heaps are stored in arrays.

In an array-based binary heap:

* Left child → 2*i + 1
* Right child → 2*i + 2

So I realized I don’t need to build the tree at all. I can directly check the heap property using index calculations.

If at any point a parent is smaller than one of its children, the array cannot represent a max heap.

## Approach

I go through the array and treat each element as a parent node.

For each index i:

* I calculate the left child index as 2*i + 1
* I calculate the right child index as 2*i + 2

Then I check:

* If the left child exists and is greater than the parent → return false
* If the right child exists and is greater than the parent → return false

If none of the nodes violate the max heap property, then the array is valid.

One important optimization:
I only need to check up to index (n/2 - 1), because all elements after that are leaf nodes and have no children.

## Data Structures Used

Array
The input itself is the array representation of a binary heap. No extra data structure is needed. This keeps the space usage minimal.

## Operations & Behavior Summary

* Start from index 0 (root of heap)
* For each index:

  * Compute left and right child indices
  * Check if children are within bounds
  * Compare parent with children
* If any violation is found → stop immediately and return false
* If loop completes → return true

## Complexity

| Type             | Complexity | Explanation                                                    |
| ---------------- | ---------- | -------------------------------------------------------------- |
| Time Complexity  | O(n)       | I traverse each non-leaf node once. n is the size of the array |
| Space Complexity | O(1)       | No extra space is used apart from variables                    |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isMaxHeap(vector<int> &arr) {
        int n = arr.size(); // total number of elements
        
        // Only need to check non-leaf nodes (0 to n/2 - 1)
        for(int i = 0; i <= (n/2) - 1; i++) {
            
            int left = 2*i + 1;   // left child index
            int right = 2*i + 2;  // right child index
            
            // Check left child
            if(left < n && arr[i] < arr[left]) {
                return false; // violates max heap property
            }
            
            // Check right child
            if(right < n && arr[i] < arr[right]) {
                return false; // violates max heap property
            }
        }
        
        return true; // all checks passed
    }
};
```

### Java

```java
class Solution {
    public boolean isMaxHeap(int[] arr) {
        int n = arr.length; // total elements
        
        // Only iterate over non-leaf nodes
        for(int i = 0; i <= (n/2) - 1; i++) {
            
            int left = 2*i + 1;   // left child
            int right = 2*i + 2;  // right child
            
            // Check left child
            if(left < n && arr[i] < arr[left]) {
                return false;
            }
            
            // Check right child
            if(right < n && arr[i] < arr[right]) {
                return false;
            }
        }
        
        return true; // valid max heap
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    isMaxHeap(arr) {
        let n = arr.length; // total elements
        
        // Loop through non-leaf nodes
        for(let i = 0; i <= Math.floor(n/2) - 1; i++) {
            
            let left = 2*i + 1;   // left child index
            let right = 2*i + 2;  // right child index
            
            // Check left child
            if(left < n && arr[i] < arr[left]) {
                return false;
            }
            
            // Check right child
            if(right < n && arr[i] < arr[right]) {
                return false;
            }
        }
        
        return true; // valid max heap
    }
}
```

### Python3

```python
class Solution:
    def isMaxHeap(self, arr):
        n = len(arr)  # total number of elements
        
        # Check only non-leaf nodes
        for i in range((n // 2)):
            
            left = 2*i + 1   # left child index
            right = 2*i + 2  # right child index
            
            # Check left child
            if left < n and arr[i] < arr[left]:
                return False
            
            # Check right child
            if right < n and arr[i] < arr[right]:
                return False
        
        return True  # valid max heap
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in all four languages. Only syntax changes.

First, I calculate the size of the array.

Then I run a loop from index 0 to n/2 - 1.
This is because:

* Nodes beyond this range are leaf nodes
* Leaf nodes don’t have children, so no need to check them

Inside the loop:

* I compute left = 2*i + 1
* I compute right = 2*i + 2

Then I check:

* If left index is valid and arr[i] < arr[left], I return false
* If right index is valid and arr[i] < arr[right], I return false

I always check bounds before accessing the array to avoid runtime errors.

If the loop finishes without returning false, that means every parent satisfies the max heap condition.

So I return true at the end.

## Examples

Example 1
Input: arr = [90, 15, 10, 7, 12, 2]
Output: true

Explanation:
90 is greater than 15 and 10
15 is greater than 7 and 12
10 is greater than 2
All parent-child relationships are valid

Example 2
Input: arr = [9, 15, 10, 7, 12, 11]
Output: false

Explanation:
9 is smaller than 15 → violates max heap rule

Example 3
Input: arr = [50, 30, 40, 10, 5, 20]
Output: true

Explanation:
All parent nodes are greater than their children

## How to Use / Run Locally

C++

* Install g++
* Save file as solution.cpp
* Compile: g++ solution.cpp -o output
* Run: ./output

Java

* Install JDK
* Save file as Solution.java
* Compile: javac Solution.java
* Run: java Solution

JavaScript

* Install Node.js
* Save file as solution.js
* Run: node solution.js

Python3

* Install Python 3
* Save file as solution.py
* Run: python solution.py

## Notes & Optimizations

* Only checking up to n/2 improves efficiency
* Always check index bounds before accessing child nodes
* This is an in-place check, no extra memory required
* Building an actual tree is unnecessary and slower
* Works for large inputs up to 10^5 efficiently

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
