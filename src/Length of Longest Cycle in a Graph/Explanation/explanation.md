# Length of Longest Cycle in a Graph

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

## Problem Summary

Given a directed graph with V vertices and edges represented as a list of pairs, where each node has at most one outgoing edge, the task is to find the length of the longest cycle present in the graph. If no cycle exists, return -1.

## Constraints

* 1 <= V <= 10^4
* 0 <= edges[i][0], edges[i][1] < V
* Each node has at most one outgoing edge

## Intuition

I noticed that each node has at most one outgoing edge. That means the graph behaves like multiple chains that may eventually form cycles. Instead of building a full graph traversal, I can simply follow each node like a path.

If I revisit a node within the same traversal path, it means a cycle exists. Then I can calculate the cycle length using step tracking.

## Approach

1. Convert edges into a direct mapping array.
2. Maintain a visited array to avoid reprocessing nodes.
3. For each unvisited node:

   * Traverse along its path.
   * Keep track of nodes and their visit step using a map.
4. If a node is revisited in the current traversal, compute cycle length.
5. Update the maximum cycle length.

## Data Structures Used

* Array (Adjacency mapping)
* Boolean array (Visited)
* HashMap / Dictionary (Track traversal steps)

## Operations & Behavior Summary

* Each node is processed once.
* Traversal behaves like linked list traversal.
* Cycle detection is done using step tracking.

## Complexity

* Time Complexity: O(V)
* Space Complexity: O(V)

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int longestCycle(int V, vector<vector<int>>& edges) {
        vector<int> adj(V, -1);
        for(auto &e : edges) adj[e[0]] = e[1];

        vector<bool> visited(V, false);
        int maxCycle = -1;

        for(int i = 0; i < V; i++) {
            if(visited[i]) continue;

            unordered_map<int, int> mp;
            int node = i, step = 0;

            while(node != -1) {
                if(mp.count(node)) {
                    maxCycle = max(maxCycle, step - mp[node]);
                    break;
                }
                if(visited[node]) break;

                mp[node] = step++;
                visited[node] = true;
                node = adj[node];
            }
        }
        return maxCycle;
    }
};
```

### Java

```java
class Solution {
    public int longestCycle(int V, int[][] edges) {
        int[] adj = new int[V];
        Arrays.fill(adj, -1);

        for(int[] e : edges) adj[e[0]] = e[1];

        boolean[] visited = new boolean[V];
        int maxCycle = -1;

        for(int i = 0; i < V; i++) {
            if(visited[i]) continue;

            HashMap<Integer, Integer> map = new HashMap<>();
            int node = i, step = 0;

            while(node != -1) {
                if(map.containsKey(node)) {
                    maxCycle = Math.max(maxCycle, step - map.get(node));
                    break;
                }
                if(visited[node]) break;

                map.put(node, step++);
                visited[node] = true;
                node = adj[node];
            }
        }
        return maxCycle;
    }
}
```

### JavaScript

```javascript
class Solution {
    longestCycle(V, edges) {
        let adj = new Array(V).fill(-1);
        for (let [u, v] of edges) adj[u] = v;

        let visited = new Array(V).fill(false);
        let maxCycle = -1;

        for (let i = 0; i < V; i++) {
            if (visited[i]) continue;

            let map = new Map();
            let node = i, step = 0;

            while (node !== -1) {
                if (map.has(node)) {
                    maxCycle = Math.max(maxCycle, step - map.get(node));
                    break;
                }
                if (visited[node]) break;

                map.set(node, step++);
                visited[node] = true;
                node = adj[node];
            }
        }
        return maxCycle;
    }
}
```

### Python3

```python
class Solution:
    def longestCycle(self, V, edges):
        adj = [-1] * V
        for u, v in edges:
            adj[u] = v

        visited = [False] * V
        max_cycle = -1

        for i in range(V):
            if visited[i]:
                continue

            mp = {}
            node = i
            step = 0

            while node != -1:
                if node in mp:
                    max_cycle = max(max_cycle, step - mp[node])
                    break
                if visited[node]:
                    break

                mp[node] = step
                visited[node] = True
                step += 1
                node = adj[node]

        return max_cycle
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Convert the edge list into a direct mapping array.
2. Initialize a visited array to track processed nodes.
3. Iterate through each node.
4. If node is not visited, start traversal.
5. Use a map to store node and step index.
6. Move to next node using adjacency mapping.
7. If node is already in map, cycle detected.
8. Compute cycle length using step difference.
9. Update maximum cycle.
10. Mark nodes visited to avoid repetition.

## Examples

Input:
V = 7
edges = [[0,5],[1,0],[2,4],[3,1],[4,6],[5,6],[6,3]]
Output: 5

Input:
V = 8
edges = [[0,1],[1,2],[2,3],[3,0],[4,1],[5,4],[6,2],[7,6]]
Output: 4

## How to use / Run locally

1. Copy the code into your local IDE.
2. Provide input values for V and edges.
3. Run the function and print the result.

## Notes & Optimizations

* Avoid DFS recursion to prevent stack overflow.
* Use iterative traversal for better performance.
* Mark nodes visited early to avoid reprocessing.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
