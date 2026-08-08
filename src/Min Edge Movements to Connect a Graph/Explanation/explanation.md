# Min Edge Movements to Connect a Graph

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

The problem gives me an undirected graph with `n` vertices and `m` edges.

In one operation, I can remove an existing edge from anywhere in the graph and add that same edge between any two vertices.

My goal is to make the entire graph connected using the minimum possible number of operations.

If it is impossible to connect all the vertices, I need to return `-1`.

The main things I need to determine are:

* Whether the graph has enough edges to become connected.
* How many connected components currently exist.
* How many edge movements are needed to connect those components.

If there are `k` connected components, I need exactly `k - 1` operations to connect them.

For this problem, I use the **Disjoint Set Union (DSU)** data structure, also known as **Union-Find**, to efficiently find connected components.

This makes the solution suitable for large graphs and the given constraints.

## Constraints

* `1 <= n <= 10^5`
* `1 <= m <= 10^5`
* `edges[i].length = 2`
* `edges[i][0] < n`
* `edges[i][1] < n`
* `edges.length <= m`
* There are no multiple edges in the graph.

## Intuition

I first noticed that moving an edge does not change the total number of edges in the graph.

So, if I have fewer than `n - 1` edges, there is no way to connect `n` vertices. A connected graph always needs at least `n - 1` edges.

That gives me the first condition:

`m < n - 1` means the answer is `-1`.

If there are enough edges, the next thing I care about is the number of disconnected components.

For example, if the graph currently has four components:

```text
Component 1    Component 2    Component 3    Component 4
```

I need three new connections to turn them into one connected graph.

So the number of required operations is:

`components - 1`

The remaining problem is simply finding the number of connected components efficiently.

I use DSU because it lets me merge two connected components and quickly find which component a vertex belongs to.

## Approach

I solve the problem in three main steps.

First, I count the number of edges.

If there are fewer than `n - 1` edges, I immediately return `-1`.

Second, I initialize DSU.

Initially, every vertex is considered a separate component. For every edge `[u, v]`, I merge the components containing `u` and `v`.

I use **path compression** while finding the parent of a vertex. I also use **union by size** while merging components. These two optimizations keep DSU operations very fast.

Finally, I count how many component representatives remain.

If there are `k` components, I return:

`k - 1`

This works because every operation can use one existing edge to connect two currently separate components.

## Data Structures Used

### Disjoint Set Union

I use a **Disjoint Set Union**, also called **DSU** or **Union-Find**.

It helps me maintain groups of connected vertices while processing the edges.

DSU mainly supports two operations:

* `find(x)` finds the representative of the component containing `x`.
* `union(a, b)` merges the components containing `a` and `b`.

### Parent Array

The `parent` array stores the parent of every vertex in the DSU structure.

Initially:

`parent[i] = i`

This means every vertex starts as its own component.

### Size Array

The `size` array stores the size of each DSU component.

I use it for **union by size**, which means I attach the smaller component to the larger component.

This helps keep the DSU tree shallow and improves performance.

## Operations & Behavior Summary

The algorithm behaves like this:

1. Count the number of edges.
2. If `m < n - 1`, return `-1`.
3. Create a DSU for all `n` vertices.
4. Initially treat every vertex as a separate component.
5. Process every edge.
6. Find the component representatives of both endpoints.
7. If they belong to different components, merge them.
8. After all edges are processed, count the remaining component representatives.
9. If there are `k` components, return `k - 1`.

In simple pseudocode:

```text
if number of edges < n - 1:
    return -1

create DSU with n vertices

for every edge (u, v):
    merge(u, v)

count the number of components

return components - 1
```

## Complexity

| Complexity       |                Cost | Explanation                                                                                                                                |
| ---------------- | ------------------: | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Time Complexity  | `O((n + m) × α(n))` | `n` is the number of vertices, `m` is the number of edges, and `α(n)` is the inverse Ackermann function from the optimized DSU operations. |
| Space Complexity |              `O(n)` | I store the `parent` and `size` arrays for all `n` vertices.                                                                               |

Since `α(n)` grows extremely slowly, optimized DSU operations are effectively constant time for practical input sizes.

The overall solution is efficient enough for `n, m <= 10^5`.

## Multi-language Solutions

### C++

```cpp
class Solution {
    vector<int> parent, sz;

    // Find the representative of a component.
    // Path compression makes future find operations faster.
    int find(int x) {
        if (parent[x] == x)
            return x;

        // Point x directly to the component representative.
        return parent[x] = find(parent[x]);
    }

    // Merge the components containing a and b.
    // Union by size keeps the DSU tree shallow.
    void unite(int a, int b) {
        a = find(a);
        b = find(b);

        // They are already in the same component, so nothing changes.
        if (a == b)
            return;

        // Attach the smaller component below the larger component.
        if (sz[a] < sz[b])
            swap(a, b);

        // Make a the parent of b and update the component size.
        parent[b] = a;
        sz[a] += sz[b];
    }

  public:
    int minEdgesReq(int n, vector<vector<int>>& edges) {
        // m is the total number of edges available for the graph.
        int m = edges.size();

        // A connected graph with n vertices needs at least n - 1 edges.
        // If fewer edges exist, connecting all vertices is impossible.
        if (m < n - 1)
            return -1;

        // Initially, every vertex is its own connected component.
        parent.resize(n);
        sz.assign(n, 1);

        // Set every vertex as its own parent.
        for (int i = 0; i < n; i++)
            parent[i] = i;

        // Join the endpoints of every existing edge.
        for (auto &edge : edges) {
            int u = edge[0];
            int v = edge[1];

            // Merge their connected components.
            unite(u, v);
        }

        // Start with zero components and count each unique representative.
        int components = 0;

        // A vertex is a component representative if it is its own parent.
        for (int i = 0; i < n; i++) {
            if (find(i) == i)
                components++;
        }

        // Connecting k components needs exactly k - 1 edge movements.
        return components - 1;
    }
};
```

### Java

```java
class Solution {
    int[] parent;
    int[] size;

    // Find the representative of a component.
    // Path compression makes repeated find operations very fast.
    int find(int x) {
        if (parent[x] == x)
            return x;

        // Point x directly to the component representative.
        return parent[x] = find(parent[x]);
    }

    // Merge the components containing a and b.
    // Union by size keeps the DSU tree shallow.
    void unite(int a, int b) {
        a = find(a);
        b = find(b);

        // They are already connected, so no merge is needed.
        if (a == b)
            return;

        // Always attach the smaller component to the larger one.
        if (size[a] < size[b]) {
            int temp = a;
            a = b;
            b = temp;
        }

        // Make a the parent of b and update the size.
        parent[b] = a;
        size[a] += size[b];
    }

    int minEdgesReq(int n, int[][] edges) {
        // Count the number of available edges.
        int m = edges.length;

        // At least n - 1 edges are required to connect n vertices.
        if (m < n - 1)
            return -1;

        // Create the DSU arrays for all vertices.
        parent = new int[n];
        size = new int[n];

        // Initially, every vertex forms its own component.
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }

        // Process every edge and merge its two endpoints.
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];

            // Join the components containing u and v.
            unite(u, v);
        }

        // Count how many different connected components remain.
        int components = 0;

        // Every vertex that is its own parent represents one component.
        for (int i = 0; i < n; i++) {
            if (find(i) == i)
                components++;
        }

        // k components require k - 1 movements to become one component.
        return components - 1;
    }
}
```

### JavaScript

```javascript
class Solution {
    constructor() {
        // These arrays store the DSU parent and component size.
        this.parent = [];
        this.size = [];
    }

    // Find the representative of a component.
    // Path compression makes future find operations faster.
    find(x) {
        if (this.parent[x] === x)
            return x;

        // Connect x directly to the component representative.
        this.parent[x] = this.find(this.parent[x]);

        return this.parent[x];
    }

    // Merge the components containing a and b.
    // Union by size keeps the tree height small.
    unite(a, b) {
        a = this.find(a);
        b = this.find(b);

        // They already belong to the same component.
        if (a === b)
            return;

        // Attach the smaller component below the larger component.
        if (this.size[a] < this.size[b]) {
            [a, b] = [b, a];
        }

        // Merge b into a and update the component size.
        this.parent[b] = a;
        this.size[a] += this.size[b];
    }

    minEdgesReq(n, edges) {
        // Count the total number of available edges.
        const m = edges.length;

        // A connected graph with n vertices requires at least n - 1 edges.
        if (m < n - 1)
            return -1;

        // Initialize the DSU arrays.
        this.parent = new Array(n);
        this.size = new Array(n);

        // Initially, every vertex is a separate component.
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.size[i] = 1;
        }

        // Process every edge and merge its endpoints.
        for (const edge of edges) {
            const u = edge[0];
            const v = edge[1];

            // Join the components containing u and v.
            this.unite(u, v);
        }

        // Count the number of remaining connected components.
        let components = 0;

        // A vertex that is its own parent represents one component.
        for (let i = 0; i < n; i++) {
            if (this.find(i) === i)
                components++;
        }

        // Connecting k components needs exactly k - 1 movements.
        return components - 1;
    }
}
```

### Python3

```python
class Solution:
    def minEdgesReq(self, n, edges):
        # m is the number of edges currently present in the graph.
        m = len(edges)

        # A connected graph with n vertices needs at least n - 1 edges.
        # With fewer edges, it is impossible to connect every vertex.
        if m < n - 1:
            return -1

        # parent[i] stores the parent of vertex i in the DSU tree.
        parent = list(range(n))

        # size[i] stores the size of the component represented by i.
        # It is used to keep the DSU tree shallow.
        size = [1] * n

        def find(x):
            # If x is its own parent, x is the component representative.
            if parent[x] == x:
                return x

            # Path compression connects x directly to the representative.
            parent[x] = find(parent[x])

            # Return the representative after compression.
            return parent[x]

        def unite(a, b):
            # Find the representatives of both components.
            a = find(a)
            b = find(b)

            # If both vertices already belong to the same component,
            # this edge does not create a new component connection.
            if a == b:
                return

            # Make a represent the larger component.
            if size[a] < size[b]:
                a, b = b, a

            # Attach the smaller component b below a.
            parent[b] = a

            # Update the size of the merged component.
            size[a] += size[b]

        # Process every edge and merge its two endpoints.
        for u, v in edges:
            unite(u, v)

        # Count the number of connected components.
        components = 0

        # A vertex that is its own parent is a component representative.
        for i in range(n):
            if find(i) == i:
                components += 1

        # If there are k components, k - 1 movements connect them all.
        return components - 1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same in all four languages. Only the syntax and array handling are different.

### Step 1: Check whether connecting the graph is possible

I first check whether the graph contains at least `n - 1` edges.

For `n` vertices, a connected graph needs at least `n - 1` edges.

For example, with 5 vertices, I need at least 4 edges:

```text
0 -- 1 -- 2 -- 3 -- 4
```

If the input contains only 3 edges, no amount of moving those 3 edges can create a connected graph containing all 5 vertices.

Therefore:

```text
m < n - 1
```

means I return `-1`.

This check also saves unnecessary DSU processing when the answer is already impossible.

### Step 2: Initialize DSU

I create a DSU containing all vertices from `0` to `n - 1`.

Initially, every vertex is separate.

For example:

```text
0    1    2    3
```

There are four components.

The parent relationship starts as:

```text
0 -> 0
1 -> 1
2 -> 2
3 -> 3
```

Each vertex is its own representative.

### Step 3: Process every edge

For every edge `[u, v]`, I find the representatives of `u` and `v`.

If the representatives are different, the two vertices belong to different components, so I merge those components.

For example, if I process:

```text
[0, 1]
```

then vertices `0` and `1` become part of the same component.

If I later process:

```text
[1, 2]
```

then the component containing `1` is merged with the component containing `2`.

The graph components gradually become larger.

### Step 4: Path compression

The `find` operation uses path compression.

Without path compression, a DSU tree could become unnecessarily deep.

Path compression makes a vertex point directly toward the component representative after a `find` operation.

This makes future searches much faster.

It is especially useful because the graph can contain up to `10^5` vertices and `10^5` edges.

### Step 5: Union by size

When two different components are merged, I compare their sizes.

I attach the smaller component to the larger one.

For example, if one component has 8 vertices and another has 2 vertices, I attach the component of size 2 below the component of size 8.

This keeps the DSU structure balanced.

Together, path compression and union by size give the optimized DSU complexity of approximately constant time per operation.

### Step 6: Count connected components

After processing every edge, I count how many vertices are still their own DSU representative.

If a vertex satisfies:

```text
parent[i] == i
```

it represents one connected component.

Suppose the final graph has:

```text
Component A = {0, 1, 2}
Component B = {3, 4}
Component C = {5}
```

Then there are 3 components.

### Step 7: Calculate the answer

If there are `k` connected components, I need `k - 1` connections to combine them into one.

For 3 components:

```text
A + B -> 1 operation
AB + C -> 1 operation
```

So the total is:

```text
3 - 1 = 2
```

The answer is therefore `components - 1`.

### C++ behavior

In C++, I use `vector<int>` for the DSU arrays and `vector<vector<int>>` for the edge list.

The DSU operations are implemented as helper functions inside the `Solution` class.

C++ gives direct and efficient access to the arrays, making this implementation suitable for the given limits.

### Java behavior

In Java, the same DSU idea is implemented using integer arrays.

`int[] parent` stores the representatives and `int[] size` stores component sizes.

The edge list is provided as `int[][]`.

The algorithm itself does not change.

### JavaScript behavior

In JavaScript, I use standard arrays for `parent` and `size`.

The edge list contains arrays such as `[u, v]`.

The same path compression and union-by-size logic is used. JavaScript array operations are sufficient for the given constraints.

### Python3 behavior

In Python, I use lists for `parent` and `size`.

The edge list can be processed directly with:

```text
for u, v in edges
```

The nested `find` and `union` functions keep the DSU implementation compact while preserving the same optimized logic.

## Examples

### Example 1

Input:

```text
n = 4
edges = [[0, 1], [0, 2], [1, 2]]
```

The graph initially looks like:

```text
0 ----- 1
|     /
|   /
2

3
```

Vertices `0`, `1`, and `2` belong to one component.

Vertex `3` is alone.

So there are 2 components.

Required operations:

```text
2 - 1 = 1
```

Expected Output:

```text
1
```

I can move one existing edge from the first component and use it to connect vertex `3`.

### Example 2

Input:

```text
n = 6
edges = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]]
```

After processing all edges:

```text
Component 1 = {0, 1, 2, 3}
Component 2 = {4}
Component 3 = {5}
```

There are 3 components.

Therefore:

```text
3 - 1 = 2
```

Expected Output:

```text
2
```

Two existing edges can be moved to connect vertex `4` and vertex `5`.

### Example 3

Input:

```text
n = 5
edges = [[0, 1], [1, 2]]
```

There are only 2 edges.

But 5 vertices need at least:

```text
5 - 1 = 4
```

edges to form a connected graph.

Since:

```text
2 < 4
```

it is impossible.

Expected Output:

```text
-1
```

## How to Use / Run Locally

The repository contains the solution logic for C++, Java, JavaScript, and Python3. The exact execution method depends on how the solution is wrapped in the local driver code.

### C++

Save the solution and your test driver in a file such as:

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

On Windows, run:

```bash
solution.exe
```

### Java

Save the solution and test driver in:

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

### JavaScript

Save the JavaScript solution in:

```text
solution.js
```

Make sure Node.js is installed, then run:

```bash
node solution.js
```

### Python3

Save the Python solution in:

```text
solution.py
```

Run it with:

```bash
python3 solution.py
```

For online judges such as GeeksforGeeks, the platform usually provides the input handling and calls the required `Solution` class method directly. In that case, I only need to submit the required class and function.

## Notes & Optimizations

The most important edge case is when the graph has fewer than `n - 1` edges. In that situation, the answer is always `-1`.

If `n = 1`, the graph already contains only one vertex, so there is only one connected component. The formula gives:

```text
1 - 1 = 0
```

which is correct.

Another important point is that I do not need to explicitly identify which edges should be moved. The problem only asks for the minimum number of operations.

Counting the connected components is enough.

I also do not need to build a separate adjacency list. DSU can process every edge directly, which keeps the extra space at `O(n)`.

A DFS or BFS could also be used to count connected components. That would still give an `O(n + m)` solution, but DSU is a natural fit here because the problem directly involves repeatedly joining groups of vertices.

The combination of path compression and union by size is important for keeping DSU efficient.

The key observations to remember are:

* A connected graph with `n` vertices needs at least `n - 1` edges.
* If there are fewer than `n - 1` edges, return `-1`.
* If there are `k` connected components, exactly `k - 1` connections are required.
* DSU efficiently finds and merges connected components.
* Extra edges inside already connected components can be moved to connect separate components.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
