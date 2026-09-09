# Max Digit Sum Number in 1 to n

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given a number `n`, I need to find a number from `1` to `n` whose digits have the maximum possible sum.

If more than one number has the same maximum digit sum, I need to return the largest number among them.

For example, when `n = 48`:

```text
48 → 4 + 8 = 12
39 → 3 + 9 = 12
```

Both numbers have a digit sum of `12`, but `48` is larger, so the answer is `48`.

The goal is to solve this **maximum digit sum problem** efficiently instead of checking every number from `1` to `n`.

## Constraints

| Constraint | Value                                             |
| ---------- | ------------------------------------------------- |
| `n`        | `1 <= n <= 10^9`                                  |
| Input      | One integer `n`                                   |
| Output     | The number from `1` to `n` with maximum digit sum |

## Intuition

My first thought was to check every number from `1` to `n`, calculate its digit sum, and keep the best one.

That works for small values, but it is not a good solution when `n` can be as large as `10^9`.

I noticed that numbers with many `9`s can have a very large digit sum. So instead of checking every number, I can build a few useful candidates from `n`.

For every non-zero digit, I try decreasing that digit by `1` and changing all digits after it to `9`.

For example, for `n = 12340`:

```text
12340
  ↓
12299

12340
 ↓
11399

12340
↓
09999 = 9999
```

The idea is simple: after decreasing a digit, I can make every digit to its right `9`. This gives the largest possible digit sum for that prefix.

I also check `n` itself because it may already have the best digit sum.

## Approach

I solve the problem by processing the digits of `n` from left to right.

The steps are:

1. Start with `n` as the current best answer.
2. Calculate the digit sum of `n`.
3. Count how many digits `n` has.
4. Process every digit from left to right.
5. If the current digit is greater than `0`, decrease it by `1`.
6. Change every digit after it to `9`.
7. Calculate the candidate's digit sum.
8. Compare it with the current best digit sum.
9. If the digit sum is larger, update the answer.
10. If the digit sum is equal, keep the larger number.
11. Return the best number found.

For example, with `n = 90`:

```text
Original:
90
9 + 0 = 9

Decrease first digit:
89
8 + 9 = 17
```

So `89` is better than `90`.

For `n = 48`:

```text
48 → 4 + 8 = 12

39 → 3 + 9 = 12
```

Both have the same digit sum, so I choose `48` because it is larger.

This approach only looks at the digits of `n`, rather than all numbers from `1` to `n`.

## Data Structures Used

No extra data structure is required.

I only use a few integer variables:

* `bestNumber` stores the best number found so far.
* `bestSum` stores its digit sum.
* `prefix` stores the digits before the current digit.
* `prefixSum` stores the digit sum of that prefix.
* `power` stores the current place value.

This keeps the solution memory efficient.

## Operations & Behavior Summary

The algorithm works like this:

```text
Start with n as the answer
        |
        v
Calculate digit sum of n
        |
        v
Process digits from left to right
        |
        v
Is current digit > 0?
      /     \
    No       Yes
    |         |
    |         v
    |    Decrease digit by 1
    |         |
    |         v
    |    Make remaining digits 9
    |         |
    |         v
    |    Calculate digit sum
    |         |
    |         v
    |    Compare with best
    |         |
    +---------+
        |
        v
Return best number
```

For every position, I only need to consider the candidate formed by reducing that digit and making all following digits `9`.

## Complexity

| Type             | Complexity | Explanation                                                        |
| ---------------- | ---------- | ------------------------------------------------------------------ |
| Time Complexity  | `O(k)`     | `k` is the number of digits in `n`. Every digit is processed once. |
| Space Complexity | `O(1)`     | Only a fixed number of integer variables are used.                 |

Since `n <= 10^9`, `k` is at most 10, so the algorithm is effectively constant time for the given constraints.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findMax(int n) {
        // Start with n itself because n is also a valid number in the range.
        int bestNumber = n;

        // Calculate the digit sum of n so it can be used as the initial best sum.
        int temp = n;
        int bestSum = 0;

        // Find the digit sum of n.
        while (temp > 0) {
            // Add the last digit to the digit sum.
            bestSum += temp % 10;

            // Remove the last digit.
            temp /= 10;
        }

        // Find the number of digits in n.
        int digits = 0;
        temp = n;

        // Count every digit of n.
        while (temp > 0) {
            digits++;
            temp /= 10;
        }

        // 10^(digits - 1) represents the place value of the first digit.
        int power = 1;

        // Build the required power of 10 without using floating-point functions.
        for (int i = 1; i < digits; i++) {
            power *= 10;
        }

        // prefix stores all digits before the current digit.
        int prefix = 0;

        // prefixSum stores the sum of all digits before the current digit.
        int prefixSum = 0;

        // Process every digit from left to right.
        temp = n;

        for (int i = 0; i < digits; i++) {
            // Extract the current digit using its place value.
            int digit = (temp / power) % 10;

            // There is no useful candidate if the current digit is zero,
            // because decreasing zero would make the number invalid.
            if (digit > 0) {
                // Calculate how many digits are present after the current digit.
                int remaining = digits - i - 1;

                // Calculate the digit sum of the candidate:
                // prefix sum + decreased digit + all remaining digits as 9.
                int candidateSum =
                    prefixSum + (digit - 1) + 9 * remaining;

                // Construct the candidate using arithmetic.
                // prefix gets shifted left, the current digit is decreased,
                // and all digits after it are replaced with 9.
                int candidate =
                    prefix * 10 * power +
                    (digit - 1) * power +
                    (power - 1);

                // Update the answer if this candidate has a larger digit sum,
                // or if it has the same digit sum but is numerically larger.
                if (candidateSum > bestSum ||
                    (candidateSum == bestSum && candidate > bestNumber)) {
                    bestSum = candidateSum;
                    bestNumber = candidate;
                }
            }

            // Add the current digit to the prefix information.
            prefix = prefix * 10 + digit;
            prefixSum += digit;

            // Move the place value one position to the right.
            power /= 10;
        }

        // Return the number with the maximum digit sum.
        return bestNumber;
    }
};
```

### Java

```java
class Solution {
    public int findMax(int n) {
        // Start with n because n itself is a valid candidate.
        int bestNumber = n;

        // Use a temporary variable to calculate the digit sum of n.
        int temp = n;
        int bestSum = 0;

        // Calculate the digit sum of n.
        while (temp > 0) {
            // Add the last digit to the digit sum.
            bestSum += temp % 10;

            // Remove the last digit.
            temp /= 10;
        }

        // Count the number of digits in n.
        int digits = 0;
        temp = n;

        // Increase the digit count one position at a time.
        while (temp > 0) {
            digits++;
            temp /= 10;
        }

        // Start with the place value of the first digit.
        int power = 1;

        // Calculate 10^(digits - 1).
        for (int i = 1; i < digits; i++) {
            power *= 10;
        }

        // prefix stores the digits before the current digit.
        int prefix = 0;

        // prefixSum stores the sum of those prefix digits.
        int prefixSum = 0;

        // Reset temp so I can process every digit from left to right.
        temp = n;

        // Visit each digit exactly once.
        for (int i = 0; i < digits; i++) {
            // Extract the current digit using its place value.
            int digit = (temp / power) % 10;

            // Zero cannot be decreased to create a valid decimal digit.
            if (digit > 0) {
                // Count how many digits are to the right of the current digit.
                int remaining = digits - i - 1;

                // Calculate the digit sum after decreasing this digit
                // and replacing all following digits with 9.
                int candidateSum =
                    prefixSum + (digit - 1) + 9 * remaining;

                // Build the candidate without converting n to a string.
                int candidate =
                    prefix * 10 * power +
                    (digit - 1) * power +
                    (power - 1);

                // Keep this candidate if its digit sum is better,
                // or if the digit sum is equal and the candidate is larger.
                if (candidateSum > bestSum ||
                    (candidateSum == bestSum && candidate > bestNumber)) {
                    bestSum = candidateSum;
                    bestNumber = candidate;
                }
            }

            // Add the current digit to the prefix.
            prefix = prefix * 10 + digit;

            // Add the current digit to the prefix digit sum.
            prefixSum += digit;

            // Move the place value to the next digit.
            power /= 10;
        }

        // Return the best number found.
        return bestNumber;
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
    findMax(n) {
        // Start with n because it is already a valid number in the range.
        let bestNumber = n;

        // Use temp to calculate the digit sum of n.
        let temp = n;
        let bestSum = 0;

        // Calculate the digit sum of n.
        while (temp > 0) {
            // Add the last digit to the digit sum.
            bestSum += temp % 10;

            // Remove the last digit.
            temp = Math.floor(temp / 10);
        }

        // Find how many digits n contains.
        let digits = 0;
        temp = n;

        // Count each digit of n.
        while (temp > 0) {
            digits++;
            temp = Math.floor(temp / 10);
        }

        // Start with a place value of 1.
        let power = 1;

        // Calculate 10^(digits - 1), which is the place value of the first digit.
        for (let i = 1; i < digits; i++) {
            power *= 10;
        }

        // prefix stores the digits before the current digit.
        let prefix = 0;

        // prefixSum stores the sum of the prefix digits.
        let prefixSum = 0;

        // Reset temp so every digit can be processed from left to right.
        temp = n;

        // Process each digit once.
        for (let i = 0; i < digits; i++) {
            // Extract the current digit using its place value.
            const digit = Math.floor(temp / power) % 10;

            // A zero cannot be decreased while remaining a valid digit.
            if (digit > 0) {
                // Count the number of digits after the current digit.
                const remaining = digits - i - 1;

                // Calculate the digit sum of the candidate.
                const candidateSum =
                    prefixSum + (digit - 1) + 9 * remaining;

                // Build the candidate using arithmetic instead of strings.
                const candidate =
                    prefix * 10 * power +
                    (digit - 1) * power +
                    (power - 1);

                // Update the answer when the candidate is better.
                // For equal sums, keep the larger number.
                if (
                    candidateSum > bestSum ||
                    (candidateSum === bestSum && candidate > bestNumber)
                ) {
                    bestSum = candidateSum;
                    bestNumber = candidate;
                }
            }

            // Add the current digit to the prefix number.
            prefix = prefix * 10 + digit;

            // Add the current digit to the prefix digit sum.
            prefixSum += digit;

            // Move the place value one position to the right.
            power /= 10;
        }

        // Return the number having the maximum digit sum.
        return bestNumber;
    }
}
```

### Python3

```python3
class Solution:
    def findMax(self, n):
        # Start with n because n itself is a valid candidate.
        best_number = n

        # Use temp to calculate the digit sum of n.
        temp = n
        best_sum = 0

        # Calculate the digit sum of n.
        while temp > 0:
            # Add the last digit to the digit sum.
            best_sum += temp % 10

            # Remove the last digit.
            temp //= 10

        # Find the number of digits in n.
        digits = 0
        temp = n

        # Count every digit of n.
        while temp > 0:
            digits += 1
            temp //= 10

        # Start with the place value of the first digit.
        power = 1

        # Calculate 10^(digits - 1).
        for _ in range(1, digits):
            power *= 10

        # prefix stores all digits before the current digit.
        prefix = 0

        # prefix_sum stores the sum of all prefix digits.
        prefix_sum = 0

        # Reset temp so I can process n from left to right.
        temp = n

        # Process every digit exactly once.
        for i in range(digits):
            # Extract the current digit using its place value.
            digit = (temp // power) % 10

            # A zero cannot be decreased to form a valid digit.
            if digit > 0:
                # Count how many digits are after the current digit.
                remaining = digits - i - 1

                # Calculate the digit sum of the candidate.
                # All digits after the current one become 9.
                candidate_sum = (
                    prefix_sum + (digit - 1) + 9 * remaining
                )

                # Build the candidate using arithmetic.
                candidate = (
                    prefix * 10 * power
                    + (digit - 1) * power
                    + (power - 1)
                )

                # Update the answer if the candidate has a larger
                # digit sum, or if it is larger when the sums are equal.
                if (
                    candidate_sum > best_sum
                    or (
                        candidate_sum == best_sum
                        and candidate > best_number
                    )
                ):
                    best_sum = candidate_sum
                    best_number = candidate

            # Add the current digit to the prefix number.
            prefix = prefix * 10 + digit

            # Add the current digit to the prefix digit sum.
            prefix_sum += digit

            # Move the place value one position to the right.
            power //= 10

        # Return the number with the maximum digit sum.
        return best_number
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in all four languages. The differences are mostly syntax and integer operations.

First, I store `n` as the initial answer.

This is important because `n` is included in the range from `1` to `n`. It is possible that no other candidate has a better digit sum.

Next, I calculate the digit sum of `n`.

I repeatedly take the last digit using the remainder operation:

```text
n % 10
```

Then I remove that digit using integer division:

```text
n / 10
```

For example:

```text
48

48 % 10 = 8
48 / 10 = 4

4 % 10 = 4
4 / 10 = 0
```

So the digit sum is:

```text
8 + 4 = 12
```

After that, I count the number of digits in `n`. This helps me know the position of each digit.

I then create a power of `10` representing the leftmost digit.

For example:

```text
n = 12340

power = 10000
```

This allows me to extract the first digit:

```text
12340 / 10000 = 1
```

After processing that digit, I reduce `power` by a factor of `10`:

```text
10000 → 1000 → 100 → 10 → 1
```

I also maintain `prefix` and `prefixSum`.

Suppose I am processing `12340` and the current digit is `3`:

```text
12340
  ↑
current digit = 3

prefix = 12
prefixSum = 3
```

I decrease `3` to `2` and make the remaining digits `9`:

```text
12340
  ↓
12299
```

There are two digits after `3`, so the candidate digit sum is:

```text
prefixSum + (digit - 1) + 9 * remaining

3 + 2 + 9 * 2
= 23
```

I compare this candidate with the best result found so far.

If the candidate has a larger digit sum, I replace the answer.

If both digit sums are equal, I compare the actual numbers and keep the larger one.

This tie-breaking step is necessary because the problem asks for the largest number when multiple numbers have the same maximum digit sum.

For example:

```text
39 → 3 + 9 = 12
48 → 4 + 8 = 12
```

The sums are equal, so:

```text
48 > 39
```

Therefore, `48` must be returned.

The same logic is used in C++, Java, JavaScript, and Python3. No language needs an array, list, string, map, or other data structure.

The arithmetic approach also avoids converting `n` into a string, keeping the solution simple and using constant extra space.

## Examples

### Example 1

Input:

```text
n = 48
```

Candidates worth considering:

```text
48 → 4 + 8 = 12
39 → 3 + 9 = 12
```

Both have a digit sum of `12`.

Since `48` is larger than `39`:

```text
Output: 48
```

### Example 2

Input:

```text
n = 90
```

The important candidate is:

```text
90 → 9 + 0 = 9
89 → 8 + 9 = 17
```

`89` has a larger digit sum.

```text
Output: 89
```

### Example 3

Input:

```text
n = 12340
```

Some candidates are:

```text
12340 → 1 + 2 + 3 + 4 + 0 = 10

12299 → 1 + 2 + 2 + 9 + 9 = 23

11399 → 1 + 1 + 3 + 9 + 9 = 23

9999 → 9 + 9 + 9 + 9 = 36
```

The maximum digit sum is `36`.

Therefore:

```text
Output: 9999
```

## How to Use / Run Locally

The repository contains the same algorithm written in C++, Java, JavaScript, and Python3.

### C++

Save the solution in a file such as:

```text
solution.cpp
```

Compile it using:

```bash
g++ solution.cpp -o solution
```

Run it with:

```bash
./solution
```

### Java

Save the solution as:

```text
Solution.java
```

Compile it using:

```bash
javac Solution.java
```

Run it using:

```bash
java Solution
```

### JavaScript

Save the solution as:

```text
solution.js
```

Run it using Node.js:

```bash
node solution.js
```

### Python3

Save the solution as:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

For GeeksforGeeks, the platform already provides the required input/output handling and class structure. I only need to place the solution logic inside the given `findMax` function.

## Notes & Optimizations

The most important optimization is avoiding a loop from `1` to `n`.

A brute-force solution could take a very large number of operations because `n` can reach `10^9`.

Instead, I only process the digits of `n`.

Another useful point is that I always keep `n` as a candidate. This handles cases where `n` itself has the maximum digit sum.

I also skip a candidate when the current digit is `0`. Decreasing `0` would produce an invalid digit.

For example:

```text
0 → -1
```

is not a valid decimal digit.

The tie-breaking condition is also important. If two candidates have the same digit sum, the larger number must be returned.

The solution does not need strings or arrays. Everything can be calculated using arithmetic operations, which gives `O(1)` auxiliary space.

The key observation to remember is:

```text
Decrease one digit by 1
        +
Turn all digits after it into 9
        =
A strong candidate for maximum digit sum
```

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
