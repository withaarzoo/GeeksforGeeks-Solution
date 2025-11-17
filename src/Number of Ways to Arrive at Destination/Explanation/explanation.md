# Number of Ways to Arrive at Destination

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

Given a weighted undirected graph with `V` vertices (numbered `0` to `V-1`) and a list of edges where each edge is represented as `[u, v, w]` (meaning an undirected edge between `u` and `v` with weight `w`), compute the number of **shortest paths** from source node `0` to destination node `V-1`. Return the result modulo `10^9 + 7`.

This is the classic problem of counting shortest paths while computing shortest distances — solved efficiently by modifying Dijkstra's algorithm to count the number of shortest ways.

---

## Constraints

* Graph is weighted and undirected.
* 1 ≤ V ≤ (problem-dependent upper bound)
* Edges are given as triplets `[u, v, w]`, where `0 ≤ u, v < V` and `w` is a non-negative integer weight.
* The result should be returned modulo `10^9 + 7` to avoid overflow.

> Note: The exact upper bounds for V and number of edges depend on the platform/given testcases. Typical competitive constraints allow up to `10^5` edges or vertices, which makes `O(E log V)` Dijkstra-based solutions appropriate.

---

## Intuition

I thought of the problem as two things combined:

1. I need **shortest distances** from node `0` to every other node — that suggests Dijkstra's algorithm.
2. I also need **how many distinct shortest ways** lead to each node. So while I discover or update shortest distances during Dijkstra, I can also maintain a `ways[]` array that counts the number of shortest paths to every node.

So my idea was: while running Dijkstra, whenever I find a strictly shorter distance to a neighbor, I overwrite that neighbor's `ways` with the current node's `ways`. If I find another path with exactly the same shortest distance, I add the current node's `ways` to the neighbor's `ways`. That way `ways[node]` always holds the number of shortest paths to `node`.

---

## Approach

1. Build an adjacency list from the edge list. For each edge `[u, v, w]`, add `(v, w)` to `u`'s list and `(u, w)` to `v`'s list since the graph is undirected.
2. Initialize two arrays, `dist[]` and `ways[]` of size `V`:

   * `dist[i]` = shortest known distance from `0` to `i`. Initialize to `INF` for all nodes except `dist[0] = 0`.
   * `ways[i]` = number of shortest paths from `0` to `i`. Initialize all to `0` except `ways[0] = 1`.
3. Use a min-priority queue (min-heap) to perform Dijkstra. The heap stores pairs `(distance, node)`.
4. While the heap is not empty:

   * Pop `(d, node)`. If `d > dist[node]` skip (stale entry).
   * For every neighbor `(nei, w)`:

     * Compute `nd = d + w` as the candidate distance to `nei` via `node`.
     * If `nd < dist[nei]`:

       * Update `dist[nei] = nd`.
       * Set `ways[nei] = ways[node]` (all shortest ways to `nei` currently pass through `node`).
       * Push `(nd, nei)` onto the heap.
     * Else if `nd == dist[nei]`:

       * Increment `ways[nei] = (ways[nei] + ways[node]) % MOD` — found additional shortest paths.
5. After the algorithm finishes, `ways[V-1]` is the number of shortest ways to reach the destination.

This is Dijkstra with path counting.

---

## Data Structures Used

* **Adjacency list** (`vector<vector<pair<int,int>>>` in C++, `List<List<Edge>>` in Java, arrays of arrays in JS/Python) — to store the graph efficiently.
* **Distance array** (`dist[]`) — to store shortest distances.
* **Ways array** (`ways[]`) — to store number of shortest paths to each node.
* **Min-heap / PriorityQueue** — for Dijkstra to always expand the currently closest node.
* Small helper classes/structures (Edge, State) in languages like Java for clarity.

---

## Operations & Behavior Summary

* **Graph building:** O(E) operations to convert the edge list into an adjacency list.
* **Dijkstra relaxations:** For each popped node, we relax its neighbors.

  * If we find a strictly better distance, we overwrite `ways[nei]` with `ways[node]`.
  * If we find an equal distance, we add `ways[node]` to `ways[nei]`.
* **Modulo handling:** Every addition to `ways[]` is done modulo `10^9 + 7` to avoid integer overflow.

---

## Complexity

* **Time Complexity:** `O(E log V)` where `V` is the number of vertices and `E` is the number of edges. This is because Dijkstra with a binary heap processes each edge at most once (relaxation) and heap operations cost `O(log V)`.
* **Space Complexity:** `O(V + E)` for adjacency list plus `O(V)` for `dist` and `ways` arrays and `O(V)` (or `O(E)` temporarily) for heap entries.

---

## Multi-language Solutions

Below are the working solutions in four languages. Each implementation follows the same logic described in the approach.

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int countPaths(int V, vector<vector<int>>& edges) {
        const long long INF = LLONG_MAX / 4;
        const int MOD = 1e9 + 7;
        vector<vector<pair<int,int>>> adj(V);
        for (auto &e : edges) {
            int u = e[0], v = e[1], w = e[2];
            adj[u].push_back({v, w});
            adj[v].push_back({u, w});
        }
        vector<long long> dist(V, INF);
        vector<int> ways(V, 0);
        priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<pair<long long,int>>> pq;
        dist[0] = 0;
        ways[0] = 1;
        pq.push({0LL, 0});
        while (!pq.empty()) {
            auto [d, node] = pq.top(); pq.pop();
            if (d > dist[node]) continue;
            for (auto &pr : adj[node]) {
                int nei = pr.first;
                int w = pr.second;
                long long nd = d + w;
                if (nd < dist[nei]) {
                    dist[nei] = nd;
                    ways[nei] = ways[node];
                    pq.push({nd, nei});
                } else if (nd == dist[nei]) {
                    ways[nei] = (ways[nei] + ways[node]) % MOD;
                }
            }
        }
        return ways[V-1] % MOD;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    static final int MOD = 1_000_000_007;
    static class Edge { int to; int w; Edge(int to,int w){this.to=to;this.w=w;} }
    static class State implements Comparable<State> {
        long dist; int node;
        State(long d, int n){dist=d; node=n;}
        public int compareTo(State o){ return Long.compare(this.dist, o.dist); }
    }
    public int countPaths(int V, int[][] edges) {
        long INF = Long.MAX_VALUE / 4;
        List<List<Edge>> adj = new ArrayList<>();
        for (int i=0;i<V;i++) adj.add(new ArrayList<>());
        for (int[] e: edges) {
            int u = e[0], v = e[1], w = e[2];
            adj.get(u).add(new Edge(v,w));
            adj.get(v).add(new Edge(u,w));
        }
        long[] dist = new long[V];
        Arrays.fill(dist, INF);
        int[] ways = new int[V];
        PriorityQueue<State> pq = new PriorityQueue<>();
        dist[0] = 0; ways[0] = 1;
        pq.add(new State(0, 0));
        while (!pq.isEmpty()) {
            State cur = pq.poll();
            long d = cur.dist; int node = cur.node;
            if (d > dist[node]) continue;
            for (Edge e : adj.get(node)) {
                int nei = e.to;
                long nd = d + e.w;
                if (nd < dist[nei]) {
                    dist[nei] = nd;
                    ways[nei] = ways[node];
                    pq.add(new State(nd, nei));
                } else if (nd == dist[nei]) {
                    ways[nei] = (int)((ways[nei] + (long)ways[node]) % MOD);
                }
            }
        }
        return ways[V-1] % MOD;
    }
}
```

### JavaScript

```javascript
class MinHeap {
    constructor(){ this.a = []; }
    size(){ return this.a.length; }
    push(item){
        this.a.push(item);
        let i = this.a.length - 1;
        while (i > 0){
            let p = Math.floor((i-1)/2);
            if (this.a[p][0] <= this.a[i][0]) break;
            [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
            i = p;
        }
    }
    pop(){
        if (this.a.length === 0) return null;
        const res = this.a[0];
        const last = this.a.pop();
        if (this.a.length > 0){
            this.a[0] = last;
            let i = 0;
            while (true){
                let l = 2*i + 1, r = 2*i + 2, smallest = i;
                if (l < this.a.length && this.a[l][0] < this.a[smallest][0]) smallest = l;
                if (r < this.a.length && this.a[r][0] < this.a[smallest][0]) smallest = r;
                if (smallest === i) break;
                [this.a[i], this.a[smallest]] = [this.a[smallest], this.a[i]];
                i = smallest;
            }
        }
        return res;
    }
}

class Solution {
    countPaths(V, edges) {
        const MOD = 1e9 + 7;
        const adj = Array.from({length: V}, () => []);
        for (let e of edges) {
            const u = e[0], v = e[1], w = e[2];
            adj[u].push([v,w]);
            adj[v].push([u,w]);
        }
        const dist = new Array(V).fill(Infinity);
        const ways = new Array(V).fill(0);
        const pq = new MinHeap();
        dist[0] = 0;
        ways[0] = 1;
        pq.push([0, 0]);
        while (pq.size() > 0) {
            const cur = pq.pop();
            if (!cur) break;
            const d = cur[0], node = cur[1];
            if (d > dist[node]) continue;
            for (const [nei, w] of adj[node]) {
                const nd = d + w;
                if (nd < dist[nei]) {
                    dist[nei] = nd;
                    ways[nei] = ways[node];
                    pq.push([nd, nei]);
                } else if (nd === dist[nei]) {
                    ways[nei] = (ways[nei] + ways[node]) % MOD;
                }
            }
        }
        return ways[V-1] % MOD;
    }
}
```

### Python3

```python
import heapq

class Solution:
    def countPaths(self, V, edges):
        MOD = 10**9 + 7
        INF = 10**30
        adj = [[] for _ in range(V)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        dist = [INF] * V
        ways = [0] * V
        dist[0] = 0
        ways[0] = 1
        heap = [(0, 0)]
        while heap:
            d, node = heapq.heappop(heap)
            if d > dist[node]:
                continue
            for nei, w in adj[node]:
                nd = d + w
                if nd < dist[nei]:
                    dist[nei] = nd
                    ways[nei] = ways[node]
                    heapq.heappush(heap, (nd, nei))
                elif nd == dist[nei]:
                    ways[nei] = (ways[nei] + ways[node]) % MOD
        return ways[V-1] % MOD
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I will explain the Python implementation line-by-line and then note how each piece maps to other languages. The logic is the same in all languages.

### Python (reference)

1. `import heapq` — Use Python's heapq module to have a min-heap.
2. `MOD = 10**9 + 7` — Modulus for counting ways.
3. `INF = 10**30` — A very large number to initialize distances.
4. Build adjacency: `adj = [[] for _ in range(V)]`; for each `u,v,w` add both directions.
5. `dist = [INF] * V` and `ways = [0] * V` — Initialize arrays.
6. `dist[0] = 0` and `ways[0] = 1` — Starting conditions.
7. `heap = [(0, 0)]` — push source (`distance`, `node`).
8. While heap not empty:

   * Pop `(d, node)`.
   * If `d > dist[node]` skip because it's a stale pair.
   * For each neighbor `(nei, w)` compute `nd = d + w`.
   * If `nd < dist[nei]`: update `dist[nei] = nd`, `ways[nei] = ways[node]`, and push `(nd, nei)`.
   * Else if `nd == dist[nei]`: `ways[nei] = (ways[nei] + ways[node]) % MOD`.
9. Return `ways[V-1] % MOD`.

### How this maps to other languages

* **Heap / PriorityQueue**: Python's `heapq` maps to C++ `priority_queue` with `greater` comparator, Java's `PriorityQueue<State>`, and the custom `MinHeap` in JavaScript.
* **Adjacency list**: Implemented using vectors/ArrayList/arrays-of-arrays depending on the language, but the concept is identical.
* **Arrays**: `dist` and `ways` are simple arrays in all languages. `long` vs `int` care: distances should use 64-bit where weights can add up.
* **Modulo operations**: Applied when updating `ways[]` on equal-distance discoveries.

---

## Examples

Example 1 (small graph):

```
V = 4
edges = [ [0,1,1], [0,2,1], [1,3,1], [2,3,1] ]
```

There are exactly 2 shortest paths from 0 to 3: `0-1-3` and `0-2-3`, each of length 2, so answer = 2.

Example 2 (single path):

```
V = 3
edges = [ [0,1,5], [1,2,3] ]
```

Only one path from 0 to 2: `0-1-2`, answer = 1.

Example 3 (multiple weights):

```
V = 5
edges = [ [0,1,2], [0,2,2], [1,3,1], [2,3,1], [3,4,3], [1,2,1] ]
```

Run the algorithm to find the shortest distance to 4 and count ways accordingly.

---

## How to use / Run locally

1. Create a repository and add this README.md.
2. Add a source file for your preferred language with the corresponding `Solution` class/function.
3. To test locally (Python example):

   * Create a quick driver in the same file or a separate script that constructs `V` and `edges` and calls `Solution().countPaths(V, edges)` and prints the result.

**Python driver sample**:

```python
if __name__ == '__main__':
    V = 4
    edges = [[0,1,1],[0,2,1],[1,3,1],[2,3,1]]
    print(Solution().countPaths(V, edges))  # expected 2
```

**C++ / Java / JS**: Paste the solution into your favourite online judge or compile locally with a suitable driver that calls the method.

---

## Notes & Optimizations

* Use `long long` / `long` for distances to avoid overflow in languages like C++ and Java.
* Store `ways[]` modulo `10^9 + 7`. Only `ways[]` needs modulo; distances remain exact.
* If edges contain very large weights or the number of edges is huge, still the `O(E log V)` algorithm remains the best standard approach for single-source shortest path with non-negative weights.
* If the graph is directed, simply do not add the reverse edge when building adjacency.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
