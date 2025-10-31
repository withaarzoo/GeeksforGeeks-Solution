# Shortest Cycle

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

You are given an **undirected connected** graph with `V` vertices numbered `0` to `V-1` and `E` edges (given as pairs `[u, v]`). Find the length (number of edges) of the **shortest cycle** in the graph. If the graph does not contain any cycle, return `-1`.

A cycle is a path that starts and ends at the same vertex without repeating any edge or vertex (except the start/end vertex). The shortest cycle is the cycle with minimum number of edges.

---

## Constraints

* `1 ≤ V ≤ 10^3`
* `0 ≤ E ≤ 10^3`
* `0 ≤ edges[i][0], edges[i][1] < V`

> Note: Problem states the graph is connected, but the solution works for disconnected graphs too.

---

## Intuition

I thought about cycles and how BFS (Breadth-First Search) finds shortest paths in unweighted graphs. If I run BFS from a start node `s`, I know the shortest distance from `s` to every other node. During BFS, when I explore an edge `(u, v)`:

* If `v` is unvisited → standard BFS expansion.
* If `v` is visited **and is not the parent** of `u` → then this edge `(u, v)` connects two nodes already reached via shortest paths from `s`, and together they form a cycle whose length is `dist[u] + dist[v] + 1`.

So, if I run BFS from every vertex `s` and keep track of the minimal cycle length found, I will find the globally shortest cycle. Given constraints (`V, E ≤ 1000`) this is efficient enough.

---

## Approach

1. Build adjacency list `adj` for the undirected graph.
2. Initialize `ans = +∞`.
3. For each vertex `s` in `0..V-1`:

   * Run BFS from `s`.
   * Keep arrays `dist[]` (distance from `s`) and `parent[]` (to avoid immediate parent edge).
   * For each neighbor `v` of node `u` during BFS:

     * If `v` is unvisited: `dist[v] = dist[u] + 1`, `parent[v] = u`, push `v`.
     * Else if `v` is visited and `parent[u] != v`: a cycle found; candidate length `dist[u] + dist[v] + 1`. Update `ans`.
4. After BFS from all `s`, if `ans` is still `+∞`, return `-1`. Otherwise return `ans`.

I used BFS from every vertex because BFS gives shortest single-source distances; repeating for every source guarantees finding the shortest cycle in the graph.

---

## Data Structures Used

* Adjacency list: `vector<vector<int>>` in C++, `List<Integer>[]` in Java, `Array of Arrays` in JavaScript, `list` of lists in Python.
* Queue for BFS: `queue` / `deque` / simple array with head index in JS.
* Arrays for `dist[]` and `parent[]`.

---

## Operations & Behavior Summary

* Build graph: `O(V + E)` time, `O(V + E)` space.
* For each start vertex, BFS explores edges and vertices: `O(V + E)` per BFS.
* Looping BFS over all `V` vertices yields `O(V * (V + E))` worst-case time.
* Parent check avoids counting trivial tree-edge as cycle.

---

## Complexity

* **Time Complexity:** `O(V * (V + E))` — I run BFS (which costs `O(V+E)`) from each of the `V` vertices in the worst case. Here `V` is number of vertices, `E` is number of edges. Given `V, E ≤ 1000` this is acceptable.
* **Space Complexity:** `O(V + E)` — adjacency list plus `O(V)` temporary arrays (`dist`, `parent`) per BFS.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int shortCycle(int V, vector<vector<int>>& edges) {
        // build adjacency list
        vector<vector<int>> adj(V);
        for (auto &e : edges) {
            int u = e[0], v = e[1];
            adj[u].push_back(v);
            adj[v].push_back(u);
        }

        int ans = INT_MAX;

        // BFS from each node as source
        for (int s = 0; s < V; ++s) {
            vector<int> dist(V, -1), parent(V, -1);
            queue<int> q;
            dist[s] = 0;
            q.push(s);

            while (!q.empty()) {
                int u = q.front(); q.pop();
                for (int v : adj[u]) {
                    if (dist[v] == -1) {
                        // expand to unvisited neighbor
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        q.push(v);
                    } else if (parent[u] != v) {
                        // visited and not parent => found a cycle
                        int cycle_len = dist[u] + dist[v] + 1;
                        ans = min(ans, cycle_len);
                    }
                }
            }
        }

        return (ans == INT_MAX) ? -1 : ans;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int shortCycle(int V, int[][] edges) {
        // build adjacency list
        List<Integer>[] adj = new ArrayList[V];
        for (int i = 0; i < V; ++i) adj[i] = new ArrayList<>();
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            adj[u].add(v);
            adj[v].add(u);
        }

        int ans = Integer.MAX_VALUE;

        // BFS from every vertex
        for (int s = 0; s < V; ++s) {
            int[] dist = new int[V];
            int[] parent = new int[V];
            Arrays.fill(dist, -1);
            Arrays.fill(parent, -1);
            Queue<Integer> q = new ArrayDeque<>();
            dist[s] = 0;
            q.add(s);

            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : adj[u]) {
                    if (dist[v] == -1) {
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        q.add(v);
                    } else if (parent[u] != v) {
                        int cycleLen = dist[u] + dist[v] + 1;
                        ans = Math.min(ans, cycleLen);
                    }
                }
            }
        }

        return (ans == Integer.MAX_VALUE) ? -1 : ans;
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
    shortCycle(V, edges) {
        // build adjacency list
        const adj = Array.from({length: V}, () => []);
        for (const e of edges) {
            const [u, v] = e;
            adj[u].push(v);
            adj[v].push(u);
        }

        let ans = Number.MAX_SAFE_INTEGER;

        // BFS from each vertex
        for (let s = 0; s < V; ++s) {
            const dist = new Array(V).fill(-1);
            const parent = new Array(V).fill(-1);

            const q = []; // use array as queue
            let head = 0;
            dist[s] = 0;
            q.push(s);

            while (head < q.length) {
                const u = q[head++];
                for (const v of adj[u]) {
                    if (dist[v] === -1) {
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        q.push(v);
                    } else if (parent[u] !== v) {
                        const cycleLen = dist[u] + dist[v] + 1;
                        if (cycleLen < ans) ans = cycleLen;
                    }
                }
            }
        }

        return ans === Number.MAX_SAFE_INTEGER ? -1 : ans;
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def shortCycle(self, V, edges):
        # build adjacency list
        adj = [[] for _ in range(V)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        ans = float('inf')

        # BFS from every vertex
        for s in range(V):
            dist = [-1] * V
            parent = [-1] * V
            dq = deque()
            dist[s] = 0
            dq.append(s)

            while dq:
                u = dq.popleft()
                for v in adj[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1
                        parent[v] = u
                        dq.append(v)
                    elif parent[u] != v:
                        cycle_len = dist[u] + dist[v] + 1
                        if cycle_len < ans:
                            ans = cycle_len

        return -1 if ans == float('inf') else ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the algorithm step-by-step using the C++ implementation as a baseline (the other languages mirror the same logic and variables).

1. **Build adjacency list:**

   ```c++
   vector<vector<int>> adj(V);
   for (auto &e : edges) {
       int u = e[0], v = e[1];
       adj[u].push_back(v);
       adj[v].push_back(u);
   }
   ```

   * Convert edge list to adjacency list so we can iterate neighbors quickly.
   * For undirected graph, add both directions.

2. **Initialize answer:**

   ```c++
   int ans = INT_MAX;
   ```

   * `ans` will store the minimum cycle length found.

3. **BFS from every start vertex `s`:**

   ```c++
   for (int s = 0; s < V; ++s) {
       vector<int> dist(V, -1), parent(V, -1);
       queue<int> q;
       dist[s] = 0;
       q.push(s);
       ...
   }
   ```

   * For each `s`, we reset `dist` and `parent`.
   * `dist[x] == -1` indicates `x` not visited in this BFS.
   * `parent[x]` stores the predecessor of `x` in BFS tree to avoid counting parent-child edge as cycle.

4. **BFS loop and cycle detection:**

   ```c++
   while (!q.empty()) {
       int u = q.front(); q.pop();
       for (int v : adj[u]) {
           if (dist[v] == -1) {
               dist[v] = dist[u] + 1;
               parent[v] = u;
               q.push(v);
           } else if (parent[u] != v) {
               int cycle_len = dist[u] + dist[v] + 1;
               ans = min(ans, cycle_len);
           }
       }
   }
   ```

   * When visiting neighbor `v`:

     * If unvisited: standard BFS (set `dist`, `parent`, enqueue).
     * If visited and `v` is not `u`'s parent: this means there's an alternative path connecting `u` and `v` (two different tree paths from `s` to `u` and `s` to `v` plus edge `(u, v)` forms a cycle).
     * The cycle length formula `dist[u] + dist[v] + 1`:

       * `dist[u]` edges from `s` to `u`.
       * `dist[v]` edges from `s` to `v`.
       * plus edge `(u, v)` connects them => full cycle count = sum + 1.

5. **Return result:**

   ```c++
   return (ans == INT_MAX) ? -1 : ans;
   ```

   * If no cycle ever found, `ans` remains `INT_MAX` → return `-1`.

**Why does this find the shortest cycle?**

* BFS ensures `dist[]` are shortest distances from `s`. For a fixed `s`, the first time we detect a cycle using `dist` values gives us the shortest cycle that includes vertices reachable from `s` as combined paths to `u` and `v`. Running BFS from every `s` ensures we consider all cycles anywhere in the graph; tracking the minimum gives the global shortest cycle.

**Language-specific notes:**

* JavaScript: I used an array `q` with `head` index to implement a queue efficiently without frequent `shift()` calls.
* Python: used `collections.deque` for efficient `popleft()` operations.
* Java: `ArrayDeque` is used as the BFS queue; careful to use `int[]` for `dist` and `parent` and `Arrays.fill`.

---

## Examples

**Example 1**

```
Input:
V = 7, E = 8
edges = [[0,5],[0,6],[5,1],[6,1],[6,2],[2,3],[3,4],[1,4]]

Output: 4

Explanation:
One shortest cycle is 0 → 5 → 1 → 6 → 0 (length 4).
```

**Example 2**

```
Input:
V = 7, E = 9
edges = [[0,5],[0,6],[1,2],[1,4],[1,5],[1,6],[2,6],[2,3],[3,4]]

Output: 3

Explanation:
One shortest cycle is 1 → 2 → 6 → 1 (length 3).
```

**Edge cases**

* No cycles (a tree): returns `-1`.
* Parallel edges or self-loops: the code will treat two parallel edges as a cycle of length 2, and a self-loop as cycle length 1. (If input guarantee excludes them, no special handling needed.)

---

## How to use / Run locally

### C++

1. Create a file `solution.cpp`.
2. Paste the C++ code (wrap into a `main` if you want to test manually).
3. Compile and run:

```bash
g++ -std=c++17 -O2 solution.cpp -o solution
./solution
```

### Java

1. Create `Solution.java` with the `Solution` class and a `main` method to test.
2. Compile and run:

```bash
javac Solution.java
java Solution
```

### JavaScript (Node.js)

1. Create `solution.js`. Use Node to execute.
2. Example:

```bash
node solution.js
```

> In JS, export or directly call the `shortCycle` method on an instance of `Solution` with test input.

### Python3

1. Create `solution.py`.
2. Add test harness to instantiate `Solution` and call `shortCycle`.
3. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* **Complexity tradeoff:** Current approach `O(V * (V + E))` is straightforward and safe for constraints up to 1000. For much larger graphs, alternative methods exist:

  * For each edge `(u, v)`, temporarily remove it and find the shortest path distance between `u` and `v` using BFS; if there is a path of length `d`, then cycle length via that edge is `d + 1`. This takes `O(E * (V + E))` worst-case which may be similar but sometimes faster depending on graph density.
  * Use specialized algorithms for girth detection (minimum cycle length) in sparse graphs; some techniques rely on matrix multiplication or more advanced graph algorithms.
* **Parallel edges/self-loops:** If problem guarantees simple graphs, ignore. Otherwise detect self-loop → return 1, parallel edges → return 2 at input parsing stage for early exit.
* **Early pruning:** If I find the smallest possible cycle for an undirected simple graph is 3. If I find a cycle of length 3 at any time, I can return 3 immediately (cannot get smaller except 1 or 2 in presence of loops/parallel edges). That is a good optimization if triangles are common.
* **Memory:** We reuse fixed-size arrays `dist` and `parent` per BFS to keep memory bounded.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
