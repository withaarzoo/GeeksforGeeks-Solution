# Max Dot Product with 0 Insertions | Dynamic Programming Solution

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
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3, C)](#step-by-step-detailed-explanation-c-java-javascript-python3-c)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

This GeeksforGeeks dynamic programming problem asks for the maximum dot product of two arrays when I am allowed to insert zeroes into the second array.

I get two arrays:

* `a[]` of size `n`
* `b[]` of size `m`, where `m <= n`

I can insert `0` anywhere in `b` until its length becomes exactly `n`. After that, I calculate the dot product of both arrays of equal length.

The goal is to find the maximum possible dot product.

In simple words, I am not reordering anything. I am only choosing where to place zeroes in `b` so the final alignment gives the best answer.

## Constraints

| Constraint                | Value                  |
| ------------------------- | ---------------------- |
| `1 <= m <= n`             | `10^3`                 |
| `1 <= a[i], b[i] <= 10^3` | positive integers only |

These constraints make an `O(n * m)` dynamic programming solution the right choice for competitive programming.

## Intuition

My first thought was that I do not really control the order of `b`. I can only stretch it by inserting zeroes.

That means every element of `b` must stay in the same relative order, and each of those elements can either be matched with some element of `a` or be delayed by inserting zeroes before it.

So the real decision at every step is simple:

* use the current element of `a` with the current element of `b`
* or skip the current element of `a` by inserting a zero in `b`

That is a classic dynamic programming setup, because each choice depends on smaller subproblems.

## Approach

I use DP to build the answer step by step.

I define:

`dp[i][j] = maximum dot product using the first i elements of a and the first j elements of b`

For each element of `a`, I consider two options:

1. Skip `a[i-1]`

   * This means I place a zero in `b` at this position.
   * The value stays the same as the previous state.

2. Match `a[i-1]` with `b[j-1]`

   * This means I use both current elements.
   * The new value becomes:
     `dp[i-1][j-1] + a[i-1] * b[j-1]`

I take the maximum of these choices.

Since each row only depends on the previous row, I optimize space and store only one DP array at a time.

This gives an efficient `O(n * m)` solution with `O(m)` extra space.

## Data Structures Used

| Data Structure        | Why I Used It                                                     |
| --------------------- | ----------------------------------------------------------------- |
| Array / Vector / List | To store the current DP state and reuse previous results          |
| Temporary DP array    | To avoid overwriting values that are still needed for transitions |

I do not need any fancy structure here. A simple DP array is enough because the problem is about ordered matching and choosing the best alignment.

## Operations & Behavior Summary

Here is the plain-English flow of the algorithm:

1. Start with all DP states marked as impossible except the base case.
2. For every element in `a`, create a fresh next DP state.
3. For every usable position in `b`, try:

   * skipping the current `a` element
   * matching the current `a` element with the current `b` element
4. Keep the better result.
5. Move to the next element of `a`.
6. At the end, return the DP state for using all `m` elements of `b`.

This is essentially a controlled alignment process where zero insertions are just a way to skip matches.

## Complexity

| Metric           | Complexity | Explanation                                          |
| ---------------- | ---------- | ---------------------------------------------------- |
| Time Complexity  | `O(n * m)` | I process each pair of indices from `a` and `b` once |
| Space Complexity | `O(m)`     | I only keep the current DP row and a temporary copy  |

Here, `n` is the size of `a` and `m` is the size of `b`.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxDotProduct(vector<int>& a, vector<int>& b) {
        int n = a.size(), m = b.size();

        // A very small value to represent an impossible state
        const int NEG = -1e9;

        // dp[j] = answer after processing current prefix of a
        vector<int> dp(m + 1, NEG);

        // Using zero elements from b always gives dot product 0
        dp[0] = 0;

        // Process every element of a
        for (int i = 1; i <= n; i++) {

            // Store previous row before updating
            vector<int> ndp = dp;

            // Try matching current a with every possible b
            for (int j = 1; j <= min(i, m); j++) {

                // Option 1: Skip current a (insert 0 in b)
                ndp[j] = max(ndp[j], dp[j]);

                // Option 2: Match current a with current b
                if (dp[j - 1] != NEG) {
                    ndp[j] = max(ndp[j],
                                 dp[j - 1] + a[i - 1] * b[j - 1]);
                }
            }

            // Move to next row
            dp = ndp;
        }

        // Final answer after using all elements of b
        return dp[m];
    }
};
```

### Java

```java
class Solution {
    public int maxDotProduct(int[] a, int[] b) {

        int n = a.length;
        int m = b.length;

        // Impossible state
        int NEG = -(int)1e9;

        // DP array
        int[] dp = new int[m + 1];

        // Initialize all states as impossible
        for (int i = 1; i <= m; i++) {
            dp[i] = NEG;
        }

        // Using zero elements from b gives 0
        dp[0] = 0;

        // Process every element of a
        for (int i = 1; i <= n; i++) {

            // Copy previous row
            int[] ndp = dp.clone();

            // Try every possible match
            for (int j = 1; j <= Math.min(i, m); j++) {

                // Skip current a
                ndp[j] = Math.max(ndp[j], dp[j]);

                // Match current a with current b
                if (dp[j - 1] != NEG) {
                    ndp[j] = Math.max(
                        ndp[j],
                        dp[j - 1] + a[i - 1] * b[j - 1]
                    );
                }
            }

            // Update DP
            dp = ndp;
        }

        // Final answer
        return dp[m];
    }
}
```

### JavaScript

```javascript
class Solution {
    maxDotProduct(a, b) {

        const n = a.length;
        const m = b.length;

        // Impossible state
        const NEG = -1e9;

        // DP array
        let dp = new Array(m + 1).fill(NEG);

        // Using zero elements from b gives 0
        dp[0] = 0;

        // Process every element of a
        for (let i = 1; i <= n; i++) {

            // Copy previous row
            let ndp = [...dp];

            // Try every possible match
            for (let j = 1; j <= Math.min(i, m); j++) {

                // Skip current a
                ndp[j] = Math.max(ndp[j], dp[j]);

                // Match current a with current b
                if (dp[j - 1] !== NEG) {
                    ndp[j] = Math.max(
                        ndp[j],
                        dp[j - 1] + a[i - 1] * b[j - 1]
                    );
                }
            }

            // Update DP
            dp = ndp;
        }

        // Final answer
        return dp[m];
    }
}
```

### Python3

```python
class Solution:
    def maxDotProduct(self, a, b):
        n = len(a)
        m = len(b)

        # Impossible state
        NEG = -10**9

        # DP array
        dp = [NEG] * (m + 1)

        # Using zero elements from b gives 0
        dp[0] = 0

        # Process every element of a
        for i in range(1, n + 1):

            # Copy previous row
            ndp = dp[:]

            # Try every possible match
            for j in range(1, min(i, m) + 1):

                # Skip current a
                ndp[j] = max(ndp[j], dp[j])

                # Match current a with current b
                if dp[j - 1] != NEG:
                    ndp[j] = max(
                        ndp[j],
                        dp[j - 1] + a[i - 1] * b[j - 1]
                    )

            # Update DP
            dp = ndp

        # Final answer
        return dp[m]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I begin by setting up a DP array.

The base case is important. If I use zero elements from `b`, the dot product is `0`. That is why the first DP state starts at `0`.

All other states start as impossible because I have not matched anything yet.

Then I process the array `a` one element at a time.

For each `a[i]`, I do not update the DP array directly. I first copy the old values into a new array. I do this because each DP transition must use only the previous row. If I overwrite values too early, I would accidentally use updated data in the same round, which would break the logic.

Inside the inner loop, I check every valid prefix length of `b`.

The first option is to skip the current value of `a`. This is the same as inserting `0` into `b` at that position. In DP terms, I keep the old value.

The second option is to match the current values of `a` and `b`. In that case, I add the product `a[i-1] * b[j-1]` to the best answer from the previous state `dp[j-1]`.

After checking both choices, I keep the larger one.

I repeat this until I finish all elements.

At the end, the answer is the best value after using all elements of `b`.

The logic is the same in C++, Java, JavaScript, Python3, and C. The syntax changes, but the idea stays identical.

## Examples

### Example 1

**Input**

`a = [2, 3, 1, 7, 8]`
`b = [3, 6, 7]`

**Output**

`107`

**Trace**

I can insert zeroes into `b` so it becomes:

`[0, 3, 0, 6, 7]`

Then the dot product is:

`2*0 + 3*3 + 1*0 + 7*6 + 8*7 = 107`

So the maximum dot product is `107`.

### Example 2

**Input**

`a = [1, 2, 3]`
`b = [4]`

**Output**

`12`

**Trace**

I insert two zeroes before `4`:

`[0, 0, 4]`

Then:

`1*0 + 2*0 + 3*4 = 12`

So the answer is `12`.

### Example 3

**Input**

`a = [5, 1, 2]`
`b = [3, 4]`

**Output**

`23`

**Trace**

The best alignment is:

`[3, 4, 0]`

Then:

`5*3 + 1*4 + 2*0 = 19`

But another valid placement is:

`[0, 3, 4]`

Then:

`5*0 + 1*3 + 2*4 = 11`

So I compare all valid placements through DP and keep the best possible result.

## How to Use / Run Locally

For each language, I can paste the solution into a file and run it locally.

### C++

Compile and run with:

```bash
g++ -std=c++17 -O2 -o main main.cpp
./main
```

### Java

Compile and run with:

```bash
javac Solution.java
java Solution
```

### JavaScript

Run with Node.js:

```bash
node solution.js
```

### Python3

Run with:

```bash
python3 solution.py
```

## Notes & Optimizations

This problem looks like a simple dot product at first, but the zero insertions make it a sequence alignment problem.

A greedy choice does not work here because a locally good match can block a better future match.

The dynamic programming solution is safe because it checks every valid alignment in a structured way.

The space optimization from `O(n * m)` to `O(m)` is useful here because the transition only needs the previous row.

If I were writing for a very large input, I would still keep the same DP idea, because this is already the standard efficient approach for this problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
