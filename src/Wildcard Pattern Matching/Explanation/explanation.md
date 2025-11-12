# Wildcard Pattern Matching

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

Given two strings `pat` (pattern) and `txt` (text), determine if the pattern matches the entire text.
The pattern may contain two wildcard characters:

* `?` — matches **exactly one** arbitrary character.
* `*` — matches **any sequence** of characters (including the empty sequence).

Return `true` if `pat` matches `txt` completely, otherwise `false`.

Example:

* `txt = "abcde", pat = "a?c*"` → `true` (`?` matches `b`, `*` matches `de`)
* `txt = "abc", pat = "*"` → `true` (`*` matches whole text)
* `txt = "baa", pat = "a*ab"` → `false`

---

## Constraints

* `1 ≤ txt.size(), pat.size() ≤ 100` (as per GeeksforGeeks problem statement)
* Characters are typical ASCII letters (problem assumes plain strings).
* Time and memory constraints require an efficient solution.

---

## Intuition

I thought about how `?` and `*` behave:

* `?` consumes exactly one character from the text.
* `*` can consume zero, one, or many characters.

So I turned this into a decision problem: for prefixes of text and pattern, can they match? That naturally suggests dynamic programming. I define `dp[i][j]` = does `txt[0..i-1]` match `pat[0..j-1]`? Using small subproblems and recurrence based on whether `pat[j-1]` is `*`, `?`, or a normal character, I can fill this table. To reduce memory I keep only two rows (`prev` and `cur`) since each `i` depends only on `i-1`.

---

## Approach

1. Let `n = len(txt)`, `m = len(pat)`.
2. Create two boolean arrays `prev` and `cur` of size `m + 1`. `prev[j]` will represent `dp[i-1][j]`.
3. Initialize `prev[0] = true` (empty text matches empty pattern).
4. Fill `prev[j]` for `i = 0` (empty text): `prev[j]` is true only if all pattern characters up to `j` are `*`.
5. For each `i` from `1..n`:

   * set `cur[0] = false` (non-empty text cannot match empty pattern).
   * for each `j` from `1..m`:

     * if `pat[j-1] == '*'`: `cur[j] = cur[j-1] || prev[j]`

       * `cur[j-1]`: `*` matches empty
       * `prev[j]`: `*` matches one or more (consume `txt[i-1]`)
     * else if `pat[j-1] == '?'` or `pat[j-1] == txt[i-1]`: `cur[j] = prev[j-1]`
     * else: `cur[j] = false`
   * swap `prev` and `cur`.
6. Final answer is `prev[m]` after the outer loop completes.

This is robust and easy to reason about. The DP runs in `O(n*m)` time and `O(m)` space.

---

## Data Structures Used

* Fixed-size boolean arrays / vectors of length `m + 1` (where `m` is pattern length).
* No recursion, no complex containers—simple arrays give predictable memory usage.

---

## Operations & Behavior Summary

* Initialization to cover empty-text vs pattern cases.
* Nested loops: outer over text positions `i`, inner over pattern positions `j`.
* For `*`, combine two possibilities (match empty OR match one character and keep `*` active).
* For `?` and exact characters, delegate to previous smaller prefixes.
* Swap arrays each row to reuse memory.

---

## Complexity

* **Time Complexity:** `O(n * m)` — where `n = len(txt)` and `m = len(pat)`. We process each pair `(i, j)` exactly once.
* **Space Complexity:** `O(m)` — two boolean arrays of size `m+1` (we swap to reuse memory).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    bool wildCard(string &txt, string &pat) {
        int n = txt.size();
        int m = pat.size();
        vector<bool> prev(m + 1, false), cur(m + 1, false);
        prev[0] = true;

        // empty text vs pattern: true only if pattern prefix is all '*'
        for (int j = 1; j <= m; ++j) {
            if (pat[j-1] == '*') prev[j] = prev[j-1];
            else prev[j] = false;
        }

        for (int i = 1; i <= n; ++i) {
            cur[0] = false; // non-empty text can't match empty pattern
            for (int j = 1; j <= m; ++j) {
                if (pat[j-1] == '*') {
                    // '*' matches empty (cur[j-1]) or matches one more char (prev[j])
                    cur[j] = cur[j-1] || prev[j];
                } else if (pat[j-1] == '?' || pat[j-1] == txt[i-1]) {
                    cur[j] = prev[j-1];
                } else {
                    cur[j] = false;
                }
            }
            prev.swap(cur); // reuse arrays
        }
        return prev[m];
    }
};

// Example driver (optional)
int main() {
    Solution s;
    string txt = "abcde", pat = "a?c*";
    cout << (s.wildCard(txt, pat) ? "true\n" : "false\n");
    return 0;
}
```

---

### Java

```java
class Solution {
    public boolean wildCard(String txt, String pat) {
        int n = txt.length();
        int m = pat.length();
        boolean[] prev = new boolean[m + 1];
        boolean[] cur = new boolean[m + 1];
        prev[0] = true;

        // empty text vs pattern: only true if pattern prefix is all '*'
        for (int j = 1; j <= m; ++j) {
            prev[j] = (pat.charAt(j - 1) == '*') && prev[j - 1];
        }

        for (int i = 1; i <= n; ++i) {
            cur[0] = false;
            for (int j = 1; j <= m; ++j) {
                char pc = pat.charAt(j - 1);
                if (pc == '*') {
                    cur[j] = cur[j - 1] || prev[j];
                } else if (pc == '?' || pc == txt.charAt(i - 1)) {
                    cur[j] = prev[j - 1];
                } else {
                    cur[j] = false;
                }
            }
            // swap arrays by copying references
            boolean[] tmp = prev;
            prev = cur;
            cur = tmp;
        }

        return prev[m];
    }

    // Example driver (optional)
    public static void main(String[] args) {
        Solution s = new Solution();
        System.out.println(s.wildCard("abcde", "a?c*")); // expected true
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {string} txt
 * @param {string} pat
 * @return {boolean}
 */
class Solution {
    wildCard(txt, pat) {
        const n = txt.length;
        const m = pat.length;
        let prev = new Array(m + 1).fill(false);
        let cur = new Array(m + 1).fill(false);
        prev[0] = true;

        for (let j = 1; j <= m; ++j) {
            prev[j] = (pat[j - 1] === '*') && prev[j - 1];
        }

        for (let i = 1; i <= n; ++i) {
            cur[0] = false;
            for (let j = 1; j <= m; ++j) {
                const pc = pat[j - 1];
                if (pc === '*') {
                    cur[j] = cur[j - 1] || prev[j];
                } else if (pc === '?' || pc === txt[i - 1]) {
                    cur[j] = prev[j - 1];
                } else {
                    cur[j] = false;
                }
            }
            // swap references
            const tmp = prev;
            prev = cur;
            cur = tmp;
        }

        return prev[m];
    }
}

// Example usage:
const sol = new Solution();
console.log(sol.wildCard("abcde", "a?c*")); // true
```

---

### Python3

```python
class Solution:
    def wildCard(self, txt, pat):
        n = len(txt)
        m = len(pat)
        prev = [False] * (m + 1)
        cur  = [False] * (m + 1)
        prev[0] = True

        # empty text vs pattern: true only if pattern prefix is all '*'
        for j in range(1, m + 1):
            prev[j] = prev[j-1] and (pat[j-1] == '*')

        for i in range(1, n + 1):
            cur[0] = False
            for j in range(1, m + 1):
                pch = pat[j-1]
                if pch == '*':
                    cur[j] = cur[j-1] or prev[j]
                elif pch == '?' or pch == txt[i-1]:
                    cur[j] = prev[j-1]
                else:
                    cur[j] = False
            prev, cur = cur, prev  # swap to reuse arrays

        return prev[m]

# Example driver
if __name__ == "__main__":
    s = Solution()
    print(s.wildCard("abcde", "a?c*"))  # True
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain using the Python code flow — the logic maps directly to all languages.

1. **Variables & Arrays**

   * `n = len(txt)`, `m = len(pat)`.
   * `prev` and `cur` are boolean arrays of size `m + 1`. Index `j` in these arrays represents matching status for `pat[:j]` (first `j` characters).

2. **Base Case: empty text vs empty pattern**

   * `prev[0] = True` because empty text matches empty pattern.

3. **Base Case: empty text vs non-empty pattern**

   * For `j` from `1..m`: `prev[j] = prev[j-1] and (pat[j-1] == '*')`.
   * This means: empty text matches pattern prefix only if all characters so far are `'*'`.
   * Example: pattern `"**"` is effectively empty; pattern `"a*"` is not.

4. **Main DP loop (iterate over text length `i`)**

   * For `i` in `1..n`, process one more character `txt[i-1]`.
   * `cur[0] = False` because a non-empty text cannot match empty pattern.

5. **Inner loop (iterate over pattern length `j`)**

   * If `pat[j-1] == '*'`:

     * `cur[j] = cur[j-1] or prev[j]`
     * `cur[j-1]` => treat `*` as matching empty and check if `pat[:j-1]` matches `txt[:i]`.
     * `prev[j]`  => treat `*` as matching at least one character and check if `pat[:j]` matched `txt[:i-1]` (then `*` takes `txt[i-1]`).
   * Else if `pat[j-1] == '?'` **or** `pat[j-1] == txt[i-1]`:

     * `cur[j] = prev[j-1]` — consume one character and reduce both prefixes by 1.
   * Else:

     * `cur[j] = False` — mismatch.

6. **Swap rows**

   * After finishing the inner loop for this `i`, do `prev, cur = cur, prev` (or swap references in other languages). This readies `prev` for the next iteration, representing `dp[i][*]`.

7. **Final Answer**

   * After processing all characters (`i = n`), `prev[m]` gives whether full `txt` matches full `pat`.

**Why two rows?** Because `dp[i][j]` only depends on `dp[i-1][j]` and `dp[i][j-1]` and `dp[i-1][j-1]`. So you only need the previous `i` row and the current row, saving memory.

---

## Examples

| txt     | pat    | Result                           |
| ------- | ------ | -------------------------------- |
| `abcde` | `a?c*` | `true`                           |
| `abc`   | `*`    | `true`                           |
| `baa`   | `a*ab` | `false`                          |
| ``      | `*`    | `true`                           |
| ``      | ``     | `true`                           |
| `a`     | `?`    | `true`                           |
| `abcd`  | `a*c?` | `true` (if last `?` matches `d`) |

---

## How to use / Run locally

### C++

1. Save the C++ code as `wildcard.cpp`.
2. Compile: `g++ -std=c++17 -O2 wildcard.cpp -o wildcard`
3. Run: `./wildcard`

### Java

1. Save Java code as `Solution.java`.
2. Compile: `javac Solution.java`
3. Run: `java Solution`

### JavaScript (Node.js)

1. Save JavaScript code as `wildcard.js`.
2. Run: `node wildcard.js`

### Python3

1. Save Python code as `wildcard.py`.
2. Run: `python3 wildcard.py`

For each, you can modify the example driver or wire it into an online judge input loop.

---

## Notes & Optimizations

* **Space optimization:** We use `O(m)` space by storing only two rows. This is typically sufficient for constraints up to a few thousand. If patterns/text are extremely large, consider streaming or greedy/backtracking solutions.
* **Greedy two-pointer approach:** There exists a linear-ish greedy solution that uses two pointers and remembers the last `*` position to backtrack if needed. That solution can be faster in practice and uses `O(1)` extra memory, but it is trickier to implement correctly in all edge-cases (especially sequences of `*` and empty pattern/text combinations).
* **Preprocessing pattern:** You can compress consecutive `*` characters into a single `*` because multiple `*` behave the same as one. This can reduce `m`. Example: convert `"a**b***c"` → `"a*b*c"`.
* **Why DP is safe:** DP covers all cases reliably (no tricky backtracking). It's robust for interviews and contest settings.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
