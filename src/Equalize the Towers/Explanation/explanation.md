# Equalize the Towers

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

You are given:

* An array `heights[]` representing heights of towers
* An array `cost[]` where `cost[i]` is the cost to increase or decrease tower `i` by 1 unit

Your goal is to make **all towers equal height**.

Each unit increase or decrease costs `cost[i]`.

Return the **minimum total cost** required.

---

## Constraints

* 1 ≤ n ≤ 10⁵
* 1 ≤ heights[i] ≤ 10⁴
* 1 ≤ cost[i] ≤ 10³

---

## Intuition

When I read the problem, I realized something important.

If I choose a target height `H`, then total cost becomes:

```bash
Σ |heights[i] − H| × cost[i]
```

So basically:

* I am minimizing a weighted absolute difference.
* This is a classic **Weighted Median** problem.

I remembered that:

👉 The value that minimizes weighted absolute difference is the **weighted median**.

So instead of trying every possible height,
I just need to:

1. Sort towers by height
2. Find the weighted median
3. Compute cost using that height

That gives the minimum cost.

---

## Approach

Here’s exactly how I solved it:

1. Pair heights with their cost.
2. Sort the pairs by height.
3. Compute total weight (sum of costs).
4. Walk through sorted list.
5. Keep adding weights.
6. When cumulative weight ≥ half of total weight → that height is the weighted median.
7. Calculate final cost using that height.

This works because the cost function is convex.

---

## Data Structures Used

* Vector / Array of pairs
* Sorting
* Long integer for large calculations

No complex data structures required.

---

## Operations & Behavior Summary

| Step | Operation             | Purpose                      |
| ---- | --------------------- | ---------------------------- |
| 1    | Pair height & cost    | Keep data together           |
| 2    | Sort by height        | Required for weighted median |
| 3    | Sum total weight      | Needed to find median        |
| 4    | Traverse & accumulate | Find weighted median         |
| 5    | Compute cost          | Calculate final answer       |

---

## Complexity

### Time Complexity: O(n log n)

* Sorting takes O(n log n)
* Median search takes O(n)
* Final cost calculation takes O(n)

Total = O(n log n)

Where:

* n = number of towers

---

### Space Complexity: O(n)

* Storing height-cost pairs

---

## Multi-language Solutions

---

### C++

```cpp
class Solution {
  public:
    int minCost(vector<int>& heights, vector<int>& cost) {
        int n = heights.size();
        
        vector<pair<long long,long long>> towers;
        for(int i = 0; i < n; i++)
            towers.push_back({heights[i], cost[i]});
        
        sort(towers.begin(), towers.end());
        
        long long totalWeight = 0;
        for(auto &t : towers)
            totalWeight += t.second;
        
        long long currWeight = 0;
        long long targetHeight = 0;
        
        for(auto &t : towers) {
            currWeight += t.second;
            if(currWeight * 2 >= totalWeight) {
                targetHeight = t.first;
                break;
            }
        }
        
        long long result = 0;
        for(auto &t : towers)
            result += abs(t.first - targetHeight) * t.second;
        
        return (int)result;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public int minCost(int[] heights, int[] cost) {
        int n = heights.length;
        
        long[][] towers = new long[n][2];
        for(int i = 0; i < n; i++) {
            towers[i][0] = heights[i];
            towers[i][1] = cost[i];
        }
        
        Arrays.sort(towers, (a, b) -> Long.compare(a[0], b[0]));
        
        long totalWeight = 0;
        for(int i = 0; i < n; i++)
            totalWeight += towers[i][1];
        
        long currWeight = 0;
        long targetHeight = 0;
        
        for(int i = 0; i < n; i++) {
            currWeight += towers[i][1];
            if(currWeight * 2 >= totalWeight) {
                targetHeight = towers[i][0];
                break;
            }
        }
        
        long result = 0;
        for(int i = 0; i < n; i++)
            result += Math.abs(towers[i][0] - targetHeight) * towers[i][1];
        
        return (int)result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    minCost(heights, cost) {
        let n = heights.length;
        
        let towers = [];
        for(let i = 0; i < n; i++)
            towers.push([heights[i], cost[i]]);
        
        towers.sort((a,b) => a[0] - b[0]);
        
        let totalWeight = 0;
        for(let i = 0; i < n; i++)
            totalWeight += towers[i][1];
        
        let currWeight = 0;
        let targetHeight = 0;
        
        for(let i = 0; i < n; i++) {
            currWeight += towers[i][1];
            if(currWeight * 2 >= totalWeight) {
                targetHeight = towers[i][0];
                break;
            }
        }
        
        let result = 0;
        for(let i = 0; i < n; i++)
            result += Math.abs(towers[i][0] - targetHeight) * towers[i][1];
        
        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def minCost(self, heights, cost):
        towers = list(zip(heights, cost))
        towers.sort()
        
        total_weight = sum(c for _, c in towers)
        
        curr_weight = 0
        target_height = 0
        
        for h, c in towers:
            curr_weight += c
            if curr_weight * 2 >= total_weight:
                target_height = h
                break
        
        result = 0
        for h, c in towers:
            result += abs(h - target_height) * c
        
        return result
```

---

## Step-by-step Detailed Explanation

Let me explain this like I am teaching my friend.

### Step 1: Combine heights and cost

I merge them so I can sort easily.

Example:

```bash
[(1,10), (2,100), (3,1000)]
```

---

### Step 2: Sort by height

Weighted median requires sorted values.

---

### Step 3: Calculate total weight

Example:

```bash
10 + 100 + 1000 = 1110
```

---

### Step 4: Find weighted median

Keep adding weights:

* After 10 → 10
* After 100 → 110
* After 1000 → 1110

When cumulative weight crosses half of total weight,
that height becomes answer.

---

### Step 5: Compute final cost

```bash
|height − target| × cost
```

Add for all towers.

Done.

---

## Examples

### Example 1

Input:

```bash
heights = [1,2,3]
cost = [10,100,1000]
```

Output:

```bash
120
```

---

### Example 2

Input:

```bash
heights = [7,1,5]
cost = [1,1,1]
```

Output:

```bash
6
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp
./a.out
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python

```bash
python solution.py
```

---

## Notes & Optimizations

* Use `long long` in C++ and `long` in Java to avoid overflow.
* Sorting is necessary.
* This is a weighted median problem.
* Avoid brute force — it will TLE.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
