# Minimum Cost to Connect All Houses in a City

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given `n` houses represented by 2D coordinates `{x, y}`, I need to connect all houses with the minimum total cost.

The cost to connect any two houses is the Manhattan Distance:

`|x1 - x2| + |y1 - y2|`

I need to return the minimum total cost required to connect all houses.

This is a classic Minimum Spanning Tree (MST) problem.

---

## Constraints

```text
1 <= n <= 10^3
0 <= houses[i][j] <= 10^3
```

---

## Intuition

I thought of this problem as connecting all houses using the minimum total wire cost.

Each house is a node.
Each possible connection between two houses is an edge.
The weight of that edge is the Manhattan Distance.

Since I need the minimum total cost to connect all nodes, this becomes a Minimum Spanning Tree problem.

I used Prim's Algorithm because:

* It directly builds the MST.
* I do not need to store all possible edges.
* `O(n^2)` is fast enough for `n <= 1000`.

---

## Approach

1. Start from any house, for example house `0`.
2. Maintain two arrays:

   * `visited[i]` → tells if house `i` is already included in MST.
   * `minDist[i]` → minimum cost needed to connect house `i`.
3. Initially:

   * `minDist[0] = 0`
   * All other values are infinity.
4. In every iteration:

   * Pick the unvisited house with minimum connection cost.
   * Add its cost to the answer.
   * Mark it as visited.
5. Update all remaining houses using Manhattan Distance.
6. Repeat until all houses are connected.

---

## Data Structures Used

* Array / Vector for storing minimum distance of each house.
* Boolean Array for tracking visited houses.
* Integer variable for total answer.

---

## Operations & Behavior Summary

| Operation          | Purpose                                    |
| ------------------ | ------------------------------------------ |
| `visited[i]`       | Checks if house is already included in MST |
| `minDist[i]`       | Stores minimum cost to connect house `i`   |
| Manhattan Distance | Calculates edge weight                     |
| Minimum Selection  | Chooses next best house to connect         |

---

## Complexity

* Time Complexity: `O(n^2)`

  * For every house, I scan all remaining houses.

* Space Complexity: `O(n)`

  * Extra arrays used:

    * `visited`
    * `minDist`

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minCost(vector<vector<int>>& houses) {
        int n = houses.size();

        vector<int> minDist(n, INT_MAX);
        vector<bool> visited(n, false);

        minDist[0] = 0;
        int totalCost = 0;

        for (int i = 0; i < n; i++) {
            int u = -1;

            for (int j = 0; j < n; j++) {
                if (!visited[j] && (u == -1 || minDist[j] < minDist[u])) {
                    u = j;
                }
            }

            visited[u] = true;
            totalCost += minDist[u];

            for (int v = 0; v < n; v++) {
                if (!visited[v]) {
                    int cost = abs(houses[u][0] - houses[v][0]) +
                               abs(houses[u][1] - houses[v][1]);

                    minDist[v] = min(minDist[v], cost);
                }
            }
        }

        return totalCost;
    }
};
```

### Java

```java
class Solution {

    public int minCost(int[][] houses) {
        int n = houses.length;

        int[] minDist = new int[n];
        boolean[] visited = new boolean[n];

        Arrays.fill(minDist, Integer.MAX_VALUE);
        minDist[0] = 0;

        int totalCost = 0;

        for (int i = 0; i < n; i++) {
            int u = -1;

            for (int j = 0; j < n; j++) {
                if (!visited[j] && (u == -1 || minDist[j] < minDist[u])) {
                    u = j;
                }
            }

            visited[u] = true;
            totalCost += minDist[u];

            for (int v = 0; v < n; v++) {
                if (!visited[v]) {
                    int cost = Math.abs(houses[u][0] - houses[v][0]) +
                               Math.abs(houses[u][1] - houses[v][1]);

                    minDist[v] = Math.min(minDist[v], cost);
                }
            }
        }

        return totalCost;
    }
}
```

### JavaScript

```javascript
class Solution {
    minCost(houses) {
        const n = houses.length;

        const minDist = new Array(n).fill(Infinity);
        const visited = new Array(n).fill(false);

        minDist[0] = 0;
        let totalCost = 0;

        for (let i = 0; i < n; i++) {
            let u = -1;

            for (let j = 0; j < n; j++) {
                if (!visited[j] && (u === -1 || minDist[j] < minDist[u])) {
                    u = j;
                }
            }

            visited[u] = true;
            totalCost += minDist[u];

            for (let v = 0; v < n; v++) {
                if (!visited[v]) {
                    const cost = Math.abs(houses[u][0] - houses[v][0]) +
                                 Math.abs(houses[u][1] - houses[v][1]);

                    minDist[v] = Math.min(minDist[v], cost);
                }
            }
        }

        return totalCost;
    }
}
```

### Python3

```python
class Solution:
    def minCost(self, houses):
        n = len(houses)

        minDist = [float('inf')] * n
        visited = [False] * n

        minDist[0] = 0
        totalCost = 0

        for _ in range(n):
            u = -1

            for i in range(n):
                if not visited[i] and (u == -1 or minDist[i] < minDist[u]):
                    u = i

            visited[u] = True
            totalCost += minDist[u]

            for v in range(n):
                if not visited[v]:
                    cost = abs(houses[u][0] - houses[v][0]) + \
                           abs(houses[u][1] - houses[v][1])

                    minDist[v] = min(minDist[v], cost)

        return totalCost
```

---

## Step-by-step Detailed Explanation

### C++

1. Create `minDist` and `visited` arrays.
2. Set `minDist[0] = 0`.
3. Find the unvisited node with minimum cost.
4. Add that cost into answer.
5. Mark that house as visited.
6. Update the minimum connection cost for all remaining houses.
7. Repeat until all houses are connected.

### Java

1. Use arrays `minDist[]` and `visited[]`.
2. Start from house `0`.
3. Pick the cheapest unvisited house.
4. Add its cost into `totalCost`.
5. Update remaining houses using Manhattan Distance.
6. Continue until all houses are visited.

### JavaScript

1. Use `minDist` to store minimum connection cost.
2. Use `visited` to track connected houses.
3. Repeatedly choose the minimum cost house.
4. Add its cost into final answer.
5. Update all other houses.
6. Return total cost.

### Python3

1. Initialize arrays.
2. Start from house `0`.
3. Find next best house.
4. Add cost to answer.
5. Update all possible minimum distances.
6. Continue until all houses are included in MST.

---

## Examples

```text
Input:
houses = [[0,0],[1,1],[1,3],[3,0]]

Output:
7
```

Explanation:

```text
Connect (0,0) -> (1,1) cost = 2
Connect (1,1) -> (1,3) cost = 2
Connect (0,0) -> (3,0) cost = 3

Total = 2 + 2 + 3 = 7
```

---

## How to use / Run locally

```bash
# C++
g++ solution.cpp -o solution
./solution
```

```bash
# Java
javac Solution.java
java Solution
```

```bash
# JavaScript
node solution.js
```

```bash
# Python3
python solution.py
```

---

## Notes & Optimizations

* This problem is solved using Prim's Algorithm.
* I avoided storing all edges because that would take extra memory.
* Since `n <= 1000`, the `O(n^2)` solution is efficient enough.
* This approach is simpler than using a priority queue version of Prim's Algorithm.
* Manhattan Distance is calculated only when needed.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
