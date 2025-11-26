# AND In Range – Bitwise Range AND

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

**Problem:**
Given two integers `l` and `r`, compute the result of the bitwise AND (`&`) of all integers from `l` to `r` (inclusive).

Formally, return:

[
l \ &\ (l+1) \ &\ (l+2) \ &\ ... \ &\ r
]

Example:
For `l = 8`, `r = 13`:

[
8 & 9 & 10 & 11 & 12 & 13 = 8
]

We must return this value efficiently.

---

## Constraints

Typical GeeksforGeeks version:

* ( 1 \le l \le r \le 10^9 )

So `r - l` can be very large, which means we **cannot** iterate from `l` to `r` and AND everything one by one.

---

## Intuition

I first thought:

> “Why don’t I just loop from `l` to `r` and keep AND-ing everything?”

But then I realized:

* If `r - l` is huge (like up to (10^9)), this would be **too slow**.

So I tried to think in terms of **bits** instead of numbers:

* In any bit position:

  * If, within the range `[l, r]`, that bit is **sometimes 0 and sometimes 1**,
    then the final AND will have **0** in that position.
  * Only bits that are **1 in every single number** of the range can remain 1.

For consecutive numbers, this leads to a key idea:

> The answer is just the **common left (most significant) bits** of `l` and `r`.
> After the first bit position where they differ, all lower bits in the AND become 0.

So instead of AND-ing everything, I only need to find the **common binary prefix** of `l` and `r`.

---

## Approach

1. I keep two variables:

   * `L = l`
   * `R = r`
   * `shift = 0` to count how many bits I remove.

2. While `L` is **less than** `R`:

   * Right shift both: `L >>= 1`, `R >>= 1`.
   * Increase `shift` by 1.
   * This keeps removing least significant bits (LSBs) from both numbers.

3. When `L` becomes equal to `R`:

   * All the differing bits have been chopped off.
   * The remaining value is the **common prefix** of `l` and `r`.

4. Finally:

   * I left shift the common prefix back by `shift` positions: `L << shift`.
   * This restores the number length, but all lower bits become **0**,
     exactly what we want for the AND result.

5. Return `L << shift`.

---

## Data Structures Used

* Only **primitive integers** are used.
* No arrays, no extra data structures.

This keeps the solution **memory-efficient** and simple.

---

## Operations & Behavior Summary

* **Right Shift (`>>`)**

  * `x >> 1` removes the least significant bit of `x`.
  * It’s equivalent to integer division by 2.

* **Left Shift (`<<`)**

  * `x << 1` adds one zero bit on the right.
  * It’s equivalent to multiplication by 2.

* **Bitwise AND (`&`)**

  * `a & b` gives 1 at a bit position only if **both** `a` and `b` have 1 at that position.

Our algorithm **does not** explicitly AND every number in the range.
Instead, it uses bit shifting to compute the same result more efficiently.

---

## Complexity

* **Time Complexity:**
  (O(\log(\max(l, r))))

  * Because in each loop iteration we right shift by 1 bit.
  * The number of bits in an integer up to (10^9) is about 30.
  * So at most ~30 iterations.

* **Space Complexity:**
  (O(1))

  * We only use a few integer variables (`l`, `r`, `shift`).
  * No extra storage grows with input size.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int andInRange(int l, int r) {
        int shift = 0;

        // Keep shifting right until l and r become equal.
        // While l < r, there is at least one bit position
        // where numbers in [l, r] differ, so those bits will
        // all become 0 in the final AND.
        while (l < r) {
            l >>= 1;     // drop the least significant bit of l
            r >>= 1;     // drop the least significant bit of r
            shift++;     // count how many bits we dropped
        }

        // l (or r) now holds the common prefix bits.
        // Shift back, filling the removed lower bits with zeros.
        return l << shift;
    }
};
```

---

### Java

```java
class Solution {
    public int andInRange(int l, int r) {
        int shift = 0;

        // Remove differing lower bits until l and r match.
        while (l < r) {
            l >>= 1;     // remove one least significant bit of l
            r >>= 1;     // remove one least significant bit of r
            shift++;     // track how many bits we removed
        }

        // l (or r) now is the common binary prefix.
        // Restore original length with lower bits as zeros.
        return l << shift;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */
class Solution {
    andInRange(l, r) {
        let shift = 0;

        // Keep shifting until l and r become the same.
        while (l < r) {
            l >>= 1;    // drop one LSB from l
            r >>= 1;    // drop one LSB from r
            shift++;    // count the dropped bits
        }

        // l now equals r and is the common prefix.
        return l << shift;
    }
}
```

---

### Python3

```python
class Solution:
    def andInRange(self, l: int, r: int) -> int:
        shift = 0

        # Remove all differing lower bits by right shifting
        while l < r:
            l >>= 1      # drop lowest bit of l
            r >>= 1      # drop lowest bit of r
            shift += 1   # count how many bits we dropped

        # l (or r) holds the common prefix, shift back
        return l << shift
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the **same** in all languages, just the syntax differs.
Let me break the idea down step by step.

### 1. Initialize `shift`

```cpp
int shift = 0;
```

* I create a variable `shift` to count how many times I right shift.
* Each right shift removes one bit from the right.

In Java, JS, Python: it’s the same idea (`int shift = 0;`, `let shift = 0;`, `shift = 0`).

---

### 2. Loop while `l < r`

```cpp
while (l < r) {
    l >>= 1;
    r >>= 1;
    shift++;
}
```

What is happening here?

* Condition: `l < r`

  * As long as `l` and `r` are different, there is some position where they differ in bits.
  * That means there will be at least one bit position in the range `[l, r]` that is sometimes 0 and sometimes 1.
  * That bit will be 0 in the final AND, so we "remove" those noisy lower bits.

* `l >>= 1;`

  * Right shift `l` by 1.
  * Example: `8` (1000) becomes `4` (0100).

* `r >>= 1;`

  * Same operation on `r`.

* `shift++;`

  * We count how many bits we removed.

This loop gradually strips off the least significant bits until only the **common leading bits** remain.

---

### 3. Why does the loop stop when `l == r`?

* After enough right shifts:

  * All lower, differing bits are removed.
  * Only the same high bits remain in both `l` and `r`.
* When `l == r`, this value is exactly the **common prefix**.

Example: `l = 8 (01000)`, `r = 13 (01101)`

After repeated shifting:

* `l = 1 (00001)`
* `r = 1 (00001)`

They match at `1` → which represents common prefix `01` in the original (after counting shifts).

---

### 4. Rebuild the final answer

```cpp
return l << shift;
```

* `l` currently holds the common prefix.
* We left shift it `shift` times.

  * This restores it to the correct size.
  * Newly created bits on the right are all zeros, which is exactly what AND over the range will give.

Same in Java, JS, Python:

* `return l << shift;`
* `return l << shift;`
* `return l << shift`

---

### 5. Summary of the Algorithm in Words

1. Keep right shifting both `l` and `r` until they become equal.
2. Count how many shifts we did in `shift`.
3. The equal value is the common prefix of `l` and `r`.
4. Left shift that common prefix `shift` times to build the final result.
5. Return that result.

---

## Examples

### Example 1

**Input:**

```text
l = 8, r = 13
```

Binary:

* 8  = `01000`
* 9  = `01001`
* 10 = `01010`
* 11 = `01011`
* 12 = `01100`
* 13 = `01101`

AND-ing all:

```text
8 & 9 & 10 & 11 & 12 & 13 = 8
```

**Output:**

```text
8
```

Using our method:

* Shift 1: `8 -> 4`, `13 -> 6`
* Shift 2: `4 -> 2`, `6 -> 3`
* Shift 3: `2 -> 1`, `3 -> 1`

Now `l == r == 1`, `shift = 3`.

Result: `1 << 3 = 8`.

---

### Example 2

**Input:**

```text
l = 2, r = 3
```

Check manually:

* 2 = `10`
* 3 = `11`

`2 & 3 = 10 (binary) = 2`.

**Output:**

```text
2
```

Using our method:

* `l = 2`, `r = 3`, `shift = 0`
* Shift 1: `2 -> 1`, `3 -> 1`, `shift = 1`
* Now `l == r == 1`
* Result: `1 << 1 = 2`.

---

### Example 3

**Input:**

```text
l = 5, r = 7
```

* 5 = `101`
* 6 = `110`
* 7 = `111`

`5 & 6 & 7 = 4` (`100`).

Our method:

* `l = 5`, `r = 7`, `shift = 0`
* Shift 1: `5 -> 2`, `7 -> 3`, `shift = 1`
* Shift 2: `2 -> 1`, `3 -> 1`, `shift = 2`
* Result: `1 << 2 = 4`.

---

## How to use / Run locally

You can create a small driver to test these functions in each language.

### C++

```bash
g++ -std=c++17 main.cpp -o main
./main
```

**main.cpp:**

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int andInRange(int l, int r) {
        int shift = 0;
        while (l < r) {
            l >>= 1;
            r >>= 1;
            shift++;
        }
        return l << shift;
    }
};

int main() {
    Solution sol;
    int l = 8, r = 13;
    cout << sol.andInRange(l, r) << endl; // Output: 8
    return 0;
}
```

---

### Java

Compile & run:

```bash
javac Main.java
java Main
```

**Main.java:**

```java
class Solution {
    public int andInRange(int l, int r) {
        int shift = 0;
        while (l < r) {
            l >>= 1;
            r >>= 1;
            shift++;
        }
        return l << shift;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int ans = sol.andInRange(8, 13);
        System.out.println(ans); // Output: 8
    }
}
```

---

### JavaScript (Node.js)

Run:

```bash
node main.js
```

**main.js:**

```javascript
class Solution {
    andInRange(l, r) {
        let shift = 0;
        while (l < r) {
            l >>= 1;
            r >>= 1;
            shift++;
        }
        return l << shift;
    }
}

const sol = new Solution();
console.log(sol.andInRange(8, 13)); // Output: 8
```

---

### Python3

Run:

```bash
python3 main.py
```

**main.py:**

```python
class Solution:
    def andInRange(self, l: int, r: int) -> int:
        shift = 0
        while l < r:
            l >>= 1
            r >>= 1
            shift += 1
        return l << shift

if __name__ == "__main__":
    sol = Solution()
    print(sol.andInRange(8, 13))  # Output: 8
```

---

## Notes & Optimizations

* This bit-shift method is a **standard optimal solution** for the “AND of a range” type problems.
* It avoids iterating through the full `[l, r]` range.
* Even for `l, r` up to (10^9), it runs in at most ~30 iterations.
* Works for any integer type that supports bit operations (can be extended to 64-bit).

Possible small improvements (depending on environment):

* Use `long` / `long long` if the platform uses larger ranges.
* In languages like C++/Java, be careful with signed vs unsigned if ranges are extended.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
