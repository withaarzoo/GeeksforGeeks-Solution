# Maximum Height Disc Stack

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

You are given two arrays. One array holds the radius of each circular disc and the other holds its height. The task is to build the tallest possible stack of these discs.

A disc can sit on top of another disc only when both its radius and its height are strictly smaller than the disc below it. Every disc may be used at most once.

The goal of this maximum height disc stack problem is to return the largest total height you can achieve under those rules. This is a classic competitive programming problem that mixes sorting with dynamic programming ideas and appears frequently on platforms like GeeksforGeeks.

## Constraints

- 1 ≤ size of both arrays ≤ 10^5
- 1 ≤ radius[i], height[i] ≤ 1000

The large value of n means any O(n²) solution will time out. We need an approach that stays close to O(n log n).

## Intuition

When I first read the maximum height disc stack problem I noticed two things. First, the stacking rule is strict on both dimensions. Second, we care about the sum of heights, not the number of discs.

If I sort the discs by increasing radius, the only remaining condition I have to worry about is height. I can then walk through the sorted list and keep track of the best stack sum that ends with every possible height. That observation points straight toward a data structure that can answer “what is the maximum sum among all heights smaller than the current one?” quickly.

## Approach

I start by pairing every radius with its matching height.  
Next I sort these pairs so that radius goes from small to large. When two radii are equal I place the taller disc first. This secondary order stops two discs of the same radius from ever seeing each other as valid bases.

I then process the discs from left to right. For each disc I ask a Fenwick tree (also called a Binary Indexed Tree) for the highest stack sum that ends with a height strictly smaller than the current disc’s height. I add the current height to that value and obtain the best stack that ends with the present disc. I store this new sum back into the tree at the current height so later discs can use it.

At the end the largest value that ever appeared is the answer to the maximum height disc stack problem.

## Data Structures Used

- Array of pairs / 2-D array – holds radius and height together so they can be sorted as a single unit.
- Fenwick Tree (Binary Indexed Tree) – stores the maximum stack sum for every height. It supports both point updates and prefix-maximum queries in logarithmic time. Because heights are at most 1000 the tree is tiny and very fast.

## Operations & Behavior Summary

1. Create a list of (radius, height) pairs.  
2. Sort the list by ascending radius; break ties by descending height.  
3. Initialise a Fenwick tree of size 1002 with zeros.  
4. For every disc in the sorted order:  
   - Query the tree for the maximum value among heights 1 \ldots height-1.  
   - Add the current height to that maximum.  
   - Keep a global maximum of all such results.  
   - Update the tree at the current height with the new sum (taking the larger value if one already exists).  
5. Return the global maximum.

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time       | O(n log n + n log H) | Sorting costs O(n log n). Each of the n discs performs one query and one update on a Fenwick tree of size H = 1000, each O(log H). |
| Space      | O(n + H) | We store n pairs and a Fenwick tree of size roughly 1000. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int maxStackHeight(vector<int> &r, vector<int> &h) {
        int n = r.size();
        vector<pair<int,int>> discs(n);
        for(int i = 0; i < n; i++) discs[i] = {r[i], h[i]};
        sort(discs.begin(), discs.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
            if(a.first != b.first) return a.first < b.first;
            return a.second > b.second;
        });
        const int MAXH = 1001;
        vector<int> bit(MAXH + 2, 0);
        auto update = [&](int idx, int val) {
            for(; idx <= MAXH; idx += idx & -idx) bit[idx] = max(bit[idx], val);
        };
        auto query = [&](int idx) {
            int res = 0;
            for(; idx > 0; idx -= idx & -idx) res = max(res, bit[idx]);
            return res;
        };
        int ans = 0;
        for(auto& d : discs) {
            int ht = d.second;
            int best = query(ht - 1);
            int cur = best + ht;
            ans = max(ans, cur);
            update(ht, cur);
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int maxStackHeight(int[] r, int[] h) {
        int n = r.length;
        int[][] discs = new int[n][2];
        for(int i = 0; i < n; i++) {
            discs[i][0] = r[i];
            discs[i][1] = h[i];
        }
        Arrays.sort(discs, (a, b) -> {
            if(a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(b[1], a[1]);
        });
        int MAXH = 1001;
        int[] bit = new int[MAXH + 2];
        int ans = 0;
        for(int[] d : discs) {
            int ht = d[1];
            int best = query(bit, ht - 1);
            int cur = best + ht;
            ans = Math.max(ans, cur);
            update(bit, ht, cur, MAXH);
        }
        return ans;
    }
    private void update(int[] bit, int idx, int val, int MAXH) {
        for(; idx <= MAXH; idx += idx & -idx) bit[idx] = Math.max(bit[idx], val);
    }
    private int query(int[] bit, int idx) {
        int res = 0;
        for(; idx > 0; idx -= idx & -idx) res = Math.max(res, bit[idx]);
        return res;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} r
 * @param {number[]} h
 * @return {number}
 */
class Solution {
    maxStackHeight(r, h) {
        let n = r.length;
        let discs = [];
        for(let i = 0; i < n; i++) discs.push([r[i], h[i]]);
        discs.sort((a, b) => {
            if(a[0] !== b[0]) return a[0] - b[0];
            return b[1] - a[1];
        });
        let MAXH = 1001;
        let bit = new Array(MAXH + 2).fill(0);
        let ans = 0;
        for(let d of discs) {
            let ht = d[1];
            let best = this.query(bit, ht - 1);
            let cur = best + ht;
            ans = Math.max(ans, cur);
            this.update(bit, ht, cur, MAXH);
        }
        return ans;
    }
    update(bit, idx, val, MAXH) {
        for(; idx <= MAXH; idx += idx & -idx) bit[idx] = Math.max(bit[idx], val);
    }
    query(bit, idx) {
        let res = 0;
        for(; idx > 0; idx -= idx & -idx) res = Math.max(res, bit[idx]);
        return res;
    }
}
```

### Python3
```python
class Solution:
    def maxStackHeight(self, r, h):
        n = len(r)
        discs = [(r[i], h[i]) for i in range(n)]
        discs.sort(key=lambda x: (x[0], -x[1]))
        MAXH = 1001
        bit = [0] * (MAXH + 2)
        def update(idx, val):
            while idx <= MAXH:
                bit[idx] = max(bit[idx], val)
                idx += idx & -idx
        def query(idx):
            res = 0
            while idx > 0:
                res = max(res, bit[idx])
                idx -= idx & -idx
            return res
        ans = 0
        for rad, ht in discs:
            best = query(ht - 1)
            cur = best + ht
            ans = max(ans, cur)
            update(ht, cur)
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic; only the syntax changes.

First I build an array of pairs so radius and height stay together.  
I sort that array with a custom comparator: primary key is radius ascending, secondary key is height descending. The descending height order is important. When two discs share the same radius, the taller one appears earlier. Because I only ever query for strictly smaller heights, the later (shorter) disc of the same radius cannot pick the earlier one as a base.

I allocate a Fenwick tree large enough for every possible height (1 \ldots 1000). The tree stores the best stack sum that ends at each height.  
For a given disc I ask the tree for the maximum among all heights less than the current height. That query is a classic prefix-maximum operation on the Fenwick tree. Adding the current height gives me the tallest stack that ends with this disc. I update the global answer and then write the new sum into the tree at the current height index, keeping the larger value if something was already stored there.

Because the tree always remembers the best sum for each height, later discs automatically see the optimal choices. The strict radius ordering guarantees that every candidate base already has a smaller radius. The secondary height ordering prevents same-radius discs from forming an illegal stack.

Edge cases are handled naturally: a single disc simply returns its own height (the query returns 0), and discs that cannot be placed on anything still contribute their height as a possible answer.

## Examples

**Example 1**  
Input: radius = [5, 7, 3], height = [6, 5, 4]  
After sorting by radius then descending height we obtain the order (3,4), (5,6), (7,5).  
- Disc (3,4): query returns 0 → stack = 4. Update height 4 with 4.  
- Disc (5,6): query returns 4 → stack = 10. Update height 6 with 10.  
- Disc (7,5): query returns 4 → stack = 9. Update height 5 with 9.  
Maximum is 10.

**Example 2**  
Input: radius = [3, 7], height = [7, 4]  
Sorted order: (3,7), (7,4).  
- Disc (3,7): query 0 → stack = 7.  
- Disc (7,4): query for heights < 4 returns 0 → stack = 4.  
Maximum is 7. Neither disc can sit on the other because both dimensions are not strictly smaller.

**Example 3**  
Input: radius = [1, 2, 3], height = [1, 2, 3]  
Sorted order is already increasing. Each disc can sit on the previous one, so the total height becomes 1+2+3 = 6.

## How to Use / Run Locally

**C++**  
1. Copy the C++ solution into a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run `./main` and supply the input according to the problem statement.

**Java**  
1. Place the Java code in a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run `java Solution` (or the class that contains the main method you added for testing).

**JavaScript**  
1. Save the code as `solution.js`.  
2. Run it with Node: `node solution.js`.  
You may need a small driver that creates the arrays and calls the method.

**Python3**  
1. Save the code as `solution.py`.  
2. Execute with `python3 solution.py`.  
Add a short test harness that builds the radius and height lists and prints the result.

In every language remember to replace the empty method body with the actual implementation before running.

## Notes & Optimizations

Heights never exceed 1000, so a Fenwick tree of fixed size 1002 is enough; no coordinate compression is required.  
If heights were larger we would compress them first, but that step is unnecessary here.  

An alternative O(n²) dynamic-programming solution exists (classic LIS-style DP on the sorted list) but it will time out for n = 10^5. The Fenwick-tree approach keeps the solution safely inside the expected time limit.

When several discs share the same height the tree automatically keeps only the best sum, which is exactly what we need for the maximum height disc stack.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)