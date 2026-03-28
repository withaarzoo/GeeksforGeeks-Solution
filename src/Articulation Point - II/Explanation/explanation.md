# Articulation Point - II

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

You are given an undirected graph with `V` vertices and `E` edges.

The graph is represented using a 2D array `edges[][]`, where each element `[u, v]` means there is an undirected edge between node `u` and node `v`.

Your task is to find all articulation points in the graph.

An articulation point is a node such that if I remove that node along with all of its connected edges, the number of connected components in the graph increases.

If there are no articulation points, return `[-1]`.

---

## Constraints

```text
1 ≤ V, E ≤ 10^4
```

---

## Intuition

I first thought about removing every node one by one and checking whether the graph becomes disconnected.

But that approach would be very slow because for every node, I would need to run DFS again.

So instead, I used Tarjan's Algorithm.

The main idea is:

* `tin[node]` = the discovery time of the node
* `low[node]` = the earliest visited node reachable from that node

Using these two arrays, I can identify whether a node is an articulation point during a single DFS traversal.

---

## Approach

1. Create an adjacency list from the given edges.
2. Use DFS traversal.
3. Maintain these arrays:

   * `visited[]`
   * `tin[]`
   * `low[]`
   * `mark[]`
4. During DFS:

   * Assign discovery time and low time
   * Explore all neighbors
   * Update low values properly
5. A node becomes an articulation point if:

   * It is not the root and `low[child] >= tin[node]`
   * It is the root and has more than one DFS child
6. Return all articulation points.
7. If none exist, return `[-1]`.

---

## Data Structures Used

* Adjacency List
* Visited Array
* Discovery Time Array (`tin[]`)
* Lowest Reachable Time Array (`low[]`)
* Mark Array for articulation points
* DFS Recursion Stack

---

## Operations & Behavior Summary

| Operation            | Purpose                                                            |
| -------------------- | ------------------------------------------------------------------ |
| Build adjacency list | Store graph connections                                            |
| DFS traversal        | Visit every node once                                              |
| tin[node]            | Store entry time of node                                           |
| low[node]            | Store lowest reachable discovery time                              |
| Root node check      | Root with more than one child is articulation point                |
| Non-root check       | If child cannot reach ancestor, current node is articulation point |

---

## Complexity

* Time Complexity: `O(V + E)`

  * `V` = number of vertices
  * `E` = number of edges
  * Every node and edge is visited once

* Space Complexity: `O(V + E)`

  * Adjacency list stores all edges
  * Extra arrays are used for DFS traversal

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int timer = 0;

    void dfs(int node, int parent, vector<int> adj[],
             vector<int>& vis, vector<int>& tin,
             vector<int>& low, vector<int>& mark) {

        vis[node] = 1;
        tin[node] = low[node] = timer++;
        int childCount = 0;

        for (int neighbor : adj[node]) {

            if (neighbor == parent)
                continue;

            if (vis[neighbor]) {
                low[node] = min(low[node], tin[neighbor]);
            } else {
                dfs(neighbor, node, adj, vis, tin, low, mark);

                low[node] = min(low[node], low[neighbor]);

                if (low[neighbor] >= tin[node] && parent != -1) {
                    mark[node] = 1;
                }

                childCount++;
            }
        }

        if (parent == -1 && childCount > 1) {
            mark[node] = 1;
        }
    }

    vector<int> articulationPoints(int V, vector<vector<int>>& edges) {
        vector<int> adj[V];

        for (auto &edge : edges) {
            int u = edge[0];
            int v = edge[1];

            adj[u].push_back(v);
            adj[v].push_back(u);
        }

        vector<int> vis(V, 0), tin(V, -1), low(V, -1), mark(V, 0);

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfs(i, -1, adj, vis, tin, low, mark);
            }
        }

        vector<int> ans;

        for (int i = 0; i < V; i++) {
            if (mark[i]) {
                ans.push_back(i);
            }
        }

        if (ans.empty())
            return {-1};

        return ans;
    }
};
```

### Java

```java
class Solution {
    static int timer;

    static void dfs(int node, int parent, ArrayList<Integer>[] adj,
                    boolean[] vis, int[] tin, int[] low, boolean[] mark) {

        vis[node] = true;
        tin[node] = low[node] = timer++;
        int childCount = 0;

        for (int neighbor : adj[node]) {

            if (neighbor == parent)
                continue;

            if (vis[neighbor]) {
                low[node] = Math.min(low[node], tin[neighbor]);
            } else {
                dfs(neighbor, node, adj, vis, tin, low, mark);

                low[node] = Math.min(low[node], low[neighbor]);

                if (low[neighbor] >= tin[node] && parent != -1) {
                    mark[node] = true;
                }

                childCount++;
            }
        }

        if (parent == -1 && childCount > 1) {
            mark[node] = true;
        }
    }

    static ArrayList<Integer> articulationPoints(int V, int[][] edges) {
        timer = 0;

        ArrayList<Integer>[] adj = new ArrayList[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];

            adj[u].add(v);
            adj[v].add(u);
        }

        boolean[] vis = new boolean[V];
        int[] tin = new int[V];
        int[] low = new int[V];
        boolean[] mark = new boolean[V];

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfs(i, -1, adj, vis, tin, low, mark);
            }
        }

        ArrayList<Integer> ans = new ArrayList<>();

        for (int i = 0; i < V; i++) {
            if (mark[i]) {
                ans.add(i);
            }
        }

        if (ans.size() == 0) {
            ans.add(-1);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    constructor() {
        this.timer = 0;
    }

    dfs(node, parent, adj, vis, tin, low, mark) {
        vis[node] = true;
        tin[node] = low[node] = this.timer++;
        let childCount = 0;

        for (let neighbor of adj[node]) {
            if (neighbor === parent) continue;

            if (vis[neighbor]) {
                low[node] = Math.min(low[node], tin[neighbor]);
            } else {
                this.dfs(neighbor, node, adj, vis, tin, low, mark);

                low[node] = Math.min(low[node], low[neighbor]);

                if (low[neighbor] >= tin[node] && parent !== -1) {
                    mark[node] = true;
                }

                childCount++;
            }
        }

        if (parent === -1 && childCount > 1) {
            mark[node] = true;
        }
    }

    articulationPoints(V, edges) {
        let adj = Array.from({ length: V }, () => []);

        for (let [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        let vis = Array(V).fill(false);
        let tin = Array(V).fill(-1);
        let low = Array(V).fill(-1);
        let mark = Array(V).fill(false);

        for (let i = 0; i < V; i++) {
            if (!vis[i]) {
                this.dfs(i, -1, adj, vis, tin, low, mark);
            }
        }

        let ans = [];

        for (let i = 0; i < V; i++) {
            if (mark[i]) {
                ans.push(i);
            }
        }

        return ans.length ? ans : [-1];
    }
}
```

### Python3

```python
class Solution:
    def articulationPoints(self, V, edges):
        adj = [[] for _ in range(V)]

        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        visited = [False] * V
        tin = [-1] * V
        low = [-1] * V
        mark = [False] * V
        timer = [0]

        def dfs(node, parent):
            visited[node] = True
            tin[node] = low[node] = timer[0]
            timer[0] += 1
            child_count = 0

            for neighbor in adj[node]:
                if neighbor == parent:
                    continue

                if visited[neighbor]:
                    low[node] = min(low[node], tin[neighbor])
                else:
                    dfs(neighbor, node)

                    low[node] = min(low[node], low[neighbor])

                    if low[neighbor] >= tin[node] and parent != -1:
                        mark[node] = True

                    child_count += 1

            if parent == -1 and child_count > 1:
                mark[node] = True

        for i in range(V):
            if not visited[i]:
                dfs(i, -1)

        ans = []

        for i in range(V):
            if mark[i]:
                ans.append(i)

        return ans if ans else [-1]
```

---

## Step-by-step Detailed Explanation

### C++

1. Build adjacency list from edges.
2. Start DFS from every unvisited node.
3. Store visit time in `tin[]`.
4. Store lowest reachable time in `low[]`.
5. Skip the parent edge.
6. If a neighbor is already visited, update `low[node]`.
7. If a neighbor is unvisited, recursively visit it.
8. After DFS returns:

   * Update `low[node]`
   * Check articulation point condition
9. For root node, check if it has more than one child.
10. Collect all marked articulation points.

### Java

1. Create adjacency list using `ArrayList`.
2. Use DFS recursion.
3. Maintain `tin[]` and `low[]` arrays.
4. Skip parent node during DFS.
5. Update low values using visited neighbors.
6. If child cannot reach ancestor, current node is articulation point.
7. Root node becomes articulation point if it has more than one child.
8. Return all articulation points.

### JavaScript

1. Create graph using array of arrays.
2. Use DFS function.
3. Track discovery and low times.
4. Update low value whenever back edge is found.
5. Check articulation point conditions.
6. Handle disconnected graph using loop over all nodes.
7. Return `[-1]` if no articulation point exists.

### Python3

1. Create adjacency list.
2. Use recursive DFS.
3. Maintain `visited`, `tin`, `low`, and `mark` arrays.
4. Update low values properly.
5. Mark articulation points when conditions are satisfied.
6. Handle root node separately.
7. Return all articulation points.

---

## Examples

```text
Input:
V = 5
edges = [[0,1],[1,4],[4,3],[4,2],[2,3]]

Output:
[1,4]
```

```text
Input:
V = 4
edges = [[0,1],[0,2]]

Output:
[0]
```

```text
Input:
V = 3
edges = [[0,1],[1,2],[2,0]]

Output:
[-1]
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* Tarjan's Algorithm is the most efficient approach for this problem.
* It works in linear time.
* The graph can be disconnected, so DFS should start from every node.
* Root node condition is different from non-root node condition.
* `low[]` and `tin[]` are the most important arrays in this solution.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
