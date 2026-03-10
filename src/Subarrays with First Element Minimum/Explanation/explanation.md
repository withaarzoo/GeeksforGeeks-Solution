# Subarrays with First Element Minimum

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

Given an integer array `arr[]`, the task is to count the number of subarrays where the **first element of the subarray is the minimum element in that subarray**.

A subarray is considered valid if the first element is not greater than any other element inside that subarray.

Example:

arr = [1, 2, 1]

Valid subarrays:

[1]
[1,2]
[1,2,1]
[2]
[1]

Total = 5

---

## Constraints

1 ≤ arr.size() ≤ 4 * 10^4

1 ≤ arr[i] ≤ 10^5

---

## Intuition

When I first looked at the problem, I realized that every subarray starts from some index `i`. The first element of that subarray is `arr[i]`. For the subarray to be valid, every element after `i` must be **greater than or equal to `arr[i]`**.

So I asked myself one important question.

How far can I extend the subarray starting at index `i` before I encounter a smaller element?

If I encounter an element smaller than `arr[i]`, then the first element will no longer be the minimum. That means the subarray cannot extend beyond that point.

So the idea became simple:

Find the **next smaller element to the right** for every index.

If the next smaller element is at index `j`, then all subarrays ending before `j` are valid.

Number of valid subarrays starting at `i`:

j - i

If there is no smaller element on the right, the subarray can extend until the end of the array.

---

## Approach

1. Traverse the array from right to left.
2. Maintain a monotonic stack that stores indices.
3. The stack helps find the next smaller element quickly.
4. While the stack contains elements greater than or equal to the current element, remove them.
5. The top of the stack now represents the next smaller element.
6. If the stack is empty, the subarray can extend to the end of the array.
7. Otherwise, it can extend only until the index before the next smaller element.
8. Add this count to the final answer.
9. Push the current index onto the stack.

This ensures every element is pushed and popped at most once.

---

## Data Structures Used

Stack

The stack is used to maintain a monotonic increasing order of elements while scanning from right to left.

---

## Operations & Behavior Summary

Push

Used to store the current index into the stack.

Pop

Removes elements that are greater than or equal to the current element because they cannot be the next smaller element.

Peek

The top element of the stack gives the next smaller element.

---

## Complexity

Time Complexity: O(n)

Each element is pushed into the stack once and popped at most once.

Space Complexity: O(n)

The stack can store up to `n` indices in the worst case.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countSubarrays(vector<int> &arr) {
        int n = arr.size();
        stack<int> st;
        long long ans = 0;

        for(int i = n - 1; i >= 0; i--) {
            while(!st.empty() && arr[st.top()] >= arr[i]) {
                st.pop();
            }

            if(st.empty()) ans += (n - i);
            else ans += (st.top() - i);

            st.push(i);
        }

        return ans;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int countSubarrays(int[] arr) {
        int n = arr.length;
        Stack<Integer> stack = new Stack<>();
        long ans = 0;

        for(int i = n - 1; i >= 0; i--) {
            while(!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }

            if(stack.isEmpty()) ans += (n - i);
            else ans += (stack.peek() - i);

            stack.push(i);
        }

        return (int)ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    countSubarrays(arr) {
        let n = arr.length;
        let stack = [];
        let ans = 0;

        for(let i = n - 1; i >= 0; i--) {
            while(stack.length && arr[stack[stack.length - 1]] >= arr[i]) {
                stack.pop();
            }

            if(stack.length === 0) ans += (n - i);
            else ans += (stack[stack.length - 1] - i);

            stack.push(i);
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def countSubarrays(self, arr):
        n = len(arr)
        stack = []
        ans = 0

        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()

            if not stack:
                ans += (n - i)
            else:
                ans += (stack[-1] - i)

            stack.append(i)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Step 1

We start traversing the array from the right side.

This allows us to determine the next smaller element efficiently.

Step 2

Maintain a stack that keeps indices of elements.

The stack will maintain a monotonic increasing order.

Step 3

If the element at the top of the stack is greater than or equal to the current element, remove it.

These elements cannot be the next smaller element.

Step 4

If the stack becomes empty, it means there is no smaller element on the right.

So the number of valid subarrays starting from index `i` is:

n - i

Step 5

If the stack is not empty, the next smaller element exists.

So the valid subarrays are:

stackTopIndex - i

Step 6

Add this count to the total answer.

Step 7

Push the current index into the stack so that it may act as the next smaller element for elements to the left.

---

## Examples

Example 1

Input

arr = [1,2,1]

Output

5

Example 2

Input

arr = [1,3,5,2]

Output

8

---

## How to use / Run locally

Clone the repository

```
 git clone <repository-url>
```

Navigate to the project folder

```
 cd project-folder
```

Compile and run (C++)

```
 g++ solution.cpp
 ./a.out
```

---

## Notes & Optimizations

The naive approach would generate all subarrays which would take O(n^2) time.

Using a monotonic stack helps reduce the complexity to O(n).

This technique is commonly used in problems involving next smaller or next greater elements.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
