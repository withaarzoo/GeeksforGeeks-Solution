# Minimum Height Roots

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

Given an undirected tree with `V` vertices labeled from `0` to `V-1` and edges represented as a list of pairs, the task is to find all possible root nodes such that the height of the tree is minimized.

The height of a tree is defined as the maximum number of edges in the path from the root to any leaf node.

---

## Constraints

* `1 ≤ V ≤ 10^5`
* `0 ≤ E ≤ V - 1`
* The graph is guaranteed to be a tree (connected and acyclic)

---

## Intuition

I realized that trying every node as a root would be inefficient.

The key observation is:

* The optimal roots lie at the center of the tree.
* A tree can have either 1 or 2 centers.

So instead of checking all nodes, I remove leaf nodes layer by layer until only the center nodes remain.

---

## Approach

1. Handle edge case where `V == 1`.
2. Build adjacency list and degree array.
3. Push all leaf nodes (degree = 1) into a queue.
4. Perform BFS-like trimming:

   * Remove current leaves.
   * Reduce degree of neighbors.
   * Add new leaves.
5. Continue until remaining nodes are ≤ 2.
6. Return remaining nodes.

---

## Data Structures Used

* Adjacency List: To store graph
* Degree Array: To track number of connections
* Queue: For BFS traversal

---

## Operations & Behavior Summary

* Graph building takes O(V)
* Each node is processed once
* Leaves are removed level by level
* Final nodes are tree centers

---

## Complexity

* Time Complexity: `O(V)`
* Space Complexity: `O(V)`

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> minHeightRoot(int V, vector<vector<int>>& edges) {
        if (V == 1) return {0};

        vector<vector<int>> adj(V);
        vector<int> degree(V, 0);

        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
            degree[e[0]]++;
            degree[e[1]]++;
        }

        queue<int> q;
        for (int i = 0; i < V; i++) {
            if (degree[i] == 1) q.push(i);
        }

        int remaining = V;

        while (remaining > 2) {
            int size = q.size();
            remaining -= size;

            while (size--) {
                int leaf = q.front(); q.pop();
                for (int nei : adj[leaf]) {
                    degree[nei]--;
                    if (degree[nei] == 1) q.push(nei);
                }
            }
        }

        vector<int> res;
        while (!q.empty()) {
            res.push_back(q.front());
            q.pop();
        }

        return res;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> minHeightRoot(int V, int[][] edges) {
        ArrayList<Integer> result = new ArrayList<>();

        if (V == 1) {
            result.add(0);
            return result;
        }

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) adj.add(new ArrayList<>());

        int[] degree = new int[V];

        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
            degree[e[0]]++;
            degree[e[1]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (degree[i] == 1) q.offer(i);
        }

        int remaining = V;

        while (remaining > 2) {
            int size = q.size();
            remaining -= size;

            while (size-- > 0) {
                int leaf = q.poll();
                for (int nei : adj.get(leaf)) {
                    degree[nei]--;
                    if (degree[nei] == 1) q.offer(nei);
                }
            }
        }

        result.addAll(q);
        return result;
    }
}
```

### JavaScript

```javascript
class Solution {
    minHeightRoot(V, edges) {
        if (V === 1) return [0];

        let adj = Array.from({ length: V }, () => []);
        let degree = new Array(V).fill(0);

        for (let [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
            degree[u]++;
            degree[v]++;
        }

        let queue = [];
        for (let i = 0; i < V; i++) {
            if (degree[i] === 1) queue.push(i);
        }

        let remaining = V;

        while (remaining > 2) {
            let size = queue.length;
            remaining -= size;

            let newLeaves = [];

            for (let leaf of queue) {
                for (let nei of adj[leaf]) {
                    degree[nei]--;
                    if (degree[nei] === 1) newLeaves.push(nei);
                }
            }

            queue = newLeaves;
        }

        return queue;
    }
}
```

### Python3

```python
class Solution:
    def minHeightRoot(self, V, edges):
        if V == 1:
            return [0]

        from collections import deque

        adj = [[] for _ in range(V)]
        degree = [0] * V

        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            degree[u] += 1
            degree[v] += 1

        q = deque()
        for i in range(V):
            if degree[i] == 1:
                q.append(i)

        remaining = V

        while remaining > 2:
            size = len(q)
            remaining -= size

            for _ in range(size):
                leaf = q.popleft()
                for nei in adj[leaf]:
                    degree[nei] -= 1
                    if degree[nei] == 1:
                        q.append(nei)

        return list(q)
```

---

## Step-by-step Detailed Explanation

1. Build adjacency list and degree array.
2. Identify all leaf nodes (degree = 1).
3. Push them into a queue.
4. Start removing leaves layer by layer.
5. Reduce degree of neighbors.
6. When neighbor becomes leaf, push it.
7. Stop when remaining nodes ≤ 2.
8. These nodes are the answer.

---

## Examples

Input:

```
V = 5
edges = [[0,2],[1,2],[2,3],[3,4]]
```

Output:

```
[2,3]
```

Input:

```
V = 4
edges = [[0,1],[0,2],[0,3]]
```

Output:

```
[0]
```

---

## How to use / Run locally

### C++

* Compile: `g++ file.cpp -o output`
* Run: `./output`

### Java

* Compile: `javac Solution.java`
* Run: `java Solution`

### JavaScript

* Run: `node file.js`

### Python

* Run: `python file.py`

---

## Notes & Optimizations

* Avoid brute force (O(V^2))
* Use topological trimming approach
* Works efficiently for large trees up to 10^5 nodes

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
