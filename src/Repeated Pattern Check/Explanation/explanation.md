# Repeated Pattern Check - GeeksforGeeks Solution

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

You are given a string that contains only the characters `x` and `y`. The task is to check whether this string can be completely divided into smaller pieces where each piece follows the same simple rule: some number of `x` characters followed by exactly the same number of `y` characters.

In other words, the string should be made by joining one or more blocks of the form `x^n y^n` (where n is at least 1). Different blocks can have different values of n.

If the entire string can be split this way without any leftover characters, return true. Otherwise return false.

This is a classic string pattern matching problem that appears in many coding interviews and competitive programming contests under topics like strings and pattern validation.

## Constraints

- 1 ≤ length of string s ≤ 10^5
- The string s contains only the characters `x` and `y`

Because the length can be up to 100000, any solution slower than linear time will fail on large test cases.

## Intuition

When I first read the problem I noticed that every valid piece must start with one or more `x`s and then the same number of `y`s. There is no room for a `y` to appear before its matching `x`s, and you cannot leave an unmatched group of `x`s at the end.

This observation immediately suggests a single left-to-right scan. I can keep counting consecutive `x`s, then count the `y`s that follow them, and simply check whether the two counts are equal. If they ever differ, or if a piece starts with a `y`, the string is invalid. If I reach the end of the string after only valid pieces, the answer is true.

This approach feels natural because it mirrors exactly how a human would verify the pattern by hand.

## Approach

I walk through the string using a single index. While the index is still inside the string I perform two consecutive counting steps:

1. Count how many `x` characters appear in a row starting from the current position.
2. Immediately after that, count how many `y` characters appear in a row.

After both counts are finished I check two simple conditions:
- The number of `x`s must be greater than zero (a piece cannot start with `y`).
- The number of `x`s must equal the number of `y`s.

If either condition fails I return false at once. Otherwise I continue from the new position and repeat the same process for the next piece. When the index finally reaches the end of the string every character has been consumed by a valid piece, so I return true.

This method examines every character exactly once and needs only a handful of integer variables.

## Data Structures Used

No extra data structures are required. The algorithm works directly on the input string using only a few integer variables (an index and two counters). This keeps both time and space optimal for the given constraints.

## Operations & Behavior Summary

- Start an index at the beginning of the string.
- While the index is still valid:
  - Count consecutive `x`s and advance the index.
  - Count consecutive `y`s and advance the index.
  - If the `x` count is zero or the two counts differ, reject the string.
- If the loop finishes without rejection, accept the string.

The whole process is a single linear pass that never looks backward or stores intermediate results.

## Complexity

| Type              | Complexity | Explanation |
|-------------------|------------|-------------|
| Time Complexity   | O(n)       | Every character is examined exactly once, where n is the length of the string. |
| Space Complexity  | O(1)       | Only a constant number of integer variables are used. No extra arrays or maps are allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    bool findPattern(string& s) {
        int n = s.size();
        int i = 0;
        while (i < n) {
            int x = 0;
            while (i < n && s[i] == 'x') {
                x++;
                i++;
            }
            int y = 0;
            while (i < n && s[i] == 'y') {
                y++;
                i++;
            }
            if (x == 0 || x != y) return false;
        }
        return true;
    }
};
```

### Java
```java
class Solution {
    public boolean findPattern(String s) {
        int n = s.length();
        int i = 0;
        while (i < n) {
            int x = 0;
            while (i < n && s.charAt(i) == 'x') {
                x++;
                i++;
            }
            int y = 0;
            while (i < n && s.charAt(i) == 'y') {
                y++;
                i++;
            }
            if (x == 0 || x != y) return false;
        }
        return true;
    }
}
```

### JavaScript
```javascript
class Solution {
    findPattern(s) {
        let n = s.length;
        let i = 0;
        while (i < n) {
            let x = 0;
            while (i < n && s[i] === 'x') {
                x++;
                i++;
            }
            let y = 0;
            while (i < n && s[i] === 'y') {
                y++;
                i++;
            }
            if (x === 0 || x !== y) return false;
        }
        return true;
    }
}
```

### Python3
```python
class Solution:
    def findPattern(self, s):
        n = len(s)
        i = 0
        while i < n:
            x = 0
            while i < n and s[i] == 'x':
                x += 1
                i += 1
            y = 0
            while i < n and s[i] == 'y':
                y += 1
                i += 1
            if x == 0 or x != y:
                return False
        return True
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax for accessing characters and writing loops differs.

I begin by storing the length of the string so I do not have to recalculate it inside the loops. An index variable starts at zero and will move forward through the entire string.

Inside the main loop I first collect a run of `x` characters. I keep incrementing both the counter and the index as long as the current character is still `x` and I have not gone past the end. When that inner loop stops I do the exact same thing for `y` characters.

At this point I hold two numbers: how many `x`s I just saw and how many `y`s followed them. Two simple checks decide whether the current piece is valid. A zero count of `x`s means the piece started with a `y` (or the remaining string is empty), which is illegal. Unequal counts mean the piece does not form a proper `x^n y^n` block. In either case I return false immediately.

If both checks pass, the index is already sitting at the start of the next possible piece, so the outer loop continues. When the index finally equals the length of the string, every character has been successfully grouped into valid blocks and the function returns true.

Edge cases such as a string that begins with `y`, ends with unmatched `x`s, or contains consecutive `y`s after a finished block are all caught naturally by the same two checks. No special handling is required.

## Examples

**Example 1**  
Input: `s = "xxyyxy"`  
Output: `true`  

Trace:  
- First piece: two `x`s followed by two `y`s → valid (`n = 2`)  
- Second piece: one `x` followed by one `y` → valid (`n = 1`)  
- End of string reached → overall true

**Example 2**  
Input: `s = "xyx"`  
Output: `false`  

Trace:  
- First piece: one `x` followed by one `y` → valid  
- Remaining character is a single `x` with no matching `y` → invalid  
- Return false

**Example 3**  
Input: `s = "xx"`  
Output: `false`  

Trace:  
- Count two `x`s, then zero `y`s → counts differ → false

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Compile with `g++ -o main main.cpp`.  
3. Run with `./main`.  
4. Provide the input string when prompted or hard-code a test case inside `main`.

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.  
4. You can add a simple `main` method that creates an instance and calls `findPattern` with sample strings.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with `node solution.js`.  
3. Add a few console.log statements at the bottom to test different inputs.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run with `python3 solution.py`.  
3. Create an instance of the class and call the method with test strings, printing the results.

In all languages the core function expects a single string argument and returns a boolean.

## Notes & Optimizations

The solution already runs in optimal linear time and constant space, which is the best possible for this problem.  

One alternative idea is to use a stack or to pre-compute all possible split points, but both approaches use extra memory and are slower for the large constraint of 10^5.  

A common mistake is forgetting to handle a string that ends with unmatched `x`s or that contains a `y` at the very beginning; the two simple checks after each counting phase catch both cases automatically.  

Because the algorithm never looks ahead more than the current run of identical characters, it is also cache-friendly and works well even on the maximum input size.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
