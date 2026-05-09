# Count Spanning Trees in a Graph

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

In this graph theory problem, we are given a connected undirected graph with `n` vertices and `m` edges. The goal is to count the total number of distinct spanning trees that can be formed from the graph.

A spanning tree is a subset of the graph that:

* Connects all vertices
* Uses exactly `n - 1` edges
* Does not contain any cycle

The problem asks us to return the total count of all possible spanning trees.

This is a classic competitive programming and DSA problem based on Kirchhoff’s Matrix Tree Theorem.

Input:

* Number of vertices `n`
* List of undirected edges

Output:

* Total number of distinct spanning trees

This problem is commonly asked in:

* Graph algorithms
* Matrix Tree Theorem problems
* Advanced DSA interviews
* Competitive programming contests

## Constraints

| Constraint                  | Value                 |
| --------------------------- | --------------------- |
| 1 ≤ n ≤ 10                  | Small graph size      |
| n - 1 ≤ m ≤ n * (n - 1) / 2 | Valid connected graph |
| 0 ≤ u, v < n                | Valid vertex range    |

## Intuition

When I first looked at the problem, brute force was the obvious idea.

I thought about generating every possible subset of edges and checking:

* Does it contain exactly `n - 1` edges?
* Is it connected?
* Does it avoid cycles?

That works for tiny graphs, but it becomes messy very quickly.

Then I noticed this is actually a direct application of Kirchhoff’s Matrix Tree Theorem.

The theorem says:

1. Build the Laplacian matrix of the graph
2. Remove one row and one column
3. Calculate the determinant of the remaining matrix
4. That determinant equals the number of spanning trees

Once I remembered this theorem, the solution became much cleaner and faster.

## Approach

First, I create the Laplacian matrix.

For every edge `(u, v)`:

* Increase the degree count of both nodes
* Mark the connection between them using `-1`

After building the matrix:

* I remove the last row and last column
* This creates a cofactor matrix

Then I calculate the determinant of that matrix using Gaussian Elimination.

The determinant directly gives the total number of spanning trees.

The graph size is very small, so matrix operations are completely safe here.

## Data Structures Used

| Data Structure        | Why It Was Used                                       |
| --------------------- | ----------------------------------------------------- |
| 2D Matrix             | To store the Laplacian matrix                         |
| Cofactor Matrix       | Needed for Matrix Tree Theorem                        |
| Floating Point Matrix | Helps during Gaussian Elimination division operations |

## Operations & Behavior Summary

1. Create an `n x n` matrix initialized with `0`
2. Traverse all edges
3. Update degree counts on diagonal cells
4. Mark edge connections with `-1`
5. Remove one row and one column
6. Apply Gaussian Elimination
7. Convert matrix into upper triangular form
8. Multiply diagonal values
9. Return the determinant as the final answer

## Complexity

| Type             | Complexity |
| ---------------- | ---------- |
| Time Complexity  | O(n³)      |
| Space Complexity | O(n²)      |

### Time Complexity Explanation

* `n` represents the number of vertices
* Building the Laplacian matrix takes `O(m)`
* Gaussian Elimination takes `O(n³)`

### Space Complexity Explanation

* I store the graph inside a matrix of size `n x n`
* No heavy extra data structures are used

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
  
    // Function to calculate determinant using Gaussian Elimination
    long long determinant(vector<vector<double>>& mat, int size) {
        
        double det = 1;
        
        // Process every column
        for (int i = 0; i < size; i++) {
            
            int pivot = i;
            
            // Find a row having non-zero value in current column
            for (int j = i; j < size; j++) {
                if (abs(mat[j][i]) > 1e-9) {
                    pivot = j;
                    break;
                }
            }
            
            // If pivot element is 0, determinant becomes 0
            if (abs(mat[pivot][i]) < 1e-9)
                return 0;
            
            // Swap rows if needed
            if (pivot != i) {
                swap(mat[pivot], mat[i]);
                det *= -1; // Row swap changes sign of determinant
            }
            
            // Multiply diagonal element
            det *= mat[i][i];
            
            // Eliminate values below pivot
            for (int j = i + 1; j < size; j++) {
                
                double factor = mat[j][i] / mat[i][i];
                
                for (int k = i; k < size; k++) {
                    mat[j][k] -= factor * mat[i][k];
                }
            }
        }
        
        // Round because determinant should be integer
        return round(det);
    }
  
    int countSpanTree(int n, vector<vector<int>>& edges) {
        
        // Special case: single node graph
        if (n == 1)
            return 1;
        
        // Create Laplacian matrix
        vector<vector<double>> lap(n, vector<double>(n, 0));
        
        // Build Laplacian matrix
        for (auto &e : edges) {
            
            int u = e[0];
            int v = e[1];
            
            // Increase degree count
            lap[u][u]++;
            lap[v][v]++;
            
            // Mark connection
            lap[u][v]--;
            lap[v][u]--;
        }
        
        // Create cofactor matrix by removing last row and column
        vector<vector<double>> cof(n - 1, vector<double>(n - 1));
        
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1; j++) {
                cof[i][j] = lap[i][j];
            }
        }
        
        // Determinant gives number of spanning trees
        return determinant(cof, n - 1);
    }
};
```

### Java

```java
class Solution {
    
    // Function to calculate determinant using Gaussian Elimination
    private long determinant(double[][] mat, int size) {
        
        double det = 1;
        
        for (int i = 0; i < size; i++) {
            
            int pivot = i;
            
            // Find non-zero pivot
            for (int j = i; j < size; j++) {
                if (Math.abs(mat[j][i]) > 1e-9) {
                    pivot = j;
                    break;
                }
            }
            
            // Determinant becomes 0
            if (Math.abs(mat[pivot][i]) < 1e-9)
                return 0;
            
            // Swap rows if needed
            if (pivot != i) {
                double[] temp = mat[pivot];
                mat[pivot] = mat[i];
                mat[i] = temp;
                
                det *= -1;
            }
            
            // Multiply diagonal value
            det *= mat[i][i];
            
            // Eliminate lower rows
            for (int j = i + 1; j < size; j++) {
                
                double factor = mat[j][i] / mat[i][i];
                
                for (int k = i; k < size; k++) {
                    mat[j][k] -= factor * mat[i][k];
                }
            }
        }
        
        return Math.round(det);
    }
    
    public int countSpanTree(int n, int[][] edges) {
        
        // Single node graph
        if (n == 1)
            return 1;
        
        // Laplacian matrix
        double[][] lap = new double[n][n];
        
        // Build matrix
        for (int[] e : edges) {
            
            int u = e[0];
            int v = e[1];
            
            lap[u][u]++;
            lap[v][v]++;
            
            lap[u][v]--;
            lap[v][u]--;
        }
        
        // Cofactor matrix
        double[][] cof = new double[n - 1][n - 1];
        
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1; j++) {
                cof[i][j] = lap[i][j];
            }
        }
        
        return (int) determinant(cof, n - 1);
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
class Solution {
    
    // Function to calculate determinant
    determinant(mat, size) {
        
        let det = 1;
        
        for (let i = 0; i < size; i++) {
            
            let pivot = i;
            
            // Find non-zero pivot row
            for (let j = i; j < size; j++) {
                if (Math.abs(mat[j][i]) > 1e-9) {
                    pivot = j;
                    break;
                }
            }
            
            // Determinant becomes 0
            if (Math.abs(mat[pivot][i]) < 1e-9)
                return 0;
            
            // Swap rows
            if (pivot !== i) {
                [mat[pivot], mat[i]] = [mat[i], mat[pivot]];
                det *= -1;
            }
            
            // Multiply diagonal value
            det *= mat[i][i];
            
            // Eliminate rows below
            for (let j = i + 1; j < size; j++) {
                
                let factor = mat[j][i] / mat[i][i];
                
                for (let k = i; k < size; k++) {
                    mat[j][k] -= factor * mat[i][k];
                }
            }
        }
        
        return Math.round(det);
    }
    
    countSpanTree(n, edges) {
        
        // Single node graph
        if (n === 1)
            return 1;
        
        // Create Laplacian matrix
        let lap = Array.from({ length: n }, () => Array(n).fill(0));
        
        // Build matrix
        for (let [u, v] of edges) {
            
            lap[u][u]++;
            lap[v][v]++;
            
            lap[u][v]--;
            lap[v][u]--;
        }
        
        // Create cofactor matrix
        let cof = Array.from({ length: n - 1 }, () => Array(n - 1).fill(0));
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                cof[i][j] = lap[i][j];
            }
        }
        
        // Determinant gives answer
        return this.determinant(cof, n - 1);
    }
}
```

### Python3

```python
class Solution:
    
    # Function to calculate determinant using Gaussian Elimination
    def determinant(self, mat, size):
        
        det = 1
        
        for i in range(size):
            
            pivot = i
            
            # Find row having non-zero pivot
            for j in range(i, size):
                if abs(mat[j][i]) > 1e-9:
                    pivot = j
                    break
            
            # Determinant becomes 0
            if abs(mat[pivot][i]) < 1e-9:
                return 0
            
            # Swap rows if needed
            if pivot != i:
                mat[pivot], mat[i] = mat[i], mat[pivot]
                det *= -1
            
            # Multiply diagonal element
            det *= mat[i][i]
            
            # Eliminate rows below
            for j in range(i + 1, size):
                
                factor = mat[j][i] / mat[i][i]
                
                for k in range(i, size):
                    mat[j][k] -= factor * mat[i][k]
        
        return round(det)
    
    def countSpanTree(self, n, edges):
        
        # Single node graph
        if n == 1:
            return 1
        
        # Create Laplacian matrix
        lap = [[0] * n for _ in range(n)]
        
        # Build matrix
        for u, v in edges:
            
            # Increase degree
            lap[u][u] += 1
            lap[v][v] += 1
            
            # Mark edge connection
            lap[u][v] -= 1
            lap[v][u] -= 1
        
        # Create cofactor matrix
        cof = [[0] * (n - 1) for _ in range(n - 1)]
        
        for i in range(n - 1):
            for j in range(n - 1):
                cof[i][j] = lap[i][j]
        
        # Determinant gives total spanning trees
        return self.determinant(cof, n - 1)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains almost identical across all languages.

The only difference is syntax.

### Step 1: Build the Laplacian Matrix

I start with an empty matrix filled with zeros.

For every edge `(u, v)`:

* Increase `matrix[u][u]`
* Increase `matrix[v][v]`

These diagonal cells represent node degrees.

Then:

* Decrease `matrix[u][v]`
* Decrease `matrix[v][u]`

This stores the actual edge connection.

At the end of this step:

* Diagonal values store degrees
* Non-diagonal values store adjacency information

### Step 2: Create the Cofactor Matrix

Kirchhoff’s theorem says:

* Remove any one row
* Remove the corresponding column

I simply remove the last row and last column because it is easy to implement.

This produces an `(n - 1) x (n - 1)` matrix.

### Step 3: Apply Gaussian Elimination

Now I calculate the determinant efficiently.

Instead of recursive determinant calculation, I use row operations.

The matrix is gradually converted into upper triangular form.

That means all values below the diagonal become zero.

Example:

```text
a b c
0 d e
0 0 f
```

The determinant becomes:

```text
a × d × f
```

This is much faster than recursive expansion.

### Step 4: Handle Row Swaps

Sometimes the current pivot becomes zero.

In that case:

* I swap rows
* Swapping changes determinant sign
* So I multiply the answer by `-1`

Without this correction, the determinant would become incorrect.

### Step 5: Return Final Answer

Floating point operations sometimes create tiny precision errors.

Example:

```text
2.999999999
```

instead of:

```text
3
```

So I round the final determinant before returning it.

That rounded determinant is the total number of spanning trees.

## Examples

### Example 1

Input

```text
n = 3
edges = [[0,1],[0,2],[1,2]]
```

Output

```text
3
```

Explanation

This graph forms a triangle.

Any one edge can be removed while still keeping the graph connected.

Possible spanning trees:

* Remove edge `(0,1)`
* Remove edge `(0,2)`
* Remove edge `(1,2)`

Total spanning trees = `3`

---

### Example 2

Input

```text
n = 6
edges = [[0,3],[0,1],[1,2],[1,5],[3,4]]
```

Output

```text
1
```

Explanation

The graph already contains exactly `n - 1` edges and has no cycle.

That means the graph itself is already a tree.

So only one spanning tree exists.

---

### Example 3

Input

```text
n = 1
edges = []
```

Output

```text
1
```

Explanation

A single node with no edges is already a valid spanning tree.

## How to Use / Run Locally

### C++

Compile:

```bash
g++ filename.cpp -o output
```

Run:

```bash
./output
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run:

```bash
python filename.py
```

## Notes & Optimizations

* Kirchhoff’s Matrix Tree Theorem is the key concept behind this solution
* Recursive determinant calculation is slower and harder to manage
* Gaussian Elimination gives much better performance
* The graph is guaranteed to be connected
* Since `n <= 10`, matrix operations are completely manageable
* Floating point precision issues should always be handled carefully
* Removing any row and column works — not just the last one
* This problem is a great example of combining graph theory with linear algebra

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
