# Nth Character in Concatenated Decimal String - GeeksforGeeks Solution

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

You are given a string formed by writing all positive integers one after another without any spaces. It looks like this:

s = "123456789101112131415161718192021..."

Your task is to find the nth character in this infinite string. Indexing starts from 1.

For example, if n = 10, the answer is '1' because the 10th digit is the first digit of the number 10. If n = 11, the answer is '0'.

The problem is a classic digit-counting challenge often seen on GeeksforGeeks and other competitive programming platforms. Because n can be as large as one billion, you cannot build the string. You must calculate the position mathematically.

## Constraints

- 1 ≤ n ≤ 10^9

This upper limit forces an efficient O(log n) solution. Any approach that tries to generate numbers until the length reaches n will time out.

## Intuition

The first thing I noticed is that numbers have different lengths. There are only nine 1-digit numbers, ninety 2-digit numbers, nine hundred 3-digit numbers, and so on.

If I can figure out which group of numbers (1-digit, 2-digit, 3-digit…) the nth digit falls into, the rest becomes simple arithmetic. I keep subtracting the total number of digits contributed by each complete group until the remaining n is small enough to land inside one group. That gives me both the exact number and the exact position of the digit inside that number.

This counting approach feels natural because the total digits grow exponentially with the length of the numbers.

## Approach

I start with the 1-digit group. There are 9 numbers and each contributes 1 digit, so 9 digits in total.

While the remaining n is larger than the digits available in the current group, I subtract those digits from n and move to the next length. The count of numbers multiplies by 10 and the starting number of the group also multiplies by 10.

Once n fits inside a group, I calculate which number contains the digit:

number = start + (n - 1) / digits

Then I convert that number to a string and pick the digit at position (n - 1) % digits.

The -1 is important because we are switching from 1-based indexing to 0-based indexing for the calculations.

## Data Structures Used

No special data structures are required. I only use a few integer variables to track the current digit length, the count of numbers of that length, and the starting number of the group. Converting the final number to a string is the only temporary storage, and it is constant size because the largest relevant number has at most 10 digits for the given constraints.

## Operations & Behavior Summary

1. Initialize digits = 1, count = 9, start = 1.
2. While n is greater than digits × count, subtract that product from n, increase digits by 1, multiply count by 10, and multiply start by 10.
3. Compute the exact number that contains the nth digit.
4. Convert the number to a string.
5. Return the character at the correct offset inside that string.

The loop runs only a handful of times because the digit length grows very slowly.

## Complexity

| Type              | Complexity | Explanation |
|-------------------|------------|-------------|
| Time Complexity   | O(log n)   | The loop iterates once for each possible digit length. The maximum digit length needed for n ≤ 10^9 is less than 10. |
| Space Complexity  | O(1)       | Only a constant number of integer variables are used. The temporary string holds at most 10 characters. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    char nthCharacter(int n) {
        long long digits = 1;
        long long count = 9;
        long long start = 1;
        
        while (n > digits * count) {
            n -= digits * count;
            digits++;
            count *= 10;
            start *= 10;
        }
        
        long long num = start + (n - 1) / digits;
        string s = to_string(num);
        return s[(n - 1) % digits];
    }
};
```

### Java

```java
class Solution {
    public char nthCharacter(int n) {
        long digits = 1;
        long count = 9;
        long start = 1;
        
        while (n > digits * count) {
            n -= digits * count;
            digits++;
            count *= 10;
            start *= 10;
        }
        
        long num = start + (n - 1) / digits;
        String s = Long.toString(num);
        return s.charAt((int)((n - 1) % digits));
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @return {string}
 */
class Solution {
    nthCharacter(n) {
        let digits = 1;
        let count = 9;
        let start = 1;
        
        while (n > digits * count) {
            n -= digits * count;
            digits++;
            count *= 10;
            start *= 10;
        }
        
        let num = start + Math.floor((n - 1) / digits);
        let s = num.toString();
        return s[(n - 1) % digits];
    }
}
```

### Python3

```python
class Solution:
    def nthCharacter(self, n):
        digits = 1
        count = 9
        start = 1
        
        while n > digits * count:
            n -= digits * count
            digits += 1
            count *= 10
            start *= 10
        
        num = start + (n - 1) // digits
        s = str(num)
        return s[(n - 1) % digits]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic. The only differences are language syntax for integer division, type casting, and string conversion.

I begin by declaring three variables that describe the current group of numbers.  
digits tells me how many digits each number currently has.  
count tells me how many such numbers exist.  
start is the first number of that length.

The while loop is the heart of the algorithm. As long as the remaining n is larger than the total digits this group can supply, I remove those digits from n and advance to the next length. Because count multiplies by 10 each time, the groups get larger very quickly and the loop finishes fast.

After the loop, the remaining n is an offset inside the current group. Dividing (n-1) by the digit length gives me how many full numbers I should skip. Adding that to start produces the exact number I need.

I then turn the number into a string so I can index into its digits easily. The remainder (n-1) % digits is the zero-based position of the required character.

In C++ and Java I must be careful with integer overflow, so I use long long / long. In JavaScript and Python the numbers stay within safe integer range for this problem, so ordinary numbers are fine.

Edge cases such as n = 1 (the first digit of 1) and the last digit of a group are handled correctly by the (n-1) arithmetic.

## Examples

**Example 1**  
Input: n = 10  
Output: '1'  

Trace:  
1-digit numbers contribute 9 digits. Remaining n becomes 1.  
We are now in 2-digit numbers starting at 10.  
number = 10 + (1-1)/2 = 10  
position = (1-1)%2 = 0  
The character at index 0 of "10" is '1'.

**Example 2**  
Input: n = 11  
Output: '0'  

Trace:  
After subtracting 9, remaining n = 2.  
number = 10 + (2-1)/2 = 10  
position = (2-1)%2 = 1  
The character at index 1 of "10" is '0'.

**Example 3**  
Input: n = 1  
Output: '1'  

Trace:  
n is already smaller than 9, so we stay in 1-digit numbers.  
number = 1 + (1-1)/1 = 1  
position = 0  
Result is '1'.

## How to Use / Run Locally

**C++**  

1. Copy the solution into a file named main.cpp.  
2. Compile with: g++ -o main main.cpp  
3. Run with: ./main  
4. You can hard-code a value of n or read it from standard input for testing.

**Java**  

1. Place the class in a file named Solution.java.  
2. Compile with: javac Solution.java  
3. Run with: java Solution  
4. Add a main method that creates an instance and prints the result for a sample n.

**JavaScript**  

1. Save the class in a file named solution.js.  
2. Run with Node.js: node solution.js  
3. Instantiating the class and calling nthCharacter(n) will give the answer.

**Python3**  

1. Save the code in a file named solution.py.  
2. Run with: python3 solution.py  
3. Create an instance of Solution and call nthCharacter(n) to test different values.

## Notes & Optimizations

The solution already runs in optimal time. Because the maximum number of iterations is tiny, further micro-optimizations are unnecessary.

One possible alternative is to pre-compute the cumulative digit counts for lengths 1 through 10 and then binary-search the correct length. That also works in O(log n) but is more code for no real gain.

Watch out for the boundary when n lands exactly on the last digit of a group. The (n-1) formula handles it correctly, so no extra checks are required.

The same technique can be extended to similar problems such as finding the nth digit in the infinite sequence of numbers written in any base.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
