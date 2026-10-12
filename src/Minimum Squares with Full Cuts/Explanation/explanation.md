# Minimum Squares with Full Cuts

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

You are given a rectangular piece of paper with length n and width m. The task is to cut this rectangle into the smallest possible number of squares. The only allowed cuts are full cuts. That means every cut must go completely across the remaining piece of paper, either horizontally or vertically. You cannot make partial cuts that stop in the middle of a piece.

The goal is to return the minimum number of squares you can obtain under this full-cut restriction. This is a classic competitive programming problem that appears on platforms like GeeksforGeeks and tests understanding of efficient rectangle division using the Euclidean algorithm idea.

## Constraints

- 1 ≤ n, m ≤ 10^9

Because the sides can be as large as one billion, any solution that loops over the dimensions or uses dynamic programming tables will be too slow. The expected time complexity is O(log(min(n, m))).

## Intuition

When I first looked at the examples I noticed something familiar. For a 4 × 5 rectangle the answer is 5. For 2 × 4 the answer is 2. For 11 × 13 the answer is 8.

I tried the classic Euclidean algorithm steps on 11 and 13:

- 13 divided by 11 gives quotient 1 and remainder 2
- 11 divided by 2 gives quotient 5 and remainder 1
- 2 divided by 1 gives quotient 2 and remainder 0

Adding those quotients (1 + 5 + 2) gives exactly 8, which matches the sample. The same addition worked for the other examples. That told me the minimum number of squares under full cuts is simply the sum of all the quotients that appear while computing the greatest common divisor of n and m.

## Approach

I always keep the larger side in one variable and the smaller side in another.  

While the smaller side is still greater than zero I do three things:

1. Add the integer division of the larger side by the smaller side to a running total. This number tells me how many equal-sized squares I can cut off in one full-cut step.
2. Replace the larger side with the remainder of that division. The leftover strip becomes the new rectangle.
3. Swap the two sides so the current larger value is again on the left.

When the remainder finally becomes zero the process stops and the accumulated sum is the answer. If the two sides start equal, the first division gives 1 and the answer is simply 1.

This approach runs in logarithmic time because each step shrinks the numbers the same way the Euclidean algorithm does.

## Data Structures Used

No special data structures are required. The solution only uses a few integer variables to hold the current sides, the remainder, and the running answer. Because the problem constraints are so large, using any array or matrix would be impossible anyway.

## Operations & Behavior Summary

- Make sure the first number is at least as large as the second.
- Start a counter at zero.
- Repeatedly:
  - Add how many times the smaller side fits into the larger side.
  - Compute the leftover length after those cuts.
  - Move the smaller side into the larger position and the leftover into the smaller position.
- Stop when nothing is left.
- Return the total number of squares counted.

## Complexity

| Complexity Type   | Value                  | Explanation |
|-------------------|------------------------|-------------|
| Time Complexity   | O(log(min(n, m)))     | Each iteration of the Euclidean-style loop reduces the arguments at the same rate as the classic gcd algorithm, so the number of steps is logarithmic in the smaller dimension. |
| Space Complexity  | O(1)                   | Only a constant number of integer variables are used. No extra memory is allocated. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minSquares(int n, int m) {
        if (n < m) swap(n, m);
        int ans = 0;
        while (m > 0) {
            ans += n / m;
            int r = n % m;
            n = m;
            m = r;
        }
        return ans;
    }
};
```

### Java

```java
class Solution {
    public int minSquares(int n, int m) {
        if (n < m) {
            int t = n;
            n = m;
            m = t;
        }
        int ans = 0;
        while (m > 0) {
            ans += n / m;
            int r = n % m;
            n = m;
            m = r;
        }
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
class Solution {
    minSquares(n, m) {
        if (n < m) {
            let t = n;
            n = m;
            m = t;
        }
        let ans = 0;
        while (m > 0) {
            ans += Math.floor(n / m);
            let r = n % m;
            n = m;
            m = r;
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def minSquares(self, n, m):
        if n < m:
            n, m = m, n
        ans = 0
        while m > 0:
            ans += n // m
            n, m = m, n % m
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in every language, so the reasoning stays the same.

First I compare the two sides and swap them if needed so that the larger value is always in the first variable. This is only for readability; the algorithm would still work without the swap.

I create a variable that will store the final answer and set it to zero.

The main loop continues as long as the smaller side is positive. Inside the loop three operations happen:

- Integer division of the larger side by the smaller side tells me how many full squares of that size I can cut right now. I add that number to the answer.
- The modulo operation gives me the leftover strip after those squares are removed.
- I shift the values: the previous smaller side becomes the new larger side, and the leftover becomes the new smaller side. This is exactly the same step the Euclidean algorithm uses to compute gcd.

When the leftover finally reaches zero, every piece of the original rectangle has been turned into a square, so the loop ends and the answer variable holds the minimum number of squares.

Edge cases are handled naturally. If both sides are equal, the first division produces 1 and the remainder is 0, so the function correctly returns 1. If one side is 1, the algorithm simply counts how many 1 × 1 squares are needed, which is the length of the other side.

Because the numbers can be as large as 10^9, all operations stay within 64-bit integers in languages that need it, but the standard 32-bit int is already enough for the given constraints in most platforms.

## Examples

**Example 1**  
Input: n = 4, m = 5  
Output: 5  

Trace:  
5 ÷ 4 = 1 remainder 1 → add 1  
4 ÷ 1 = 4 remainder 0 → add 4  
Total = 5  
(one 4 × 4 square and four 1 × 1 squares)

**Example 2**  
Input: n = 2, m = 4  
Output: 2  

Trace:  
4 ÷ 2 = 2 remainder 0 → add 2  
Total = 2  
(two 2 × 2 squares)

**Example 3**  
Input: n = 11, m = 13  
Output: 8  

Trace:  
13 ÷ 11 = 1 remainder 2 → add 1  
11 ÷ 2 = 5 remainder 1 → add 5  
2 ÷ 1 = 2 remainder 0 → add 2  
Total = 8

## How to Use / Run Locally

**C++**  

1. Copy the C++ solution into a file named `main.cpp`.  
2. Open a terminal and compile with: `g++ main.cpp -o main`  
3. Run the program with: `./main`  
4. Enter two integers when prompted or hard-code them inside the main function for testing.

**Java**  

1. Copy the Java solution into a file named `Solution.java`.  
2. Compile with: `javac Solution.java`  
3. Run with: `java Solution`  
4. You can add a main method that reads two integers from the console and prints the result.

**JavaScript**  

1. Copy the JavaScript solution into a file named `solution.js`.  
2. Make sure Node.js is installed.  
3. Run with: `node solution.js`  
4. You can add a few console.log statements that call the function with sample inputs.

**Python3**  

1. Copy the Python solution into a file named `solution.py`.  
2. Run with: `python3 solution.py`  
3. Add a few print statements at the bottom to test the function with the sample inputs.

## Notes & Optimizations

The algorithm is already optimal for the given constraints. Because n and m can be up to one billion, any solution that uses loops proportional to n or m, or that builds a DP table, will time out or run out of memory.

An interesting related problem allows partial cuts (not full cuts across the paper). That version can sometimes produce fewer squares, but it is much harder and usually needs dynamic programming or more advanced techniques. Under the full-cut restriction the Euclidean-quotient method is both correct and the fastest possible.

One small implementation tip: always use integer division and modulo so that the remainder stays non-negative. All four languages handle this correctly with their built-in operators.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
