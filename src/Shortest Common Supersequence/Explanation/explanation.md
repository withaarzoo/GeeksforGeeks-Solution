# Problem Title

**Shortest Common Supersequence (Length)**

---

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

Given two strings `s1` and `s2`, find the length of the **shortest string** that has **both** `s1` and `s2` as **subsequences** (not necessarily contiguous).
Return only the **length** of that shortest common supersequence (SCS).

---

## Constraints

* `1 ≤ |s1|, |s2| ≤ 500`
* Strings can contain **uppercase** and **lowercase** English letters.

---

## Intuition

I thought: if I know the **Longest Common Subsequence (LCS)** of the two strings, then the characters that are common and aligned in order need to appear **only once** in the final supersequence. Everything else must be added.
So the formula becomes:

> **SCS length = |s1| + |s2| − LCS(|s1|, |s2|)**

Now the task is just to compute the **LCS length** efficiently.

---

## Approach

1. Let `n = len(s1)`, `m = len(s2)`.
2. Compute **LCS length** using dynamic programming.
3. Use **two 1-D arrays** (`prev` and `cur`) of size `m+1` to save memory.
4. Transition:

   * If `s1[i-1] == s2[j-1]` → `cur[j] = 1 + prev[j-1]`
   * Else → `cur[j] = max(prev[j], cur[j-1])`
5. After each `i` loop, swap `prev` and `cur`, and reset `cur` to zeros.
6. The answer is `n + m − prev[m]`.

---

## Data Structures Used

* **Two arrays** of integers of size `m+1` for DP (`prev` and `cur`).
* This reduces memory from `O(n*m)` to **`O(min(n, m))`** by always keeping the shorter string as columns.

---

## Operations & Behavior Summary

* Compare characters of `s1` and `s2` in a grid-like fashion.
* Build the LCS length row by row using only previous row information.
* Convert LCS length to SCS length using the formula.

---

## Complexity

* **Time Complexity:** `O(n * m)` — each pair `(i, j)` is processed once.
* **Space Complexity:** `O(min(n, m))` — only two rows of the DP table are stored.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int minSuperSeq(string &s1, string &s2) {
        int n = s1.size(), m = s2.size();
        // Ensure s2 is the shorter string to minimize memory
        if (m > n) return minSuperSeq(s2, s1);

        vector<int> prev(m + 1, 0), cur(m + 1, 0);

        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j <= m; ++j) {
                if (s1[i - 1] == s2[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = max(prev[j], cur[j - 1]);
                }
            }
            prev.swap(cur);
            fill(cur.begin(), cur.end(), 0);
        }

        int lcs = prev[m];
        return n + m - lcs;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public static int minSuperSeq(String s1, String s2) {
        int n = s1.length(), m = s2.length();
        // Keep s2 as shorter for O(min) memory
        if (m > n) return minSuperSeq(s2, s1);

        int[] prev = new int[m + 1];
        int[] cur  = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            int[] tmp = prev; prev = cur; cur = tmp;
            Arrays.fill(cur, 0);
        }

        int lcs = prev[m];
        return n + m - lcs;
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s1
 * @param {string} s2
 * @returns {number}
 */
class Solution {
    minSuperSeq(s1, s2) {
        let n = s1.length, m = s2.length;
        // Keep s2 as the shorter one to use O(min) memory
        if (m > n) return this.minSuperSeq(s2, s1);

        let prev = new Array(m + 1).fill(0);
        let cur  = new Array(m + 1).fill(0);

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            [prev, cur] = [cur, prev];
            cur.fill(0);
        }

        const lcs = prev[m];
        return n + m - lcs;
    }
}
```

### Python3

```python
class Solution:
    def minSuperSeq(self, s1, s2):
        n, m = len(s1), len(s2)
        # Keep s2 shorter to minimize space
        if m > n:
            return self.minSuperSeq(s2, s1)

        prev = [0] * (m + 1)
        cur  = [0] * (m + 1)

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev, cur = cur, [0] * (m + 1)

        lcs = prev[m]
        return n + m - lcs
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. **Goal shift to LCS:**
   Because `SCS = n + m − LCS`, we only need the **LCS length**.

2. **DP Meaning:**
   Let `dp[i][j]` be the LCS length of prefixes `s1[0..i-1]` and `s2[0..j-1]`.

3. **Transitions:**

   * If characters match (`s1[i-1] == s2[j-1]`), they extend the LCS:
     `dp[i][j] = 1 + dp[i-1][j-1]`
   * If they don’t match, skip one char from either side:
     `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

4. **Space Optimization:**
   We only need the **previous row** when computing the **current row**.
   So we keep two arrays:

   * `prev[j]` represents `dp[i-1][j]`
   * `cur[j]` represents `dp[i][j]` while building the row
     After finishing row `i`, swap `prev` and `cur`, and reset `cur` to zeros.

5. **Final Step:**
   After all iterations, `prev[m]` holds the LCS length.
   Return `n + m − prev[m]`.

This runs in `O(n*m)` time with `O(min(n, m))` space.

---

## Examples

**Example 1**

* `s1 = "geek"`, `s2 = "eke"`
* `LCS("geek","eke") = "eek"` → length `3`
* `SCS length = 4 + 3 − 3 = 4`
  (One valid SCS: `"geeke"`; length is 5, but the shortest is `"geek"` + `"e"` merged → length 4.)

**Example 2**

* `s1 = "AGGTAB"`, `s2 = "GXTXAYB"`
* `LCS length = 4` (e.g., `"GTAB"`)
* `SCS length = 6 + 7 − 4 = 9`

**Example 3**

* `s1 = "geek"`, `s2 = "ek"`
* `LCS length = 2` (`"ek"`)
* `SCS length = 4 + 2 − 2 = 4`

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 scs.cpp -o scs
./scs
```

*`scs.cpp` should contain the C++ class and a small main to read inputs and print the answer.*

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

```bash
node scs.js
```

### Python3

```bash
python3 scs.py
```

**Sample main (pseudo-I/O):**

```
Input:
geek
eke

Output:
4
```

---

## Notes & Optimizations

* This implementation returns the **length** of SCS.
  If you need the **actual SCS string**, you can:

  1. first compute the full 2D DP LCS table,
  2. backtrack to build the SCS by merging characters while walking from `(n, m)` to `(0, 0)`.
* We swap the strings to ensure the **column** dimension is the shorter one, reducing memory to `O(min(n, m))`.
* Works well within constraints (`≤ 500`), even with worst-case `O(n*m)` operations.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
