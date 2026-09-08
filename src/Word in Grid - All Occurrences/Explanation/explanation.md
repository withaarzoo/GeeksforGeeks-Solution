# Word in Grid - All Occurrences

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

Given a 2D character grid `mat[][]` of size `n × m` and a string `word`, the task is to find every position where the complete word starts in the grid.

The word can be formed by moving in any one of the 8 possible directions:

* Up
* Down
* Left
* Right
* Four diagonal directions

The important part is that the direction cannot change while matching the word.

Each cell can be used at most once in a single occurrence.

The output should contain all unique starting coordinates in lexicographically smallest order.

For example, if the word starts at `(0, 0)`, `(0, 2)`, and `(1, 0)`, the expected result is:

```text
[[0, 0], [0, 2], [1, 0]]
```

This solution uses a direct matrix traversal with 8-direction word searching.

## Constraints

| Constraint            | Value                                       |      |        |
| --------------------- | ------------------------------------------- | ---- | ------ |
| Number of rows `n`    | `1 <= n <= 50`                              |      |        |
| Number of columns `m` | `1 <= m <= 50`                              |      |        |
| Length of `word`      | `1 <=                                       | word | <= 20` |
| Movement              | Any of 8 directions                         |      |        |
| Direction             | Must remain unchanged during one occurrence |      |        |

## Intuition

I started by looking at how the word can be formed.

Since the direction must remain the same, I do not need a full DFS or backtracking solution. From every possible starting cell, I only need to check the 8 fixed directions.

I first compare the current cell with the first character of the word. If they are different, that cell cannot be a starting point.

If they match, I move one cell at a time in each of the 8 directions and compare the remaining characters.

The 8 directions can be represented as:

```text
(-1,-1)  (-1,0)  (-1,1)

( 0,-1)    X     ( 0,1)

( 1,-1)  ( 1,0)  ( 1,1)
```

This makes the solution straightforward: scan every cell, try all 8 directions, and record the starting position whenever the complete word is found.

I also scan the matrix from top-left to bottom-right. Because of that, the coordinates are already in lexicographically smallest order, so I do not need an extra sorting step.

## Approach

I solve the problem in the following steps:

1. Get the number of rows, columns, and the length of the word.
2. Store the 8 possible movement directions.
3. Traverse every cell of the matrix.
4. Skip the cell if it does not contain `word[0]`.
5. For a matching cell, try all 8 directions.
6. Move through the grid using the same direction.
7. Compare every visited character with the corresponding character of `word`.
8. If any position goes outside the grid or the character does not match, reject that direction.
9. If all characters match, store the starting coordinate.
10. Stop checking more directions for that starting cell because the coordinate should only appear once.
11. Return all collected coordinates.

The key observation is that I never change direction while matching a word. That is why I can check every occurrence without using recursive DFS or a visited matrix.

## Data Structures Used

### Result Array

I use a 2D result array to store every valid starting coordinate.

For example:

```text
[0, 0]
[0, 2]
[1, 0]
```

Each pair contains the row and column of a valid starting position.

### Direction Arrays

I store the row and column changes for all 8 directions.

```text
dr = {-1, -1, -1, 0, 0, 1, 1, 1}
dc = {-1,  0,  1,-1, 1,-1, 0, 1}
```

The same index in both arrays represents one direction.

No `visited` array is required because the word must be searched in one fixed direction.

## Operations & Behavior Summary

The algorithm behaves like this:

```text
Start
  |
  v
Visit every grid cell
  |
  v
Does cell match word[0]?
  |
  +---- No ----> Skip cell
  |
 Yes
  |
  v
Try all 8 directions
  |
  v
Check remaining characters
  |
  +---- Mismatch / outside grid ----> Try next direction
  |
  v
Complete word matched
  |
  v
Store starting coordinate
  |
  v
Move to next grid cell
```

For each direction, the position of the `p`-th character is calculated using:

```text
row = startRow + p * rowDirection
col = startCol + p * colDirection
```

This guarantees that the search continues in a straight line.

## Complexity

| Type  | Complexity     | Explanation                                                                                                             |
| ----- | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Time  | `O(n × m × k)` | I check every cell, up to 8 directions, and up to `k` characters in each direction. Since 8 is constant, it is ignored. |
| Space | `O(1)`         | Apart from the output array, I only use a fixed number of variables and the 8 directions.                               |

Here:

* `n` = number of rows in the matrix
* `m` = number of columns in the matrix
* `k` = length of the word

The output array is not counted as auxiliary space.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<vector<int>> searchWord(vector<vector<char>> &mat, string &word) {
        int n = mat.size(); // Store the number of rows in the matrix.
        int m = mat[0].size(); // Store the number of columns in the matrix.
        int k = word.size(); // Store the length of the word.

        vector<vector<int>> ans; // Store all valid starting coordinates.

        // These 8 pairs represent the 8 possible straight-line directions.
        int dr[] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dc[] = {-1, 0, 1, -1, 1, -1, 0, 1};

        // Visit every cell from top-left to bottom-right.
        // This also keeps the final coordinates lexicographically sorted.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                // Only a cell containing the first character can start the word.
                if (mat[i][j] != word[0]) {
                    continue; // Skip this cell when the first character does not match.
                }

                // Try all 8 possible directions from this starting cell.
                for (int d = 0; d < 8; d++) {
                    bool found = true; // Assume the word matches in this direction.

                    // Check every remaining character along the same direction.
                    for (int p = 1; p < k; p++) {
                        int nr = i + p * dr[d]; // Calculate the row of the current character.
                        int nc = j + p * dc[d]; // Calculate the column of the current character.

                        // The position must be inside the matrix and its character must match.
                        if (nr < 0 || nr >= n || nc < 0 || nc >= m ||
                            mat[nr][nc] != word[p]) {
                            found = false; // This direction cannot form the word.
                            break; // Stop checking this direction immediately.
                        }
                    }

                    // If all characters matched, this is a valid starting position.
                    if (found) {
                        ans.push_back({i, j}); // Add the starting coordinate to the answer.
                        break; // No need to check other directions for this starting cell.
                    }
                }
            }
        }

        return ans; // Return all valid starting coordinates.
    }
};
```

### Java

```java
class Solution {
    public ArrayList<ArrayList<Integer>> searchWord(char[][] mat, String word) {
        int n = mat.length; // Store the number of rows in the matrix.
        int m = mat[0].length; // Store the number of columns in the matrix.
        int k = word.length(); // Store the length of the word.

        ArrayList<ArrayList<Integer>> ans = new ArrayList<>(); // Store valid starting coordinates.

        // These 8 pairs represent the 8 possible straight-line directions.
        int[] dr = {-1, -1, -1, 0, 0, 1, 1, 1};
        int[] dc = {-1, 0, 1, -1, 1, -1, 0, 1};

        // Scan the matrix row by row so the answer is already lexicographically sorted.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {

                // The word can only start from a cell containing its first character.
                if (mat[i][j] != word.charAt(0)) {
                    continue; // Skip this cell when the first character does not match.
                }

                // Try all 8 possible directions from this cell.
                for (int d = 0; d < 8; d++) {
                    boolean found = true; // Assume the word can be formed in this direction.

                    // Check all remaining characters along the same direction.
                    for (int p = 1; p < k; p++) {
                        int nr = i + p * dr[d]; // Calculate the row of the current character.
                        int nc = j + p * dc[d]; // Calculate the column of the current character.

                        // Check that the position is valid and the character matches.
                        if (nr < 0 || nr >= n || nc < 0 || nc >= m ||
                            mat[nr][nc] != word.charAt(p)) {
                            found = false; // The word cannot be formed in this direction.
                            break; // Stop checking this direction.
                        }
                    }

                    // Add the starting cell when the complete word was found.
                    if (found) {
                        ArrayList<Integer> position = new ArrayList<>(); // Create the coordinate pair.
                        position.add(i); // Add the row index.
                        position.add(j); // Add the column index.
                        ans.add(position); // Store this valid starting coordinate.
                        break; // Avoid adding the same starting cell again.
                    }
                }
            }
        }

        return ans; // Return all valid starting coordinates.
    }
}
```

### JavaScript

```javascript
class Solution {
    searchWord(mat, word) {
        const n = mat.length; // Store the number of rows in the matrix.
        const m = mat[0].length; // Store the number of columns in the matrix.
        const k = word.length; // Store the length of the word.

        const ans = []; // Store all valid starting coordinates.

        // These 8 pairs represent the 8 possible straight-line directions.
        const dr = [-1, -1, -1, 0, 0, 1, 1, 1];
        const dc = [-1, 0, 1, -1, 1, -1, 0, 1];

        // Scan row by row so coordinates are naturally lexicographically sorted.
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {

                // A valid occurrence must start with the first character of the word.
                if (mat[i][j] !== word[0]) {
                    continue; // Skip this cell when the first character does not match.
                }

                // Try each of the 8 possible directions.
                for (let d = 0; d < 8; d++) {
                    let found = true; // Assume the word matches in this direction.

                    // Check every remaining character while keeping the same direction.
                    for (let p = 1; p < k; p++) {
                        const nr = i + p * dr[d]; // Calculate the row of the current character.
                        const nc = j + p * dc[d]; // Calculate the column of the current character.

                        // The position must be inside the matrix and contain the required character.
                        if (
                            nr < 0 || nr >= n ||
                            nc < 0 || nc >= m ||
                            mat[nr][nc] !== word[p]
                        ) {
                            found = false; // This direction does not contain the word.
                            break; // Stop checking this direction.
                        }
                    }

                    // If the complete word was found, store the starting position.
                    if (found) {
                        ans.push([i, j]); // Add the valid starting coordinate.
                        break; // Prevent adding the same starting cell again.
                    }
                }
            }
        }

        return ans; // Return all valid starting coordinates.
    }
}
```

### Python3

```python
class Solution:
    def searchWord(self, mat, word):
        n = len(mat)  # Store the number of rows in the matrix.
        m = len(mat[0])  # Store the number of columns in the matrix.
        k = len(word)  # Store the length of the word.

        ans = []  # Store all valid starting coordinates.

        # These 8 pairs represent the 8 possible straight-line directions.
        directions = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1),  (1, 0),  (1, 1)
        ]

        # Scan the matrix row by row so coordinates stay lexicographically sorted.
        for i in range(n):
            for j in range(m):

                # A valid occurrence must start with the first character of the word.
                if mat[i][j] != word[0]:
                    continue  # Skip this cell when the first character does not match.

                # Try all 8 possible directions from the current cell.
                for dr, dc in directions:
                    found = True  # Assume the word matches in this direction.

                    # Check every remaining character along the same direction.
                    for p in range(1, k):
                        nr = i + p * dr  # Calculate the row of the current character.
                        nc = j + p * dc  # Calculate the column of the current character.

                        # Check the boundary and make sure the character matches.
                        if (
                            nr < 0 or nr >= n or
                            nc < 0 or nc >= m or
                            mat[nr][nc] != word[p]
                        ):
                            found = False  # This direction cannot form the word.
                            break  # Stop checking this direction.

                    # Store the starting cell when the complete word was found.
                    if found:
                        ans.append([i, j])  # Add the valid starting coordinate.
                        break  # Avoid checking more directions for this cell.

        return ans  # Return all valid starting coordinates.
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages. Only the syntax changes.

### 1. Read the matrix dimensions

I first store the number of rows and columns.

```text
n = number of rows
m = number of columns
k = length of word
```

This makes the rest of the solution easier to read and avoids repeatedly calculating these values.

### 2. Create the result

I create an empty list to store valid starting coordinates.

Whenever I find the word starting at `(i, j)`, I add:

```text
[i, j]
```

to this list.

### 3. Store all 8 directions

Each movement can be represented using two values:

```text
dr = change in row
dc = change in column
```

For example:

```text
dr = 0
dc = 1
```

means I move right.

And:

```text
dr = 1
dc = -1
```

means I move down-left.

Using direction arrays keeps the main searching logic short and avoids writing eight separate search cases.

### 4. Traverse every cell

I use two loops:

```text
for every row
    for every column
```

This checks every possible starting position.

It also gives me the required lexicographical ordering naturally.

For example:

```text
(0,0)
(0,1)
(0,2)
(1,0)
(1,1)
(1,2)
```

is already lexicographically sorted.

### 5. Check the first character

Before trying all directions, I check whether the current cell contains the first character of the word.

If:

```text
word = "GEEKS"
```

then only cells containing `G` can be starting points.

This simple check avoids a lot of unnecessary work.

### 6. Try all 8 directions

For every possible starting cell, I test all 8 directions.

For a direction `(dr, dc)`, the next character is at:

```text
i + dr
j + dc
```

The character after that is at:

```text
i + 2 * dr
j + 2 * dc
```

Then:

```text
i + 3 * dr
j + 3 * dc
```

and so on.

So the search always stays on the same straight line.

### 7. Check boundaries

Before accessing a grid position, I make sure it is valid.

The row must satisfy:

```text
0 <= row < n
```

and the column must satisfy:

```text
0 <= col < m
```

If either condition fails, the current direction cannot contain the word.

This is especially important when searching toward the edges of the matrix.

### 8. Compare characters

If the position is inside the matrix, I compare its character with the required character from `word`.

If they are different, I immediately reject the current direction.

There is no reason to check the remaining characters after one mismatch.

### 9. Store a successful starting position

If every character matches, I add the starting coordinate to the result.

For example:

```text
word = "abe"

(0,0) -> (1,1) -> (2,2)

a          b          e
```

The complete word was found, so `(0,0)` is added to the answer.

### 10. Avoid duplicate coordinates

A word can potentially be found in more than one direction from the same starting cell.

For example:

```text
(0,0) -> right
(0,0) -> down
```

Both may form the same word.

But the required output contains starting coordinates, not directions. Therefore `(0,0)` should be added only once.

Once I find one valid direction for a starting cell, I stop checking other directions for that cell.

### 11. Why I do not need a visited array

In many grid word-search problems, a visited array is required because the search can turn at every step.

This problem is different.

Once I choose a direction, I keep using that exact direction:

```text
start -> next -> next -> next
```

I never move backward or turn around during the same occurrence.

Therefore, a cell cannot be reused in the same straight-line occurrence, so an additional `visited` data structure is unnecessary.

### C++ behavior

The C++ version uses `vector<vector<int>>` for the result and integer arrays for the row and column direction changes.

The `vector` automatically grows whenever a valid coordinate is found.

### Java behavior

The Java version returns `ArrayList<ArrayList<Integer>>`, which matches the expected return type.

I create a small `ArrayList<Integer>` containing the row and column before adding it to the main result.

### JavaScript behavior

The JavaScript version uses normal arrays.

A coordinate such as `(1, 2)` is stored as:

```text
[1, 2]
```

and the complete result is another array containing these coordinate arrays.

### Python3 behavior

The Python version uses a list of coordinate lists.

A coordinate is stored as:

```text
[1, 2]
```

Python's tuple unpacking also makes the direction loop simple because each direction contains `(dr, dc)`.

## Examples

### Example 1

Input:

```text
mat =
[
    ['a', 'b', 'a', 'b'],
    ['a', 'b', 'e', 'b'],
    ['e', 'b', 'e', 'b']
]

word = "abe"
```

Expected output:

```text
[[0, 0], [0, 2], [1, 0]]
```

Trace:

```text
From (0,0):

a b
  e

(0,0) -> (1,1) -> (2,2)
   a       b       e

Valid
```

From `(0,2)`:

```text
a b
  e

(0,2) -> (1,1) -> (2,0)
   a       b       e

Valid
```

From `(1,0)`:

```text
a -> b -> e
```

This is also valid.

So the result is:

```text
[[0,0], [0,2], [1,0]]
```

### Example 2

Input:

```text
mat =
[
    ['G','E','E','K','S','F','O','R','G','E','E','K','S'],
    ['G','E','E','K','S','Q','U','I','Z','G','E','E','K'],
    ['I','D','E','Q','A','P','R','A','C','T','I','C','E']
]

word = "GEEKS"
```

Expected output:

```text
[[0, 0], [0, 8], [1, 0]]
```

The word appears horizontally from `(0,0)`:

```text
G -> E -> E -> K -> S
```

It also appears horizontally from `(0,8)`:

```text
G -> E -> E -> K -> S
```

And it appears from `(1,0)`:

```text
G -> E -> E -> K -> S
```

Since the matrix is scanned from top-left to bottom-right, these coordinates are collected in the required order.

### Example 3

Input:

```text
mat =
[
    ['a']
]

word = "a"
```

Expected output:

```text
[[0, 0]]
```

Here the word contains only one character.

The starting cell itself already matches the complete word, so it is a valid occurrence.

This also shows why the algorithm works when `word` has length `1`. The loop for the remaining characters simply has nothing to check.

## How to Use / Run Locally

The code is written in the standard format used for competitive programming platforms. Each language version contains a `Solution` class with the required `searchWord` method.

For local testing, you can create a small driver program and pass the matrix and word to the method.

### C++

Save the solution as:

```text
solution.cpp
```

Compile it with:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

On Windows, you can run:

```bash
solution.exe
```

### Java

Save the solution as:

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

### JavaScript

Save the solution as:

```text
solution.js
```

Run it with Node.js:

```bash
node solution.js
```

### Python3

Save the solution as:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

For local testing, remember that the competitive programming version only provides the required class and method. You can add your own test cases and print the returned result in a separate driver section.

## Notes & Optimizations

The most important optimization is checking `word[0]` before trying all 8 directions. Most cells usually do not contain the first character, so this removes unnecessary searches.

I also stop checking a direction as soon as one character does not match. There is no benefit in checking the rest of the word after a mismatch.

I do not sort the final result because row-major traversal already produces lexicographically sorted coordinates.

I also do not use recursion or DFS because the direction cannot change while searching. A direct iterative search is simpler and uses constant auxiliary space.

For a word of length `1`, every cell containing that character is a valid starting position.

If the word is longer than what can fit in a particular direction, the boundary check automatically rejects that direction.

The matrix can contain repeated characters, and the same word may appear multiple times. The algorithm checks every possible starting cell, so all valid occurrences are found.

## Author

[Md Aarzoo Islam] — [Instagram](https://www.instagram.com/codewithaarzoo.in/?utm_source=chatgpt.com)
