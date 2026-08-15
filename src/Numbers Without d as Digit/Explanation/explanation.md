# Numbers Without d as Digit

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
  * [C](#c-1)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

The problem gives two integers, `n` and `d`. The goal is to count how many numbers from `1` to `n` do not contain the digit `d` anywhere in their decimal representation.

For example, if `n = 25` and `d = 3`, the numbers `3`, `13`, and `23` contain digit `3`. So the answer is `22`.

The solution needs to work efficiently because `n` can be as large as `10^9`.

This problem is a good example of digit-based dynamic programming, also known as Digit DP. Instead of checking every number one by one, I count the valid numbers by processing the digits of `n`.

## Constraints

* `0 <= n <= 10^9`
* `0 <= d <= 9`
* The answer must count numbers from `1` through `n`.
* The digit `d` must not appear anywhere in a valid number.

## Intuition

My first thought was to check every number from `1` to `n` and see whether it contains digit `d`.

That works for small values, but it becomes too slow when `n` is close to `10^9`.

So I looked at the digits instead of the complete numbers.

If I build a number one digit at a time, I can simply avoid choosing `d`. The main problem is making sure the number I build does not become greater than `n`.

I also need to handle leading zeros carefully. For example, while building the number `5`, I might represent it as `05`. That leading zero is not actually part of the number.

These two conditions lead naturally to a Digit DP solution.

## Approach

I first convert `n` into its decimal digits.

Then I process those digits from left to right.

For every position, I keep two pieces of information:

1. `tight` — whether the digits chosen so far are exactly equal to the prefix of `n`.
2. `started` — whether I have already placed the first non-zero digit of the number.

For every position, I try digits from `0` to the allowed maximum.

If the current prefix is still equal to `n`, I cannot choose a digit greater than the corresponding digit of `n`.

If the prefix is already smaller than `n`, I can choose any digit from `0` to `9`.

Whenever the number has started, I reject digit `d`.

If the number has not started yet, a zero is treated as a leading zero and does not count as using digit `0`. This makes the solution work correctly even when `d = 0`.

At the end, I count only states where the number has started. This automatically excludes the number `0`, because the problem asks for numbers from `1` to `n`.

## Data Structures Used

The solution uses a very small dynamic programming table.

* `dp[2][2]` in C++ and Java stores the number of ways for each combination of `tight` and `started`.
* A nested array is used for the same purpose in JavaScript and Python3.
* No graph, hash map, set, vector, or other large data structure is required.
* The DP state is enough because the number of possible states is constant for every digit position.

## Operations & Behavior Summary

The algorithm works in the following order:

1. Convert `n` into its decimal representation.
2. Start with an empty number that is still `tight` with `n`.
3. Process one digit position at a time.
4. Find the largest digit that can be selected at the current position.
5. Try every digit from `0` to that limit.
6. Track whether the number has started.
7. Reject digit `d` once the number has started.
8. Update the `tight` state based on whether the selected digit matches the corresponding digit of `n`.
9. Continue until every digit of `n` has been processed.
10. Count only states where the number has started.
11. Return the total number of valid positive integers.

This is essentially a digit DP version of counting numbers without a particular digit.

## Complexity

| Metric           | Complexity           | Explanation                                                                                                  |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Time Complexity  | `O(k * 10)` = `O(k)` | `k` is the number of digits in `n`. For every digit position, I try at most 10 possible digits.              |
| Space Complexity | `O(k)`               | The DP state is very small. Only the current and next states are maintained while processing the `k` digits. |

Since `n <= 10^9`, `k` is at most 10, so the actual number of DP states is tiny.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countWithout(int n, int d) {
        // I store n as a string so I can process its digits from left to right.
        string s = to_string(n);
        
        // dp[tight][started] stores the number of valid ways for the processed prefix.
        // tight = 1 means the prefix is exactly equal to n's prefix.
        // started = 1 means I have already placed a non-leading-zero digit.
        long long dp[2][2] = {};
        
        // Before processing anything, the number has not started
        // and the prefix is tight with n.
        dp[1][0] = 1;
        
        // I process every digit of n from left to right.
        for (char current : s) {
            // I create a fresh DP table for the next position.
            long long next[2][2] = {};
            
            // I check both possible tight and started states.
            for (int tight = 0; tight <= 1; ++tight) {
                for (int started = 0; started <= 1; ++started) {
                    // I skip states that have no valid ways.
                    if (dp[tight][started] == 0) {
                        continue;
                    }
                    
                    // If the prefix is tight, I cannot exceed the current digit of n.
                    // Otherwise, I can use any digit from 0 to 9.
                    int limit = tight ? current - '0' : 9;
                    
                    // I try every possible digit for this position.
                    for (int digit = 0; digit <= limit; ++digit) {
                        // A leading zero does not count as an actual digit.
                        bool nextStarted = started || digit != 0;
                        
                        // I only reject digit d if the number has actually started.
                        // This is important when d is 0 because leading zeros are ignored.
                        if (nextStarted && digit == d) {
                            continue;
                        }
                        
                        // The next state is tight only when the chosen digit
                        // is exactly the current digit of n.
                        int nextTight = tight && (digit == limit);
                        
                        // I add all ways from the current state to the next state.
                        next[nextTight][nextStarted] += dp[tight][started];
                    }
                }
            }
            
            // I move the next-position states into the current DP table.
            for (int tight = 0; tight <= 1; ++tight) {
                for (int started = 0; started <= 1; ++started) {
                    dp[tight][started] = next[tight][started];
                }
            }
        }
        
        // dp[0][1] and dp[1][1] contain all valid positive numbers.
        // I also count the number 0 through dp[*][0], so I exclude it
        // by simply summing only states where the number has started.
        return static_cast<int>(dp[0][1] + dp[1][1]);
    }
};
```

### Java

```java
class Solution {
    public int countWithout(int n, int d) {
        // I convert n to a string so I can process its digits from left to right.
        String s = String.valueOf(n);
        
        // dp[tight][started] stores the number of valid ways for the processed prefix.
        // tight = 1 means the prefix is equal to n's prefix.
        // started = 1 means I have already placed a real digit.
        long[][] dp = new long[2][2];
        
        // Initially, no digit has been placed, so the number has not started.
        // The empty prefix is still equal to n's prefix.
        dp[1][0] = 1;
        
        // I process each digit of n.
        for (int pos = 0; pos < s.length(); pos++) {
            // I create the DP table for the next digit position.
            long[][] next = new long[2][2];
            
            // I check every possible DP state.
            for (int tight = 0; tight <= 1; tight++) {
                for (int started = 0; started <= 1; started++) {
                    // There is nothing to process if this state has no ways.
                    if (dp[tight][started] == 0) {
                        continue;
                    }
                    
                    // A tight state cannot choose a digit larger than n's digit.
                    // A non-tight state can choose any digit from 0 to 9.
                    int limit = tight == 1 ? s.charAt(pos) - '0' : 9;
                    
                    // I try every digit allowed at this position.
                    for (int digit = 0; digit <= limit; digit++) {
                        // Leading zero means the number has still not started.
                        boolean nextStarted = started == 1 || digit != 0;
                        
                        // Once the number has started, digit d is forbidden.
                        // This also correctly handles d = 0.
                        if (nextStarted && digit == d) {
                            continue;
                        }
                        
                        // The next state remains tight only if I choose
                        // exactly the current digit of n.
                        int nextTight = (tight == 1 && digit == limit) ? 1 : 0;
                        
                        // I add all ways reaching this next state.
                        next[nextTight][nextStarted ? 1 : 0] += dp[tight][started];
                    }
                }
            }
            
            // I replace the old states with the states for the next position.
            dp = next;
        }
        
        // I sum only states where the number has started.
        // The not-started state represents 0, which is not part of the answer.
        return (int) (dp[0][1] + dp[1][1]);
    }
}
```

### JavaScript

```javascript
/*
 * @param {number} n
 * @param {number} d
 * @return {number}
 */
class Solution {
    countWithout(n, d) {
        // I convert n to a string so I can process each digit from left to right.
        const s = String(n);
        
        // dp[tight][started] stores the number of valid ways for the processed prefix.
        // tight = 1 means the prefix is equal to n's prefix.
        // started = 1 means the number has already started.
        let dp = [
            [0, 0],
            [1, 0]
        ];
        
        // I process every digit of n.
        for (let pos = 0; pos < s.length; pos++) {
            // I create an empty DP table for the next position.
            const next = [
                [0, 0],
                [0, 0]
            ];
            
            // I check every possible tight and started state.
            for (let tight = 0; tight <= 1; tight++) {
                for (let started = 0; started <= 1; started++) {
                    // I skip states that cannot produce any number.
                    if (dp[tight][started] === 0) {
                        continue;
                    }
                    
                    // A tight state is limited by n's current digit.
                    // A non-tight state can use any digit from 0 to 9.
                    const limit = tight === 1 ? Number(s[pos]) : 9;
                    
                    // I try every digit that can be placed here.
                    for (let digit = 0; digit <= limit; digit++) {
                        // A zero before the first real digit is only a leading zero.
                        const nextStarted = started === 1 || digit !== 0;
                        
                        // I reject the forbidden digit only after the number has started.
                        if (nextStarted && digit === d) {
                            continue;
                        }
                        
                        // The next state stays tight only when the chosen digit
                        // is exactly equal to n's current digit.
                        const nextTight =
                            tight === 1 && digit === limit ? 1 : 0;
                        
                        // I add the number of ways from the current state
                        // to the corresponding next state.
                        next[nextTight][nextStarted ? 1 : 0] +=
                            dp[tight][started];
                    }
                }
            }
            
            // I move to the DP table for the next digit position.
            dp = next;
        }
        
        // I count only numbers that actually started.
        // The state with started = 0 represents only the number 0.
        return dp[0][1] + dp[1][1];
    }
}
```

### Python3

```python
class Solution:

    def countWithout(self, n: int, d: int) -> int:
        # I convert n to a string so I can process its digits from left to right.
        s = str(n)

        # dp[tight][started] stores the number of valid ways for the processed prefix.
        # tight = 1 means the prefix is equal to n's prefix.
        # started = 1 means I have already placed a real digit.
        dp = [
            [0, 0],
            [1, 0]
        ]

        # I process every digit of n one by one.
        for current in s:
            # I create the DP table for the next position.
            next_dp = [
                [0, 0],
                [0, 0]
            ]

            # I check all possible tight and started states.
            for tight in range(2):
                for started in range(2):
                    # I skip states that have no possible numbers.
                    if dp[tight][started] == 0:
                        continue

                    # A tight state cannot choose a digit larger than n's digit.
                    # A non-tight state can choose any digit from 0 to 9.
                    limit = int(current) if tight else 9

                    # I try every possible digit for this position.
                    for digit in range(limit + 1):
                        # A leading zero does not start the number.
                        next_started = started == 1 or digit != 0

                        # I reject d only when the number has actually started.
                        # This correctly handles the special case d = 0.
                        if next_started and digit == d:
                            continue

                        # The next state is tight only when the chosen digit
                        # is exactly the current digit of n.
                        next_tight = 1 if tight and digit == limit else 0

                        # I add all ways from the current state to the next state.
                        next_dp[next_tight][int(next_started)] += dp[tight][started]

            # I continue processing with the states for the next digit.
            dp = next_dp

        # I count only states where the number has started.
        # The state where started = 0 represents number 0, so I exclude it.
        return dp[0][1] + dp[1][1]
```

### C

```c
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four main implementations use the same Digit DP idea. The syntax changes between languages, but the logic remains the same.

### 1. Convert `n` into digits

I first need to process `n` from left to right.

For example:

```text
n = 25
digits = 2, 5
```

Working with individual digits makes it possible to decide which digits can be selected at every position.

In C++, I can convert `n` to a string using `to_string`.

In Java, I use `String.valueOf`.

In JavaScript, I use `String(n)`.

In Python, I use `str(n)`.

This avoids repeatedly dividing `n` by 10 and makes the Digit DP easier to understand.

### 2. Create the DP state

The important state is:

```text
dp[tight][started]
```

There are only four possible states.

```text
tight = 0, started = 0
tight = 0, started = 1
tight = 1, started = 0
tight = 1, started = 1
```

`tight` tells me whether I am still matching the prefix of `n`.

`started` tells me whether the actual number has begun.

At the beginning:

```text
tight = 1
started = 0
```

I have not selected any digits yet, and I am exactly at the upper limit represented by `n`.

### 3. Find the digit limit

For each position, I calculate the maximum digit I can choose.

If `tight = 1`, the maximum digit is the corresponding digit of `n`.

For example, if the current digit of `n` is `5`, I can select:

```text
0, 1, 2, 3, 4, 5
```

I cannot select `6`, because that would make the constructed number larger than `n`.

If `tight = 0`, I can select any digit:

```text
0, 1, 2, 3, 4, 5, 6, 7, 8, 9
```

because the number is already smaller than `n`.

### 4. Try every possible digit

For every state, I try each digit between `0` and the calculated limit.

This lets the DP represent all possible numbers without explicitly generating every number.

For example, with `n = 25`, the first digit can be:

```text
0, 1, 2
```

Choosing `0` or `1` makes the number smaller than `25`.

Choosing `2` keeps the number tight, so the second digit is restricted to `0` through `5`.

### 5. Handle leading zeros

This is one of the most important parts of the solution.

Suppose I am building the number `5`.

Because the maximum number has two digits, the DP may represent it as:

```text
05
```

But the first `0` is not really part of the number.

So I use the `started` state.

If the number has not started and I select `0`, it remains unstarted.

Once I select a non-zero digit, the number starts.

This also solves the special case where:

```text
d = 0
```

For example, the number `5` should be valid when digit `0` is forbidden. Its imaginary leading zero must not cause it to be rejected.

### 6. Reject the forbidden digit

Once the number has started, I check whether the selected digit equals `d`.

If it does, I skip that choice.

For example, if:

```text
d = 3
```

then these numbers are rejected:

```text
3
13
23
30
31
32
33
...
```

The check is performed during construction, so invalid numbers never enter the final count.

### 7. Update `tight`

After selecting a digit, I determine whether the next state is still tight.

If I was tight and selected exactly the current digit of `n`, the next state remains tight.

For example, when `n = 25`:

```text
choose 2 -> still tight
```

because the chosen prefix is exactly the prefix of `25`.

But:

```text
choose 1 -> no longer tight
```

because every number beginning with `1` is already smaller than `25`.

Once a state becomes non-tight, it remains non-tight for the remaining positions.

### 8. Move to the next position

After trying all possible digits for the current position, I replace the current DP table with the newly calculated table.

This means the algorithm only needs the states for the current and next positions.

I do not need to store every possible number.

### 9. Exclude zero

The DP also represents the number `0`.

It happens when I choose only leading zeros and never start the number.

But the problem asks for numbers from `1` to `n`.

So I only add states where:

```text
started = 1
```

This removes zero from the final answer automatically.

### 10. Why this works efficiently

A brute-force solution could check every number from `1` to `n`.

That would take approximately `O(n log n)` time because each number may require checking several digits.

With `n` up to `10^9`, that is unnecessary.

The Digit DP only processes the digits of `n`.

If `n` has `k` digits, there are only:

```text
k × 2 × 2 × 10
```

roughly considered transitions.

Since `k` is at most 10 for the given constraint, this is extremely small.

## Examples

### Example 1

Input:

```text
n = 25
d = 3
```

The numbers containing digit `3` between `1` and `25` are:

```text
3, 13, 23
```

There are 3 invalid numbers.

So:

```text
25 - 3 = 22
```

Expected Output:

```text
22
```

The Digit DP reaches the same result without checking all 25 numbers individually.

### Example 2

Input:

```text
n = 5
d = 3
```

The numbers are:

```text
1, 2, 3, 4, 5
```

Only `3` contains the forbidden digit.

Therefore:

```text
5 - 1 = 4
```

Expected Output:

```text
4
```

### Example 3

Input:

```text
n = 10
d = 0
```

The numbers from `1` to `10` are:

```text
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

Only `10` contains digit `0`.

The leading zeros used internally by Digit DP are ignored because the number has not started yet.

Expected Output:

```text
9
```

## How to Use / Run Locally

The repository contains solutions for multiple programming languages. The code can be copied into the appropriate source file and tested with custom input according to the GeeksforGeeks function signature.

### C++

Save the solution in a `.cpp` file.

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it using:

```bash
./solution
```

### Java

Save the solution in a Java file.

Compile it using:

```bash
javac Solution.java
```

Run it using:

```bash
java Solution
```

The class name should match the filename when running a standalone Java program.

### JavaScript

Save the solution in a `.js` file.

Run it using Node.js:

```bash
node solution.js
```

Make sure Node.js is installed on your system before running the file.

### Python3

Save the solution in a `.py` file.

Run it using:

```bash
python3 solution.py
```

Python does not require a separate compilation step.

### GeeksforGeeks

For GeeksforGeeks, the platform provides the input and calls the required `countWithout` function. The submitted solution should therefore keep the required `Solution` class and method signature.

## Notes & Optimizations

The main optimization is avoiding brute force.

A simple approach would loop from `1` to `n` and check whether each number contains `d`. That approach becomes expensive for large `n`.

Digit DP is much better because it works with the number of digits instead of the value of `n`.

The `started` state is especially important when `d = 0`. Without it, leading zeros could incorrectly make valid numbers look invalid.

The `tight` state is what keeps the generated numbers within the range `0` to `n`.

No large data structure is required. The DP table contains only a few states, so the memory usage is effectively constant for the given constraints.

Another possible approach is mathematical digit counting, where I count valid choices position by position. However, handling leading zeros and the exact upper bound becomes more error-prone. Digit DP keeps those cases together in one clean state-based solution.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
