# Minimum Time to Finish Project with Module Dependencies

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

You are given a large project that has n modules. Each module takes a certain number of months to finish. That information is stored in an array called duration.

Some modules cannot start until other modules are fully completed. These rules are given in a list of pairs called dependencies. A pair [u, v] means module v can begin only after module u is finished.

Multiple modules can run at the same time as long as all their required modules are already done. Your job is to find the smallest total time needed to finish the entire project. If a cycle exists in the dependencies, the project can never finish, so you should return -1.

This is a classic project scheduling problem that can be solved using graph algorithms and topological sorting.

## Constraints

- 1 ≤ duration.size() ≤ 10^5
- 0 ≤ duration[i] ≤ 10^5
- 0 ≤ m ≤ 2 * 10^5 (where m is the number of dependency pairs)
- 0 ≤ dependencies[i][j] < 10^5
- A module is never dependent on itself

## Intuition

The first thing I noticed is that the modules form a directed graph. An edge from u to v means u must finish before v can start.

Because independent modules can run in parallel, the total project time is decided by the longest chain of dependent modules. That longest chain is often called the critical path.

If the graph contains a cycle, some modules will wait forever for each other. In that case the answer is simply -1.

So the problem reduces to finding the longest path in a Directed Acyclic Graph (DAG) while also detecting cycles.

## Approach

I model the modules as nodes and the dependencies as directed edges.

I build an adjacency list and also keep track of how many incoming edges each node has (its in-degree).

I create an array that stores the earliest finish time of every module. At the start I just put each module’s own duration into that array.

Then I run a topological sort using a queue (Kahn’s algorithm). I start with every module that has zero in-degree. Those modules can begin immediately.

Whenever I finish a module u, I look at every module v that depends on it. I update v’s finish time to the maximum of its current value and (finish time of u + duration of v). I also reduce v’s remaining prerequisites. When a module’s prerequisites drop to zero I put it into the queue.

After the process ends, if I have processed fewer modules than n, a cycle exists and I return -1. Otherwise the answer is the maximum value stored in the finish-time array.

## Data Structures Used

- Adjacency list (vector of vectors or list of lists) – stores the directed edges so I can quickly find all modules that depend on a given module.
- In-degree array – counts how many unfinished prerequisites each module still has.
- Finish-time array – keeps the earliest possible completion time for every module.
- Queue – used for the topological sort; always holds modules that are ready to be processed.

These structures together let me process the graph in linear time.

## Operations & Behavior Summary

1. Build the graph and count in-degrees from the dependency list.
2. Initialize every module’s finish time to its own duration.
3. Push all modules with zero in-degree into a queue.
4. While the queue is not empty:
   - Take the front module.
   - For each module that depends on it, try to improve its finish time and decrease its in-degree.
   - If a dependent module now has zero in-degree, push it into the queue.
5. If fewer than n modules were processed, return -1 (cycle detected).
6. Otherwise return the largest finish time found.

## Complexity

| Complexity Type   | Value     | Explanation |
|-------------------|-----------|-------------|
| Time Complexity   | O(n + m)  | We visit every module and every dependency edge a constant number of times while building the graph and running the topological sort. n is the number of modules and m is the number of dependency edges. |
| Space Complexity  | O(n + m)  | The adjacency list stores all edges, and the extra arrays and queue use space linear in the number of modules. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minTime(vector<int> &duration, vector<vector<int>> &dependencies) {
        int n = duration.size();
        vector<vector<int>> adj(n);
        vector<int> indeg(n, 0);
        for (auto &d : dependencies) {
            adj[d[0]].push_back(d[1]);
            indeg[d[1]]++;
        }
        vector<int> finish(n);
        for (int i = 0; i < n; i++) finish[i] = duration[i];
        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) q.push(i);
        }
        int cnt = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            cnt++;
            for (int v : adj[u]) {
                finish[v] = max(finish[v], finish[u] + duration[v]);
                if (--indeg[v] == 0) q.push(v);
            }
        }
        if (cnt < n) return -1;
        int ans = 0;
        for (int t : finish) ans = max(ans, t);
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int minTime(int[] duration, int[][] dependencies) {
        int n = duration.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] d : dependencies) {
            adj.get(d[0]).add(d[1]);
            indeg[d[1]]++;
        }
        int[] finish = new int[n];
        for (int i = 0; i < n; i++) finish[i] = duration[i];
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indeg[i] == 0) q.offer(i);
        }
        int cnt = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            cnt++;
            for (int v : adj.get(u)) {
                finish[v] = Math.max(finish[v], finish[u] + duration[v]);
                if (--indeg[v] == 0) q.offer(v);
            }
        }
        if (cnt < n) return -1;
        int ans = 0;
        for (int t : finish) ans = Math.max(ans, t);
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} duration
 * @param {number[][]} dependencies
 * @returns {number}
 */
class Solution {
    minTime(duration, dependencies) {
        const n = duration.length;
        const adj = Array.from({length: n}, () => []);
        const indeg = new Array(n).fill(0);
        for (const d of dependencies) {
            adj[d[0]].push(d[1]);
            indeg[d[1]]++;
        }
        const finish = duration.slice();
        const q = [];
        for (let i = 0; i < n; i++) {
            if (indeg[i] === 0) q.push(i);
        }
        let cnt = 0;
        while (q.length) {
            const u = q.shift();
            cnt++;
            for (const v of adj[u]) {
                finish[v] = Math.max(finish[v], finish[u] + duration[v]);
                if (--indeg[v] === 0) q.push(v);
            }
        }
        if (cnt < n) return -1;
        return Math.max(...finish);
    }
}
```

### Python3
```python
class Solution:
    def minTime(self, duration, dependencies):
        n = len(duration)
        adj = [[] for _ in range(n)]
        indeg = [0] * n
        for u, v in dependencies:
            adj[u].append(v)
            indeg[v] += 1
        finish = duration[:]
        from collections import deque
        q = deque(i for i in range(n) if indeg[i] == 0)
        cnt = 0
        while q:
            u = q.popleft()
            cnt += 1
            for v in adj[u]:
                finish[v] = max(finish[v], finish[u] + duration[v])
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        if cnt < n:
            return -1
        return max(finish)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. Only the syntax for lists, queues, and maximum operations changes.

First I read the number of modules from the length of the duration array.  
I create an empty adjacency list with one list per module and an in-degree array filled with zeros.  

I walk through every dependency pair. For a pair [u, v] I add an edge from u to v and increase the in-degree of v. After this step the graph is complete.

I make a finish-time array and copy the duration values into it. At this moment each module thinks it can finish as soon as its own work is done.

I scan the in-degree array and push every module that has zero prerequisites into a queue. These are the modules that can start at time zero.

While the queue is not empty I repeatedly take a ready module u.  
For every neighbour v of u I calculate a candidate finish time: finish[u] + duration[v]. I keep the larger of the old value and this candidate.  
I also decrease the remaining prerequisites of v. When that number reaches zero, v becomes ready and I push it into the queue.

When the queue is finally empty I check how many modules I processed. If the count is less than n, some modules were never reached because of a cycle, so I return -1.

If every module was processed, the largest value in the finish-time array is the moment the last module finishes. That is the minimum time required for the whole project.

Edge cases handled:
- No dependencies at all → answer is simply the maximum duration.
- A single cycle involving all modules → returns -1.
- Multiple independent chains → the longest chain decides the answer.

## Examples

**Example 1**

Input:  
duration = [10, 20, 30, 10, 30, 20]  
dependencies = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]

The graph contains the chain 5 → 2 → 3 → 1.  
Adding the durations along this path gives 20 + 30 + 10 + 20 = 80.  
No longer path exists and there is no cycle, so the answer is 80.

**Example 2**

Input:  
duration = [5, 5, 5]  
dependencies = [[0, 1], [1, 2], [2, 0]]

A cycle 0 → 1 → 2 → 0 exists.  
The topological sort processes zero modules, so the algorithm correctly returns -1.

**Example 3**

Input:  
duration = [3, 5, 7]  
dependencies = []

No edges. All modules can run in parallel.  
The answer is simply the largest duration, which is 7.

## How to Use / Run Locally

**C++**  
1. Copy the C++ solution into a file named main.cpp.  
2. Compile with: g++ -std=c++17 main.cpp -o main  
3. Run with: ./main  
4. Provide the input in the format expected by your driver code (usually n, the duration array, then the list of dependencies).

**Java**  
1. Paste the Java class into a file named Solution.java.  
2. Compile with: javac Solution.java  
3. Run with a small driver that creates an instance and calls minTime.  
4. Or use any online Java runner that accepts the class.

**JavaScript**  
1. Save the code in a file named solution.js.  
2. Run with Node.js: node solution.js  
3. You may need a small test harness that calls the minTime method and prints the result.

**Python3**  
1. Save the code in a file named solution.py.  
2. Run with: python3 solution.py  
3. Add a few print statements or a main block that creates a Solution object and tests the method with sample inputs.

In all languages make sure the input format matches the problem statement (duration array followed by the list of dependency pairs).

## Notes & Optimizations

- The algorithm already runs in linear time, which is optimal for this problem size (n and m up to 1e5–2e5).  
- Using DFS-based topological sort with a recursion stack for cycle detection is also possible, but the queue-based method is simpler and avoids recursion-depth issues on large graphs.  
- If the durations were all equal to 1, the problem would reduce to finding the length of the longest path in a DAG. The same code still works.  
- Watch out for the case when duration contains zeros; the algorithm still handles it correctly because the finish time of a zero-duration module is simply the maximum finish time of its predecessors.  
- The solution never modifies the original duration or dependencies arrays, so it is safe to reuse them after the call.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)