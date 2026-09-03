# Max Adjacent Diffs Sum with 1 Replacements

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

Given an integer array `arr`, I can replace any number of elements with `1`.

After making these replacements, I need to find the maximum possible sum of absolute differences between every pair of consecutive elements.

For every adjacent pair, I calculate:

`|arr[i] - arr[i - 1]|`

The goal is to choose which elements should stay unchanged and which elements should become `1` so that the total sum is as large as possible.

### Input

An integer array `arr`.

### Output

Return the maximum possible sum of absolute differences between consecutive elements after any number of replacements.

This problem can be solved efficiently using dynamic programming with constant extra space.

## Constraints

* `1 <= arr.size() <= 10^5`
* Each element of the array is an integer.
* Any element can be replaced with `1`.
* Zero or more replacements are allowed.

## Intuition

My first thought was to try replacing every element in different ways and calculate the answer. But that would quickly become impossible because every element has two choices: keep it or change it to `1`.

With `n` elements, that would create `2^n` possible arrays.

I noticed that when I am processing one element, I only care about what happened to the previous element.

The current element also has only two possible states:

1. I keep it unchanged.
2. I replace it with `1`.

So I can keep two DP states while moving through the array.

One state stores the best sum when the current element is unchanged, and the other stores the best sum when the current element is replaced with `1`.

This reduces the problem to a simple `O(n)` dynamic programming solution.

## Approach

I maintain two values:

* `keep`: maximum sum when the current element is kept unchanged.
* `replace`: maximum sum when the current element is replaced with `1`.

For every element from the second position onward, I consider both possibilities.

If I keep the current element, the previous element could either have been kept or replaced.

So I calculate:

* Previous kept: `keep + |arr[i] - arr[i-1]|`
* Previous replaced: `replace + |arr[i] - 1|`

I take the larger value.

If I replace the current element with `1`, the previous element could again either have been kept or replaced.

So I calculate:

* Previous kept: `keep + |1 - arr[i-1]|`
* Previous replaced: `replace + |1 - 1|`

Since `|1 - 1| = 0`, the second case is simply `replace`.

After calculating these two new states, I update `keep` and `replace`.

At the end, the answer is the maximum of the two states because the last element can either be unchanged or replaced.

## Data Structures Used

No extra data structure such as an array, stack, queue, or map is required.

I only use two DP variables:

* `keep` — best result when the current element remains unchanged.
* `replace` — best result when the current element becomes `1`.

This is enough because the next calculation only depends on the previous element's two possible states.

## Operations & Behavior Summary

The algorithm works like this:

1. Start with `keep = 0` and `replace = 0`.
2. Start processing from the second element.
3. Calculate the best result if the current element is kept.
4. Calculate the best result if the current element is replaced with `1`.
5. Store these two results as the states for the current element.
6. Continue until the array ends.
7. Return the larger value between the final `keep` and `replace` states.

In simple pseudocode:

```text
keep = 0
replace = 0

for every element from index 1:
    newKeep = maximum of:
        keep + |current - previous|
        replace + |current - 1|

    newReplace = maximum of:
        keep + |1 - previous|
        replace + 0

    keep = newKeep
    replace = newReplace

answer = max(keep, replace)
```

## Complexity

| Complexity       | Cost   | Explanation                                                                            |
| ---------------- | ------ | -------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n)` | I visit every element of the array once, where `n` is the number of elements in `arr`. |
| Space Complexity | `O(1)` | I only use a few variables for the DP states and do not create any extra array.        |

This is optimal for the given constraint of up to `10^5` elements.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxDiffSum(vector<int>& arr) {
        // keep stores the best sum when the previous element is kept unchanged.
        long long keep = 0;

        // replace stores the best sum when the previous element is replaced by 1.
        long long replace = 0;

        // Start from the second element because the first element has no adjacent difference.
        for (int i = 1; i < arr.size(); i++) {
            // Calculate the best sum if arr[i] is kept unchanged.
            // The previous element can either be kept or replaced by 1.
            long long newKeep = max(
                keep + abs(arr[i] - arr[i - 1]),
                replace + abs(arr[i] - 1)
            );

            // Calculate the best sum if arr[i] is replaced by 1.
            // If the previous element is kept, the difference is |1 - arr[i-1]|.
            // If the previous element was also replaced, the difference is |1 - 1| = 0.
            long long newReplace = max(
                keep + abs(1 - arr[i - 1]),
                replace
            );

            // Move the current states to the previous states for the next position.
            keep = newKeep;
            replace = newReplace;
        }

        // The final element can be either kept or replaced, so take the better state.
        return (int)max(keep, replace);
    }
};
```

### Java

```java
class Solution {
    public int maxDiffSum(int[] arr) {
        // keep stores the best sum when the previous element is kept unchanged.
        long keep = 0;

        // replace stores the best sum when the previous element is replaced by 1.
        long replace = 0;

        // Start from the second element because the first element has no previous neighbor.
        for (int i = 1; i < arr.length; i++) {
            // Calculate the best sum if the current element is kept unchanged.
            // The previous element can either be kept or replaced by 1.
            long newKeep = Math.max(
                keep + Math.abs((long) arr[i] - arr[i - 1]),
                replace + Math.abs((long) arr[i] - 1)
            );

            // Calculate the best sum if the current element is replaced by 1.
            // Keeping the previous element gives |1 - arr[i-1]|.
            // Replacing both elements gives |1 - 1| = 0.
            long newReplace = Math.max(
                keep + Math.abs(1L - arr[i - 1]),
                replace
            );

            // Update the states so they represent the current element.
            keep = newKeep;
            replace = newReplace;
        }

        // The last element can be in either state, so return the better result.
        return (int) Math.max(keep, replace);
    }
}
```

### JavaScript

```javascript
class Solution {
    maxDiffSum(arr) {
        // keep stores the best sum when the previous element is kept unchanged.
        let keep = 0;

        // replace stores the best sum when the previous element is replaced by 1.
        let replace = 0;

        // Start from the second element because the first element has no previous neighbor.
        for (let i = 1; i < arr.length; i++) {
            // Calculate the best sum if the current element is kept unchanged.
            // The previous element can either be kept or replaced by 1.
            const newKeep = Math.max(
                keep + Math.abs(arr[i] - arr[i - 1]),
                replace + Math.abs(arr[i] - 1)
            );

            // Calculate the best sum if the current element is replaced by 1.
            // Keeping the previous element gives |1 - arr[i-1]|.
            // Replacing both elements gives |1 - 1| = 0.
            const newReplace = Math.max(
                keep + Math.abs(1 - arr[i - 1]),
                replace
            );

            // Update both states for the next element.
            keep = newKeep;
            replace = newReplace;
        }

        // The final element can be kept or replaced, so return the better state.
        return Math.max(keep, replace);
    }
}
```

### Python3

```python
class Solution:
    def maxDiffSum(self, arr):
        # keep stores the best sum when the previous element is kept unchanged.
        keep = 0

        # replace stores the best sum when the previous element is replaced by 1.
        replace = 0

        # Start from the second element because the first element has no previous neighbor.
        for i in range(1, len(arr)):
            # Calculate the best sum if the current element is kept unchanged.
            # The previous element can either be kept or replaced by 1.
            new_keep = max(
                keep + abs(arr[i] - arr[i - 1]),
                replace + abs(arr[i] - 1)
            )

            # Calculate the best sum if the current element is replaced by 1.
            # Keeping the previous element gives |1 - arr[i-1]|.
            # Replacing both elements gives |1 - 1| = 0.
            new_replace = max(
                keep + abs(1 - arr[i - 1]),
                replace
            )

            # Update both states for the next element.
            keep = new_keep
            replace = new_replace

        # The final element can be kept or replaced, so return the better state.
        return max(keep, replace)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages. The only differences are syntax, variable declarations, and integer handling.

### 1. Create the two DP states

I start with two variables:

* `keep = 0`
* `replace = 0`

`keep` represents the best sum when the previous element is still its original value.

`replace` represents the best sum when the previous element has been changed to `1`.

For the first element, there is no adjacent pair before it, so the starting contribution is `0`.

### 2. Start from the second element

I start the loop from index `1`.

The reason is simple: the first adjacent difference needs two elements.

For an element at index `i`, its difference is calculated with `i - 1`.

### 3. Calculate the `keep` state

Suppose I decide not to replace `arr[i]`.

There are two possible situations for the previous element.

If the previous element was also kept, the new difference is:

`|arr[i] - arr[i-1]|`

So the total becomes:

`keep + |arr[i] - arr[i-1]|`

If the previous element was replaced with `1`, the new difference is:

`|arr[i] - 1|`

So the total becomes:

`replace + |arr[i] - 1|`

I take the maximum of these two values.

### 4. Calculate the `replace` state

Now suppose I replace the current element with `1`.

Again, there are two possible situations for the previous element.

If the previous element was kept, the difference becomes:

`|1 - arr[i-1]|`

So the total is:

`keep + |1 - arr[i-1]|`

If the previous element was also replaced, both values are `1`.

Therefore:

`|1 - 1| = 0`

So the total stays:

`replace`

I take the maximum of these two possibilities.

### 5. Move the states forward

After calculating the new states, I replace the old states with them.

This is important because the current element becomes the previous element for the next iteration.

I do not need to save old states in a DP array. Once the next states are calculated, the older states are no longer needed.

### 6. Get the final answer

After processing all elements, there are still two possible final states:

* The last element is unchanged.
* The last element is replaced with `1`.

Therefore, I return the larger of `keep` and `replace`.

### C++ behavior

In C++, I use `long long` for the DP values so the running sum is safely handled even when the input values are large.

The array itself is passed by reference, so I do not create another copy of it.

### Java behavior

In Java, I use `long` for the DP states.

I use `Math.abs()` for absolute differences and `Math.max()` to select the better transition.

Using `long` for the running result avoids integer overflow during the calculation.

### JavaScript behavior

JavaScript uses the `Number` type for these calculations.

I use `Math.abs()` for absolute differences and `Math.max()` for comparing the two DP transitions.

The algorithm still uses only constant extra space.

### Python3 behavior

Python integers can automatically grow when necessary, so there is no separate integer-size concern for the DP values.

I use the built-in `abs()` function for absolute differences and `max()` to choose the better transition.

## Examples

### Example 1

**Input:**

```text
arr = [3, 2, 1, 4, 5]
```

One optimal modification is:

```text
[3, 1, 1, 4, 1]
```

The adjacent differences are:

```text
|3 - 1| = 2
|1 - 1| = 0
|1 - 4| = 3
|4 - 1| = 3
```

Total:

```text
2 + 0 + 3 + 3 = 8
```

**Output:**

```text
8
```

The DP finds this result without trying all possible replacement combinations.

### Example 2

**Input:**

```text
arr = [1, 5]
```

No replacement is needed.

The only adjacent difference is:

```text
|5 - 1| = 4
```

**Output:**

```text
4
```

Replacing either value with `1` would not produce a better result.

### Example 3

**Input:**

```text
arr = [5, 5, 5]
```

If I keep all elements, the sum is:

```text
|5 - 5| + |5 - 5| = 0
```

If I replace the middle element:

```text
[5, 1, 5]
```

the sum becomes:

```text
|5 - 1| + |1 - 5|
= 4 + 4
= 8
```

**Output:**

```text
8
```

This example shows why replacing an element can improve two adjacent differences at the same time.

## How to Use / Run Locally

The code is written in the standard competitive programming style used by GeeksforGeeks. The `Solution` class contains the required function.

### C++

Save the solution in a `.cpp` file and compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Then run:

```bash
./solution
```

On Windows, run:

```bash
solution.exe
```

### Java

Save the solution in a file named according to your class setup, compile it with:

```bash
javac Solution.java
```

Then run:

```bash
java Solution
```

### JavaScript

Save the solution as:

```text
solution.js
```

Run it using Node.js:

```bash
node solution.js
```

### Python3

Save the solution as:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

For local testing, I can add a small driver program in each language that creates the input array, calls `maxDiffSum()`, and prints the answer.

## Notes & Optimizations

The main optimization is reducing the usual DP table to two variables.

A straightforward dynamic programming solution could use an array of states for every index, but that is unnecessary because each position only depends on the previous position.

The two states are enough to represent every possible replacement decision.

The important edge case is an array with only one element. Since there are no consecutive elements, there are no adjacent differences, so the answer is `0`.

Another useful observation is that replacing two consecutive elements with `1` does not increase the sum between those two elements because their difference becomes `0`. However, replacing an element can increase the differences on both sides, which is why the DP must consider the decision for every position.

I use `long long` in C++ and `long` in Java for the DP result to avoid overflow while calculating the sum.

The final solution runs in `O(n)` time and `O(1)` extra space, which is suitable for an array containing up to `10^5` elements.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
