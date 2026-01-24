# Josephus Problem

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

In the Josephus Problem, **n people stand in a circle**, numbered from `1` to `n`.

Starting from person `1`, **every k-th person is eliminated** in a circular manner.
The process continues until **only one person remains**.

The task is to **find the position (1-based index)** of the person who survives.

---

## Constraints

* `1 ≤ n ≤ 500`
* `1 ≤ k ≤ 500`

---

## Intuition

When I first looked at this problem, I imagined people standing in a circle and getting eliminated one by one.

At first, it feels like a simulation problem using a list or queue.
But then I realized something important:

I **don’t need to simulate the full elimination process**.

There is a **mathematical pattern** that repeats every time a person is removed.
Using this pattern, I can build the answer step by step without extra space.

That leads to the classic **Josephus recurrence relation**.

---

## Approach

I solve this problem using an **iterative mathematical approach**.

Steps I follow:

1. Start with `1` person — the survivor is obviously at index `0`.
2. Increase the circle size from `2` to `n`.
3. Each time, shift the survivor position by `k`.
4. Use modulo to keep the position inside the circle.
5. Finally, convert the answer from **0-based index to 1-based index**.

Formula used:

```bash
J(n, k) = (J(n - 1, k) + k) % n
```

---

## Data Structures Used

* No extra data structures used
* Only integer variables

This keeps the solution **memory efficient**.

---

## Operations & Behavior Summary

* Circular elimination handled mathematically
* No recursion stack
* No array or linked list
* Safe for large `n` within constraints
* Always produces a valid survivor position

---

## Complexity

**Time Complexity:** `O(n)`

* The loop runs once from `2` to `n`

**Space Complexity:** `O(1)`

* No extra memory used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int josephus(int n, int k) {
        int ans = 0; // 0-based index

        for (int i = 2; i <= n; i++) {
            ans = (ans + k) % i;
        }

        return ans + 1; // convert to 1-based index
    }
};
```

---

### Java

```java
class Solution {
    public int josephus(int n, int k) {
        int ans = 0; // 0-based index

        for (int i = 2; i <= n; i++) {
            ans = (ans + k) % i;
        }

        return ans + 1; // convert to 1-based index
    }
}
```

---

### JavaScript

```javascript
class Solution {
    josephus(n, k) {
        let ans = 0; // 0-based index

        for (let i = 2; i <= n; i++) {
            ans = (ans + k) % i;
        }

        return ans + 1; // convert to 1-based index
    }
}
```

---

### Python3

```python
class Solution:
    def josephus(self, n, k):
        ans = 0  # 0-based index

        for i in range(2, n + 1):
            ans = (ans + k) % i

        return ans + 1  # convert to 1-based index
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I initialize `ans = 0` because with one person, the survivor is at index `0`.
2. I gradually increase the group size from `2` to `n`.
3. Every time a new person is added, the survivor position shifts by `k`.
4. Modulo operation keeps the index inside the circle.
5. At the end, I convert the 0-based answer into a 1-based index.

This logic is **identical in all four languages**.

---

## Examples

### Example 1

```bash
Input:  n = 5, k = 2
Output: 3
```

### Example 2

```bash
Input:  n = 7, k = 3
Output: 4
```

---

## How to Use / Run Locally

1. Copy the solution for your preferred language
2. Paste it into your local compiler or IDE
3. Call the `josephus(n, k)` function
4. Print the returned value

Works perfectly for **GFG, LeetCode, and interviews**.

---

## Notes & Optimizations

* This is the **most optimized solution**
* Avoids recursion stack
* Avoids list simulation
* Best choice for interviews
* Easy to explain on a whiteboard

---

## Author

* **Md Aarzoo Islam**
  👉 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
