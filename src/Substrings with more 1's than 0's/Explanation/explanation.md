# Substrings with More 1's Than 0's

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given a binary string `s` containing only `0`s and `1`s, the task is to count how many substrings contain more `1`s than `0`s.

A substring is a continuous part of the original string.

For example, in the string `"011"`, the valid substrings are:

* `"011"`
* `"1"`
* `"11"`
* `"1"`

So the answer is `4`.

The main challenge is the input size. The string can contain up to `6 × 10^4` characters, so checking every possible substring would be too slow.

This solution uses prefix sums and frequency counting to solve the problem in linear time.

## Constraints

| Constraint         | Value            |   |             |
| ------------------ | ---------------- | - | ----------- |
| String length      | `1 ≤             | s | ≤ 6 × 10^4` |
| Allowed characters | `0` and `1` only |   |             |

The large input size means an `O(n²)` brute-force solution is not fast enough. An optimized `O(n)` solution is needed.

## Intuition

The first thing I noticed was that the problem becomes easier if I stop thinking about counting `0`s and `1`s separately.

I can treat:

* `'1'` as `+1`
* `'0'` as `-1`

Now a substring has more `1`s than `0`s exactly when its total sum is positive.

For example:

```text
"011" → -1, +1, +1
```

The full substring has a sum of:

```text
-1 + 1 + 1 = 1
```

Since the sum is positive, the substring has more `1`s than `0`s.

This naturally leads to prefix sums.

If the prefix sum before a substring is `a` and the prefix sum at the end of that substring is `b`, then the substring sum is:

```text
b - a
```

For the substring to have more `1`s than `0`s:

```text
b - a > 0
```

So:

```text
b > a
```

This means that for every current prefix sum, I need to count how many earlier prefix sums are smaller than it.

A Fenwick Tree can solve this in `O(n log n)`, but there is an important property in this problem: every new character changes the prefix sum by exactly `+1` or `-1`.

That allows me to maintain the number of smaller prefix sums directly in constant time.

## Approach

I keep track of four values:

1. `prefix` stores the current prefix sum.
2. `freq` stores how many times each prefix sum has appeared.
3. `smaller` stores how many previous prefix sums are smaller than the current prefix sum.
4. `answer` stores the total number of valid substrings.

Before processing the string, the prefix sum is `0`. This represents the empty prefix, so its frequency starts at `1`.

Then I process the string from left to right.

When the current character is `'1'`:

* The prefix sum moves from `p` to `p + 1`.
* Prefix sums equal to `p` now become smaller than the new prefix sum.
* I add their frequency to `smaller`.

When the current character is `'0'`:

* The prefix sum moves from `p` to `p - 1`.
* Prefix sums equal to `p - 1` were smaller before, but now they are equal to the new prefix sum.
* I subtract their frequency from `smaller`.

After updating the current prefix sum, `smaller` tells me exactly how many valid substrings end at the current position.

I add that value to the final answer.

Finally, I increase the frequency of the current prefix sum so it can be used by future positions.

## Data Structures Used

### Frequency Array

A frequency array stores how many times every prefix sum has appeared.

For a string of length `n`, the prefix sum can range from `-n` to `n`.

Normal arrays cannot use negative indices in languages like C++, Java, and JavaScript, so I use an offset of `n`.

For example:

```text
Actual prefix sum: -2
Stored index:      -2 + n
```

This keeps every index valid.

The frequency array gives constant-time access to the number of times a particular prefix sum has appeared.

### Integer Variables

A few integer variables are used to track:

* the current prefix sum
* the number of smaller previous prefix sums
* the final answer
* the offset used for array indexing

No tree, map, set, or sorting operation is needed.

## Operations & Behavior Summary

The algorithm works like this:

1. Create a frequency array for all possible prefix sums.
2. Store the empty prefix with sum `0`.
3. Start the current prefix sum at `0`.
4. Start the number of smaller previous prefix sums at `0`.
5. Process every character from left to right.
6. If the character is `'1'`, increase the range of smaller prefix sums.
7. If the character is `'0'`, remove prefix sums that are no longer smaller.
8. Add the current number of smaller prefix sums to the answer.
9. Store the current prefix sum in the frequency array.
10. Return the final answer.

The key idea is that the prefix sum moves only one step at a time.

Because of this, I do not need to search all previous prefix sums after every character. I only update the one boundary value that changed.

## Complexity

| Complexity       | Value  | Explanation                                                       |
| ---------------- | ------ | ----------------------------------------------------------------- |
| Time Complexity  | `O(n)` | Every character in the binary string is processed exactly once.   |
| Space Complexity | `O(n)` | A frequency array stores counts for prefix sums from `-n` to `n`. |

Here, `n` is the length of the input binary string.

Every operation inside the loop takes constant time, so the overall solution is linear.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countSubstring(string& s) {
        int n = s.size();

        // Prefix sums can range from -n to n.
        // The offset lets me store negative sums in a normal array.
        int offset = n;
        vector<int> freq(2 * n + 1, 0);

        // The empty prefix has sum 0 and appears once.
        freq[offset] = 1;

        int prefix = 0;

        // This stores how many previous prefix sums
        // are smaller than the current prefix sum.
        long long smaller = 0;

        // I use long long internally to safely store the total count.
        long long answer = 0;

        for (char ch : s) {
            if (ch == '1') {
                // The prefix sum moves from prefix to prefix + 1.
                // Prefix sums equal to the old value now become smaller.
                smaller += freq[prefix + offset];

                // A '1' contributes +1.
                prefix++;
            } else {
                // The new prefix sum will be prefix - 1.
                // Values equal to that new sum are no longer smaller.
                smaller -= freq[prefix - 1 + offset];

                // A '0' contributes -1.
                prefix--;
            }

            // Every smaller previous prefix creates one valid substring
            // ending at the current position.
            answer += smaller;

            // Store the current prefix for future positions.
            freq[prefix + offset]++;
        }

        return static_cast<int>(answer);
    }
};
```

### Java

```java
class Solution {
    public int countSubstring(String s) {
        int n = s.length();

        // Prefix sums can range from -n to n.
        // The offset converts them into valid array indices.
        int offset = n;
        int[] freq = new int[2 * n + 1];

        // The empty prefix has sum 0 and appears once.
        freq[offset] = 1;

        int prefix = 0;

        // This stores the number of previous prefix sums
        // smaller than the current prefix sum.
        long smaller = 0;

        // I use long internally to safely store the total count.
        long answer = 0;

        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '1') {
                // Moving from prefix to prefix + 1 means
                // old equal values now become smaller.
                smaller += freq[prefix + offset];

                // A '1' adds 1 to the prefix sum.
                prefix++;
            } else {
                // The new prefix will be prefix - 1.
                // Values equal to it must be removed from the smaller count.
                smaller -= freq[prefix - 1 + offset];

                // A '0' subtracts 1 from the prefix sum.
                prefix--;
            }

            // These are all valid substrings ending at this position.
            answer += smaller;

            // Save the current prefix sum for future positions.
            freq[prefix + offset]++;
        }

        return (int) answer;
    }
}
```

### JavaScript

```javascript
class Solution {
    countSubstring(s) {
        const n = s.length;

        // Prefix sums stay between -n and n.
        // The offset lets me use every sum as an array index.
        const offset = n;
        const freq = new Array(2 * n + 1).fill(0);

        // The empty prefix has sum 0 and appears once.
        freq[offset] = 1;

        let prefix = 0;

        // This stores how many previous prefix sums
        // are smaller than the current prefix sum.
        let smaller = 0;

        // This stores the total number of valid substrings.
        let answer = 0;

        for (const ch of s) {
            if (ch === '1') {
                // The prefix moves from prefix to prefix + 1.
                // Old equal prefix sums now become smaller.
                smaller += freq[prefix + offset];

                // A '1' contributes +1.
                prefix++;
            } else {
                // The new prefix will be prefix - 1.
                // Values equal to it are no longer smaller.
                smaller -= freq[prefix - 1 + offset];

                // A '0' contributes -1.
                prefix--;
            }

            // Each smaller previous prefix gives one valid substring.
            answer += smaller;

            // Store the current prefix sum for later positions.
            freq[prefix + offset]++;
        }

        return answer;
    }
};
```

### Python3

```python
class Solution:
    def countSubstring(self, s):
        n = len(s)

        # Prefix sums can range from -n to n.
        # The offset changes negative sums into valid array indices.
        offset = n
        freq = [0] * (2 * n + 1)

        # The empty prefix has sum 0 and appears once.
        freq[offset] = 1

        prefix = 0

        # This stores how many previous prefix sums
        # are smaller than the current prefix sum.
        smaller = 0

        # This stores the total number of valid substrings.
        answer = 0

        for ch in s:
            if ch == '1':
                # The prefix moves from prefix to prefix + 1.
                # Old equal values now become smaller.
                smaller += freq[prefix + offset]

                # A '1' contributes +1.
                prefix += 1
            else:
                # The new prefix will be prefix - 1.
                # Values equal to it are no longer smaller.
                smaller -= freq[prefix - 1 + offset]

                # A '0' contributes -1.
                prefix -= 1

            # Every smaller previous prefix creates a valid substring.
            answer += smaller

            # Store this prefix sum for future positions.
            freq[prefix + offset] += 1

        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main logic is the same in C++, Java, JavaScript, and Python3.

### 1. Find the string length

First, I get the length of the binary string.

This value is needed for two reasons.

It tells me how many characters must be processed, and it also gives the maximum possible range of prefix sums.

For a string of length `n`:

* the minimum possible prefix sum is `-n`
* the maximum possible prefix sum is `n`

### 2. Create the frequency storage

I create a frequency array large enough to store every possible prefix sum.

The required range is:

```text
-n to n
```

That gives a total of:

```text
2n + 1
```

possible values.

Since negative array indices are not valid in C++, Java, and JavaScript, I shift every prefix sum by an offset of `n`.

Python supports negative list indices, but using the same offset-based logic keeps the implementation consistent and avoids accidental access from the end of the list.

### 3. Store the empty prefix

Before reading any character, the prefix sum is `0`.

I count this empty prefix once.

This step is important because it allows substrings starting from index `0` to be counted.

Suppose the current prefix sum is positive. The empty prefix sum `0` is smaller than it, so the substring from the beginning of the string to the current position is valid.

Without storing the empty prefix, such substrings would be missed.

### 4. Start the current prefix sum

The current prefix sum starts at `0`.

Whenever I see:

```text
'1' → add 1
'0' → subtract 1
```

The prefix sum therefore represents:

```text
number of 1s - number of 0s
```

from the beginning of the string to the current position.

### 5. Maintain the smaller count

The `smaller` value stores how many previous prefix sums are smaller than the current prefix sum.

Each smaller previous prefix sum represents one valid substring ending at the current position.

This works because:

```text
current prefix - previous prefix > 0
```

means the substring between them has a positive sum.

A positive sum means the substring contains more `1`s than `0`s.

### 6. Process a `'1'`

Suppose the current prefix sum is `p`.

After reading `'1'`, it becomes:

```text
p + 1
```

Before this move, `smaller` already contains the number of previous prefix sums below `p`.

After moving to `p + 1`, all previous prefix sums equal to `p` also become smaller.

So I add:

```text
frequency of p
```

to `smaller`.

Then I increase the prefix sum.

### 7. Process a `'0'`

Suppose the current prefix sum is `p`.

After reading `'0'`, it becomes:

```text
p - 1
```

Before this move, previous prefix sums equal to `p - 1` were smaller than `p`.

After the move, they are equal to the new prefix sum.

Equal prefix sums produce a substring sum of `0`, not a positive sum.

So I subtract:

```text
frequency of p - 1
```

from `smaller`.

Then I decrease the prefix sum.

### 8. Add valid substrings to the answer

After updating the prefix sum and the `smaller` count, every value counted in `smaller` represents a valid substring ending at the current index.

I add `smaller` to the total answer.

This counts all valid substrings grouped by their ending position.

### 9. Store the current prefix sum

Only after counting the valid substrings do I add the current prefix sum to the frequency array.

The order matters.

If I stored the current prefix sum too early, the current position could be compared with itself.

That would represent an empty substring, which is not part of the problem.

### Language-specific behavior

The algorithm does not change between the four languages.

In C++, `long long` is useful for internal counting.

In Java, `long` can safely hold the running answer.

In JavaScript, `Number` is safe for the given constraints because the maximum number of substrings is far below the maximum safe integer limit.

In Python3, normal integers automatically grow when needed, so there is no fixed integer overflow issue.

## Examples

### Example 1

Input:

```text
s = "011"
```

Expected Output:

```text
4
```

Trace:

Start with the empty prefix:

```text
prefix = 0
```

Read `'0'`:

```text
prefix = -1
valid substrings ending here = 0
```

Read `'1'`:

```text
prefix = 0
valid substrings ending here = 1
```

The valid substring is:

```text
"1"
```

Read the final `'1'`:

```text
prefix = 1
valid substrings ending here = 3
```

The valid substrings ending here are:

```text
"011"
"11"
"1"
```

Total:

```text
0 + 1 + 3 = 4
```

### Example 2

Input:

```text
s = "0000"
```

Expected Output:

```text
0
```

Every character decreases the prefix sum.

There is never a previous prefix sum smaller than the current one.

So no substring contains more `1`s than `0`s.

### Example 3

Input:

```text
s = "111"
```

Expected Output:

```text
6
```

Every possible substring contains only `1`s, so all substrings are valid.

The total number of substrings is:

```text
3 × 4 / 2 = 6
```

The valid substring counts by ending position are:

```text
1 + 2 + 3 = 6
```

## How to Use / Run Locally

### C++

Save the solution in a file named:

```text
main.cpp
```

Compile it with:

```bash
g++ main.cpp -o main
```

Run it with:

```bash
./main
```

On Windows Command Prompt, run:

```bash
main.exe
```

### Java

Save the solution in a file named:

```text
Main.java
```

Compile it with:

```bash
javac Main.java
```

Run it with:

```bash
java Main
```

Make sure the public class name matches the file name when running the code locally.

### JavaScript

Save the solution in a file named:

```text
main.js
```

Run it using Node.js:

```bash
node main.js
```

Node.js must be installed on the system before running the command.

### Python3

Save the solution in a file named:

```text
main.py
```

Run it with:

```bash
python3 main.py
```

On some systems, the command may be:

```bash
python main.py
```

The GeeksforGeeks submission format usually provides only the required solution class and method. For local testing, a small driver program must be added to create test input and call the solution method.

## Notes & Optimizations

A simple brute-force solution can generate every substring and count its `0`s and `1`s. That approach can take `O(n³)` time if each substring is checked separately.

Using prefix sums improves the brute-force approach to `O(n²)`, but this is still too slow for the maximum input size.

A Fenwick Tree with coordinate compression can count smaller prefix sums in `O(n log n)` time. That is a common solution for problems involving prefix sum comparisons.

However, this binary string problem has a useful property: every prefix sum changes by exactly `+1` or `-1`.

The linear-time solution takes advantage of that property and updates only the boundary of the smaller-prefix count.

Important edge cases include:

* a string containing only `0`s
* a string containing only `1`s
* a string of length `1`
* alternating `0`s and `1`s
* substrings starting from index `0`
* repeated equal prefix sums

The empty prefix must be stored before processing the string. Without it, valid substrings starting from the first character would not be counted.

The current prefix sum must be added to the frequency array only after the answer is updated. Changing this order can incorrectly count an empty substring.

This prefix sum and frequency array technique gives the best possible `O(n)` time complexity because every character must be read at least once.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
