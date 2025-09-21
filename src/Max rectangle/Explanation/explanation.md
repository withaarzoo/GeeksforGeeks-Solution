# Max Rectangle

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given a 2D binary matrix `mat` where each cell is `0` or `1`, find the **maximum area** of a rectangle containing only `1`s and return its area.

I want to convert the 2D problem into manageable 1D subproblems. For each row, I will treat the column-wise counts of consecutive ones up to that row as a histogram, and then compute the largest rectangle in that histogram using a stack. Repeating this for all rows and taking the maximum gives the final answer.

---

## Constraints

* `1 ≤ mat.size()` (rows), `mat[0].size()` (cols) ≤ 1000
* `mat[i][j]` ∈ {0, 1}
* Expected to work efficiently for up to 10^6 cells in reasonable time and memory.

---

## Intuition

I thought about the problem like this: if I look at each row and consider how many continuous `1`s are stacked in each column up to the current row, the columns form a histogram of heights. Now the problem reduces to "largest rectangle in histogram" for that row. I can compute the largest rectangle for each histogram (row) using the standard stack-based O(m) algorithm and keep the maximum over all rows.

---

## Approach

1. If matrix is empty return `0`.
2. Maintain an array `heights` of size `m` (number of columns). Initially all zeros.
3. For each row:

   * For each column `j`:
     `heights[j] = heights[j] + 1` if `mat[row][j] == 1`, otherwise `heights[j] = 0`.
   * Now `heights` is a histogram of consecutive ones ending at this row.
   * Compute the largest rectangle in this histogram using a stack (store column indices, maintain increasing heights). Add a sentinel `0` at the end to flush the stack.
   * Update `maxArea` if we find a larger area.
4. After processing all rows, `maxArea` is the answer.

This gives `O(n * m)` time and `O(m)` extra space.

---

## Data Structures Used

* `heights` (array of integers of length `m`) — stores consecutive ones per column up to current row.
* `stack` (stack of indices) — used to compute largest rectangle in histogram in O(m).

---

## Operations & Behavior Summary

* **Update heights**: For every row, update `heights[j]` in O(m).
* **Largest rectangle in histogram**: Use a monotonic increasing stack storing indices of columns. When a lower height appears, pop and compute area using popped height × width.
* **Sentinel**: Add a zero height at the end (or process an extra index with height 0) to force flushing remaining indices from the stack.

---

## Complexity

* **Time Complexity:** `O(n * m)` — `n` is number of rows, `m` is number of columns. For each of the `n` rows we update `m` heights and run O(m) stack-based histogram algorithm.
* **Space Complexity:** `O(m)` — for `heights` and stack. No extra space dependent on `n`.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

/*
  Solution idea:
  - For each row, build histogram heights[] of consecutive ones up to that row.
  - For each histogram, compute largest rectangle using monotonic stack.
*/

class Solution {
public:
    int maxArea(vector<vector<int>>& mat) {
        if (mat.empty() || mat[0].empty()) return 0;
        int n = mat.size(), m = mat[0].size();
        vector<int> heights(m, 0);
        int maxArea = 0;

        for (int i = 0; i < n; ++i) {
            // Update heights for current row
            for (int j = 0; j < m; ++j)
                heights[j] = (mat[i][j] == 1) ? heights[j] + 1 : 0;

            // Compute largest rectangle in histogram heights
            stack<int> st;
            for (int j = 0; j <= m; ++j) {
                int cur = (j == m ? 0 : heights[j]); // sentinel at end
                while (!st.empty() && heights[st.top()] > cur) {
                    int h = heights[st.top()]; st.pop();
                    int w = st.empty() ? j : (j - st.top() - 1);
                    maxArea = max(maxArea, h * w);
                }
                st.push(j);
            }
        }
        return maxArea;
    }
};

// Example runner (input: n m then n rows of m integers 0/1)
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int>> mat(n, vector<int>(m));
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            cin >> mat[i][j];

    Solution sol;
    cout << sol.maxArea(mat) << "\n";
    return 0;
}
```

---

### Java

```java
import java.util.*;

/*
  Reads:
    n m
    n rows of m integers (0 or 1)
  Prints: maximum rectangle area of 1's
*/

public class Main {
    public static int maxArea(int[][] mat) {
        if (mat == null || mat.length == 0 || mat[0].length == 0) return 0;
        int n = mat.length, m = mat[0].length;
        int[] heights = new int[m];
        int maxArea = 0;

        for (int i = 0; i < n; i++) {
            // update heights
            for (int j = 0; j < m; j++)
                heights[j] = (mat[i][j] == 1) ? heights[j] + 1 : 0;

            // largest rectangle in histogram
            Deque<Integer> st = new ArrayDeque<>();
            for (int j = 0; j <= m; j++) {
                int cur = (j == m) ? 0 : heights[j]; // sentinel
                while (!st.isEmpty() && heights[st.peek()] > cur) {
                    int h = heights[st.pop()];
                    int width = st.isEmpty() ? j : (j - st.peek() - 1);
                    maxArea = Math.max(maxArea, h * width);
                }
                st.push(j);
            }
        }
        return maxArea;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) { sc.close(); return; }
        int n = sc.nextInt(), m = sc.nextInt();
        int[][] mat = new int[n][m];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                mat[i][j] = sc.nextInt();
        sc.close();
        System.out.println(maxArea(mat));
    }
}
```

---

### JavaScript

```javascript
// Node.js script
// Input format:
// First two integers: n m
// Next n*m integers: matrix entries row-major (0 or 1)
// Example usage: node solution.js < input.txt

class Solution {
    maxArea(mat) {
        if (!mat || mat.length === 0 || mat[0].length === 0) return 0;
        const n = mat.length, m = mat[0].length;
        const heights = new Array(m).fill(0);
        let maxArea = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                heights[j] = mat[i][j] === 1 ? heights[j] + 1 : 0;
            }
            const st = [];
            for (let j = 0; j <= m; j++) {
                const cur = (j === m) ? 0 : heights[j];
                while (st.length && heights[st[st.length - 1]] > cur) {
                    const h = heights[st.pop()];
                    const width = st.length === 0 ? j : (j - st[st.length - 1] - 1);
                    maxArea = Math.max(maxArea, h * width);
                }
                st.push(j);
            }
        }
        return maxArea;
    }
}

// Runner: read stdin
const fs = require('fs');
const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
if (data.length === 0) process.exit(0);
let idx = 0;
const n = data[idx++], m = data[idx++];
const mat = Array.from({length: n}, () => Array(m).fill(0));
for (let i = 0; i < n; i++)
  for (let j = 0; j < m; j++)
    mat[i][j] = data[idx++];

const sol = new Solution();
console.log(sol.maxArea(mat));
```

---

### Python3

```python
#!/usr/bin/env python3
# Input format:
# n m
# n rows of m ints (0/1)

class Solution:
    def maxArea(self, mat):
        if not mat or not mat[0]:
            return 0
        n, m = len(mat), len(mat[0])
        heights = [0] * m
        max_area = 0

        for i in range(n):
            # update heights
            for j in range(m):
                heights[j] = heights[j] + 1 if mat[i][j] == 1 else 0

            # compute largest rectangle in histogram
            stack = []
            for j, cur in enumerate(heights + [0]):  # sentinel
                while stack and heights[stack[-1]] > cur:
                    h = heights[stack.pop()]
                    width = j if not stack else j - stack[-1] - 1
                    max_area = max(max_area, h * width)
                stack.append(j)
        return max_area

if __name__ == "__main__":
    import sys
    data = list(map(int, sys.stdin.read().strip().split()))
    if not data:
        sys.exit(0)
    idx = 0
    n = data[idx]; idx += 1
    m = data[idx]; idx += 1
    mat = []
    for _ in range(n):
        row = data[idx: idx + m]
        idx += m
        mat.append(row)
    print(Solution().maxArea(mat))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the core algorithm steps (the same logic is used across all languages). I’ll use a mix of code snippets and plain English.

### Key idea (overview)

1. Build an array `heights[j]` that counts consecutive `1`s in column `j` up to current row `i`.
2. For each row, treat `heights` as histogram heights and compute the largest area rectangle in that histogram.
3. Use monotonic stack technique to compute histogram maximum rectangle in O(m) time.

---

### Step-by-step (single iteration / histogram)

1. **Updating heights** (for each row `i`):

   * If `mat[i][j] == 1` → `heights[j] += 1` (we extend the vertical bar).
   * Else `heights[j] = 0` (the streak broken).

2. **Largest rectangle in histogram**:

   * Maintain a stack of indices `st` where `heights` at those indices is strictly increasing.
   * Iterate `j` from `0` to `m` inclusive, but for `j == m` use `cur = 0` as sentinel to pop everything.
   * While `st` is not empty and `heights[st.top()] > cur`:

     * `h = heights[st.top()]`, pop it.
     * The width for that height is:

       * if `st` is empty after pop → width = `j` (from 0 to j-1)
       * else width = `j - st.top() - 1` (between next smaller to the left and current j-1)
     * area = `h * width`, update `maxArea`.
   * Push `j` onto `st`.
   * Continue.

This logic is implemented identically in all five language solutions above. The only differences are syntax and standard library usage (stack vs deque vs slice).

---

### Language-specific notes

* **C++**: Uses `stack<int>` and `vector<int> heights`. I push index `m` with sentinel check `cur = 0` to flush.
* **Java**: Uses `ArrayDeque<Integer>` as a stack. Be careful with `.push()` / `.pop()` / `.peek()`.
* **JavaScript**: Uses an array as a stack and Node.js `fs.readFileSync(0)` to parse stdin.
* **Python3**: Uses list as stack. I use `heights + [0]` to implicitly append sentinel which simplifies indexing in the loop.
* **Go**: Uses a slice as a stack; manual push/pop by append and slicing.

---

## Examples

**Example 1**
Input:

```md
4 4
0 1 1 0
1 1 1 1
1 1 1 1
1 1 0 0
```

This corresponds to:

```md
[[0,1,1,0],
 [1,1,1,1],
 [1,1,1,1],
 [1,1,0,0]]
```

Output:

```md
8
```

Explanation: The biggest rectangle of `1`s is 4 columns wide × 2 rows tall = 8.

**Example 2**
Input:

```md
3 3
0 1 1
1 1 1
0 1 1
```

Output:

```md
6
```

Explanation: Largest rectangle from (0,1) to (2,2) (2 rows × 3 columns = 6).

---

## How to use / Run locally

Save the relevant file and run as shown:

* **C++**

  * Save as `main.cpp`.
  * Compile: `g++ -std=c++17 -O2 -o main main.cpp`
  * Run: `./main < input.txt`

* **Java**

  * Save as `Main.java`.
  * Compile: `javac Main.java`
  * Run: `java Main < input.txt`

* **JavaScript (Node.js)**

  * Save as `solution.js`.
  * Run: `node solution.js < input.txt`

* **Python3**

  * Save as `solution.py`.
  * Run: `python3 solution.py < input.txt`

`input.txt` should follow the format: first line `n m`, followed by `n` lines each with `m` space-separated `0`/`1` values.

---

## Notes & Optimizations

* We only keep `heights` for one row at a time — memory is `O(m)`.
* Using a sentinel `0` is an elegant way to flush the stack after iterating actual columns.
* If the input matrix is very sparse (few ones), specialized sparse techniques could be faster in practice, but the histogram approach is simple and fast for dense and mixed inputs.
* Integer overflow: maximum area ≤ `n * m` (≤ 10^6 under given constraints). Using 32-bit integers is safe here; if you change constraints to 10^9 × 10^9, use 64-bit.
* Micro-optimizations: avoid extra vector/list copies inside loops; use preallocated structures when the language requires it.

---

## Author

Aarzoo Islam
