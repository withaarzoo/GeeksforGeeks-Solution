# Largest Odd Squares with Limited 1s

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

Given a binary matrix `mat` containing only `0`s and `1`s, we are also given a list of queries.

Each query gives the coordinates `(i, j)` of the center of a square.

For every query, the goal is to find the largest **odd-sized square** centered at `(i, j)` such that the square contains at most `k` ones.

The square expands equally in all four directions, so its side length is always odd:

* Radius `0` → side length `1`
* Radius `1` → side length `3`
* Radius `2` → side length `5`
* Radius `3` → side length `7`

If no valid square exists, the answer is `-1`.

The main challenge is that there can be many queries, so checking every cell of every possible square would be too slow.

This solution uses a **2D prefix sum** to count the number of ones inside any square in `O(1)` time and **binary search** to find the largest valid square efficiently.

## Constraints

| Constraint                              | Description                                     |
| --------------------------------------- | ----------------------------------------------- |
| `1 <= mat.size(), mat[0].size() <= 500` | The matrix has at most 500 rows and 500 columns |
| `1 <= queries.size() <= 10^4`           | There can be up to 10,000 queries               |
| `0 <= queries[i][0] < mat.size()`       | Query row is inside the matrix                  |
| `0 <= queries[i][1] < mat[0].size()`    | Query column is inside the matrix               |
| `0 <= k <= mat.size() * mat[0].size()`  | Maximum allowed number of ones                  |
| `mat[i][j]`                             | Contains either `0` or `1`                      |

## Intuition

I first looked at how an odd-sized square grows around its center.

For a center `(i, j)`, I only need to know its radius. A radius of `1` gives a `3 x 3` square, a radius of `2` gives a `5 x 5` square, and so on.

The next problem is counting how many `1`s are inside each square.

Doing that directly would mean visiting every cell inside the square again and again. With up to `10^4` queries, this can become expensive.

So I use a **2D prefix sum array**. After building it, I can get the number of ones inside any rectangular area in constant time.

There is another useful observation. If a square with radius `r` contains more than `k` ones, every larger square will also contain more than `k` ones because larger squares contain all the cells of the smaller square.

This gives me a monotonic condition, which means I can use **binary search on the radius**.

One important edge case is when even the `1 x 1` square is invalid. For example, if the center contains `1` and `k = 0`, there is no valid square. In that situation, the answer must be `-1`.

## Approach

I solve each query in the following steps:

1. Build a 2D prefix sum for the entire matrix.
2. For the query center `(i, j)`, calculate the maximum radius that can fit inside the matrix.
3. Binary search between radius `0` and this maximum radius.
4. For each middle radius, calculate the square boundaries.
5. Use the 2D prefix sum to count the number of ones inside that square.
6. If the number of ones is at most `k`, the square is valid, so search for a larger radius.
7. Otherwise, search for a smaller radius.
8. Store the largest valid radius.
9. Convert the radius into the side length using `2 * radius + 1`.
10. If no radius was valid, return `-1`.

## Data Structures Used

### 2D Prefix Sum Array

A two-dimensional prefix sum array stores cumulative sums of the matrix.

It allows the number of ones inside any rectangular region to be calculated in `O(1)` time.

An extra row and column are used to make boundary calculations simpler.

### Answer Array

An array is used to store the result for every query in the same order as the input queries.

No other advanced data structure is required.

## Operations & Behavior Summary

The algorithm works in two main stages.

### Stage 1: Build the Prefix Sum

For every matrix cell, I calculate the total number of ones from the top-left corner up to that position.

This takes `O(n * m)` time.

### Stage 2: Process Each Query

For every center `(i, j)`:

```text
Find maximum possible radius
            |
            v
      Binary Search
            |
            v
Calculate square boundaries
            |
            v
Count ones using prefix sum
            |
       +----+----+
       |         |
    ones <= k   ones > k
       |         |
       v         v
  Search right  Search left
```

After the binary search:

```text
side length = 2 * largestRadius + 1
```

If no radius is valid, the largest radius remains `-1`, so the final result is also `-1`.

## Complexity

| Type                    | Complexity                      | Explanation                                   |
| ----------------------- | ------------------------------- | --------------------------------------------- |
| Prefix Sum Construction | `O(n * m)`                      | Every matrix cell is processed once           |
| Each Query              | `O(log(min(n, m)))`             | Binary search over the possible radius        |
| Total Time              | `O(n * m + q * log(min(n, m)))` | `q` is the number of queries                  |
| Extra Space             | `O(n * m)`                      | The 2D prefix sum array uses `O(n * m)` space |

Here:

* `n` = number of rows in the matrix
* `m` = number of columns in the matrix
* `q` = number of queries

The prefix sum makes every square-sum calculation `O(1)`, which is what makes the binary search efficient.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> largestSquare(vector<vector<int>>& mat, vector<vector<int>>& queries,
                              int k) {
        int n = mat.size();                 // Store the number of rows.
        int m = mat[0].size();              // Store the number of columns.

        // prefix[i][j] stores the number of 1s in the first
        // i rows and first j columns of the matrix.
        // The extra row and column make boundary calculations easier.
        vector<vector<int>> prefix(n + 1, vector<int>(m + 1, 0));

        // Build the 2D prefix sum.
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                // Add the current cell and the upper and left areas,
                // then subtract the overlapping area counted twice.
                prefix[i][j] = mat[i - 1][j - 1]
                             + prefix[i - 1][j]
                             + prefix[i][j - 1]
                             - prefix[i - 1][j - 1];
            }
        }

        // Return the number of 1s inside the rectangle
        // from (r1, c1) to (r2, c2), inclusive.
        auto getSum = [&](int r1, int c1, int r2, int c2) {
            // Shift matrix coordinates by one because
            // prefix has an extra row and column.
            r1++;
            c1++;
            r2++;
            c2++;

            // Use inclusion-exclusion to calculate the rectangle sum.
            return prefix[r2][c2]
                 - prefix[r1 - 1][c2]
                 - prefix[r2][c1 - 1]
                 + prefix[r1 - 1][c1 - 1];
        };

        vector<int> answer;                 // Store the answer for every query.
        answer.reserve(queries.size());     // Avoid unnecessary reallocations.

        // Process every query independently.
        for (auto& query : queries) {
            int i = query[0];               // Row of the center.
            int j = query[1];               // Column of the center.

            // Find the largest radius that keeps the square
            // completely inside the matrix.
            int maxRadius = min({i, j, n - 1 - i, m - 1 - j});

            int low = 0;                    // Smallest possible radius.
            int high = maxRadius;           // Largest possible radius.
            int best = -1;                 // -1 means no valid square exists yet.

            // Binary search for the largest valid radius.
            while (low <= high) {
                int mid = low + (high - low) / 2;

                // Calculate the four boundaries of the square
                // centered at (i, j) with radius mid.
                int r1 = i - mid;
                int c1 = j - mid;
                int r2 = i + mid;
                int c2 = j + mid;

                // Count the number of 1s in this square in O(1).
                int ones = getSum(r1, c1, r2, c2);

                if (ones <= k) {
                    // This square is valid, so save this radius
                    // and try to find an even larger valid square.
                    best = mid;
                    low = mid + 1;
                } else {
                    // This square contains too many 1s,
                    // so every larger radius is also invalid.
                    high = mid - 1;
                }
            }

            // Convert the radius into the odd side length.
            // If best is -1, this correctly produces -1.
            answer.push_back(2 * best + 1);
        }

        return answer;                       // Return all query answers.
    }
};
```

### Java

```java
class Solution {
    ArrayList<Integer> largestSquare(int[][] mat, int[][] queries, int k) {
        int n = mat.length;                  // Store the number of rows.
        int m = mat[0].length;               // Store the number of columns.

        // prefix[i][j] stores the number of 1s in the first
        // i rows and first j columns of the matrix.
        int[][] prefix = new int[n + 1][m + 1];

        // Build the 2D prefix sum.
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                // Add the current cell and the upper/left regions,
                // then subtract the overlapping region counted twice.
                prefix[i][j] = mat[i - 1][j - 1]
                             + prefix[i - 1][j]
                             + prefix[i][j - 1]
                             - prefix[i - 1][j - 1];
            }
        }

        ArrayList<Integer> answer = new ArrayList<>(); // Store query answers.

        // Process every query independently.
        for (int[] query : queries) {
            int i = query[0];                // Row of the square center.
            int j = query[1];                // Column of the square center.

            // The nearest boundary determines the largest possible radius.
            int maxRadius = Math.min(
                Math.min(i, j),
                Math.min(n - 1 - i, m - 1 - j)
            );

            int low = 0;                     // Smallest possible radius.
            int high = maxRadius;            // Largest boundary-safe radius.
            int best = -1;                  // No valid square found initially.

            // Binary search for the largest valid radius.
            while (low <= high) {
                int mid = low + (high - low) / 2;

                // Find the square boundaries for this radius.
                int r1 = i - mid;
                int c1 = j - mid;
                int r2 = i + mid;
                int c2 = j + mid;

                // Convert matrix coordinates to prefix coordinates.
                int R1 = r1 + 1;
                int C1 = c1 + 1;
                int R2 = r2 + 1;
                int C2 = c2 + 1;

                // Count the number of 1s inside the square.
                int ones = prefix[R2][C2]
                         - prefix[R1 - 1][C2]
                         - prefix[R2][C1 - 1]
                         + prefix[R1 - 1][C1 - 1];

                if (ones <= k) {
                    // This radius is valid, so remember it
                    // and search for a larger valid radius.
                    best = mid;
                    low = mid + 1;
                } else {
                    // Too many 1s means we must search smaller radii.
                    high = mid - 1;
                }
            }

            // Convert the radius into the required odd side length.
            // When best == -1, this gives -1.
            answer.add(2 * best + 1);
        }

        return answer;                       // Return all query results.
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} mat
 * @param {number[][]} queries
 * @param {number} k
 * @return {number[]}
 */
class Solution {
    largestSquare(mat, queries, k) {
        const n = mat.length;                 // Number of rows.
        const m = mat[0].length;              // Number of columns.

        // Create an extra row and column so prefix-sum
        // calculations work without special boundary cases.
        const prefix = Array.from(
            { length: n + 1 },
            () => new Array(m + 1).fill(0)
        );

        // Build the 2D prefix sum.
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                // Add the current value and the upper/left areas,
                // then subtract the overlapping area counted twice.
                prefix[i][j] =
                    mat[i - 1][j - 1] +
                    prefix[i - 1][j] +
                    prefix[i][j - 1] -
                    prefix[i - 1][j - 1];
            }
        }

        // Return the number of 1s inside a rectangle in O(1).
        const getSum = (r1, c1, r2, c2) => {
            // Shift matrix coordinates by one for the prefix array.
            r1++;
            c1++;
            r2++;
            c2++;

            // Apply inclusion-exclusion to get the rectangle sum.
            return prefix[r2][c2]
                 - prefix[r1 - 1][c2]
                 - prefix[r2][c1 - 1]
                 + prefix[r1 - 1][c1 - 1];
        };

        const answer = [];                    // Store every query result.

        // Process each query independently.
        for (const query of queries) {
            const i = query[0];               // Center row.
            const j = query[1];               // Center column.

            // Find the largest radius that can fit inside the matrix.
            const maxRadius = Math.min(
                i,
                j,
                n - 1 - i,
                m - 1 - j
            );

            let low = 0;                      // Smallest possible radius.
            let high = maxRadius;             // Largest possible radius.
            let best = -1;                    // No valid square found yet.

            // Binary search for the largest valid radius.
            while (low <= high) {
                const mid = low + Math.floor((high - low) / 2);

                // Calculate the boundaries of the current square.
                const r1 = i - mid;
                const c1 = j - mid;
                const r2 = i + mid;
                const c2 = j + mid;

                // Count the 1s inside this square in O(1).
                const ones = getSum(r1, c1, r2, c2);

                if (ones <= k) {
                    // The current square is valid, so save the radius
                    // and search for a larger valid square.
                    best = mid;
                    low = mid + 1;
                } else {
                    // Too many 1s means larger radii cannot work.
                    high = mid - 1;
                }
            }

            // Convert radius to side length.
            // If best is -1, this evaluates to -1.
            answer.push(2 * best + 1);
        }

        return answer;                        // Return all answers.
    }
}
```

### Python3

```python
class Solution:
    def largestSquare(self, mat: list[list[int]], queries: list[list[int]], k: int) -> list[int]:
        n = len(mat)                           # Store the number of rows.
        m = len(mat[0])                        # Store the number of columns.

        # Create an extra row and column so rectangle sums
        # can be calculated without special boundary handling.
        prefix = [[0] * (m + 1) for _ in range(n + 1)]

        # Build the 2D prefix sum.
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                # Add the current cell and upper/left regions,
                # then subtract the overlapping region counted twice.
                prefix[i][j] = (
                    mat[i - 1][j - 1]
                    + prefix[i - 1][j]
                    + prefix[i][j - 1]
                    - prefix[i - 1][j - 1]
                )

        # Return the number of 1s inside a rectangle in O(1).
        def get_sum(r1: int, c1: int, r2: int, c2: int) -> int:
            # Shift matrix coordinates by one for the prefix array.
            r1 += 1
            c1 += 1
            r2 += 1
            c2 += 1

            # Use inclusion-exclusion to calculate the rectangle sum.
            return (
                prefix[r2][c2]
                - prefix[r1 - 1][c2]
                - prefix[r2][c1 - 1]
                + prefix[r1 - 1][c1 - 1]
            )

        answer = []                             # Store the result of each query.

        # Process every query independently.
        for i, j in queries:
            # Find the largest radius that keeps the square inside the matrix.
            max_radius = min(
                i,
                j,
                n - 1 - i,
                m - 1 - j
            )

            low = 0                             # Smallest possible radius.
            high = max_radius                   # Largest possible radius.
            best = -1                            # No valid square found yet.

            # Binary search for the largest valid radius.
            while low <= high:
                mid = low + (high - low) // 2

                # Calculate the four boundaries of the current square.
                r1 = i - mid
                c1 = j - mid
                r2 = i + mid
                c2 = j + mid

                # Count all 1s in the current square in O(1).
                ones = get_sum(r1, c1, r2, c2)

                if ones <= k:
                    # This radius is valid, so save it
                    # and search for a larger valid radius.
                    best = mid
                    low = mid + 1
                else:
                    # Too many 1s means we need a smaller radius.
                    high = mid - 1

            # Convert the radius into the odd side length.
            # If best is -1, this correctly returns -1.
            answer.append(2 * best + 1)

        return answer
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core algorithm is the same in all four languages. The main difference is only how each language creates arrays, loops through the matrix, and stores the result.

### 1. Read the matrix dimensions

I first store the number of rows and columns.

These values are needed when calculating the maximum radius for every query.

For a center `(i, j)`, the square cannot cross any matrix boundary.

So the maximum radius is:

```text
min(i, j, n - 1 - i, m - 1 - j)
```

This checks the available space in all four directions.

### 2. Build the 2D prefix sum

I create a prefix sum array with one extra row and one extra column.

For every matrix position, I calculate:

```text
prefix[i][j]
=
mat[i-1][j-1]
+ prefix[i-1][j]
+ prefix[i][j-1]
- prefix[i-1][j-1]
```

The subtraction is important because the top-left region gets counted twice.

After this preprocessing, I can find the number of ones in any rectangle using four prefix-sum values.

### 3. Calculate a square's number of ones

For a query center `(i, j)` and radius `r`, the square is:

```text
top    = i - r
left   = j - r
bottom = i + r
right  = j + r
```

Because the radius was restricted by the matrix boundaries, these coordinates are always valid.

The prefix sum gives the number of ones in this entire square in constant time.

### 4. Binary search the radius

I start with:

```text
low = 0
high = maximum possible radius
best = -1
```

The value `best = -1` is important.

It means that I have not found any valid square yet.

I calculate the middle radius:

```text
mid = low + (high - low) / 2
```

Then I check the number of ones inside that square.

### 5. When the square is valid

If:

```text
ones <= k
```

the current square satisfies the condition.

I save its radius:

```text
best = mid
```

Then I search to the right because I want an even larger square.

```text
low = mid + 1
```

### 6. When the square is invalid

If:

```text
ones > k
```

the square contains too many ones.

Every larger square contains this square, so a larger radius cannot become valid.

Therefore I search the left half:

```text
high = mid - 1
```

### 7. Convert radius to answer

If the largest valid radius is `r`, the side length is:

```text
2 * r + 1
```

For example:

```text
r = 0 -> 1
r = 1 -> 3
r = 2 -> 5
r = 3 -> 7
```

If no square is valid, `best` stays `-1`.

Then:

```text
2 * (-1) + 1 = -1
```

So the same formula naturally handles the no-solution case.

### C++

The C++ implementation uses `vector<vector<int>>` for the matrix and prefix sum.

The `getSum` helper makes the rectangle-sum calculation reusable inside the binary search.

The result is stored in a `vector<int>`.

### Java

The Java implementation uses a standard `int[][]` prefix sum.

The inclusion-exclusion formula is written directly inside the binary search to avoid creating unnecessary objects for every query.

The answers are stored in an `ArrayList<Integer>` as required by the function signature.

### JavaScript

The JavaScript implementation creates the prefix sum using nested arrays.

A small helper function calculates the number of ones inside a rectangle.

JavaScript's `Math.min()` is used to calculate the maximum possible radius.

### Python3

The Python implementation uses a list of lists for the prefix sum.

A nested helper function calculates rectangle sums.

Python's multiple-argument `min()` makes the maximum-radius calculation concise while keeping the logic easy to read.

## Examples

### Example 1

Input:

```text
mat = [
    [1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1]
]

queries = [[1, 2]]
k = 9
```

Output:

```text
[3]
```

For center `(1, 2)`, a radius of `1` creates this `3 x 3` square:

```text
0 1 0
0 1 1
1 1 1
```

It contains `6` ones, which is at most `9`.

The next larger square cannot fit around this center because of the matrix boundary.

So the largest side length is `3`.

### Example 2

Input:

```text
mat = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]

queries = [[1, 1], [2, 2]]
k = 9
```

Output:

```text
[3, 1]
```

For query `(1, 1)`, the entire matrix is a `3 x 3` square containing exactly `9` ones.

Since `9 <= k`, the answer is `3`.

For query `(2, 2)`, the center is at the bottom-right corner.

There is no room to expand in either direction, so only the `1 x 1` square is possible.

Therefore the answer is `1`.

### Example 3: No Valid Square

Input:

```text
mat = [
    [1]
]

queries = [[0, 0]]
k = 0
```

Output:

```text
[-1]
```

The only possible square is:

```text
1
```

It contains one `1`, but `k` is `0`.

Therefore even the smallest square is invalid, so the answer is `-1`.

This edge case is important because it means the `1 x 1` square cannot always be assumed to be valid.

## How to Use / Run Locally

The repository contains the same algorithm implemented in C++, Java, JavaScript, and Python3.

### C++

Save the solution in a file such as:

```text
Solution.cpp
```

Compile it with:

```bash
g++ -std=c++17 Solution.cpp -o solution
```

Run it with:

```bash
./solution
```

If you are using Windows with MinGW:

```bash
solution.exe
```

For a local program, add your own `main()` function to provide test input and call the `largestSquare` method.

### Java

Save the file as:

```text
Solution.java
```

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

The class should contain a `main()` method if you want to test it as a standalone Java program.

### JavaScript

Save the solution as:

```text
solution.js
```

Make sure Node.js is installed.

Run:

```bash
node solution.js
```

You can create a small test case in the file and call the `largestSquare()` method.

### Python3

Save the solution as:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

On some Windows installations, you may need:

```bash
python solution.py
```

Add a small test case at the bottom of the file to call the `largestSquare()` method.

## Notes & Optimizations

The most important edge case is when no square satisfies the condition.

For example:

```text
mat = [[1]]
k = 0
```

The `1 x 1` square contains one `1`, so the correct answer is `-1`.

That is why the binary search starts with:

```text
best = -1
```

rather than assuming radius `0` is valid.

Another important point is that the square must stay completely inside the matrix. The maximum radius is therefore limited by the closest boundary.

A brute-force solution could check every possible square and count all of its cells. That would be much slower, especially with `10^4` queries.

The 2D prefix sum reduces each square-count operation to `O(1)`.

Binary search then reduces the number of radius checks from linear to logarithmic.

An alternative approach could precompute more information for every possible center and radius, but that would require significantly more memory and preprocessing. The prefix-sum plus binary-search approach is simpler and fits the given constraints well.

The key ideas to remember from this problem are:

1. Represent an odd square using its radius.
2. Use a 2D prefix sum for fast rectangle-sum queries.
3. Use binary search when the validity condition is monotonic.
4. Do not assume the smallest possible square is always valid.
5. Use `-1` to represent the case where no valid square exists.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
