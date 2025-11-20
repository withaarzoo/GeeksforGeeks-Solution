# Make Strings Equal

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

Given two strings `s` and `t` (lowercase English letters) of equal length and a list of allowed **direct** character transformations `transform[i] = [x, y]` with associated `cost[i]`, we can apply any transformation any number of times on any character (directed). We want the **minimum total cost** to make the two strings **identical**. If impossible, return `-1`.

At each index `i`, we may transform `s[i]` and/or `t[i]` to some common character `c`. The cost for that index is the min over `c` of (cost to transform `s[i] -> c`) + (cost to transform `t[i] -> c`). If for any index no such `c` exists (i.e., one or both characters cannot reach the same target), answer is `-1`.

---

## Constraints

* `1 ≤ s.size() = t.size() ≤ 10^5`
* `1 ≤ transform.size() = cost.size() ≤ 500`
* `transform[i][0]`, `transform[i][1]` are lowercase letters `'a'` to `'z'`
* `1 ≤ cost[i] ≤ 500`

Note: Alphabet size is fixed (26 lowercase letters), which we exploit for an efficient solution.

---

## Intuition

I thought about characters as nodes in a directed weighted graph: each transform `x -> y` with weight `w` is a directed edge. If I can find the **cheapest** cost to go from any char `u` to any char `v`, then for each position `i` I can try every possible target character `c` (`'a'..'z'`) and pick the cheapest combination `cost(s[i] -> c) + cost(t[i] -> c)`. Summing minimal costs for each position yields the overall minimum. If for some position no `c` is reachable from both sides, the result is `-1`.

Since alphabet size is constant (26), I used Floyd–Warshall to compute all-pairs shortest paths over 26 nodes. That gives the minimal cost to convert any char to any char.

---

## Approach

1. Build a `26 x 26` distance matrix `dist`, initialize with `INF` and `dist[i][i] = 0`.
2. For each input transform `x -> y` with cost `w`, set `dist[x][y] = min(dist[x][y], w)`.
3. Run Floyd–Warshall over the 26 letters to compute the minimum cost `dist[u][v]` for any `u` -> `v`.
4. Iterate positions `i = 0..n-1`:

   * If `s[i] == t[i]`, cost is 0.
   * Otherwise, for each character `c` in `a..z`, if both `dist[s[i]][c]` and `dist[t[i]][c]` are finite, consider `dist[s[i]][c] + dist[t[i]][c]`. Take the minimum across `c`.
   * If no `c` is valid, answer `-1`.
5. Sum the per-position minima; return total.

---

## Data Structures Used

* `dist` matrix: 2D array `26 x 26` of integers (all-pairs shortest path costs).
* Basic arrays/lists for inputs `transform` and `cost`.
* Integers and long accumulator for the answer.

---

## Operations & Behavior Summary

* Building initial `dist` matrix: `O(26^2)` (constant).
* Adding `m` transforms: `O(m)` where `m ≤ 500`.
* Floyd–Warshall: `O(26^3)` = constant-time (26³ ≈ 17,576).
* Per-position evaluation: For each of `n` positions check 26 targets ⇒ `O(26 * n)`.

Because the alphabet size is constant, overall runtime is effectively linear in `n`.

---

## Complexity

* **Time Complexity:** `O(26^3 + 26 * n)` which simplifies to `O(n)` for large `n` (26 is a constant).

  * `n` = length of strings `s` and `t`.
* **Space Complexity:** `O(26 * 26)` = `O(1)` extra space relative to `n` (a constant-size matrix).

---

## Multi-language Solutions

Below are polished implementations for the solution. Each implementation follows the same logic: build the `dist` matrix, run Floyd–Warshall, then compute per-index minimum costs.

---

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

/*
  Solution class with minCost method.
  Signature matches many competitive programming patterns.
*/
class Solution {
  public:
    int minCost(string &s, string &t, vector<vector<char>> &transform, vector<int> &cost) {
        const int ALPHA = 26;
        const int INF = 1e9;
        vector<vector<int>> dist(ALPHA, vector<int>(ALPHA, INF));
        for (int i = 0; i < ALPHA; ++i) dist[i][i] = 0;

        // Add direct transforms
        for (size_t i = 0; i < transform.size(); ++i) {
            int u = transform[i][0] - 'a';
            int v = transform[i][1] - 'a';
            dist[u][v] = min(dist[u][v], cost[i]);
        }

        // Floyd-Warshall for all-pairs shortest paths
        for (int k = 0; k < ALPHA; ++k)
            for (int i = 0; i < ALPHA; ++i)
                if (dist[i][k] < INF)
                    for (int j = 0; j < ALPHA; ++j)
                        if (dist[k][j] < INF)
                            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);

        if (s.size() != t.size()) return -1;
        long long ans = 0;
        for (size_t i = 0; i < s.size(); ++i) {
            if (s[i] == t[i]) continue;
            int u = s[i] - 'a';
            int v = t[i] - 'a';
            int best = INF;
            for (int c = 0; c < ALPHA; ++c) {
                if (dist[u][c] < INF && dist[v][c] < INF)
                    best = min(best, dist[u][c] + dist[v][c]);
            }
            if (best == INF) return -1;
            ans += best;
            if (ans > INT_MAX) return -1; // defensive overflow handling
        }
        return static_cast<int>(ans);
    }
};

// Example driver is omitted; use the method within a main/test harness as needed.
```

---

### Java

```java
import java.util.*;

class Solution {
    public int minCost(String s, String t, char[][] transform, int[] cost) {
        final int ALPHA = 26;
        final int INF = 1_000_000_000;
        int[][] dist = new int[ALPHA][ALPHA];
        for (int i = 0; i < ALPHA; ++i) Arrays.fill(dist[i], INF);
        for (int i = 0; i < ALPHA; ++i) dist[i][i] = 0;

        // Add transforms
        for (int i = 0; i < transform.length; ++i) {
            int u = transform[i][0] - 'a';
            int v = transform[i][1] - 'a';
            dist[u][v] = Math.min(dist[u][v], cost[i]);
        }

        // Floyd-Warshall
        for (int k = 0; k < ALPHA; ++k)
            for (int i = 0; i < ALPHA; ++i)
                if (dist[i][k] < INF)
                    for (int j = 0; j < ALPHA; ++j)
                        if (dist[k][j] < INF)
                            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);

        if (s.length() != t.length()) return -1;
        long ans = 0;
        for (int i = 0; i < s.length(); ++i) {
            char cs = s.charAt(i), ct = t.charAt(i);
            if (cs == ct) continue;
            int u = cs - 'a', v = ct - 'a';
            int best = INF;
            for (int c = 0; c < ALPHA; ++c) {
                if (dist[u][c] < INF && dist[v][c] < INF)
                    best = Math.min(best, dist[u][c] + dist[v][c]);
            }
            if (best == INF) return -1;
            ans += best;
            if (ans > Integer.MAX_VALUE) return -1; // defensive
        }
        return (int) ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @param {Array<Array<string>>} transform
 * @param {number[]} cost
 * @returns {number}
 */
class Solution {
    minCost(s, t, transform, cost) {
        const ALPHA = 26;
        const INF = 1e12;
        const dist = Array.from({length: ALPHA}, () => Array(ALPHA).fill(INF));
        for (let i = 0; i < ALPHA; ++i) dist[i][i] = 0;

        for (let i = 0; i < transform.length; ++i) {
            const u = transform[i][0].charCodeAt(0) - 97;
            const v = transform[i][1].charCodeAt(0) - 97;
            dist[u][v] = Math.min(dist[u][v], cost[i]);
        }

        // Floyd-Warshall
        for (let k = 0; k < ALPHA; ++k) {
            for (let i = 0; i < ALPHA; ++i) {
                if (dist[i][k] === INF) continue;
                for (let j = 0; j < ALPHA; ++j) {
                    if (dist[k][j] === INF) continue;
                    const via = dist[i][k] + dist[k][j];
                    if (via < dist[i][j]) dist[i][j] = via;
                }
            }
        }

        if (s.length !== t.length) return -1;
        let ans = 0;
        for (let i = 0; i < s.length; ++i) {
            const cs = s.charCodeAt(i) - 97;
            const ct = t.charCodeAt(i) - 97;
            if (cs === ct) continue;
            let best = INF;
            for (let c = 0; c < ALPHA; ++c) {
                if (dist[cs][c] < INF && dist[ct][c] < INF) {
                    best = Math.min(best, dist[cs][c] + dist[ct][c]);
                }
            }
            if (best === INF) return -1;
            ans += best;
        }
        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def minCost(self, s: str, t: str, transform: list, cost: list) -> int:
        ALPHA = 26
        INF = 10**12
        # dist[u][v] = min cost to transform u -> v
        dist = [[INF] * ALPHA for _ in range(ALPHA)]
        for i in range(ALPHA):
            dist[i][i] = 0

        # add direct transforms
        for i in range(len(transform)):
            a = transform[i][0]
            b = transform[i][1]
            u = ord(a) - ord('a')
            v = ord(b) - ord('a')
            dist[u][v] = min(dist[u][v], cost[i])

        # Floyd-Warshall
        for k in range(ALPHA):
            for i in range(ALPHA):
                if dist[i][k] == INF: 
                    continue
                for j in range(ALPHA):
                    if dist[k][j] == INF:
                        continue
                    via = dist[i][k] + dist[k][j]
                    if via < dist[i][j]:
                        dist[i][j] = via

        if len(s) != len(t):
            return -1

        ans = 0
        for i in range(len(s)):
            if s[i] == t[i]:
                continue
            u = ord(s[i]) - ord('a')
            v = ord(t[i]) - ord('a')
            best = INF
            for c in range(ALPHA):
                if dist[u][c] < INF and dist[v][c] < INF:
                    best = min(best, dist[u][c] + dist[v][c])
            if best == INF:
                return -1
            ans += best
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the approach using the Python code (the other implementations are line-by-line analogous).

1. **Initialize constants and distance matrix**

   ```python
   ALPHA = 26
   INF = 10**12
   dist = [[INF] * ALPHA for _ in range(ALPHA)]
   for i in range(ALPHA):
       dist[i][i] = 0
   ```

   * I choose `ALPHA = 26` for letters `'a'..'z'`.
   * `INF` marks unreachable pairs.
   * Set diagonal `dist[i][i] = 0` because transforming a letter to itself costs zero.

2. **Add direct transformations**

   ```python
   for i in range(len(transform)):
       a = transform[i][0]; b = transform[i][1]
       u = ord(a) - ord('a'); v = ord(b) - ord('a')
       dist[u][v] = min(dist[u][v], cost[i])
   ```

   * For each transform `x -> y` we set the edge weight. `min` handles duplicate transforms with different costs.

3. **All-pairs shortest paths — Floyd–Warshall**

   ```python
   for k in range(ALPHA):
       for i in range(ALPHA):
           if dist[i][k] == INF: continue
           for j in range(ALPHA):
               if dist[k][j] == INF: continue
               via = dist[i][k] + dist[k][j]
               if via < dist[i][j]:
                   dist[i][j] = via
   ```

   * This considers all routes `i -> k -> j` and relaxes `dist[i][j]`.
   * It's efficient here because `ALPHA` is just 26.

4. **Compute total cost position-by-position**

   ```python
   if len(s) != len(t): return -1
   ans = 0
   for i in range(len(s)):
       if s[i] == t[i]: continue
       u = ord(s[i]) - ord('a'); v = ord(t[i]) - ord('a')
       best = INF
       for c in range(ALPHA):
           if dist[u][c] < INF and dist[v][c] < INF:
               best = min(best, dist[u][c] + dist[v][c])
       if best == INF: return -1
       ans += best
   return ans
   ```

   * For each index, try all 26 possible targets `c`.
   * If neither `s[i]` nor `t[i]` can reach same `c`, it's impossible and return `-1`.
   * Add the minimal cost found for each position to `ans`.

**C++ / Java / JavaScript notes:**

* They follow the same structure: build `dist`, run Floyd–Warshall, then find per-index minimal combination.
* Use appropriate large `INF` and avoid integer overflow by using `long`/`long long` where needed.

---

## Examples

Use these to test and verify:

1. Example 1

```
s = "abcc", t = "bccc"
transform = [['a','b'], ['b','c'], ['c','a']]
cost = [2, 1, 4]
Output: 3

Explanation:
- Convert s[0] 'a' -> 'b' cost 2
- Convert s[1] 'b' -> 'c' cost 1
Resulting both into "bccc" with total 3.
```

2. Example 2

```
s = "az", t = "dc"
transform = [['a','b'], ['b','c'], ['c','d'], ['a','d'], ['z','c']]
cost = [5,3,2,50,10]
Output: 20

Explanation:
- Convert s[0] 'a' -> 'd' via a->b->c->d cost 5+3+2 = 10
- Convert s[1] 'z' -> 'c' cost 10
Total = 10 + 10 = 20
```

3. Example 3 (Impossible)

```
s = "xyz", t = "xzy"
transform = [['x','y'], ['x','z']], cost = [3,3]
Output: -1
```

---

## How to use / Run locally

**Repository layout suggestion**

```
MakeStringsEqual/
├─ cpp/               # C++ solution and driver
├─ java/              # Java solution and driver
├─ js/                # JavaScript solution and test file
├─ py/                # Python solution and quick test
└─ README.md
```

### C++

Save `solution.cpp` with the class and a `main()` driver that builds input, calls `minCost` and prints result.

Compile & run:

```bash
g++ -std=c++17 -O2 solution.cpp -o solution
./solution
```

### Java

Save `Solution.java` with a `main` method or create a separate `Main.java` that constructs `Solution` and calls `minCost`.

Compile & run:

```bash
javac Solution.java
java Solution   # or java Main if you put main in Main
```

### JavaScript (Node.js)

Save `solution.js`. Provide a small test harness at bottom to construct inputs and call `new Solution().minCost(...)`.

Run:

```bash
node solution.js
```

### Python3

Save `solution.py`. Add test harness:

```python
if __name__ == "__main__":
    s = "abcc"
    t = "bccc"
    transform = [['a','b'], ['b','c'], ['c','a']]
    cost = [2,1,4]
    sol = Solution()
    print(sol.minCost(s, t, transform, cost))
```

Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* Floyd–Warshall is used because alphabet size is constant (26), so complexity is tiny and implementation is straightforward.
* If alphabet were large or transforms many, we could instead run Dijkstra from each character that appears in `s` or `t` — but for 26 nodes Floyd–Warshall is simpler and fast.
* Use `min` when adding direct transforms to handle duplicates with different costs.
* Use large `INF` values and keep an eye on integer overflow in languages like C++/Java. Cast or use `long` where needed if costs can sum large (here constraints keep it safe).
* Return `-1` as soon as an impossible position is detected to avoid unnecessary work.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
