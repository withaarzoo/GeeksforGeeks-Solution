# Brackets in Matrix Chain Multiplication

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

We’re given an array `arr[]` of length `n` which represents the dimensions of a chain of matrices:

* Matrix 1: `arr[0] x arr[1]` → `A`
* Matrix 2: `arr[1] x arr[2]` → `B`
* …
* Matrix `n-1`: `arr[n-2] x arr[n-1]` → up to `Z` (since max matrices ≤ 26)

We need to **find the parenthesization (bracketing) of this chain that minimizes the total number of scalar multiplications** and **return that bracketing as a string**, using:

* Uppercase letters `A, B, C, ...` for matrices
* Parentheses `"(" and ")"` for grouping, e.g. `((AB)C)`

We don’t return the cost itself, only the **string** representing the optimal multiplication order.

---

## Constraints

* `2 ≤ arr.size() ≤ 50`
* `1 ≤ arr[i] ≤ 100`
* Number of matrices = `arr.size() - 1` ≤ 49 (problem statement conceptually expects ≤ 26 for naming A–Z)
* Matrix multiplication is **non-commutative**:
  `A * B != B * A` (in general)
* We must minimize the **number of scalar multiplications**, not the number of matrices or brackets.

---

## Intuition

I started by recalling the classic **Matrix Chain Multiplication** problem.

* Direct brute force would try **all possible ways to put brackets**, which quickly explodes (exponential).
* But matrix multiplication is **associative**, so:

  * `(AB)C` and `A(BC)` lead to the same final matrix shape
  * but not the same cost.

So I thought:

> "For each sub-chain of matrices, I should remember the minimum cost and how I split it."

That gives pure **Dynamic Programming** vibes:

* For matrices from `i` to `j`, I can try each possible split `k` in between.
* I combine the best left side and right side and add the cost of multiplying both results.
* Then I store not only the **minimum cost** but also **which split `k` produced it**.

Once I know the best split for every range `[i, j]`, I can **reconstruct the optimal brackets** by recursively following those splits and mapping indices → letters (`1 -> 'A'`, `2 -> 'B'`, ...).

---

## Approach

1. Let there be `N = arr.size() - 1` matrices, named `A, B, C, ...`.

2. Define a DP table:

   * `dp[i][j]` = minimum cost to multiply matrices from `i` to `j` (1-based index on matrices).
   * `split[i][j]` = the index `k` where the optimal split occurs for range `[i, j]`.

3. Base Case:

   * For any single matrix `i` (`i == j`), cost is `0` because no multiplication is needed:

     ```text
     dp[i][i] = 0
     ```

4. Fill the DP table using increasing chain length:

   * For `len` from `2` to `N`:

     * For each `i`:

       * `j = i + len - 1`
       * Initialize `dp[i][j]` to a very large value (infinity).
       * For each possible split `k` in `[i, j-1]`:

         * Left cost: `dp[i][k]`
         * Right cost: `dp[k+1][j]`
         * Cost to multiply the resulting matrices:

           ```text
           arr[i-1] * arr[k] * arr[j]
           ```

         * Total cost:

           ```text
           cost = dp[i][k] + dp[k+1][j] + arr[i-1] * arr[k] * arr[j]
           ```

         * If `cost` is smaller than current `dp[i][j]`, update:

           * `dp[i][j] = cost`
           * `split[i][j] = k`

5. After filling:

   * `dp[1][N]` is the minimum multiplication cost.
   * `split` tells us how to reconstruct the **optimal bracket structure**.

6. Reconstruct the parenthesization:

   * Use a recursive function `build(i, j)`:

     * If `i == j` → we have only one matrix, return its letter (e.g. `'A' + (i-1)`).
     * Else:

       * `k = split[i][j]`
       * Left string = `build(i, k)`
       * Right string = `build(k+1, j)`
       * Return `"(" + left + right + ")"`

7. Final answer:

   ```text
   return build(1, N)
   ```

---

## Data Structures Used

* **2D Array / Vector / List `dp`**

  * Type: `dp[N+1][N+1]`
  * Purpose: store minimum scalar multiplication cost for each sub-chain `[i, j]`.

* **2D Array / Vector / List `split`**

  * Type: `split[N+1][N+1]`
  * Purpose: store the best splitting index `k` that gives minimal cost for `[i, j]`.

* **Recursive function** for building the result string:

  * Uses `split` table and returns concatenated strings with parentheses.

No complex data structures beyond 2D arrays and recursion.

---

## Operations & Behavior Summary

1. **Initialization**

   * `dp[i][i] = 0` for all `i` (1…N).
   * `dp[i][j]` for `i != j` starts as `infinity`.

2. **DP Filling**

   * For each chain length from 2 to N:

     * For each starting index `i`:

       * Compute `j = i + len - 1`
       * Try all possible `k` in `[i, j-1]` and update `dp[i][j]` and `split[i][j]`.

3. **Reconstruction**

   * Start from whole chain `[1, N]`.
   * Recursively split at `split[i][j]`.
   * Map matrix index → character.
   * Build final bracketed expression.

4. **Result**

   * Returns a string like `((AB)C)` or `((A(BC))D)` which corresponds to minimal cost.

---

## Complexity

Let `N = number of matrices = arr.length - 1`.

* **Time Complexity:** `O(N^3)`

  * For each pair `(i, j)` (there are `O(N^2)` such pairs),
  * we iterate over `k` from `i` to `j-1` → `O(N)` choices.
  * Total: `O(N^2 * N) = O(N^3)`.

* **Space Complexity:** `O(N^2)`

  * We store two `N x N` tables: `dp` and `split`.
  * Recursive depth is at most `N`, which is `O(N)` extra stack, but overshadowed by `O(N^2)`.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string matrixChainOrder(vector<int> &arr) {
        int n = arr.size();
        int N = n - 1; // number of matrices
        
        // dp[i][j] = minimum cost to multiply matrices from i to j (1-based)
        vector<vector<long long>> dp(N + 1, vector<long long>(N + 1, 0));
        // split[i][j] = index k where we split optimally between i and j
        vector<vector<int>> split(N + 1, vector<int>(N + 1, 0));
        
        // length of chain from 2 to N (1 matrix needs 0 cost)
        for (int len = 2; len <= N; ++len) {
            for (int i = 1; i + len - 1 <= N; ++i) {
                int j = i + len - 1;
                dp[i][j] = LLONG_MAX;
                // try all possible splits
                for (int k = i; k < j; ++k) {
                    long long cost = dp[i][k] + dp[k+1][j]
                                   + 1LL * arr[i-1] * arr[k] * arr[j];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        split[i][j] = k;
                    }
                }
            }
        }
        
        // helper lambda to build the answer string using recursion
        function<string(int,int)> build = [&](int i, int j) -> string {
            if (i == j) {
                // single matrix -> just its letter
                char ch = 'A' + (i - 1);
                return string(1, ch);
            }
            int k = split[i][j];
            string left = build(i, k);
            string right = build(k + 1, j);
            return "(" + left + right + ")";
        };
        
        return build(1, N);
    }
};
```

---

### Java

```java
class Solution {
    public String matrixChainOrder(int arr[]) {
        int n = arr.length;
        int N = n - 1; // number of matrices
        
        long[][] dp = new long[N + 1][N + 1];
        int[][] split = new int[N + 1][N + 1];
        
        // For len = 2..N
        for (int len = 2; len <= N; len++) {
            for (int i = 1; i + len - 1 <= N; i++) {
                int j = i + len - 1;
                dp[i][j] = Long.MAX_VALUE;
                
                for (int k = i; k < j; k++) {
                    long cost = dp[i][k] + dp[k+1][j]
                              + 1L * arr[i-1] * arr[k] * arr[j];
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                        split[i][j] = k;
                    }
                }
            }
        }
        
        // Recursive builder
        return build(1, N, split);
    }
    
    private String build(int i, int j, int[][] split) {
        if (i == j) {
            char ch = (char)('A' + (i - 1));
            return String.valueOf(ch);
        }
        int k = split[i][j];
        String left = build(i, k, split);
        String right = build(k + 1, j, split);
        return "(" + left + right + ")";
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {string}
 */
class Solution {
    matrixChainOrder(arr) {
        const n = arr.length;
        const N = n - 1; // number of matrices
        
        // dp[i][j]: minimum cost from matrix i to j (1-based)
        const dp = Array.from({ length: N + 1 }, () =>
            Array(N + 1).fill(0)
        );
        // split[i][j]: best split position k
        const split = Array.from({ length: N + 1 }, () =>
            Array(N + 1).fill(0)
        );
        
        for (let len = 2; len <= N; len++) {
            for (let i = 1; i + len - 1 <= N; i++) {
                const j = i + len - 1;
                let best = Number.MAX_SAFE_INTEGER;
                let bestK = i;
                
                for (let k = i; k < j; k++) {
                    const cost = dp[i][k] + dp[k + 1][j]
                               + arr[i - 1] * arr[k] * arr[j];
                    if (cost < best) {
                        best = cost;
                        bestK = k;
                    }
                }
                dp[i][j] = best;
                split[i][j] = bestK;
            }
        }
        
        // recursive builder
        const build = (i, j) => {
            if (i === j) {
                return String.fromCharCode('A'.charCodeAt(0) + (i - 1));
            }
            const k = split[i][j];
            const left = build(i, k);
            const right = build(k + 1, j);
            return "(" + left + right + ")";
        };
        
        return build(1, N);
    }
}
```

---

### Python3

```python
class Solution:
    def matrixChainOrder(self, arr):
        n = len(arr)
        N = n - 1  # number of matrices
        
        # dp[i][j] = minimum cost from matrix i to j (1-based)
        dp = [[0] * (N + 1) for _ in range(N + 1)]
        # split[i][j] = best split index k
        split = [[0] * (N + 1) for _ in range(N + 1)]
        
        # length is the chain length
        for length in range(2, N + 1):
            for i in range(1, N - length + 2):
                j = i + length - 1
                dp[i][j] = float('inf')
                best_k = i
                for k in range(i, j):
                    cost = (dp[i][k] + dp[k+1][j] +
                            arr[i-1] * arr[k] * arr[j])
                    if cost < dp[i][j]:
                        dp[i][j] = cost
                        best_k = k
                split[i][j] = best_k
        
        # recursive function to build the answer string
        def build(i, j):
            if i == j:
                # convert 1-based index to letter
                return chr(ord('A') + i - 1)
            k = split[i][j]
            left = build(i, k)
            right = build(k + 1, j)
            return "(" + left + right + ")"
        
        return build(1, N)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core idea is identical in all four languages, so I’ll explain the shared logic, and you can map it to your preferred language.

1. **Convert dimensions to matrix count**

   ```text
   N = arr.length - 1
   ```

   * If `arr = [40, 20, 30, 10, 30]` → matrices: A(40x20), B(20x30), C(30x10), D(10x30) → `N = 4`.

2. **Create DP and split tables**

   ```text
   dp[N+1][N+1]
   split[N+1][N+1]
   ```

   * `dp[i][j]` = minimum cost for matrices `i..j`.
   * `split[i][j]` = `k` where we split `[i..j]` optimally.

3. **Initialize base cases**

   * For any single matrix `i`:

     ```text
     dp[i][i] = 0
     ```

   * Nothing to multiply, so cost is zero.

4. **Fill for increasing chain lengths**

   * Outer loop: `length = 2 .. N`
   * For each starting `i`:

     * `j = i + length - 1`
     * Set `dp[i][j] = INF`.
   * Inner loop: try all `k` in `[i, j-1]`:

     ```text
     cost = dp[i][k] + dp[k+1][j] + arr[i-1] * arr[k] * arr[j]
     ```

     * `dp[i][k]` → left sub-chain cost
     * `dp[k+1][j]` → right sub-chain cost
     * `arr[i-1] * arr[k] * arr[j]` → multiplying resulting matrices from those two sub-chains.
   * If `cost < dp[i][j]`:

     * Update `dp[i][j]` and `split[i][j] = k`.

5. **Rebuild the bracket string**

   * Define:

     ```text
     build(i, j):
       if i == j: return char('A' + (i-1))
       k = split[i][j]
       left = build(i, k)
       right = build(k+1, j)
       return "(" + left + right + ")"
     ```

   * Start with `build(1, N)`.

6. **Return final result**

   * String with full optimal parenthesization.

Language-specific notes:

* **C++/Java**: use `long long` / `long` to avoid overflow in cost.
* **JavaScript**: rely on `Number` (safe for given constraints).
* **Python**: integers are unbounded, so no overflow issues.

---

## Examples

### Example 1

```text
Input:  arr = [40, 20, 30, 10, 30]
Matrices: A(40x20), B(20x30), C(30x10), D(10x30)

One optimal answer: ((A(BC))D)
Total minimum cost:
B * C: 20*30*10  = 6000
A * (BC): 40*20*10 = 8000
(A(BC)) * D: 40*10*30 = 12000
Total = 6000 + 8000 + 12000 = 26000
Output string: "((A(BC))D)" or equivalent minimal pattern
```

*(Note: depending on implementation, another equivalent minimal bracketing may also exist, but it will have the same minimal cost.)*

### Example 2

```text
Input:  arr = [10, 20, 30]
Matrices: A(10x20), B(20x30)

Only one way to multiply: (AB)
Cost = 10 * 20 * 30 = 6000
Output: "(AB)"
```

### Example 3

```text
Input:  arr = [10, 20, 30, 40]
Matrices: A(10x20), B(20x30), C(30x40)

Two options:
(AB)C → cost = 10*20*30 + 10*30*40 = 6000 + 12000 = 18000
A(BC) → cost = 20*30*40 + 10*20*40 = 24000 + 8000 = 32000

Minimum is 18000, so answer: "((AB)C)"
```

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 -O2 main.cpp -o main
./main
```

* Make sure `main.cpp` includes:

  * the `Solution` class,
  * a simple `main()` reading `n` and the array, then calling `matrixChainOrder`.

### Java

```bash
javac Main.java
java Main
```

* `Main.java` should:

  * include the `Solution` class,
  * in `public static void main`, create `Solution`, pass the array, print output.

### JavaScript (Node.js)

```bash
node main.js
```

* `main.js`:

  * includes the `Solution` class,
  * create `const sol = new Solution();`,
  * call `sol.matrixChainOrder(arr)` and `console.log` result.

### Python3

```bash
python3 main.py
```

* `main.py`:

  * includes the `Solution` class,
  * create `Solution()` and call `matrixChainOrder(arr)`,
  * print the result.

You can adapt input/output format as per GeeksforGeeks driver code if you integrate this directly there.

---

## Notes & Optimizations

* This is the **standard DP solution** for Matrix Chain Multiplication with reconstruction.
* Complexity `O(N^3)` is acceptable for `N ≤ 49` in constraints.
* You could also implement a **top-down (memoized recursion)** version; complexity remains `O(N^3)`, but code structure changes from iterative to recursive.
* For very large `N`, more advanced algorithms exist, but are unnecessary here.
* Ensure matrix index → letter mapping doesn’t exceed `'Z'`.
  The problem usually ensures `N ≤ 26` in practice when using A–Z.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
