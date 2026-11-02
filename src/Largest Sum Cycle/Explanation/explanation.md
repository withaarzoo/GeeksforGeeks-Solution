# Largest Sum Cycle – Maximum Cycle Sum in a Directed Graph (GFG)

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

## Problem Summary

You are given a directed graph with n nodes (numbered from 0 to n-1). Each node has at most one outgoing edge. The edges are provided in an array called `edge` where `edge[i]` tells you the node that i points to. If a node has no outgoing edge, the value is -1.

A cycle is a sequence of nodes where following the edges brings you back to the starting node. The sum of a cycle is simply the sum of all the node indices that appear in that cycle.

Your task is to find the cycle that has the largest sum of node indices. If the graph contains no cycle at all, return -1.

This is a classic functional-graph problem that appears frequently in competitive programming contests and company coding rounds (especially Juspay and similar interviews).

## Constraints

- 2 ≤ edge.size() ≤ 10^5
- -1 ≤ edge[i] < edge.size()
- edge[i] ≠ i (no self-loops)

Because n can be as large as 100000, any solution slower than linear time will get Time Limit Exceeded.

## Intuition

The most important observation is that every node has out-degree at most one. In such graphs (often called functional graphs), the structure is very limited: each connected component can contain at most one cycle, and the rest of the nodes form trees or chains that eventually point into that cycle (or end at a node with no outgoing edge).

Because cycles cannot share nodes and there is only one possible path forward from any node, we do not need complicated cycle-detection algorithms. We can simply remove every node that is guaranteed not to be part of any cycle. Whatever remains must belong to cycles. Then we just walk those remaining nodes and compute their sums.

## Approach

1. Count the in-degree of every node.
2. Push all nodes that currently have in-degree 0 into a queue. These nodes cannot be part of a cycle.
3. Perform a process similar to Kahn’s topological sort: repeatedly remove nodes with in-degree 0 and reduce the in-degree of the node they point to. Mark every removed node as visited.
4. After the process finishes, any node that is still unvisited must lie on a cycle.
5. For each unvisited node, follow the unique outgoing edges, add up the node indices, and mark the nodes as visited while walking. Keep the maximum sum found.
6. If no cycle was ever discovered, return -1.

This approach runs in linear time and is easy to implement in any language.

## Data Structures Used

- An integer array (or list) to store the in-degree of every node.  
- A boolean visited array to mark nodes that have already been processed or are known to be outside any cycle.  
- A queue to perform the topological-style peeling of non-cycle nodes.  

These three structures are sufficient and keep the extra memory linear in n.

## Operations & Behavior Summary

- First pass: build the in-degree array by looking at every edge once.  
- Second pass: enqueue every node whose in-degree is zero and mark it visited.  
- While the queue is not empty, dequeue a node, decrease the in-degree of its successor, and enqueue the successor if its in-degree drops to zero.  
- After the queue empties, scan the entire node list.  
- Whenever an unvisited node is found, walk the cycle starting from it, accumulate the sum of indices, and mark every node on the walk as visited.  
- Track the largest sum seen.  
- Return that sum, or -1 if no cycle existed.

## Complexity

| Complexity Type | Value | Explanation |
|-----------------|-------|-------------|
| Time Complexity | O(n) | Every node and every edge is examined a constant number of times. |
| Space Complexity | O(n) | Extra arrays for in-degree and visited status plus a queue that never holds more than n nodes. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int largestSumCycle(vector<int>& edge) {
        int n = edge.size();
        vector<int> indeg(n, 0);
        for (int i = 0; i < n; i++) {
            if (edge[i] != -1) indeg[edge[i]]++;
        }
        queue<int> q;
        vector<bool> vis(n, false);
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) {
                q.push(i);
                vis[i] = true;
            }
        }
        while (!q.empty()) {
            int u = q.front(); q.pop();
            int v = edge[u];
            if (v != -1) {
                indeg[v]--;
                if (indeg[v] == 0) {
                    q.push(v);
                    vis[v] = true;
                }
            }
        }
        long long ans = -1;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                long long sum = 0;
                int cur = i;
                while (!vis[cur]) {
                    vis[cur] = true;
                    sum += cur;
                    cur = edge[cur];
                }
                ans = max(ans, sum);
            }
        }
        return (int)ans;
    }
};
```

### Java

```java
class Solution {
    public int largestSumCycle(int[] edge) {
        int n = edge.length;
        int[] indeg = new int[n];
        for (int i = 0; i < n; i++) {
            if (edge[i] != -1) indeg[edge[i]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        boolean[] vis = new boolean[n];
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) {
                q.add(i);
                vis[i] = true;
            }
        }
        while (!q.isEmpty()) {
            int u = q.poll();
            int v = edge[u];
            if (v != -1) {
                indeg[v]--;
                if (indeg[v] == 0) {
                    q.add(v);
                    vis[v] = true;
                }
            }
        }
        long ans = -1;
        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                long sum = 0;
                int cur = i;
                while (!vis[cur]) {
                    vis[cur] = true;
                    sum += cur;
                    cur = edge[cur];
                }
                ans = Math.max(ans, sum);
            }
        }
        return (int)ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} edge
 * @return {number}
 */
class Solution {
    largestSumCycle(edge) {
        let n = edge.length;
        let indeg = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            if (edge[i] !== -1) indeg[edge[i]]++;
        }
        let q = [];
        let vis = new Array(n).fill(false);
        for (let i = 0; i < n; i++) {
            if (indeg[i] === 0) {
                q.push(i);
                vis[i] = true;
            }
        }
        while (q.length > 0) {
            let u = q.shift();
            let v = edge[u];
            if (v !== -1) {
                indeg[v]--;
                if (indeg[v] === 0) {
                    q.push(v);
                    vis[v] = true;
                }
            }
        }
        let ans = -1;
        for (let i = 0; i < n; i++) {
            if (!vis[i]) {
                let sum = 0;
                let cur = i;
                while (!vis[cur]) {
                    vis[cur] = true;
                    sum += cur;
                    cur = edge[cur];
                }
                ans = Math.max(ans, sum);
            }
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def largestSumCycle(self, edge):
        n = len(edge)
        indeg = [0] * n
        for i in range(n):
            if edge[i] != -1:
                indeg[edge[i]] += 1
        from collections import deque
        q = deque()
        vis = [False] * n
        for i in range(n):
            if indeg[i] == 0:
                q.append(i)
                vis[i] = True
        while q:
            u = q.popleft()
            v = edge[u]
            if v != -1:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
                    vis[v] = True
        ans = -1
        for i in range(n):
            if not vis[i]:
                s = 0
                cur = i
                while not vis[cur]:
                    vis[cur] = True
                    s += cur
                    cur = edge[cur]
                ans = max(ans, s)
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core idea is identical across all four languages; only syntax differs.

We start by creating an in-degree array of size n and filling it by iterating through the edge array once. Any node that no one points to has in-degree zero and therefore cannot sit on a cycle.

We then initialise a queue and a visited array. All zero-in-degree nodes are pushed into the queue and marked visited. While the queue still has nodes we repeatedly take the front node, look at the single node it points to, decrease that target’s in-degree, and push the target if its in-degree has now become zero. This process gradually peels away every node that is not part of a cycle.

When the queue is empty, the remaining unvisited nodes are exactly the nodes that belong to cycles. We scan the node list again. For every unvisited node we start a walk: keep adding the current index to a running sum and move forward along the unique outgoing edge until we return to a node we have already marked. Because the graph has out-degree at most one, this walk is guaranteed to stay inside a single cycle. We compare the obtained sum with the best answer found so far.

If the best answer never changed from its initial value of -1, the graph contained no cycles.

Edge cases handled automatically:

- Nodes with no outgoing edge are treated as having in-degree contributions of zero and are removed early.
- Multiple disconnected cycles are each discovered independently because we continue scanning after finishing one cycle.
- Self-loops are forbidden by the problem constraints, so we never have to special-case them.

The same sequence of steps appears in the C++, Java, JavaScript and Python implementations; only the way arrays, queues and loops are written changes.

## Examples

**Example 1**  
Input: edge = [1, 2, 0, -1]  
Output: 3  

Trace:  
Nodes 0 → 1 → 2 → 0 form a cycle.  
Node 3 has no outgoing edge.  
After peeling non-cycle nodes, only 0, 1 and 2 remain.  
Their indices sum to 0 + 1 + 2 = 3, which is the answer.

**Example 2**  
Input: edge = [2, 0, -1, 2]  
Output: -1  

Trace:  
Edges are 0 → 2, 1 → 0, 3 → 2, and 2 has no outgoing edge.  
The topological peeling removes every node because none of them close a cycle.  
Hence the answer is -1.

**Example 3** (additional)  
Input: edge = [1, 2, 3, 1]  
Output: 6  

Trace:  
Nodes 1 → 2 → 3 → 1 form a cycle whose indices sum to 1 + 2 + 3 = 6.  
Node 0 points into the cycle but is not part of it, so it is peeled away.  
The maximum cycle sum is 6.

## How to Use / Run Locally

1. Copy the solution code for the language you want into a file (for example `main.cpp`, `Main.java`, `solution.js` or `solution.py`).
2. Add a simple driver that reads n and the edge array, creates a Solution object, calls the function, and prints the result.
3. Compile and run:

- C++: `g++ -std=c++17 main.cpp -o main && ./main`  
- Java: `javac Main.java && java Main`  
- JavaScript (Node.js): `node solution.js`  
- Python3: `python3 solution.py`

Make sure the input format matches the problem statement (first the size, then the list of edges).

## Notes & Optimizations

- Because every node has out-degree ≤ 1, there is never more than one cycle per component. This is why a simple topological peel works.
- An alternative approach is classic DFS with three colours (white / grey / black) while recording the path. It also runs in O(n) but requires more careful bookkeeping of the path to extract the cycle sum.
- The present solution uses only a queue and two arrays, so the constant factors are small and it passes comfortably under the usual 1-second time limits for n = 10^5.
- Watch out for the return type: on some platforms the expected return type is `long long` because the sum of indices can exceed 2^31 − 1. Adjust the variable type if the judge rejects an `int` answer.
- Nodes that point to themselves are forbidden, so no extra self-loop handling is required.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
