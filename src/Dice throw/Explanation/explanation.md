# Dice Throw

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given **n dice** where each dice has **m faces numbered from 1 to m**, the task is to find the **number of ways to obtain a total sum equal to x** after throwing all dice.

Each dice contributes a value between **1 and m**.

We must count **all possible combinations of dice outcomes** that produce the required sum.

Example:

Input

m = 6
n = 3
x = 12

Output

25

Explanation

There are 25 possible ways to obtain sum 12 using three dice.

---

## Constraints

1 <= m, n, x <= 50

---

## Intuition

When I first looked at this problem, I noticed that every dice can contribute a value between **1 and m**. If I tried to generate all possible combinations using brute force, the total possibilities would be **m^n**, which becomes very large quickly.

So instead of generating all combinations, I thought about building the solution step by step.

If I already know how many ways exist to obtain a certain sum using **i-1 dice**, then I can calculate the ways to obtain a new sum using **i dice**.

For example, if the current dice contributes value **k**, then the remaining sum must come from the previous dice.

This observation naturally leads to a **Dynamic Programming** solution.

---

## Approach

I solve the problem using **Dynamic Programming**.

I define:

`dp[i][j]` = number of ways to obtain sum **j** using **i dice**.

Steps:

1. Initialize the base case

There is exactly one way to obtain sum 0 using 0 dice.

`dp[0][0] = 1`

1. Iterate over each dice.

2. For each dice, calculate the number of ways for all sums from **1 to x**.

3. For every possible face value **1 to m**, add the ways from the previous state.

Transition formula:

`dp[i][j] += dp[i-1][j-k]`

where **k** is the face value.

1. The final answer will be

`dp[n][x]`

To optimize memory usage, we can use a **1D DP array** since each state depends only on the previous dice.

---

## Data Structures Used

Dynamic Programming Array

We maintain a DP array that stores the number of ways to reach each sum.

Type:

Array / Vector / List

Size:

`x + 1`

---

## Operations & Behavior Summary

Key operations involved in the algorithm:

1. Iterating through the number of dice
2. Iterating through possible sums
3. Trying all possible face values
4. Updating the DP table

The DP table gradually builds the total number of ways to reach each sum.

---

## Complexity

Time Complexity

O(n *m* x)

Where

n = number of dice

m = number of faces

x = target sum

For every dice we iterate through all sums and all face values.

Space Complexity

O(x)

We only store a 1D DP array of size **x + 1**.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int noOfWays(int m, int n, int x) {
        vector<long long> dp(x + 1, 0);
        dp[0] = 1;

        for(int dice = 1; dice <= n; dice++){
            vector<long long> temp(x + 1, 0);

            for(int sum = 1; sum <= x; sum++){
                for(int face = 1; face <= m; face++){
                    if(sum - face >= 0){
                        temp[sum] += dp[sum - face];
                    }
                }
            }

            dp = temp;
        }

        return dp[x];
    }
};
```

### Java

```java
class Solution {
    static int noOfWays(int m, int n, int x) {

        long[] dp = new long[x + 1];
        dp[0] = 1;

        for(int dice = 1; dice <= n; dice++){

            long[] temp = new long[x + 1];

            for(int sum = 1; sum <= x; sum++){
                for(int face = 1; face <= m; face++){
                    if(sum - face >= 0){
                        temp[sum] += dp[sum - face];
                    }
                }
            }

            dp = temp;
        }

        return (int)dp[x];
    }
}
```

### JavaScript

```javascript
class Solution {
    noOfWays(m, n, x) {

        let dp = new Array(x + 1).fill(0);
        dp[0] = 1;

        for(let dice = 1; dice <= n; dice++){

            let temp = new Array(x + 1).fill(0);

            for(let sum = 1; sum <= x; sum++){
                for(let face = 1; face <= m; face++){
                    if(sum - face >= 0){
                        temp[sum] += dp[sum - face];
                    }
                }
            }

            dp = temp;
        }

        return dp[x];
    }
}
```

### Python3

```python
class Solution:
    def noOfWays(self, m, n, x):

        dp = [0] * (x + 1)
        dp[0] = 1

        for dice in range(1, n + 1):

            temp = [0] * (x + 1)

            for s in range(1, x + 1):
                for face in range(1, m + 1):
                    if s - face >= 0:
                        temp[s] += dp[s - face]

            dp = temp

        return dp[x]
```

---

## Step-by-step Detailed Explanation

Step 1

We create a DP array where each index represents the number of ways to achieve that sum.

Example

`dp[5]` means number of ways to get sum **5**.

Step 2

Initialize

`dp[0] = 1`

This means there is exactly one way to get sum 0 with zero dice.

Step 3

For each dice we create a temporary array to store updated results.

Step 4

For every possible sum from **1 to x**, we try all face values.

Step 5

If the dice shows value **face**, then the remaining sum must be

`sum - face`

So we add

`dp[sum - face]`

Step 6

After processing one dice, we replace the old DP array with the new one.

Step 7

After all dice are processed, the answer will be stored in

`dp[x]`

---

## Examples

Example 1

Input

m = 6
n = 3
x = 12

Output

25

Example 2

Input

m = 2
n = 3
x = 6

Output

1

Explanation

The only way to obtain sum 6 is

2 + 2 + 2

---

## How to use / Run locally

C++

Compile

`g++ main.cpp`

Run

`./a.out`

Java

Compile

`javac Main.java`

Run

`java Main`

Python

Run

`python solution.py`

JavaScript

Run

`node solution.js`

---

## Notes & Optimizations

1. Brute force solution would take **O(m^n)** time.

2. Dynamic Programming reduces this to **O(n * m * x)**.

3. Memory optimization reduces space from **O(n*x)** to **O(x)**.

4. This problem is a classic example of **DP on combinations / dice problems**.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
