# Problem Title

Minimum Cost to Cut a Stick of length N

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

I am given a wooden stick of length `n` (positions labeled `0` to `n`) and an array `cuts[]` containing unique positions where I must make cuts. Each time I make a cut, the cost of that cut equals the current length of the stick segment being cut. After a cut, the segment splits into two subsegments and I continue until all requested cuts are performed. I can perform cuts in any order. My task is to compute the **minimum total cost** to perform all the cuts.

Example:

* `n = 10`, `cuts = [2,4,7]` → minimum cost = 20 (cut order [4,2,7] gives cost 10 + 4 + 6 = 20)

---

## Constraints

* `2 ≤ n ≤ 10^6`
* `1 ≤ cuts[i] ≤ n - 1`
* `1 ≤ cuts.size() ≤ 100` (practical upper bound for this DP approach)

We typically measure `m = cuts.size() + 2` (including `0` and `n`).

---

## Intuition

I thought of the stick as a set of sorted positions (including endpoints `0` and `n`). If I consider any interval `[i, j]` between two of these positions, the cost to finish all cuts inside that interval equals the length of that interval plus the minimal costs to fully cut the left and right subintervals produced by the first cut inside `[i, j]`. That naturally leads to an interval dynamic programming solution: compute minimal cost for every interval by trying every possible first cut inside it.

---

## Approach

1. Add `0` and `n` to the `cuts` list and sort it. Call the sorted array `pos`.
2. Define `dp[i][j]` = minimum cost to perform all cuts strictly between `pos[i]` and `pos[j]`. If `j == i + 1` (adjacent positions), then `dp[i][j] = 0` (no cuts to perform).
3. For an interval `(i, j)` with at least one cut inside, try each possible index `k` where `i < k < j` as the first cut inside this interval:

   * Cost if I pick `k` first = `pos[j] - pos[i] + dp[i][k] + dp[k][j]`.
   * `dp[i][j]` = minimum of these costs over all valid `k`.
4. Fill `dp` for increasing interval sizes (lengths), bottom-up.
5. Answer is `dp[0][m-1]` where `m = pos.length`.

This is a standard interval DP. For `p` requested cuts, `m = p + 2`.

---

## Data Structures Used

* Sorted list/array of cut positions including `0` and `n`.
* 2D array `dp` of size `m x m` to store minimal costs for each interval.

---

## Operations & Behavior Summary

* Sorting the cut positions (O(m log m)).
* Iterating over all intervals (O(m^2) intervals), and for each interval attempting all possible splits (up to O(m) choices) → total O(m^3) time.
* `dp[i][j]` stores the minimal cost for the open interval inside endpoints `i` and `j`.

---

## Complexity

* **Time Complexity:** `O(m^3)` where `m = cuts.size() + 2`.
  Explanation: There are `O(m^2)` intervals and for each interval we try up to `O(m)` possible first cuts.

* **Space Complexity:** `O(m^2)` for the DP table.

Given `cuts.size()` ≤ 100 in typical constraints, `m ≤ 102`, this is acceptable.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int minCutCost(int n, vector<int>& cuts) {
        // Add endpoints and sort
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        int m = cuts.size();
        // dp[i][j] = min cost to perform all cuts between cuts[i] and cuts[j]
        vector<vector<int>> dp(m, vector<int>(m, 0));
        // len = j - i
        for (int len = 2; len < m; ++len) {
            for (int i = 0; i + len < m; ++i) {
                int j = i + len;
                int best = INT_MAX;
                for (int k = i + 1; k < j; ++k) {
                    int cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j];
                    if (cost < best) best = cost;
                }
                dp[i][j] = (best == INT_MAX) ? 0 : best;
            }
        }
        return dp[0][m-1];
    }
};
```

### Java

```java
import java.util.Arrays;

class Solution {
    public int minCutCost(int n, int[] cutsArr) {
        int p = cutsArr.length;
        int m = p + 2;
        int[] cuts = new int[m];
        for (int i = 0; i < p; ++i) cuts[i] = cutsArr[i];
        cuts[p] = 0;
        cuts[p + 1] = n;
        Arrays.sort(cuts);
        int[][] dp = new int[m][m];
        for (int len = 2; len < m; ++len) {
            for (int i = 0; i + len < m; ++i) {
                int j = i + len;
                int best = Integer.MAX_VALUE;
                for (int k = i + 1; k < j; ++k) {
                    int cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j];
                    if (cost < best) best = cost;
                }
                dp[i][j] = (best == Integer.MAX_VALUE) ? 0 : best;
            }
        }
        return dp[0][m-1];
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
class Solution {
    minCutCost(n, cuts) {
        cuts.push(0);
        cuts.push(n);
        cuts.sort((a, b) => a - b);
        const m = cuts.length;
        const dp = Array.from({ length: m }, () => Array(m).fill(0));
        for (let len = 2; len < m; ++len) {
            for (let i = 0; i + len < m; ++i) {
                const j = i + len;
                let best = Number.POSITIVE_INFINITY;
                for (let k = i + 1; k < j; ++k) {
                    const cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j];
                    if (cost < best) best = cost;
                }
                dp[i][j] = (best === Number.POSITIVE_INFINITY) ? 0 : best;
            }
        }
        return dp[0][m-1];
    }
}
```

### Python3

```python
class Solution:
    def minCutCost(self, n, cuts):
        # copy to avoid modifying caller's list
        cuts = cuts[:]
        cuts.append(0)
        cuts.append(n)
        cuts.sort()
        m = len(cuts)
        dp = [[0] * m for _ in range(m)]
        # length is j - i
        for length in range(2, m):
            for i in range(0, m - length):
                j = i + length
                best = float('inf')
                for k in range(i + 1, j):
                    cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j]
                    if cost < best:
                        best = cost
                dp[i][j] = 0 if best == float('inf') else best
        return dp[0][m-1]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below is the same logic explained in simple steps. The code in each language follows these steps, only syntax differs.

1. **Add endpoints & sort**

   * I add `0` and `n` to the cuts array and sort. This gives me positions that include the boundaries so I can treat the whole stick as an interval `[0, m-1]`.

2. **Define DP table**

   * `dp[i][j]` = minimal cost to perform all cuts strictly between `pos[i]` and `pos[j]`. Initialize `dp` with zeros. Adjacent positions (`j == i+1`) have no cuts inside, so cost `0`.

3. **Iterate interval sizes**

   * Iterate `len` (or `length`) from `2` to `m-1`. A `len` of 2 means there is room for exactly one internal cut (i..i+2).

4. **For each interval try all possible first cuts**

   * For interval `(i, j)` try each `k` in `(i, j)` as first cut. If I cut at `pos[k]` first:

     * immediate cost = `pos[j] - pos[i]` (length of current interval)
     * remaining cost = `dp[i][k] + dp[k][j]` (costs to cut left and right subintervals)
     * total = `pos[j] - pos[i] + dp[i][k] + dp[k][j]`
   * Take minimal total among all possible `k` and store in `dp[i][j]`.

5. **Return answer**

   * The minimal cost to cut the entire stick at all requested positions is `dp[0][m-1]`.

### Per-language notes (mapping to code)

* **C++**

  * Use `vector<vector<int>> dp(m, vector<int>(m,0));`.
  * Loop structure `for (int len=2; len<m; ++len) { for (int i=0; i+len<m; ++i) { int j = i+len; ... }}`.
  * Use `INT_MAX` as sentinel.

* **Java**

  * Use a 2D `int[][] dp = new int[m][m];`.
  * Use `Integer.MAX_VALUE` for sentinel.
  * Pass `int[]` as input, convert to include endpoints.

* **JavaScript**

  * Use array-of-arrays `dp` built with `Array.from`.
  * Use `Number.POSITIVE_INFINITY` as sentinel.

* **Python3**

  * Use list comprehension `dp = [[0] * m for _ in range(m)]`.
  * Use `float('inf')` as sentinel.

---

## Examples

1. Input: `n = 10`, `cuts = [2,4,7]`
   Output: `20`
   Explanation: Cutting in order `[4,2,7]` gives costs `10 + 4 + 6 = 20`.

2. Input: `n = 8`, `cuts = [1,6,3,5]`
   Output: `19`
   Explanation: Cutting in order `[3,6,1,5]` (one optimal order) gives `8 + 5 + 3 + 3 = 19`.

---

## How to use / Run locally

Replace example input values in a small wrapper `main` routine, or embed the provided `Solution` class into your testing harness.

### C++

1. Save the `Solution` class to `solution.cpp`. Add a `main()` that reads input and prints `Solution().minCutCost(...)`.
2. Compile and run:

```bash
g++ -std=c++17 solution.cpp -O2 -o solution
./solution
```

### Java

1. Save the `Solution` class to `Solution.java`. Add a `public static void main(String[] args)` to call `new Solution().minCutCost(...)`.
2. Compile and run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Wrap the class into a script that constructs `Solution` and calls `minCutCost`.
2. Run:

```bash
node solution.js
```

### Python3

1. Save provided `Solution` class into `solution.py` and add a small test at the bottom:

```python
if __name__ == "__main__":
    s = Solution()
    print(s.minCutCost(10, [2,4,7]))  # expects 20
```

2. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* The DP is `O(m^3)` and `O(m^2)` space. For `m ≤ ~100` this is perfectly fine and fast in practice.
* If `cuts.size()` were much larger, we could explore:

  * **Top-down memoization** to avoid computing unreachable intervals (same worst-case complexity).
  * **Advanced optimizations** like **Knuth optimization** or **divide-and-conquer DP optimization** if the cost function satisfies required quadrangle/monotonicity properties. However, this particular cost structure doesn't trivially guarantee the monotonicity required for Knuth optimization across all inputs, so any such optimization requires formal verification before applying.
* Always sort `cuts` before DP and include endpoints `0` and `n` to simplify the interval setup.
* Memory: if memory is a concern, it may be possible to compress or use sparse representations, but the straightforward dense `m x m` DP is most readable and performant for constraints given.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
