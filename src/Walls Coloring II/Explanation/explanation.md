# Walls Coloring II

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

I am given:

* `n` walls in a row.
* `k` different colors.
* A `costs` matrix of size `n x k`, where:

  * `costs[i][j]` = cost of painting wall `i` with color `j`.

**Rule:**

* No two **adjacent** walls can have the **same color**.

**Goal:**

* Paint all walls such that:

  * The adjacency rule is satisfied.
  * The **total cost** is **minimum**.
* If it is not possible (for example, only 1 color but more than 1 wall), I should return `-1`.

Function signature (as on GeeksforGeeks):

* C++: `int minCost(vector<vector<int>> &costs)`
* Java: `int minCost(int[][] costs)`
* JavaScript: `minCost(costs)`
* Python3: `def minCost(self, costs: List[List[int]]) -> int`

---

## Constraints

Let:

* `n` = number of walls.
* `k` = number of colors.

Typical constraints style (exact limits may vary per platform):

* `1 <= n`
* `1 <= k`
* `costs[i][j] >= 0` and fits in 32-bit integer range.
* Time limit expects better than `O(n * k^2)`.

Special case:

* If `k == 1` and `n > 1` → **impossible**, answer = `-1`.

---

## Intuition

I thought like this:

* For each wall, I have multiple color choices.
* I want to track the **minimum total cost** as I move from wall 0 to wall `n-1`.
* A natural idea is **Dynamic Programming**:

  * `dp[i][c]` = minimum cost to paint walls from `0` to `i`, if wall `i` is painted with color `c`.

Then:

```text
dp[i][c] = costs[i][c] + min(dp[i-1][c'] for all c' != c)
```

But this looks expensive.
For each wall `i` and each color `c`, I am scanning all other colors `c'` → this becomes `O(n * k^2)`.

I wanted something faster.

Then I realized a key trick:

* From the previous row `dp[i-1][*]`, instead of scanning all colors every time,
* I only need:

  * the **smallest** value (`min1`) and its color index (`idx1`),
  * the **second smallest** (`min2`) and its color index (`idx2`).

For the current wall `i`:

* If I choose a color `c` **different** from `idx1`, I can safely use `min1`.
* If I choose the **same color** as `idx1`, I must avoid it and use `min2`.

This reduces everything to **O(n * k)**, which is fast enough.

---

## Approach

Step-by-step how I solved it:

1. Let `n = number of walls`, `k = number of colors`.
2. If `n == 0`, I simply return `0` (no walls to paint).
3. If `k == 1`:

   * If `n == 1`, return the only available cost.
   * Else, return `-1` (cannot avoid same color on adjacent walls).
4. I use a **1D DP array**:

   * `prev[j]` = minimum cost to paint up to the previous wall, where the previous wall uses color `j`.
5. Initialization:

   * For wall `0`, `prev[j] = costs[0][j]` for all `j`.
6. For each next wall `i` from `1` to `n-1`:

   * I scan `prev` to find:

     * `min1` (smallest value), with index `idx1`,
     * `min2` (second smallest), with index `idx2`.
   * For each color `j` at wall `i`:

     * If `j == idx1`, I cannot use `min1` (same color as previous minimum), so I use `min2`.
     * Otherwise, I use `min1`.
     * So:

       ```text
       curr[j] = costs[i][j] + (j == idx1 ? min2 : min1)
       ```

   * After processing all colors, I copy `curr` into `prev` (or swap arrays).
7. At the end, the answer is `min(prev[j])` over all colors `j`.

---

## Data Structures Used

* **1D Array / Vector / List**:

  * `prev` of size `k`: stores minimum costs for the previous wall.
  * `curr` of size `k`: stores costs for the current wall (reused per iteration).
* Primitive variables:

  * `min1`, `min2` for smallest and second smallest values.
  * `idx1`, `idx2` for their indices.

No complex data structures are needed.

---

## Operations & Behavior Summary

* **Initialization:**

  * Fill `prev` with the costs of painting the first wall in each color.
* **Per wall `i` (from 1 to n-1):**

  1. Find the smallest and second smallest values in `prev`.
  2. For each color `j`:

     * Decide which minimum to add:

       * same color as `min1` → use `min2`,
       * else → use `min1`.
     * Store result in `curr[j]`.
  3. Move `curr` values into `prev` (for next iteration).
* **Final result:**

  * Minimum value in `prev` after processing all walls.

---

## Complexity

Let:

* `n` = number of walls.

* `k` = number of colors.

* **Time Complexity:** `O(n * k)`

  * For every wall, I:

    * Scan `prev` once to find `min1` and `min2` → `O(k)`.
    * Fill `curr` once → `O(k)`.
  * Total across all walls → `O(n * k)`.

* **Space Complexity:** `O(k)`

  * I only store two arrays (`prev` and `curr`) of size `k`.
  * No `n x k` DP table is stored.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int minCost(vector<vector<int>> &costs) {
        int n = costs.size();
        if (n == 0) return 0;
        int k = costs[0].size();
        
        // If only one color and more than 1 wall -> impossible
        if (k == 1) {
            if (n == 1) return costs[0][0];
            return -1;
        }
        
        // prev[j] = min cost to paint up to previous wall
        // if previous wall is painted with color j
        vector<long long> prev(k), curr(k);
        
        // Base case: first wall
        for (int j = 0; j < k; j++) {
            prev[j] = costs[0][j];
        }
        
        // Process walls from index 1 to n-1
        for (int i = 1; i < n; i++) {
            long long min1 = LLONG_MAX, min2 = LLONG_MAX;
            int idx1 = -1, idx2 = -1;
            
            // Find smallest and second smallest in prev
            for (int j = 0; j < k; j++) {
                long long val = prev[j];
                if (val < min1) {
                    min2 = min1;
                    idx2 = idx1;
                    min1 = val;
                    idx1 = j;
                } else if (val < min2) {
                    min2 = val;
                    idx2 = j;
                }
            }
            
            // Compute current costs
            for (int j = 0; j < k; j++) {
                long long bestPrev = (j == idx1) ? min2 : min1;
                curr[j] = costs[i][j] + bestPrev;
            }
            
            // Move curr to prev
            prev = curr;
        }
        
        // Final answer: minimum in prev
        long long ans = LLONG_MAX;
        for (int j = 0; j < k; j++) {
            ans = min(ans, prev[j]);
        }
        
        return (int)ans;
    }
}; 
```

---

### Java

```java
class Solution {
    int minCost(int[][] costs) {
        int n = costs.length;
        if (n == 0) return 0;
        int k = costs[0].length;
        
        // If only one color and more than 1 wall -> impossible
        if (k == 1) {
            if (n == 1) return costs[0][0];
            return -1;
        }
        
        // prev[j] = min cost to paint up to previous wall
        // with color j on the previous wall
        long[] prev = new long[k];
        long[] curr = new long[k];
        
        // Base case: first wall
        for (int j = 0; j < k; j++) {
            prev[j] = costs[0][j];
        }
        
        // Process walls from index 1 to n-1
        for (int i = 1; i < n; i++) {
            long min1 = Long.MAX_VALUE, min2 = Long.MAX_VALUE;
            int idx1 = -1, idx2 = -1;
            
            // Find smallest and second smallest in prev
            for (int j = 0; j < k; j++) {
                long val = prev[j];
                if (val < min1) {
                    min2 = min1;
                    idx2 = idx1;
                    min1 = val;
                    idx1 = j;
                } else if (val < min2) {
                    min2 = val;
                    idx2 = j;
                }
            }
            
            // Compute current costs
            for (int j = 0; j < k; j++) {
                long bestPrev = (j == idx1) ? min2 : min1;
                curr[j] = costs[i][j] + bestPrev;
            }
            
            // Swap prev and curr
            long[] temp = prev;
            prev = curr;
            curr = temp;
        }
        
        // Final answer: minimum in prev
        long ans = Long.MAX_VALUE;
        for (int j = 0; j < k; j++) {
            ans = Math.min(ans, prev[j]);
        }
        
        return (int)ans;
    }
} 
```

---

### JavaScript

```javascript
/**
 * @param {number[][]} costs
 * @returns {number}
 */

class Solution {
    minCost(costs) {
        const n = costs.length;
        if (n === 0) return 0;
        const k = costs[0].length;
        
        // If only one color and more than 1 wall -> impossible
        if (k === 1) {
            if (n === 1) return costs[0][0];
            return -1;
        }
        
        // prev[j] = min cost to paint up to previous wall with color j
        let prev = new Array(k);
        let curr = new Array(k);
        
        // Base case: first wall
        for (let j = 0; j < k; j++) {
            prev[j] = costs[0][j];
        }
        
        // Process walls from index 1 to n-1
        for (let i = 1; i < n; i++) {
            let min1 = Number.POSITIVE_INFINITY;
            let min2 = Number.POSITIVE_INFINITY;
            let idx1 = -1, idx2 = -1;
            
            // Find smallest and second smallest in prev
            for (let j = 0; j < k; j++) {
                const val = prev[j];
                if (val < min1) {
                    min2 = min1;
                    idx2 = idx1;
                    min1 = val;
                    idx1 = j;
                } else if (val < min2) {
                    min2 = val;
                    idx2 = j;
                }
            }
            
            // Compute current costs
            for (let j = 0; j < k; j++) {
                const bestPrev = (j === idx1) ? min2 : min1;
                curr[j] = costs[i][j] + bestPrev;
            }
            
            // Copy curr to prev for next iteration
            prev = curr.slice();
        }
        
        // Final answer: minimum in prev
        let ans = Number.POSITIVE_INFINITY;
        for (let j = 0; j < k; j++) {
            if (prev[j] < ans) ans = prev[j];
        }
        
        return ans;
    }
} 
```

---

### Python3

```python
from typing import List

class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        n = len(costs)
        if n == 0:
            return 0
        k = len(costs[0])
        
        # If only one color and more than 1 wall -> impossible
        if k == 1:
            if n == 1:
                return costs[0][0]
            return -1
        
        # prev[j] = min cost to paint up to previous wall with color j
        prev = [0] * k
        curr = [0] * k
        
        # Base case: first wall
        for j in range(k):
            prev[j] = costs[0][j]
        
        # Process remaining walls
        for i in range(1, n):
            # Find smallest and second smallest in prev
            min1 = float('inf')
            min2 = float('inf')
            idx1 = -1
            idx2 = -1
            
            for j in range(k):
                val = prev[j]
                if val < min1:
                    min2 = min1
                    idx2 = idx1
                    min1 = val
                    idx1 = j
                elif val < min2:
                    min2 = val
                    idx2 = j
            
            # Compute current row
            for j in range(k):
                best_prev = min2 if j == idx1 else min1
                curr[j] = costs[i][j] + best_prev
            
            # Move curr to prev
            prev, curr = curr, prev
        
        # Final answer is min value in prev
        return min(prev)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The **core logic** is the same in all four languages.
I’ll explain it once, and then mention small language-specific points.

### 1. Reading the input structure

All versions assume `costs` is a 2D structure:

* `costs[i][j]` = cost to paint wall `i` with color `j`.
* `n = costs.length` (or `costs.size()`).
* `k = costs[0].length`.

### 2. Handling edge cases

In all languages, I do:

* If `n == 0` → return `0`.
* If `k == 1`:

  * If `n == 1` → only one wall and one color, return that cost.
  * Else → impossible to avoid same color for adjacent walls → return `-1`.

This prevents invalid states and unnecessary computation.

### 3. Initializing DP (`prev`)

I create an array:

* C++: `vector<long long> prev(k), curr(k);`
* Java: `long[] prev = new long[k]; long[] curr = new long[k];`
* JS: `let prev = new Array(k); let curr = new Array(k);`
* Python: `prev = [0] * k; curr = [0] * k`

Then I set:

```text
prev[j] = costs[0][j]  for all j
```

This means:
For the first wall, if I use color `j`, the minimum total cost is simply that direct cost.

### 4. Looping through walls

For each wall `i` from `1` to `n-1`:

```text
for i in range(1, n):
    // do DP update using prev -> curr
```

I am always using data from the previous wall (`prev`) to calculate the current one (`curr`).

### 5. Finding min1 and min2

Inside the loop, I find:

* `min1` = smallest value in `prev`
* `min2` = second smallest value in `prev`
* `idx1`, `idx2` = indices (colors) where these values are found

Pseudo-logic:

```text
min1 = +∞, min2 = +∞
idx1 = -1, idx2 = -1

for each color j:
    val = prev[j]
    if val < min1:
        min2 = min1
        idx2 = idx1
        min1 = val
        idx1 = j
    else if val < min2:
        min2 = val
        idx2 = j
```

Intuition:

* I keep track of the two smallest options from the previous wall.
* This allows me to quickly pick the best valid one for each current color.

### 6. Filling `curr` based on `min1` and `min2`

For each color `j` of the current wall:

* If `j == idx1`, I cannot use `min1` (that would mean same color for consecutive walls).

  * So I use `min2`.
* Else, I safely use `min1`.

Formula:

```text
best_prev = (j == idx1) ? min2 : min1
curr[j] = costs[i][j] + best_prev
```

This ensures:

* The adjacency rule is respected.
* I always pick the globally best possible choice from the previous wall.

### 7. Moving to the next iteration

After filling all `curr[j]`:

* C++: `prev = curr;`
* Java: swap arrays using a temp reference.
* JS: `prev = curr.slice();`
* Python: `prev, curr = curr, prev`

Now `prev` holds the DP for wall `i`.
`curr` is free to be reused for the next wall.

### 8. Final answer

Once all walls are processed:

```text
answer = min(prev[j] for all j)
```

This gives the minimum cost to paint all walls where the last wall can have any color.

---

## Examples

### Example 1

```text
Input:
n = 3, k = 3
costs = [
  [1, 5, 3],
  [2, 9, 4],
  [1, 2, 4]
]

Output:
6
```

**Explanation (one possible optimal way):**

* Wall 0: color 0 → cost = 1
* Wall 1: color 2 → cost = 4  (total = 1 + 4 = 5)
* Wall 2: color 1 → cost = 2  (total = 5 + 2 = 7)  → This is one combination.

But the DP finds the **best** combination with cost `6`, like:

* Wall 0: color 2 → cost = 3
* Wall 1: color 0 → cost = 2  (total = 5)
* Wall 2: color 0 or 1 such that adjacency rule holds & cost is minimized
  (The exact sequence depends on the minimal transitions, but total will be `6`.)

### Example 2

```text
Input:
n = 2, k = 1
costs = [
  [5],
  [7]
]

Output:
-1
```

**Explanation:**

* Only one color and two walls.
* Adjacent walls must have different colors, which is impossible here.
* So the answer is `-1`.

---

## How to use / Run locally

Below are simple commands to test the solution locally.
You may need to wrap the class in your own driver code depending on the platform (like reading input and printing output).

### C++

1. Save the code in `solution.cpp`.
2. Add a simple `main()` to test.
3. Compile and run:

```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

### Java

1. Save the code in `Solution.java`.
2. Add a `main` method or use a testing framework.
3. Compile and run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Save the code in `solution.js`.
2. Add test cases at the bottom like:

```javascript
const sol = new Solution();
console.log(sol.minCost([[1,5,3],[2,9,4],[1,2,4]]));
```

3. Run:

```bash
node solution.js
```

### Python3

1. Save the code in `solution.py`.
2. Add test code at the bottom:

```python
if __name__ == "__main__":
    sol = Solution()
    print(sol.minCost([[1,5,3],[2,9,4],[1,2,4]]))
```

3. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* The naive DP `O(n * k^2)` will **TLE** for large `n` and `k`.
  That’s why I focused on the `min1 / min2` trick.
* Using `long long` / `long` is safer to avoid overflow when sums get large.
* I used **only `O(k)` extra space**, which is optimal for this kind of row-based DP.
* This pattern (`keep smallest and second smallest`) is very useful for many problems where:

  * You choose a minimum from previous row,
  * But have a restriction like “cannot use same index/color”.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
