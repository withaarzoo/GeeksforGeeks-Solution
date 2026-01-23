# Maximum People Visible in a Line

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

I am given an array where each value represents the height of a person standing in a straight line.

A person can see another person if:

* The other person is shorter
* There is **no person in between** who has height **greater than or equal** to the current person

Each person can look **both left and right**.

My task is to find the **maximum number of people** that **any single person** can see, including themselves.

---

## Constraints

* 1 ≤ arr.size ≤ 10⁴
* 1 ≤ arr[i] ≤ 10⁵

---

## Intuition

When I first looked at this problem, I realized one simple rule:

👉 **A person’s view stops when someone of equal or greater height appears.**

So for every person:

* I only need to know **how far I can see left**
* And **how far I can see right**
* Until someone blocks my view

If I know the nearest taller (or equal) person on both sides, I can easily count how many people are visible.

This immediately made me think about using a **monotonic stack**.

---

## Approach

1. I calculate the nearest person on the **right** with height `>= current`.
2. I calculate the nearest person on the **left** with height `>= current`.
3. I use a **stack** to do both in linear time.
4. For each person:

   * Visible on left = distance from left blocker
   * Visible on right = distance from right blocker
   * Total = left + right + self
5. I return the maximum value.

---

## Data Structures Used

* Stack (to track heights efficiently)
* Arrays (to store nearest greater elements)

---

## Operations & Behavior Summary

* Stack always maintains useful candidates only
* Each element is pushed and popped **once**
* No nested loops
* Works efficiently even for large input sizes

---

## Complexity

**Time Complexity:**
O(n)
Each person is processed once while pushing and popping from stack.

**Space Complexity:**
O(n)
Extra arrays and stack are used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int maxPeople(vector<int>& arr) {
        int n = arr.size();
        vector<int> left(n, -1), right(n, n);
        stack<int> st;

        for (int i = 0; i < n; i++) {
            while (!st.empty() && arr[i] >= arr[st.top()]) {
                right[st.top()] = i;
                st.pop();
            }
            st.push(i);
        }

        while (!st.empty()) st.pop();

        for (int i = 0; i < n; i++) {
            while (!st.empty() && arr[st.top()] < arr[i]) st.pop();
            if (!st.empty()) left[i] = st.top();
            st.push(i);
        }

        int ans = 0;
        for (int i = 0; i < n; i++) {
            ans = max(ans, right[i] - left[i] - 1);
        }
        return ans;
    }
};
```

---

### Java

```java
class Solution {
    public int maxPeople(int[] arr) {
        int n = arr.length;
        int[] left = new int[n];
        int[] right = new int[n];
        Arrays.fill(left, -1);
        Arrays.fill(right, n);

        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && arr[i] >= arr[st.peek()]) {
                right[st.pop()] = i;
            }
            st.push(i);
        }

        st.clear();

        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && arr[st.peek()] < arr[i]) st.pop();
            if (!st.isEmpty()) left[i] = st.peek();
            st.push(i);
        }

        int ans = 0;
        for (int i = 0; i < n; i++) {
            ans = Math.max(ans, right[i] - left[i] - 1);
        }
        return ans;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxPeople(arr) {
        const n = arr.length;
        const left = Array(n).fill(-1);
        const right = Array(n).fill(n);
        const st = [];

        for (let i = 0; i < n; i++) {
            while (st.length && arr[i] >= arr[st[st.length - 1]]) {
                right[st.pop()] = i;
            }
            st.push(i);
        }

        st.length = 0;

        for (let i = 0; i < n; i++) {
            while (st.length && arr[st[st.length - 1]] < arr[i]) st.pop();
            if (st.length) left[i] = st[st.length - 1];
            st.push(i);
        }

        let ans = 0;
        for (let i = 0; i < n; i++) {
            ans = Math.max(ans, right[i] - left[i] - 1);
        }
        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def maxPeople(self, arr):
        n = len(arr)
        left = [-1] * n
        right = [n] * n
        st = []

        for i in range(n):
            while st and arr[i] >= arr[st[-1]]:
                right[st.pop()] = i
            st.append(i)

        st.clear()

        for i in range(n):
            while st and arr[st[-1]] < arr[i]:
                st.pop()
            if st:
                left[i] = st[-1]
            st.append(i)

        ans = 0
        for i in range(n):
            ans = max(ans, right[i] - left[i] - 1)
        return ans
```

---

## Step-by-step Detailed Explanation

1. I scan from left to right to find the nearest taller person on the right.
2. I scan again to find the nearest taller person on the left.
3. I store both results.
4. For each index, I calculate:

   ```bash
   visible = right[i] - left[i] - 1
   ```

5. I keep track of the maximum visible count.

---

## Examples

**Input:**
`[6, 2, 5, 4, 5, 1, 6]`

**Output:**
`6`

**Explanation:**
The tallest person can see everyone except those blocked by equal height.

---

## How to use / Run locally

1. Clone the repository
2. Choose your preferred language folder
3. Compile and run using standard compiler

   * C++: `g++ file.cpp`
   * Java: `javac file.java`
   * JS: `node file.js`
   * Python: `python file.py`

---

## Notes & Optimizations

* Uses monotonic stack for best performance
* Avoids brute force O(n²)
* Works well for large inputs
* Clean and interview-ready solution

---

## Author

* **[Md Aarzoo Islam](https://bento.me/withaarzoo)**
