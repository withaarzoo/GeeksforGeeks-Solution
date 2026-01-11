# Minimum Window Subsequence

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
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

You are given two strings `s1` and `s2`.

Your task is to find the **smallest substring of `s1`** such that `s2` appears as a **subsequence** inside that substring.

Important rules:

* Characters of `s2` must appear **in order** inside the substring.
* Characters do **not need to be contiguous**.
* If multiple answers have the same minimum length, return the **leftmost** one.
* If no such substring exists, return an empty string.

---

## Constraints

* `1 ≤ s1.length ≤ 10^4`
* `1 ≤ s2.length ≤ 50`
* Both strings contain only lowercase English letters

---

## Intuition

When I read the problem, the key thing I noticed was that `s2` must be a **subsequence**, not a substring.

So I thought like this:

* I should scan `s1` from left to right.
* Every time I try to match `s2` character by character.
* Once I fully match `s2`, I know I found a valid window.
* Then I try to **shrink that window from the left** to make it as small as possible.

By repeating this process and tracking the smallest window, I can get the final answer.

---

## Approach

1. Start scanning `s1` from left to right.
2. When a character matches the first character of `s2`, try matching the full subsequence.
3. Move forward until all characters of `s2` are matched.
4. Once matched, move backward to remove unnecessary characters.
5. Calculate the window size and update the minimum result.
6. Continue scanning `s1` for other possible windows.
7. Return the smallest valid substring.

---

## Data Structures Used

* No extra data structures are used.
* Only pointers and variables.

This keeps the solution memory efficient.

---

## Operations & Behavior Summary

* Forward scan to check if `s2` is a subsequence.
* Backward scan to minimize the window size.
* Continuous comparison to keep the smallest valid window.

---

## Complexity

**Time Complexity:** `O(n × m)`

* `n` = length of `s1`
* `m` = length of `s2`

**Space Complexity:** `O(1)`

* Only constant extra space is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string minWindow(string& s1, string& s2) {
        int n = s1.size(), m = s2.size();
        int minLen = INT_MAX;
        int start = -1;

        for (int i = 0; i < n; i++) {
            if (s1[i] != s2[0]) continue;

            int p1 = i, p2 = 0;
            while (p1 < n && p2 < m) {
                if (s1[p1] == s2[p2]) p2++;
                p1++;
            }

            if (p2 == m) {
                int end = p1 - 1;
                p2 = m - 1;
                while (p2 >= 0) {
                    if (s1[end] == s2[p2]) p2--;
                    end--;
                }
                end++;

                if (p1 - end < minLen) {
                    minLen = p1 - end;
                    start = end;
                }
            }
        }
        return start == -1 ? "" : s1.substr(start, minLen);
    }
};
```

### Java

```java
class Solution {
    public String minWindow(String s1, String s2) {
        int n = s1.length(), m = s2.length();
        int minLen = Integer.MAX_VALUE;
        int start = -1;

        for (int i = 0; i < n; i++) {
            if (s1.charAt(i) != s2.charAt(0)) continue;

            int p1 = i, p2 = 0;
            while (p1 < n && p2 < m) {
                if (s1.charAt(p1) == s2.charAt(p2)) p2++;
                p1++;
            }

            if (p2 == m) {
                int end = p1 - 1;
                p2 = m - 1;
                while (p2 >= 0) {
                    if (s1.charAt(end) == s2.charAt(p2)) p2--;
                    end--;
                }
                end++;

                if (p1 - end < minLen) {
                    minLen = p1 - end;
                    start = end;
                }
            }
        }
        return start == -1 ? "" : s1.substring(start, start + minLen);
    }
}
```

### JavaScript

```javascript
class Solution {
    minWindow(s1, s2) {
        let n = s1.length, m = s2.length;
        let minLen = Infinity, start = -1;

        for (let i = 0; i < n; i++) {
            if (s1[i] !== s2[0]) continue;

            let p1 = i, p2 = 0;
            while (p1 < n && p2 < m) {
                if (s1[p1] === s2[p2]) p2++;
                p1++;
            }

            if (p2 === m) {
                let end = p1 - 1;
                p2 = m - 1;
                while (p2 >= 0) {
                    if (s1[end] === s2[p2]) p2--;
                    end--;
                }
                end++;

                if (p1 - end < minLen) {
                    minLen = p1 - end;
                    start = end;
                }
            }
        }
        return start === -1 ? "" : s1.substring(start, start + minLen);
    }
}
```

### Python3

```python
class Solution:
    def minWindow(self, s1, s2):
        n, m = len(s1), len(s2)
        min_len = float('inf')
        start = -1

        for i in range(n):
            if s1[i] != s2[0]:
                continue

            p1, p2 = i, 0
            while p1 < n and p2 < m:
                if s1[p1] == s2[p2]:
                    p2 += 1
                p1 += 1

            if p2 == m:
                end = p1 - 1
                p2 = m - 1
                while p2 >= 0:
                    if s1[end] == s2[p2]:
                        p2 -= 1
                    end -= 1
                end += 1

                if p1 - end < min_len:
                    min_len = p1 - end
                    start = end

        return "" if start == -1 else s1[start:start + min_len]
```

---

## Step-by-step Detailed Explanation

* Start scanning `s1`.
* Match `s2` using a forward pointer.
* Once fully matched, move backward to shrink the window.
* Update the minimum window length.
* Continue until the entire string is processed.

This guarantees the smallest valid window.

---

## Examples

Input:

```bash
s1 = "geeksforgeeks"
s2 = "eksrg"
```

Output:

```bash
"eksforg"
```

---

## How to use / Run locally

1. Copy the solution code for your language.
2. Paste it into your compiler or IDE.
3. Call the `minWindow(s1, s2)` method.
4. Print or return the result.

---

## Notes & Optimizations

* This solution avoids extra memory usage.
* Works efficiently within given constraints.
* Backward shrinking is the key optimization.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
