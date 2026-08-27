# Largest Rectangle with Column Swaps

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

In this DSA and matrix problem, I am given a binary matrix containing only `0`s and `1`s.

I can swap any pair of columns any number of times. The goal is to find the maximum area of a rectangle containing only `1`s after performing the best possible column swaps.

The rectangle can use multiple rows and columns. Its area is:

`height × width`

The main challenge is that swapping columns changes the arrangement of the matrix, so I need to find the best possible rectangle without trying every possible column permutation.

A direct solution that checks every arrangement would be far too slow. I instead use consecutive heights and frequency counting to solve the Largest Rectangle with Column Swaps problem efficiently.

## Constraints

| Constraint          | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `1 ≤ n, m ≤ 10³`    | `n` is the number of rows and `m` is the number of columns |
| `0 ≤ mat[i][j] ≤ 1` | Every matrix element is either `0` or `1`                  |
| `mat.rows = n`      | The matrix contains `n` rows                               |
| `mat.cols = m`      | Every row contains `m` columns                             |

## Intuition

I started by thinking about what column swapping actually gives me.

Normally, when finding a rectangle of `1`s in a matrix, the columns must stay in their original order. Here, that restriction is removed because I can swap columns.

For every row, I can calculate how many consecutive `1`s end at that row for each column. These values represent possible rectangle heights.

For example, if the heights are:

`[2, 4, 1, 3]`

Since columns can be swapped, I can place the taller columns next to each other:

`[4, 3, 2, 1]`

Now I can check different rectangle widths. Using the first two columns gives a height of `3` and width of `2`, while using the first three gives a height of `2` and width of `3`.

This made me realize that I do not need to generate every possible column arrangement. I only need to know how many columns have each possible height.

That leads to an efficient matrix algorithm based on consecutive `1` heights and frequency counting.

## Approach

I process the matrix one row at a time.

### Step 1: Track consecutive `1`s

I maintain a height for every column.

If the current cell contains `1`, I increase that column's height.

If it contains `0`, I reset the height to `0`.

For example:

```text
Matrix:
1 0 1
1 1 1

After the first row:
[1, 0, 1]

After the second row:
[2, 1, 2]
```

### Step 2: Count the heights

After updating all column heights for the current row, I count how many columns have each height.

A height can never be greater than the number of rows, so I can use a frequency array instead of sorting.

### Step 3: Process heights from largest to smallest

I start from the largest possible height.

As I move downward, I add the number of columns having the current height.

At any height `h`, the accumulated number of columns represents the maximum width I can create using columns with height at least `h`.

The possible rectangle area is:

`h × width`

### Step 4: Keep the maximum area

I repeat this for every row and store the largest area found.

This avoids checking all column permutations and gives an optimized solution for the Largest Rectangle with Column Swaps problem.

## Data Structures Used

| Data Structure    | Purpose                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| Height array      | Stores the number of consecutive `1`s ending at the current row for every column |
| Frequency array   | Stores how many columns have each possible height                                |
| Integer variables | Track the current width and maximum rectangle area                               |

I use arrays because the matrix size and possible heights are known in advance.

The frequency array is especially useful because it removes the need to sort the column heights for every row.

## Operations & Behavior Summary

The algorithm works like this:

1. Start with all column heights equal to `0`.
2. Read one row of the binary matrix.
3. Increase a column's height if the current cell is `1`.
4. Reset the height to `0` if the current cell is `0`.
5. Count how many columns have each height.
6. Start from the largest height.
7. Add all columns available at that height to the current width.
8. Calculate `height × width`.
9. Update the maximum area.
10. Repeat the same process for every row.
11. Return the largest rectangle area found.

The important idea is that column swaps allow all useful columns to be placed next to each other. Because of that, only the column heights and their frequencies matter.

## Complexity

| Complexity       | Value            | Explanation                                                                                         |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(n × (n + m))` | For every one of the `n` rows, I update `m` column heights and process at most `n` possible heights |
| Space Complexity | `O(n + m)`       | I use a height array of size `m` and a frequency array of size `n + 1`                              |

Here, `n` is the number of rows and `m` is the number of columns in the binary matrix.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxArea(vector<vector<int>>& mat) {
        // I store the number of consecutive 1s ending at the current row
        // for every column, so the size is equal to the number of columns.
        int n = mat.size();
        int m = mat[0].size();
        vector<int> height(m, 0);

        // I keep this variable to store the largest rectangle area found.
        int answer = 0;

        // I process every row because each row can act as the bottom
        // boundary of a possible rectangle.
        for (int i = 0; i < n; i++) {

            // I create a frequency array where count[h] tells me how many
            // columns currently have consecutive height h.
            vector<int> count(n + 1, 0);

            // I update the consecutive height of every column.
            for (int j = 0; j < m; j++) {
                // A 1 continues the vertical sequence, while a 0 breaks it.
                if (mat[i][j] == 1) {
                    height[j]++;
                } else {
                    height[j] = 0;
                }

                // I count this height so I can process heights without sorting.
                count[height[j]]++;
            }

            // I store how many columns can be included after arranging
            // the column heights from largest to smallest.
            int width = 0;

            // I check larger heights first because columns can be swapped
            // to place all taller columns together.
            for (int h = n; h >= 1; h--) {
                // All columns with height h can extend the current width.
                width += count[h];

                // The shortest selected column has height h, so it limits
                // the rectangle height, while width is the rectangle width.
                answer = max(answer, h * width);
            }
        }

        // I return the largest area found across all possible bottom rows.
        return answer;
    }
};
```

### Java

```java
class Solution {
    public int maxArea(int[][] mat) {
        // I get the matrix dimensions because row count limits the maximum
        // possible height and column count tells me how many heights to track.
        int n = mat.length;
        int m = mat[0].length;

        // I store consecutive 1 heights for every column.
        int[] height = new int[m];

        // I keep the maximum rectangle area found so far.
        int answer = 0;

        // I process every row as a possible bottom boundary of a rectangle.
        for (int i = 0; i < n; i++) {

            // I count how many columns have each possible height from 0 to n.
            int[] count = new int[n + 1];

            // I update the consecutive 1 height for every column.
            for (int j = 0; j < m; j++) {
                // A 1 extends the vertical sequence, while a 0 resets it.
                if (mat[i][j] == 1) {
                    height[j]++;
                } else {
                    height[j] = 0;
                }

                // I record this height so I do not need to sort the columns.
                count[height[j]]++;
            }

            // I store the number of columns available for the current height.
            int width = 0;

            // I process heights from largest to smallest because after swapping,
            // taller columns can be placed together before shorter columns.
            for (int h = n; h >= 1; h--) {
                // I include every column whose height is exactly h.
                width += count[h];

                // Height h is the limiting height for all selected columns.
                answer = Math.max(answer, h * width);
            }
        }

        // I return the largest rectangle area.
        return answer;
    }
}
```

### JavaScript

```javascript
/*
 * @param {number[][]} mat
 * @return {number}
 */
class Solution {
    maxArea(mat) {
        // I get the number of rows and columns to size my helper arrays.
        const n = mat.length;
        const m = mat[0].length;

        // I store the consecutive number of 1s ending at the current row
        // for every column.
        const height = new Array(m).fill(0);

        // I keep the largest area found while processing all rows.
        let answer = 0;

        // I treat every row as the possible bottom edge of a rectangle.
        for (let i = 0; i < n; i++) {

            // I count how many columns have every possible height.
            const count = new Array(n + 1).fill(0);

            // I update the height of every column.
            for (let j = 0; j < m; j++) {
                // A 1 continues the vertical block, while a 0 breaks it.
                if (mat[i][j] === 1) {
                    height[j]++;
                } else {
                    height[j] = 0;
                }

                // I store the frequency so I can avoid comparison sorting.
                count[height[j]]++;
            }

            // I keep the number of columns that can form the current width.
            let width = 0;

            // I process larger heights first because column swaps allow me
            // to place columns with larger heights next to each other.
            for (let h = n; h >= 1; h--) {
                // I add all columns that have this height.
                width += count[h];

                // Height h is the smallest height among the selected columns.
                answer = Math.max(answer, h * width);
            }
        }

        // I return the maximum rectangle area found.
        return answer;
    }
}
```

### Python3

```python
class Solution:
    def maxArea(self, mat: list[list[int]]) -> int:
        # I get the matrix dimensions because n limits the maximum possible
        # height and m tells me how many column heights I need to maintain.
        n = len(mat)
        m = len(mat[0])

        # I store the consecutive number of 1s ending at the current row
        # for every column.
        height = [0] * m

        # I keep the largest rectangle area found so far.
        answer = 0

        # I process every row as a possible bottom boundary of a rectangle.
        for i in range(n):

            # I count how many columns have each height from 0 to n,
            # which lets me avoid sorting the height array.
            count = [0] * (n + 1)

            # I update the consecutive height for every column.
            for j in range(m):
                # A 1 extends the vertical sequence, while a 0 resets it.
                if mat[i][j] == 1:
                    height[j] += 1
                else:
                    height[j] = 0

                # I record how many columns currently have this height.
                count[height[j]] += 1

            # I store how many columns can be used after arranging columns
            # with larger heights before columns with smaller heights.
            width = 0

            # I process heights from largest to smallest.
            for h in range(n, 0, -1):
                # I include every column having the current height.
                width += count[h]

                # The current height limits the rectangle height.
                answer = max(answer, h * width)

        # I return the largest rectangle area found in the matrix.
        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the same in every language. Only the syntax for arrays, loops, and class methods changes.

### 1. Getting the matrix dimensions

I first get the number of rows and columns.

The number of rows is important because no consecutive height can be larger than the total number of rows.

The number of columns tells me how many height values I need to maintain.

### 2. Creating the height array

I create an array with one position for every column.

Initially, every value is `0`.

After processing a row, each value tells me how many consecutive `1`s end at the current row in that column.

For example, if a column contains:

```text
1
1
1
```

then its height becomes `3`.

If the next value is `0`, the height immediately becomes `0` because a rectangle of `1`s cannot continue through a `0`.

### 3. Updating heights for the current row

For every column:

* If the current value is `1`, I increase its height by `1`.
* If the current value is `0`, I reset its height to `0`.

This is important because I am treating every row as the possible bottom boundary of a rectangle.

I do not create a new height array for every row. I keep updating the same one because the consecutive values from previous rows are needed to build larger heights.

### 4. Creating the frequency array

After updating all heights, I count how many times each height appears.

Suppose the current heights are:

`[3, 1, 3, 2, 3]`

Then the frequency information is:

```text
Height 1 → 1 column
Height 2 → 1 column
Height 3 → 3 columns
```

I use this information instead of sorting the array.

Sorting would also work, but the frequency approach is more efficient here because the possible heights are limited to the range from `0` to `n`.

### 5. Processing heights in decreasing order

I start from the largest possible height and move downward.

When I process a height, I add the number of columns having that height to the current width.

For the previous example, when I reach height `3`, the width becomes `3`.

That gives:

`3 × 3 = 9`

When I move to height `2`, I add the columns with height `2`.

The width becomes `4`.

Now I calculate:

`2 × 4 = 8`

The previous answer of `9` is still larger.

When I move to height `1`, every column can be included:

`1 × 5 = 5`

Again, `9` remains the maximum.

### 6. Why accumulated width works

When processing height `h`, every column already counted has height at least `h`.

Because I can swap columns, I can move all those columns next to each other.

That means they can form one continuous rectangle with:

* Height = `h`
* Width = number of columns accumulated so far

Without column swaps, this would not always work because those columns might be separated by other columns.

The ability to rearrange columns is the main reason this approach works.

### 7. Updating the answer

For every possible height, I calculate:

`current height × current width`

I compare this area with the best answer found so far.

I repeat the entire process for every row because the largest rectangle may end at any row in the matrix.

### Language-specific behavior

#### C++

The C++ solution typically uses `vector<int>` for the height and frequency arrays. `std::max()` is used to update the answer.

#### Java

The Java solution uses `int[]` arrays. `Math.max()` updates the maximum rectangle area.

#### JavaScript

The JavaScript solution uses regular arrays. The same height and frequency counting logic is followed with `Math.max()`.

#### Python3

The Python solution uses lists for both arrays. The loop logic remains the same, and Python's built-in `max()` is used to update the answer.

The algorithm itself does not change between languages.

## Examples

### Example 1

**Input:**

```text
mat = [
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 1, 1, 0]
]
```

**Expected Output:**

```text
6
```

**Brief trace:**

After processing the last row, the column heights are:

`[1, 0, 1, 3, 0]`

After grouping columns by height, the useful heights show that three columns can contribute to a rectangle with height `2` after suitable column swaps.

The maximum area becomes `6`.

### Example 2

**Input:**

```text
mat = [
    [0, 1, 1, 0, 0],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1]
]
```

**Expected Output:**

```text
12
```

**Brief trace:**

As I move through the rows, the consecutive heights increase.

Before processing the final row, several columns already have large heights.

Because columns can be swapped, the columns containing the largest heights can be placed together.

A rectangle with area `12` can then be formed, which is the maximum possible answer.

### Example 3

**Input:**

```text
mat = [
    [1, 1, 1],
    [1, 1, 1]
]
```

**Expected Output:**

```text
6
```

**Brief trace:**

After the first row:

`height = [1, 1, 1]`

The maximum area is:

`1 × 3 = 3`

After the second row:

`height = [2, 2, 2]`

Now all three columns can form:

`2 × 3 = 6`

So the final answer is `6`.

## How to Use / Run Locally

Before running any version, paste the solution code into the correct language file.

### C++

Create a file named:

```text
main.cpp
```

Compile it using:

```bash
g++ -std=c++17 main.cpp -o main
```

Run it on macOS or Linux:

```bash
./main
```

On Windows:

```bash
main.exe
```

### Java

Create a file named:

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

If the file only contains a competitive programming class without a `main` method, use it directly on the supported online judge or add a local driver program for testing.

### JavaScript

Create a file named:

```text
solution.js
```

Make sure Node.js is installed.

Run the file with:

```bash
node solution.js
```

For local testing, add your own input and function call if the solution only contains the competitive programming class.

### Python3

Create a file named:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

On some Windows systems, the command may be:

```bash
python solution.py
```

## Notes & Optimizations

The biggest optimization in this solution is avoiding every possible column permutation. There can be a huge number of column arrangements, so trying them directly is not practical.

Another useful optimization is using a frequency array instead of sorting the column heights for every row.

A sorting-based solution can also work, but sorting every row would add an `O(m log m)` cost per row.

The frequency approach works well because every height is limited by the number of rows.

Important edge cases include:

* A matrix containing only `0`s, where the answer is `0`.
* A single row, where column swaps can group all `1`s together.
* A single column, where the answer is simply the longest consecutive sequence of `1`s.
* A matrix containing only `1`s, where the answer is `n × m`.
* Matrices where the best rectangle only becomes possible after swapping columns.

The key observation to remember is that once column swapping is allowed, the original order of columns is no longer important for a chosen row. The number of columns with enough height becomes the only thing that matters.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
