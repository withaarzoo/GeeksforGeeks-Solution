# Count Sorted Digit Groupings | Dynamic Programming Solution (GFG)

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

The **Count Sorted Digit Groupings** problem asks us to split a string of digits into contiguous groups.

For every grouping, we calculate the sum of digits inside each group.

A grouping is considered valid only when the sequence of group sums is **non-decreasing** from left to right.

The goal is to count the total number of valid ways to partition the given digit string.

This is a classic **Dynamic Programming (DP)** problem that combines recursion, memoization, and string partitioning.

### Input

* A string `s` containing digits (`0-9`)

### Output

* Total number of valid groupings whose digit sums are in non-decreasing order

## Constraints

| Constraint        | Value             |
| ----------------- | ----------------- |
| String Length     | 1 ≤ n ≤ 100       |
| Characters        | Digits only (0-9) |
| Maximum Digit Sum | 900               |

## Intuition

When I first looked at this problem, I noticed that every partition creates a sequence of digit-sum values.

The only condition that matters is whether the next group's sum is greater than or equal to the previous group's sum.

That means while processing the string, I do not need to remember the actual groups. I only need two things:

1. My current position in the string.
2. The sum of the previously chosen group.

This observation naturally leads to a Dynamic Programming solution.

If the same position and previous sum appear again, the answer will always be the same, so memoization can save a lot of repeated work.

## Approach

1. Start from index `0`.
2. Try every possible substring beginning at the current position.
3. Calculate the digit sum of the current group.
4. Check whether the current sum is greater than or equal to the previous group sum.
5. If valid, recursively process the remaining part of the string.
6. Store results in a DP table.
7. Reuse stored answers whenever the same state appears again.
8. Return the total number of valid groupings.

This approach efficiently explores all valid partitions while avoiding repeated calculations.

## Data Structures Used

### 1. DP Table

Used for memoization.

Stores:

```text
dp[index][previousSum]
```

This represents the number of valid groupings possible from a specific position with a specific previous group sum.

### 2. Recursion Stack

Used to explore different partition possibilities.

The recursion depth can be at most equal to the length of the string.

## Operations & Behavior Summary

The algorithm works in the following stages:

1. Start at the first digit.
2. Create all possible groups beginning from the current index.
3. Maintain the running digit sum of the current group.
4. Compare it with the previous group's sum.
5. If the condition is satisfied:

   * Accept the group.
   * Move to the next position.
6. Continue recursively.
7. When the end of the string is reached:

   * Count one valid grouping.
8. Use memoization to avoid solving identical states again.

## Complexity

| Metric           | Complexity  | Explanation                                                                                       |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| Time Complexity  | O(n² × 900) | DP states are based on index and previous sum. Each state may explore multiple partition endings. |
| Space Complexity | O(n × 900)  | DP table stores memoized answers for every possible state.                                        |

Where:

* `n` = length of the digit string
* `900` = maximum possible digit sum (`100 × 9`)

## Multi-language Solutions

### C++

```cpp
class Solution {
    vector<vector<int>> dp;

    int solve(int idx, int prevSum, string &s) {
        int n = s.size();

        // Reached end -> one valid grouping found
        if (idx == n)
            return 1;

        // Return already computed answer
        if (dp[idx][prevSum] != -1)
            return dp[idx][prevSum];

        int ans = 0;
        int currSum = 0;

        // Try every possible group starting at idx
        for (int end = idx; end < n; end++) {

            // Add current digit to group sum
            currSum += s[end] - '0';

            // Current group is valid only if sums remain non-decreasing
            if (currSum >= prevSum) {
                ans += solve(end + 1, currSum, s);
            }
        }

        // Store result for memoization
        return dp[idx][prevSum] = ans;
    }

public:
    int validGroups(string &s) {
        int n = s.size();

        // prevSum can be from 0 to 900
        dp.assign(n, vector<int>(901, -1));

        return solve(0, 0, s);
    }
};
```

### Java

```java
class Solution {

    private int[][] dp;

    private int solve(int idx, int prevSum, String s) {
        int n = s.length();

        // Reached end -> one valid grouping
        if (idx == n)
            return 1;

        // Memoized answer
        if (dp[idx][prevSum] != -1)
            return dp[idx][prevSum];

        int ans = 0;
        int currSum = 0;

        // Try all possible group endings
        for (int end = idx; end < n; end++) {

            // Update current group sum
            currSum += s.charAt(end) - '0';

            // Maintain non-decreasing condition
            if (currSum >= prevSum) {
                ans += solve(end + 1, currSum, s);
            }
        }

        return dp[idx][prevSum] = ans;
    }

    public int validGroups(String s) {
        int n = s.length();

        dp = new int[n][901];

        // Initialize memo table
        for (int i = 0; i < n; i++) {
            java.util.Arrays.fill(dp[i], -1);
        }

        return solve(0, 0, s);
    }
}
```

### JavaScript

```javascript
class Solution {
    validGroups(s) {
        const n = s.length;

        // dp[index][prevSum]
        const dp = Array.from({ length: n }, () =>
            Array(901).fill(-1)
        );

        const solve = (idx, prevSum) => {

            // Reached end -> one valid grouping
            if (idx === n) {
                return 1;
            }

            // Memoized answer
            if (dp[idx][prevSum] !== -1) {
                return dp[idx][prevSum];
            }

            let ans = 0;
            let currSum = 0;

            // Try every possible group
            for (let end = idx; end < n; end++) {

                // Add digit to current sum
                currSum += Number(s[end]);

                // Check non-decreasing condition
                if (currSum >= prevSum) {
                    ans += solve(end + 1, currSum);
                }
            }

            return dp[idx][prevSum] = ans;
        };

        return solve(0, 0);
    }
}
```

### Python3

```python
class Solution:
    def validGroups(self, s):
        n = len(s)

        # dp[index][prevSum]
        dp = [[-1] * 901 for _ in range(n)]

        def solve(idx, prev_sum):

            # Reached end -> one valid grouping
            if idx == n:
                return 1

            # Memoized answer
            if dp[idx][prev_sum] != -1:
                return dp[idx][prev_sum]

            ans = 0
            curr_sum = 0

            # Try every possible ending position
            for end in range(idx, n):

                # Update current group sum
                curr_sum += int(s[end])

                # Non-decreasing condition
                if curr_sum >= prev_sum:
                    ans += solve(end + 1, curr_sum)

            dp[idx][prev_sum] = ans
            return ans

        return solve(0, 0)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all implementations.

### Step 1: Define the State

The most important part of the solution is the DP state:

```text
(index, previousSum)
```

This tells us:

* Where we are in the string
* What sum the previous group had

### Step 2: Handle the Base Case

Whenever we reach the end of the string:

```text
index == n
```

it means we successfully created a valid grouping.

So we return `1`.

### Step 3: Check Memoized Results

Before doing any calculations, we check whether this state has already been solved.

If yes, we immediately return the stored answer.

This prevents exponential recomputation.

### Step 4: Build Groups

Starting from the current index:

* Take one digit
* Then two digits
* Then three digits
* Continue until the end

For every extension:

* Update the running digit sum

### Step 5: Validate the Group

The problem requires:

```text
sum1 ≤ sum2 ≤ sum3 ≤ ...
```

So before selecting a group, we verify:

```text
currentSum >= previousSum
```

Only then can we continue.

### Step 6: Recursive Exploration

Once a valid group is chosen:

* Move to the next position
* Use the current group's sum as the new previous sum
* Continue processing the rest of the string

### Step 7: Store the Result

After trying every valid group:

* Store the answer in DP
* Return it

This ensures every state is solved only once.

## Examples

### Example 1

**Input**

```text
1119
```

**Output**

```text
7
```

**Explanation**

Valid groupings include:

```text
["1119"]
["111","9"]
["11","19"]
["1","119"]
["1","11","9"]
["1","1","19"]
["1","1","1","9"]
```

Total valid groupings = 7

---

### Example 2

**Input**

```text
12
```

**Output**

```text
2
```

**Explanation**

Possible valid partitions:

```text
["12"]
["1","2"]
```

Answer = 2

---

### Example 3

**Input**

```text
111
```

**Output**

```text
3
```

**Explanation**

Valid partitions:

```text
["111"]
["1","11"]
["1","1","1"]
```

Answer = 3

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

* Memoization is essential. Without it, the recursion would become extremely slow.
* The maximum possible digit sum is only 900, which makes DP feasible.
* Only the previous group's sum is needed; storing complete partitions would waste memory.
* The solution naturally handles:

  * Single-digit strings
  * Strings containing zeroes
  * Large input sizes within constraints
* A pure brute-force solution would revisit the same states repeatedly and perform much worse.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
