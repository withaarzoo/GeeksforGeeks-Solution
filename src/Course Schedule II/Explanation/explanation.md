# Course Schedule II — README

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

Given `n` courses labeled from `0` to `n-1` and a list of prerequisite pairs `prerequisites[]` where each pair `[x, y]` means to take course `x` you must first finish course `y`. Return **any valid ordering** of courses that finishes all courses. If it is impossible (there is a cycle), return an empty list.

Example:
Input: `n = 3, prerequisites = [[1,0],[2,1]]`
Output: `[0,1,2]` (one valid order)

---

## Constraints

* `1 ≤ n ≤ 10^4`
* `0 ≤ prerequisites.size() ≤ 10^5`
* `0 ≤ prerequisites[i][0], prerequisites[i][1] < n`
* All prerequisite pairs are unique
* `prerequisites[i][0] != prerequisites[i][1]`

---

## Intuition

I thought about prerequisites as a directed graph. Each course is a node. A prerequisite pair `[x, y]` is an edge `y -> x` (y before x). I want to create an ordering where each course comes after all its prerequisites. This is exactly a **topological sort** problem on a directed graph. If a topological ordering exists (graph is a DAG) I return it; if not (cycle exists) I return an empty list.

I decided to use **Kahn's algorithm** (BFS-based topological sort) because it clearly detects cycles and is linear-time in nodes + edges.

---

## Approach

1. Build an adjacency list `adj` for graph edges `y -> x`.
2. Build an `indegree` array where `indegree[v]` counts incoming edges to `v` (number of prerequisites).
3. Initialize a queue with all nodes with indegree 0 (courses with no prerequisites).
4. Repeatedly pop from queue, append to `order`. For each neighbor, decrease its indegree; if it becomes 0 push it to queue.
5. After processing, if `order` contains `n` courses return it; else return an empty list (cycle detected).

This approach visits each node and edge once, making it efficient.

---

## Data Structures Used

* **Adjacency list** (vector/ArrayList/array of arrays) — to store directed graph edges.
* **Indegree array** — to track number of remaining prerequisites for each node.
* **Queue** (BFS) — for nodes available to process (indegree == 0).
* **Result list/array** — to collect topological order.

---

## Operations & Behavior Summary

* Build graph: O(p) where p = number of prerequisite pairs.
* Initialize queue by scanning all `n` nodes: O(n).
* Process each node at most once; for each edge we decrement indegree once: O(n + p).
* Detect cycle by checking if result length equals `n`.

Behavior:

* If graph has no cycle → returns a valid topological ordering.
* If graph has a cycle → returns `[]` (empty list/array).

---

## Complexity

* **Time Complexity:** `O(n + p)` where `n` is number of courses and `p` is number of prerequisite pairs (edges).

  * We build adjacency list in O(p), initialize indegrees in O(p), and run BFS processing nodes and edges once.
* **Space Complexity:** `O(n + p)`

  * Adjacency list uses O(p) space, indegree array O(n), queue and result O(n).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> findOrder(int n, vector<vector<int>> &prerequisites) {
        // adjacency list and indegree
        vector<vector<int>> adj(n);
        vector<int> indeg(n, 0);
        for (auto &pr : prerequisites) {
            int x = pr[0], y = pr[1]; // to take x, must finish y -> edge y -> x
            adj[y].push_back(x);
            indeg[x]++;
        }

        queue<int> q;
        for (int i = 0; i < n; ++i) if (indeg[i] == 0) q.push(i);

        vector<int> order;
        order.reserve(n);

        while (!q.empty()) {
            int node = q.front(); q.pop();
            order.push_back(node);
            for (int nei : adj[node]) {
                indeg[nei]--;
                if (indeg[nei] == 0) q.push(nei);
            }
        }

        return (int)order.size() == n ? order : vector<int>{};
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> findOrder(int n, int[][] prerequisites) {
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>(n);
        for (int i = 0; i < n; ++i) adj.add(new ArrayList<>());

        int[] indeg = new int[n];
        for (int[] pr : prerequisites) {
            int x = pr[0], y = pr[1]; // y -> x
            adj.get(y).add(x);
            indeg[x]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; ++i) if (indeg[i] == 0) q.offer(i);

        ArrayList<Integer> order = new ArrayList<>(n);
        while (!q.isEmpty()) {
            int node = q.poll();
            order.add(node);
            for (int nei : adj.get(node)) {
                indeg[nei]--;
                if (indeg[nei] == 0) q.offer(nei);
            }
        }

        if (order.size() == n) return order;
        return new ArrayList<>(); // cycle detected
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number[][]} prerequisites
 * @returns {number[]}
 */
class Solution {
    findOrder(n, prerequisites) {
        const adj = Array.from({length: n}, () => []);
        const indeg = new Array(n).fill(0);

        for (const pr of prerequisites) {
            const x = pr[0], y = pr[1]; // y -> x
            adj[y].push(x);
            indeg[x] += 1;
        }

        const q = [];
        let head = 0;
        for (let i = 0; i < n; ++i) if (indeg[i] === 0) q.push(i);

        const order = [];
        while (head < q.length) {
            const node = q[head++];
            order.push(node);
            for (const nei of adj[node]) {
                indeg[nei] -= 1;
                if (indeg[nei] === 0) q.push(nei);
            }
        }

        return (order.length === n) ? order : [];
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def findOrder(self, n, prerequisites):
        # adjacency list and indegree
        adj = [[] for _ in range(n)]
        indeg = [0] * n
        for x, y in prerequisites:
            # to take x must finish y -> y -> x
            adj[y].append(x)
            indeg[x] += 1

        q = deque([i for i in range(n) if indeg[i] == 0])
        order = []

        while q:
            node = q.popleft()
            order.append(node)
            for nei in adj[node]:
                indeg[nei] -= 1
                if indeg[nei] == 0:
                    q.append(nei)

        return order if len(order) == n else []
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the key parts of the code as if I'm teaching a friend.

### 1. Building the graph and indegree

* For each pair `[x, y]`:

  * I add `x` to adjacency list of `y` (because y -> x).
  * I increment `indegree[x]` because `x` has one more incoming edge (a prerequisite).
* This step creates a representation where for every course I can see who depends on it, and how many prerequisites each course still needs.

**Why `y -> x`?** Because the pair means `to take x, you must finish y first`. So there is a directed edge from `y` to `x`.

### 2. Initialize queue with nodes having indegree 0

* Courses with indegree 0 have no prerequisites and can be taken immediately.
* I add all such nodes to a queue to start processing.

### 3. Kahn's algorithm (BFS)

* While queue is not empty:

  * Pop node `u` (a course I can take now).
  * Append `u` to `order`.
  * For each neighbor `v` (courses that require `u`), I decrement `indegree[v]` because one of its prerequisites is completed.
  * If `indegree[v]` becomes 0, push `v` to queue — it can now be taken.
* This ensures that when we append a course to `order`, all its prerequisites were appended earlier.

### 4. Cycle detection and final check

* After the BFS, if we included all `n` nodes in `order`, we produced a valid schedule.
* If not, at least one node was never reduced to indegree 0 because of a cycle, so ordering is impossible — return empty.

---

## Examples

1. **Simple chain**

* Input: `n = 3`, `prerequisites = [[1,0],[2,1]]`
* Process: 0 has indeg 0 → take 0 → reduces indeg(1) → 1 becomes 0 → take 1 → reduces indeg(2) → 2 becomes 0 → take 2
* Output: `[0,1,2]`

2. **Multiple valid orders**

* Input: `n = 4`, `prerequisites = [[2,0],[2,1],[3,2]]`
* Valid outputs: `[0,1,2,3]` or `[1,0,2,3]`

3. **Cycle**

* Input: `n = 2`, `prerequisites = [[0,1],[1,0]]`
* There's a cycle; output: `[]`

---

## How to use / Run locally

### C++

1. Save to `solution.cpp` containing `main()` that reads input and calls `Solution::findOrder`.
2. Compile:

   ```bash
   g++ -std=c++17 -O2 -o solution solution.cpp
   ```

3. Run:

   ```bash
   ./solution
   ```

### Java

1. Save as `Solution.java` with a `main` function to test `findOrder`.
2. Compile:

   ```bash
   javac Solution.java
   ```

3. Run:

   ```bash
   java Solution
   ```

### JavaScript (Node)

1. Save to `solution.js`. Wrap the class usage in a test harness or directly call `new Solution().findOrder(...)`.
2. Run:

   ```bash
   node solution.js
   ```

### Python3

1. Save to `solution.py`. Add a test harness or use interactive calls:
2. Run:

   ```bash
   python3 solution.py
   ```

(For brevity this README includes the `Solution` class only. For local testing add a `main` or small harness that reads input and prints output.)

---

## Notes & Optimizations

* Kahn's algorithm is preferable here because it detects cycles without recursion. Compared to DFS-based topological sort, it avoids recursion depth issues on large `n`.
* Use adjacency lists (not adjacency matrix) because `p` can be large (up to 10^5).
* Reserve result capacity (in languages that support it) to avoid repeated memory reallocations.
* If multiple valid orders are acceptable, Kahn's algorithm returns one deterministic ordering depending on queue order. If you need lexicographically smallest order, use a min-heap (priority queue) instead of a queue — that increases complexity slightly (log n per edge/pop).

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
