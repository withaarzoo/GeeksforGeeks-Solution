# Possible Words From Phone Digits

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

Given an array of digits (each element in range 0–9), generate all possible words formed by pressing those digits on a classic phone keypad. Each digit maps to a small set of letters:

* 2 → `abc`, 3 → `def`, 4 → `ghi`, 5 → `jkl`, 6 → `mno`, 7 → `pqrs`, 8 → `tuv`, 9 → `wxyz`
* 0 and 1 do **not** map to letters and should be **skipped** while forming words.

Return all possible strings formed by choosing one letter for each digit (in order), skipping any `0` or `1`. If after skipping there are no digits that map to letters, return an empty list.

---

## Constraints

* `1 ≤ arr.size() ≤ 9` (typical constraint on problems from this family)
* `0 ≤ arr[i] ≤ 9`
* Output size can grow exponentially: worst case digit `7`/`9` have 4 letters → up to `4^n` combinations

---

## Intuition

I thought about how pressing digits sequentially on a phone picks one letter per digit to form a final word. That naturally becomes a branching process: at each digit I choose one of its mapped letters and move to the next digit. This is classic backtracking. I also realized `0` and `1` contribute nothing, so instead of failing or returning an empty result when they appear, I should **skip** them and continue with the rest of the digits.

---

## Approach

1. Create a mapping array indexed by digit: `mapping[2] = "abc"`, ..., `mapping[9] = "wxyz"`. `mapping[0]` and `mapping[1]` are empty strings.
2. Use recursion (DFS/backtracking) with an index to the current digit and a builder for the partial word.
3. At each step:

   * If digit maps to letters, iterate letters: append one, recurse to next index, then undo append.
   * If digit maps to empty (0 or 1), just recurse to next index (skip).
4. When index reaches the end, if the built string is non-empty, add it to results.
5. Return the results list.

This approach enumerates each valid word exactly once and preserves lexicographic order with respect to the mapping order.

---

## Data Structures Used

* Fixed-size string array (length 10) for digit-to-letters mapping.
* Dynamic list/array for results (vector/ArrayList/array).
* StringBuilder (or list of chars) for incremental building during recursion.
* Recursion stack of maximum depth `n` (number of digits).

---

## Operations & Behavior Summary

* For each digit, we either:

  * Branch into its letters (3 or 4 branches), or
  * Skip the digit if it’s 0 or 1.
* Each full path from root → leaf forms a word; we collect it.
* If after skipping `0`/`1` no letters remain, we return an empty list.
* We guard against invalid digits (outside 0–9) by ignoring/returning.

---

## Complexity

* **Time Complexity:** O(n *M) where `n` is the number of digits and `M` is the number of generated words. Worst-case each digit maps to 4 letters → `M = 4^n`. Thus worst-case time O(n* 4^n).
* **Space Complexity:** O(n *M) to store the output plus O(n) recursion stack for building a word. Output typically dominates, so O(n* 4^n) worst-case.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Accepts a vector<int> representing digits and returns all possible words
    vector<string> possibleWords(const vector<int> &arr) {
        static const vector<string> mapping = {
            "", "", "abc", "def", "ghi",
            "jkl", "mno", "pqrs", "tuv", "wxyz"
        };

        vector<string> res;
        string cur;
        function<void(size_t)> dfs = [&](size_t idx) {
            if (idx == arr.size()) {
                if (!cur.empty()) res.push_back(cur);
                return;
            }
            int d = arr[idx];
            if (d < 0 || d > 9) return;          // guard
            const string &letters = mapping[d];
            if (letters.empty()) {               // skip 0 and 1
                dfs(idx + 1);
                return;
            }
            for (char ch : letters) {
                cur.push_back(ch);
                dfs(idx + 1);
                cur.pop_back();
            }
        };
        dfs(0);
        return res;
    }
};

// Example driver (compile and run to test)
// int main() {
//     Solution s;
//     vector<int> arr = {8, 8, 1};
//     auto ans = s.possibleWords(arr);
//     for (auto &w : ans) cout << w << ' ';
//     cout << endl;
// }
```

---

### Java

```java
import java.util.*;

class Solution {
    private static final String[] DIGIT_TO_CHARS = {
        "",    // 0
        "",    // 1
        "abc", // 2
        "def", // 3
        "ghi", // 4
        "jkl", // 5
        "mno", // 6
        "pqrs",// 7
        "tuv", // 8
        "wxyz" // 9
    };

    public ArrayList<String> possibleWords(int[] arr) {
        ArrayList<String> res = new ArrayList<>();
        if (arr == null || arr.length == 0) return res;
        backtrack(arr, 0, new StringBuilder(), res);
        return res;
    }

    private void backtrack(int[] arr, int idx, StringBuilder cur, ArrayList<String> res) {
        if (idx == arr.length) {
            if (cur.length() > 0) res.add(cur.toString());
            return;
        }
        int d = arr[idx];
        if (d < 0 || d > 9) return; // guard
        String letters = DIGIT_TO_CHARS[d];
        if (letters.isEmpty()) {    // skip 0 and 1
            backtrack(arr, idx + 1, cur, res);
            return;
        }
        for (int i = 0; i < letters.length(); ++i) {
            cur.append(letters.charAt(i));
            backtrack(arr, idx + 1, cur, res);
            cur.deleteCharAt(cur.length() - 1);
        }
    }

    // Example main:
    // public static void main(String[] args) {
    //     Solution s = new Solution();
    //     int[] arr = {8, 8, 1};
    //     System.out.println(s.possibleWords(arr));
    // }
}
```

---

### JavaScript

```javascript
class Solution {
    constructor() {
        this.map = [
            "", "", "abc", "def", "ghi",
            "jkl", "mno", "pqrs", "tuv", "wxyz"
        ];
    }

    possibleWords(arr) {
        const res = [];
        const cur = [];

        const dfs = (idx) => {
            if (idx === arr.length) {
                if (cur.length > 0) res.push(cur.join(''));
                return;
            }
            const d = arr[idx];
            if (d < 0 || d > 9) return;           // guard
            const letters = this.map[d];
            if (letters.length === 0) {           // skip 0 and 1
                dfs(idx + 1);
                return;
            }
            for (const ch of letters) {
                cur.push(ch);
                dfs(idx + 1);
                cur.pop();
            }
        };

        dfs(0);
        return res;
    }
}

// Example usage:
// const s = new Solution();
// console.log(s.possibleWords([8,8,1]));
```

---

### Python3

```python
class Solution:
    def __init__(self):
        self.mapping = [
            "", "", "abc", "def", "ghi",
            "jkl", "mno", "pqrs", "tuv", "wxyz"
        ]

    def possibleWords(self, arr):
        res = []
        cur = []

        def dfs(idx):
            if idx == len(arr):
                if cur:
                    res.append(''.join(cur))
                return
            d = arr[idx]
            if d < 0 or d > 9:
                return
            letters = self.mapping[d]
            if not letters:  # skip 0 and 1
                dfs(idx + 1)
                return
            for ch in letters:
                cur.append(ch)
                dfs(idx + 1)
                cur.pop()

        dfs(0)
        return res

# Example:
# s = Solution()
# print(s.possibleWords([8,8,1]))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Common algorithm flow (applies to all code samples)

1. **Mapping setup**: Prepare a constant mapping from digits 0–9 to their letter strings. `mapping[0] = ""`, `mapping[1] = ""`, `mapping[2] = "abc"`, etc.
2. **Base checks / guards**:

   * If the input array is empty or `null`, return an empty result quickly.
   * Guard against invalid digits < 0 or > 9 by early return - this prevents unexpected behavior.
3. **DFS / Backtracking**:

   * Use a recursive function `dfs(idx)` where `idx` is the current position in `arr`.
   * If `idx == arr.length` (or size), we've processed all digits. If the built `cur` string is non-empty, add it to `res`.
   * Otherwise, get `letters = mapping[arr[idx]]`.

     * If `letters` is empty (means digit 0 or 1), call `dfs(idx+1)` to skip that digit.
     * Else loop through each letter `ch` in `letters`:

       * Append `ch` to `cur`.
       * Recurse: `dfs(idx+1)`.
       * Backtrack: remove last character from `cur`.
4. **Return result**.
5. This generates all words in an order corresponding to the nested loops induced by recursion: first letter choices for `arr[0]`, then for `arr[1]`, etc.

### Why skip 0/1 (not return immediately)?

Some problem variants and real inputs may contain `0` or `1` within the sequence. Skipping them allows the algorithm to still produce words from the remaining digits. If all digits are 0/1 (or after skipping no letters remain), the output logically should be empty.

---

## Examples

1. Example 1
   Input: `arr = [2, 3]`
   Mapping: 2 → `abc`, 3 → `def`
   Output: `[ad, ae, af, bd, be, bf, cd, ce, cf]`

2. Example 2 (your failing test earlier)
   Input: `arr = [8, 8, 1]`
   Logic: `1` maps to nothing and is skipped. Each `8` → `tuv`.
   Output: `[tt, tu, tv, ut, uu, uv, vt, vu, vv]`

3. Example 3 (0 and 1 only)
   Input: `arr = [0, 1, 0]`
   After skipping, nothing remains → Output: `[]`

---

## How to use / Run locally

### C++

1. Put the class in a `.cpp` file, add a `main` driver (commented in the file), compile:

   ```bash
   g++ -std=c++17 solution.cpp -O2 -o sol
   ./sol
   ```

### Java

1. Save as `Solution.java` (include `main` to test), then:

   ```bash
   javac Solution.java
   java Solution
   ```

### JavaScript (Node.js)

1. Save as `solution.js`. Example usage is in comments. Run:

   ```bash
   node solution.js
   ```

### Python3

1. Save as `solution.py`, include the example usage in `if __name__ == "__main__":` block, then:

   ```bash
   python3 solution.py
   ```

---

## Notes & Optimizations

* The backtracking approach is optimal for enumerating all outputs since the solution size can be exponential; we cannot improve that asymptotic bound because the output itself may be `O(4^n)`.
* If you only needed the count of possible words, you could compute the product of the letter counts per digit and avoid enumerating — that would be O(n).
* If memory is a concern and you must stream results (e.g., huge outputs), you can yield/print each word on the fly instead of storing all in memory.
* Iterative approach: you can implement using BFS-like queue / iterative product building (start with `[""]` and for each digit expand) — equivalent complexity, sometimes easier to reason about for iterative I/O.
* The mapping order used in each digit (e.g., `"abc"`) determines final lexical ordering of results — if judge expects a particular order, keep mapping order consistent.

---

## Author

[Aarzoo](https://bento.me/withaarzoo)
