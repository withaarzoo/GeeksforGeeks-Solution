# Sum of Subarray Ranges

---

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

I am given an integer array `arr`.

For every possible **subarray**, I calculate its **range**.

Range of a subarray is defined as:

```bash
maximum element − minimum element
```

My task is to return the **sum of ranges of all possible subarrays**.

---

## Constraints

* `1 ≤ arr.size ≤ 10^6`
* `-10^9 ≤ arr[i] ≤ 10^9`
* Final answer always fits in a **32-bit integer**

---

## Intuition

When I first looked at the problem, the brute force idea came to my mind.

I could generate all subarrays and calculate max and min for each one.

But that approach is **too slow** because the number of subarrays is `O(n²)`.

So I thought differently.

Instead of finding range for every subarray,
I decided to calculate:

```bash
Total contribution of all maximums
−
Total contribution of all minimums
```

If I can calculate these two values efficiently,
the problem becomes very easy.

---

## Approach

I solved this problem using **monotonic stacks**.

### Main idea

For each element `arr[i]`, I calculate:

* How many subarrays where `arr[i]` is the **maximum**
* How many subarrays where `arr[i]` is the **minimum**

Then:

```bash
answer = totalMaxContribution − totalMinContribution
```

### How I do this

For maximum contribution:

* Find Previous Greater Element
* Find Next Greater Element

For minimum contribution:

* Find Previous Smaller Element
* Find Next Smaller Element

Each element’s contribution is calculated using:

```bash
value × leftCount × rightCount
```

---

## Data Structures Used

* Stack
* Arrays (for left and right span calculation)

---

## Operations & Behavior Summary

* Each element is pushed and popped from stack only once
* No nested loops
* Pure linear traversal
* Efficient for large input size

---

## Complexity

* **Time Complexity:** `O(n)`
  Each element is processed a constant number of times.

* **Space Complexity:** `O(n)`
  Stack and helper arrays are used.

---

## Multi-language Solutions

---

### C++

```cpp
class Solution {
  public:
    int subarrayRanges(vector<int>& arr) {
        int n = arr.size();
        long long maxSum = 0, minSum = 0;
        vector<int> left(n), right(n);
        stack<int> st;

        // Maximum contribution
        for (int i = 0; i < n; i++) {
            while (!st.empty() && arr[st.top()] <= arr[i]) st.pop();
            left[i] = st.empty() ? i + 1 : i - st.top();
            st.push(i);
        }

        while (!st.empty()) st.pop();
        for (int i = n - 1; i >= 0; i--) {
            while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
            right[i] = st.empty() ? n - i : st.top() - i;
            st.push(i);
        }

        for (int i = 0; i < n; i++)
            maxSum += (long long) arr[i] * left[i] * right[i];

        // Minimum contribution
        while (!st.empty()) st.pop();
        for (int i = 0; i < n; i++) {
            while (!st.empty() && arr[st.top()] >= arr[i]) st.pop();
            left[i] = st.empty() ? i + 1 : i - st.top();
            st.push(i);
        }

        while (!st.empty()) st.pop();
        for (int i = n - 1; i >= 0; i--) {
            while (!st.empty() && arr[st.top()] > arr[i]) st.pop();
            right[i] = st.empty() ? n - i : st.top() - i;
            st.push(i);
        }

        for (int i = 0; i < n; i++)
            minSum += (long long) arr[i] * left[i] * right[i];

        return maxSum - minSum;
    }
};
```

---

### Java

```java
class Solution {
    public int subarrayRanges(int[] arr) {
        int n = arr.length;
        long maxSum = 0, minSum = 0;
        int[] left = new int[n];
        int[] right = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && arr[st.peek()] <= arr[i]) st.pop();
            left[i] = st.isEmpty() ? i + 1 : i - st.peek();
            st.push(i);
        }

        st.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && arr[st.peek()] < arr[i]) st.pop();
            right[i] = st.isEmpty() ? n - i : st.peek() - i;
            st.push(i);
        }

        for (int i = 0; i < n; i++)
            maxSum += (long) arr[i] * left[i] * right[i];

        st.clear();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && arr[st.peek()] >= arr[i]) st.pop();
            left[i] = st.isEmpty() ? i + 1 : i - st.peek();
            st.push(i);
        }

        st.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && arr[st.peek()] > arr[i]) st.pop();
            right[i] = st.isEmpty() ? n - i : st.peek() - i;
            st.push(i);
        }

        for (int i = 0; i < n; i++)
            minSum += (long) arr[i] * left[i] * right[i];

        return (int)(maxSum - minSum);
    }
}
```

---

### JavaScript

```javascript
class Solution {
    subarrayRanges(arr) {
        const n = arr.length;
        let maxSum = 0, minSum = 0;
        let left = Array(n), right = Array(n);
        let st = [];

        for (let i = 0; i < n; i++) {
            while (st.length && arr[st.at(-1)] <= arr[i]) st.pop();
            left[i] = st.length === 0 ? i + 1 : i - st.at(-1);
            st.push(i);
        }

        st = [];
        for (let i = n - 1; i >= 0; i--) {
            while (st.length && arr[st.at(-1)] < arr[i]) st.pop();
            right[i] = st.length === 0 ? n - i : st.at(-1) - i;
            st.push(i);
        }

        for (let i = 0; i < n; i++)
            maxSum += arr[i] * left[i] * right[i];

        st = [];
        for (let i = 0; i < n; i++) {
            while (st.length && arr[st.at(-1)] >= arr[i]) st.pop();
            left[i] = st.length === 0 ? i + 1 : i - st.at(-1);
            st.push(i);
        }

        st = [];
        for (let i = n - 1; i >= 0; i--) {
            while (st.length && arr[st.at(-1)] > arr[i]) st.pop();
            right[i] = st.length === 0 ? n - i : st.at(-1) - i;
            st.push(i);
        }

        for (let i = 0; i < n; i++)
            minSum += arr[i] * left[i] * right[i];

        return maxSum - minSum;
    }
}
```

---

### Python3

```python
class Solution:
    def subarrayRanges(self, arr):
        n = len(arr)
        max_sum = min_sum = 0
        left = [0] * n
        right = [0] * n
        stack = []

        for i in range(n):
            while stack and arr[stack[-1]] <= arr[i]:
                stack.pop()
            left[i] = i + 1 if not stack else i - stack[-1]
            stack.append(i)

        stack.clear()
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] < arr[i]:
                stack.pop()
            right[i] = n - i if not stack else stack[-1] - i
            stack.append(i)

        for i in range(n):
            max_sum += arr[i] * left[i] * right[i]

        stack.clear()
        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()
            left[i] = i + 1 if not stack else i - stack[-1]
            stack.append(i)

        stack.clear()
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()
            right[i] = n - i if not stack else stack[-1] - i
            stack.append(i)

        for i in range(n):
            min_sum += arr[i] * left[i] * right[i]

        return max_sum - min_sum
```

---

## Step-by-step Detailed Explanation

1. I break the problem into two parts
   maximum contribution and minimum contribution

2. I use a stack to find nearest greater or smaller elements

3. Each element’s contribution depends on how many subarrays it can dominate

4. I multiply value with left span and right span

5. Final answer is the difference of both sums

---

## Examples

**Input:**
`[1, 2, 3]`

**Output:**
`4`

**Explanation:**
All subarray ranges added together give `4`

---

## How to use / Run locally

1. Copy the code for your preferred language
2. Compile and run using standard compiler or interpreter
3. Call `subarrayRanges(arr)` with input array

---

## Notes & Optimizations

* Brute force `O(n²)` solution will TLE
* Monotonic stack reduces complexity to `O(n)`
* Works efficiently for very large arrays

---

## Author

* **Md Aarzoo Islam**
  *[https://bento.me/withaarzoo](https://bento.me/withaarzoo)*
