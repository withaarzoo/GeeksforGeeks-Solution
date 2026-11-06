# Balanced Binary Tree Counter - GeeksforGeeks Solution

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

You are given a height `h`. Your task is to find the total number of distinct balanced binary trees that have height exactly equal to `h`.

A binary tree is called balanced when the height difference between the left and right subtree of every node is at most 1. A single node has height 1. An empty tree has height 0.

Because the answer can grow very large, you must return the result modulo `10^9 + 7`.

This is a classic dynamic programming problem on counting balanced binary trees of a given height. It appears frequently in competitive programming platforms under names like Balanced Binary Tree Counter or Count Balanced Binary Trees of Height H.

## Constraints

- `1 ≤ h ≤ 10^6`
- The answer must be returned modulo `10^9 + 7`
- Expected Time Complexity: O(h)
- Expected Auxiliary Space: O(1)

## Intuition

When I first looked at the problem, I checked the small cases.

For height 1 there is only one possibility: a single node.  
For height 2 the sample shows three trees — both children present, only left child, and only right child. That told me empty subtrees are allowed.

I realized that any balanced tree of exact height `h` must have at least one subtree of height `h-1`. The only valid height pairs for the left and right subtrees are:

- both of height `h-1`
- one of height `h-1` and the other of height `h-2`

This observation directly gives a recurrence that can be computed from smaller heights upward.

## Approach

I defined `dp[i]` as the number of balanced binary trees of exact height `i`.

Base cases:
- `dp[0] = 1` (one empty tree)
- `dp[1] = 1` (one single-node tree)

For every height from 2 to `h` the recurrence is:

```
dp[i] = (dp[i-1] * dp[i-1] + 2 * dp[i-1] * dp[i-2]) % MOD
```

The first term counts trees where both subtrees have height `i-1`.  
The second term counts the two symmetric cases where the heights are `i-1` and `i-2`.

Because only the previous two values are needed, I keep just two variables and update them in a loop. This keeps the space usage constant even when `h` reaches one million.

## Data Structures Used

No extra data structures are required beyond a few integer variables.

I only store the answers for the two most recent heights. An array of size `h` would also work but would use O(h) space, which is unnecessary and does not meet the expected space bound.

## Operations & Behavior Summary

1. Handle the trivial case when `h = 1` and return 1 immediately.
2. Initialize two variables that represent the count for height 0 and height 1.
3. Loop from height 2 up to the given height `h`.
4. At each step compute the new count using the recurrence and take modulo `10^9 + 7`.
5. Shift the two variables forward so they always hold the latest two answers.
6. After the loop finishes, the variable that holds the count for height `h` is the final answer.

## Complexity

| Complexity Type     | Value | Explanation |
|---------------------|-------|-------------|
| Time Complexity     | O(h)  | A single loop runs from 2 to h. Each iteration performs a constant amount of arithmetic. |
| Space Complexity    | O(1)  | Only a constant number of integer variables are used. No arrays or recursion stack is required. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int countBT(int h) {
        const int MOD = 1e9 + 7;
        if (h == 1) return 1;
        long long prev2 = 1, prev1 = 1;
        for (int i = 2; i <= h; i++) {
            long long curr = (prev1 * prev1 % MOD + 2 * prev1 * prev2 % MOD) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        return (int)prev1;
    }
};
```

### Java
```java
class Solution {
    public int countBT(int h) {
        final int MOD = 1000000007;
        if (h == 1) return 1;
        long prev2 = 1, prev1 = 1;
        for (int i = 2; i <= h; i++) {
            long curr = (prev1 * prev1 % MOD + 2 * prev1 * prev2 % MOD) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        return (int)prev1;
    }
}

```

### JavaScript
```javascript
/**
 * @param {number} h
 * @returns {number}
 */
class Solution {
    countBT(h) {
        const MOD = 1000000007n;
        if (h === 1) return 1;
        let prev2 = 1n, prev1 = 1n;
        for (let i = 2; i <= h; i++) {
            let curr = (prev1 * prev1 % MOD + 2n * prev1 * prev2 % MOD) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        return Number(prev1);
    }
}

```

### Python3
```python
class Solution:
    def countBT(self, h: int) -> int:
        MOD = 10**9 + 7
        if h == 1:
            return 1
        prev2, prev1 = 1, 1
        for i in range(2, h + 1):
            curr = (prev1 * prev1 + 2 * prev1 * prev2) % MOD
            prev2 = prev1
            prev1 = curr
        return prev1
        
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic. The only differences are syntax and the way large integers or modulo operations are handled.

I first check whether the input height is 1. If it is, I return 1 right away because there is only one possible tree.

I then create two variables that will always store the number of trees for the two previous heights. Both start at 1.

Inside the loop I calculate the next value using the formula:

```
curr = (prev1 * prev1 + 2 * prev1 * prev2) % MOD
```

The multiplications are performed carefully so that intermediate results stay within the range of the integer type used (long long in C++ and Java, BigInt in JavaScript, normal integers in Python which handle big numbers automatically).

After computing the new value I shift the variables:
- the old `prev1` becomes the new `prev2`
- the newly computed value becomes the new `prev1`

When the loop ends, `prev1` contains the answer for the required height. I return it after converting back to a normal integer where necessary.

This approach works for the full constraint range of `h ≤ 10^6` because both time and space stay linear and constant respectively.

## Examples

**Example 1**  
Input: `h = 1`  
Output: `1`  
Explanation: Only a single node exists. The algorithm returns immediately from the base-case check.

**Example 2**  
Input: `h = 2`  
Output: `3`  
Explanation:  
- Start with prev2 = 1, prev1 = 1  
- For i = 2: curr = (1*1 + 2*1*1) % MOD = 3  
- Answer becomes 3, which matches the three trees shown in the problem statement.

**Example 3**  
Input: `h = 3`  
Output: `15`  
Explanation:  
- After height 2 we have prev2 = 1, prev1 = 3  
- For i = 3: curr = (3*3 + 2*3*1) % MOD = 15  
- The result is 15, matching the sample.

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Open a terminal and run:  
   `g++ -std=c++17 main.cpp -o main`  
3. Execute: `./main`  
4. Enter the value of `h` when prompted (or hard-code a test case inside the main function).

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
4. Provide the height as input or add a main method for testing.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node.js: `node solution.js`  
3. You can add a simple console.log call with a test value of `h` to see the output.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run: `python3 solution.py`  
3. Call the method with a test height or read input from the console.

In every language you can wrap the class method inside a small main/driver section to test multiple values of `h` quickly.

## Notes & Optimizations

- The solution already meets the strictest expected complexity of O(h) time and O(1) space.  
- Using an array of size `h+1` is a valid alternative but wastes memory when `h` is large.  
- Modular arithmetic must be applied after every multiplication to avoid overflow in C++, Java, and JavaScript.  
- For height 1 the early return is both correct and slightly faster.  
- The same recurrence can be used to count balanced trees of height at most `h` by simply summing the `dp` values, but that is a different problem.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
