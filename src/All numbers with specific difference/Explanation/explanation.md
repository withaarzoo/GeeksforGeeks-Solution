# All Numbers with Specific Difference

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

Given two positive integers `n` and `d`, I need to count how many positive numbers less than or equal to `n` satisfy this condition:

```bash
number - sum_of_digits(number) >= d
```

In simple words, I must find how many numbers up to `n` have a difference between the number and the sum of its digits greater than or equal to `d`.

---

## Constraints

* 1 ≤ n ≤ 10^9
* 1 ≤ d ≤ 10^9

Since `n` can go up to one billion, I cannot check every number one by one.

---

## Intuition

When I first saw this problem, I thought about how the expression behaves:

```bash
x - sum_of_digits(x)
```

As `x` increases, the value of `x` increases much faster than the sum of its digits.

So this function is monotonic in nature. That means once the condition becomes true for some number `L`, it will remain true for all numbers greater than `L`.

That idea immediately made me think of Binary Search.

Instead of checking all numbers from 1 to n, I can:

1. Find the smallest number `L` such that
   `L - sum_of_digits(L) >= d`
2. Then all numbers from `L` to `n` will satisfy the condition.
3. Final answer becomes:
   `n - L + 1`

---

## Approach

Here is how I solved it step by step:

1. I wrote a helper function to compute the sum of digits.
2. I applied Binary Search in the range [1, n].
3. For each middle value:

   * Compute `mid - digitSum(mid)`.
   * If it is greater than or equal to `d`, store it as a possible answer.
   * Try to find a smaller valid number.
4. If no valid number is found, return 0.
5. Otherwise return `n - L + 1`.

---

## Data Structures Used

I did not use any extra data structures.

* Only variables for binary search.
* A helper function for digit sum.

So space usage is constant.

---

## Operations & Behavior Summary

* Binary Search reduces the search space by half every step.
* Digit sum takes at most 10 operations (since n ≤ 10^9).
* Once the smallest valid number is found, counting becomes simple arithmetic.

---

## Complexity

### Time Complexity

O(log n × log n)

* Binary search runs in O(log n).
* Digit sum takes O(log n) time.

Since n ≤ 10^9, this is extremely efficient.

### Space Complexity

O(1)

No extra memory is used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    long long digitSum(long long x) {
        long long sum = 0;
        while (x > 0) {
            sum += x % 10;
            x /= 10;
        }
        return sum;
    }
    
    int getCount(int n, int d) {
        long long left = 1, right = n;
        long long ans = -1;
        
        while (left <= right) {
            long long mid = left + (right - left) / 2;
            
            if (mid - digitSum(mid) >= d) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        if (ans == -1) return 0;
        return n - ans + 1;
    }
};
```

### Java

```java
class Solution {
    private long digitSum(long x) {
        long sum = 0;
        while (x > 0) {
            sum += x % 10;
            x /= 10;
        }
        return sum;
    }
    
    public int getCount(int n, int d) {
        long left = 1, right = n;
        long ans = -1;
        
        while (left <= right) {
            long mid = left + (right - left) / 2;
            
            if (mid - digitSum(mid) >= d) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        if (ans == -1) return 0;
        return (int)(n - ans + 1);
    }
}
```

### JavaScript

```javascript
class Solution {
    digitSum(x) {
        let sum = 0;
        while (x > 0) {
            sum += x % 10;
            x = Math.floor(x / 10);
        }
        return sum;
    }
    
    getCount(n, d) {
        let left = 1, right = n;
        let ans = -1;
        
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            
            if (mid - this.digitSum(mid) >= d) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        if (ans === -1) return 0;
        return n - ans + 1;
    }
}
```

### Python3

```python
class Solution:
    def digitSum(self, x):
        total = 0
        while x > 0:
            total += x % 10
            x //= 10
        return total
    
    def getCount(self, n, d):
        left, right = 1, n
        ans = -1
        
        while left <= right:
            mid = (left + right) // 2
            
            if mid - self.digitSum(mid) >= d:
                ans = mid
                right = mid - 1
            else:
                left = mid + 1
        
        if ans == -1:
            return 0
        
        return n - ans + 1
```

---

## Step-by-step Detailed Explanation

1. Start binary search from 1 to n.
2. Pick middle value.
3. Compute digit sum.
4. Check condition.
5. If valid, store answer and search left.
6. If invalid, search right.
7. After loop, compute final count.

This guarantees optimal performance even for large inputs.

---

## Examples

Example 1

Input
n = 13
d = 2

Output
4

Valid numbers are 10, 11, 12, 13.

Example 2

Input
n = 14
d = 3

Output
5

Valid numbers are 10, 11, 12, 13, 14.

---

## How to use / Run locally

1. Copy the solution in your preferred language.
2. Compile and run.
3. Provide input values n and d.
4. Call the getCount function.

---

## Notes & Optimizations

* Always use long type where needed to avoid overflow.
* Binary Search is the key optimization.
* Never try brute force for n up to 10^9.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
