# The Painter's Partition Problem-II

---

## Table of Contents

1. Problem Summary
2. Constraints
3. Intuition
4. Approach
5. Data Structures Used
6. Operations & Behavior Summary
7. Complexity
8. Multi-language Solutions
9. Step-by-step Detailed Explanation
10. Examples
11. How to use / Run locally
12. Notes & Optimizations
13. Author

---

## Problem Summary

Given an array `arr[]` where each element represents the length of a board, and an integer `k` representing the number of painters.

Each painter:

* Takes 1 unit of time to paint 1 unit length.
* Can only paint contiguous boards.

I need to find the minimum time required to paint all boards.

The goal is to minimize the maximum time taken by any painter.

---

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 1 ≤ arr[i] ≤ 10^4
* 1 ≤ k ≤ 10^5

---

## Intuition

When I first saw the problem, I noticed something important.

Every painter must paint contiguous boards. That means I cannot split a board or rearrange them.

So I started thinking like this:

If I assume some time T, can I distribute the boards among at most k painters such that no painter paints more than T total length?

If yes, then maybe I can try smaller time.
If no, then I must increase the time.

This clearly tells me that the answer lies in a range.

Minimum possible time = maximum board length.
Maximum possible time = sum of all board lengths.

So I realized this is a Binary Search on Answer problem.

---

## Approach

Step 1: Define Search Space

* low = max(arr)
* high = sum(arr)

Step 2: Apply Binary Search

While low <= high:

* Find mid.
* Check if mid is a valid maximum time.

Step 3: Feasibility Check

I simulate the painting process:

* Start with first painter.
* Keep adding board lengths.
* If adding next board exceeds mid:

  * Assign a new painter.
* Count total painters used.

If painters used <= k → mid is valid.
Try smaller value.

Else → increase mid.

Step 4: Return minimum valid time.

---

## Data Structures Used

* Simple variables for tracking sum and painter count.
* No extra arrays or complex structures.

Space is constant.

---

## Operations & Behavior Summary

1. Compute maximum board length.
2. Compute total sum.
3. Perform binary search.
4. For each mid value:

   * Traverse array once.
   * Count painters required.
5. Update answer accordingly.

---

## Complexity

Time Complexity: O(n log S)

* n = number of boards
* S = sum of all board lengths
* Binary search runs log S times
* Each check takes O(n)

Space Complexity: O(1)

* Only few variables used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:

    bool isPossible(vector<int>& arr, int k, long long maxTime) {
        long long currentSum = 0;
        int painters = 1;

        for(int i = 0; i < arr.size(); i++) {
            if(arr[i] > maxTime) return false;

            if(currentSum + arr[i] <= maxTime) {
                currentSum += arr[i];
            } else {
                painters++;
                currentSum = arr[i];
            }
        }

        return painters <= k;
    }

    int minTime(vector<int>& arr, int k) {
        long long low = 0, high = 0;

        for(int x : arr) {
            low = max(low, (long long)x);
            high += x;
        }

        long long ans = high;

        while(low <= high) {
            long long mid = low + (high - low) / 2;

            if(isPossible(arr, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
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

    private boolean isPossible(int[] arr, int k, long maxTime) {
        long currentSum = 0;
        int painters = 1;

        for(int i = 0; i < arr.length; i++) {
            if(arr[i] > maxTime) return false;

            if(currentSum + arr[i] <= maxTime) {
                currentSum += arr[i];
            } else {
                painters++;
                currentSum = arr[i];
            }
        }

        return painters <= k;
    }

    public int minTime(int[] arr, int k) {
        long low = 0, high = 0;

        for(int x : arr) {
            low = Math.max(low, x);
            high += x;
        }

        long ans = high;

        while(low <= high) {
            long mid = low + (high - low) / 2;

            if(isPossible(arr, k, mid)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
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

    isPossible(arr, k, maxTime) {
        let currentSum = 0;
        let painters = 1;

        for(let i = 0; i < arr.length; i++) {
            if(arr[i] > maxTime) return false;

            if(currentSum + arr[i] <= maxTime) {
                currentSum += arr[i];
            } else {
                painters++;
                currentSum = arr[i];
            }
        }

        return painters <= k;
    }

    minTime(arr, k) {
        let low = 0, high = 0;

        for(let x of arr) {
            low = Math.max(low, x);
            high += x;
        }

        let ans = high;

        while(low <= high) {
            let mid = Math.floor(low + (high - low) / 2);

            if(this.isPossible(arr, k, mid)) {
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

    def isPossible(self, arr, k, maxTime):
        currentSum = 0
        painters = 1

        for length in arr:
            if length > maxTime:
                return False

            if currentSum + length <= maxTime:
                currentSum += length
            else:
                painters += 1
                currentSum = length

        return painters <= k

    def minTime(self, arr, k):
        low = max(arr)
        high = sum(arr)
        ans = high

        while low <= high:
            mid = (low + high) // 2

            if self.isPossible(arr, k, mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. First, I calculate the maximum board length. That becomes my lower bound.
2. Then I calculate total sum of boards. That becomes my upper bound.
3. I run binary search between these two values.
4. For each mid value, I simulate painting.
5. I keep adding board lengths to current painter.
6. If limit exceeds mid, I increase painter count.
7. If painters required is within k, I try smaller value.
8. Otherwise, I increase search range.
9. Finally, I return the minimum valid mid.

---

## Examples

Input:
arr = [5, 10, 30, 20, 15]
k = 3

Output:
35

Explanation:
Painter 1 → 5 + 10 = 15
Painter 2 → 30 = 30
Painter 3 → 20 + 15 = 35
Maximum = 35

---

## How to use / Run locally

1. Copy the code into your preferred language file.
2. Create main function and call minTime(arr, k).
3. Compile and run.

Example in C++:

```
g++ solution.cpp
./a.out
```

---

## Notes & Optimizations

* Always use long long or long for sum to avoid overflow.
* Binary search is much faster than brute force partition.
* This pattern is useful for partition and allocation problems.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
