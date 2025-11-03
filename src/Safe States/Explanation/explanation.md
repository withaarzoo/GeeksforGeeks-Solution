# Problem Title

Safe States (Find eventual safe nodes in a directed graph)

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

Given a directed graph with `V` vertices labeled `0` to `V-1` and a list of directed edges `edges`, where each edge is represented as a pair `[u, v]` (a directed edge from `u` to `v`), return all **safe nodes** of the graph in ascending order.

A **terminal node** is a vertex with no outgoing edges. A node is **safe** if **every** path starting from that node eventually reaches a terminal node (i.e., it does not lead to a cycle).

We must produce the list of safe nodes (sorted ascending) for the given input.

## Constraints

* `1 <= V <= 10^5` (typical upper bound — adapt to judge's limits)
* `0 <= E <= 10^5`
* `edges[i] = [u, v]` with `0 <= u, v < V`

> Note: These are typical constraints for large graphs; always check the specific judge constraints.

## Intuition

I thought about what it means to be safe: if starting from a node every path eventually ends at a node with no outgoing edges, then the node is safe. Nodes that are part of cycles or lead to cycles are unsafe.

Instead of trying to detect cycles directly from every node, I reversed the graph and used an idea similar to Kahn's topological sort: if a node has out-degree zero it is terminal (safe). If we remove all terminal nodes, some predecessors may become terminal. Repeating this process gives all safe nodes: we remove nodes that must lead to terminals and what remains are nodes that are part of or lead to cycles.

This works in linear time `O(V + E)`.

## Approach

1. Build an `outdeg` array where `outdeg[u]` = number of outgoing edges from `u`.
2. Build a reverse adjacency list `rev` such that for each edge `u -> v` we add `u` to `rev[v]` (so `rev[v]` lists predecessors of `v`).
3. Initialize a queue with all nodes whose `outdeg` is `0` (terminal nodes).
4. While the queue is not empty:

   * Pop a node `x` and append it to `safe` result list.
   * For every predecessor `p` in `rev[x]`, decrement `outdeg[p]` by 1. If `outdeg[p]` becomes `0`, enqueue `p`.
5. At the end, `safe` contains all nodes that can be removed (i.e., they eventually reach terminal nodes). Sort `safe` in ascending order and return.

This is equivalent to performing Kahn's algorithm but on out-degrees using the reversed graph.

## Data Structures Used

* `vector<int> outdeg` (or array) — stores out-degree counts for each vertex.
* `vector<vector<int>> rev` (or list of lists) — reverse adjacency list mapping each vertex to its list of predecessors.
* `queue<int>` (or deque) — nodes with out-degree 0 ready to be processed.
* `vector<int> safe` (or list) — to collect safe nodes while processing.

## Operations & Behavior Summary

* Build `outdeg` from the edge list: `O(E)`.
* Build `rev` (reverse graph) from the edge list: `O(E)`.
* Enqueue terminal nodes: `O(V)`.
* Process every edge at most once when decrementing out-degrees: `O(E)`.
* Final sorting of `safe` list: `O(k log k)` where `k` = number of safe nodes (at most `V`).

Overall behavior: quickly identifies nodes that cannot reach cycles by progressively removing nodes that are guaranteed to end at terminals.

## Complexity

* **Time Complexity:** `O(V + E)` for building and processing, plus `O(k log k)` to sort the `k` safe nodes. In most cases the dominating term is `O(V + E)`.
* **Space Complexity:** `O(V + E)` for the reverse graph and auxiliary arrays.

---

## Multi-language Solutions

Below are clean, function-only solutions that fit typical online judge stubs. Each implementation assumes the function signature accepts `V` and an edge list `edges` where each element is `[u, v]`.

### C++

```c++
// Function-only version (no main). Signature: vector<int> safeNodes(int V, vector<vector<int>>& edges)
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> safeNodes(int V, vector<vector<int>>& edges) {
        vector<vector<int>> revGraph(V);
        vector<int> outdeg(V, 0);
        // Build reverse graph and out-degree
        for (auto &e : edges) {
            int u = e[0], v = e[1];
            if (u < 0 || u >= V || v < 0 || v >= V) continue; // defensive
            revGraph[v].push_back(u);
            outdeg[u]++;
        }
        queue<int> q;
        for (int i = 0; i < V; ++i) if (outdeg[i] == 0) q.push(i);
        vector<int> safe;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            safe.push_back(node);
            for (int parent : revGraph[node]) {
                if (--outdeg[parent] == 0) q.push(parent);
            }
        }
        sort(safe.begin(), safe.end());
        return safe;
    }
};
```

### Java

```java
// Signature: public ArrayList<Integer> safeNodes(int V, int[][] edges)
import java.util.*;

class Solution {
    public ArrayList<Integer> safeNodes(int V, int[][] edges) {
        ArrayList<ArrayList<Integer>> rev = new ArrayList<>(V);
        for (int i = 0; i < V; ++i) rev.add(new ArrayList<>());
        int[] outdeg = new int[V];
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            if (u < 0 || u >= V || v < 0 || v >= V) continue;
            rev.get(v).add(u);
            outdeg[u]++;
        }
        Queue<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < V; ++i) if (outdeg[i] == 0) q.add(i);
        ArrayList<Integer> safe = new ArrayList<>();
        while (!q.isEmpty()) {
            int node = q.poll();
            safe.add(node);
            for (int parent : rev.get(node)) {
                outdeg[parent]--;
                if (outdeg[parent] == 0) q.add(parent);
            }
        }
        Collections.sort(safe);
        return safe;
    }
}
```

### JavaScript

```javascript
// Signature: safeNodes(V, edges) where edges is array of [u, v]
class Solution {
    safeNodes(V, edges) {
        const rev = Array.from({length: V}, () => []);
        const outdeg = new Array(V).fill(0);
        for (const e of edges) {
            const u = e[0], v = e[1];
            if (u < 0 || u >= V || v < 0 || v >= V) continue;
            rev[v].push(u);
            outdeg[u]++;
        }
        const q = [];
        for (let i = 0; i < V; ++i) if (outdeg[i] === 0) q.push(i);
        const safe = [];
        while (q.length) {
            const node = q.shift();
            safe.push(node);
            for (const parent of rev[node]) {
                outdeg[parent]--;
                if (outdeg[parent] === 0) q.push(parent);
            }
        }
        safe.sort((a,b) => a - b);
        return safe;
    }
}
```

### Python3

```python3
# Signature: def safeNodes(self, V: int, edges: List[List[int]]) -> List[int]
from collections import deque

class Solution:
    def safeNodes(self, V, edges):
        rev = [[] for _ in range(V)]
        outdeg = [0] * V
        for e in edges:
            u, v = e[0], e[1]
            if u < 0 or u >= V or v < 0 or v >= V:
                continue
            rev[v].append(u)
            outdeg[u] += 1
        q = deque()
        for i in range(V):
            if outdeg[i] == 0:
                q.append(i)
        safe = []
        while q:
            node = q.popleft()
            safe.append(node)
            for parent in rev[node]:
                outdeg[parent] -= 1
                if outdeg[parent] == 0:
                    q.append(parent)
        safe.sort()
        return safe
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I will map the explanation to the code (all languages follow the same steps):

1. **Initialize structures**

   * `rev` (reverse adjacency list): for each vertex `v`, `rev[v]` stores nodes `u` such that `u -> v`.
   * `outdeg`: for each vertex `u`, `outdeg[u]` stores the count of outgoing edges.

2. **Build from edge list**

   * For every edge `[u, v]`:

     * `rev[v].push_back(u)` (or equivalent)
     * `outdeg[u]++`
   * Complexity: `O(E)`.

3. **Find initial terminal nodes**

   * Any node `i` with `outdeg[i] == 0` is a terminal node. Enqueue it.
   * These nodes are safe by definition.

4. **Process queue**

   * While queue not empty:

     * Pop `node`. Add to `safe`.
     * For each `parent` in `rev[node]` (all nodes that had edges to `node`):

       * `outdeg[parent]--` (we removed edge `parent -> node` conceptually).
       * If `outdeg[parent] == 0`, add `parent` to queue (it became terminal/safe).
   * Each edge is considered at most once during decrement — `O(E)`.

5. **Sort `safe` and return**

   * The result is the set of nodes that eventually lead to terminal nodes; we sort in ascending order as required.

## Examples

Input (example):

```
V = 5
edges = [[1,0], [1,2], [1,3], [1,4], [2,3], [3,4]]
```

Output:

```
[0, 1, 2, 3, 4]
```

Explanation: Node `0` and `4` are terminal. Removing them reveals `1,2,3` also lead to terminals.

Another example with a cycle:

```
V = 4
edges = [[1,2], [2,3], [3,2]]
```

Output:

```
[0]
```

Explanation: Node `0` is terminal and safe. Nodes `1,2,3` are in or lead to a cycle and are not safe.

## How to use / Run locally

* **C++**: Put the `Solution` class in the online judge stub or add a `main` that reads input and calls `safeNodes`. For local testing, create a `main()` to read `V`, `E`, edges list, and print the result.
* **Java**: Add the `Solution` class to your project. If testing locally, add a `main` method to parse input and call `safeNodes`.
* **JavaScript**: Use Node.js. Integrate the `Solution` class or convert `safeNodes` to a function that reads input and prints output.
* **Python3**: Use the `Solution` class in a script or call `Solution().safeNodes(V, edges)` after parsing input. For judge platforms, paste the `Solution` class in the editor matching the stub signature.

Example local driver (Python):

```python3
# Quick test harness
if __name__ == '__main__':
    V = 5
    edges = [[1,0],[1,2],[1,3],[1,4],[2,3],[3,4]]
    print(Solution().safeNodes(V, edges))
```

## Notes & Optimizations

* This algorithm is optimal in time and space for this task: it processes each vertex and edge a constant number of times.
* Avoid recursion (DFS) for cycle-detection when graph sizes are large — recursion can cause stack overflow in languages with limited stack.
* If you need the answer in insertion order (order discovered), skip the final `sort(safe)`. But most problems expect sorted output.
* Defensive bounds checks were included in snippets; if the judge guarantees valid input, those checks can be removed.

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
