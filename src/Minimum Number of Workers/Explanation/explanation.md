# Minimum Number of Workers

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
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an array `arr[]`.

Each index represents a person (worker).

* If `arr[i] != -1`, that worker can cover working hours from
  `i - arr[i]` to `i + arr[i]`
* If `arr[i] == -1`, that worker is unavailable

The working day starts from hour `0` and ends at `n - 1`.

My task is to find the **minimum number of workers** required to cover the **entire working day**.

If it is **not possible**, I must return `-1`.

---

## Constraints

* 1 ≤ size of array ≤ 100000
* -1 ≤ arr[i] ≤ size of array

---

## Intuition

When I read the problem, I immediately thought of **interval coverage**.

Each worker is not just a person —
they represent a **range on a timeline**.

So instead of focusing on people,
I converted every valid worker into an **interval**.

My goal became very clear:

Cover the full range `[0, n-1]`
using the **minimum number of intervals**.

This is a **classic greedy problem**, very similar to:
minimum sprinklers or minimum taps problems.

---

## Approach

This is how I solved it step by step.

1. I loop through the array
2. I ignore workers with `-1`
3. For valid workers, I convert them into intervals
   left = max(0, i - arr[i])
   right = min(n - 1, i + arr[i])
4. I store all intervals
5. I sort intervals by starting time
6. I use a greedy method to cover the day:

   * Start from hour `0`
   * From all intervals that can start here, pick the one that goes farthest
7. Every time I pick an interval, I increase my worker count
8. If at any point I cannot move forward, I return `-1`

---

## Data Structures Used

* List / Vector / Array
  Used to store the intervals `[left, right]`

No complex data structure is needed.

---

## Operations & Behavior Summary

* Convert workers to time intervals
* Sort intervals
* Use greedy selection
* Always extend coverage as far as possible
* Stop when full day is covered or when stuck

---

## Complexity

Time Complexity
O(n log n)
`n` is the number of workers
Sorting intervals takes `n log n`

Space Complexity
O(n)
Extra space is used to store intervals

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int minMen(vector<int>& arr) {
        int n = arr.size();
        vector<pair<int,int>> intervals;

        for (int i = 0; i < n; i++) {
            if (arr[i] == -1) continue;

            int left = max(0, i - arr[i]);
            int right = min(n - 1, i + arr[i]);
            intervals.push_back({left, right});
        }

        sort(intervals.begin(), intervals.end());

        int coveredTill = 0;
        int count = 0;
        int i = 0;

        while (coveredTill < n) {
            int farthest = coveredTill;

            while (i < intervals.size() && intervals[i].first <= coveredTill) {
                farthest = max(farthest, intervals[i].second + 1);
                i++;
            }

            if (farthest == coveredTill)
                return -1;

            count++;
            coveredTill = farthest;
        }

        return count;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public int minMen(int[] arr) {
        int n = arr.length;
        List<int[]> intervals = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            if (arr[i] == -1) continue;

            int left = Math.max(0, i - arr[i]);
            int right = Math.min(n - 1, i + arr[i]);
            intervals.add(new int[]{left, right});
        }

        intervals.sort((a, b) -> a[0] - b[0]);

        int coveredTill = 0;
        int count = 0;
        int idx = 0;

        while (coveredTill < n) {
            int farthest = coveredTill;

            while (idx < intervals.size() && intervals.get(idx)[0] <= coveredTill) {
                farthest = Math.max(farthest, intervals.get(idx)[1] + 1);
                idx++;
            }

            if (farthest == coveredTill)
                return -1;

            count++;
            coveredTill = farthest;
        }

        return count;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    minMen(arr) {
        const n = arr.length;
        const intervals = [];

        for (let i = 0; i < n; i++) {
            if (arr[i] === -1) continue;

            const left = Math.max(0, i - arr[i]);
            const right = Math.min(n - 1, i + arr[i]);
            intervals.push([left, right]);
        }

        intervals.sort((a, b) => a[0] - b[0]);

        let coveredTill = 0;
        let count = 0;
        let idx = 0;

        while (coveredTill < n) {
            let farthest = coveredTill;

            while (idx < intervals.length && intervals[idx][0] <= coveredTill) {
                farthest = Math.max(farthest, intervals[idx][1] + 1);
                idx++;
            }

            if (farthest === coveredTill)
                return -1;

            count++;
            coveredTill = farthest;
        }

        return count;
    }
}
```

---

### Python3

```python
class Solution:
    def minMen(self, arr):
        n = len(arr)
        intervals = []

        for i in range(n):
            if arr[i] == -1:
                continue

            left = max(0, i - arr[i])
            right = min(n - 1, i + arr[i])
            intervals.append((left, right))

        intervals.sort()

        covered_till = 0
        count = 0
        idx = 0

        while covered_till < n:
            farthest = covered_till

            while idx < len(intervals) and intervals[idx][0] <= covered_till:
                farthest = max(farthest, intervals[idx][1] + 1)
                idx += 1

            if farthest == covered_till:
                return -1

            count += 1
            covered_till = farthest

        return count
```

---

## Step-by-step Detailed Explanation

I start by converting workers into intervals.

Then I sort those intervals.

I begin covering from hour `0`.

At every step:

* I check all intervals that can start now
* I choose the one that goes the farthest
* This greedy choice gives maximum coverage

If I cannot extend coverage, I immediately stop and return `-1`.

If I reach the end of the day, I return the count.

---

## Examples

Input
`[1, 2, 1, 0]`

Output
`1`

Explanation
Worker at index `1` covers full range `[0,3]`

---

Input
`[0, 1, 0, -1]`

Output
`-1`

Explanation
Last hour cannot be covered by any worker

---

## How to use / Run locally

1. Copy the code for your language
2. Create a file `Solution`
3. Call `minMen(arr)` from main function
4. Print the result

---

## Notes & Optimizations

* Greedy approach is mandatory
* Brute force will fail for large input
* Sorting intervals is the key step
* This problem is identical in pattern to minimum taps problems

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
