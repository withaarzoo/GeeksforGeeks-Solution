# Anagram Palindrome

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given a string `s`, determine whether its characters can be rearranged to form a palindrome.

Return `true` if it is possible to rearrange the string into a palindrome, otherwise return `false`.

A palindrome is a string that reads the same forward and backward.

Example:

* `"baba"` can become `"abba"`
* `"geeksogeeks"` can become `"geeksoskeeg"`
* `"geeksforgeeks"` cannot be rearranged into a palindrome

## Constraints

* `1 <= s.length <= 10^6`
* String contains only lowercase English letters

## Intuition

I thought about the basic property of a palindrome.

In a palindrome:

* Most characters must appear an even number of times.
* Only one character is allowed to appear an odd number of times.

Why?

Because characters are placed in pairs on both sides of the string.

For example:

* `aabb` -> possible because both characters appear even number of times.
* `aaabb` -> possible because only one character appears odd number of times.
* `abc` -> not possible because all three characters appear odd number of times.

So my idea was simple:

1. Count frequency of each character.
2. Count how many characters have odd frequency.
3. If odd count is greater than 1, return `false`.
4. Otherwise, return `true`.

## Approach

1. Create a frequency array of size 26.
2. Traverse the string and count occurrences of each character.
3. Traverse the frequency array.
4. Count how many characters have odd frequency.
5. If more than one character has odd frequency, return `false`.
6. Otherwise, return `true`.

## Data Structures Used

* Array of size 26

  * Used for storing frequency of lowercase English letters.
  * Index `0` stores count of `'a'`
  * Index `1` stores count of `'b'`
  * And so on...

## Operations & Behavior Summary

| Operation                     | Purpose                                             |
| ----------------------------- | --------------------------------------------------- |
| Count character frequencies   | Store how many times each character appears         |
| Check odd frequencies         | Find how many characters appear odd number of times |
| Validate palindrome condition | More than one odd frequency means impossible        |

## Complexity

* Time Complexity: `O(n)`

  * `n` is the length of the string.
  * We traverse the string once.
  * Then we check 26 frequency values.

* Space Complexity: `O(1)`

  * We use only a fixed-size array of 26 elements.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool canFormPalindrome(string &s) {
        // Frequency array for 26 lowercase letters
        int freq[26] = {0};

        // Count frequency of each character
        for (char ch : s) {
            freq[ch - 'a']++;
        }

        // Count characters with odd frequency
        int oddCount = 0;

        for (int i = 0; i < 26; i++) {
            if (freq[i] % 2 != 0) {
                oddCount++;
            }

            // More than one odd frequency means impossible
            if (oddCount > 1) {
                return false;
            }
        }

        return true;
    }
};
```

### Java

```java
class Solution {
    boolean canFormPalindrome(String s) {
        // Frequency array for 26 lowercase letters
        int[] freq = new int[26];

        // Count frequency of each character
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }

        // Count characters with odd frequency
        int oddCount = 0;

        for (int i = 0; i < 26; i++) {
            if (freq[i] % 2 != 0) {
                oddCount++;
            }

            if (oddCount > 1) {
                return false;
            }
        }

        return true;
    }
}
```

### JavaScript

```javascript
class Solution {
    canFormPalindrome(s) {
        // Frequency array for 26 lowercase letters
        let freq = new Array(26).fill(0);

        // Count frequency of each character
        for (let ch of s) {
            freq[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        // Count characters with odd frequency
        let oddCount = 0;

        for (let i = 0; i < 26; i++) {
            if (freq[i] % 2 !== 0) {
                oddCount++;
            }

            if (oddCount > 1) {
                return false;
            }
        }

        return true;
    }
}
```

### Python3

```python
class Solution:
    def canFormPalindrome(self, s):
        # Frequency array for 26 lowercase letters
        freq = [0] * 26

        # Count frequency of each character
        for ch in s:
            freq[ord(ch) - ord('a')] += 1

        # Count characters with odd frequency
        odd_count = 0

        for count in freq:
            if count % 2 != 0:
                odd_count += 1

            if odd_count > 1:
                return False

        return True
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Create Frequency Array

```cpp
int freq[26] = {0};
```

This array stores frequency of each lowercase letter.

Examples:

* `freq[0]` -> count of `'a'`
* `freq[1]` -> count of `'b'`
* `freq[25]` -> count of `'z'`

---

### Step 2: Count Each Character

```cpp
for (char ch : s) {
    freq[ch - 'a']++;
}
```

Suppose:

```text
s = "baba"
```

Then frequencies become:

```text
a = 2
b = 2
```

---

### Step 3: Count Odd Frequencies

```cpp
int oddCount = 0;
```

Now check every character frequency.

```cpp
for (int i = 0; i < 26; i++) {
    if (freq[i] % 2 != 0) {
        oddCount++;
    }
}
```

Example:

```text
s = "aaabb"
```

Frequencies:

```text
a = 3
b = 2
```

Only `a` has odd frequency.

So:

```text
oddCount = 1
```

---

### Step 4: Final Validation

```cpp
if (oddCount > 1) {
    return false;
}
```

If more than one character has odd frequency, palindrome formation is not possible.

Otherwise:

```cpp
return true;
```

Because only one odd frequency character can stay in the middle of the palindrome.

## Examples

### Example 1

```text
Input: s = "baba"
Output: true
Explanation: "baba" can be rearranged into "abba"
```

### Example 2

```text
Input: s = "geeksogeeks"
Output: true
Explanation: "geeksogeeks" can be rearranged into "geeksoskeeg"
```

### Example 3

```text
Input: s = "geeksforgeeks"
Output: false
Explanation: More than one character has odd frequency
```

## How to use / Run locally

### C++

```bash
g++ filename.cpp -o output
./output
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node filename.js
```

### Python3

```bash
python solution.py
```

## Notes & Optimizations

* Since only lowercase English letters are used, a fixed array of size 26 is enough.
* Using a hash map would also work, but an array is faster and uses less memory.
* We stop early when odd frequency count becomes greater than 1.
* This solution is optimal for the given constraints.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
