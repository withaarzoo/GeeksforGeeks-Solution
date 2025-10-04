# Expression Add Operators

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

Given a string `s` that contains only digits (0-9) and an integer `target`, return **all possible strings** by inserting the binary operators `+`, `-`, `*` (or no operator, i.e., concatenation) between the digits of `s` such that the resultant expression evaluates to `target`.

Important details:

* Operands in returned expressions should not contain leading zeros. For example, `2+03` is not allowed while `20+3` is fine.
* It is allowed to not insert any operators at all (the entire string can be treated as a number).
* Return the resulting list in lexicographically smallest (sorted) order.

## Constraints

* `1 <= s.size() <= 9` (so brute-force/backtracking is feasible)
* `s` consists of digits only (`0-9`).
* `target` fits in 32-bit signed range; however intermediate calculations may need 64-bit.

## Intuition

I thought about the problem like this: there are only a few digits (at most 9), so I can try **every way** to split the string into operands and place operators between them. The natural way to explore all combinations is a backtracking / depth-first search. The main twist is handling the `*` operator because it has higher precedence than `+`/`-`. To handle that during a left-to-right construction I remembered the last operand added (with its sign) so I can "undo" it and replace it by the multiplied value when I see a `*`.

Also I must avoid operands with leading zeros (like "05").

## Approach

1. Use DFS/backtracking that walks the string from left to right.
2. At position `pos`, try taking each substring `s[pos:i]` (for `i = pos ... n-1`) as the next operand. Skip if substring has leading zero and length > 1.
3. Convert the substring to a number `val` (use 64-bit integers to be safe).
4. If `pos == 0` (first operand), start the expression with `val` (no operator before it).
5. Otherwise, branch into three recursive calls:

   * `+`: `newValue = curValue + val`, `last = +val`
   * `-`: `newValue = curValue - val`, `last = -val`
   * `*`: because of precedence, replace contribution of `last` with `last * val`:
     `newValue = curValue - last + last * val`, and `newLast = last * val`.
6. When `pos` reaches end of string, check if `curValue == target`. If yes, add the built expression.
7. Sort results lexicographically and return.

## Data Structures Used

* `string` / `StringBuilder` to build expressions.
* `vector<string>` / `ArrayList<String>` / `list` to store results.
* recursion call stack for DFS.

## Operations & Behavior Summary

* Enumerate all possible partitions of `s` into operands.
* For each partition, enumerate choices of operators (`+`, `-`, `*`) between operands.
* Prune invalid operands that start with `0` and have length > 1.
* Use arithmetic with `long long` / `long` to avoid overflow for intermediate steps.
* Sort the result list before returning.

## Complexity

* **Time Complexity:** O(4^(n-1) * n) where `n = len(s)`. Explanation: there are up to `n-1` positions between digits, each can be one of 4 choices (`+`, `-`, `*`, or concatenation) — giving ~`4^(n-1)` combinations. Each expression construction/substring conversion can be O(n) in the worst case. For given constraint `n <= 9`, this is acceptable.

* **Space Complexity:** O(n) recursion depth + O(k * n) to store `k` results (each expression of length O(n)). Additional temporary strings use O(n) each during recursion.

## Multi-language Solutions

### C++

```c++
// C++ implementation (class style, function: findExpr)
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Find all expressions that evaluate to target.
    vector<string> findExpr(string &s, int target) {
        vector<string> res;
        if (s.empty()) return res;
        string expr;
        dfs(0, expr, 0LL, 0LL, res, s, (long long)target);
        sort(res.begin(), res.end());
        return res;
    }

  private:
    // pos: current index in s
    // expr: expression built so far
    // curVal: value of current expression
    // last: last operand (signed) contributed to curVal
    void dfs(int pos, string &expr, long long curVal, long long last,
             vector<string>& res, const string& s, long long target) {
        int n = s.size();
        if (pos == n) {
            if (curVal == target) res.push_back(expr);
            return;
        }

        for (int i = pos; i < n; ++i) {
            // Skip operands with leading zero
            if (i > pos && s[pos] == '0') break;

            string numStr = s.substr(pos, i - pos + 1);
            long long val = stoll(numStr);

            int lenBefore = expr.size(); // remember expr length to backtrack

            if (pos == 0) {
                // First number: no operator
                expr += numStr;
                dfs(i + 1, expr, val, val, res, s, target);
                expr.resize(lenBefore);
            } else {
                // '+'
                expr += '+'; expr += numStr;
                dfs(i + 1, expr, curVal + val, val, res, s, target);
                expr.resize(lenBefore);

                // '-'
                expr += '-'; expr += numStr;
                dfs(i + 1, expr, curVal - val, -val, res, s, target);
                expr.resize(lenBefore);

                // '*'
                expr += '*'; expr += numStr;
                // Adjust using last to respect multiplication precedence
                dfs(i + 1, expr, curVal - last + last * val, last * val, res, s, target);
                expr.resize(lenBefore);
            }
        }
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<String> findExpr(String s, int target) {
        ArrayList<String> res = new ArrayList<>();
        if (s == null || s.length() == 0) return res;
        StringBuilder expr = new StringBuilder();
        dfs(0, expr, 0L, 0L, s, (long)target, res);
        Collections.sort(res);
        return res;
    }

    private void dfs(int pos, StringBuilder expr, long curVal, long last,
                     String s, long target, ArrayList<String> res) {
        int n = s.length();
        if (pos == n) {
            if (curVal == target) res.add(expr.toString());
            return;
        }

        for (int i = pos; i < n; ++i) {
            // leading zero check
            if (i > pos && s.charAt(pos) == '0') break;
            String numStr = s.substring(pos, i + 1);
            long val = Long.parseLong(numStr);

            int lenBefore = expr.length();

            if (pos == 0) {
                // first number, no operator
                expr.append(numStr);
                dfs(i + 1, expr, val, val, s, target, res);
                expr.setLength(lenBefore);
            } else {
                // plus
                expr.append('+').append(numStr);
                dfs(i + 1, expr, curVal + val, val, s, target, res);
                expr.setLength(lenBefore);

                // minus
                expr.append('-').append(numStr);
                dfs(i + 1, expr, curVal - val, -val, s, target, res);
                expr.setLength(lenBefore);

                // multiply
                expr.append('*').append(numStr);
                dfs(i + 1, expr, curVal - last + last * val, last * val, s, target, res);
                expr.setLength(lenBefore);
            }
        }
    }
}
```

### JavaScript

```javascript
class Solution {
    // s: string, target: number
    findExpr(s, target) {
        const res = [];
        if (!s || s.length === 0) return res;
        const n = s.length;

        function dfs(pos, expr, curVal, last) {
            if (pos === n) {
                if (curVal === target) res.push(expr);
                return;
            }

            for (let i = pos; i < n; ++i) {
                if (i > pos && s[pos] === '0') break; // leading zero
                const numStr = s.slice(pos, i + 1);
                const val = Number(numStr);

                if (pos === 0) {
                    dfs(i + 1, numStr, val, val);
                } else {
                    dfs(i + 1, expr + '+' + numStr, curVal + val, val);
                    dfs(i + 1, expr + '-' + numStr, curVal - val, -val);
                    dfs(i + 1, expr + '*' + numStr, curVal - last + last * val, last * val);
                }
            }
        }

        dfs(0, "", 0, 0);
        res.sort();
        return res;
    }
}
```

### Python3

```python3
class Solution:
    def findExpr(self, s, target):
        res = []
        n = len(s)
        if n == 0:
            return res

        def dfs(pos, expr, curVal, last):
            if pos == n:
                if curVal == target:
                    res.append(expr)
                return

            for i in range(pos, n):
                # skip numbers with leading zero
                if i > pos and s[pos] == '0':
                    break
                numStr = s[pos:i+1]
                val = int(numStr)

                if pos == 0:
                    # first number, start expression
                    dfs(i + 1, numStr, val, val)
                else:
                    # plus
                    dfs(i + 1, expr + '+' + numStr, curVal + val, val)
                    # minus
                    dfs(i + 1, expr + '-' + numStr, curVal - val, -val)
                    # multiply: undo last and replace with last * val
                    dfs(i + 1, expr + '*' + numStr, curVal - last + last * val, last * val)

        dfs(0, "", 0, 0)
        res.sort()
        return res
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I explain the essential idea once because all four implementations follow the same DFS/backtracking pattern. When language-specific details matter, I call them out.

1. **Top-level function** (`findExpr`):

   * Initializes result container `res`.
   * Guards against empty input.
   * Kicks off DFS from `pos = 0` with an empty expression, `curVal = 0` and `last = 0`.

2. **DFS parameters**:

   * `pos`: index in `s` we are currently processing.
   * `expr`: current expression as a string (or StringBuilder in Java).
   * `curVal`: evaluated numeric value of `expr` so far.
   * `last`: the last operand's signed contribution to `curVal` (used to handle `*`).

3. **Looping / Partitioning**:

   * For `i` from `pos` to `n-1`, extract substring `s[pos:i+1]` as `numStr`.
   * If `numStr` has leading zero and length > 1, `break` (no valid longer numbers start with this zero).
   * Convert `numStr` to `val` (use `long`/`long long`/`Number`/`int` accordingly).

4. **First operand special case** (`pos == 0`):

   * We do not prepend an operator. Start expression with `numStr` and set `curVal = val`, `last = val`.

5. **Operators** (for non-first operands):

   * `+`: `dfs(nextPos, expr + '+' + numStr, curVal + val, val)`.
   * `-`: `dfs(nextPos, expr + '-' + numStr, curVal - val, -val)`.
   * `*`: multiplication needs precedence handling: remove `last` from `curVal`, then add `last * val`:

     * `newCurVal = curVal - last + last * val`
     * `newLast = last * val`
     * Recurse with `dfs(nextPos, expr + '*' + numStr, newCurVal, newLast)`.

6. **When pos == n**: If `curVal == target`, append `expr` to results.

7. **Backtracking**: After each recursive call, we restore the `expr` (or StringBuilder length) to previous state. In languages with immutable strings (Python/JS), concatenation automatically keeps older `expr` unchanged. In C++ and Java (StringBuilder), remember/restore length to remove appended characters.

### Language-specific notes

* **C++:** I use `stoll` to convert substring to `long long`. I track `expr.size()` before appending and then `resize()` to backtrack.
* **Java:** I use `StringBuilder` for efficient append/trim and `Long.parseLong` for conversion.
* **JavaScript:** `Number(numStr)` converts to numeric value; JS `Number` can handle the ranges we need for `n <= 9` safely. Strings are immutable, no explicit backtracking needed.
* **Python3:** Strings are immutable as well; use `int()` to convert. Use recursion with default Python integers (which are big integers), so overflow isn't a concern.

## Examples

1. Input: `s = "124"`, `target = 9`

   * Output: `["1+2*4"]`
   * Explanation: `1 + 2 * 4 = 9`.

2. Input: `s = "125"`, `target = 7`

   * Output: `["1*2+5", "12-5"]` (lexicographically sorted)
   * Explanation: `1*2 + 5 = 7`, `12 - 5 = 7`.

3. Input: `s = "12"`, `target = 12`

   * Output: `["12"]`
   * Explanation: Using no operator the string itself equals the target.

4. Input: `s = "987612"`, `target = 200`

   * Output: `[]` (no valid expressions)

## How to use / Run locally

### C++

1. Create a `main.cpp` and include the `Solution` class code above. Add a small `main()` to instantiate `Solution` and call `findExpr` with sample inputs.
2. Compile: `g++ -std=c++17 main.cpp -O2 -o solution`
3. Run: `./solution`

Example `main()` snippet:

```c++
int main() {
    string s = "125";
    int target = 7;
    Solution sol;
    vector<string> ans = sol.findExpr(s, target);
    for (auto &e : ans) cout << e << '\n';
    return 0;
}
```

### Java

1. Put the `Solution` class in `Solution.java` and add a `main` method that constructs `Solution` and calls `findExpr`.
2. Compile: `javac Solution.java`
3. Run: `java Solution`

### JavaScript (Node.js)

1. Copy the `Solution` class into `solution.js` and export/instantiate it.
2. Run: `node solution.js` (add a small driver that prints results).

### Python3

1. Save the `Solution` class in `solution.py` or directly test with a small driver:

```python
if __name__ == '__main__':
    s = "125"
    target = 7
    sol = Solution()
    print(sol.findExpr(s, target))
```

2. Run: `python3 solution.py`

## Notes & Optimizations

* The biggest pruning is rejecting operands with leading zeros (e.g., "05"). This greatly reduces the search tree.
* Use 64-bit (`long long`, `long`) for intermediate results because multiplication may grow numbers beyond 32-bit while n <= 9 it's unlikely to overflow 64-bit.
* Sorting results at the end ensures deterministic, lexicographically ordered output.

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
