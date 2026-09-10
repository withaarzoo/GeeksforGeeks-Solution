# Pairs with Given GCD and LCM

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

The problem gives two integers `x` and `y`.

Here:

* `x` is the GCD of two unknown positive integers `a` and `b`.
* `y` is the LCM of `a` and `b`.

I need to count how many ordered pairs `(a, b)` satisfy both conditions.

The pairs `(a, b)` and `(b, a)` are considered different when `a != b`.

For example, when:

```text
x = 2
y = 12
```

the valid pairs are:

```text
(2, 12)
(4, 6)
(6, 4)
(12, 2)
```

So the answer is:

```text
4
```

The main idea of this GCD and LCM problem is to reduce it to counting the distinct prime factors of `y / x`.

## Constraints

| Constraint          | Description                             |
| ------------------- | --------------------------------------- |
| `1 <= x, y <= 10^4` | Both input values are positive integers |

## Intuition

I first checked the relationship between GCD and LCM.

For two positive integers `a` and `b`:

```text
GCD(a, b) × LCM(a, b) = a × b
```

Since the required GCD is `x` and the required LCM is `y`, I can represent the two numbers as:

```text
a = x × p
b = x × q
```

Now `p` and `q` must be coprime. Otherwise, `a` and `b` would have a GCD larger than `x`.

Because `p` and `q` are coprime:

```text
LCM(p, q) = p × q
```

Therefore:

```text
x × p × q = y
```

which gives:

```text
p × q = y / x
```

So I only need to factorize `y / x`.

Suppose:

```text
x = 2
y = 12
```

Then:

```text
y / x = 6
6 = 2 × 3
```

There are two distinct prime factors: `2` and `3`.

Each prime factor can be completely assigned to either `p` or `q`:

```text
2 -> p or q
3 -> p or q
```

That gives:

```text
2 choices × 2 choices = 4
```

So the answer is `2^k`, where `k` is the number of distinct prime factors of `y / x`.

## Approach

I solve the problem in three main steps.

1. I first check whether `y` is divisible by `x`.

   If:

   ```text
   y % x != 0
   ```

   then no valid pair exists, because the LCM must always be a multiple of the GCD.

2. I calculate:

   ```text
   n = y / x
   ```

   This removes the common GCD part from the two numbers.

3. I find the number of distinct prime factors of `n`.

   For every distinct prime factor, I have two choices:

   ```text
   prime -> p
   prime -> q
   ```

   Therefore, if there are `k` distinct prime factors, the answer is:

   ```text
   2^k
   ```

For example:

```text
x = 2
y = 60

n = 60 / 2
  = 30

30 = 2 × 3 × 5
```

The three distinct primes are `2`, `3`, and `5`.

```text
2 -> 2 choices
3 -> 2 choices
5 -> 2 choices

Answer = 2 × 2 × 2
       = 8
```

I do not need to generate all the pairs. I only count the distinct prime factors.

## Data Structures Used

No extra data structure is required.

I only use integer variables to:

* store the reduced value `y / x`
* test possible prime factors
* count distinct prime factors

I do not need an array, hash map, set, vector, or list.

## Operations & Behavior Summary

The algorithm works like this:

```text
Start
  |
  v
Check y % x
  |
  +---- not 0 ----> return 0
  |
  v
n = y / x
  |
  v
Find distinct prime factors of n
  |
  v
Count = k
  |
  v
Return 2^k
```

While factorizing `n`, I remove all occurrences of the same prime factor after finding it.

For example:

```text
12 = 2 × 2 × 3

Find 2
Remove both 2s
Remaining = 3

Find 3
Remove 3

Distinct prime factors = 2
```

This is important because the exponent of a prime does not create additional choices. All copies of the same prime must go to the same side to keep `p` and `q` coprime.

## Complexity

| Type             | Complexity       | Explanation                                                     |
| ---------------- | ---------------- | --------------------------------------------------------------- |
| Time Complexity  | `O(sqrt(y / x))` | I try possible divisors up to the square root of `y / x`.       |
| Space Complexity | `O(1)`           | I only use a few integer variables and no extra data structure. |

The factorization is efficient enough for the given constraint `x, y <= 10^4`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int pairCount(int x, int y) {
        // If y is not divisible by x, x cannot be the GCD and y the LCM.
        if (y % x != 0)
            return 0;

        // After removing the required GCD, p * q must be equal to y / x.
        int n = y / x;

        // This stores the number of distinct prime factors of n.
        int distinctPrimes = 0;

        // Try every possible prime factor up to sqrt(n).
        for (int p = 2; p * p <= n; ++p) {
            // If p divides n, p is one distinct prime factor.
            if (n % p == 0) {
                ++distinctPrimes;

                // Remove all copies of p so it is counted only once.
                while (n % p == 0)
                    n /= p;
            }
        }

        // If something greater than 1 remains, it is also a distinct prime factor.
        if (n > 1)
            ++distinctPrimes;

        // Each distinct prime can independently go completely to either number.
        return 1 << distinctPrimes;
    }
};
```

### Java

```java
class Solution {
    public int pairCount(int x, int y) {
        // If y is not divisible by x, no valid pair can exist.
        if (y % x != 0)
            return 0;

        // After removing the required GCD, p * q must be y / x.
        int n = y / x;

        // Stores the number of distinct prime factors of n.
        int distinctPrimes = 0;

        // Try possible divisors up to sqrt(n).
        for (int p = 2; p * p <= n; p++) {
            // If p divides n, p is a distinct prime factor.
            if (n % p == 0) {
                distinctPrimes++;

                // Remove every occurrence of p so it is counted once.
                while (n % p == 0)
                    n /= p;
            }
        }

        // Any remaining value greater than 1 is a distinct prime factor.
        if (n > 1)
            distinctPrimes++;

        // Every distinct prime has two choices: it goes to a or to b.
        return 1 << distinctPrimes;
    }
}
```

### JavaScript

```javascript
class Solution {
    /**
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    pairCount(x, y) {
        // If y is not divisible by x, there is no valid pair.
        if (y % x !== 0)
            return 0;

        // After removing the required GCD, p * q must equal y / x.
        let n = y / x;

        // Stores the number of distinct prime factors.
        let distinctPrimes = 0;

        // Try possible divisors up to sqrt(n).
        for (let p = 2; p * p <= n; p++) {
            // If p divides n, p is one distinct prime factor.
            if (n % p === 0) {
                distinctPrimes++;

                // Remove all copies of p so it is counted only once.
                while (n % p === 0)
                    n /= p;
            }
        }

        // If a value greater than 1 remains, it is also a prime factor.
        if (n > 1)
            distinctPrimes++;

        // Each distinct prime can be assigned to either number.
        return 2 ** distinctPrimes;
    }
}
```

### Python3

```python
class Solution:

    def pairCount(self, x, y):
        # If y is not divisible by x, no valid pair can exist.
        if y % x != 0:
            return 0

        # After removing the required GCD, p * q must equal y / x.
        n = y // x

        # Stores the number of distinct prime factors of n.
        distinct_primes = 0

        # Try possible divisors up to sqrt(n).
        p = 2
        while p * p <= n:
            # If p divides n, p is one distinct prime factor.
            if n % p == 0:
                distinct_primes += 1

                # Remove all copies of p so it is counted only once.
                while n % p == 0:
                    n //= p

            # Move to the next possible divisor.
            p += 1

        # If something greater than 1 remains, it is a distinct prime factor.
        if n > 1:
            distinct_primes += 1

        # Each distinct prime has two choices: a or b.
        return 2 ** distinct_primes
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages. Only the syntax changes.

### 1. Check whether the LCM can be valid

I first check:

```text
y % x != 0
```

The LCM must be divisible by the GCD.

For example:

```text
x = 6
y = 4
```

Here:

```text
4 % 6 != 0
```

So `4` cannot be the LCM when the GCD is `6`.

I return `0` immediately.

### 2. Reduce the problem

If `y` is divisible by `x`, I calculate:

```text
n = y / x
```

I use:

```text
a = x × p
b = x × q
```

Since the GCD of `a` and `b` must be exactly `x`, I need:

```text
GCD(p, q) = 1
```

The LCM then becomes:

```text
LCM(a, b) = x × p × q
```

So:

```text
x × p × q = y
```

and therefore:

```text
p × q = y / x
```

This is the key reduction.

### 3. Factorize the reduced value

I start checking possible divisors from `2`.

I only need to check values while:

```text
p × p <= n
```

This is the same as checking up to `sqrt(n)`.

If `p` divides `n`, then `p` is a prime factor candidate.

### 4. Count each prime only once

Suppose:

```text
n = 12
```

Its factorization is:

```text
12 = 2² × 3
```

When I find `2`, I increase the distinct-prime count once.

Then I remove all copies of `2`:

```text
12 -> 6 -> 3
```

Now I continue with the remaining value.

This prevents `2` from being counted twice.

### 5. Handle the remaining prime

After the loop, there may still be a value greater than `1`.

For example:

```text
n = 15
```

After processing `3`:

```text
15 -> 5
```

The remaining `5` is itself a prime factor.

So I count it as one more distinct prime.

### 6. Calculate the number of pairs

If the reduced number has `k` distinct prime factors, every prime has two possible destinations:

```text
Prime
  |
  +----> p
  |
  +----> q
```

Therefore:

```text
answer = 2^k
```

For:

```text
n = 30
  = 2 × 3 × 5
```

I get:

```text
2^3 = 8
```

The same mathematical logic is implemented using integer operations in C++, Java, JavaScript, and Python3.

## Examples

### Example 1

Input:

```text
x = 2
y = 12
```

First:

```text
12 % 2 = 0
```

So a valid pair can exist.

Then:

```text
n = 12 / 2
  = 6
```

Prime factorization:

```text
6 = 2 × 3
```

There are `2` distinct prime factors.

```text
answer = 2²
       = 4
```

Output:

```text
4
```

The four pairs are:

```text
(2, 12)
(4, 6)
(6, 4)
(12, 2)
```

### Example 2

Input:

```text
x = 6
y = 4
```

Here:

```text
4 % 6 != 0
```

The LCM cannot be smaller than the GCD in this way.

Output:

```text
0
```

### Example 3

Input:

```text
x = 2
y = 60
```

First:

```text
n = 60 / 2
  = 30
```

Factorization:

```text
30 = 2 × 3 × 5
```

There are `3` distinct prime factors.

```text
answer = 2³
       = 8
```

Output:

```text
8
```

## How to Use / Run Locally

The provided solution follows the GeeksforGeeks `Solution` class format. To run it locally, I can place the class inside a small driver program and pass `x` and `y` to `pairCount`.

### C++

Save the complete program as:

```text
solution.cpp
```

Compile it with:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

### Java

Save the complete program as:

```text
Solution.java
```

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

### JavaScript

Save the complete program as:

```text
solution.js
```

Run it with:

```bash
node solution.js
```

### Python3

Save the complete program as:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

For local testing, I can add a small `main` function or test code around the provided `Solution` class. On GeeksforGeeks, the platform handles the driver code, so I only need to submit the required class and method.

## Notes & Optimizations

The first important edge case is when `y` is not divisible by `x`. In that situation, the answer is immediately `0`.

If:

```text
x = y
```

then:

```text
y / x = 1
```

The number `1` has no distinct prime factors, so:

```text
2^0 = 1
```

This represents the single pair:

```text
(x, x)
```

I also remove all occurrences of a prime after finding it. This is necessary because I only need the number of distinct prime factors.

For example:

```text
72 = 2³ × 3²
```

There are only two distinct prime factors:

```text
2, 3
```

So the answer is:

```text
2² = 4
```

I do not need to generate divisors or actual pairs. That keeps the solution simple and uses constant extra space.

Another possible approach would be to generate all divisors of `y / x` and check which pairs are coprime, but that does more work than necessary. Prime factorization gives the answer directly.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
