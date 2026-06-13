# Binary Strings with Equal Sum of Two Halves

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

---

## Problem Summary

Given an integer `n`, we need to count all binary strings of length `2n` such that the sum of the first `n` bits is equal to the sum of the last `n` bits.

Since a binary digit can only be `0` or `1`, the sum of a half simply represents the number of `1`s present in that half.

The answer can become very large, so it must be returned modulo `10^9 + 7`.

This problem is a classic example of combinatorics, modular arithmetic, binomial coefficients, and competitive programming mathematics.

---

## Constraints

| Constraint | Value       |
| ---------- | ----------- |
| n          | 1 ≤ n ≤ 10⁵ |

---

## Intuition

My first observation was that both halves must contain the same number of `1`s.

Suppose both halves contain exactly `k` ones.

For the first half, I can choose those `k` positions in `C(n, k)` ways.

For the second half, I can again choose `k` positions in `C(n, k)` ways.

That means for a fixed value of `k`, the total number of valid binary strings is:

`C(n, k) × C(n, k)`

Now I simply add this for all possible values of `k`.

This gives:

`Σ C(n, k)²`

A well-known combinatorial identity tells us:

`Σ C(n, k)² = C(2n, n)`

So the entire problem becomes finding the central binomial coefficient `C(2n, n)` modulo `10^9 + 7`.

---

## Approach

1. Compute `(2n)!` modulo `10^9 + 7`.

2. Compute `n!` modulo `10^9 + 7`.

3. Use Fermat's Little Theorem to find the modular inverse of `n!`.

4. Calculate:

   `C(2n, n) = (2n)! / (n! × n!)`

5. Perform all operations under modulo arithmetic.

6. Return the final answer.

This avoids generating binary strings and works efficiently even for the maximum constraint.

---

## Data Structures Used

| Data Structure    | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| Integer Variables | Store factorials, modular inverses, and final answer |
| No Extra Arrays   | The solution only requires a few variables           |

The algorithm is mathematically driven and does not require any complex data structures.

---

## Operations & Behavior Summary

1. Start calculating factorial values from `1` to `2n`.
2. Store the value of `n!` when the loop reaches `n`.
3. Continue until `(2n)!` is calculated.
4. Compute the modular inverse of `n!`.
5. Multiply `(2n)!` by the inverse of `n!` twice.
6. Apply modulo after every multiplication.
7. Return the resulting value.

Conceptually, the algorithm is computing the central binomial coefficient under modular arithmetic.

---

## Complexity

| Metric           | Complexity     | Explanation                                                               |
| ---------------- | -------------- | ------------------------------------------------------------------------- |
| Time Complexity  | O(n + log MOD) | Factorial computation takes O(n), modular exponentiation takes O(log MOD) |
| Space Complexity | O(1)           | Only a few variables are used                                             |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Fast modular exponentiation
    long long power(long long base, long long exp, long long mod) {
        long long result = 1;
        
        while (exp > 0) {
            // If current bit is set, multiply answer
            if (exp & 1)
                result = (result * base) % mod;
            
            // Square the base for next bit
            base = (base * base) % mod;
            exp >>= 1;
        }
        
        return result;
    }
    
    int computeValue(int n) {
        const long long MOD = 1000000007;
        
        long long fact2n = 1; // Stores (2n)!
        long long factn = 1;  // Stores n!
        
        // Compute factorials
        for (int i = 1; i <= 2 * n; i++) {
            fact2n = (fact2n * i) % MOD;
            
            // Capture n! when i reaches n
            if (i == n)
                factn = fact2n;
        }
        
        // Modular inverse of n!
        long long invFactn = power(factn, MOD - 2, MOD);
        
        // C(2n,n) = (2n)! / (n! * n!)
        long long ans = fact2n;
        ans = (ans * invFactn) % MOD;
        ans = (ans * invFactn) % MOD;
        
        return (int)ans;
    }
};
```

### Java

```java
class Solution {
    
    // Fast modular exponentiation
    private long power(long base, long exp, long mod) {
        long result = 1;
        
        while (exp > 0) {
            // Multiply when current bit is set
            if ((exp & 1) == 1) {
                result = (result * base) % mod;
            }
            
            // Square base for next bit
            base = (base * base) % mod;
            exp >>= 1;
        }
        
        return result;
    }
    
    public int computeValue(int n) {
        final long MOD = 1000000007L;
        
        long fact2n = 1;
        long factn = 1;
        
        // Compute factorials
        for (int i = 1; i <= 2 * n; i++) {
            fact2n = (fact2n * i) % MOD;
            
            // Save n!
            if (i == n) {
                factn = fact2n;
            }
        }
        
        // Modular inverse of n!
        long invFactn = power(factn, MOD - 2, MOD);
        
        // C(2n,n)
        long ans = fact2n;
        ans = (ans * invFactn) % MOD;
        ans = (ans * invFactn) % MOD;
        
        return (int) ans;
    }
}
```

### JavaScript

```javascript
'use strict';

class Solution {
    
    // Fast modular exponentiation
    power(base, exp, mod) {
        let result = 1n;
        base = BigInt(base);
        exp = BigInt(exp);
        mod = BigInt(mod);
        
        while (exp > 0n) {
            // Multiply when bit is set
            if (exp & 1n) {
                result = (result * base) % mod;
            }
            
            // Square the base
            base = (base * base) % mod;
            exp >>= 1n;
        }
        
        return result;
    }
    
    computeValue(n) {
        const MOD = 1000000007n;
        
        let fact2n = 1n;
        let factn = 1n;
        
        // Compute factorials
        for (let i = 1; i <= 2 * n; i++) {
            fact2n = (fact2n * BigInt(i)) % MOD;
            
            // Save n!
            if (i === n) {
                factn = fact2n;
            }
        }
        
        // Modular inverse of n!
        const invFactn = this.power(factn, MOD - 2n, MOD);
        
        // C(2n,n)
        let ans = fact2n;
        ans = (ans * invFactn) % MOD;
        ans = (ans * invFactn) % MOD;
        
        return Number(ans);
    }
};
```

### Python3

```python
class Solution:
    def power(self, base, exp, mod):
        # Fast modular exponentiation
        result = 1
        
        while exp > 0:
            # If current bit is set
            if exp & 1:
                result = (result * base) % mod
            
            # Square base for next bit
            base = (base * base) % mod
            exp >>= 1
        
        return result

    def computeValue(self, n):
        MOD = 1000000007

        fact2n = 1  # (2n)!
        factn = 1   # n!

        # Compute factorials
        for i in range(1, 2 * n + 1):
            fact2n = (fact2n * i) % MOD

            # Store n!
            if i == n:
                factn = fact2n

        # Modular inverse of n!
        inv_factn = self.power(factn, MOD - 2, MOD)

        # C(2n,n)
        ans = fact2n
        ans = (ans * inv_factn) % MOD
        ans = (ans * inv_factn) % MOD

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

First, factorial values are calculated iteratively.

While computing factorials, the algorithm stores two important values:

* `n!`
* `(2n)!`

Once these values are available, direct division cannot be used because modular arithmetic does not support normal division.

To solve this, the algorithm computes the modular inverse of `n!`.

Since `10^9 + 7` is a prime number, Fermat's Little Theorem can be applied:

`a^(MOD-2) mod MOD`

This gives the modular inverse.

After obtaining the inverse, the algorithm computes:

`(2n)! × inverse(n!) × inverse(n!)`

This is mathematically equivalent to:

`(2n)! / (n! × n!)`

which is exactly:

`C(2n, n)`

The final result represents the total number of binary strings whose two halves contain an equal number of set bits.

Because every multiplication is performed modulo `10^9 + 7`, the result remains within range even for large values of `n`.

---

## Examples

### Example 1

Input

```text
n = 1
```

Output

```text
2
```

Explanation

Valid binary strings:

```text
00
11
```

Both halves have equal sums.

---

### Example 2

Input

```text
n = 2
```

Output

```text
6
```

Explanation

Valid binary strings:

```text
0000
0101
0110
1001
1010
1111
```

Total count = 6

---

### Example 3

Input

```text
n = 3
```

Output

```text
20
```

Explanation

Using the formula:

```text
C(6,3) = 20
```

Therefore the answer is 20.

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

* Generating all binary strings is impossible because the number of possibilities grows exponentially.
* The combinatorial identity reduces the problem to a single binomial coefficient calculation.
* Modular arithmetic prevents overflow and keeps computations efficient.
* Fermat's Little Theorem provides an optimal way to perform modular division.
* The solution easily handles the maximum constraint of `n = 100000`.
* This is a common competitive programming problem involving combinations, modular inverse, factorials, and number theory.

### Alternative Approach

One alternative is to precompute factorials and inverse factorials in arrays.

That approach is useful when multiple test cases are present because combinations can then be answered in constant time.

For a single query, the current approach is already efficient and memory-friendly.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
