# Trace Path - GeeksforGeeks Solution

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

You are given a rectangular grid that has n rows and m columns. You also get a string s that contains only the characters L, R, D and U. These characters tell you how to move:

- L moves one cell left
- R moves one cell right
- D moves one cell up
- U moves one cell down

The task is to decide whether there exists at least one starting cell on the grid such that if you start from that cell and follow every command in s in order, you never step outside the grid.

If such a starting cell exists, return true. Otherwise return false.

This is a classic grid path validation problem that appears frequently on GeeksforGeeks and other coding platforms.

## Constraints

- 1 ≤ n, m, |s| ≤ 10⁴
- The string s contains only the characters L, R, D and U

Because both the grid size and the length of the path can be as large as 10⁴, any solution that tries every possible starting cell will be too slow. We need a linear-time answer.

## Intuition

Trying every cell as a possible start is impossible under the given limits.  

Instead of checking starts, I looked at the path itself. The path moves left, right, up and down from whatever point I choose. If I can measure how far left, right, up and down the path ever travels relative to the start, I can decide whether that entire range of movement can fit inside an n × m rectangle.

In other words, the problem reduces to finding the minimum and maximum row offsets and the minimum and maximum column offsets created by the sequence of moves. If both ranges fit inside the given dimensions, a valid starting cell must exist.

## Approach

I process the string only once.

I keep two running offsets: one for the current row and one for the current column. Both start at zero (the imaginary origin).

While I walk through the string I also remember four extreme values:

- the smallest row offset seen so far
- the largest row offset seen so far
- the smallest column offset seen so far
- the largest column offset seen so far

After the whole string has been processed I simply check two conditions:

- (max row offset − min row offset) < n
- (max column offset − min column offset) < m

If both are true the path can be placed somewhere inside the grid; otherwise it cannot.

This works because the row moves never affect the column position and vice versa, so the two directions can be examined independently.

## Data Structures Used

No extra data structures are required.  

Only a handful of integer variables are used to store the current offsets and the four extreme values. This keeps the extra memory constant and makes the solution suitable for the tight constraints.

## Operations & Behavior Summary

1. Initialise four extreme-value variables (minR, maxR, minC, maxC) and two running counters (r, c) to zero.
2. For every character in the movement string:
   - Update the corresponding counter (decrease or increase r or c).
   - Immediately update the four extreme values if the new counter is smaller or larger than the values seen so far.
3. After the loop finishes, compare the vertical span (maxR − minR) with n and the horizontal span (maxC − minC) with m.
4. Return true only when both spans fit inside the given grid dimensions.

## Complexity

| Complexity       | Value   | Explanation                                                                 |
|------------------|---------|-----------------------------------------------------------------------------|
| Time Complexity  | O(\|s\|) | A single linear scan of the movement string is performed. Each character is processed in constant time. |
| Space Complexity | O(1)    | Only a fixed number of integer variables are used. No arrays or other structures that grow with input size are allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    bool isPossible(int n, int m, string& s) {
        int minR = 0, maxR = 0, minC = 0, maxC = 0;
        int r = 0, c = 0;
        for (char ch : s) {
            if (ch == 'L') c--;
            else if (ch == 'R') c++;
            else if (ch == 'D') r--;
            else if (ch == 'U') r++;
            minR = min(minR, r);
            maxR = max(maxR, r);
            minC = min(minC, c);
            maxC = max(maxC, c);
        }
        return (maxR - minR < n) && (maxC - minC < m);
    }
};
```

### Java
```java
class Solution {
    public boolean isPossible(int n, int m, String s) {
        int minR = 0, maxR = 0, minC = 0, maxC = 0;
        int r = 0, c = 0;
        for (char ch : s.toCharArray()) {
            if (ch == 'L') c--;
            else if (ch == 'R') c++;
            else if (ch == 'D') r--;
            else if (ch == 'U') r++;
            minR = Math.min(minR, r);
            maxR = Math.max(maxR, r);
            minC = Math.min(minC, c);
            maxC = Math.max(maxC, c);
        }
        return (maxR - minR < n) && (maxC - minC < m);
    }
}
```

### JavaScript
```javascript
/**
 * @param {number} n
 * @param {number} m
 * @param {String} s
 * @return {Boolean}
 */
class Solution {
    isPossible(n, m, s) {
        let minR = 0, maxR = 0, minC = 0, maxC = 0;
        let r = 0, c = 0;
        for (let ch of s) {
            if (ch === 'L') c--;
            else if (ch === 'R') c++;
            else if (ch === 'D') r--;
            else if (ch === 'U') r++;
            minR = Math.min(minR, r);
            maxR = Math.max(maxR, r);
            minC = Math.min(minC, c);
            maxC = Math.max(maxC, c);
        }
        return (maxR - minR < n) && (maxC - minC < m);
    }
};
```

### Python3
```python
class Solution:
    def isPossible(self, n: int, m: int, s: str) -> bool:
        minR = maxR = minC = maxC = 0
        r = c = 0
        for ch in s:
            if ch == 'L':
                c -= 1
            elif ch == 'R':
                c += 1
            elif ch == 'D':
                r -= 1
            elif ch == 'U':
                r += 1
            minR = min(minR, r)
            maxR = max(maxR, r)
            minC = min(minC, c)
            maxC = max(maxC, c)
        return (maxR - minR < n) and (maxC - minC < m)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in every language; only the syntax changes.

I start by declaring the four extreme-value variables and the two running counters, all set to zero. These variables represent the farthest the path has ever gone relative to the imaginary origin.

I then iterate over every character of the input string. Depending on the character I either decrease or increase the appropriate counter:

- L decreases the column counter
- R increases the column counter
- D decreases the row counter
- U increases the row counter

Right after each update I compare the current counter with the recorded minimum and maximum for that direction and update them if necessary. This guarantees that even if the path later returns toward the origin, the farthest points it ever reached are still remembered.

When the loop ends I compute the total vertical distance the path needs (maxR − minR) and the total horizontal distance it needs (maxC − minC).  

If the vertical distance is strictly smaller than the number of rows and the horizontal distance is strictly smaller than the number of columns, it is always possible to place the starting cell so that the entire path stays inside the grid. Otherwise it is impossible.

The same reasoning applies to every language implementation. The only differences are how loops, character access and minimum/maximum functions are written in each language.

## Examples

**Example 1**

Input: n = 1, m = 1, s = "R"  
Output: false  

Trace:  
- Start offsets (0, 0)  
- After R the column offset becomes 1  
- Column span = 1 − 0 = 1 which is not less than m = 1  
- Therefore no valid starting cell exists.

**Example 2**

Input: n = 2, m = 3, s = "LLRU"  
Output: true  

Trace:  
- L → column = −1 (minC = −1)  
- L → column = −2 (minC = −2)  
- R → column = −1  
- U → row = 1 (maxR = 1)  
- Row span = 1 − 0 = 1 < 2  
- Column span = 0 − (−2) = 2 < 3  
- Both conditions hold, so a valid start exists.

**Example 3**

Input: n = 1, m = 2, s = "UD"  
Output: false  

Trace:  
- U → row = 1  
- D → row = 0  
- Row span = 1 − 0 = 1 which is not less than n = 1  
- The path needs two different rows, but the grid has only one.

## How to Use / Run Locally

**C++**  
1. Copy the C++ solution into a file named `main.cpp`.  
2. Compile with: `g++ -std=c++17 main.cpp -o main`  
3. Run with: `./main`  
   (You will need to add a small driver that reads n, m and s and prints the result.)

**Java**  
1. Copy the Java solution into a file named `Solution.java`.  
2. Compile with: `javac Solution.java`  
3. Run with: `java Solution`  
   (Add a main method that reads input if you want to test interactively.)

**JavaScript**  
1. Copy the JavaScript solution into a file named `solution.js`.  
2. Run with: `node solution.js`  
   (You can call the method directly from the same file for quick tests.)

**Python3**  
1. Copy the Python solution into a file named `solution.py`.  
2. Run with: `python3 solution.py`  
   (Add a few print statements or a simple input reader to verify the output.)

## Notes & Optimizations

- The solution already runs in the best possible time and space under the given constraints.  
- Because rows and columns are independent, there is no need to simulate the actual grid or store the path.  
- Edge cases to watch: empty string (always true), single-cell grid with any non-empty movement (almost always false), and movements that go far in one direction and then return.  
- An alternative approach would be to try every possible start, but that would be O(n · m · |s|) and is far too slow for the limits.  
- The same idea can be extended to three-dimensional grids or more complex movement sets with only minor changes.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
