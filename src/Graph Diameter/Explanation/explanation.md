# Graph Diameter — README

**Problem Title:** Graph Diameter

---

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

Given an undirected graph with `V` vertices and `E` edges (edges given as pairs of vertices), compute the diameter of the graph. The diameter is defined as the maximum shortest-path distance (number of edges) between any pair of vertices **inside the same connected component**. If the graph has multiple components (a forest), the overall diameter is the maximum diameter among all components.

---

## Constraints

* `2 ≤ V ≤ 10^5`
* `1 ≤ E ≤ V - 1` (the problem often appears as tree/forest; handle general undirected graphs)
* `0 ≤ edges[i][0], edges[i][1] < V`

(Complexities below assume the usual constraint that total `V + E` fits in memory/time limits.)

---

## Intuition

I thought about trees and the well-known two-BFS trick: if the component is a tree (or any connected unweighted graph), a BFS from any node finds the farthest node `A`. A BFS from `A` finds the farthest node `B` and the distance between `A` and `B` is the diameter of that component. For a general graph that’s unweighted and connected, BFS still gives shortest paths in terms of edges, so the same technique works per connected component. So I will: for each component, use two BFS runs to compute its diameter and take the maximum across components.

---

## Approach

1. Build adjacency list `adj` from edge list (O(E)).
2. Maintain an array `processed` (or `visited`) to ensure each connected component is handled once.
3. For every unprocessed node `s`:

   * BFS from `s` that (a) discovers all nodes in this component and (b) returns the farthest node `u` from `s`. Mark component nodes processed.
   * BFS from `u` to compute the maximum distance reachable in that component (this is the component diameter).
   * Update global maximum diameter with component diameter.
4. Return the global maximum.

I use BFS because in an unweighted graph BFS returns shortest distances (in edges). Two BFS per component yields the diameter efficiently.

---

## Data Structures Used

* Adjacency list (`vector<vector<int>>` / `List<List<Integer>>` / `Array of arrays`) — O(V + E)
* Queue for BFS — O(V) worst-case
* Distance array (`dist`) — O(V)
* Boolean/char processed array — O(V)

---

## Operations & Behavior Summary

* `build adjacency`: O(E) — add both directions since graph is undirected.
* `bfs_collect(start)`: BFS from `start` that returns the farthest node and the list of nodes in that connected component.
* `bfs_maxdist(src)`: BFS from `src` that returns maximum distance found (diameter of that component).
* For every unprocessed node call `bfs_collect` once and `bfs_maxdist` once → total O(V + E).

---

## Complexity

* **Time Complexity:** `O(V + E)`

  * Building adjacency list: `O(E)`.
  * Across all components each vertex/edge is visited at most a constant number of times (in BFS), so total BFS cost is `O(V + E)`.
  * Thus overall `O(V + E)`.
* **Space Complexity:** `O(V + E)`

  * Adjacency list uses `O(V + E)`.
  * Extra arrays (`dist`, `processed`, BFS queue`) use`O(V)`.

---

## Multi-language Solutions

> The following implementations follow the two-BFS per component approach discussed above.

---

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // BFS that collects nodes of the component and returns the farthest node
    pair<int, vector<int>> bfs_collect(int start, const vector<vector<int>>& adj) {
        int n = adj.size();
        vector<int> dist(n, -1);
        queue<int> q;
        q.push(start);
        dist[start] = 0;
        int farthest = start;
        vector<int> component;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            component.push_back(u);
            if (dist[u] > dist[farthest]) farthest = u;
            for (int v : adj[u]) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return {farthest, component};
    }

    // BFS from src to compute maximum distance reachable from src
    int bfs_maxdist(int src, const vector<vector<int>>& adj) {
        int n = adj.size();
        vector<int> dist(n, -1);
        queue<int> q;
        q.push(src);
        dist[src] = 0;
        int maxd = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            maxd = max(maxd, dist[u]);
            for (int v : adj[u]) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return maxd;
    }

    // Public API: compute diameter (maximum shortest-path distance in edges across components)
    int diameter(int V, vector<vector<int>>& edges) {
        if (V <= 1) return 0;
        vector<vector<int>> adj(V);
        for (auto &e : edges) {
            int a = e[0], b = e[1];
            adj[a].push_back(b);
            adj[b].push_back(a);
        }

        vector<char> processed(V, 0);
        int answer = 0;
        for (int i = 0; i < V; ++i) {
            if (processed[i]) continue;
            auto res = bfs_collect(i, adj);
            int u = res.first;
            vector<int> compNodes = res.second;
            for (int node : compNodes) processed[node] = 1;
            int compDiam = bfs_maxdist(u, adj);
            answer = max(answer, compDiam);
        }
        return answer;
    }
};

// Example main (for local testing)
/*
int main() {
    Solution sol;
    int V = 7;
    vector<vector<int>> edges = {{0,2},{0,4},{0,3},{3,1},{3,5},{1,6}};
    cout << sol.diameter(V, edges) << "\n"; // Output: 4
    return 0;
}
*/
```

---

### Java

```java
import java.util.*;

class Solution {
    // BFS that collects nodes of the component and returns the farthest node
    private Pair bfsCollect(int start, List<List<Integer>> adj) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();
        List<Integer> component = new ArrayList<>();
        q.add(start);
        dist[start] = 0;
        int farthest = start;
        while (!q.isEmpty()) {
            int u = q.poll();
            component.add(u);
            if (dist[u] > dist[farthest]) farthest = u;
            for (int v : adj.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        return new Pair(farthest, component);
    }

    // BFS from src to compute maximum distance reachable from src
    private int bfsMaxDist(int src, List<List<Integer>> adj) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();
        q.add(src);
        dist[src] = 0;
        int maxd = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            maxd = Math.max(maxd, dist[u]);
            for (int v : adj.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        return maxd;
    }

    public int diameter(int V, int[][] edges) {
        if (V <= 1) return 0;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; ++i) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        boolean[] processed = new boolean[V];
        int answer = 0;
        for (int i = 0; i < V; ++i) {
            if (processed[i]) continue;
            Pair res = bfsCollect(i, adj);
            int u = res.farthest;
            for (int node : res.component) processed[node] = true;
            int compDiam = bfsMaxDist(u, adj);
            answer = Math.max(answer, compDiam);
        }
        return answer;
    }

    // Simple Pair helper
    private static class Pair {
        int farthest;
        List<Integer> component;
        Pair(int f, List<Integer> c) { farthest = f; component = c; }
    }

    // Example main for quick test
    /*
    public static void main(String[] args) {
        Solution sol = new Solution();
        int V = 7;
        int[][] edges = {{0,2},{0,4},{0,3},{3,1},{3,5},{1,6}};
        System.out.println(sol.diameter(V, edges)); // 4
    }
    */
}
```

---

### JavaScript

```javascript
// Class-style implementation for consistency with other languages
class Solution {
    // BFS that collects component nodes and returns farthest node
    bfsCollect(start, adj) {
        const n = adj.length;
        const dist = new Array(n).fill(-1);
        const q = [];
        let qi = 0;
        q.push(start);
        dist[start] = 0;
        let farthest = start;
        const component = [];
        while (qi < q.length) {
            const u = q[qi++];
            component.push(u);
            if (dist[u] > dist[farthest]) farthest = u;
            for (const v of adj[u]) {
                if (dist[v] === -1) {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return { farthest, component };
    }

    // BFS from src to compute maximum distance reachable (diameter)
    bfsMaxDist(src, adj) {
        const n = adj.length;
        const dist = new Array(n).fill(-1);
        const q = [];
        let qi = 0;
        q.push(src);
        dist[src] = 0;
        let maxd = 0;
        while (qi < q.length) {
            const u = q[qi++];
            maxd = Math.max(maxd, dist[u]);
            for (const v of adj[u]) {
                if (dist[v] === -1) {
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
        return maxd;
    }

    diameter(V, edges) {
        if (V <= 1) return 0;
        const adj = Array.from({length: V}, () => []);
        for (const e of edges) {
            const a = e[0], b = e[1];
            adj[a].push(b);
            adj[b].push(a);
        }
        const processed = new Array(V).fill(false);
        let answer = 0;
        for (let i = 0; i < V; ++i) {
            if (processed[i]) continue;
            const { farthest: u, component } = this.bfsCollect(i, adj);
            for (const node of component) processed[node] = true;
            const compDiam = this.bfsMaxDist(u, adj);
            answer = Math.max(answer, compDiam);
        }
        return answer;
    }
}

// Example usage:
/*
const sol = new Solution();
const V = 7;
const edges = [[0,2],[0,4],[0,3],[3,1],[3,5],[1,6]];
console.log(sol.diameter(V, edges)); // 4
*/
```

---

### Python3

```python
from collections import deque

class Solution:
    # BFS from start: returns farthest node and list of nodes in the component
    def bfs_collect(self, start, adj):
        n = len(adj)
        dist = [-1] * n
        q = deque([start])
        dist[start] = 0
        farthest = start
        comp = []
        while q:
            u = q.popleft()
            comp.append(u)
            if dist[u] > dist[farthest]:
                farthest = u
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        return farthest, comp

    # BFS from src to compute maximum distance reachable (diameter)
    def bfs_maxdist(self, src, adj):
        n = len(adj)
        dist = [-1] * n
        q = deque([src])
        dist[src] = 0
        maxd = 0
        while q:
            u = q.popleft()
            if dist[u] > maxd:
                maxd = dist[u]
            for v in adj[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    q.append(v)
        return maxd

    def diameter(self, V, edges):
        if V <= 1:
            return 0
        adj = [[] for _ in range(V)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        processed = [False] * V
        answer = 0
        for i in range(V):
            if processed[i]:
                continue
            u, comp_nodes = self.bfs_collect(i, adj)
            for node in comp_nodes:
                processed[node] = True
            comp_diam = self.bfs_maxdist(u, adj)
            if comp_diam > answer:
                answer = comp_diam
        return answer

# Example to test:
# if __name__ == "__main__":
#     sol = Solution()
#     V = 7
#     edges = [[0,2],[0,4],[0,3],[3,1],[3,5],[1,6]]
#     print(sol.diameter(V, edges))  # 4
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain the core algorithm step-by-step (the same logic applies to all languages). I'll break it down into the important operations and map them to code behavior.

1. **Build adjacency list**

   * Reason: iterating neighbors is fast with adjacency lists. Each edge `u-v` is added to both `adj[u]` and `adj[v]`.
   * Complexity: `O(E)` time and `O(V+E)` memory.

2. **Find components once (bfs_collect)**

   * Start BFS from any unprocessed node `start`.
   * Keep a `dist` array initialized to `-1` (unvisited).
   * Set `dist[start] = 0`, push `start` into queue.
   * While queue not empty:

     * Pop `u`, append `u` to `component` list (so we can mark processed later).
     * For each neighbor `v` of `u`, if `dist[v] == -1`, set `dist[v] = dist[u] + 1` and push `v`.
     * Track `farthest` node as the one with maximum `dist[]`.
   * After BFS finishes:

     * `component` contains all nodes in this connected component.
     * `farthest` is the farthest node found from `start`.
   * This corresponds to `bfs_collect()` in code.

3. **Mark component nodes processed**

   * Use `processed[node] = true` (or `char` in C++) for each node in `component`. This prevents reprocessing the same component in the outer loop.

4. **Compute component diameter (bfs_maxdist)**

   * Run BFS again, this time from `u = farthest` returned in step 2.
   * BFS produces shortest distances from `u` to every node in the component.
   * The maximum `dist[]` seen in this BFS is the diameter (number of edges between the two farthest nodes inside this component).
   * This is `bfs_maxdist()` in code.

5. **Global maximum across components**

   * Maintain `answer = max(answer, compDiam)` for each component.
   * After processing every vertex (via the outer loop skipping processed nodes), `answer` is the final diameter across the whole graph (max among components).

6. **Why Two BFS?**

   * For an unweighted connected graph (and in particular trees), running BFS from any node finds one endpoint of a diameter. Running BFS from that endpoint yields the true diameter. This is a standard and efficient method.

---

## Examples

**Example 1 (from problem statement / picture)**

```
V = 7
edges = [[0,2], [0,4], [0,3], [3,1], [3,5], [1,6]]
Graph drawn in the prompt.
Output: 4
Explanation: Longest path is 2 -> 0 -> 3 -> 1 -> 6 (4 edges)
```

**Example 2**

```
V = 4
edges = [[0,1], [2,3]]
This graph has two components:
 - component1: 0-1 (diameter = 1)
 - component2: 2-3 (diameter = 1)
Global diameter = max(1,1) = 1
```

---

## How to use / Run locally

### C++

1. Put the `Solution` class into a `.cpp` file with a `main()` that constructs input and calls `diameter()`.
2. Compile: `g++ -std=c++17 -O2 -o graph_diameter graph_diameter.cpp`
3. Run: `./graph_diameter`

### Java

1. Put the `Solution` class into `Solution.java`. Add a `main()` method to instantiate `Solution` and call `diameter()`.
2. Compile: `javac Solution.java`
3. Run: `java Solution`

### JavaScript (Node)

1. Put the class into `solution.js`. Add a small usage block at bottom that constructs `Solution` and calls `diameter()`.
2. Run: `node solution.js`

### Python3

1. Put the `Solution` class in `solution.py`.
2. Add test block:

```python
if __name__ == "__main__":
    sol = Solution()
    V = 7
    edges = [[0,2],[0,4],[0,3],[3,1],[3,5],[1,6]]
    print(sol.diameter(V, edges))  # expected: 4
```

3. Run: `python3 solution.py`

---

## Notes & Optimizations

* The code is already optimal in time `O(V + E)` for an unweighted graph.
* For very large graphs where memory is a bottleneck:

  * Use more memory-efficient adjacency representations (e.g., vector of int arrays), or stream edges if you only need certain computations.
* If you need the **actual diameter path** (not only length), you can modify BFS to store parents and then reconstruct path from the second BFS.
* If the graph may contain parallel edges or self loops, you can filter them during adjacency construction (self-loops don’t affect diameter; parallel edges are redundant).
* For dense graphs (E ≈ V^2) this approach still works but memory/time becomes `O(V^2)` because adjacency is dense — problem constraints usually indicate sparse graphs or trees.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
