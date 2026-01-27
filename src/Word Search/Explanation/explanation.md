# Word Search

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given a 2D matrix of English letters and a word.
My task is to check whether the given word exists in the matrix.

Rules:

* I can move **up, down, left, or right**
* I **cannot reuse the same cell**
* The word must be formed by **adjacent cells only**

If the word exists, I return `true`, otherwise `false`.

---

## Constraints

* `1 ≤ n, m ≤ 6`
* `1 ≤ word.length ≤ 15`
* Matrix contains only uppercase and lowercase English letters

---

## Intuition

When I first saw the problem, I realized one thing clearly.

The word can start from **any cell** in the grid.
So I need to try **every cell** as a starting point.

From each starting cell, I try to build the word step by step by moving to adjacent cells.
If at any point the character does not match, I stop that path and go back.

This is a perfect use case for **DFS with backtracking**.

---

## Approach

This is how I solved the problem step by step:

1. Traverse every cell in the matrix
2. If a cell matches the first character of the word, start DFS
3. In DFS:

   * Check boundary conditions
   * Check character match
   * Mark the cell as visited
4. Move in 4 directions (up, down, left, right)
5. Backtrack after exploring all paths
6. If the full word is matched, return `true`
7. If all paths fail, return `false`

---

## Data Structures Used

* 2D Matrix (input)
* Recursion stack (DFS)
* Direction array for movement

No extra memory like visited arrays is used.

---

## Operations & Behavior Summary

* Each cell is explored at most once per DFS path
* Backtracking ensures cells are reusable for other paths
* DFS stops early once the word is found

---

## Complexity

### Time Complexity

**O(n × m × 3ᵏ)**

* `n × m` → number of cells
* `k` → length of the word
* At each step, there are at most 3 valid directions to explore

### Space Complexity

**O(k)**

* Used by the recursion stack during DFS

---

## Multi-language Solutions

---

### C++

```cpp
class Solution {
  public:
    int n, m;
    vector<vector<int>> dir = {{1,0},{-1,0},{0,1},{0,-1}};
    
    bool dfs(int i, int j, int idx, vector<vector<char>> &mat, string &word) {
        if (idx == word.size()) return true;

        if (i < 0 || j < 0 || i >= n || j >= m || mat[i][j] != word[idx])
            return false;

        char temp = mat[i][j];
        mat[i][j] = '#';

        for (auto &d : dir) {
            if (dfs(i + d[0], j + d[1], idx + 1, mat, word))
                return true;
        }

        mat[i][j] = temp;
        return false;
    }

    bool isWordExist(vector<vector<char>> &mat, string &word) {
        n = mat.size();
        m = mat[0].size();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (dfs(i, j, 0, mat, word))
                    return true;
            }
        }
        return false;
    }
};
```

---

### Java

```java
class Solution {
    int n, m;
    int[][] dir = {{1,0},{-1,0},{0,1},{0,-1}};

    boolean dfs(int i, int j, int idx, char[][] mat, String word) {
        if (idx == word.length()) return true;

        if (i < 0 || j < 0 || i >= n || j >= m || mat[i][j] != word.charAt(idx))
            return false;

        char temp = mat[i][j];
        mat[i][j] = '#';

        for (int[] d : dir) {
            if (dfs(i + d[0], j + d[1], idx + 1, mat, word))
                return true;
        }

        mat[i][j] = temp;
        return false;
    }

    public boolean isWordExist(char[][] mat, String word) {
        n = mat.length;
        m = mat[0].length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (dfs(i, j, 0, mat, word))
                    return true;
            }
        }
        return false;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    isWordExist(mat, word) {
        const n = mat.length;
        const m = mat[0].length;
        const dir = [[1,0],[-1,0],[0,1],[0,-1]];

        const dfs = (i, j, idx) => {
            if (idx === word.length) return true;

            if (i < 0 || j < 0 || i >= n || j >= m || mat[i][j] !== word[idx])
                return false;

            const temp = mat[i][j];
            mat[i][j] = '#';

            for (let [dx, dy] of dir) {
                if (dfs(i + dx, j + dy, idx + 1))
                    return true;
            }

            mat[i][j] = temp;
            return false;
        };

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (dfs(i, j, 0)) return true;
            }
        }
        return false;
    }
}
```

---

### Python3

```python
class Solution:
    def isWordExist(self, mat, word):
        n, m = len(mat), len(mat[0])
        directions = [(1,0), (-1,0), (0,1), (0,-1)]

        def dfs(i, j, idx):
            if idx == len(word):
                return True

            if i < 0 or j < 0 or i >= n or j >= m or mat[i][j] != word[idx]:
                return False

            temp = mat[i][j]
            mat[i][j] = '#'

            for dx, dy in directions:
                if dfs(i + dx, j + dy, idx + 1):
                    return True

            mat[i][j] = temp
            return False

        for i in range(n):
            for j in range(m):
                if dfs(i, j, 0):
                    return True

        return False
```

---

## Step-by-step Detailed Explanation

1. I start checking from every cell because I don’t know where the word begins
2. DFS matches characters one by one
3. Visited cells are temporarily marked
4. I explore all 4 directions
5. Backtracking restores the grid state
6. As soon as the full word is found, DFS stops

---

## Examples

**Input**

```bash
mat = [
  ['T','E','E'],
  ['S','G','K'],
  ['T','E','L']
]
word = "GEEK"
```

**Output**

```bash
true
```

---

## How to use / Run locally

* Copy the language-specific code
* Paste into GeeksforGeeks editor or local IDE
* Call `isWordExist(mat, word)`
* Run and verify output

---

## Notes & Optimizations

* No extra visited array used (in-place marking)
* Early exit improves performance
* Works efficiently within given constraints
* Interview-safe and clean backtracking approach

---

## Author

* **Md Aarzoo Islam**
  👉 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
