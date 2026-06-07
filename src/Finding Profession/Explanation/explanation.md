# Finding Profession | GeeksforGeeks Solution

A clean and optimized solution for the Finding Profession problem from GeeksforGeeks. This repository explains the intuition, approach, complexity analysis, and provides multi-language implementations for learning Data Structures and Algorithms (DSA), Competitive Programming, Binary Trees, Recursion, Bit Manipulation, and Pattern-Based Problem Solving.

---

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

---

## Problem Summary

In this problem, we are given a special family tree containing only two professions:

* Engineer
* Doctor

The root of the family tree always starts as an Engineer.

Every person has exactly two children:

* Engineer → Engineer, Doctor
* Doctor → Doctor, Engineer

Given a level and position in the tree, we need to determine whether the person at that location is an Engineer or a Doctor.

The challenge is to solve it efficiently without constructing the entire family tree because the constraints are large.

This is a popular GeeksforGeeks DSA problem that tests recursion, binary tree observations, and bit manipulation techniques.

---

## Constraints

| Constraint | Value           |
| ---------- | --------------- |
| Level      | 1 ≤ level ≤ 10⁹ |
| Position   | 1 ≤ pos ≤ 10⁹   |

---

## Intuition

When I first looked at the tree, I noticed that the first child always keeps the parent's profession while the second child always gets the opposite profession.

That means every time we move to a right child, the profession flips.

Instead of building the whole binary tree, I only need to know how many times the profession changes while reaching the required position.

After observing a few levels carefully, I realized that the number of profession changes depends on the number of set bits in `(pos - 1)`.

* Even number of flips → Engineer
* Odd number of flips → Doctor

This observation removes the need to generate the family tree completely.

---

## Approach

1. Start from the root profession, which is Engineer.
2. Convert the position into zero-based indexing using `pos - 1`.
3. Count the number of set bits in that value.
4. Every set bit represents one profession flip.
5. If the number of flips is even, return Engineer.
6. If the number of flips is odd, return Doctor.

This gives a very efficient solution even for large values of level and position.

---

## Data Structures Used

### Integer Variables

Used to store:

* Position value
* Set bit count
* Intermediate calculations

### No Additional Data Structures

The solution does not require:

* Arrays
* Trees
* Hash Maps
* Stacks
* Queues

Everything is calculated using simple arithmetic and bit operations.

---

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Receive level and position.
2. Convert position into zero-based form.
3. Count how many set bits exist in that number.
4. Determine whether the count is even or odd.
5. Return the corresponding profession.

The family tree is never built in memory.

This keeps the solution extremely fast and memory efficient.

---

## Complexity

| Metric           | Complexity | Explanation                             |
| ---------------- | ---------- | --------------------------------------- |
| Time Complexity  | O(log pos) | We process each bit of `(pos - 1)` once |
| Space Complexity | O(1)       | No extra data structures are used       |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string profession(int level, int pos) {
        // Convert position to zero-based indexing
        int x = pos - 1;

        // Count set bits in x
        int cnt = 0;
        while (x) {
            cnt += (x & 1); // Add 1 if current bit is set
            x >>= 1;        // Move to next bit
        }

        // Even flips => Engineer, Odd flips => Doctor
        return (cnt % 2 == 0) ? "Engineer" : "Doctor";
    }
};
```

### Java

```java
class Solution {
    public String profession(int level, int pos) {

        // Convert position to zero-based indexing
        int x = pos - 1;

        // Count set bits
        int cnt = 0;
        while (x > 0) {
            cnt += (x & 1); // Check if current bit is set
            x >>= 1;        // Move to next bit
        }

        // Even flips => Engineer, Odd flips => Doctor
        return (cnt % 2 == 0) ? "Engineer" : "Doctor";
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} level
 * @param {number} pos
 * @return {string}
 */
class Solution {
    profession(level, pos) {

        // Convert position to zero-based indexing
        let x = pos - 1;

        // Count set bits
        let cnt = 0;
        while (x > 0) {
            cnt += (x & 1); // Add if current bit is set
            x >>= 1;        // Move to next bit
        }

        // Even flips => Engineer, Odd flips => Doctor
        return (cnt % 2 === 0) ? "Engineer" : "Doctor";
    }
};
```

### Python3

```python
class Solution:
    def profession(self, level, pos):
        
        # Convert position to zero-based indexing
        x = pos - 1

        # Count set bits
        cnt = 0
        while x:
            cnt += (x & 1)  # Add 1 if current bit is set
            x >>= 1         # Move to next bit

        # Even flips => Engineer, Odd flips => Doctor
        return "Engineer" if cnt % 2 == 0 else "Doctor"
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains identical in all languages.

### Step 1: Convert Position

The given position is converted to:

```text
pos - 1
```

This helps map the node position directly to its path information.

### Step 2: Count Set Bits

Each set bit represents a move that causes a profession change.

For example:

```text
pos = 5

pos - 1 = 4

Binary = 100

Set Bits = 1
```

There is one profession flip.

### Step 3: Check Parity

If the count of set bits is:

```text
Even
```

The final profession remains:

```text
Engineer
```

If the count is:

```text
Odd
```

The final profession becomes:

```text
Doctor
```

### Why This Works

The profession changes only when moving through a path that corresponds to a right-side transition.

The binary representation of `(pos - 1)` naturally captures those transitions.

Therefore counting set bits directly gives the number of profession flips.

---

## Examples

### Example 1

Input

```text
level = 4
pos = 2
```

Output

```text
Doctor
```

Trace

```text
pos - 1 = 1
Binary = 1
Set Bits = 1

Odd flips
=> Doctor
```

---

### Example 2

Input

```text
level = 3
pos = 4
```

Output

```text
Engineer
```

Trace

```text
pos - 1 = 3
Binary = 11
Set Bits = 2

Even flips
=> Engineer
```

---

### Example 3

Input

```text
level = 5
pos = 8
```

Output

```text
Doctor
```

Trace

```text
pos - 1 = 7
Binary = 111
Set Bits = 3

Odd flips
=> Doctor
```

---

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

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

* The level value is not required for the final calculation.
* The family tree never needs to be generated.
* Bit manipulation provides the most efficient solution.
* The approach easily handles very large inputs.
* An alternative recursive solution exists, but it is slower and less elegant.
* Counting set bits gives the optimal answer directly.

### Common Mistake

Many beginners try to build the entire tree.

That approach becomes impossible for large levels because the number of nodes grows exponentially.

The bit manipulation approach avoids that problem completely.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
