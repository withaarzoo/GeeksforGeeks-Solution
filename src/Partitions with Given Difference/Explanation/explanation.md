# Partitions with Given Difference

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

## Problem Summary

Given an array `arr[]` and an integer `diff`, count the number of ways to partition the array into two subsets such that the difference between their sums is exactly equal to `diff`.

A valid partition means:

* Every element must belong to exactly one subset.
* Union of both subsets should form the original array.
* Difference between subset sums should be equal to `diff`.

Example:

```text
Input: arr = [5, 2, 6, 4], diff = 3
Output: 1
```

Because only one valid partition exists:

```text
[6, 4] and [5, 2]
(6 + 4) - (5 + 2) = 3
```

---

## Constraints

```text
1 <= arr.size() <= 50
0 <= diff <= 50
0 <= arr[i] <= 6
```

---

## Intuition

I thought about splitting the array into two subsets:

* First subset sum = `S1`
* Second subset sum = `S2`

We know:

```text
S1 - S2 = diff
S1 + S2 = totalSum
```

By adding both equations:

```text
2 * S1 = totalSum + diff
```

So:

```text
S1 = (totalSum + diff) / 2
```

Now the problem becomes:

Count the number of subsets whose sum is equal to:

```text
target = (totalSum + diff) / 2
```

This becomes a classic subset sum counting problem using Dynamic Programming.

---

## Approach

1. Calculate the total sum of all elements.
2. If `(totalSum + diff)` is odd, return `0`.
3. Find:

```text
target = (totalSum + diff) / 2
```

1. Create a DP array where:

```text
dp[j] = number of ways to make sum j
```

1. Initialize:

```text
dp[0] = 1
```

Because there is exactly one way to make sum `0`.

1. Traverse each number in the array.
2. Traverse backwards from `target` to `num`.
3. Update:

```text
dp[j] += dp[j - num]
```

1. Return `dp[target]`.

---

## Data Structures Used

* Array / Vector for DP storage
* Integer variables for sum calculations

DP array stores:

```text
dp[i] = number of ways to make sum i
```

---

## Operations & Behavior Summary

| Operation          | Purpose                                     |
| ------------------ | ------------------------------------------- |
| Sum Calculation    | Find total array sum                        |
| Odd Check          | Check if valid partition is possible        |
| DP Initialization  | Store ways to form sums                     |
| Backward Traversal | Prevent reusing same element multiple times |
| Final Answer       | Return ways to form target sum              |

---

## Complexity

* Time Complexity: `O(n * target)`

  * `n` = size of array
  * `target` = `(totalSum + diff) / 2`

* Space Complexity: `O(target)`

  * Only one DP array is used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countPartitions(vector<int>& arr, int diff) {
        int totalSum = 0;
        
        for (int num : arr) {
            totalSum += num;
        }
        
        if ((totalSum + diff) % 2 != 0) {
            return 0;
        }
        
        int target = (totalSum + diff) / 2;
        
        vector<int> dp(target + 1, 0);
        dp[0] = 1;
        
        for (int num : arr) {
            for (int j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        
        return dp[target];
    }
};
```

### Java

```java
class Solution {
    public int countPartitions(int[] arr, int diff) {
        int totalSum = 0;
        
        for (int num : arr) {
            totalSum += num;
        }
        
        if ((totalSum + diff) % 2 != 0) {
            return 0;
        }
        
        int target = (totalSum + diff) / 2;
        
        int[] dp = new int[target + 1];
        dp[0] = 1;
        
        for (int num : arr) {
            for (int j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        
        return dp[target];
    }
}
```

### JavaScript

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} diff
     * @returns {number}
     */
    countPartitions(arr, diff) {
        let totalSum = 0;
        
        for (let num of arr) {
            totalSum += num;
        }
        
        if ((totalSum + diff) % 2 !== 0) {
            return 0;
        }
        
        let target = Math.floor((totalSum + diff) / 2);
        
        let dp = new Array(target + 1).fill(0);
        dp[0] = 1;
        
        for (let num of arr) {
            for (let j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        
        return dp[target];
    }
}
```

### Python3

```python
class Solution:
    def countPartitions(self, arr, diff):
        totalSum = sum(arr)
        
        if (totalSum + diff) % 2 != 0:
            return 0
        
        target = (totalSum + diff) // 2
        
        dp = [0] * (target + 1)
        dp[0] = 1
        
        for num in arr:
            for j in range(target, num - 1, -1):
                dp[j] += dp[j - num]
        
        return dp[target]
```

---

## Step-by-step Detailed Explanation

### C++

```cpp
int totalSum = 0;
```

This variable stores the total sum of all array elements.

```cpp
for (int num : arr) {
    totalSum += num;
}
```

I calculate the total sum of the array.

```cpp
if ((totalSum + diff) % 2 != 0) {
    return 0;
}
```

If `totalSum + diff` is odd, then partition is impossible.

```cpp
int target = (totalSum + diff) / 2;
```

This is the subset sum that I need to count.

```cpp
vector<int> dp(target + 1, 0);
```

I create a DP array to store the number of ways to make each sum.

```cpp
dp[0] = 1;
```

There is one way to make sum `0`.

```cpp
for (int num : arr)
```

I process every element one by one.

```cpp
for (int j = target; j >= num; j--)
```

I move backwards so one element is used only once.

```cpp
dp[j] += dp[j - num];
```

Every way to make `j - num` can become a way to make `j` by adding current number.

---

### Java

The logic is exactly the same as C++.

* Calculate total sum
* Check odd condition
* Find target
* Use DP array
* Traverse backwards
* Return `dp[target]`

---

### JavaScript

The JavaScript solution also follows the same subset sum DP logic.

Important point:

```javascript
let dp = new Array(target + 1).fill(0);
```

This creates the DP array.

```javascript
dp[j] += dp[j - num];
```

This updates the number of ways to form sum `j`.

---

### Python3

Python solution is shorter but logic is same.

```python
dp = [0] * (target + 1)
```

Creates DP array.

```python
dp[0] = 1
```

One way to form sum `0`.

```python
for j in range(target, num - 1, -1):
```

Backward traversal ensures same element is not reused.

---

## Examples

### Example 1

```text
Input: arr = [5, 2, 6, 4], diff = 3
Output: 1
```

Explanation:

```text
Target = (17 + 3) / 2 = 10
```

Only one subset gives sum `10`:

```text
[6, 4]
```

---

### Example 2

```text
Input: arr = [1, 1, 1, 1], diff = 0
Output: 6
```

Explanation:

There are 6 ways to select two `1`s out of four `1`s.

---

### Example 3

```text
Input: arr = [3, 2, 7, 1], diff = 4
Output: 0
```

Explanation:

No valid partition exists.

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

* I used 1D DP instead of 2D DP to reduce space.
* Backward traversal is important to avoid using same element multiple times.
* If `(totalSum + diff)` is odd, answer is immediately `0`.
* This is an optimized subset sum counting problem.
* Space complexity is reduced from `O(n * target)` to `O(target)`.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
