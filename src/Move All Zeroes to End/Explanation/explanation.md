# Move All Zeroes to End

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

Given an array of non-negative integers, the task is to move all zeroes to the end of the array while maintaining the relative order of the non-zero elements.

The operation must be performed in-place, meaning no extra array should be used.

---

## Constraints

* 1 <= arr.size() <= 10^5
* 0 <= arr[i] <= 10^5

---

## Intuition

When I first looked at the problem, I understood two important things.

First, I must maintain the order of non-zero elements.
Second, I cannot use extra space.

So I thought instead of repeatedly swapping zeroes, why not focus only on placing non-zero elements correctly?

If I push all non-zero elements to the front in the same order, then the remaining positions can simply be filled with zeroes.

That makes the solution clean and efficient.

---

## Approach

1. Initialize a pointer called `index = 0`.
2. Traverse the array from left to right.
3. If the current element is not zero:

   * Place it at `arr[index]`
   * Increment `index`
4. After the traversal, fill remaining positions from `index` to end with zero.

This ensures order is preserved and everything is done in-place.

---

## Data Structures Used

* Only the input array
* One integer variable `index`

No extra array or additional data structure is used.

---

## Operations & Behavior Summary

* Traverse the array once
* Shift non-zero elements forward
* Fill remaining positions with zero
* Maintain relative order
* Perform operation in-place

---

## Complexity

**Time Complexity:** O(n)

Where `n` is the size of the array.
We traverse the array once to move non-zero elements and once more to fill zeros.
Overall complexity remains linear.

**Space Complexity:** O(1)

No additional space is used apart from a single pointer variable.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    void pushZerosToEnd(vector<int>& arr) {
        int n = arr.size();
        int index = 0;
        
        for(int i = 0; i < n; i++) {
            if(arr[i] != 0) {
                arr[index] = arr[i];
                index++;
            }
        }
        
        while(index < n) {
            arr[index] = 0;
            index++;
        }
    }
};
```

### Java

```java
class Solution {
    void pushZerosToEnd(int[] arr) {
        int n = arr.length;
        int index = 0;
        
        for(int i = 0; i < n; i++) {
            if(arr[i] != 0) {
                arr[index] = arr[i];
                index++;
            }
        }
        
        while(index < n) {
            arr[index] = 0;
            index++;
        }
    }
}
```

### JavaScript

```javascript
class Solution {
    pushZerosToEnd(arr) {
        let n = arr.length;
        let index = 0;
        
        for(let i = 0; i < n; i++) {
            if(arr[i] !== 0) {
                arr[index] = arr[i];
                index++;
            }
        }
        
        while(index < n) {
            arr[index] = 0;
            index++;
        }
    }
}
```

### Python3

```python
class Solution:
    def pushZerosToEnd(self, arr):
        n = len(arr)
        index = 0
        
        for i in range(n):
            if arr[i] != 0:
                arr[index] = arr[i]
                index += 1
        
        while index < n:
            arr[index] = 0
            index += 1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Step 1: Initialize `index = 0`

This pointer tells where the next non-zero element should be placed.

Step 2: Traverse the array

For every element:

* If it is non-zero, copy it to `arr[index]`
* Increment `index`

After this loop:

* Positions from `0` to `index - 1` contain all non-zero elements in correct order

Step 3: Fill remaining positions with zero

From `index` to `n - 1`, assign zero.

Now the array contains:

* All non-zero elements in original order
* All zeroes at the end

The same exact logic is implemented in all four languages.

---

## Examples

Example 1

Input:
[1, 2, 0, 4, 3, 0, 5, 0]

Output:
[1, 2, 4, 3, 5, 0, 0, 0]

Example 2

Input:
[10, 20, 30]

Output:
[10, 20, 30]

Example 3

Input:
[0, 0]

Output:
[0, 0]

---

## How to use / Run locally

C++

* Compile using g++
* Run the executable

Java

* Compile using javac
* Run using java

JavaScript

* Run using Node.js

Python

* Run using python3

Provide input array and call the function inside main method or driver code as required by your environment.

---

## Notes & Optimizations

* This is the optimal solution with O(n) time.
* No swapping is required.
* Works efficiently for large constraints up to 10^5.
* Maintains stable ordering of non-zero elements.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
