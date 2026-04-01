# Consecutive 1's not allowed

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

Given a positive integer `n`, count all possible distinct binary strings of length `n` such that there are no consecutive `1`s.

A binary string contains only `0` and `1`.

For example:

* `000` is valid
* `101` is valid
* `110` is not valid because it contains consecutive `1`s

## Constraints

```text
1 <= n <= 44
```

## Intuition

I thought about building the binary string one character at a time.

At every position, I have only two choices:

* Put `0`
* Put `1`

But if I put `1`, then the previous character cannot also be `1`.

So I decided to keep track of:

* Number of valid strings ending with `0`
* Number of valid strings ending with `1`

If a string ends with `0`, I can append either `0` or `1`.

If a string ends with `1`, I can only append `0`.

This creates a Fibonacci-like pattern.

## Approach

1. Let:

   * `endWith0` = number of valid strings ending with `0`
   * `endWith1` = number of valid strings ending with `1`

2. For length `1`:

   * `0` ends with `0`
   * `1` ends with `1`

   So:

   ```text
   endWith0 = 1
   endWith1 = 1
   ```

3. For every next position:

   * New strings ending with `0` can come from both previous `0` and previous `1`
   * New strings ending with `1` can only come from previous `0`

   So:

   ```text
   newEndWith0 = endWith0 + endWith1
   newEndWith1 = endWith0
   ```

4. Repeat this until length `n`.

5. Final answer:

   ```text
   endWith0 + endWith1
   ```

## Data Structures Used

* Integer variables
* No extra arrays or dynamic programming table is needed

Variables used:

```text
endWith0
endWith1
newEndWith0
newEndWith1
```

## Operations & Behavior Summary

| Variable      | Meaning                                  |
| ------------- | ---------------------------------------- |
| `endWith0`    | Number of valid strings ending with `0`  |
| `endWith1`    | Number of valid strings ending with `1`  |
| `newEndWith0` | Updated count of strings ending with `0` |
| `newEndWith1` | Updated count of strings ending with `1` |

Transition rules:

```text
newEndWith0 = endWith0 + endWith1
newEndWith1 = endWith0
```

## Complexity

* Time Complexity: `O(n)`

  * I run one loop from `2` to `n`

* Space Complexity: `O(1)`

  * I only use a few variables

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countStrings(int n) {
        // Number of valid strings ending with 0
        long long endWith0 = 1;
        
        // Number of valid strings ending with 1
        long long endWith1 = 1;

        // Build answer from length 2 to n
        for (int i = 2; i <= n; i++) {
            long long newEndWith0 = endWith0 + endWith1;
            long long newEndWith1 = endWith0;

            endWith0 = newEndWith0;
            endWith1 = newEndWith1;
        }

        return endWith0 + endWith1;
    }
};
```

### Java

```java
class Solution {
    int countStrings(int n) {
        long endWith0 = 1;
        long endWith1 = 1;

        for (int i = 2; i <= n; i++) {
            long newEndWith0 = endWith0 + endWith1;
            long newEndWith1 = endWith0;

            endWith0 = newEndWith0;
            endWith1 = newEndWith1;
        }

        return (int)(endWith0 + endWith1);
    }
}
```

### JavaScript

```javascript
class Solution {
    countStrings(n) {
        let endWith0 = 1;
        let endWith1 = 1;

        for (let i = 2; i <= n; i++) {
            let newEndWith0 = endWith0 + endWith1;
            let newEndWith1 = endWith0;

            endWith0 = newEndWith0;
            endWith1 = newEndWith1;
        }

        return endWith0 + endWith1;
    }
}
```

### Python3

```python
class Solution:
    def countStrings(self, n):
        endWith0 = 1
        endWith1 = 1

        for i in range(2, n + 1):
            newEndWith0 = endWith0 + endWith1
            newEndWith1 = endWith0

            endWith0 = newEndWith0
            endWith1 = newEndWith1

        return endWith0 + endWith1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Start with strings of length 1

Possible strings:

```text
0
1
```

So:

```text
endWith0 = 1
endWith1 = 1
```

---

### Step 2: Move to the next length

If the previous string ends with `0`:

* I can append `0`
* I can append `1`

If the previous string ends with `1`:

* I can only append `0`
* I cannot append `1` because consecutive `1`s are not allowed

So the transition becomes:

```text
newEndWith0 = endWith0 + endWith1
newEndWith1 = endWith0
```

---

### Step 3: Update values

After calculating new values:

```text
endWith0 = newEndWith0
endWith1 = newEndWith1
```

This means I move to the next string length.

---

### Step 4: Continue until length n

I keep repeating the same process until I reach the required length.

Finally:

```text
answer = endWith0 + endWith1
```

Because valid strings can end with either `0` or `1`.

---

### Dry Run for n = 4

| Length | endWith0 | endWith1 | Total |
| ------ | -------- | -------- | ----- |
| 1      | 1        | 1        | 2     |
| 2      | 2        | 1        | 3     |
| 3      | 3        | 2        | 5     |
| 4      | 5        | 3        | 8     |

Answer = `8`

## Examples

### Example 1

```text
Input: n = 3
Output: 5
```

Valid strings:

```text
000
001
010
100
101
```

---

### Example 2

```text
Input: n = 2
Output: 3
```

Valid strings:

```text
00
01
10
```

---

### Example 3

```text
Input: n = 1
Output: 2
```

Valid strings:

```text
0
1
```

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

## Notes & Optimizations

* This problem can also be solved using dynamic programming array.
* But using only two variables is better because it reduces space usage.
* The answer follows Fibonacci-like growth.
* Since `n <= 44`, integer overflow is not a problem in most languages.
* This is an optimized DP solution with constant space.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
