# Dominant Pairs - GFG Solution using Sorting and Two Pointers

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

The Dominant Pairs problem asks us to count special pairs in an even-sized integer array.  

We are given an array `arr` of even length. A pair of indices `(i, j)` is called dominant if three conditions are true at the same time:

- `i` lies in the first half of the array  
- `j` lies in the second half of the array  
- the value at `arr[i]` is at least five times the value at `arr[j]`

Our job is to return the total number of such dominant pairs. Indexing starts from zero.

This is a classic GeeksforGeeks problem that tests how well we can combine sorting with the two-pointer technique to avoid checking every possible pair.

## Constraints

- 1 ≤ arr.size() ≤ 10^4  
- -10^4 ≤ arr[i] ≤ 10^4  
- arr.size() is always even  
- The sum of arr.size() over all test cases does not exceed 10^6  

These limits mean a simple O(n²) loop will be too slow when the total size across tests reaches one million. We need an O(n log n) solution.

## Intuition

The first thing I noticed is that `i` can never leave the left half and `j` can never leave the right half. So the problem reduces to counting how many left-half numbers are large enough compared to right-half numbers.

Checking every left value against every right value would be too slow. Sorting both halves lets us use a moving pointer that only walks forward. Once the halves are sorted, larger left values can only produce more (or equal) valid right values. That monotonic behaviour is exactly what the two-pointer method needs.

## Approach

1. Split the array into two equal halves.  
2. Sort the left half in non-decreasing order.  
3. Sort the right half in non-decreasing order.  
4. Place one pointer at the start of the left half and another pointer at the start of the right half.  
5. For every left value, keep advancing the right pointer as long as the current left value is still ≥ 5 × current right value.  
6. When the right pointer stops, every right element from the beginning up to that pointer forms a valid pair with the current left element. Add that count to the answer.  
7. Move to the next left element and repeat. Because the right pointer never moves backward, the whole scan after sorting stays linear.

This gives us an efficient way to count dominant pairs without examining every possible combination.

## Data Structures Used

- The input array itself (we sort the two halves in place or on temporary slices).  
- Two integer pointers that track our current position in the left and right halves.  

No extra heavy data structures are required. Sorting is done either in-place or on small temporary arrays of size n/2.

## Operations & Behavior Summary

- Read the array length and compute the middle index.  
- Sort everything before the middle.  
- Sort everything from the middle to the end.  
- Initialise an answer counter to zero and a right-half pointer to the start of the second half.  
- Loop over every index in the left half:  
  - While the right pointer is still inside the array and the current left value is large enough, move the right pointer forward.  
  - Add the number of right elements already passed to the answer.  
- Return the final answer.

The algorithm never revisits an element once the pointer has moved past it.

## Complexity

| Complexity Type | Value          | Explanation |
|-----------------|----------------|-------------|
| Time Complexity | O(n log n)     | Sorting each half of size n/2 costs O((n/2) log (n/2)). The two-pointer scan that follows is O(n). |
| Space Complexity| O(1) extra     | We sort the halves in place (or use temporary slices that are discarded). Only a few integer variables are used. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int dominantPairs(vector<int> &arr) {
        int n = arr.size();
        int mid = n / 2;                     // split point
        
        // sort left half [0 .. mid)
        sort(arr.begin(), arr.begin() + mid);
        // sort right half [mid .. n)
        sort(arr.begin() + mid, arr.end());
        
        int ans = 0;
        int j = mid;                         // pointer into the right half
        
        // walk through every element of the left half
        for (int i = 0; i < mid; ++i) {
            // advance j while 5 * arr[j] is still <= arr[i]
            while (j < n && arr[i] >= 5LL * arr[j]) {
                ++j;
            }
            // all indices from mid to j-1 form a valid pair with this i
            ans += (j - mid);
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int dominantPairs(int[] arr) {
        int n = arr.length;
        int mid = n / 2;                     // split point
        
        // sort left half [0 .. mid)
        Arrays.sort(arr, 0, mid);
        // sort right half [mid .. n)
        Arrays.sort(arr, mid, n);
        
        int ans = 0;
        int j = mid;                         // pointer into the right half
        
        // walk through every element of the left half
        for (int i = 0; i < mid; ++i) {
            // advance j while 5 * arr[j] is still <= arr[i]
            // use long to avoid overflow
            while (j < n && arr[i] >= 5L * arr[j]) {
                ++j;
            }
            // all indices from mid to j-1 form a valid pair with this i
            ans += (j - mid);
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
    dominantPairs(arr) {
        const n = arr.length;
        const mid = Math.floor(n / 2);       // split point
        
        // sort left half [0 .. mid)
        const left = arr.slice(0, mid).sort((a, b) => a - b);
        // sort right half [mid .. n)
        const right = arr.slice(mid).sort((a, b) => a - b);
        
        let ans = 0;
        let j = 0;                           // pointer into the right half
        
        // walk through every element of the left half
        for (let i = 0; i < mid; ++i) {
            // advance j while 5 * right[j] is still <= left[i]
            while (j < mid && left[i] >= 5 * right[j]) {
                ++j;
            }
            // all indices from 0 to j-1 form a valid pair with this i
            ans += j;
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def dominantPairs(self, arr: list[int]) -> int:
        n = len(arr)
        mid = n // 2                         # split point
        
        # sort left half [0 .. mid)
        left = sorted(arr[:mid])
        # sort right half [mid .. n)
        right = sorted(arr[mid:])
        
        ans = 0
        j = 0                                # pointer into the right half
        
        # walk through every element of the left half
        for i in range(mid):
            # advance j while 5 * right[j] is still <= left[i]
            while j < mid and left[i] >= 5 * right[j]:
                j += 1
            # all indices from 0 to j-1 form a valid pair with this i
            ans += j
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four versions follow the same logic. The only differences are language-specific details such as how we create slices or how we avoid integer overflow.

First we calculate `mid = n / 2`. Everything before `mid` is the left half; everything from `mid` onward is the right half.

We sort both halves. In C++ and Java we can sort sub-ranges of the original array directly. In JavaScript and Python we usually create two new sorted lists for clarity.

We then start a pointer `j` at the beginning of the right half. For every left element we keep moving `j` forward while the inequality `left[i] >= 5 * right[j]` still holds.  

When the while loop stops, every right element from the start of the right half up to (but not including) the current `j` is a valid partner for the current left element. We simply add that count to the answer.

Because `j` only moves forward, the total work done by the inner loop across the whole outer loop is linear.  

Negative numbers and zeros are handled automatically by the comparison. Multiplying a large negative number by five can overflow a 32-bit integer, so in C++ and Java we cast to a 64-bit type before multiplying.

The final answer is the total number of valid dominant pairs found.

## Examples

**Example 1**  
Input: `[10, 2, 2, 1]`  
Left half after sort: `[2, 10]`  
Right half after sort: `[1, 2]`  

- 2 is not ≥ 5 × 1 → move left pointer  
- 10 ≥ 5 × 1 → yes, and 10 ≥ 5 × 2 → yes  
Answer: 2  

**Example 2**  
Input: `[10, 8, 2, 1, 1, 2]`  
Left half after sort: `[2, 8, 10]`  
Right half after sort: `[1, 1, 2]`  

- 2 is too small  
- 8 works with both 1s  
- 10 works with both 1s and the 2  
Answer: 5  

**Example 3**  
Input: `[-5, 10, -1, 0]`  
Left half after sort: `[-5, 10]`  
Right half after sort: `[-1, 0]`  

- -5 is never large enough  
- 10 ≥ 5 × (-1) and 10 ≥ 5 × 0  
Answer: 2  

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `dominant_pairs.cpp`.  
2. Compile with `g++ -std=c++17 dominant_pairs.cpp -o dominant_pairs`.  
3. Run with `./dominant_pairs`.  

**Java**  
1. Copy the Java code into a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.  

**JavaScript**  
1. Copy the JavaScript code into a file named `dominantPairs.js`.  
2. Run with `node dominantPairs.js`.  

**Python3**  
1. Copy the Python code into a file named `dominant_pairs.py`.  
2. Run with `python3 dominant_pairs.py`.  

You will need to add a small main function or driver code that reads input and prints the result, because the solution classes only contain the core method.

## Notes & Optimizations

- The solution works correctly with negative numbers and zeros because the comparison is written directly.  
- If the problem constraints ever grow beyond 10^5, the same approach still stays efficient.  
- An alternative is to binary-search the rightmost valid position for each left element. That also gives O(n log n) but has a slightly higher constant factor. The two-pointer version is cleaner after sorting.  
- Because we sort the halves, the original relative order of equal elements is lost. That is fine for this problem since we only care about counts, not the original indices.  

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
