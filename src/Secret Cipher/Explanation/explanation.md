# Secret Cipher

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c-1)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

In this Secret Cipher problem, I am given an original string `s` and need to find its smallest encrypted form.

The encryption uses the special character `*`.

While decoding, the string is scanned from left to right. Whenever a normal character is found, it is added to the current original string. Whenever `*` is found, it is removed and all characters written before that `*` are appended again to the current string.

For example, if the current string is `ab` and I use `*`, it becomes `abab`.

So, whenever a string is made by repeating its first half, I can replace the second half with `*`.

For example:

`abab` → `ab*`

The task is to return the lexicographically smallest encrypted string that produces the original string after decoding.

The solution uses the KMP prefix function, also called the LPS or longest prefix-suffix array, to detect repeated prefixes efficiently.

## Constraints

* `1 <= |s| <= 10^5`
* `s` contains lowercase English characters.
* The expected time complexity is `O(n)`.
* The expected auxiliary space complexity is `O(n)`.

Here, `n` is the length of the input string.

## Intuition

My first thought was to look for repeated parts of the string.

If the first half of a prefix is exactly the same as the second half, I do not need to keep both halves. I can keep the first half and replace the second half with `*`.

For example:

`abab` → `ab*`

When `ab*` is decoded, `ab` is read first. Then `*` duplicates everything read so far:

`ab` → `abab`

The problem is that checking every possible prefix by directly comparing its two halves could take too much time. With `n` up to `10^5`, repeatedly comparing substrings could become `O(n²)`.

I therefore use the KMP prefix function.

The prefix function tells me how much of a prefix is also present as a suffix. This gives me the repetition information without repeatedly comparing large substrings.

After building the prefix-function array, I scan the string from right to left. If the current prefix can be represented using `*`, I add `*` to the answer and continue with the first half. Otherwise, I keep the current character.

Because the answer is built backwards, I reverse it at the end.

## Approach

I solve the problem in two main stages.

First, I build the KMP prefix-function array.

For every index `i`, `pi[i]` stores the length of the longest proper prefix of `s[0...i]` that is also a suffix of `s[0...i]`.

Suppose the current prefix has length `len`.

To replace its second half with `*`, two equal halves must exist. Therefore, `len` must be even.

I calculate:

`period = len - pi[i]`

The prefix can be compressed when the prefix-suffix information shows that at least half of the string repeats and the calculated period fits the prefix exactly.

The conditions are:

`pi[i] >= len / 2`

and

`len % (2 * period) == 0`

If both conditions are true, I add `*` to the encrypted result and continue processing only the first half.

If the prefix cannot be compressed, I add the current character normally.

I continue until the complete string has been processed.

Finally, I reverse the answer because I constructed it from right to left.

## Data Structures Used

### Prefix Function Array

I use an integer array `pi` of size `n`.

`pi[i]` stores the longest proper prefix that is also a suffix for the substring ending at index `i`.

This is the main structure that allows me to find repeated patterns in `O(n)` time.

### Result String

I use a result string or a string builder depending on the language.

The encrypted result can contain normal characters and `*`.

I build it from right to left and reverse it at the end.

No stack, map, set, or other complex data structure is needed.

## Operations & Behavior Summary

The algorithm works like this:

1. Find the length `n` of the input string.
2. Create the KMP prefix-function array.
3. Build the prefix function from left to right.
4. Start from the last character of the string.
5. Let `len` be the length of the current prefix.
6. Check whether `len` is even.
7. If it is even, calculate the smallest repeating period using `len - pi[i]`.
8. Check whether the prefix represents two equal halves.
9. If it can be compressed, add `*` to the result.
10. Move the index to the end of the first half.
11. Otherwise, add the current character to the result.
12. Continue until the beginning of the string is reached.
13. Reverse the result.
14. Return the encrypted string.

This avoids checking every substring separately and keeps the overall solution linear.

## Complexity

| Operation                 | Complexity | Explanation                                                                                       |
| ------------------------- | ---------: | ------------------------------------------------------------------------------------------------- |
| Build KMP prefix function |     `O(n)` | Every character is processed efficiently using KMP fallback links.                                |
| Build encrypted string    |     `O(n)` | The backward scan moves through the string without repeatedly revisiting large portions.          |
| Reverse result            |     `O(n)` | The generated result is reversed once at the end.                                                 |
| Total Time                |     `O(n)` | `n` is the length of the input string.                                                            |
| Extra Space               |     `O(n)` | The prefix-function array requires `n` integers, and the result also requires up to `O(n)` space. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string compress(string &s) {
        int n = s.size(); // Store the length so we can work with indices easily.

        vector<int> pi(n, 0); // pi[i] stores the longest prefix that is also a suffix for s[0..i].

        // Build the KMP prefix-function array in O(n).
        for (int i = 1; i < n; i++) {
            int j = pi[i - 1]; // Start with the previous longest matching prefix.

            // If characters do not match, fall back using the KMP prefix links.
            while (j > 0 && s[i] != s[j]) {
                j = pi[j - 1]; // Move to the next smaller possible prefix.
            }

            // Extend the matching prefix when the current characters are equal.
            if (s[i] == s[j]) {
                j++;
            }

            pi[i] = j; // Store the longest prefix-suffix length for this position.
        }

        string ans; // This stores the encrypted string while scanning from right to left.
        ans.reserve(n); // Reserve enough memory to avoid repeated reallocations.

        int i = n - 1; // Start from the last character of the original string.

        // Process the string from right to left.
        while (i >= 0) {
            int len = i + 1; // Current prefix length.

            // A compression needs an even-length prefix.
            if (len % 2 == 0) {
                int period = len - pi[i]; // Smallest repeating period suggested by KMP.

                // Check whether this prefix can be represented using one '*'.
                if (pi[i] >= len / 2 &&
                    len % (2 * period) == 0) {

                    ans.push_back('*'); // Replace the repeated part with '*'.

                    // Only the first half still needs to be processed.
                    i = len / 2;
                    i--; // Move to the last index of that remaining half.

                    continue; // Continue processing from the new position.
                }
            }

            ans.push_back(s[i]); // This character cannot be compressed, so keep it.
            i--; // Move one position to the left.
        }

        reverse(ans.begin(), ans.end()); // We built the answer backwards, so reverse it.

        return ans; // Return the lexicographically smallest encrypted string.
    }
};
```

### Java

```java
class Solution {
    public String compress(String s) {
        int n = s.length(); // Store the length so we can work with indices easily.

        int[] pi = new int[n]; // pi[i] stores the longest prefix-suffix length for s[0..i].

        // Build the KMP prefix-function array in O(n).
        for (int i = 1; i < n; i++) {
            int j = pi[i - 1]; // Start from the previous longest matching prefix.

            // Fall back through KMP links while the characters do not match.
            while (j > 0 && s.charAt(i) != s.charAt(j)) {
                j = pi[j - 1]; // Try the next smaller possible prefix.
            }

            // Extend the matching prefix when the characters are equal.
            if (s.charAt(i) == s.charAt(j)) {
                j++;
            }

            pi[i] = j; // Store the longest prefix-suffix length.
        }

        StringBuilder ans = new StringBuilder(n); // Store the answer efficiently.

        int i = n - 1; // Start processing from the last character.

        // Scan the string from right to left.
        while (i >= 0) {
            int len = i + 1; // Length of the current prefix.

            // A repeated prefix must have an even length.
            if (len % 2 == 0) {
                int period = len - pi[i]; // Smallest repeating period from KMP.

                // Check whether the prefix can be replaced by one '*'.
                if (pi[i] >= len / 2 &&
                    len % (2 * period) == 0) {

                    ans.append('*'); // Store the compression symbol.

                    // Only the first half needs to be considered now.
                    i = len / 2;
                    i--; // Move to the last index of that half.

                    continue; // Continue with the smaller prefix.
                }
            }

            ans.append(s.charAt(i)); // Keep the character when compression is impossible.
            i--; // Move one character to the left.
        }

        return ans.reverse().toString(); // Reverse because the answer was built backwards.
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s
 * @return {string}
 */

class Solution {
    compress(s) {
        const n = s.length; // Store the string length for index calculations.

        const pi = new Array(n).fill(0); // pi[i] stores the longest prefix-suffix length.

        // Build the KMP prefix-function array in O(n).
        for (let i = 1; i < n; i++) {
            let j = pi[i - 1]; // Start with the previous longest matching prefix.

            // Fall back through the KMP prefix links when characters differ.
            while (j > 0 && s[i] !== s[j]) {
                j = pi[j - 1]; // Try the next smaller possible prefix.
            }

            // Extend the prefix when the current characters match.
            if (s[i] === s[j]) {
                j++;
            }

            pi[i] = j; // Save the longest prefix-suffix length for this position.
        }

        const ans = []; // Use an array so building the result stays efficient.

        let i = n - 1; // Start scanning from the last character.

        // Process the string from right to left.
        while (i >= 0) {
            const len = i + 1; // Length of the current prefix.

            // Compression is possible only for an even-length prefix.
            if (len % 2 === 0) {
                const period = len - pi[i]; // Smallest repeating period from KMP.

                // Check whether this prefix can be represented using '*'.
                if (pi[i] >= len / 2 &&
                    len % (2 * period) === 0) {

                    ans.push('*'); // Store the compression symbol.

                    // Skip the part represented by the repeated prefix.
                    i = Math.floor(len / 2) - 1;

                    continue; // Continue processing the remaining prefix.
                }
            }

            ans.push(s[i]); // Keep this character when no compression is possible.
            i--; // Move one position to the left.
        }

        ans.reverse(); // The result was constructed from right to left.

        return ans.join(''); // Convert the character array into the final string.
    }
}
```

### Python3

```python3
class Solution:
    def compress(self, s):
        n = len(s)  # Store the length of the string.

        pi = [0] * n  # pi[i] stores the longest prefix that is also a suffix for s[0:i+1].

        # Build the KMP prefix-function array in O(n).
        for i in range(1, n):
            j = pi[i - 1]  # Start with the previous longest matching prefix.

            # Fall back through KMP links while the characters are different.
            while j > 0 and s[i] != s[j]:
                j = pi[j - 1]  # Try the next smaller possible prefix.

            # Extend the matching prefix when the characters are equal.
            if s[i] == s[j]:
                j += 1

            pi[i] = j  # Store the longest prefix-suffix length.

        ans = []  # Store characters and '*' while scanning backwards.

        i = n - 1  # Start from the last character.

        # Process the string from right to left.
        while i >= 0:
            length = i + 1  # Length of the current prefix.

            # A compressible repeated prefix must have even length.
            if length % 2 == 0:
                period = length - pi[i]  # Smallest repeating period from KMP.

                # Check whether the prefix can be replaced by '*'.
                if (pi[i] >= length // 2 and
                        length % (2 * period) == 0):

                    ans.append('*')  # Replace the repeated part with '*'.

                    # Only the first half still needs to be processed.
                    i = length // 2 - 1

                    continue  # Continue with the remaining prefix.

            ans.append(s[i])  # Keep the current character if compression is impossible.
            i -= 1  # Move one position to the left.

        ans.reverse()  # We built the result from right to left.

        return ''.join(ans)  # Convert the list into the final encrypted string.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all five languages. Only the syntax and string-building methods are different.

### 1. Store the string length

I first store the length of `s` in `n`.

This makes the later index calculations easier and avoids repeatedly calculating the string length.

If the input is:

`ababcababcd`

then:

`n = 11`

### 2. Build the prefix-function array

I create an array `pi` of size `n`.

Initially, every value is zero.

For every position starting from index `1`, I compare the current character with the character at the current prefix length.

If the characters match, I increase the matching prefix length.

If they do not match, I use the previously calculated prefix-function values to jump to a smaller possible prefix.

This is exactly what makes KMP efficient.

Instead of starting from the beginning after every mismatch, I reuse information that has already been calculated.

For example, for:

`abab`

the prefix-function array becomes:

`0 0 1 2`

The final value `2` tells me that `ab` is both a prefix and a suffix.

That is a strong indication that the string has a repeated structure.

### 3. Start processing from the end

After building `pi`, I set the current index to `n - 1`.

I process the string backwards because a valid compression of a larger prefix can reduce the amount of work that remains.

For every position `i`, the current prefix is:

`s[0...i]`

and its length is:

`i + 1`

I store this length in `len`.

### 4. Check whether the length is even

A `*` duplicates everything that came before it.

Therefore, if I want to replace the second half of a prefix with `*`, the prefix must contain two equal-sized parts.

So I only try compression when:

`len % 2 == 0`

For example:

`abab`

has length `4`, so I can check:

`ab | ab`

But:

`abc`

has length `3`, so it cannot be divided into two equal halves.

### 5. Find the repeating period

I calculate:

`period = len - pi[i]`

The prefix-function value tells me how much prefix and suffix overlap.

Subtracting it from the total length gives the smallest repeating period represented by that prefix.

This lets me determine whether the current prefix is made from repeated copies of the same pattern.

### 6. Verify that compression is valid

I use:

`pi[i] >= len / 2`

This makes sure that the prefix and suffix overlap by at least half of the current prefix.

Then I check:

`len % (2 * period) == 0`

This verifies that the detected repeating period fits the current prefix exactly.

Only when both conditions are true do I replace the second half with `*`.

### 7. Add `*` when compression is possible

Suppose the current prefix is:

`abab`

The first half is:

`ab`

and the second half is also:

`ab`

So I can represent it as:

`ab*`

Instead of keeping four characters, I only need three.

I add `*` to the result and continue with the first half.

This is important because that first half may itself contain another compressible pattern.

For example:

`aaaa`

can be compressed as:

`a**`

The first `*` changes `a` into `aa`, and the second `*` changes `aa` into `aaaa`.

### 8. Keep the character when compression is impossible

If the current prefix does not satisfy the repetition conditions, I simply add the current character to the result.

Then I move one position to the left.

This guarantees that every part of the original string is represented.

### 9. Why do I scan backwards?

The result is easier to construct this way because when a prefix can be compressed, I can immediately reduce the remaining part to its first half.

For example, if a prefix of length `8` can be represented by its first `4` characters followed by `*`, I only need to continue working with the first `4` characters.

This naturally fits a right-to-left scan.

### 10. Reverse the result

Since I process the string from the end toward the beginning, the encrypted string is initially stored backwards.

For example, if the correct answer is:

`ab*c*d`

the temporary result is built in reverse order.

So I reverse it once at the end.

### 11. C++ implementation details

In C++, I use `vector<int>` for the prefix-function array.

For the result, I use `string`.

I can reserve `n` characters for the result so that the string does not need unnecessary memory reallocations while growing.

The KMP construction and final scan both use simple integer indices, keeping the implementation efficient for `n = 10^5`.

### 12. Java implementation details

In Java, the prefix-function array is an `int[]`.

For building the answer, `StringBuilder` is preferable to repeatedly using string concatenation.

Repeated `String` concatenation can create many temporary objects, while `StringBuilder` is designed for efficient string construction.

I reverse the `StringBuilder` at the end and convert it to a `String`.

### 13. JavaScript implementation details

In JavaScript, I use an array for the prefix-function values.

For the encrypted result, I store individual characters and `*` inside an array.

After the backward scan, I call `reverse()` and then `join('')`.

This avoids repeatedly creating new strings during the construction of the answer.

### 14. Python3 implementation details

In Python, I use a list for the prefix-function array.

The encrypted result is also stored in a list.

After processing the string backwards, I reverse the list and use `''.join()` to create the final string.

Using a list for construction is more efficient than repeatedly concatenating strings inside a loop.

## Examples

### Example 1

Input:

`ababcababcd`

Expected Output:

`ab*c*d`

The string contains repeated prefixes that can be represented using `*`.

The encryption can be built step by step:

`ababcababcd`

First, a repeated part can be compressed:

`ababc*d`

Then another repeated prefix can be compressed:

`ab*c*d`

When `ab*c*d` is decoded, it produces the original string:

`ababcababcd`

### Example 2

Input:

`zzzzzzz`

Expected Output:

`z*z*z`

The first `z` is read normally.

The first `*` duplicates it:

`z` → `zz`

The next `z` makes:

`zzz`

The next `*` duplicates everything read so far:

`zzz` → `zzzzzz`

The final `z` gives:

`zzzzzzz`

So:

`z*z*z`

correctly decodes to the original string.

### Example 3

Input:

`abab`

Expected Output:

`ab*`

The first two characters are:

`ab`

The remaining two characters are also:

`ab`

Therefore, I can replace the second `ab` with `*`.

During decoding:

`ab` → `abab`

So `ab*` is a valid encrypted representation.

## How to Use / Run Locally

This repository contains the same algorithm in C, C++, Java, JavaScript, and Python3. The actual solution code can be placed inside the corresponding language section above.

### C++

Save the solution as `solution.cpp`.

Compile it with:

`g++ -std=c++17 solution.cpp -o solution`

Run it with:

`./solution`

### Java

Save the solution as `Solution.java`.

Compile it with:

`javac Solution.java`

Run it with:

`java Solution`

### JavaScript

Save the solution as `solution.js`.

Run it with:

`node solution.js`

Make sure Node.js is installed on your system.

### Python3

Save the solution as `solution.py`.

Run it with:

`python3 solution.py`

Make sure Python 3 is installed on your system.

For GeeksforGeeks, the platform normally provides the input/output handling and expects only the required class and method implementation.

## Notes & Optimizations

The most important optimization is using the KMP prefix function instead of comparing every pair of substrings directly.

A naive solution could repeatedly compare the first half and second half of every prefix. In the worst case, this can become `O(n²)`, which is too slow for a string of length `10^5`.

The KMP prefix-function array reduces the pattern detection work to `O(n)`.

I also avoid recursion. A recursive solution that creates a new substring for every step can use a large amount of memory and may cause stack or memory problems for large inputs.

The algorithm works directly with indices, so it does not need to create many temporary substrings.

Another useful observation is that `*` is not treated like an ordinary character. It represents duplication of the entire string constructed before it. Because of that, compression is possible only when the current prefix has the required repeated structure.

For very small strings, no compression may be possible. In that case, the original string itself is returned.

For strings with strong repetition, the encrypted string can become much shorter. For example:

`aaaa` → `a**`

and:

`abab` → `ab*`

The algorithm still remains `O(n)` regardless of how repetitive the input string is.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
