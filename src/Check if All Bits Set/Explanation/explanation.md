# Check if All Bits Set

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations--Behavior-Summary](#operations--behavior-summary)
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

This problem asks us to check whether all bits in the binary representation of a given number are set to `1`.

In simple words:

* If the number looks like `1`, `11`, `111`, `1111` in binary form, then the answer is `true`
* Otherwise, the answer is `false`

Examples:

* `7` in binary is `111` → all bits are set
* `8` in binary is `1000` → not all bits are set
* `0` in binary is `0` → no set bits

This is a very common bit manipulation problem in Data Structures and Algorithms because it teaches an important binary pattern and helps improve understanding of bitwise operations.

---

## Constraints

| Constraint         | Value          |
| ------------------ | -------------- |
| Minimum value of n | 0              |
| Maximum value of n | 10<sup>5</sup> |

---

## Intuition

When I first looked at this problem, I noticed something interesting about numbers whose all bits are set.

Examples:

| Number | Binary |
| ------ | ------ |
| 1      | 1      |
| 3      | 11     |
| 7      | 111    |
| 15     | 1111   |

All these numbers become powers of two after adding `1`.

Example:

* `7 + 1 = 8`
* Binary:

  * `111 + 1 = 1000`

That means if a number has all bits set, then the current number and the next number will never share any common set bit.

This leads to one important bitwise condition:

```text
n & (n + 1) == 0
```

That single operation solves the problem in constant time.

---

## Approach

I solved this problem using bit manipulation.

Step-by-step idea:

1. First, I checked if the number is `0`
2. If it is `0`, I returned `false`
3. Then I used the bitwise AND operator
4. I calculated:

   ```text
   n & (n + 1)
   ```

5. If the result becomes `0`, then all bits are set
6. Otherwise, at least one bit is unset

This approach is fast, clean, and optimized.

---

## Data Structures Used

| Data Structure          | Why It Was Used                                                 |
| ----------------------- | --------------------------------------------------------------- |
| No extra data structure | The solution only uses bitwise operations and integer variables |

This problem does not require arrays, stacks, queues, maps, or any additional memory structure.

---

## Operations & Behavior Summary

The algorithm performs these operations:

1. Read the integer value
2. Handle the edge case where `n = 0`
3. Add `1` to the number
4. Perform a bitwise AND operation
5. Check whether the result equals `0`
6. Return `true` if all bits are set
7. Otherwise return `false`

This is a pure bit manipulation solution with constant runtime.

---

## Complexity

| Type             | Complexity | Explanation                               |
| ---------------- | ---------- | ----------------------------------------- |
| Time Complexity  | O(1)       | Only one bitwise operation is performed   |
| Space Complexity | O(1)       | No extra memory or data structure is used |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isBitSet(int n) {
        
        // 0 does not have all bits set
        if (n == 0)
            return false;

        // If all bits are set,
        // n & (n + 1) becomes 0
        return (n & (n + 1)) == 0;
    }
};
```

### Java

```java
class Solution {
    public boolean isBitSet(int n) {
        
        // 0 does not have all bits set
        if (n == 0)
            return false;

        // If all bits are set,
        // n & (n + 1) becomes 0
        return (n & (n + 1)) == 0;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */

class Solution {
    isBitSet(n) {
        
        // 0 does not have all bits set
        if (n === 0)
            return false;

        // If all bits are set,
        // n & (n + 1) becomes 0
        return (n & (n + 1)) === 0;
    }
}
```

### Python3

```python
class Solution:
    def isBitSet(self, n):
        
        # 0 does not have all bits set
        if n == 0:
            return False

        # If all bits are set,
        # n & (n + 1) becomes 0
        return (n & (n + 1)) == 0
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages. Only syntax changes slightly.

The first thing the algorithm checks is whether the number is `0`.

Why?

Because `0` does not contain any set bit.

Without this condition, the expression:

```text
0 & 1
```

would incorrectly produce `0`, making the answer look valid.

After handling that edge case, the algorithm performs:

```text
n & (n + 1)
```

This is the key observation behind the solution.

Suppose:

```text
n = 7
```

Binary representation:

```text
111
```

Now add `1`:

```text
1000
```

Perform AND operation:

```text
111
1000
----
000
```

Result becomes `0`.

This only happens when the original number had every bit set.

Now consider another example:

```text
n = 10
```

Binary:

```text
1010
```

After adding `1`:

```text
1011
```

AND operation:

```text
1010
1011
----
1010
```

Result is not `0`.

So not all bits are set.

This technique is much better than checking each bit one by one using loops because:

* it avoids unnecessary iteration
* it works instantly
* it uses constant space
* it is a standard optimized bit manipulation trick used in coding interviews and competitive programming

---

## Examples

### Example 1

Input:

```text
n = 7
```

Binary:

```text
111
```

Process:

```text
7 & 8
111 & 1000
= 0
```

Output:

```text
true
```

Explanation:

All bits are set to `1`.

---

### Example 2

Input:

```text
n = 8
```

Binary:

```text
1000
```

Process:

```text
8 & 9
1000 & 1001
= 1000
```

Output:

```text
false
```

Explanation:

Not all bits are set.

---

### Example 3

Input:

```text
n = 0
```

Output:

```text
false
```

Explanation:

`0` does not contain any set bit.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ filename.cpp -o output
```

Run:

```bash
./output
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run:

```bash
python filename.py
```

---

## Notes & Optimizations

* This is an optimized bit manipulation solution
* No loops are required
* No extra memory is used
* The solution works in constant time
* Handling `n = 0` separately is important
* Another possible approach is checking every bit manually using loops, but that would be less efficient

This problem is useful for learning:

* Bitwise AND operator
* Binary number patterns
* Power of two relationships
* Competitive programming optimization tricks

Relevant DSA and competitive programming keywords:

* Bit Manipulation
* Binary Representation
* Bitwise Operations
* Optimized DSA Solution
* GeeksforGeeks Bit Manipulation Problem
* Constant Time Algorithm
* Binary Tricks

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
