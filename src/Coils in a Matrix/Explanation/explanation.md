# Coils in a Matrix

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You are given a positive integer `n`. Imagine a square matrix of size `4n × 4n` that is filled with consecutive integers from 1 to `(4n) * (4n)` in row-major order (left to right, top to bottom).

Your task is to form two special sequences called coils from this matrix:

- The first coil starts at the top-left cell `(0, 0)` and spirals inward in a specific pattern (starting by moving downward).
- The second coil starts at the bottom-right cell `(4n-1, 4n-1)` and spirals inward in the opposite direction.

Return both coils as two separate lists. Each coil must contain exactly half of the matrix elements (`8n²` numbers).

This is a classic matrix spiral traversal problem often seen in competitive programming and GeeksforGeeks practice sets under the name “Coils in a Matrix” or “Form Coils in a Matrix”.

## Constraints

- `1 ≤ n ≤ 20`
- Expected Time Complexity: `O(n²)`
- Expected Auxiliary Space: `O(n²)`

## Intuition

When I first looked at the sample for `n = 1`, the matrix is simply:

```
1  2  3  4
5  6  7  8
9 10 11 12
13 14 15 16
```

The first coil was `[1, 5, 9, 13, 14, 15, 11, 7]`. It clearly starts at the top-left corner and walks downward first, then turns right, then up. It never visits every cell — only half of them.

I also noticed a useful mathematical property: every number in the second coil is simply `(total cells + 1)` minus the corresponding number from the first coil. This holds for both the small and large examples. So I only need to generate one correct spiral path; the second coil comes for free.

## Approach

1. Calculate the matrix side length: `size = 4 * n`.
2. Each coil needs exactly `m = 8 * n * n` elements.
3. Start at position `(0, 0)` with value 1.
4. Walk a carefully chosen spiral:
   - First move `size - 1` steps straight down.
   - Then, for every even length `k = size-2, size-4, …, 2`, take two legs of length `k` each while rotating through the directions: down → right → up → left.
5. Record every matrix value you land on. This list becomes the first coil.
6. Build the second coil with a single subtraction: `coil2[i] = (size * size + 1) - coil1[i]`.
7. Return both lists.

This produces exactly the sequences required by the problem statement and the sample outputs.

## Data Structures Used

- **Two one-dimensional arrays / vectors / lists** – one for each coil. They store the final answer and are sized exactly to `8n²`.
- **A small fixed-size direction array** – four pairs of `(dx, dy)` that cycle through down, right, up and left. This keeps the movement logic clean and avoids repeated if-else statements.
- **Simple integer variables** – current row, current column, current direction index, and a few loop counters. No extra matrices or visited sets are required.

## Operations & Behavior Summary

- Compute matrix size and coil length.
- Place the starting value 1 at coordinate `(0, 0)`.
- Execute the first long downward leg of length `size-1`.
- Rotate direction and enter the main loop that handles the remaining even step lengths.
- For every step, update coordinates and write the corresponding matrix value (`row * size + col + 1`) into the result list.
- After the first coil is complete, generate the second coil by the complement formula.
- Package both lists and return them.

## Complexity

| Complexity Type   | Value     | Explanation                                                                 |
|-------------------|-----------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n²)     | We generate two lists of length 8n². Each step of the spiral is O(1) work. |
| Space Complexity  | O(n²)     | The two result lists together occupy Θ(n²) space. No additional matrices are allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    vector<vector<int>> formCoils(int n) {
        int size = 4 * n;
        int m = 8 * n * n;
        vector<int> coil1(m);
        int x = 0, y = 0;
        coil1[0] = 1;
        int idx = 1;
        int dirs[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
        int d = 0;
        int steps = size - 1;
        for (int i = 0; i < steps && idx < m; i++) {
            x += dirs[d][0];
            y += dirs[d][1];
            coil1[idx++] = x * size + y + 1;
        }
        d = (d + 1) % 4;
        for (int k = size - 2; k > 0; k -= 2) {
            for (int t = 0; t < 2; t++) {
                for (int i = 0; i < k && idx < m; i++) {
                    x += dirs[d][0];
                    y += dirs[d][1];
                    coil1[idx++] = x * size + y + 1;
                }
                d = (d + 1) % 4;
            }
        }
        vector<int> coil2(m);
        int total = size * size;
        for (int i = 0; i < m; i++)
            coil2[i] = total + 1 - coil1[i];
        return {coil1, coil2};
    }
};
```

### Java
```java
class Solution {
    public ArrayList<ArrayList<Integer>> formCoils(int n) {
        int size = 4 * n;
        int m = 8 * n * n;
        ArrayList<Integer> coil1 = new ArrayList<>(m);
        int x = 0, y = 0;
        coil1.add(1);
        int dirs[][] = {{1,0},{0,1},{-1,0},{0,-1}};
        int d = 0;
        int steps = size - 1;
        for (int i = 0; i < steps; i++) {
            x += dirs[d][0];
            y += dirs[d][1];
            coil1.add(x * size + y + 1);
        }
        d = (d + 1) % 4;
        for (int k = size - 2; k > 0; k -= 2) {
            for (int t = 0; t < 2; t++) {
                for (int i = 0; i < k; i++) {
                    x += dirs[d][0];
                    y += dirs[d][1];
                    coil1.add(x * size + y + 1);
                }
                d = (d + 1) % 4;
            }
        }
        ArrayList<Integer> coil2 = new ArrayList<>(m);
        int total = size * size;
        for (int i = 0; i < m; i++)
            coil2.add(total + 1 - coil1.get(i));
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        res.add(coil1);
        res.add(coil2);
        return res;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number} n
 * @returns {number[][]}
 */

class Solution {
    formCoils(n) {
        let size = 4 * n;
        let m = 8 * n * n;
        let coil1 = new Array(m);
        let x = 0, y = 0;
        coil1[0] = 1;
        let idx = 1;
        let dirs = [[1,0],[0,1],[-1,0],[0,-1]];
        let d = 0;
        let steps = size - 1;
        for (let i = 0; i < steps && idx < m; i++) {
            x += dirs[d][0];
            y += dirs[d][1];
            coil1[idx++] = x * size + y + 1;
        }
        d = (d + 1) % 4;
        for (let k = size - 2; k > 0; k -= 2) {
            for (let t = 0; t < 2; t++) {
                for (let i = 0; i < k && idx < m; i++) {
                    x += dirs[d][0];
                    y += dirs[d][1];
                    coil1[idx++] = x * size + y + 1;
                }
                d = (d + 1) % 4;
            }
        }
        let coil2 = new Array(m);
        let total = size * size;
        for (let i = 0; i < m; i++)
            coil2[i] = total + 1 - coil1[i];
        return [coil1, coil2];
    }
}
```

### Python3
```python
class Solution:
    def formCoils(self, n: int) -> list[list[int]]:
        size = 4 * n
        m = 8 * n * n
        coil1 = [0] * m
        x = y = 0
        coil1[0] = 1
        idx = 1
        dirs = [(1,0),(0,1),(-1,0),(0,-1)]
        d = 0
        steps = size - 1
        for _ in range(steps):
            if idx >= m:
                break
            x += dirs[d][0]
            y += dirs[d][1]
            coil1[idx] = x * size + y + 1
            idx += 1
        d = (d + 1) % 4
        for k in range(size - 2, 0, -2):
            for _ in range(2):
                for _ in range(k):
                    if idx >= m:
                        break
                    x += dirs[d][0]
                    y += dirs[d][1]
                    coil1[idx] = x * size + y + 1
                    idx += 1
                d = (d + 1) % 4
        total = size * size
        coil2 = [total + 1 - v for v in coil1]
        return [coil1, coil2]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the exact same logic; only the syntax for lists and loops changes.

1. **Size calculation**  
   `size = 4 * n` gives the true side length of the matrix. Every value can then be computed on the fly as `row * size + col + 1` without ever building a 2-D array.

2. **First coil initialization**  
   We allocate a list of length `m = 8 * n * n` and put the value 1 at index 0. Coordinates start at `(0, 0)`.

3. **Direction table**  
   A four-element array of pairs represents the four possible moves. Index 0 = down, 1 = right, 2 = up, 3 = left. After every leg we simply do `d = (d + 1) % 4`.

4. **First leg**  
   Move exactly `size - 1` steps downward. This lands us at the bottom of the leftmost column.

5. **Remaining legs**  
   For every even length `k` from `size-2` down to 2 we perform two identical walks of length `k`. After each walk we rotate the direction. The step lengths were chosen so that the path stays inside the matrix and stops exactly when the list is full.

6. **Second coil**  
   A single linear pass computes `total + 1 - coil1[i]` for every index. This is mathematically guaranteed to produce the coil that starts at the opposite corner and travels the opposite way.

7. **Edge-case handling**  
   Because `n ≥ 1` the matrix is always at least 4 × 4, so the first leg of length 3 is always valid. The loop conditions also guard against writing past the end of the result list.

The same reasoning applies identically to the C++, Java, JavaScript and Python versions; only the way we declare lists and write for-loops differs.

## Examples

**Example 1**  
Input: `n = 1`  
Matrix (4 × 4):
```
1  2  3  4
5  6  7  8
9 10 11 12
13 14 15 16
```
First coil path: start at 1 → down to 5, 9, 13 → right to 14, 15 → up to 11, 7.  
Second coil is the complement: 17 - each of those numbers.  
Output: `[[1, 5, 9, 13, 14, 15, 11, 7], [16, 12, 8, 4, 3, 2, 6, 10]]`

**Example 2**  
Input: `n = 2`  
Matrix side = 8, total cells = 64, each coil has 32 numbers.  
The algorithm starts at 1, walks 7 steps down, then 6 right, 6 up, 4 left, 4 down, 2 right, 2 up, producing the long sequence shown in the problem statement. The second coil is obtained by subtracting each value from 65.

## How to Use / Run Locally

**C++**  
```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

**Java**  
```bash
javac Solution.java
java Solution
```

**JavaScript (Node.js)**  
```bash
node solution.js
```

**Python 3**  
```bash
python3 solution.py
```

In each case replace the empty function body with the corresponding code block above, add a simple main / driver that reads an integer `n` and prints the two returned lists.

## Notes & Optimizations

- The complement trick (`total + 1 - value`) is the key observation that halves the work.
- No visited matrix is needed because the carefully chosen step lengths never revisit a cell and never leave the board.
- For the given constraint `n ≤ 20` the solution is already optimal; further micro-optimizations (unrolling the direction cycle, pre-computing values, etc.) bring no practical benefit.
- An alternative approach would be to generate the full matrix first and then simulate two independent spirals with a visited set. That works but uses more memory and is slower by a constant factor.
- Watch the direction order: starting with “down” instead of the classic “right” is essential to match the required coils.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)