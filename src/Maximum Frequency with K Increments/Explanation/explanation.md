# Maximum Frequency with K Increments

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

You are given an integer array `arr` and an integer `k`.  
In one operation you can pick any index and increase the value at that index by 1.  

The goal is to find the highest frequency any single number can reach after you perform at most `k` such operations.  

In simple words: make as many elements as possible equal to the same value, while spending no more than `k` increments.

## Constraints

- 1 ≤ arr.size() ≤ 10⁵  
- 1 ≤ arr[i] ≤ 10⁶  
- 0 ≤ k ≤ 10⁵  

These limits mean a O(n²) solution will be too slow. We need something closer to O(n log n).

## Intuition

The first thing I noticed is that the final value we try to match will always be one of the numbers already present in the array. There is never a reason to create a brand-new value higher than every existing element.  

Once I realized that, sorting the array made sense. After sorting, numbers that are close to each other sit next to each other, so a contiguous window of the sorted array becomes the natural place to look for the best group of numbers I can turn into the same value.

## Approach

1. Sort the array in non-decreasing order.  
2. Use two pointers (left and right) to maintain a sliding window.  
3. Keep a running sum of the values inside the current window.  
4. For every position of the right pointer, calculate the cost of making every element in the window equal to `arr[right]`.  
   Cost = `arr[right] * window_length - current_sum`.  
5. If the cost exceeds `k`, move the left pointer forward until the cost becomes affordable again.  
6. Track the maximum window length that ever stayed within the budget of `k`. That length is the answer.

This sliding-window technique after sorting gives us an efficient way to check every possible target value.

## Data Structures Used

- The input array itself (sorted in-place).  
- Two integer pointers (`left` and `right`) to mark the current window.  
- A long integer variable to store the running sum of the window (needed to avoid overflow).  

No extra arrays or maps are required, which keeps the extra space constant.

## Operations & Behavior Summary

- Sort the array so smaller numbers come before larger ones.  
- Expand the right end of the window one element at a time.  
- Add the newly included value to the running sum.  
- While the cost of turning the whole window into the rightmost value is greater than `k`, shrink the window from the left and subtract the removed value from the sum.  
- After the window is valid, record its size if it is the largest seen so far.  
- When the right pointer finishes the array, the recorded maximum size is the highest frequency achievable with at most `k` increments.

## Complexity

| Type              | Complexity   | Explanation |
|-------------------|--------------|-------------|
| Time Complexity   | O(n log n)   | Sorting dominates. The sliding-window pass is linear. |
| Space Complexity  | O(1)         | Only a few variables are used besides the input array (which can be sorted in place). |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int maxFrequency(vector<int>& arr, int k) {
        sort(arr.begin(), arr.end());
        long long sum = 0;
        int left = 0, ans = 1;
        for (int right = 0; right < arr.size(); right++) {
            sum += arr[right];
            while ((long long)arr[right] * (right - left + 1) - sum > k) {
                sum -= arr[left];
                left++;
            }
            ans = max(ans, right - left + 1);
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int maxFrequency(int[] arr, int k) {
        Arrays.sort(arr);
        long sum = 0;
        int left = 0, ans = 1;
        for (int right = 0; right < arr.length; right++) {
            sum += arr[right];
            while ((long) arr[right] * (right - left + 1) - sum > k) {
                sum -= arr[left];
                left++;
            }
            ans = Math.max(ans, right - left + 1);
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
    maxFrequency(arr, k) {
        arr.sort((a, b) => a - b);
        let sum = 0;
        let left = 0;
        let ans = 1;
        for (let right = 0; right < arr.length; right++) {
            sum += arr[right];
            while (arr[right] * (right - left + 1) - sum > k) {
                sum -= arr[left];
                left++;
            }
            ans = Math.max(ans, right - left + 1);
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def maxFrequency(self, arr, k):
        arr.sort()
        sum_ = 0
        left = 0
        ans = 1
        for right in range(len(arr)):
            sum_ += arr[right]
            while arr[right] * (right - left + 1) - sum_ > k:
                sum_ -= arr[left]
                left += 1
            ans = max(ans, right - left + 1)
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

First the array is sorted. After sorting we know that any useful window will be a contiguous segment.

We start with both pointers at the beginning and a sum of zero.  
Every time the right pointer moves, we add the new element to the sum.  

Now we ask: “How many increments do I need to make every number from left to right equal to the value at right?”  
That cost is simply the target value times the number of elements minus the current sum.  

If the cost is larger than `k`, the window is too expensive. We keep removing the leftmost element (subtract it from the sum and move left forward) until the cost drops to `k` or less.  

Once the window is affordable we update the answer with its length.  

Because the array is sorted, the rightmost value is always the largest in the window, so it is the only sensible target.  

Edge cases are handled automatically:  
- When `k` is zero the window never grows beyond numbers that are already equal.  
- When the whole array can be made equal the answer becomes `n`.  
- Integer overflow is avoided by using 64-bit integers for the sum and the cost calculation.

## Examples

**Example 1**  
Input: `arr = [2, 2, 4]`, `k = 4`  
After sorting the array stays `[2, 2, 4]`.  
Window `[2, 2]` costs 0.  
Window `[2, 2, 4]` costs `(4*3) - 8 = 4`, which equals `k`.  
Maximum frequency = 3.

**Example 2**  
Input: `arr = [7, 7, 7, 7]`, `k = 5`  
Everything is already equal, so the whole array is a valid window of size 4 with cost 0.  
Answer = 4.

**Example 3**  
Input: `arr = [1, 4, 8, 13]`, `k = 5`  
Possible windows:  
- `[1, 4]` costs 3  
- `[4, 8]` costs 4  
- `[1, 4, 8]` costs 11 > 5, so shrink  
- `[8, 13]` costs 5  
Largest affordable window has size 2.

## How to Use / Run Locally

**C++**  
1. Copy the code into a file named `main.cpp`.  
2. Compile: `g++ -std=c++17 main.cpp -o main`  
3. Run: `./main`  
You will need to add a small driver that reads the array and `k` and prints the result.

**Java**  
1. Put the code inside a class file `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run with a main method that creates an instance and calls `maxFrequency`.

**JavaScript**  
1. Save the code as `solution.js`.  
2. Run with Node: `node solution.js`  
Add a few console.log statements to test the function.

**Python3**  
1. Save as `solution.py`.  
2. Run: `python3 solution.py`  
Include a simple test harness that calls the method and prints the answer.

## Notes & Optimizations

- The solution assumes the array can be modified (sorted in place). If the original order must be preserved, make a copy first.  
- Using 64-bit integers for the sum is mandatory; otherwise the cost calculation overflows for large values.  
- An alternative binary-search-on-answer approach also works but is usually slower in practice and needs more careful implementation.  
- The sliding-window method is optimal under the given constraints and matches the expected O(n log n) time bound.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)