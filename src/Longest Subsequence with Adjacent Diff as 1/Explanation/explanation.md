# Longest Subsequence with Adjacent Diff as 1

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

The problem asks me to find the length of the longest subsequence in an array where the absolute difference between every two adjacent elements is exactly `1`.

A subsequence does not need to use consecutive elements from the original array. I can skip elements, but I must keep their original order.

For example:

```text
Input:
[10, 9, 4, 5, 4, 8, 6]

One valid subsequence:
4 -> 5 -> 4

Length = 3
```

Another valid subsequence is:

```text
10 -> 9 -> 8
```

So the answer is the maximum length among all such valid subsequences.

The function takes an integer array `arr` and returns an integer representing the length of the longest subsequence with adjacent difference equal to `1`.

## Constraints

| Constraint     | Value                     |
| -------------- | ------------------------- |
| Array size     | `1 <= arr.size() <= 10^6` |
| Array elements | `arr[i] <= 10^6`          |

The large array size means I need an efficient `O(n)` solution rather than checking every possible subsequence.

## Intuition

My first thought was to try building subsequences from every position, but that would quickly become too slow because there can be a huge number of possible subsequences.

Then I noticed something important.

If the current value is `x`, the previous value in a valid subsequence can only be:

```text
x - 1
```

or

```text
x + 1
```

For example, if the current value is `5`, only `4` and `6` can come immediately before it.

So instead of storing every possible subsequence, I only need to remember the best subsequence length ending with each value.

I can represent this as:

```text
dp[x] = longest valid subsequence ending with value x
```

When I process a value `x`, I look at `dp[x - 1]` and `dp[x + 1]`.

I extend whichever one is longer.

This turns the problem into a simple one-pass dynamic programming solution using a hash map.

## Approach

I process the array from left to right.

For every element `x`:

1. I check the longest subsequence ending with `x - 1`.
2. I check the longest subsequence ending with `x + 1`.
3. I take the larger of these two lengths.
4. I add the current element `x`.
5. I store the resulting length as the best subsequence ending with `x`.
6. I update the overall maximum answer.

The main transition is:

```text
dp[x] = max(dp[x - 1], dp[x + 1]) + 1
```

If neither `x - 1` nor `x + 1` has appeared before, both values are treated as `0`, so:

```text
dp[x] = 0 + 1
      = 1
```

That makes sense because the current element itself can always form a subsequence of length `1`.

For example:

```text
Array:
1  2  3  2  3  2  1
|  |  |  |  |  |  |
v  v  v  v  v  v  v

1 -> length 1

2 -> extends 1
     length 2

3 -> extends 2
     length 3

2 -> extends the best subsequence ending at 3
     length 4

3 -> extends 2
     length 5
```

Continuing this process gives:

```text
1 -> 2 -> 3 -> 2 -> 3 -> 2 -> 1

Length = 7
```

The key point is that I only use information from elements already processed, so the order required for a subsequence is automatically maintained.

## Data Structures Used

### Hash Map

I use a hash map to store the best subsequence length for every value encountered so far.

```text
Key   -> Array value
Value -> Longest valid subsequence ending at that value
```

For example:

```text
dp[2] = 4
```

means that the longest valid subsequence ending with value `2` currently has length `4`.

A hash map is useful because the array values can be large, and I only need entries for values that actually occur.

## Operations & Behavior Summary

The algorithm works like this:

```text
Start
  |
  v
Create empty dp map
  |
  v
Read current value x
  |
  v
Check dp[x - 1]
  |
  +------+
  |      |
  v      v
Check dp[x + 1]
  |
  v
Take the larger length
  |
  v
Add 1 for current x
  |
  v
Store result in dp[x]
  |
  v
Update maximum answer
  |
  v
More elements?
  |
  +---- Yes ----> Process next element
  |
  No
  |
  v
Return answer
```

This lets me solve the entire problem in one pass through the array.

## Complexity

| Type             |     Complexity | Explanation                                                                                          |
| ---------------- | -------------: | ---------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` average | I process each of the `n` array elements once and perform constant-time average hash-map operations. |
| Space Complexity | `O(n)` average | The hash map can contain up to `n` different array values.                                           |

Here, `n` is the number of elements in the input array.

The expected solution is efficient enough for an array containing up to `10^6` elements.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int longestSubseq(vector<int>& arr) {
        // dp[x] stores the longest valid subsequence ending with value x.
        unordered_map<int, int> dp;

        // This stores the longest subsequence found anywhere in the array.
        int ans = 0;

        // Process elements from left to right so only previous elements are used.
        for (int x : arr) {
            // A valid previous value must be exactly x - 1 or x + 1.
            int left = dp.count(x - 1) ? dp[x - 1] : 0;
            int right = dp.count(x + 1) ? dp[x + 1] : 0;

            // Extend the longer subsequence by adding the current element x.
            int current = max(left, right) + 1;

            // Store the best length ending with x.
            dp[x] = current;

            // Update the overall maximum answer.
            ans = max(ans, current);
        }

        // Return the length of the longest valid subsequence.
        return ans;
    }
};
```

### Java

```java
class Solution {
    public int longestSubseq(int[] arr) {
        // dp[x] stores the longest valid subsequence ending with value x.
        HashMap<Integer, Integer> dp = new HashMap<>();

        // This stores the longest subsequence found so far.
        int ans = 0;

        // Process the array from left to right to preserve subsequence order.
        for (int x : arr) {
            // Get the best subsequence ending at x - 1, or 0 if it does not exist.
            int left = dp.getOrDefault(x - 1, 0);

            // Get the best subsequence ending at x + 1, or 0 if it does not exist.
            int right = dp.getOrDefault(x + 1, 0);

            // Extend the better neighboring subsequence with the current x.
            int current = Math.max(left, right) + 1;

            // Store the best length ending with value x.
            dp.put(x, current);

            // Update the overall maximum length.
            ans = Math.max(ans, current);
        }

        // Return the longest valid subsequence length.
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
    longestSubseq(arr) {
        // dp stores the longest valid subsequence ending with each value.
        const dp = new Map();

        // This stores the longest subsequence found so far.
        let ans = 0;

        // Process elements from left to right so subsequence order is preserved.
        for (const x of arr) {
            // Get the best subsequence ending at x - 1, or 0 if it does not exist.
            const left = dp.get(x - 1) || 0;

            // Get the best subsequence ending at x + 1, or 0 if it does not exist.
            const right = dp.get(x + 1) || 0;

            // Extend the better neighboring subsequence using the current value x.
            const current = Math.max(left, right) + 1;

            // Store the longest subsequence ending with x.
            dp.set(x, current);

            // Update the overall maximum answer.
            ans = Math.max(ans, current);
        }

        // Return the length of the longest valid subsequence.
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def longestSubseq(self, arr):
        # dp[x] stores the longest valid subsequence ending with value x.
        dp = {}

        # This stores the longest subsequence found so far.
        ans = 0

        # Process elements from left to right to maintain subsequence order.
        for x in arr:
            # Get the best subsequence ending at x - 1, or 0 if it does not exist.
            left = dp.get(x - 1, 0)

            # Get the best subsequence ending at x + 1, or 0 if it does not exist.
            right = dp.get(x + 1, 0)

            # Extend the better neighboring subsequence with the current value x.
            current = max(left, right) + 1

            # Store the longest subsequence ending with x.
            dp[x] = current

            # Update the overall maximum answer.
            ans = max(ans, current)

        # Return the length of the longest valid subsequence.
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the same in all four main implementations. The only difference is how each language creates and accesses a hash map.

### C++

I use `unordered_map<int, int>` because I need to associate each array value with the best subsequence length ending at that value.

For every `x`, I check whether `x - 1` and `x + 1` already exist.

If `x - 1` has a subsequence of length `4` and `x + 1` has a subsequence of length `2`, I choose `4` because it gives the longer result.

Then I add the current element:

```text
4 + 1 = 5
```

I store `5` for `x`.

The answer is updated after every element, so I do not need to perform another pass at the end.

I also avoid creating a two-dimensional DP table. Such a table would use far more memory and is unnecessary because the current value only depends on two neighboring values.

### Java

In Java, I use `HashMap<Integer, Integer>` for the same reason.

The `getOrDefault()` operation makes the implementation convenient. If `x - 1` or `x + 1` has not appeared before, I get `0`.

For example:

```text
x = 5

dp[4] = 3
dp[6] = 1

current = max(3, 1) + 1
        = 4
```

Then I store:

```text
dp[5] = 4
```

The map only keeps the best known length for each value.

### JavaScript

In JavaScript, I use the built-in `Map`.

The logic is exactly the same:

```text
Map value -> best subsequence length
```

I use `get()` to retrieve the stored length.

If there is no entry, I treat it as `0`.

Then I calculate:

```text
current = max(left, right) + 1
```

and store the result using `set()`.

This avoids using a large array indexed directly by the value, which can be wasteful when only a small number of values are actually present.

### Python3

In Python3, I use a dictionary.

The dictionary stores:

```text
dp[value] = best length ending with value
```

Python's `dict.get()` lets me provide `0` when a key does not exist.

For every value `x`, I calculate the best length from `x - 1` and `x + 1`, add `1`, and update the dictionary.

Because I process the array from left to right, the dictionary only represents subsequences that can legally be extended with the current element.

### Why I Do Not Use Normal LIS

This problem may look similar to the Longest Increasing Subsequence problem, but it is different.

Here, the subsequence does not have to be increasing.

For example:

```text
1 -> 2 -> 3 -> 2 -> 3 -> 2 -> 1
```

is valid because every adjacent difference is exactly `1`.

The sequence can move both up and down.

So a standard LIS algorithm is not suitable here.

The important condition is:

```text
abs(current - previous) == 1
```

That is why checking only `x - 1` and `x + 1` is enough.

## Examples

### Example 1

```text
Input:
arr = [10, 9, 4, 4, 8, 6]

Output:
3
```

One longest valid subsequence is:

```text
10 -> 9 -> 8
```

Another is:

```text
4 -> 4
```

but the difference between the two `4`s is `0`, so they cannot be adjacent in a valid subsequence.

A valid subsequence with length `3` is:

```text
4 -> 5 -> 6
```

when the required `5` exists in the array. For the exact given array, the valid length-3 subsequence is:

```text
10 -> 9 -> 8
```

Therefore:

```text
Answer = 3
```

### Example 2

```text
Input:
arr = [1, 2, 3, 2, 3, 7, 2, 1]

Output:
7
```

The algorithm can build:

```text
1 -> 2 -> 3 -> 2 -> 3 -> 2 -> 1
```

Every adjacent difference is `1`:

```text
|1 - 2| = 1
|2 - 3| = 1
|3 - 2| = 1
|2 - 3| = 1
|3 - 2| = 1
|2 - 1| = 1
```

So the answer is:

```text
7
```

### Example 3

```text
Input:
arr = [5]

Output:
1
```

There is only one element.

A single element is always a valid subsequence, so the answer is `1`.

## How to Use / Run Locally

The repository contains the same algorithm implemented in multiple programming languages.

### C++

Save the solution in a file such as:

```text
solution.cpp
```

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

### Java

Save the solution as:

```text
Solution.java
```

Compile it using:

```bash
javac Solution.java
```

Run it using:

```bash
java Solution
```

### JavaScript

Save the solution as:

```text
solution.js
```

Make sure Node.js is installed, then run:

```bash
node solution.js
```

### Python3

Save the solution as:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

For GeeksforGeeks, the platform provides the input handling and calls the required `longestSubseq` function, so only the class and method implementation is needed.

## Notes & Optimizations

The most important optimization is avoiding a brute-force subsequence search.

There can be exponentially many subsequences, so generating them is not practical for large arrays.

I also do not use a traditional `dp[i]` array where every index stores a separate answer. The next state only depends on the values `x - 1` and `x + 1`, so storing the best result by value is enough.

Duplicate values are handled naturally.

For example:

```text
[2, 2, 2]
```

cannot produce a longer valid subsequence because:

```text
|2 - 2| = 0
```

The algorithm also handles negative values correctly because the map can use negative integers as keys.

If the value range were small and strictly bounded, an array could replace the hash map and provide faster constant-time access with lower overhead. However, a hash map is a more general choice because it stores only the values that actually appear.

The main idea to remember is:

```text
Current value = x

Only these two previous values can be used:

x - 1
x + 1

dp[x] = max(dp[x - 1], dp[x + 1]) + 1
```

That single transition is the heart of the solution.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
