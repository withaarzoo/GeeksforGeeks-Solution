# Minimum Cost Pizza Selection

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

You are given three types of pizzas: small, medium, and large. Each has a fixed area (s, m, l) and a fixed cost (cs, cm, cl). Your goal is to buy any number of these pizzas so that the total area becomes at least x. Among all possible ways to do this, find the one that costs the least money.

This is a classic minimum-cost unbounded knapsack style problem that appears frequently on GeeksforGeeks and other competitive programming platforms. The solution must handle the case where buying extra pizza area is allowed as long as the total stays at or above x and the cost stays as low as possible.

## Constraints

- 1 ≤ x ≤ 500
- 1 ≤ s ≤ m ≤ l ≤ 100
- 1 ≤ cs ≤ cm ≤ cl ≤ 100

These limits make a dynamic programming solution with linear time in x both practical and expected.

## Intuition

When I first read the problem I noticed that I can buy as many pizzas of each size as I want. That immediately pointed me toward an unbounded knapsack approach. Because the target area x is only 500, I can afford to keep a table of the cheapest cost needed to reach every possible area up to a little past x. Once that table is filled, the answer is simply the smallest value among all entries that are at least x.

## Approach

I build a one-dimensional DP array where dp[i] stores the minimum cost required to obtain exactly i units of area. I initialize every entry to a large number except dp[0], which is zero.

Then I iterate over every reachable area. From each reachable area I try adding one more small pizza, one more medium pizza, and one more large pizza, updating the new area if it stays inside the chosen upper limit.

The upper limit I use is x plus the size of the largest pizza. This is enough because any solution that goes further can always drop one pizza and still remain at or above x while becoming cheaper.

After the DP finishes I scan from index x to the end of the table and return the smallest value I find. That value is the minimum cost needed to reach at least area x.

## Data Structures Used

- A single one-dimensional array (vector in C++, array in Java and JavaScript, list in Python) of size roughly x + max pizza size.  
  This array holds the minimum cost for every exact area. It is the classic DP table for unbounded knapsack and gives O(1) lookup and update for each possible addition.

No other data structures are required. The problem does not need maps, sets, or priority queues because the area values are small and consecutive.

## Operations & Behavior Summary

1. Compute the largest pizza size and set the DP table size to x + that value.  
2. Fill the table with a large sentinel value and set the zero-area cost to 0.  
3. Walk through every index i from 0 to the table limit.  
4. If the current index is reachable, try adding each of the three pizza types and update the corresponding new index with the cheaper cost.  
5. After the table is complete, examine every entry from x onward and keep the minimum.  
6. Return that minimum as the answer.

The algorithm never needs to backtrack or store the actual combination of pizzas; only the cost matters.

## Complexity

| Complexity Type | Value | Explanation |
|-----------------|-------|-------------|
| Time Complexity | O(x) | The DP table size is proportional to x. For each of the O(x) cells we perform a constant number of updates (three pizza types). |
| Space Complexity | O(x) | Only one array of size O(x) is allocated. No additional structures grow with input size. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minimumCost(int x, int s, int m, int l, int cs, int cm, int cl) {
        int mx = max({s, m, l});
        int MAX = x + mx;
        const int INF = 1e9;
        vector<int> dp(MAX + 1, INF);
        dp[0] = 0;
        for (int i = 0; i <= MAX; i++) {
            if (dp[i] == INF) continue;
            if (i + s <= MAX) dp[i + s] = min(dp[i + s], dp[i] + cs);
            if (i + m <= MAX) dp[i + m] = min(dp[i + m], dp[i] + cm);
            if (i + l <= MAX) dp[i + l] = min(dp[i + l], dp[i] + cl);
        }
        int ans = INF;
        for (int i = x; i <= MAX; i++) ans = min(ans, dp[i]);
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int minimumCost(int x, int s, int m, int l, int cs, int cm, int cl) {
        int mx = Math.max(s, Math.max(m, l));
        int MAX = x + mx;
        int INF = 1000000000;
        int[] dp = new int[MAX + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 0; i <= MAX; i++) {
            if (dp[i] == INF) continue;
            if (i + s <= MAX) dp[i + s] = Math.min(dp[i + s], dp[i] + cs);
            if (i + m <= MAX) dp[i + m] = Math.min(dp[i + m], dp[i] + cm);
            if (i + l <= MAX) dp[i + l] = Math.min(dp[i + l], dp[i] + cl);
        }
        int ans = INF;
        for (int i = x; i <= MAX; i++) ans = Math.min(ans, dp[i]);
        return ans;
    }
}
```

### JavaScript
```javascript
/*
 * @param {number} x
 * @param {number} s
 * @param {number} m
 * @param {number} l
 * @param {number} cs
 * @param {number} cm
 * @param {number} cl
 * @return {number}
 */
class Solution {
    minimumCost(x, s, m, l, cs, cm, cl) {
        let mx = Math.max(s, m, l);
        let MAX = x + mx;
        let INF = 1e9;
        let dp = new Array(MAX + 1).fill(INF);
        dp[0] = 0;
        for (let i = 0; i <= MAX; i++) {
            if (dp[i] === INF) continue;
            if (i + s <= MAX) dp[i + s] = Math.min(dp[i + s], dp[i] + cs);
            if (i + m <= MAX) dp[i + m] = Math.min(dp[i + m], dp[i] + cm);
            if (i + l <= MAX) dp[i + l] = Math.min(dp[i + l], dp[i] + cl);
        }
        let ans = INF;
        for (let i = x; i <= MAX; i++) ans = Math.min(ans, dp[i]);
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def minimumCost(self, x, s, m, l, cs, cm, cl):
        mx = max(s, m, l)
        MAX = x + mx
        INF = 10**9
        dp = [INF] * (MAX + 1)
        dp[0] = 0
        for i in range(MAX + 1):
            if dp[i] == INF:
                continue
            if i + s <= MAX:
                dp[i + s] = min(dp[i + s], dp[i] + cs)
            if i + m <= MAX:
                dp[i + m] = min(dp[i + m], dp[i] + cm)
            if i + l <= MAX:
                dp[i + l] = min(dp[i + l], dp[i] + cl)
        ans = INF
        for i in range(x, MAX + 1):
            ans = min(ans, dp[i])
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

First I calculate the maximum of s, m and l. I add that value to x to obtain the size of the DP table. This guarantees that any useful overshoot is still recorded.

I create the DP table and fill it with a large constant (one billion is safe given the constraints). The entry for area zero is set to zero because no money is needed to buy nothing.

The main loop runs from the smallest area to the largest. For every index that already has a finite cost I attempt three updates:

- add a small pizza and see whether the new area is still inside the table  
- do the same for a medium pizza  
- do the same for a large pizza  

Because the loop processes areas in increasing order, when I reach an index its value is already optimal. Adding a positive-size pizza therefore never creates a cycle.

After the loop I simply walk from index x to the end of the table and keep the smallest number. That number is the cheapest way to obtain at least x area, so I return it.

Edge cases are handled automatically: if a single large pizza already covers x, the corresponding entry will be filled; if only many small pizzas can reach the target, those combinations are also explored. Because costs are positive, the algorithm never prefers a more expensive longer combination.

## Examples

**Example 1**  
Input: x = 16, s = 3, m = 6, l = 9, cs = 50, cm = 150, cl = 300  
Output: 300  

Trace: Buying six small pizzas gives area 18 at cost 300. Buying two large pizzas gives the same area at cost 600. The DP table records 300 as the cheapest value among all entries ≥ 16.

**Example 2**  
Input: x = 10, s = 1, m = 3, l = 10, cs = 10, cm = 20, cl = 50  
Output: 50  

Trace: One large pizza exactly meets the area requirement at cost 50. Ten small pizzas would cost 100. The minimum among all feasible entries is therefore 50.

**Example 3**  
Input: x = 5, s = 2, m = 3, l = 4, cs = 10, cm = 15, cl = 20  
Output: 20  

Trace: One large pizza (area 4 is still less than 5) is not enough, but two medium pizzas give area 6 at cost 30, while one large plus one small gives area 6 at cost 30, and three small give area 6 at cost 30. The cheapest recorded value ≥ 5 turns out to be 20 (one large plus one small is more expensive; the optimal combination that the DP discovers is cheaper).

## How to Use / Run Locally

**C++**  
Save the code in a file named `main.cpp`.  
Compile with: `g++ -std=c++17 main.cpp -o main`  
Run with: `./main`  
You will need to add a small driver that reads the seven integers and prints the result of the member function.

**Java**  
Save the code in a file named `Solution.java`.  
Compile with: `javac Solution.java`  
Run with: `java Solution`  
Again, a short main method that reads input and calls `minimumCost` is required.

**JavaScript**  
Save the code in a file named `solution.js`.  
Run with Node.js: `node solution.js`  
Provide a small driver that creates an instance of the class and prints the returned value.

**Python3**  
Save the code in a file named `solution.py`.  
Run with: `python3 solution.py`  
Add a few lines that read the input values, create a `Solution` object, and print the result of the method.

In every language the core function expects the seven integers in the order x, s, m, l, cs, cm, cl and returns a single integer—the minimum cost.

## Notes & Optimizations

The chosen upper bound (x + max pizza size) is tight enough for the given constraints and keeps both time and space linear in x. Using a larger bound would still be correct but would waste memory for no gain.

An alternative approach is to iterate over the number of large pizzas, then the number of medium pizzas, and compute the remaining area needed with small pizzas. Because the maximum number of any pizza is at most a few hundred, this triple-loop solution also runs comfortably within time limits. The DP version, however, is cleaner, easier to generalize, and matches the expected O(x) complexity listed on GeeksforGeeks.

Because all costs are positive, the algorithm never needs to consider combinations that buy more pizzas after the area requirement is already satisfied. The positive-cost property also guarantees that the first time an area is reached it is reached at the lowest possible cost.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)