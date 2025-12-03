# Travelling Salesman Problem (Bitmask DP)

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

I’m given an `n x n` matrix `cost`, where `cost[i][j]` is the cost of travelling from city `i` to city `j`.

* I must **start from city 0**.
* I must **visit every city exactly once**.
* After visiting all cities, I must **come back to city 0**.
* I have to **minimize the total cost** of this complete tour.

Return the minimum possible tour cost.

---

## Constraints

From the GeeksforGeeks problem:

* `1 ≤ n ≤ 15` where `n = cost.size()`
* `0 ≤ cost[i][j] ≤ 10^4`
* `cost` is a square matrix of size `n x n`

These constraints are important because they hint that an `O(n^2 * 2^n)` dynamic programming solution will pass.

---

## Intuition

First, I thought of the brute force way:

* Generate all permutations of cities `1..n-1` (because we always start at `0`).
* For each permutation, calculate the cost of:
  `0 → perm[0] → perm[1] → ... → perm[n-2] → 0`.
* Take the minimum.

But this is `O(n!)`, which is impossible for `n = 15`.

Then I noticed something:

* Many routes share the same **partial paths**.
* Example:

  * `0 → 2 → 3 → 1 → 0`
  * `0 → 2 → 3 → 4 → 0`
    Both share the prefix `0 → 2 → 3`.

So I thought:

> “Instead of recalculating these partial paths again and again, I should store their best cost and reuse it.”

This is exactly what **Dynamic Programming (DP)** does.
Because I also need to know **which cities are visited**, I can use a **bitmask** to represent the set of visited cities.

---

## Approach

1. Let `n` be the number of cities.

2. Use a bitmask of length `n`:

   * If bit `i` is `1`, then city `i` is visited.
   * Example (`n = 4`):

     * `mask = 1011₂` → cities `{0,1,3}` are visited.

3. Define DP state:

   `dp[mask][u]` = minimum cost to:

   * start from city `0`,
   * visit exactly the set of cities in `mask`,
   * and currently end at city `u`.

4. Base case:

   * Initially only city `0` is visited, and I am at city `0`.
   * `dp[1 << 0][0] = 0`.

5. Transition:

   * For every `mask` and every `u` such that `u` is in `mask`:

     * I try to go to every city `v` that is **not** yet visited in `mask`.
     * New mask: `newMask = mask | (1 << v)`.
     * New cost: `dp[mask][u] + cost[u][v]`.
     * I minimize `dp[newMask][v]` with this value.

6. Final answer:

   * When all cities are visited: `fullMask = (1 << n) - 1`.
   * I can end at any city `u`, but must return to `0`.
   * So answer is:
     `ans = min over all u ( dp[fullMask][u] + cost[u][0] )`.

This way I am exploring all possible paths, but with heavy reuse of partial results.

---

## Data Structures Used

* **2D DP array**

  * Type: `dp[1<<n][n]`
  * Purpose: store minimum cost to reach each city with a specific set of visited cities.

* **Bitmask (int)**

  * Represents which cities have been visited so far.

No extra fancy data structures are needed.

---

## Operations & Behavior Summary

* Initialize all DP entries with a large value (`INF`).
* Set base case `dp[1][0] = 0`.
* For each subset of visited cities (`mask`):

  * For each possible current city `u`:

    * If the state is reachable:

      * Try to go to all unvisited cities `v` and relax `dp[newMask][v]`.
* At the end compare `dp[fullMask][u] + cost[u][0]` for all `u` and take the minimum.

---

## Complexity

Let `n` = number of cities.

* **Time Complexity:** `O(n^2 * 2^n)`

  * There are `2^n` masks and `n` possible ending cities for each mask.
  * For every state `(mask, u)` we may attempt transitions to up to `n` cities.
  * So roughly `n * 2^n * n = n^2 * 2^n`.

* **Space Complexity:** `O(n * 2^n)`

  * The DP table `dp[mask][u]` has `2^n` rows and `n` columns.
  * Apart from this, we only use some integers as helpers.

This fits well inside the constraint `n ≤ 15`.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int tsp(vector<vector<int>>& cost) {
        int n = cost.size();
        int N = 1 << n;                  // total masks = 2^n
        const int INF = 1e9;             // large value for initialization

        // dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
        vector<vector<int>> dp(N, vector<int>(n, INF));

        // base: only city 0 visited, we are at city 0
        dp[1][0] = 0;

        for (int mask = 0; mask < N; mask++) {
            for (int u = 0; u < n; u++) {
                if (!(mask & (1 << u))) continue; // u must be in mask
                int curCost = dp[mask][u];
                if (curCost == INF) continue;      // unreachable state

                // try going to every city v not yet visited
                for (int v = 0; v < n; v++) {
                    if (mask & (1 << v)) continue; // already visited
                    int newMask = mask | (1 << v);
                    int newCost = curCost + cost[u][v];
                    if (newCost < dp[newMask][v]) {
                        dp[newMask][v] = newCost;
                    }
                }
            }
        }

        int fullMask = N - 1;  // all cities visited
        int ans = INF;

        // end at any city u and return to 0
        for (int u = 0; u < n; u++) {
            if (dp[fullMask][u] == INF) continue;
            ans = min(ans, dp[fullMask][u] + cost[u][0]);
        }

        return ans;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public int tsp(int[][] cost) {
        int n = cost.length;
        int N = 1 << n;
        final int INF = (int)1e9;

        // dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
        int[][] dp = new int[N][n];
        for (int i = 0; i < N; i++) {
            Arrays.fill(dp[i], INF);
        }

        // base: only city 0 visited, we are at city 0
        dp[1][0] = 0;

        for (int mask = 0; mask < N; mask++) {
            for (int u = 0; u < n; u++) {
                if ((mask & (1 << u)) == 0) continue; // u must be in mask
                int curCost = dp[mask][u];
                if (curCost == INF) continue;         // unreachable

                // try going to every city v not yet visited
                for (int v = 0; v < n; v++) {
                    if ((mask & (1 << v)) != 0) continue; // already visited
                    int newMask = mask | (1 << v);
                    int newCost = curCost + cost[u][v];
                    if (newCost < dp[newMask][v]) {
                        dp[newMask][v] = newCost;
                    }
                }
            }
        }

        int fullMask = N - 1;
        int ans = INF;

        // end at any city u and return to 0
        for (int u = 0; u < n; u++) {
            if (dp[fullMask][u] == INF) continue;
            ans = Math.min(ans, dp[fullMask][u] + cost[u][0]);
        }

        return ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[][]} cost
 * @returns {number}
 */

class Solution {
    tsp(cost) {
        const n = cost.length;
        const N = 1 << n;
        const INF = 1e9;

        // dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
        const dp = Array.from({ length: N }, () => Array(n).fill(INF));

        // base: only city 0 visited, we are at city 0
        dp[1][0] = 0;

        for (let mask = 0; mask < N; mask++) {
            for (let u = 0; u < n; u++) {
                if ((mask & (1 << u)) === 0) continue; // u must be in mask
                const curCost = dp[mask][u];
                if (curCost === INF) continue;         // unreachable

                // try going to every city v not yet visited
                for (let v = 0; v < n; v++) {
                    if (mask & (1 << v)) continue;     // already visited
                    const newMask = mask | (1 << v);
                    const newCost = curCost + cost[u][v];
                    if (newCost < dp[newMask][v]) {
                        dp[newMask][v] = newCost;
                    }
                }
            }
        }

        const fullMask = N - 1;
        let ans = INF;

        // end at any city u and return to 0
        for (let u = 0; u < n; u++) {
            if (dp[fullMask][u] === INF) continue;
            ans = Math.min(ans, dp[fullMask][u] + cost[u][0]);
        }

        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def tsp(self, cost):
        n = len(cost)
        N = 1 << n
        INF = 10**9

        # dp[mask][u] = min cost to start at 0, visit 'mask', and end at u
        dp = [[INF] * n for _ in range(N)]

        # base: only city 0 visited, we are at city 0
        dp[1][0] = 0

        for mask in range(N):
            for u in range(n):
                if not (mask & (1 << u)):
                    continue  # u must be in mask
                cur_cost = dp[mask][u]
                if cur_cost == INF:
                    continue  # unreachable

                # try going to every city v not yet visited
                for v in range(n):
                    if mask & (1 << v):
                        continue  # already visited
                    new_mask = mask | (1 << v)
                    new_cost = cur_cost + cost[u][v]
                    if new_cost < dp[new_mask][v]:
                        dp[new_mask][v] = new_cost

        full_mask = N - 1
        ans = INF

        # end at any city u and return to 0
        for u in range(n):
            if dp[full_mask][u] == INF:
                continue
            ans = min(ans, dp[full_mask][u] + cost[u][0])

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the key parts. The logic is same in all languages; only syntax changes.

### 1. Setting up the DP table

Example from C++ (same idea everywhere):

```c++
int n = cost.size();
int N = 1 << n;              // 2^n masks
const int INF = 1e9;

vector<vector<int>> dp(N, vector<int>(n, INF));
```

* `n` = number of cities.
* `N = 2^n` = total number of subsets (masks).
* `INF` is a large value representing "not visited / impossible state".
* `dp` is a table with `N` rows and `n` columns.
* Initially, every state is set to `INF` because we haven’t computed any path yet.

In Java / JS / Python, we do exactly the same with arrays/lists.

---

### 2. Base case – starting at city 0

```c++
dp[1][0] = 0;
```

* Mask `1` in binary is `000…001`.
* It means **only city 0 is visited** (bit 0 is set).
* We are at city `0` and cost is `0`.
* So we initialize that as our starting state.

Same base case is written in Java/JS/Python.

---

### 3. Iterating through all states

Core loops:

```c++
for (int mask = 0; mask < N; mask++) {
    for (int u = 0; u < n; u++) {
        if (!(mask & (1 << u))) continue;  // city u must be visited
        int curCost = dp[mask][u];
        if (curCost == INF) continue;      // unreachable
        ...
    }
}
```

What I am doing:

* `mask` loop: I go through every possible set of visited cities.
* `u` loop: for this mask, I consider each city `u` that is possibly the last city in the path.
* `if (!(mask & (1 << u)))`:

  * This checks if bit `u` is set in `mask`.
  * If city `u` is not in the set, then `(mask, u)` is not a valid state.
* `if (curCost == INF)` means we never reached this state, so we skip it.

Same logic is applied in Java, JS, and Python.

---

### 4. Transition: going to a new city

Inside the loops:

```c++
for (int v = 0; v < n; v++) {
    if (mask & (1 << v)) continue;  // already visited
    int newMask = mask | (1 << v);  // add city v
    int newCost = curCost + cost[u][v];
    if (newCost < dp[newMask][v]) {
        dp[newMask][v] = newCost;
    }
}
```

Meaning:

* For each unvisited city `v`, I try to move from `u` to `v`.
* `mask & (1 << v)` checks if `v` is already visited.
* `newMask` is the new subset after visiting `v`.
* `newCost` is current path cost + travel cost from `u` to `v`.
* If `newCost` is better (smaller) than the stored value, I update `dp[newMask][v]`.

This is the DP relaxation step (like in shortest path).

---

### 5. Computing final answer

```c++
int fullMask = N - 1;  // all bits 1 => all cities visited
int ans = INF;

for (int u = 0; u < n; u++) {
    if (dp[fullMask][u] == INF) continue;
    ans = min(ans, dp[fullMask][u] + cost[u][0]);
}
```

* `fullMask` has all `n` bits set → all cities are visited.
* I check every city `u` as the last city before returning to `0`.
* `dp[fullMask][u]` is cost to start at `0`, visit all cities, end at `u`.
* I add `cost[u][0]` to go back from `u` to `0`.
* Take the minimum over all `u`.

Same structure is used in all four languages.

---

## Examples

### Example 1

**Input:**

```text
cost = [
  [0,   111],
  [112, 0  ]
]
```

Possible tours (starting and ending at 0):

* `0 → 1 → 0`

  * cost = `cost[0][1] + cost[1][0] = 111 + 112 = 223`

There is only one valid tour.

**Output:** `223`

---

### Example 2

**Input:**

```text
cost = [
  [0,    1000, 5000],
  [5000, 0,    1000],
  [1000, 5000, 0   ]
]
```

Some possible tours:

1. `0 → 1 → 2 → 0`

   * cost = `0→1 (1000) + 1→2 (1000) + 2→0 (1000) = 3000`
2. `0 → 2 → 1 → 0`

   * cost = `0→2 (5000) + 2→1 (5000) + 1→0 (5000) = 15000`

Minimum is `3000`.

**Output:** `3000`

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 -O2 main.cpp -o main
./main
```

Where `main.cpp` includes:

* the `Solution` class above, and
* your own `main()` function that:

  * reads `n`, reads the `cost` matrix,
  * creates `Solution` object, calls `tsp(cost)`, and prints the result.

---

### Java

```bash
javac Main.java
java Main
```

Your `Main.java` should:

* contain the `Solution` class above, and
* a `Main` class with `public static void main(String[] args)` which:

  * reads input,
  * constructs the `cost` matrix,
  * calls `new Solution().tsp(cost)` and prints the answer.

---

### JavaScript (Node.js)

```bash
node main.js
```

Inside `main.js`:

* define the `Solution` class from above,
* read input from `stdin` (or hardcode for testing),
* create `new Solution().tsp(cost)` and log the result.

---

### Python3

```bash
python3 main.py
```

Inside `main.py`:

* include the `Solution` class,
* read input, build `cost` list of lists,
* call `Solution().tsp(cost)` and print the result.

---

## Notes & Optimizations

* This DP with bitmasking is **optimal** for `n ≤ 15`.
* If `n` were much larger (like 20, 25+), this exact method would start to struggle.
* Memory can be slightly optimized:

  * We could compress DP dimension by processing in layers (current mask vs next mask),
  * but for `n ≤ 15`, `n * 2^n` is already fine.
* We used `INF` (`1e9`) as a safe large value.

  * Maximum possible tour cost with constraints is at most `n * 10^4` which is `< 1e9` for `n ≤ 15`.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
