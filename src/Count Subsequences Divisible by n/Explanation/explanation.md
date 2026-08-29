# Count Subsequences Divisible by n

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

Given a numeric string `s` containing only digits and an integer `n`, the goal is to count all non-empty subsequences whose numeric value is divisible by `n`.

A subsequence is created by selecting one or more digits while keeping their original order. The selected digits do not need to be next to each other.

For example, if:

```text
s = "1234"
n = 4
```

The subsequences `4`, `12`, `24`, and `124` are divisible by `4`, so the answer is `4`.

Since the number of possible subsequences can be very large, the answer is returned modulo `10^9 + 7`.

This solution uses dynamic programming and modular arithmetic to count divisible subsequences efficiently without generating every subsequence.

## Constraints

| Constraint | Description                                      |   |                                        |
| ---------- | ------------------------------------------------ | - | -------------------------------------- |
| `1 ≤       | s                                                | ` | The string contains at least one digit |
| `n ≤ 10^6` | The divisor can be as large as one million       |   |                                        |
| `s`        | Contains only numeric characters from `0` to `9` |   |                                        |
| Answer     | Returned modulo `10^9 + 7`                       |   |                                        |

## Intuition

My first thought was that generating every subsequence would not work. A string of length `m` can have up to `2^m - 1` non-empty subsequences, which becomes impossible to handle for large input sizes.

I noticed that I do not actually need to know the complete numeric value of every subsequence. I only need to know whether it is divisible by `n`.

That means I only care about the remainder of each subsequence when divided by `n`.

For every possible remainder from `0` to `n - 1`, I can store how many subsequences currently have that remainder.

If a subsequence has remainder `r` and I append a digit `d`, its new remainder is:

```text
(r × 10 + d) % n
```

This gives a direct dynamic programming solution for the Count Subsequences Divisible by n problem.

## Approach

I use dynamic programming where each state represents a possible remainder.

I maintain:

```text
dp[r] = number of non-empty subsequences formed so far
        whose numeric value gives remainder r when divided by n
```

Then I process the string one digit at a time.

For every current digit `d`, there are three important cases:

1. Existing subsequences can ignore the current digit.

2. Existing subsequences can append the current digit.

3. The current digit can start a completely new subsequence.

If an existing subsequence has remainder `r`, appending digit `d` changes its remainder to:

```text
(r × 10 + d) % n
```

I create a new DP array for every digit so that updates from the current digit do not accidentally affect other transitions in the same iteration.

After processing all digits, `dp[0]` contains the number of non-empty subsequences divisible by `n`.

## Data Structures Used

### DP Array

I use an array of size `n`.

```text
dp[r]
```

stores the number of subsequences whose remainder is `r`.

This is enough because every possible remainder lies between `0` and `n - 1`.

### Temporary DP Array

For every digit, I use another array called something like `next`.

It stores the updated state after deciding how the current digit affects all existing subsequences.

Using a separate array prevents a subsequence from using the same digit more than once during one iteration.

## Operations & Behavior Summary

The algorithm works like this:

1. Start with an array of `n` zeros.
2. Read the numeric string from left to right.
3. Convert the current character into a digit.
4. Copy the current DP state because every old subsequence can skip the current digit.
5. For every possible remainder `r`, append the current digit.
6. Calculate the new remainder using `(r × 10 + digit) % n`.
7. Add the number of subsequences from the old remainder to the new remainder.
8. Add the current digit itself as a new single-digit subsequence.
9. Replace the old DP state with the new one.
10. Return the count stored at remainder `0`.

This avoids generating actual subsequences and only tracks the information needed for divisibility.

## Complexity

| Complexity       | Value  | Explanation                                                                            |       |                                                                             |
| ---------------- | ------ | -------------------------------------------------------------------------------------- | ----- | --------------------------------------------------------------------------- |
| Time Complexity  | `O(    | s                                                                                      | × n)` | For every digit in the string, I process all `n` possible remainder states. |
| Space Complexity | `O(n)` | I use two arrays of size `n` to store the current and next dynamic programming states. |       |                                                                             |

Here, `|s|` is the length of the numeric string and `n` is the given divisor.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countSubsequences(string& s, int n) {
        // Store the answer modulo 1e9 + 7.
        const int MOD = 1000000007;

        // dp[r] stores the number of non-empty subsequences seen so far
        // whose numeric value gives remainder r when divided by n.
        vector<long long> dp(n, 0);

        // Process every digit from left to right so subsequence order is preserved.
        for (char ch : s) {
            // Convert the current character into its numeric digit value.
            int digit = ch - '0';

            // next starts as dp because every existing subsequence can ignore
            // the current digit and remain exactly the same.
            vector<long long> next = dp;

            // Try appending the current digit to every previously formed subsequence.
            for (int remainder = 0; remainder < n; ++remainder) {
                // If a number has remainder r, appending digit d makes the number
                // r*10 + d modulo n, so only the remainder needs to be calculated.
                int newRemainder = (remainder * 10LL + digit) % n;

                // Add all subsequences with this old remainder to their new remainder.
                next[newRemainder] =
                    (next[newRemainder] + dp[remainder]) % MOD;
            }

            // The current digit alone is also a new non-empty subsequence.
            next[digit % n] = (next[digit % n] + 1) % MOD;

            // Move to the DP state after processing the current digit.
            dp.swap(next);
        }

        // Remainder 0 means the subsequence is divisible by n.
        return dp[0];
    }
};
```

### Java

```java
class Solution {
    public int countSubsequences(String s, int n) {
        // Store the answer modulo 1e9 + 7.
        final int MOD = 1_000_000_007;

        // dp[r] stores the number of non-empty subsequences seen so far
        // whose numeric value gives remainder r when divided by n.
        long[] dp = new long[n];

        // Process every digit from left to right to preserve subsequence order.
        for (int i = 0; i < s.length(); i++) {
            // Convert the current character into its numeric digit value.
            int digit = s.charAt(i) - '0';

            // Copy dp because every old subsequence can skip the current digit
            // and therefore remain unchanged.
            long[] next = dp.clone();

            // Append the current digit to every existing subsequence.
            for (int remainder = 0; remainder < n; remainder++) {
                // Calculate the remainder after adding this digit at the end.
                int newRemainder = (int) ((remainder * 10L + digit) % n);

                // Add all subsequences having the old remainder to the new state.
                next[newRemainder] =
                    (next[newRemainder] + dp[remainder]) % MOD;
            }

            // The current digit by itself forms one new subsequence.
            int singleRemainder = digit % n;
            next[singleRemainder] = (next[singleRemainder] + 1) % MOD;

            // Use the newly calculated state for the next character.
            dp = next;
        }

        // All subsequences with remainder 0 are divisible by n.
        return (int) dp[0];
    }
}
```

### JavaScript

```javascript
class Solution {
    countSubsequences(s, n) {
        // Store the answer modulo 1e9 + 7.
        const MOD = 1000000007;

        // dp[r] stores the number of non-empty subsequences seen so far
        // whose numeric value leaves remainder r when divided by n.
        let dp = new Array(n).fill(0);

        // Process every digit from left to right to maintain subsequence order.
        for (const ch of s) {
            // Convert the current character into a numeric digit.
            const digit = ch.charCodeAt(0) - 48;

            // Copy dp because existing subsequences may skip this digit
            // and should remain part of the next state.
            const next = dp.slice();

            // Append the current digit to every previously formed subsequence.
            for (let remainder = 0; remainder < n; remainder++) {
                // Find the remainder after multiplying the old number by 10
                // and placing the current digit at the end.
                const newRemainder = (remainder * 10 + digit) % n;

                // Add all subsequences from the old remainder state.
                next[newRemainder] =
                    (next[newRemainder] + dp[remainder]) % MOD;
            }

            // The current digit alone creates one new non-empty subsequence.
            const singleRemainder = digit % n;
            next[singleRemainder] =
                (next[singleRemainder] + 1) % MOD;

            // Update the DP state after processing this digit.
            dp = next;
        }

        // Remainder 0 represents numbers divisible by n.
        return dp[0];
    }
}
```

### Python3

```python
class Solution:
    def countSubsequences(self, s, n):
        # Store every count modulo 1e9 + 7.
        MOD = 1000000007

        # dp[r] stores how many non-empty subsequences formed so far
        # have numeric value with remainder r when divided by n.
        dp = [0] * n

        # Process digits from left to right to preserve their original order.
        for ch in s:
            # Convert the current character into an integer digit.
            digit = int(ch)

            # Keep all old subsequences because each one can ignore
            # the current digit and remain unchanged.
            next_dp = dp[:]

            # Append the current digit to every existing subsequence.
            for remainder in range(n):
                # If the old remainder is r, appending digit d changes it
                # to (r * 10 + d) modulo n.
                new_remainder = (remainder * 10 + digit) % n

                # Add all subsequences from this old remainder state.
                next_dp[new_remainder] = (
                    next_dp[new_remainder] + dp[remainder]
                ) % MOD

            # The current digit alone is also a valid new subsequence.
            next_dp[digit % n] = (next_dp[digit % n] + 1) % MOD

            # Use this state while processing the next digit.
            dp = next_dp

        # Remainder 0 means the subsequence is divisible by n.
        return dp[0]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the same in C++, Java, JavaScript, and Python3. Only the syntax for arrays, loops, and modulo operations changes.

### Step 1: Create the remainder DP array

I create an array of size `n`.

Each position represents one possible remainder.

For example, when `n = 5`:

```text
dp[0] -> subsequences divisible by 5
dp[1] -> subsequences with remainder 1
dp[2] -> subsequences with remainder 2
dp[3] -> subsequences with remainder 3
dp[4] -> subsequences with remainder 4
```

Initially, all values are zero because I have not processed any digit yet.

### Step 2: Process one digit at a time

I move through the string from left to right.

This order matters because a subsequence must preserve the original order of digits.

For every digit, I calculate its numeric value.

For example:

```text
'7' -> 7
```

### Step 3: Keep subsequences that skip the current digit

Before adding new transitions, I copy the current DP array into a new array.

This represents the choice of not taking the current digit.

Suppose I already have the subsequence `12` and the current digit is `3`.

If I skip `3`, `12` must still remain available.

That is why the old DP values are copied first.

Without this step, I would lose all subsequences that choose not to include the current digit.

### Step 4: Append the current digit

Now I consider every existing remainder.

Suppose an existing subsequence has value `x` and:

```text
x % n = r
```

If I append digit `d`, the new number becomes:

```text
x × 10 + d
```

Its remainder is:

```text
(x × 10 + d) % n
```

Since only the remainder of `x` matters, this becomes:

```text
(r × 10 + d) % n
```

This is the most important transition in the dynamic programming solution.

Every subsequence counted in `dp[r]` moves to this new remainder when the current digit is appended.

### Step 5: Start a new subsequence

The current digit can also form a subsequence by itself.

For example, when processing `5`, the subsequence `5` is valid regardless of what was processed earlier.

Its remainder is:

```text
5 % n
```

So I add one to that remainder.

This step is necessary because not every subsequence needs to extend a previous subsequence.

### Step 6: Update the DP state

After processing all remainder transitions, I replace the old DP array with the new one.

Now the DP state represents all non-empty subsequences that can be formed using the digits processed so far.

I repeat the same process for every digit.

### Step 7: Return remainder zero

At the end:

```text
dp[0]
```

contains the number of subsequences whose numeric value leaves remainder `0` when divided by `n`.

Those are exactly the subsequences divisible by `n`.

### Language-specific notes

In C++, using `long long` during multiplication is safer because expressions involving the remainder and `10` should not overflow unexpectedly.

In Java, `long` is used for DP counts because the number of subsequences can be very large before taking modulo.

In JavaScript, regular `Number` values are safe here for these DP operations because values are reduced modulo `10^9 + 7` after every addition.

In Python3, integers can grow automatically, but taking modulo after every update is still important for keeping values manageable and matching the required output.

## Examples

### Example 1

**Input:**

```text
s = "1234"
n = 4
```

**Expected Output:**

```text
4
```

The subsequences divisible by `4` are:

```text
4
12
24
124
```

So the final answer is:

```text
4
```

### Example 2

**Input:**

```text
s = "330"
n = 6
```

**Expected Output:**

```text
4
```

The valid subsequences are:

```text
30
30
330
0
```

There are two different subsequences that produce `30` because they use different occurrences of the digit `3`.

The dynamic programming solution counts subsequences by their selected positions, so both are counted separately.

### Example 3

**Input:**

```text
s = "7"
n = 7
```

**Expected Output:**

```text
1
```

There is only one non-empty subsequence:

```text
7
```

Since:

```text
7 % 7 = 0
```

the answer is `1`.

## How to Use / Run Locally

### C++

Save the solution in a file named:

```text
main.cpp
```

Compile it using:

```bash
g++ -std=c++17 main.cpp -o main
```

Run the compiled program:

```bash
./main
```

On Windows:

```bash
main.exe
```

### Java

Save the solution in:

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

Make sure Java is installed and available from your terminal.

### JavaScript

Save the solution in:

```text
solution.js
```

Run it with Node.js:

```bash
node solution.js
```

You can check whether Node.js is installed by running:

```bash
node --version
```

### Python3

Save the solution in:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

On some systems, the command may be:

```bash
python solution.py
```

## Notes & Optimizations

The main optimization in this dynamic programming solution is that I never construct the actual numeric value of a subsequence.

A subsequence can become extremely long, but its remainder always stays between `0` and `n - 1`.

This reduces the problem from tracking huge numbers to tracking only `n` remainder states.

Generating every subsequence would take exponential time, so it is not practical for large strings.

The `O(|s| × n)` dynamic programming approach is much better because it processes each digit against a fixed set of remainder states.

Using two DP arrays is also important. Updating the same array directly could allow the current digit to be reused multiple times in one iteration, which would produce incorrect subsequences.

The modulo `10^9 + 7` must be applied during transitions because the number of subsequences can grow exponentially.

Leading zeros are naturally handled by this approach. Different choices of digit positions are treated as different subsequences, even when they produce the same numeric value.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
