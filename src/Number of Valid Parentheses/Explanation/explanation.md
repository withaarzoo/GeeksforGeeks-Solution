# Number of Valid Parentheses

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given a number **n**, which represents the **length of a parentheses string**.
My task is to **count how many valid parentheses expressions** can be formed using only:

* opening bracket `(`
* closing bracket `)`

### A parentheses string is valid if

* Every opening bracket has a matching closing bracket
* Brackets are closed in the correct order

This problem is **only about counting**, not generating the strings.

---

## Constraints

* `1 ≤ n ≤ 20`
* If `n` is **odd**, no valid parentheses string is possible

---

## Intuition

When I saw the examples, I noticed a clear pattern:

* n = 2 → 1 way → `()`
* n = 4 → 2 ways → `(())`, `()()`
* n = 6 → 5 ways

Then I realized something important.

A valid parentheses string:

* always has equal number of `(` and `)`
* means `n` must be even
* uses `n / 2` pairs of parentheses

This is a **classic Catalan Number problem**.

So instead of generating all strings (which is slow),
I directly **calculate the Catalan number** using Dynamic Programming.

---

## Approach

I solved this problem using **Dynamic Programming**.

My step-by-step approach:

1. If `n` is odd, return `0`
2. Let `pairs = n / 2`
3. Create a DP array where
   `dp[i]` = number of valid parentheses using `i` pairs
4. Base case:
   `dp[0] = 1` (empty string is valid)
5. Use Catalan formula to fill DP
6. Return `dp[pairs]`

This avoids recursion and unnecessary string generation.

---

## Data Structures Used

* **Array / Vector**

  * Used to store DP values for Catalan numbers
* No stacks or recursion required

---

## Operations & Behavior Summary

* Checks if input is valid (even length)
* Converts length into number of pairs
* Uses Catalan DP formula
* Counts only valid combinations
* Returns the final count efficiently

---

## Complexity

* **Time Complexity:** `O(k²)`
  where `k = n / 2`
  Because we calculate each Catalan value using a nested loop

* **Space Complexity:** `O(k)`
  Only a DP array of size `n/2 + 1` is used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findWays(int n) {
        if (n % 2 != 0) return 0;

        int pairs = n / 2;
        vector<long long> dp(pairs + 1, 0);
        dp[0] = 1;

        for (int i = 1; i <= pairs; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - j - 1];
            }
        }
        return dp[pairs];
    }
};
```

---

### Java

```java
class Solution {
    int findWays(int n) {
        if (n % 2 != 0) return 0;

        int pairs = n / 2;
        long[] dp = new long[pairs + 1];
        dp[0] = 1;

        for (int i = 1; i <= pairs; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - j - 1];
            }
        }
        return (int) dp[pairs];
    }
}
```

---

### JavaScript

```javascript
class Solution {
    findWays(n) {
        if (n % 2 !== 0) return 0;

        const pairs = n / 2;
        const dp = new Array(pairs + 1).fill(0);
        dp[0] = 1;

        for (let i = 1; i <= pairs; i++) {
            for (let j = 0; j < i; j++) {
                dp[i] += dp[j] * dp[i - j - 1];
            }
        }
        return dp[pairs];
    }
}
```

---

### Python3

```python
class Solution:
    def findWays(self, n):
        if n % 2 != 0:
            return 0

        pairs = n // 2
        dp = [0] * (pairs + 1)
        dp[0] = 1

        for i in range(1, pairs + 1):
            for j in range(i):
                dp[i] += dp[j] * dp[i - j - 1]

        return dp[pairs]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Handle invalid length

If `n` is odd, valid parentheses are impossible.
So I return `0` immediately.

---

### Step 2: Convert length into pairs

Each valid parentheses needs **one opening and one closing bracket**.
So total pairs = `n / 2`.

---

### Step 3: Initialize DP

I create a DP array where:

* `dp[i]` stores valid combinations using `i` pairs
* `dp[0] = 1` because empty string is valid

---

### Step 4: Apply Catalan Formula

For each `i`:

* split pairs into left and right
* multiply their valid counts
* add all possibilities

This guarantees **only valid sequences** are counted.

---

### Step 5: Return final answer

The result is stored in `dp[n / 2]`.

---

## Examples

| Input | Output |
| ----- | ------ |
| n = 2 | 1      |
| n = 4 | 2      |
| n = 6 | 5      |
| n = 7 | 0      |

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp
./a.out
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python

```bash
python solution.py
```

---

## Notes & Optimizations

* This solution avoids recursion
* Faster than backtracking or brute force
* Works efficiently within given constraints
* This logic is reusable for:

  * Binary Search Tree count
  * Mountain ranges
  * Valid expression counting

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
