# Party in Town - Find Minimum Maximum Distance in a Tree

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

Geek Town has n houses numbered from 1 to n. The houses are connected by n-1 bidirectional roads and form a tree. You need to choose one house to host a party so that the distance to the farthest house is as small as possible. Return that minimum possible distance.

The connections are given as an adjacency list called adj. adj[i] holds the list of houses directly connected to house number i+1. Note that the numbers inside the adjacency list are 1-based house numbers.

In short, this is a classic tree problem: find the radius of the tree (the smallest eccentricity of any node).

## Constraints

- 1 ≤ n ≤ 10^5
- 1 ≤ adj[i][j] ≤ n
- adj.size() = n
- The given graph is always a tree (connected and has exactly n-1 edges)

## Intuition

When I first read the problem I realized we are dealing with a tree. In a tree the longest path between any two nodes is called the diameter. The best place to put the party is somewhere near the middle of that longest path. That way the farthest house cannot be farther than roughly half the diameter.

So the answer we need is simply ceil(diameter / 2). This value is also known as the radius of the tree. Finding the diameter with two BFS runs is enough to solve the whole problem efficiently.

## Approach

1. Handle the trivial case when there is only one house. The answer is 0.
2. Run a BFS from any node (I always start from index 0). Keep track of the farthest node reached. Call this node u. This gives one end of a longest path.
3. Run a second BFS starting from u. The farthest distance found in this BFS is the diameter of the tree.
4. Return (diameter + 1) // 2. This is the mathematical way to compute ceil(diameter / 2).

One important detail: the adjacency list stores 1-based house numbers. Every time we read a neighbor value we must convert it to a 0-based index by subtracting 1 before using it.

## Data Structures Used

- Adjacency list (given as input) – stores the tree edges.
- Queue – used for BFS traversal.
- Distance array – keeps the distance of every node from the current BFS source and also marks visited nodes.

These structures are simple, efficient, and perfect for tree diameter calculations.

## Operations & Behavior Summary

- Convert the 1-based neighbor values into 0-based indices on the fly.
- First BFS finds one endpoint of the diameter.
- Second BFS starts from that endpoint and measures the true diameter length.
- A simple arithmetic formula turns the diameter into the required radius.
- Early return for the single-node case avoids unnecessary work.

## Complexity

| Complexity Type | Value | Explanation |
|-----------------|-------|-------------|
| Time Complexity | O(n) | Two BFS traversals each visit every node and every edge a constant number of times. |
| Space Complexity | O(n) | Space used by the queue and the distance array. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int partyHouse(vector<vector<int>> &adj) {
        int n = adj.size();
        if (n == 1) return 0;               // single house, distance is zero
        
        // helper that returns {farthest node index, distance to it}
        auto bfs = [&](int start) {
            vector<int> dist(n, -1);
            queue<int> q;
            q.push(start);
            dist[start] = 0;
            int far = start;
            while (!q.empty()) {
                int u = q.front(); q.pop();
                for (int v : adj[u]) {
                    int idx = v - 1;          // convert 1-based house number to 0-based index
                    if (dist[idx] == -1) {
                        dist[idx] = dist[u] + 1;
                        q.push(idx);
                        if (dist[idx] > dist[far]) far = idx;
                    }
                }
            }
            return make_pair(far, dist[far]);
        };
        
        // first BFS: find one end of the diameter
        auto [u, _] = bfs(0);
        // second BFS: find the other end and the length of the diameter
        auto [v, diameter] = bfs(u);
        
        // radius is ceil(diameter / 2)
        return (diameter + 1) / 2;
    }
};
```

### Java

```java
class Solution {
    public int partyHouse(ArrayList<ArrayList<Integer>> adj) {
        int n = adj.size();
        if (n == 1) return 0;
        
        // returns int[]{farthest node index, distance}
        int[] bfs(int start) {
            int[] dist = new int[n];
            Arrays.fill(dist, -1);
            Queue<Integer> q = new LinkedList<>();
            q.add(start);
            dist[start] = 0;
            int far = start;
            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : adj.get(u)) {
                    int idx = v - 1;          // convert 1-based house number to 0-based index
                    if (dist[idx] == -1) {
                        dist[idx] = dist[u] + 1;
                        q.add(idx);
                        if (dist[idx] > dist[far]) far = idx;
                    }
                }
            }
            return new int[]{far, dist[far]};
        }
        
        int[] first = bfs(0);
        int[] second = bfs(first[0]);
        int diameter = second[1];
        return (diameter + 1) / 2;
    }
}
```

### JavaScript

```javascript
/*
 * @param {number[][]} adj
 * @return {number}
 */
class Solution {
    partyHouse(adj) {
        const n = adj.length;
        if (n === 1) return 0;
        
        // returns [farthest node index, distance]
        const bfs = (start) => {
            const dist = new Array(n).fill(-1);
            const q = [start];
            dist[start] = 0;
            let far = start;
            let head = 0;
            while (head < q.length) {
                const u = q[head++];
                for (const v of adj[u]) {
                    const idx = v - 1;        // convert 1-based house number to 0-based index
                    if (dist[idx] === -1) {
                        dist[idx] = dist[u] + 1;
                        q.push(idx);
                        if (dist[idx] > dist[far]) far = idx;
                    }
                }
            }
            return [far, dist[far]];
        };
        
        const [u] = bfs(0);
        const [, diameter] = bfs(u);
        return Math.floor((diameter + 1) / 2);
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def partyHouse(self, adj: list[list[int]]) -> int:
        n = len(adj)
        if n == 1:
            return 0
        
        # returns (farthest node index, distance)
        def bfs(start):
            dist = [-1] * n
            q = deque([start])
            dist[start] = 0
            far = start
            while q:
                u = q.popleft()
                for v in adj[u]:
                    idx = v - 1               # convert 1-based house number to 0-based index
                    if dist[idx] == -1:
                        dist[idx] = dist[u] + 1
                        q.append(idx)
                        if dist[idx] > dist[far]:
                            far = idx
            return far, dist[far]
        
        u, _ = bfs(0)
        _, diameter = bfs(u)
        return (diameter + 1) // 2
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same core idea. The only differences are language syntax and how the helper BFS is written.

In every language we first check if n equals 1 and return 0 immediately.

Then we perform two BFS runs. The first run starts at index 0 and records the farthest index it can reach. The second run starts from that farthest index and records the maximum distance found. That maximum distance is the diameter.

While exploring neighbors we always subtract 1 from the stored house number so we stay inside the 0-based arrays.

In C++ and Python the BFS helper is written as a local lambda or nested function. In Java the helper must be a private method of the class because the judge’s Java version does not allow local methods inside another method. In JavaScript we use a simple array as a queue and keep a head pointer to avoid the slow shift operation.

After obtaining the diameter we return (diameter + 1) divided by 2 using integer arithmetic. This gives the correct ceil value for both even and odd diameters.

Edge cases such as a straight line of houses or a star-shaped tree are handled correctly by the same two-BFS process.

## Examples

**Example 1**

Input:  
adj = [[2], [1,3,4], [2], [2]]

The tree looks like this:

```
    2
   /|\
  1 3 4
```

Diameter length = 2  
Answer = (2 + 1) // 2 = 1

**Example 2**

Input:  
adj = [[2], [1,3], [2,4], [3]]

The tree looks like this:

```
    3
   / \
  4   2
       \
        1
```

Diameter length = 3  
Answer = (3 + 1) // 2 = 2

**Example 3**

Input:  
adj = [[2], [1]]

Two houses connected by a single road.  
Diameter length = 1  
Answer = 1

## How to Use / Run Locally

**C++**  

1. Save the code in a file named `main.cpp`.  
2. Compile: `g++ -std=c++17 main.cpp -o main`  
3. Run: `./main`

**Java**  

1. Save the code in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`

**JavaScript**  

1. Save the code in a file named `solution.js`.  
2. Run with Node.js: `node solution.js`

**Python3**  

1. Save the code in a file named `solution.py`.  
2. Run: `python3 solution.py`

You will need to add a small driver that reads the adjacency list and calls the partyHouse method if you want to test with custom input.

## Notes & Optimizations

- The two-BFS method is optimal for finding the diameter (and therefore the radius) of a tree in linear time.
- Because n can be as large as 10^5, any O(n²) solution that computes the eccentricity of every node will time out.
- Always remember the 1-based to 0-based conversion. Forgetting it is the most common source of wrong answers and runtime errors on this problem.
- The same technique works for any undirected tree; it does not depend on the houses being numbered in any special order.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
