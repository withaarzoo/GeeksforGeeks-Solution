# Count Prefix-Balanced Binary Strings

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

Given an integer `n`, the task is to count binary strings of length `2 * n` that contain exactly `n` ones and `n` zeros.

The important condition is that every prefix of the binary string must contain at least as many `1`s as `0`s.

For example, when `n = 2`, the string `1100` is valid:

* `1` has more `1`s than `0`s
* `11` has more `1`s than `0`s
* `110` still has at least as many `1`s as `0`s
* `1100` has exactly the same number of `1`s and `0`s

But `1010` is also valid, while `0101` is not valid because its first prefix contains more `0`s than `1`s.

The answer can become very large, so it must be returned modulo `10^9 + 7`.

This problem is closely related to the Catalan number, balanced parentheses, prefix balance, modular arithmetic, and combinatorial counting.

## Constraints

| Constraint     |          Value |
| -------------- | -------------: |
| `n`            | `1 ≤ n ≤ 1000` |
| String length  |        `2 * n` |
| Number of `1`s |    Exactly `n` |
| Number of `0`s |    Exactly `n` |
| Modulo         |     `10^9 + 7` |

## Intuition

The first thing I noticed was that every `1` can be treated like an opening bracket and every `0` can be treated like a closing bracket.

If I replace:

* `1` with `(`
* `0` with `)`

then the condition becomes exactly the same as checking whether a parentheses sequence is valid.

A valid sequence of `n` pairs of parentheses must never have more closing brackets than opening brackets in any prefix. In the same way, this binary string must never have more `0`s than `1`s in any prefix.

That means I do not need to generate all possible binary strings.

The number of valid sequences is the `n`th Catalan number:

```math
C_n = \frac{(2n)!}{n!(n+1)!}
```

So the problem becomes a modular Catalan number calculation.

## Approach

I use the Catalan number formula:

```math
C_n = \frac{(2n)!}{n! \times (n+1)!}
````

Since:

```math
(n+1)! = (n+1) \times n!
````

I can also write it as:

```math
C_n = \frac{(2n)!}{n! \times n! \times (n+1)}
````

Then I follow these steps:

1. Calculate `n!`.
2. Calculate `(2n)!`.
3. Find the modular inverse of `n!`.
4. Find the modular inverse of `n + 1`.
5. Multiply all values according to the Catalan number formula.
6. Return the result modulo `10^9 + 7`.

Because the modulo is prime, I use Fermat's Little Theorem to calculate modular inverses:

```math
x^{-1} = x^{MOD-2} \pmod{MOD}
````

I use binary exponentiation to calculate these powers efficiently.

## Data Structures Used

No special data structure is required for this solution.

| Item               | Why it is used                                                                        |
| ------------------ | ------------------------------------------------------------------------------------- |
| Integer variables  | Store factorial values, modular inverses, and the final answer                        |
| No arrays or lists | The Catalan formula can be calculated directly without storing intermediate sequences |

The solution uses a constant amount of extra memory.

## Operations & Behavior Summary

The algorithm works in the following order:

1. Set `MOD` to `1000000007`.
2. Start factorial values from `1`.
3. Loop from `1` to `2 * n`.
4. Build `(2n)!` during the full loop.
5. Build `n!` while the current value is less than or equal to `n`.
6. Use fast binary exponentiation to find the modular inverse of `n!`.
7. Find the modular inverse of `n + 1`.
8. Multiply `(2n)!` by the inverse values.
9. Take modulo after every multiplication.
10. Return the final Catalan number.

The main idea is to count valid prefix-balanced binary strings mathematically instead of checking every possible string.

## Complexity

| Type             | Complexity       | Explanation                                                                                           |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n + log MOD)` | Calculating factorial values up to `2n` takes `O(n)`, while modular exponentiation takes `O(log MOD)` |
| Space Complexity | `O(1)`           | Only a few variables are used, with no extra array or dynamic programming table                       |

Here, `n` is the number of `1`s and also the number of `0`s in the required binary string.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    // This function calculates (base^exp) % mod using binary exponentiation.
    long long power(long long base, long long exp, long long mod) {
        long long result = 1; // Start with the multiplicative identity.
        
        while (exp > 0) { // Process every bit of the exponent.
            if (exp & 1) { // If the current bit is set, include base in the answer.
                result = (result * base) % mod; // Keep the value within modulo.
            }
            
            base = (base * base) % mod; // Square base for the next binary bit.
            exp >>= 1; // Move to the next bit of the exponent.
        }
        
        return result; // Return the final modular power.
    }

    int prefixStrings(int n) {
        const long long MOD = 1000000007LL; // Prime modulo required by the problem.
        long long factN = 1; // This will store n!.
        long long fact2N = 1; // This will store (2n)!.

        for (int i = 1; i <= 2 * n; i++) { // Calculate factorial values up to 2n.
            fact2N = (fact2N * i) % MOD; // Build (2n)! step by step.

            if (i <= n) { // Only multiply the first n values for n!.
                factN = (factN * i) % MOD; // Build n! step by step.
            }
        }

        // By Fermat's theorem, x^(MOD-2) is the modular inverse of x.
        long long inverseFactN = power(factN, MOD - 2, MOD);

        // Find the modular inverse of (n + 1) for the Catalan formula.
        long long inverseNPlusOne = power(n + 1, MOD - 2, MOD);

        // Apply Cn = (2n)! / (n! * n! * (n + 1)) under modulo.
        long long answer = fact2N;
        answer = (answer * inverseFactN) % MOD; // Divide by the first n!.
        answer = (answer * inverseFactN) % MOD; // Divide by the second n!.
        answer = (answer * inverseNPlusOne) % MOD; // Divide by (n + 1).

        return (int)answer; // Return the nth Catalan number.
    }
};
```

### Java

```java
class Solution {
    static final long MOD = 1000000007L; // Prime modulo used for all calculations.

    // This function calculates (base^exp) % MOD using binary exponentiation.
    private long power(long base, long exp) {
        long result = 1; // Start with the multiplicative identity.
        
        while (exp > 0) { // Process every bit of the exponent.
            if ((exp & 1) == 1) { // If the current bit is set, multiply base.
                result = (result * base) % MOD; // Keep the result under modulo.
            }
            
            base = (base * base) % MOD; // Square base for the next binary bit.
            exp >>= 1; // Move to the next bit.
        }
        
        return result; // Return the calculated modular power.
    }

    public int prefixStrings(int n) {
        long factN = 1; // This will store n!.
        long fact2N = 1; // This will store (2n)!.

        for (int i = 1; i <= 2 * n; i++) { // Calculate factorials up to 2n.
            fact2N = (fact2N * i) % MOD; // Build (2n)!.

            if (i <= n) { // Use only values from 1 to n for n!.
                factN = (factN * i) % MOD; // Build n!.
            }
        }

        // Calculate the modular inverse of n!.
        long inverseFactN = power(factN, MOD - 2);

        // Calculate the modular inverse of (n + 1).
        long inverseNPlusOne = power(n + 1L, MOD - 2);

        // Apply the Catalan number formula under modulo.
        long answer = fact2N;
        answer = (answer * inverseFactN) % MOD; // Divide by the first n!.
        answer = (answer * inverseFactN) % MOD; // Divide by the second n!.
        answer = (answer * inverseNPlusOne) % MOD; // Divide by (n + 1).

        return (int) answer; // Return the final count.
    }
}
```

### JavaScript

```javascript
/*
 * @param {number} n
 * @return {number}
 */
class Solution {
    // This function calculates (base^exp) % mod using binary exponentiation.
    power(base, exp, mod) {
        let result = 1n; // Start with the multiplicative identity.
        base %= mod; // Keep the starting base inside the modulo range.

        while (exp > 0n) { // Process every bit of the exponent.
            if (exp & 1n) { // If the current bit is set, multiply base.
                result = (result * base) % mod; // Keep the result under modulo.
            }

            base = (base * base) % mod; // Square base for the next binary bit.
            exp >>= 1n; // Move to the next bit.
        }

        return result; // Return the modular power.
    }

    prefixStrings(n) {
        const MOD = 1000000007n; // Prime modulo used by the problem.
        const N = BigInt(n); // Convert n to BigInt for exact multiplication.
        let factN = 1n; // This will store n!.
        let fact2N = 1n; // This will store (2n)!.

        for (let i = 1n; i <= 2n * N; i++) { // Calculate factorials up to 2n.
            fact2N = (fact2N * i) % MOD; // Build (2n)!.

            if (i <= N) { // Use only the first n values for n!.
                factN = (factN * i) % MOD; // Build n!.
            }
        }

        // Calculate the modular inverse of n! using Fermat's theorem.
        const inverseFactN = this.power(factN, MOD - 2n, MOD);

        // Calculate the modular inverse of (n + 1).
        const inverseNPlusOne = this.power(N + 1n, MOD - 2n, MOD);

        // Apply the Catalan number formula under modulo.
        let answer = fact2N;
        answer = (answer * inverseFactN) % MOD; // Divide by the first n!.
        answer = (answer * inverseFactN) % MOD; // Divide by the second n!.
        answer = (answer * inverseNPlusOne) % MOD; // Divide by (n + 1).

        return Number(answer); // Convert the final value back to Number.
    }
}
```

### Python3

```python
class Solution:
    # This function calculates (base ** exp) % mod using binary exponentiation.
    def power(self, base: int, exp: int, mod: int) -> int:
        result = 1  # Start with the multiplicative identity.

        while exp > 0:  # Process every bit of the exponent.
            if exp & 1:  # If the current bit is set, include base in the result.
                result = (result * base) % mod  # Keep the result within modulo.

            base = (base * base) % mod  # Square base for the next binary bit.
            exp >>= 1  # Move to the next bit of the exponent.

        return result  # Return the final modular power.

    def prefixStrings(self, n: int) -> int:
        MOD = 1000000007  # Prime modulo required by the problem.
        fact_n = 1  # This will store n!.
        fact_2n = 1  # This will store (2n)!.

        for i in range(1, 2 * n + 1):  # Calculate factorial values up to 2n.
            fact_2n = (fact_2n * i) % MOD  # Build (2n)!.

            if i <= n:  # Use only values from 1 to n for n!.
                fact_n = (fact_n * i) % MOD  # Build n!.

        # Calculate the modular inverse of n! using Fermat's Little Theorem.
        inverse_fact_n = self.power(fact_n, MOD - 2, MOD)

        # Calculate the modular inverse of (n + 1).
        inverse_n_plus_one = self.power(n + 1, MOD - 2, MOD)

        # Apply Cn = (2n)! / (n! * n! * (n + 1)) under modulo.
        answer = fact_2n
        answer = (answer * inverse_fact_n) % MOD  # Divide by the first n!.
        answer = (answer * inverse_fact_n) % MOD  # Divide by the second n!.
        answer = (answer * inverse_n_plus_one) % MOD  # Divide by (n + 1).

        return answer  # Return the nth Catalan number.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in C++, Java, JavaScript, and Python3.

I first calculate the two factorial values needed for the Catalan number formula: `n!` and `(2n)!`.

I take modulo after every multiplication so the numbers remain manageable and the result stays correct under modular arithmetic.

Next, I need to divide by `n!`, another `n!`, and `n + 1`.

Direct division does not work correctly after taking modulo. Instead, I multiply by the modular inverse of each value.

For a prime modulo `MOD`, Fermat's Little Theorem tells me that:

```math
x^{-1} = x^{MOD-2} \pmod{MOD}
````

So I calculate the modular inverse using fast binary exponentiation.

Binary exponentiation repeatedly squares the base and processes the exponent bit by bit. This makes modular power calculation much faster than multiplying the same number repeatedly.

After finding the inverse of `n!`, I use it twice because the denominator contains two `n!` terms.

Then I multiply by the inverse of `n + 1`.

The final expression is:

```math
(2n)! \times (n!)^{-1} \times (n!)^{-1} \times (n+1)^{-1}
\pmod{10^9+7}
````

### C++

C++ should use `long long` for modular multiplication. Even though the final answer is less than `MOD`, multiplying two values can temporarily exceed the range of a normal `int`.

The binary exponentiation function should repeatedly square the base and shift the exponent to the right.

### Java

Java should use `long` instead of `int` for factorial calculations and modular multiplication.

The overall algorithm is the same as C++, including binary exponentiation and Fermat's Little Theorem.

### JavaScript

JavaScript should use `BigInt` for modular arithmetic.

Normal JavaScript `Number` values use floating-point representation and can lose precision when integer multiplication becomes large. `BigInt` keeps these calculations exact.

The final answer can be converted back if required by the platform.

### Python3

Python integers automatically support very large values, so no special integer type is needed.

The same Catalan number formula, modular inverse method, and binary exponentiation approach can be used directly.

## Examples

### Example 1

**Input**

```text
n = 1
```

**Expected Output**

```text
1
```

**Explanation**

The only valid string is:

```text
10
```

The prefix balances are always non-negative, so the answer is `1`.

---

### Example 2

**Input**

```text
n = 2
```

**Expected Output**

```text
2
```

**Valid Strings**

```text
1100
1010
```

Both strings contain exactly two `1`s and two `0`s.

Every prefix also contains at least as many `1`s as `0`s.

Using the Catalan formula:

```math
C_2 = \frac{4!}{2! \times 3!} = 2
````

---

### Example 3

**Input**

```text
n = 3
```

**Expected Output**

```text
5
```

**Valid Strings**

```text
111000
110100
110010
101100
101010
```

Using the Catalan number formula:

```math
C_3 = \frac{6!}{3! \times 4!} = 5
```

So there are `5` prefix-balanced binary strings.

## How to Use / Run Locally

### C++

1. Save the solution in a file named `main.cpp`.
2. Make sure a C++ compiler such as `g++` is installed.
3. Compile the file:

```bash
g++ main.cpp -o main
```

1. Run the program:

```bash
./main
```

On Windows:

```bash
main.exe
```

### Java

1. Save the solution in a file named `Solution.java`.
2. Make sure the JDK is installed.
3. Compile the file:

```bash
javac Solution.java
```

1. Run it:

```bash
java Solution
```

If the online judge provides its own driver code, only submit the required `Solution` class.

### JavaScript

1. Save the solution in a file named `solution.js`.
2. Install Node.js.
3. Run the file:

```bash
node solution.js
```

If the platform already handles input and output, only submit the required class and method.

### Python3

1. Save the solution in a file named `solution.py`.
2. Make sure Python 3 is installed.
3. Run the file:

```bash
python3 solution.py
```

On some systems, this command may also work:

```bash
python solution.py
```

## Notes & Optimizations

* The problem is a direct application of the Catalan number formula.
* A dynamic programming solution is possible, but it is unnecessary for the given constraints.
* Generating every binary string would be extremely inefficient because there are `2^(2n)` possible strings.
* The direct combinatorial approach avoids generating strings completely.
* Modular inverses are necessary because division cannot be performed directly under modulo.
* Binary exponentiation keeps modular inverse calculation efficient.
* The answer for `n = 1` is `1`, which is handled naturally by the formula.
* The solution uses `O(1)` extra space.
* This approach is also useful for problems involving balanced parentheses, valid prefix sequences, Dyck paths, and Catalan number counting.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
