# Shortest Path in 1-2 Graph

A clean and optimized solution for the **Shortest Path in 1-2 Graph** problem from GeeksforGeeks.

This repository explains the complete thought process behind the solution, discusses the algorithm in simple English, analyzes the time and space complexity, and provides implementations in multiple programming languages. If you're preparing for coding interviews or improving your graph algorithms, this problem is a great example of transforming a weighted graph into an unweighted graph to achieve an optimal linear-time solution.

---

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

You are given an undirected weighted graph with **V** vertices. Every edge has a weight of either **1** or **2**. Along with the graph, you are also given a source vertex (`src`) and a destination vertex (`dest`).

Your task is to find the minimum total weight required to travel from the source vertex to the destination vertex.

If no path exists between the two vertices, return **-1**.

Since the graph contains only edge weights of **1** and **2**, there is an opportunity to solve the problem more efficiently than using the standard Dijkstra's algorithm.

---

## Constraints

| Constraint | Value |
| ------------ | ------- |
| Number of vertices | `2 ≤ V ≤ 10^5` |
| Number of edges | `1 ≤ edges.size() ≤ min(2 × 10^5, V × (V - 1) / 2)` |
| Vertex numbering | `0` to `V - 1` |
| Edge weights | `1` or `2` |
| Graph type | Undirected |

---

## Intuition

When I first looked at the problem, the obvious choice was Dijkstra's algorithm because the graph is weighted.

Then I noticed something important. Every edge weight is only **1** or **2**.

That small restriction changes everything.

Instead of treating weight `2` as a special case during shortest path calculation, I can replace every weight `2` edge with two weight `1` edges by inserting one extra virtual node between the original vertices.

After doing this transformation, every edge in the graph has weight `1`.

Once every edge has the same weight, the problem becomes an ordinary shortest path problem in an unweighted graph, and Breadth First Search (BFS) can find the answer in linear time.

---

## Approach

I solve the problem in the following steps.

1. Create an adjacency list for a new transformed graph.
2. Traverse every edge in the original graph.
3. If the edge weight is `1`, connect both vertices normally.
4. If the edge weight is `2`, create one new virtual node.
5. Replace the original edge with two edges of weight `1`.
6. After all edges are processed, every edge in the transformed graph has weight `1`.
7. Run a standard BFS starting from the source vertex.
8. Store the shortest distance for every visited node.
9. Return the distance of the destination vertex.
10. If the destination was never visited, return `-1`.

This approach satisfies the expected linear time complexity.

---

## Data Structures Used

| Data Structure | Purpose |
| --------------- | --------- |
| Adjacency List | Stores the transformed graph efficiently |
| Queue | Performs Breadth First Search level by level |
| Distance Array | Stores the shortest distance and also marks visited nodes |
| Virtual Nodes | Converts weight `2` edges into two weight `1` edges |

---

## Operations & Behavior Summary

The algorithm works in two major stages.

First, it transforms the graph.

Every edge with weight `1` is copied directly into the adjacency list.

Whenever an edge with weight `2` appears, a new virtual node is created. Instead of connecting the two original vertices directly, both vertices are connected through the new node. This effectively replaces one weight `2` edge with two weight `1` edges.

Once the graph has been transformed, the entire graph behaves like an unweighted graph.

The algorithm then performs a standard Breadth First Search.

Every newly discovered vertex receives a distance that is one greater than its parent.

Since every edge now contributes exactly one unit of distance, the BFS distance is exactly equal to the shortest weighted distance in the original graph.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(V + E)** | Every edge is processed once while building the transformed graph, and BFS visits every node and edge only once. |
| Space Complexity | **O(V + E)** | Extra space is used for the adjacency list, queue, virtual nodes, and distance array. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int shortestPath(int V, int src, int dest, vector<vector<int>> &edges) {
        // Total number of nodes after adding virtual nodes
        int totalNodes = V;

        // Adjacency list for the transformed graph
        vector<vector<int>> adj(V + edges.size());

        // Build the transformed graph
        for (auto &edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (w == 1) {
                // Weight 1 edge remains unchanged
                adj[u].push_back(v);
                adj[v].push_back(u);
            } else {
                // Create one virtual node for a weight 2 edge
                int newNode = totalNodes++;

                // Replace weight 2 with two weight 1 edges
                adj[u].push_back(newNode);
                adj[newNode].push_back(u);

                adj[newNode].push_back(v);
                adj[v].push_back(newNode);
            }
        }

        // Distance array (-1 means unvisited)
        vector<int> dist(totalNodes, -1);

        // Normal BFS queue
        queue<int> q;

        // Start from source
        q.push(src);
        dist[src] = 0;

        while (!q.empty()) {
            int node = q.front();
            q.pop();

            // Visit every neighbor
            for (int next : adj[node]) {
                if (dist[next] == -1) {
                    dist[next] = dist[node] + 1;
                    q.push(next);
                }
            }
        }

        // Return shortest distance to destination
        return dist[dest];
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int shortestPath(int V, int src, int dest, int[][] edges) {

        // Total nodes after adding virtual nodes
        int totalNodes = V;

        // Adjacency list for transformed graph
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();

        // Maximum possible nodes = V + number of edges
        for (int i = 0; i < V + edges.length; i++) {
            adj.add(new ArrayList<>());
        }

        // Build transformed graph
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (w == 1) {
                // Normal edge
                adj.get(u).add(v);
                adj.get(v).add(u);
            } else {
                // Create virtual node
                int newNode = totalNodes++;

                // Replace weight 2 edge
                adj.get(u).add(newNode);
                adj.get(newNode).add(u);

                adj.get(newNode).add(v);
                adj.get(v).add(newNode);
            }
        }

        // Distance array
        int[] dist = new int[totalNodes];
        Arrays.fill(dist, -1);

        Queue<Integer> queue = new LinkedList<>();

        // Start BFS
        queue.offer(src);
        dist[src] = 0;

        while (!queue.isEmpty()) {
            int node = queue.poll();

            for (int next : adj.get(node)) {
                if (dist[next] == -1) {
                    dist[next] = dist[node] + 1;
                    queue.offer(next);
                }
            }
        }

        // Return answer
        return dist[dest];
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} V
 * @param {number} src
 * @param {number} dest
 * @param {number[][]} edges
 * @return {number}
 */

class Solution {
    shortestPath(V, src, dest, edges) {

        // Total nodes after adding virtual nodes
        let totalNodes = V;

        // Adjacency list
        const adj = Array.from({ length: V + edges.length }, () => []);

        // Build transformed graph
        for (const [u, v, w] of edges) {

            if (w === 1) {
                // Normal edge
                adj[u].push(v);
                adj[v].push(u);
            } else {
                // Create virtual node
                const newNode = totalNodes++;

                // Replace weight 2 edge
                adj[u].push(newNode);
                adj[newNode].push(u);

                adj[newNode].push(v);
                adj[v].push(newNode);
            }
        }

        // Distance array
        const dist = new Array(totalNodes).fill(-1);

        // BFS queue
        const queue = [];
        let front = 0;

        queue.push(src);
        dist[src] = 0;

        while (front < queue.length) {

            const node = queue[front++];

            for (const next of adj[node]) {

                if (dist[next] === -1) {
                    dist[next] = dist[node] + 1;
                    queue.push(next);
                }
            }
        }

        // Return shortest distance
        return dist[dest];
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def shortestPath(self, V: int, src: int, dest: int, edges: list[list[int]]) -> int:

        # Total nodes after adding virtual nodes
        total_nodes = V

        # Adjacency list for transformed graph
        adj = [[] for _ in range(V + len(edges))]

        # Build transformed graph
        for u, v, w in edges:

            if w == 1:
                # Normal edge
                adj[u].append(v)
                adj[v].append(u)
            else:
                # Create one virtual node
                new_node = total_nodes
                total_nodes += 1

                # Replace weight 2 edge with two weight 1 edges
                adj[u].append(new_node)
                adj[new_node].append(u)

                adj[new_node].append(v)
                adj[v].append(new_node)

        # Distance array
        dist = [-1] * total_nodes

        # BFS queue
        q = deque()

        q.append(src)
        dist[src] = 0

        while q:

            node = q.popleft()

            for nxt in adj[node]:

                if dist[nxt] == -1:
                    dist[nxt] = dist[node] + 1
                    q.append(nxt)

        # Return shortest distance to destination
        return dist[dest]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is exactly the same in every language.

The implementation starts by creating an adjacency list that is large enough to store both the original vertices and any virtual vertices that may be added later.

Next, every edge from the input graph is processed.

If the edge weight is `1`, the algorithm simply connects the two vertices because no transformation is required.

If the edge weight is `2`, one virtual node is created. The original edge is replaced with two smaller edges. The first connects the starting vertex to the virtual node, and the second connects the virtual node to the ending vertex.

After all edges have been processed, every edge in the graph has weight `1`.

The algorithm then creates a distance array. Every value is initialized to `-1`, which means the corresponding node has not been visited yet.

Breadth First Search starts from the source vertex.

Whenever a new node is discovered for the first time, its distance becomes the current distance plus one. The node is then pushed into the queue so its neighbors can be explored later.

Because BFS always explores nodes level by level, the first distance assigned to any node is guaranteed to be the shortest possible distance.

Once BFS finishes, the distance stored for the destination vertex is returned.

If the destination was never reached, its distance remains `-1`, and that value is returned.

The syntax changes slightly between C++, Java, JavaScript, and Python, but the algorithm itself is identical across all four implementations.

---

## Examples

### Example 1

**Input**

```text
V = 4
edges = [[0,1,1],[0,2,2],[2,3,1],[1,2,1],[1,3,2]]
src = 0
dest = 3
```

**Output**

```text
3
```

**Trace**

One shortest path is:

```text
0 → 1 → 3
```

Its total cost is:

```text
1 + 2 = 3
```

Another shortest path is:

```text
0 → 2 → 3
```

Its total cost is also:

```text
2 + 1 = 3
```

The minimum distance is **3**.

---

### Example 2

**Input**

```text
V = 5
edges = [[0,1,1],[0,2,2],[1,2,1],[3,4,2]]
src = 1
dest = 3
```

**Output**

```text
-1
```

**Trace**

The graph has two disconnected components.

There is no path from vertex `1` to vertex `3`.

---

### Example 3

**Input**

```text
V = 5
edges = [[1,0,1],[0,3,2],[1,3,1],[1,2,2],[2,3,2],[3,4,1],[2,4,1]]
src = 1
dest = 4
```

**Output**

```text
2
```

**Trace**

The shortest path is:

```text
1 → 3 → 4
```

Total cost:

```text
1 + 1 = 2
```

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone https://github.com/your-username/shortest-path-in-1-2-graph.git
```

Move into the project directory.

```bash
cd shortest-path-in-1-2-graph
```

### Compile and Run C++

```bash
g++ solution.cpp -o solution
./solution
```

### Compile and Run Java

```bash
javac Solution.java
java Solution
```

### Run JavaScript

```bash
node solution.js
```

### Run Python3

```bash
python solution.py
```

You can also copy the solution directly into the GeeksforGeeks editor and submit it without making any changes.

---

## Notes & Optimizations

- This solution avoids Dijkstra's algorithm entirely.
- The graph transformation makes every edge have equal weight.
- BFS naturally computes the shortest path in an unweighted graph.
- The algorithm satisfies the expected linear time complexity.
- The solution works even when the graph is disconnected.
- If the source and destination are the same, the answer is immediately `0`.
- This graph transformation technique is useful whenever edge weights are limited to a very small fixed range.

---

## Author

**Md Aarzoo Islam**

Instagram: <https://www.instagram.com/code.with.aarzoo/>
