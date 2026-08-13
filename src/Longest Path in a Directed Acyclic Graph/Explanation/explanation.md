# Longest Path in a Directed Acyclic Graph

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given a weighted Directed Acyclic Graph (DAG) with `V` vertices numbered from `0` to `V - 1`, I need to find the longest distance from a given source vertex `src` to every other vertex.

Each edge is represented as:

`[u, v, w]`

This means there is a directed edge from vertex `u` to vertex `v` with weight `w`.

The output is a distance array where:

* `dist[i]` represents the longest distance from `src` to vertex `i`.
* If vertex `i` cannot be reached from `src`, its value should be `INT_MIN`.
* The GeeksforGeeks driver may display unreachable `INT_MIN` values as `INF`.

The main challenge is that edge weights can be negative. Since the graph is a DAG, I can solve the longest path problem efficiently using topological sorting and dynamic programming.

## Constraints

| Constraint                           | Description                           |
| ------------------------------------ | ------------------------------------- |
| `1 ≤ V ≤ 10³`                        | Number of vertices in the DAG         |
| `1 ≤ edges.size() ≤ V × (V - 1) / 2` | Number of directed edges              |
| `0 ≤ edges[i][0], edges[i][1] < V`   | Valid source and destination vertices |
| `-100 ≤ edges[i][2] ≤ 100`           | Weight of every edge                  |

## Intuition

I first noticed that this is a DAG, so there cannot be any cycle.

That makes the problem much easier than a general longest path problem. In a general graph, finding the longest path can be difficult because cycles can make the path continue indefinitely. Here, that problem does not exist.

My next observation was that I need to process a vertex only after the vertices before it have been handled. A topological order gives me exactly that.

Once I have the topological order, I can keep a `dist` array. For every edge `u -> v` with weight `w`, I try to improve the longest distance of `v` using:

`dist[v] = max(dist[v], dist[u] + w)`

This turns the problem into a simple dynamic programming problem over a DAG.

## Approach

I solve the problem in three main stages.

First, I build an adjacency list from the given edges. For every edge `[u, v, w]`, I store `v` and `w` under vertex `u`.

Second, I find a topological ordering using Kahn's algorithm. I calculate the indegree of every vertex and start with all vertices whose indegree is zero. I process them using a queue and gradually remove their outgoing edges.

Third, I calculate the longest distances. I initialize every distance to `INT_MIN` and set `dist[src] = 0`.

Then I traverse the vertices in topological order. For each reachable vertex `u`, I inspect every outgoing edge and try to update its destination:

`dist[v] = max(dist[v], dist[u] + w)`

Because the graph is acyclic, every predecessor of a vertex is processed before that vertex. This makes the dynamic programming update correct.

## Data Structures Used

| Data Structure    | Purpose                                                                        |
| ----------------- | ------------------------------------------------------------------------------ |
| Adjacency List    | Stores all outgoing edges and their weights efficiently                        |
| Indegree Array    | Stores the number of incoming edges for each vertex during topological sorting |
| Queue             | Used by Kahn's algorithm to process vertices with zero indegree                |
| Topological Order | Stores the order in which vertices should be processed                         |
| Distance Array    | Stores the longest distance from `src` to every vertex                         |

The adjacency list is especially useful because I only need to visit the edges that actually exist in the graph.

## Operations & Behavior Summary

The algorithm works like this:

1. Create an adjacency list for all vertices.
2. Store every edge along with its weight.
3. Calculate the indegree of every vertex.
4. Put all zero-indegree vertices into a queue.
5. Use Kahn's algorithm to generate a topological ordering.
6. Initialize all distances as unreachable.
7. Set the source distance to `0`.
8. Process vertices in topological order.
9. Skip a vertex if it is unreachable from the source.
10. For every outgoing edge, try to maximize the destination distance.
11. Return the final distance array.

The core dynamic programming rule is:

`dist[v] = max(dist[v], dist[u] + weight)`

## Complexity

| Type             | Complexity | Explanation                                                                      |
| ---------------- | ---------- | -------------------------------------------------------------------------------- |
| Time Complexity  | `O(V + E)` | Every vertex and every edge is processed a constant number of times              |
| Space Complexity | `O(V + E)` | The adjacency list stores all edges, while the other arrays require `O(V)` space |

Here, `V` is the number of vertices and `E` is the number of directed edges.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> maxDistance(int V, int src, vector<vector<int>> &edges) {
        // I store every outgoing edge as {destination, weight}.
        vector<vector<pair<int, int>>> adj(V);

        // I keep track of how many incoming edges each vertex has.
        vector<int> indegree(V, 0);

        // I build the adjacency list and calculate indegrees.
        for (auto &edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            // Add the directed edge u -> v with weight w.
            adj[u].push_back({v, w});

            // v has one more incoming edge.
            indegree[v]++;
        }

        // I use a queue for Kahn's topological sorting algorithm.
        queue<int> q;

        // Every vertex with no incoming edge can come first.
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        // This stores the final topological ordering.
        vector<int> topo;

        // I process vertices whose incoming edges are already handled.
        while (!q.empty()) {
            int u = q.front();
            q.pop();

            // Add the current vertex to the topological order.
            topo.push_back(u);

            // Remove u's outgoing edges one by one.
            for (auto &edge : adj[u]) {
                int v = edge.first;

                // One incoming edge of v has now been processed.
                indegree[v]--;

                // If no incoming edge remains, v is ready to process.
                if (indegree[v] == 0) {
                    q.push(v);
                }
            }
        }

        // I use INT_MIN to represent a vertex that is unreachable from src.
        vector<int> dist(V, INT_MIN);

        // The distance from the source to itself is always 0.
        dist[src] = 0;

        // I process vertices in topological order so every predecessor
        // is handled before its dependent vertex.
        for (int u : topo) {
            // I cannot relax edges from an unreachable vertex.
            if (dist[u] == INT_MIN) {
                continue;
            }

            // Try every outgoing edge from u.
            for (auto &edge : adj[u]) {
                int v = edge.first;
                int w = edge.second;

                // I keep the maximum distance found for v.
                dist[v] = max(dist[v], dist[u] + w);
            }
        }

        // Unreachable vertices remain INT_MIN as required.
        return dist;
    }
};
```

### Java

```java
class Solution {
    public int[] maxDistance(int V, int src, ArrayList<ArrayList<Integer>> edges) {
        // I create an adjacency list where each entry stores {destination, weight}.
        ArrayList<ArrayList<int[]>> adj = new ArrayList<>();

        // I initialize an empty list for every vertex.
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }

        // I store the number of incoming edges for every vertex.
        int[] indegree = new int[V];

        // I build the graph from the given edge list.
        for (ArrayList<Integer> edge : edges) {
            int u = edge.get(0);
            int v = edge.get(1);
            int w = edge.get(2);

            // Store destination and weight together.
            adj.get(u).add(new int[]{v, w});

            // v gets one additional incoming edge.
            indegree[v]++;
        }

        // I use a queue for Kahn's topological sorting algorithm.
        Queue<Integer> queue = new ArrayDeque<>();

        // Vertices with zero indegree can be processed first.
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        // This array will store the topological ordering.
        int[] topo = new int[V];

        // I keep track of how many vertices I have placed in topo.
        int index = 0;

        // I generate the topological order.
        while (!queue.isEmpty()) {
            int u = queue.poll();

            // Put the current vertex into the topological order.
            topo[index++] = u;

            // Process every outgoing edge of u.
            for (int[] edge : adj.get(u)) {
                int v = edge[0];

                // One incoming edge of v has been removed.
                indegree[v]--;

                // When v has no remaining incoming edges, it is ready.
                if (indegree[v] == 0) {
                    queue.offer(v);
                }
            }
        }

        // I use Integer.MIN_VALUE to represent an unreachable vertex.
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MIN_VALUE);

        // The source has distance 0 from itself.
        dist[src] = 0;

        // I relax edges in topological order.
        for (int i = 0; i < V; i++) {
            int u = topo[i];

            // I cannot calculate anything from a vertex that is unreachable.
            if (dist[u] == Integer.MIN_VALUE) {
                continue;
            }

            // Try to improve the longest distance of every neighbor.
            for (int[] edge : adj.get(u)) {
                int v = edge[0];
                int w = edge[1];

                // Keep the largest distance reaching v.
                dist[v] = Math.max(dist[v], dist[u] + w);
            }
        }

        // Unreachable vertices still contain Integer.MIN_VALUE.
        return dist;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxDistance(V, src, edges) {
        // I store outgoing edges as [destination, weight].
        const adj = Array.from({ length: V }, () => []);

        // I store the number of incoming edges for every vertex.
        const indegree = new Array(V).fill(0);

        // I build the adjacency list and calculate indegrees.
        for (const edge of edges) {
            const u = edge[0];
            const v = edge[1];
            const w = edge[2];

            // Store the destination and weight of u -> v.
            adj[u].push([v, w]);

            // v gets one more incoming edge.
            indegree[v]++;
        }

        // I use an array as a queue for Kahn's algorithm.
        const queue = [];

        // I add all vertices with zero indegree.
        for (let i = 0; i < V; i++) {
            if (indegree[i] === 0) {
                queue.push(i);
            }
        }

        // I store the vertices in topological order here.
        const topo = [];

        // This pointer avoids repeatedly removing elements from the front,
        // which would make an array queue slower.
        let front = 0;

        // I generate the topological ordering.
        while (front < queue.length) {
            const u = queue[front++];

            // Add u to the topological order.
            topo.push(u);

            // Process all outgoing edges from u.
            for (const [v] of adj[u]) {
                // One incoming edge of v has now been processed.
                indegree[v]--;

                // v becomes ready when all its incoming edges are processed.
                if (indegree[v] === 0) {
                    queue.push(v);
                }
            }
        }

        // Number.MAX_SAFE_INTEGER is large enough for the given constraints,
        // so I use its negative value as the unreachable marker.
        const NEG_INF = Number.MIN_SAFE_INTEGER;

        // Initially every vertex is unreachable.
        const dist = new Array(V).fill(NEG_INF);

        // The source starts with distance 0.
        dist[src] = 0;

        // I process vertices in topological order.
        for (const u of topo) {
            // There is nothing to relax from an unreachable vertex.
            if (dist[u] === NEG_INF) {
                continue;
            }

            // Try every outgoing edge from u.
            for (const [v, w] of adj[u]) {
                // Keep the longest distance found for v.
                dist[v] = Math.max(dist[v], dist[u] + w);
            }
        }

        // Unreachable vertices remain NEG_INF.
        return dist;
    }
}
```

### Python3

```python
class Solution:
    def maxDistance(self, V, src, edges):
        # I store outgoing edges as (destination, weight).
        adj = [[] for _ in range(V)]

        # I keep the number of incoming edges for every vertex.
        indegree = [0] * V

        # I build the adjacency list and calculate indegrees.
        for u, v, w in edges:
            # Store the edge u -> v with weight w.
            adj[u].append((v, w))

            # v has one more incoming edge.
            indegree[v] += 1

        # I use a list as a queue for Kahn's topological sorting.
        queue = []

        # Every vertex with zero incoming edges can come first.
        for i in range(V):
            if indegree[i] == 0:
                queue.append(i)

        # This pointer lets me use the list as a queue in O(1) per operation.
        front = 0

        # I will store the topological ordering here.
        topo = []

        # I generate the topological order.
        while front < len(queue):
            u = queue[front]
            front += 1

            # Add the current vertex to the ordering.
            topo.append(u)

            # Process every outgoing edge from u.
            for v, _ in adj[u]:
                # One incoming edge of v has been processed.
                indegree[v] -= 1

                # v is ready when no incoming edge remains.
                if indegree[v] == 0:
                    queue.append(v)

        # I use negative infinity to represent an unreachable vertex.
        dist = [float('-inf')] * V

        # The distance from the source to itself is 0.
        dist[src] = 0

        # I process vertices in topological order.
        for u in topo:
            # I cannot relax edges from a vertex that cannot be reached.
            if dist[u] == float('-inf'):
                continue

            # Try every outgoing edge from u.
            for v, w in adj[u]:
                # Keep the largest distance reaching v.
                dist[v] = max(dist[v], dist[u] + w)

        # Convert unreachable vertices to INT_MIN as required by the problem.
        for i in range(V):
            if dist[i] == float('-inf'):
                dist[i] = -2147483648

        # Return the longest distance from src to every vertex.
        return dist
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The main algorithm is the same in all four languages. Only the syntax and a few implementation details are different.

### 1. Build the graph

I convert the edge list into an adjacency list.

For an edge:

`[u, v, w]`

I store something equivalent to:

`u -> (v, w)`

This lets me quickly find every edge leaving `u`.

At the same time, I increase the indegree of `v`. I need this later for topological sorting.

### 2. Find the topological order

I use Kahn's algorithm.

I first put every vertex with indegree `0` into a queue. These vertices have no dependencies, so they can safely appear at the beginning of the topological order.

Then I repeatedly:

* Remove a vertex from the queue.
* Add it to the topological order.
* Visit all of its outgoing edges.
* Decrease the indegree of each neighbor.
* Add a neighbor to the queue when its indegree becomes `0`.

Because the input is guaranteed to be a DAG, this process can produce a valid topological ordering containing all vertices.

### 3. Initialize the distance array

I need to distinguish reachable and unreachable vertices.

So I initialize every distance to `INT_MIN` or its language equivalent.

Then I set:

`dist[src] = 0`

This means the source is reachable from itself with distance zero.

This initialization is important because negative edge weights are allowed. I cannot use `0` as the default value for every vertex, because that could incorrectly make an unreachable vertex look like it has a valid path.

### 4. Process vertices in topological order

Now I go through the topological order from left to right.

Suppose the current vertex is `u`.

If `u` is still unreachable, I skip it. There is no valid path from the source to `u`, so using `dist[u]` to update another vertex would be incorrect.

For a reachable `u`, I inspect each outgoing edge:

`u -> v` with weight `w`

The distance through this edge is:

`dist[u] + w`

I compare it with the best distance currently stored for `v`.

The update is:

`dist[v] = max(dist[v], dist[u] + w)`

This is the main longest path dynamic programming step.

### 5. Why topological ordering works

Suppose there are edges:

`0 -> 1`

and:

`1 -> 2`

A topological ordering will place `0` before `1`, and `1` before `2`.

So when I process `2`, the best possible distance reaching `1` has already been calculated.

This is exactly what I need for dynamic programming.

Without topological ordering, I might process a vertex before some of its predecessors and miss a better path.

### 6. Handling negative weights

Negative weights are completely valid here.

For example, consider:

`0 -> 1` with weight `5`

and:

`1 -> 2` with weight `-3`

The distance to vertex `2` becomes:

`5 + (-3) = 2`

The algorithm still works because it is not relying on edge weights being positive.

The important property is that the graph is acyclic.

### 7. C++ implementation details

In C++, I use:

* `vector<vector<pair<int, int>>>` for the adjacency list.
* `vector<int>` for indegrees, topological order, and distances.
* `queue<int>` for Kahn's algorithm.
* `INT_MIN` as the unreachable value.

The adjacency list avoids scanning all possible pairs of vertices. I only process edges that actually exist.

### 8. Java implementation details

In Java, I use:

* `ArrayList` for the adjacency list.
* `int[]` for indegrees and distances.
* `ArrayDeque` as the queue.
* `Integer.MIN_VALUE` as the unreachable marker.

Using `ArrayDeque` is a good fit for queue operations because adding and removing elements from it is efficient.

### 9. JavaScript implementation details

In JavaScript, I use:

* Nested arrays for the adjacency list.
* An array for the queue.
* A separate `front` pointer instead of repeatedly using `shift()`.

Using `shift()` can be inefficient because remaining array elements may need to be moved. The `front` pointer lets me treat the array as a queue without repeatedly removing elements from the beginning.

For the unreachable value, I use a sufficiently small numeric sentinel.

### 10. Python3 implementation details

In Python, I use:

* A list of lists for the adjacency list.
* A list for indegrees.
* A list as the queue with a `front` index.
* `float('-inf')` internally to represent unreachable states.

I use a `front` index instead of `pop(0)` because repeatedly removing the first element of a Python list can be expensive.

Before returning, unreachable values are converted to `-2147483648`, which matches the required `INT_MIN` representation.

### 11. Why I do not use Dijkstra

Dijkstra's algorithm is mainly used for shortest paths with non-negative edge weights.

This problem is asking for the longest path in a DAG, and negative weights are allowed.

The DAG property gives me a better solution: topological sorting followed by dynamic programming.

That gives an optimal `O(V + E)` solution.

### 12. Why this solution is efficient

The graph is processed in linear time.

I visit every vertex while generating the topological order.

I also inspect every edge while building and processing the graph.

There is no repeated search from the source and no need to explore the same edge many times.

That is why the final complexity is:

`O(V + E)`

which is the expected efficient solution for this problem.

## Examples

### Example 1

**Input**

```text
V = 4
src = 0
edges = [[0,1,1], [0,2,1], [1,2,5], [3,1,2], [3,2,-1]]
```

**Expected Output**

```text
[0, 1, 6, INT_MIN]
```

The source is vertex `0`.

From `0` to `1`, the distance is `1`.

There are two possible paths to vertex `2`:

`0 -> 2` with distance `1`

and:

`0 -> 1 -> 2` with distance:

`1 + 5 = 6`

So the longest distance to `2` is `6`.

Vertex `3` cannot be reached from `0`, so it remains `INT_MIN`.

### Example 2

**Input**

```text
V = 5
src = 1
edges = [[0,1,1], [0,2,2], [1,4,4], [3,2,-1], [4,2,3], [4,3,6]]
```

**Expected Output**

```text
[INT_MIN, 0, 9, 10, 4]
```

Starting from vertex `1`:

`dist[1] = 0`

From `1 -> 4` with weight `4`:

`dist[4] = 4`

From `4 -> 2` with weight `3`:

`dist[2] = 7`

From `4 -> 3` with weight `6`:

`dist[3] = 10`

Then from `3 -> 2` with weight `-1`:

`dist[2] = max(7, 10 - 1) = 9`

Vertex `0` is unreachable from `1`, so its value remains `INT_MIN`.

### Example 3

**Input**

```text
V = 3
src = 0
edges = [[0,1,-5], [1,2,-2]]
```

**Expected Output**

```text
[0, -5, -7]
```

Here all edges have negative weights.

The path from `0` to `1` has distance `-5`.

The path from `0` to `2` is:

`0 -> 1 -> 2`

with total distance:

`-5 + (-2) = -7`

This example shows why I cannot initialize every distance with `0`. A valid longest path can have a negative value.

## How to Use / Run Locally

The GeeksforGeeks version of this problem provides the required `Solution` class and function signature. If I copy the solution directly into a GeeksforGeeks submission, I only need to paste the implementation into the provided class.

For local testing, I can wrap the same logic inside a small driver program.

### C++

Save the file as:

```text
solution.cpp
```

Compile it with:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it with:

```bash
./solution
```

On Windows, the generated executable can be run with:

```bash
solution.exe
```

### Java

Save the file as:

```text
Solution.java
```

Compile it with:

```bash
javac Solution.java
```

Run it with:

```bash
java Solution
```

For local testing, add a `main` method to create the graph, call `maxDistance`, and print the returned array.

### JavaScript

Save the file as:

```text
solution.js
```

Make sure Node.js is installed.

Run:

```bash
node solution.js
```

You can create an instance of the `Solution` class and pass `V`, `src`, and `edges` to test the result.

### Python3

Save the file as:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

For testing, add a small driver section that creates the input graph, calls `maxDistance`, and prints the result.

## Notes & Optimizations

The most important observation is that this solution depends on the graph being a DAG. The same topological dynamic programming method should not be used on a general directed graph with cycles.

The graph can contain negative edge weights, and that is completely fine.

I use `INT_MIN` for unreachable vertices instead of `0`. This matters because a real longest path can have a negative distance.

I also avoid calculating `dist[u] + w` when `u` is unreachable. This prevents the unreachable marker from being accidentally treated as a real path value.

An alternative way to find the longest path in a DAG is to use DFS with memoization. That can also achieve `O(V + E)`, but the topological sorting approach is straightforward and works well with the expected GeeksforGeeks constraints.

For JavaScript and Python, using an index-based queue is preferable to repeatedly removing the first element from an array.

Overall, topological sort plus dynamic programming is the key pattern to remember for longest path problems in a Directed Acyclic Graph.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
