# Express as Consecutive Number Sum

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

The **Express as Consecutive Number Sum** problem asks whether a given positive integer `n` can be represented as the sum of **two or more consecutive positive integers**.

For example:

* `10 = 1 + 2 + 3 + 4`, so the answer is `true`
* `24 = 7 + 8 + 9`, so the answer is `true`
* `8` cannot be expressed as a sum of consecutive positive integers, so the answer is `false`

The goal is to determine the answer efficiently without trying every possible sequence.

This is a popular **GeeksforGeeks mathematical problem** that can be solved using a simple **bit manipulation trick** and runs in constant time.

## Constraints

| Constraint | Value       |
| ---------- | ----------- |
| n          | 1 ≤ n ≤ 10⁹ |

## Intuition

When I started testing a few values manually, I noticed something interesting.

Numbers such as:

* 2
* 4
* 8
* 16
* 32

always return `false`.

These numbers are all powers of 2.

Then I checked several non-powers of 2:

* 3 = 1 + 2
* 5 = 2 + 3
* 9 = 4 + 5
* 10 = 1 + 2 + 3 + 4

and they all worked.

That observation leads to a well-known mathematical fact:

A positive integer can be written as a sum of two or more consecutive positive integers if and only if it is **not a power of 2**.

Once I realized that, the problem became much simpler.

## Approach

I used the following strategy:

1. Check whether the given number is a power of 2.
2. If it is a power of 2, return `false`.
3. Otherwise, return `true`.

To detect a power of 2 efficiently, I used this bitwise property:

```text
n & (n - 1)
```

For every power of 2, the result is `0`.

Example:

```text
8  = 1000
7  = 0111
------------
     0000
```

For non-powers of 2, the result is non-zero.

Example:

```text
10 = 1010
9  = 1001
------------
     1000
```

This gives an O(1) solution.

## Data Structures Used

No additional data structures are required.

| Data Structure | Why It Is Used                                                 |
| -------------- | -------------------------------------------------------------- |
| None           | The solution only uses a bitwise operation and a few variables |

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Receive the integer `n`.
2. Compute `n & (n - 1)`.
3. If the result equals `0`, `n` is a power of 2.
4. Return `false` for powers of 2.
5. Return `true` for all other numbers.

No loops are required.

No extra memory is required.

## Complexity

| Metric           | Complexity | Explanation                                 |
| ---------------- | ---------- | ------------------------------------------- |
| Time Complexity  | O(1)       | Only a few bitwise operations are performed |
| Space Complexity | O(1)       | No extra data structures are used           |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isSumOfConsecutive(int n) {
        // If n is a power of 2, it cannot be represented
        // as a sum of two or more consecutive positive numbers
        if ((n & (n - 1)) == 0)
            return false;

        // Otherwise such a representation always exists
        return true;
    }
};
```

### Java

```java
class Solution {
    public boolean isSumOfConsecutive(int n) {
        // Check whether n is a power of 2
        if ((n & (n - 1)) == 0) {
            return false;
        }

        // Non powers of 2 can always be expressed
        // as a sum of consecutive positive integers
        return true;
    }
}
```

### JavaScript

```javascript
class Solution {
    isSumOfConsecutive(n) {
        // If n is a power of 2, answer is false
        if ((n & (n - 1)) === 0) {
            return false;
        }

        // Otherwise answer is true
        return true;
    }
}
```

### Python3

```python
class Solution:
    def isSumOfConsecutive(self, n: int) -> bool:
        # If n is a power of 2, it cannot be written
        # as a sum of two or more consecutive positives
        if (n & (n - 1)) == 0:
            return False

        # Otherwise it can be represented
        return True
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in all four languages.

### Step 1: Read the input number

The function receives a single integer `n`.

The task is to determine whether it can be expressed as a sum of consecutive positive integers.

### Step 2: Check whether `n` is a power of 2

The expression:

```text
n & (n - 1)
```

removes the lowest set bit.

For powers of 2, there is only one set bit.

Example:

```text
16     = 10000
15     = 01111
----------------
         00000
```

Since the result becomes zero, we know that `16` is a power of 2.

### Step 3: Return false for powers of 2

Numbers that are powers of 2 cannot be represented as a sum of two or more consecutive positive integers.

Examples:

```text
2
4
8
16
32
```

All return `false`.

### Step 4: Return true otherwise

If the number is not a power of 2, at least one valid consecutive sequence always exists.

Examples:

```text
3  = 1 + 2
5  = 2 + 3
9  = 4 + 5
10 = 1 + 2 + 3 + 4
24 = 7 + 8 + 9
```

Therefore the answer is `true`.

## Examples

### Example 1

Input

```text
n = 10
```

Output

```text
true
```

Trace

```text
10 is not a power of 2

10 = 1 + 2 + 3 + 4
```

### Example 2

Input

```text
n = 8
```

Output

```text
false
```

Trace

```text
8 is a power of 2

No valid consecutive positive integer sequence exists
```

### Example 3

Input

```text
n = 24
```

Output

```text
true
```

Trace

```text
24 is not a power of 2

24 = 7 + 8 + 9
```

## How to Use / Run Locally

### C++

Compile

```bash
g++ main.cpp -o main
```

Run

```bash
./main
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

* The key observation is that every power of 2 fails.
* A brute force solution would try many consecutive sequences and would be much slower.
* Using bit manipulation reduces the solution to constant time.
* No additional memory allocation is required.
* This is one of the most efficient solutions possible for this problem.
* The approach works comfortably within the given constraint of `10⁹`.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
