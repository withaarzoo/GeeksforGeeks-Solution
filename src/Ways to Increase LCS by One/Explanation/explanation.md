# Ways to Increase LCS by One | Dynamic Programming Solution

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
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

In this Dynamic Programming problem, I am given two lowercase strings `s1` and `s2`. I can insert exactly one character anywhere inside `s1`.

The goal is to count how many different insertions increase the **Longest Common Subsequence (LCS)** between the two strings by exactly one.

The challenge is that there are many possible insertion positions and 26 possible lowercase characters. Recomputing the LCS after every insertion would be far too slow. Instead, I need a smarter Dynamic Programming approach that reuses previously computed information.

**Input**

- String `s1`
- String `s2`

**Output**

- The total number of valid insertions that increase the LCS by exactly one.

---

## Constraints

- `1 ≤ n1, n2 ≤ 100`
- Both strings contain only lowercase English letters.

---

## Intuition

My first thought was to try every insertion and compute the LCS again.

That approach works, but it is much too slow because every insertion requires another complete LCS calculation.

Then I noticed something important.

When I insert one character, the string naturally gets divided into two parts:

- everything before the inserted character
- everything after the inserted character

If I already know the best LCS before the insertion point and after the insertion point, then I can quickly check whether adding one character connects those two parts and increases the answer by exactly one.

That observation leads directly to using two Dynamic Programming tables.

---

## Approach

I start by computing the normal LCS table for the prefixes of both strings.

This tells me the best LCS that can be formed before every possible insertion position.

Next, I compute another LCS table from the opposite direction.

This second table stores the LCS values for the suffixes of both strings.

Now I try every possible insertion position inside `s1`.

For every position, I try every lowercase letter from `'a'` to `'z'`.

Whenever that character appears inside `s2`, I combine:

- the prefix LCS,
- the inserted character,
- and the suffix LCS.

If their total becomes exactly `current LCS + 1`, then that insertion is valid.

To avoid counting duplicates, I count a character only once for each insertion position even if it matches multiple locations in `s2`.

---

## Data Structures Used

### 2D Dynamic Programming Arrays

I use two DP tables.

- **Prefix DP**
  - Stores the LCS for prefixes of both strings.
  - Helps answer everything before the insertion point.

- **Suffix DP**
  - Stores the LCS for suffixes of both strings.
  - Helps answer everything after the insertion point.

### Variables

A few integer variables are used for:

- current LCS
- insertion position
- answer count
- loop indices

No additional complex data structures are needed.

---

## Operations & Behavior Summary

The algorithm performs these steps:

1. Read both input strings.
2. Build the prefix LCS DP table.
3. Store the original LCS length.
4. Build the suffix LCS DP table.
5. Try every insertion position inside the first string.
6. Try every lowercase English character.
7. Match that character against every occurrence inside the second string.
8. Combine prefix LCS + inserted character + suffix LCS.
9. If the total becomes exactly one more than the original LCS, count that insertion.
10. Return the final answer.

---

## Complexity

| Metric | Complexity | Explanation |
|---------|------------|-------------|
| Time Complexity | **O(n × m)** | Building the two DP tables takes `O(n × m)`. Trying all insertion positions and lowercase letters still remains `O(n × m)` because the alphabet size is fixed (26). |
| Space Complexity | **O(n × m)** | Two Dynamic Programming tables are stored for prefix and suffix LCS values. |

Where:

- `n` = length of `s1`
- `m` = length of `s2`

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int waysToIncreaseLCSBy1(string &s1, string &s2) {
        int n = s1.size(), m = s2.size();

        // pref[i][j] = LCS of s1[0..i-1] and s2[0..j-1]
        vector<vector<int>> pref(n + 1, vector<int>(m + 1, 0));

        // Build prefix LCS DP
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1])
                    pref[i][j] = pref[i - 1][j - 1] + 1;
                else
                    pref[i][j] = max(pref[i - 1][j], pref[i][j - 1]);
            }
        }

        // Current LCS
        int lcs = pref[n][m];

        // suff[i][j] = LCS of s1[i..] and s2[j..]
        vector<vector<int>> suff(n + 1, vector<int>(m + 1, 0));

        // Build suffix LCS DP
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (s1[i] == s2[j])
                    suff[i][j] = suff[i + 1][j + 1] + 1;
                else
                    suff[i][j] = max(suff[i + 1][j], suff[i][j + 1]);
            }
        }

        int ans = 0;

        // Try every insertion position
        for (int pos = 0; pos <= n; pos++) {

            // Try every lowercase character
            for (char ch = 'a'; ch <= 'z'; ch++) {

                bool ok = false;

                // Check every occurrence of this character in s2
                for (int j = 0; j < m && !ok; j++) {

                    if (s2[j] != ch)
                        continue;

                    // If prefix + inserted char + suffix gives LCS+1,
                    // then this insertion is valid.
                    if (pref[pos][j] + 1 + suff[pos][j + 1] == lcs + 1)
                        ok = true;
                }

                // Count this character only once for this position
                if (ok)
                    ans++;
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int waysToIncreaseLCSBy1(String s1, String s2) {

        int n = s1.length();
        int m = s2.length();

        // pref[i][j] = LCS of prefixes
        int[][] pref = new int[n + 1][m + 1];

        // Build prefix DP
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1))
                    pref[i][j] = pref[i - 1][j - 1] + 1;
                else
                    pref[i][j] = Math.max(pref[i - 1][j], pref[i][j - 1]);
            }
        }

        int lcs = pref[n][m];

        // suff[i][j] = LCS of suffixes
        int[][] suff = new int[n + 1][m + 1];

        // Build suffix DP
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                if (s1.charAt(i) == s2.charAt(j))
                    suff[i][j] = suff[i + 1][j + 1] + 1;
                else
                    suff[i][j] = Math.max(suff[i + 1][j], suff[i][j + 1]);
            }
        }

        int ans = 0;

        // Try every insertion position
        for (int pos = 0; pos <= n; pos++) {

            // Try every lowercase letter
            for (char ch = 'a'; ch <= 'z'; ch++) {

                boolean ok = false;

                // Search matching character inside s2
                for (int j = 0; j < m && !ok; j++) {

                    if (s2.charAt(j) != ch)
                        continue;

                    if (pref[pos][j] + 1 + suff[pos][j + 1] == lcs + 1)
                        ok = true;
                }

                // Count once per position
                if (ok)
                    ans++;
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    waysToIncreaseLCSBy1(s1, s2) {

        const n = s1.length;
        const m = s2.length;

        // Prefix LCS DP
        const pref = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

        // Build prefix table
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (s1[i - 1] === s2[j - 1])
                    pref[i][j] = pref[i - 1][j - 1] + 1;
                else
                    pref[i][j] = Math.max(pref[i - 1][j], pref[i][j - 1]);
            }
        }

        const lcs = pref[n][m];

        // Suffix LCS DP
        const suff = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

        // Build suffix table
        for (let i = n - 1; i >= 0; i--) {
            for (let j = m - 1; j >= 0; j--) {
                if (s1[i] === s2[j])
                    suff[i][j] = suff[i + 1][j + 1] + 1;
                else
                    suff[i][j] = Math.max(suff[i + 1][j], suff[i][j + 1]);
            }
        }

        let ans = 0;

        // Try every insertion position
        for (let pos = 0; pos <= n; pos++) {

            // Try every lowercase character
            for (let c = 0; c < 26; c++) {

                const ch = String.fromCharCode(97 + c);
                let ok = false;

                // Check every occurrence in s2
                for (let j = 0; j < m && !ok; j++) {

                    if (s2[j] !== ch)
                        continue;

                    if (pref[pos][j] + 1 + suff[pos][j + 1] === lcs + 1)
                        ok = true;
                }

                if (ok)
                    ans++;
            }
        }

        return ans;
    }
};
```

### Python3

```python
class Solution:
    def waysToIncreaseLCSBy1(self, s1, s2):

        n = len(s1)
        m = len(s2)

        # pref[i][j] = LCS of prefixes
        pref = [[0] * (m + 1) for _ in range(n + 1)]

        # Build prefix DP
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    pref[i][j] = pref[i - 1][j - 1] + 1
                else:
                    pref[i][j] = max(pref[i - 1][j], pref[i][j - 1])

        lcs = pref[n][m]

        # suff[i][j] = LCS of suffixes
        suff = [[0] * (m + 1) for _ in range(n + 1)]

        # Build suffix DP
        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                if s1[i] == s2[j]:
                    suff[i][j] = suff[i + 1][j + 1] + 1
                else:
                    suff[i][j] = max(suff[i + 1][j], suff[i][j + 1])

        ans = 0

        # Try every insertion position
        for pos in range(n + 1):

            # Try every lowercase character
            for ch in map(chr, range(ord('a'), ord('z') + 1)):

                ok = False

                # Check every matching occurrence in s2
                for j in range(m):

                    if s2[j] != ch:
                        continue

                    if pref[pos][j] + 1 + suff[pos][j + 1] == lcs + 1:
                        ok = True
                        break

                # Count this character once for this position
                if ok:
                    ans += 1

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in all four implementations.

First, I build the prefix LCS table.

Each cell tells me the longest common subsequence using only the prefixes of both strings.

After that, I build another DP table from the end of the strings.

This suffix table tells me the best LCS that can still be formed after a certain position.

Having both tables lets me answer any insertion in constant time without recomputing the entire LCS.

Next, I loop through every possible insertion position.

Since the new character can be inserted before the first character, between any two characters, or after the last character, there are exactly `n + 1` positions.

For every position, I test all lowercase English letters.

Whenever the current letter appears inside `s2`, I check whether connecting:

- the prefix LCS,
- the inserted character,
- and the suffix LCS

creates an LCS that is exactly one larger than the original.

If multiple occurrences of the same character satisfy the condition, I count that character only once for that insertion position.

Finally, after checking every position and every letter, I return the total count.

Since all four language implementations follow the same algorithm, their behavior, complexity, and output are identical.

---

## Examples

### Example 1

**Input**

```text
s1 = "abab"
s2 = "abc"
```

**Output**

```text
3
```

**Trace**

- Original LCS = 2
- Three different insertions increase the LCS to 3
- Final answer = 3

---

### Example 2

**Input**

```text
s1 = "abcabc"
s2 = "abcd"
```

**Output**

```text
4
```

**Trace**

- Original LCS = 3
- Four valid insertions make the LCS equal to 4
- Final answer = 4

---

### Example 3

**Input**

```text
s1 = "abc"
s2 = "abc"
```

**Output**

```text
0
```

**Trace**

The two strings already have the maximum possible LCS.

No single insertion can increase it further.

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run using Node.js

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

---

## Notes & Optimizations

- Computing the LCS after every insertion would be much slower.
- Using both prefix and suffix DP tables avoids repeated work.
- The algorithm works efficiently because the alphabet contains only 26 lowercase letters.
- Duplicate matches for the same character at the same insertion position should be counted only once.
- This is a classic Dynamic Programming optimization that combines information from both directions of the strings.
- The overall solution satisfies the expected `O(n × m)` time complexity.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
