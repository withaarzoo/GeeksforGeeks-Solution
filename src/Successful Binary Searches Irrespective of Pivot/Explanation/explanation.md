# Successful Binary Searches Irrespective of Pivot | GeeksforGeeks DSA Solution

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

You are given an array of distinct integers. The array is not necessarily sorted. The task is to search for a target value using a flexible version of binary search. Instead of always picking the middle element as the pivot, you can choose any index inside the current search range as the pivot.

At every step the range starts as the full array. You pick any index p inside the current low-high range. If the value at p matches the target, the search succeeds. If the target is smaller you move the high pointer to p-1. If the target is larger you move the low pointer to p+1. The search fails only when the range becomes empty.

The question asks: how many indices i exist such that searching for the value arr[i] is guaranteed to succeed no matter which sequence of pivots is chosen? In other words, count the elements that can never be “pushed out” of the search range by any possible pivot choices.

This is a classic competitive programming problem that appears on GeeksforGeeks and tests understanding of binary-search invariants and prefix/suffix extremes.

## Constraints

- 1 ≤ arr.size() ≤ 10^5
- 1 ≤ arr[i] ≤ 10^6
- All elements in the array are distinct

These limits force an O(n) or O(n log n) solution. Anything slower will time out on the largest test cases.

## Intuition

I first looked at the sample arrays and noticed a clear pattern. The elements that always survive are exactly those that are larger than every value to their left and smaller than every value to their right.

If any element on the left is bigger than the target, an adversary can pick that left element first and immediately shrink the high pointer past the target. If any element on the right is smaller, the adversary can pick it and push the low pointer past the target. So the only safe positions are the ones that sit strictly above the prefix maximum and strictly below the suffix minimum.

Once I saw this condition, the rest of the solution became straightforward: compute those extremes efficiently and count how many positions satisfy both inequalities.

## Approach

I solve the problem in three linear passes.

First I build a suffix-minimum array. Starting from the right end, each position stores the smallest value from that index to the end of the array. This gives me instant access to the minimum of everything that lies strictly to the right of any index.

Next I walk from left to right while maintaining a running prefix maximum. At every index i I check two simple conditions:

- The current value is greater than the maximum of all elements before it (or it is the first element).
- The current value is smaller than the minimum of all elements after it (or it is the last element).

Whenever both conditions hold I increment a counter. After the scan finishes the counter holds the answer.

Because every comparison is constant time after the preprocessing, the whole algorithm runs in linear time and works comfortably within the given constraints.

## Data Structures Used

- An extra array of size n to store suffix minima. This is the only auxiliary structure needed. It lets me answer “what is the smallest value to the right of i?” in O(1) time.
- A single integer variable that tracks the maximum value seen so far while scanning from left to right. No extra container is required for the prefix side.

I deliberately avoided heavier structures such as segment trees or sparse tables because a simple linear scan already gives the optimal complexity.

## Operations & Behavior Summary

1. Allocate a suffix-minimum array and fill it from right to left.
2. Initialise a counter to zero and a running maximum to the smallest possible integer.
3. For every index from left to right:
   - Test whether the current value is larger than the running maximum (left-side safety).
   - Test whether the current value is smaller than the pre-computed suffix minimum of the remaining right part (right-side safety).
   - If both tests pass, count the index.
   - Update the running maximum with the current value.
4. Return the final count.

The algorithm never modifies the original array and never needs to simulate actual binary-search paths.

## Complexity

| Complexity Type | Value | Explanation |
|-----------------|-------|-------------|
| Time Complexity | O(n) | Two linear passes to build the suffix minima and one linear pass to count valid positions. n is the length of the input array. |
| Space Complexity | O(n) | One extra array of size n stores the suffix minima. The rest of the memory usage is constant. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int countAlwaysFound(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return 0;
        vector<int> sufMin(n);
        sufMin[n-1] = arr[n-1];
        for (int i = n-2; i >= 0; --i)
            sufMin[i] = min(arr[i], sufMin[i+1]);
        int ans = 0;
        int preMax = INT_MIN;
        for (int i = 0; i < n; ++i) {
            bool leftOk = (i == 0) || (arr[i] > preMax);
            bool rightOk = (i == n-1) || (arr[i] < sufMin[i+1]);
            if (leftOk && rightOk) ++ans;
            preMax = max(preMax, arr[i]);
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int countAlwaysFound(int[] arr) {
        int n = arr.length;
        if (n == 0) return 0;
        int[] sufMin = new int[n];
        sufMin[n-1] = arr[n-1];
        for (int i = n-2; i >= 0; --i)
            sufMin[i] = Math.min(arr[i], sufMin[i+1]);
        int ans = 0;
        int preMax = Integer.MIN_VALUE;
        for (int i = 0; i < n; ++i) {
            boolean leftOk = (i == 0) || (arr[i] > preMax);
            boolean rightOk = (i == n-1) || (arr[i] < sufMin[i+1]);
            if (leftOk && rightOk) ++ans;
            preMax = Math.max(preMax, arr[i]);
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]}
 * @return {number}
 */
class Solution {
    countAlwaysFound(arr) {
        let n = arr.length;
        if (n === 0) return 0;
        let sufMin = new Array(n);
        sufMin[n-1] = arr[n-1];
        for (let i = n-2; i >= 0; --i)
            sufMin[i] = Math.min(arr[i], sufMin[i+1]);
        let ans = 0;
        let preMax = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < n; ++i) {
            let leftOk = (i === 0) || (arr[i] > preMax);
            let rightOk = (i === n-1) || (arr[i] < sufMin[i+1]);
            if (leftOk && rightOk) ++ans;
            preMax = Math.max(preMax, arr[i]);
        }
        return ans;
    }
};
```

### Python3
```python
class Solution:
    def countAlwaysFound(self, arr):
        n = len(arr)
        if n == 0:
            return 0
        sufMin = [0] * n
        sufMin[n-1] = arr[n-1]
        for i in range(n-2, -1, -1):
            sufMin[i] = min(arr[i], sufMin[i+1])
        ans = 0
        preMax = float('-inf')
        for i in range(n):
            leftOk = (i == 0) or (arr[i] > preMax)
            rightOk = (i == n-1) or (arr[i] < sufMin[i+1])
            if leftOk and rightOk:
                ans += 1
            preMax = max(preMax, arr[i])
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic; only the syntax changes.

I begin by reading the length of the array. If the array is empty I immediately return zero so the rest of the code never has to handle that edge case.

I then create a suffix-minimum array of the same size. I set the last entry equal to the last element of the input. Walking backwards, each position stores the smaller of the current element and the already-computed minimum of the suffix that starts one step to the right. After this pass, looking up the minimum of everything to the right of any index becomes a single array access.

Next I initialise a counter and a running maximum. The running maximum starts at the lowest possible integer so the first element will always pass the left-side test.

I now scan the array from left to right. For each index I evaluate two boolean conditions:

- Left safety: either this is the first position or the current value is strictly larger than every value seen so far.
- Right safety: either this is the last position or the current value is strictly smaller than the pre-computed minimum of the remaining right side.

When both conditions are true I increment the answer. Immediately after the test I update the running maximum so the next iteration has the correct prefix information.

Because the elements are guaranteed to be distinct, I never have to worry about equality cases. The algorithm correctly handles the first and last positions by treating the missing side as automatically safe.

The same sequence of steps appears in C++, Java, JavaScript and Python. The only differences are language-specific details such as integer limits, array allocation syntax and the way minimum/maximum functions are called.

## Examples

Example 1  
Input: [3, 7, 9, 8, 15]  
Output: 3  

Trace:  
- Index 0 (value 3): no left side, right minimum is 7 → safe.  
- Index 1 (value 7): left maximum 3 < 7, right minimum 8 > 7 → safe.  
- Index 2 (value 9): left maximum 7 < 9, but right minimum 8 < 9 → unsafe.  
- Index 3 (value 8): left maximum 9 > 8 → unsafe.  
- Index 4 (value 15): left maximum 9 < 15, no right side → safe.  

Only three positions survive.

Example 2  
Input: [9, 4, 1, 10, 22, 23, 20]  
Output: 1  

Trace:  
Only the value 10 at index 3 is larger than every element before it and smaller than every element after it. Every other element has either a larger value on its left or a smaller value on its right, so an adversary can always force the search range to skip it.

Example 3  
Input: [5]  
Output: 1  

A single-element array is always found because there are no other pivots that can push the range away.

## How to Use / Run Locally

C++  
1. Copy the C++ solution into a file named main.cpp.  
2. Compile with g++ -std=c++17 main.cpp -o main.  
3. Run ./main and supply the array according to the problem’s input format.

Java  
1. Place the Java code inside a class named Solution in a file Solution.java.  
2. Compile with javac Solution.java.  
3. Run with java Solution (or integrate into a driver that reads the array).

JavaScript  
1. Save the code in a file solution.js.  
2. Run with Node.js: node solution.js.  
3. You may need a small driver that reads input from stdin or hard-codes the test arrays.

Python3  
1. Save the code in a file solution.py.  
2. Run with python3 solution.py.  
3. Add a simple main block that reads the array and prints the result if you want to test interactively.

In every language the core function expects a single array (or vector/list) of integers and returns an integer count.

## Notes & Optimizations

The solution already achieves the optimal O(n) time and O(n) space. It is possible to reduce the auxiliary space to O(1) by computing the answer in a more clever two-pointer or stack-based fashion, but the gain is rarely worth the added complexity for this problem.

Edge cases worth remembering:
- Single-element array → always returns 1.
- Strictly increasing array → every element is counted.
- Strictly decreasing array → only the last element is counted.
- Array that rises then falls → only the global maximum may survive if it also satisfies the right-side condition.

Because the elements are distinct, equality checks never appear and the strict inequalities are safe.

This approach is the standard and most readable way to solve the “Successful Binary Searches Irrespective of Pivot” problem on GeeksforGeeks and similar competitive-programming platforms.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
