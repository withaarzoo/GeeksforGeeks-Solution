# Count Derangements

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

Given a number `n`, find the total number of derangements of elements from `1` to `n`.

A derangement is a permutation where no element appears in its original position.

For example:

* `[2, 1]` is a derangement of `[1, 2]`
* `[2, 3, 1]` is a derangement of `[1, 2, 3]`
* `[1, 3, 2]` is not a derangement because `1` is still in its original position

The answer always fits inside a 32-bit integer.

## Constraints

```text
1 <= n <= 12
```

## Intuition

At first, I thought about generating all permutations and checking whether every element is placed at a different index.

But generating all permutations would take factorial time, which is very slow.

Then I used the standard derangement recurrence relation:

```text
D(n) = (n - 1) * (D(n - 1) + D(n - 2))
```

Where:

* `D(n)` means number of derangements for `n` elements
* `D(1) = 0`
* `D(2) = 1`

This formula helps me build the answer using previously calculated values.

## Approach

1. Handle the base cases:

   * `D(1) = 0`
   * `D(2) = 1`
2. Use two variables:

   * One for `D(n - 2)`
   * One for `D(n - 1)`
3. Loop from `3` to `n`
4. Calculate current derangement count using:

```text
curr = (i - 1) * (prev1 + prev2)
```

1. Move the variables forward
2. Return the final result

This approach avoids using extra arrays and keeps space usage constant.

## Data Structures Used

* Integer variables only
* No extra array or dynamic programming table is needed

## Operations & Behavior Summary

* Handle base cases directly
* Use recurrence relation to build answer
* Store only previous two values
* Return final derangement count

## Complexity

* Time Complexity: `O(n)`

  * I run a loop from `3` to `n`
* Space Complexity: `O(1)`

  * I only use a few variables

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int derangeCount(int n) {
        // Base cases
        if (n == 1) return 0;
        if (n == 2) return 1;

        // D(1) = 0, D(2) = 1
        int prev2 = 0;
        int prev1 = 1;

        // Build answer from 3 to n
        for (int i = 3; i <= n; i++) {
            int curr = (i - 1) * (prev1 + prev2);

            // Update previous values
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
};
```

### Java

```java
class Solution {
    public int derangeCount(int n) {
        // Base cases
        if (n == 1) return 0;
        if (n == 2) return 1;

        // D(1) = 0, D(2) = 1
        int prev2 = 0;
        int prev1 = 1;

        // Build answer from 3 to n
        for (int i = 3; i <= n; i++) {
            int curr = (i - 1) * (prev1 + prev2);

            // Update previous values
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
}
```

### JavaScript

```javascript
class Solution {
    derangeCount(n) {
        // Base cases
        if (n === 1) return 0;
        if (n === 2) return 1;

        // D(1) = 0, D(2) = 1
        let prev2 = 0;
        let prev1 = 1;

        // Build answer from 3 to n
        for (let i = 3; i <= n; i++) {
            let curr = (i - 1) * (prev1 + prev2);

            // Update previous values
            prev2 = prev1;
            prev1 = curr;
        }

        return prev1;
    }
}
```

### Python3

```python
class Solution:
    def derangeCount(self, n: int) -> int:
        # Base cases
        if n == 1:
            return 0
        if n == 2:
            return 1

        # D(1) = 0, D(2) = 1
        prev2 = 0
        prev1 = 1

        # Build answer from 3 to n
        for i in range(3, n + 1):
            curr = (i - 1) * (prev1 + prev2)

            # Update previous values
            prev2 = prev1
            prev1 = curr

        return prev1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Suppose:

```text
n = 5
```

We already know:

```text
D(1) = 0
D(2) = 1
```

Now calculate further values.

For `n = 3`

```text
D(3) = (3 - 1) * (D(2) + D(1))
D(3) = 2 * (1 + 0)
D(3) = 2
```

For `n = 4`

```text
D(4) = (4 - 1) * (D(3) + D(2))
D(4) = 3 * (2 + 1)
D(4) = 9
```

For `n = 5`

```text
D(5) = (5 - 1) * (D(4) + D(3))
D(5) = 4 * (9 + 2)
D(5) = 44
```

So the final answer is:

```text
44
```

### Important Variables

```text
prev2 -> stores D(i - 2)
prev1 -> stores D(i - 1)
curr  -> stores current answer
```

### Flow of Variables

| i | prev2 | prev1 | curr |
| - | ----- | ----- | ---- |
| 3 | 0     | 1     | 2    |
| 4 | 1     | 2     | 9    |
| 5 | 2     | 9     | 44   |

At the end, `prev1` stores the final answer.

## Examples

### Example 1

```text
Input: n = 2
Output: 1
```

Explanation:

```text
Only one derangement exists: [2, 1]
```

### Example 2

```text
Input: n = 3
Output: 2
```

Explanation:

```text
Possible derangements:
[2, 3, 1]
[3, 1, 2]
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
python filename.py
```

## Notes & Optimizations

* I avoided recursion because recursion adds extra stack space.
* I did not use a DP array because only the last two values are needed.
* This makes the solution more optimized in terms of memory.
* Since `n <= 12`, integer overflow is not an issue here.
* The solution is simple, fast, and easy to understand.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
