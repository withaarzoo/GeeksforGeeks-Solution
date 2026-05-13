# Mother Vertex

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

The Mother Vertex problem is a popular Directed Graph problem in Data Structures and Algorithms.

We are given a directed graph with `V` vertices and a list of directed edges. The task is to find a vertex from which every other vertex in the graph can be reached.

Such a vertex is called a Mother Vertex.

If multiple mother vertices exist, we return the smallest one. If no such vertex exists, we return `-1`.

This problem is commonly solved using Depth First Search (DFS) and graph traversal techniques.

### Input

- Number of vertices `V`
- List of directed edges

### Output

- The mother vertex of the graph
- `-1` if no mother vertex exists

This problem is frequently asked in coding interviews and competitive programming contests because it tests graph traversal concepts deeply.

---

## Constraints

| Constraint | Value |
|---|---|
| 1 ≤ V ≤ 10^5 | Number of vertices |
| 1 ≤ edges[i][0], edges[i][1] ≤ V-1 | Valid directed edge |
| Graph Type | Directed Graph |

---

## Intuition

The first thing I noticed was that running DFS from every single node would work, but it would be too slow for large graphs.

Then I remembered an important DFS property in directed graphs:

If a mother vertex exists, then the last finished vertex during DFS traversal can become a valid candidate.

That observation completely changes the problem.

Instead of checking every node separately, I only need:

1. One DFS traversal to find a candidate
2. One more DFS traversal to verify it

This keeps the solution efficient and works in linear time.

---

## Approach

I start by creating an adjacency list from the given edges.

Then I perform DFS traversal over the graph.

### Step 1: Find Candidate Mother Vertex

- Traverse every node
- If a node is unvisited, run DFS from it
- After DFS completes, store that node as the latest candidate

The last node that finishes DFS becomes the possible mother vertex.

### Step 2: Verify the Candidate

- Reset the visited array
- Run DFS again from the candidate vertex
- Check whether all vertices become reachable

If every node is visited, the candidate is the mother vertex.

Otherwise, no mother vertex exists.

---

## Data Structures Used

### 1. Adjacency List

Used to store the directed graph efficiently.

Why I used it:

- Faster graph traversal
- Memory efficient compared to adjacency matrix
- Perfect for sparse graphs

### 2. Visited Array

Tracks which nodes are already explored during DFS.

Why I used it:

- Prevents revisiting nodes
- Avoids infinite loops in cyclic graphs
- Helps verify graph reachability

### 3. Recursion Stack

Used internally by DFS recursion.

Why I used it:

- Makes DFS implementation simple and clean

---

## Operations & Behavior Summary

Here is the overall behavior of the algorithm in simple words:

1. Build the graph using adjacency list
2. Create a visited array
3. Run DFS from every unvisited node
4. Keep updating the candidate vertex
5. The last DFS root becomes the possible mother vertex
6. Reset the visited array
7. Run DFS again from the candidate
8. Check if all nodes are reachable
9. Return the candidate if valid
10. Otherwise return `-1`

---

## Complexity

| Type | Complexity | Explanation |
|---|---|---|
| Time Complexity | O(V + E) | Every vertex and edge is visited at most a constant number of times |
| Space Complexity | O(V + E) | Adjacency list, visited array, and DFS recursion stack use extra memory |

Where:

- `V` = Number of vertices
- `E` = Number of edges

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // DFS function to visit all reachable nodes
    void dfs(int node, vector<vector<int>>& adj, vector<int>& visited) {
        visited[node] = 1;
        
        // Visit all neighbours
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }

    int findMotherVertex(int V, vector<vector<int>>& edges) {
        
        // Create adjacency list
        vector<vector<int>> adj(V);
        
        for (auto &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
        }

        vector<int> visited(V, 0);
        
        int candidate = -1;

        // Find the last finished vertex in DFS
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(i, adj, visited);
                
                // Store current node as possible mother vertex
                candidate = i;
            }
        }

        // Reset visited array for verification DFS
        fill(visited.begin(), visited.end(), 0);

        // Check if candidate can reach all vertices
        dfs(candidate, adj, visited);

        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                return -1;
            }
        }

        return candidate;
    }
};
```

### Java

```java
class Solution {
    
    // DFS function to visit all reachable nodes
    void dfs(int node, ArrayList<ArrayList<Integer>> adj, boolean[] visited) {
        visited[node] = true;

        // Visit all neighbours
        for (int neighbor : adj.get(node)) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }

    public int findMotherVertex(int V, int[][] edges) {
        
        // Create adjacency list
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();

        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
        }

        boolean[] visited = new boolean[V];

        int candidate = -1;

        // Find possible mother vertex
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(i, adj, visited);

                // Last finished node becomes candidate
                candidate = i;
            }
        }

        // Reset visited array
        visited = new boolean[V];

        // Verify candidate
        dfs(candidate, adj, visited);

        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                return -1;
            }
        }

        return candidate;
    }
}
```

### JavaScript

```javascript
class Solution {
    
    // DFS function
    dfs(node, adj, visited) {
        visited[node] = true;

        // Visit all neighbours
        for (let neighbor of adj[node]) {
            if (!visited[neighbor]) {
                this.dfs(neighbor, adj, visited);
            }
        }
    }

    findMotherVertex(V, edges) {
        
        // Create adjacency list
        let adj = Array.from({ length: V }, () => []);

        for (let [u, v] of edges) {
            adj[u].push(v);
        }

        let visited = new Array(V).fill(false);

        let candidate = -1;

        // Find candidate mother vertex
        for (let i = 0; i < V; i++) {
            if (!visited[i]) {
                this.dfs(i, adj, visited);

                // Store last finished node
                candidate = i;
            }
        }

        // Reset visited array
        visited.fill(false);

        // Verify candidate
        this.dfs(candidate, adj, visited);

        for (let i = 0; i < V; i++) {
            if (!visited[i]) {
                return -1;
            }
        }

        return candidate;
    }
}
```

### Python3

```python
class Solution:
    
    # DFS function to visit all reachable nodes
    def dfs(self, node, adj, visited):
        visited[node] = True
        
        # Visit all neighbours
        for neighbor in adj[node]:
            if not visited[neighbor]:
                self.dfs(neighbor, adj, visited)

    def findMotherVertex(self, V, edges):
        
        # Create adjacency list
        adj = [[] for _ in range(V)]
        
        for u, v in edges:
            adj[u].append(v)

        visited = [False] * V
        
        candidate = -1

        # Find possible mother vertex
        for i in range(V):
            if not visited[i]:
                self.dfs(i, adj, visited)
                
                # Last finished node becomes candidate
                candidate = i

        # Reset visited array
        visited = [False] * V

        # Verify candidate
        self.dfs(candidate, adj, visited)

        # Check whether all nodes are reachable
        for i in range(V):
            if not visited[i]:
                return -1

        return candidate
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains the same across all four languages. Only syntax changes.

### Building the Graph

The first step is converting the edge list into an adjacency list.

This makes traversal easier because every node directly stores its outgoing neighbors.

Without adjacency lists, graph traversal would become slower and more memory expensive.

---

### DFS Traversal

DFS is the core part of the solution.

Whenever DFS visits a node:

- It marks the node as visited
- Then recursively visits all reachable neighbors

This allows us to explore an entire connected region of the graph.

---

### Finding the Candidate Vertex

This is the most important part of the algorithm.

While traversing:

- If a node is still unvisited, DFS starts from that node
- After DFS finishes, that node becomes the latest candidate

The last completed DFS root becomes the final candidate.

Why does this work?

Because if a mother vertex exists, it must be capable of reaching every disconnected DFS region indirectly.

That naturally causes it to finish last during traversal.

---

### Verification Step

Finding a candidate alone is not enough.

Some graphs do not contain any mother vertex at all.

So I run DFS one more time from the candidate.

If every node becomes visited:

- The candidate is valid

If even one node remains unreachable:

- No mother vertex exists

---

### Why This Solution Is Efficient

A brute force solution would:

- Start DFS from every node
- Check reachability repeatedly

That would take:
`O(V * (V + E))`

The optimized DFS approach only needs:
`O(V + E)`

That is a massive improvement for large graphs.

---

## Examples

### Example 1

### Input

```text
V = 5
edges = [[0,2],[0,3],[1,0],[2,1],[3,4]]
```

### Output

```text
0
```

### Explanation

Starting from node `0`:

- 0 → 2
- 2 → 1
- 0 → 3
- 3 → 4

All vertices become reachable.

So `0` is a valid mother vertex.

---

### Example 2

### Input

```text
V = 3
edges = [[0,1],[2,1]]
```

### Output

```text
-1
```

### Explanation

No single vertex can reach every other node.

So the graph has no mother vertex.

---

### Example 3

### Input

```text
V = 4
edges = [[0,1],[1,2],[2,3]]
```

### Output

```text
0
```

### Explanation

Node `0` can reach:

- 1
- 2
- 3

So `0` becomes the mother vertex.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ filename.cpp -o output
```

Run:

```bash
./output
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run:

```bash
python filename.py
```

or

```bash
python3 filename.py
```

---

## Notes & Optimizations

- This problem is based on DFS finishing order concepts.
- The optimized solution avoids unnecessary repeated traversals.
- Adjacency list is preferred over adjacency matrix for better memory usage.
- Recursive DFS is simple, but iterative DFS using stack can also be used.
- In very deep graphs, recursion depth may become an issue in Python.
- Kosaraju’s Algorithm concepts are closely related to this problem.

### Edge Cases Worth Testing

- Single node graph
- Fully disconnected graph
- Cyclic graph
- Graph with multiple mother vertices
- Graph with no mother vertex

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
