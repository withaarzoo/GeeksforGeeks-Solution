# Min Add to Make Parentheses Valid

**Problem (LeetCode 921)** — Given a string `s` consisting only of the characters `'('` and `')'`, determine the **minimum** number of parentheses (either `'('` or `')'`) that must be inserted at any positions to make the string `s` a **valid parentheses string**.

A parentheses string is considered **valid** if:

1. Every opening parenthesis `'('` has a corresponding closing parenthesis `')'`.
2. Every closing parenthesis `')'` has a corresponding opening parenthesis `'('`.
3. Parentheses are properly nested.

---

## Problem Set

* **Title:** Min Add to Make Parentheses Valid
* **Difficulty:** Medium
* **Input constraints:** `1 <= s.length <= 10^5`, `s[i]` ∈ {'(', ')'}
* **Expected complexities (hint):** Time O(n), Space O(1)

---

## Examples

```text
Input:  s = "(()("
Output: 2
Explanation: There are two unmatched '(' at the end, so we need to add two ')' to make the string valid.

Input:  s = "))))"
Output: 4
Explanation: Four '(' need to be added at the start to make the string valid.

Input:  s = ")()("
Output: 2
Explanation: The first ')' is unmatched (needs '(' before). Also one '(' at the end needs a ')' after. Total 2.
```

---

## Intuition

I thought about scanning the string from left to right and keeping a small count of how many opening parentheses `'('` are currently unmatched (I'll call it `balance`).

* When I see `'('`, I increase `balance` because it's waiting for a matching `')'`.
* When I see `')'`, I try to match it with a previous unmatched `'('` by decreasing `balance`. If `balance` is zero, there is no `'('` available to match, so I must insert a `'('` (I'll count this insertion separately as `ans`).

At the end of the scan, any remaining `balance` (unmatched `'('`) must be closed with `')'` insertions. The minimum number of insertions is the sum of insertions I counted during the scan (`ans`) plus the leftover `balance`.

---

## Approach

1. Initialize two integer variables:

   * `balance = 0` — number of unmatched `'('` seen so far.
   * `ans = 0` — number of `'('` insertions needed to match unmatched `')'` we encountered.
2. Loop through the characters of `s` from left to right:

   * If the character is `'('`: increment `balance`.
   * If the character is `')'`:

     * If `balance > 0`: decrement `balance` (we matched one `'('`).
     * Else: increment `ans` (we need to insert a `'('` before this `')'`).
3. After the loop ends, `balance` is how many `')'` we need to add at the end. So final answer is `ans + balance`.

This approach uses a single pass and only two integer counters.

---

## Complexity

* **Time Complexity:** `O(n)`, where `n` is the length of the string `s`. We scan the string once.
* **Space Complexity:** `O(1)`. We only use two integer variables regardless of input size.

---

## Solutions (Multi-language)

### C++

```c++
// C++ solution: single-pass, O(n) time, O(1) extra space
#include <string>
using namespace std;

class Solution {
  public:
    int minParentheses(string &s) {
        int balance = 0; // unmatched '('
        int ans = 0;     // '(' insertions needed for unmatched ')'

        for (char c : s) {
            if (c == '(') {
                balance++;            // new unmatched '('
            } else { // c == ')'
                if (balance > 0) {
                    balance--;        // match with existing '('
                } else {
                    ans++;            // need a '(' before this ')'
                }
            }
        }
        return ans + balance; // leftover '(' need closing ')'
    }
};
```

---

### Java

```java
// Java solution: single-pass, O(n) time, O(1) extra space
class Solution {
    public int minParentheses(String s) {
        int balance = 0; // unmatched '('
        int ans = 0;     // '(' insertions needed for unmatched ')'

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                balance++;
            } else { // c == ')'
                if (balance > 0) {
                    balance--;
                } else {
                    ans++; // no '(' to match this ')'
                }
            }
        }
        return ans + balance; // leftover '(' need ')'
    }
}
```

---

### JavaScript (Node-friendly)

```javascript
// JavaScript solution: single-pass, O(n) time, O(1) extra space
// Node usage: const { minParentheses } = require('./solution');

function minParentheses(s) {
    let balance = 0; // unmatched '('
    let ans = 0;     // '(' insertions needed for unmatched ')'

    for (const c of s) {
        if (c === '(') {
            balance++;
        } else { // c === ')'
            if (balance > 0) {
                balance--;
            } else {
                ans++;
            }
        }
    }
    return ans + balance;
}

module.exports = { minParentheses };
```

---

### Python 3

```python3
# Python3 solution: single-pass, O(n) time, O(1) extra space
class Solution:
    def minParentheses(self, s: str) -> int:
        balance = 0  # unmatched '('
        ans = 0      # '(' insertions needed for unmatched ')'

        for c in s:
            if c == '(':
                balance += 1
            else:  # c == ')'
                if balance > 0:
                    balance -= 1
                else:
                    ans += 1

        return ans + balance
```

---

## Step-by-Step Detailed Explanation (I teach a friend)

I'll explain the Python version line-by-line because it's short and easy to read. The same logic maps directly to C++, Java and JavaScript.

```python
balance = 0
ans = 0
```

* I set `balance` to 0. It counts how many `'('` I've seen that are still waiting to be matched.
* I set `ans` to 0. It counts how many `'('` I must insert to match stray `')'` that have no opening before them.

```python
for c in s:
```

* I scan the string `s` from left to right. This ensures I handle matching in the natural order parentheses would be matched.

```python
    if c == '(':
        balance += 1
```

* When I see `'('`, I increment `balance` because it's an unmatched opening parenthesis.

```python
    else:  # c == ')'
        if balance > 0:
            balance -= 1
```

* When I see `')'` and `balance > 0`, it means there is a prior `'('` to match this `')'`. So I reduce `balance` by 1 — one `'('` has been matched.

```python
        else:
            ans += 1
```

* When I see `')'` and `balance == 0`, there is no `'('` available to match. To fix this single `')'`, I'd need to insert a `'('` before it. So I increment `ans`.

```python
return ans + balance
```

* At the end:

  * `ans` counts how many `'('` insertions I needed for stray `')'` (insertions that conceptually occur somewhere before those `')'`).
  * `balance` counts how many unmatched `'('` remain and therefore how many `')'` insertions we must add at the end.
* The minimum total insertions required is the sum `ans + balance`.

---

## Quick Walkthrough Example

Input: \`")()("

* Start: `balance = 0`, `ans = 0`
* `')'`: `balance == 0` → `ans = 1` (we need a '(' before this)
* `'('`: `balance = 1`
* `')'`: `balance > 0` → `balance = 0` (matched)
* `'('`: `balance = 1`
* End: `ans = 1`, `balance = 1` → total = `2` insertions (one '(' at start, one ')' at end).

---

## How to use / Add to your repo

1. Create a folder for this problem, e.g. `min-add-to-make-parentheses-valid/`.
2. Add this README as `README.md` in that folder.
3. Add code files, e.g. `solution.cpp`, `Solution.java`, `solution.js`, `solution.py`, each containing the respective code.
4. Optional: Add a small `tests/` folder with sample inputs and a script to run them.

---

## Contribution

If you'd like the README to include a test harness, more languages (e.g., Go, C#), or a table row for a larger problem set README, tell me which languages or format you prefer and I will add them.

---

*Happy coding!*
