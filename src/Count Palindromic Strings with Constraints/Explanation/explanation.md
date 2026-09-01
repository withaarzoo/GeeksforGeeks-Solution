# Count Palindromic Strings with Constraints

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

Given two integers `n` and `k`, I have an alphabet containing the first `k` lowercase English letters.

I need to count how many palindromic strings have a length less than or equal to `n` and satisfy these two conditions:

1. Every character must come from the given `k` lowercase letters.
2. No character can appear more than twice in the complete string.

A palindrome reads the same from left to right and right to left.

For example, `aba` is a palindrome, while `abc` is not.

The answer can become very large, so I need to return it modulo `10^9 + 7`.

This problem can be solved efficiently using combinatorics and permutation counting instead of generating every possible string.

## Constraints

| Constraint     | Meaning                                                        |
| -------------- | -------------------------------------------------------------- |
| `1 <= k <= 26` | The alphabet contains the first `k` lowercase English letters. |
| `1 <= n <= 52` | The maximum allowed string length is `n`.                      |
| `n <= 2 * k`   | The maximum length is twice the alphabet size.                 |
| Modulo         | The answer must be returned modulo `10^9 + 7`.                 |

## Intuition

My first thought was to look at what a palindrome does with each character.

If a character appears in one position on the left side, the same character must appear at the matching position on the right side. So most characters in a palindrome naturally appear in pairs.

But there is an important restriction: no character can appear more than twice.

That means every character used in the mirrored pairs must be different.

For example, `abcba` is valid because `a` and `b` appear twice and `c` appears once.

But `ababa` is invalid because `a` appears three times.

So instead of constructing complete palindromes, I can focus only on their first half.

For an even-length palindrome, the first half completely determines the second half.

For an odd-length palindrome, the first half determines everything except the middle character.

This turns the problem into counting permutations of different characters.

## Approach

I handle every possible length from `1` to `n`.

For an even length `2m`, I need `m` different characters in the first half.

The number of ways to select and arrange them is:

`k × (k - 1) × ... × (k - m + 1)`

This is a permutation of `m` characters from `k` available characters.

Once the first half is selected, the second half is fixed because the string must be a palindrome.

For an odd length `2m + 1`, I again need `m` different characters for the first half.

After selecting those `m` characters, exactly `k - m` characters remain available for the middle position.

The middle character must not be one of the characters already used in the first half. Otherwise, that character would appear three times.

So the number of odd-length palindromes is:

`P(k, m) × (k - m)`

I maintain the permutation value instead of recalculating it for every length.

For every even length, I extend the first half by one new character.

For every odd length, I use the current number of first-half arrangements and multiply it by the number of valid choices for the middle character.

All calculations are performed modulo `10^9 + 7`.

## Data Structures Used

No array, map, set, string, or other collection is required.

I only use a few integer variables:

* `ways` stores the number of possible arrangements for the current first half.
* `ans` stores the total number of valid palindromic strings.
* `pairs` stores how many mirrored pairs exist for the current length.
* `MOD` stores `10^9 + 7`.

This keeps the solution memory efficient.

## Operations & Behavior Summary

The algorithm works like this:

1. Start with `ways = 1`, representing zero selected characters.
2. Set `ans = 0`.
3. Check every length from `1` through `n`.
4. If the length is odd:

   * Find the number of mirrored pairs.
   * Use the current `ways` to count possible first halves.
   * Choose the middle character from the unused characters.
   * Add the result to `ans`.
5. If the length is even:

   * Find the number of mirrored pairs.
   * Add one new distinct character to the first half.
   * Update `ways`.
   * Add `ways` to `ans`.
6. Apply modulo `10^9 + 7` after calculations.
7. Return `ans`.

The key idea is that I never generate the actual palindromic strings.

## Complexity

| Type             | Complexity | Explanation                                                                        |
| ---------------- | ---------- | ---------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)`     | I process every length from `1` to `n` once. Since `n <= 2k`, this is also `O(k)`. |
| Space Complexity | `O(1)`     | I only use a constant number of integer variables and no extra data structures.    |

## Multi-language Solutions

### C++

```cpp

class Solution {
  public:
    int palindromicStrings(int n, int k) {
        const long long MOD = 1000000007LL; // Store the required modulo value.
        long long ways = 1;                 // Ways to choose 0 characters for the first half.
        long long ans = 0;                  // Store the total number of valid palindromes.

        for (int len = 1; len <= n; ++len) { // Check every possible palindrome length.
            if (len % 2 == 1) {             // Odd length has one character in the center.
                int pairs = len / 2;        // Number of mirrored pairs in this palindrome.

                // The first half has already been counted in ways.
                // The center must be a character not used in those pairs.
                ans = (ans + ways * (k - pairs)) % MOD;
            } else {                        // Even length has no center character.
                int pairs = len / 2;        // Number of characters needed in the first half.

                // Add one new distinct character to the first half.
                // There are k - pairs + 1 choices for this new position.
                ways = (ways * (k - pairs + 1)) % MOD;

                // The first half completely determines an even palindrome.
                ans = (ans + ways) % MOD;
            }
        }

        return (int)ans;                    // Return the answer modulo 10^9 + 7.
    }
};

```

### Java

```java

class Solution {
    public int palindromicStrings(int n, int k) {
        final long MOD = 1000000007L; // Store the required modulo value.
        long ways = 1;                // Ways to choose 0 characters for the first half.
        long ans = 0;                 // Store the total number of valid palindromes.

        for (int len = 1; len <= n; len++) { // Check every possible palindrome length.
            if (len % 2 == 1) {             // Odd length has one character in the center.
                int pairs = len / 2;        // Number of mirrored pairs.

                // The center must be different from every character used in the pairs.
                // Therefore, k - pairs choices are available for the center.
                ans = (ans + ways * (k - pairs)) % MOD;
            } else {                        // Even length has no center character.
                int pairs = len / 2;        // Number of characters in the first half.

                // Choose a new distinct character for the next position.
                // There are k - pairs + 1 unused characters available.
                ways = (ways * (k - pairs + 1)) % MOD;

                // The first half completely determines the even palindrome.
                ans = (ans + ways) % MOD;
            }
        }

        return (int) ans;                   // Return the answer modulo 10^9 + 7.
    }
}

```

### JavaScript

```javascript

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

class Solution {
    palindromicStrings(n, k) {
        const MOD = 1000000007n; // BigInt keeps multiplication exact beyond JavaScript's safe integer range.
        let ways = 1n;            // Ways to choose 0 characters for the first half.
        let ans = 0n;             // Store the total number of valid palindromes.

        for (let len = 1; len <= n; len++) { // Check every possible palindrome length.
            if (len % 2 === 1) {             // Odd length contains one center character.
                const pairs = Math.floor(len / 2); // Number of mirrored pairs.

                // The center cannot be any character already used in the first half.
                // Therefore, k - pairs choices are available.
                ans = (ans + ways * BigInt(k - pairs)) % MOD;
            } else {                         // Even length has no center character.
                const pairs = len / 2;       // Number of characters in the first half.

                // Choose a new character that has not appeared in the first half.
                // There are k - pairs + 1 choices for this position.
                ways = (ways * BigInt(k - pairs + 1)) % MOD;

                // The first half completely determines the even palindrome.
                ans = (ans + ways) % MOD;
            }
        }

        return Number(ans);                  // Convert the final modulo result back to a normal number.
    }
};

```

### Python3

```python
class Solution:
    def palindromicStrings(self, n, k):
        MOD = 1000000007       # Store the required modulo value.
        ways = 1               # Ways to choose 0 characters for the first half.
        ans = 0                # Store the total number of valid palindromes.

        for length in range(1, n + 1):  # Check every possible palindrome length.
            if length % 2 == 1:         # Odd length has one character in the center.
                pairs = length // 2      # Number of mirrored pairs.

                # The center cannot use a character already present in the pairs.
                # Therefore, k - pairs choices are available.
                ans = (ans + ways * (k - pairs)) % MOD
            else:                       # Even length has no center character.
                pairs = length // 2      # Number of characters in the first half.

                # Choose a new distinct character for the next position.
                # There are k - pairs + 1 unused characters available.
                ways = (ways * (k - pairs + 1)) % MOD

                # The first half completely determines the even palindrome.
                ans = (ans + ways) % MOD

        return ans                       # Return the answer modulo 10^9 + 7.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages. The main difference is how each language handles integer arithmetic.

I start with:

`ways = 1`

This represents the number of ways to choose zero characters for the first half.

I also start with:

`ans = 0`

This variable will contain the total number of valid palindromic strings for every length from `1` to `n`.

Next, I loop through every possible length.

For each length, I calculate:

`pairs = length / 2`

This tells me how many mirrored pairs the palindrome contains.

### Odd-length palindrome

Suppose the length is `5`.

The structure looks like:

`a b c b a`

There are two mirrored pairs and one middle character.

So:

`pairs = 5 / 2 = 2`

The first half contains two characters, and they must be different.

If `k = 3`, the first half can be selected in:

`3 × 2 = 6`

ways.

After selecting two characters, only:

`3 - 2 = 1`

character remains available for the center.

Therefore:

`6 × 1 = 6`

valid palindromes have length `5`.

The center character is not allowed to be one of the characters already used in the first half.

Otherwise, that character would appear three times.

### Even-length palindrome

Now consider length `4`.

The structure is:

`a b b a`

The first half contains two characters.

The second half is completely determined by the first half.

If `k = 3`, the first position has `3` choices.

After choosing it, the second position has `2` choices because it must be different.

So there are:

`3 × 2 = 6`

possible first halves.

Each first half produces exactly one palindrome.

Therefore, there are `6` valid palindromes of length `4`.

### Updating the permutation count

I do not calculate `k × (k - 1) × ...` from the beginning every time.

Instead, I keep the previous value in `ways`.

When I need one more character in the first half, I multiply `ways` by the number of unused characters.

For example, with `k = 3`:

* First character: `3` choices.
* Second different character: `2` choices.
* Third different character: `1` choice.

So the values become:

`1 → 3 → 6 → 6`

This makes the solution simple and avoids unnecessary repeated calculations.

### Why the middle character needs special handling

The middle character exists only for odd-length palindromes.

Suppose I have:

`aba`

The first half is `a`, and the middle character is `b`.

This is valid because both characters appear at most twice.

But:

`aaa`

would not be valid because `a` appears three times.

Therefore, after using `m` characters in the mirrored pairs, the middle character must come from the remaining `k - m` characters.

This is the main difference between counting odd and even lengths.

### Modulo handling

The number of possible strings can become very large.

For example, permutation values grow quickly as `k` increases.

So I take every multiplication and addition modulo:

`10^9 + 7`

This keeps the numbers manageable while still producing the required answer.

### C++ integer handling

In C++, I use `long long` for intermediate calculations.

This is important because multiplication can temporarily produce a value larger than a normal 32-bit integer can safely hold.

The final answer is converted to `int` because the result after applying the modulo always fits within the required range.

### Java integer handling

In Java, I use `long` for the calculation.

A normal `int` is not suitable for multiplication here because the intermediate result can become too large.

After applying the modulo, the final value can safely be returned as an `int`.

### JavaScript integer handling

JavaScript's normal `Number` type uses floating-point arithmetic and cannot safely represent every large integer.

Because this solution performs modular multiplication, I use `BigInt` for the calculation.

The modulo value is also stored as a `BigInt`.

After all calculations are complete, the final result is converted back to a normal JavaScript number.

### Python3 integer handling

Python integers can automatically grow to handle large values.

So there is no separate large-integer type required.

I still apply the modulo after each operation to keep the calculations efficient and aligned with the problem requirement.

## Examples

### Example 1

Input:

```text
n = 3
k = 2
```

The alphabet is:

`{a, b}`

Length `1`:

`a`, `b`

Count = `2`

Length `2`:

`aa`, `bb`

Count = `2`

Length `3`:

`aba`, `bab`

Count = `2`

Total:

`2 + 2 + 2 = 6`

Expected Output:

```text
6
```

### Example 2

Input:

```text
n = 4
k = 3
```

The alphabet is:

`{a, b, c}`

Length `1`:

`a`, `b`, `c`

Count = `3`

Length `2`:

`aa`, `bb`, `cc`

Count = `3`

Length `3`:

`aba`, `aca`, `bab`, `bcb`, `cac`, `cbc`

Count = `6`

Length `4`:

There are `3 × 2 = 6` possible first halves, so there are `6` valid palindromes.

Total:

`3 + 3 + 6 + 6 = 18`

Expected Output:

```text
18
```

### Example 3

Input:

```text
n = 5
k = 2
```

The alphabet is:

`{a, b}`

For length `5`, two mirrored pairs would be required.

But the first half would need two different characters, which is possible.

The first half has:

`2 × 1 = 2`

arrangements.

However, there are no unused characters left for the middle.

So the number of valid length-5 palindromes is:

`2 × (2 - 2) = 0`

This shows why the middle character must be different from every character used in the mirrored pairs.

## How to Use / Run Locally

### C++

1. Create a file named `solution.cpp`.
2. Add the C++ solution inside the `Solution` class.
3. Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

1. Run it using:

```bash
./solution
```

On Windows, run:

```bash
solution.exe
```

The exact input and output format depends on the platform where the solution is submitted. For GeeksforGeeks, the `Solution` class and required method should be used as specified by the problem.

### Java

1. Create a file named `Solution.java`.
2. Add the Java solution inside the `Solution` class.
3. Compile it using:

```bash
javac Solution.java
```

1. Run it using:

```bash
java Solution
```

For GeeksforGeeks, the platform calls the required method automatically, so a separate `main` method is usually not required.

### JavaScript

1. Create a file named `solution.js`.
2. Add the JavaScript solution inside the `Solution` class.
3. Make sure to use `BigInt` for the modular arithmetic.
4. Run the file with Node.js:

```bash
node solution.js
```

For GeeksforGeeks, use the required `Solution` class and method signature provided by the platform.

### Python3

1. Create a file named `solution.py`.
2. Add the Python3 solution inside the `Solution` class.
3. Run it with:

```bash
python3 solution.py
```

For GeeksforGeeks, the platform handles the input and method call, so the `Solution` class is enough.

## Notes & Optimizations

The biggest optimization is that I never generate the strings themselves.

A brute-force solution would try to construct many strings and then check whether each one is a palindrome and whether any character appears more than twice. That would be far too expensive.

Instead, I use the structure of a palindrome to count valid strings directly.

For even length `2m`, the answer for that length is:

`P(k, m)`

For odd length `2m + 1`, the answer is:

`P(k, m) × (k - m)`

where `P(k, m)` is the number of ways to arrange `m` different characters chosen from `k` characters.

Another important observation is that the constraint `n <= 2k` guarantees that we never need more than `k` mirrored pairs.

The modulo `10^9 + 7` should be applied during the calculation rather than only at the end.

Important edge cases include:

* `k = 1`
* `n = 1`
* `n = 2k`
* Odd lengths where no unused character remains for the middle
* Very large permutation values

The final solution runs in `O(n)` time and uses `O(1)` extra space.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
