# Koko Eating Bananas

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

Koko is given several piles of bananas.
Each pile has some number of bananas.

Koko has exactly **k hours** to eat all the bananas.

In one hour:

* She can eat from **only one pile**
* She can eat **at most s bananas per hour**

If the pile has:

* More than `s` bananas → she eats exactly `s`
* Less than `s` bananas → she eats the whole pile

My task is to find the **minimum value of `s`** such that Koko can finish all bananas within `k` hours.

---

## Constraints

* 1 ≤ number of piles ≤ 10⁶
* 1 ≤ bananas in each pile ≤ 10⁶
* 1 ≤ k ≤ 10⁶

---

## Intuition

When I read the problem, I noticed one key thing.

If Koko eats **slowly**, she needs **more hours**.
If Koko eats **faster**, she needs **less hours**.

So as eating speed increases, required hours decrease.

This creates a **monotonic pattern**:

* Small speed → not possible
* Big speed → possible

Whenever I see this kind of yes/no pattern with numbers, I immediately think of **Binary Search on Answer**.

---

## Approach

I solved this problem using **Binary Search**.

Step by step:

1. Minimum possible speed = `1`
2. Maximum possible speed = `max(arr)`
3. Pick a middle speed `mid`
4. Calculate how many hours Koko needs at this speed
5. If hours ≤ k

   * speed works
   * try smaller speed
6. Else

   * speed too slow
   * increase speed
7. Continue until binary search ends

The final answer is the **minimum valid speed**.

---

## Data Structures Used

* Array (input only)
* No extra data structures used

---

## Operations & Behavior Summary

* Binary search over eating speed
* For each speed, simulate total hours needed
* Uses ceiling division to calculate hours correctly
* Always moves toward the minimum valid answer

---

## Complexity

**Time Complexity:**
O(n log M)

* `n` = number of piles
* `M` = maximum bananas in a pile

**Space Complexity:**
O(1)

* No extra memory used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int kokoEat(vector<int>& arr, int k) {
        int low = 1;
        int high = *max_element(arr.begin(), arr.end());
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            long long hours = 0;

            for (int bananas : arr) {
                hours += (bananas + mid - 1) / mid;
            }

            if (hours <= k) {
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
    public int kokoEat(int[] arr, int k) {
        int low = 1;
        int high = 0;

        for (int x : arr) high = Math.max(high, x);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            long hours = 0;

            for (int bananas : arr) {
                hours += (bananas + mid - 1) / mid;
            }

            if (hours <= k) {
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

### JavaScript

```javascript
class Solution {
    kokoEat(arr, k) {
        let low = 1;
        let high = Math.max(...arr);
        let ans = high;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            let hours = 0;

            for (let bananas of arr) {
                hours += Math.ceil(bananas / mid);
            }

            if (hours <= k) {
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
    def kokoEat(self, arr, k):
        low = 1
        high = max(arr)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            hours = 0

            for bananas in arr:
                hours += (bananas + mid - 1) // mid

            if hours <= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans
```

---

## Step-by-step Detailed Explanation

1. Start with the lowest and highest possible eating speeds
2. Pick a middle speed using binary search
3. Calculate required hours using ceiling division
4. Check if Koko can finish within `k` hours
5. If yes, try smaller speed
6. If no, increase speed
7. Continue until the smallest valid speed is found

This guarantees correctness and efficiency.

---

## Examples

**Input:**
arr = [5, 10, 3], k = 4

**Output:**
5

**Explanation:**

* 5 → 1 hour
* 10 → 2 hours
* 3 → 1 hour
  Total = 4 hours

---

## How to Use / Run Locally

1. Copy the code for your preferred language
2. Create a file like `solution.cpp`, `Solution.java`, or `solution.py`
3. Compile or run using standard compiler or interpreter
4. Call the `kokoEat` function with input values

---

## Notes & Optimizations

* This problem **cannot** be solved efficiently using brute force
* Binary Search on Answer is the key idea
* Ceiling division is crucial to avoid wrong hour calculation
* Works perfectly for large constraints

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
