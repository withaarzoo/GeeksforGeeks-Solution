# Friends Pairing Problem | Dynamic Programming Solution in C++, Java, JavaScript, and Python

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

The Friends Pairing Problem is a popular Dynamic Programming (DP) problem frequently asked in coding interviews and competitive programming contests.

In this problem, there are `n` friends. Every friend has two possible choices:

- Stay single.
- Pair up with exactly one other friend.

A friend can belong to only one pair. The goal is to find the total number of different ways all friends can either remain single or form valid pairs.

The input consists of a single integer `n`, representing the number of friends.

The output should be the total number of valid arrangements.

This problem is a classic example of Dynamic Programming because the answer for `n` depends on the answers for smaller values of `n`.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number of Friends (`n`) | `1 ≤ n ≤ 18` |

---

## Intuition

When I first looked at this problem, I noticed that every friend has only two possible choices.

The first friend can either remain single or pair with someone else.

If the first friend stays single, then the remaining problem becomes finding the answer for `n - 1` friends.

If the first friend pairs up, I can choose any one of the remaining `n - 1` friends as the partner. After forming that pair, I only need to solve the problem for the remaining `n - 2` friends.

This observation naturally leads to a recurrence relation where each answer depends only on the previous two answers.

Once I realized that, Dynamic Programming became the most efficient solution.

---

## Approach

I solve the problem using an iterative Dynamic Programming approach with constant extra space.

First, I handle the base cases.

- One friend has only one arrangement.
- Two friends have two possible arrangements.

Then I build the answer from `3` up to `n`.

For every number of friends, I calculate:

- The number of ways when the current friend stays single.
- The number of ways when the current friend forms a pair.

The total answer is the sum of these two possibilities.

Since each state depends only on the previous two states, I don't need an entire DP array. Keeping only the last two answers is enough, which reduces the space complexity to O(1).

---

## Data Structures Used

### Integer Variables

I only use a few integer variables to store the previous two Dynamic Programming states and the current answer.

### No Arrays

An array is not necessary because every calculation depends only on the previous two values.

### No Recursion

I avoid recursion completely. This removes recursion overhead and avoids unnecessary stack usage.

---

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Read the input value `n`.
2. Handle the base cases for `n = 1` and `n = 2`.
3. Store the answers for the previous two states.
4. Iterate from `3` to `n`.
5. Compute the current answer using the Dynamic Programming recurrence.
6. Update the previous values.
7. Return the final answer.

This solution visits every value only once, making it both simple and efficient.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n)** | The algorithm iterates once from `3` to `n`. |
| Space Complexity | **O(1)** | Only a few variables are used. No extra array or recursion stack is required. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countFriendsPairings(int n) {
        // Modulo value given in the problem
        const int MOD = 1000000007;

        // Base case: only one friend
        if (n == 1) return 1;

        // Base case: two friends
        if (n == 2) return 2;

        // prev2 stores f(1)
        long long prev2 = 1;

        // prev1 stores f(2)
        long long prev1 = 2;

        // Compute answers from 3 to n
        for (int i = 3; i <= n; i++) {

            // Current answer using recurrence:
            // f(i) = f(i-1) + (i-1) * f(i-2)
            long long curr = (prev1 + ((i - 1) * prev2) % MOD) % MOD;

            // Shift values for next iteration
            prev2 = prev1;
            prev1 = curr;
        }

        // Final answer
        return prev1;
    }
};
```

### Java

```java
class Solution {
    public int countFriendsPairings(int n) {

        // Modulo value
        final int MOD = 1000000007;

        // Base case
        if (n == 1)
            return 1;

        // Base case
        if (n == 2)
            return 2;

        // Stores f(1)
        long prev2 = 1;

        // Stores f(2)
        long prev1 = 2;

        // Build answer iteratively
        for (int i = 3; i <= n; i++) {

            // Apply recurrence relation
            long curr = (prev1 + ((long)(i - 1) * prev2) % MOD) % MOD;

            // Update previous values
            prev2 = prev1;
            prev1 = curr;
        }

        // Return final answer
        return (int) prev1;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @return {number}
 */

class Solution {

    countFriendsPairings(n) {

        // Modulo value
        const MOD = 1000000007;

        // Base case
        if (n === 1) return 1;

        // Base case
        if (n === 2) return 2;

        // Stores f(1)
        let prev2 = 1;

        // Stores f(2)
        let prev1 = 2;

        // Compute answers iteratively
        for (let i = 3; i <= n; i++) {

            // Apply recurrence relation
            const curr = (prev1 + ((i - 1) * prev2) % MOD) % MOD;

            // Update previous answers
            prev2 = prev1;
            prev1 = curr;
        }

        // Final answer
        return prev1;
    }
}
```

### Python3

```python
class Solution:
    def countFriendsPairings(self, n: int) -> int:

        # Modulo value
        MOD = 1000000007

        # Base case
        if n == 1:
            return 1

        # Base case
        if n == 2:
            return 2

        # Stores f(1)
        prev2 = 1

        # Stores f(2)
        prev1 = 2

        # Compute answer from 3 to n
        for i in range(3, n + 1):

            # Apply recurrence relation
            curr = (prev1 + ((i - 1) * prev2) % MOD) % MOD

            # Update previous values
            prev2 = prev1
            prev1 = curr

        # Return final answer
        return prev1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is exactly the same in every language. Only the syntax changes.

The solution begins by checking the smallest possible values of `n`.

If there is only one friend, there is only one valid arrangement.

If there are two friends, they can either stay single or form one pair.

After handling these cases, the algorithm stores the answers for the previous two states.

Next, it starts a loop from `3` up to `n`.

During each iteration, two possibilities are considered.

The first possibility assumes the current friend remains single. In this case, the answer is simply the number of arrangements for the previous friend count.

The second possibility assumes the current friend forms a pair. The current friend can pair with any of the remaining friends, so that number is multiplied by the answer for `n - 2`.

The current answer is obtained by adding these two values together.

Once the current answer has been calculated, the previous values are updated so they can be reused in the next iteration.

This process continues until the algorithm reaches `n`.

Finally, the last computed value is returned as the answer.

The only difference between C++, Java, JavaScript, and Python is the programming syntax. The algorithm, recurrence relation, and complexity remain exactly the same.

---

## Examples

### Example 1

**Input**

```
3
```

**Output**

```
4
```

**Trace**

- All three stay single.
- Friend 1 pairs with Friend 2.
- Friend 1 pairs with Friend 3.
- Friend 2 pairs with Friend 3.

Total arrangements = **4**

---

### Example 2

**Input**

```
2
```

**Output**

```
2
```

**Trace**

- Both stay single.
- Both form one pair.

Total arrangements = **2**

---

### Example 3

**Input**

```
4
```

**Output**

```
10
```

**Trace**

Using the recurrence,

- f(2) = 2
- f(3) = 4
- f(4) = f(3) + 3 × f(2)
- f(4) = 4 + 6 = 10

Total arrangements = **10**

---

## How to Use / Run Locally

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

Run

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

Or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- This is a classic Dynamic Programming interview problem.
- The recurrence relation is based on two choices for every friend.
- An iterative DP solution is more efficient than recursion because it avoids repeated calculations.
- A full DP array is not required since each state depends only on the previous two states.
- The optimized solution uses constant extra space while maintaining linear time complexity.
- Always apply the required modulo operation if the problem statement asks for it, since the number of pairings grows very quickly.
- The same approach works across C++, Java, JavaScript, and Python with only syntax differences.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
