# Minimum Operations to Connect Hospitals

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

I’m given an undirected network of `V` hospitals (numbered from `0` to `V-1`) and a list of connections `edges`, where each edge `[u, v]` means there is a direct connection between hospital `u` and `v`.

In **one operation**, I’m allowed to:

> remove any existing connection and reconnect it between **two hospitals that are currently not directly or indirectly connected**.

My task is to find the **minimum number of operations** required so that **all hospitals become connected** (directly or indirectly).

If it is **impossible** to connect all hospitals into a single network (even after rewiring), I must return `-1`.

---

## Constraints

(As in a typical GeeksforGeeks version of this problem)

* `1 ≤ V` (number of hospitals)
* `0 ≤ E ≤ V * (V - 1) / 2` (number of connections)
* `0 ≤ edges[i][0], edges[i][1] < V`
* Graph is undirected and may contain multiple components.

The constraints allow up to large `V`, so I need an **O(V + E)** solution.

---

## Intuition

I started by thinking about a basic property of connected graphs:

> To connect `V` nodes in a single connected component, **I need at least `V - 1` edges** (like a tree).

So my first thought was:

1. If the total number of edges `E` is **less than `V - 1`**, then even if I keep rewiring, I’ll never be able to make the network fully connected → **impossible**, return `-1`.

Once I know I have **enough edges**, the next question is:

> How many disconnected **groups** (components) of hospitals are there right now?

If there are `components` separate groups, I know I need at least `components - 1` new connections between different groups to join everything into a single group.

Because the problem allows me to **remove** edges and **reconnect** them elsewhere, as long as I have at least `V - 1` edges overall, I can always “borrow” some extra edges from inside components (where there might be cycles) and use them to connect different components.

So the core idea becomes:

* **Step 1:** Check `E >= V - 1`
* **Step 2:** Count connected components
* **Step 3:** Answer = `components - 1`

To count components efficiently for large graphs, I decided to use **Disjoint Set Union (Union–Find)**.

---

## Approach

1. **Count number of edges `E`**

   * If `E < V - 1` → return `-1` immediately.

2. **Initialize Disjoint Set Union (DSU)**

   * Each node starts as its own parent (own component).
   * Maintain:

     * `parent[i]` → representative of the component containing node `i`.
     * `size[i]` (or `rank[i]`) → size of the component for union by size.

3. **Union all edges**

   * For every edge `[u, v]`:

     * Find leaders of `u` and `v` using `find()` with path compression.
     * If leaders are different, union their sets.

4. **Count connected components**

   * After processing all edges, loop through all nodes.
   * Every node `i` where `find(i) == i` is a component leader.
   * Count them → `components`.

5. **Compute result**

   * Minimum operations needed = `components - 1`.

Why this works:

* I first ensure that there are **enough total edges** (`E ≥ V - 1`).
* With that many edges, it’s always possible to rearrange some edges so that we connect all components.
* To merge `components` components into 1, I need exactly `components - 1` “bridges” between them.

---

## Data Structures Used

* **Disjoint Set Union (DSU) / Union–Find**

  * `parent[]` array to track each node’s leader.
  * `size[]` (or `rank[]`) array to keep union operations balanced.
  * Operations:

    * `find(x)` with **path compression**.
    * `union(a, b)` with **union by size/rank**.

This structure gives almost constant-time operations for union and find.

---

## Operations & Behavior Summary

1. **find(x)**

   * Returns the leader of the component that `x` belongs to.
   * Compresses paths so next calls are faster.

2. **union(a, b)**

   * Joins the components containing `a` and `b`.
   * If already in the same component, does nothing.
   * Uses component size to attach the smaller tree under the larger tree.

3. **Counting components**

   * After all unions, I count how many distinct leaders exist.
   * Leaders are nodes where `parent[i] == i`.

4. **Main logic**

   * If not enough edges → return `-1`.
   * Else → return `components - 1`.

---

## Complexity

Let:

* `V` = number of hospitals (nodes).
* `E` = number of connections (edges).

**Time Complexity:**

* Initial DSU setup: `O(V)`
* Processing all edges with union–find: `O(E * α(V))`

  * `α(V)` is the inverse Ackermann function, which is practically constant.
* Counting components: `O(V)`

So total is:

> **O(V + E)**

**Space Complexity:**

* DSU arrays: `parent[]`, `size[]` → both of length `V`.
* No extra heavy structures.

So space usage is:

> **O(V)**

---

## Multi-language Solutions

### C++

```c++
class Solution {
  public:
    int minConnect(int V, vector<vector<int>>& edges) {
        int E = edges.size();
        
        // If there are fewer than V-1 edges, it's impossible to connect all hospitals
        if (E < V - 1) return -1;
        
        // Disjoint Set Union (Union-Find) setup
        vector<int> parent(V), sz(V, 1);
        for (int i = 0; i < V; i++) parent[i] = i;
        
        // Find with path compression
        function<int(int)> find = [&](int x) -> int {
            if (parent[x] == x) return x;
            return parent[x] = find(parent[x]);  // path compression
        };
        
        // Union by size
        auto unite = [&](int a, int b) {
            a = find(a);
            b = find(b);
            if (a == b) return;  // already in same component
            if (sz[a] < sz[b]) swap(a, b);
            parent[b] = a;
            sz[a] += sz[b];
        };
        
        // Process all edges
        for (auto &e : edges) {
            int u = e[0];
            int v = e[1];
            unite(u, v);
        }
        
        // Count connected components
        int components = 0;
        for (int i = 0; i < V; i++) {
            if (find(i) == i) components++;
        }
        
        // Minimum operations to connect all components into one
        return components - 1;
    }
};
```

---

### Java

```java
class Solution {
    public int minConnect(int V, int[][] edges) {
        int E = edges.length;
        
        // Not enough edges to ever connect all nodes
        if (E < V - 1) return -1;
        
        int[] parent = new int[V];
        int[] size = new int[V];
        
        // Initialize DSU
        for (int i = 0; i < V; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        
        // Find with path compression
        java.util.function.IntUnaryOperator find = new java.util.function.IntUnaryOperator() {
            @Override
            public int applyAsInt(int x) {
                if (parent[x] == x) return x;
                parent[x] = applyAsInt(parent[x]);
                return parent[x];
            }
        };
        
        // Union by size
        java.util.function.BiConsumer<Integer, Integer> unite = (aObj, bObj) -> {
            int a = aObj, b = bObj;
            a = find.applyAsInt(a);
            b = find.applyAsInt(b);
            if (a == b) return;
            if (size[a] < size[b]) {
                int temp = a; a = b; b = temp;
            }
            parent[b] = a;
            size[a] += size[b];
        };
        
        // Process edges
        for (int[] e : edges) {
            int u = e[0];
            int v = e[1];
            unite.accept(u, v);
        }
        
        // Count components
        int components = 0;
        for (int i = 0; i < V; i++) {
            if (find.applyAsInt(i) == i) components++;
        }
        
        return components - 1;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {number}
 */
class Solution {
    minConnect(V, edges) {
        const E = edges.length;
        
        // If we don't have at least V-1 edges, impossible to connect all hospitals
        if (E < V - 1) return -1;
        
        // DSU arrays
        const parent = new Array(V);
        const size = new Array(V).fill(1);
        for (let i = 0; i < V; i++) parent[i] = i;
        
        // Find with path compression
        const find = (x) => {
            if (parent[x] === x) return x;
            parent[x] = find(parent[x]);
            return parent[x];
        };
        
        // Union by size
        const unite = (a0, b0) => {
            let a = find(a0);
            let b = find(b0);
            if (a === b) return;
            if (size[a] < size[b]) {
                const tmp = a; a = b; b = tmp;
            }
            parent[b] = a;
            size[a] += size[b];
        };
        
        // Process all edges
        for (const [u, v] of edges) {
            unite(u, v);
        }
        
        // Count number of connected components
        let components = 0;
        for (let i = 0; i < V; i++) {
            if (find(i) === i) components++;
        }
        
        // We need components - 1 operations
        return components - 1;
    }
}
```

---

### Python3

```python
class Solution:
    def minConnect(self, V, edges):
        E = len(edges)
        
        # If there are fewer than V-1 edges, it's impossible
        if E < V - 1:
            return -1
        
        # DSU setup
        parent = list(range(V))
        size = [1] * V
        
        # Find with path compression
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        # Union by size
        def unite(a, b):
            a = find(a)
            b = find(b)
            if a == b:
                return
            if size[a] < size[b]:
                a, b = b, a
            parent[b] = a
            size[a] += size[b]
        
        # Process all edges
        for u, v in edges:
            unite(u, v)
        
        # Count connected components
        components = 0
        for i in range(V):
            if find(i) == i:
                components += 1
        
        # Minimum operations needed
        return components - 1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all languages; only syntax changes.
I’ll walk through the core steps as if I’m explaining to a friend.

### 1. Check feasibility (all languages)

```text
E = number of edges

if E < V - 1:
    return -1
```

* I count how many connections (`E`) I have.
* To connect `V` hospitals, I **must** have at least `V - 1` links.
* If not, I immediately return `-1` because no amount of rewiring can fix missing edges.

---

### 2. Initialize DSU

**C++ example:**

```c++
vector<int> parent(V), sz(V, 1);
for (int i = 0; i < V; i++) parent[i] = i;
```

**Python example:**

```python
parent = list(range(V))
size = [1] * V
```

* I create two arrays:

  * `parent[i]` starts as `i`, meaning each hospital is its own group.
  * `size[i]` is `1` because each group initially has only one hospital.

Same idea is used in Java and JavaScript.

---

### 3. Implement `find` with path compression

**Python:**

```python
def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])  # compress path
    return parent[x]
```

**C++ (lambda):**

```c++
function<int(int)> find = [&](int x) -> int {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
};
```

* `find(x)` follows the `parent[]` chain until it reaches the leader.
* While returning back up the recursion, I set each visited node’s parent directly to the leader.
* This is called **path compression** and makes future `find` calls much faster.

---

### 4. Implement `union` / `unite` by size

**Python:**

```python
def unite(a, b):
    a = find(a)
    b = find(b)
    if a == b:
        return
    if size[a] < size[b]:
        a, b = b, a
    parent[b] = a
    size[a] += size[b]
```

**JavaScript:**

```javascript
const unite = (a0, b0) => {
    let a = find(a0);
    let b = find(b0);
    if (a === b) return;
    if (size[a] < size[b]) {
        const tmp = a; a = b; b = tmp;
    }
    parent[b] = a;
    size[a] += size[b];
};
```

* First, I find the leaders of both nodes.
* If they’re already in the same component, I do nothing.
* Otherwise, I attach the **smaller** component under the **larger** component.
* This keeps the tree shallow and efficient (union by size).

---

### 5. Process edges to build components

**Example (C++):**

```c++
for (auto &e : edges) {
    int u = e[0];
    int v = e[1];
    unite(u, v);
}
```

* For each connection `[u, v]`, I merge their components.
* After all edges are processed, each connected group of hospitals will be represented as a single DSU component.

---

### 6. Count the number of connected components

**JavaScript:**

```javascript
let components = 0;
for (let i = 0; i < V; i++) {
    if (find(i) === i) components++;
}
```

**Python:**

```python
components = 0
for i in range(V):
    if find(i) == i:
        components += 1
```

* I loop from `0` to `V-1`.
* Every node that is its **own parent** (`find(i) == i`) is a **component leader**.
* Counting such leaders gives me the number of connected components.

---

### 7. Return final answer

```text
answer = components - 1
```

* If there are `components` separate groups, I need `components - 1` edges to connect them into a single component.
* Because I already know there are at least `V - 1` edges, it’s always possible to rearrange some edges to create these `components - 1` new connections.

---

## Examples

### Example 1

**Input**

```text
V = 4
edges = [[0, 1], [0, 2], [1, 2]]
```

**Explanation**

* `E = 3`, `V = 4`. Since `E >= V - 1` (3 ≥ 3), it might be possible.
* Edges connect nodes: {0,1,2}. Node `3` is isolated.
* Components:

  * Component 1: {0,1,2}
  * Component 2: {3}
* `components = 2` → answer = `2 - 1 = 1`.

So I need **1 operation**:

* Remove one redundant edge inside the first component and reconnect it to node `3`.

**Output**

```text
1
```

---

### Example 2

**Input**

```text
V = 5
edges = [[0, 1], [0, 2], [2, 3], [3, 4]]
```

**Explanation**

* `E = 4`, `V = 5`, `E = V - 1`.
* The edges already form a single path connecting all nodes.
* Only one component exists: `{0,1,2,3,4}`.
* `components = 1` → answer = `1 - 1 = 0`.

**Output**

```text
0
```

---

## How to use / Run locally

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

2. **C++**

```bash
g++ -std=c++17 -O2 main.cpp -o main
./main
```

3. **Java**

```bash
javac Main.java
java Main
```

4. **JavaScript (Node.js)**

```bash
node main.js
```

5. **Python3**

```bash
python3 main.py
```

In each `main.*` file, you can:

* Read input (e.g., from stdin or hardcoded).
* Create an object of `Solution`.
* Call `minConnect(V, edges)` and print the result.

---

## Notes & Optimizations

* **Why DSU?**
  DSU lets me quickly group nodes into components using paths and union operations in almost constant time. This is perfect for large graphs.

* **Early exit using `E < V - 1`:**
  This simple check prevents unnecessary DSU operations when the answer is clearly `-1`.

* **Path compression + union by size:**
  These two tricks make DSU operations extremely fast, giving overall complexity `O(V + E)`.

* **Scalability:**
  This solution comfortably handles up to 10⁵ or more nodes and edges within typical competitive programming time limits.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
