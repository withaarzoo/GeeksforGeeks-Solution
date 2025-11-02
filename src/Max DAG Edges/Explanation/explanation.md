# Max DAG Edges

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

Given a directed acyclic graph (DAG) with `V` vertices (numbered `0` to `V-1`) and `E` directed edges (each edge is a pair `[u, v]`), find the maximum number of additional edges that can be added to the graph **without creating any cycles**. The resulting graph must still be a DAG.

In short: compute how many more directed edges (no parallel edges) we can add while keeping the graph acyclic.

---

## Constraints

* `1 ≤ V ≤ 10^3`
* `0 ≤ E ≤ V*(V-1)/2`
* Edges are given as directed pairs `[u, v]` with `0 ≤ u, v < V`.
* Input graph is guaranteed to be a DAG (no cycles).

---

## Intuition

I thought about what it means for a directed graph to remain acyclic. For any DAG, there exists a topological order of vertices. If we fix some topological order, every edge must go from an earlier vertex to a later vertex in that order. So the maximum possible directed edges without cycles are exactly all ordered pairs `(i, j)` where `i < j` in that order. That count is `V * (V - 1) / 2`. Since the graph already has `E` edges, the maximum *additional* edges possible is simply:

```
V * (V - 1) / 2 - E
```

This is simple and optimal — no traversal or reachability checks are necessary because the input is already a DAG.

---

## Approach

1. Compute `totalPairs = V * (V - 1) / 2`. This is the number of directed edges possible from earlier to later vertex in a topological order.
2. Let `existing = E` (number of given edges, i.e., length of `edges` array).
3. The answer is `totalPairs - existing`.
4. Return the result. Use a 64-bit integer type for intermediate arithmetic to avoid overflow for larger `V`.

---

## Data Structures Used

* Simple integer arithmetic.
* We only use the number of edges (`len(edges)`) — we do **not** store or traverse the graph structure for this solution.

---

## Operations & Behavior Summary

* Multiplication and integer division to compute `V * (V-1) / 2`.
* Subtract the current edges count.
* Return that difference as the maximum number of edges we can still add without creating a cycle.

---

## Complexity

* **Time Complexity:** `O(1)` — we perform a fixed number of arithmetic operations. Reading the size of the edges list is `O(1)` for length access; no traversal of edges or graph is necessary.

  * `V` = number of vertices.
  * `E` = number of existing edges.
* **Space Complexity:** `O(1)` — only a few scalar variables are used.

---

## Multi-language Solutions

### C++

```c++
#include <vector>
using namespace std;

class Solution {
  public:
    int maxEdgesToAdd(int V, vector<vector<int>>& edges) {
        // total directed forward pairs in a topological order
        long long total_pairs = 1LL * V * (V - 1) / 2;
        long long existing = edges.size(); // number of edges present
        long long result = total_pairs - existing;
        return (int)result;
    }
};
```

### Java

```java
public class Solution {
    public int maxEdgesToAdd(int V, int[][] edges) {
        long totalPairs = 1L * V * (V - 1) / 2;
        long existing = edges.length;
        long result = totalPairs - existing;
        return (int) result;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {number}
 */
class Solution {
    maxEdgesToAdd(V, edges) {
        const totalPairs = (V * (V - 1)) / 2;
        const existing = edges.length;
        return totalPairs - existing;
    }
}
```

### Python3

```python
class Solution:
    def maxEdgesToAdd(self, V, edges):
        total_pairs = V * (V - 1) // 2
        existing = len(edges)
        return total_pairs - existing
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain line-by-line for each language using the same logic. The explanations are simple and slow so you can teach a friend.

### Core logic (common to all languages)

1. `total_pairs = V * (V - 1) / 2`

   * I calculate all possible directed edges that do not create cycles when following a topological order (every edge goes from earlier to later).
   * Example: with `V=4`, possible forward pairs are `(0->1),(0->2),(0->3),(1->2),(1->3),(2->3)` → 6 pairs = `4*3/2`.
2. `existing = E` (number of edges in input)

   * This is the count of edges already present in the graph.
3. `answer = total_pairs - existing`

   * Remaining pairs are edges I can add; adding any of these edges still keeps a valid DAG (because they go forward in topological order).
4. Return `answer`.

---

### C++ detailed

```c++
long long total_pairs = 1LL * V * (V - 1) / 2;
```

* Use `1LL` to coerce multiplication into `long long` to prevent overflow for large V.

```c++
long long existing = edges.size();
```

* `edges.size()` is `E`. We store it in `long long` as well.

```c++
long long result = total_pairs - existing;
return (int)result;
```

* Subtract and return. Casting to `int` is safe under problem constraints, but the intermediate uses `long long`.

---

### Java detailed

```java
long totalPairs = 1L * V * (V - 1) / 2;
```

* `1L` ensures the multiplication is performed in long to avoid overflow.

```java
long existing = edges.length;
long result = totalPairs - existing;
return (int) result;
```

* Compute difference. Casting to `int` for return is fine per constraints.

---

### JavaScript detailed

```javascript
const totalPairs = (V * (V - 1)) / 2;
const existing = edges.length;
return totalPairs - existing;
```

* JavaScript uses Number (IEEE-754 double), safe for these ranges (V ≤ 1000). The arithmetic is straightforward.

---

### Python3 detailed

```python
total_pairs = V * (V - 1) // 2
existing = len(edges)
return total_pairs - existing
```

* `//` is integer division in Python. `len(edges)` returns number of edges. Return their difference.

---

## Examples

**Example 1**

* Input: `V = 3`, `edges = [[0,1], [1,2]]`
* `total_pairs = 3 * 2 / 2 = 3`
* `existing = 2`
* Output: `3 - 2 = 1`
* Explanation: The only additional safe edge is `0 -> 2`.

**Example 2**

* Input: `V = 4`, `edges = [[0,1], [0,2], [1,2], [2,3]]`
* `total_pairs = 4 * 3 / 2 = 6`
* `existing = 4`
* Output: `6 - 4 = 2`
* Explanation: Two additional edges possible are `0 -> 3` and `1 -> 3` (or any other forward pairs not already existing).

---

## How to use / Run locally

### C++

1. Put the `Solution` class in a `.cpp` file and add a `main()` driver to read input and call `maxEdgesToAdd`.
2. Compile:

   ```bash
   g++ -std=c++17 solution.cpp -O2 -o solution
   ```

3. Run:

   ```bash
   ./solution
   ```

### Java

1. Save class `Solution` in `Solution.java`. Add a `main` method to create an instance and test with inputs.
2. Compile and run:

   ```bash
   javac Solution.java
   java Solution
   ```

### JavaScript (Node.js)

1. Put the class code in `solution.js`, add example calls at the bottom:

   ```javascript
   const sol = new Solution();
   console.log(sol.maxEdgesToAdd(3, [[0,1],[1,2]])); // 1
   ```

2. Run:

   ```bash
   node solution.js
   ```

### Python3

1. Save the `Solution` class in `solution.py`. Add:

   ```python
   if __name__ == "__main__":
       sol = Solution()
       print(sol.maxEdgesToAdd(3, [[0,1],[1,2]]))  # prints 1
   ```

2. Run:

   ```bash
   python3 solution.py
   ```

---

## Notes & Optimizations

* This solution relies on the guarantee that the input graph is a DAG. If the input could contain cycles, we'd first need to verify acyclicity (e.g., via DFS or Kahn's algorithm) and the concept of "forward pairs" relative to any topological order wouldn't apply straightforwardly.
* The solution is already optimal in time and space: `O(1)` time and `O(1)` space.
* Use a 64-bit integer type for intermediate multiplication `V*(V-1)` to be safe (`long long` / `long`).

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
