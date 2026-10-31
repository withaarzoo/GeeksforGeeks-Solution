# Maximum Packages within Time - GeeksforGeeks Solution

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

A delivery agent needs to deliver packages placed at locations arranged in a straight line. The number of packages at each location is given in an array called `arr`.  

The agent can start at any location but can only visit consecutive locations. Visiting one location takes exactly 1 unit of time.  

Given the array `arr` and an integer `totalTime`, the task is to find the maximum number of packages the agent can deliver without exceeding the given time limit.  

In short, we need the maximum sum of any consecutive segment of houses whose length is at most `totalTime`.

## Constraints

- 1 ≤ arr.size(), totalTime ≤ 10^5
- 0 ≤ arr[i] ≤ 10^3

These constraints mean a linear time solution is required. Anything slower than O(n) will time out.

## Intuition

The first thing I noticed is that the agent can only move to neighboring houses and every house costs the same amount of time. So every valid route is simply a subarray.  

Because all package counts are non-negative, a longer subarray will always give a sum that is greater than or equal to any shorter subarray inside it. Therefore the best answer will always come from a window of the maximum allowed length.  

That maximum length is simply `min(n, totalTime)`. Once I realized this, the problem reduced to finding the maximum sum of any fixed-length subarray of size k.

## Approach

1. Let n be the length of the array and set k = min(n, totalTime).  
2. If k is zero, return 0 immediately.  
3. Compute the sum of the first k elements. This becomes both the current window sum and the initial answer.  
4. Slide a window of size k from left to right.  
   - Add the new element that enters the window.  
   - Subtract the element that leaves the window.  
   - Keep track of the highest sum seen so far.  
5. After the entire array has been processed, the highest sum is the answer.

This is a classic fixed-size sliding window technique that runs in linear time.

## Data Structures Used

- Simple integer variables for the running sum and the maximum answer.  
- No extra arrays or complex data structures are needed. The original array is used directly.

## Operations & Behavior Summary

- Calculate the largest allowed window size k.  
- Build the sum of the first window of size k.  
- Move the window one step at a time across the rest of the array.  
- At every step update the maximum sum found.  
- Return the maximum sum after the last window is processed.

## Complexity

| Type              | Complexity | Explanation                                      |
|-------------------|------------|--------------------------------------------------|
| Time Complexity   | O(n)       | One pass to build the first window + one pass to slide it |
| Space Complexity  | O(1)       | Only a few integer variables are used            |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxPackages(vector<int>& arr, int totalTime) {
        int n = arr.size();
        int k = min(n, totalTime);
        if (k == 0) return 0;
        
        long long sum = 0;
        for (int i = 0; i < k; i++) sum += arr[i];
        long long ans = sum;
        
        for (int i = k; i < n; i++) {
            sum += arr[i] - arr[i - k];
            ans = max(ans, sum);
        }
        return (int)ans;
    }
};
```

### Java

```java
class Solution {
    public int maxPackages(int[] arr, int totalTime) {
        int n = arr.length;
        int k = Math.min(n, totalTime);
        if (k == 0) return 0;
        
        long sum = 0;
        for (int i = 0; i < k; i++) sum += arr[i];
        long ans = sum;
        
        for (int i = k; i < n; i++) {
            sum += arr[i] - arr[i - k];
            ans = Math.max(ans, sum);
        }
        return (int)ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} totalTime
 * @returns {number}
 */
class Solution {
    maxPackages(arr, totalTime) {
        let n = arr.length;
        let k = Math.min(n, totalTime);
        if (k === 0) return 0;
        
        let sum = 0;
        for (let i = 0; i < k; i++) sum += arr[i];
        let ans = sum;
        
        for (let i = k; i < n; i++) {
            sum += arr[i] - arr[i - k];
            ans = Math.max(ans, sum);
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maxPackages(self, arr: list[int], totalTime: int) -> int:
        n = len(arr)
        k = min(n, totalTime)
        if k == 0:
            return 0
        
        s = sum(arr[:k])
        ans = s
        
        for i in range(k, n):
            s += arr[i] - arr[i - k]
            ans = max(ans, s)
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the exact same logic. The only differences are syntax.

First we store the array length in n and compute k as the smaller of n and totalTime. This tells us how many consecutive houses we are allowed to visit.

If k turns out to be zero we return zero because no packages can be collected.

Next we calculate the sum of the first k houses. This value is stored both as the current window sum and as the best answer found so far.

Then a single loop starts from index k and goes to the end of the array. Inside the loop we perform the classic sliding-window update:

- Add the element that is newly entering the window (arr[i])
- Subtract the element that is leaving the window (arr[i - k])

After the update we compare the new window sum with the best answer and keep the larger one.

When the loop finishes, the best answer contains the maximum number of packages that can be collected in any window of length k.

Edge cases such as totalTime being larger than the array size, or the array containing zeros, are handled automatically because of the way k is calculated and because all values are non-negative.

## Examples

**Example 1**  
Input: arr = [2, 1, 3, 5, 0, 1, 4], totalTime = 3  
Output: 9  

Trace:  
k = 3  
First window [2, 1, 3] → sum = 6  
Next window [1, 3, 5] → sum = 9  
Next window [3, 5, 0] → sum = 8  
Next window [5, 0, 1] → sum = 6  
Next window [0, 1, 4] → sum = 5  
Maximum is 9.

**Example 2**  
Input: arr = [1, 6, 2, 5, 3, 4], totalTime = 2  
Output: 8  

Trace:  
k = 2  
Windows: [1,6]=7, [6,2]=8, [2,5]=7, [5,3]=8, [3,4]=7  
Maximum is 8.

**Example 3**  
Input: arr = [10, 20, 30], totalTime = 5  
Output: 60  

Because totalTime is larger than the array length, k becomes 3 and the whole array sum is taken.

## How to Use / Run Locally

**C++**  

1. Copy the C++ code into a file named `main.cpp`.  
2. Open a terminal and run:  
   `g++ main.cpp -o main`  
   `./main`

**Java**  

1. Copy the Java code into a file named `Solution.java`.  
2. Compile and run:  
   `javac Solution.java`  
   `java Solution`

**JavaScript**  

1. Copy the JavaScript code into a file named `solution.js`.  
2. Run with Node.js:  
   `node solution.js`

**Python3**  

1. Copy the Python code into a file named `solution.py`.  
2. Run:  
   `python3 solution.py`

You will need to add your own input reading code or hard-code test cases to see the output.

## Notes & Optimizations

- Because every element is non-negative, we never need to consider windows shorter than k. That is the key observation that keeps the solution simple and fast.  
- The sliding window approach is optimal for this problem. Using prefix sums would also work but would use extra O(n) space, which is unnecessary.  
- If the array could contain negative numbers the problem would become the classic maximum subarray sum of length at most k, which requires a different technique (usually a deque). In the current constraints that extra work is not needed.  
- Watch out for integer overflow. In C++ and Java the running sum is stored in a 64-bit integer to stay safe.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
