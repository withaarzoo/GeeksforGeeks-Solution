# Stock Buy and Sell – Max One Transaction Allowed

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an array `prices[]` where each element represents the stock price on a specific day.

My task is to find the **maximum profit** I can make by doing **at most one transaction**.

One transaction means:

* Buy once
* Sell once
* Buy must happen **before** sell

If it is not possible to make any profit, I should return **0**.

---

## Constraints

* 1 ≤ prices.length ≤ 10⁵
* 0 ≤ prices[i] ≤ 10⁴

---

## Intuition

When I first saw the problem, I understood that I am allowed to buy and sell **only once**.

So I asked myself:

* On which day should I buy?
* On which future day should I sell to get the **maximum profit**?

I realized I don’t need to try all possible pairs of days.
That would be slow and unnecessary.

Instead, I can:

* Track the **minimum price so far**
* At each day, try selling and calculate profit
* Keep updating the **maximum profit**

---

## Approach

I solved the problem step by step like this:

1. I store the first day’s price as `minPrice`
2. I keep a variable `maxProfit` and initialize it with 0
3. I iterate through the array from day 1
4. For each day:

   * If today’s price is smaller than `minPrice`, I update `minPrice`
   * Otherwise, I calculate today’s profit and update `maxProfit`
5. Finally, I return `maxProfit`

---

## Data Structures Used

* No extra data structures
* Only simple variables

---

## Operations & Behavior Summary

* Single pass through the array
* Always buy at the lowest price seen so far
* Always sell after buying
* Profit never becomes negative

---

## Complexity

**Time Complexity:** O(n)
I traverse the price array only once, where `n` is the number of days.

**Space Complexity:** O(1)
I use only constant extra space.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxProfit(vector<int> &prices) {
        int minPrice = prices[0];
        int maxProfit = 0;

        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else {
                maxProfit = max(maxProfit, prices[i] - minPrice);
            }
        }

        return maxProfit;
    }
};
```

---

### Java

```java
class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = prices[0];
        int maxProfit = 0;

        for (int i = 1; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else {
                maxProfit = Math.max(maxProfit, prices[i] - minPrice);
            }
        }

        return maxProfit;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxProfit(prices) {
        let minPrice = prices[0];
        let maxProfit = 0;

        for (let i = 1; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else {
                maxProfit = Math.max(maxProfit, prices[i] - minPrice);
            }
        }

        return maxProfit;
    }
}
```

---

### Python3

```python
class Solution:
    def maxProfit(self, prices):
        min_price = prices[0]
        max_profit = 0

        for i in range(1, len(prices)):
            if prices[i] < min_price:
                min_price = prices[i]
            else:
                max_profit = max(max_profit, prices[i] - min_price)

        return max_profit
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

* I start by assuming I bought the stock on the first day
* I store the minimum price seen so far
* For every next day:

  * If the price is lower, I update my buying price
  * If the price is higher, I try selling and calculate profit
* I always store the maximum profit found
* If prices keep decreasing, profit remains 0

This logic is the same in all languages.

---

## Examples

**Input:**
`[7, 10, 1, 3, 6, 9, 2]`

**Output:**
`8`

**Explanation:**
Buy at price `1`, sell at price `9`.

---

**Input:**
`[7, 6, 4, 3, 1]`

**Output:**
`0`

**Explanation:**
Prices keep decreasing, no profit possible.

---

## How to Use / Run Locally

1. Copy the code for your preferred language
2. Paste it into the online judge or your local IDE
3. Call `maxProfit(prices)` with your input array
4. Run and get the result

---

## Notes & Optimizations

* This is the most optimized solution possible
* Brute force O(n²) solutions will fail for large inputs
* This pattern is widely used in advanced stock DP problems

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
