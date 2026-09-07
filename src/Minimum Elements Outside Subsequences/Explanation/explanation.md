# Minimum Elements Outside Subsequences

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

Given an array `arr` of size `n`, I have to divide as many elements as possible into two subsequences:

1. One subsequence must be strictly increasing.
2. The other subsequence must be strictly decreasing.

An element can be used in at most one of these two subsequences. Some elements can also be left unused.

The goal is to find the minimum number of elements that cannot be included in either subsequence.

For example:

```text
Input:
[7, 8, 1, 2, 4, 6, 3, 5, 2, 1, 8, 7]

Output:
2
```

One possible choice is:

```text
Increasing: 1 -> 2 -> 4 -> 5 -> 8
Decreasing: 7 -> 6 -> 3 -> 2 -> 1
```

The remaining elements are `8` and `7`, so the answer is `2`.

This is a Dynamic Programming problem where I track the last element used in both subsequences.

## Constraints

| Constraint    | Value                |
| ------------- | -------------------- |
| Array size    | `1 <= n <= 100`      |
| Array element | `1 <= arr[i] <= 100` |

The relatively small value of `n` allows an `O(n^3)` dynamic programming solution.

## Intuition

My first thought was to find one increasing subsequence and one decreasing subsequence and make them as large as possible.

But there is an important problem: choosing the best increasing subsequence independently does not guarantee that I can also build the best decreasing subsequence from the remaining elements.

So I need to consider both subsequences at the same time.

For every element, I have three choices:

```text
             Current element
                    |
        +-----------+-----------+
        |           |           |
       Skip       Increasing   Decreasing
```

To make the next decision, I only need to know the last element currently present in each subsequence.

That gives me a useful DP state:

```text
dp[i][j]

i = last index used by the increasing subsequence
j = last index used by the decreasing subsequence
```

I store the maximum number of elements used for each such state.

The main observation is that I do not need to store the complete subsequences. Their last elements are enough to decide whether the current element can be added.

## Approach

I process the array from left to right.

I use index `0` as a special value meaning that the corresponding subsequence is empty. Actual array indices are shifted by one.

For every current element `arr[k - 1]`, I check every reachable DP state `(i, j)`.

There are three possible transitions.

### 1. Leave the element unused

The state stays unchanged:

```text
(i, j) -> (i, j)
```

The number of used elements does not increase.

### 2. Add it to the increasing subsequence

I can add the current element if the increasing subsequence is empty or:

```text
arr[k - 1] > arr[i - 1]
```

The state becomes:

```text
(i, j) -> (k, j)
```

I add `1` to the number of used elements.

### 3. Add it to the decreasing subsequence

I can add the current element if the decreasing subsequence is empty or:

```text
arr[k - 1] < arr[j - 1]
```

The state becomes:

```text
(i, j) -> (i, k)
```

Again, I add `1`.

A small example makes the state easier to understand:

```text
arr = [1, 4, 2, 3]

Index:    1   2   3   4
Value:    1   4   2   3

One valid choice:

Increasing:  1 -> 2 -> 3
Decreasing:  4
```

While processing `3`, if the increasing subsequence currently ends at index `3`:

```text
arr[3] = 2
```

then:

```text
2 < 3
```

so `3` can be added to the increasing subsequence.

The state changes like:

```text
(i, j)
  |
  | put current element into increasing
  v
(k, j)
```

I keep only two DP layers:

```text
prev = states before processing current element
cur  = states after processing current element
```

After processing the current element, `cur` becomes `prev`.

Finally, I find the maximum number of elements used in any final state.

If `best` elements were used, then:

```text
answer = n - best
```

This converts the problem of minimizing unused elements into the easier problem of maximizing used elements.

## Data Structures Used

### 2D Dynamic Programming Array

I use a 2D DP table:

```text
dp[i][j]
```

It stores the maximum number of elements used when:

* `i` is the last index of the increasing subsequence.
* `j` is the last index of the decreasing subsequence.

The two-dimensional state is enough because the order of earlier elements is already represented by the current last indices.

### Two DP Layers

Instead of storing:

```text
dp[k][i][j]
```

for every array position, I use only:

```text
prev[i][j]
cur[i][j]
```

This reduces the space complexity from `O(n^3)` to `O(n^2)`.

## Operations & Behavior Summary

The algorithm works as follows:

```text
1. Create a DP table and mark every state as unreachable.
2. Set dp[0][0] = 0 because both subsequences are initially empty.
3. Process each array element from left to right.
4. For every reachable (i, j) state:
   a. Skip the current element.
   b. Add it to the increasing subsequence if valid.
   c. Add it to the decreasing subsequence if valid.
5. Move the current DP layer into the previous layer.
6. Find the maximum number of elements used in the final DP table.
7. Return n - maximum_used.
```

The strict conditions are important:

```text
Increasing: current > previous
Decreasing: current < previous
```

Using `>=` or `<=` would incorrectly allow equal elements.

## Complexity

| Type  | Complexity | Explanation                                                                       |
| ----- | ---------- | --------------------------------------------------------------------------------- |
| Time  | `O(n^3)`   | I process `n` elements and check `O(n^2)` pairs of last indices for each element. |
| Space | `O(n^2)`   | I keep two `n x n` DP tables instead of a full 3D DP table.                       |

Here, `n` is the number of elements in the input array.

The time complexity comes from:

```text
n elements
   ×
n possible increasing-ending indices
   ×
n possible decreasing-ending indices
=
O(n^3)
```

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minCount(vector<int>& arr) {
        int n = arr.size(); // Store the number of elements in the array.
        const int NEG = -1000000000; // Represents a state that cannot be reached.

        // prev[i][j] stores the maximum number of used elements after
        // processing the previous prefix, where i and j are the last
        // indices of the increasing and decreasing subsequences.
        vector<vector<int>> prev(n + 1, vector<int>(n + 1, NEG));

        prev[0][0] = 0; // Initially both subsequences are empty.

        // Process every array element one by one.
        for (int k = 1; k <= n; ++k) {
            // cur will contain all states after processing arr[k - 1].
            vector<vector<int>> cur(n + 1, vector<int>(n + 1, NEG));

            // Try every possible pair of last indices from the previous state.
            for (int i = 0; i <= n; ++i) {
                for (int j = 0; j <= n; ++j) {
                    if (prev[i][j] == NEG) {
                        continue; // Ignore states that were never reachable.
                    }

                    // Option 1: Leave the current element unused.
                    cur[i][j] = max(cur[i][j], prev[i][j]);

                    // Option 2: Put the current element into the increasing subsequence.
                    // It is valid if that subsequence is empty or arr[k-1] is larger
                    // than its previous last element.
                    if (i == 0 || arr[k - 1] > arr[i - 1]) {
                        cur[k][j] = max(cur[k][j], prev[i][j] + 1);
                    }

                    // Option 3: Put the current element into the decreasing subsequence.
                    // It is valid if that subsequence is empty or arr[k-1] is smaller
                    // than its previous last element.
                    if (j == 0 || arr[k - 1] < arr[j - 1]) {
                        cur[i][k] = max(cur[i][k], prev[i][j] + 1);
                    }
                }
            }

            // The current layer becomes the previous layer for the next element.
            prev = move(cur);
        }

        int best = 0; // Store the maximum number of elements included in both subsequences.

        // Find the best reachable state after processing the whole array.
        for (int i = 0; i <= n; ++i) {
            for (int j = 0; j <= n; ++j) {
                best = max(best, prev[i][j]);
            }
        }

        // The elements not used in either subsequence are the required answer.
        return n - best;
    }
};
```

### Java

```java
class Solution {
    public int minCount(int[] arr) {
        int n = arr.length; // Store the number of elements in the array.
        final int NEG = -1000000000; // Represents an unreachable DP state.

        // prev[i][j] stores the maximum number of used elements after
        // the previous prefix, with i and j as the last indices of
        // the increasing and decreasing subsequences.
        int[][] prev = new int[n + 1][n + 1];

        // Initialize every state as unreachable.
        for (int i = 0; i <= n; i++) {
            java.util.Arrays.fill(prev[i], NEG);
        }

        prev[0][0] = 0; // Initially both subsequences are empty.

        // Process every array element one by one.
        for (int k = 1; k <= n; k++) {
            // cur stores the states after processing arr[k - 1].
            int[][] cur = new int[n + 1][n + 1];

            // Initialize every new state as unreachable.
            for (int i = 0; i <= n; i++) {
                java.util.Arrays.fill(cur[i], NEG);
            }

            // Try every possible pair of previous last indices.
            for (int i = 0; i <= n; i++) {
                for (int j = 0; j <= n; j++) {
                    if (prev[i][j] == NEG) {
                        continue; // Skip states that cannot be reached.
                    }

                    // Option 1: Do not use the current element.
                    cur[i][j] = Math.max(cur[i][j], prev[i][j]);

                    // Option 2: Add the current element to the increasing subsequence.
                    // Index 0 means that the increasing subsequence is still empty.
                    if (i == 0 || arr[k - 1] > arr[i - 1]) {
                        cur[k][j] = Math.max(cur[k][j], prev[i][j] + 1);
                    }

                    // Option 3: Add the current element to the decreasing subsequence.
                    // Index 0 means that the decreasing subsequence is still empty.
                    if (j == 0 || arr[k - 1] < arr[j - 1]) {
                        cur[i][k] = Math.max(cur[i][k], prev[i][j] + 1);
                    }
                }
            }

            // Move to the next DP layer.
            prev = cur;
        }

        int best = 0; // Store the largest number of elements used.

        // Check every final state to find the maximum number of selected elements.
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= n; j++) {
                best = Math.max(best, prev[i][j]);
            }
        }

        // Everything not selected belongs to the answer.
        return n - best;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */

class Solution {
    minCount(arr) {
        const n = arr.length; // Store the number of elements in the array.
        const NEG = -1000000000; // Represents an unreachable DP state.

        // prev[i][j] stores the maximum number of used elements after
        // the previous prefix, where i and j are the last indices of
        // the increasing and decreasing subsequences.
        let prev = Array.from(
            { length: n + 1 },
            () => Array(n + 1).fill(NEG)
        );

        prev[0][0] = 0; // Initially both subsequences are empty.

        // Process each array element from left to right.
        for (let k = 1; k <= n; k++) {
            // cur stores all states after processing arr[k - 1].
            const cur = Array.from(
                { length: n + 1 },
                () => Array(n + 1).fill(NEG)
            );

            // Try every possible pair of previous last indices.
            for (let i = 0; i <= n; i++) {
                for (let j = 0; j <= n; j++) {
                    if (prev[i][j] === NEG) {
                        continue; // Ignore states that cannot be reached.
                    }

                    // Option 1: Leave the current element unused.
                    cur[i][j] = Math.max(cur[i][j], prev[i][j]);

                    // Option 2: Put the current element into the increasing subsequence.
                    // i === 0 means that this subsequence is currently empty.
                    if (i === 0 || arr[k - 1] > arr[i - 1]) {
                        cur[k][j] = Math.max(cur[k][j], prev[i][j] + 1);
                    }

                    // Option 3: Put the current element into the decreasing subsequence.
                    // j === 0 means that this subsequence is currently empty.
                    if (j === 0 || arr[k - 1] < arr[j - 1]) {
                        cur[i][k] = Math.max(cur[i][k], prev[i][j] + 1);
                    }
                }
            }

            // Use the current layer as the previous layer for the next element.
            prev = cur;
        }

        let best = 0; // Store the maximum number of elements used.

        // Find the best reachable final state.
        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= n; j++) {
                best = Math.max(best, prev[i][j]);
            }
        }

        // The unused elements are the total elements minus the selected ones.
        return n - best;
    }
}
```

### Python3

```python
class Solution:
    def minCount(self, arr):
        """Return the minimum number of elements that cannot be used."""
        n = len(arr)  # Store the number of elements in the array.
        NEG = -10**9  # Represents a DP state that cannot be reached.

        # prev[i][j] stores the maximum number of used elements after
        # the previous prefix, where i and j are the last indices of
        # the increasing and decreasing subsequences.
        prev = [[NEG] * (n + 1) for _ in range(n + 1)]

        prev[0][0] = 0  # Initially both subsequences are empty.

        # Process every element from left to right.
        for k in range(1, n + 1):
            # cur stores the states after processing arr[k - 1].
            cur = [[NEG] * (n + 1) for _ in range(n + 1)]

            # Try every possible pair of previous last indices.
            for i in range(n + 1):
                for j in range(n + 1):
                    if prev[i][j] == NEG:
                        continue  # Ignore states that were never reachable.

                    # Option 1: Leave the current element unused.
                    cur[i][j] = max(cur[i][j], prev[i][j])

                    # Option 2: Add the current element to the increasing subsequence.
                    # Index 0 means that the increasing subsequence is empty.
                    if i == 0 or arr[k - 1] > arr[i - 1]:
                        cur[k][j] = max(cur[k][j], prev[i][j] + 1)

                    # Option 3: Add the current element to the decreasing subsequence.
                    # Index 0 means that the decreasing subsequence is empty.
                    if j == 0 or arr[k - 1] < arr[j - 1]:
                        cur[i][k] = max(cur[i][k], prev[i][j] + 1)

            # The current layer becomes the previous layer for the next element.
            prev = cur

        best = 0  # Store the maximum number of elements used.

        # Check every final state for the largest number of selected elements.
        for i in range(n + 1):
            for j in range(n + 1):
                best = max(best, prev[i][j])

        # The remaining elements are exactly the elements left unused.
        return n - best
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages. Only the syntax for creating arrays, loops, and updating values changes.

### Step 1: Store the array size

I first store the number of elements:

```text
n = arr.length
```

or the equivalent syntax in C++, Java, or Python.

I need `n` because the DP state uses array indices and because the final answer depends on how many elements were successfully used.

### Step 2: Create the DP table

I create a 2D table of size:

```text
(n + 1) x (n + 1)
```

The extra position `0` represents an empty subsequence.

So:

```text
dp[0][0] = 0
```

means that neither subsequence currently contains an element.

All other states initially represent impossible situations.

### Step 3: Process every element

I process the array from left to right.

For the current element at 0-based position `k - 1`, I use `k` as its DP index.

This makes the empty state `0` easy to distinguish from real array indices.

### Step 4: Check every DP state

For every pair `(i, j)`, I first check whether the state is reachable.

If it is unreachable, there is no reason to process it.

For a reachable state:

```text
dp[i][j] = number of elements already used
```

I then try all three choices for the current element.

### Step 5: Skip the current element

If I decide not to use the current element, neither subsequence changes.

So:

```text
(i, j) -> (i, j)
```

The count remains the same.

This transition is necessary because the problem explicitly allows elements to remain unused.

### Step 6: Add the current element to the increasing subsequence

The current element can become part of the increasing subsequence when:

```text
i == 0
```

or:

```text
current value > value at index i
```

If it is valid, the current index becomes the new last index:

```text
(i, j) -> (k, j)
```

The used-element count increases by one.

I use a strict `>` comparison because the subsequence must be strictly increasing.

### Step 7: Add the current element to the decreasing subsequence

Similarly, I can add the current element to the decreasing subsequence when:

```text
j == 0
```

or:

```text
current value < value at index j
```

The new state is:

```text
(i, j) -> (i, k)
```

Again, the count increases by one.

I use `<` because the decreasing subsequence must be strictly decreasing.

### Step 8: Move to the next DP layer

After all states have been processed for the current element, I replace the previous table with the current table.

This means the next element starts from exactly the states that were possible after processing the current prefix.

Using two layers is important for space optimization.

A full DP could look like:

```text
dp[element][increasingLast][decreasingLast]
```

which would require `O(n^3)` memory.

I only need the previous layer to calculate the next one, so I reduce it to:

```text
prev[increasingLast][decreasingLast]
cur[increasingLast][decreasingLast]
```

which requires `O(n^2)` memory.

### Step 9: Find the maximum number of used elements

After all elements have been processed, I inspect every final state.

The state with the largest value tells me the maximum number of elements that can belong to the two subsequences.

I call this value `best`.

### Step 10: Convert it into the required answer

The problem asks for the number of unused elements, not the number of used elements.

Therefore:

```text
answer = n - best
```

For example:

```text
n = 8
best = 7

answer = 8 - 7
       = 1
```

So exactly one element has to remain unused.

The same DP logic works in C++, Java, JavaScript, and Python3. The main difference is only how each language represents and initializes the 2D arrays.

## Examples

### Example 1

```text
Input:
arr = [7, 8, 1, 2, 4, 6, 3, 5, 2, 1, 8, 7]

Output:
2
```

One possible arrangement is:

```text
Increasing:
1 -> 2 -> 4 -> 5 -> 8

Decreasing:
7 -> 6 -> 3 -> 2 -> 1
```

The two subsequences use `10` elements.

There are `12` elements in total:

```text
12 - 10 = 2
```

Therefore, the minimum number of unused elements is `2`.

### Example 2

```text
Input:
arr = [1, 4, 2, 3, 3, 2, 4]

Output:
0
```

One valid arrangement is:

```text
Increasing:
1 -> 2 -> 3 -> 4

Decreasing:
4 -> 3 -> 2
```

All `7` elements are used.

Therefore:

```text
7 - 7 = 0
```

No element needs to be left unused.

### Example 3

```text
Input:
arr = [5, 5, 5]

Output:
1
```

Because both subsequences must be strict, equal values cannot appear next to each other in the same subsequence.

I can use one `5` in the increasing subsequence and another `5` in the decreasing subsequence:

```text
Increasing: 5
Decreasing: 5
Unused:     5
```

So:

```text
3 - 2 = 1
```

The answer is `1`.

## How to Use / Run Locally

The code on this repository is written in the standard competitive programming format used by GeeksforGeeks. The `Solution` class can be copied into the platform's editor directly.

For local testing, I can add my own `main` function or test harness around the solution.

### C++

Save the file as:

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

On Windows, the generated executable can be run with:

```bash
solution.exe
```

### Java

Save the file as:

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

Save the file as:

```text
solution.js
```

Run it with Node.js:

```bash
node solution.js
```

Make sure Node.js is installed on your system.

### Python3

Save the file as:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

On Windows, this may also be:

```bash
python solution.py
```

For local testing, I can create a small input array and call the `minCount` method to verify the result.

## Notes & Optimizations

The main optimization I use is reducing the DP from three dimensions to two layers.

A direct DP representation could require:

```text
O(n^3)
```

space if I stored the state for every processed position.

But the transition for the current element only depends on the previous position. Because of that, I only keep:

```text
prev
cur
```

and reduce the space to:

```text
O(n^2)
```

The constraints are small enough that `O(n^3)` time is practical.

A few edge cases are worth remembering.

If the array has only one element:

```text
[5]
```

I can put it into either subsequence, so the answer is:

```text
0
```

If all elements are equal:

```text
[5, 5, 5]
```

only two elements can be used because each subsequence is strict and an element cannot belong to both subsequences.

The comparisons must remain strict:

```text
Increasing: >
Decreasing: <
```

Changing them to `>=` and `<=` would solve a different problem.

Another important point is that I maximize the number of selected elements rather than directly minimizing the unused elements. These two objectives are equivalent because:

```text
unused = n - used
```

So maximizing `used` automatically minimizes `unused`.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
