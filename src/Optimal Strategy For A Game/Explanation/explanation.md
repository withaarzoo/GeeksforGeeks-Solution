# Optimal Strategy For A Game

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

I am given an array `arr[]` of **even size `n`**.
Each element is the value of a coin. All coins are placed in a row.

* I play against an opponent.
* On each turn, a player can only pick **either the first coin or the last coin** from the remaining row.
* Both players play **optimally** (no one plays randomly).
* I move **first**.

**Goal:**
Find the **maximum amount of money I can guarantee** to collect by the end of the game.

---

## Constraints

* `2 <= n <= 10^3` (and `n` is even)
* `1 <= arr[i] <= 10^6`

---

## Intuition

I started by thinking:

* If I always pick the bigger coin from the two ends, will that work?
  → No. Because after my greedy move, my opponent might get a better situation and reduce my final gain.

So I realized:

* The decision at any point depends on the **subarray of coins left**.
* For any subarray `arr[i..j]`, if it is my turn, I want to know:

  > “What is the maximum money I can still guarantee from `i` to `j` if both players play perfectly from now on?”

Once I can answer that for every `i` and `j`, I can get the answer for the full array `arr[0..n-1]`.

This is a classic case for **Dynamic Programming** on intervals.

---

## Approach

1. Define `dp[i][j]`:

   * `dp[i][j]` = maximum amount of money I can collect from subarray `arr[i..j]` **if I play first** on that subarray.

2. From subarray `i..j`, I have two choices:

   **Option 1: Pick the left coin `arr[i]`**

   * After I pick `arr[i]`, opponent chooses from `i+1..j`.
   * Opponent is smart and wants to **minimize my future gain**.

   Opponent has two choices:

   * Take `arr[i+1]` → remaining subarray is `i+2..j` → my future gain will be `dp[i+2][j]`
   * Take `arr[j]`   → remaining subarray is `i+1..j-1` → my future gain will be `dp[i+1][j-1]`

   So if I pick left, my guaranteed total is:

   ```text
   arr[i] + min(dp[i+2][j], dp[i+1][j-1])
   ```

   **Option 2: Pick the right coin `arr[j]`**

   * After I pick `arr[j]`, opponent chooses from `i..j-1`.

   Opponent options:

   * Take `arr[i]`   → remaining `i+1..j-1` → I get `dp[i+1][j-1]`
   * Take `arr[j-1]` → remaining `i..j-2`   → I get `dp[i][j-2]`

   So if I pick right, my guaranteed total is:

   ```text
   arr[j] + min(dp[i+1][j-1], dp[i][j-2])
   ```

3. Since I want the best result:

   ```text
   dp[i][j] = max(
       arr[i] + min(dp[i+2][j],   dp[i+1][j-1]),
       arr[j] + min(dp[i+1][j-1], dp[i][j-2])
   )
   ```

4. **Base cases:**

   * Only one coin: `i == j`
     → `dp[i][j] = arr[i]`
   * Two coins: `j == i + 1`
     → `dp[i][j] = max(arr[i], arr[j])`

5. I fill the DP table by increasing **gap** (length of subarray - 1):

   * gap = 0 → length 1
   * gap = 1 → length 2
   * … up to `n-1`.

6. Final answer: `dp[0][n-1]`.

---

## Data Structures Used

* **2D DP Array**

  * Type: `dp[n][n]`
  * `dp[i][j]` stores the best amount I can collect from `arr[i..j]` if I move first on that subarray.

---

## Operations & Behavior Summary

1. **State Transition**

   * For every pair `(i, j)` with `i <= j`, I compute `dp[i][j]` using already computed smaller subproblems:

     * `dp[i+2][j]`, `dp[i+1][j-1]`, `dp[i][j-2]`.

2. **Opponent’s Optimal Play**

   * Opponent tries to **minimize** my total amount.
   * This is why I use `min(...)` inside the formulas for picking left/right.

3. **My Optimal Play**

   * I choose the move (left or right) that gives me the **maximum guaranteed value**.
   * This is why I use `max(...)` between the two options.

4. **Order of Filling**

   * I fill DP from smaller subarrays to larger ones using a `gap` loop.
   * This guarantees all required subproblems are ready when computing a larger segment.

---

## Complexity

* **Time Complexity:** `O(n^2)`

  * There are `n * n` states `(i, j)` and each is computed in constant time.
  * `n` is the number of coins.

* **Space Complexity:** `O(n^2)`

  * We store values for all `dp[i][j]` in a 2D table.
  * No other big data structures are used.

---

## Multi-language Solutions

### C++

```cpp
// Optimal Strategy For A Game - C++ Solution

#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int maximumAmount(vector<int> &arr) {
        int n = (int)arr.size();
        
        // dp[i][j] -> max amount current player can collect from arr[i..j]
        vector<vector<long long>> dp(n, vector<long long>(n, 0));
        
        // gap = length - 1 of subarray
        for (int gap = 0; gap < n; ++gap) {
            for (int i = 0; i + gap < n; ++i) {
                int j = i + gap;
                
                if (i == j) {
                    // Only one coin
                    dp[i][j] = arr[i];
                } else if (j == i + 1) {
                    // Exactly two coins
                    dp[i][j] = max(arr[i], arr[j]);
                } else {
                    // x, y, z are the values after opponent's move
                    long long x = (i + 2 <= j) ? dp[i + 2][j] : 0;
                    long long y = (i + 1 <= j - 1) ? dp[i + 1][j - 1] : 0;
                    long long z = (i <= j - 2) ? dp[i][j - 2] : 0;
                    
                    long long pickLeft  = arr[i] + min(x, y);
                    long long pickRight = arr[j] + min(y, z);
                    
                    dp[i][j] = max(pickLeft, pickRight);
                }
            }
        }
        
        return (int)dp[0][n - 1];
    }
};
```

---

### Java

```java
// Optimal Strategy For A Game - Java Solution

class Solution {
    public int maximumAmount(int arr[]) {
        int n = arr.length;
        
        // dp[i][j] -> max amount current player can collect from arr[i..j]
        long[][] dp = new long[n][n];
        
        // gap = length - 1 of subarray
        for (int gap = 0; gap < n; gap++) {
            for (int i = 0; i + gap < n; i++) {
                int j = i + gap;
                
                if (i == j) {
                    // Only one coin
                    dp[i][j] = arr[i];
                } else if (j == i + 1) {
                    // Two coins
                    dp[i][j] = Math.max(arr[i], arr[j]);
                } else {
                    long x = (i + 2 <= j) ? dp[i + 2][j] : 0;
                    long y = (i + 1 <= j - 1) ? dp[i + 1][j - 1] : 0;
                    long z = (i <= j - 2) ? dp[i][j - 2] : 0;
                    
                    long pickLeft  = arr[i] + Math.min(x, y);
                    long pickRight = arr[j] + Math.min(y, z);
                    
                    dp[i][j] = Math.max(pickLeft, pickRight);
                }
            }
        }
        
        return (int)dp[0][n - 1];
    }
}
```

---

### JavaScript

```javascript
// Optimal Strategy For A Game - JavaScript Solution

// User function Template for javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
    maximumAmount(arr) {
        const n = arr.length;
        
        // dp[i][j] -> max amount current player can collect from arr[i..j]
        const dp = Array.from({ length: n }, () => Array(n).fill(0));
        
        // gap = length - 1 of subarray
        for (let gap = 0; gap < n; gap++) {
            for (let i = 0; i + gap < n; i++) {
                const j = i + gap;
                
                if (i === j) {
                    // Only one coin
                    dp[i][j] = arr[i];
                } else if (j === i + 1) {
                    // Two coins
                    dp[i][j] = Math.max(arr[i], arr[j]);
                } else {
                    const x = (i + 2 <= j) ? dp[i + 2][j] : 0;
                    const y = (i + 1 <= j - 1) ? dp[i + 1][j - 1] : 0;
                    const z = (i <= j - 2) ? dp[i][j - 2] : 0;
                    
                    const pickLeft  = arr[i] + Math.min(x, y);
                    const pickRight = arr[j] + Math.min(y, z);
                    
                    dp[i][j] = Math.max(pickLeft, pickRight);
                }
            }
        }
        
        return dp[0][n - 1];
    }
}
```

---

### Python3

```python
# Optimal Strategy For A Game - Python3 Solution

class Solution:
    def maximumAmount(self, arr):
        n = len(arr)
        
        # dp[i][j] -> max amount current player can collect from arr[i..j]
        dp = [[0] * n for _ in range(n)]
        
        # gap = length - 1 of subarray
        for gap in range(n):
            for i in range(n - gap):
                j = i + gap
                
                if i == j:
                    # Only one coin
                    dp[i][j] = arr[i]
                elif j == i + 1:
                    # Two coins
                    dp[i][j] = max(arr[i], arr[j])
                else:
                    x = dp[i + 2][j] if i + 2 <= j else 0
                    y = dp[i + 1][j - 1] if i + 1 <= j - 1 else 0
                    z = dp[i][j - 2] if i <= j - 2 else 0
                    
                    pick_left = arr[i] + min(x, y)
                    pick_right = arr[j] + min(y, z)
                    
                    dp[i][j] = max(pick_left, pick_right)
        
        return dp[0][n - 1]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below is the shared logic; only syntax differs per language.

### 1. Create DP table

Example (Python, similar idea in all languages):

```python
dp = [[0] * n for _ in range(n)]
```

* I create a 2D table `dp` with `n` rows and `n` columns.
* `dp[i][j]` will store my maximum guaranteed amount from subarray `arr[i..j]`.

---

### 2. Iterate by gap (subarray length - 1)

```python
for gap in range(n):
    for i in range(n - gap):
        j = i + gap
        ...
```

* `gap = 0` → single element subarrays.
* `gap = 1` → subarrays of length 2.
* This ensures smaller subproblems are solved before bigger ones.

---

### 3. Handle base cases

**Single coin (`i == j`):**

```python
if i == j:
    dp[i][j] = arr[i]
```

* Only one coin left, I will simply take it.

**Two coins (`j == i + 1`):**

```python
elif j == i + 1:
    dp[i][j] = max(arr[i], arr[j])
```

* With two coins, I pick the maximum one.

Same pattern is used in C++, Java, and JS inside the nested loops.

---

### 4. Handle general case (more than 2 coins)

```python
x = dp[i + 2][j] if i + 2 <= j else 0
y = dp[i + 1][j - 1] if i + 1 <= j - 1 else 0
z = dp[i][j - 2] if i <= j - 2 else 0

pick_left = arr[i] + min(x, y)
pick_right = arr[j] + min(y, z)

dp[i][j] = max(pick_left, pick_right)
```

* `x`, `y`, `z` are the future states after my opponent plays optimally:

  * `x`: opponent took `i+1` after I took `i`.
  * `y`: opponent took `j` after I took `i` **or** took `i` after I took `j`.
  * `z`: opponent took `j-1` after I took `j`.

* When I choose a side, the opponent will respond in the way that **minimizes my future score**, so I take `min(...)` between possible futures.

* Finally, I choose the better of my two main choices using `max(...)`.

This same logic is directly reflected in all four languages.

---

### 5. Return final result

```python
return dp[0][n - 1]
```

* After filling the table, `dp[0][n-1]` represents the answer for the whole array.

---

## Examples

### Example 1

```text
Input:  arr = [5, 3, 7, 10]
Output: 15
Explanation:
- One optimal way:
  I pick 10 (right end).
  Opponent picks 7.
  I pick 5.
  Total = 10 + 5 = 15.
No strategy can give me more than 15 if opponent is also optimal.
```

### Example 2

```text
Input:  arr = [8, 15, 3, 7]
Output: 22
Explanation:
- One optimal way:
  I pick 8.
  Opponent picks 15.
  I pick 7.
  Total = 8 + 7 = 15. (Not optimal for me)

Better strategy:
  I pick 7.
  Opponent picks 8.
  I pick 15.
  Total = 7 + 15 = 22.
DP proves 22 is the maximum I can guarantee.
```

---

## How to use / Run locally

### 1. C++

```bash
g++ -std=c++17 main.cpp -o game
./game
```

* `main.cpp` should include:

  * The `Solution` class from above.
  * A small driver code that:

    * Reads `n`
    * Reads `n` integers into a `vector<int> arr`
    * Calls `Solution().maximumAmount(arr)` and prints the result.

---

### 2. Java

```bash
javac Main.java
java Main
```

* `Main.java` should:

  * Include the `Solution` class.
  * Have `public static void main(String[] args)` that:

    * Reads `n`, array elements.
    * Creates a `Solution` object.
    * Prints `solution.maximumAmount(arr)`.

---

### 3. JavaScript (Node.js)

```bash
node main.js
```

* `main.js` should:

  * Include the `Solution` class.
  * Read input (e.g., from `fs.readFileSync(0, "utf8")`), build array.
  * Call `new Solution().maximumAmount(arr)` and `console.log` the result.

---

### 4. Python3

```bash
python3 main.py
```

* `main.py` should:

  * Import or define the `Solution` class.
  * Read `n`, then `n` integers.
  * Call `Solution().maximumAmount(arr)` and print the result.

---

## Notes & Optimizations

* The solution already uses optimal `O(n^2)` time and `O(n^2)` space, which fits well within the constraints (`n <= 1000`).
* If we really want to reduce memory, we can explore advanced tricks, but the transitions need up to 2 steps away in both directions, so simple 1D compression is not straightforward.
* The DP idea is reusable for many “take from ends” game problems, especially where both players play optimally.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
