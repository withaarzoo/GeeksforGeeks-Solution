# Minimum Sum Subarray -- GeeksforGeeks Solution

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

We are given an array of integers. The task is to find a continuous part of the array (a subarray) that has the smallest possible sum. The subarray must contain at least one element.

In simple terms, we need the minimum sum subarray among all possible contiguous segments of the array. This is a classic variation of the maximum subarray sum problem, often solved using a modified version of Kadane’s algorithm for minimum sum.

Input is a single array of integers.  
Output is a single integer — the smallest sum that any non-empty contiguous subarray can produce.

## Constraints

- 1 ≤ array size ≤ 10⁵
- -10⁴ ≤ each element ≤ 10⁴

These limits mean the solution must run in linear time. Anything slower than O(n) will time out on large test cases.

## Intuition

When I first saw this problem, it reminded me of the famous maximum subarray sum. Instead of looking for the largest sum, I needed the smallest one.

The key observation is that the same running-sum idea works if I flip the logic. At every position I can ask: “Is it better to start a new subarray here, or continue the previous one?” I always pick the option that gives the smaller sum. This way I never miss the most negative stretch of numbers.

If the array contains only positive numbers, the answer will simply be the smallest single element. If there are negative numbers, the algorithm naturally keeps extending the subarray as long as the sum keeps getting smaller.

## Approach

I keep two variables:

- One tracks the minimum sum of any subarray that ends at the current index.
- The other tracks the overall minimum sum found so far.

I start both variables with the first element of the array. Then I walk through the rest of the array from left to right. At each step I decide whether adding the current element to the previous running minimum still gives a smaller value, or whether starting fresh with the current element is better. After updating the running minimum, I also update the overall answer if needed.

When the loop finishes, the overall answer variable holds the minimum sum subarray result.

This approach examines every element only once and never needs extra memory beyond a few integer variables.

## Data Structures Used

No advanced data structures are required. The solution uses only a few integer variables to store the current minimum ending sum and the global minimum sum. The input array itself is the only collection we work with. This keeps both time and space optimal for the given constraints.

## Operations & Behavior Summary

1. Read the input array.
2. Initialize the running minimum and the global minimum with the first element.
3. For every remaining element:
   - Compute the new running minimum as the smaller of (current element alone) and (previous running minimum + current element).
   - Update the global minimum if the new running minimum is smaller.
4. After processing the entire array, return the global minimum.

The algorithm never looks ahead or backtracks. It makes a single left-to-right pass and maintains the best answer seen so far.

## Complexity

| Metric            | Value | Explanation                                                                 |
|-------------------|-------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n)  | We visit each of the n elements exactly once.                              |
| Space Complexity  | O(1)  | Only a constant number of integer variables are used; no extra arrays.     |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minSubarraySum(vector<int> &arr) {
        int n = arr.size();
        int minEnding = arr[0];
        int minSoFar = arr[0];
        for (int i = 1; i < n; i++) {
            minEnding = min(arr[i], minEnding + arr[i]);
            minSoFar = min(minSoFar, minEnding);
        }
        return minSoFar;
    }
};
```

### Java
```java
class Solution {
    public int minSubarraySum(int[] arr) {
        int n = arr.length;
        int minEnding = arr[0];
        int minSoFar = arr[0];
        for (int i = 1; i < n; i++) {
            minEnding = Math.min(arr[i], minEnding + arr[i]);
            minSoFar = Math.min(minSoFar, minEnding);
        }
        return minSoFar;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    minSubarraySum(arr) {
        let n = arr.length;
        let minEnding = arr[0];
        let minSoFar = arr[0];
        for (let i = 1; i < n; i++) {
            minEnding = Math.min(arr[i], minEnding + arr[i]);
            minSoFar = Math.min(minSoFar, minEnding);
        }
        return minSoFar;
    }
}
```

### Python3
```python
class Solution:
    def minSubarraySum(self, arr: list[int]) -> int:
        n = len(arr)
        minEnding = arr[0]
        minSoFar = arr[0]
        for i in range(1, n):
            minEnding = min(arr[i], minEnding + arr[i])
            minSoFar = min(minSoFar, minEnding)
        return minSoFar
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. The only differences are syntax and how we call the minimum function.

We begin by storing the size of the array. Two variables are created: one for the minimum sum ending at the current position and one for the best answer found anywhere. Both are set to the first element because a single-element subarray is always valid.

Then a loop starts from the second index. Inside the loop we update the ending minimum. We compare the current element by itself against the sum of the previous ending minimum plus the current element. Whichever is smaller becomes the new ending minimum. Immediately after that we check whether this new ending minimum is better than the best answer we have seen and update it if necessary.

When the loop ends we simply return the best answer variable. Because every element is processed exactly once and no extra memory is allocated, the solution meets the required O(n) time and O(1) space bounds in every language.

Edge cases are handled automatically:
- All positive numbers → the smallest single element is chosen.
- All negative numbers → the entire array sum is chosen because it is the most negative.
- Mixed positive and negative → the algorithm correctly stops extending when the running sum becomes larger than starting fresh.

## Examples

**Example 1**  
Input: [3, -4, 2, -3, -1, 7, -5]  
Output: -6  

Trace:  
Start with 3.  
Next -4 → running becomes -4, global becomes -4.  
Next 2 → running becomes -2, global stays -4.  
Next -3 → running becomes -5, global becomes -5.  
Next -1 → running becomes -6, global becomes -6.  
Next 7 → running becomes 1, global stays -6.  
Next -5 → running becomes -4, global stays -6.  
Final answer is -6 (the subarray [-4, 2, -3, -1]).

**Example 2**  
Input: [4, -6, 3, -2, 5, -8, 2]  
Output: -8  

Trace:  
The single element -8 is the smallest possible sum. The algorithm updates the global minimum when it reaches that element and never finds anything smaller.

**Example 3**  
Input: [2, 6, 8, 1, 4]  
Output: 1  

Trace:  
Every number is positive, so the running minimum always resets to the current element. The global minimum ends up as the smallest single value, which is 1.

## How to Use / Run Locally

**C++**  
1. Copy the code into a file named `main.cpp`.  
2. Compile with: `g++ main.cpp -o main`  
3. Run with: `./main`  
Provide the array size and elements according to the problem’s input format when prompted or through standard input.

**Java**  
1. Copy the code into a file named `Solution.java`.  
2. Compile with: `javac Solution.java`  
3. Run with: `java Solution`  
Feed the input through the console or a test harness.

**JavaScript**  
1. Copy the code into a file named `solution.js`.  
2. Run with Node.js: `node solution.js`  
You can hard-code a test array or read from the command line.

**Python3**  
1. Copy the code into a file named `solution.py`.  
2. Run with: `python3 solution.py`  
Add a few print statements or a driver function to test different arrays.

In all languages the core function expects a list or vector of integers and returns a single integer.

## Notes & Optimizations

The solution is already optimal for both time and space under the given constraints. No further asymptotic improvement is possible because every element must be examined at least once.

One common alternative is to compute the total sum of the array and then find the maximum subarray sum of the negated array. The minimum sum is then total sum minus that maximum. While correct, it uses the same O(n) time and does not improve space, so the direct minimum version shown here is simpler and clearer.

Watch out for the edge case of a single-element array — the answer is simply that element. Also be careful with integer overflow in languages that have fixed-size integers when the array contains large negative values; the constraints keep the sum well within 32-bit range, but 64-bit variables are safer in practice.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)