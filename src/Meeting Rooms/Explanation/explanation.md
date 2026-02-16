# Meeting Rooms

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

Given a 2D array `arr[][]`, where:

* `arr[i][0]` = starting time of ith meeting
* `arr[i][1]` = ending time of ith meeting

The task is to check whether a person can attend all meetings.

A person can attend a meeting if its starting time is greater than or equal to the previous meeting's ending time.

We must return:

* `true` if all meetings can be attended
* `false` if any meetings overlap

---

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 0 ≤ arr[i][j] ≤ 2 * 10^6

---

## Intuition

When I first saw this problem, I immediately understood one key idea.

If two meetings overlap, then it is impossible to attend both.

So I thought, how can I easily detect overlapping intervals?

If I sort all meetings based on their starting time, then I only need to compare each meeting with the previous one.

If current_start < previous_end → overlap exists.
If current_start >= previous_end → safe.

So the entire problem becomes simple sorting + checking.

---

## Approach

1. Sort the meetings based on starting time.
2. Traverse from the second meeting to the end.
3. For every meeting:

   * If current start time < previous end time → return false.
4. If no overlap is found → return true.

This is clean and efficient.

---

## Data Structures Used

* 2D Array (given input)
* No extra data structure required
* Sorting done in-place

---

## Operations & Behavior Summary

* Sorting arr by start time
* Single loop traversal
* Immediate return if overlap detected
* Otherwise return true at end

---

## Complexity

**Time Complexity:** O(n log n)

* Sorting takes O(n log n)
* Traversal takes O(n)
* Overall = O(n log n)

Here, n is the number of meetings.

**Space Complexity:** O(1)

* No extra data structures used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool canAttend(vector<vector<int>> &arr) {
        int n = arr.size();
        sort(arr.begin(), arr.end());
        
        for(int i = 1; i < n; i++) {
            if(arr[i][0] < arr[i - 1][1]) {
                return false;
            }
        }
        return true;
    }
};
```

### Java

```java
import java.util.Arrays;

class Solution {
    static boolean canAttend(int[][] arr) {
        Arrays.sort(arr, (a, b) -> Integer.compare(a[0], b[0]));
        
        for(int i = 1; i < arr.length; i++) {
            if(arr[i][0] < arr[i - 1][1]) {
                return false;
            }
        }
        return true;
    }
}
```

### JavaScript

```javascript
class Solution {
    canAttend(arr) {
        arr.sort((a, b) => a[0] - b[0]);
        
        for(let i = 1; i < arr.length; i++) {
            if(arr[i][0] < arr[i - 1][1]) {
                return false;
            }
        }
        return true;
    }
}
```

### Python3

```python
class Solution:
    def canAttend(self, arr):
        arr.sort(key=lambda x: x[0])
        
        for i in range(1, len(arr)):
            if arr[i][0] < arr[i - 1][1]:
                return False
        return True
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Step 1: Sort the meetings by start time.
This ensures meetings are arranged chronologically.

Step 2: Start from index 1.
We compare every meeting with the previous meeting.

Step 3: Check overlap condition.
If current_start < previous_end → overlap exists → return false.

Step 4: If loop completes without returning false → return true.

This logic works the same in C++, Java, JavaScript, and Python.
Only syntax changes, logic remains identical.

---

## Examples

Example 1:
Input: [[1,4], [10,15], [7,10]]
Output: true
Explanation: No meetings overlap.

Example 2:
Input: [[2,4], [6,10], [9,12]]
Output: false
Explanation: Meeting [6,10] and [9,12] overlap.

---

## How to use / Run locally

1. Copy the code into your local IDE.
2. Provide test input in required format.
3. Call canAttend(arr).
4. Print the returned result.

For competitive programming:

* Paste inside GeeksforGeeks editor
* Submit directly

---

## Notes & Optimizations

* Sorting is mandatory.
* Without sorting, comparison logic will fail.
* If input size is very large (10^5), this solution still works efficiently.
* No need for extra memory structures like priority queues.

This is the most optimal and clean solution for this problem.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
