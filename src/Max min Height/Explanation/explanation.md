# Max Min Height

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

We are given an array `arr[]` where each element represents the height of a flower.

We can water exactly `w` continuous flowers in one day.
Each watering increases the height of those flowers by 1.
We can do this for `k` days.

Our goal is to **maximize the minimum height** of all flowers after `k` days.

---

## Constraints

* 1 ≤ n ≤ 10^5
* 1 ≤ w ≤ n
* 1 ≤ k ≤ 10^5
* 1 ≤ arr[i] ≤ 10^9

---

## Intuition

When I first read the problem, I realized something important.

I do not need to maximize total height.
I only care about maximizing the **minimum** height.

So instead of trying all watering combinations, I thought:

What if I guess a minimum height value `X`?
Can I make all flowers at least height `X` within `k` operations?

If yes, maybe I can try a bigger value.
If no, I should try a smaller value.

That immediately tells me this is a **Binary Search on Answer** problem.

---

## Approach

Step 1
Find the current minimum height.

Step 2
Binary search between:

* low = minimum height
* high = minimum height + k

Step 3
For each mid value:
Check if we can make all flowers ≥ mid.

To check efficiently:

* Traverse from left to right
* Keep track of added water using a difference array
* If current height is less than mid

  * Calculate how much is needed
  * Apply increment to next w flowers
  * Count operations
  * If operations exceed k → return false

Step 4
If possible, move right in binary search.
Otherwise move left.

Finally return the maximum valid mid.

---

## Data Structures Used

* Difference Array (to simulate range increments efficiently)
* Variables to track cumulative additions

---

## Operations & Behavior Summary

* Binary Search on possible minimum height
* Greedy left-to-right adjustment
* Efficient range increment simulation
* Stop early if operations exceed k

---

## Complexity

**Time Complexity:** O(n log k)

* n = number of flowers
* Binary search runs log k times
* Each check runs in O(n)

**Space Complexity:** O(n)

* For difference array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool canMake(vector<int> &arr, int n, int k, int w, long long target) {
        vector<long long> diff(n + 1, 0);
        long long currAdd = 0;
        long long operations = 0;

        for(int i = 0; i < n; i++) {
            currAdd += diff[i];
            long long currentHeight = arr[i] + currAdd;

            if(currentHeight < target) {
                long long need = target - currentHeight;
                operations += need;
                if(operations > k) return false;

                currAdd += need;
                if(i + w < n)
                    diff[i + w] -= need;
            }
        }
        return true;
    }

    int maxMinHeight(vector<int> &arr, int k, int w) {
        int n = arr.size();
        int minVal = *min_element(arr.begin(), arr.end());

        long long low = minVal;
        long long high = minVal + k;
        long long ans = minVal;

        while(low <= high) {
            long long mid = (low + high) / 2;

            if(canMake(arr, n, k, w, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return (int)ans;
    }
};
```

---

### Java

```java
class Solution {

    private boolean canMake(int[] arr, int n, int k, int w, long target) {
        long[] diff = new long[n + 1];
        long currAdd = 0;
        long operations = 0;

        for(int i = 0; i < n; i++) {
            currAdd += diff[i];
            long currentHeight = arr[i] + currAdd;

            if(currentHeight < target) {
                long need = target - currentHeight;
                operations += need;
                if(operations > k) return false;

                currAdd += need;
                if(i + w < n)
                    diff[i + w] -= need;
            }
        }
        return true;
    }

    public int maxMinHeight(int[] arr, int k, int w) {
        int n = arr.length;
        int minVal = Integer.MAX_VALUE;
        for(int val : arr) minVal = Math.min(minVal, val);

        long low = minVal;
        long high = minVal + k;
        long ans = minVal;

        while(low <= high) {
            long mid = (low + high) / 2;

            if(canMake(arr, n, k, w, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return (int)ans;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    canMake(arr, n, k, w, target) {
        let diff = new Array(n + 1).fill(0);
        let currAdd = 0;
        let operations = 0;

        for(let i = 0; i < n; i++) {
            currAdd += diff[i];
            let currentHeight = arr[i] + currAdd;

            if(currentHeight < target) {
                let need = target - currentHeight;
                operations += need;
                if(operations > k) return false;

                currAdd += need;
                if(i + w < n)
                    diff[i + w] -= need;
            }
        }
        return true;
    }

    maxMinHeight(arr, k, w) {
        let n = arr.length;
        let minVal = Math.min(...arr);

        let low = minVal;
        let high = minVal + k;
        let ans = minVal;

        while(low <= high) {
            let mid = Math.floor((low + high) / 2);

            if(this.canMake(arr, n, k, w, mid)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}
```

---

### Python3

```python
class Solution():
    def canMake(self, arr, n, k, w, target):
        diff = [0] * (n + 1)
        currAdd = 0
        operations = 0

        for i in range(n):
            currAdd += diff[i]
            currentHeight = arr[i] + currAdd

            if currentHeight < target:
                need = target - currentHeight
                operations += need
                if operations > k:
                    return False

                currAdd += need
                if i + w < n:
                    diff[i + w] -= need
        return True

    def maxMinHeight(self, arr, k, w):
        n = len(arr)
        minVal = min(arr)

        low = minVal
        high = minVal + k
        ans = minVal

        while low <= high:
            mid = (low + high) // 2

            if self.canMake(arr, n, k, w, mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans
```

---

## Step-by-step Detailed Explanation

1. Start binary search on possible minimum height.
2. For each mid value, check feasibility.
3. Traverse from left to right.
4. Maintain cumulative increment using diff array.
5. If height < target, calculate needed increment.
6. Apply increment to next w elements.
7. Stop early if operations exceed k.
8. Adjust binary search range accordingly.
9. Final answer is maximum feasible mid.

---

## Examples

Example 1

Input
arr = [2, 3, 4, 5, 1]
k = 2
w = 2

Output
2

Example 2

Input
arr = [5, 8]
k = 5
w = 1

Output
9

---

## How to use / Run locally

1. Copy the solution code.
2. Paste inside your compiler or IDE.
3. Provide input values.
4. Run and verify output.

For C++

```bash
g++ file.cpp -o output
./output
```

For Java

```bash
javac Solution.java
java Solution
```

For Python

```bash
python file.py
```

---

## Notes & Optimizations

* Always use long long in C++ and long in Java to avoid overflow.
* Difference array avoids O(n*w) complexity.
* Early stopping improves efficiency.
* Binary search ensures optimal performance.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
