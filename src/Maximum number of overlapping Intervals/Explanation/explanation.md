# Maximum Number of Overlapping Intervals

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
* [How to Run Locally](#how-to-run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

You are given an array of intervals `arr[][]`, where each interval is represented as `[start, end]` (inclusive).

Your task is to return the **maximum number of intervals that overlap at any point in time**.

---

## Constraints

* 2 ≤ arr.size() ≤ 2 × 10⁴
* 1 ≤ start < end ≤ 4 × 10⁶

---

## Intuition

When I first looked at this problem, I thought about comparing every pair of intervals. But that would take O(n²) time, which is too slow.

Then I noticed something important:
Instead of comparing intervals directly, I can track how overlaps change over time.

If an interval starts at L, overlap increases by 1.
If it ends at R (inclusive), overlap decreases after R.

So I can use a **Difference Array + Prefix Sum** technique to efficiently count active intervals at every point.

---

## Approach

1. Find the maximum ending value among all intervals.
2. Create a difference array `diff` of size `maxEnd + 2`.
3. For every interval `[start, end]`:

   * `diff[start] += 1`
   * `diff[end + 1] -= 1`
4. Compute prefix sum over `diff`.
5. While computing prefix sum, track the maximum value.
6. Return that maximum value.

---

## Data Structures Used

* Difference Array (integer array)
* Variables to track running prefix sum and maximum overlap

---

## Operations & Behavior Summary

* Start of interval increases active count.
* End + 1 decreases active count.
* Prefix sum tells how many intervals are active at each point.
* Maximum prefix value is the final answer.

---

## Complexity

**Time Complexity:** O(n + M)

* n = number of intervals
* M = maximum end value

**Space Complexity:** O(M)

* For storing the difference array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int overlapInt(vector<vector<int>> &arr) {
        int maxEnd = 0;
        for (auto &interval : arr)
            maxEnd = max(maxEnd, interval[1]);

        vector<int> diff(maxEnd + 2, 0);

        for (auto &interval : arr) {
            diff[interval[0]]++;
            diff[interval[1] + 1]--;
        }

        int current = 0, maxOverlap = 0;
        for (int i = 0; i <= maxEnd; i++) {
            current += diff[i];
            maxOverlap = max(maxOverlap, current);
        }

        return maxOverlap;
    }
};
```

---

### Java

```java
class Solution {
    public static int overlapInt(int[][] arr) {
        int maxEnd = 0;
        for (int[] interval : arr)
            maxEnd = Math.max(maxEnd, interval[1]);

        int[] diff = new int[maxEnd + 2];

        for (int[] interval : arr) {
            diff[interval[0]]++;
            diff[interval[1] + 1]--;
        }

        int current = 0, maxOverlap = 0;
        for (int i = 0; i <= maxEnd; i++) {
            current += diff[i];
            maxOverlap = Math.max(maxOverlap, current);
        }

        return maxOverlap;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    overlapInt(arr) {
        let maxEnd = 0;
        for (let interval of arr)
            maxEnd = Math.max(maxEnd, interval[1]);

        let diff = new Array(maxEnd + 2).fill(0);

        for (let interval of arr) {
            diff[interval[0]]++;
            diff[interval[1] + 1]--;
        }

        let current = 0;
        let maxOverlap = 0;

        for (let i = 0; i <= maxEnd; i++) {
            current += diff[i];
            maxOverlap = Math.max(maxOverlap, current);
        }

        return maxOverlap;
    }
}
```

---

### Python3

```python
class Solution:
    def overlapInt(self, arr):
        max_end = 0
        for start, end in arr:
            max_end = max(max_end, end)

        diff = [0] * (max_end + 2)

        for start, end in arr:
            diff[start] += 1
            diff[end + 1] -= 1

        current = 0
        max_overlap = 0

        for i in range(max_end + 1):
            current += diff[i]
            max_overlap = max(max_overlap, current)

        return max_overlap
```

---

## Step-by-step Detailed Explanation

### Step 1: Find Maximum End

We scan all intervals to determine the maximum end value. This helps us define the size of the difference array.

### Step 2: Create Difference Array

We initialize an array of size `maxEnd + 2` filled with zeros.

### Step 3: Mark Interval Effects

For each interval:

* Increase count at start.
* Decrease count at end + 1.

This marks where overlaps begin and end.

### Step 4: Compute Prefix Sum

We iterate from index 0 to maxEnd.
We keep adding previous value to current.
This gives active intervals at each point.

### Step 5: Track Maximum

While computing prefix sum, we track the maximum overlap seen.

That maximum value is our answer.

---

## Examples

**Input:**

```bash
[[1, 2], [2, 4], [3, 6]]
```

**Output:**

```bash
2
```

---

**Input:**

```bash
[[1, 8], [2, 5], [5, 6], [3, 7]]
```

**Output:**

```bash
4
```

---

## How to Run Locally

### C++

Compile using:

```bash
g++ filename.cpp -o output
./output
```

### Java

Compile and run:

```bash
javac Solution.java
java Solution
```

### Python

Run:

```bash
python3 filename.py
```

### JavaScript

Run with Node:

```bash
node filename.js
```

---

## Notes & Optimizations

* This approach is efficient when the range of values is manageable.
* Avoid nested loops.
* Difference array reduces problem complexity drastically.
* Always remember to use `end + 1` because intervals are inclusive.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
