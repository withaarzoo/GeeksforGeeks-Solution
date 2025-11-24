# Second Best Minimum Spanning Tree

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

Given an undirected, weighted graph with:

* `V` vertices (0 to V-1)
* `E` edges (each edge = `[u, v, w]`)

I have to:

1. Find the **Minimum Spanning Tree (MST)** of the graph.
2. Then find the weight of the **second best MST**:

   * It must still be a spanning tree (connect all vertices).
   * Its total weight must be **strictly greater** than the MST weight.
   * Among all such trees, its weight should be the **minimum**.

If **no such second MST exists**, I must return `-1`.

---

## Constraints

Typical GFG constraints:

* `1 ≤ V ≤ 100`
* `V - 1 ≤ E ≤ V * (V - 1) / 2`
* `0 ≤ edges[i][2] (weight) ≤ 10^3`

This is small enough that I can afford to rebuild MST a few times.

---

## Intuition

My first thought:

* The MST gives the **absolute minimum** cost to connect all nodes.
* To get the **second best** tree, I somehow need to:

  * “disturb” the MST slightly,
  * but not too much, so the total weight is just a bit bigger.

Instead of trying to be super clever with path queries and LCA (which can get tricky and easy to bug, especially with equal weights and multiple MSTs), I decided on a much more straightforward idea:

1. Build **one MST** using Kruskal’s algorithm.
2. Every edge selected in this MST is important. If I **force-remove** one of them, the next MST that forms will be different.
3. So for **each MST edge**:

   * I temporarily **ban** that edge.
   * Re-run Kruskal on the whole graph except that edge.
   * If I still get a spanning tree and its weight is > original MST weight, it’s a **candidate second MST**.
4. Among all candidates, I take the **minimum weight**.

Because `V` is at most 100, rebuilding MST at most `V - 1` times is totally fine.

---

## Approach

High-level steps:

1. **Normalize the edges**

   * Store all edges as `(u, v, w)`.
   * Sort them by `w` (ascending).

2. **First MST (original)**

   * Use Kruskal’s algorithm:

     * Maintain a DSU.
     * For each edge in sorted order:

       * If `union(u, v)` is successful:

         * Add `w` to `mstWeight`.
         * Record the **sorted index** of this edge in a `mstIndices` list.
   * If I couldn’t add `V - 1` edges → graph is disconnected → return `-1`.

3. **Generate candidate second MSTs**

   * Initialize `best = +∞`.
   * For each index `banned` in `mstIndices`:

     * Make a fresh DSU.
     * Set `curWeight = 0`, `usedEdges = 0`.
     * Loop over all edges in sorted order:

       * If current index `i == banned`, skip this edge.
       * Else try `union(u, v)`:

         * If success:

           * `curWeight += w`
           * `usedEdges++`
           * If `curWeight >= best`, break early (no point continuing).
     * After building:

       * If `usedEdges == V - 1` and `curWeight > mstWeight`:

         * `best = min(best, curWeight)`.

4. **Result**

   * If `best` stayed `+∞`, no second MST exists → return `-1`.
   * Else return `best`.

This strategy ensures:

* I consider all MST variants that differ in at least one original MST edge.
* The smallest weight > MST is exactly the second best MST.

---

## Data Structures Used

* **DSU (Disjoint Set Union / Union-Find)**

  * Maintains connectivity while building MST.
  * Supports:

    * `find(x)`: find representative of a node.
    * `unite(a, b)`: merge two components if distinct.
  * Implementation uses:

    * **Path compression** in `find`.
    * **Union by rank** (or size).

* **Edge List**

  * Array / vector of edges: `(u, v, w)`.
  * Sorted by `w`.

* **Simple arrays/vectors**

  * For tracking:

    * `mstIndices` → list of indices of edges used in the original MST.
    * Temporary DSU for each banned edge iteration.

No advanced trees, LCA tables, or segment trees are needed.

---

## Operations & Behavior Summary

1. **Sorting edges**

   * Sort once by weight to prepare for Kruskal.

2. **MST construction (original)**

   * Single pass over sorted edges.
   * DSU avoids cycles.

3. **Second MST search**

   * For each MST edge:

     * Rebuild MST with that edge removed.
     * Early break if partial tree already too heavy.

4. **Validation & selection**

   * Candidate spanning tree must:

     * Use exactly `V - 1` edges.
     * Have total weight `> mstWeight`.
   * Track the minimum valid candidate.

---

## Complexity

Let:

* `V` = number of vertices
* `E` = number of edges

### Time Complexity

* Sort edges once: `O(E log E)`
* First MST (Kruskal): `O(E α(V))` ~ `O(E)`
* For each of the `V - 1` MST edges:

  * Rebuild MST: `O(E α(V))` ~ `O(E)`
* Total: `O(E log E + V * E α(V))`

Given `V ≤ 100`, this is easily fast enough.
In practice: roughly **`O(V * E)`** for these constraints.

### Space Complexity

* Edge list: `O(E)`
* DSU arrays: `O(V)`
* Extra arrays/vectors for indices: `O(V)`
* Total: **`O(V + E)`**

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
    // Disjoint Set Union structure
    struct DSU {
        vector<int> parent, rnk;
        DSU(int n = 0) {
            parent.resize(n);
            rnk.assign(n, 0);
            iota(parent.begin(), parent.end(), 0);
        }
        int find(int x) {
            if (parent[x] == x) return x;
            return parent[x] = find(parent[x]);  // path compression
        }
        bool unite(int a, int b) {
            a = find(a);
            b = find(b);
            if (a == b) return false;
            if (rnk[a] < rnk[b]) swap(a, b);
            parent[b] = a;
            if (rnk[a] == rnk[b]) rnk[a]++;
            return true;
        }
    };

  public:
    int secondMST(int V, vector<vector<int>> &edges) {
        int E = edges.size();
        if (E == 0) return -1;

        // Pack into Edge struct
        struct Edge { int u, v, w; };
        vector<Edge> sorted(E);
        for (int i = 0; i < E; ++i) {
            sorted[i] = {edges[i][0], edges[i][1], edges[i][2]};
        }

        // Sort by weight
        sort(sorted.begin(), sorted.end(),
             [](const Edge &a, const Edge &b) { return a.w < b.w; });

        // 1) Build original MST
        DSU dsu(V);
        int mstWeight = 0;
        vector<int> mstIndices;
        mstIndices.reserve(V - 1);

        for (int i = 0; i < E; ++i) {
            if (dsu.unite(sorted[i].u, sorted[i].v)) {
                mstWeight += sorted[i].w;
                mstIndices.push_back(i);
            }
        }

        // If cannot connect all vertices
        if ((int)mstIndices.size() != V - 1) return -1;

        int best = INT_MAX;

        // 2) Try banning each MST edge and rebuild MST
        for (int bannedIdx : mstIndices) {
            DSU d2(V);
            int curWeight = 0;
            int usedEdges = 0;

            for (int i = 0; i < E; ++i) {
                if (i == bannedIdx) continue;  // skip this edge

                if (d2.unite(sorted[i].u, sorted[i].v)) {
                    curWeight += sorted[i].w;
                    usedEdges++;

                    // Early stop if already worse than current best
                    if (curWeight >= best) break;
                }
            }

            if (usedEdges == V - 1 && curWeight > mstWeight) {
                best = min(best, curWeight);
            }
        }

        return (best == INT_MAX) ? -1 : best;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {

    // Disjoint Set Union
    static class DSU {
        int[] parent;
        int[] rank;

        DSU(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        int find(int x) {
            if (parent[x] == x) return x;
            parent[x] = find(parent[x]);  // path compression
            return parent[x];
        }

        boolean unite(int a, int b) {
            a = find(a);
            b = find(b);
            if (a == b) return false;
            if (rank[a] < rank[b]) {
                int tmp = a; a = b; b = tmp;
            }
            parent[b] = a;
            if (rank[a] == rank[b]) rank[a]++;
            return true;
        }
    }

    static class Edge {
        int u, v, w;
        Edge(int u, int v, int w) {
            this.u = u; this.v = v; this.w = w;
        }
    }

    public int secondMST(int V, int[][] edges) {
        int E = edges.length;
        if (E == 0) return -1;

        // Convert to Edge objects
        Edge[] arr = new Edge[E];
        for (int i = 0; i < E; i++) {
            arr[i] = new Edge(edges[i][0], edges[i][1], edges[i][2]);
        }

        // Sort by weight
        Arrays.sort(arr, (a, b) -> Integer.compare(a.w, b.w));

        // 1) Build original MST
        DSU dsu = new DSU(V);
        int mstWeight = 0;
        List<Integer> mstIndices = new ArrayList<>();

        for (int i = 0; i < E; i++) {
            if (dsu.unite(arr[i].u, arr[i].v)) {
                mstWeight += arr[i].w;
                mstIndices.add(i);
            }
        }

        if (mstIndices.size() != V - 1) return -1; // graph disconnected

        int best = Integer.MAX_VALUE;

        // 2) Try banning each MST edge
        for (int banned : mstIndices) {
            DSU d2 = new DSU(V);
            int curWeight = 0;
            int used = 0;

            for (int i = 0; i < E; i++) {
                if (i == banned) continue;

                if (d2.unite(arr[i].u, arr[i].v)) {
                    curWeight += arr[i].w;
                    used++;
                    if (curWeight >= best) break;
                }
            }

            if (used == V - 1 && curWeight > mstWeight) {
                best = Math.min(best, curWeight);
            }
        }

        return best == Integer.MAX_VALUE ? -1 : best;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number} V
 * @param {number[][]} edges
 * @return {number}
 */
class Solution {
    secondMST(V, edges) {
        const E = edges.length;
        if (E === 0) return -1;

        // Convert to simple edge objects
        const arr = edges.map(e => ({ u: e[0], v: e[1], w: e[2] }));

        // DSU implementation
        class DSU {
            constructor(n) {
                this.parent = Array(n);
                this.rank = Array(n).fill(0);
                for (let i = 0; i < n; i++) this.parent[i] = i;
            }
            find(x) {
                if (this.parent[x] === x) return x;
                this.parent[x] = this.find(this.parent[x]);
                return this.parent[x];
            }
            unite(a, b) {
                a = this.find(a);
                b = this.find(b);
                if (a === b) return false;
                if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
                this.parent[b] = a;
                if (this.rank[a] === this.rank[b]) this.rank[a]++;
                return true;
            }
        }

        // Sort edges by weight
        arr.sort((a, b) => a.w - b.w);

        // 1) Build original MST
        const dsu = new DSU(V);
        let mstWeight = 0;
        const mstIndices = [];

        for (let i = 0; i < E; i++) {
            if (dsu.unite(arr[i].u, arr[i].v)) {
                mstWeight += arr[i].w;
                mstIndices.push(i);
            }
        }

        if (mstIndices.length !== V - 1) return -1;

        let best = Number.MAX_SAFE_INTEGER;

        // 2) Try banning each MST edge
        for (const banned of mstIndices) {
            const d2 = new DSU(V);
            let curWeight = 0;
            let used = 0;

            for (let i = 0; i < E; i++) {
                if (i === banned) continue;

                if (d2.unite(arr[i].u, arr[i].v)) {
                    curWeight += arr[i].w;
                    used++;
                    if (curWeight >= best) break;
                }
            }

            if (used === V - 1 && curWeight > mstWeight) {
                best = Math.min(best, curWeight);
            }
        }

        return best === Number.MAX_SAFE_INTEGER ? -1 : best;
    }
}
```

---

### Python3

```python
class Solution:
    def secondMST(self, V, edges):
        E = len(edges)
        if E == 0:
            return -1

        # Copy edges into (u, v, w)
        arr = [(u, v, w) for (u, v, w) in edges]

        # Sort by weight
        arr.sort(key=lambda e: e[2])

        # DSU helpers
        parent = list(range(V))
        rank = [0] * V

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def unite(a, b):
            a, b = find(a), find(b)
            if a == b:
                return False
            if rank[a] < rank[b]:
                a, b = b, a
            parent[b] = a
            if rank[a] == rank[b]:
                rank[a] += 1
            return True

        # 1) Build original MST
        mst_weight = 0
        mst_indices = []

        for i, (u, v, w) in enumerate(arr):
            if unite(u, v):
                mst_weight += w
                mst_indices.append(i)

        if len(mst_indices) != V - 1:
            return -1  # disconnected graph

        INF = 10**18
        best = INF

        # 2) For every MST edge, recompute MST without it
        for banned in mst_indices:
            parent = list(range(V))
            rank = [0] * V

            def find2(x):
                if parent[x] != x:
                    parent[x] = find2(parent[x])
                return parent[x]

            def unite2(a, b):
                a, b = find2(a), find2(b)
                if a == b:
                    return False
                if rank[a] < rank[b]:
                    a, b = b, a
                parent[b] = a
                if rank[a] == rank[b]:
                    rank[a] += 1
                return True

            cur_weight = 0
            used = 0

            for i, (u, v, w) in enumerate(arr):
                if i == banned:
                    continue
                if unite2(u, v):
                    cur_weight += w
                    used += 1
                    if cur_weight >= best:
                        break

            if used == V - 1 and cur_weight > mst_weight:
                best = min(best, cur_weight)

        return -1 if best == INF else best
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same across all languages.
I’ll describe it once in a clear, language-agnostic way:

1. **Store and sort edges**

   * I transform each edge into `(u, v, w)` and put all of them into an array.
   * I sort this array by `w` so I can apply Kruskal.

2. **Design DSU**

   * `parent[i]` initially = `i`.
   * `rank[i]` (or size) helps keep the tree shallow.
   * `find(x)`:

     * While `parent[x] != x`, recursively go up and compress the path.
   * `unite(a, b)`:

     * Find roots `ra = find(a)` and `rb = find(b)`.
     * If same, return `false` (they're already connected, adding this edge would create a cycle).
     * Attach the smaller-rank tree under the larger one.
     * If ranks are equal, increment the new root’s rank.
     * Return `true` (we successfully joined two components).

3. **Build original MST**

   * Create DSU.
   * Initialize `mstWeight = 0`, `mstIndices = []`.
   * Iterate over sorted edges:

     * If `unite(u, v)` returns `true`:

       * This edge is used in MST.
       * Add its weight to `mstWeight`.
       * Save its index `i` in `mstIndices`.
   * After loop:

     * If `mstIndices.size() != V - 1`, then it’s impossible to connect all nodes → return `-1`.

4. **Prepare to search for second MST**

   * Set `best` (answer candidate) to a very large value (like `INT_MAX` or `INF`).

5. **For each MST edge: ban & rebuild**

   * For every `banned` index inside `mstIndices`:

     * Create a new DSU.
     * Set `curWeight = 0`, `used = 0`.
     * Iterate again over all edges `i`:

       * If `i == banned`, skip this edge completely.
       * Else, if `unite(u, v)` succeeds:

         * Add weight to `curWeight`.
         * `used++`.
         * If `curWeight >= best`, break early (no improvement possible).
     * After the inner loop:

       * If `used == V - 1` and `curWeight > mstWeight`:

         * We found a spanning tree heavier than MST.
         * Update `best = min(best, curWeight)`.

6. **Return result**

   * If `best` is still the large sentinel value, then we never found a valid second MST → return `-1`.
   * Otherwise, we return `best`.

Language differences are only in syntax:

* **C++**

  * Uses `struct`, `vector`, `sort` with lambda, and class `Solution`.
* **Java**

  * Uses `class Edge`, `class DSU`, and `Arrays.sort` with comparator.
* **JavaScript**

  * Uses ES6 classes and arrays with `sort`.
* **Python3**

  * Uses lists and functions, plus Python’s built-in sort with `key=`.

---

## Examples

### Example 1

**Input**

```text
V = 5
edges = [
  [0, 1, 4],
  [0, 2, 3],
  [1, 2, 1],
  [1, 3, 5],
  [2, 4, 10],
  [2, 3, 7],
  [3, 4, 2]
]
```

* One MST has total weight = `1 + 3 + 4 + 2 = 10`.
* The second best MST weight is `12`.

**Output**

```text
12
```

---

### Example 2

**Input**

```text
V = 5
edges = [
  [0, 1, 2],
  [1, 2, 3],
  [2, 3, 4],
  [3, 4, 5]
]
```

This graph is a simple chain.
There is only one possible spanning tree (no alternative edges to replace).
So there is **no second MST**.

**Output**

```text
-1
```

---

## How to use / Run locally

### C++

1. Save the solution in a file, e.g., `solution.cpp`.
2. Wrap it in a `main()` for testing:

```c++
int main() {
    Solution sol;
    int V = 5;
    vector<vector<int>> edges = {
        {0,1,4}, {0,2,3}, {1,2,1}, {1,3,5},
        {2,4,10}, {2,3,7}, {3,4,2}
    };
    cout << sol.secondMST(V, edges) << "\n";
    return 0;
}
```

3. Compile and run:

```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

---

### Java

1. Save as `Main.java`:

```java
public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int V = 5;
        int[][] edges = {
            {0,1,4}, {0,2,3}, {1,2,1}, {1,3,5},
            {2,4,10}, {2,3,7}, {3,4,2}
        };
        System.out.println(sol.secondMST(V, edges));
    }
}
```

2. Compile and run:

```bash
javac Main.java
java Main
```

---

### JavaScript (Node.js)

1. Save as `main.js`:

```javascript
const solver = new Solution();
const V = 5;
const edges = [
  [0,1,4], [0,2,3], [1,2,1], [1,3,5],
  [2,4,10], [2,3,7], [3,4,2]
];

console.log(solver.secondMST(V, edges));
```

2. Run:

```bash
node main.js
```

---

### Python3

1. Save as `main.py`:

```python
from sys import stdout

sol = Solution()
V = 5
edges = [
    [0,1,4], [0,2,3], [1,2,1], [1,3,5],
    [2,4,10], [2,3,7], [3,4,2]
]

print(sol.secondMST(V, edges))
```

2. Run:

```bash
python3 main.py
```

---

## Notes & Optimizations

* I chose the **“ban each MST edge + rebuild”** strategy because:

  * It is easier to implement correctly.
  * It works reliably even when:

    * There are multiple MSTs with same weight.
    * Many edges have identical weights.
* For bigger constraints (like `V` up to `10^5`), this brute-force around MST would be too slow.
  In that case, I would switch to:

  * Building MST once,
  * Using LCA + binary lifting to query `max edge weight on path(u, v)` in `O(log V)`,
  * Trying each non-MST edge once.
* For this GFG problem with `V ≤ 100`, the simpler brute-force + DSU solution is more than enough and less error-prone.
* Early stopping when `curWeight >= best` helps a lot in dense graphs.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
