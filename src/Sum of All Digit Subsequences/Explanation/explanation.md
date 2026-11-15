# Sum of All Digit Subsequences - GeeksforGeeks Solution

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

You are given a string `s` that contains only digits. The task is to find the sum of every digit that appears across all possible non-empty subsequences of `s`. Because the result can become extremely large, the final answer must be returned modulo `10^9 + 7`.

In simple terms, generate every non-empty way to pick digits while keeping their relative order, add up all the digits that show up in those picks, and then take the answer modulo one billion seven.

This is a classic competitive programming problem that appears on platforms such as GeeksforGeeks. It tests understanding of subsequences, contribution counting, and modular arithmetic under tight constraints.

## Constraints

- `1 ≤ |s| ≤ 10^5`
- `s` contains only digits from 1 to 9
- Expected time complexity: O(|s|)
- Expected auxiliary space: O(1)

## Intuition

When I listed every subsequence for a short string like "123", I noticed something useful. Each digit appeared in exactly the same number of subsequences. For a string of length n, that number turned out to be 2^(n-1).

This happens because any particular position is either kept or dropped independently of the other n-1 positions. Exactly half of the 2^n possible subsets keep that position, and all of those subsets are non-empty. So every digit contributes exactly 2^(n-1) times to the final sum.

That single observation collapses the whole problem into a simple multiplication: sum of all digits times 2^(n-1), taken modulo 10^9+7.

## Approach

1. Walk through the string once and add up every digit value. Keep the running total under the modulus so it never overflows.
2. Compute the value of 2 raised to the power (n-1) also under the same modulus. This can be done with a simple loop of multiplications by 2.
3. Multiply the digit sum by that power of two and take the result modulo 10^9+7.
4. Return the final value.

The method never builds the subsequences themselves. It only counts how many times each digit would appear and scales the total accordingly.

## Data Structures Used

No extra data structures are required. The solution works with a handful of integer variables that store the digit sum, the running power of two, the string length, and the modulus constant. Constant extra space is enough even for the largest allowed input size.

## Operations & Behavior Summary

- Read the input string and record its length n.
- Initialize a variable to accumulate the sum of digits.
- For each character, convert it to its integer value and add it to the sum while applying the modulus.
- Initialize a power variable to 1.
- Multiply that power by 2 exactly (n-1) times, applying the modulus after every multiplication.
- Multiply the final digit sum by the computed power of two and reduce the product modulo 10^9+7.
- Return the reduced value.

The algorithm never allocates memory proportional to n and never revisits any character after the first pass.

## Complexity

| Metric            | Value   | Explanation                                                                 |
|-------------------|---------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n)    | One linear scan to sum the digits plus another linear loop to build 2^(n-1). |
| Space Complexity  | O(1)    | Only a constant number of integer variables are used.                       |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int subsequenceSum(string &s) {
        const int MOD = 1e9 + 7;
        long long sum = 0;
        int n = s.size();
        for (char c : s) {
            sum = (sum + (c - '0')) % MOD;
        }
        long long pow2 = 1;
        for (int i = 0; i < n - 1; i++) {
            pow2 = (pow2 * 2) % MOD;
        }
        return (sum * pow2) % MOD;
    }
};
```

### Java
```java
class Solution {
    public int subsequenceSum(String s) {
        final int MOD = 1000000007;
        long sum = 0;
        int n = s.length();
        for (int i = 0; i < n; i++) {
            sum = (sum + (s.charAt(i) - '0')) % MOD;
        }
        long pow2 = 1;
        for (int i = 0; i < n - 1; i++) {
            pow2 = (pow2 * 2) % MOD;
        }
        return (int)((sum * pow2) % MOD);
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @return {number}
 */

class Solution {
    subsequenceSum(s) {
        const MOD = 1000000007;
        let sum = 0;
        const n = s.length;
        for (let i = 0; i < n; i++) {
            sum = (sum + (s.charCodeAt(i) - 48)) % MOD;
        }
        let pow2 = 1;
        for (let i = 0; i < n - 1; i++) {
            pow2 = (pow2 * 2) % MOD;
        }
        return Number((BigInt(sum) * BigInt(pow2)) % BigInt(MOD));
    }
}
```

### Python3
```python
class Solution:

    def subsequenceSum(self, s):
        MOD = 10**9 + 7
        total = 0
        n = len(s)
        for ch in s:
            total = (total + int(ch)) % MOD
        pow2 = 1
        for _ in range(n - 1):
            pow2 = (pow2 * 2) % MOD
        return (total * pow2) % MOD
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core idea is identical in every language, so the reasoning stays the same even though the syntax changes.

First the modulus constant is fixed. This value appears in almost every competitive-programming problem that asks for an answer modulo 10^9+7, so it is written once at the top.

Next a variable is created to hold the sum of the digits. The string is scanned from left to right. Each character is turned into its numeric value by subtracting the character code of '0'. The value is added to the running sum and immediately reduced by the modulus. Performing the reduction at every step keeps the intermediate numbers small and avoids overflow in languages with fixed-size integers.

After the sum is ready, the power of two is built. A second variable starts at 1. It is multiplied by 2 exactly (n-1) times. After each multiplication the modulus is applied again. This produces 2^(n-1) without needing a fast-exponentiation routine, which is unnecessary for the given constraints.

Finally the digit sum is multiplied by the power of two. The product is reduced by the modulus one last time and returned. Because every digit appears in precisely 2^(n-1) subsequences, this single multiplication yields the correct total.

Edge cases are handled naturally. When the string length is 1 the power loop runs zero times, leaving the power equal to 1, which is correct. When the string contains a zero the contribution of that zero is still counted the proper number of times, even though the zero itself adds nothing to the numeric sum.

The same sequence of steps appears in C++, Java, JavaScript and Python3. Only the way integers are declared, the way characters are converted, and the way the modulus operator is written differ between the languages.

## Examples

**Example 1**

Input: `s = "123"`

- Digit sum = 1 + 2 + 3 = 6
- n = 3, so 2^(n-1) = 4
- Result = (6 * 4) % (10^9+7) = 24

The seven non-empty subsequences are [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]. Adding every digit that appears inside them also produces 24, confirming the formula.

**Example 2**

Input: `s = "405"`

- Digit sum = 4 + 0 + 5 = 9
- n = 3, so 2^(n-1) = 4
- Result = (9 * 4) % (10^9+7) = 36

Even though a zero is present, the counting argument still holds and the answer matches the manual enumeration.

**Example 3**

Input: `s = "9"`

- Digit sum = 9
- n = 1, so 2^(n-1) = 1
- Result = 9

Only one subsequence exists, the single digit itself.

## How to Use / Run Locally

**C++**
1. Save the code in a file named `solution.cpp`.
2. Open a terminal and compile with `g++ -o solution solution.cpp`.
3. Run the executable with `./solution`.
4. Provide the input string when prompted or redirect it from a file.

**Java**
1. Save the code in a file named `Solution.java`.
2. Compile with `javac Solution.java`.
3. Run with `java Solution`.
4. Feed the input string through standard input.

**JavaScript**
1. Save the code in a file named `solution.js`.
2. Make sure Node.js is installed.
3. Run with `node solution.js`.
4. Read the input string from the console or from a file using the standard Node.js input methods.

**Python3**
1. Save the code in a file named `solution.py`.
2. Run with `python3 solution.py`.
3. Supply the input string through standard input.

In every language the main function (or the driver code supplied by the online judge) simply reads the string, calls the solution method, and prints the returned integer.

## Notes & Optimizations

The solution already meets the expected O(n) time and O(1) space bounds, so further asymptotic improvement is unnecessary. For very large n the modular multiplications can be performed with 64-bit integers in C++ and Java to avoid intermediate overflow before the modulus is applied.

An alternative way to compute 2^(n-1) is to use built-in modular exponentiation functions when they are available. The simple loop is preferred here because it is easier to understand and still runs in linear time, which is acceptable under the given constraints.

If the problem had asked for the sum of the subsequence values interpreted as numbers rather than the sum of their individual digits, a completely different contribution formula would be required. The present version stays simple precisely because only the digits themselves are summed.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
