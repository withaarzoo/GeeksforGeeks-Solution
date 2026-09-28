# Range GCD Queries – Segment Tree Solution for Range GCD with Point Updates

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

You are given an integer array and a list of queries. Each query is one of two types.

Type 1 asks for the GCD of every element inside a range [l, r] (both ends included).  
Type 2 updates a single position in the array to a new value.

You must answer every Type 1 query in the order they appear and return those answers in a list.

This is a classic competitive programming problem that mixes range GCD queries with point updates. A naive loop for every query would be too slow when the array and the number of queries both reach 10^5.

## Constraints

- 1 ≤ arr.size() ≤ 10^5
- 1 ≤ q ≤ 10^5
- 0 ≤ l, r, index ≤ arr.size() – 1
- 1 ≤ arr[i], value ≤ 10^5

These limits force an efficient data structure. Anything slower than roughly O((n + q) log n log A) will time out.

## Intuition

The first thing I noticed is that GCD is associative. That means the GCD of a big range can be built from the GCDs of smaller pieces.  

Segment trees are perfect for this. Each node can store the GCD of the range it covers. A range query then only needs to combine a few nodes, and a point update only needs to fix the path from a leaf up to the root.  

That observation immediately pointed me toward a segment tree solution for Range GCD Queries.

## Approach

I create a segment tree of size 4 × n.  

In the build step I fill every leaf with the corresponding array value and then compute the GCD of the two children for every internal node.  

For a range GCD query I write a recursive function. If the current node lies completely outside the asked range I return 0 (because gcd(x, 0) = x). If the node lies completely inside I return the stored value. Otherwise I ask both children and take the GCD of their answers.  

For an update I walk down to the correct leaf, change its value, and recalculate the GCD on the way back up.  

I process the queries one by one. Type 1 queries collect answers; Type 2 queries call the update. At the end I return the list of collected answers.

This gives a clean, efficient solution for Range GCD Queries with updates.

## Data Structures Used

- Segment Tree (array of size 4 × n)  
  Stores the GCD of every segment. Chosen because GCD is associative and the tree supports both range queries and point updates in logarithmic time.

No other heavy data structures are needed. The original array is only used during the initial build.

## Operations & Behavior Summary

1. Allocate a tree array of size 4 × n.  
2. Build the tree bottom-up so every node holds the GCD of its range.  
3. For each query:  
   - If it is a range GCD request, walk the tree and combine the relevant nodes.  
   - If it is an update, change the leaf and refresh every ancestor.  
4. Collect every range answer and return them.

The whole process stays fast even when both n and q are 10^5.

## Complexity

| Type              | Complexity                          | Explanation |
|-------------------|-------------------------------------|-------------|
| Time Complexity   | O((n + q) × log n × log A)         | Build takes O(n log A). Each of the q operations touches O(log n) nodes and each GCD costs O(log A), where A is the maximum value in the array. |
| Space Complexity  | O(n)                                | The segment tree uses a fixed array of size 4 × n. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    vector<int> tree;
    int n;

    int gcd(int a, int b) {
        while (b) {
            int t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }
        int mid = (start + end) / 2;
        build(arr, 2 * node, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = (start + end) / 2;
        if (idx <= mid)
            update(2 * node, start, mid, idx, val);
        else
            update(2 * node + 1, mid + 1, end, idx, val);
        tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l)
            return 0;
        if (l <= start && end <= r)
            return tree[node];
        int mid = (start + end) / 2;
        int left = query(2 * node, start, mid, l, r);
        int right = query(2 * node + 1, mid + 1, end, l, r);
        return gcd(left, right);
    }

    vector<int> processQueries(vector<int>& arr, vector<vector<int>>& queries) {
        n = arr.size();
        tree.assign(4 * n, 0);
        build(arr, 1, 0, n - 1);
        vector<int> ans;
        for (auto& q : queries) {
            if (q[0] == 0) {
                ans.push_back(query(1, 0, n - 1, q[1], q[2]));
            } else {
                update(1, 0, n - 1, q[1], q[2]);
            }
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    int[] tree;
    int n;

    int gcd(int a, int b) {
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }
        int mid = (start + end) / 2;
        build(arr, 2 * node, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = (start + end) / 2;
        if (idx <= mid)
            update(2 * node, start, mid, idx, val);
        else
            update(2 * node + 1, mid + 1, end, idx, val);
        tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l)
            return 0;
        if (l <= start && end <= r)
            return tree[node];
        int mid = (start + end) / 2;
        int left = query(2 * node, start, mid, l, r);
        int right = query(2 * node + 1, mid + 1, end, l, r);
        return gcd(left, right);
    }

    public ArrayList<Integer> processQueries(int[] arr, int[][] queries) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 1, 0, n - 1);
        ArrayList<Integer> ans = new ArrayList<>();
        for (int[] q : queries) {
            if (q[0] == 0) {
                ans.add(query(1, 0, n - 1, q[1], q[2]));
            } else {
                update(1, 0, n - 1, q[1], q[2]);
            }
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @returns {number[]}
 */
class Solution {
    processQueries(arr, queries) {
        let n = arr.length;
        let tree = new Array(4 * n).fill(0);

        function gcd(a, b) {
            while (b) {
                let t = b;
                b = a % b;
                a = t;
            }
            return a;
        }

        function build(node, start, end) {
            if (start === end) {
                tree[node] = arr[start];
                return;
            }
            let mid = Math.floor((start + end) / 2);
            build(2 * node, start, mid);
            build(2 * node + 1, mid + 1, end);
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
        }

        function update(node, start, end, idx, val) {
            if (start === end) {
                tree[node] = val;
                return;
            }
            let mid = Math.floor((start + end) / 2);
            if (idx <= mid)
                update(2 * node, start, mid, idx, val);
            else
                update(2 * node + 1, mid + 1, end, idx, val);
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1]);
        }

        function query(node, start, end, l, r) {
            if (r < start || end < l)
                return 0;
            if (l <= start && end <= r)
                return tree[node];
            let mid = Math.floor((start + end) / 2);
            let left = query(2 * node, start, mid, l, r);
            let right = query(2 * node + 1, mid + 1, end, l, r);
            return gcd(left, right);
        }

        build(1, 0, n - 1);
        let ans = [];
        for (let q of queries) {
            if (q[0] === 0) {
                ans.push(query(1, 0, n - 1, q[1], q[2]));
            } else {
                update(1, 0, n - 1, q[1], q[2]);
            }
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def processQueries(self, arr: list[int], queries: list[list[int]]) -> list[int]:
        n = len(arr)
        tree = [0] * (4 * n)

        def gcd(a, b):
            while b:
                a, b = b, a % b
            return a

        def build(node, start, end):
            if start == end:
                tree[node] = arr[start]
                return
            mid = (start + end) // 2
            build(2 * node, start, mid)
            build(2 * node + 1, mid + 1, end)
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1])

        def update(node, start, end, idx, val):
            if start == end:
                tree[node] = val
                return
            mid = (start + end) // 2
            if idx <= mid:
                update(2 * node, start, mid, idx, val)
            else:
                update(2 * node + 1, mid + 1, end, idx, val)
            tree[node] = gcd(tree[2 * node], tree[2 * node + 1])

        def query(node, start, end, l, r):
            if r < start or end < l:
                return 0
            if l <= start and end <= r:
                return tree[node]
            mid = (start + end) // 2
            left = query(2 * node, start, mid, l, r)
            right = query(2 * node + 1, mid + 1, end, l, r)
            return gcd(left, right)

        build(1, 0, n - 1)
        ans = []
        for q in queries:
            if q[0] == 0:
                ans.append(query(1, 0, n - 1, q[1], q[2]))
            else:
                update(1, 0, n - 1, q[1], q[2])
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic; only the syntax changes.

I start by creating a tree array large enough for n leaves.  

The GCD helper is the classic Euclidean algorithm written with a loop so it works the same way in every language.  

The build function is recursive. When the range shrinks to a single index I copy the array value into the leaf. Otherwise I split the range, build both halves, and store the GCD of the two children.  

The update function walks down to the target leaf, writes the new value, then recalculates the GCD of every parent on the way back up. This keeps the whole tree consistent after a change.  

The query function is the heart of the solution.  
- Complete miss → return 0.  
- Complete hit → return the pre-computed GCD.  
- Partial overlap → ask both children and combine their results with GCD.  

In the main driver I first build the tree, then walk through every query. Type-0 queries push the answer into a result list; Type-1 queries call the update. Finally I return the result list.

Because the tree height is logarithmic, every operation stays fast enough for the given constraints.

## Examples

**Example 1**  
Input: arr = [2, 3, 4, 6, 8, 16], queries = [[0, 0, 2], [1, 3, 8], [0, 2, 5]]  
Output: [1, 4]  

Trace:  
- First query asks GCD of [2, 3, 4] → 1.  
- Update index 3 from 6 to 8. Array becomes [2, 3, 4, 8, 8, 16].  
- Second query asks GCD of [4, 8, 8, 16] → 4.

**Example 2**  
Input: arr = [12, 18, 24, 30, 36], queries = [[0, 1, 3], [1, 2, 15], [0, 0, 2], [0, 2, 4]]  
Output: [6, 3, 3]  

Trace:  
- GCD of [18, 24, 30] is 6.  
- Update index 2 from 24 to 15.  
- GCD of [12, 18, 15] is 3.  
- GCD of [15, 30, 36] is 3.

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run with `./main`.  
4. Feed the input according to the problem format (or hard-code a test case inside main).

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.  
4. Adjust the driver method to read input or use a hard-coded example.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with `node solution.js`.  
3. Add a small test harness at the bottom that creates an instance and prints the result.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run with `python3 solution.py`.  
3. Add a few lines at the bottom to create a Solution object, call the method, and print the answer.

All four versions expect the same input shape: an array and a list of queries. You can hard-code the sample inputs while you are testing.

## Notes & Optimizations

- Returning 0 for a non-overlapping range is safe because gcd(x, 0) equals x.  
- The tree size 4 × n is always enough; you never need more.  
- An alternative would be a Sparse Table, but it cannot handle updates. Segment tree is the right choice when updates are present.  
- If the values were much larger you could still keep the same structure; only the GCD cost would grow slightly.  
- Watch out for the edge case when the array has only one element – the tree still works correctly.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)