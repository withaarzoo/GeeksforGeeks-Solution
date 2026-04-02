# Painting the Fence

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

Given `n` fence posts and `k` colors, I need to find the number of ways to paint the fence such that not more than 2 consecutive posts have the same color.

That means:

* Two adjacent posts can have the same color.
* But three adjacent posts cannot have the same color.

I need to return the total number of valid ways.

---

## Constraints

```text
1 <= n <= 300
1 <= k <= 10^5
```

---

## Intuition

I thought about dividing the problem into two states:

1. The last two posts have the same color.
2. The last two posts have different colors.

This makes the problem much easier.

For every new post:

* If I want the current post to be the same as the previous post, then the previous two posts must be different.
* If I want the current post to be different from the previous post, then I can choose any of the remaining `(k - 1)` colors.

So I only need two variables:

* `same`
* `diff`

---

## Approach

For the first post:

```text
ways = k
```

For the second post:

```text
same = k
```

Because both posts can have the same color.

```text
diff = k * (k - 1)
```

Because the second post can have any color except the first one.

From the third post onwards:

```text
newSame = diff
```

Because I can only make the current post same if the previous two were different.

```text
newDiff = (same + diff) * (k - 1)
```

Because I can choose any different color from the previous post.

Finally:

```text
answer = same + diff
```

---

## Data Structures Used

I do not need any array or extra DP table.

I only use:

* Integer variables
* Long variables for large multiplication

Variables used:

```text
same
 diff
 newSame
 newDiff
```

So the solution is memory efficient.

---

## Operations & Behavior Summary

| Variable  | Meaning                                         |
| --------- | ----------------------------------------------- |
| `same`    | Ways where last two posts have same color       |
| `diff`    | Ways where last two posts have different colors |
| `newSame` | Updated value of same                           |
| `newDiff` | Updated value of diff                           |

Transition:

```text
newSame = diff
newDiff = (same + diff) * (k - 1)
```

---

## Complexity

* Time Complexity: `O(n)`

  * I iterate through all fence posts once.

* Space Complexity: `O(1)`

  * I only use a few variables.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countWays(int n, int k) {
        // If there is only one post
        if (n == 1) return k;

        // same = ways where last two posts have same color
        long long same = k;

        // diff = ways where last two posts have different colors
        long long diff = 1LL * k * (k - 1);

        // Process from 3rd post to nth post
        for (int i = 3; i <= n; i++) {
            long long newSame = diff;
            long long newDiff = (same + diff) * (k - 1);

            same = newSame;
            diff = newDiff;
        }

        return same + diff;
    }
};
```

### Java

```java
class Solution {
    int countWays(int n, int k) {
        // If there is only one post
        if (n == 1) return k;

        // same = ways where last two posts have same color
        long same = k;

        // diff = ways where last two posts have different colors
        long diff = (long) k * (k - 1);

        // Process from 3rd post to nth post
        for (int i = 3; i <= n; i++) {
            long newSame = diff;
            long newDiff = (same + diff) * (k - 1);

            same = newSame;
            diff = newDiff;
        }

        return (int)(same + diff);
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @returns {number}
 */
class Solution {
    countWays(n, k) {
        // If there is only one post
        if (n === 1) return k;

        // same = ways where last two posts have same color
        let same = k;

        // diff = ways where last two posts have different colors
        let diff = k * (k - 1);

        // Process from 3rd post to nth post
        for (let i = 3; i <= n; i++) {
            let newSame = diff;
            let newDiff = (same + diff) * (k - 1);

            same = newSame;
            diff = newDiff;
        }

        return same + diff;
    }
}
```

### Python3

```python
class Solution:
    def countWays(self, n, k):
        # If there is only one post
        if n == 1:
            return k

        # same = ways where last two posts have same color
        same = k

        # diff = ways where last two posts have different colors
        diff = k * (k - 1)

        # Process from 3rd post to nth post
        for i in range(3, n + 1):
            new_same = diff
            new_diff = (same + diff) * (k - 1)

            same = new_same
            diff = new_diff

        return same + diff
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Handle Base Case

If there is only one post, then I can paint it using any of the `k` colors.

```text
if n == 1
return k
```

---

### Step 2: Initialize `same`

```text
same = k
```

This means:

* First post = Red
* Second post = Red

Or:

* First post = Blue
* Second post = Blue

So there are exactly `k` ways.

---

### Step 3: Initialize `diff`

```text
diff = k * (k - 1)
```

For every first post color, I can choose any different color for the second post.

Example:

If `k = 3`, colors are:

```text
R, G, B
```

Possible different combinations:

```text
RG
RB
GR
GB
BR
BG
```

---

### Step 4: Iterate from Third Post

For every post from `3` to `n`:

```text
newSame = diff
```

Because I can only make the current post same as previous if the previous two were already different.

```text
newDiff = (same + diff) * (k - 1)
```

Because:

* `(same + diff)` gives total previous valid ways
* `(k - 1)` means choosing a different color from the previous post

Then update:

```text
same = newSame
diff = newDiff
```

---

### Step 5: Return Final Answer

```text
return same + diff
```

Because both states are valid.

---

## Examples

### Example 1

```text
Input:
n = 3
k = 2

Output:
6
```

Explanation:

```text
RRB
RBR
RBB
BRR
BRB
BBR
```

---

### Example 2

```text
Input:
n = 2
k = 4

Output:
16
```

Explanation:

For first post, I have 4 choices.

For second post, I again have 4 choices.

```text
4 * 4 = 16
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

* I used only two variables instead of a DP array.
* This reduces space complexity from `O(n)` to `O(1)`.
* I used long data types in C++ and Java to avoid overflow during multiplication.
* The final answer is guaranteed to fit inside a 32-bit integer.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
