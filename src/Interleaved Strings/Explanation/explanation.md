# Interleaved Strings

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

Given strings `s1`, `s2`, and `s3`, determine whether `s3` is formed by an interleaving of `s1` and `s2`. Interleaving means `s3` contains all characters of `s1` and `s2` and the relative order of characters from each string is preserved.

**Example**

* `s1 = "AAB"`, `s2 = "AAC"`, `s3 = "AAAABC"` -> `true`
* `s1 = "AB"`, `s2 = "C"`, `s3 = "ACB"` -> `true`
* `s1 = "YX"`, `s2 = "X"`, `s3 = "XXY"` -> `false`

---

## Constraints

* `1 ≤ s1.length, s2.length ≤ 300`
* `1 ≤ s3.length ≤ 600`
* All strings contain printable characters (e.g., ASCII letters).

A quick necessary check: `len(s1) + len(s2) == len(s3)` must hold; otherwise return `false`.

---

## Intuition

I thought about how forming `s3` by interleaving `s1` and `s2` only depends on how many characters we have taken so far from each string. That suggests a dynamic programming (DP) solution: define a boolean state that tells me whether it is possible to form the first `k` characters of `s3` using some prefix of `s1` and some prefix of `s2`. The index `k` equals `i + j` when we used `i` chars from `s1` and `j` chars from `s2`. Building this DP table row-by-row lets me decide if `s3` is reachable.

To reduce memory, I store only one row (1D DP) and update it in-place; also I use the shorter of the two input strings for this 1D array to minimize space.

---

## Approach

1. If lengths don't add up (`len(s1) + len(s2) != len(s3)`), return `false`.
2. Use DP where `dp[j]` means: using the current number `i` of characters from `s1` (outer loop) and `j` characters from `s2`, can I form the first `i + j` characters of `s3`?
3. Initialize `dp[0] = true`. Initialize first row (i = 0) using only `s2`.
4. Iterate `i` from `1..len(s1)`:

   * Update `dp[0]` to reflect taking characters from `s1` only.
   * For each `j` from `1..len(s2)`, `dp[j]` is true if either:

     * previous `dp[j]` was true and `s1[i-1] == s3[i+j-1]` (we take char from `s1`), OR
     * `dp[j-1]` was true and `s2[j-1] == s3[i+j-1]` (we take char from `s2`).
5. Return `dp[len(s2)]` after finishing loops.

I choose the shorter of `s1` and `s2` to be the one mapped to `dp` indices to reduce space.

---

## Data Structures Used

* 1D boolean array `dp` of length `min(len(s1), len(s2)) + 1`.
* Primitive string indexing and length checks.

---

## Operations & Behavior Summary

* Length validation: `O(1)` check.
* Initialize first row of DP with comparisons between prefixes of `s2` and `s3`.
* For each `i` (0..n) and each `j` (0..m), one boolean assignment with two character comparisons at most.
* In-place update of `dp` to reuse memory from previous row.

---

## Complexity

* **Time Complexity:** `O(n * m)`, where `n = len(s1)` and `m = len(s2)`. We evaluate each DP cell once.
* **Space Complexity:** `O(min(n, m))`. We keep one array sized to the smaller string plus one.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Check if s3 is an interleaving of s1 and s2
    bool isInterleave(string &s1, string &s2, string &s3) {
        int n = s1.size(), m = s2.size();
        if (n + m != (int)s3.size()) return false;

        // Use the shorter string as the one mapped to dp array for less memory
        if (m > n) {
            swap(s1, s2);
            swap(n, m);
        }

        vector<bool> dp(m + 1, false);
        dp[0] = true;

        // Initialize using only s2 to form prefix of s3
        for (int j = 1; j <= m; ++j)
            dp[j] = dp[j - 1] && (s2[j - 1] == s3[j - 1]);

        // Fill DP row by row using s1
        for (int i = 1; i <= n; ++i) {
            dp[0] = dp[0] && (s1[i - 1] == s3[i - 1]); // using s1 only for j=0
            for (int j = 1; j <= m; ++j) {
                bool fromS1 = dp[j] && (s1[i - 1] == s3[i + j - 1]);
                bool fromS2 = dp[j - 1] && (s2[j - 1] == s3[i + j - 1]);
                dp[j] = fromS1 || fromS2;
            }
        }

        return dp[m];
    }
};
```

### Java

```java
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int n = s1.length(), m = s2.length();
        if (n + m != s3.length()) return false;

        // Use shorter string as dp axis
        if (m > n) {
            String tmp = s1; s1 = s2; s2 = tmp;
            int t = n; n = m; m = t;
        }

        boolean[] dp = new boolean[m + 1];
        dp[0] = true;

        // initialize using only s2
        for (int j = 1; j <= m; ++j)
            dp[j] = dp[j - 1] && (s2.charAt(j - 1) == s3.charAt(j - 1));

        for (int i = 1; i <= n; ++i) {
            dp[0] = dp[0] && (s1.charAt(i - 1) == s3.charAt(i - 1));
            for (int j = 1; j <= m; ++j) {
                boolean fromS1 = dp[j] && (s1.charAt(i - 1) == s3.charAt(i + j - 1));
                boolean fromS2 = dp[j - 1] && (s2.charAt(j - 1) == s3.charAt(i + j - 1));
                dp[j] = fromS1 || fromS2;
            }
        }

        return dp[m];
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @returns {boolean}
 */
class Solution {
    isInterleave(s1, s2, s3) {
        let n = s1.length, m = s2.length;
        if (n + m !== s3.length) return false;

        // ensure s2 is the shorter for minimal dp
        if (m > n) {
            [s1, s2] = [s2, s1];
            [n, m] = [m, n];
        }

        const dp = new Array(m + 1).fill(false);
        dp[0] = true;

        for (let j = 1; j <= m; ++j) {
            dp[j] = dp[j - 1] && (s2[j - 1] === s3[j - 1]);
        }

        for (let i = 1; i <= n; ++i) {
            dp[0] = dp[0] && (s1[i - 1] === s3[i - 1]);
            for (let j = 1; j <= m; ++j) {
                let fromS1 = dp[j] && (s1[i - 1] === s3[i + j - 1]);
                let fromS2 = dp[j - 1] && (s2[j - 1] === s3[i + j - 1]);
                dp[j] = fromS1 || fromS2;
            }
        }

        return dp[m];
    }
}
```

### Python3

```python3
class Solution:
    def isInterleave(self, s1, s2, s3):
        n, m = len(s1), len(s2)
        if n + m != len(s3):
            return False

        # make s2 the shorter string to minimize dp size
        if m > n:
            s1, s2 = s2, s1
            n, m = m, n

        dp = [False] * (m + 1)
        dp[0] = True

        # initialize using s2 only
        for j in range(1, m + 1):
            dp[j] = dp[j - 1] and (s2[j - 1] == s3[j - 1])

        for i in range(1, n + 1):
            dp[0] = dp[0] and (s1[i - 1] == s3[i - 1])
            for j in range(1, m + 1):
                takeFromS1 = dp[j] and (s1[i - 1] == s3[i + j - 1])
                takeFromS2 = dp[j - 1] and (s2[j - 1] == s3[i + j - 1])
                dp[j] = takeFromS1 or takeFromS2

        return dp[m]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the key steps and map them to lines in the code (conceptual mapping — the logic is identical across all languages).

1. **Length check**

   ```pseudo
   if len(s1) + len(s2) != len(s3): return false
   ```

   This immediately filters impossible cases.

2. **Swap to ensure smaller DP array**

   ```pseudo
   if len(s2) > len(s1): swap(s1, s2)
   ```

   We want the DP array of size `min(n, m) + 1` so memory is minimal. Swapping means loops still work because roles are symmetrical.

3. **DP array initialization**

   ```pseudo
   dp = [False] * (m + 1)
   dp[0] = True
   for j = 1..m:
       dp[j] = dp[j-1] and (s2[j-1] == s3[j-1])
   ```

   * `dp[0] = True` means empty `s1` and `s2` forms empty `s3`.
   * Each `dp[j]` after initialization answers: using 0 chars from `s1` and `j` from `s2`, can I form first `j` chars of `s3`? This is just checking prefix equality of `s2` and `s3`.

4. **Main DP loops**
   Outer loop: iterate `i` from `1..n` (using characters from `s1`)
   First update `dp[0]`:

   ```pseudo
   dp[0] = dp[0] and (s1[i-1] == s3[i-1])
   ```

   This checks whether first `i` of `s1` alone match first `i` of `s3`.

   Inner loop for `j = 1..m`:

   ```pseudo
   fromS1 = dp[j] and s1[i-1] == s3[i+j-1]
   fromS2 = dp[j-1] and s2[j-1] == s3[i+j-1]
   dp[j] = fromS1 or fromS2
   ```

   * `fromS1` means: before taking `s1[i-1]`, the state `dp[j]` (which holds previous row value for same `j`) was true — so we can extend by matching next char from `s1`.
   * `fromS2` means: by taking one more char from `s2` (`j-1` → `j`), `dp[j-1]` (already updated in current row) was true and `s2[j-1]` equals the needed char in `s3`.
   * We iterate `j` left-to-right to ensure `dp[j-1]` is the updated current row value while `dp[j]` is still the previous row value — the ordering lets us use one array safely.

5. **Final result**
   After all loops, `dp[m]` corresponds to using all characters of `s1` and `s2` to form `s3`.

---

## Examples

| s1    | s2    | s3       | Output |
| ----- | ----- | -------- | ------ |
| "AAB" | "AAC" | "AAAABC" | true   |
| "AB"  | "C"   | "ACB"    | true   |
| "YX"  | "X"   | "XXY"    | false  |

---

## How to use / Run locally

### C++

1. Save the C++ solution into `solution.cpp`. For testing create a `main` that constructs `Solution` and calls `isInterleave`.
2. Compile:

   ```bash
   g++ -std=c++17 -O2 solution.cpp -o solution
   ```

3. Run:

   ```bash
   ./solution
   ```

   (If you added a test `main`, it will print results.)

**Simple test `main` snippet to add to the bottom of the file:**

```c++
#include <iostream>
int main() {
    Solution sol;
    string s1="AAB", s2="AAC", s3="AAAABC";
    cout << (sol.isInterleave(s1,s2,s3) ? "true\n" : "false\n");
    return 0;
}
```

### Java

1. Create `Solution.java` with the `Solution` class. For running, add a `public class Main` with `main()` to call `isInterleave`.
2. Compile:

   ```bash
   javac Main.java
   ```

3. Run:

   ```bash
   java Main
   ```

**Main example:**

```java
public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isInterleave("AAB","AAC","AAAABC"));
    }
}
```

### JavaScript (Node.js)

1. Save the class in `solution.js`. Add a runner section at the bottom:

```javascript
const sol = new Solution();
console.log(sol.isInterleave("AAB","AAC","AAAABC"));
```

2. Run:

```bash
node solution.js
```

### Python3

1. Save to `solution.py` with the `Solution` class and a small runner:

```python
if __name__ == "__main__":
    sol = Solution()
    print(sol.isInterleave("AAB","AAC","AAAABC"))
```

2. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* The algorithm uses `O(min(n,m))` space by picking the smaller string for the DP axis. This reduces memory for unbalanced input lengths.
* The DP is computed in-place left-to-right for `j` to preserve values needed from the previous row (`dp[j]`) and current row (`dp[j-1]`).
* If you only need a yes/no answer, this approach is optimal in space among standard DP solutions for this problem.
* If inputs are extremely long and characters are simple (like ASCII), micro-optimizations (like using `char` arrays instead of repeated `charAt()` or using bitsets for specific alphabets) are possible but usually unnecessary given the constraints.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
