# Shortest Path Using Atmost One Curved Edge

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

Given an **undirected connected graph** with `V` vertices numbered `0` to `V-1` and `E` *double-edges*. Each double-edge between vertices `x` and `y` is represented by a tuple `(x, y, w1, w2)` which means:

* there is a **straight** edge between `x` and `y` with weight `w1`
* and a **curved** edge between `x` and `y` with weight `w2`

We are given two vertices `a` and `b`. I must find the shortest path from `a` to `b` **such that we use at most one curved edge** on the entire path. If no such path exists, return `-1`.

(Reference diagram included in repository: `/mnt/data/7c2a5565-c922-4e62-987d-984d1c54e209.png` )

---

## Constraints

* `1 ≤ V ≤ 10^6`
* `0 ≤ E ≤ 10^6`
* `0 ≤ a, b ≤ V - 1`
* For each edge: `0 ≤ u, v ≤ V - 1`
* Edge weights: `0 ≤ w1, w2 ≤ 10^4` (or similar safe integer bounds)
* The shortest path value fits in a 32-bit integer (guaranteed by problem)

---

## Intuition

I thought about the constraint "at most one curved edge" and realized I can **model this with two layers**:

* **Layer 0**: states where I have **not used** any curved edge yet.
* **Layer 1**: states where I have **already used** one curved edge.

If I traverse a straight edge, I stay in the same layer. If I traverse a curved edge while in layer 0, I move to layer 1. From layer 1 I can only traverse straight edges (because I cannot use another curved edge). This gives me a new graph with `2*V` nodes, and I can run Dijkstra's shortest path from `(a, layer0)` and read minima for `(b, layer0)` and `(b, layer1)`.

This ensures the "at most one curved edge" restriction is respected.

---

## Approach

1. **Create layered graph** with `2*V` nodes:

   * Node `i` in layer0 ⇒ id = `i`.
   * Node `i` in layer1 ⇒ id = `i + V`.

2. For each original undirected edge `(u, v, w1, w2)`:

   * Add straight transitions:

     * `u0 <-> v0` with cost `w1`.
     * `u1 <-> v1` with cost `w1`.
   * Add curved transitions:

     * `u0 -> v1` with cost `w2`.
     * `v0 -> u1` with cost `w2`.
       (Because the original edge is undirected we add both directions where appropriate.)

3. Run **Dijkstra** on the layered graph starting from `a0` (node `a` in layer0).

4. Answer is `min(dist[b0], dist[b1])`. If both unreachable, return `-1`.

---

## Data Structures Used

* **Adjacency list** for weighted graph (vector/ArrayList/array-of-arrays).
* **Priority queue / min-heap** for Dijkstra.
* **Distance array** of size `2*V`.

These are standard efficient choices for Dijkstra on sparse graphs.

---

## Operations & Behavior Summary

* Building adjacency list: iterate edges `O(E)`.
* For each Dijkstra relaxation, update priority queue accordingly. Each edge may relax at most a small number of times; Dijkstra complexity dominates.
* I never allow a transition from layer1 back to layer0; that would permit extra curved edges — disallowed.

---

## Complexity

* **Time Complexity:** `O((V + E) log V)` in practice (Dijkstra over `2*V` nodes and `O(E)` transitions); detail:

  * Building the layered graph: `O(E)`.
  * Dijkstra: `O((N + M) log N)` where `N = 2V`, `M = number of transitions ≈ O(E)`. Simplified to `O((V + E) log V)`.
* **Space Complexity:** `O(V + E)` for adjacency and `O(V)` for distance arrays (specifically `O(2V)` for distances but we simplify to `O(V)`).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

/*
Layer mapping:
 - i in layer0 => id = i
 - i in layer1 => id = i + V
Edge format: vector<vector<int>> edges where each row: {u, v, w1, w2}
*/
class Solution {
  public:
    int shortestPath(int V, int a, int b, vector<vector<int>> &edges) {
        const long long INF = LLONG_MAX / 4;
        int N = 2 * V;
        vector<vector<pair<int,long long>>> adj(N);

        for (auto &e : edges) {
            int u = e[0], v = e[1];
            long long w1 = e[2]; // straight
            long long w2 = e[3]; // curved

            // straight edges: stay in same layer
            adj[u].push_back({v, w1});
            adj[v].push_back({u, w1});
            adj[u + V].push_back({v + V, w1});
            adj[v + V].push_back({u + V, w1});

            // curved edges: from layer0 to layer1 (both directions because original undirected)
            adj[u].push_back({v + V, w2});
            adj[v].push_back({u + V, w2});
        }

        vector<long long> dist(N, INF);
        using pli = pair<long long,int>;
        priority_queue<pli, vector<pli>, greater<pli>> pq;
        dist[a] = 0;
        pq.push({0, a});

        while (!pq.empty()) {
            auto [d, node] = pq.top(); pq.pop();
            if (d != dist[node]) continue;
            for (auto &pr : adj[node]) {
                int nxt = pr.first;
                long long w = pr.second;
                if (dist[nxt] > d + w) {
                    dist[nxt] = d + w;
                    pq.push({dist[nxt], nxt});
                }
            }
        }

        long long ans = min(dist[b], dist[b + V]);
        if (ans >= INF) return -1;
        return (int)ans;
    }
};
```

---

### Java

```java
import java.util.*;

/*
Layering idea:
 node i in layer0 -> id = i
 node i in layer1 -> id = i + V
edges: int[][] edges where each row: {u, v, w1, w2}
*/
class Solution {
    public int shortestPath(int V, int a, int b, int[][] edges) {
        final long INF = Long.MAX_VALUE / 4;
        int N = 2 * V;
        ArrayList<ArrayList<long[]>> adj = new ArrayList<>(N);
        for (int i = 0; i < N; ++i) adj.add(new ArrayList<>());

        for (int[] e : edges) {
            int u = e[0], v = e[1];
            long w1 = e[2], w2 = e[3];

            // straight edges stay within the same layer
            adj.get(u).add(new long[]{v, w1});
            adj.get(v).add(new long[]{u, w1});
            adj.get(u + V).add(new long[]{v + V, w1});
            adj.get(v + V).add(new long[]{u + V, w1});

            // curved edges: layer0 -> layer1
            adj.get(u).add(new long[]{v + V, w2});
            adj.get(v).add(new long[]{u + V, w2});
        }

        long[] dist = new long[N];
        Arrays.fill(dist, INF);
        PriorityQueue<long[]> pq = new PriorityQueue<>(Comparator.comparingLong(o -> o[0]));
        dist[a] = 0;
        pq.add(new long[]{0, a});

        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long d = top[0]; int node = (int)top[1];
            if (d != dist[node]) continue;
            for (long[] edge : adj.get(node)) {
                int nxt = (int)edge[0];
                long w = edge[1];
                if (dist[nxt] > d + w) {
                    dist[nxt] = d + w;
                    pq.add(new long[]{dist[nxt], nxt});
                }
            }
        }

        long ans = Math.min(dist[b], dist[b + V]);
        if (ans >= INF) return -1;
        return (int)ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number} V
 * @param {number} a
 * @param {number} b
 * @param {number[][]} edges  // each edge: [u, v, w1, w2]
 * @returns {number}
 */
class Solution {
    shortestPath(V, a, b, edges) {
        const INF = Number.MAX_SAFE_INTEGER;
        const N = 2 * V;
        const adj = Array.from({length: N}, () => []);
        for (const e of edges) {
            const u = e[0], v = e[1];
            const w1 = e[2], w2 = e[3];
            // straight
            adj[u].push([v, w1]);
            adj[v].push([u, w1]);
            adj[u + V].push([v + V, w1]);
            adj[v + V].push([u + V, w1]);
            // curved: layer0 -> layer1
            adj[u].push([v + V, w2]);
            adj[v].push([u + V, w2]);
        }

        // Simple binary-heap-based min-heap
        class MinHeap {
            constructor() { this.heap = []; }
            push(item) { this.heap.push(item); this._siftUp(); }
            pop() { if (!this.heap.length) return null; const top = this.heap[0]; const last = this.heap.pop(); if (this.heap.length) { this.heap[0] = last; this._siftDown(); } return top; }
            _siftUp() {
                let i = this.heap.length - 1;
                while (i > 0) {
                    let p = Math.floor((i - 1) / 2);
                    if (this.heap[p][0] <= this.heap[i][0]) break;
                    [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                    i = p;
                }
            }
            _siftDown() {
                let i = 0, n = this.heap.length;
                while (true) {
                    let l = 2*i + 1, r = 2*i + 2, smallest = i;
                    if (l < n && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
                    if (r < n && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
                    if (smallest === i) break;
                    [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                    i = smallest;
                }
            }
            isEmpty() { return this.heap.length === 0; }
        }

        const dist = new Array(N).fill(INF);
        const heap = new MinHeap();
        dist[a] = 0;
        heap.push([0, a]);

        while (!heap.isEmpty()) {
            const top = heap.pop();
            const d = top[0], node = top[1];
            if (d !== dist[node]) continue;
            for (const [nxt, w] of adj[node]) {
                if (dist[nxt] > d + w) {
                    dist[nxt] = d + w;
                    heap.push([dist[nxt], nxt]);
                }
            }
        }

        const ans = Math.min(dist[b], dist[b + V]);
        return (ans >= INF ? -1 : ans);
    }
}
```

---

### Python3

```python
import heapq

class Solution:
    def shortestPath(self, V, a, b, edges):
        """
        edges: list of [u, v, w1, w2]
        """
        INF = 10**30
        N = 2 * V
        adj = [[] for _ in range(N)]

        # Build layered graph
        for u, v, w1, w2 in edges:
            # straight edges
            adj[u].append((v, w1))
            adj[v].append((u, w1))
            adj[u + V].append((v + V, w1))
            adj[v + V].append((u + V, w1))
            # curved edges (from layer0 to layer1)
            adj[u].append((v + V, w2))
            adj[v].append((u + V, w2))

        # Dijkstra
        dist = [INF] * N
        dist[a] = 0
        pq = [(0, a)]
        while pq:
            d, node = heapq.heappop(pq)
            if d != dist[node]:
                continue
            for nxt, w in adj[node]:
                nd = d + w
                if nd < dist[nxt]:
                    dist[nxt] = nd
                    heapq.heappush(pq, (nd, nxt))

        ans = min(dist[b], dist[b + V])
        return -1 if ans >= INF else ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain core parts of the algorithm in a slow, step-by-step manner. The explanation applies to all languages — the code differences are mostly syntactic.

1. **Why two layers?**

   * I want to track whether a curved edge has been used so far. So for each original vertex `i`, I create:

     * `i` (layer0) — haven't used a curved edge.
     * `i + V` (layer1) — have used one curved edge.
   * After I take a curved edge from `u0` -> `v1`, I cannot take another curved edge because there is no edge from `layer1` to `layer0` via a curved edge.

2. **Building adjacency (for an edge `u, v, w1, w2`)**

   * Straight edges:

     * `u0 <-> v0` with cost `w1` (both directions).
     * `u1 <-> v1` with cost `w1` (both directions).
   * Curved edges:

     * `u0 -> v1` with cost `w2`
     * `v0 -> u1` with cost `w2`
   * This ensures curved edges are only usable as the **one** transition from layer0 to layer1.

3. **Running Dijkstra**

   * Initialize distance for all `2*V` nodes as `INF`.
   * Set `dist[a] = 0` (start at node `a` in layer0).
   * Use a priority queue (min-heap) to repeatedly pick the node with smallest tentative distance and relax its outgoing edges.
   * Standard relaxation: if `dist[u] + w < dist[v]` then update `dist[v]`.

4. **Return result**

   * After Dijkstra finishes, answer is `min(dist[b], dist[b + V])`.
   * `dist[b]` corresponds to reaching `b` without using any curved edge.
   * `dist[b + V]` corresponds to reaching `b` having used exactly one curved edge (or earlier in path).

5. **Edge cases**

   * If `a == b`, answer is `0` (we start and end same vertex).
   * If no reachable path given the constraints, both distances will be `INF` and we return `-1`.

---

## Examples

**Example 1 (from problem screenshot):**

Input:

```
V = 4
a = 1, b = 3
edges = [
  [0, 1, 1, 4],
  [0, 2, 2, 4],
  [0, 3, 3, 1],
  [1, 3, 6, 5]
]
```

Explanation (short):

* Best path is `1 -> 0 -> 3` using the curved edge `0->3` with cost `1` and the straight `1->0` (cost 1). Total = 2. Output: `2`.

**Example 2:**

Input:

```
V = 2
a = 0, b = 1
edges = [
  [0, 1, 4, 1]
]
```

* Choose the curved edge cost 1 ⇒ output `1`.

---

## How to use / Run locally

1. Clone repo or copy files to local machine.
2. Place test harness / main function that constructs `edges` and calls the appropriate method:

   * **C++**: compile with `g++ -std=c++17 -O2 -o sol solution.cpp` then run `./sol`.
   * **Java**: compile with `javac Solution.java` and run with `java Solution`.
   * **JavaScript (node)**: run with `node solution.js` (ensure the class is instantiated and method invoked).
   * **Python3**: run with `python3 solution.py` (wrap the class usage under `if __name__ == "__main__":`).

**Sample Python run**:

```python
if __name__ == "__main__":
    edges = [
      [0, 1, 1, 4],
      [0, 2, 2, 4],
      [0, 3, 3, 1],
      [1, 3, 6, 5]
    ]
    V = 4
    a, b = 1, 3
    sol = Solution()
    print(sol.shortestPath(V, a, b, edges))  # expected 2
```

---

## Notes & Optimizations

* I use Dijkstra because the graph weights are non-negative.
* The layered graph increases node count to `2*V` and edges proportionally, which is acceptable for typical constraints.
* Memory: for very large `V` close to `10^6`, be careful with memory overhead. Use memory-efficient containers and only store necessary adjacency entries (avoid duplicating heavy objects).
* If `E` is extremely large, consider using more memory-compact representations (e.g., arrays of primitives in C++ or flattened vectors).
* If you need to reduce constant factors, consider early exit in Dijkstra once both `b` and `b+V` have been popped from the heap (i.e., finalized). But the straightforward full Dijkstra is simpler and safe.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
