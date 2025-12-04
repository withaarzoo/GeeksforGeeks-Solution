# Optimal Binary Search Tree

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

* A sorted array `keys[]` of **distinct** keys.
* A frequency array `freq[]` where `freq[i]` tells how many times `keys[i]` is searched.

I need to build a **Binary Search Tree (BST)** from all these keys (order of keys in BST must respect sorted order), such that:

> The **total cost of search** is **minimum**.

Cost of one key = `(level of that key in the BST) * (frequency of that key)`
Root is at **level 1**, its children at **level 2**, and so on.

Goal:
Return the **minimum total search cost** over all possible valid BST structures.

---

## Constraints

* `1 ≤ n = keys.size() = freq.size() ≤ 100`
* `1 ≤ keys[i], freq[i] ≤ 10^4`
* Keys are already sorted and distinct.

---

## Intuition

I thought like this:

* I can’t change the **sorted order** of keys inside the BST (that’s fixed for BST).
* But I **can choose which key becomes root**, which keys go in left subtree, which in right.
* If I move a subtree down by one level, **every node inside becomes more expensive** by its frequency.
* That means for any continuous block of keys `[i..j]`, the choice of root affects:

  * left subtree,
  * right subtree,
  * all of them going 1 level deeper.

This feels like a **range-based Dynamic Programming** problem:

> “For every subarray of keys, I try each key as root and pick the minimum cost.”

---

## Approach

1. **DP State**

   Define:

   ```text
   dp[i][j] = minimum cost to build an optimal BST using keys from i to j (inclusive)
   ```

2. **Prefix Sum for frequencies**

   I will need `sum(freq[i..j])` many times.
   To avoid O(n) summation again and again:

   ```text
   prefixFreq[0] = 0
   prefixFreq[k] = freq[0] + ... + freq[k-1]

   sumFreq(i, j) = prefixFreq[j+1] - prefixFreq[i]
   ```

3. **Base Case**

   For a single key `i`:

   ```text
   dp[i][i] = freq[i]
   ```

   Because that key will be at level 1 inside its subtree → cost = `1 * freq[i]`.

4. **Transition (Main Recurrence)**

   For every segment length `len` from 2 to `n`:

   * Consider segment `[i..j]` where `j = i + len - 1`.

   * Pre-calc:

     ```text
     sumFreq = sumFreq(i, j)  // all frequencies in this segment
     ```

   * Try every key `r` between `i` and `j` as root:

     ```text
     leftCost  = (r > i) ? dp[i][r-1] : 0
     rightCost = (r < j) ? dp[r+1][j] : 0

     costWithRootR = leftCost + rightCost + sumFreq
     dp[i][j] = min(dp[i][j], costWithRootR)
     ```

   * Why `+ sumFreq`?
     Because after choosing `r` as root, **all keys in the left and right subtrees go one level deeper**, so we add total frequencies once.

5. **DP Filling Order**

   * First fill `dp[i][i]` for all `i`.
   * Then for interval length 2, 3, ..., up to `n`.
   * Answer = `dp[0][n-1]`.

---

## Data Structures Used

* **2D DP Array** `dp[n][n]`
  Stores minimum cost for every range `[i..j]`.
* **1D Prefix Sum Array** `prefixFreq[n+1]`
  Lets me compute `sum(freq[i..j])` in O(1).

Both are simple arrays / vectors. No advanced data structures are needed.

---

## Operations & Behavior Summary

* For each subarray of keys `[i..j]`, I:

  * Calculate sum of frequencies in O(1).
  * Try each possible root `r` in `[i..j]`.
  * Combine best left subtree cost and best right subtree cost.
* I always pick the **minimum** cost for `dp[i][j]`.
* End result: global optimal BST cost.

---

## Complexity

Let `n` = number of keys.

* **Time Complexity:** `O(n^3)`

  * There are `O(n^2)` states `(i, j)`.
  * For each state, I try `O(n)` roots `r`.
  * So total ≈ `n * n * n = n^3`.

* **Space Complexity:** `O(n^2)`

  * `dp` is `n x n`.
  * `prefixFreq` is `O(n)`.

Given constraints (`n ≤ 100`), this is totally fine.

---

## Multi-language Solutions

### C++

```c++
class Solution {
  public:
    int minCost(vector<int> &keys, vector<int> &freq) {
        int n = keys.size();
        if (n == 0) return 0;

        // dp[i][j] = minimum cost to build optimal BST from keys[i..j]
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // prefixFreq[k] = sum of freq[0..k-1]
        vector<int> prefixFreq(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            prefixFreq[i + 1] = prefixFreq[i] + freq[i];
        }

        auto rangeSum = [&](int i, int j) -> int {
            return prefixFreq[j + 1] - prefixFreq[i];
        };

        // Base case: single key
        for (int i = 0; i < n; ++i) {
            dp[i][i] = freq[i];
        }

        // Interval length from 2 to n
        for (int len = 2; len <= n; ++len) {
            for (int i = 0; i + len - 1 < n; ++i) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;

                int sumFreq = rangeSum(i, j);

                // Try each key as root
                for (int r = i; r <= j; ++r) {
                    int left  = (r > i) ? dp[i][r - 1] : 0;
                    int right = (r < j) ? dp[r + 1][j] : 0;

                    int cost = left + right + sumFreq;
                    dp[i][j] = min(dp[i][j], cost);
                }
            }
        }

        return dp[0][n - 1];
    }
};
```

---

### Java

```java
class Solution {
    public int minCost(int keys[], int freq[]) {
        int n = keys.length;
        if (n == 0) return 0;

        // dp[i][j] = minimum cost to build optimal BST from keys[i..j]
        int[][] dp = new int[n][n];

        // prefixFreq[k] = sum of freq[0..k-1]
        int[] prefixFreq = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefixFreq[i + 1] = prefixFreq[i] + freq[i];
        }

        // Base case: single key
        for (int i = 0; i < n; i++) {
            dp[i][i] = freq[i];
        }

        // length from 2 to n
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i + len - 1 < n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;

                int sumFreq = prefixFreq[j + 1] - prefixFreq[i];

                for (int r = i; r <= j; r++) {
                    int left  = (r > i) ? dp[i][r - 1] : 0;
                    int right = (r < j) ? dp[r + 1][j] : 0;

                    int cost = left + right + sumFreq;
                    if (cost < dp[i][j]) {
                        dp[i][j] = cost;
                    }
                }
            }
        }

        return dp[0][n - 1];
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} keys
 * @param {number[]} freq
 * @returns {number}
 */
class Solution {
    minCost(keys, freq) {
        const n = keys.length;
        if (n === 0) return 0;

        // dp[i][j] = minimum cost to build optimal BST from keys[i..j]
        const dp = Array.from({ length: n }, () => Array(n).fill(0));

        // prefixFreq[k] = sum of freq[0..k-1]
        const prefixFreq = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            prefixFreq[i + 1] = prefixFreq[i] + freq[i];
        }

        const rangeSum = (i, j) => prefixFreq[j + 1] - prefixFreq[i];

        // Base case: single key
        for (let i = 0; i < n; i++) {
            dp[i][i] = freq[i];
        }

        // length from 2 to n
        for (let len = 2; len <= n; len++) {
            for (let i = 0; i + len - 1 < n; i++) {
                const j = i + len - 1;
                let best = Number.MAX_SAFE_INTEGER;

                const sumFreq = rangeSum(i, j);

                for (let r = i; r <= j; r++) {
                    const left  = (r > i) ? dp[i][r - 1] : 0;
                    const right = (r < j) ? dp[r + 1][j] : 0;

                    const cost = left + right + sumFreq;
                    if (cost < best) best = cost;
                }

                dp[i][j] = best;
            }
        }

        return dp[0][n - 1];
    }
}
```

---

### Python3

```python
class Solution:
    def minCost(self, keys, freq):
        n = len(keys)
        if n == 0:
            return 0

        # dp[i][j] = minimum cost to build optimal BST from keys[i..j]
        dp = [[0] * n for _ in range(n)]

        # prefixFreq[k] = sum of freq[0..k-1]
        prefixFreq = [0] * (n + 1)
        for i in range(n):
            prefixFreq[i + 1] = prefixFreq[i] + freq[i]

        def range_sum(i, j):
            return prefixFreq[j + 1] - prefixFreq[i]

        # Base case: single key
        for i in range(n):
            dp[i][i] = freq[i]

        # length from 2 to n
        for length in range(2, n + 1):
            for i in range(0, n - length + 1):
                j = i + length - 1
                dp[i][j] = float('inf')

                sumFreq = range_sum(i, j)

                for r in range(i, j + 1):
                    left = dp[i][r - 1] if r > i else 0
                    right = dp[r + 1][j] if r < j else 0

                    cost = left + right + sumFreq
                    if cost < dp[i][j]:
                        dp[i][j] = cost

        return dp[0][n - 1]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is same in all languages. I’ll explain once and map to code.

### 1. Building prefix sum

Example in Python:

```python
prefixFreq = [0] * (n + 1)
for i in range(n):
    prefixFreq[i + 1] = prefixFreq[i] + freq[i]
```

* I create an array of size `n+1`.
* `prefixFreq[k]` holds sum of `freq[0..k-1]`.
* This lets me get `sum(freq[i..j])` instantly by:

  ```python
  prefixFreq[j + 1] - prefixFreq[i]
  ```

Same idea exists in C++ (`vector<int> prefixFreq`), Java (`int[] prefixFreq`), and JS (`const prefixFreq = []`).

---

### 2. Initializing DP for single keys

Example in C++:

```c++
for (int i = 0; i < n; ++i) {
    dp[i][i] = freq[i];
}
```

* If I have only one key, the tree is just that node.
* Level = 1 → cost = `1 * freq[i]`.
* So direct assignment.

Same loop is in all four languages.

---

### 3. Iterating over segment lengths

Example in Java:

```java
for (int len = 2; len <= n; len++) {
    for (int i = 0; i + len - 1 < n; i++) {
        int j = i + len - 1;
        dp[i][j] = Integer.MAX_VALUE;

        int sumFreq = prefixFreq[j + 1] - prefixFreq[i];
        ...
    }
}
```

* Outer loop: `len` = current interval length.
* Inner loop: starting index `i`.
* End index `j = i + len - 1`.
* I set `dp[i][j]` to a very large value because I am going to take minimum.
* I precompute `sumFreq` for this segment once.

---

### 4. Trying each root in segment

Example in JavaScript:

```javascript
for (let r = i; r <= j; r++) {
    const left  = (r > i) ? dp[i][r - 1] : 0;
    const right = (r < j) ? dp[r + 1][j] : 0;

    const cost = left + right + sumFreq;
    if (cost < best) best = cost;
}
dp[i][j] = best;
```

* I loop `r` from `i` to `j` (all possible roots).

* If `r == i`, there is **no left subtree** → `left = 0`.

* If `r == j`, there is **no right subtree** → `right = 0`.

* Otherwise, I use already computed `dp` values (since smaller ranges are already solved).

* New total cost:

  ```text
  leftCost + rightCost + sumFreq
  ```

* I keep the minimum in `best` (or directly into `dp[i][j]` in other languages).

Same pattern exists in C++/Java/Python.

---

### 5. Returning final answer

Example in Python:

```python
return dp[0][n - 1]
```

* This corresponds to the full range `[0..n-1]`, i.e., all keys.
* That’s the final minimal search cost.

---

## Examples

### Example 1

```text
keys = [10, 12]
freq = [34, 50]

All possible BSTs:
1)  10 as root, 12 as right child
   cost = 34*1 + 50*2 = 34 + 100 = 134

2)  12 as root, 10 as left child
   cost = 50*1 + 34*2 = 50 + 68 = 118  <-- minimum

Answer: 118
```

### Example 2

```text
keys = [10, 12, 20]
freq = [34, 8, 50]

Optimal structure cost = 142 (as per GFG editorial).
Our DP will compute this minimal cost.
```

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 main.cpp -o main
./main
```

`main.cpp` should include:

```c++
#include <bits/stdc++.h>
using namespace std;

// Paste the Solution class here

int main() {
    vector<int> keys = {10, 12};
    vector<int> freq = {34, 50};

    Solution sol;
    cout << sol.minCost(keys, freq) << endl; // expected 118
    return 0;
}
```

---

### Java

```bash
javac Main.java
java Main
```

`Main.java`:

```java
class Main {
    public static void main(String[] args) {
        int[] keys = {10, 12};
        int[] freq = {34, 50};

        Solution sol = new Solution();
        System.out.println(sol.minCost(keys, freq)); // expected 118
    }
}

// Paste Solution class below
```

---

### JavaScript (Node.js)

```bash
node main.js
```

`main.js`:

```javascript
// Paste Solution class here

const keys = [10, 12];
const freq = [34, 50];

const sol = new Solution();
console.log(sol.minCost(keys, freq)); // expected 118
```

---

### Python3

```bash
python3 main.py
```

`main.py`:

```python
# Paste Solution class here

if __name__ == "__main__":
    keys = [10, 12]
    freq = [34, 50]

    sol = Solution()
    print(sol.minCost(keys, freq))  # expected 118
```

---

## Notes & Optimizations

* Current DP is `O(n^3)` and works fine for `n ≤ 100`.
* There exists a more advanced optimization (Knuth optimization) that can reduce time to `O(n^2)` for this kind of DP, but it needs extra conditions and is more complex.
* Using prefix sums is a key micro-optimization. Without it, each `sumFreq` would be O(n), making total time `O(n^4)`.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
