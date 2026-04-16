# Implement Atoi

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

---

## Problem Summary

Given a string `s`, convert it into a 32-bit signed integer.

The conversion follows these rules:

1. Ignore leading whitespaces.
2. Check for optional `+` or `-` sign.
3. Read digits until a non-digit character appears.
4. If no digits are found, return `0`.
5. If the number exceeds the 32-bit signed integer range:

   * Return `2147483647` if it is greater than maximum.
   * Return `-2147483648` if it is smaller than minimum.

The final integer should be returned.

---

## Constraints

```text
1 <= |s| <= 15
```

---

## Intuition

I thought about solving this problem exactly the way the real `atoi()` function works.

First, I skip all spaces from the beginning of the string.

Then I check whether the number is positive or negative.

After that, I keep reading digits one by one and form the number.

The most important part is handling overflow. Since the answer must stay inside the range of a 32-bit signed integer:

```text
Minimum = -2147483648
Maximum = 2147483647
```

So before adding a new digit, I check whether the number will go out of range.

---

## Approach

1. Start from index `0`.
2. Skip all leading spaces.
3. Check whether the next character is `+` or `-`.
4. Store the sign accordingly.
5. Read digits one by one.
6. Before adding a digit, check if overflow will happen.
7. If overflow happens:

   * Return `2147483647` for positive numbers.
   * Return `-2147483648` for negative numbers.
8. Return the final signed number.

---

## Data Structures Used

* Integer variables
* Long / Long Long variable for overflow-safe calculation
* String traversal using index pointer

No extra arrays, stacks, queues, maps, or other data structures are needed.

---

## Operations & Behavior Summary

| Operation              | Behavior                |
| ---------------------- | ----------------------- |
| Leading spaces         | Ignored                 |
| `+` sign               | Number remains positive |
| `-` sign               | Number becomes negative |
| Non-digit after digits | Stop reading further    |
| No digits found        | Return `0`              |
| Value > 2147483647     | Return `2147483647`     |
| Value < -2147483648    | Return `-2147483648`    |

---

## Complexity

* Time Complexity: `O(n)`

  * Here, `n` is the length of the string.
  * I scan the string only once.

* Space Complexity: `O(1)`

  * I only use a few variables.
  * No extra data structures are used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int myAtoi(string &s) {
        int n = s.size();
        int i = 0;

        // Skip leading spaces
        while (i < n && s[i] == ' ') {
            i++;
        }

        // Check sign
        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            if (s[i] == '-') {
                sign = -1;
            }
            i++;
        }

        long long num = 0;
        int INT_MAX_VAL = 2147483647;
        int INT_MIN_VAL = -2147483648;

        // Read digits
        while (i < n && isdigit(s[i])) {
            int digit = s[i] - '0';

            // Check overflow before adding digit
            if (num > (INT_MAX_VAL - digit) / 10) {
                return (sign == 1) ? INT_MAX_VAL : INT_MIN_VAL;
            }

            num = num * 10 + digit;
            i++;
        }

        return (int)(sign * num);
    }
};
```

### Java

```java
class Solution {
    public int myAtoi(String s) {
        int n = s.length();
        int i = 0;

        // Skip leading spaces
        while (i < n && s.charAt(i) == ' ') {
            i++;
        }

        // Check sign
        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            if (s.charAt(i) == '-') {
                sign = -1;
            }
            i++;
        }

        long num = 0;
        int INT_MAX_VAL = 2147483647;
        int INT_MIN_VAL = -2147483648;

        // Read digits
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i) - '0';

            // Check overflow before adding digit
            if (num > (INT_MAX_VAL - digit) / 10) {
                return (sign == 1) ? INT_MAX_VAL : INT_MIN_VAL;
            }

            num = num * 10 + digit;
            i++;
        }

        return (int)(sign * num);
    }
}
```

### JavaScript

```javascript
class Solution {
    myAtoi(s) {
        let n = s.length;
        let i = 0;

        // Skip leading spaces
        while (i < n && s[i] === ' ') {
            i++;
        }

        // Check sign
        let sign = 1;
        if (i < n && (s[i] === '+' || s[i] === '-')) {
            if (s[i] === '-') {
                sign = -1;
            }
            i++;
        }

        let num = 0;
        const INT_MAX_VAL = 2147483647;
        const INT_MIN_VAL = -2147483648;

        // Read digits
        while (i < n && s[i] >= '0' && s[i] <= '9') {
            let digit = s.charCodeAt(i) - '0'.charCodeAt(0);

            // Check overflow before adding digit
            if (num > Math.floor((INT_MAX_VAL - digit) / 10)) {
                return sign === 1 ? INT_MAX_VAL : INT_MIN_VAL;
            }

            num = num * 10 + digit;
            i++;
        }

        return sign * num;
    }
}
```

### Python3

```python
class Solution:
    def myAtoi(self, s):
        n = len(s)
        i = 0

        # Skip leading spaces
        while i < n and s[i] == ' ':
            i += 1

        # Check sign
        sign = 1
        if i < n and (s[i] == '+' or s[i] == '-'):
            if s[i] == '-':
                sign = -1
            i += 1

        num = 0
        INT_MAX_VAL = 2147483647
        INT_MIN_VAL = -2147483648

        # Read digits
        while i < n and s[i].isdigit():
            digit = ord(s[i]) - ord('0')

            # Check overflow before adding digit
            if num > (INT_MAX_VAL - digit) // 10:
                return INT_MAX_VAL if sign == 1 else INT_MIN_VAL

            num = num * 10 + digit
            i += 1

        return sign * num
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### 1. Skip Leading Spaces

```cpp
while (i < n && s[i] == ' ') {
    i++;
}
```

I move the pointer forward until I find a non-space character.

Example:

```text
"   -123"
```

After skipping spaces, I reach `-`.

### 2. Check Sign

```cpp
int sign = 1;
if (i < n && (s[i] == '+' || s[i] == '-')) {
    if (s[i] == '-') {
        sign = -1;
    }
    i++;
}
```

By default, I assume the number is positive.

If I see `-`, I make the sign negative.

Examples:

```text
"+45" -> positive
"-45" -> negative
"45"  -> positive
```

### 3. Read Digits

```cpp
while (i < n && isdigit(s[i])) {
    int digit = s[i] - '0';
```

I keep reading digits until I find a non-digit character.

Example:

```text
"123abc"
```

I only read `123` and stop at `a`.

### 4. Handle Overflow

```cpp
if (num > (INT_MAX_VAL - digit) / 10) {
    return (sign == 1) ? INT_MAX_VAL : INT_MIN_VAL;
}
```

Before adding a new digit, I check if the value will cross the 32-bit integer range.

Example:

```text
2147483648
```

This is bigger than the maximum allowed integer.

So I return:

```text
2147483647
```

Similarly:

```text
-99999999999
```

Returns:

```text
-2147483648
```

### 5. Build the Number

```cpp
num = num * 10 + digit;
```

Example:

```text
"123"
```

Steps:

```text
0 * 10 + 1 = 1
1 * 10 + 2 = 12
12 * 10 + 3 = 123
```

At the end:

```cpp
return sign * num;
```

---

## Examples

```text
Input: s = "-123"
Output: -123
```

```text
Input: s = "   -"
Output: 0
```

```text
Input: s = "1231231231311133"
Output: 2147483647
```

```text
Input: s = "-999999999999"
Output: -2147483648
```

```text
Input: s = "  -0012gfg4"
Output: -12
```

---

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
python filename.py
```

---

## Notes & Optimizations

* I scan the string only once.
* I do not use any extra data structures.
* Overflow is handled before updating the number.
* The solution works for:

  * Leading spaces
  * Positive numbers
  * Negative numbers
  * Invalid characters
  * Empty digit sequences
  * Overflow cases

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
