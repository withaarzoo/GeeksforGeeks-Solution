# Maximum Stone Removal

* **Problem Title**

  * Maximum Stone Removal (GeeksforGeeks)

---

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

I’m given `n` stones placed on a 2D grid.
Each stone position is `stones[i] = [xi, yi]`, where:

* `xi` = row index
* `yi` = column index

I can **remove** a stone if **at least one other stone** exists in the **same row or same column** that has not been removed yet.

My goal:

> Find the **maximum number of stones** I can remove from the grid.

Key point:
Each coordinate `(x, y)` has **at most one stone**.

---

## Constraints

* `1 ≤ stones.size() ≤ 1000`
* `0 ≤ xi, yi ≤ 10^4`
* No two stones are at the same position.

These constraints tell me:

* Number of stones is up to 1000 → I should aim for **O(n log n)** or **O(n)** solution.
* Coordinates can be large (up to 10,000), so I shouldn’t build a full 2D grid.

---

## Intuition

I tried to think in terms of groups:

* A stone can be removed only if it shares a **row** or **column** with **another stone**.
* Imagine I have a group of stones where each stone is connected to others through some chain of “same row / same column” relationships.
* Inside one such group, I can always keep removing stones one by one as long as **at least 2** stones remain.

So I asked myself:

> In one connected group of stones, how many stones must stay at minimum?

Answer: **Exactly one**.
So in a group with `k` stones, I can remove `k - 1` stones.

If I know:

* `n` = total number of stones
* `components` = number of connected groups (components)

Then I can remove:

> `n - components` stones.

So the problem turns into:

> Count how many **connected components** exist if I connect stones that share rows or columns.

This screams **graph + connected components**, and the most efficient structure for such grouping is **Disjoint Set Union (DSU / Union-Find)**.

---

## Approach

Step-by-step how I solve it:

1. **Treat each stone as a node.**

   * Index stones from `0` to `n-1`.

2. **Define connections.**

   * If two stones share the same `row` or same `column`, they belong to the **same component**.

3. **Avoid O(n²) loops.**

   * Instead of comparing every pair of stones, I use:

     * `rowRep[row]` → index of some stone in that row.
     * `colRep[col]` → index of some stone in that column.
   * While scanning stones:

     * If I’ve seen a stone in the same row, I union the current stone with that old stone.
     * If I’ve seen a stone in the same column, I union the current stone with that old stone.
     * Otherwise, I store the current index as the representative for that row/column.

4. **Use DSU (Union-Find).**

   * `find(x)` → gives me the **leader/root** of stone `x`.
     I use **path compression** so `find` is almost O(1).
   * `unite(a, b)` → merges the components containing `a` and `b`.
     I use **union by rank/size** to keep trees shallow.

5. **Count components.**

   * After processing all stones:

     * I loop from `0` to `n-1`.
     * Every index `i` where `find(i) == i` means `i` is a root → a distinct component.
   * Let this count be `components`.

6. **Compute answer.**

   * Maximum stones removable = `n - components`.

---

## Data Structures Used

* **Disjoint Set Union (DSU / Union-Find)**

  * Arrays:

    * `parent[i]` = parent or leader of node `i`
    * `rank[i]` or `size[i]` = used to union by rank/size
* **Hash maps (or dictionaries / objects)**

  * `rowRep` → map row index → some stone index in that row
  * `colRep` → map column index → some stone index in that column

These structures give me almost O(1) operations for union and find.

---

## Operations & Behavior Summary

During the main loop for each stone:

1. Check row:

   * If row `r` exists in `rowRep`, union current stone with `rowRep[r]`.
   * Else, set `rowRep[r] = currentIndex`.

2. Check column:

   * If column `c` exists in `colRep`, union current stone with `colRep[c]`.
   * Else, set `colRep[c] = currentIndex`.

After all stones are processed:

3. Count how many nodes are their own parents (roots).
4. Answer = `totalStones - numberOfRoots`.

---

## Complexity

Let:

* `n` = number of stones

**Time Complexity**

* Each stone causes a constant number of DSU operations:
  `find` + `unite`.
* With **path compression** and **union by rank**, DSU operations are almost constant: `O(α(n))`, where `α` is the inverse Ackermann function (very, very slow-growing).
* So overall time ≈ **O(n)**.

**Space Complexity**

* DSU arrays `parent` and `rank`: `O(n)`.
* Maps `rowRep` and `colRep`: at most one entry per stone → `O(n)` total.
* So total extra space = **O(n)**.

---

## Multi-language Solutions

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

class DSU {
public:
    vector<int> parent, rankv;

    DSU(int n) {
        parent.resize(n);
        rankv.assign(n, 0);
        for (int i = 0; i < n; ++i) parent[i] = i;
    }

    int find(int x) {
        // Path compression
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    void unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return;

        // Union by rank
        if (rankv[a] < rankv[b]) {
            parent[a] = b;
        } else if (rankv[b] < rankv[a]) {
            parent[b] = a;
        } else {
            parent[b] = a;
            rankv[a]++;
        }
    }
};

class Solution {
  public:
    int maxRemove(vector<vector<int>>& stones) {
        int n = stones.size();
        DSU dsu(n);

        unordered_map<int, int> rowRep;
        unordered_map<int, int> colRep;

        for (int i = 0; i < n; ++i) {
            int r = stones[i][0];
            int c = stones[i][1];

            if (rowRep.count(r)) {
                dsu.unite(i, rowRep[r]);
            } else {
                rowRep[r] = i;
            }

            if (colRep.count(c)) {
                dsu.unite(i, colRep[c]);
            } else {
                colRep[c] = i;
            }
        }

        int components = 0;
        for (int i = 0; i < n; ++i) {
            if (dsu.find(i) == i) components++;
        }

        return n - components;
    }
};
```

---

### Java

```java
import java.util.*;

class DSU {
    int[] parent;
    int[] rank;

    DSU(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    void unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return;

        if (rank[a] < rank[b]) {
            parent[a] = b;
        } else if (rank[b] < rank[a]) {
            parent[b] = a;
        } else {
            parent[b] = a;
            rank[a]++;
        }
    }
}

class Solution {
    int maxRemove(int[][] stones) {
        int n = stones.length;
        DSU dsu = new DSU(n);

        HashMap<Integer, Integer> rowRep = new HashMap<>();
        HashMap<Integer, Integer> colRep = new HashMap<>();

        for (int i = 0; i < n; i++) {
            int r = stones[i][0];
            int c = stones[i][1];

            if (rowRep.containsKey(r)) {
                dsu.unite(i, rowRep.get(r));
            } else {
                rowRep.put(r, i);
            }

            if (colRep.containsKey(c)) {
                dsu.unite(i, colRep.get(c));
            } else {
                colRep.put(c, i);
            }
        }

        int components = 0;
        for (int i = 0; i < n; i++) {
            if (dsu.find(i) == i) components++;
        }

        return n - components;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[][]} stones
 * @returns {number}
 */

// Optimised DSU for JS (no recursion)
class DSU {
    constructor(n) {
        this.parent = new Array(n);
        this.rank = new Array(n).fill(0);
        for (let i = 0; i < n; i++) this.parent[i] = i;
    }

    // Iterative find with path halving
    find(x) {
        const parent = this.parent;
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]]; // path halving
            x = parent[x];
        }
        return x;
    }

    unite(a, b) {
        let pa = this.find(a);
        let pb = this.find(b);
        if (pa === pb) return;

        const rank = this.rank;
        if (rank[pa] < rank[pb]) {
            this.parent[pa] = pb;
        } else if (rank[pb] < rank[pa]) {
            this.parent[pb] = pa;
        } else {
            this.parent[pb] = pa;
            rank[pa]++;
        }
    }
}

class Solution {
    maxRemove(stones) {
        const n = stones.length;
        const dsu = new DSU(n);

        const rowRep = Object.create(null);
        const colRep = Object.create(null);

        for (let i = 0; i < n; i++) {
            const r = stones[i][0];
            const c = stones[i][1];

            if (rowRep[r] !== undefined) {
                dsu.unite(i, rowRep[r]);
            } else {
                rowRep[r] = i;
            }

            if (colRep[c] !== undefined) {
                dsu.unite(i, colRep[c]);
            } else {
                colRep[c] = i;
            }
        }

        let components = 0;
        for (let i = 0; i < n; i++) {
            if (dsu.find(i) === i) components++;
        }

        return n - components;
    }
}
```

---

### Python3

```python
class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        # Path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def unite(self, a: int, b: int) -> None:
        a = self.find(a)
        b = self.find(b)
        if a == b:
            return

        if self.rank[a] < self.rank[b]:
            self.parent[a] = b
        elif self.rank[b] < self.rank[a]:
            self.parent[b] = a
        else:
            self.parent[b] = a
            self.rank[a] += 1


class Solution:
    def maxRemove(self, stones):
        n = len(stones)
        dsu = DSU(n)

        row_rep = {}
        col_rep = {}

        for i, (r, c) in enumerate(stones):
            if r in row_rep:
                dsu.unite(i, row_rep[r])
            else:
                row_rep[r] = i

            if c in col_rep:
                dsu.unite(i, col_rep[c])
            else:
                col_rep[c] = i

        components = 0
        for i in range(n):
            if dsu.find(i) == i:
                components += 1

        return n - components
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I’ll explain the logic in a language-agnostic way; each language’s code mirrors these steps.

1. **Create DSU structure**

   * Initialize arrays:

     * `parent[i] = i` for all `i` (each node is its own parent).
     * `rank[i] = 0`.
   * This is done in all four languages inside their DSU constructor.

2. **Implement `find(x)`**

   * While or recursively:

     * If `parent[x] != x`, it means `x` is not root.
     * Move `x` up the tree until you reach root.
     * Compress the path by setting each visited node’s parent directly to the root.
   * This drastically speeds up future `find` calls.

3. **Implement `unite(a, b)`**

   * First, find leaders: `pa = find(a)`, `pb = find(b)`.
   * If `pa == pb`, both stones are already in the same set → return.
   * Otherwise:

     * Compare `rank[pa]` and `rank[pb]`.
     * Attach the lower-rank tree under the higher-rank tree.
     * If ranks are equal:

       * Pick one as parent and increment its rank.

4. **Prepare maps for rows and columns**

   * `rowRep` is a map from row value → stone index.
   * `colRep` is a map from column value → stone index.
   * These are implemented as:

     * `unordered_map` in C++
     * `HashMap` in Java
     * `Object.create(null)` in JS
     * `dict` in Python

5. **Process each stone**

   * Loop `i` from `0` to `n-1`:

     * Let current stone be at `(r, c)`.
   * **Row processing**:

     * If `r` is already in `rowRep`:

       * Union current stone `i` with stored stone `rowRep[r]`.
     * Else:

       * Set `rowRep[r] = i`.
   * **Column processing**:

     * If `c` is already in `colRep`:

       * Union current stone `i` with stored stone `colRep[c]`.
     * Else:

       * Set `colRep[c] = i`.

   What this does:

   * For every row, all stones in that row become part of the same connected component.
   * For every column, all stones in that column become part of the same connected component.
   * Through chaining (row → column → row → …), all indirectly connected stones are merged.

6. **Count number of components**

   * After the loop:

     * Initialize `components = 0`.
     * For each index `i` from `0` to `n-1`:

       * If `find(i) == i`, `i` is a root → increment `components`.
   * This tells me how many independent groups of stones exist.

7. **Compute the final answer**

   * Let `n` be total stones.
   * Maximum stones removable = `n - components`.
   * Return this value.

---

## Examples

### Example 1

**Input**

```text
stones = [[0,0], [0,1], [1,1], [1,2], [2,1], [2,2]]
```

Grid view (only positions with stones):

* Row 0: (0,0), (0,1)
* Row 1: (1,1), (1,2)
* Row 2: (2,1), (2,2)

All stones are connected via rows and columns, so there is **1 component**.

* Total stones `n = 6`
* Components `= 1`
* Max removable = `6 - 1 = 5`

**Output**

```text
5
```

---

### Example 2

**Input**

```text
stones = [[0,0], [0,2], [1,1], [2,0], [2,2]]
```

We get two components:

* Component 1: stones at (0,0), (2,0) (same column)
* Component 2: stones at (0,2), (2,2) (same column)
* Stone at (1,1) is isolated (its own component).

So:

* Total stones `n = 5`
* Components `= 3`
* Max removable = `5 - 3 = 2`

**Output**

```text
2
```

---

## How to use / Run locally

Assume you name the file `main.*` for each language and paste the `Solution` + DSU code inside it. You can create a simple driver for testing.

### C++

```bash
g++ -std=c++17 -O2 main.cpp -o main
./main
```

Inside `main.cpp`, you can test:

```cpp
int main() {
    Solution sol;
    vector<vector<int>> stones = {{0,0},{0,1},{1,1},{1,2},{2,1},{2,2}};
    cout << sol.maxRemove(stones) << endl; // should print 5
    return 0;
}
```

---

### Java

```bash
javac Main.java
java Main
```

`Main.java` example:

```java
public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] stones = {{0,0},{0,1},{1,1},{1,2},{2,1},{2,2}};
        System.out.println(sol.maxRemove(stones)); // should print 5
    }
}
```

---

### JavaScript (Node.js)

```bash
node main.js
```

`main.js` example:

```javascript
const sol = new Solution();
const stones = [[0,0],[0,1],[1,1],[1,2],[2,1],[2,2]];
console.log(sol.maxRemove(stones)); // should print 5
```

---

### Python3

```bash
python3 main.py
```

`main.py` example:

```python
stones = [[0,0],[0,1],[1,1],[1,2],[2,1],[2,2]]
print(Solution().maxRemove(stones))  # should print 5
```

---

## Notes & Optimizations

* This DSU-based approach is already close to optimal for the given constraints.
* Key optimizations:

  * **Path Compression** in `find` makes deep trees flat, speeding up repeated operations.
  * **Union by Rank** keeps trees balanced from the beginning.
  * **Avoiding O(n²)** by using hash maps (`rowRep`, `colRep`) to connect stones that share rows or columns.
  * In JavaScript, using an **iterative** `find` and plain objects (`Object.create(null)`) reduces overhead and avoids recursion limits/timeouts on platforms like GeeksforGeeks.

If the constraints were much larger, we’d still be safe with this DSU strategy because DSU is extremely fast in practice.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
