# Largest Zigzag Sequence

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

Given a square matrix `mat` of size `n × n`, I need to find the maximum possible sum of a zigzag sequence.

The sequence starts from the top row and ends at the bottom row. From each row, I choose exactly one element.

The important condition is that two consecutive chosen elements cannot belong to the same column.

For example, in:

```text
3  1  2
4  8  5
6  9  7
```

One possible maximum zigzag sequence is:

```text
3 -> 8 -> 7
```

The sum is:

```text
3 + 8 + 7 = 18
```

The goal is to return this maximum sum.

This problem can be solved efficiently using dynamic programming and an optimization based on the largest and second-largest values from the previous row.

## Constraints

| Constraint    | Value                    |
| ------------- | ------------------------ |
| Matrix size   | `1 <= n <= 100`          |
| Matrix values | `1 <= mat[i][j] <= 1000` |
| Matrix shape  | `n × n`                  |

## Intuition

My first thought was to use dynamic programming because the answer for the current row depends on the best answers from the previous row.

For every column in the current row, I need the best possible value from the previous row, but I cannot take the value from the same column.

A straightforward solution would check every previous column for every current column. That would take `O(n³)` time.

I noticed that I do not actually need to check every previous column.

For each row, I only need the largest and second-largest DP values from the previous row.

If the largest value belongs to a different column, I can use it.

If the largest value belongs to the same column I am currently using, I have to use the second-largest value.

This reduces the solution to `O(n²)` time.

## Approach

I use a one-dimensional DP array.

For the first row, there is no previous element, so every column can be selected directly.

For every next row:

1. Find the largest DP value from the previous row.
2. Store the column where that largest value occurs.
3. Find the second-largest DP value.
4. For every column in the current row:

   * Use the largest previous value if it comes from another column.
   * Otherwise, use the second-largest previous value.
5. Add the current matrix value to that best previous value.
6. Store the results for the current row.
7. Continue until the last row.
8. Return the maximum value from the final DP array.

The key idea is avoiding an extra loop over all previous columns.

## Data Structures Used

### 1. DP Array

I use a one-dimensional array of size `n`.

`dp[j]` represents the maximum sum of a valid zigzag sequence that ends at column `j` of the current processed row.

I only need the previous row's DP values, so there is no need for a complete `n × n` DP table.

### 2. Current Row Array

I create another array to store the newly calculated DP values for the current row.

After finishing the row, it becomes the previous DP array.

### 3. Maximum Value Tracking

I store:

* The largest DP value.
* The second-largest DP value.
* The column containing the largest DP value.

This lets me find the best valid previous value in constant time for each column.

## Operations & Behavior Summary

The algorithm works like this:

```text
Start with the first row.

For every next row:

    Find the largest DP value.
    Find the second-largest DP value.
    Remember the column of the largest value.

    For every column:
        If its column is different from the largest-value column:
            use the largest DP value.
        Otherwise:
            use the second-largest DP value.

        Add the current matrix value.

    Replace the old DP array.

Return the largest value in the final DP array.
```

This gives every position in the current row the best possible previous value while still following the zigzag restriction.

## Complexity

| Type             | Complexity | Explanation                                                               |
| ---------------- | ---------- | ------------------------------------------------------------------------- |
| Time Complexity  | `O(n²)`    | I process every element of the `n × n` matrix a constant number of times. |
| Space Complexity | `O(n)`     | I only store DP values for the previous and current rows.                 |

A basic DP implementation that checks every previous column would take `O(n³)` time. Tracking the largest and second-largest DP values removes that extra loop.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int zigzagSequence(vector<vector<int>>& mat) {
        int n = mat.size();

        vector<int> dp(n);

        for (int j = 0; j < n; j++) {
            dp[j] = mat[0][j];
        }

        for (int i = 1; i < n; i++) {
            int max1 = -1;
            int max2 = -1;
            int max1Col = -1;

            for (int j = 0; j < n; j++) {
                if (dp[j] > max1) {
                    max2 = max1;
                    max1 = dp[j];
                    max1Col = j;
                } else if (dp[j] > max2) {
                    max2 = dp[j];
                }
            }

            vector<int> next(n);

            for (int j = 0; j < n; j++) {
                int bestPrevious;

                if (j != max1Col) {
                    bestPrevious = max1;
                } else {
                    bestPrevious = max2;
                }

                next[j] = mat[i][j] + bestPrevious;
            }

            dp = next;
        }

        return *max_element(dp.begin(), dp.end());
    }
};
```

### Java

```java
class Solution {
    public int zigzagSequence(int[][] mat) {
        int n = mat.length;

        int[] dp = new int[n];

        for (int j = 0; j < n; j++) {
            dp[j] = mat[0][j];
        }

        for (int i = 1; i < n; i++) {
            int max1 = -1;
            int max2 = -1;
            int max1Col = -1;

            for (int j = 0; j < n; j++) {
                if (dp[j] > max1) {
                    max2 = max1;
                    max1 = dp[j];
                    max1Col = j;
                } else if (dp[j] > max2) {
                    max2 = dp[j];
                }
            }

            int[] next = new int[n];

            for (int j = 0; j < n; j++) {
                int bestPrevious;

                if (j != max1Col) {
                    bestPrevious = max1;
                } else {
                    bestPrevious = max2;
                }

                next[j] = mat[i][j] + bestPrevious;
            }

            dp = next;
        }

        int answer = 0;

        for (int value : dp) {
            answer = Math.max(answer, value);
        }

        return answer;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} mat
 * @return {number}
 */

class Solution {
    zigzagSequence(mat) {
        const n = mat.length;

        let dp = new Array(n);

        for (let j = 0; j < n; j++) {
            dp[j] = mat[0][j];
        }

        for (let i = 1; i < n; i++) {
            let max1 = -1;
            let max2 = -1;
            let max1Col = -1;

            for (let j = 0; j < n; j++) {
                if (dp[j] > max1) {
                    max2 = max1;
                    max1 = dp[j];
                    max1Col = j;
                } else if (dp[j] > max2) {
                    max2 = dp[j];
                }
            }

            const next = new Array(n);

            for (let j = 0; j < n; j++) {
                let bestPrevious;

                if (j !== max1Col) {
                    bestPrevious = max1;
                } else {
                    bestPrevious = max2;
                }

                next[j] = mat[i][j] + bestPrevious;
            }

            dp = next;
        }

        return Math.max(...dp);
    }
}
```

### Python3

```python
class Solution:
    def zigzagSequence(self, mat):
        n = len(mat)

        dp = mat[0][:]

        for i in range(1, n):
            max1 = -1
            max2 = -1
            max1_col = -1

            for j in range(n):
                if dp[j] > max1:
                    max2 = max1
                    max1 = dp[j]
                    max1_col = j
                elif dp[j] > max2:
                    max2 = dp[j]

            next_dp = [0] * n

            for j in range(n):
                if j != max1_col:
                    best_previous = max1
                else:
                    best_previous = max2

                next_dp[j] = mat[i][j] + best_previous

            dp = next_dp

        return max(dp)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### C++

I first create a DP array with `n` positions.

Each position represents one column of the currently processed row.

For the first row, I copy all matrix values into the DP array because there is no previous row and therefore no column restriction yet.

Then I process the matrix row by row.

Before calculating a new row, I scan the previous DP array and find the largest and second-largest values.

I also remember the column of the largest value.

This column information is important because the current element cannot use a previous value from the same column.

For every current column, I check whether it matches the column of the largest previous value.

If it does not match, I use the largest value.

If it matches, I use the second-largest value.

I then add the current matrix element.

After processing all columns, the new array becomes the DP array for the next iteration.

After the last row, the answer is the largest value in the DP array because the zigzag sequence can finish in any column.

### Java

The Java solution follows the same dynamic programming idea.

I use an integer array for the previous row's DP values and another integer array for the current row.

Java arrays give direct access to each column, which is enough for this problem.

For every row after the first, I find the largest and second-largest DP values and remember the column of the largest one.

When calculating a column, I avoid using the largest value if it came from that same column.

Instead, I use the second-largest value.

Once the current row is complete, I replace the previous DP array with the new one.

The final answer is the maximum value in the last DP array.

### JavaScript

The JavaScript solution uses normal arrays for the DP states.

I initialize the DP array using the first row of the matrix.

For every following row, I scan the current DP array to find the largest and second-largest values.

I keep the index of the largest value because the column restriction depends on that index.

For each column in the new row, I choose either the largest or second-largest previous value.

Then I add the current matrix value.

The new array replaces the old DP array.

Finally, I use the maximum value from the final array as the answer.

### Python3

The Python3 solution uses a list as the DP array.

I start with a copy of the first row because each element can be the starting point of the sequence.

For every later row, I find the largest and second-largest values in the current DP list.

I also store the column index of the largest value.

While creating the next DP list, I use the largest value unless its column is the same as the current column.

In that case, I use the second-largest value.

The newly calculated list becomes the DP list for the next row.

After all rows are processed, the maximum value in the final list is the required result.

## Examples

### Example 1

Input:

```text
mat = [
    [3, 1, 2],
    [4, 8, 5],
    [6, 9, 7]
]
```

Output:

```text
18
```

One optimal sequence is:

```text
3 -> 8 -> 7
```

The sum is:

```text
3 + 8 + 7 = 18
```

The DP values start as:

```text
[3, 1, 2]
```

For the second row, the largest previous value is `3` from column `0`.

The best values become:

```text
[5, 11, 8]
```

For the final row, the largest previous value is `11` from column `1`.

So for column `1`, I cannot use `11` and must use the second-best previous value.

The final DP values become:

```text
[17, 17, 18]
```

Therefore, the answer is:

```text
18
```

### Example 2

Input:

```text
mat = [
    [1, 2, 4],
    [3, 9, 6],
    [11, 3, 15]
]
```

Output:

```text
28
```

One optimal sequence is:

```text
4 -> 9 -> 15
```

The sum is:

```text
4 + 9 + 15 = 28
```

The important part is that the selected columns are:

```text
2 -> 1 -> 2
```

No two consecutive elements use the same column.

### Example 3

Input:

```text
mat = [
    [5]
]
```

Output:

```text
5
```

There is only one row and one column.

The sequence contains the only available element:

```text
5
```

So the answer is `5`.

## How to Use / Run Locally

### C++

Save your solution in a file such as:

```text
main.cpp
```

If you are testing outside GeeksforGeeks, add your own `main()` function and test cases.

Compile it using:

```bash
g++ -std=c++17 main.cpp -o main
```

Run it with:

```bash
./main
```

On Windows, you can run:

```bash
main.exe
```

### Java

Save the solution in:

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

If you are using the GeeksforGeeks judge, the platform provides the required driver code, so only the `Solution` class is needed.

### JavaScript

Save the solution in:

```text
solution.js
```

Run it with Node.js:

```bash
node solution.js
```

For local testing, create a matrix and call the `zigzagSequence()` method from your own test code.

### Python3

Save the solution in:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

You can add a small test case at the bottom of the file when testing locally.

## Notes & Optimizations

The most important optimization is finding the largest and second-largest DP values instead of checking every previous column.

A direct transition would look at all `n` previous columns for every one of the `n` current columns. Since there are `n` rows, that leads to `O(n³)` time.

By keeping the best two values, each current column can find its best valid previous value in `O(1)` time after the maximum values have been identified.

The `n = 1` case also works naturally. There is only one element, so that element is the answer.

All matrix values are positive, so initializing the maximum trackers with `-1` is safe under the given constraints.

The answer can be as large as `n × 1000`. With `n <= 100`, the maximum possible sum is `100000`, which easily fits in a standard 32-bit integer.

The full DP table is unnecessary. Keeping only the previous and current rows reduces space from `O(n²)` to `O(n)`.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
