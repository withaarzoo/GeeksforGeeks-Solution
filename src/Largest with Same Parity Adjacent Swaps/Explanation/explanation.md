# Largest with Same Parity Adjacent Swaps - Lexicographically Largest Array Solution

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

You are given an array of integers. The only allowed operation is to swap two adjacent elements if their sum is even. In simple terms, you can swap neighbors only when both numbers are odd or both are even (same parity).

Your task is to perform this operation any number of times (including zero) and produce the lexicographically largest possible array. An array X is lexicographically larger than array Y if at the first position where they differ, X has the bigger value.

This is a classic competitive programming problem that tests your understanding of parity-based constraints and how to rearrange elements under restricted swaps to achieve the lexicographically largest array.

## Constraints

- 1 ≤ arr.size() ≤ 10^5
- 0 ≤ arr[i] ≤ 10^5
- The array may contain duplicate elements
- Expected time complexity: O(n log n)
- Expected auxiliary space: O(1)

## Intuition

The key observation is that numbers of different parity can never swap with each other. An odd number can only move by swapping with another odd number, and the same applies to even numbers. This means different-parity numbers act like fixed barriers.

As a result, the array breaks into independent groups of consecutive elements that all share the same parity. Inside any such group you can freely rearrange the numbers because repeated adjacent swaps of the same parity are allowed. Across groups, nothing can move.

To get the lexicographically largest array, the natural idea is to make each of these groups as large as possible from the left. That means sorting every same-parity segment in descending order.

## Approach

Walk through the array and identify every maximal contiguous segment where all elements have the same parity. For each segment, sort its elements in descending order in place. Because the segments cannot mix with each other, this placement automatically puts the largest possible values in the earliest positions that the parity rules allow. After processing every segment, the entire array becomes the lexicographically largest version that can be obtained under the given swap constraints.

This approach directly solves the "largest with same parity adjacent swaps" problem while staying within the expected time and space limits for competitive programming.

## Data Structures Used

- The input array itself (vector in C++, int array / ArrayList in Java, list/array in JavaScript and Python). No extra major data structures are required because sorting happens in place inside the original array.
- Temporary index variables to mark the start and end of each same-parity segment.

These choices keep auxiliary space minimal while still allowing efficient sorting of the relevant portions.

## Operations & Behavior Summary

1. Start from the left of the array.
2. Find the longest stretch of consecutive elements that all have the same parity (odd or even).
3. Sort that stretch from largest to smallest.
4. Move past the just-processed stretch and repeat until the end of the array is reached.
5. Return the modified array.

The algorithm never tries to move an element past a different-parity neighbor, which correctly respects the swap rules while maximizing the lexicographical order.

## Complexity

| Complexity Type     | Value          | Explanation                                                                 |
|---------------------|----------------|-----------------------------------------------------------------------------|
| Time Complexity     | O(n log n)     | Finding segments takes O(n). Sorting all segments together costs O(n log n) in the worst case when the whole array has the same parity. |
| Space Complexity    | O(1) auxiliary | Sorting is performed in place. Only a few index variables are used beyond the input array. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    vector<int> lexicographicallyLargest(vector<int> &arr) {
        int n = arr.size();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j + 1 < n && (arr[j] % 2 == arr[j + 1] % 2)) {
                j++;
            }
            sort(arr.begin() + i, arr.begin() + j + 1, greater<int>());
            i = j + 1;
        }
        return arr;
    }
};
```

### Java
```java
class Solution {
    public ArrayList<Integer> lexicographicallyLargest(int[] arr) {
        int n = arr.length;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j + 1 < n && (arr[j] % 2 == arr[j + 1] % 2)) {
                j++;
            }
            Arrays.sort(arr, i, j + 1);
            for (int left = i, right = j; left < right; left++, right--) {
                int temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
            }
            i = j + 1;
        }
        ArrayList<Integer> res = new ArrayList<>();
        for (int val : arr) res.add(val);
        return res;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @return {number[]}
 */
class Solution {
    lexicographicallyLargest(arr) {
        let n = arr.length;
        let i = 0;
        while (i < n) {
            let j = i;
            while (j + 1 < n && (arr[j] % 2 === arr[j + 1] % 2)) {
                j++;
            }
            let segment = arr.slice(i, j + 1);
            segment.sort((a, b) => b - a);
            for (let k = 0; k < segment.length; k++) {
                arr[i + k] = segment[k];
            }
            i = j + 1;
        }
        return arr;
    }
}
```

### Python3
```python
class Solution:
    def lexicographicallyLargest(self, arr: list[int]) -> list[int]:
        n = len(arr)
        i = 0
        while i < n:
            j = i
            while j + 1 < n and (arr[j] % 2 == arr[j + 1] % 2):
                j += 1
            arr[i:j + 1] = sorted(arr[i:j + 1], reverse=True)
            i = j + 1
        return arr
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is identical across languages; only the syntax for finding segments and sorting differs.

- Initialize an index at the start of the array.
- While the index is inside the array, locate the farthest position that still belongs to the same-parity group by checking consecutive pairs.
- Once the group boundaries are known, sort that range in descending order.
  - In C++ this is done with a single call to sort using a greater comparator.
  - In Java the built-in sort is ascending, so a reverse step follows.
  - In JavaScript a temporary slice is sorted and written back.
  - In Python a slice assignment with a reverse-sorted list is used.
- Advance the index past the current group and continue.

Edge cases such as a single-element array, an array of all odds or all evens, or alternating parities are handled automatically because a group of length 1 needs no sorting and groups never cross parity boundaries.

This produces the lexicographically largest array under same-parity adjacent swaps for every valid input.

## Examples

**Example 1**  
Input: [1, 3, 5]  
All elements are odd, so they form one group. Sorting descending gives [5, 3, 1].  
Output: [5, 3, 1]

**Example 2**  
Input: [1, 3, 4, 2]  
Two groups appear: the odds [1, 3] and the evens [4, 2].  
Sorting each group descending produces [3, 1, 4, 2].  
Output: [3, 1, 4, 2]

**Example 3**  
Input: [4, 1, 3, 2]  
Groups: [4], [1, 3], [2].  
After sorting the middle group the array becomes [4, 3, 1, 2].  
Output: [4, 3, 1, 2]

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `solution.cpp`.  
2. Compile with `g++ -std=c++17 solution.cpp -o solution`.  
3. Run with `./solution`. Provide input according to the problem’s input format.

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with `node solution.js`. Make sure Node.js is installed.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run with `python3 solution.py`.

In each case you may need a small main/driver function to read the array and print the result, depending on the online judge or local testing setup.

## Notes & Optimizations

- The solution already meets the expected O(n log n) time and O(1) auxiliary space.
- When the array contains many alternating odd and even numbers, most groups have length 1 and the algorithm runs close to linear time.
- Duplicate values are handled correctly because stable or unstable sorting both produce a valid lexicographically largest result under the problem definition.
- An alternative approach that collects all odds and all evens separately would be incorrect, because elements cannot cross different-parity barriers.
- For extremely large n the in-place sorting of segments remains efficient and cache-friendly.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)