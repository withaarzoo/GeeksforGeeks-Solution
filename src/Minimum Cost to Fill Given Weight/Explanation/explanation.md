# Minimum Cost to Fill Given Weight

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

The **Minimum Cost to Fill Given Weight** problem asks us to find the minimum amount of money required to buy exactly **w kg** of oranges.

We are given an array called `cost[]` where:

* `cost[0]` represents the cost of a 1 kg packet
* `cost[1]` represents the cost of a 2 kg packet
* `cost[2]` represents the cost of a 3 kg packet
* and so on

Some packet sizes may not be available. In that case, their cost is given as `-1`.

The goal is to determine the minimum possible cost needed to reach exactly the target weight. If it is impossible to form exactly `w` kg using the available packet sizes, we return `-1`.

This is a classic **Dynamic Programming** and **Unbounded Knapsack** problem because each packet can be used an unlimited number of times.

## Constraints

| Constraint          | Value  |
| ------------------- | ------ |
| 1 ≤ cost.size()     | 2000   |
| 1 ≤ w               | 2000   |
| 1 ≤ cost[i]         | 100000 |
| cost[i] may also be | -1     |

## Intuition

My first observation was that I do not need to know which packets were chosen. I only need the minimum cost required to reach a particular weight.

For every packet size, I can either use it or skip it. Since packets can be purchased multiple times, this immediately looks similar to the Unbounded Knapsack pattern.

Instead of maximizing profit, I am minimizing cost.

So I started thinking about building smaller answers first. If I already know the cheapest way to make `3 kg`, then I can use that information to build the cheapest way to make `5 kg`, `6 kg`, and so on.

That naturally leads to Dynamic Programming.

## Approach

1. Create a DP array where `dp[i]` stores the minimum cost required to form exactly `i kg`.
2. Initialize all values with a very large number to represent an unreachable state.
3. Set `dp[0] = 0` because buying zero kilograms costs nothing.
4. Traverse every packet size available in the input.
5. Skip packet sizes whose cost is `-1`.
6. For every valid packet:

   * Calculate its weight as `index + 1`
   * Update all possible target weights from that packet weight up to `w`
7. If using the current packet gives a cheaper cost, update the DP value.
8. After processing all packet sizes:

   * Return `dp[w]` if it is reachable
   * Otherwise return `-1`

## Data Structures Used

### 1. Dynamic Programming Array

A one-dimensional array is used to store the minimum cost required for every achievable weight.

Why it is useful:

* Fast lookups
* Easy updates
* Keeps memory usage low
* Perfect for bottom-up Dynamic Programming

### 2. Integer Variables

Used to store:

* Current packet weight
* Packet cost
* Array size
* Large unreachable value

No additional complex data structures are required.

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Create a DP array.
2. Mark all weights as unreachable initially.
3. Set the cost of achieving weight 0 as 0.
4. Iterate through every packet type.
5. Ignore unavailable packet sizes.
6. For each valid packet:

   * Try adding it to all valid weights.
   * Update the minimum cost whenever a cheaper combination is found.
7. Continue until all packet sizes are processed.
8. Return the minimum cost for exactly `w kg`.
9. Return `-1` if no valid combination exists.

## Complexity

| Metric           | Complexity | Explanation                                                |
| ---------------- | ---------- | ---------------------------------------------------------- |
| Time Complexity  | O(n × w)   | `n` packet types and up to `w` weight states are processed |
| Space Complexity | O(w)       | Only a single DP array of size `w + 1` is used             |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minimumCost(vector<int> &cost, int w) {
        
        // Large value representing an unreachable state
        const int INF = 1e9;

        // dp[i] = minimum cost to get exactly i kg
        vector<int> dp(w + 1, INF);

        // Base case: 0 kg requires 0 cost
        dp[0] = 0;

        int n = cost.size();

        // Process every packet type
        for (int i = 0; i < n; i++) {

            // Skip unavailable packets
            if (cost[i] == -1) continue;

            // Packet weight is (i + 1)
            int wt = i + 1;

            // Unbounded knapsack transition
            for (int j = wt; j <= w; j++) {

                // If previous state is reachable,
                // try taking this packet
                if (dp[j - wt] != INF) {
                    dp[j] = min(dp[j], dp[j - wt] + cost[i]);
                }
            }
        }

        // If still unreachable, answer is -1
        return dp[w] == INF ? -1 : dp[w];
    }
};
```

### Java

```java
class Solution {
    public int minimumCost(int[] cost, int w) {

        // Large value representing unreachable state
        int INF = (int)1e9;

        // dp[i] = minimum cost to get exactly i kg
        int[] dp = new int[w + 1];

        // Initialize all states as unreachable
        Arrays.fill(dp, INF);

        // Base case
        dp[0] = 0;

        int n = cost.length;

        // Process every packet type
        for (int i = 0; i < n; i++) {

            // Skip unavailable packets
            if (cost[i] == -1) continue;

            // Packet weight
            int wt = i + 1;

            // Unbounded knapsack transition
            for (int j = wt; j <= w; j++) {

                // If previous weight is reachable
                if (dp[j - wt] != INF) {
                    dp[j] = Math.min(dp[j], dp[j - wt] + cost[i]);
                }
            }
        }

        // Return answer
        return dp[w] == INF ? -1 : dp[w];
    }
}
```

### JavaScript

```javascript
class Solution {
    minimumCost(cost, w) {

        // Large value representing unreachable state
        const INF = 1e9;

        // dp[i] = minimum cost to get exactly i kg
        const dp = new Array(w + 1).fill(INF);

        // Base case
        dp[0] = 0;

        const n = cost.length;

        // Process every packet type
        for (let i = 0; i < n; i++) {

            // Skip unavailable packets
            if (cost[i] === -1) continue;

            // Packet weight
            const wt = i + 1;

            // Unbounded knapsack transition
            for (let j = wt; j <= w; j++) {

                // If previous state is reachable
                if (dp[j - wt] !== INF) {
                    dp[j] = Math.min(dp[j], dp[j - wt] + cost[i]);
                }
            }
        }

        // Return final answer
        return dp[w] === INF ? -1 : dp[w];
    }
}
```

### Python3

```python
class Solution:
    def minimumCost(self, cost, w):

        # Large value representing unreachable state
        INF = 10**9

        # dp[i] = minimum cost to get exactly i kg
        dp = [INF] * (w + 1)

        # Base case
        dp[0] = 0

        n = len(cost)

        # Process every packet type
        for i in range(n):

            # Skip unavailable packets
            if cost[i] == -1:
                continue

            # Packet weight
            wt = i + 1

            # Unbounded knapsack transition
            for j in range(wt, w + 1):

                # If previous state is reachable,
                # try using current packet
                if dp[j - wt] != INF:
                    dp[j] = min(dp[j], dp[j - wt] + cost[i])

        # Return answer
        return -1 if dp[w] == INF else dp[w]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Create the DP Array

The DP array stores the minimum cost required to achieve every weight from `0` to `w`.

Initially, all positions are marked as unreachable.

Example:

```text
dp = [0, INF, INF, INF, INF]
```

Only weight `0` is known at the beginning.

### Step 2: Process Every Packet Type

Each index corresponds to a packet size.

```text
index 0 → 1 kg
index 1 → 2 kg
index 2 → 3 kg
```

The actual packet weight is always:

```text
weight = index + 1
```

### Step 3: Skip Unavailable Packets

Whenever the cost is `-1`, that packet size cannot be purchased.

There is no reason to process it.

### Step 4: Update Reachable Weights

For every valid packet, the algorithm tries to use it to build larger weights.

If:

```text
current weight = j
packet weight = wt
```

then the previous state is:

```text
j - wt
```

If that previous state is reachable, the current state may also become reachable.

### Step 5: Keep the Cheapest Cost

Whenever a new combination is found, compare it against the existing answer.

If the new combination costs less, update the DP value.

This guarantees that every DP position always stores the cheapest possible cost.

### Step 6: Handle Impossible Cases

After all updates:

* Reachable value → return minimum cost
* Unreachable value → return `-1`

This ensures correct handling of impossible test cases.

### Language-Specific Notes

#### C++

Uses a `vector<int>` for DP storage.

#### Java

Uses an integer array and `Arrays.fill()` for initialization.

#### JavaScript

Uses a standard array filled with a large value.

#### Python3

Uses a list initialized with a large integer value.

The algorithm and complexity remain identical in all languages.

## Examples

### Example 1

**Input**

```text
cost = [20, 10, 4, 50, 100]
w = 5
```

**Output**

```text
14
```

**Explanation**

```text
2 kg packet = 10
3 kg packet = 4

2 + 3 = 5 kg
10 + 4 = 14
```

No cheaper combination exists.

---

### Example 2

**Input**

```text
cost = [-1, -1, 4, 3, -1]
w = 5
```

**Output**

```text
-1
```

**Explanation**

Available packet sizes:

```text
3 kg
4 kg
```

No combination forms exactly 5 kg.

---

### Example 3

**Input**

```text
cost = [1, 3, 4]
w = 4
```

**Output**

```text
4
```

**Explanation**

Possible combinations:

```text
1 + 1 + 1 + 1 = 4
cost = 4
```

This is the minimum achievable cost.

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

### JavaScript

Run:

```bash
node solution.js
```

### Python3

Run:

```bash
python solution.py
```

## Notes & Optimizations

* This problem is a variation of the Unbounded Knapsack problem.
* A one-dimensional DP array is enough.
* Using a two-dimensional DP table would increase memory usage unnecessarily.
* Always skip packet sizes with cost `-1`.
* Make sure the final answer corresponds to exactly `w kg`, not less and not more.
* The DP approach guarantees the minimum cost among all valid combinations.
* The solution handles impossible cases naturally by keeping unreachable states unchanged.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
