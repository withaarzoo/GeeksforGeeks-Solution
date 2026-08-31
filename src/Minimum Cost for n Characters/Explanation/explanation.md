# Minimum Cost for n Characters

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

The problem gives four integers: `n`, `i`, `d`, and `c`.

The screen starts empty, and I need to get exactly `n` characters on the screen with the minimum possible cost.

There are three operations available:

1. **Insert** one character
   Cost: `i`

2. **Delete** the last character
   Cost: `d`

3. **Copy-Paste** the entire current string
   Cost: `c`

The copy-paste operation doubles the current number of characters.

For example, if the screen has 5 characters, one copy-paste operation changes it from 5 to 10 characters.

The main challenge is that sometimes it is cheaper to go above `n` characters and then delete some characters instead of inserting them one by one.

This solution uses **Dynamic Programming (DP)** to find the minimum cost for every possible length from `0` to `n`.

## Constraints

| Constraint | Range            |
| ---------- | ---------------- |
| `n`        | `1 <= n <= 10^6` |
| `i`        | `1 <= i <= 100`  |
| `d`        | `1 <= d <= 100`  |
| `c`        | `1 <= c <= 100`  |

## Intuition

I first thought about how I could reach a particular number of characters.

If I already have `x - 1` characters, I can always insert one more character. So one possible transition is:

`dp[x] = dp[x - 1] + i`

But copy-paste changes the length much faster.

If the target length is even, such as `8`, I can make `4` characters and copy-paste them:

`4 -> 8`

For an odd target such as `9`, I cannot reach 9 directly with one copy-paste. I have two useful choices:

`4 -> 8 -> 9`

or:

`5 -> 10 -> 9`

The first one uses an insertion after copying.

The second one goes one character above the target and uses a deletion.

This second option is especially important when insertion is expensive and deletion is cheap.

So I decided to store the minimum cost required to create every length and use those already calculated values to build the answer.

## Approach

I define:

`dp[x] = minimum cost required to obtain exactly x characters`

The starting state is:

`dp[0] = 0`

For every `x` from `1` to `n`, I consider the possible ways to reach it.

First, I insert one character:

`dp[x - 1] + i`

If `x` is even, I can also copy-paste from `x / 2`:

`dp[x / 2] + c`

If `x` is odd, I consider two copy-paste possibilities.

The first is:

`floor(x / 2) -> x - 1 -> x`

So the cost is:

`dp[x / 2] + c + i`

The second is:

`ceil(x / 2) -> x + 1 -> x`

So the cost is:

`dp[x / 2 + 1] + c + d`

I take the minimum of all valid choices.

After processing every length, `dp[n]` gives the minimum cost.

## Data Structures Used

### Dynamic Programming Array

I use a one-dimensional `dp` array of size `n + 1`.

`dp[x]` stores the minimum cost needed to get exactly `x` characters.

I use an array because each state only depends on a few previously calculated states. There is no need for a graph, map, set, or any other complex data structure.

## Operations & Behavior Summary

The algorithm works in this order:

1. Create a DP array from `0` to `n`.
2. Set `dp[0] = 0` because the screen starts empty.
3. Start calculating answers from length `1`.
4. For every length `x`, first consider inserting one character.
5. If `x` is even, consider copying from `x / 2`.
6. If `x` is odd, consider:

   * Copying from `floor(x / 2)` and inserting one character.
   * Copying from `ceil(x / 2)` and deleting one character.
7. Store the cheapest option in `dp[x]`.
8. Return `dp[n]`.

In simple pseudocode:

```text
dp[0] = 0

for x = 1 to n:
    dp[x] = dp[x - 1] + insertCost

    if x is even:
        try:
            dp[x / 2] + copyCost

    else:
        try:
            dp[x / 2] + copyCost + insertCost
        try:
            dp[x / 2 + 1] + copyCost + deleteCost

return dp[n]
```

## Complexity

| Complexity       | Cost   | Explanation                                                                         |
| ---------------- | ------ | ----------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | I calculate each DP state from `1` to `n` once, and each state takes constant time. |
| Space Complexity | `O(n)` | I store one minimum-cost value for every length from `0` to `n`.                    |

Here, `n` is the exact number of characters required on the screen.

Since `n` can be as large as `10^6`, an `O(n)` solution is suitable for the given constraints.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minCost(int n, int i, int d, int c) {
        // dp[x] stores the minimum cost needed to get exactly x characters.
        vector<int> dp(n + 1, 0);

        // The screen is initially empty, so getting 0 characters costs nothing.
        dp[0] = 0;

        // Calculate the answer for every length from 1 to n.
        for (int x = 1; x <= n; x++) {
            // The simplest way to get x characters is to insert one
            // character after already getting x - 1 characters.
            dp[x] = dp[x - 1] + i;

            if (x % 2 == 0) {
                // If x is even, x / 2 characters can be copied exactly
                // to make x characters.
                dp[x] = min(dp[x], dp[x / 2] + c);
            } else {
                // For odd x, start with floor(x / 2) characters,
                // copy them, and insert the remaining one character.
                dp[x] = min(dp[x], dp[x / 2] + c + i);

                // Another option is to start with ceil(x / 2) characters,
                // copy them to get x + 1 characters, and delete one.
                dp[x] = min(dp[x], dp[x / 2 + 1] + c + d);
            }
        }

        // dp[n] contains the minimum cost for exactly n characters.
        return dp[n];
    }
};
```

### Java

```java
class Solution {
    public int minCost(int n, int i, int d, int c) {
        // dp[x] stores the minimum cost needed to get exactly x characters.
        int[] dp = new int[n + 1];

        // The screen starts empty, so the cost for 0 characters is zero.
        dp[0] = 0;

        // Build the DP values from smaller lengths to larger lengths.
        for (int x = 1; x <= n; x++) {
            // Insert one character after reaching x - 1 characters.
            dp[x] = dp[x - 1] + i;

            if (x % 2 == 0) {
                // For an even length, copy x / 2 characters to get exactly x.
                dp[x] = Math.min(dp[x], dp[x / 2] + c);
            } else {
                // Start with floor(x / 2), copy, then insert one character.
                dp[x] = Math.min(dp[x], dp[x / 2] + c + i);

                // Start with ceil(x / 2), copy to x + 1, then delete one.
                dp[x] = Math.min(dp[x], dp[x / 2 + 1] + c + d);
            }
        }

        // Return the minimum cost for exactly n characters.
        return dp[n];
    }
}
```

### JavaScript

```javascript
class Solution {
    minCost(n, i, d, c) {
        // dp[x] stores the minimum cost needed to get exactly x characters.
        const dp = new Array(n + 1).fill(0);

        // The screen is initially empty, so the cost for 0 characters is zero.
        dp[0] = 0;

        // Calculate the minimum cost for every length from 1 to n.
        for (let x = 1; x <= n; x++) {
            // Insert one character after reaching x - 1 characters.
            dp[x] = dp[x - 1] + i;

            if (x % 2 === 0) {
                // If x is even, copying x / 2 characters gives exactly x.
                dp[x] = Math.min(dp[x], dp[x / 2] + c);
            } else {
                // Copy floor(x / 2) characters and insert the remaining one.
                dp[x] = Math.min(dp[x], dp[Math.floor(x / 2)] + c + i);

                // Copy ceil(x / 2) characters to get x + 1,
                // then delete one character to reach exactly x.
                dp[x] = Math.min(dp[x], dp[Math.floor(x / 2) + 1] + c + d);
            }
        }

        // dp[n] is the minimum cost required to get exactly n characters.
        return dp[n];
    }
};
```

### Python3

```python
class Solution:
    def minCost(self, n: int, i: int, d: int, c: int) -> int:
        # dp[x] stores the minimum cost needed to get exactly x characters.
        dp = [0] * (n + 1)

        # The screen starts empty, so getting 0 characters costs nothing.
        dp[0] = 0

        # Build the answer for every length from 1 to n.
        for x in range(1, n + 1):
            # Insert one character after reaching x - 1 characters.
            dp[x] = dp[x - 1] + i

            if x % 2 == 0:
                # For an even x, copying x / 2 characters gives exactly x.
                dp[x] = min(dp[x], dp[x // 2] + c)
            else:
                # Copy floor(x / 2) characters and insert one more character.
                dp[x] = min(dp[x], dp[x // 2] + c + i)

                # Copy ceil(x / 2) characters to get x + 1,
                # then delete one character to reach exactly x.
                dp[x] = min(dp[x], dp[x // 2 + 1] + c + d)

        # Return the minimum cost needed to get exactly n characters.
        return dp[n]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The implementation in all languages follows the same Dynamic Programming idea. Only the syntax changes.

I first create an array with `n + 1` positions. Position `x` represents exactly `x` characters on the screen.

The extra position for `0` is necessary because the screen starts empty.

The initial value is:

`dp[0] = 0`

There is no cost to have zero characters because that is the starting state.

Next, I loop from `1` to `n`.

For every `x`, I first assume that the final operation is an insertion. If I already know the cheapest way to get `x - 1` characters, I can add one character for cost `i`.

So the initial value for the current state is:

`dp[x - 1] + i`

This option is always valid.

Then I check whether `x` is even.

If it is even, I can reach `x` directly by copying a string containing `x / 2` characters.

For example:

`4 -> 8`

The copy-paste operation costs `c`, so the total candidate cost is:

`dp[x / 2] + c`

I compare this with the insertion option and keep whichever is cheaper.

For an odd `x`, direct doubling is impossible.

Suppose `x = 9`.

I can start with 4 characters, copy them to get 8, and insert one:

`4 -> 8 -> 9`

This gives:

`dp[4] + c + i`

There is another option.

I can start with 5 characters, copy them to get 10, and delete one:

`5 -> 10 -> 9`

This gives:

`dp[5] + c + d`

Since `(9 / 2) + 1 = 5` using integer division, this becomes:

`dp[x / 2 + 1] + c + d`

I compare both options with the current minimum.

The same calculations are used in C++, Java, JavaScript, Python3, and C#. The only differences are the array declaration, loop syntax, and functions used for taking the minimum value.

One important edge case is `n = 1`.

There is no useful copy-paste operation because the screen starts with zero characters. The answer is simply the cost of inserting one character:

`dp[1] = i`

Another important case is when deletion is much cheaper than insertion.

For example, if `i = 10` and `d = 1`, it can be better to create extra characters using copy-paste and then delete them.

That is why I do not restrict the DP to states that never go above the target. The odd-length transition explicitly handles this useful overshooting case.

The DP array also avoids recomputing the minimum cost for smaller lengths. Once `dp[x]` has been calculated, I can directly reuse it whenever another state needs it.

## Examples

### Example 1

**Input**

```text
n = 9, i = 1, d = 2, c = 1
```

**Expected Output**

```text
5
```

A minimum-cost sequence is:

```text
1 -> 2 -> 4 -> 8 -> 9
```

The operations are:

```text
Insert       = 1
Insert       = 1
Copy-Paste   = 1
Copy-Paste   = 1
Insert       = 1
```

Total:

```text
1 + 1 + 1 + 1 + 1 = 5
```

So the minimum cost is `5`.

### Example 2

**Input**

```text
n = 9, i = 10, d = 1, c = 1
```

**Expected Output**

```text
17
```

Here insertion is expensive, while deletion and copy-paste are cheap.

A useful sequence is:

```text
0 -> 1 -> 2 -> 4 -> 3 -> 6 -> 5 -> 10 -> 9
```

The operations cost:

```text
Insert       = 10
Copy-Paste   = 1
Copy-Paste   = 1
Delete       = 1
Copy-Paste   = 1
Delete       = 1
Copy-Paste   = 1
Delete       = 1
```

Total:

```text
10 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 17
```

This example shows why deleting after copy-paste can be useful.

### Example 3

**Input**

```text
n = 1, i = 5, d = 10, c = 2
```

**Expected Output**

```text
5
```

There is no reason to use copy-paste because the screen is empty.

I simply insert one character:

```text
0 -> 1
```

The cost is `5`.

## How to Use / Run Locally

The code follows the standard GeeksforGeeks `Solution` class format. If I want to test it locally, I can place the solution inside a small driver program that reads the input and calls `minCost()`.

### C++

Save the solution as `main.cpp`.

Compile it with:

```bash
g++ -std=c++17 -O2 -o main main.cpp
```

Run it with:

```bash
./main
```

### Java

Save the solution as `Solution.java`.

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

For local testing, I can add a `main()` method that creates a `Solution` object and calls `minCost()`.

### JavaScript

Save the solution as `solution.js`.

Run it with Node.js:

```bash
node solution.js
```

I can add a small test case at the bottom of the file to call the `minCost()` method.

### Python3

Save the solution as `solution.py`.

Run it with:

```bash
python3 solution.py
```

I can create a `Solution` object and call `minCost()` with the required values for local testing.

## Notes & Optimizations

The main optimization is avoiding a large state-space search. I do not try every possible sequence of insert, delete, and copy-paste operations.

Instead, I keep only the minimum cost for each possible string length.

The most important observation is the handling of odd lengths.

For an odd target `x`, copying from `x / 2` reaches `x - 1`, so I can insert one character.

Alternatively, copying from `x / 2 + 1` reaches `x + 1`, so I can delete one character.

This covers both directions around the target.

The solution uses `O(n)` memory because it keeps the complete DP array. Since `n` can reach `10^6`, this is still practical with the given constraints.

I also use integer arithmetic because all costs and `n` are integers.

For this problem, the DP approach gives `O(n)` time and `O(n)` auxiliary space, matching the expected complexity shown in the problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
