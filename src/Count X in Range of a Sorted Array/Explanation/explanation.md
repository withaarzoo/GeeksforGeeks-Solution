# Count X in Range of a Sorted Array

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

I am given:

* A **sorted array** `arr`
* A list of queries where each query is `[l, r, x]`

For every query, my task is to count how many times the number `x` appears in the subarray `arr[l…r]` (inclusive).

The array is already sorted, which is the most important clue in this problem.

---

## Constraints

* `1 ≤ arr.size(), queries.size() ≤ 10^5`
* `1 ≤ arr[i], x ≤ 10^6`
* `0 ≤ l ≤ r < arr.size()`
* The array is **sorted in non-decreasing order**

---

## Intuition

When I saw that the array is sorted, I immediately knew I should not use a normal loop for every query.

I thought:

* In a sorted array, all occurrences of a value are together.
* If I can find the **first** and **last** position of `x` in the given range, I can get the count easily.
* Binary search is perfect for this because it works fast on sorted data.

So instead of checking every element, I decided to use **binary search twice** for each query.

---

## Approach

1. For each query `[l, r, x]`, I work only inside that range.
2. I use binary search to find:

   * the **first occurrence** of `x`
   * the **last occurrence** of `x`
3. If `x` is not found, the answer is `0`.
4. Otherwise, the count is:

   ```
   lastIndex - firstIndex + 1
   ```

5. I repeat this process for all queries and store the results.

This makes the solution fast and scalable.

---

## Data Structures Used

* Array / Vector (input array)
* List / Vector (to store answers)
* No extra data structure is required

---

## Operations & Behavior Summary

* Binary search is applied only within `[l, r]`
* Two searches per query:

  * left boundary search
  * right boundary search
* Each query works independently
* No modification of the original array

---

## Complexity

**Time Complexity:**
`O(q log n)`

* `q` = number of queries
* `log n` = binary search on sorted array

**Space Complexity:**
`O(1)` extra space
(only variables, no additional memory used)

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int firstOccurrence(vector<int>& arr, int l, int r, int x) {
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == x) {
                ans = mid;
                r = mid - 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    int lastOccurrence(vector<int>& arr, int l, int r, int x) {
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == x) {
                ans = mid;
                l = mid + 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    vector<int> countXInRange(vector<int>& arr, vector<vector<int>>& queries) {
        vector<int> result;
        for (auto& q : queries) {
            int l = q[0], r = q[1], x = q[2];
            int first = firstOccurrence(arr, l, r, x);
            if (first == -1) {
                result.push_back(0);
                continue;
            }
            int last = lastOccurrence(arr, l, r, x);
            result.push_back(last - first + 1);
        }
        return result;
    }
};
```

---

### Java

```java
class Solution {

    int firstOccurrence(int[] arr, int l, int r, int x) {
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == x) {
                ans = mid;
                r = mid - 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    int lastOccurrence(int[] arr, int l, int r, int x) {
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == x) {
                ans = mid;
                l = mid + 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    public ArrayList<Integer> countXInRange(int[] arr, int[][] queries) {
        ArrayList<Integer> result = new ArrayList<>();
        for (int[] q : queries) {
            int l = q[0], r = q[1], x = q[2];
            int first = firstOccurrence(arr, l, r, x);
            if (first == -1) {
                result.add(0);
                continue;
            }
            int last = lastOccurrence(arr, l, r, x);
            result.add(last - first + 1);
        }
        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {

    firstOccurrence(arr, l, r, x) {
        let ans = -1;
        while (l <= r) {
            let mid = Math.floor(l + (r - l) / 2);
            if (arr[mid] === x) {
                ans = mid;
                r = mid - 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    lastOccurrence(arr, l, r, x) {
        let ans = -1;
        while (l <= r) {
            let mid = Math.floor(l + (r - l) / 2);
            if (arr[mid] === x) {
                ans = mid;
                l = mid + 1;
            } else if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }

    countXInRange(arr, queries) {
        let result = [];
        for (let [l, r, x] of queries) {
            let first = this.firstOccurrence(arr, l, r, x);
            if (first === -1) {
                result.push(0);
                continue;
            }
            let last = this.lastOccurrence(arr, l, r, x);
            result.push(last - first + 1);
        }
        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def firstOccurrence(self, arr, l, r, x):
        ans = -1
        while l <= r:
            mid = l + (r - l) // 2
            if arr[mid] == x:
                ans = mid
                r = mid - 1
            elif arr[mid] < x:
                l = mid + 1
            else:
                r = mid - 1
        return ans

    def lastOccurrence(self, arr, l, r, x):
        ans = -1
        while l <= r:
            mid = l + (r - l) // 2
            if arr[mid] == x:
                ans = mid
                l = mid + 1
            elif arr[mid] < x:
                l = mid + 1
            else:
                r = mid - 1
        return ans

    def countXInRange(self, arr, queries):
        result = []
        for l, r, x in queries:
            first = self.firstOccurrence(arr, l, r, x)
            if first == -1:
                result.append(0)
                continue
            last = self.lastOccurrence(arr, l, r, x)
            result.append(last - first + 1)
        return result
```

---

## Step-by-step Detailed Explanation

1. I used binary search because the array is sorted.
2. First binary search finds the leftmost index of `x`.
3. Second binary search finds the rightmost index of `x`.
4. If `x` does not exist, I return `0`.
5. Otherwise, I calculate the total count using index difference.

This avoids unnecessary loops and keeps performance high.

---

## Examples

**Input**
`arr = [1,2,2,4,5,5,5,8]`
`queries = [[0,7,5],[1,2,2],[0,3,7]]`

**Output**
`[3,2,0]`

---

## How to Use / Run Locally

1. Copy the solution for your language
2. Paste it into your compiler or IDE
3. Provide input using driver code (as per platform)
4. Run and verify output

---

## Notes & Optimizations

* This solution is optimal for large inputs.
* Avoids brute force completely.
* Works perfectly because the array is sorted.
* Can be extended for similar range-count problems.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
