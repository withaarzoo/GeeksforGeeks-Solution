# Largest Unblocked Submatrix

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

The Largest Unblocked Submatrix problem gives us an `n × m` grid and a list of blocked cells.

Each blocked cell is represented as:

`[r, c]`

Here, `r` is the row number and `c` is the column number.

A blocked cell does more than block one position. It blocks its entire row and its entire column.

The goal is to find the largest continuous rectangular area that does not use any blocked row or blocked column.

One important condition makes the problem easier: no two blocked cells are present in the same row or the same column.

The input contains:

* `n`: total number of rows
* `m`: total number of columns
* `k`: number of blocked cells
* `arr`: list of blocked cells

The output is a single integer representing the maximum possible area of a continuous unblocked submatrix.

## Constraints

| Variable |          Constraint | Meaning                         |
| -------- | ------------------: | ------------------------------- |
| `n`      |   `1 ≤ n, m ≤ 10^4` | Number of rows in the grid      |
| `m`      |   `1 ≤ n, m ≤ 10^4` | Number of columns in the grid   |
| `k`      | `0 ≤ k ≤ min(n, m)` | Number of blocked cells         |
| `r`      |         `1 ≤ r ≤ n` | Row number of a blocked cell    |
| `c`      |         `1 ≤ c ≤ m` | Column number of a blocked cell |

No two blocked cells are present in the same row or the same column.

## Intuition

The first thing I noticed is that I do not need to build the actual grid.

A blocked cell at `(r, c)` blocks the complete row `r` and the complete column `c`. So the exact grid cells are not important anymore.

I only need to know where the blocked rows are and where the blocked columns are.

After removing the blocked rows, the remaining rows form continuous free groups. The same thing happens with the columns.

The largest unblocked submatrix must come from:

`largest continuous free row gap × largest continuous free column gap`

This turns a two-dimensional grid problem into two simple one-dimensional gap problems.

To make the first and last gaps easy to calculate, I add imaginary boundaries outside the grid.

For rows, I use:

`0` and `n + 1`

For columns, I use:

`0` and `m + 1`

If two consecutive blocked positions are `a` and `b`, the number of free positions between them is:

`b - a - 1`

So after sorting the blocked rows and columns, I only need to find the largest gap in each list.

## Approach

I solve the Largest Unblocked Submatrix problem with sorting and gap calculation.

The steps are:

1. Create one list for blocked row positions.
2. Create another list for blocked column positions.
3. Add `0` as the starting boundary to both lists.
4. Add every blocked row and blocked column from the input.
5. Add `n + 1` as the ending row boundary.
6. Add `m + 1` as the ending column boundary.
7. Sort both lists.
8. Check every pair of consecutive blocked row positions.
9. Calculate the number of free rows between them.
10. Keep the largest free row gap.
11. Repeat the same process for columns.
12. Multiply the largest free row gap by the largest free column gap.

The formula for a gap is:

```text
current blocked position - previous blocked position - 1
```

The final answer is:

```text
maximum free rows × maximum free columns
```

This greedy sorting approach works because the row gaps and column gaps are independent.

## Data Structures Used

### Array or List for Blocked Rows

I store all blocked row numbers in one array or list.

I also store the two imaginary boundaries, `0` and `n + 1`.

This lets me sort the positions and calculate every continuous free row gap.

### Array or List for Blocked Columns

I use another array or list for blocked column numbers.

It also contains the boundaries `0` and `m + 1`.

Keeping rows and columns separate makes the solution much simpler because I can solve both dimensions independently.

### Integer Variables

I use two integer variables:

* one for the maximum number of continuous free rows
* one for the maximum number of continuous free columns

No grid, matrix, hash map, or dynamic programming table is needed.

## Operations & Behavior Summary

The algorithm works in a few clear stages.

First, it separates every blocked cell into a blocked row number and a blocked column number.

Then it adds imaginary positions before and after the real grid. These boundaries remove the need for special handling of the first and last free sections.

Next, it sorts the blocked row positions.

For every two consecutive positions, it calculates how many rows are free between them.

It keeps the largest of these row gaps.

The algorithm then repeats the same process for blocked columns.

At the end, it combines the largest free row section and the largest free column section.

Their product is the area of the largest continuous unblocked submatrix.

In plain-English pseudocode:

```text
store all blocked rows
store all blocked columns

add outer boundaries

sort blocked rows
sort blocked columns

find the largest gap between consecutive blocked rows
find the largest gap between consecutive blocked columns

return largest row gap × largest column gap
```

## Complexity

| Complexity       | Value        | Explanation                                                                                                                                  |
| ---------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(k log k)` | Sorting the `k` blocked row positions and `k` blocked column positions takes `O(k log k)` time. Scanning the sorted lists takes `O(k)` time. |
| Space Complexity | `O(k)`       | Two extra lists are used to store the blocked row and column positions along with boundary values.                                           |

Here, `k` is the number of blocked cells.

The solution does not depend on all `n × m` grid cells, which is why it is much more efficient than building and scanning the complete matrix.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int largestArea(int n, int m, int k, vector<vector<int>> &arr) {
        // I store blocked row and column positions separately.
        vector<int> rows;
        vector<int> cols;

        // These imaginary boundaries help me handle the grid edges
        // exactly like normal gaps between blocked positions.
        rows.push_back(0);
        cols.push_back(0);

        // I collect the blocked row and column from every blocked cell.
        for (int i = 0; i < k; i++) {
            rows.push_back(arr[i][0]);
            cols.push_back(arr[i][1]);
        }

        // These boundaries represent positions just outside the grid.
        rows.push_back(n + 1);
        cols.push_back(m + 1);

        // After sorting, consecutive values define one continuous free gap.
        sort(rows.begin(), rows.end());
        sort(cols.begin(), cols.end());

        int maxRows = 0;
        int maxCols = 0;

        // I find the largest number of free rows between two blocked positions.
        for (int i = 1; i < rows.size(); i++) {
            int freeRows = rows[i] - rows[i - 1] - 1;
            maxRows = max(maxRows, freeRows);
        }

        // I find the largest number of free columns in the same way.
        for (int i = 1; i < cols.size(); i++) {
            int freeCols = cols[i] - cols[i - 1] - 1;
            maxCols = max(maxCols, freeCols);
        }

        // The largest rectangle uses the widest free row gap
        // together with the widest free column gap.
        return maxRows * maxCols;
    }
};
```

### Java

```java
class Solution {
    public int largestArea(int n, int m, int k, int[][] arr) {
        // I need space for k blocked positions and two extra boundaries.
        int[] rows = new int[k + 2];
        int[] cols = new int[k + 2];

        // Position 0 acts as the boundary before the grid starts.
        rows[0] = 0;
        cols[0] = 0;

        // I store every blocked row and column separately.
        for (int i = 0; i < k; i++) {
            rows[i + 1] = arr[i][0];
            cols[i + 1] = arr[i][1];
        }

        // These positions act as boundaries just after the grid ends.
        rows[k + 1] = n + 1;
        cols[k + 1] = m + 1;

        // Sorting puts all blocked positions in increasing order.
        Arrays.sort(rows);
        Arrays.sort(cols);

        int maxRows = 0;
        int maxCols = 0;

        // I check every gap between consecutive blocked rows.
        for (int i = 1; i < rows.length; i++) {
            int freeRows = rows[i] - rows[i - 1] - 1;
            maxRows = Math.max(maxRows, freeRows);
        }

        // I check every gap between consecutive blocked columns.
        for (int i = 1; i < cols.length; i++) {
            int freeCols = cols[i] - cols[i - 1] - 1;
            maxCols = Math.max(maxCols, freeCols);
        }

        // Multiplying the two largest gaps gives the largest free area.
        return maxRows * maxCols;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @param {number[][]} arr
 * @returns {number}
 */
class Solution {
    largestArea(n, m, k, arr) {
        // I start with imaginary boundaries before the grid.
        const rows = [0];
        const cols = [0];

        // I separate blocked row positions from blocked column positions.
        for (let i = 0; i < k; i++) {
            rows.push(arr[i][0]);
            cols.push(arr[i][1]);
        }

        // I add imaginary boundaries just after the grid.
        rows.push(n + 1);
        cols.push(m + 1);

        // Numeric comparators are needed because default JavaScript
        // sorting compares values as strings.
        rows.sort((a, b) => a - b);
        cols.sort((a, b) => a - b);

        let maxRows = 0;
        let maxCols = 0;

        // I calculate every continuous free row gap.
        for (let i = 1; i < rows.length; i++) {
            const freeRows = rows[i] - rows[i - 1] - 1;
            maxRows = Math.max(maxRows, freeRows);
        }

        // I calculate every continuous free column gap.
        for (let i = 1; i < cols.length; i++) {
            const freeCols = cols[i] - cols[i - 1] - 1;
            maxCols = Math.max(maxCols, freeCols);
        }

        // The best row gap and column gap together form the largest rectangle.
        return maxRows * maxCols;
    }
}
```

### Python3

```python
class Solution:
    def largestArea(self, n, m, k, arr):
        # I add an imaginary boundary before the first row and column.
        rows = [0]
        cols = [0]

        # I collect blocked row and column positions separately.
        for i in range(k):
            rows.append(arr[i][0])
            cols.append(arr[i][1])

        # I add imaginary boundaries just outside the grid.
        rows.append(n + 1)
        cols.append(m + 1)

        # Sorting lets me examine continuous gaps between blocked positions.
        rows.sort()
        cols.sort()

        max_rows = 0
        max_cols = 0

        # I find the largest continuous group of free rows.
        for i in range(1, len(rows)):
            free_rows = rows[i] - rows[i - 1] - 1
            max_rows = max(max_rows, free_rows)

        # I find the largest continuous group of free columns.
        for i in range(1, len(cols)):
            free_cols = cols[i] - cols[i - 1] - 1
            max_cols = max(max_cols, free_cols)

        # Their product is the largest continuous unblocked area.
        return max_rows * max_cols
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core algorithm is the same in C++, Java, JavaScript, and Python3. Only the syntax and built-in sorting methods are different.

### Step 1: Separate Rows and Columns

Each blocked cell contains two values:

```text
[row, column]
```

I store the row value in the blocked rows collection and the column value in the blocked columns collection.

For example:

```text
Blocked cells: [[2, 4], [5, 1]]

Blocked rows:    [2, 5]
Blocked columns: [4, 1]
```

I do this because a blocked row affects the height of the possible rectangle, while a blocked column affects its width.

There is no need to keep the row and column connected as a pair after this point.

### Step 2: Add Starting Boundaries

The real grid starts from row `1` and column `1`.

I add `0` to both collections.

This imaginary blocked position helps calculate the free area before the first real blocked position.

Suppose the first blocked row is `4`.

The free rows before it are:

```text
1, 2, 3
```

Using the gap formula:

```text
4 - 0 - 1 = 3
```

The result is correct without writing any special condition.

### Step 3: Add Ending Boundaries

I add `n + 1` to the row collection and `m + 1` to the column collection.

These values represent imaginary blocked positions just outside the grid.

Suppose the grid has `10` rows and the last blocked row is `7`.

The ending boundary is:

```text
10 + 1 = 11
```

The free rows after row `7` are:

```text
8, 9, 10
```

The gap calculation gives:

```text
11 - 7 - 1 = 3
```

Again, no special edge condition is needed.

### Step 4: Sort the Positions

The blocked cells may be given in any order.

For example:

```text
[7, 2, 5]
```

I cannot correctly calculate continuous gaps from this order.

After sorting:

```text
[2, 5, 7]
```

Now every pair of neighboring values represents one possible continuous free section.

C++ uses its standard sorting function.

Java uses `Arrays.sort()`.

JavaScript needs a numeric comparator because its default sorting behavior can treat numbers like strings.

Python3 uses the built-in list sorting method.

The result is the same in every language.

### Step 5: Calculate Free Row Gaps

For every pair of consecutive blocked row positions, I calculate:

```text
current - previous - 1
```

Suppose two blocked rows are `2` and `6`.

The free rows are:

```text
3, 4, 5
```

The calculation is:

```text
6 - 2 - 1 = 3
```

I compare every row gap and keep the largest one.

This largest value becomes the maximum possible height of the unblocked submatrix.

### Step 6: Calculate Free Column Gaps

I repeat exactly the same process for columns.

The largest free column gap becomes the maximum possible width of the unblocked submatrix.

### Step 7: Calculate the Final Area

Once I know the best height and width, I multiply them:

```text
largest free row gap × largest free column gap
```

This works because every row in the chosen row gap is unblocked, and every column in the chosen column gap is also unblocked.

Their intersection forms one continuous rectangular submatrix with no blocked row or column.

### Why I Do Not Build the Grid

A direct approach could create an `n × m` matrix and mark blocked areas.

That would require up to `O(n × m)` space and could also take `O(n × m)` time.

This is unnecessary.

The only useful information is the location of blocked rows and blocked columns.

By storing only `k` blocked positions, the optimized Largest Unblocked Submatrix solution runs in `O(k log k)` time and uses `O(k)` extra space.

### Edge Case: No Blocked Cells

If `k = 0`, there are no blocked rows or columns.

The row collection contains only:

```text
[0, n + 1]
```

The free row gap is:

```text
n + 1 - 0 - 1 = n
```

The free column gap is:

```text
m + 1 - 0 - 1 = m
```

So the answer is:

```text
n × m
```

The full grid is correctly returned as the largest unblocked area.

## Examples

### Example 1

Input:

```text
n = 2
m = 2
k = 1
arr = [[2, 2]]
```

Expected Output:

```text
1
```

The blocked row positions with boundaries are:

```text
[0, 2, 3]
```

The largest free row gap is `1`.

The blocked column positions are also:

```text
[0, 2, 3]
```

The largest free column gap is `1`.

So the maximum area is:

```text
1 × 1 = 1
```

### Example 2

Input:

```text
n = 3
m = 3
k = 1
arr = [[3, 3]]
```

Expected Output:

```text
4
```

The row positions are:

```text
[0, 3, 4]
```

The largest free row gap is:

```text
3 - 0 - 1 = 2
```

The largest free column gap is also `2`.

So the answer is:

```text
2 × 2 = 4
```

### Example 3

Input:

```text
n = 5
m = 6
k = 2
arr = [[2, 3], [4, 5]]
```

Expected Output:

```text
4
```

The blocked row positions with boundaries are:

```text
[0, 2, 4, 6]
```

The free row gaps are:

```text
1, 1, 1
```

So the maximum free row gap is `1`.

The blocked column positions with boundaries are:

```text
[0, 3, 5, 7]
```

The free column gaps are:

```text
2, 1, 1
```

So the maximum free column gap is `2`.

The largest unblocked area is:

```text
1 × 2 = 2
```

## How to Use / Run Locally

The solution code can be tested locally after adding the required driver code and sample input handling.

### C++

Save the C++ solution in a file such as:

```text
main.cpp
```

Compile it with:

```bash
g++ main.cpp -o main
```

Run it with:

```bash
./main
```

On Windows, run:

```bash
main.exe
```

### Java

Save the Java solution in a file that matches the public class name, such as:

```text
Main.java
```

Compile it with:

```bash
javac Main.java
```

Run it with:

```bash
java Main
```

Make sure Java Development Kit, or JDK, is installed on the system.

### JavaScript

Save the JavaScript solution in:

```text
main.js
```

Run it with Node.js:

```bash
node main.js
```

Node.js must be installed before running the file locally.

### Python3

Save the Python solution in:

```text
main.py
```

Run it with:

```bash
python3 main.py
```

On some systems, the command may be:

```bash
python main.py
```

For direct submission on GeeksforGeeks, only the required `Solution` class and function are usually needed because the platform provides the driver code.

## Notes & Optimizations

The most important optimization is avoiding the actual `n × m` grid.

Creating the full matrix would waste both time and memory because the answer depends only on blocked row and column positions.

The boundary trick with `0`, `n + 1`, and `m + 1` also keeps the implementation clean. Without these boundaries, separate conditions would be needed for the free area before the first blocked position and after the last blocked position.

The solution naturally handles `k = 0`, so no separate condition is required for an empty blocked-cell list.

The problem guarantees that no two blocked cells share the same row or column. Because of this, duplicate handling is not needed.

An alternative approach could use boolean arrays of size `n` and `m` to mark blocked rows and columns. That would take `O(n + m + k)` time and `O(n + m)` space. It can be useful when the grid dimensions are small, but the sorting approach is better when the number of blocked cells is much smaller than the grid size.

The final optimized solution uses sorting, gap calculation, and a simple greedy observation. It is suitable for competitive programming, DSA practice, coding interviews, and GeeksforGeeks problem solving.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
