# Palindrome Binary (Check if Binary Representation is Palindrome)

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

This problem asks a simple but interesting question:
Given a number **N**, check whether its **binary representation** is a palindrome.

In other words, when we convert the number into binary, the sequence of 0s and 1s should read the same from left to right and right to left.

Input: A single integer N
Output: Return 1 if its binary form is a palindrome, otherwise return 0

This is a classic bit manipulation problem that tests how well you understand binary representation and efficient comparisons.

## Constraints

* 1 ≤ N ≤ 10^18

## Intuition

When I first looked at this, my instinct was to convert the number into a binary string and simply check if it’s a palindrome.

That works, but it adds extra space and feels unnecessary.

Then I realized something better:
Binary numbers are just bits. I don’t need a string. I can compare bits directly from both ends.

So instead of building anything new, I can just use bit operations to check symmetry.

That makes the solution cleaner and more efficient.

## Approach

Here’s how I break it down step by step:

1. Find where the binary representation actually starts
   Numbers have leading zeros in memory, but those don’t matter. I only care about the first `1` from the left.

2. Use two pointers:

   * One at the leftmost set bit (MSB)
   * One at the rightmost bit (LSB)

3. Compare bits at both positions:

   * Extract each bit using bit shifting
   * If they don’t match, return 0 immediately

4. Move inward:

   * Left pointer moves down
   * Right pointer moves up

5. Continue until both pointers meet

6. If everything matches, return 1

This avoids string conversion and keeps the logic fast.

## Data Structures Used

* No extra data structures are used
* Only a few integer variables for pointers and bit extraction

This is why the space complexity stays constant.

## Operations & Behavior Summary

* Identify the most significant bit (start of binary)
* Initialize two pointers (left and right)
* Extract bits using right shift and AND operation
* Compare bits from both ends
* Move pointers toward the center
* Return result based on mismatch or full match

Think of it like checking a palindrome in an array, but instead of characters, we’re comparing bits.

## Complexity

| Type             | Complexity | Explanation                                              |
| ---------------- | ---------- | -------------------------------------------------------- |
| Time Complexity  | O(log N)   | We check each bit once. The number of bits in N is log N |
| Space Complexity | O(1)       | No extra memory is used beyond variables                 |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int isPallindrome(long long int N) {
        // Find the position of the most significant bit (MSB)
        int left = 63; // assuming 64-bit number
        
        // Move left pointer to the first '1' bit
        while (left >= 0 && ((N >> left) & 1) == 0) {
            left--;
        }
        
        int right = 0; // least significant bit
        
        // Compare bits from both ends
        while (left > right) {
            int leftBit = (N >> left) & 1;   // extract left bit
            int rightBit = (N >> right) & 1; // extract right bit
            
            // If mismatch found, not a palindrome
            if (leftBit != rightBit) return 0;
            
            // Move pointers inward
            left--;
            right++;
        }
        
        return 1; // all bits matched
    }
};
```

### Java

```java
// User function Template for Java

class Solution {
    static long isPallindrome(long N) {
        int left = 63; // maximum bits for long
        
        // Find MSB
        while (left >= 0 && ((N >> left) & 1) == 0) {
            left--;
        }
        
        int right = 0;
        
        // Compare bits
        while (left > right) {
            long leftBit = (N >> left) & 1;
            long rightBit = (N >> right) & 1;
            
            if (leftBit != rightBit) return 0;
            
            left--;
            right++;
        }
        
        return 1;
    }
}
```

### JavaScript

```javascript
// User function Template for javascript

/**
 * @param {number} N
 * @return {number}
 */

class Solution {
    isPallindrome(N) {
        let left = 63;
        
        // Find MSB
        while (left >= 0 && ((N >> left) & 1) === 0) {
            left--;
        }
        
        let right = 0;
        
        // Compare bits
        while (left > right) {
            let leftBit = (N >> left) & 1;
            let rightBit = (N >> right) & 1;
            
            if (leftBit !== rightBit) return 0;
            
            left--;
            right++;
        }
        
        return 1;
    }
}
```

### Python3

```python
#User function Template for python3

class Solution:
    def isPallindrome(self, N):
        left = 63  # assume 64-bit
        
        # Find MSB (first 1 from left)
        while left >= 0 and ((N >> left) & 1) == 0:
            left -= 1
        
        right = 0
        
        # Compare bits from both ends
        while left > right:
            left_bit = (N >> left) & 1
            right_bit = (N >> right) & 1
            
            if left_bit != right_bit:
                return 0
            
            left -= 1
            right += 1
        
        return 1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all languages.

First, I try to find the position of the most significant bit. This is important because binary numbers don’t include leading zeros. If I don’t handle this properly, I might compare incorrect bits.

Once I find that position, I set two pointers:

* One at the start of the binary number
* One at the end

Then I begin comparing bits.

To extract a bit at position `i`, I shift the number right by `i` positions. This brings that bit to the last position. Then I use AND with 1 to isolate it.

If at any point the bits don’t match, I immediately stop and return 0. No need to check further.

If they match, I move both pointers toward the center.

This continues until all corresponding bits are checked.

If no mismatch is found, the binary representation is a palindrome.

This approach is efficient because:

* No string conversion
* No extra memory
* Direct bit comparison

## Examples

Example 1
Input: N = 17
Binary: 10001
Output: 1

Trace:
First bit = 1, last bit = 1 → match
Second bit = 0, second last = 0 → match
Middle bit is 0 → fine
Result → palindrome

Example 2
Input: N = 16
Binary: 10000
Output: 0

Trace:
First bit = 1, last bit = 0 → mismatch
Stop immediately → not a palindrome

Example 3
Input: N = 9
Binary: 1001
Output: 1

Trace:
1 == 1
0 == 0
All matched → palindrome

## How to Use / Run Locally

### C++

1. Save the file as `solution.cpp`
2. Compile using:

   ```
   g++ solution.cpp -o solution
   ```

3. Run:

   ```
   ./solution
   ```

### Java

1. Save as `Solution.java`
2. Compile:

   ```
   javac Solution.java
   ```

3. Run:

   ```
   java Solution
   ```

### JavaScript

1. Save as `solution.js`
2. Run using Node.js:

   ```
   node solution.js
   ```

### Python3

1. Save as `solution.py`
2. Run:

   ```
   python3 solution.py
   ```

## Notes & Optimizations

* Avoid converting to string unless required. Bit manipulation is faster and cleaner.
* Always ignore leading zeros when dealing with binary representation.
* Works efficiently even for large numbers up to 10^18.
* Edge case: If N is 1, it is always a palindrome (binary = 1).
* This approach is optimal in both time and space.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
