# Buy Stock with Transaction Fee

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

You are given an array `arr[]`, where `arr[i]` represents the stock price on the `i-th` day, and an integer `k` representing the transaction fee.

You can buy and sell the stock multiple times, but:

* You can only hold one stock at a time.
* You must sell the current stock before buying again.
* Every time you sell a stock, you must pay the transaction fee `k`.

The task is to find the maximum profit possible.

## Constraints

```text
1 <= arr.size() <= 10^6
1 <= arr[i] <= 10^6
0 <= k <= 10^6
```

## Intuition

I thought about this problem using two states.

1. I am currently holding a stock.
2. I am currently not holding a stock.

For every day, I update these two states:

* `hold` = maximum profit possible if I currently have a stock.
* `cash` = maximum profit possible if I currently do not have a stock.

If I buy a stock, my profit decreases.

If I sell a stock, my profit increases, but I also need to pay the transaction fee.

This makes the problem easy to solve in a single pass.

## Approach

1. Initialize:

   * `hold = -arr[0]`
   * `cash = 0`

2. Traverse the array from day 2 to the last day.

3. For every price:

   * Either continue holding the stock.
   * Or buy the stock today.

```text
hold = max(hold, previous_cash - arr[i])
```

1. Then:

   * Either continue without any stock.
   * Or sell the stock today and pay the fee.

```text
cash = max(cash, hold + arr[i] - k)
```

1. Return `cash` because the final answer should be the profit when I am not holding any stock.

## Data Structures Used

* Integer variables:

  * `hold`
  * `cash`
  * `prevCash`

No extra arrays or DP tables are used.

## Operations & Behavior Summary

| Variable   | Meaning                                         |
| ---------- | ----------------------------------------------- |
| `hold`     | Best profit when I currently own a stock        |
| `cash`     | Best profit when I currently do not own a stock |
| `prevCash` | Stores old `cash` value before updating         |

For every day:

* Update `hold`
* Update `cash`
* Continue until all days are processed

## Complexity

* Time Complexity: `O(n)`

  * I traverse the array only once.

* Space Complexity: `O(1)`

  * I only use a few variables.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxProfit(vector<int>& arr, int k) {
        int n = arr.size();
        
        int hold = -arr[0];
        int cash = 0;
        
        for (int i = 1; i < n; i++) {
            int prevCash = cash;
            
            hold = max(hold, prevCash - arr[i]);
            cash = max(cash, hold + arr[i] - k);
        }
        
        return cash;
    }
};
```

### Java

```java
class Solution {
    public int maxProfit(int arr[], int k) {
        int n = arr.length;
        
        int hold = -arr[0];
        int cash = 0;
        
        for (int i = 1; i < n; i++) {
            int prevCash = cash;
            
            hold = Math.max(hold, prevCash - arr[i]);
            cash = Math.max(cash, hold + arr[i] - k);
        }
        
        return cash;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxProfit(arr, k) {
        let hold = -arr[0];
        let cash = 0;
        
        for (let i = 1; i < arr.length; i++) {
            let prevCash = cash;
            
            hold = Math.max(hold, prevCash - arr[i]);
            cash = Math.max(cash, hold + arr[i] - k);
        }
        
        return cash;
    }
}
```

### Python3

```python
class Solution:
    def maxProfit(self, arr, k):
        hold = -arr[0]
        cash = 0
        
        for i in range(1, len(arr)):
            prev_cash = cash
            
            hold = max(hold, prev_cash - arr[i])
            cash = max(cash, hold + arr[i] - k)
        
        return cash
```

## Step-by-step Detailed Explanation

### C++

```cpp
int hold = -arr[0];
int cash = 0;
```

* `hold` means I bought the stock on day 1.
* `cash` means I currently have no profit.

```cpp
int prevCash = cash;
```

* I store old cash because `hold` depends on the previous value.

```cpp
hold = max(hold, prevCash - arr[i]);
```

* Either keep holding the old stock.
* Or buy a new stock today.

```cpp
cash = max(cash, hold + arr[i] - k);
```

* Either keep previous profit.
* Or sell the stock today and pay the fee.

### Java

```java
int hold = -arr[0];
int cash = 0;
```

* `hold` stores profit while owning stock.
* `cash` stores profit while not owning stock.

```java
int prevCash = cash;
```

* Save old cash before updating.

```java
hold = Math.max(hold, prevCash - arr[i]);
```

* Buy today or continue holding.

```java
cash = Math.max(cash, hold + arr[i] - k);
```

* Sell today or continue without stock.

### JavaScript

```javascript
let hold = -arr[0];
let cash = 0;
```

* Initially I assume I buy the stock on day 1.

```javascript
let prevCash = cash;
```

* Store old profit value.

```javascript
hold = Math.max(hold, prevCash - arr[i]);
```

* Decide whether to buy or keep holding.

```javascript
cash = Math.max(cash, hold + arr[i] - k);
```

* Decide whether to sell or not.

### Python3

```python
hold = -arr[0]
cash = 0
```

* `hold` means profit while owning stock.
* `cash` means profit while not owning stock.

```python
prev_cash = cash
```

* Store previous cash before changing it.

```python
hold = max(hold, prev_cash - arr[i])
```

* Either buy now or continue holding.

```python
cash = max(cash, hold + arr[i] - k)
```

* Either sell now or continue without stock.

## Examples

### Example 1

```text
Input:
arr[] = [6, 1, 7, 2, 8, 4]
k = 2

Output:
8
```

Explanation:

```text
Buy at 1, Sell at 7
Profit = 7 - 1 - 2 = 4

Buy at 2, Sell at 8
Profit = 8 - 2 - 2 = 4

Total Profit = 8
```

### Example 2

```text
Input:
arr[] = [7, 1, 5, 3, 6, 4]
k = 1

Output:
5
```

Explanation:

```text
Buy at 1, Sell at 5
Profit = 5 - 1 - 1 = 3

Buy at 3, Sell at 6
Profit = 6 - 3 - 1 = 2

Total Profit = 5
```

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

## Notes & Optimizations

* I do not use a DP array because only the previous state matters.
* This reduces the space complexity from `O(n)` to `O(1)`.
* The solution is efficient enough for very large input sizes.
* The algorithm works in a single pass.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
