# Check for Power

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

Given two positive integers `x` and `y`, determine whether `y` is a power of `x`.

Return `true` if there exists some integer `n >= 0` such that:

```text
x^n = y
```

Otherwise, return `false`.

Example:

```text
Input: x = 2, y = 8
Output: true
Explanation: 2^3 = 8
```

---

## Constraints

```text
1 <= x <= 10^3
1 <= y <= 10^9
```

---

## Intuition

I thought about how powers work.

If `y` is really a power of `x`, then I should be able to divide `y` by `x` again and again.

Eventually:

* If I reach `1`, then `y` is a valid power of `x`
* If at some point `y` is not divisible by `x`, then `y` cannot be formed by multiplying `x` repeatedly

For example:

```text
x = 2, y = 8
8 / 2 = 4
4 / 2 = 2
2 / 2 = 1
```

Since I reached `1`, the answer is `true`.

---

## Approach

1. Handle the special case when `x = 1`
2. Keep dividing `y` by `x` while `y % x == 0`
3. After the loop:

   * If `y == 1`, return `true`
   * Otherwise, return `false`

This method is simple, fast, and does not require extra space.

---

## Data Structures Used

* No extra data structure is used
* Only a few integer variables are used

---

## Operations & Behavior Summary

| Operation    | Purpose                                               |
| ------------ | ----------------------------------------------------- |
| `y % x == 0` | Checks if `y` is divisible by `x`                     |
| `y /= x`     | Removes one power of `x` from `y`                     |
| `y == 1`     | Confirms whether all powers were removed successfully |

---

## Complexity

* **Time Complexity:** `O(logₓ(y))`

  * Every division reduces `y` quickly
  * The number of operations depends on how many times `y` can be divided by `x`

* **Space Complexity:** `O(1)`

  * No extra data structure is used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isPower(int x, int y) {
        // Special case for x = 1
        if (x == 1) {
            return y == 1;
        }

        // Keep dividing while y is divisible by x
        while (y % x == 0) {
            y /= x;
        }

        // If y becomes 1, then it is a power of x
        return y == 1;
    }
};
```

### Java

```java
class Solution {
    public boolean isPower(int x, int y) {
        // Special case for x = 1
        if (x == 1) {
            return y == 1;
        }

        // Keep dividing while y is divisible by x
        while (y % x == 0) {
            y /= x;
        }

        // If y becomes 1, then it is a power of x
        return y == 1;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
class Solution {
    isPower(x, y) {
        // Special case for x = 1
        if (x === 1) {
            return y === 1;
        }

        // Keep dividing while y is divisible by x
        while (y % x === 0) {
            y = Math.floor(y / x);
        }

        // If y becomes 1, then it is a power of x
        return y === 1;
    }
}
```

### Python3

```python
class Solution:
    def isPower(self, x, y):
        # Special case for x = 1
        if x == 1:
            return y == 1

        # Keep dividing while y is divisible by x
        while y % x == 0:
            y //= x

        # If y becomes 1, then it is a power of x
        return y == 1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Handle the special case

```cpp
if (x == 1) {
    return y == 1;
}
```

If `x = 1`, then every power of `1` is still `1`.

```text
1^1 = 1
1^10 = 1
1^100 = 1
```

So:

```text
x = 1, y = 1 => true
x = 1, y = 8 => false
```

---

### Step 2: Divide repeatedly

```cpp
while (y % x == 0) {
    y /= x;
}
```

This loop removes one factor of `x` from `y` in every iteration.

Example:

```text
x = 3, y = 81
81 / 3 = 27
27 / 3 = 9
9 / 3 = 3
3 / 3 = 1
```

Now `y = 1`, so `81` is a power of `3`.

---

### Step 3: Final check

```cpp
return y == 1;
```

If after all divisions `y` becomes `1`, then `y` was completely made of powers of `x`.

Otherwise, it was not.

Example:

```text
x = 2, y = 12
12 / 2 = 6
6 / 2 = 3
```

Now `3 % 2 != 0`, so loop stops.

Final value is not `1`, so answer is `false`.

---

## Examples

### Example 1

```text
Input: x = 2, y = 8
Output: true
Explanation: 2^3 = 8
```

### Example 2

```text
Input: x = 1, y = 8
Output: false
Explanation: Any power of 1 is always 1
```

### Example 3

```text
Input: x = 46, y = 205962976
Output: true
Explanation: 46^5 = 205962976
```

### Example 4

```text
Input: x = 50, y = 312500000
Output: true
Explanation: 50^5 = 312500000
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* Repeated division is better than checking all possible powers manually
* No recursion is needed
* No extra array, map, or set is needed
* The solution is efficient because `y` becomes smaller very quickly
* The special case `x = 1` is important, otherwise the loop may run forever

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
