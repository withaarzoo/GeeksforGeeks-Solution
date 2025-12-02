# Maximise String Score

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to use / Run locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

We are given:

- A string `s` (0-indexed).
- A list of allowed character jumps `jumps`, where each element is `[s1, s2]`.
- From an index `i`, we can **jump forward** to index `j` if:
  - `s[i] == s1` and `s[j] == s2` for some pair `[s1, s2]` in `jumps`, **or**
  - `s[i] == s[j]` (same character jump is always allowed).
- When we jump from index `i` to `j` (`j > i`), the score gained is:

  - Sum of ASCII values of all characters from index `i` to `j - 1`
  - **Except**:
    - We always exclude the character at position `j`.
    - Among the characters from `i` to `j - 1`, we also exclude the ones equal to `s[j]`.
      - Practically, this means:
        - If `s[i] == s[j]`, we exclude `s[i]`.
        - Otherwise, we include `s[i]`.

- We start at index `0` and can make a sequence of valid jumps.
- Our goal: **maximize the total score**.

We must return the **maximum possible score**.

---

## Constraints

- `1 ≤ |s| ≤ 2 * 10^5`
- `1 ≤ jumps.size() ≤ 676` (since at most `26 * 26` distinct pairs)
- `s` consists of lowercase English letters.
- There are at least two distinct characters in `s`.
- Only forward jumps are allowed (`j > i`).

---

## Intuition

I thought about the string as a series of **positions (indices)** on a line.

- From each index `i`, I can jump to some later index `j`.
- Every jump gives me some score based on the characters between `i` and `j`.

Since I can move only **forward**, there can never be a cycle in my jumps on indices.  
That means I’m working on a **DAG (Directed Acyclic Graph)** of indices → perfect for **Dynamic Programming (DP)**.

So my idea:

1. For every index `i`, compute the maximum score I can get starting from `i`.
2. Answer will be `dp[0]`.

But to do this efficiently:

- I need to know quickly where I can jump from `i` for each possible character.
- I also need to know the ASCII sum of any substring fast.

This naturally leads to:

- **Prefix sums** for ASCII values.
- **Next occurrence table** for characters.
- **Character-level adjacency list** for jumps.

---

## Approach

1. **Prefix Sum of ASCII Values**
   - Create an array `pref` of size `n + 1`.
   - `pref[i + 1] = pref[i] + ASCII(s[i])`.
   - ASCII sum of substring `s[L..R]` = `pref[R + 1] - pref[L]`.
   - For a jump from `i` to `j`, the range of characters we touch is `s[i..j-1]`:
     - Total sum = `pref[j] - pref[i]`.
     - If `s[i] == s[j]` we must exclude `s[i]`, so subtract `ASCII(s[i])`.

2. **Next Occurrence Table**
   - Build `nextInd[i][c]` = the smallest index `j > i` such that `s[j] == ('a' + c)`, or `-1` if it doesn't exist.
   - We compute from right to left:
     - Maintain `last[26]` with latest positions of each character.
     - For each index `i`:
       - `nextInd[i] = last`.
       - Update `last[s[i] - 'a'] = i`.

   - Now, from index `i` if I want to jump to character `ch`, I just read `j = nextInd[i][ch - 'a']`.
   - This gives every possible target index in **O(1)**.

3. **Character Graph of Allowed Jumps**
   - Build adjacency list `adj[26]`.
   - For each allowed pair `[u, v]` in `jumps`, add `v` to `adj[u]`.
   - Also, always allow same-character jump:
     - For each character `c`, add `c` to `adj[c]`.
   - Remove duplicates to keep transitions clean.

4. **Dynamic Programming over Indices**
   - Define `dp[i]` = maximum score possible starting from index `i`.
   - Base case: `dp[n - 1] = 0` (cannot jump anywhere from the last index).
   - Process indices from right to left:
     - For each index `i`:
       - Let `from = s[i]`.
       - For each destination character `ch` in `adj[from]`:
         - Find `j = nextInd[i][ch]`. If `j == -1`, skip.
         - Compute jump gain:
           - `gain = pref[j] - pref[i]` (ASCII sum of `s[i..j-1]`).
           - If `ch == from`, subtract `ASCII(from)` (exclude `s[i]`).
         - Candidate value: `gain + dp[j]`.
       - Take maximum candidate as `dp[i]`.
   - Answer is `dp[0]`.

Because we iterate over at most 26 characters per index, and do everything in O(1) per transition, total time becomes linear in `n`.

---

## Data Structures Used

- `int[]/vector<int> pref`  
  - Prefix sums of ASCII values for fast substring sum queries.

- `int[][]/vector<array<int,26>> nextInd`  
  - For each index and each character, stores the next position of that character.

- `adj` (character graph)
  - `List<List<Integer>>` or `vector<vector<int>>` etc.
  - For each character `'a'..'z'`, stores all characters it is allowed to jump to (including itself).

- `dp[]`
  - DP array where `dp[i]` is max score starting from index `i`.

---

## Operations & Behavior Summary

- **Preprocessing**
  - Build prefix sums: O(n)
  - Build next occurrence table: O(26 * n)
  - Build adjacency list: O(#jumps + 26²) ≈ O(1)

- **Query / Main Logic**
  - For each index `i`, check all allowed destination characters from `adj[s[i]]` (≤ 26).
  - For each possible destination:
    - Lookup next index in O(1) via `nextInd`.
    - Compute gain in O(1) using `pref`.
  - Store best result in `dp[i]`.

- **Final Answer**
  - Return `dp[0]`.

---

## Complexity

Let `n = |s|`.

- **Time Complexity:**  
  - Prefix sums: `O(n)`  
  - Next occurrence table: `O(26 * n)`  
  - DP transitions: `O(26 * n)`  
  - Overall: **O(26 * n) ≈ O(n)** (since 26 is constant).

- **Space Complexity:**  
  - `pref`: `O(n)`  
  - `nextInd`: `O(26 * n)`  
  - `dp`: `O(n)`  
  - `adj`: `O(26²)` (constant)  
  - Overall: **O(n)** extra space.

---

## Multi-language Solutions

### C++

```c++
class Solution {
  public:
    int maxScore(string &s, vector<vector<char>> &jumps) {
        int n = (int)s.size();
        if (n <= 1) return 0;

        // 1. Prefix sum of ASCII values
        vector<int> pref(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            pref[i + 1] = pref[i] + (int)s[i];
        }

        const int ALPHA = 26;

        // 2. nextInd[i][c] = next index > i where char c occurs
        vector<array<int, ALPHA>> nextInd(n);
        array<int, ALPHA> last;
        last.fill(-1);

        for (int i = n - 1; i >= 0; --i) {
            nextInd[i] = last;                 // copy current future positions
            int idx = s[i] - 'a';
            if (idx >= 0 && idx < ALPHA) {
                last[idx] = i;                 // update last occurrence
            }
        }

        // 3. Character adjacency list
        vector<vector<int>> adj(ALPHA);
        for (auto &p : jumps) {
            if (p.size() < 2) continue;
            int ui = p[0] - 'a';
            int vi = p[1] - 'a';
            if (ui >= 0 && ui < ALPHA && vi >= 0 && vi < ALPHA) {
                adj[ui].push_back(vi);
            }
        }

        // Always allow same-character jumps and remove duplicates
        for (int c = 0; c < ALPHA; ++c) {
            adj[c].push_back(c);
            sort(adj[c].begin(), adj[c].end());
            adj[c].erase(unique(adj[c].begin(), adj[c].end()), adj[c].end());
        }

        // 4. DP from right to left
        vector<int> dp(n, 0);
        dp[n - 1] = 0;

        for (int i = n - 2; i >= 0; --i) {
            int best = 0;
            int fromIdx = s[i] - 'a';
            if (fromIdx < 0 || fromIdx >= ALPHA) {
                dp[i] = 0;
                continue;
            }
            int fromAscii = (int)s[i];

            for (int destChar : adj[fromIdx]) {
                int j = nextInd[i][destChar];
                if (j == -1) continue;

                int gain = pref[j] - pref[i];   // sum s[i..j-1]
                if (destChar == fromIdx) {
                    gain -= fromAscii;          // exclude s[i] if same as destination char
                }

                best = max(best, gain + dp[j]);
            }
            dp[i] = best;
        }

        return dp[0];
    }
};
````

---

### Java

```java
import java.util.*;

class Solution {
    public int maxScore(String s, char[][] jumps) {
        int n = s.length();
        if (n <= 1) return 0;

        // 1. Prefix sum of ASCII values
        int[] pref = new int[n + 1];
        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + s.charAt(i);
        }

        final int ALPHA = 26;

        // 2. nextInd[i][c] = next index > i where char ('a' + c) occurs
        int[][] nextInd = new int[n][ALPHA];
        int[] last = new int[ALPHA];
        Arrays.fill(last, -1);

        for (int i = n - 1; i >= 0; i--) {
            for (int c = 0; c < ALPHA; c++) {
                nextInd[i][c] = last[c];
            }
            int idx = s.charAt(i) - 'a';
            if (idx >= 0 && idx < ALPHA) {
                last[idx] = i;
            }
        }

        // 3. Character graph
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < ALPHA; i++) {
            adj.add(new ArrayList<Integer>());
        }

        if (jumps != null) {
            for (char[] p : jumps) {
                if (p.length < 2) continue;
                int ui = p[0] - 'a';
                int vi = p[1] - 'a';
                if (ui >= 0 && ui < ALPHA && vi >= 0 && vi < ALPHA) {
                    adj.get(ui).add(vi);
                }
            }
        }

        // add self jumps and dedupe
        for (int c = 0; c < ALPHA; c++) {
            adj.get(c).add(c);
            boolean[] seen = new boolean[ALPHA];
            ArrayList<Integer> list = adj.get(c);
            ArrayList<Integer> uniq = new ArrayList<>();
            for (int x : list) {
                if (!seen[x]) {
                    seen[x] = true;
                    uniq.add(x);
                }
            }
            adj.set(c, uniq);
        }

        // 4. DP from right to left
        int[] dp = new int[n];
        dp[n - 1] = 0;

        for (int i = n - 2; i >= 0; i--) {
            int best = 0;
            int fromIdx = s.charAt(i) - 'a';
            int fromAscii = s.charAt(i);

            if (fromIdx < 0 || fromIdx >= ALPHA) {
                dp[i] = 0;
                continue;
            }

            ArrayList<Integer> edges = adj.get(fromIdx);
            for (int destChar : edges) {
                int j = nextInd[i][destChar];
                if (j == -1) continue;

                int gain = pref[j] - pref[i]; // s[i..j-1]
                if (destChar == fromIdx) {
                    gain -= fromAscii;        // exclude s[i] if same char
                }
                best = Math.max(best, gain + dp[j]);
            }
            dp[i] = best;
        }

        return dp[0];
    }
}

```

---

### JavaScript

```javascript
/**
 * @param {string} s
 * @param {string[][]} jumps
 * @returns {number}
 */
class Solution {
    maxScore(s, jumps) {
        const n = s.length;
        if (n <= 1) return 0;

        // 1. Prefix sum of ASCII values
        const pref = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + s.charCodeAt(i);
        }

        const ALPHA = 26;

        // 2. nextInd[i][c] = next index > i where char ('a'+c) occurs
        const nextInd = Array.from({ length: n }, () => new Array(ALPHA).fill(-1));
        const last = new Array(ALPHA).fill(-1);

        for (let i = n - 1; i >= 0; i--) {
            for (let c = 0; c < ALPHA; c++) {
                nextInd[i][c] = last[c];
            }
            const idx = s.charCodeAt(i) - 97; // 'a'
            if (idx >= 0 && idx < ALPHA) {
                last[idx] = i;
            }
        }

        // 3. Character adjacency list
        const adj = Array.from({ length: ALPHA }, () => []);
        if (jumps) {
            for (const pair of jumps) {
                if (!pair || pair.length < 2) continue;
                const ui = pair[0].charCodeAt(0) - 97;
                const vi = pair[1].charCodeAt(0) - 97;
                if (ui >= 0 && ui < ALPHA && vi >= 0 && vi < ALPHA) {
                    adj[ui].push(vi);
                }
            }
        }

        // add self jumps and remove duplicates
        for (let c = 0; c < ALPHA; c++) {
            adj[c].push(c);
            const set = new Set(adj[c]);
            adj[c] = Array.from(set);
        }

        // 4. DP from right to left
        const dp = new Array(n).fill(0);
        dp[n - 1] = 0;

        for (let i = n - 2; i >= 0; i--) {
            let best = 0;
            const fromIdx = s.charCodeAt(i) - 97;
            const fromAscii = s.charCodeAt(i);

            if (fromIdx < 0 || fromIdx >= ALPHA) {
                dp[i] = 0;
                continue;
            }

            for (const destChar of adj[fromIdx]) {
                const j = nextInd[i][destChar];
                if (j === -1) continue;

                let gain = pref[j] - pref[i]; // s[i..j-1]
                if (destChar === fromIdx) {
                    gain -= fromAscii;        // exclude s[i] if same as destination
                }
                best = Math.max(best, gain + dp[j]);
            }
            dp[i] = best;
        }

        return dp[0];
    }
}

module.exports = Solution;
```

---

### Python3

```python
class Solution:
    def maxScore(self, s, jumps):
        n = len(s)
        if n <= 1:
            return 0

        # 1. Prefix sum of ASCII values
        pref = [0] * (n + 1)
        for i, ch in enumerate(s):
            pref[i + 1] = pref[i] + ord(ch)

        ALPHA = 26

        # 2. nextInd[i][c] = next index > i where char ('a'+c) occurs
        nextInd = [[-1] * ALPHA for _ in range(n)]
        last = [-1] * ALPHA

        for i in range(n - 1, -1, -1):
            # copy last into nextInd[i]
            row = nextInd[i]
            for c in range(ALPHA):
                row[c] = last[c]
            idx = ord(s[i]) - ord('a')
            if 0 <= idx < ALPHA:
                last[idx] = i

        # 3. Character adjacency list
        adj = [[] for _ in range(ALPHA)]
        if jumps:
            for u, v in jumps:
                ui = ord(u) - ord('a')
                vi = ord(v) - ord('a')
                if 0 <= ui < ALPHA and 0 <= vi < ALPHA:
                    adj[ui].append(vi)

        # add self jumps and remove duplicates
        for c in range(ALPHA):
            adj[c].append(c)
            adj[c] = list(set(adj[c]))

        # 4. DP from right to left
        dp = [0] * n
        dp[n - 1] = 0

        for i in range(n - 2, -1, -1):
            best = 0
            from_idx = ord(s[i]) - ord('a')
            from_ascii = ord(s[i])

            if not (0 <= from_idx < ALPHA):
                dp[i] = 0
                continue

            for dest_char in adj[from_idx]:
                j = nextInd[i][dest_char]
                if j == -1:
                    continue

                gain = pref[j] - pref[i]   # s[i..j-1]
                if dest_char == from_idx:
                    gain -= from_ascii     # exclude s[i] if same char

                cand = gain + dp[j]
                if cand > best:
                    best = cand

            dp[i] = best

        return dp[0]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below is the common logic; code in all four languages follows the same idea.

1. **Build `pref` (prefix sums)**

   * Loop over the string once.
   * For each index `i`, do `pref[i + 1] = pref[i] + ASCII(s[i])`.
   * Now any substring sum is constant-time.

2. **Build `nextInd` (next occurrence positions)**

   * Initialize `last[26]` with `-1`.
   * Traverse from right to left:

     * For index `i`, copy `last` into `nextInd[i]`.
       This means: "if I'm at index `i`, the next positions for each character are exactly what `last` says now".
     * Then update `last[ s[i]-'a' ] = i`, because now the latest seen position for `s[i]` is `i`.

3. **Build `adj` (character jumps graph)**

   * For each jump pair `[u, v]`, convert to indices `ui = u - 'a'`, `vi = v - 'a'`, and push `vi` into `adj[ui]`.
   * Also add self jump: for each `c`, add `c` into `adj[c]`.
   * Optionally remove duplicates with a `Set`.

4. **DP computation**

   * `dp[n-1] = 0` because from the last index we cannot go anywhere.
   * For `i` from `n-2` down to `0`:

     * Identify the current character: `fromIdx = s[i] - 'a'`.
     * For each `destChar` in `adj[fromIdx]`:

       * Find next index: `j = nextInd[i][destChar]`.
       * If `j == -1`, skip (no such next char).
       * Compute `gain = pref[j] - pref[i]`.
       * If `destChar == fromIdx` (same character jump), subtract `ASCII(s[i])` from `gain`.
       * Total score if we jump here: `gain + dp[j]`.
     * Store the maximum of all candidates as `dp[i]`.

5. **Return answer**

   * The final answer is `dp[0]`.

Each language just translates these steps into its syntax.

---

## Examples

### Example 1

```text
s = "forgfg"
jumps = [['f','r'], ['r','g']]

Possible best path:
- From index 0 ('f') jump to index 2 ('r'):
  characters between = "fo" → ASCII sum = 'f' + 'o'
- From index 2 ('r') jump to index 5 ('g'):
  characters between = "gfg" (index 2..4), excluding char at 5
  but chars equal to 'g' at end index are not counted:
  effectively "rf" → ASCII sum = 'r' + 'f'

Total max score = 429
```

### Example 2

```text
s = "abcda"
jumps = [['b','d']]

We can jump from 'a' at index 0 to 'a' at index 4 (same character jump).
Characters between = "bcd" → ASCII sum = 'b' + 'c' + 'd' = 297

Answer = 297
```

---

## How to use / Run locally

Assume file name: `MaximiseStringScore`.

### C++

```bash
g++ -std=c++17 -O2 main.cpp -o main
./main
```

Inside `main.cpp` you can create an instance:

```c++
int main() {
    string s = "forgfg";
    vector<vector<char>> jumps = {{'f','r'}, {'r','g'}};
    Solution sol;
    cout << sol.maxScore(s, jumps) << "\n";
    return 0;
}
```

### Java

```bash
javac Solution.java
java Solution
```

Example driver (simplified, for local testing):

```java
public class Main {
    public static void main(String[] args) {
        String s = "forgfg";
        char[][] jumps = { {'f','r'}, {'r','g'} };
        Solution sol = new Solution();
        System.out.println(sol.maxScore(s, jumps));
    }
}
```

### JavaScript (Node.js)

```bash
node main.js
```

```javascript
const Solution = require('./Solution');

const s = "forgfg";
const jumps = [['f','r'], ['r','g']];
const sol = new Solution();
console.log(sol.maxScore(s, jumps));
```

### Python3

```bash
python3 main.py
```

```python
from solution import Solution

s = "forgfg"
jumps = [['f','r'], ['r','g']]
sol = Solution()
print(sol.maxScore(s, jumps))
```

---

## Notes & Optimizations

* We never explicitly build all edges between indices (which could be O(n²)).
  Instead, we work **character-wise** and use the `nextInd` table to jump directly to the next valid index.
* Alphabet size is fixed (26 letters), so scanning all possible destination characters for each index is cheap.
* DP from right to left ensures that when we compute `dp[i]`, all `dp[j]` for `j > i` are already computed.
* The approach is linear in string length and works comfortably within constraints up to `2 * 10^5`.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)

```
::contentReference[oaicite:0]{index=0}
```
