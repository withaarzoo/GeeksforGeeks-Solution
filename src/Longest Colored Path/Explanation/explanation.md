# Longest Colored Path in a Tree – Optimal DSA Solution

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

We are given an undirected tree with n nodes. Every node is colored either red (R) or blue (B). The colors come in a string s of length n. We also receive the n-1 edges that connect the tree.

A path is valid only if it never goes from a blue node to a red node later. In other words the path can be:
- only red nodes,
- only blue nodes, or
- some red nodes followed by some blue nodes.

The task is to find the maximum number of nodes that can appear in any valid path.

This is a classic “longest path under color constraints on a tree” problem that appears in many competitive programming contests.

## Constraints

- 1 ≤ n ≤ 10^5
- s.length() == n
- s contains only the characters ‘R’ and ‘B’
- edges.length() == n-1
- 1 ≤ edges[i][0], edges[i][1] ≤ n
- The given edges form a valid tree (connected and acyclic)

Because n can be as large as 100 000, any solution slower than linear time will time out.

## Intuition

The key observation is that a valid path can change color at most once, and only from red to blue.

That means every pure-red path lives completely inside a connected component formed by red-red edges. The same is true for blue.  

For a mixed path there is exactly one edge that joins a red node to a blue node. The longest such path is simply the longest red chain ending at that red node plus the longest blue chain starting at that blue node.

Because the graph is a tree, each monochromatic component is also a tree. Inside a tree the longest path that starts at any given node is easy to compute: find the two ends of a diameter and take the maximum distance from the node to those two ends.

Once we have those distances for every node, we can answer both the pure and the mixed cases in a single pass.

## Approach

1. Build the adjacency list of the tree (1-based indexing).
2. Find every connected component that contains only red nodes. Do the same for blue nodes. Use an iterative stack so we never hit recursion limits.
3. For each component:
   - Remap its nodes to a compact 0-based local graph.
   - Run three BFS passes to locate the two diameter endpoints and obtain distances from both of them.
   - Store, for every original node, the longer of the two distances. This value is the length (in edges) of the longest monochromatic path starting at that node.
4. The answer is at least the longest pure monochromatic path (distance + 1).
5. Look at every original edge that connects a red node to a blue node. For each such edge compute (red distance of the red end + 1) + (blue distance of the blue end + 1) and keep the global maximum.
6. Return that maximum.

The whole process visits every node and every edge a constant number of times, giving a clean linear solution.

## Data Structures Used

- Adjacency list (vector / ArrayList / list of lists) – stores the tree efficiently and supports fast neighbor iteration.
- Boolean visited array – marks nodes already belonging to a processed component.
- Stack (or deque used as stack) – iterative depth-first collection of a component; avoids recursion-depth problems on long paths.
- Hash map / unordered_map – temporary remapping of original node ids to consecutive local indices inside a component.
- Queue – classic BFS for computing distances from a diameter endpoint.
- Two integer arrays (redMax and blueMax) – store the pre-computed longest monochromatic path length for every node.

All of these structures together use only linear extra memory.

## Operations & Behavior Summary

- Build the undirected tree.
- For the red color (then again for blue):
  - Scan all nodes.
  - Whenever an unvisited node of the current color is found, collect its whole monochromatic component with an iterative stack.
  - Build a local adjacency list for that component.
  - Run BFS from an arbitrary node to find one diameter end.
  - Run BFS from that end to find the other diameter end and the distances from the first end.
  - Run BFS from the second end to obtain distances from it.
  - For every node keep the larger of the two distances.
- Initialize answer to 1 (a single node is always valid).
- Update answer with every pure monochromatic distance + 1.
- For every edge whose endpoints have different colors, update answer with the sum of the two monochromatic lengths plus two.
- Return the final answer.

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time       | O(n)  | Every node and every edge is examined a constant number of times while building components and while running the three BFS passes. The sum of the sizes of all components is exactly n. |
| Space      | O(n)  | Adjacency lists, visited array, distance arrays and the temporary local graphs of the components all use linear memory. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int longestPath(string& s, vector<vector<int>>& edges) {
        int n = s.size();
        vector<vector<int>> adj(n + 1);
        for (auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<int> redMax(n + 1, 0), blueMax(n + 1, 0);
        vector<bool> vis(n + 1, false);
        auto process = [&](char col, vector<int>& mx) {
            fill(vis.begin(), vis.end(), false);
            for (int i = 1; i <= n; i++) {
                if (vis[i] || s[i - 1] != col) continue;
                vector<int> comp;
                stack<int> st;
                st.push(i);
                vis[i] = true;
                while (!st.empty()) {
                    int u = st.top(); st.pop();
                    comp.push_back(u);
                    for (int v : adj[u]) {
                        if (!vis[v] && s[v - 1] == col) {
                            vis[v] = true;
                            st.push(v);
                        }
                    }
                }
                int sz = comp.size();
                unordered_map<int, int> id;
                for (int j = 0; j < sz; j++) id[comp[j]] = j;
                vector<vector<int>> ladj(sz);
                for (int u : comp) {
                    for (int v : adj[u]) {
                        if (s[v - 1] == col && id.count(v))
                            ladj[id[u]].push_back(id[v]);
                    }
                }
                auto bfs = [&](int start) {
                    vector<int> dist(sz, -1);
                    queue<int> q;
                    q.push(start);
                    dist[start] = 0;
                    int far = start;
                    while (!q.empty()) {
                        int u = q.front(); q.pop();
                        if (dist[u] > dist[far]) far = u;
                        for (int v : ladj[u]) {
                            if (dist[v] == -1) {
                                dist[v] = dist[u] + 1;
                                q.push(v);
                            }
                        }
                    }
                    return make_pair(far, dist);
                };
                auto p1 = bfs(0);
                auto p2 = bfs(p1.first);
                auto p3 = bfs(p2.first);
                for (int j = 0; j < sz; j++)
                    mx[comp[j]] = max(p2.second[j], p3.second[j]);
            }
        };
        process('R', redMax);
        process('B', blueMax);
        int ans = 1;
        for (int i = 1; i <= n; i++) {
            if (s[i - 1] == 'R') ans = max(ans, redMax[i] + 1);
            else ans = max(ans, blueMax[i] + 1);
        }
        for (auto& e : edges) {
            int u = e[0], v = e[1];
            if (s[u - 1] != s[v - 1]) {
                if (s[u - 1] == 'R')
                    ans = max(ans, redMax[u] + 1 + blueMax[v] + 1);
                else
                    ans = max(ans, blueMax[u] + 1 + redMax[v] + 1);
            }
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int longestPath(String s, int[][] edges) {
        int n = s.length();
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        int[] redMax = new int[n + 1];
        int[] blueMax = new int[n + 1];
        boolean[] vis = new boolean[n + 1];
        process(s, adj, 'R', redMax, vis);
        process(s, adj, 'B', blueMax, vis);
        int ans = 1;
        for (int i = 1; i <= n; i++) {
            if (s.charAt(i - 1) == 'R') ans = Math.max(ans, redMax[i] + 1);
            else ans = Math.max(ans, blueMax[i] + 1);
        }
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            if (s.charAt(u - 1) != s.charAt(v - 1)) {
                if (s.charAt(u - 1) == 'R')
                    ans = Math.max(ans, redMax[u] + 1 + blueMax[v] + 1);
                else
                    ans = Math.max(ans, blueMax[u] + 1 + redMax[v] + 1);
            }
        }
        return ans;
    }
    private void process(String s, List<List<Integer>> adj, char col, int[] mx, boolean[] vis) {
        int n = s.length();
        Arrays.fill(vis, false);
        for (int i = 1; i <= n; i++) {
            if (vis[i] || s.charAt(i - 1) != col) continue;
            List<Integer> comp = new ArrayList<>();
            Deque<Integer> st = new ArrayDeque<>();
            st.push(i);
            vis[i] = true;
            while (!st.isEmpty()) {
                int u = st.pop();
                comp.add(u);
                for (int v : adj.get(u)) {
                    if (!vis[v] && s.charAt(v - 1) == col) {
                        vis[v] = true;
                        st.push(v);
                    }
                }
            }
            int sz = comp.size();
            Map<Integer, Integer> id = new HashMap<>();
            for (int j = 0; j < sz; j++) id.put(comp.get(j), j);
            List<List<Integer>> ladj = new ArrayList<>();
            for (int j = 0; j < sz; j++) ladj.add(new ArrayList<>());
            for (int u : comp) {
                for (int v : adj.get(u)) {
                    if (s.charAt(v - 1) == col && id.containsKey(v))
                        ladj.get(id.get(u)).add(id.get(v));
                }
            }
            int[] d1 = bfs(0, ladj, sz);
            int far1 = 0;
            for (int j = 0; j < sz; j++) if (d1[j] > d1[far1]) far1 = j;
            int[] d2 = bfs(far1, ladj, sz);
            int far2 = 0;
            for (int j = 0; j < sz; j++) if (d2[j] > d2[far2]) far2 = j;
            int[] d3 = bfs(far2, ladj, sz);
            for (int j = 0; j < sz; j++)
                mx[comp.get(j)] = Math.max(d2[j], d3[j]);
        }
    }
    private int[] bfs(int start, List<List<Integer>> ladj, int sz) {
        int[] dist = new int[sz];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new ArrayDeque<>();
        q.add(start);
        dist[start] = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : ladj.get(u)) {
                if (dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        return dist;
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @param {number[][]} edges
 * @returns {number}
 */

class Solution {
    longestPath(s, edges) {
        const n = s.length;
        const adj = Array.from({length: n + 1}, () => []);
        for (const e of edges) {
            adj[e[0]].push(e[1]);
            adj[e[1]].push(e[0]);
        }
        const redMax = new Array(n + 1).fill(0);
        const blueMax = new Array(n + 1).fill(0);
        const vis = new Array(n + 1).fill(false);
        const process = (col, mx) => {
            vis.fill(false);
            for (let i = 1; i <= n; i++) {
                if (vis[i] || s[i - 1] !== col) continue;
                const comp = [];
                const st = [i];
                vis[i] = true;
                while (st.length) {
                    const u = st.pop();
                    comp.push(u);
                    for (const v of adj[u]) {
                        if (!vis[v] && s[v - 1] === col) {
                            vis[v] = true;
                            st.push(v);
                        }
                    }
                }
                const sz = comp.length;
                const id = new Map();
                for (let j = 0; j < sz; j++) id.set(comp[j], j);
                const ladj = Array.from({length: sz}, () => []);
                for (const u of comp) {
                    for (const v of adj[u]) {
                        if (s[v - 1] === col && id.has(v))
                            ladj[id.get(u)].push(id.get(v));
                    }
                }
                const bfs = (start) => {
                    const dist = new Array(sz).fill(-1);
                    const q = [start];
                    dist[start] = 0;
                    let far = start;
                    let head = 0;
                    while (head < q.length) {
                        const u = q[head++];
                        if (dist[u] > dist[far]) far = u;
                        for (const v of ladj[u]) {
                            if (dist[v] === -1) {
                                dist[v] = dist[u] + 1;
                                q.push(v);
                            }
                        }
                    }
                    return [far, dist];
                };
                const [far1, d1] = bfs(0);
                const [far2, d2] = bfs(far1);
                const [far3, d3] = bfs(far2);
                for (let j = 0; j < sz; j++)
                    mx[comp[j]] = Math.max(d2[j], d3[j]);
            }
        };
        process('R', redMax);
        process('B', blueMax);
        let ans = 1;
        for (let i = 1; i <= n; i++) {
            if (s[i - 1] === 'R') ans = Math.max(ans, redMax[i] + 1);
            else ans = Math.max(ans, blueMax[i] + 1);
        }
        for (const e of edges) {
            const u = e[0], v = e[1];
            if (s[u - 1] !== s[v - 1]) {
                if (s[u - 1] === 'R')
                    ans = Math.max(ans, redMax[u] + 1 + blueMax[v] + 1);
                else
                    ans = Math.max(ans, blueMax[u] + 1 + redMax[v] + 1);
            }
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def longestPath(self, s, edges):
        n = len(s)
        adj = [[] for _ in range(n + 1)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        red_max = [0] * (n + 1)
        blue_max = [0] * (n + 1)
        vis = [False] * (n + 1)
        def process(col, mx):
            for i in range(1, n + 1):
                vis[i] = False
            for i in range(1, n + 1):
                if vis[i] or s[i - 1] != col:
                    continue
                comp = []
                st = [i]
                vis[i] = True
                while st:
                    u = st.pop()
                    comp.append(u)
                    for v in adj[u]:
                        if not vis[v] and s[v - 1] == col:
                            vis[v] = True
                            st.append(v)
                sz = len(comp)
                id_map = {comp[j]: j for j in range(sz)}
                ladj = [[] for _ in range(sz)]
                for u in comp:
                    for v in adj[u]:
                        if s[v - 1] == col and v in id_map:
                            ladj[id_map[u]].append(id_map[v])
                def bfs(start):
                    dist = [-1] * sz
                    q = [start]
                    dist[start] = 0
                    far = start
                    head = 0
                    while head < len(q):
                        u = q[head]
                        head += 1
                        if dist[u] > dist[far]:
                            far = u
                        for v in ladj[u]:
                            if dist[v] == -1:
                                dist[v] = dist[u] + 1
                                q.append(v)
                    return far, dist
                far1, _ = bfs(0)
                far2, d2 = bfs(far1)
                far3, d3 = bfs(far2)
                for j in range(sz):
                    mx[comp[j]] = max(d2[j], d3[j])
        process('R', red_max)
        process('B', blue_max)
        ans = 1
        for i in range(1, n + 1):
            if s[i - 1] == 'R':
                ans = max(ans, red_max[i] + 1)
            else:
                ans = max(ans, blue_max[i] + 1)
        for u, v in edges:
            if s[u - 1] != s[v - 1]:
                if s[u - 1] == 'R':
                    ans = max(ans, red_max[u] + 1 + blue_max[v] + 1)
                else:
                    ans = max(ans, blue_max[u] + 1 + red_max[v] + 1)
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow exactly the same logic; only the syntax changes.

We first allocate an adjacency list of size n+1 and insert every edge in both directions. Nodes stay 1-based so the colour of node i is simply s[i-1].

Two arrays redMax and blueMax are prepared. They will finally hold, for every node, the number of edges in the longest same-colour path that starts at that node.

A helper function processes one colour. It clears the visited array and then walks through every node. When it meets an unvisited node of the desired colour it starts a new component. The component is collected with an ordinary stack so that even a path of length 10^5 never overflows the call stack. While collecting we only step to neighbours that have the same colour; this automatically isolates the monochromatic forest.

Once the list of nodes belonging to the component is known we build a small local adjacency list. Original node numbers are mapped onto consecutive indices 0 \ldots sz-1. The local edges are exactly the original edges that stay inside the component.

On this local tree we perform the classic three-BFS diameter algorithm:
- BFS from index 0 finds one end of a diameter,
- BFS from that end finds the other end and also the distances from the first end,
- BFS from the second end gives distances from it.

For every local node we keep the larger of the two distances and write it back into redMax or blueMax under the original node id.

After both colours have been processed we initialise the answer to 1. We then look at every node and take its monochromatic distance plus one; that covers all pure-red and pure-blue paths.

Finally we examine every edge of the original tree. When the two ends have different colours the edge can serve as the single transition of a mixed path. We add the pre-computed monochromatic lengths of the two ends (plus one for each side) and keep the maximum. Because a tree path never repeats vertices, this construction never creates a cycle or a second colour change, so the path is always valid.

The largest number we ever saw is the length of the longest legal coloured path.

Edge-case handling is automatic:
- A component of size 1 yields distance 0.
- A tree that is entirely red or entirely blue is answered by the pure-path case.
- Isolated nodes contribute 1.

## Examples

**Example 1**

Input: s = "RBB", edges = [[1,2],[1,3]]

The tree is a star with red centre and two blue leaves.  
Red component = {1} → distance 0.  
Blue components = {2} and {3} → distances 0.  
Mixed edges give 0+1 + 0+1 = 2.  
Answer = 2.

**Example 2**

Input: s = "BB", edges = [[1,2]]

Both nodes are blue and connected.  
Blue component of size 2 → distance 1.  
Answer = 2.

**Example 3**

Suppose s = "RRBR", edges form a path 1-2-3-4.  
Red component {1,2} gives distances 1 and 1.  
Blue component {3} gives distance 0.  
Red component {4} gives distance 0.  
The mixed edge 2-3 produces (1+1)+(0+1) = 3.  
Answer = 3 (the path 1-2-3).

## How to Use / Run Locally

**C++**  
Save the code in a file named `main.cpp`.  
Compile with:  
`g++ -std=c++17 -O2 main.cpp -o main`  
Run:  
`./main`  
(You will need to add a small driver that reads n, the string s and the edges, then calls the function.)

**Java**  
Save the code in `Solution.java`.  
Compile:  
`javac Solution.java`  
Run with a driver class that creates a `Solution` object and prints the result.

**JavaScript**  
Save the code in `solution.js`.  
Run with Node.js:  
`node solution.js`  
(Again a short driver that supplies the input is required.)

**Python3**  
Save the code in `solution.py`.  
Run:  
`python3 solution.py`  
Add a few lines at the bottom that read the input and call `Solution().longestPath(s, edges)`.

In all languages the function signature matches the one expected by online judges, so you can paste the class directly into GeeksforGeeks, LeetCode-style platforms, etc.

## Notes & Optimizations

- The three-BFS diameter method works only because every component is a tree. On a general graph it would be incorrect.
- Iterative collection of components is essential; a recursive DFS would exceed the stack limit on a skewed tree of size 10^5.
- We never need the actual path, only its length, so storing parent pointers is unnecessary.
- An alternative approach would root the whole tree and compute down-heights and up-heights with rerooting. That also works in linear time but the code is longer and easier to get wrong. The component-plus-diameter method is shorter and clearer for this particular constraint.
- If the problem asked for the path itself we could keep parent arrays during the BFS passes and reconstruct the path at the end; the asymptotic cost would stay the same.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)