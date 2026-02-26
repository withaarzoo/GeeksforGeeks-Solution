# Isomorphic Strings

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

Given two strings s1 and s2 consisting of only lowercase English letters and of equal length, check whether these two strings are isomorphic.

Two strings are isomorphic if the characters in s1 can be replaced to get s2 while maintaining the order of characters.

Rules:

1. Each character must map to only one character.
2. No two different characters can map to the same character.
3. A character may map to itself.

---

## Constraints

1 <= s1.length() = s2.length() <= 10^5

---

## Intuition

When I first looked at this problem, I realized that the key idea is mapping.

If two strings are isomorphic, then:

* Every character in s1 must map to exactly one character in s2.
* That mapping must stay consistent.
* No two different characters in s1 can map to the same character in s2.

So I understood that I need to maintain a one-to-one mapping between characters of both strings.

To guarantee this, I decided to keep two mappings:

* One from s1 to s2
* One from s2 to s1

If at any point the mapping breaks, I return false.

---

## Approach

1. First, check if the lengths of both strings are equal. If not, return false.
2. Create two arrays of size 256 (ASCII range).

   * map1 for s1 to s2
   * map2 for s2 to s1
3. Initialize both arrays with -1.
4. Traverse both strings together.
5. For each index i:

   * Let c1 = s1[i]
   * Let c2 = s2[i]
6. If both characters are not mapped yet:

   * Create mapping in both arrays.
7. If already mapped:

   * Check if mapping is consistent.
   * If not consistent, return false.
8. If loop finishes without conflict, return true.

---

## Data Structures Used

* Two fixed-size integer arrays of size 256
* Used to store character-to-character mapping

This ensures constant time access for each character.

---

## Operations & Behavior Summary

* Single traversal of both strings
* Constant time lookup for mapping
* Immediate termination if mapping conflict occurs
* Ensures one-to-one mapping

---

## Complexity

Time Complexity: O(n)

* We traverse the string once.
* n is the length of the string.

Space Complexity: O(1)

* We use fixed-size arrays of size 256.
* Space does not depend on input size.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool areIsomorphic(string &s1, string &s2) {
        if (s1.length() != s2.length()) return false;
        
        vector<int> map1(256, -1);
        vector<int> map2(256, -1);
        
        for (int i = 0; i < s1.length(); i++) {
            char c1 = s1[i];
            char c2 = s2[i];
            
            if (map1[c1] == -1 && map2[c2] == -1) {
                map1[c1] = c2;
                map2[c2] = c1;
            } else {
                if (map1[c1] != c2 || map2[c2] != c1)
                    return false;
            }
        }
        return true;
    }
};
```

### Java

```java
class Solution {
    public boolean areIsomorphic(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        
        int[] map1 = new int[256];
        int[] map2 = new int[256];
        
        for (int i = 0; i < 256; i++) {
            map1[i] = -1;
            map2[i] = -1;
        }
        
        for (int i = 0; i < s1.length(); i++) {
            char c1 = s1.charAt(i);
            char c2 = s2.charAt(i);
            
            if (map1[c1] == -1 && map2[c2] == -1) {
                map1[c1] = c2;
                map2[c2] = c1;
            } else {
                if (map1[c1] != c2 || map2[c2] != c1)
                    return false;
            }
        }
        return true;
    }
}
```

### JavaScript

```javascript
class Solution {
    areIsomorphic(s1, s2) {
        if (s1.length !== s2.length) return false;
        
        let map1 = new Array(256).fill(-1);
        let map2 = new Array(256).fill(-1);
        
        for (let i = 0; i < s1.length; i++) {
            let c1 = s1.charCodeAt(i);
            let c2 = s2.charCodeAt(i);
            
            if (map1[c1] === -1 && map2[c2] === -1) {
                map1[c1] = c2;
                map2[c2] = c1;
            } else {
                if (map1[c1] !== c2 || map2[c2] !== c1)
                    return false;
            }
        }
        return true;
    }
}
```

### Python3

```python
class Solution:
    def areIsomorphic(self, s1, s2):
        if len(s1) != len(s2):
            return False
        
        map1 = [-1] * 256
        map2 = [-1] * 256
        
        for i in range(len(s1)):
            c1 = ord(s1[i])
            c2 = ord(s2[i])
            
            if map1[c1] == -1 and map2[c2] == -1:
                map1[c1] = c2
                map2[c2] = c1
            else:
                if map1[c1] != c2 or map2[c2] != c1:
                    return False
        
        return True
```

---

## Step-by-step Detailed Explanation

1. Compare lengths. If different, return false.
2. Create two mapping arrays.
3. Initialize them with -1.
4. Traverse both strings together.
5. At each index:

   * Convert characters to ASCII index.
   * If both unmapped, create mapping.
   * If already mapped, verify consistency.
6. If any mismatch occurs, return false immediately.
7. If traversal finishes successfully, return true.

This guarantees one-to-one mapping and prevents duplicate mappings.

---

## Examples

Example 1:
Input: s1 = "aab", s2 = "xxy"
Output: true

Example 2:
Input: s1 = "aab", s2 = "xyz"
Output: false

Example 3:
Input: s1 = "abc", s2 = "xxz"
Output: false

---

## How to use / Run locally

C++:

1. Save code in a .cpp file.
2. Compile using g++ filename.cpp
3. Run using ./a.out

Java:

1. Save as Solution.java
2. Compile using javac Solution.java
3. Run using java Solution

JavaScript:

1. Save as solution.js
2. Run using node solution.js

Python:

1. Save as solution.py
2. Run using python solution.py

---

## Notes & Optimizations

* Since input is lowercase English letters, we could use size 26 arrays instead of 256.
* Early return improves performance in case of conflict.
* Using arrays is faster than using hash maps.
* Solution works efficiently even for maximum constraint 10^5.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
