# Target Sum

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

Given an integer array `arr[]` and an integer `target`, I need to place either `'+'` or `'-'` before every number.

After placing signs before all numbers, I evaluate the final expression.

My task is to return the total number of different expressions that evaluate to the given `target`.

An expression is considered different if the placement of `'+'` and `'-'` changes.

---

## Constraints

```text
1 ≤ arr.size() ≤ 50
1 ≤ arr[i] ≤ 20
0 ≤ sum(arr) ≤ 1000
-1000 ≤ target ≤ 1000
```

---

## Intuition

At first, I thought about generating all possible combinations of `'+'` and `'-'`.

Since every element has 2 choices, total combinations become `2^n`, which is too slow.

Then I observed an important mathematical relation.

Suppose:

* Sum of numbers with `'+'` sign = `P`
* Sum of numbers with `'-'` sign = `N`

Then:

```text
P - N = target
P + N = totalSum
```

Adding both equations:

```text
2 * P = totalSum + target
P = (totalSum + target) / 2
```

Now the problem becomes:

Find the number of subsets whose sum is equal to:

```text
(totalSum + target) / 2
```

This becomes a subset sum counting DP problem.

---

## Approach

1. Find the total sum of all elements.
2. If `abs(target) > totalSum`, return `0`.
3. If `(totalSum + target)` is odd, return `0`.
4. Calculate:

```text
required = (totalSum + target) / 2
```

1. Create a DP array where:

```text
dp[i] = number of ways to make sum i
```

1. Initialize:

```text
dp[0] = 1
```

1. For every number in the array:

   * Traverse backwards from `required` to `num`
   * Update:

```text
dp[sum] += dp[sum - num]
```

1. Return `dp[required]`.

---

## Data Structures Used

* Array / Vector for DP storage
* Integer variables for storing sums and target values

---

## Operations & Behavior Summary

| Operation              | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| Calculate total sum    | Needed for subset conversion               |
| Check impossible cases | Avoid unnecessary computation              |
| DP array               | Stores number of ways to make each sum     |
| Backward traversal     | Prevents using same element multiple times |
| Final answer           | Stored in `dp[required]`                   |

---

## Complexity

* **Time Complexity:** `O(n × required)`

  * `n` = number of elements
  * `required` = `(totalSum + target) / 2`

* **Space Complexity:** `O(required)`

  * Only one DP array is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int totalWays(vector<int>& arr, int target) {
        int totalSum = 0;

        for (int num : arr) {
            totalSum += num;
        }

        if (abs(target) > totalSum) {
            return 0;
        }

        if ((totalSum + target) % 2 != 0) {
            return 0;
        }

        int required = (totalSum + target) / 2;

        vector<int> dp(required + 1, 0);
        dp[0] = 1;

        for (int num : arr) {
            for (int sum = required; sum >= num; sum--) {
                dp[sum] += dp[sum - num];
            }
        }

        return dp[required];
    }
};
```

### Java

```java
class Solution {
    public int totalWays(int[] arr, int target) {
        int totalSum = 0;

        for (int num : arr) {
            totalSum += num;
        }

        if (Math.abs(target) > totalSum) {
            return 0;
        }

        if ((totalSum + target) % 2 != 0) {
            return 0;
        }

        int required = (totalSum + target) / 2;

        int[] dp = new int[required + 1];
        dp[0] = 1;

        for (int num : arr) {
            for (int sum = required; sum >= num; sum--) {
                dp[sum] += dp[sum - num];
            }
        }

        return dp[required];
    }
}
```

### JavaScript

```javascript
class Solution {
    totalWays(arr, target) {
        let totalSum = 0;

        for (let num of arr) {
            totalSum += num;
        }

        if (Math.abs(target) > totalSum) {
            return 0;
        }

        if ((totalSum + target) % 2 !== 0) {
            return 0;
        }

        let required = Math.floor((totalSum + target) / 2);

        let dp = new Array(required + 1).fill(0);
        dp[0] = 1;

        for (let num of arr) {
            for (let sum = required; sum >= num; sum--) {
                dp[sum] += dp[sum - num];
            }
        }

        return dp[required];
    }
}
```

### Python3

```python
class Solution:
    def totalWays(self, arr, target):
        totalSum = sum(arr)

        if abs(target) > totalSum:
            return 0

        if (totalSum + target) % 2 != 0:
            return 0

        required = (totalSum + target) // 2

        dp = [0] * (required + 1)
        dp[0] = 1

        for num in arr:
            for s in range(required, num - 1, -1):
                dp[s] += dp[s - num]

        return dp[required]
```

---

## Step-by-step Detailed Explanation

### C++

```cpp
vector<int> dp(required + 1, 0);
dp[0] = 1;
```

`dp[i]` stores the number of ways to make sum `i`.

`dp[0] = 1` means there is one way to make sum `0`, by choosing nothing.

```cpp
for (int num : arr)
```

I process each number one by one.

```cpp
for (int sum = required; sum >= num; sum--)
```

I move backwards so that each number is used only once.

```cpp
dp[sum] += dp[sum - num];
```

If I already know how to make `sum - num`, then I can make `sum` by adding `num`.

### Java

The Java logic is exactly the same as C++.

* `dp[i]` stores number of ways to make sum `i`
* `dp[0] = 1`
* Traverse backwards to avoid reusing the same number multiple times
* Final answer is `dp[required]`

### JavaScript

In JavaScript:

* I use an array `dp`
* `dp[sum]` stores number of possible subsets
* I update from right to left
* Final answer comes from `dp[required]`

### Python3

In Python:

* I use a list called `dp`
* `dp[i]` stores ways to form sum `i`
* Reverse traversal ensures one-time usage of every element
* Final answer is `dp[required]`

---

## Examples

### Example 1

```text
Input:
arr = [1, 1, 1, 1, 1]
target = 3

Output:
5
```

Explanation:

```text
-1 +1 +1 +1 +1 = 3
+1 -1 +1 +1 +1 = 3
+1 +1 -1 +1 +1 = 3
+1 +1 +1 -1 +1 = 3
+1 +1 +1 +1 -1 = 3
```

### Example 2

```text
Input:
arr = [1, 2, 3]
target = 2

Output:
1
```

Explanation:

```text
+1 -2 +3 = 2
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
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

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* Brute force takes `O(2^n)` time.
* DP reduces it significantly.
* Backward traversal is very important.
* Using 1D DP saves memory.
* If `(totalSum + target)` is odd, answer is always `0`.
* If target is larger than total sum, answer is always `0`.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
