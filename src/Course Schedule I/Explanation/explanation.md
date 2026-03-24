# Course Schedule I

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

You are given `n` courses labeled from `0` to `n-1` and a list of prerequisites where `prerequisites[i] = [x, y]` means you must complete course `y` before taking course `x`.

Return `true` if it is possible to complete all courses, otherwise return `false`.

## Constraints

* `1 <= n <= 10^4`
* `0 <= prerequisites.length <= 10^5`
* `0 <= x, y < n`
* All prerequisite pairs are unique

## Intuition

I thought of this as a directed graph problem. Each course is a node and each prerequisite is a directed edge. If there is a cycle in the graph, then it is impossible to complete all courses. So the goal becomes detecting whether a cycle exists or not.

## Approach

I used Kahn's Algorithm (Topological Sorting using BFS):

1. Build a graph using adjacency list.
2. Maintain an indegree array.
3. Push all nodes with indegree 0 into a queue.
4. Process nodes using BFS.
5. Count how many nodes are processed.
6. If processed nodes == n, return true, else false.

## Data Structures Used

* Adjacency List (Graph representation)
* Indegree Array
* Queue (for BFS)

## Operations & Behavior Summary

* Add edges based on prerequisites
* Track incoming edges
* Process nodes with no dependencies
* Reduce indegree dynamically
* Detect cycle based on remaining nodes

## Complexity

* Time Complexity: O(n + m), where n = number of courses, m = number of prerequisites
* Space Complexity: O(n + m)

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    bool canFinish(int n, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);

        for (auto &p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }

        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) q.push(i);
        }

        int count = 0;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            count++;

            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) q.push(nei);
            }
        }

        return count == n;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public boolean canFinish(int n, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

        int[] indegree = new int[n];

        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) q.offer(i);
        }

        int count = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            count++;

            for (int nei : adj.get(node)) {
                indegree[nei]--;
                if (indegree[nei] == 0) q.offer(nei);
            }
        }

        return count == n;
    }
}
```

### JavaScript

```javascript
class Solution {
    canFinish(n, prerequisites) {
        let adj = Array.from({ length: n }, () => []);
        let indegree = new Array(n).fill(0);

        for (let [x, y] of prerequisites) {
            adj[y].push(x);
            indegree[x]++;
        }

        let queue = [];
        for (let i = 0; i < n; i++) {
            if (indegree[i] === 0) queue.push(i);
        }

        let count = 0;
        while (queue.length > 0) {
            let node = queue.shift();
            count++;

            for (let nei of adj[node]) {
                indegree[nei]--;
                if (indegree[nei] === 0) queue.push(nei);
            }
        }

        return count === n;
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def canFinish(self, n, prerequisites):
        adj = [[] for _ in range(n)]
        indegree = [0] * n

        for x, y in prerequisites:
            adj[y].append(x)
            indegree[x] += 1

        q = deque()
        for i in range(n):
            if indegree[i] == 0:
                q.append(i)

        count = 0
        while q:
            node = q.popleft()
            count += 1

            for nei in adj[node]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    q.append(nei)

        return count == n
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Build adjacency list from prerequisites.
2. Initialize indegree array.
3. Add nodes with indegree 0 into queue.
4. Process queue using BFS.
5. Decrease indegree of neighbors.
6. Push new nodes with indegree 0.
7. Count processed nodes.
8. Compare with total courses.

## Examples

Input: n = 4, prerequisites = [[2,0],[2,1],[3,2]]
Output: true

Input: n = 3, prerequisites = [[0,1],[1,2],[2,0]]
Output: false

## How to use / Run locally

1. Copy code into your preferred language editor.
2. Provide input values manually.
3. Compile and run.
4. Check output.

## Notes & Optimizations

* Using BFS avoids recursion stack issues.
* Efficient for large graphs.
* Works in linear time.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
