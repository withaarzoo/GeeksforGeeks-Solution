# Transform String

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

In this Transform String problem, I need to find the minimum number of operations required to convert string `s1` into string `s2`.

The only allowed operation is simple: I can select any character from `s1`, remove it from its current position, and insert it at the beginning of the same string.

The goal is to return the minimum number of such operations. If the transformation is impossible, I return `-1`.

The important thing I noticed is that this operation never changes the length of the string and never changes the total frequency of any character. It only changes the order of characters.

This makes the problem a greedy string transformation problem rather than a dynamic programming problem.

## Constraints

| Constraint               | Value                      |
| ------------------------ | -------------------------- |
| Length of `s1`           | `1 <= s1.length() <= 10^4` |
| Length of `s2`           | `1 <= s2.length() <= 10^4` |
| Expected Time Complexity | `O(n)`                     |
| Expected Auxiliary Space | `O(1)`                     |

## Intuition

My first thought was to understand what happens to the characters that I do not move.

Whenever I pick a character and move it to the front, the relative order of all other characters stays the same. That means some suffix of the original string can remain untouched during the transformation.

So instead of trying to simulate every possible move, I look for characters that can already stay in the correct relative order.

I compare both strings from right to left.

If the current characters match, I can keep that character as part of the unchanged suffix.

If they do not match, the current character from `s1` cannot remain there, so I have to move it to the front. I count one operation and continue moving left.

Before doing this, I also check whether both strings contain exactly the same characters with the same frequencies. If they do not, the transformation is impossible.

## Approach

1. Check whether `s1` and `s2` have the same length.
2. Compare the frequency of every character in both strings.
3. If the frequencies are different, return `-1`.
4. Start from the last index of both strings.
5. If `s1[i]` matches `s2[j]`, this character can remain unchanged. Move both pointers left.
6. If they do not match, the character at `s1[i]` must be moved to the front. Increase the operation count and move only `i` left.
7. Continue until all characters of `s2` have been matched.
8. Return the total number of operations.

This greedy approach works because the characters I leave untouched must preserve their original relative order.

## Data Structures Used

* Fixed-size frequency array: I use a frequency array to check whether both strings contain the same characters with the same counts.
* Integer pointers: Two pointers are used to compare `s1` and `s2` from right to left.
* Integer counter: This stores the minimum number of characters that need to be moved to the front.

No dynamic programming table, stack, queue, or extra string is needed.

## Operations & Behavior Summary

The algorithm works in three main stages.

First, I verify that both strings have the same length.

Next, I compare character frequencies. If one string contains a different number of any character, I immediately return `-1`.

Finally, I scan both strings from the end.

* Matching characters are kept as part of the unchanged suffix.
* A mismatching character in `s1` is counted as one operation because it must be moved to the front.
* I continue until the whole target string has been matched.

The final count is the minimum number of front-insertion operations required.

## Complexity

| Complexity       | Value  | Explanation                                                                                            |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| Time Complexity  | `O(n)` | `n` is the length of the strings. I scan the strings and compare character frequencies in linear time. |
| Space Complexity | `O(1)` | I only use a fixed-size frequency array and a few variables, so extra space does not grow with `n`.    |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int transform(string &s1, string &s2) {
        // Store the common string length after checking both strings.
        int n = s1.size();

        // Moving a character does not change string length,
        // so different lengths can never be transformed into each other.
        if (n != (int)s2.size()) {
            return -1;
        }

        // Use a fixed-size array to compare character frequencies.
        // A fixed 256-size array keeps the auxiliary space O(1).
        int freq[256] = {0};

        // Add frequencies from s1 and subtract frequencies from s2.
        // If both strings contain the same characters with the same counts,
        // every value will become zero.
        for (int i = 0; i < n; i++) {
            freq[(unsigned char)s1[i]]++;
            freq[(unsigned char)s2[i]]--;
        }

        // Check whether both strings are made from exactly the same characters.
        for (int i = 0; i < 256; i++) {
            if (freq[i] != 0) {
                return -1;
            }
        }

        // Start from the end because characters that are not moved
        // keep their relative order and form the final unchanged suffix.
        int i = n - 1;
        int j = n - 1;
        int operations = 0;

        // Match s2 from right to left.
        while (i >= 0 && j >= 0) {
            // If both characters match, this character can stay in place.
            if (s1[i] == s2[j]) {
                i--;
                j--;
            } else {
                // Otherwise, s1[i] must be moved to the front,
                // so count one operation and skip it in s1.
                operations++;
                i--;
            }
        }

        // Return the minimum number of characters that must be moved.
        return operations;
    }
};
```

### Java

```java
class Solution {
    int transform(String s1, String s2) {
        // Store the common string length after checking both strings.
        int n = s1.length();

        // Moving a character does not change string length,
        // so different lengths can never be transformed into each other.
        if (n != s2.length()) {
            return -1;
        }

        // Use a fixed-size array to compare character frequencies.
        // Its size is constant, so the auxiliary space remains O(1).
        int[] freq = new int[256];

        // Add frequencies from s1 and subtract frequencies from s2.
        // Equal character counts will make every final frequency zero.
        for (int i = 0; i < n; i++) {
            freq[s1.charAt(i)]++;
            freq[s2.charAt(i)]--;
        }

        // Check whether both strings contain exactly the same characters.
        for (int i = 0; i < 256; i++) {
            if (freq[i] != 0) {
                return -1;
            }
        }

        // Start from the end because unchanged characters keep their order
        // and form the suffix of the final string.
        int i = n - 1;
        int j = n - 1;
        int operations = 0;

        // Match characters of s2 from right to left.
        while (i >= 0 && j >= 0) {
            // A matching character does not need to be moved.
            if (s1.charAt(i) == s2.charAt(j)) {
                i--;
                j--;
            } else {
                // A mismatching character from s1 must be moved to the front.
                operations++;
                i--;
            }
        }

        // Return the minimum number of required moves.
        return operations;
    }
}
```

### JavaScript

```javascript
/**
 * @param {String} s1
 * @param {String} s2
 * @returns {number}
 */

class Solution {
    transform(s1, s2) {
        // Store the common string length after checking both strings.
        const n = s1.length;

        // Moving a character does not change string length,
        // so strings with different lengths cannot be transformed.
        if (n !== s2.length) {
            return -1;
        }

        // Use a fixed-size array to compare character frequencies.
        // The array size is constant, so the extra space is O(1).
        const freq = new Array(256).fill(0);

        // Add frequencies from s1 and subtract frequencies from s2.
        // Matching character counts will leave every value equal to zero.
        for (let i = 0; i < n; i++) {
            freq[s1.charCodeAt(i)]++;
            freq[s2.charCodeAt(i)]--;
        }

        // Check whether both strings contain the same characters
        // with exactly the same frequencies.
        for (let i = 0; i < 256; i++) {
            if (freq[i] !== 0) {
                return -1;
            }
        }

        // Start from the end because characters that stay untouched
        // preserve their order and form the final suffix.
        let i = n - 1;
        let j = n - 1;
        let operations = 0;

        // Match s2 from right to left.
        while (i >= 0 && j >= 0) {
            // A matching character can remain in its current relative position.
            if (s1[i] === s2[j]) {
                i--;
                j--;
            } else {
                // A mismatching character from s1 must be moved to the front.
                operations++;
                i--;
            }
        }

        // Return the minimum number of moves.
        return operations;
    }
}
```

### Python3

```python
class Solution:
    def transform(self, s1, s2): 
        # Moving a character does not change string length,
        # so strings with different lengths cannot be transformed.
        if len(s1) != len(s2):
            return -1

        # Store the common length for easier pointer handling.
        n = len(s1)

        # Use a fixed-size frequency array so extra space stays O(1).
        freq = [0] * 256

        # Add frequencies from s1 and subtract frequencies from s2.
        # Equal character counts will make every value zero.
        for i in range(n):
            freq[ord(s1[i])] += 1
            freq[ord(s2[i])] -= 1

        # Check whether both strings contain exactly the same characters.
        for count in freq:
            if count != 0:
                return -1

        # Start from the end because unchanged characters preserve their order
        # and form the suffix of the final string.
        i = n - 1
        j = n - 1
        operations = 0

        # Match characters of s2 from right to left.
        while i >= 0 and j >= 0:
            # If both characters match, this character can stay untouched.
            if s1[i] == s2[j]:
                i -= 1
                j -= 1
            else:
                # Otherwise, this character from s1 must be moved to the front.
                operations += 1
                i -= 1

        # Return the minimum number of required operations.
        return operations
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in C++, Java, JavaScript, and Python3. Only the syntax for accessing characters and storing frequencies changes.

### Step 1: Check the string lengths

I first compare the lengths of `s1` and `s2`.

Moving a character to the beginning does not add or remove any characters. So if the lengths are different, no valid sequence of operations can transform one string into the other.

In that case, I return `-1` immediately.

### Step 2: Compare character frequencies

Next, I check whether both strings contain the same characters with the same number of occurrences.

For example:

```text
s1 = "abd"
s2 = "bad"
```

Both strings contain one `a`, one `b`, and one `d`, so the transformation is possible.

But for:

```text
s1 = "abc"
s2 = "abd"
```

the transformation is impossible because moving characters cannot change `c` into `d`.

I use a fixed-size frequency array. For every character in `s1`, I increase its count. For every character in `s2`, I decrease its count.

If all final values are zero, both strings have identical character frequencies.

### Step 3: Start comparing from the end

After confirming that transformation is possible, I place one pointer at the end of `s1` and another pointer at the end of `s2`.

I compare from right to left because the characters that are not moved keep their relative order.

Those unchanged characters form a suffix in the final string.

### Step 4: Handle matching characters

If the current characters in both strings are equal, I do not need to move that character.

It can remain part of the unchanged suffix.

So I move both pointers one position to the left.

This means I have successfully matched one more character without using an operation.

### Step 5: Handle mismatching characters

If the characters do not match, the current character in `s1` cannot stay in the unchanged suffix.

Since the allowed operation moves a selected character to the beginning, this character must be moved.

I increase the operation count and move only the `s1` pointer to the left.

I do not move the `s2` pointer because its current character still needs to be matched with another character from `s1`.

### Step 6: Continue until the target is matched

I keep repeating this process.

Each character in `s1` is visited at most once, and both pointers only move from right to left.

That is why the greedy Transform String solution runs in linear time.

## Examples

### Example 1

**Input:**

```text
s1 = "abd"
s2 = "bad"
```

**Expected Output:**

```text
1
```

**Trace:**

* Compare `d` and `d`: they match, so keep both unchanged.
* Compare `b` and `a`: they do not match.
* Move `b` to the front and count one operation.
* Now `a` matches `a`.

The transformation is:

```text
"abd" -> "bad"
```

Minimum operations: `1`.

### Example 2

**Input:**

```text
s1 = "GeeksForGeeks"
s2 = "ForGeeksGeeks"
```

**Expected Output:**

```text
3
```

**Trace:**

The suffix `GeeksGeeks` can remain in the same relative order.

The characters `r`, `o`, and `F` need to be moved to the front in the required order.

So the answer is `3`.

### Example 3

**Input:**

```text
s1 = "abc"
s2 = "abd"
```

**Expected Output:**

```text
-1
```

**Trace:**

The strings have the same length, but their character frequencies are different.

`c` exists in `s1`, while `d` exists in `s2`.

Since the allowed operation only changes positions, the transformation is impossible.

## How to Use / Run Locally

### C++

Save the solution in a file such as `main.cpp`.

Compile it with:

```bash
g++ main.cpp -o main
```

Run it with:

```bash
./main
```

On Windows:

```bash
main.exe
```

### Java

Save the solution in a file named `Solution.java`.

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

### JavaScript

Save the solution in a file such as `solution.js`.

Make sure Node.js is installed, then run:

```bash
node solution.js
```

### Python3

Save the solution in a file such as `solution.py`.

Run it with:

```bash
python3 solution.py
```

Depending on the system, this command may also work:

```bash
python solution.py
```

For the GeeksforGeeks online judge, I only need to submit the required `Solution` class and `transform()` function. I do not need to handle input or output manually.

## Notes & Optimizations

* If both strings have different lengths, the answer is always `-1`.
* If the character frequencies are different, the answer is always `-1`.
* If both strings are already equal, the answer is `0`.
* Comparing from the end is important because untouched characters preserve their relative order.
* I do not physically perform any move. Counting the characters that must be moved is enough.
* A brute-force approach that tries different sequences of operations would be far too slow for strings of length up to `10^4`.
* Dynamic programming is unnecessary because the restricted operation gives the problem a simple greedy structure.
* Using a fixed-size frequency array keeps the auxiliary space constant for standard character sets.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/?utm_source=chatgpt.com)
