# Min Edge Reversals for Path

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

You are given a directed graph with n vertices numbered from 1 to n. The graph is given as a list of directed edges. You also get a source vertex src and a destination vertex dst.

Your task is to find the minimum number of edges you need to reverse so that there is at least one path from src to dst. If it is impossible to create any path even after reversing edges, return -1.

This is a classic minimum edge reversal problem on a directed graph. The goal is to make src reachable to dst by flipping as few directed edges as possible.

## Constraints

- 1 ≤ n, m ≤ 10^5
- 1 ≤ edges[i][0], edges[i][1] ≤ n
- 1 ≤ src, dst ≤ n

Because n and m can be as large as 100000, any solution slower than linear time will get Time Limit Exceeded.

## Intuition

The first thing I noticed is that keeping an original edge costs me nothing, while reversing an edge costs exactly 1. So the problem is really about finding a path from src to dst where the total number of reversed edges is as small as possible.

This is the same as finding the shortest path in a new graph where every original edge has weight 0 and every possible reverse edge has weight 1. When all weights are only 0 or 1, the best tool is 0-1 BFS. It runs in linear time and gives the exact minimum number of reversals needed.

## Approach

I first build a new adjacency list that contains both directions for every edge:

- Original edge u → v gets cost 0
- Reverse edge v → u gets cost 1

Then I run 0-1 BFS starting from src. I keep a distance array that stores the minimum reversals needed to reach each node. I use a deque so that edges of cost 0 are processed before edges of cost 1. This guarantees that the first time I reach the destination, I have used the fewest possible reversals.

If the destination is never reached, I return -1.

## Data Structures Used

- Adjacency list of pairs (neighbor, cost) – stores the bidirectional graph with 0/1 weights
- Distance array – keeps the minimum reversals found so far for every vertex
- Deque – the core of 0-1 BFS; allows pushing free edges to the front and costly edges to the back

## Operations & Behavior Summary

1. Build the bidirectional graph with 0-cost original edges and 1-cost reverse edges.
2. Initialize distance of source to 0 and all other nodes to infinity.
3. Push the source into a deque.
4. While the deque is not empty:
   - Pop the front node.
   - For every neighbor, try to improve its distance using the current edge cost.
   - If the edge cost is 0, push the neighbor to the front of the deque.
   - If the edge cost is 1, push the neighbor to the back of the deque.
5. After the search finishes, return the distance of the destination or -1 if it is still infinity.

## Complexity

| Type             | Value    | Explanation                                                                                         |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------- |
| Time Complexity  | O(n + m) | Building the graph takes O(m). 0-1 BFS visits each vertex and each edge a constant number of times. |
| Space Complexity | O(n + m) | Adjacency list stores O(m) edges. Distance array and deque use O(n) extra space.                    |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minimumEdgeReversal(vector<vector<int>> &edges, int n, int src, int dst) {
        // adjacency list: each entry is {neighbor, cost}
        vector<vector<pair<int,int>>> adj(n+1);
        
        // for every original edge u->v add both directions
        for(auto &e : edges){
            int u = e[0], v = e[1];
            adj[u].push_back({v, 0}); // keep original, cost 0
            adj[v].push_back({u, 1}); // reverse it, cost 1
        }
        
        // distance array, INF means unreachable
        const int INF = 1e9;
        vector<int> dist(n+1, INF);
        dist[src] = 0;
        
        // 0-1 BFS deque
        deque<int> dq;
        dq.push_back(src);
        
        while(!dq.empty()){
            int u = dq.front();
            dq.pop_front();
            
            for(auto [v, cost] : adj[u]){
                if(dist[u] + cost < dist[v]){
                    dist[v] = dist[u] + cost;
                    // cost 0 → push front, cost 1 → push back
                    if(cost == 0)
                        dq.push_front(v);
                    else
                        dq.push_back(v);
                }
            }
        }
        
        // if dst still INF we cannot reach it
        return dist[dst] == INF ? -1 : dist[dst];
    }
};
```

### Java

```java
class Solution {
    public int minimumEdgeReversal(int[][] edges, int n, int src, int dst) {
        // adjacency list: each entry is {neighbor, cost}
        List<List<int[]>> adj = new ArrayList<>();
        for(int i = 0; i <= n; i++)
            adj.add(new ArrayList<>());
        
        // for every original edge u->v add both directions
        for(int[] e : edges){
            int u = e[0], v = e[1];
            adj.get(u).add(new int[]{v, 0}); // keep original, cost 0
            adj.get(v).add(new int[]{u, 1}); // reverse it, cost 1
        }
        
        // distance array, INF means unreachable
        int INF = (int)1e9;
        int[] dist = new int[n+1];
        Arrays.fill(dist, INF);
        dist[src] = 0;
        
        // 0-1 BFS deque
        Deque<Integer> dq = new ArrayDeque<>();
        dq.addLast(src);
        
        while(!dq.isEmpty()){
            int u = dq.pollFirst();
            
            for(int[] edge : adj.get(u)){
                int v = edge[0], cost = edge[1];
                if(dist[u] + cost < dist[v]){
                    dist[v] = dist[u] + cost;
                    // cost 0 → push front, cost 1 → push back
                    if(cost == 0)
                        dq.addFirst(v);
                    else
                        dq.addLast(v);
                }
            }
        }
        
        // if dst still INF we cannot reach it
        return dist[dst] == INF ? -1 : dist[dst];
    }
}
```

### JavaScript

```javascript
/*
 @param {number[][]}
 @param {number}
 @param {number}
 @param {number}
 @return {number}
*/

class Solution {
    minimumEdgeReversal(edges, n, src, dst) {
        // adjacency list: each entry is [neighbor, cost]
        let adj = Array.from({length: n+1}, () => []);
        
        // for every original edge u->v add both directions
        for(let e of edges){
            let u = e[0], v = e[1];
            adj[u].push([v, 0]); // keep original, cost 0
            adj[v].push([u, 1]); // reverse it, cost 1
        }
        
        // distance array, INF means unreachable
        let INF = 1e9;
        let dist = new Array(n+1).fill(INF);
        dist[src] = 0;
        
        // 0-1 BFS deque
        let dq = [];
        dq.push(src);
        
        while(dq.length > 0){
            let u = dq.shift();
            
            for(let [v, cost] of adj[u]){
                if(dist[u] + cost < dist[v]){
                    dist[v] = dist[u] + cost;
                    // cost 0 → push front, cost 1 → push back
                    if(cost === 0)
                        dq.unshift(v);
                    else
                        dq.push(v);
                }
            }
        }
        
        // if dst still INF we cannot reach it
        return dist[dst] === INF ? -1 : dist[dst];
    }
}
```

### Python3

```python
class Solution:
    def minimumEdgeReversal(self, edges: list[list[int]], n: int, src: int, dst: int) -> int:
        # adjacency list: each entry is (neighbor, cost)
        adj = [[] for _ in range(n+1)]
        
        # for every original edge u->v add both directions
        for u, v in edges:
            adj[u].append((v, 0))  # keep original, cost 0
            adj[v].append((u, 1))  # reverse it, cost 1
        
        # distance array, INF means unreachable
        INF = 10**9
        dist = [INF] * (n+1)
        dist[src] = 0
        
        # 0-1 BFS deque
        from collections import deque
        dq = deque([src])
        
        while dq:
            u = dq.popleft()
            
            for v, cost in adj[u]:
                if dist[u] + cost < dist[v]:
                    dist[v] = dist[u] + cost
                    # cost 0 → push front, cost 1 → push back
                    if cost == 0:
                        dq.appendleft(v)
                    else:
                        dq.append(v)
        
        # if dst still INF we cannot reach it
        return -1 if dist[dst] == INF else dist[dst]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. Only the syntax changes.

I start by creating an adjacency list of size n+1. For every given edge I insert two directed edges: one with cost 0 (keep the original direction) and one with cost 1 (the reverse). This models the choice of whether to flip an edge or not.

I then create a distance array filled with a large number (infinity). The source is set to distance 0 because I start there with zero reversals. A deque is initialized with the source.

In the main loop I always take the node at the front of the deque. For each of its neighbors I calculate a candidate distance = current distance + edge cost. If this candidate is better than the stored distance, I update it. When the edge cost is 0 I push the neighbor to the front so that free paths are explored first. When the cost is 1 I push it to the back.

Because every edge weight is only 0 or 1, this ordering guarantees that the first time a node is finalized it already holds the minimum number of reversals. After the deque becomes empty, the value stored for the destination is the answer. If it is still infinity, no path exists even after any number of reversals.

Edge cases such as src equal to dst (answer 0) and completely disconnected graphs (answer -1) are handled automatically by the distance array.

## Examples

Example 1  
Input: n = 3, edges = [[1,2],[3,2]], src = 1, dst = 3

The graph originally has 1 → 2 and 3 → 2.  
After adding reverse edges the possible moves become:  
1 --0--> 2, 2 --1--> 1, 3 --0--> 2, 2 --1--> 3

0-1 BFS from 1 reaches 2 with cost 0, then reaches 3 with cost 1.  
Output: 1

Example 2  
Input: n = 4, edges = [[1,2],[2,3],[3,4]], src = 1, dst = 4

A path already exists: 1 → 2 → 3 → 4. No reversals are needed.  
Output: 0

Example 3  
Input: n = 3, edges = [[1,2],[2,1]], src = 1, dst = 3

No edge can ever connect node 3 to the component of 1 and 2.  
Output: -1

## How to Use / Run Locally

C++

1. Copy the C++ code into a file named solution.cpp.
2. Compile with: g++ -std=c++17 solution.cpp -o solution
3. Run with: ./solution

Java

1. Copy the Java code into a file named Solution.java.
2. Compile with: javac Solution.java
3. Run with: java Solution

JavaScript

1. Copy the JavaScript code into a file named solution.js.
2. Run with: node solution.js

Python3

1. Copy the Python code into a file named solution.py.
2. Run with: python3 solution.py

In each language you will need to add a small main function or driver code that reads input and calls the minimumEdgeReversal method, because the class only contains the solution function.

## Notes & Optimizations

The solution is already optimal for the given constraints. Ordinary Dijkstra would also work but would be slower because of the logarithmic factor of a priority queue. 0-1 BFS removes that overhead completely.

If the graph contains self-loops or multiple edges between the same pair of nodes, the algorithm still works correctly because the distance array only keeps the best cost found so far.

One common mistake is forgetting to add the reverse edges. Without them the search can never pay the cost of a reversal and will return wrong answers on many test cases.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
