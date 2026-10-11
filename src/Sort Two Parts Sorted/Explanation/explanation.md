# Sort Two Parts Sorted

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

You are given an integer array that is made of two sorted parts joined together. There is a single break point somewhere in the array (it can even be at the start or the end). Your task is to merge those two already-sorted parts so the whole array becomes sorted.

In simple words: the left side of the break is sorted, the right side of the break is sorted, and you need to produce one fully sorted array from them.

This is a classic GeeksforGeeks problem that tests how well you can find the break point and then merge two sorted ranges efficiently using the two-pointer technique.

## Constraints

- 1 ≤ arr.size() ≤ 10^6
- -10^5 ≤ arr[i] ≤ 10^5
- Expected Time Complexity: O(n)
- Expected Auxiliary Space: O(n)

Because n can be as large as one million, any solution slower than linear time will time out.

## Intuition

When I first saw the problem I noticed that the array is not completely unsorted. It is only “broken” at one place. If I can locate that single drop (the first index where arr[i] > arr[i+1]), I suddenly have two clean sorted ranges.  

Merging two sorted arrays is something we already know how to do with two pointers in linear time. So the whole problem reduces to “find the break, then merge.” That observation immediately points toward an O(n) solution instead of calling a full sorting library which would cost O(n log n).

## Approach

1. Scan the array from left to right and stop at the first position where the current element is greater than the next one. That index is the end of the left sorted part.
2. If no such position exists, the array is already sorted and we can return immediately.
3. Create a temporary array of the same size.
4. Use two pointers (one for the left part, one for the right part) to merge the two ranges into the temporary array, always taking the smaller value.
5. When one part is finished, copy the remaining elements of the other part.
6. Copy the temporary array back into the original array so the function stays in-place from the caller’s point of view.

This keeps the time linear and uses only one extra array of size n.

## Data Structures Used

- The input array itself (vector in C++, int[] in Java, Array in JavaScript, list in Python).
- One temporary array of the same length to hold the merged result.  
  A temporary array is the simplest and most reliable way to perform a stable linear merge without overwriting values we still need.

No stacks, queues, heaps or maps are required.

## Operations & Behavior Summary

- Linear scan to locate the break point.
- Early exit if the array is already fully sorted.
- Initialize three indices: left start, right start, and write position in the temporary array.
- While both parts still have elements, compare the heads and write the smaller one.
- Drain whichever part still has leftover elements.
- Copy the temporary result back into the original array.

The algorithm never re-examines an element more than a constant number of times.

## Complexity

| Complexity       | Value | Explanation |
|------------------|-------|-------------|
| Time Complexity  | O(n)  | One pass to find the break point plus one pass to merge every element. n is the length of the array. |
| Space Complexity | O(n)  | A temporary array of size n is allocated to store the merged values before writing them back. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    void mergeTwoParts(vector<int>& arr) {
        int n = arr.size();
        int breakPoint = -1;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                breakPoint = i;
                break;
            }
        }
        if (breakPoint == -1) return;
        vector<int> temp(n);
        int i = 0, j = breakPoint + 1, k = 0;
        while (i <= breakPoint && j < n) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= breakPoint) {
            temp[k++] = arr[i++];
        }
        while (j < n) {
            temp[k++] = arr[j++];
        }
        for (int p = 0; p < n; p++) {
            arr[p] = temp[p];
        }
    }
};
```

### Java
```java
class Solution {
    public void mergeTwoParts(int[] arr) {
        int n = arr.length;
        int breakPoint = -1;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                breakPoint = i;
                break;
            }
        }
        if (breakPoint == -1) return;
        int[] temp = new int[n];
        int i = 0, j = breakPoint + 1, k = 0;
        while (i <= breakPoint && j < n) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= breakPoint) {
            temp[k++] = arr[i++];
        }
        while (j < n) {
            temp[k++] = arr[j++];
        }
        for (int p = 0; p < n; p++) {
            arr[p] = temp[p];
        }
    }
}
```

### JavaScript
```javascript
class Solution {
    mergeTwoParts(arr) {
        let n = arr.length;
        let breakPoint = -1;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                breakPoint = i;
                break;
            }
        }
        if (breakPoint === -1) return;
        let temp = new Array(n);
        let i = 0, j = breakPoint + 1, k = 0;
        while (i <= breakPoint && j < n) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= breakPoint) {
            temp[k++] = arr[i++];
        }
        while (j < n) {
            temp[k++] = arr[j++];
        }
        for (let p = 0; p < n; p++) {
            arr[p] = temp[p];
        }
    }
}
```

### Python3
```python
class Solution:
    def mergeTwoParts(self, arr):
        n = len(arr)
        breakPoint = -1
        for i in range(n - 1):
            if arr[i] > arr[i + 1]:
                breakPoint = i
                break
        if breakPoint == -1:
            return
        temp = [0] * n
        i, j, k = 0, breakPoint + 1, 0
        while i <= breakPoint and j < n:
            if arr[i] <= arr[j]:
                temp[k] = arr[i]
                i += 1
            else:
                temp[k] = arr[j]
                j += 1
            k += 1
        while i <= breakPoint:
            temp[k] = arr[i]
            i += 1
            k += 1
        while j < n:
            temp[k] = arr[j]
            j += 1
            k += 1
        for p in range(n):
            arr[p] = temp[p]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

First we store the length of the array so we do not keep asking for it.  

We then walk from index 0 to n-2 looking for the first place where the current value is larger than the next value. That index becomes the break point. If we finish the loop without finding such a place, the array is already sorted and we return at once. This correctly handles the edge case where one of the two parts is empty.

Once we know the break point, the left range is [0 \ldots breakPoint] and the right range is [breakPoint+1 \ldots n-1]. Both ranges are guaranteed to be sorted by the problem statement.

We allocate a temporary array of size n. Three indices are set:  
- i starts at the beginning of the left part,  
- j starts at the beginning of the right part,  
- k starts at the beginning of the temporary array.

While both parts still contain elements we compare the values at i and j, write the smaller one into the temporary array, and advance the corresponding pointer together with k.  

After one part is exhausted we simply copy the remaining elements of the other part. This is exactly the same merge step used inside merge-sort.

Finally we copy every element from the temporary array back into the original array. Because the function signature is void and receives the array by reference (or as a mutable object), the caller sees the sorted result without any extra return value.

Edge cases that are automatically handled:  
- break point at the very start (left part empty),  
- break point at the very end (right part empty),  
- array of length 1,  
- all elements equal.

## Examples

**Example 1**  
Input: [2, 3, 8, -1, 7, 10]  
Break point found at index 2 (8 > -1).  
Left part: [2, 3, 8]  
Right part: [-1, 7, 10]  
Merge produces: [-1, 2, 3, 7, 8, 10]

**Example 2**  
Input: [-4, 6, 9, -1, 3]  
Break point found at index 2 (9 > -1).  
Left part: [-4, 6, 9]  
Right part: [-1, 3]  
Merge produces: [-4, -1, 3, 6, 9]

**Example 3**  
Input: [10, 20, 30]  
No break point exists.  
The array is already sorted, so the function returns without changing anything.

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Open a terminal and run:  
   `g++ -std=c++17 main.cpp -o main`  
3. Execute: `./main`  
   (You will need to add a small driver that creates a vector and prints the result.)

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run with a driver class that creates an int array and calls `mergeTwoParts`.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node: `node solution.js`  
   (Add a few console.log statements to test the function.)

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run: `python3 solution.py`  
   (Add a short test block at the bottom that creates a list and prints it after calling the method.)

In every language you only need to supply a driver that builds the input array, calls the method, and prints the array afterwards.

## Notes & Optimizations

- The solution already meets the expected O(n) time and O(n) space bounds required by the problem.
- Because the two parts are independently sorted, a full library sort is unnecessary and would be slower.
- If the problem ever allowed multiple break points the current approach would fail; the single-break assumption is essential.
- In-place merging without extra space is possible but far more complicated and usually not worth the extra constant factors for this problem.
- Negative numbers and duplicates are handled correctly because the comparison uses ≤.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)