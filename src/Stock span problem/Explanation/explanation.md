# Stock Span Problem

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
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an array of daily stock prices.
For each day, I need to calculate the **stock span**.

The stock span of a day is the number of **consecutive days (including today)** for which the stock price was **less than or equal** to today’s price.

The output should be an array where each index stores the span for that day.

---

## Constraints

* 1 ≤ size of array ≤ 10⁵
* 1 ≤ stock price ≤ 10⁵

These constraints tell me that a **brute-force solution will be too slow**, so I must optimize.

---

## Intuition

When I first thought about this problem, my idea was simple.

For every day, I look backward and count how many days had a smaller or equal price.

But then I realized:
If I do this for every element, the solution becomes **O(n²)**, which will not work for large inputs.

So I thought:
“I need a way to skip unnecessary comparisons.”

That’s when I decided to use a **stack** to remember useful previous days only.

---

## Approach

I use a **monotonic decreasing stack**.

Here’s how I solve it:

1. I traverse the stock prices from left to right.
2. I keep a stack that stores **indices of days**.
3. The stack always keeps prices in **decreasing order**.
4. For each day:

   * I pop all previous days from the stack whose price is **less than or equal** to today’s price.
   * If the stack becomes empty, the span is `current index + 1`.
   * Otherwise, the span is the difference between current index and stack top index.
5. I push the current day index into the stack.
6. I repeat this for all days.

Each index is pushed and popped only once.

---

## Data Structures Used

* Stack
  Used to store indices of stock prices and maintain decreasing order.

* Array / List
  Used to store the final span result.

---

## Operations & Behavior Summary

* Push index into stack when it can help future days.
* Pop index when it can no longer affect span calculation.
* Stack always represents **previous greater prices**.

---

## Complexity

**Time Complexity:** O(n)

* `n` is the number of days
* Each index is pushed and popped once

**Space Complexity:** O(n)

* Extra stack is used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> calculateSpan(vector<int>& arr) {
        int n = arr.size();
        vector<int> span(n);
        stack<int> st;

        for (int i = 0; i < n; i++) {
            while (!st.empty() && arr[st.top()] <= arr[i]) {
                st.pop();
            }

            span[i] = st.empty() ? (i + 1) : (i - st.top());
            st.push(i);
        }

        return span;
    }
};
```

---

### Java

```java
class Solution {
    public ArrayList<Integer> calculateSpan(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> span = new ArrayList<>();
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && arr[st.peek()] <= arr[i]) {
                st.pop();
            }

            if (st.isEmpty()) {
                span.add(i + 1);
            } else {
                span.add(i - st.peek());
            }

            st.push(i);
        }

        return span;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    calculateSpan(arr) {
        const n = arr.length;
        const span = new Array(n);
        const stack = [];

        for (let i = 0; i < n; i++) {
            while (stack.length && arr[stack[stack.length - 1]] <= arr[i]) {
                stack.pop();
            }

            span[i] = stack.length === 0 ? (i + 1) : (i - stack[stack.length - 1]);
            stack.push(i);
        }

        return span;
    }
}
```

---

### Python3

```python
class Solution:
    def calculateSpan(self, arr):
        n = len(arr)
        span = [0] * n
        stack = []

        for i in range(n):
            while stack and arr[stack[-1]] <= arr[i]:
                stack.pop()

            if not stack:
                span[i] = i + 1
            else:
                span[i] = i - stack[-1]

            stack.append(i)

        return span
```

---

## Step-by-step Detailed Explanation

1. I iterate through the stock prices one by one.
2. I remove all previous prices from the stack that are smaller or equal to today’s price.
3. After removal:

   * If stack is empty, today’s price is the highest so far.
   * Otherwise, the stack top is the nearest greater price.
4. I calculate span using index difference.
5. I push today’s index into the stack.

This ensures efficiency and correctness.

---

## Examples

**Input:**
`[100, 80, 60, 70, 60, 75, 85]`

**Output:**
`[1, 1, 1, 2, 1, 4, 6]`

---

## How to Use / Run Locally

1. Copy the solution code in your preferred language.
2. Compile and run using standard compiler or interpreter.
3. Call the `calculateSpan` function with an array of prices.
4. Print or return the result.

---

## Notes & Optimizations

* This problem is a **classic monotonic stack problem**.
* Avoid brute force approaches.
* Always think about how to reduce repeated comparisons.
* This pattern is useful in many array and stack problems.

---

## Author

* **Md Aarzoo Islam**
  👉 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
