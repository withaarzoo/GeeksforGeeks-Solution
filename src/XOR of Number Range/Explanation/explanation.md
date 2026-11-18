# XOR of Number Range - GeeksforGeeks Solution

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

## Problem Summary

You are given two integers L and R. The task is to find the bitwise XOR of every integer that lies in the closed range [L, R].

In simple words, compute L XOR (L+1) XOR (L+2) ... XOR R.

The range can be huge, so a naive loop will not work. The solution must answer the query in constant time.

## Constraints

- 1 ≤ L ≤ R ≤ 10^9

Because the upper limit is one billion, any solution slower than O(1) will get Time Limit Exceeded.

## Intuition

The first thing that stands out is the size of the range. Looping from L to R is impossible.

I remembered a useful fact: the XOR of all numbers from 1 to N follows a repeating pattern that depends only on N modulo 4.

Once I can compute XOR from 1 to any number instantly, the XOR of the range [L, R] becomes:

(XOR from 1 to R) XOR (XOR from 1 to L-1)

That single observation turns a hard-looking problem into a constant-time calculation.

## Approach

1. Write a tiny helper that returns the XOR of numbers from 1 to N.
2. The helper only looks at N % 4:
   - If remainder is 0 → answer is N
   - If remainder is 1 → answer is 1
   - If remainder is 2 → answer is N + 1
   - If remainder is 3 → answer is 0
3. Call the helper for R and for (L - 1).
4. XOR the two results. That is the final answer for the range [L, R].

When L equals 1, L-1 becomes 0 and the helper correctly returns 0, so the formula still works.

## Data Structures Used

No extra data structures are required.  
Only a few integer variables are used. This keeps both time and space strictly O(1).

## Operations & Behavior Summary

- Compute XOR-from-1-to-R using the modulo-4 pattern.
- Compute XOR-from-1-to-(L-1) the same way.
- Combine the two values with a single bitwise XOR.
- Return the combined result.

The algorithm never iterates over the range. Every step is a handful of arithmetic operations.

## Complexity

| Complexity Type | Value | Explanation |
|-----------------|-------|-------------|
| Time Complexity | O(1)  | Only a constant number of arithmetic and bitwise operations are performed, independent of the size of L and R. |
| Space Complexity| O(1)  | No arrays, maps or other structures are allocated. Only a few integer variables are used. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int findXOR(int l, int r) {
        auto xorUpto = [](int n) {
            if (n % 4 == 0) return n;
            if (n % 4 == 1) return 1;
            if (n % 4 == 2) return n + 1;
            return 0;
        };
        return xorUpto(r) ^ xorUpto(l - 1);
    }
};
```

### Java
```java
class Solution {
    public int findXOR(int l, int r) {
        return xorUpto(r) ^ xorUpto(l - 1);
    }
    
    private int xorUpto(int n) {
        if (n % 4 == 0) return n;
        if (n % 4 == 1) return 1;
        if (n % 4 == 2) return n + 1;
        return 0;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */

class Solution {
    findXOR(l, r) {
        return this.xorUpto(r) ^ this.xorUpto(l - 1);
    }
    
    xorUpto(n) {
        if (n % 4 === 0) return n;
        if (n % 4 === 1) return 1;
        if (n % 4 === 2) return n + 1;
        return 0;
    }
}
```

### Python3
```python
class Solution:
    def findXOR(self, l: int, r: int) -> int:
        def xorUpto(n):
            if n % 4 == 0:
                return n
            if n % 4 == 1:
                return 1
            if n % 4 == 2:
                return n + 1
            return 0
        return xorUpto(r) ^ xorUpto(l - 1)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core idea is identical in every language.

First a helper function (or lambda) is defined that accepts a single integer N and returns the XOR of all numbers from 1 to N.  
Inside the helper we examine N % 4. Four simple cases cover every possible remainder. Because the pattern repeats every four numbers, this is always correct.

The main function then calls the helper twice:

- once with the right endpoint R  
- once with the left endpoint minus one (L - 1)

XORing those two results cancels out everything from 1 to L-1 and leaves only the numbers that belong to the requested range.

Edge case handling is automatic: when L is 1, L-1 becomes 0 and the helper returns 0, so the formula stays valid.

No language-specific tricks are needed. The same logic translates directly into C++, Java, JavaScript and Python.

## Examples

**Example 1**  
Input: L = 4, R = 8  
Numbers: 4 ^ 5 ^ 6 ^ 7 ^ 8  
Step-by-step:  
XOR from 1 to 8 = 8 (because 8 % 4 == 0)  
XOR from 1 to 3 = 0 (because 3 % 4 == 3)  
8 ^ 0 = 8  
Output: 8

**Example 2**  
Input: L = 2, R = 4  
Numbers: 2 ^ 3 ^ 4  
XOR from 1 to 4 = 4  
XOR from 1 to 1 = 1  
4 ^ 1 = 5  
Output: 5

**Example 3**  
Input: L = 5, R = 9  
Numbers: 5 ^ 6 ^ 7 ^ 8 ^ 9  
XOR from 1 to 9 = 1  
XOR from 1 to 4 = 4  
1 ^ 4 = 5  
Output: 5

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Compile: `g++ -o main main.cpp`  
3. Run: `./main`  
Provide L and R through standard input or hard-code them for testing.

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
Feed L and R via Scanner or hard-code them.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node: `node solution.js`  
You can pass L and R as command-line arguments or hard-code them inside the file.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run: `python3 solution.py`  
Read L and R from input or hard-code them for quick tests.

## Notes & Optimizations

The modulo-4 pattern is the key that makes the solution O(1). Without it, even a smart loop would be too slow for the given constraints.

An alternative way is to use a segment tree or sparse table for range XOR queries, but those structures are unnecessary when only a single query is asked and the numbers are consecutive.

Because the formula works for any L and R within the constraint range, no extra edge-case handling is required beyond the L = 1 case, which is already covered by treating XOR up to 0 as 0.

This approach is both the fastest and the simplest correct solution for the “XOR of Number Range” problem.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
