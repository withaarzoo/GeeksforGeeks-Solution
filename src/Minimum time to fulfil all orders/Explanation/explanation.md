# Minimum Time to Fulfil All Orders

---

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Geek is organizing a party and needs **exactly `n` donuts**.
He orders donuts from a restaurant that has **multiple chefs**.

Each chef has a **rank `r`**, which defines how fast they make donuts:

* 1st donut → `r` minutes
* 2nd donut → `2r` minutes
* 3rd donut → `3r` minutes
* and so on...

A chef can only make the next donut **after finishing the previous one**.
All chefs work **at the same time**.

### Goal

Find the **minimum time** required to make **at least `n` donuts**.

---

## Constraints

* `1 ≤ n ≤ 10³`
* `1 ≤ number of chefs ≤ 10⁴`
* `1 ≤ rank[i] ≤ 100`

---

## Intuition

When I read the problem, I realized something important:

* I don’t need to decide **which chef makes which donut**
* All chefs work in parallel
* Time always increases in order

So instead of assigning donuts, I thought:

👉 *What if I guess a time and check if all chefs together can make `n` donuts in that time?*

If yes → I try **smaller time**
If no → I try **bigger time**

This thinking clearly leads to **Binary Search on Time**.

---

## Approach

1. I apply **binary search** on the answer (time).
2. For a given time `mid`, I calculate:

   * How many donuts each chef can make.
3. I sum all donuts.
4. If total donuts ≥ `n`:

   * This time is possible → move left.
5. Otherwise:

   * Time is insufficient → move right.
6. The first valid time is my answer.

---

## Data Structures Used

* No complex data structures
* Only arrays and variables
* Pure calculation-based solution

---

## Operations & Behavior Summary

* Binary search reduces time complexity
* Each check simulates donut production per chef
* All chefs are treated independently
* Parallel work is naturally handled

---

## Complexity

### Time Complexity

**O(m × log T)**

* `m` = number of chefs
* `T` = maximum possible time
* Binary search runs `log T` times
* Each iteration scans all chefs

### Space Complexity

**O(1)**

* No extra space used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    bool canMake(vector<int>& ranks, int n, long long time) {
        long long donuts = 0;

        for (int r : ranks) {
            long long currTime = 0;
            long long k = 0;

            while (true) {
                currTime += r * (k + 1);
                if (currTime > time) break;
                k++;
            }

            donuts += k;
            if (donuts >= n) return true;
        }
        return false;
    }

    int minTime(vector<int>& ranks, int n) {
        int minRank = *min_element(ranks.begin(), ranks.end());
        long long low = 0;
        long long high = 1LL * minRank * n * (n + 1) / 2;
        long long ans = high;

        while (low <= high) {
            long long mid = (low + high) / 2;

            if (canMake(ranks, n, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};
```

---

### Java

```java
class Solution {

    boolean canMake(int[] ranks, int n, long time) {
        long donuts = 0;

        for (int r : ranks) {
            long currTime = 0;
            long k = 0;

            while (true) {
                currTime += r * (k + 1);
                if (currTime > time) break;
                k++;
            }

            donuts += k;
            if (donuts >= n) return true;
        }
        return false;
    }

    public int minTime(int[] ranks, int n) {
        int minRank = Integer.MAX_VALUE;
        for (int r : ranks) minRank = Math.min(minRank, r);

        long low = 0;
        long high = (long) minRank * n * (n + 1) / 2;
        long ans = high;

        while (low <= high) {
            long mid = (low + high) / 2;

            if (canMake(ranks, n, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return (int) ans;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    canMake(ranks, n, time) {
        let donuts = 0;

        for (let r of ranks) {
            let currTime = 0;
            let k = 0;

            while (true) {
                currTime += r * (k + 1);
                if (currTime > time) break;
                k++;
            }

            donuts += k;
            if (donuts >= n) return true;
        }
        return false;
    }

    minTime(ranks, n) {
        let minRank = Math.min(...ranks);
        let low = 0;
        let high = minRank * n * (n + 1) / 2;
        let ans = high;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);

            if (this.canMake(ranks, n, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def canMake(self, ranks, n, time):
        donuts = 0

        for r in ranks:
            curr_time = 0
            k = 0

            while True:
                curr_time += r * (k + 1)
                if curr_time > time:
                    break
                k += 1

            donuts += k
            if donuts >= n:
                return True

        return False

    def minTime(self, ranks, n):
        min_rank = min(ranks)
        low = 0
        high = min_rank * n * (n + 1) // 2
        ans = high

        while low <= high:
            mid = (low + high) // 2

            if self.canMake(ranks, n, mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
```

---

## Step-by-step Detailed Explanation

1. I start binary search on time.
2. For each mid time:

   * I calculate donuts per chef.
3. I keep adding donuts.
4. If total reaches `n`, time is valid.
5. I continue until minimum valid time is found.

---

## Examples

### Example 1

**Input:**
`n = 10`
`ranks = [1, 2, 3, 4]`

**Output:**
`12`

---

### Example 2

**Input:**
`n = 8`
`ranks = [1, 1, 1, 1, 1, 1, 1, 1]`

**Output:**
`1`

---

## How to Use / Run Locally

### C++

```bash
g++ solution.cpp
./a.out
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

### Python

```bash
python solution.py
```

---

## Notes & Optimizations

* Binary search avoids brute force
* Parallel cooking handled naturally
* Can be further optimized using math formula instead of loop

---

## Author

* **Md Aarzoo Islam**
  👉 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
