# Pyramid Array with Reduce Operations

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

You are given an array of stone heights. Your job is to turn this array into a valid pyramid by only reducing the height of stones. You cannot increase any height and you cannot move stones around.

A valid pyramid is a contiguous part of the array that looks like 1, 2, 3, ..., x-1, x, x-1, ..., 2, 1 for some positive integer x. Every stone outside that range must become zero.

Each time you reduce a stone’s height by 1 you pay a cost of 1. The goal is to find the minimum total cost needed to form any valid pyramid. It is guaranteed that at least one pyramid is always possible.

This is a classic minimum cost pyramid formation problem that appears on GeeksforGeeks and similar platforms. The solution relies on dynamic programming ideas to keep the time linear.

## Constraints

- 1 ≤ size of array (n) ≤ 10^5
- 1 ≤ arr[i] ≤ 10^5

These limits force an O(n) solution. Anything slower will time out.

## Intuition

The cost of any pyramid is simply the sum of the whole array minus the sum of heights that stay in the pyramid. A perfect pyramid of peak height x always keeps exactly x² stones. So the cheapest answer is the original sum minus the largest x² we can still support.

That means the real work is finding the tallest possible peak that the array can still form after only reductions. Once I realized this, the problem turned into computing the maximum feasible peak height at every index and picking the global maximum.

## Approach

I build two helper arrays.

The left array stores, for every index, the tallest height I could place there if I only cared about the left side and forced the heights to rise consecutively from 1. I start left[0] = 1 and then walk right, always taking the minimum of “previous left value + 1” and the actual stone height.

The right array does the same thing from the opposite end.

At any index i the tallest peak I am allowed to put is the smaller of left[i] and right[i]. I scan the whole array, keep the biggest of those values, square it, and subtract from the original sum. That difference is the minimum cost.

The method runs in linear time and uses only two extra arrays of size n.

## Data Structures Used

- Two integer arrays of length n (left and right).  
  They store the maximum reachable consecutive height from each direction. Arrays give O(1) access and are the simplest way to keep the pre-computed values.

- A long integer for the total sum.  
  The sum can reach 10^10, so a 64-bit type prevents overflow while the final answer is still returned as a normal integer.

No other data structures are needed. The solution stays light on memory.

## Operations & Behavior Summary

1. Add every element of the input array to get the total height.
2. Handle the tiny cases n ≤ 2 separately (only a height-1 pyramid is possible).
3. Fill the left array from left to right so each position knows the tallest consecutive climb it can support.
4. Fill the right array from right to left the same way.
5. Walk the array once more, take min(left[i], right[i]) at every index, and remember the global maximum.
6. Subtract that maximum squared from the total sum and return the result.

That is the entire algorithm in plain English.

## Complexity

| Metric            | Value | Explanation |
|-------------------|-------|-------------|
| Time Complexity   | O(n)  | Three linear passes over the array of size n. |
| Space Complexity  | O(n)  | Two auxiliary arrays of size n. |

The expected complexity on GeeksforGeeks matches exactly these bounds.

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int formPyramid(vector<int>& arr) {
        int n = arr.size();
        long long total = 0;
        for (int x : arr) total += x;
        if (n <= 2) return (int)(total - 1);
        vector<int> left(n), right(n);
        left[0] = 1;
        for (int i = 1; i < n; i++)
            left[i] = min(left[i - 1] + 1, arr[i]);
        right[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--)
            right[i] = min(right[i + 1] + 1, arr[i]);
        long long maxX = 0;
        for (int i = 0; i < n; i++)
            maxX = max(maxX, (long long)min(left[i], right[i]));
        return (int)(total - maxX * maxX);
    }
};
```

### Java
```java
class Solution {
    public int formPyramid(int[] arr) {
        int n = arr.length;
        long total = 0;
        for (int x : arr) total += x;
        if (n <= 2) return (int)(total - 1);
        int[] left = new int[n];
        int[] right = new int[n];
        left[0] = 1;
        for (int i = 1; i < n; i++)
            left[i] = Math.min(left[i - 1] + 1, arr[i]);
        right[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--)
            right[i] = Math.min(right[i + 1] + 1, arr[i]);
        long maxX = 0;
        for (int i = 0; i < n; i++)
            maxX = Math.max(maxX, Math.min(left[i], right[i]));
        return (int)(total - maxX * maxX);
    }
};
```

### JavaScript
```javascript
class Solution {
    formPyramid(arr) {
        let n = arr.length;
        let total = 0;
        for (let x of arr) total += x;
        if (n <= 2) return total - 1;
        let left = new Array(n);
        let right = new Array(n);
        left[0] = 1;
        for (let i = 1; i < n; i++)
            left[i] = Math.min(left[i - 1] + 1, arr[i]);
        right[n - 1] = 1;
        for (let i = n - 2; i >= 0; i--)
            right[i] = Math.min(right[i + 1] + 1, arr[i]);
        let maxX = 0;
        for (let i = 0; i < n; i++)
            maxX = Math.max(maxX, Math.min(left[i], right[i]));
        return total - maxX * maxX;
    }
}
```

### Python3
```python
class Solution:
    def formPyramid(self, arr):
        n = len(arr)
        total = sum(arr)
        if n <= 2:
            return total - 1
        left = [0] * n
        right = [0] * n
        left[0] = 1
        for i in range(1, n):
            left[i] = min(left[i - 1] + 1, arr[i])
        right[n - 1] = 1
        for i in range(n - 2, -1, -1):
            right[i] = min(right[i + 1] + 1, arr[i])
        maxX = 0
        for i in range(n):
            maxX = max(maxX, min(left[i], right[i]))
        return total - maxX * maxX
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in every language, so the reasoning below applies to all four versions.

I first compute the total sum of the array using a 64-bit integer. This value is the cost of turning every stone to zero. Later I will subtract the stones that stay in the pyramid.

If the array is very short (size 1 or 2) the only possible pyramid has height 1, so the answer is simply total minus 1. This edge case is handled before any extra arrays are created.

Next I allocate two arrays of the same length as the input.  
I set the first cell of the left array to 1 because a pyramid that starts at the leftmost position can never be taller than 1. Then I walk from left to right. At each new index I look at the value already stored one step earlier, add one, and take the smaller of that number and the actual height present in the input. This guarantees that any height I record is still reachable by consecutive reductions from the left.

I do the symmetric walk from the right end into the right array.

After both arrays are ready I make one final pass. At every index I compute the minimum of the left and right values. That number is the tallest peak the array can support at that position. I keep the largest of those peaks.

A pyramid whose peak is maxX always contains exactly maxX × maxX stones. Subtracting that square from the original total gives the minimum number of reductions needed.

The final cast back to a normal integer is required by the problem signature, but the intermediate calculations stay in 64-bit arithmetic so nothing overflows.

Edge cases such as a strictly increasing array, a strictly decreasing array, or an already perfect pyramid are handled automatically by the min operations.

## Examples

Example 1  
Input: [1, 2, 3, 4, 2, 1]  
Total sum = 13  
Left array becomes [1, 2, 3, 4, 2, 1]  
Right array becomes [1, 2, 3, 3, 2, 1]  
Possible peak heights: [1, 2, 3, 3, 2, 1]  
Maximum peak = 3  
3² = 9  
Minimum cost = 13 - 9 = 4  

Example 2  
Input: [1, 2, 1]  
Total sum = 4  
Left = [1, 2, 1]  
Right = [1, 2, 1]  
Maximum peak = 2  
Cost = 4 - 4 = 0 (already a perfect pyramid)

Example 3  
Input: [1, 5, 2]  
Total sum = 8  
Left = [1, 2, 1]  
Right = [1, 2, 1]  
Maximum peak = 2  
Cost = 8 - 4 = 4  

## How to Use / Run Locally

C++  
Save the code in a file named main.cpp.  
Compile with: g++ -std=c++17 main.cpp -o main  
Run with: ./main  
You can hard-code a test array inside the main function or read from standard input.

Java  
Save the code in Solution.java.  
Compile with: javac Solution.java  
Run with: java Solution  
Add a main method that creates an array and prints the result of formPyramid.

JavaScript  
Save the code in solution.js.  
Run with: node solution.js  
Create an array and call the formPyramid method, then console.log the answer.

Python3  
Save the code in solution.py.  
Run with: python3 solution.py  
Instantiate the Solution class, pass an array to formPyramid, and print the returned value.

In every language the function signature matches the GeeksforGeeks problem so you can copy-paste directly into the online judge.

## Notes & Optimizations

The algorithm already runs in the optimal O(n) time and O(n) space required by the constraints.  

A naïve approach that tries every possible peak and scans left and right for each peak would be O(n²) and would time out for n = 10^5. The two-array pre-computation avoids that quadratic cost.

If the problem ever allowed height 0 in the input the left and right arrays would need an extra check, but the given constraints guarantee every height is at least 1.

You could theoretically compute the left and right values with constant extra space by doing the two passes carefully, but the extra arrays make the code clearer and still fit comfortably inside memory limits.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)