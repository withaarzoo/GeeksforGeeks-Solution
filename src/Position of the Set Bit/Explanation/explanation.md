# Position of the Set Bit

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

This problem is about finding the position of the only set bit in a number.

You are given an integer `n`. You need to check its binary representation and figure out:

* If it has exactly one set bit (only one `1`), return its position
* The position is counted from the right (LSB starts at position 1)
* If there are zero or more than one set bits, return `-1`

This is a classic bit manipulation problem that tests your understanding of binary numbers and bitwise operations.

## Constraints

* 0 ≤ n ≤ 10^8

## Intuition

The first thing I noticed is that numbers with exactly one set bit are actually powers of 2.

For example:

* 1 → 0001
* 2 → 0010
* 4 → 0100
* 8 → 1000

All of them have only one `1`.

So instead of checking every bit manually, I realized I can use a bitwise trick to quickly detect this condition.

## Approach

I broke the problem into two clear steps.

First, I check whether the number has exactly one set bit.

* If `n` is 0, it has no set bits, so return `-1`
* If `(n & (n - 1)) != 0`, then it has more than one set bit

This works because subtracting 1 flips bits in a way that removes the lowest set bit. If more bits are left, the AND operation won't be zero.

Second, if the number passes the check, I find the position of that set bit.

* Start counting from position = 1
* Keep shifting the number to the right
* The moment I see a `1`, I return the current position

This keeps the logic simple and efficient.

## Data Structures Used

No extra data structures are used.

* I only use integer variables
* Bitwise operations handle everything directly on the number

This keeps the space complexity constant.

## Operations & Behavior Summary

Here is what the algorithm does step by step:

* Check if the number is zero
* Check if it has more than one set bit using a bitwise trick
* If valid, start scanning from the least significant bit
* Shift the number right one step at a time
* Count positions until the set bit is found
* Return the position

## Complexity

| Type             | Complexity | Explanation                                                                       |
| ---------------- | ---------- | --------------------------------------------------------------------------------- |
| Time Complexity  | O(log n)   | I may check each bit once by shifting, which depends on the number of bits in `n` |
| Space Complexity | O(1)       | No extra memory is used apart from a few variables                                |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findPosition(int n) {
        // If n is 0, it has no set bits
        if (n == 0) return -1;
        
        // Check if n has exactly one set bit
        // If n & (n - 1) is not 0, then more than one set bit exists
        if ((n & (n - 1)) != 0) return -1;
        
        int position = 1; // Position starts from 1 (LSB)
        
        // Keep shifting until we find the set bit
        while (n > 0) {
            // If last bit is 1, return position
            if (n & 1) return position;
            
            // Shift right to check next bit
            n = n >> 1;
            
            // Move to next position
            position++;
        }
        
        return -1; // Safety return (should not reach here)
    }
};
```

### Java

```java
class Solution {
    public int findPosition(int n) {
        // If n is 0, no set bits
        if (n == 0) return -1;
        
        // Check if exactly one set bit exists
        if ((n & (n - 1)) != 0) return -1;
        
        int position = 1; // Start from LSB
        
        // Traverse bits
        while (n > 0) {
            // If current bit is 1, return position
            if ((n & 1) == 1) return position;
            
            // Shift right
            n = n >> 1;
            
            position++; // Increase position
        }
        
        return -1;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @returns {number}
 */

class Solution {
    findPosition(n) {
        // If n is 0, no set bit
        if (n === 0) return -1;
        
        // Check for exactly one set bit
        if ((n & (n - 1)) !== 0) return -1;
        
        let position = 1; // Start from LSB
        
        // Loop through bits
        while (n > 0) {
            // If current bit is 1, return position
            if ((n & 1) === 1) return position;
            
            // Shift right
            n = n >> 1;
            
            position++;
        }
        
        return -1;
    }
}
```

### Python3

```python
class Solution:
    def findPosition(self, n):
        # If n is 0, it has no set bits
        if n == 0:
            return -1
        
        # Check if n has exactly one set bit
        # If not, return -1
        if (n & (n - 1)) != 0:
            return -1
        
        position = 1  # Start counting from LSB
        
        # Traverse bits
        while n > 0:
            # If current bit is 1, return position
            if n & 1:
                return position
            
            # Shift right to check next bit
            n = n >> 1
            
            position += 1  # Move to next position
        
        return -1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in all languages. Only syntax changes.

First, I handle the edge case.

If `n == 0`, I return `-1` because there are no set bits.

Next, I check if the number has exactly one set bit.

I use `(n & (n - 1))`.

* If the result is not zero, that means more than one set bit exists
* In that case, I return `-1`

If the number passes this check, I know it has exactly one set bit.

Now I find its position.

I start with `position = 1`.

Then I loop while `n > 0`:

* I check the last bit using `n & 1`
* If it is `1`, I return the current position
* Otherwise, I shift the number right using `n >> 1`
* I increment the position

This continues until I find the set bit.

Since I already validated the input, I know I will find it.

## Examples

Example 1
Input: n = 2
Output: 2

Binary of 2 is `10`

* First bit (from right) is 0
* Second bit is 1
  So the answer is 2

---

Example 2
Input: n = 5
Output: -1

Binary of 5 is `101`

* There are two set bits
  So the answer is -1

---

Example 3
Input: n = 8
Output: 4

Binary of 8 is `1000`

* Only one set bit at position 4
  So the answer is 4

## How to Use / Run Locally

C++:

* Save the file as `solution.cpp`
* Compile using: `g++ solution.cpp`
* Run using: `./a.out`

Java:

* Save as `Solution.java`
* Compile: `javac Solution.java`
* Run: `java Solution`

JavaScript:

* Save as `solution.js`
* Run using: `node solution.js`

Python:

* Save as `solution.py`
* Run using: `python solution.py`

## Notes & Optimizations

* The key optimization is using `(n & (n - 1))` to check for a single set bit in constant time
* This avoids counting bits manually
* The approach works efficiently even for large numbers within constraints
* Always handle the edge case when `n = 0`
* An alternative approach is using logarithms, but bit manipulation is faster and more reliable

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
