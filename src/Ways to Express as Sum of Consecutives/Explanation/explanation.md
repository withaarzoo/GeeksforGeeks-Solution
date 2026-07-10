# Ways to Express as Sum of Consecutives

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

Given a positive integer `n`, the task is to find the number of ways it can be written as a sum of two or more consecutive natural numbers.

The numbers in each representation must be positive and consecutive.

For example, `15` can be written as:

* `1 + 2 + 3 + 4 + 5`
* `4 + 5 + 6`
* `7 + 8`

So the answer for `n = 15` is `3`.

The main challenge is to find the answer efficiently without trying every possible starting number and building every possible consecutive sequence.

This solution uses a mathematical observation involving odd divisors. The number of ways to represent `n` as a sum of one or more consecutive positive integers is equal to the number of odd divisors of `n`.

Since the problem requires at least two numbers, the single-number representation is removed from the final count.

## Constraints

| Constraint               |                    Value |
| ------------------------ | -----------------------: |
| Minimum value of `n`     |                      `1` |
| Maximum value of `n`     |                   `10^8` |
| Required sequence length |             At least `2` |
| Numbers in each sequence | Positive natural numbers |

The value of `n` can be large, so checking every possible consecutive sequence is not the best approach.

## Intuition

My first instinct was to choose every possible starting number and keep adding consecutive values until the sum reached or passed `n`.

That approach is easy to understand, but it repeats many additions and does more work than needed.

Then I noticed the mathematical connection between consecutive sums and odd divisors.

For example, the odd divisors of `15` are:

`1, 3, 5, 15`

So there are four ways to represent `15` as one or more consecutive positive numbers.

One of them is just:

`15`

The problem does not allow a sequence containing only one number. After removing that case, the answer becomes `3`.

This gives the main formula:

`Answer = Number of odd divisors of n - 1`

Instead of generating consecutive sequences, I only need to count the odd divisors of `n`.

## Approach

I solve the problem in a few simple stages.

First, I remove every factor of `2` from `n`.

For example:

`40 = 2 × 2 × 2 × 5`

After removing all powers of `2`, the remaining number is `5`.

This works because an odd divisor cannot contain a factor of `2`. The odd divisors of the original number are exactly the divisors of the remaining odd part.

Next, I count the divisors of that odd number.

I check possible divisors only from `1` up to the square root of the remaining number.

Whenever a number `i` divides the odd part, I find a divisor pair:

`i` and `n / i`

If both divisors are different, I add `2` to the divisor count.

If both divisors are the same, I add only `1`. This happens when the remaining odd number is a perfect square.

Finally, I subtract `1` from the divisor count.

The removed case represents `n` itself as a sequence of length one, which is not allowed by the problem.

## Data Structures Used

No extra data structure is needed for this solution.

The algorithm only uses a few variables:

* A variable to store the remaining odd part of `n`.
* A counter to store the number of divisors.
* A loop variable to test possible divisors.

No array, vector, list, set, map, stack, queue, or hash table is required.

This keeps the auxiliary space complexity constant.

## Operations & Behavior Summary

The algorithm works in this order:

1. Start with the given number `n`.
2. Keep dividing `n` by `2` while it is even.
3. The remaining value is now the odd part of the original number.
4. Start checking possible divisors from `1`.
5. Continue only while the current number is not greater than the square root of the odd part.
6. If the current number divides the odd part, find its matching divisor.
7. Add `2` when the two divisors are different.
8. Add `1` when both divisors are the same.
9. Subtract `1` to remove the single-number representation.
10. Return the final count.

The algorithm never generates the actual consecutive sequences. It only counts how many valid representations exist.

## Complexity

| Complexity       | Value        | Explanation                                                                                |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------ |
| Time Complexity  | `O(sqrt(n))` | Possible divisors are checked only up to the square root of the remaining odd part of `n`. |
| Space Complexity | `O(1)`       | Only a fixed number of variables are used, with no extra data structures.                  |

Here, `n` is the input number.

Removing factors of `2` takes logarithmic time in the worst case, while divisor checking takes up to `O(sqrt(n))`. Therefore, the overall time complexity remains `O(sqrt(n))`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int getCount(int n) {
        // Remove every factor of 2 because only odd divisors matter.
        while (n % 2 == 0) {
            n /= 2;
        }

        // This will store the number of divisors of the remaining odd part.
        int divisorCount = 0;

        // I only check up to sqrt(n) because divisors always come in pairs.
        for (int i = 1; 1LL * i * i <= n; i++) {
            // If i divides n, then i and n / i form a divisor pair.
            if (n % i == 0) {
                // A perfect square has only one divisor at this point.
                if (1LL * i * i == n) {
                    divisorCount++;
                } else {
                    // Otherwise, both i and n / i are different divisors.
                    divisorCount += 2;
                }
            }
        }

        // Remove the single-number representation consisting of n itself.
        return divisorCount - 1;
    }
};
```

### Java

```java
class Solution {
    public int getCount(int n) {
        // Remove every factor of 2 because only odd divisors matter.
        while (n % 2 == 0) {
            n /= 2;
        }

        // This will store the number of divisors of the remaining odd part.
        int divisorCount = 0;

        // I only check up to sqrt(n) because divisors always come in pairs.
        for (int i = 1; (long) i * i <= n; i++) {
            // If i divides n, then i and n / i form a divisor pair.
            if (n % i == 0) {
                // A perfect square has only one divisor at this point.
                if ((long) i * i == n) {
                    divisorCount++;
                } else {
                    // Otherwise, both i and n / i are different divisors.
                    divisorCount += 2;
                }
            }
        }

        // Remove the single-number representation consisting of n itself.
        return divisorCount - 1;
    }
};
```

### JavaScript

```javascript
class Solution {
    getCount(n) {
        // Remove every factor of 2 because only odd divisors matter.
        while (n % 2 === 0) {
            n /= 2;
        }

        // This will store the number of divisors of the remaining odd part.
        let divisorCount = 0;

        // I only check up to sqrt(n) because divisors always come in pairs.
        for (let i = 1; i * i <= n; i++) {
            // If i divides n, then i and n / i form a divisor pair.
            if (n % i === 0) {
                // A perfect square has only one divisor at this point.
                if (i * i === n) {
                    divisorCount++;
                } else {
                    // Otherwise, both i and n / i are different divisors.
                    divisorCount += 2;
                }
            }
        }

        // Remove the single-number representation consisting of n itself.
        return divisorCount - 1;
    }
}
```

### Python3

```python
class Solution:
    def getCount(self, n):
        # Remove every factor of 2 because only odd divisors matter.
        while n % 2 == 0:
            n //= 2

        # This will store the number of divisors of the remaining odd part.
        divisor_count = 0

        # I start from 1 and only check possible divisors up to sqrt(n).
        i = 1
        while i * i <= n:
            # If i divides n, then i and n // i form a divisor pair.
            if n % i == 0:
                # A perfect square has only one divisor at this point.
                if i * i == n:
                    divisor_count += 1
                else:
                    # Otherwise, both divisors in the pair are different.
                    divisor_count += 2

            # Move to the next possible divisor.
            i += 1

        # Remove the single-number representation consisting of n itself.
        return divisor_count - 1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in C++, Java, JavaScript, and Python3.

The solution starts by checking whether `n` is divisible by `2`.

If it is, the algorithm divides it by `2` and checks again. This continues until the remaining value becomes odd.

For example, if:

`n = 72`

The values change like this:

`72 → 36 → 18 → 9`

The remaining odd part is `9`.

The odd divisors of `72` are exactly the divisors of `9`, so no useful information is lost by removing the powers of `2`.

Next, the algorithm creates a divisor counter.

This counter starts from `0` because no divisor has been counted yet.

The divisor checking starts from `1`.

There is no need to check numbers greater than the square root of the odd part. Divisors always appear in pairs.

For example, the divisors of `15` can be grouped as:

`1 × 15`

`3 × 5`

After reaching the square root, the same pairs would only appear again in reverse order.

Whenever the current value divides the odd part exactly, the algorithm finds a divisor pair.

Suppose the odd part is `15` and the current value is `3`.

Since:

`15 % 3 = 0`

The two divisors are:

`3` and `5`

Both are different, so the divisor count increases by `2`.

A perfect square needs special handling.

Suppose the odd part is `9` and the current value is `3`.

The divisor pair is:

`3` and `3`

These are not two different divisors. Adding `2` would count the same divisor twice.

For that reason, the algorithm adds only `1` when the current value multiplied by itself equals the odd part.

After all divisors are counted, the algorithm subtracts `1`.

The divisor `1` corresponds to the representation where the number appears alone.

For example:

`15 = 15`

This representation contains only one number, so it must not be included in the answer.

The final result is then returned.

In C++, multiplication used in the square check should be handled carefully to avoid integer overflow when working with larger limits.

Java has the same concern, so a wider integer type can be used during multiplication.

JavaScript uses the `Number` type. The given constraint is small enough for the required calculations to remain exact.

Python3 integers can grow automatically, so integer overflow is not a concern.

The algorithm itself does not change between languages. Only the syntax and integer handling are slightly different.

## Examples

### Example 1

Input:

```text
n = 10
```

Expected Output:

```text
1
```

Processing:

First, remove the factor of `2`:

`10 → 5`

The divisors of `5` are:

`1, 5`

So the number of odd divisors is `2`.

Subtract the single-number representation:

`2 - 1 = 1`

The only valid consecutive sum is:

`10 = 1 + 2 + 3 + 4`

### Example 2

Input:

```text
n = 15
```

Expected Output:

```text
3
```

Processing:

`15` is already odd, so no factor of `2` is removed.

Its divisors are:

`1, 3, 5, 15`

The divisor count is `4`.

Subtract the single-number representation:

`4 - 1 = 3`

The valid representations are:

`15 = 1 + 2 + 3 + 4 + 5`

`15 = 4 + 5 + 6`

`15 = 7 + 8`

### Example 3

Input:

```text
n = 9
```

Expected Output:

```text
2
```

Processing:

`9` is already odd.

Its divisors are:

`1, 3, 9`

The divisor count is `3`.

Subtract the single-number representation:

`3 - 1 = 2`

The valid representations are:

`9 = 2 + 3 + 4`

`9 = 4 + 5`

## How to Use / Run Locally

Before running the solution locally, add the required driver code or input handling around the solution method if needed.

### C++

Save the file as `solution.cpp`.

Compile it with:

```bash
g++ solution.cpp -o solution
```

Run it with:

```bash
./solution
```

On Windows, run:

```bash
solution.exe
```

### Java

Save the file using the same name as the class containing the `main` method.

Compile it with:

```bash
javac Main.java
```

Run it with:

```bash
java Main
```

### JavaScript

Save the file as `solution.js`.

Run it with Node.js:

```bash
node solution.js
```

### Python3

Save the file as `solution.py`.

Run it with:

```bash
python3 solution.py
```

On some systems, the command may be:

```bash
python solution.py
```

## Notes & Optimizations

A direct simulation approach is possible. I could start from every natural number and keep adding consecutive values until the sum reaches or exceeds `n`.

That method is easier to discover at first, but it performs unnecessary repeated work.

The odd divisor approach is faster because it turns the consecutive sum problem into a divisor counting problem.

An important edge case is `n = 1`.

The only possible representation is the number `1` itself. Since the problem requires at least two consecutive natural numbers, the answer is `0`.

Powers of `2` are another useful case to understand.

For example:

`2, 4, 8, 16, 32`

After removing all factors of `2`, the remaining odd part is always `1`.

The number `1` has only one divisor. After subtracting the single-number representation, the answer becomes `0`.

So a power of `2` cannot be written as a sum of two or more consecutive positive natural numbers.

The divisor counting loop should use the condition based on `i × i <= n` instead of repeatedly calculating a square root. This avoids unnecessary floating-point operations.

For the given constraint of `n <= 10^8`, the `O(sqrt(n))` solution is fast enough and uses constant extra space.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
