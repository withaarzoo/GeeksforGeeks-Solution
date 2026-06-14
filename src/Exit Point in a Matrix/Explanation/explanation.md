# Exit Point in a Matrix

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

---

## Problem Summary

The **Exit Point in a Matrix** problem asks us to simulate movement inside a binary matrix containing only `0`s and `1`s.

We start from the top-left cell `(0, 0)` and initially move toward the right.

While traversing the matrix:

* If the current cell contains `0`, we continue moving in the same direction.
* If the current cell contains `1`, we turn right (clockwise) and change that cell's value to `0`.

The process continues until we move outside the matrix boundaries.

The goal is to find the coordinates of the cell from which we exit the matrix.

This is a classic **matrix traversal problem** that combines simulation, direction management, and boundary checking.

---

## Constraints

| Constraint    | Value       |
| ------------- | ----------- |
| Rows (n)      | 1 ≤ n ≤ 100 |
| Columns (m)   | 1 ≤ m ≤ 100 |
| Matrix Values | 0 or 1      |

---

## Intuition

My first observation was that the movement rules are completely deterministic.

At every step, only two things matter:

1. My current position.
2. My current direction.

Whenever I encounter a `1`, I simply rotate clockwise and continue moving.

Since there are only four possible directions:

* Right
* Down
* Left
* Up

I can represent them using numbers and keep updating the current direction as I move.

Instead of searching for patterns or trying to optimize movement, I realized that directly simulating the traversal exactly as described would naturally lead to the answer.

---

## Approach

I use a simulation-based approach.

Step 1:

Start at position `(0, 0)`.

Step 2:

Assume the initial direction is Right.

Step 3:

Continue traversing while the current position remains inside the matrix.

Step 4:

If the current cell contains `1`:

* Turn right.
* Convert that `1` into `0`.

Step 5:

Move one step according to the current direction.

Step 6:

Eventually, the movement leaves the matrix.

Step 7:

Since the last movement takes us outside the boundary, move one step back to reach the last valid cell.

Step 8:

Return that cell as the exit point.

---

## Data Structures Used

### Matrix

The given matrix itself is used for traversal.

It also stores updated values whenever a `1` is converted to `0`.

### Integer Variables

A few integer variables are used for:

* Current row
* Current column
* Current direction

No additional data structures are required.

---

## Operations & Behavior Summary

1. Start at `(0, 0)`.
2. Face toward the right.
3. Check the current cell.
4. If the value is `1`:

   * Rotate clockwise.
   * Change the value to `0`.
5. Move one step.
6. Repeat until the matrix boundary is crossed.
7. Step back to the last valid position.
8. Return the exit coordinates.

This is essentially a matrix simulation problem where movement is controlled by cell values.

---

## Complexity

| Complexity Type  | Value    | Explanation                                                                                 |
| ---------------- | -------- | ------------------------------------------------------------------------------------------- |
| Time Complexity  | O(n × m) | Each cell is processed during traversal and direction changes are constant time operations. |
| Space Complexity | O(1)     | Only a few variables are used. No extra data structures are needed.                         |

Where:

* `n` = number of rows
* `m` = number of columns

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> exitPoint(vector<vector<int>>& mat) {
        int n = mat.size();
        int m = mat[0].size();

        // Current position
        int row = 0, col = 0;

        // 0=Right, 1=Down, 2=Left, 3=Up
        int dir = 0;

        // Continue while inside matrix boundaries
        while (row >= 0 && row < n && col >= 0 && col < m) {

            // If current cell contains 1
            if (mat[row][col] == 1) {

                // Turn right (clockwise)
                dir = (dir + 1) % 4;

                // Convert 1 into 0
                mat[row][col] = 0;
            }

            // Move according to current direction
            if (dir == 0) col++;      // Right
            else if (dir == 1) row++; // Down
            else if (dir == 2) col--; // Left
            else row--;               // Up
        }

        // We are outside the matrix.
        // Move back one step to get the exit cell.
        if (dir == 0) col--;
        else if (dir == 1) row--;
        else if (dir == 2) col++;
        else row++;

        return {row, col};
    }
};
```

### Java

```java
class Solution {
    public List<Integer> exitPoint(int[][] mat) {

        int n = mat.length;
        int m = mat[0].length;

        // Current position
        int row = 0, col = 0;

        // 0=Right, 1=Down, 2=Left, 3=Up
        int dir = 0;

        // Continue while inside matrix
        while (row >= 0 && row < n && col >= 0 && col < m) {

            // If current cell is 1
            if (mat[row][col] == 1) {

                // Turn right
                dir = (dir + 1) % 4;

                // Change 1 to 0
                mat[row][col] = 0;
            }

            // Move in current direction
            if (dir == 0) col++;
            else if (dir == 1) row++;
            else if (dir == 2) col--;
            else row--;
        }

        // Move back to last valid cell
        if (dir == 0) col--;
        else if (dir == 1) row--;
        else if (dir == 2) col++;
        else row++;

        List<Integer> ans = new ArrayList<>();
        ans.add(row);
        ans.add(col);

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    exitPoint(mat) {

        const n = mat.length;
        const m = mat[0].length;

        // Current position
        let row = 0, col = 0;

        // 0=Right, 1=Down, 2=Left, 3=Up
        let dir = 0;

        // Continue while inside matrix
        while (row >= 0 && row < n && col >= 0 && col < m) {

            // If current cell contains 1
            if (mat[row][col] === 1) {

                // Turn right
                dir = (dir + 1) % 4;

                // Convert 1 into 0
                mat[row][col] = 0;
            }

            // Move according to direction
            if (dir === 0) col++;
            else if (dir === 1) row++;
            else if (dir === 2) col--;
            else row--;
        }

        // Move back to last valid position
        if (dir === 0) col--;
        else if (dir === 1) row--;
        else if (dir === 2) col++;
        else row++;

        return [row, col];
    }
};
```

### Python3

```python
class Solution:
    def exitPoint(self, mat):

        n = len(mat)
        m = len(mat[0])

        # Current position
        row, col = 0, 0

        # 0=Right, 1=Down, 2=Left, 3=Up
        direction = 0

        # Continue while inside matrix
        while 0 <= row < n and 0 <= col < m:

            # If current cell contains 1
            if mat[row][col] == 1:

                # Turn right (clockwise)
                direction = (direction + 1) % 4

                # Convert 1 into 0
                mat[row][col] = 0

            # Move according to current direction
            if direction == 0:
                col += 1      # Right
            elif direction == 1:
                row += 1      # Down
            elif direction == 2:
                col -= 1      # Left
            else:
                row -= 1      # Up

        # Move back one step to reach the exit cell
        if direction == 0:
            col -= 1
        elif direction == 1:
            row -= 1
        elif direction == 2:
            col += 1
        else:
            row += 1

        return [row, col]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all languages.

### Direction Management

I represent directions using four values:

| Value | Direction |
| ----- | --------- |
| 0     | Right     |
| 1     | Down      |
| 2     | Left      |
| 3     | Up        |

Whenever I encounter a `1`, I rotate clockwise.

A simple modulo operation keeps the direction within the valid range.

---

### Matrix Traversal

The traversal continues while the current row and column remain inside the matrix.

This prevents accessing invalid indices.

---

### Handling Cell Value 1

Whenever a `1` is found:

* Rotate clockwise.
* Change the cell value to `0`.

This prevents the same cell from causing repeated direction changes if visited again.

---

### Moving Forward

After processing the current cell, move one step according to the current direction.

The row or column changes based on whether we move:

* Right
* Down
* Left
* Up

---

### Exiting the Matrix

Eventually, one movement takes us outside the matrix boundaries.

At that moment:

* The current position becomes invalid.
* The previous position is the actual exit point.

So we move one step back according to the last direction and return that coordinate.

---

## Examples

### Example 1

Input

```text
mat = [
 [0,1,0],
 [0,1,1],
 [0,0,0]
]
```

Output

```text
[1,0]
```

Trace

```text
(0,0) -> Right
(0,1) = 1 -> Turn Down
(1,1) = 1 -> Turn Left
(1,0) -> Move Left and Exit
```

Exit Point

```text
[1,0]
```

---

### Example 2

Input

```text
mat = [
 [0,0]
]
```

Output

```text
[0,1]
```

Trace

```text
(0,0) -> Right
(0,1) -> Right
Exit Matrix
```

Exit Point

```text
[0,1]
```

---

### Example 3

Input

```text
mat = [
 [1]
]
```

Output

```text
[0,0]
```

Trace

```text
(0,0) = 1
Turn Down
Move Outside Matrix
```

Exit Point

```text
[0,0]
```

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ main.cpp -o main
```

Run

```bash
./main
```

---

### Java

Compile

```bash
javac Main.java
```

Run

```bash
java Main
```

---

### JavaScript

Run

```bash
node main.js
```

---

### Python3

Run

```bash
python main.py
```

---

## Notes & Optimizations

* This problem is naturally solved using simulation.
* No advanced data structure is necessary.
* The matrix itself is sufficient for tracking direction changes.
* Using numeric direction values makes clockwise rotation simple.
* The solution already achieves optimal space complexity.
* Since every operation is constant time, the overall complexity is efficient for the given constraints.
* Boundary handling is the most important part of the implementation.
* Always remember to move one step back after exiting the matrix to obtain the correct exit point.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
