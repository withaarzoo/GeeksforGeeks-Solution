# Minimum Operations to Reach n - Efficient Greedy Solution

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

You start at zero and want to reach a given positive integer n. At every step you are allowed to either add one to the current number or double it. The task is to find the smallest number of such operations needed to reach exactly n.

This is a classic minimum operations problem that appears often in competitive programming and DSA practice. The input is a single integer n and the output is a single integer representing the minimum steps.

## Constraints

- 1 ≤ n ≤ 10^6

## Intuition

Going forward from zero quickly becomes messy because every number has two possible next moves and the number of paths grows fast.  

I noticed that working backwards is far cleaner. From any number, if it is even the last operation must have been a doubling, so I can safely divide by two. If it is odd the last operation must have been an addition of one, so I subtract one. Repeating this until I reach zero gives the exact number of operations, and because every even step halves the value the process is very fast.

## Approach

Start with the given number n and a counter set to zero.  
While n is still greater than zero:  
- If n is odd, subtract one and increase the counter.  
- If n is even, divide it by two and increase the counter.  
When n finally becomes zero, the counter holds the minimum number of operations.  

This reverse greedy strategy always produces the optimal answer because every sequence of forward operations can be uniquely reversed this way, and preferring division whenever possible keeps the total steps minimal.

## Data Structures Used

No extra data structures are required. The solution uses only a few integer variables, which keeps the space usage constant and makes the code easy to implement in any language.

## Operations & Behavior Summary

1. Initialize an operations counter to zero.  
2. Enter a loop that continues until the current number becomes zero.  
3. Check the parity of the current number.  
4. If odd, undo an “add one” by subtracting one.  
5. If even, undo a “double” by integer division by two.  
6. Increment the counter after each undo step.  
7. Return the final value of the counter once the number reaches zero.

## Complexity

| Complexity       | Value     | Explanation                                                                 |
|------------------|-----------|-----------------------------------------------------------------------------|
| Time Complexity  | O(log n)  | Each even step halves the number, so the loop runs a number of times proportional to the bit length of n. |
| Space Complexity | O(1)      | Only a constant number of integer variables are used; no arrays or maps are allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minOperation(int n) {
        int ops = 0;
        while (n > 0) {
            if (n % 2 == 1) n--;
            else n /= 2;
            ops++;
        }
        return ops;
    }
};
```

### Java
```java
class Solution {
    public int minOperation(int n) {
        int ops = 0;
        while (n > 0) {
            if (n % 2 == 1) n--;
            else n /= 2;
            ops++;
        }
        return ops;
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
    minOperation(n) {
        let ops = 0;
        while (n > 0) {
            if (n % 2 === 1) n--;
            else n = Math.floor(n / 2);
            ops++;
        }
        return ops;
    }
}
```

### Python3
```python
class Solution:
    def minOperation(self, n):
        ops = 0
        while n > 0:
            if n % 2 == 1:
                n -= 1
            else:
                n //= 2
            ops += 1
        return ops
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

I begin by creating a simple integer variable that will count how many operations I undo.  

I then enter a while loop that keeps running as long as the current value is greater than zero. Inside the loop I examine the least significant bit (or use the modulo operator) to decide whether the number is odd or even.  

When the number is odd I know the previous forward move must have been an addition of one, so I subtract one and increase the counter. When the number is even I know the previous move must have been a doubling, so I replace the number with its integer half and again increase the counter.  

Because every division reduces the magnitude by half, the loop terminates after a logarithmic number of iterations even for the largest allowed n (10^6).  

Edge cases are handled naturally: when n equals 1 the algorithm simply subtracts once and finishes; when n is a pure power of two it only performs divisions. No special handling is required for these situations.

## Examples

**Example 1**  
Input: n = 8  
Output: 4  

Trace:  
8 (even) → 4  
4 (even) → 2  
2 (even) → 1  
1 (odd) → 0  
Four steps in total.

**Example 2**  
Input: n = 7  
Output: 5  

Trace:  
7 (odd) → 6  
6 (even) → 3  
3 (odd) → 2  
2 (even) → 1  
1 (odd) → 0  
Five steps in total.

**Example 3**  
Input: n = 1  
Output: 1  

Trace:  
1 (odd) → 0  
One step.

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Compile with `g++ main.cpp -o main`.  
3. Run with `./main` and supply the value of n when prompted (or hard-code a test value inside main).

**Java**  
1. Place the Java class inside a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution` and provide n as input.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node.js: `node solution.js`.  
3. You can hard-code a test value or read from standard input.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run with `python3 solution.py`.  
3. Supply n either through input() or by calling the method directly with a test value.

## Notes & Optimizations

The reverse greedy method is already optimal for the given constraints. An equivalent formulation counts the number of bits in the binary representation of n plus the number of set bits minus one; both approaches run in O(log n) time and produce the same answer.  

Because n never exceeds 10^6 the simple loop is more than fast enough and requires no memoization or dynamic programming table.  

If the upper limit were raised to 10^18 the same algorithm would still work, since the number of iterations remains proportional to the bit length.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)