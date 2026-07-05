# Max Gap Between Two Same Characters

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

The problem gives us a string `s` containing only lowercase English letters.

We need to find the maximum number of characters present between any two identical characters in the string.

For example, in the string `"socks"`, the character `'s'` appears at the beginning and at the end. There are three characters between them: `'o'`, `'c'`, and `'k'`. So the answer is `3`.

If no character appears more than once, we return `-1`.

The main goal is to solve the Max Gap Between Two Same Characters problem efficiently without checking every possible pair of positions.

## Constraints

| Constraint               | Value                                         |   |         |
| ------------------------ | --------------------------------------------- | - | ------- |
| String length            | `1 ≤                                          | s | ≤ 10^5` |
| Characters               | Lowercase English letters from `'a'` to `'z'` |   |         |
| Expected time complexity | `O(n)`                                        |   |         |
| Expected auxiliary space | `O(1)`                                        |   |         |

Here, `n` is the length of the input string.

## Intuition

My first thought was to compare every character with all the characters that come after it. Whenever I found two equal characters, I could calculate the number of characters between them.

That approach would work, but it could take `O(n²)` time. With a string length of up to `10^5`, it would be too slow.

Then I noticed that for any character, the maximum gap always comes from its earliest occurrence and its farthest later occurrence.

So I do not need to store every position.

I only need to remember where each character appeared for the first time. Whenever the same character appears again, I calculate the gap from that first position.

This gives an efficient `O(n)` string algorithm.

## Approach

I use an array of size `26` because the input contains only lowercase English letters.

Each array position represents one character:

* Index `0` represents `'a'`.
* Index `1` represents `'b'`.
* Index `2` represents `'c'`.
* The pattern continues up to index `25`, which represents `'z'`.

Initially, every position stores `-1`. This means that the character has not appeared yet.

Then I scan the string from left to right.

For each character, I convert it into an index between `0` and `25`.

If its stored position is `-1`, I save the current index as its first occurrence.

If the character has already appeared, I calculate the gap using:

`current index - first index - 1`

I compare this gap with the maximum gap found so far.

I never replace the first occurrence because the earliest position gives the largest possible distance when the same character appears again later.

If no character repeats, the answer remains `-1`.

## Data Structures Used

The solution uses a fixed-size array of `26` integers.

This array stores the first occurrence index of every lowercase English letter.

I chose an array instead of a hash map because the character set is fixed and contains only 26 possible values. Array access is simple, fast, and uses constant extra space.

I also use one variable to store the maximum gap found so far.

No dynamic data structure is needed.

## Operations & Behavior Summary

The algorithm works in these major stages:

1. Create an array of size `26`.
2. Fill every position with `-1`.
3. Set the maximum gap to `-1`.
4. Start scanning the string from left to right.
5. Convert the current character into an array index.
6. Check whether the character has appeared before.
7. If it is the first occurrence, store the current position.
8. If it is a repeated occurrence, calculate the number of characters between the two positions.
9. Update the maximum gap if the new gap is larger.
10. Return the final maximum gap.

The string is scanned only once, which keeps the solution efficient even for large inputs.

## Complexity

| Complexity       | Value  | Explanation                                                                |
| ---------------- | ------ | -------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | I scan all `n` characters of the string exactly once.                      |
| Space Complexity | `O(1)` | I use a fixed array of size `26`, which does not grow with the input size. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxCharGap(string &s) {
        // firstPos[i] stores the first index where each letter appeared
        vector<int> firstPos(26, -1);

        // I keep -1 so the answer stays correct if no character repeats
        int maxGap = -1;

        // I scan the string once from left to right
        for (int i = 0; i < s.size(); i++) {
            // Convert the current lowercase letter into an index from 0 to 25
            int index = s[i] - 'a';

            // If this is the first occurrence, I store its position
            if (firstPos[index] == -1) {
                firstPos[index] = i;
            } else {
                // Subtract 1 because I only count characters between the two matches
                int gap = i - firstPos[index] - 1;

                // Keep the largest gap found so far
                maxGap = max(maxGap, gap);
            }
        }

        // Returns -1 automatically if no character appeared twice
        return maxGap;
    }
};
```

### Java

```java
class Solution {
    public int maxCharGap(String s) {
        // firstPos[i] stores the first index where each letter appeared
        int[] firstPos = new int[26];

        // Fill with -1 to mark every character as unseen
        java.util.Arrays.fill(firstPos, -1);

        // I keep -1 so the answer stays correct if no character repeats
        int maxGap = -1;

        // I scan the string once from left to right
        for (int i = 0; i < s.length(); i++) {
            // Convert the current lowercase letter into an index from 0 to 25
            int index = s.charAt(i) - 'a';

            // If this is the first occurrence, I store its position
            if (firstPos[index] == -1) {
                firstPos[index] = i;
            } else {
                // Subtract 1 because I only count characters between the two matches
                int gap = i - firstPos[index] - 1;

                // Keep the largest gap found so far
                maxGap = Math.max(maxGap, gap);
            }
        }

        // Returns -1 automatically if no character appeared twice
        return maxGap;
    }
};
```

### JavaScript

```javascript
class Solution {
    maxCharGap(s) {
        // firstPos[i] stores the first index where each letter appeared
        const firstPos = new Array(26).fill(-1);

        // I keep -1 so the answer stays correct if no character repeats
        let maxGap = -1;

        // I scan the string once from left to right
        for (let i = 0; i < s.length; i++) {
            // Convert the current lowercase letter into an index from 0 to 25
            const index = s.charCodeAt(i) - 97;

            // If this is the first occurrence, I store its position
            if (firstPos[index] === -1) {
                firstPos[index] = i;
            } else {
                // Subtract 1 because I only count characters between the two matches
                const gap = i - firstPos[index] - 1;

                // Keep the largest gap found so far
                maxGap = Math.max(maxGap, gap);
            }
        }

        // Returns -1 automatically if no character appeared twice
        return maxGap;
    }
};
```

### Python3

```python
class Solution:

    def maxCharGap(self, s: str) -> int:
        # first_pos[i] stores the first index where each letter appeared
        first_pos = [-1] * 26

        # I keep -1 so the answer stays correct if no character repeats
        max_gap = -1

        # I scan the string once from left to right
        for i in range(len(s)):
            # Convert the current lowercase letter into an index from 0 to 25
            index = ord(s[i]) - ord('a')

            # If this is the first occurrence, I store its position
            if first_pos[index] == -1:
                first_pos[index] = i
            else:
                # Subtract 1 because I only count characters between the two matches
                gap = i - first_pos[index] - 1

                # Keep the largest gap found so far
                max_gap = max(max_gap, gap)

        # Returns -1 automatically if no character appeared twice
        return max_gap
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic stays the same in C++, Java, JavaScript, and Python3. Only the syntax used to create arrays, access characters, and convert characters into numeric indexes changes.

First, I create storage for 26 positions.

Each position belongs to one lowercase English letter. The purpose of this storage is to remember the first index where each character appeared.

Every position starts with `-1`.

I use `-1` because valid string indexes start from `0`. This makes it easy to distinguish between a character that has not appeared and a character that first appeared at index `0`.

Next, I initialize the answer as `-1`.

This handles the case where no character repeats. If the string contains only unique characters, no valid gap is calculated, so the answer naturally stays `-1`.

Then I scan the string from left to right.

For every character, I convert it into a number from `0` to `25`.

In C++ and Java, this can be done by subtracting `'a'` from the current character.

In JavaScript, character codes can be used to get the same numeric index.

In Python3, `ord()` can convert a character into its numeric value before subtracting the value of `'a'`.

After finding the character index, I check its stored first position.

If the stored value is `-1`, I know this is the first occurrence. I save the current string index.

If the stored value is not `-1`, the character has appeared before. I calculate the gap between its first occurrence and the current occurrence.

The formula is:

`current index - first occurrence index - 1`

The final `-1` matters because the problem asks for the number of characters between the two equal characters.

For example, if the matching characters are at indexes `0` and `4`, their distance is `4`, but only three characters are actually between them. So the correct gap is:

`4 - 0 - 1 = 3`

After calculating the gap, I compare it with the current maximum answer.

I keep the larger value.

One important decision is that I do not update the stored first occurrence when a character repeats.

Suppose a character appears at indexes `1`, `5`, and `10`.

If I replaced index `1` with index `5`, I would lose the chance to calculate the larger gap between indexes `1` and `10`.

By keeping index `1`, every later occurrence is automatically compared with the earliest possible position.

The same reasoning applies to all four language versions. The implementation syntax changes, but the algorithm and behavior remain identical.

## Examples

### Example 1

**Input:**

`"socks"`

**Expected Output:**

`3`

**Trace:**

The first `'s'` appears at index `0`, so I store that position.

The characters `'o'`, `'c'`, and `'k'` appear for the first time, so I store their positions too.

The second `'s'` appears at index `4`.

The gap is:

`4 - 0 - 1 = 3`

So the answer is `3`.

### Example 2

**Input:**

`"for"`

**Expected Output:**

`-1`

**Trace:**

The characters `'f'`, `'o'`, and `'r'` each appear only once.

No repeated character is found, so the answer remains `-1`.

### Example 3

**Input:**

`"abcaad"`

**Expected Output:**

`3`

**Trace:**

The first `'a'` appears at index `0`.

Another `'a'` appears at index `3`, giving:

`3 - 0 - 1 = 2`

The next `'a'` appears at index `4`, giving:

`4 - 0 - 1 = 3`

The maximum gap is therefore `3`.

## How to Use / Run Locally

First, clone the repository and open the project folder in a terminal.

### C++

Save the solution in a file such as `solution.cpp`.

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

Save the solution in a file with the correct class name.

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

### JavaScript

Make sure Node.js is installed.

Save the solution in a file such as `solution.js`.

Run it with:

```bash
node solution.js
```

### Python3

Save the solution in a file such as `solution.py`.

Run it with:

```bash
python3 solution.py
```

On some systems, use:

```bash
python solution.py
```

## Notes & Optimizations

A brute-force solution could check every pair of characters, but that would take `O(n²)` time in the worst case.

Another possible approach is to store every occurrence index of every character. That works, but it uses more memory than needed.

The optimized solution stores only the first occurrence of each character.

This works because the maximum gap for a character always uses its earliest occurrence and some later occurrence. Keeping the earliest index gives the best possible chance of finding the largest gap.

A hash map could also store the first occurrence positions. However, since the problem contains only 26 lowercase English letters, a fixed-size array is simpler and more memory-efficient.

Important edge cases include:

* A string with only one character returns `-1`.
* A string with no repeated characters returns `-1`.
* Two identical adjacent characters give a gap of `0`.
* A character appearing many times should always be compared with its first occurrence.
* Multiple repeated characters are handled by keeping the largest gap among all of them.

The final solution is a clean one-pass algorithm for the Max Gap Between Two Same Characters problem. It runs in linear time and uses constant extra space, making it suitable for the given constraint of up to `10^5` characters.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
