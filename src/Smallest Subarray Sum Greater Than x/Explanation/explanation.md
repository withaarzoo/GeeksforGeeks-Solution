# Smallest Subarray Sum Greater Than x - GeeksforGeeks Solution

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You are given a positive integer `x` and an array of non-negative integers. Your task is to find the length of the smallest contiguous subarray whose sum is strictly greater than `x`.

If no such subarray exists, return 0.

This is a classic sliding window problem that appears frequently in competitive programming contests and coding interviews. The goal is to return the minimum length of a subarray that satisfies the sum condition.

## Constraints

- 1 ≤ x, arr.size() ≤ 10⁵
- 0 ≤ arr[i] ≤ 10⁴

These constraints mean a brute-force O(n²) solution will time out. An efficient O(n) approach is required.

## Intuition

The array contains only non-negative numbers. That single observation changes everything.

When every element is ≥ 0, adding an element to a window can never decrease the sum. Removing an element from the left can never increase the sum. This property lets us use two pointers that only move forward.

I start with a window that grows from the right. As soon as the window sum exceeds `x`, I try to shrink it from the left while the sum stays greater than `x`. The smallest valid window length seen during this process is the answer.

## Approach

1. Initialize two pointers (`left` and `right`) at the start of the array.
2. Keep a running sum of the current window and a variable that tracks the smallest length found so far.
3. Move the right pointer one step at a time and add the new element to the sum.
4. Whenever the current sum becomes greater than `x`, repeatedly shrink the window from the left:
   - Record the current window length if it is smaller than the best length seen so far.
   - Subtract the leftmost element and move the left pointer forward.
5. After the entire array has been processed, check whether a valid window was ever found. If not, return 0; otherwise return the smallest length recorded.

This two-pointer technique guarantees that every element is added and removed at most once, giving linear time.

## Data Structures Used

- Two integer pointers (`left` and `right`) to mark the current window boundaries.
- A single long/integer variable to store the running window sum.
- One integer variable to keep the minimum length found.

No extra arrays, maps, or queues are required. Constant extra space is enough.

## Operations & Behavior Summary

- Expand the window by moving the right pointer and adding arr[right] to the sum.
- When sum > x, update the answer with the current window size.
- Shrink the window from the left by subtracting arr[left] and advancing left, as long as the sum remains greater than x.
- After the right pointer reaches the end, return the minimum length recorded (or 0 if none was recorded).

The algorithm never revisits earlier elements, which is why it stays O(n).

## Complexity

| Complexity       | Value | Explanation |
|------------------|-------|-------------|
| Time Complexity  | O(n)  | Both pointers move at most n times. Each element is processed a constant number of times. |
| Space Complexity | O(1)  | Only a handful of integer variables are used. No additional data structures grow with input size. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int smallestSubWithSum(vector<int>& arr, int x) {
        int n = arr.size();
        int left = 0;
        long long sum = 0;
        int minLen = n + 1;
        for (int right = 0; right < n; right++) {
            sum += arr[right];
            while (sum > x && left <= right) {
                minLen = min(minLen, right - left + 1);
                sum -= arr[left];
                left++;
            }
        }
        return (minLen == n + 1) ? 0 : minLen;
    }
};
```

### Java
```java
class Solution {
    public int smallestSubWithSum(int[] arr, int x) {
        int n = arr.length;
        int left = 0;
        long sum = 0;
        int minLen = n + 1;
        for (int right = 0; right < n; right++) {
            sum += arr[right];
            while (sum > x && left <= right) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= arr[left];
                left++;
            }
        }
        return (minLen == n + 1) ? 0 : minLen;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @param {number} x
 * @return {number}
 */

class Solution {
    smallestSubWithSum(arr, x) {
        let n = arr.length;
        let left = 0;
        let sum = 0;
        let minLen = n + 1;
        for (let right = 0; right < n; right++) {
            sum += arr[right];
            while (sum > x && left <= right) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= arr[left];
                left++;
            }
        }
        return (minLen === n + 1) ? 0 : minLen;
    }
}
```

### Python3
```python
class Solution:
    def smallestSubWithSum(self, arr, x):
        n = len(arr)
        left = 0
        sum = 0
        minLen = n + 1
        for right in range(n):
            sum += arr[right]
            while sum > x and left <= right:
                minLen = min(minLen, right - left + 1)
                sum -= arr[left]
                left += 1
        return 0 if minLen == n + 1 else minLen
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the exact same logic. The only differences are language syntax and how integer overflow is handled (C++ and Java use `long long` / `long` for the sum).

- Start by storing the array length in `n`.
- Set `left = 0`, `sum = 0`, and `minLen = n + 1`. Using `n + 1` as the initial value makes it easy to detect later that no valid window was found.
- Loop `right` from 0 to n-1. Add `arr[right]` to the running sum.
- Enter a while loop as long as `sum > x` and `left ≤ right`. Inside the loop:
  - Update `minLen` with the current window length `right - left + 1`.
  - Subtract `arr[left]` from the sum.
  - Increment `left`.
- After the outer loop finishes, check whether `minLen` is still equal to `n + 1`. If it is, return 0; otherwise return `minLen`.

Edge cases handled automatically:
- Empty array or all zeros → returns 0.
- Single element greater than x → returns 1.
- Entire array sum ≤ x → returns 0.

Because the left pointer only moves forward, the total number of operations stays linear in every language.

## Examples

**Example 1**  
Input: x = 51, arr = [1, 4, 45, 6, 0, 19]  
Output: 3  

Trace:  
- Window [1, 4, 45] sum = 50 (not greater)  
- Window [1, 4, 45, 6] sum = 56 → shrink to [4, 45, 6] sum = 55, length 3  
- Later windows are longer, so answer stays 3.

**Example 2**  
Input: x = 100, arr = [1, 10, 5, 2, 7]  
Output: 0  

Trace:  
Total sum of the whole array is 25, which is less than 100. No window ever satisfies the condition, so the answer is 0.

**Example 3**  
Input: x = 15, arr = [5, 10, 15, 20]  
Output: 1  

Trace:  
When right reaches index 2, sum becomes 30. Shrinking leaves the single element 15, which is already greater than 15? Wait – 15 is not strictly greater. Continuing, the next element 20 alone is greater than 15, so length 1 is recorded.

## How to Use / Run Locally

**C++**  
```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

**Java**  
```bash
javac Solution.java
java Solution
```

**JavaScript**  
```bash
node solution.js
```

**Python3**  
```bash
python3 solution.py
```

Replace the empty function bodies with the code you want to test, add a simple main/driver that reads input, and run the commands above.

## Notes & Optimizations

- The solution relies on the fact that all array elements are non-negative. If negative numbers were allowed, the sliding-window approach would break and a different technique (prefix sums + binary search or segment tree) would be needed.
- Using a 64-bit integer for the running sum avoids overflow when n and arr[i] are both at their upper limits.
- The same idea can be extended to find the smallest subarray with sum ≥ k or sum exactly equal to k by adjusting the comparison and adding a hash map when necessary.
- Because both pointers only move forward, the algorithm is optimal for this constraint set.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
