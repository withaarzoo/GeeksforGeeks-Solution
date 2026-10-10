# Balancing with Distinct Powers

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

You are given a simple two-pan weighing scale, a target weight `b`, and an unlimited supply of weights that are distinct powers of a number `a` (like 1, a, a², a³, and so on). Exactly one weight exists for each power, so each power can be used at most once.

The goal is to decide whether you can place some of these weights on the pans so that the scale balances according to this rule:

b + (some powers of a) = (some other powers of a)

In other words, can the target weight `b` be expressed as a difference of two disjoint subsets of the powers of `a`? The function should return true if such a placement exists and false otherwise.

This is a classic competitive programming problem that appears in many DSA practice sets under the topic of number representation and balance-scale problems.

## Constraints

- 2 ≤ a ≤ 10⁹
- 1 ≤ b ≤ 10⁹

## Intuition

The first thing that stands out is the equation itself. Moving terms around shows that `b` must equal some powers of `a` minus some other powers of `a`. That means every power of `a` can contribute +1 (right pan), -1 (left pan with the target), or 0 (not used at all).

So the real question becomes: can `b` be written in base `a` using only the digits -1, 0, and 1? Once that observation clicks, the rest of the solution follows naturally from the standard way of converting a number to another base, with a small twist for the digit -1.

## Approach

Start with the given target `b`. While `b` is still positive, look at the remainder when `b` is divided by `a`.

- If the remainder is 0 or 1, the current power is fine. Simply replace `b` with `b / a` and continue.
- If the remainder is exactly `a - 1`, treat it as the digit -1. Add 1 to `b` (the carry) and then divide by `a`.
- Any other remainder means a digit outside the allowed set {-1, 0, 1} would be required. In that case the answer is immediately false.

When `b` finally becomes zero without ever hitting an illegal remainder, a valid placement of the weights exists and the answer is true.

This process examines each digit of `b` in base `a` exactly once and never stores the powers themselves.

## Data Structures Used

No auxiliary data structures are required. The algorithm works with a handful of integer variables only. Because the number of powers that need to be considered is logarithmic in `b`, constant extra space is enough.

## Operations & Behavior Summary

1. Enter a loop that continues as long as the current value of `b` is greater than zero.
2. Compute the remainder of `b` modulo `a`.
3. Decide the next action based on that remainder:
   - remainder 0 or 1 → integer-divide `b` by `a`
   - remainder equal to `a - 1` → add 1 to `b` then integer-divide by `a`
   - any other remainder → return false at once
4. When the loop ends because `b` has become zero, return true.

The same logic is applied in every language; only the syntax for integer division and modulo differs.

## Complexity

| Complexity          | Value          | Explanation |
|---------------------|----------------|-------------|
| Time Complexity     | O(logₐ b)      | Each iteration divides the current value by `a`, so the number of steps equals the number of digits of `b` written in base `a`. |
| Space Complexity    | O(1)           | Only a constant number of integer variables are used; no arrays, maps, or recursion stacks are allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    bool balancePan(int a, int b) {
        while (b > 0) {
            int r = b % a;
            if (r == 0 || r == 1) {
                b /= a;
            } else if (r == a - 1) {
                b = (b + 1) / a;
            } else {
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
    public boolean balancePan(int a, int b) {
        while (b > 0) {
            int r = b % a;
            if (r == 0 || r == 1) {
                b /= a;
            } else if (r == a - 1) {
                b = (b + 1) / a;
            } else {
                return false;
            }
        }
        return true;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number} a
 * @param {number} b
 * @return {boolean}
 */
class Solution {
    balancePan(a, b) {
        while (b > 0) {
            let r = b % a;
            if (r === 0 || r === 1) {
                b = Math.floor(b / a);
            } else if (r === a - 1) {
                b = Math.floor((b + 1) / a);
            } else {
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
    def balancePan(self, a, b):
        while b > 0:
            r = b % a
            if r == 0 or r == 1:
                b //= a
            elif r == a - 1:
                b = (b + 1) // a
            else:
                return False
        return True
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core idea is identical across all four languages, so the reasoning below applies to each of them.

We begin with a simple while loop that keeps running while the remaining value of `b` is positive. Inside the loop the first action is always to obtain the remainder of the current `b` when divided by `a`. That remainder tells us what digit would be needed for the lowest power still under consideration.

If the remainder is 0, that power is not needed at all. If it is 1, the power goes on the opposite side of the target. In both cases we simply replace `b` by the integer quotient `b / a` and move on to the next higher power.

When the remainder equals `a - 1`, we interpret it as the digit -1. Adding 1 to the current `b` produces a multiple of `a`, after which the integer division by `a` correctly carries the +1 into the next higher digit. This is the only place where the algorithm differs from ordinary base conversion.

Any remainder that is neither 0, 1, nor `a - 1` forces a digit that cannot be formed with a single use of each power. The function therefore returns false immediately.

If the loop finishes and `b` has been reduced to zero, every digit examined was legal, so a valid balance exists and the function returns true.

Edge-case handling is automatic: when `b` is already a pure power of `a` the remainders are always 0 or 1; when `a` equals 2 the only possible non-zero remainder is 1, which is accepted; and when `a` is very large the loop terminates after one or two iterations.

## Examples

**Example 1**  
Input: a = 4, b = 11  
Output: true  

Trace:  
11 % 4 = 3, which equals 4-1, so treat as -1 and set b = (11+1)/4 = 3  
3 % 4 = 3, again treat as -1 and set b = (3+1)/4 = 1  
1 % 4 = 1, set b = 0  
b reaches zero, therefore true.  
(The concrete placement is 11 + 4 + 1 = 16.)

**Example 2**  
Input: a = 3, b = 5  
Output: true  

Trace:  
5 % 3 = 2, which equals 3-1, so set b = (5+1)/3 = 2  
2 % 3 = 2, set b = (2+1)/3 = 1  
1 % 3 = 1, set b = 0  
Again true.  
(The concrete placement is 5 + 3 + 1 = 9.)

**Example 3**  
Input: a = 5, b = 7  
Output: false  

Trace:  
7 % 5 = 2, which is neither 0, 1, nor 4.  
Immediate false return.

## How to Use / Run Locally

**C++**  
1. Copy the C++ solution into a file named `main.cpp`.  
2. Open a terminal and compile with `g++ -o main main.cpp`.  
3. Run the executable with `./main`.  
4. Supply values of `a` and `b` according to the input format expected by the driver code you are using.

**Java**  
1. Place the Java solution inside a class file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.  
4. Provide the input values when prompted or through the standard input stream.

**JavaScript**  
1. Save the JavaScript solution in a file named `solution.js`.  
2. Make sure Node.js is installed.  
3. Execute with `node solution.js`.  
4. Feed the required input values through the console or by editing the test harness.

**Python3**  
1. Copy the Python solution into a file named `solution.py`.  
2. Run it with `python3 solution.py`.  
3. Enter the values of `a` and `b` as required by the calling code.

In each case the function `balancePan(a, b)` (or the language-specific equivalent) returns a Boolean result that can be printed or asserted in unit tests.

## Notes & Optimizations

The algorithm already runs in the optimal O(logₐ b) time and constant space, so further asymptotic improvements are unnecessary.  

One practical observation is that when `a` is larger than `b` the loop executes at most twice, making the solution extremely fast for the upper end of the constraints.  

An alternative recursive formulation that builds the representation from the highest power downward is possible but uses extra stack space and is harder to implement correctly under the given limits. The iterative remainder method is therefore preferred.  

The only edge case that needs a moment of thought is `a = 2`. Because the only legal non-zero remainder is 1 (which equals `a-1`), the algorithm correctly accepts every positive integer, matching the theoretical fact that every integer has a balanced binary representation.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)