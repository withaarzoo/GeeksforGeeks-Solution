# Overlapping Intervals

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

I am given a list of intervals where each interval has a **start** and **end** value.
My task is to **merge all overlapping intervals** and return a new list of non-overlapping intervals.

If two intervals overlap or touch each other, I combine them into one.

---

## Constraints

* `1 ≤ number of intervals ≤ 10^5`
* `0 ≤ start ≤ end ≤ 10^6`
* Intervals are not guaranteed to be sorted

---

## Intuition

When I looked at this problem, I realized that checking overlaps randomly would be messy.
So I thought:

> If all intervals are sorted by start time, overlapping intervals will always appear next to each other.

Once sorted, I only need to compare the **current interval** with the **previous one**.
This makes the solution simple, clean, and efficient.

---

## Approach

1. First, I sort all intervals by their **start value**.
2. I take the first interval as my current interval.
3. I loop through the remaining intervals:

   * If the next interval overlaps, I merge it.
   * If it does not overlap, I store the current interval and move forward.
4. Finally, I add the last interval to the result.

---

## Data Structures Used

* Array / Vector / List to store intervals
* Result list to store merged intervals

No extra complex data structure is required.

---

## Operations & Behavior Summary

* Sorting groups overlapping intervals together
* One linear scan merges intervals efficiently
* Each interval is visited only once after sorting

---

## Complexity

* **Time Complexity:** `O(n log n)`

  * `n` is the number of intervals
  * Sorting takes `O(n log n)`
  * Merging takes `O(n)`

* **Space Complexity:** `O(1)` (excluding output)

  * No extra space is used apart from the result list

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<vector<int>> mergeOverlap(vector<vector<int>>& arr) {
        if (arr.empty()) return {};

        sort(arr.begin(), arr.end());
        vector<vector<int>> result;

        int start = arr[0][0];
        int end = arr[0][1];

        for (int i = 1; i < arr.size(); i++) {
            if (arr[i][0] <= end) {
                end = max(end, arr[i][1]);
            } else {
                result.push_back({start, end});
                start = arr[i][0];
                end = arr[i][1];
            }
        }

        result.push_back({start, end});
        return result;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<int[]> mergeOverlap(int[][] arr) {
        ArrayList<int[]> result = new ArrayList<>();
        if (arr.length == 0) return result;

        Arrays.sort(arr, (a, b) -> a[0] - b[0]);

        int start = arr[0][0];
        int end = arr[0][1];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i][0] <= end) {
                end = Math.max(end, arr[i][1]);
            } else {
                result.add(new int[]{start, end});
                start = arr[i][0];
                end = arr[i][1];
            }
        }

        result.add(new int[]{start, end});
        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    mergeOverlap(arr) {
        if (arr.length === 0) return [];

        arr.sort((a, b) => a[0] - b[0]);

        let result = [];
        let start = arr[0][0];
        let end = arr[0][1];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i][0] <= end) {
                end = Math.max(end, arr[i][1]);
            } else {
                result.push([start, end]);
                start = arr[i][0];
                end = arr[i][1];
            }
        }

        result.push([start, end]);
        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def mergeOverlap(self, arr):
        if not arr:
            return []

        arr.sort(key=lambda x: x[0])
        result = []

        start, end = arr[0]

        for i in range(1, len(arr)):
            if arr[i][0] <= end:
                end = max(end, arr[i][1])
            else:
                result.append([start, end])
                start, end = arr[i]

        result.append([start, end])
        return result
```

---

## Step-by-step Detailed Explanation

1. I sort intervals so overlaps come together.
2. I track one active interval using `start` and `end`.
3. If the next interval overlaps, I extend `end`.
4. If not, I store the interval and start a new one.
5. This avoids unnecessary comparisons and keeps the code clean.

---

## Examples

**Input**

```
[[1,3],[2,4],[6,8],[9,10]]
```

**Output**

```
[[1,4],[6,8],[9,10]]
```

---

## How to Use / Run Locally

1. Copy the solution code for your preferred language.
2. Compile or run using your local compiler/interpreter.
3. Provide input intervals in the required format.
4. Observe merged intervals as output.

---

## Notes & Optimizations

* Sorting is mandatory for correct merging
* No brute force comparison is needed
* Works efficiently for large inputs
* Interview and competitive programming friendly

---

## Author

* **Md Aarzoo Islam**
  🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
