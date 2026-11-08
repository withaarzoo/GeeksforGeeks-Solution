# Minimum Time with 2 Scanners - GeeksforGeeks Solution

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

You are given n documents that must be scanned. There are two scanners available. Scanner 1 takes s1 units of time to scan one document. Scanner 2 takes s2 units of time for one document.

Both scanners can work at the same time. Each scanner can only handle one document at a time, but it can start the next document as soon as it finishes the current one.

The goal is to find the minimum total time needed to scan all n documents.

This is a classic minimum time with 2 scanners problem that appears on GeeksforGeeks and other competitive programming platforms. The solution uses binary search on the answer.

## Constraints

- 1 ≤ n, s1, s2 ≤ 10^6
- 1 ≤ s1 * n, s2 * n ≤ 10^9

These limits mean the answer will always fit in a 32-bit integer, but you still need to be careful with intermediate calculations in some languages.

## Intuition

The first thing I noticed is that the two scanners run in parallel. So the total time is not just the sum of individual times. It depends on how we distribute the documents between them.

Using only the faster scanner is always a valid option. Mixing both scanners can sometimes finish earlier. The key observation is that the answer is the smallest time T where the number of documents both scanners can complete by time T is at least n.

This kind of “smallest feasible value” problem is a perfect fit for binary search on the answer.

## Approach

I set the search range from 0 to the time required if every document is given to the faster scanner (min(s1, s2) * n).

For any candidate time mid, I calculate how many documents scanner 1 can finish (mid / s1) and how many scanner 2 can finish (mid / s2). If the sum is at least n, then mid is possible and I try to find a smaller time. If the sum is less than n, I need more time.

I keep shrinking the range until the lowest possible valid time is left. That value is the answer.

This binary search approach for the minimum time with 2 scanners runs efficiently even for the largest allowed inputs.

## Data Structures Used

No advanced data structures are needed. The solution only uses a few integer variables to store the binary search bounds and the middle value. Everything stays in constant space.

## Operations & Behavior Summary

1. Set low to 0 and high to min(s1, s2) * n.
2. While low is less than high:
   - Compute mid.
   - Check if mid / s1 + mid / s2 is at least n.
   - If yes, try a smaller time by setting high = mid.
   - If no, increase low to mid + 1.
3. When the loop ends, low holds the minimum time required.

## Complexity

| Type              | Complexity                          | Explanation                                                                 |
|-------------------|-------------------------------------|-----------------------------------------------------------------------------|
| Time Complexity   | O(log (min(s1, s2) * n))            | Binary search over a range whose size is at most min(s1, s2) * n. Each check is O(1). |
| Space Complexity  | O(1)                                | Only a constant number of variables are used. No extra arrays or structures. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minTime(int n, int s1, int s2) {
        long long low = 0;
        long long high = 1LL * min(s1, s2) * n;
        while (low < high) {
            long long mid = low + (high - low) / 2;
            if (mid / s1 + mid / s2 >= n)
                high = mid;
            else
                low = mid + 1;
        }
        return (int)low;
    }
};
```

### Java
```java
class Solution {
    public int minTime(int n, int s1, int s2) {
        long low = 0;
        long high = 1L * Math.min(s1, s2) * n;
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (mid / s1 + mid / s2 >= n)
                high = mid;
            else
                low = mid + 1;
        }
        return (int)low;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number} n
 * @param {number} s1
 * @param {number} s2
 * @returns {number}
 */
class Solution {
    minTime(n, s1, s2) {
        let low = 0;
        let high = Math.min(s1, s2) * n;
        while (low < high) {
            let mid = Math.floor(low + (high - low) / 2);
            if (Math.floor(mid / s1) + Math.floor(mid / s2) >= n)
                high = mid;
            else
                low = mid + 1;
        }
        return low;
    }
}
```

### Python3
```python
class Solution:
    def minTime(self, n: int, s1: int, s2: int) -> int:
        low = 0
        high = min(s1, s2) * n
        while low < high:
            mid = low + (high - low) // 2
            if mid // s1 + mid // s2 >= n:
                high = mid
            else:
                low = mid + 1
        return low
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same across all four languages. Only the syntax for integer division and large numbers changes slightly.

I start by defining the search range. low begins at 0. high is set to the time needed if only the faster scanner is used. This upper bound is always sufficient and keeps the search range as small as possible.

In each step I pick the middle value. Then I ask a simple question: can the two scanners together finish at least n documents by this time? Integer division automatically gives the correct count of complete documents.

If they can finish enough documents, I discard the higher half of the range. If they cannot, I discard the lower half. This continues until low and high meet.

At that point low is the smallest time that still works. Edge cases such as n = 1 or when one scanner is much faster than the other are handled naturally by the same logic. No special handling is required.

In languages that support 64-bit integers I use them for the bounds so that the multiplication min(s1, s2) * n never overflows before the final answer is returned.

## Examples

**Example 1**  
Input: n = 2, s1 = 2, s2 = 4  
Output: 4  

Trace:  
- Using only scanner 1 takes 4 units.  
- Using both scanners in parallel also takes 4 units (max(2, 4)).  
- Binary search will settle on 4 as the minimum feasible time.

**Example 2**  
Input: n = 2, s1 = 1, s2 = 3  
Output: 2  

Trace:  
- Scanner 1 alone can finish both documents in 2 units.  
- Any mix involving scanner 2 takes at least 3 units.  
- So the answer is 2.

**Example 3**  
Input: n = 5, s1 = 2, s2 = 3  
Possible check at mid = 6:  
- Scanner 1 finishes 3 documents, scanner 2 finishes 2 documents.  
- Total = 5, so 6 is feasible.  
The search continues downward until it finds the true minimum.

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Open a terminal and run:  
   `g++ main.cpp -o main`  
3. Run the program:  
   `./main`  
4. Provide input in the format expected by the problem (or modify the main function to hard-code test cases).

**Java**  
1. Copy the Java code into a file named `Solution.java`.  
2. Compile:  
   `javac Solution.java`  
3. Run:  
   `java Solution`  
4. Add a main method if you want to test with custom inputs.

**JavaScript**  
1. Copy the JavaScript code into a file named `solution.js`.  
2. Run with Node.js:  
   `node solution.js`  
3. You can add console.log statements or a simple test harness at the bottom of the file.

**Python3**  
1. Copy the Python code into a file named `solution.py`.  
2. Run:  
   `python3 solution.py`  
3. Add a few print statements or a small test block under the class to check different values of n, s1, and s2.

## Notes & Optimizations

- The upper bound min(s1, s2) * n is tight. Using a larger bound still works but increases the number of binary search iterations slightly.
- Integer division is intentional. Floating-point division would introduce precision issues and is unnecessary.
- When one scanner is extremely slow, the algorithm automatically prefers the faster one without any extra if-conditions.
- The same binary search on answer technique can be reused for many other “minimum time” or “minimum capacity” problems on GeeksforGeeks and Codeforces.
- Because the constraints guarantee s1 * n and s2 * n stay within 10^9, the final answer always fits in a regular 32-bit integer.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
