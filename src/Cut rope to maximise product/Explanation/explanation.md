# Cut Rope to Maximise Product

A greedy algorithm solution for the GeeksforGeeks DSA problem **Cut Rope to Maximise Product**. This repository contains an optimized approach to maximize the product obtained after cutting a rope into multiple parts while ensuring at least one cut is made.

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

Given a rope of length **n**, the goal is to cut it into two or more smaller pieces such that the product of all piece lengths becomes as large as possible.

At least one cut is mandatory.

For example:

* Rope length = 5
* Best cut = 2 + 3
* Product = 2 × 3 = 6

The task is to return the maximum possible product.

This problem is a popular interview question that combines mathematical reasoning, greedy algorithms, and optimization techniques.

## Constraints

| Constraint | Value |
| ---------- | ----- |
| Minimum n  | 2     |
| Maximum n  | 58    |

## Intuition

My first thought was to try every possible way to cut the rope and calculate the product.

After checking a few examples, a pattern started to appear.

Whenever I kept breaking the rope into pieces of length 3, the product became larger than using bigger or smaller pieces.

For example:

* 6 = 3 + 3 → 9
* 8 = 3 + 3 + 2 → 18
* 10 = 3 + 3 + 4 → 36

I also noticed that having a piece of length 1 is never helpful because multiplying by 1 does not increase the product.

That observation leads directly to a greedy solution where I keep taking pieces of length 3 whenever possible.

## Approach

1. Handle small edge cases separately.
2. If the rope length is 2, return 1.
3. If the rope length is 3, return 2.
4. For larger values, repeatedly cut a piece of length 3.
5. Multiply the answer by 3 each time.
6. Reduce the remaining rope length.
7. Stop when the remaining length becomes 4 or less.
8. Multiply the remaining length with the current product.
9. Return the final answer.

This works because splitting into 3s produces the maximum product while avoiding a leftover piece of length 1.

## Data Structures Used

No special data structures are required.

| Data Structure    | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| Integer Variables | Store the current answer and remaining rope length |

The solution uses constant extra memory.

## Operations & Behavior Summary

The algorithm performs the following actions:

1. Check for small edge cases.
2. Create a variable to store the running product.
3. Continuously remove segments of length 3.
4. Multiply the answer by 3 for every segment removed.
5. Stop when the remaining rope length becomes 2, 3, or 4.
6. Multiply the remaining value with the accumulated product.
7. Return the maximum product.

This is essentially a greedy mathematical optimization approach.

## Complexity

| Metric           | Complexity | Explanation                                                                         |
| ---------------- | ---------- | ----------------------------------------------------------------------------------- |
| Time Complexity  | O(log n)   | Only a small number of multiplications are performed while reducing the rope length |
| Space Complexity | O(1)       | No extra arrays, stacks, recursion, or additional data structures are used          |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxProduct(int n) {
        // For n = 2, only cut possible is 1 + 1
        if (n == 2) return 1;

        // For n = 3, at least one cut is mandatory
        if (n == 3) return 2;

        // Store the final maximum product
        int ans = 1;

        // Keep taking pieces of length 3
        // Stop when remaining length becomes <= 4
        while (n > 4) {
            ans *= 3; // Include one piece of length 3
            n -= 3;   // Remove that piece from rope
        }

        // Multiply remaining length (2, 3, or 4)
        return ans * n;
    }
};
```

### Java

```java
class Solution {
    public int maxProduct(int n) {

        // For n = 2, only cut possible is 1 + 1
        if (n == 2) return 1;

        // For n = 3, one cut is mandatory
        if (n == 3) return 2;

        // Store maximum product
        int ans = 1;

        // Keep extracting pieces of length 3
        while (n > 4) {
            ans *= 3; // Multiply product by 3
            n -= 3;   // Reduce rope length
        }

        // Multiply the remaining length
        return ans * n;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxProduct(n) {

        // For n = 2, only cut is 1 + 1
        if (n === 2) return 1;

        // For n = 3, at least one cut is required
        if (n === 3) return 2;

        // Store maximum product
        let ans = 1;

        // Repeatedly take pieces of length 3
        while (n > 4) {
            ans *= 3; // Add one factor 3
            n -= 3;   // Reduce remaining rope
        }

        // Multiply leftover part
        return ans * n;
    }
}
```

### Python3

```python
class Solution:
    def maxProduct(self, n):

        # For n = 2, only cut possible is 1 + 1
        if n == 2:
            return 1

        # For n = 3, one cut is mandatory
        if n == 3:
            return 2

        # Store maximum product
        ans = 1

        # Keep taking segments of length 3
        while n > 4:
            ans *= 3  # Include one piece of length 3
            n -= 3    # Reduce remaining rope length

        # Multiply the leftover part
        return ans * n
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all languages.

First, the algorithm checks whether the rope length is 2 or 3.

These are special cases because at least one cut must be made.

For example:

* n = 2 → 1 + 1 → product = 1
* n = 3 → 1 + 2 → product = 2

After handling those cases, the algorithm creates a variable to store the running product.

Next, it repeatedly takes away a segment of length 3.

Why 3?

Because mathematical analysis shows that using 3 gives the highest contribution toward the final product.

Each time:

* Multiply the current answer by 3
* Reduce the remaining rope length by 3

This process continues until the remaining length becomes 4 or smaller.

Stopping at 4 is important.

Consider:

* 4 = 2 + 2 → product = 4
* 4 = 3 + 1 → product = 3

Clearly, keeping 4 is better than creating a segment of length 1.

Finally, multiply the remaining length with the running product and return the result.

The implementation details differ slightly between C++, Java, JavaScript, and Python, but the algorithm remains identical.

## Examples

### Example 1

Input

```text
n = 2
```

Output

```text
1
```

Explanation

```text
1 + 1
1 × 1 = 1
```

---

### Example 2

Input

```text
n = 5
```

Output

```text
6
```

Explanation

```text
5 = 2 + 3

2 × 3 = 6
```

---

### Example 3

Input

```text
n = 10
```

Output

```text
36
```

Explanation

```text
10 = 3 + 3 + 4

3 × 3 × 4 = 36
```

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

### JavaScript

Run:

```bash
node solution.js
```

### Python3

Run:

```bash
python solution.py
```

## Notes & Optimizations

* At least one cut is mandatory.
* Never leave a segment of length 1 if it can be avoided.
* Cutting the rope into segments of length 3 gives the maximum product.
* When the remaining length becomes 4, stop cutting and use 4 directly.
* No dynamic programming table is needed.
* The greedy mathematical solution is both faster and simpler.
* The constraint is small, but this optimized approach easily handles larger values as well.

Common mistakes:

1. Forgetting that one cut is mandatory.
2. Returning 3 for n = 3 instead of 2.
3. Creating a leftover segment of length 1.
4. Continuing to cut when the remaining length is already 4.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
