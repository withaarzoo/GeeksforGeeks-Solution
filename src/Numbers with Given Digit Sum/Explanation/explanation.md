# Numbers with Given Digit Sum | Dynamic Programming Solution | GeeksforGeeks

A beginner-friendly Dynamic Programming solution for the **GeeksforGeeks "Numbers with Given Digit Sum"** problem. This repository explains the intuition, approach, complexity analysis, and provides solutions in multiple programming languages.

The goal is to count the number of valid **n-digit positive integers** whose digits add up to a given sum. Since the first digit cannot be zero, handling leading zeros correctly becomes an important part of the solution.

This repository is designed for students preparing for coding interviews, competitive programming contests, and placement exams.

---

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

---

## Problem Summary

Given two integers **n** and **sum**, the task is to count how many **n-digit positive numbers** have a digit sum exactly equal to **sum**.

There is one important rule:

- The first digit cannot be zero because the number must contain exactly **n digits**.

If no such number exists, the answer should be **-1**.

This is a classic **Dynamic Programming (DP)** problem because many smaller subproblems repeat while building different digit combinations.

---

## Constraints

| Constraint | Value |
|------------|-------|
| 1 ≤ n ≤ 9 | Number of digits |
| 1 ≤ sum ≤ 81 | Required digit sum |

---

## Intuition

The first thing I noticed was that generating every possible number would be far too expensive, even for small values of **n**.

Instead of creating every number, I only need to count how many ways each digit sum can be formed.

That naturally leads to Dynamic Programming.

For every digit position, I try all digits from **0 to 9** and keep track of the current digit sum.

The only extra challenge is the first digit. Since leading zeros are not allowed, I count all digit sequences first and then remove the ones that start with zero.

This avoids writing separate transition logic for the first digit and keeps the solution simple.

---

## Approach

1. Create a DP table where each state stores the number of ways to reach a particular digit sum.
2. Start with zero digits and digit sum zero.
3. For every digit position, try placing digits from **0 to 9**.
4. Update the DP table whenever the new digit does not exceed the required sum.
5. After processing all digits, the DP table contains every possible sequence, including those with leading zeros.
6. Build another DP table for numbers whose first digit is fixed as zero.
7. Subtract these invalid sequences from the total count.
8. If the final answer becomes zero, return **-1**.

---

## Data Structures Used

### 2D Dynamic Programming Table

Stores the number of ways to build a certain digit sum after processing a certain number of digits.

Why it is used:

- Avoids recalculating identical states
- Makes the solution efficient
- Fits comfortably within the given constraints

---

## Operations & Behavior Summary

The algorithm works in the following order:

1. Check whether the required digit sum is even possible.
2. Initialize the DP table.
3. Build answers for every digit position.
4. Count every possible digit sequence.
5. Count sequences that begin with zero.
6. Remove invalid sequences.
7. Return the remaining count.
8. Return **-1** if no valid number exists.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | O(n × sum × 10) | Every DP state tries all ten possible digits. Since 10 is constant, this is effectively O(n × sum). |
| Space Complexity | O(n × sum) | Two DP tables are used to store intermediate results. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countWays(int n, int sum) {
        // Maximum possible digit sum for n digits is 9*n
        if (sum > 9 * n) return -1;

        // dp[i][j] = ways to form i digits with digit sum j
        vector<vector<int>> dp(n + 1, vector<int>(sum + 1, 0));

        // Base case: 0 digits with sum 0
        dp[0][0] = 1;

        // Build DP table
        for (int i = 0; i < n; i++) {
            for (int s = 0; s <= sum; s++) {
                if (dp[i][s] == 0) continue;

                // Try every possible digit
                for (int d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dp[i + 1][s + d] += dp[i][s];
                    }
                }
            }
        }

        // Total sequences (including leading zeroes)
        int total = dp[n][sum];

        // If there is only one digit, leading zero case does not exist
        if (n == 1) return total == 0 ? -1 : total;

        // DP for remaining n-1 digits (first digit fixed as 0)
        vector<vector<int>> dpZero(n, vector<int>(sum + 1, 0));
        dpZero[0][0] = 1;

        for (int i = 0; i < n - 1; i++) {
            for (int s = 0; s <= sum; s++) {
                if (dpZero[i][s] == 0) continue;

                for (int d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dpZero[i + 1][s + d] += dpZero[i][s];
                    }
                }
            }
        }

        // Remove numbers starting with 0
        int ans = total - dpZero[n - 1][sum];

        // If no valid number exists
        return ans == 0 ? -1 : ans;
    }
};
```

### Java

```java
class Solution {
    public int countWays(int n, int sum) {

        // Maximum possible digit sum
        if (sum > 9 * n) return -1;

        // dp[i][j] = ways to form i digits with sum j
        int[][] dp = new int[n + 1][sum + 1];

        // Base case
        dp[0][0] = 1;

        // Fill DP table
        for (int i = 0; i < n; i++) {
            for (int s = 0; s <= sum; s++) {
                if (dp[i][s] == 0) continue;

                // Try every digit
                for (int d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dp[i + 1][s + d] += dp[i][s];
                    }
                }
            }
        }

        int total = dp[n][sum];

        // Single digit case
        if (n == 1) return total == 0 ? -1 : total;

        // DP for numbers whose first digit is 0
        int[][] dpZero = new int[n][sum + 1];
        dpZero[0][0] = 1;

        for (int i = 0; i < n - 1; i++) {
            for (int s = 0; s <= sum; s++) {
                if (dpZero[i][s] == 0) continue;

                for (int d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dpZero[i + 1][s + d] += dpZero[i][s];
                    }
                }
            }
        }

        int ans = total - dpZero[n - 1][sum];

        return ans == 0 ? -1 : ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number} sum
 * @return {number}
 */

class Solution {
    countWays(n, sum) {

        // Impossible if required sum is larger than maximum possible
        if (sum > 9 * n) return -1;

        // DP table
        let dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(0));

        // Base case
        dp[0][0] = 1;

        // Build DP
        for (let i = 0; i < n; i++) {
            for (let s = 0; s <= sum; s++) {
                if (dp[i][s] === 0) continue;

                // Try every digit
                for (let d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dp[i + 1][s + d] += dp[i][s];
                    }
                }
            }
        }

        let total = dp[n][sum];

        // Single digit case
        if (n === 1) return total === 0 ? -1 : total;

        // DP after fixing first digit as 0
        let dpZero = Array.from({ length: n }, () => Array(sum + 1).fill(0));

        dpZero[0][0] = 1;

        for (let i = 0; i < n - 1; i++) {
            for (let s = 0; s <= sum; s++) {
                if (dpZero[i][s] === 0) continue;

                for (let d = 0; d <= 9; d++) {
                    if (s + d <= sum) {
                        dpZero[i + 1][s + d] += dpZero[i][s];
                    }
                }
            }
        }

        let ans = total - dpZero[n - 1][sum];

        return ans === 0 ? -1 : ans;
    }
};
```

### Python3

```python
class Solution:
    def countWays(self, n, sum):
        
        # Impossible if required sum is too large
        if sum > 9 * n:
            return -1

        # dp[i][j] = ways to form i digits with digit sum j
        dp = [[0] * (sum + 1) for _ in range(n + 1)]

        # Base case
        dp[0][0] = 1

        # Fill DP table
        for i in range(n):
            for s in range(sum + 1):
                if dp[i][s] == 0:
                    continue

                # Try every possible digit
                for d in range(10):
                    if s + d <= sum:
                        dp[i + 1][s + d] += dp[i][s]

        total = dp[n][sum]

        # Single digit case
        if n == 1:
            return total if total else -1

        # DP for remaining digits when first digit is fixed as 0
        dp_zero = [[0] * (sum + 1) for _ in range(n)]

        dp_zero[0][0] = 1

        for i in range(n - 1):
            for s in range(sum + 1):
                if dp_zero[i][s] == 0:
                    continue

                for d in range(10):
                    if s + d <= sum:
                        dp_zero[i + 1][s + d] += dp_zero[i][s]

        ans = total - dp_zero[n - 1][sum]

        return ans if ans else -1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in every programming language.

First, the algorithm checks whether the required digit sum can ever be achieved. Since every digit contributes at most 9, any sum greater than **9 × n** is impossible.

Next, a Dynamic Programming table is created.

Each state represents:

- How many digits have already been chosen.
- What the current digit sum is.

The starting state is zero digits with sum zero.

For every state, the algorithm tries adding digits from **0** to **9**.

Whenever adding a digit keeps the total sum within the required limit, the answer is transferred to the next state.

After processing every digit position, the final DP state contains the number of all digit sequences.

However, this count also includes numbers like:

- 0012
- 0008
- 0123

These are not valid **n-digit numbers** because they begin with zero.

To remove them, another DP table is created where the first digit is assumed to be zero.

This second table counts exactly the invalid numbers.

Finally, the invalid count is subtracted from the total count.

If nothing remains after subtraction, there is no valid answer, so the algorithm returns **-1**.

Since every language follows the same Dynamic Programming transitions, the reasoning stays identical across C++, Java, JavaScript, and Python.

---

## Examples

### Example 1

**Input**

```text
n = 2
sum = 2
```

**Output**

```text
2
```

**Trace**

Possible numbers are:

- 11
- 20

Total = 2

---

### Example 2

**Input**

```text
n = 1
sum = 10
```

**Output**

```text
-1
```

**Trace**

A single digit can only be between 0 and 9.

Digit sum 10 is impossible.

---

### Example 3

**Input**

```text
n = 2
sum = 10
```

**Output**

```text
9
```

**Trace**

The valid numbers are:

19

28

37

46

55

64

73

82

91

Total = 9

---

## How to Use / Run Locally

Clone the repository first.

```bash
git clone <repository-url>
```

Move inside the project folder.

```bash
cd <repository-name>
```

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run using Node.js.

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- This is a standard Dynamic Programming counting problem.
- Brute force generation is not practical because the number of possible n-digit numbers grows exponentially.
- DP avoids solving identical subproblems multiple times.
- Leading zeros are handled separately, making the transition logic much cleaner.
- The given constraints are small enough that a 2D DP table easily fits into memory.
- The same idea can also be implemented using memoization instead of bottom-up Dynamic Programming.
- Space optimization is possible by keeping only the previous DP row because each state depends only on the previous digit position.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
