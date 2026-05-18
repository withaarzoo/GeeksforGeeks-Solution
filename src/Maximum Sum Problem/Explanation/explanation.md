# Maximum Sum Problem

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

---

## Problem Summary

The **Maximum Sum Problem** is a popular recursion and dynamic programming problem from GeeksforGeeks.

In this problem, we are given a number `n`. We can either:

* Keep the number as it is
* Or break it into three parts:

  * `n/2`
  * `n/3`
  * `n/4`

After breaking the number, we can again recursively break those smaller numbers in the same way.

The goal is to find the maximum possible sum we can obtain.

This problem is a great example of:

* Recursion
* Memoization
* Dynamic Programming
* Optimal Substructure
* Overlapping Subproblems

It is commonly asked in coding interviews and competitive programming contests because it tests recursive thinking and optimization skills.

---

## Constraints

| Constraint               | Value       |
| ------------------------ | ----------- |
| `0 ≤ n ≤ 10^6`           | Input range |
| Expected Time Complexity | `O(n)`      |
| Expected Auxiliary Space | `O(n)`      |

---

## Intuition

When I first looked at this DSA problem, I noticed something important.

For every number `n`, I always have two choices:

1. Keep the number as it is
2. Break it recursively into:

   * `n/2`
   * `n/3`
   * `n/4`

Then I simply compare both results.

For smaller numbers, breaking usually gives a smaller value.

But for larger numbers, recursive breaking can produce a bigger sum.

That immediately points toward a recursive dynamic programming solution.

The next thing I realized was that many recursive calls repeat again and again. So using memoization becomes very important to avoid unnecessary calculations.

---

## Approach

I solved this problem using recursion with memoization.

Step-by-step strategy:

1. Create a recursive function to calculate the maximum sum for a number.
2. For every number:

   * Calculate the recursive value of:

     * `n/2`
     * `n/3`
     * `n/4`
3. Add all three recursive results.
4. Compare:

   * original number `n`
   * recursive broken sum
5. Return the larger value.
6. Store already calculated answers inside a hashmap or dictionary.
7. Reuse stored results whenever the same number appears again.

This makes the solution fast and efficient.

---

## Data Structures Used

| Data Structure       | Why It Is Used                                  |
| -------------------- | ----------------------------------------------- |
| HashMap / Dictionary | Stores already computed results for memoization |
| Recursion Stack      | Handles recursive function calls automatically  |

Memoization is the key optimization here because the same states appear many times during recursion.

---

## Operations & Behavior Summary

The algorithm works like this:

1. Start with number `n`
2. Check if breaking the number gives a better value
3. Recursively solve:

   * `n/2`
   * `n/3`
   * `n/4`
4. Add those values
5. Compare the recursive sum with the original number
6. Save the answer for future reuse
7. Return the maximum possible sum

This process continues until the recursion reaches very small numbers like `0` or `1`.

---

## Complexity

| Type             | Complexity | Explanation                                                |
| ---------------- | ---------- | ---------------------------------------------------------- |
| Time Complexity  | `O(n)`     | Each number is calculated only once because of memoization |
| Space Complexity | `O(n)`     | Extra memory is used for recursion stack and memo storage  |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // HashMap to store already computed answers
    unordered_map<int, int> dp;

    int solve(int n) {
        
        // Base case:
        // For 0 or 1, breaking is useless
        if (n <= 1)
            return n;

        // If already calculated, return stored answer
        if (dp.count(n))
            return dp[n];

        // Recursively calculate the broken sum
        int broken =
            solve(n / 2) +
            solve(n / 3) +
            solve(n / 4);

        // Store the maximum between:
        // original number OR broken recursive sum
        return dp[n] = max(n, broken);
    }

    int maxSum(int n) {
        
        // Start recursive calculation
        return solve(n);
    }
};
```

### Java

```java
import java.util.HashMap;

class Solution {
    
    // HashMap for memoization
    HashMap<Integer, Integer> dp = new HashMap<>();

    int solve(int n) {

        // Base case
        if (n <= 1)
            return n;

        // Return stored answer if already computed
        if (dp.containsKey(n))
            return dp.get(n);

        // Recursively calculate all three parts
        int broken =
            solve(n / 2) +
            solve(n / 3) +
            solve(n / 4);

        // Take maximum between original number
        // and recursive broken sum
        int ans = Math.max(n, broken);

        // Store answer for future reuse
        dp.put(n, ans);

        return ans;
    }

    public int maxSum(int n) {
        
        // Start recursion
        return solve(n);
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

    constructor() {
        
        // Map for memoization
        this.dp = new Map();
    }

    solve(n) {

        // Base case
        if (n <= 1)
            return n;

        // Return stored answer if available
        if (this.dp.has(n))
            return this.dp.get(n);

        // Recursive calculation
        let broken =
            this.solve(Math.floor(n / 2)) +
            this.solve(Math.floor(n / 3)) +
            this.solve(Math.floor(n / 4));

        // Choose maximum value
        let ans = Math.max(n, broken);

        // Store answer
        this.dp.set(n, ans);

        return ans;
    }

    maxSum(n) {
        
        // Start recursive process
        return this.solve(n);
    }
}
```

### Python3

```python
class Solution:
    
    def __init__(self):
        
        # Dictionary for memoization
        self.dp = {}

    def solve(self, n):

        # Base case
        if n <= 1:
            return n

        # Return stored answer if already calculated
        if n in self.dp:
            return self.dp[n]

        # Recursive calculation of three parts
        broken = (
            self.solve(n // 2) +
            self.solve(n // 3) +
            self.solve(n // 4)
        )

        # Store maximum value
        self.dp[n] = max(n, broken)

        return self.dp[n]

    def maxSum(self, n):
        
        # Start recursion
        return self.solve(n)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains almost identical in all four programming languages.

The only small differences come from:

* Syntax
* HashMap implementation
* Integer division handling

### Base Case

The recursion stops for very small numbers like `0` and `1`.

Why?

Because breaking those numbers produces a smaller result.

Example:

* `1/2 = 0`
* `1/3 = 0`
* `1/4 = 0`

So keeping `1` itself is better.

Without this base case, recursion would continue forever.

---

### Recursive Breakdown

For every number `n`, the algorithm recursively calculates:

* `solve(n/2)`
* `solve(n/3)`
* `solve(n/4)`

This is the core idea behind the recursive DP solution.

The algorithm does not directly use:

```text
n/2 + n/3 + n/4
```

Instead, it recursively checks whether those smaller numbers can also be broken further for a better result.

That is what makes the solution optimal.

---

### Comparing Two Choices

At every step, the algorithm compares:

* Original number `n`
* Recursive broken sum

Then it returns the larger one.

Example:

For `n = 12`

Breaking gives:

```text
6 + 4 + 3 = 13
```

Since `13 > 12`, the answer becomes `13`.

---

### Why Memoization Matters

Without memoization, the recursion tree becomes extremely large.

The same numbers would get solved repeatedly.

Example:

While solving `24`, the algorithm may calculate `solve(12)` multiple times.

Memoization fixes this problem.

Once a result is calculated, it gets stored inside a hashmap or dictionary.

Next time the same value appears, the stored answer is returned instantly.

This reduces the time complexity significantly.

---

### Language-specific Notes

#### C++

* Usually uses `unordered_map`
* Integer division happens automatically
* Fast execution speed

#### Java

* Uses `HashMap<Integer, Integer>`
* Clean object-oriented structure
* Good for interview preparation

#### JavaScript

* Uses `Map`
* Requires `Math.floor()` for integer division
* Common in frontend interview coding rounds

#### Python3

* Uses dictionary for memoization
* Very short and readable syntax
* Easy to understand for beginners

---

## Examples

### Example 1

#### Input

```text
12
```

#### Output

```text
13
```

#### Explanation

Breaking `12` gives:

```text
12/2 = 6
12/3 = 4
12/4 = 3
```

Sum becomes:

```text
6 + 4 + 3 = 13
```

Since `13 > 12`, answer is `13`.

---

### Example 2

#### Input

```text
24
```

#### Output

```text
27
```

#### Explanation

Breaking `24` gives:

```text
12 + 8 + 6 = 26
```

But `12` itself can be broken further into `13`.

So total becomes:

```text
13 + 8 + 6 = 27
```

---

### Example 3

#### Input

```text
2
```

#### Output

```text
2
```

#### Explanation

Breaking `2` gives:

```text
1 + 0 + 0 = 1
```

Since `2` is larger, we keep the original number.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ main.cpp -o main
```

Run:

```bash
./main
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run:

```bash
node main.js
```

---

### Python3

Run:

```bash
python main.py
```

or

```bash
python3 main.py
```

---

## Notes & Optimizations

* Memoization is the most important optimization in this problem.
* A plain recursive solution without memoization will be very slow.
* The problem is a classic example of Dynamic Programming on Recursion.
* Integer division must be handled carefully in JavaScript using `Math.floor()`.
* The recursive depth stays manageable because values keep shrinking quickly.
* This problem is frequently used to teach:

  * recursion
  * memoization
  * top-down DP
  * optimization techniques

Possible alternative approaches:

* Bottom-up Dynamic Programming
* Iterative DP table construction

But recursion with memoization is usually the cleanest and easiest to understand.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
