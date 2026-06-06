# Non-Attacking Black and White Knights

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

The **Non-Attacking Black and White Knights** problem asks us to find the number of ways to place one black knight and one white knight on an `n × m` chessboard such that neither knight can attack the other.

A knight moves in an L-shape:

* 2 squares in one direction and 1 square in the perpendicular direction
* Either horizontally first or vertically first

Since the knights have different colors, placing the black knight on position A and the white knight on position B is considered different from placing the black knight on B and the white knight on A.

The goal is to count all valid placements where the two knights are on different cells and cannot attack each other.

This is a classic chessboard counting problem that can be solved using mathematical observation instead of brute force simulation.

## Constraints

| Constraint | Value |
| ---------- | ----- |
| 1 ≤ n × m  | 45000 |

## Intuition

My first thought was to count every possible way to place two knights on the board.

If the board contains `n × m` cells, then:

* The black knight can be placed anywhere.
* The white knight can be placed in any remaining cell.

That gives all possible placements immediately.

After that, I only need to remove the placements where the knights attack each other.

Instead of checking every pair of cells individually, I noticed that every knight attack appears inside either a:

* 2 × 3 rectangle
* 3 × 2 rectangle

That observation makes the entire problem a simple counting exercise.

## Approach

1. Calculate the total number of cells on the board.
2. Count all possible ordered placements of black and white knights.
3. Count how many placements allow the knights to attack each other.
4. Every attacking configuration comes from:

   * A 2 × 3 rectangle
   * A 3 × 2 rectangle
5. Count how many such rectangles fit inside the board.
6. Compute the total number of attacking placements.
7. Subtract attacking placements from total placements.
8. Return the remaining count.

This avoids checking individual board positions and runs in constant time.

## Data Structures Used

No special data structures are required.

| Data Structure                   | Purpose                                                                    |
| -------------------------------- | -------------------------------------------------------------------------- |
| Integer / Long Integer Variables | Store board size, total placements, attacking placements, and final answer |

The solution relies entirely on mathematical counting.

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Find the total number of board cells.
2. Calculate all possible ordered placements of two knights.
3. Count valid 2 × 3 rectangles.
4. Count valid 3 × 2 rectangles.
5. Determine how many attacking knight pairs exist inside those rectangles.
6. Convert attacking pairs into attacking placements because knight colors matter.
7. Subtract attacking placements from total placements.
8. Return the result.

No loops over board cells are required.

## Complexity

| Metric           | Complexity | Explanation                                                             |
| ---------------- | ---------- | ----------------------------------------------------------------------- |
| Time Complexity  | O(1)       | Only a few arithmetic operations are performed regardless of board size |
| Space Complexity | O(1)       | No extra arrays, lists, maps, or auxiliary data structures are used     |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int numOfWays(int n, int m) {
        // Total number of cells on the board
        long long cells = 1LL * n * m;

        // Total ordered ways to place black and white knights
        long long total = cells * (cells - 1);

        // Count all attacking placements
        long long attacking = 0;

        // Count 2 x 3 rectangles if they fit
        if (n >= 2 && m >= 3) {
            attacking += 4LL * (n - 1) * (m - 2);
        }

        // Count 3 x 2 rectangles if they fit
        if (n >= 3 && m >= 2) {
            attacking += 4LL * (n - 2) * (m - 1);
        }

        // Non-attacking placements
        return (int)(total - attacking);
    }
};
```

### Java

```java
class Solution {
    public int numOfWays(int n, int m) {

        // Total number of cells
        long cells = 1L * n * m;

        // Total ordered placements
        long total = cells * (cells - 1);

        // Count attacking placements
        long attacking = 0;

        // Count all valid 2 x 3 rectangles
        if (n >= 2 && m >= 3) {
            attacking += 4L * (n - 1) * (m - 2);
        }

        // Count all valid 3 x 2 rectangles
        if (n >= 3 && m >= 2) {
            attacking += 4L * (n - 2) * (m - 1);
        }

        // Remaining placements are non-attacking
        return (int)(total - attacking);
    }
}
```

### JavaScript

```javascript
class Solution {
    numOfWays(n, m) {

        // Total cells on the board
        let cells = n * m;

        // Total ordered placements
        let total = cells * (cells - 1);

        // Count attacking placements
        let attacking = 0;

        // Count all possible 2 x 3 rectangles
        if (n >= 2 && m >= 3) {
            attacking += 4 * (n - 1) * (m - 2);
        }

        // Count all possible 3 x 2 rectangles
        if (n >= 3 && m >= 2) {
            attacking += 4 * (n - 2) * (m - 1);
        }

        // Non-attacking placements
        return total - attacking;
    }
}
```

### Python3

```python
class Solution:
    def numOfWays(self, n: int, m: int) -> int:

        # Total cells on the board
        cells = n * m

        # Total ordered placements of black and white knights
        total = cells * (cells - 1)

        # Count attacking placements
        attacking = 0

        # Count all possible 2 x 3 rectangles
        if n >= 2 and m >= 3:
            attacking += 4 * (n - 1) * (m - 2)

        # Count all possible 3 x 2 rectangles
        if n >= 3 and m >= 2:
            attacking += 4 * (n - 2) * (m - 1)

        # Return non-attacking placements
        return total - attacking
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all languages.

### Step 1: Count Total Cells

The board contains:

`n × m`

cells.

This value represents all available positions where a knight can be placed.

### Step 2: Count All Possible Placements

The black knight can occupy any cell.

After placing the black knight, the white knight can occupy any remaining cell.

So the total ordered placements become:

`cells × (cells - 1)`

The word "ordered" matters because black and white knights are different.

### Step 3: Count Attacking Configurations

A knight attack only occurs inside:

* 2 × 3 rectangles
* 3 × 2 rectangles

These are the smallest shapes that contain a legal knight move.

### Step 4: Count All 2 × 3 Rectangles

The board can contain:

`(n - 1) × (m - 2)`

such rectangles whenever they fit.

Each rectangle contributes exactly two attacking knight pairs.

### Step 5: Count All 3 × 2 Rectangles

Similarly, the board can contain:

`(n - 2) × (m - 1)`

such rectangles whenever they fit.

Each of these also contributes two attacking knight pairs.

### Step 6: Convert Pairs Into Placements

Every attacking pair can be arranged in two color orders:

* Black on first square, White on second square
* White on first square, Black on second square

Therefore attacking pairs are multiplied accordingly.

### Step 7: Remove Invalid Placements

Subtract all attacking placements from total placements.

The remaining value represents the number of non-attacking black and white knight arrangements.

### Language Notes

* C++ uses `long long` to avoid overflow.
* Java uses `long`.
* JavaScript uses `Number`.
* Python automatically handles large integers.

The algorithm remains exactly the same.

## Examples

### Example 1

Input

```text
n = 2
m = 2
```

Output

```text
12
```

Explanation

Total cells:

```text
4
```

Total placements:

```text
4 × 3 = 12
```

No knight attacks are possible on a 2 × 2 board.

Final answer:

```text
12
```

---

### Example 2

Input

```text
n = 2
m = 3
```

Output

```text
26
```

Explanation

Total cells:

```text
6
```

Total placements:

```text
6 × 5 = 30
```

Attacking placements:

```text
4
```

Answer:

```text
30 - 4 = 26
```

---

### Example 3

Input

```text
n = 3
m = 3
```

Output

```text
56
```

Explanation

Total placements:

```text
9 × 8 = 72
```

Attacking placements:

```text
16
```

Answer:

```text
72 - 16 = 56
```

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

### JavaScript

Run using Node.js:

```bash
node solution.js
```

### Python3

Run:

```bash
python solution.py
```

or

```bash
python3 solution.py
```

## Notes & Optimizations

* A brute force solution would check every pair of cells and determine whether the knights attack each other.
* That approach becomes unnecessarily expensive for larger boards.
* The mathematical counting method avoids board traversal completely.
* The solution runs in constant time and constant space.
* Be careful with integer overflow in C++ and Java.
* Boards with dimensions smaller than 2 × 3 or 3 × 2 require special attention because those attack rectangles do not exist.
* Using direct counting is the most efficient approach for this chessboard counting problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
