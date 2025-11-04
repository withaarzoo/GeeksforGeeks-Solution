# Frog Jump — README

## Table of Contents

* [Problem Title](#problem-title)
* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Title

**Frog Jump**

## Problem Summary

Given an integer array `height[]` where `height[i]` is the height of the `i`-th stair, a frog starts at stair `0` and wants to reach the last stair `n-1`.
From stair `i`, it may jump to `i+1` or `i+2`.
The **cost** of a jump is the absolute difference in heights of the two stairs.
Find the **minimum total cost** to reach the last stair.

## Constraints

* `1 ≤ height.size() ≤ 10^5`
* `0 ≤ height[i] ≤ 10^4`
* Jumps allowed: `+1` or `+2`

## Intuition

I thought of this like climbing with receipts: to land on stair `i`, I either come from `i-1` or `i-2`.
If I already know the cheapest cost to reach those two stairs, I can add the jump cost and pick the smaller one.
That is a classic **dynamic programming** pattern based on **optimal substructure**.

## Approach

1. Let `dp[i]` be the minimum cost to reach stair `i`.
2. Base:

   * `dp[0] = 0`
   * `dp[1] = |height[1] - height[0]|` (if `n > 1`)
3. Transition for `i ≥ 2`:

   * `dp[i] = min( dp[i-1] + |h[i]-h[i-1]|,  dp[i-2] + |h[i]-h[i-2]| )`
4. Space optimize to **O(1)** by keeping only `dp[i-1]` and `dp[i-2]` in two variables.

## Data Structures Used

* Only a few integers for the rolling DP (`prev2`, `prev1`, `curr`).
  No extra arrays are required.

## Operations & Behavior Summary

* For each stair `i` from `2` to `n-1`:

  * Compute two options: jump from `i-1` or from `i-2`.
  * Choose the smaller cumulative cost.
  * Slide the rolling window.

## Complexity

* **Time Complexity:** `O(n)` — We process each stair once.
* **Space Complexity:** `O(1)` — Only constant extra variables are used (no `dp[]` array).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int minCost(vector<int>& height) {
        int n = (int)height.size();
        if (n <= 1) return 0;

        int prev2 = 0;                                   // dp[0]
        int prev1 = abs(height[1] - height[0]);          // dp[1]
        if (n == 2) return prev1;

        for (int i = 2; i < n; ++i) {
            int jump1 = prev1 + abs(height[i] - height[i - 1]); // from i-1
            int jump2 = prev2 + abs(height[i] - height[i - 2]); // from i-2
            int curr  = min(jump1, jump2);
            prev2 = prev1;   // slide window
            prev1 = curr;
        }
        return prev1; // dp[n-1]
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    int minCost(int[] height) {
        int n = height.length;
        if (n <= 1) return 0;

        int prev2 = 0;                                   // dp[0]
        int prev1 = Math.abs(height[1] - height[0]);     // dp[1]
        if (n == 2) return prev1;

        for (int i = 2; i < n; i++) {
            int jump1 = prev1 + Math.abs(height[i] - height[i - 1]); // from i-1
            int jump2 = prev2 + Math.abs(height[i] - height[i - 2]); // from i-2
            int curr  = Math.min(jump1, jump2);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1; // dp[n-1]
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
class Solution {
    minCost(height) {
        const n = height.length;
        if (n <= 1) return 0;

        let prev2 = 0;                                     // dp[0]
        let prev1 = Math.abs(height[1] - height[0]);       // dp[1]
        if (n === 2) return prev1;

        for (let i = 2; i < n; i++) {
            const jump1 = prev1 + Math.abs(height[i] - height[i - 1]); // from i-1
            const jump2 = prev2 + Math.abs(height[i] - height[i - 2]); // from i-2
            const curr  = Math.min(jump1, jump2);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1; // dp[n-1]
    }
}
```

### Python3

```python
class Solution:
    def minCost(self, height):
        n = len(height)
        if n <= 1:
            return 0

        prev2 = 0                                  # dp[0]
        prev1 = abs(height[1] - height[0])         # dp[1]
        if n == 2:
            return prev1

        for i in range(2, n):
            jump1 = prev1 + abs(height[i] - height[i - 1])  # from i-1
            jump2 = prev2 + abs(height[i] - height[i - 2])  # from i-2
            curr = min(jump1, jump2)
            prev2, prev1 = prev1, curr                      # slide window
        return prev1  # dp[n-1]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

**Common logic across all languages:**

1. If the array has size `0` or `1`, the cost is `0` because I’m already at the target.
2. Initialize:

   * `prev2 = dp[0] = 0`
   * `prev1 = dp[1] = |h[1] - h[0]|` (only if `n > 1`)
3. For each `i` from `2` to `n-1`:

   * `jump1 = prev1 + |h[i] - h[i-1]|`  → coming from `i-1`
   * `jump2 = prev2 + |h[i] - h[i-2]|`  → coming from `i-2`
   * `curr  = min(jump1, jump2)`        → best way to reach `i`
   * Slide the window:

     * `prev2 = prev1`
     * `prev1 = curr`
4. After the loop, `prev1` equals `dp[n-1]`, which is the answer.

I used rolling variables to avoid storing an entire `dp[]` array.

---

## Examples

**Example 1**
Input: `height = [20, 30, 40, 20]`
Walkthrough:

* 0 → 1 cost = |30-20| = 10
* 1 → 3 cost = |20-30| = 10
  Total = **20**
  Output: `20`

**Example 2**
Input: `height = [30, 20, 50, 10, 40]`
Walkthrough:

* 0 → 2 cost = |50-30| = 20
* 2 → 4 cost = |40-50| = 10
  Total = **30**
  Output: `30`

---

## How to use / Run locally

**C++**

```bash
g++ -std=c++17 main.cpp -O2 && ./a.out
```

**Java**

```bash
javac Main.java && java Main
```

**JavaScript (Node.js)**

```bash
node main.js
```

**Python3**

```bash
python3 main.py
```

> Each `main.*` should read an example array, create `Solution`, call `minCost(height)`, and print the result.

---

## Notes & Optimizations

* Space optimization (rolling DP) reduces memory from `O(n)` to `O(1)` with no logic change.
* Works smoothly for `n = 1` and `n = 2` due to explicit base handling.
* If later the problem allows jumps of `k` steps, switch to a deque/heap or maintain the best among last `k` states, but complexity would change.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
