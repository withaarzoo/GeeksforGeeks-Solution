# Choose and Swap

A complete solution and explanation for the GeeksforGeeks **Choose and Swap** problem using a greedy algorithm approach. This repository includes detailed problem analysis, intuition, complexity breakdown, and multi-language implementations.

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

Given a string consisting of lowercase English letters, we can perform **at most one operation**.

In a single operation, we choose any two distinct characters and swap **all occurrences** of those characters throughout the string.

The goal is to return the **lexicographically smallest string** possible after performing at most one such swap.

### Input

* A string `s` containing lowercase English letters.

### Output

* The lexicographically smallest string that can be obtained after performing at most one global character swap.

This is a classic greedy string problem where improving the earliest possible position leads to the optimal answer.

## Constraints

| Constraint      | Value                     |
| --------------- | ------------------------- |
| String Length   | 1 ≤ |s| ≤ 10⁵             |
| Characters      | Lowercase English Letters |
| Operation Count | At Most One Swap          |

## Intuition

When I first looked at the problem, I noticed that lexicographical order is decided by the earliest position where two strings differ.

Because of that, improving a later character is never as valuable as improving an earlier one.

So while scanning the string from left to right, I asked a simple question:

"Can I replace this character with a smaller character that appears somewhere later in the string?"

If the answer is yes, then performing that swap immediately makes the string smaller at the earliest possible position, which is exactly what we want.

This observation naturally leads to a greedy solution.

## Approach

1. Store the first occurrence of every character.
2. Traverse the string from left to right.
3. For the current character, check whether a smaller character exists later in the string.
4. If such a character exists:

   * Choose the current character and the smaller character.
   * Swap all occurrences of both characters.
   * Return the resulting string immediately.
5. If no beneficial swap exists, return the original string.

The first valid improvement is always the best improvement because lexicographical comparison prioritizes earlier positions.

## Data Structures Used

### Array of Size 26

Used to store the first occurrence of each lowercase English letter.

Why?

* Constant-time lookup
* Very small memory usage
* Perfect for lowercase alphabet problems

### Character Array / String Buffer

Used while performing the final global swap operation.

Why?

* Allows efficient character updates
* Simplifies string modification

## Operations & Behavior Summary

The algorithm performs the following major steps:

1. Record where each character first appears.
2. Start scanning from the beginning of the string.
3. For every character, search for a smaller character that occurs later.
4. Once found:

   * Mark both characters.
   * Swap every occurrence of them in the string.
5. Return the modified string.
6. If no improvement exists, return the original string unchanged.

## Complexity

| Metric           | Complexity | Explanation                                       |
| ---------------- | ---------- | ------------------------------------------------- |
| Time Complexity  | O(n)       | The string is scanned a constant number of times. |
| Space Complexity | O(1)       | Only fixed-size arrays of length 26 are used.     |

Where:

* `n` = length of the input string

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string chooseSwap(string &s) {
        int n = s.size();

        // Stores the first occurrence index of every character
        vector<int> first(26, -1);

        // Record first occurrence of each character
        for (int i = 0; i < n; i++) {
            if (first[s[i] - 'a'] == -1) {
                first[s[i] - 'a'] = i;
            }
        }

        // Try every position from left to right
        for (int i = 0; i < n; i++) {

            // Check all smaller characters than s[i]
            for (int ch = 0; ch < (s[i] - 'a'); ch++) {

                // If a smaller character exists later in the string
                if (first[ch] > i) {

                    char c1 = s[i];          // current character
                    char c2 = char(ch + 'a'); // smaller character

                    // Swap all occurrences of c1 and c2
                    for (int j = 0; j < n; j++) {
                        if (s[j] == c1)
                            s[j] = c2;
                        else if (s[j] == c2)
                            s[j] = c1;
                    }

                    return s;
                }
            }
        }

        return s;
    }
};
```

### Java

```java
class Solution {
    public String chooseSwap(String s) {

        int n = s.length();

        // Stores first occurrence of every character
        int[] first = new int[26];

        // Initialize with -1
        for (int i = 0; i < 26; i++) {
            first[i] = -1;
        }

        // Record first occurrence
        for (int i = 0; i < n; i++) {
            int idx = s.charAt(i) - 'a';

            if (first[idx] == -1) {
                first[idx] = i;
            }
        }

        char[] arr = s.toCharArray();

        // Find earliest beneficial swap
        for (int i = 0; i < n; i++) {

            for (int ch = 0; ch < arr[i] - 'a'; ch++) {

                // Smaller character exists later
                if (first[ch] > i) {

                    char c1 = arr[i];
                    char c2 = (char) ('a' + ch);

                    // Swap all occurrences globally
                    for (int j = 0; j < n; j++) {

                        if (arr[j] == c1)
                            arr[j] = c2;
                        else if (arr[j] == c2)
                            arr[j] = c1;
                    }

                    return new String(arr);
                }
            }
        }

        return s;
    }
}
```

### JavaScript

```javascript
class Solution {
    chooseSwap(s) {

        const n = s.length;

        // Stores first occurrence of every character
        const first = new Array(26).fill(-1);

        // Record first occurrence
        for (let i = 0; i < n; i++) {
            const idx = s.charCodeAt(i) - 97;

            if (first[idx] === -1) {
                first[idx] = i;
            }
        }

        let arr = s.split('');

        // Find earliest beneficial swap
        for (let i = 0; i < n; i++) {

            for (let ch = 0; ch < arr[i].charCodeAt(0) - 97; ch++) {

                // Smaller character exists later
                if (first[ch] > i) {

                    const c1 = arr[i];
                    const c2 = String.fromCharCode(ch + 97);

                    // Swap all occurrences globally
                    for (let j = 0; j < n; j++) {

                        if (arr[j] === c1)
                            arr[j] = c2;
                        else if (arr[j] === c2)
                            arr[j] = c1;
                    }

                    return arr.join('');
                }
            }
        }

        return s;
    }
}
```

### Python3

```python
class Solution:
    def chooseSwap(self, s):
        n = len(s)

        # Stores first occurrence of every character
        first = [-1] * 26

        # Record first occurrence
        for i, ch in enumerate(s):
            idx = ord(ch) - ord('a')

            if first[idx] == -1:
                first[idx] = i

        arr = list(s)

        # Find earliest beneficial swap
        for i in range(n):

            # Check all smaller characters
            for ch in range(ord(arr[i]) - ord('a')):

                # Smaller character exists later
                if first[ch] > i:

                    c1 = arr[i]
                    c2 = chr(ch + ord('a'))

                    # Swap all occurrences globally
                    for j in range(n):

                        if arr[j] == c1:
                            arr[j] = c2
                        elif arr[j] == c2:
                            arr[j] = c1

                    return "".join(arr)

        return s
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Record First Occurrences

For every lowercase character, store the index where it first appears.

This allows us to quickly determine whether a smaller character exists somewhere to the right of the current position.

### Step 2: Traverse Left to Right

The traversal starts from the beginning because lexicographical order depends on the earliest differing character.

Improving position `0` is always more valuable than improving position `5`.

### Step 3: Search for a Smaller Character

For the current character:

* Check all smaller letters.
* Determine whether any of them appear later in the string.

If one exists, we have found a profitable swap.

### Step 4: Perform Global Character Swap

Once two characters are selected:

* Every occurrence of the first character becomes the second.
* Every occurrence of the second character becomes the first.

This matches the operation defined in the problem statement.

### Step 5: Return Immediately

After finding the first beneficial swap, the algorithm stops.

Why?

Because the earliest possible improvement already guarantees the smallest lexicographical result.

No later swap can produce a better answer.

### Step 6: Handle Already Optimal Strings

If the entire scan finishes without finding a beneficial swap, the original string is already the smallest possible answer.

In that case, simply return it.

## Examples

### Example 1

Input

```text
s = "ccad"
```

Output

```text
aacd
```

Trace

* First character is `c`
* Smaller character `a` exists later
* Swap all `c` and `a`
* Result becomes `aacd`

---

### Example 2

Input

```text
s = "abba"
```

Output

```text
abba
```

Trace

* No beneficial swap improves the earliest position
* Original string remains optimal

---

### Example 3

Input

```text
s = "dcab"
```

Output

```text
acdb
```

Trace

* First character is `d`
* Smaller character `a` appears later
* Swap all `d` and `a`
* Final answer becomes `acdb`

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

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

### JavaScript

Run

```bash
node solution.js
```

### Python3

Run

```bash
python solution.py
```

## Notes & Optimizations

* The solution uses a greedy strategy.
* Only one swap operation is allowed.
* The earliest improvement always provides the best lexicographical result.
* Since the alphabet size is fixed at 26, character checks remain constant-time.
* The algorithm easily handles strings up to 10⁵ characters.
* No sorting is required.
* No expensive nested scans over the entire string are needed.

### Edge Cases

* String length is 1
* All characters are identical
* String is already lexicographically smallest
* Beneficial swap exists only near the beginning
* Beneficial swap exists only near the end

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
