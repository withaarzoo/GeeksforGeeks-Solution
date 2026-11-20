# Min Flips for Alternate - GeeksforGeeks Problem

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

You are given a binary string made only of 0s and 1s. You can flip any bit (change 0 to 1 or 1 to 0) as many times as you want. The goal is to make the string alternating. An alternating binary string means no two adjacent characters are the same. In other words, it should look like 010101... or 101010....

The task is to find the minimum number of bit flips needed to achieve this.

This is a classic GeeksforGeeks problem under Strings and Binary Representation topics. It tests how well you can think about patterns and count differences efficiently.

## Constraints

- 1 ≤ length of string ≤ 10^5
- The string contains only characters '0' and '1'

Because the length can be up to 100000, any solution slower than linear time will fail on large test cases.

## Intuition

The first thing I noticed is that there are only two possible alternating patterns for any binary string.

One pattern starts with 0: 0 1 0 1 0 1 ...
The other starts with 1: 1 0 1 0 1 0 ...

Any valid alternating string must match one of these two. So instead of trying every possible way to flip bits, I can simply calculate how many flips each pattern would need and pick the smaller number. That immediately gives the minimum flips required.

## Approach

I walk through the given string only once.

While going through each character, I check two things at the same time:
- How many places differ from the pattern that should start with 0
- How many places differ from the pattern that should start with 1

At every index I decide what the expected character should be for both patterns. If the actual character does not match the expected one, I increase the corresponding counter.

When the loop ends I just return the smaller of the two counters. This value is the answer.

No extra space is needed beyond a few integer variables, and the whole process runs in a single pass.

## Data Structures Used

No special data structures are required.

I only use a few integer variables to keep track of the length and the two flip counters. This keeps the solution simple and memory efficient, which is important when the string can be up to 10^5 characters long.

## Operations & Behavior Summary

1. Store the length of the input string.
2. Initialize two counters to zero (one for each possible alternating pattern).
3. Loop over every index from 0 to n-1.
4. For the current index, calculate the expected bit for the 0101... pattern and the 1010... pattern.
5. Compare the actual character with both expected bits and increase the matching counter if they differ.
6. After the loop, return the minimum of the two counters.

This is essentially counting mismatches against the only two valid target strings without ever building those strings.

## Complexity

| Type              | Value | Explanation |
|-------------------|-------|-------------|
| Time Complexity   | O(n)  | We examine each character of the string exactly once. n is the length of the input string. |
| Space Complexity  | O(1)  | Only a constant number of integer variables are used. No extra arrays or maps are created. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minFlips(string &s) {
        int n = s.size();
        int flips0 = 0, flips1 = 0;
        for (int i = 0; i < n; i++) {
            char expected0 = (i % 2 == 0) ? '0' : '1';
            char expected1 = (i % 2 == 0) ? '1' : '0';
            if (s[i] != expected0) flips0++;
            if (s[i] != expected1) flips1++;
        }
        return min(flips0, flips1);
    }
};
```

### Java
```java
class Solution {
    public int minFlips(String s) {
        int n = s.length();
        int flips0 = 0, flips1 = 0;
        for (int i = 0; i < n; i++) {
            char expected0 = (i % 2 == 0) ? '0' : '1';
            char expected1 = (i % 2 == 0) ? '1' : '0';
            if (s.charAt(i) != expected0) flips0++;
            if (s.charAt(i) != expected1) flips1++;
        }
        return Math.min(flips0, flips1);
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @returns {number}
 */

class Solution {
    minFlips(s) {
        let n = s.length;
        let flips0 = 0, flips1 = 0;
        for (let i = 0; i < n; i++) {
            let expected0 = (i % 2 === 0) ? '0' : '1';
            let expected1 = (i % 2 === 0) ? '1' : '0';
            if (s[i] !== expected0) flips0++;
            if (s[i] !== expected1) flips1++;
        }
        return Math.min(flips0, flips1);
    }
}
```

### Python3
```python
class Solution:
    def minFlips(self, s):
        n = len(s)
        flips0 = 0
        flips1 = 0
        for i in range(n):
            expected0 = '0' if i % 2 == 0 else '1'
            expected1 = '1' if i % 2 == 0 else '0'
            if s[i] != expected0:
                flips0 += 1
            if s[i] != expected1:
                flips1 += 1
        return min(flips0, flips1)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is identical across all four languages. Only the syntax changes.

I first get the length of the string so I can loop safely.

Then I create two counters. One will count how many flips are needed to force the string into the 0101... form. The other does the same for the 1010... form.

Inside the loop I look at the current index. If the index is even, the first pattern expects '0' and the second pattern expects '1'. If the index is odd, the expectations reverse.

I compare the real character at that position with both expected values. Every mismatch increases the matching counter by one.

After checking every position I simply take the smaller of the two counters and return it. That number is the minimum flips required to make the string alternating.

Edge cases are handled naturally. A string of length 1 needs zero flips. A string that is already alternating will produce a zero in one of the counters. Very long strings are fine because the algorithm is linear and uses constant extra memory.

The same reasoning works in C++, Java, JavaScript, and Python. The only differences are how you access characters and how you write the loop and the ternary checks.

## Examples

**Example 1**

Input: s = "001"

- Against 010: position 0 expects 0 (match), position 1 expects 1 (actual is 0 → flip), position 2 expects 0 (actual is 1 → flip). Total 2 flips.
- Against 101: position 0 expects 1 (actual is 0 → flip), position 1 expects 0 (match), position 2 expects 1 (match). Total 1 flip.

Minimum is 1. Output: 1

**Example 2**

Input: s = "0001010111"

- Counting mismatches against both patterns gives 2 as the smaller value.
- One possible result after those two flips is "0101010101".

Output: 2

**Example 3**

Input: s = "10"

Already alternating. Both counters will be 0. Output: 0

## How to Use / Run Locally

**C++**
1. Copy the C++ solution into a file named main.cpp
2. Compile with: g++ main.cpp -o main
3. Run with: ./main
4. You will need to add a main function that reads the string and calls the method if you want to test it yourself.

**Java**
1. Copy the Java solution into a file named Solution.java
2. Compile with: javac Solution.java
3. Create a small driver class that creates a Solution object and calls minFlips with a test string.

**JavaScript**
1. Copy the code into a file named solution.js
2. Run with Node: node solution.js
3. Add a few console.log statements with sample strings to see the results.

**Python3**
1. Copy the code into a file named solution.py
2. Run with: python3 solution.py
3. Add a simple if __name__ == "__main__" block that creates the Solution object and prints results for a few test cases.

## Notes & Optimizations

The solution is already optimal for both time and space. Because the constraints allow n up to 10^5, anything slower than O(n) will get Time Limit Exceeded.

An alternative way is to generate the two target strings and then count differences, but that uses extra O(n) space and is unnecessary.

The algorithm correctly handles all edge cases: single-character strings, already alternating strings, and strings that need almost every bit flipped.

No further optimization is needed for the given constraints.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
