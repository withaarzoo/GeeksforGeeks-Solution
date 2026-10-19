# Count Indices That Escape the Array

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

You are given an array `arr` where each value tells you exactly how many steps to jump from that index. A positive number means jump right, a negative number means jump left, and zero means stay put.

An index is called good if following the jumps from it eventually takes you outside the array. If the jumps form an infinite loop or get stuck, the index is bad.

The task is to return the total number of good indices.

This is a classic array jump and cycle detection problem that appears in many coding interviews and competitive programming contests.

## Constraints

- 1 ≤ arr.size() ≤ 10⁵
- -10⁵ ≤ arr[i] ≤ 10⁵

Because the array can be as large as 100,000 elements, any solution slower than linear time will time out.

## Intuition

The first thing I noticed is that every index has only two possible fates: it either walks off the array or it falls into a cycle (or a zero trap).

If I simply simulate the path from every index, the same nodes get visited again and again, which is too slow for n = 10⁵.

So I thought of marking nodes while I walk. Once I know whether a node is good or bad, any later path that reaches it can reuse that answer instead of walking the same road twice. That single observation turns the problem into a clean O(n) solution.

## Approach

I keep a status array for every index:

- 0 → never visited
- 1 → currently being visited (part of the active path)
- 2 → already known to be good
- 3 → already known to be bad

I scan the array from left to right. Whenever I find an unvisited index I start a new walk from it, recording every index I visit in a temporary list and marking them as “visiting”.

The walk stops when one of three things happens:

- I jump outside the array
- I land on a node that is already marked good or bad
- I land on a node that is still marked “visiting” (I have found a cycle)

If the walk left the array or hit a known-good node, every index on the path is good. Otherwise the whole path is bad. I write the final status back onto all nodes in the path and continue.

At the end I simply count how many indices received status 2.

## Data Structures Used

- Status array (size n) – stores the state of each index so we never re-process a node.
- Temporary path list – holds the indices of the current walk so we can assign the final good/bad label to all of them at once.

These two structures are enough to solve the problem in linear time and linear space.

## Operations & Behavior Summary

1. Create a status array filled with zeros.
2. For every index i that is still unvisited:
   - Start a walk, mark each node as visiting, and collect the path.
   - Stop when you leave the array, hit a known answer, or detect a cycle.
   - Decide whether the whole path is good or bad.
   - Write that answer onto every node in the path.
3. Count how many nodes ended up with the “good” status and return the count.

## Complexity

| Complexity       | Value | Explanation                                                                 |
|------------------|-------|-----------------------------------------------------------------------------|
| Time Complexity  | O(n)  | Each index is visited a constant number of times (once while walking, once when writing the final status). |
| Space Complexity | O(n)  | Status array of size n plus a temporary path that can hold at most n indices in the worst case. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int goodIndices(vector<int> &arr) {
        int n = arr.size();
        vector<int> status(n, 0);
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (status[i] != 0) continue;
            vector<int> path;
            int curr = i;
            while (curr >= 0 && curr < n && status[curr] == 0) {
                status[curr] = 1;
                path.push_back(curr);
                curr += arr[curr];
            }
            bool good = false;
            if (curr < 0 || curr >= n) good = true;
            else if (status[curr] == 2) good = true;
            int finalStatus = good ? 2 : 3;
            for (int idx : path) status[idx] = finalStatus;
        }
        for (int s : status) if (s == 2) ans++;
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int goodIndices(int[] arr) {
        int n = arr.length;
        int[] status = new int[n];
        int ans = 0;
        for (int i = 0; i < n; i++) {
            if (status[i] != 0) continue;
            java.util.ArrayList<Integer> path = new java.util.ArrayList<>();
            int curr = i;
            while (curr >= 0 && curr < n && status[curr] == 0) {
                status[curr] = 1;
                path.add(curr);
                curr += arr[curr];
            }
            boolean good = false;
            if (curr < 0 || curr >= n) good = true;
            else if (status[curr] == 2) good = true;
            int finalStatus = good ? 2 : 3;
            for (int idx : path) status[idx] = finalStatus;
        }
        for (int s : status) if (s == 2) ans++;
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
    goodIndices(arr) {
        const n = arr.length;
        const status = new Array(n).fill(0);
        let ans = 0;
        for (let i = 0; i < n; i++) {
            if (status[i] !== 0) continue;
            const path = [];
            let curr = i;
            while (curr >= 0 && curr < n && status[curr] === 0) {
                status[curr] = 1;
                path.push(curr);
                curr += arr[curr];
            }
            let good = false;
            if (curr < 0 || curr >= n) good = true;
            else if (status[curr] === 2) good = true;
            const finalStatus = good ? 2 : 3;
            for (const idx of path) status[idx] = finalStatus;
        }
        for (const s of status) if (s === 2) ans++;
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def goodIndices(self, arr):
        n = len(arr)
        status = [0] * n
        ans = 0
        for i in range(n):
            if status[i] != 0:
                continue
            path = []
            curr = i
            while 0 <= curr < n and status[curr] == 0:
                status[curr] = 1
                path.append(curr)
                curr += arr[curr]
            good = False
            if curr < 0 or curr >= n:
                good = True
            elif status[curr] == 2:
                good = True
            finalStatus = 2 if good else 3
            for idx in path:
                status[idx] = finalStatus
        for s in status:
            if s == 2:
                ans += 1
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is identical in all four languages; only the syntax changes.

I first allocate a status array of size n and fill it with zeros. Then I loop over every index. If the current index already has a non-zero status I skip it, because an earlier walk has already decided its fate.

When I find a fresh index I create an empty path list and set a cursor to that index. While the cursor stays inside the array and the status of the current position is still zero, I mark it as visiting (status = 1), push it onto the path, and jump by adding arr[cursor].

When the while loop ends I look at the final position of the cursor:

- If it is outside the array, the path is good.
- If it landed on a node already marked 2, the path is also good.
- In every other case (cycle or known-bad node) the path is bad.

I convert that boolean decision into the final status number (2 or 3) and write it onto every index stored in the path list. After this write, those nodes will never be walked again.

Once the outer loop finishes I walk through the status array one last time and count how many entries equal 2. That count is the answer.

Edge cases such as zeros, self-jumps, and jumps that immediately leave the array are handled automatically by the same rules, so no extra special-case code is required.

## Examples

**Example 1**

Input: `[2, 3, -1, 2, -2, 4, 1]`

- Indices 3, 5 and 6 eventually jump outside the array → good
- Indices 1, 2 and 4 form a cycle, and index 0 falls into that cycle → bad

Output: `3`

**Example 2**

Input: `[1, 0, -3, 0, -5, 0]`

- Indices 2 and 4 jump outside → good
- All zeros and the path that reaches a zero are bad

Output: `2`

**Example 3**

Input: `[0]`

- Single zero stays forever → bad

Output: `0`

## How to Use / Run Locally

**C++**
```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

**Java**
```bash
javac Solution.java
java Solution
```

**JavaScript**
```bash
node solution.js
```

**Python3**
```bash
python3 solution.py
```

Replace the file names with whatever you named your source files. Make sure the driver code that reads input and calls the function is present.

## Notes & Optimizations

- The solution already runs in optimal O(n) time and O(n) space.
- Using recursion instead of an iterative path list would risk stack overflow on large n, so the iterative version is safer.
- If the problem constraints ever become tighter on memory, the status array can be compressed to two bits per entry, but for typical contest limits the plain integer array is fine.
- Watch out for integer overflow when adding arr[i] in languages with fixed-size integers; the given constraints keep the intermediate values inside 32-bit range, so no extra care is needed here.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)