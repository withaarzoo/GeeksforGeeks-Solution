# Maximum Without 3 Consecutive Set Bits

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

You are given a non-negative integer n. You are allowed to change any set bit (1) into an unset bit (0), but you cannot turn a 0 into a 1.  

The task is to find the largest possible value you can obtain from n such that the binary representation of the final number does not contain three consecutive set bits (111).  

In short, start with n, turn off as few 1-bits as needed (or none), and make sure the result never has three 1s in a row while keeping the number as large as possible.

## Constraints

- 0 ≤ n ≤ 10^9

## Intuition

The first thing I noticed is that every change can only make the number smaller or keep it the same. So the answer is always ≤ n and can only use the bits that are already turned on in n.  

Because a higher bit is worth more than all the lower bits combined, the smart move is to protect the highest bits. I decided to walk from the most significant bit down to the least significant bit and keep a 1 whenever it is available and does not create three consecutive 1s with the bits I already kept.  

This greedy choice works because sacrificing a high bit to save lower bits would always give a smaller final value.

## Approach

I keep two simple variables: one for the answer I am building and one that counts how many consecutive 1s I have placed so far.  

I examine every bit position from 30 down to 0 (more than enough for any n up to 10^9).  

For each position I ask two questions:  
1. Is this bit set in the original n?  
2. Is the current consecutive-1s count still less than 2?  

If both answers are yes, I set the same bit in the result and increase the consecutive counter.  
If the bit is set but the counter is already 2, I leave the bit off and reset the counter.  
If the bit is already off in n, I also reset the counter because a 0 always breaks a streak of 1s.  

When the loop finishes, the result is the largest number that uses only the original bits of n and never contains three consecutive 1s.

## Data Structures Used

No advanced data structures are required.  

I only use a few integer variables:  
- one to store the final answer  
- one to track the length of the current run of consecutive 1s  

Bit-masking operations (AND, OR, left-shift) do all the work. This keeps both time and memory constant.

## Operations & Behavior Summary

1. Initialize result = 0 and consecutive-count = 0.  
2. For bit position i from 30 down to 0:  
   - If the i-th bit of n is 1 and consecutive-count < 2 → set the i-th bit in result and increase consecutive-count.  
   - If the i-th bit of n is 1 but consecutive-count is already 2 → leave the bit unset and reset consecutive-count to 0.  
   - If the i-th bit of n is 0 → reset consecutive-count to 0.  
3. Return the finished result.

## Complexity

| Complexity       | Value | Explanation |
|------------------|-------|-------------|
| Time Complexity  | O(1)  | The loop always runs a fixed 31 iterations. n never needs more than 30 bits, so the work is constant. |
| Space Complexity | O(1)  | Only a handful of integer variables are used. No arrays or extra memory are allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int maxValue(int n) {
        int res = 0;
        int consec = 0;
        for (int i = 30; i >= 0; i--) {
            if (n & (1 << i)) {
                if (consec < 2) {
                    res |= (1 << i);
                    consec++;
                } else {
                    consec = 0;
                }
            } else {
                consec = 0;
            }
        }
        return res;
    }
};
```

### Java
```java
class Solution {
    public int maxValue(int n) {
        int res = 0;
        int consec = 0;
        for (int i = 30; i >= 0; i--) {
            if ((n & (1 << i)) != 0) {
                if (consec < 2) {
                    res |= (1 << i);
                    consec++;
                } else {
                    consec = 0;
                }
            } else {
                consec = 0;
            }
        }
        return res;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number} n
 * @return {number}
 */
class Solution {
    maxValue(n) {
        let res = 0;
        let consec = 0;
        for (let i = 30; i >= 0; i--) {
            if (n & (1 << i)) {
                if (consec < 2) {
                    res |= (1 << i);
                    consec++;
                } else {
                    consec = 0;
                }
            } else {
                consec = 0;
            }
        }
        return res;
    }
}

```

### Python3
```python
class Solution:
    def maxValue(self, n: int) -> int:
        res = 0
        consec = 0
        for i in range(30, -1, -1):
            if n & (1 << i):
                if consec < 2:
                    res |= (1 << i)
                    consec += 1
                else:
                    consec = 0
            else:
                consec = 0
        return res

```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all four languages; only the syntax changes.

I start by creating a variable that will hold the answer (res) and another that remembers how many 1s I have written in a row (consec). Both begin at zero.

I then walk from bit 30 down to bit 0. For every position I test whether that bit is turned on in the original number n.  

- When the bit is on and consec is still 0 or 1, it is safe to keep it. I turn the same bit on inside res and increase consec by one.  
- When the bit is on but consec is already 2, keeping it would create three consecutive 1s. I therefore leave the bit off and set consec back to zero so a later 1 can start a fresh run.  
- When the bit is already off in n, I also set consec to zero because a zero always breaks any streak.

After all 31 positions have been examined, res contains exactly the bits I decided to keep. Because I always preferred a higher bit over any combination of lower bits, the final value is the largest possible number that satisfies the problem rules.

Edge cases are handled automatically:  
- If n itself has no three consecutive 1s, every available bit is kept and the answer equals n.  
- If n is 0, the loop never sets any bit and the answer stays 0.  
- Numbers that force several resets simply clear the necessary lower bits while preserving the highest possible value.

## Examples

**Example 1**  
Input: n = 2  
Binary of 2 is 10.  
No three consecutive 1s exist, so the algorithm keeps both bits.  
Output: 2

**Example 2**  
Input: n = 7  
Binary of 7 is 111.  
Bit 2 is kept (consec becomes 1).  
Bit 1 is kept (consec becomes 2).  
Bit 0 would create three 1s, so it is cleared and consec resets.  
Result binary: 110 → 6  
Output: 6

**Example 3**  
Input: n = 15  
Binary of 15 is 1111.  
Bit 3 kept (consec = 1)  
Bit 2 kept (consec = 2)  
Bit 1 cleared (consec reset to 0)  
Bit 0 kept (consec = 1)  
Result binary: 1101 → 13  
Output: 13

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Open a terminal and compile: `g++ main.cpp -o main`  
3. Run: `./main`  
4. Enter the value of n when prompted (or hard-code a test case inside main).

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
4. Supply n through standard input or a hard-coded test.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node.js: `node solution.js`  
3. You can also paste the function into any browser console and call `maxValue(n)`.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run: `python3 solution.py`  
3. Call the method with any integer n to see the result.

## Notes & Optimizations

- The solution already meets the expected O(1) time and O(1) space bounds.  
- Because the bit length is fixed at 31, there is no need for dynamic bit counting or extra loops.  
- An alternative approach would be to generate every number that has no three consecutive 1s and pick the largest one ≤ n that is a subset of n’s bits, but that would be slower and unnecessary.  
- The same greedy idea can be extended to “no k consecutive 1s” by simply changing the limit from 2 to k-1.  
- Always test the edge values 0, 1, and the largest allowed n (10^9) to confirm correctness.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)