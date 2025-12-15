# Strings Rotations of Each Other

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

I am given two strings `s1` and `s2` of equal length. My task is to check whether `s2` is a rotated version of `s1`.

A string is said to be a rotation of another string if it can be formed by moving characters from the beginning to the end (or vice versa) without changing their order.

---

## Constraints

* 1 ≤ length of `s1`, `s2` ≤ 10^5
* Both strings contain only lowercase English letters

---

## Intuition

When I read the problem, I noticed that rotation does not change the order of characters, it only shifts them.

Then I thought:
If I join the string `s1` with itself (`s1 + s1`), all possible rotations of `s1` must exist inside that new string.

So if `s2` is present inside `s1 + s1`, then `s2` is definitely a rotation of `s1`.

---

## Approach

1. First, I check if both strings have the same length.

   * If not, rotation is impossible.

2. I create a new string by concatenating `s1` with itself.

3. I check whether `s2` exists as a substring inside the new string.

4. If it exists, I return `true`, otherwise `false`.

For Java (GFG specific), I use KMP pattern matching to avoid Time Limit Exceeded errors.

---

## Data Structures Used

* String
* Integer array (LPS array for KMP in Java)

---

## Operations & Behavior Summary

* Length comparison to eliminate invalid cases early
* String concatenation to generate all rotations
* Efficient substring search (KMP for Java)

---

## Complexity

* **Time Complexity:** O(n)

  * `n` is the length of the string

* **Space Complexity:** O(n)

  * Extra space used for concatenated string and LPS array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool areRotations(string &s1, string &s2) {
        if (s1.length() != s2.length()) return false;
        string temp = s1 + s1;
        return temp.find(s2) != string::npos;
    }
};
```

---

### Java

```java
class Solution {
    public boolean areRotations(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        String text = s1 + s1;
        return kmpSearch(text, s2);
    }

    private boolean kmpSearch(String text, String pattern) {
        int[] lps = buildLPS(pattern);
        int i = 0, j = 0;
        while (i < text.length()) {
            if (text.charAt(i) == pattern.charAt(j)) {
                i++; j++;
                if (j == pattern.length()) return true;
            } else if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        return false;
    }

    private int[] buildLPS(String p) {
        int[] lps = new int[p.length()];
        int len = 0, i = 1;
        while (i < p.length()) {
            if (p.charAt(i) == p.charAt(len)) {
                lps[i++] = ++len;
            } else if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    areRotations(s1, s2) {
        if (s1.length !== s2.length) return false;
        let temp = s1 + s1;
        return temp.includes(s2);
    }
}
```

---

### Python3

```python
class Solution:
    def areRotations(self, s1, s2):
        if len(s1) != len(s2):
            return False
        temp = s1 + s1
        return s2 in temp
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Check if lengths of both strings are equal.
2. Concatenate the first string with itself.
3. Search the second string inside the new string.
4. If found, return true; otherwise return false.

In Java, KMP ensures the search runs in linear time even for large inputs.

---

## Examples

**Input:**

```
s1 = "abcd", s2 = "cdab"
```

**Output:**

```
true
```

**Explanation:**
After rotating `abcd` twice to the right, it becomes `cdab`.

---

## How to use / Run locally

1. Copy the solution code for your preferred language.
2. Compile and run using a standard compiler or IDE.
3. Call `areRotations(s1, s2)` with your test inputs.

---

## Notes & Optimizations

* `s1 + s1` trick is the key insight.
* Java needs KMP on GFG to avoid TLE.
* Always check string length first for early exit.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
