# Count Tree Paths With Limited Max Edge Weight - GeeksforGeeks Solution

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

You are given a weighted tree with n nodes and n-1 edges. Each edge has a weight. You also receive a list of queries. Every query gives a number x. For that query you must count how many different paths exist in the tree where the heaviest edge on the path is less than or equal to x.

A path must contain at least one edge. The path from u to v is the same as the path from v to u.

The goal is to return an array that contains the answer for every query in the same order the queries were given.

This is a classic offline query problem on trees that can be solved efficiently with sorting and Union-Find (Disjoint Set Union).

## Constraints

- 2 ≤ n ≤ 10^4
- 1 ≤ queries.size() ≤ 10^4
- 0 ≤ queries[i] ≤ 10^5
- edges.size() = n - 1
- 1 ≤ edges[i][0], edges[i][1] ≤ n
- edges[i][0] ≠ edges[i][1]
- 0 ≤ edges[i][2] ≤ 10^5

## Intuition

The first thing I noticed is that the limits are large enough that answering each query by walking the whole tree would be too slow. Because the structure is a tree, every pair of nodes has exactly one path between them. If I add edges in increasing order of weight, I can keep track of how many new paths become valid the moment an edge is added. Union-Find with component sizes lets me calculate that number instantly: when two components of size a and b get connected, exactly a × b new paths appear. Sorting both the edges and the queries then lets me process everything in one clean pass.

## Approach

I sort all edges by their weight from smallest to largest.  
I also attach each query’s original index and sort the queries by the allowed weight x.  

I begin with n separate nodes. Each node is its own component of size 1 and the current path count is zero.  

I walk through the sorted queries. For the current query value x I keep adding every edge whose weight is still ≤ x.  
Whenever an edge joins two different components, I add the product of their sizes to the path count and merge the components using union by size.  

After all allowed edges for that query have been added, the current path count is the answer. I store it at the original index of the query.  

Because both the edges and the queries are processed only once in sorted order, the whole solution stays efficient.

## Data Structures Used

- Parent array and size array for the Disjoint Set Union structure. They let me find the root of any node quickly and know the size of each component.
- A list of pairs that stores each query value together with its original index so answers can be placed back in the correct order.
- The edge list itself, sorted by weight.

These structures are enough to keep track of connected components and the running total of valid paths.

## Operations & Behavior Summary

1. Sort the edges by increasing weight.  
2. Create a list of (query value, original index) pairs and sort it by query value.  
3. Initialize parent and size arrays so every node starts alone.  
4. Set the running path count to zero and an edge pointer to the start of the sorted edge list.  
5. For each query in sorted order:  
   - While the next edge has weight ≤ current query value, try to add it.  
   - If the two endpoints belong to different components, add (size1 × size2) to the path count and merge the components.  
   - Record the current path count as the answer for this query.  
6. Return the answers in the original query order.

## Complexity

| Type              | Complexity          | Explanation |
|-------------------|---------------------|-------------|
| Time Complexity   | O(n log n + q log q) | Sorting the edges takes O(n log n). Sorting the queries takes O(q log q). Union-Find operations are nearly linear. |
| Space Complexity  | O(n + q)            | Parent and size arrays of length n, plus storage for the sorted queries and the answer array. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> maximumWeight(int n, vector<vector<int>> edges, vector<int>& queries) {
        sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[2] < b[2];
        });
        int q = queries.size();
        vector<pair<int,int>> sortedQ(q);
        for (int i = 0; i < q; i++) sortedQ[i] = {queries[i], i};
        sort(sortedQ.begin(), sortedQ.end());
        vector<int> parent(n + 1), sz(n + 1, 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
        function<int(int)> find = [&](int x) {
            return parent[x] == x ? x : parent[x] = find(parent[x]);
        };
        long long paths = 0;
        vector<int> ans(q);
        int j = 0;
        for (auto& [x, idx] : sortedQ) {
            while (j < (int)edges.size() && edges[j][2] <= x) {
                int u = edges[j][0], v = edges[j][1];
                int pu = find(u), pv = find(v);
                if (pu != pv) {
                    paths += 1LL * sz[pu] * sz[pv];
                    if (sz[pu] < sz[pv]) swap(pu, pv);
                    parent[pv] = pu;
                    sz[pu] += sz[pv];
                }
                j++;
            }
            ans[idx] = (int)paths;
        }
        return ans;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> maximumWeight(int n, int[][] edges, int[] queries) {
        Arrays.sort(edges, (a, b) -> Integer.compare(a[2], b[2]));
        int q = queries.length;
        int[][] sortedQ = new int[q][2];
        for (int i = 0; i < q; i++) {
            sortedQ[i][0] = queries[i];
            sortedQ[i][1] = i;
        }
        Arrays.sort(sortedQ, (a, b) -> Integer.compare(a[0], b[0]));
        int[] parent = new int[n + 1];
        int[] sz = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            parent[i] = i;
            sz[i] = 1;
        }
        long paths = 0;
        int[] ans = new int[q];
        int j = 0;
        for (int[] query : sortedQ) {
            int x = query[0], idx = query[1];
            while (j < edges.length && edges[j][2] <= x) {
                int u = edges[j][0], v = edges[j][1];
                int pu = find(parent, u), pv = find(parent, v);
                if (pu != pv) {
                    paths += (long) sz[pu] * sz[pv];
                    if (sz[pu] < sz[pv]) {
                        int tmp = pu; pu = pv; pv = tmp;
                    }
                    parent[pv] = pu;
                    sz[pu] += sz[pv];
                }
                j++;
            }
            ans[idx] = (int) paths;
        }
        ArrayList<Integer> res = new ArrayList<>();
        for (int val : ans) res.add(val);
        return res;
    }
    private int find(int[] parent, int x) {
        if (parent[x] != x) parent[x] = find(parent, parent[x]);
        return parent[x];
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} queries
 * @return {number[]}
 */
class Solution {
    maximumWeight(n, edges, queries) {
        edges.sort((a, b) => a[2] - b[2]);
        const q = queries.length;
        const sortedQ = [];
        for (let i = 0; i < q; i++) sortedQ.push([queries[i], i]);
        sortedQ.sort((a, b) => a[0] - b[0]);
        const parent = new Array(n + 1);
        const sz = new Array(n + 1).fill(1);
        for (let i = 1; i <= n; i++) parent[i] = i;
        const find = (x) => {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        };
        let paths = 0;
        const ans = new Array(q);
        let j = 0;
        for (const [x, idx] of sortedQ) {
            while (j < edges.length && edges[j][2] <= x) {
                const u = edges[j][0], v = edges[j][1];
                let pu = find(u), pv = find(v);
                if (pu !== pv) {
                    paths += sz[pu] * sz[pv];
                    if (sz[pu] < sz[pv]) [pu, pv] = [pv, pu];
                    parent[pv] = pu;
                    sz[pu] += sz[pv];
                }
                j++;
            }
            ans[idx] = paths;
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maximumWeight(self, n, edges, queries):
        edges.sort(key=lambda e: e[2])
        q = len(queries)
        sortedQ = [(queries[i], i) for i in range(q)]
        sortedQ.sort()
        parent = list(range(n + 1))
        sz = [1] * (n + 1)
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        paths = 0
        ans = [0] * q
        j = 0
        for x, idx in sortedQ:
            while j < len(edges) and edges[j][2] <= x:
                u, v = edges[j][0], edges[j][1]
                pu, pv = find(u), find(v)
                if pu != pv:
                    paths += sz[pu] * sz[pv]
                    if sz[pu] < sz[pv]:
                        pu, pv = pv, pu
                    parent[pv] = pu
                    sz[pu] += sz[pv]
                j += 1
            ans[idx] = paths
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in every language; only the syntax changes.

I first sort the edges so the lightest ones come first. This guarantees that when I process a query I only need to look at edges I have not yet considered.

I also build a list that pairs every query value with its original position. Sorting this list lets me answer the queries from smallest allowed weight to largest while still knowing where to put each answer.

I create a parent array and a size array. At the start every node points to itself and every size is 1. The find function uses path compression so later lookups stay fast.

A single variable keeps the current number of valid paths. An index points to the next edge that might be added.

For every query in the sorted list I keep adding edges while their weight is still allowed. When an edge connects two different components I multiply their sizes and add that product to the path count. Then I attach the smaller component under the larger one and update the size.

After the inner loop finishes, the path count is exactly the number of paths whose heaviest edge is ≤ the current query value. I write that number into the answer array at the original index.

When all queries are finished the answer array is ready to return.

The same sequence of steps appears in C++, Java, JavaScript and Python. The only differences are how arrays, sorting and lambda-style comparisons are written in each language.

## Examples

**Example 1**  
Input: n = 3, edges = [[1, 2, 1], [2, 3, 4]], queries = [3]  
Output: [1]  

Only the edge of weight 1 is allowed. That edge connects two single nodes, so one path is created. The edge of weight 4 is ignored. Result is 1.

**Example 2**  
Input: n = 7, edges = [[1, 2, 3], [2, 3, 1], [2, 4, 9], [3, 6, 7], [3, 5, 8], [5, 7, 4]], queries = [1, 3, 5]  
Output: [1, 3, 4]  

- For x = 1 only the edge of weight 1 is added → 1 path.  
- For x = 3 the edges of weight 1 and 3 are added → three paths appear.  
- For x = 5 the edges of weight 1, 3 and 4 are added → four paths in total.

**Example 3**  
Input: n = 4, edges = [[1, 2, 2], [2, 3, 3], [3, 4, 1]], queries = [1, 2, 3]  
Output: [1, 2, 6]  

- x = 1 → only the lightest edge → 1 path.  
- x = 2 → two edges → 2 paths.  
- x = 3 → all three edges form one connected component of size 4 → 6 paths.

## How to Use / Run Locally

**C++**  

1. Copy the solution into a file named main.cpp.  
2. Compile with: g++ -std=c++17 main.cpp -o main  
3. Run: ./main  

**Java**  

1. Put the code inside a class named Solution in a file Solution.java.  
2. Compile: javac Solution.java  
3. Run the driver that calls the method (or use an online judge that supplies the driver).

**JavaScript**  

1. Save the class in a file solution.js.  
2. Run with Node: node solution.js (you will need a small driver that creates an instance and prints the result).

**Python3**  

1. Save the class in a file solution.py.  
2. Run: python3 solution.py (again a short driver that builds the input and prints the returned list is required).

Most online judges already supply the input reading and output printing code, so you only need to implement the method itself.

## Notes & Optimizations

- Union by size keeps the trees shallow and makes the path-counting step O(1).  
- Path compression is essential for the near-linear performance of the find operation.  
- The solution is offline; if queries arrived online the same technique would not work without additional structures.  
- Because the graph is a tree there is never a cycle, so every added edge always merges two different components.  
- The same idea can be extended to more complex path queries by combining it with techniques such as binary lifting or heavy-light decomposition, but for this problem the simple offline Union-Find approach is optimal.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
