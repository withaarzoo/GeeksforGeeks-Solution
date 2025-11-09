# Chocolate Pickup II — README

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

**Chocolate Pickup II (GeeksForGeeks)**

## Problem Summary

Given an `n x n` grid `mat`:

* `mat[i][j] == -1` means the cell is blocked.
* Otherwise, `mat[i][j]` is the count of chocolates in the cell.

A single robot starts at `(0,0)`, goes to `(n-1,n-1)`, and **returns** back to `(0,0)`.
When a cell is visited, its chocolates become `0` for the next visit (i.e., you can collect a cell at most once overall).

**Goal:** Maximize the total chocolates collected across the round trip. If either leg is impossible, return `0`.

## Constraints

* `1 ≤ n ≤ 50`
* `-1 ≤ mat[i][j] ≤ 100`
* Movement:

  * Outbound: only **right** `(i, j+1)` or **down** `(i+1, j)`.
  * Return: only **left** `(i, j-1)` or **up** `(i-1, j)`.
* A blocked cell (`-1`) cannot be visited.

## Intuition

I realized doing “go and come back” separately is hard because the first trip changes the grid (cells become empty).
The classic trick is to **simulate both trips at the same time** with two walkers moving from `(0,0)` to `(n-1,n-1)` together.
Each step both walkers take one move (right/down). If both stand on the same cell, count it once.

This collapses the round trip into a **single DP** problem known as “Cherry Pickup” style.

## Approach

1. Let `k` be the number of moves taken so far (from `0` to `2n-2`).
   For any position `(r,c)`, `r + c = k`.
   So if we track columns `c1, c2`, rows are `r1 = k - c1`, `r2 = k - c2`.

2. DP state (with rolling layers):

   * `dp[c1][c2]` = best chocolates when both walkers have taken `k` moves and are at
     `(r1 = k - c1, c1)` and `(r2 = k - c2, c2)`.

3. Transitions from previous layer (`k-1`):

   * Both came from down:      `dp[c1][c2]`
   * First from right, second from down: `dp[c1-1][c2]`
   * First from down, second from right: `dp[c1][c2-1]`
   * Both from right:          `dp[c1-1][c2-1]`
     Take the max among valid options.

4. Add chocolates of current cells:

   * Skip if either current cell is blocked.
   * Gain = `mat[r1][c1] + (c1 != c2 ? mat[r2][c2] : 0)`.

5. Initialization:

   * If start or end is blocked, return `0`.
   * At `k=0`, `dp[0][0] = mat[0][0]`.

6. Answer:

   * After processing all `k`, result is `max(0, dp[n-1][n-1])`.
     If no path exists, the DP stays at a very negative sentinel → return `0`.

## Data Structures Used

* 2D arrays for DP layers: `dp` and `ndp` of size `n x n`.
* Constants for invalid states (a large negative number).

## Operations & Behavior Summary

* Iterate `k` from `0` to `2n-2`.
* For each `k`, iterate all `(c1, c2)` pairs that produce valid `(r1, r2)`.
* Skip blocked states early.
* Combine four previous possibilities, add current gain (handle “same cell once”).
* Roll layers to achieve `O(n^2)` memory.

## Complexity

* **Time Complexity:** `O(n^3)`
  There are `≈ 2n` layers; each layer fills an `n × n` table with `O(1)` transitions.
* **Space Complexity:** `O(n^2)`
  Two `n × n` DP layers (previous and current).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int chocolatePickup(vector<vector<int>> &mat) {
        int n = (int)mat.size();
        const int NEG = -1e9;

        if (mat[0][0] == -1 || mat[n-1][n-1] == -1) return 0;

        vector<vector<int>> dp(n, vector<int>(n, NEG));
        dp[0][0] = mat[0][0];  // k = 0

        for (int k = 1; k <= 2*(n-1); ++k) {
            vector<vector<int>> ndp(n, vector<int>(n, NEG));
            for (int c1 = 0; c1 < n; ++c1) {
                int r1 = k - c1;
                if (r1 < 0 || r1 >= n) continue;
                if (mat[r1][c1] == -1) continue;

                for (int c2 = 0; c2 < n; ++c2) {
                    int r2 = k - c2;
                    if (r2 < 0 || r2 >= n) continue;
                    if (mat[r2][c2] == -1) continue;

                    int best = NEG;
                    if (r1-1 >= 0 && r2-1 >= 0) best = max(best, dp[c1][c2]);
                    if (c1-1 >= 0 && r2-1 >= 0) best = max(best, dp[c1-1][c2]);
                    if (r1-1 >= 0 && c2-1 >= 0) best = max(best, dp[c1][c2-1]);
                    if (c1-1 >= 0 && c2-1 >= 0) best = max(best, dp[c1-1][c2-1]);

                    if (best == NEG) continue;

                    int gain = mat[r1][c1];
                    if (c1 != c2) gain += mat[r2][c2];
                    ndp[c1][c2] = max(ndp[c1][c2], best + gain);
                }
            }
            dp.swap(ndp);
        }
        int ans = dp[n-1][n-1];
        return ans < 0 ? 0 : ans;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int chocolatePickup(int[][] mat) {
        int n = mat.length;
        final int NEG = (int)-1e9;

        if (mat[0][0] == -1 || mat[n-1][n-1] == -1) return 0;

        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) Arrays.fill(dp[i], NEG);
        dp[0][0] = mat[0][0]; // k = 0

        for (int k = 1; k <= 2*(n-1); k++) {
            int[][] ndp = new int[n][n];
            for (int i = 0; i < n; i++) Arrays.fill(ndp[i], NEG);

            for (int c1 = 0; c1 < n; c1++) {
                int r1 = k - c1;
                if (r1 < 0 || r1 >= n) continue;
                if (mat[r1][c1] == -1) continue;

                for (int c2 = 0; c2 < n; c2++) {
                    int r2 = k - c2;
                    if (r2 < 0 || r2 >= n) continue;
                    if (mat[r2][c2] == -1) continue;

                    int best = NEG;
                    if (r1-1 >= 0 && r2-1 >= 0) best = Math.max(best, dp[c1][c2]);
                    if (c1-1 >= 0 && r2-1 >= 0) best = Math.max(best, dp[c1-1][c2]);
                    if (r1-1 >= 0 && c2-1 >= 0) best = Math.max(best, dp[c1][c2-1]);
                    if (c1-1 >= 0 && c2-1 >= 0) best = Math.max(best, dp[c1-1][c2-1]);

                    if (best == NEG) continue;

                    int gain = mat[r1][c1];
                    if (c1 != c2) gain += mat[r2][c2];
                    ndp[c1][c2] = Math.max(ndp[c1][c2], best + gain);
                }
            }
            dp = ndp;
        }
        int ans = dp[n-1][n-1];
        return ans < 0 ? 0 : ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} mat
 * @returns {number}
 */
class Solution {
    chocolatePickup(mat) {
        const n = mat.length;
        const NEG = -1e9 | 0;

        if (mat[0][0] === -1 || mat[n-1][n-1] === -1) return 0;

        const make = () => Array.from({ length: n }, () => Array(n).fill(NEG));
        let dp = make();
        dp[0][0] = mat[0][0]; // k = 0

        for (let k = 1; k <= 2*(n-1); k++) {
            let ndp = make();

            for (let c1 = 0; c1 < n; c1++) {
                const r1 = k - c1;
                if (r1 < 0 || r1 >= n) continue;
                if (mat[r1][c1] === -1) continue;

                for (let c2 = 0; c2 < n; c2++) {
                    const r2 = k - c2;
                    if (r2 < 0 || r2 >= n) continue;
                    if (mat[r2][c2] === -1) continue;

                    let best = NEG;
                    if (r1-1 >= 0 && r2-1 >= 0) best = Math.max(best, dp[c1][c2]);
                    if (c1-1 >= 0 && r2-1 >= 0) best = Math.max(best, dp[c1-1][c2]);
                    if (r1-1 >= 0 && c2-1 >= 0) best = Math.max(best, dp[c1][c2-1]);
                    if (c1-1 >= 0 && c2-1 >= 0) best = Math.max(best, dp[c1-1][c2-1]);

                    if (best === NEG) continue;

                    let gain = mat[r1][c1];
                    if (c1 !== c2) gain += mat[r2][c2];
                    ndp[c1][c2] = Math.max(ndp[c1][c2], best + gain);
                }
            }
            dp = ndp;
        }
        const ans = dp[n-1][n-1];
        return ans < 0 ? 0 : ans;
    }
}
```

### Python3

```python
class Solution: 
    def chocolatePickup(self, mat): 
        n = len(mat)
        NEG = -10**9  # sentinel for impossible
        
        if mat[0][0] == -1 or mat[n-1][n-1] == -1:
            return 0
        
        # dp[c1][c2] for current k; rows are derived as r = k - c
        dp = [[NEG]*n for _ in range(n)]
        dp[0][0] = mat[0][0]  # k = 0
        
        for k in range(1, 2*(n-1) + 1):
            ndp = [[NEG]*n for _ in range(n)]
            for c1 in range(n):
                r1 = k - c1
                if r1 < 0 or r1 >= n:
                    continue
                if mat[r1][c1] == -1:
                    continue
                
                for c2 in range(n):
                    r2 = k - c2
                    if r2 < 0 or r2 >= n:
                        continue
                    if mat[r2][c2] == -1:
                        continue
                    
                    best = NEG
                    if r1-1 >= 0 and r2-1 >= 0:
                        best = max(best, dp[c1][c2])
                    if c1-1 >= 0 and r2-1 >= 0:
                        best = max(best, dp[c1-1][c2])
                    if r1-1 >= 0 and c2-1 >= 0:
                        best = max(best, dp[c1][c2-1])
                    if c1-1 >= 0 and c2-1 >= 0:
                        best = max(best, dp[c1-1][c2-1])
                    
                    if best == NEG:
                        continue
                    
                    gain = mat[r1][c1]
                    if c1 != c2:
                        gain += mat[r2][c2]
                    ndp[c1][c2] = max(ndp[c1][c2], best + gain)
            dp = ndp
        
        ans = dp[n-1][n-1]
        return 0 if ans < 0 else ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. **Sentinel for impossible:** `NEG = -1e9` (a very small number). Any path that is impossible keeps this value.
2. **Early exit:** If `(0,0)` or `(n-1,n-1)` is blocked, return `0`.
3. **Initialization:** `dp[0][0] = mat[0][0]` for `k = 0` (both walkers at start).
4. **Iterate layers `k=1..2*(n-1)`:**

   * For each `c1`, compute `r1 = k - c1`. If out of bounds or blocked, skip.
   * For each `c2`, compute `r2 = k - c2`. If out of bounds or blocked, skip.
   * Consider four previous states (`k-1` layer):

     * `(r1-1,c1) & (r2-1,c2)` → `dp[c1][c2]`
     * `(r1-1,c1) & (r2,c2-1)` → `dp[c1][c2-1]`
     * `(r1,c1-1) & (r2-1,c2)` → `dp[c1-1][c2]`
     * `(r1,c1-1) & (r2,c2-1)` → `dp[c1-1][c2-1]`
   * `best = max(...)` of valid ones.
   * If `best` is still `NEG`, skip (no way to reach).
   * Gain = `mat[r1][c1]` + `mat[r2][c2]` (but add second only if `c1 != c2` to avoid double counting same cell at same time step).
   * Update `ndp[c1][c2] = max(ndp[c1][c2], best + gain)`.
5. **Roll layers:** `dp = ndp`.
6. **Result:** `dp[n-1][n-1]`. If negative, return `0`.

---

## Examples

### Example 1

```
mat = [
  [0,  1, -1],
  [1,  1, -1],
  [1,  1,  2]
]
Output: 7
Explanation: One optimal route collects 7 in total across the two synchronized walks.
```

### Example 2

```
mat = [
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1]
]
Output: 7
```

### Example 3

```
mat = [
  [1,  0, -1],
  [2, -1, -1],
  [1, -1,  3]
]
Output: 0  (destination cannot be reached)
```

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 main.cpp -O2 && ./a.out
```

`main.cpp` should include the `Solution` class above and a small driver, e.g.:

```c++
int main() {
    vector<vector<int>> mat = {{0,1,-1},{1,1,-1},{1,1,2}};
    Solution sol;
    cout << sol.chocolatePickup(mat) << "\n"; // 7
}
```

### Java

```bash
javac Main.java && java Main
```

`Main.java`:

```java
public class Main {
    public static void main(String[] args) {
        int[][] mat = {{0,1,-1},{1,1,-1},{1,1,2}};
        System.out.println(new Solution().chocolatePickup(mat)); // 7
    }
}
```

### JavaScript (Node.js)

```bash
node main.js
```

`main.js`:

```javascript
const sol = new Solution();
console.log(sol.chocolatePickup([[0,1,-1],[1,1,-1],[1,1,2]])); // 7
```

### Python3

```bash
python3 main.py
```

`main.py`:

```python
print(Solution().chocolatePickup([[0,1,-1],[1,1,-1],[1,1,2]]))  # 7
```

---

## Notes & Optimizations

* We **roll** DP layers to save memory (`O(n^2)` instead of `O(n^3)`).
* Prune early: skip states where `r` is out of bounds or cell is `-1`.
* If you need the path, you’d keep parent pointers per state (increases memory).
* The DP pattern is identical to the well-known “Cherry Pickup” problem; understanding that makes this problem straightforward.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
