# XOR of All Subarray XORs - GeeksforGeeks Solution

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

You are given an integer array. Your task is to find the XOR of the XOR values of every possible non-empty subarray of that array.

In simple words, first calculate the XOR of elements inside every subarray, then take all those results and XOR them together to get a single final answer.

The problem is a classic bit-manipulation and subarray XOR problem that appears frequently in competitive programming contests and coding interviews.

## Constraints

- 1 ≤ arr.size() ≤ 10^5
- 0 ≤ arr[i] ≤ 10^9

Because the array can be as large as 100000 elements, any solution slower than linear time will get Time Limit Exceeded.

## Intuition

The first thing that comes to mind is generating every subarray, computing its XOR, and then XORing all those values. That works for tiny arrays but fails for n = 10^5.

I started counting how many times each individual element appears across all subarray XORs. Since XOR cancels itself out on even counts, only the elements that appear an odd number of times will remain in the final answer.

For an element at index i (0-based), the number of subarrays that contain it is (i + 1) * (n - i). This product is odd only in a very specific case. That observation immediately simplifies the whole problem.

## Approach

Here is the clean strategy I used:

1. Let n be the length of the array.
2. Check whether n is even. If it is, every element appears an even number of times, so the answer is simply 0.
3. If n is odd, only the elements sitting at even indices (0, 2, 4, ...) survive.
4. XOR all those even-indexed elements together and return the result.

This gives a correct answer in a single pass and uses constant extra memory.

## Data Structures Used

- Plain array / vector – the input itself. No extra arrays, maps, or prefix structures are required.
- A few integer variables to store the length, the running XOR, and the loop index.

The solution stays extremely light on memory.

## Operations & Behavior Summary

- Read the length of the array.
- If the length is even, return 0 immediately.
- Otherwise initialise an answer variable to 0.
- Walk through the array with a step of 2 (only even indices).
- XOR every visited element into the answer.
- Return the final accumulated XOR value.

That is the entire algorithm in plain English.

## Complexity

| Type              | Value | Explanation                                      |
|-------------------|-------|--------------------------------------------------|
| Time Complexity   | O(n)  | We examine each element a constant number of times. |
| Space Complexity  | O(1)  | Only a handful of integer variables are used.    |

n is the length of the input array.

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int subarrayXor(vector<int>& arr) {
        int n = arr.size();
        if (n % 2 == 0) return 0;
        int ans = 0;
        for (int i = 0; i < n; i += 2) {
            ans ^= arr[i];
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int subarrayXor(int[] arr) {
        int n = arr.length;
        if (n % 2 == 0) return 0;
        int ans = 0;
        for (int i = 0; i < n; i += 2) {
            ans ^= arr[i];
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    subarrayXor(arr) {
        let n = arr.length;
        if (n % 2 === 0) return 0;
        let ans = 0;
        for (let i = 0; i < n; i += 2) {
            ans ^= arr[i];
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def subarrayXor(self, arr):
        n = len(arr)
        if n % 2 == 0:
            return 0
        ans = 0
        for i in range(0, n, 2):
            ans ^= arr[i]
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the exact same logic. The only differences are syntax.

I first store the array length in a variable called n.  
Then I test whether n is even. An even length means every element appears an even number of times across all subarray XORs, so they cancel completely and the answer must be 0. I return early in that case.

When n is odd I know that only elements at even positions matter. I start an answer variable at 0.  
I then loop from index 0 to n-1 with a step of 2. At each step I XOR the current element into the answer.  

Because XOR is associative and commutative, the order does not matter. After the loop finishes, the answer variable already holds the required result and I simply return it.

Edge cases are handled naturally:  
- Single-element array → the element itself is returned.  
- Empty subarrays are never considered because the problem asks only for non-empty ones.  
- Large values up to 10^9 are fine because we only perform bitwise XOR, never arithmetic that could overflow.

## Examples

**Example 1**  
Input: arr = [1, 2, 3]  
Output: 2  

Trace:  
n = 3 (odd)  
Even indices → 1 and 3  
1 XOR 3 = 2  

**Example 2**  
Input: arr = [1, 2]  
Output: 0  

Trace:  
n = 2 (even) → answer is immediately 0  

**Example 3**  
Input: arr = [4]  
Output: 4  

Trace:  
n = 1 (odd)  
Only index 0 → answer is 4  

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Compile: `g++ -o main main.cpp`  
3. Run: `./main`  
(You will need to add a small main function that reads input and calls the solution method.)

**Java**  
1. Put the Java code inside a class file.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
(Again, add a main method for local testing.)

**JavaScript**  
1. Save the code in a `.js` file.  
2. Run with Node: `node solution.js`  
(You can call the method directly from a small test harness.)

**Python3**  
1. Save the code in a `.py` file.  
2. Run: `python3 solution.py`  
(Add a few print statements or a simple driver to test different arrays.)

## Notes & Optimizations

- The early return when n is even avoids an unnecessary full pass.
- The same idea can be extended to similar problems such as “sum of all subarray XORs” by counting frequencies instead of parity.
- No further asymptotic improvement is possible; O(n) time and O(1) space is optimal for this problem.
- Watch out for 0-based versus 1-based indexing when you implement the even-index check.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
