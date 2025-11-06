# Ways To Tile A Floor

## Table of Contents

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

## Problem Summary

Given a board of size **2 × n** and tiles of size **2 × 1**, find the **number of ways** to completely tile the board.
A tile can be placed either **vertically** (2×1) or **horizontally** (1×2, two stacked).

Two tilings are considered different if at least one tile’s placement differs.

---

## Constraints

* `1 ≤ n ≤ 45` (fits comfortably in 32-bit signed integer)
* Only 2×1 tiles allowed
* We must cover the board completely, without overlaps or gaps

---

## Intuition

I thought about the **last move** I would make to finish the 2×n board.

* If I place the **last tile vertically**, then the remaining part is a 2×(n−1) board.
* If I place **two horizontals** stacked as the last move, the remaining part is a 2×(n−2) board.

So the total ways for `n` equals ways for `n−1` **plus** ways for `n−2`.
That’s exactly the **Fibonacci** pattern with base cases:

* `n=1 → 1` way (one vertical)
* `n=2 → 2` ways (two verticals or two horizontals)

---

## Approach

1. Define `dp[i]` = number of ways to tile 2×i.
2. Base: `dp[1]=1`, `dp[2]=2`.
3. Transition: `dp[i]=dp[i-1]+dp[i-2]`.
4. To save memory, I only keep the last two values (`O(1)` space).
5. Return `dp[n]`.

---

## Data Structures Used

* Just a few integers to keep the last two DP values.
  No arrays or complex structures are needed.

---

## Operations & Behavior Summary

* **Initialize** with base values for `n=1` and `n=2`.
* **Iterate** from 3 to `n`, repeatedly applying the Fibonacci-like relation.
* **Return** the last computed value.

---

## Complexity

* **Time Complexity:** `O(n)` — I compute each state from 3 to `n` once.
* **Space Complexity:** `O(1)` — I store only two integers (`prev2`, `prev1`) at any time.

---

## Multi-language Solutions

### C++

```c++
class Solution {
  public:
    int numberOfWays(int n) {
        // Base cases:
        // For n=1 -> only one vertical tile
        // For n=2 -> two ways: VV or two horizontals (HH)
        if (n <= 2) return n;

        int prev2 = 1; // dp[1]
        int prev1 = 2; // dp[2]

        // Build up using dp[i] = dp[i-1] + dp[i-2]
        for (int i = 3; i <= n; ++i) {
            int cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1; // dp[n]
    }
};
```

### Java

```java
class Solution {
    public int numberOfWays(int n) {
        if (n <= 2) return n; // dp[1]=1, dp[2]=2

        int prev2 = 1; // dp[1]
        int prev1 = 2; // dp[2]

        for (int i = 3; i <= n; i++) {
            int cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1; // dp[n]
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @return {number}
 */
class Solution {
    numberOfWays(n) {
        if (n <= 2) return n; // 1->1, 2->2

        let prev2 = 1; // dp[1]
        let prev1 = 2; // dp[2]

        for (let i = 3; i <= n; i++) {
            const cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1; // dp[n]
    }
}
```

### Python3

```python
class Solution:
    def numberOfWays(self, n: int) -> int:
        if n <= 2:
            return n  # dp[1]=1, dp[2]=2

        prev2, prev1 = 1, 2  # dp[1], dp[2]
        for _ in range(3, n + 1):
            cur = prev1 + prev2
            prev2, prev1 = prev1, cur
        return prev1  # dp[n]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. **Handle small n**

   * `if (n <= 2) return n;`

     * For `n=1`, only one vertical tile fits → 1 way.
     * For `n=2`, either two verticals or two horizontals → 2 ways.

2. **Keep two running values**

   * `prev2 = dp[1] = 1`
   * `prev1 = dp[2] = 2`

3. **Iterate from 3 to n**

   * Compute current: `cur = prev1 + prev2`
     (ways to fill 2×i by ending with one vertical tile or two horizontals)
   * Slide the window:

     * `prev2 = prev1`
     * `prev1 = cur`

4. **Return the final value**

   * After the loop, `prev1` holds `dp[n]`.

This mirrors Fibonacci numbers but with `F(1)=1`, `F(2)=2`.

---

## Examples

| n | Explanation (High level) | Output |
| - | ------------------------ | ------ |
| 1 | Only one vertical tile   | 1      |
| 2 | `VV` or `HH`             | 2      |
| 3 | `dp[3]=dp[2]+dp[1]=2+1`  | 3      |
| 4 | `dp[4]=dp[3]+dp[2]=3+2`  | 5      |

---

## How to use / Run locally

### C++

```bash
# main.cpp should include the class and a small driver to read n and print result
g++ -std=c++17 -O2 main.cpp -o app
./app
```

### Java

```bash
# Solution.java holds the class; write a Main.java to read n and print result
javac Main.java Solution.java
java Main
```

### JavaScript (Node.js)

```bash
# main.js imports/defines the Solution class and runs numberOfWays(n)
node main.js
```

### Python3

```bash
python3 main.py
```

**Minimal driver example (Python)**

```python
# main.py
from sys import stdin
from solution import Solution  # if you put the class in solution.py

n = int(stdin.readline().strip())
print(Solution().numberOfWays(n))
```

---

## Notes & Optimizations

* This is classic **Fibonacci DP** with constant memory.
* For `n ≤ 45`, results fit into a 32-bit signed `int`.
  If you ever increase `n`, consider using 64-bit types or BigIntegers.
* If multiple queries are asked repeatedly for different `n`, we can precompute all values up to the maximum `n` once (tabulation) and answer each query in `O(1)`.

---

## Author

**Md. Aarzoo Islam** — Clean DP + Fibonacci-style solution with constant space.
