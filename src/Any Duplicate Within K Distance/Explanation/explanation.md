# Any Duplicate Within K Distance - GeeksforGeeks Solution

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

We are given an array of integers and a positive integer k. The task is to check whether any duplicate value exists in the array such that the two occurrences are at most k indices apart.

In simple words, we need to find if there are two same numbers whose positions differ by at most k. If such a pair exists we return true, otherwise false.

This is a classic array problem that appears frequently in coding interviews and on platforms like GeeksforGeeks. The challenge is to solve it efficiently because the array can be large.

## Constraints

- 2 ≤ arr.size() ≤ 10^5
- 1 ≤ arr[i] ≤ 10^5
- 1 ≤ k < arr.size()

These constraints mean a brute-force O(n²) solution will time out. We need a linear time approach.

## Intuition

When I first looked at the problem, I realized I do not need to remember every past occurrence of a number. I only care about the numbers that appeared in the last k positions.

That observation naturally leads to a sliding window idea. If I maintain a window of the most recent k elements and can quickly check whether the current element already exists inside that window, the problem becomes simple and efficient.

## Approach

I maintain a sliding window of size at most k while iterating through the array from left to right.

At every index I first check if the current number is already present in the window. If it is, I have found a duplicate within distance k and can return true immediately.

If it is not present, I add the current number to the window. Then, if the window has grown larger than k, I remove the element that has just gone out of the window (the element at index i - k).

I repeat this process until the end of the array. If no duplicate is found inside any window of size k, I return false.

This approach guarantees we only look at relevant recent elements and never store more than k numbers at a time.

## Data Structures Used

I used a hash-based set (unordered_set in C++, HashSet in Java, Set in JavaScript and Python).

A set gives average O(1) time for insertion, deletion, and membership check. This is perfect because we need to ask “is this number already in the current window?” very frequently. Using a list or array for the window would make every check O(k) and the overall solution too slow for the given constraints.

## Operations & Behavior Summary

1. Create an empty set that will represent the current window.
2. Loop over every index i of the array.
3. If arr[i] already exists in the set, return true.
4. Insert arr[i] into the set.
5. If the size of the set becomes greater than k, remove the element that is now outside the window (arr[i - k]).
6. If the loop finishes without finding any duplicate, return false.

## Complexity

| Complexity Type   | Value          | Explanation |
|-------------------|----------------|-------------|
| Time Complexity   | O(n)           | We visit each element once. Each set operation (insert, erase, lookup) takes average O(1) time. |
| Space Complexity  | O(min(n, k))   | The set never stores more than k + 1 elements at any moment. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    bool checkWithinK(vector<int>& arr, int k) {
        unordered_set<int> window;
        for (int i = 0; i < arr.size(); i++) {
            if (window.count(arr[i])) return true;
            window.insert(arr[i]);
            if (window.size() > k) {
                window.erase(arr[i - k]);
            }
        }
        return false;
    }
};
```

### Java
```java
class Solution {
    public boolean checkWithinK(int[] arr, int k) {
        Set<Integer> window = new HashSet<>();
        for (int i = 0; i < arr.length; i++) {
            if (window.contains(arr[i])) return true;
            window.add(arr[i]);
            if (window.size() > k) {
                window.remove(arr[i - k]);
            }
        }
        return false;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */

class Solution {
    checkWithinK(arr, k) {
        const window = new Set();
        for (let i = 0; i < arr.length; i++) {
            if (window.has(arr[i])) return true;
            window.add(arr[i]);
            if (window.size > k) {
                window.delete(arr[i - k]);
            }
        }
        return false;
    }
}
```

### Python3
```python
class Solution:
    def checkWithinK(self, arr: list[int], k: int) -> bool:
        window = set()
        for i in range(len(arr)):
            if arr[i] in window:
                return True
            window.add(arr[i])
            if len(window) > k:
                window.remove(arr[i - k])
        return False
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is identical across all four languages. Only the syntax of creating and using the set changes.

I start by creating an empty set that will hold the numbers currently inside the sliding window of size at most k.

Then I iterate from left to right. At every position I first ask the set whether the current number is already present. This check is the heart of the algorithm. If the answer is yes, the same number appeared earlier inside the allowed distance, so I return true at once.

If the number is new, I insert it into the set. After insertion I look at the size of the set. When the size exceeds k, the oldest element in the window (the one that is now more than k steps behind) must be removed. That element sits at index i - k.

Because every element is inserted and removed at most once, the whole process stays linear. The set automatically handles uniqueness, so I never have to worry about counting frequencies or storing indices.

Edge cases are handled naturally:
- When k is 1, the window only ever contains the previous element.
- When all elements are unique, the set grows and shrinks but never finds a match.
- When a duplicate appears exactly at distance k, the check still succeeds because the old occurrence is still inside the set at the moment we examine the new one.

## Examples

**Example 1**

Input: arr = [1, 5, 4, 5, 1], k = 3  
Output: true  

Trace:  
- Index 0: insert 1. Window = {1}  
- Index 1: insert 5. Window = {1, 5}  
- Index 2: insert 4. Window = {1, 5, 4}  
- Index 3: 5 is already in the window → return true (distance between the two 5s is 2 ≤ 3)

**Example 2**

Input: arr = [10, 2, 3, 4, 10, 5], k = 3  
Output: false  

Trace:  
- The two 10s are at distance 4, which is greater than k. When the second 10 arrives, the first 10 has already been removed from the window. No other duplicates exist, so the answer is false.

**Example 3**

Input: arr = [5, 1, 3, 2, 4], k = 3  
Output: false  

All elements are distinct, so the set never reports a match.

## How to Use / Run Locally

**C++**  
1. Copy the C++ solution into a file named `main.cpp`.  
2. Compile with: `g++ -std=c++17 main.cpp -o main`  
3. Run with: `./main`  
   (You will need to add a small main function that reads input and calls the method if you want to test interactively.)

**Java**  
1. Copy the Java solution into a file named `Solution.java`.  
2. Compile with: `javac Solution.java`  
3. Run with: `java Solution`

**JavaScript**  
1. Copy the JavaScript solution into a file named `solution.js`.  
2. Run with: `node solution.js`  
   (Add a few console.log test cases at the bottom to verify.)

**Python3**  
1. Copy the Python solution into a file named `solution.py`.  
2. Run with: `python3 solution.py`  
   (You can add a few print statements with sample inputs for quick testing.)

## Notes & Optimizations

- The solution is already optimal for the given constraints. Both time and space are linear in the size of the window.
- An alternative approach is to store the last seen index of every number in a hash map and check the difference of indices. That also works in O(n) time and O(n) space. The sliding-window set version is slightly more space-efficient when k is much smaller than n.
- Be careful with the order of operations: always check for presence before inserting the current element, and only remove the outgoing element after the insertion (or after the check). Changing this order can produce wrong answers on edge cases.
- The problem guarantees k is at least 1 and strictly less than the array length, so we never have to worry about an empty window or out-of-bounds access when removing arr[i - k].

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
