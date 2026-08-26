# Negative Weight Cycle - Bellman-Ford Algorithm | GeeksforGeeks Solution

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

The **Negative Weight Cycle** problem asks me to determine whether a weighted directed graph contains a cycle whose total edge weight is negative.

The graph contains `V` vertices numbered from `0` to `V - 1`. Each edge is given in the form:

```text
[u, v, w]
```

This means there is a directed edge from vertex `u` to vertex `v` with weight `w`.

I need to return:

* `true` if the graph contains at least one negative weight cycle
* `false` if no negative weight cycle exists

A negative cycle is important because its total weight can keep decreasing every time the cycle is repeated. For example, if a cycle has a total weight of `-3`, going around it again and again keeps reducing the path value.

This solution uses the **Bellman-Ford algorithm**, which is one of the standard algorithms for detecting negative weight cycles in a weighted graph.

## Constraints

| Constraint             |            Value |
| ---------------------- | ---------------: |
| Number of vertices     |    `1 ≤ V ≤ 10³` |
| Number of edges        |    `0 ≤ E ≤ 10⁵` |
| Source vertex `u`      |      `0 ≤ u < V` |
| Destination vertex `v` |      `0 ≤ v < V` |
| Edge weight `w`        | `-10⁶ ≤ w ≤ 10⁶` |

## Intuition

My first thought was that I do not actually need to find the negative cycle itself. I only need to know whether one exists.

Since the graph can contain negative edge weights, I cannot use algorithms such as Dijkstra's algorithm for this job. Bellman-Ford is a much better fit because it handles negative weights and has a direct way to detect negative cycles.

I noticed one important rule: in a graph without a negative weight cycle, the shortest distances should stop improving after at most `V - 1` rounds of edge relaxation.

So my idea is simple. I relax every edge `V - 1` times and then make one extra pass through all edges.

If any distance can still become smaller during that extra pass, a negative weight cycle must exist.

Another important detail is that the graph may be disconnected. A negative cycle could exist in a component that is not reachable from vertex `0`. To detect cycles anywhere in the graph, I start every vertex with a distance of `0`.

## Approach

I solve the problem using the Bellman-Ford negative cycle detection approach.

1. I create a `dist` array with `V` elements.
2. I initialize every distance to `0`.
3. I repeat the edge relaxation process `V - 1` times.
4. For every edge `[u, v, w]`, I check whether going from `u` to `v` gives a smaller value.
5. If `dist[u] + w < dist[v]`, I update `dist[v]`.
6. If an entire round makes no updates, I stop early because the values are already stable.
7. After the main rounds, I check every edge one more time.
8. If any edge can still reduce a distance, I return `true`.
9. Otherwise, I return `false`.

The final extra check is what detects the negative weight cycle.

## Data Structures Used

### Distance Array

I use a `dist` array of size `V`.

It stores the current smallest value found for each vertex during edge relaxation. Since I only need to detect a negative cycle anywhere in the graph, I initialize all values to `0`.

This is equivalent to treating every connected component as reachable for the purpose of cycle detection.

### Edge List

The input already provides the graph as an edge list.

Each edge contains three values:

```text
[u, v, w]
```

Because Bellman-Ford needs to process every edge repeatedly, using the given edge list directly is efficient and avoids creating an unnecessary adjacency list.

## Operations & Behavior Summary

The algorithm works in the following order:

```text
Create a distance array of size V
Set every distance to 0

Repeat V - 1 times:
    Set updated to false

    For every edge [u, v, w]:
        If dist[u] + w is smaller than dist[v]:
            Update dist[v]
            Set updated to true

    If no update happened:
        Stop early

Check every edge one final time:
    If dist[u] + w is still smaller than dist[v]:
        Return true

Return false
```

The first `V - 1` rounds allow all normal shortest path updates to settle.

The final pass checks whether an improvement is still possible. If it is, the graph contains a cycle with a negative total weight.

## Complexity

| Type             | Complexity | Explanation                                                                                 |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------- |
| Time Complexity  | `O(V × E)` | I process all `E` edges for up to `V - 1` rounds, followed by one final check of all edges. |
| Space Complexity | `O(V)`     | I only use the `dist` array with one value for each of the `V` vertices.                    |

Here, `V` is the number of vertices and `E` is the number of directed edges.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool isNegativeWeightCycle(int V, vector<vector<int>>& edges) {
        // I keep every distance as 0 so every disconnected component
        // is effectively considered while checking for a negative cycle.
        vector<long long> dist(V, 0);

        // A shortest simple path can use at most V - 1 edges,
        // so I relax every edge for V - 1 rounds.
        for (int i = 0; i < V - 1; i++) {
            bool updated = false;

            // I check every directed edge [u, v, w].
            for (auto& edge : edges) {
                int u = edge[0];
                int v = edge[1];
                int w = edge[2];

                // If going from u to v gives a smaller value,
                // I update v because this is the Bellman-Ford relaxation step.
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    updated = true;
                }
            }

            // If no edge changed in this round, all values are already stable,
            // so running more rounds would not change the answer.
            if (!updated) break;
        }

        // I make one extra pass. Any further improvement after V - 1 rounds
        // means a negative-weight cycle exists somewhere in the graph.
        for (auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (dist[u] + w < dist[v]) {
                return true;
            }
        }

        // No value can be reduced further, so there is no negative cycle.
        return false;
    }
};
```

### Java

```java
class Solution {
    public boolean isNegativeWeightCycle(int V, int[][] edges) {
        // I keep every distance as 0 so disconnected components
        // are also included in the negative cycle check.
        long[] dist = new long[V];

        // I relax every edge V - 1 times because a simple path
        // can contain at most V - 1 edges.
        for (int i = 0; i < V - 1; i++) {
            boolean updated = false;

            // I process each directed edge [u, v, w].
            for (int[] edge : edges) {
                int u = edge[0];
                int v = edge[1];
                int w = edge[2];

                // If this edge gives v a smaller value,
                // I update dist[v] using the Bellman-Ford rule.
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    updated = true;
                }
            }

            // If nothing changed, the distances are already stable,
            // so I do not need to continue the remaining rounds.
            if (!updated) {
                break;
            }
        }

        // I check every edge one more time. An improvement here
        // is only possible when a negative-weight cycle exists.
        for (int[] edge : edges) {
            int u = edge[0];
            int v = edge[1];
            int w = edge[2];

            if (dist[u] + w < dist[v]) {
                return true;
            }
        }

        // No additional relaxation means no negative-weight cycle.
        return false;
    }
}
```

### JavaScript

```javascript
class Solution {
    /**
     * @param {number} V
     * @param {number[][]} edges
     * @return {boolean}
     */
    isNegativeWeightCycle(V, edges) {
        // I start every distance at 0 so all disconnected components
        // are considered instead of starting from only one source.
        const dist = new Array(V).fill(0);

        // I relax all edges V - 1 times because a simple path
        // cannot contain more than V - 1 edges.
        for (let i = 0; i < V - 1; i++) {
            let updated = false;

            // I process each directed edge [u, v, w].
            for (const [u, v, w] of edges) {
                // If reaching v through u gives a smaller value,
                // I update dist[v] using edge relaxation.
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    updated = true;
                }
            }

            // If no update happened, all values are stable,
            // so further rounds are unnecessary.
            if (!updated) {
                break;
            }
        }

        // I make one final pass. If any value still decreases,
        // the graph must contain a negative-weight cycle.
        for (const [u, v, w] of edges) {
            if (dist[u] + w < dist[v]) {
                return true;
            }
        }

        // No further decrease means no negative cycle exists.
        return false;
    }
}
```

### Python3

```python
class Solution:
    def isNegativeWeightCycle(self, V: int, edges: list[list[int]]) -> bool:
        # I start every distance at 0 so negative cycles in disconnected
        # components are also detected without choosing a single source.
        dist = [0] * V

        # I relax every edge V - 1 times because a simple path
        # can use at most V - 1 edges.
        for _ in range(V - 1):
            updated = False

            # I process each directed edge [u, v, w].
            for u, v, w in edges:
                # If going through u gives v a smaller value,
                # I update dist[v] using the Bellman-Ford relaxation rule.
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    updated = True

            # If no value changed, the distances are already stable,
            # so I stop early instead of doing unnecessary rounds.
            if not updated:
                break

        # I check all edges one more time. Any improvement now
        # proves that a negative-weight cycle exists.
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                return True

        # If no edge can reduce a value further, no negative cycle exists.
        return False
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is the same in C++, Java, JavaScript, and Python3. Only the syntax used for arrays, loops, and edge iteration changes.

### Step 1: Create the Distance Array

The first step is creating an array with one value for every vertex.

Instead of setting one source vertex to `0` and all other vertices to infinity, I initialize every vertex with `0`.

This matters because the problem asks whether a negative cycle exists anywhere in the graph.

Suppose the graph has two disconnected components. If I started Bellman-Ford from only vertex `0`, I could miss a negative cycle in the other component.

By starting every distance at `0`, I allow the relaxation process to detect a negative cycle in every part of the graph.

### Step 2: Relax All Edges Repeatedly

For every edge:

```text
[u, v, w]
```

I check this condition:

```text
dist[u] + w < dist[v]
```

If it is true, reaching `v` through `u` gives a smaller value, so I update `dist[v]`.

For example, suppose:

```text
dist[u] = 5
w = -4
dist[v] = 3
```

Then:

```text
dist[u] + w = 1
```

Since `1 < 3`, I update the value of `dist[v]` to `1`.

This process is called edge relaxation.

### Step 3: Repeat for V - 1 Rounds

A simple path can visit at most `V` different vertices.

That means it can contain at most `V - 1` edges.

Because of this, in a graph without a negative cycle, all valid shortest path improvements should be completed after at most `V - 1` rounds.

Each round gives distance updates another chance to travel through the graph.

An update made using one edge can help another edge produce a new update later in the same or next round.

### Step 4: Stop Early When Nothing Changes

I keep track of whether any distance changed during the current round.

If no edge updates any value, the algorithm has reached a stable state.

There is no reason to continue the remaining rounds because processing the same stable values again will not create a new update.

This optimization does not change the worst-case time complexity, but it can make the solution faster on many inputs.

### Step 5: Make One Final Pass

After completing at most `V - 1` rounds, I process all edges once again.

If I find:

```text
dist[u] + w < dist[v]
```

at this point, I know that a distance can still decrease.

That should not happen in a graph without a negative weight cycle.

So I immediately return `true`.

### Why Does Another Update Mean a Negative Cycle?

Imagine a cycle whose total weight is `-3`.

Every time I travel around the cycle, the total value decreases by `3`.

For example:

```text
First round:   0
Second round: -3
Third round:  -6
Fourth round: -9
```

The value can keep decreasing forever.

That is why Bellman-Ford can still find an improvement after `V - 1` rounds when a negative cycle exists.

### Step 6: Return False When No Extra Update Exists

If the final pass completes without updating any distance, the graph does not contain a negative weight cycle.

At that point, all values have become stable, so I return `false`.

## Examples

### Example 1: No Negative Weight Cycle

**Input**

```text
V = 4
E = 4
edges[][] = [[0, 3, 6], [1, 0, 4], [1, 2, 6], [3, 1, 2]]
```

**Expected Output**

```text
false
```

**Trace**

The cycle is:

```text
1 -> 0 -> 3 -> 1
```

Its total weight is:

```text
4 + 6 + 2 = 12
```

The cycle has a positive total weight, so it is not a negative weight cycle.

No distance keeps decreasing after the normal Bellman-Ford relaxation rounds.

Therefore, the answer is `false`.

### Example 2: Negative Weight Cycle Exists

**Input**

```text
V = 4
E = 4
edges[][] = [[1, 0, 4], [3, 1, -2], [1, 2, -6], [2, 3, 5]]
```

**Expected Output**

```text
true
```

**Trace**

The relevant cycle is:

```text
1 -> 2 -> 3 -> 1
```

Its total weight is:

```text
-6 + 5 + (-2) = -3
```

Since the total weight is negative, every trip around this cycle reduces the distance further.

The extra Bellman-Ford pass finds another possible update.

Therefore, the answer is `true`.

### Example 3: Graph With Negative Edges but No Negative Cycle

**Input**

```text
V = 3
E = 3
edges[][] = [[0, 1, -2], [1, 2, 3], [0, 2, 4]]
```

**Expected Output**

```text
false
```

**Trace**

This graph contains a negative edge from `0` to `1`.

However, a negative edge alone does not mean a negative cycle exists.

There is no directed cycle whose total weight is negative.

After the required relaxation rounds, no edge can reduce a distance further.

Therefore, the answer is `false`.

## How to Use / Run Locally

Save the solution in a file for the language you want to run.

Because this repository follows the GeeksforGeeks function-based format, you may need to add a small driver program with input handling if you want to run it directly from the command line.

### C++

Save the file as:

```text
solution.cpp
```

Compile it using:

```bash
g++ -std=c++17 solution.cpp -o solution
```

Run it using:

```bash
./solution
```

On Windows, use:

```bash
solution.exe
```

### Java

Save the file as:

```text
Solution.java
```

Compile it using:

```bash
javac Solution.java
```

Run it using:

```bash
java Solution
```

Make sure the class name and file name match when required by your Java setup.

### JavaScript

Save the file as:

```text
solution.js
```

Run it with Node.js:

```bash
node solution.js
```

Install Node.js first if the `node` command is not available on your system.

### Python3

Save the file as:

```text
solution.py
```

Run it using:

```bash
python3 solution.py
```

On some systems, the command may be:

```bash
python solution.py
```

## Notes & Optimizations

The graph can be disconnected, so starting Bellman-Ford from only one fixed source may miss a negative cycle in another component. Initializing every distance to `0` avoids that problem.

Negative edge weights are allowed. A negative edge by itself is not enough to make the answer `true`. The graph must contain a directed cycle whose total weight is negative.

I use an early stopping optimization. If one complete relaxation round does not update any distance, I stop immediately.

The worst-case time complexity remains `O(V × E)`, which matches the expected complexity for this approach.

I use a wide integer type for distance calculations in languages where overflow can become a concern. Edge weights and repeated updates can make intermediate values larger than a standard 32-bit range.

An adjacency list is not necessary here. Bellman-Ford needs to scan every edge repeatedly, so the given edge list is already a suitable representation.

DFS-based approaches can detect whether a cycle exists, but detecting whether the total weight of a cycle is negative is not as direct. Bellman-Ford gives a cleaner and more reliable solution for this specific problem.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
