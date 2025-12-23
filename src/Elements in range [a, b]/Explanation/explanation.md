# Elements in Range [a, b]

---

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

I am given:

* An **unsorted array** `arr[]`
* A list of **queries**, where each query is `[a, b]`

For **each query**, I have to **count how many elements in the array lie in the range [a, b]**
That means counting elements `x` such that:

```
a ≤ x ≤ b
```

Finally, I return a list where each value is the answer of its corresponding query.

---

## Constraints

* `1 ≤ arr.size(), queries.size() ≤ 10⁵`
* `0 ≤ arr[i] ≤ 10⁶`
* `0 ≤ queries[i][0] ≤ queries[i][1] ≤ 10⁶`

These constraints tell me that a **brute-force solution will not work**.

---

## Intuition

When I first looked at the problem, I noticed two important things:

1. The array is **unsorted**
2. The number of queries can be **very large**

If I check the full array for every query, the solution becomes too slow.

So I thought:

> If I sort the array once, I can use **binary search** for every query.

After sorting:

* I can quickly find how many numbers are `≤ b`
* I can quickly find how many numbers are `< a`

The difference of these two gives me the count of elements in `[a, b]`.

This idea makes the solution **fast, clean, and scalable**.

---

## Approach

1. Sort the array `arr`
2. For each query `[a, b]`:

   * Find the first index where value is **≥ a** (lower bound)
   * Find the first index where value is **> b** (upper bound)
3. Subtract both indices:

   ```
   count = upperBound(b) - lowerBound(a)
   ```

4. Store the count for each query and return the result

---

## Data Structures Used

* Array (for storing input and sorted data)
* List / Vector / ArrayList (for storing results)
* No extra heavy data structures are required

---

## Operations & Behavior Summary

| Operation   | Purpose                      |
| ----------- | ---------------------------- |
| Sorting     | Makes binary search possible |
| Lower Bound | Finds start of valid range   |
| Upper Bound | Finds end of valid range     |
| Subtraction | Gives total count in range   |

---

## Complexity

* **Time Complexity:**

  * Sorting array → `O(n log n)`
  * Each query → `O(log n)`
  * Total → `O(n log n + q log n)`

* **Space Complexity:**

  * `O(1)` extra space (in-place sorting)

Where:

* `n` = size of array
* `q` = number of queries

---

## Multi-language Solutions

---

### C++

```cpp
class Solution {
  public:
    vector<int> cntInRange(vector<int> &arr, vector<vector<int>> &queries) {
        sort(arr.begin(), arr.end());
        vector<int> ans;

        for (auto &q : queries) {
            int a = q[0], b = q[1];
            int left = lower_bound(arr.begin(), arr.end(), a) - arr.begin();
            int right = upper_bound(arr.begin(), arr.end(), b) - arr.begin();
            ans.push_back(right - left);
        }
        return ans;
    }
};
```

---

### Java

```java
class Solution {
    public ArrayList<Integer> cntInRange(int[] arr, int[][] queries) {
        Arrays.sort(arr);
        ArrayList<Integer> result = new ArrayList<>();

        for (int[] q : queries) {
            int a = q[0], b = q[1];
            int left = lowerBound(arr, a);
            int right = upperBound(arr, b);
            result.add(right - left);
        }
        return result;
    }

    int lowerBound(int[] arr, int target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] < target) l = mid + 1;
            else r = mid;
        }
        return l;
    }

    int upperBound(int[] arr, int target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] <= target) l = mid + 1;
            else r = mid;
        }
        return l;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    cntInRange(arr, queries) {
        arr.sort((a, b) => a - b);
        let res = [];

        for (let [a, b] of queries) {
            let left = this.lowerBound(arr, a);
            let right = this.upperBound(arr, b);
            res.push(right - left);
        }
        return res;
    }

    lowerBound(arr, target) {
        let l = 0, r = arr.length;
        while (l < r) {
            let mid = Math.floor((l + r) / 2);
            if (arr[mid] < target) l = mid + 1;
            else r = mid;
        }
        return l;
    }

    upperBound(arr, target) {
        let l = 0, r = arr.length;
        while (l < r) {
            let mid = Math.floor((l + r) / 2);
            if (arr[mid] <= target) l = mid + 1;
            else r = mid;
        }
        return l;
    }
}
```

---

### Python3

```python
class Solution:
    def cntInRange(self, arr, queries):
        arr.sort()
        ans = []

        for a, b in queries:
            left = self.lower_bound(arr, a)
            right = self.upper_bound(arr, b)
            ans.append(right - left)

        return ans

    def lower_bound(self, arr, target):
        l, r = 0, len(arr)
        while l < r:
            mid = (l + r) // 2
            if arr[mid] < target:
                l = mid + 1
            else:
                r = mid
        return l

    def upper_bound(self, arr, target):
        l, r = 0, len(arr)
        while l < r:
            mid = (l + r) // 2
            if arr[mid] <= target:
                l = mid + 1
            else:
                r = mid
        return l
```

---

## Step-by-step Detailed Explanation (All Languages)

1. I sort the array first.
2. For every query `[a, b]`:

   * I find where values start being ≥ `a`
   * I find where values become > `b`
3. All valid elements lie between these two positions.
4. Subtracting the positions gives the count.
5. I repeat this for all queries.

Binary search makes this process very fast.

---

## Examples

**Input**

```
arr = [1, 4, 2, 8, 5]
queries = [[1,4], [3,6], [0,10]]
```

**Output**

```
[3, 2, 5]
```

---

## How to use / Run locally

1. Clone the repository
2. Open the file in your preferred language
3. Compile / Run using standard compiler or interpreter

Example (C++):

```
g++ solution.cpp
./a.out
```

---

## Notes & Optimizations

* Sorting once is better than checking array repeatedly
* Binary search ensures logarithmic time per query
* Works efficiently even for maximum constraints

---

## Author

* **Md Aarzoo Islam**
  *[https://bento.me/withaarzoo](https://bento.me/withaarzoo)*
