# Problem Title

**Weighted Job Scheduling**

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

Given an array `jobs` of size `n x 3` where each job is `[start, end, profit]`, choose **non-overlapping** jobs to **maximize total profit**.
Two jobs don’t overlap if `end_time_of_A <= start_time_of_B`.

Return the maximum profit.

---

## Constraints

* `1 ≤ n ≤ 1e5`
* `1 ≤ jobs[i][0] < jobs[i][1] ≤ 1e9`
* `1 ≤ jobs[i][2] ≤ 1e4`

---

## Intuition

I thought: if I sort jobs by **end time**, then when I consider job `i`, all compatible jobs that can come before it are to its left.
So the best answer that **includes** job `i` is:
`profit[i] + best_profit_of_last_job_ending_before_start[i]`.
I can store “best profit up to job j” in a DP array, and find that “last compatible job” quickly with **binary search** on the end times.

---

## Approach

1. Sort jobs by `end`.
2. Build an array `ends[]` of end times for binary search.
3. Let `dp[i]` = max profit considering jobs `0..i` (sorted by end).
4. For each job `i`:

   * Find `j` = rightmost index `< i` with `ends[j] <= start[i]` using upper bound (binary search).
   * `take = profit[i] + (dp[j] if j >= 0 else 0)`
   * `skip = dp[i-1]`
   * `dp[i] = max(skip, take)`
5. Answer = `dp[n-1]`.

---

## Data Structures Used

* Array/vector for jobs and end times.
* DP array `dp` of length `n`.
* Binary search (upper_bound / bisect_right).

---

## Operations & Behavior Summary

* **Sort jobs by end:** ensures left side contains all potential compatible jobs.
* **Binary search on `ends`:** finds last non-overlapping job index in `O(log n)`.
* **DP transition:** choose between taking job `i` or skipping it.

---

## Complexity

* **Time Complexity:** `O(n log n)` — sorting `O(n log n)` + `n` binary searches `O(n log n)`.
* **Space Complexity:** `O(n)` — `ends` and `dp` arrays.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int maxProfit(vector<vector<int>> &jobs) {
        int n = jobs.size();
        // 1) Sort by end time
        sort(jobs.begin(), jobs.end(), [](const auto &a, const auto &b){
            return a[1] < b[1];
        });

        // 2) Ends array for binary search
        vector<int> ends(n);
        for (int i = 0; i < n; ++i) ends[i] = jobs[i][1];

        // 3) DP over sorted jobs
        vector<long long> dp(n, 0);
        for (int i = 0; i < n; ++i) {
            long long take = jobs[i][2];

            // rightmost j < i with ends[j] <= start_i
            int j = int(upper_bound(ends.begin(), ends.begin() + i, jobs[i][0]) - ends.begin()) - 1;
            if (j >= 0) take += dp[j];

            long long skip = (i ? dp[i - 1] : 0);
            dp[i] = max(skip, take);
        }
        return (int)dp.back();
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int maxProfit(int[][] jobs) {
        int n = jobs.length;

        // 1) Sort by end time
        Arrays.sort(jobs, (a, b) -> Integer.compare(a[1], b[1]));

        // 2) Ends array for binary search
        int[] ends = new int[n];
        for (int i = 0; i < n; i++) ends[i] = jobs[i][1];

        long[] dp = new long[n];
        for (int i = 0; i < n; i++) {
            long take = jobs[i][2];

            // upperBound on ends[0..i-1] for start -> minus 1
            int j = upperBound(ends, i, jobs[i][0]) - 1;
            if (j >= 0) take += dp[j];

            long skip = (i > 0) ? dp[i - 1] : 0;
            dp[i] = Math.max(skip, take);
        }
        return (int)dp[n - 1];
    }

    // First index in ends[0..high-1] with value > x
    private int upperBound(int[] ends, int high, int x) {
        int l = 0, r = high;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (ends[m] <= x) l = m + 1;
            else r = m;
        }
        return l;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[][]} jobs
 * @returns {number}
 */
class Solution {
    maxProfit(jobs) {
        const n = jobs.length;

        // 1) Sort by end time
        jobs.sort((a, b) => a[1] - b[1]);

        const ends = jobs.map(j => j[1]);
        const dp = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            let take = jobs[i][2];

            // rightmost j < i with ends[j] <= start_i
            const j = this.upperBound(ends, 0, i, jobs[i][0]) - 1;
            if (j >= 0) take += dp[j];

            const skip = i ? dp[i - 1] : 0;
            dp[i] = Math.max(skip, take);
        }
        return dp[n - 1];
    }

    // first index in a[left..right-1] with a[idx] > x
    upperBound(a, left, right, x) {
        let l = left, r = right;
        while (l < r) {
            const m = (l + r) >> 1;
            if (a[m] <= x) l = m + 1;
            else r = m;
        }
        return l;
    }
}
```

### Python3

```python
from bisect import bisect_right

class Solution:
    def maxProfit(self, jobs):
        n = len(jobs)
        # 1) Sort by end time
        jobs.sort(key=lambda x: x[1])
        ends = [j[1] for j in jobs]

        dp = [0] * n
        for i in range(n):
            take = jobs[i][2]
            # rightmost j < i with ends[j] <= start_i
            j = bisect_right(ends, jobs[i][0], 0, i) - 1
            if j >= 0:
                take += dp[j]
            skip = dp[i - 1] if i > 0 else 0
            dp[i] = max(skip, take)
        return dp[-1]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

**1) Sort by end time**
We sort so that when we are at job `i`, every job that ends before `jobs[i].start` sits to the **left**. This makes it easy to reference previous answers.

**2) Build `ends`**
`ends[i] = jobs[i].end`. We will perform `upper_bound/bisect_right(ends, start_i, range)` to quickly find the **last** compatible job index.

**3) DP definition**
`dp[i]` = best profit considering the first `i+1` jobs (0..i in sorted order).

**4) Transition**

* `take` this job: add its profit to `dp[j]` where `j` is the index of the last job with `ends[j] <= start_i`. If none, add `0`.
* `skip` this job: keep `dp[i-1]`.
* `dp[i] = max(take, skip)`.

**5) Binary Search detail**
We use **upper bound** on `ends[0..i-1]` with key `start_i`. Upper bound returns the first index having value `> start_i`. Subtract 1 to get the rightmost `<= start_i`. That’s our `j`.

**6) Return result**
After processing all jobs, the last DP value `dp[n-1]` is the answer.

---

## Examples

**Example 1**

```
Input:  [[1,2,50],[3,5,20],[6,19,100],[2,100,200]]
Output: 250
Explanation: Choose jobs [1,2,50] and [2,100,200] → 50 + 200 = 250.
```

**Example 2**

```
Input:  [[1,3,60],[2,5,50],[4,6,70],[5,7,30]]
Output: 130
Explanation: Choose [1,3,60] and [4,6,70] → 60 + 70 = 130.
```

---

## How to use / Run locally

**C++**

```bash
g++ -std=c++17 main.cpp -O2 && ./a.out
```

**Java**

```bash
javac Solution.java && java Solution
```

**JavaScript (Node.js)**

```bash
node main.js
```

**Python**

```bash
python3 main.py
```

> In your `main.*` file, read the `jobs` input and call `new Solution().maxProfit(jobs)` (language-specific) to print the result.

---

## Notes & Optimizations

* Use `long long` / `long` internally to avoid overflow when summing profits.
* Sorting by **end** (not start) is crucial; it ensures compatibility search is always on the left side.
* If memory is tight, we can keep only `dp` and `ends` (both `O(n)`).
* This is the optimal standard solution for large `n` (`1e5`) — `O(n log n)` is necessary because we must at least sort.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
