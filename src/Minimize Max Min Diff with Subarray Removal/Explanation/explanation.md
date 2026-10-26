# Minimize Max Min Diff with Subarray Removal - GeeksforGeeks Solution

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

You are given an array of positive integers and an integer k. Your task is to remove exactly one contiguous subarray of length k from the array. After the removal, look at the remaining elements and calculate the difference between the largest and the smallest value among them. The goal is to choose the subarray removal that makes this difference as small as possible and return that minimum possible difference.

In simple terms, we want to minimize the range (max - min) of the array after deleting any window of size k.

This is a classic array problem that appears on platforms like GeeksforGeeks and is useful for practicing prefix/suffix techniques in competitive programming.

## Constraints

- 1 ≤ array size (n) ≤ 10^5
- 1 ≤ arr[i] ≤ 10^9
- 0 ≤ k < n

The large value of n means any solution slower than linear time will not pass.

## Intuition

When you remove a contiguous segment of length k, what remains is always a prefix of the array joined with a suffix. The only decision is where that cut happens.

If I can quickly know the maximum and minimum value inside any prefix and any suffix, then I can test every possible cut position in constant time. That observation immediately points toward building prefix-max, prefix-min, suffix-max and suffix-min arrays.

## Approach

1. Build four arrays while scanning the input once from left to right and once from right to left:
   - prefix maximum
   - prefix minimum
   - suffix maximum
   - suffix minimum

2. Let m = n - k (the number of elements that will remain).

3. Try every possible length L of the left remaining part (L goes from 0 to m). The right remaining part then starts at index L + k.

4. For each L, obtain the overall maximum and minimum of the two pieces (handling the cases when one piece is empty). Compute their difference and keep the smallest difference seen.

5. Return that smallest difference.

The method stays strictly linear and works even when k = 0 (no removal).

## Data Structures Used

- Four ordinary arrays (or vectors/lists) of size n:
  - preMax / preMin – store running maximum and minimum from the start of the array
  - sufMax / sufMin – store running maximum and minimum from the end of the array

These are the classic prefix and suffix structures. They give O(1) range queries for the max/min of any prefix or any suffix, which is exactly what the problem needs.

## Operations & Behavior Summary

- Precompute left-to-right maxima and minima.
- Precompute right-to-left maxima and minima.
- Iterate over every valid cut position.
- For a cut, read the max and min of the left piece (if it exists) and of the right piece (if it exists).
- Combine them with a simple max/min operation.
- Track the global minimum of (combined max - combined min).
- Return the tracked value.

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time       | O(n)  | Two linear scans to build the prefix/suffix arrays plus one more linear scan over the possible cut positions. |
| Space      | O(n)  | Four extra arrays of length n are allocated. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minDiff(int k, vector<int> &arr) {
        int n = arr.size();
        vector<int> preMax(n), preMin(n), sufMax(n), sufMin(n);
        preMax[0] = preMin[0] = arr[0];
        for (int i = 1; i < n; i++) {
            preMax[i] = max(preMax[i - 1], arr[i]);
            preMin[i] = min(preMin[i - 1], arr[i]);
        }
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            sufMax[i] = max(sufMax[i + 1], arr[i]);
            sufMin[i] = min(sufMin[i + 1], arr[i]);
        }
        int m = n - k;
        int ans = INT_MAX;
        for (int left = 0; left <= m; left++) {
            int right = left + k;
            int curMax, curMin;
            if (left == 0) {
                curMax = sufMax[right];
                curMin = sufMin[right];
            } else if (right == n) {
                curMax = preMax[left - 1];
                curMin = preMin[left - 1];
            } else {
                curMax = max(preMax[left - 1], sufMax[right]);
                curMin = min(preMin[left - 1], sufMin[right]);
            }
            ans = min(ans, curMax - curMin);
        }
        return ans;
    }
};
```

### Java

```java
class Solution {
    public int minDiff(int k, int[] arr) {
        int n = arr.length;
        int[] preMax = new int[n];
        int[] preMin = new int[n];
        int[] sufMax = new int[n];
        int[] sufMin = new int[n];
        preMax[0] = preMin[0] = arr[0];
        for (int i = 1; i < n; i++) {
            preMax[i] = Math.max(preMax[i - 1], arr[i]);
            preMin[i] = Math.min(preMin[i - 1], arr[i]);
        }
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            sufMax[i] = Math.max(sufMax[i + 1], arr[i]);
            sufMin[i] = Math.min(sufMin[i + 1], arr[i]);
        }
        int m = n - k;
        int ans = Integer.MAX_VALUE;
        for (int left = 0; left <= m; left++) {
            int right = left + k;
            int curMax, curMin;
            if (left == 0) {
                curMax = sufMax[right];
                curMin = sufMin[right];
            } else if (right == n) {
                curMax = preMax[left - 1];
                curMin = preMin[left - 1];
            } else {
                curMax = Math.max(preMax[left - 1], sufMax[right]);
                curMin = Math.min(preMin[left - 1], sufMin[right]);
            }
            ans = Math.min(ans, curMax - curMin);
        }
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} k
 * @param {number[]} arr
 * @returns {number}
 */
class Solution {
    minDiff(k, arr) {
        let n = arr.length;
        let preMax = new Array(n);
        let preMin = new Array(n);
        let sufMax = new Array(n);
        let sufMin = new Array(n);
        preMax[0] = preMin[0] = arr[0];
        for (let i = 1; i < n; i++) {
            preMax[i] = Math.max(preMax[i - 1], arr[i]);
            preMin[i] = Math.min(preMin[i - 1], arr[i]);
        }
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            sufMax[i] = Math.max(sufMax[i + 1], arr[i]);
            sufMin[i] = Math.min(sufMin[i + 1], arr[i]);
        }
        let m = n - k;
        let ans = Number.MAX_SAFE_INTEGER;
        for (let left = 0; left <= m; left++) {
            let right = left + k;
            let curMax, curMin;
            if (left === 0) {
                curMax = sufMax[right];
                curMin = sufMin[right];
            } else if (right === n) {
                curMax = preMax[left - 1];
                curMin = preMin[left - 1];
            } else {
                curMax = Math.max(preMax[left - 1], sufMax[right]);
                curMin = Math.min(preMin[left - 1], sufMin[right]);
            }
            ans = Math.min(ans, curMax - curMin);
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def minDiff(self, k: int, arr: list[int]) -> int:
        n = len(arr)
        preMax = [0] * n
        preMin = [0] * n
        sufMax = [0] * n
        sufMin = [0] * n
        preMax[0] = preMin[0] = arr[0]
        for i in range(1, n):
            preMax[i] = max(preMax[i - 1], arr[i])
            preMin[i] = min(preMin[i - 1], arr[i])
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1]
        for i in range(n - 2, -1, -1):
            sufMax[i] = max(sufMax[i + 1], arr[i])
            sufMin[i] = min(sufMin[i + 1], arr[i])
        m = n - k
        ans = float('inf')
        for left in range(m + 1):
            right = left + k
            if left == 0:
                curMax = sufMax[right]
                curMin = sufMin[right]
            elif right == n:
                curMax = preMax[left - 1]
                curMin = preMin[left - 1]
            else:
                curMax = max(preMax[left - 1], sufMax[right])
                curMin = min(preMin[left - 1], sufMin[right])
            ans = min(ans, curMax - curMin)
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax for arrays, loops and min/max functions changes.

First we allocate four arrays of the same length as the input. We fill the prefix pair by walking from index 0 to n-1. At every step we store the larger (or smaller) value between the previous prefix result and the current element. After this pass, any prefix max or min can be read in constant time.

We then fill the suffix pair by walking backward from the last index. The same idea applies: each cell remembers the extreme value from that position to the end of the array.

Once the four arrays exist, we calculate how many elements will stay (m = n - k). We initialise the answer to a very large number.

The main loop runs L from 0 to m inclusive. L is the number of elements we keep on the left side. The right side therefore begins at index L + k.

- If L is zero, only the right piece exists; we read the suffix max and min at that starting index.
- If the right piece starts exactly at n, only the left piece exists; we read the prefix max and min of the first L elements.
- Otherwise both pieces are present, so we take the larger of the two maxima and the smaller of the two minima.

Subtracting those two numbers gives the range for the current cut. We keep the smallest range discovered across all cuts.

Because every query after the preprocessing is O(1), the whole algorithm finishes in linear time. The same steps translate directly into Java (using Math.max/Math.min), JavaScript (using Math.max/Math.min) and Python (using the built-in max/min functions).

Edge cases such as k = 0 or remaining length equal to 1 are handled automatically by the same loop; no special branches are required.

## Examples

**Example 1**

Input: arr = [1, 2, 3, 4, 5], k = 3  
Output: 1  

Possible removals:

- Remove [1,2,3] → remaining [4,5] → range 1
- Remove [2,3,4] → remaining [1,5] → range 4
- Remove [3,4,5] → remaining [1,2] → range 1

The minimum range is 1.

**Example 2**

Input: arr = [2, 3, 1, 4, 6, 7], k = 3  
Output: 2  

- Remove [2,3,1] → remaining [4,6,7] → range 3
- Remove [3,1,4] → remaining [2,6,7] → range 5
- Remove [1,4,6] → remaining [2,3,7] → range 5
- Remove [4,6,7] → remaining [2,3,1] → range 2

The best answer is 2.

**Example 3**

Input: arr = [10, 20, 30], k = 0  
Output: 20  

No elements are removed, so the answer is simply the difference between the global maximum and minimum.

## How to Use / Run Locally

**C++**  

1. Save the code in a file named `main.cpp`.  
2. Compile: `g++ -std=c++17 main.cpp -o main`  
3. Run: `./main`  
   (You will need to add a simple driver that reads n, k and the array if you want to test interactively.)

**Java**  

1. Save the code in `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`

**JavaScript**  

1. Save the code in `solution.js`.  
2. Run with Node: `node solution.js`

**Python3**  

1. Save the code in `solution.py`.  
2. Run: `python3 solution.py`

In each language you can wrap the class method with a few lines that read input from stdin if you want to test against custom cases.

## Notes & Optimizations

- The solution already meets the expected O(n) time and O(n) space limits.
- Space can be reduced to O(1) extra memory by computing the answer in a more complicated single-pass style, but the four-array version is clearer and still accepted under the given constraints.
- When k equals n-1 the remaining array contains only one element, so the difference is always zero; the algorithm correctly produces this result.
- The same prefix/suffix idea works for many other “remove a subarray and optimize a range” problems.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
