# Stock Buy and Sell with Cooldown

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
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given an array `arr[]`, where the `i`-th element is the stock price on day `i`, find the **maximum profit** you can make by buying and selling multiple times with the rule: **after selling a stock, you cannot buy on the next day** (1-day cooldown).

You can hold at most one stock at a time.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `1 ≤ arr[i] ≤ 10^4`
* Prices are integers and non-negative.

---

## Intuition

I thought of this as a tiny game I play each day with three possible endings for the day:

1. **Hold** – I end the day owning a stock.
2. **Sold (cooldown)** – I sell today; tomorrow I must rest.
3. **Rest (free)** – I’m not holding and I’m free to buy.

If I just keep the **best profit** for each of these states and update them day by day, I can get the answer in one pass with only a few variables.

---

## Approach

For each price `p`:

* `hold = max(hold, rest - p)`
  Either I keep holding, or I buy today from a free state.

* `sold = hold + p`
  I can sell only if I was holding yesterday.

* `rest = max(rest, sold)`
  I either keep resting, or my cooldown from yesterday ends (yesterday was a sold day).

**Initialization**

* `hold = -arr[0]` (buy on day 0)
* `sold = -∞` (impossible to sell before buying)
* `rest = 0` (do nothing)

**Answer**
`max(sold, rest)` — I don’t want to end while holding.

---

## Data Structures Used

* Only **three integers** (or longs) to store DP states: `hold`, `sold`, `rest`.

---

## Operations & Behavior Summary

* **Buy** is modeled by moving from `rest` to `hold` with cost `-price`.
* **Sell** is modeled by moving from `hold` to `sold` with gain `+price`.
* **Cooldown** is enforced by allowing buying only from `rest`, and `rest` can come from either staying at `rest` or waiting one day after `sold`.

---

## Complexity

* **Time Complexity:** `O(n)` where `n` is the number of days (single pass).
* **Space Complexity:** `O(1)` extra space (three variables only).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int maxProfit(vector<int>& arr) {
        int n = (int)arr.size();
        if (n == 0) return 0;

        // DP states:
        // hold: best profit if I end today holding a stock
        // sold: best profit if I sell today (cooldown tomorrow)
        // rest: best profit if I end today without a stock and not in cooldown
        int hold = -arr[0];
        int sold = INT_MIN; // impossible on day 0
        int rest = 0;

        for (int i = 1; i < n; ++i) {
            int price = arr[i];

            int newHold = max(hold, rest - price); // hold or buy
            int newSold = hold + price;            // must sell from hold
            int newRest = max(rest, sold);         // keep resting or cooldown ends

            hold = newHold;
            sold = newSold;
            rest = newRest;
        }
        return max(sold, rest); // don't end while holding
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int maxProfit(int arr[]) {
        int n = arr.length;
        if (n == 0) return 0;

        int hold = -arr[0];               // holding a stock
        int sold = Integer.MIN_VALUE;     // sold today (cooldown tomorrow)
        int rest = 0;                     // free to buy

        for (int i = 1; i < n; i++) {
            int price = arr[i];

            int newHold = Math.max(hold, rest - price);
            int newSold = hold + price;
            int newRest = Math.max(rest, sold);

            hold = newHold;
            sold = newSold;
            rest = newRest;
        }
        return Math.max(sold, rest);
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    maxProfit(arr) {
        const n = arr.length;
        if (n === 0) return 0;

        let hold = -arr[0];                     // end day holding
        let sold = Number.NEGATIVE_INFINITY;    // sold today -> cooldown
        let rest = 0;                           // free to buy

        for (let i = 1; i < n; i++) {
            const price = arr[i];

            const newHold = Math.max(hold, rest - price);
            const newSold = hold + price;
            const newRest = Math.max(rest, sold);

            hold = newHold;
            sold = newSold;
            rest = newRest;
        }
        return Math.max(sold, rest);
    }
}
```

### Python3

```python
class Solution:
    def maxProfit(self, arr):
        n = len(arr)
        if n == 0:
            return 0

        hold = -arr[0]           # end the day holding a stock
        sold = float('-inf')     # sold today, cooldown tomorrow
        rest = 0                 # not holding, free to buy

        for i in range(1, n):
            price = arr[i]
            new_hold = max(hold, rest - price)
            new_sold = hold + price
            new_rest = max(rest, sold)

            hold, sold, rest = new_hold, new_sold, new_rest

        return max(sold, rest)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all languages. Here’s the flow you’ll see in each code:

1. **Initialization**

   * `hold = -arr[0]`: If I buy on day 0, profit becomes negative by the price.
   * `sold = -∞`: Selling before buying is impossible.
   * `rest = 0`: Doing nothing yields zero profit.

2. **For each next day’s price `p`:**

   * `newHold = max(hold, rest - p)`

     * Keep holding from yesterday OR buy today using `rest` money.
   * `newSold = hold + p`

     * I can sell only if I had a stock yesterday.
   * `newRest = max(rest, sold)`

     * Either I keep resting, or the cooldown after yesterday’s sell ends today.

3. **State update**

   * Assign `hold = newHold, sold = newSold, rest = newRest`.

4. **Final answer**

   * `max(sold, rest)` because ending with a stock in hand doesn’t realize profit.

This captures the cooldown rule because buying is only allowed from the `rest` state, and the `rest` state can be reached from `sold` only after one day passes.

---

## Examples

**Example 1**

```
Input:  arr = [0, 2, 1, 2, 3]
Output: 3
Explanation:
Day1 buy @0 -> Day2 sell @2 (profit 2), Day3 cooldown,
Day4 buy @2 -> Day5 sell @3 (profit 1). Total = 3.
```

**Example 2**

```
Input:  arr = [3, 1, 6, 1, 2, 4]
Output: 7
Explanation:
Buy day2 @1 -> sell day3 @6 (profit 5), day4 cooldown,
Buy day5 @2 -> sell day6 @4 (profit 2). Total = 7.
```

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 main.cpp -O2 && ./a.out
```

`main.cpp` should include the class and a small driver that reads `n`, then `n` prices, and prints `Solution().maxProfit(arr)`.

### Java

```bash
javac Main.java && java Main
```

`Main.java` should create an `int[] arr`, call `new Solution().maxProfit(arr)`, and print the result.

### JavaScript (Node.js)

```bash
node main.js
```

`main.js` should instantiate `new Solution().maxProfit(arr)` and log the answer.

### Python3

```bash
python3 main.py
```

`main.py` should create `arr`, call `Solution().maxProfit(arr)`, and print the result.

---

## Notes & Optimizations

* This is the classic **Stock with cooldown** DP using **3 states** and **O(1)** space.
* Using `long long` in C++ / `long` in Java is safe if your inputs or totals can exceed `int`. Given constraints, `int` is fine.
* If prices can be `0`, initialization still works (`hold = -arr[0]`).
* Do not attempt greedy local decisions; the cooldown coupling requires DP.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
