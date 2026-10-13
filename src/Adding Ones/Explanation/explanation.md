# Adding Ones - Efficient Array Update Solution | GeeksforGeeks DSA Problem

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

You are given an array of size n that starts with all zeros. You also receive a list of positive integers called updates.  

For every value j in the updates list, you must add 1 to every element in the array whose index is greater than or equal to j. The indices in the updates list are 1-based.  

After performing all the updates, return the final state of the array.  

This is a classic range-update problem that appears frequently in competitive programming and GeeksforGeeks practice sets. A brute-force solution is too slow for the given limits, so an efficient O(n + k) approach is required.

## Constraints

- 1 ≤ n, updates.size() ≤ 10^5
- 1 ≤ updates[i] ≤ n

## Intuition

The first thing that stands out is that every update touches a continuous suffix of the array. Doing a loop from j to n for each update would cost O(n × k) time, which is unacceptable when both n and k can be 100000.  

I realized that the final value at any position i is simply the number of updates whose value is less than or equal to i. Instead of applying the increments one by one, I can mark the starting points of each update and then let a single prefix-sum pass spread those marks across the whole array. This turns the problem into a classic difference-array + prefix-sum technique.

## Approach

1. Create a result array of size n filled with zeros.  
2. For every update value j, add 1 at index j-1 (converting from 1-based to 0-based).  
3. Walk through the array from left to right. At each index, add the value of the previous index.  
4. After this single pass the array already contains the correct answer for every position.  

No extra data structures beyond the result array are needed. The whole process runs in linear time relative to n and the number of updates.

## Data Structures Used

- Array / Vector / List – used to store the final answer and to perform the in-place prefix-sum calculation. Chosen because random access and sequential traversal are both O(1) / O(n) and match the problem’s requirements perfectly.

## Operations & Behavior Summary

- Initialize an array of length n with zeros.  
- Place a +1 mark at the starting index of every update.  
- Convert the marks into full range increments by computing a running sum from left to right.  
- Return the finished array.

## Complexity

| Complexity Type   | Value     | Explanation                                                                 |
|-------------------|-----------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n + k)  | O(k) time to place the marks and O(n) time for the prefix-sum pass.         |
| Space Complexity  | O(n)      | Only the result array is allocated. Auxiliary space beyond the output is O(1). |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> update(int n, vector<int>& updates) {
        vector<int> arr(n, 0);
        for (int j : updates) {
            arr[j - 1]++;
        }
        for (int i = 1; i < n; i++) {
            arr[i] += arr[i - 1];
        }
        return arr;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> update(int n, int[] updates) {
        ArrayList<Integer> arr = new ArrayList<>(Collections.nCopies(n, 0));
        for (int j : updates) {
            arr.set(j - 1, arr.get(j - 1) + 1);
        }
        for (int i = 1; i < n; i++) {
            arr.set(i, arr.get(i) + arr.get(i - 1));
        }
        return arr;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @param {number[]} updates
 * @return {number[]}
 */
class Solution {
    update(n, updates) {
        let arr = new Array(n).fill(0);
        for (let j of updates) {
            arr[j - 1]++;
        }
        for (let i = 1; i < n; i++) {
            arr[i] += arr[i - 1];
        }
        return arr;
    }
}
```

### Python3

```python
class Solution:
    def update(self, n: int, updates: list[int]) -> list[int]:
        arr = [0] * n
        for j in updates:
            arr[j - 1] += 1
        for i in range(1, n):
            arr[i] += arr[i - 1]
        return arr
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax for creating and modifying the array differs.

- First I allocate an array of size n and set every element to 0. This matches the problem’s initial state.  
- Then I iterate over every value in the updates list. Because the problem uses 1-based indexing, I subtract one before writing the +1 mark. At this stage the array only contains isolated starting points.  
- Next I start a second loop from index 1 to n-1. At each step I add the value of the previous cell to the current cell. This single left-to-right sweep turns every mark into a continuous range of increments that reach the end of the array.  
- Finally I return the completed array.  

Edge cases are handled naturally: if an update equals n, only the last cell receives the mark; if many updates share the same value, the mark simply becomes larger and the prefix sum still produces the correct totals. No special handling is required for empty update lists because the array stays all zeros, which is the correct answer.

## Examples

**Example 1**  
Input: n = 3, updates = [1, 1, 2, 3]  
Output: [2, 3, 4]  

Trace:  

- After placing marks: [2, 1, 1]  
- After prefix sum: [2, 3, 4]

**Example 2**  
Input: n = 2, updates = [1, 1, 1]  
Output: [3, 3]  

Trace:  

- After placing marks: [3, 0]  
- After prefix sum: [3, 3]

**Example 3**  
Input: n = 5, updates = [2, 4]  
Output: [0, 1, 1, 2, 2]  

Trace:  

- After placing marks: [0, 1, 0, 1, 0]  
- After prefix sum: [0, 1, 1, 2, 2]

## How to Use / Run Locally

**C++**  

1. Copy the C++ solution into a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run with `./main`.  

**Java**  

1. Copy the Java solution into a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.  

**JavaScript**  

1. Copy the JavaScript solution into a file named `solution.js`.  
2. Run with `node solution.js`.  

**Python3**  

1. Copy the Python solution into a file named `solution.py`.  
2. Run with `python3 solution.py`.  

You can add a simple driver that reads n and the updates list from standard input if you want to test against custom cases.

## Notes & Optimizations

- The solution already achieves the optimal O(n + k) time and constant auxiliary space required by the problem.  
- An alternative frequency-count approach (count how many times each index appears in updates, then prefix-sum the frequencies) yields the same complexity and is equally valid.  
- Watch out for the 1-based to 0-based conversion; forgetting it is the most common source of off-by-one errors.  
- When n or k is at the upper limit of 10^5 the algorithm still finishes comfortably within typical time limits.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
