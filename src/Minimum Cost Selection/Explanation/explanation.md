# Minimum Cost Selection | Dynamic Programming Solution

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

The Minimum Cost Selection problem gives us an `n × 3` matrix called `mat`.

Each row represents a shop, and each column represents one of three available choices. Every value in the matrix is the cost of selecting that choice from that row.

The goal is to select exactly one choice from every row while making sure that the same choice is not selected in two adjacent rows.

I need to return the minimum possible total cost.

For example, if I select choice `0` from one row, I cannot select choice `0` again in the next row. I must choose either choice `1` or choice `2`.

This is a Dynamic Programming problem because the best choice for the current row depends on the minimum cost calculated for the previous row.

## Constraints

| Constraint                | Value                 |
| ------------------------- | --------------------- |
| Number of rows            | `1 ≤ n ≤ 10^5`        |
| Number of choices per row | `mat[i].size() = 3`   |
| Cost of each choice       | `1 ≤ mat[i][j] ≤ 100` |
| Number of rows in matrix  | `mat.rows = n`        |

The large value of `n` means trying every possible combination would be too slow. I need a solution that processes each row only once.

## Intuition

My first observation is that every row has only three choices.

When I select a choice in the current row, I only need to know which choices were used in the previous row. The same choice cannot be repeated, so each current choice can only come from the other two previous choices.

For example, if I want to select choice `0` in the current row, I only need the minimum cost of ending the previous row with choice `1` or choice `2`.

I do not need to remember the complete sequence of selections.

I only need three minimum values from the previous row. This turns the problem into a simple Dynamic Programming solution with `O(n)` time and `O(1)` extra space.

## Approach

I use three variables to store the minimum cost after processing the previous row.

1. `prev0` stores the minimum total cost when the previous row ends with choice `0`.
2. `prev1` stores the minimum total cost when the previous row ends with choice `1`.
3. `prev2` stores the minimum total cost when the previous row ends with choice `2`.

For the first row, these values are simply the three costs already present in the matrix.

Then I process every remaining row.

For the current row:

* If I select choice `0`, I take the minimum of the previous costs ending with choice `1` and choice `2`.
* If I select choice `1`, I take the minimum of the previous costs ending with choice `0` and choice `2`.
* If I select choice `2`, I take the minimum of the previous costs ending with choice `0` and choice `1`.

I add the current choice cost to the selected minimum.

After calculating all three new values, I replace the previous values and move to the next row.

Finally, I return the minimum among the three possible costs.

## Data Structures Used

I do not need any complex data structure for this solution.

| Data Structure / Variable     | Purpose                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Three previous cost variables | Store the minimum cost ending with each of the three choices in the previous row |
| Three current cost variables  | Calculate the new minimum costs for the current row                              |
| Input matrix                  | Stores the cost of all available choices                                         |

Using variables instead of a full DP array saves memory.

A full `n × 3` Dynamic Programming table would also work, but it is unnecessary because the current row only depends on the previous row.

## Operations & Behavior Summary

The algorithm works like this:

1. Start with the three costs from the first row.
2. Move to the next row.
3. Calculate the cost of selecting choice `0` using the cheaper of the other two previous choices.
4. Calculate the cost of selecting choice `1` using the cheaper of the other two previous choices.
5. Calculate the cost of selecting choice `2` using the cheaper of the other two previous choices.
6. Replace the previous row values with the current row values.
7. Repeat until all rows are processed.
8. Return the minimum of the three final values.

The important part is that I calculate all three current values before updating the previous values. Otherwise, a calculation could accidentally use a value from the current row instead of the previous row.

## Complexity

| Complexity       | Value  | Explanation                                                                                                        |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| Time Complexity  | `O(n)` | I process each of the `n` rows once. Every row has exactly three choices, so the work per row is constant.         |
| Space Complexity | `O(1)` | I only use a fixed number of variables to store previous and current costs. No extra array based on `n` is needed. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minCost(vector<vector<int>>& mat) {
        // I store the minimum costs for all three choices in the first row.
        int prev0 = mat[0][0];
        int prev1 = mat[0][1];
        int prev2 = mat[0][2];

        // I process every row starting from the second row.
        for (int i = 1; i < mat.size(); i++) {
            // I cannot repeat choice 0, so I come from choice 1 or 2.
            int curr0 = mat[i][0] + min(prev1, prev2);

            // I cannot repeat choice 1, so I come from choice 0 or 2.
            int curr1 = mat[i][1] + min(prev0, prev2);

            // I cannot repeat choice 2, so I come from choice 0 or 1.
            int curr2 = mat[i][2] + min(prev0, prev1);

            // I update the previous-row costs for processing the next row.
            prev0 = curr0;
            prev1 = curr1;
            prev2 = curr2;
        }

        // I return the cheapest valid selection ending with any of the three choices.
        return min(prev0, min(prev1, prev2));
    }
};
```

### Java

```java
class Solution {
    public int minCost(int[][] mat) {
        // I store the minimum costs for all three choices in the first row.
        int prev0 = mat[0][0];
        int prev1 = mat[0][1];
        int prev2 = mat[0][2];

        // I process every row starting from the second row.
        for (int i = 1; i < mat.length; i++) {
            // I cannot repeat choice 0, so I come from choice 1 or 2.
            int curr0 = mat[i][0] + Math.min(prev1, prev2);

            // I cannot repeat choice 1, so I come from choice 0 or 2.
            int curr1 = mat[i][1] + Math.min(prev0, prev2);

            // I cannot repeat choice 2, so I come from choice 0 or 1.
            int curr2 = mat[i][2] + Math.min(prev0, prev1);

            // I update the previous-row costs for processing the next row.
            prev0 = curr0;
            prev1 = curr1;
            prev2 = curr2;
        }

        // I return the cheapest valid selection ending with any of the three choices.
        return Math.min(prev0, Math.min(prev1, prev2));
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
    minCost(mat) {
        // I store the minimum costs for all three choices in the first row.
        let prev0 = mat[0][0];
        let prev1 = mat[0][1];
        let prev2 = mat[0][2];

        // I process every row starting from the second row.
        for (let i = 1; i < mat.length; i++) {
            // I cannot repeat choice 0, so I come from choice 1 or 2.
            const curr0 = mat[i][0] + Math.min(prev1, prev2);

            // I cannot repeat choice 1, so I come from choice 0 or 2.
            const curr1 = mat[i][1] + Math.min(prev0, prev2);

            // I cannot repeat choice 2, so I come from choice 0 or 1.
            const curr2 = mat[i][2] + Math.min(prev0, prev1);

            // I update the previous-row costs for processing the next row.
            prev0 = curr0;
            prev1 = curr1;
            prev2 = curr2;
        }

        // I return the cheapest valid selection ending with any of the three choices.
        return Math.min(prev0, prev1, prev2);
    }
}
```

### Python3

```python
class Solution:

    def minCost(self, mat):
        # I store the minimum costs for all three choices in the first row.
        prev0 = mat[0][0]
        prev1 = mat[0][1]
        prev2 = mat[0][2]

        # I process every row starting from the second row.
        for i in range(1, len(mat)):
            # I cannot repeat choice 0, so I come from choice 1 or 2.
            curr0 = mat[i][0] + min(prev1, prev2)

            # I cannot repeat choice 1, so I come from choice 0 or 2.
            curr1 = mat[i][1] + min(prev0, prev2)

            # I cannot repeat choice 2, so I come from choice 0 or 1.
            curr2 = mat[i][2] + min(prev0, prev1)

            # I update the previous-row costs for processing the next row.
            prev0 = curr0
            prev1 = curr1
            prev2 = curr2

        # I return the cheapest valid selection ending with any of the three choices.
        return min(prev0, prev1, prev2)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in C++, Java, JavaScript, and Python3.

I first initialize three values using the first row of the matrix.

These values represent the minimum cost of ending the first row with each possible choice.

For example, if the first row is:

`[1, 50, 50]`

then:

* Ending with choice `0` costs `1`.
* Ending with choice `1` costs `50`.
* Ending with choice `2` costs `50`.

After initialization, I start processing from the second row.

For every row, I calculate three new values.

For choice `0`, I cannot use the previous cost that also ended with choice `0`. I only compare the costs ending with choices `1` and `2`.

The same rule applies to choices `1` and `2`.

I store these results in separate current variables first.

This matters because all three calculations must use the original values from the previous row.

If I updated a previous value too early, the next calculation could use a value from the current row. That would break the Dynamic Programming transition.

Once all three current values are ready, I update the previous values.

This process continues until I reach the last row.

At that point, there are three valid possibilities because the final row can end with any of the three choices.

I return the smallest of them.

The syntax changes slightly between C++, Java, JavaScript, and Python3, but the algorithm and Dynamic Programming logic remain exactly the same.

The main edge case is when `n = 1`.

In that case, there are no adjacent rows, so any of the three choices can be selected. The answer is simply the minimum value in the first row.

## Examples

### Example 1

**Input:**

`mat = [[1, 50, 50], [50, 50, 50], [1, 50, 50]]`

**Expected Output:**

`52`

**Trace:**

After the first row:

`[1, 50, 50]`

After the second row:

* Choice `0`: `50 + min(50, 50) = 100`
* Choice `1`: `50 + min(1, 50) = 51`
* Choice `2`: `50 + min(1, 50) = 51`

Current minimum costs:

`[100, 51, 51]`

After the third row:

* Choice `0`: `1 + min(51, 51) = 52`
* Choice `1`: `50 + min(100, 51) = 101`
* Choice `2`: `50 + min(100, 51) = 101`

Final costs:

`[52, 101, 101]`

The minimum cost is `52`.

### Example 2

**Input:**

`mat = [[1, 4, 1], [3, 2, 2], [3, 2, 3]]`

**Expected Output:**

`5`

**Trace:**

After the first row:

`[1, 4, 1]`

After the second row:

* Choice `0`: `3 + min(4, 1) = 4`
* Choice `1`: `2 + min(1, 1) = 3`
* Choice `2`: `2 + min(1, 4) = 3`

Current costs:

`[4, 3, 3]`

After the third row:

* Choice `0`: `3 + min(3, 3) = 6`
* Choice `1`: `2 + min(4, 3) = 5`
* Choice `2`: `3 + min(4, 3) = 6`

Final costs:

`[6, 5, 6]`

The minimum cost is `5`.

### Example 3

**Input:**

`mat = [[10, 5, 8]]`

**Expected Output:**

`5`

**Trace:**

There is only one row, so there is no adjacent row restriction to consider.

I simply select the cheapest choice:

`min(10, 5, 8) = 5`

## How to Use / Run Locally

First, clone the repository and move into the project folder.

```bash
git clone <repository-url>
cd <repository-folder>
```

### C++

Make sure a C++ compiler such as `g++` is installed.

Compile the file:

```bash
g++ solution.cpp -o solution
```

Run it on Linux or macOS:

```bash
./solution
```

Run it on Windows:

```bash
solution.exe
```

### Java

Make sure the Java Development Kit is installed.

Compile the Java file:

```bash
javac Solution.java
```

Run the compiled program:

```bash
java Solution
```

Depending on the local file structure or platform setup, a separate driver class may be required for standalone execution.

### JavaScript

Make sure Node.js is installed.

Run the JavaScript file:

```bash
node solution.js
```

If the solution is written specifically for an online judge such as GeeksforGeeks, local testing may require adding input and output handling.

### Python3

Make sure Python 3 is installed.

Run the file with:

```bash
python3 solution.py
```

On some Windows systems, the command may be:

```bash
python solution.py
```

## Notes & Optimizations

The straightforward Dynamic Programming solution can use a `dp[n][3]` table. That approach is easy to understand, but it uses `O(n)` extra space.

I can optimize it because every row only depends on the row directly before it.

By storing only three previous costs and three current costs, I reduce the auxiliary space to `O(1)`.

A greedy approach is not reliable here. Selecting the cheapest valid choice in the current row may create a more expensive situation in later rows.

The Dynamic Programming approach avoids this problem by keeping track of the best possible total cost for each ending choice.

The solution also handles the `n = 1` case naturally. After initialization, the answer is simply the minimum among the three costs from the first row.

This makes the approach efficient for the maximum constraint of `10^5` rows and suitable for competitive programming environments.

## Author

Md Aarzoo Islam — [Instagram: @codewithaarzoo.in](https://www.instagram.com/codewithaarzoo.in/?utm_source=chatgpt.com)
