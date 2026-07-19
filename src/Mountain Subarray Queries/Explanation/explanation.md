# Mountain Subarray Queries

An efficient `O(n + q)` solution for the **Mountain Subarray Queries** problem from GeeksforGeeks using preprocessing. This repository explains the complete thought process, algorithm, complexity analysis, and provides implementations in multiple programming languages.

The solution uses two helper arrays to answer each query in constant time, making it suitable for large inputs where both the array size and the number of queries can be as high as `10^5`.

---

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

In this problem, we are given an integer array and multiple queries.

Each query contains two indices, `l` and `r`, and we need to determine whether the subarray from `l` to `r` forms a **mountain array**.

A mountain subarray is one where:

* The values first remain non-decreasing (they can increase or stay the same).
* After reaching a peak, the values remain non-increasing (they can decrease or stay the same).

The turning point can appear anywhere in the subarray, including the beginning or the end. Because of this, an entirely non-decreasing or entirely non-increasing subarray is also considered a valid mountain.

Since there can be up to `100000` queries, checking every subarray separately would be too slow. The goal is to preprocess the array once so that every query can be answered in constant time.

This solution is based on preprocessing, making it an efficient DSA solution for competitive programming and coding interviews.

---

## Constraints

| Constraint        | Value               |
| ----------------- | ------------------- |
| Array Size        | `1 ≤ n ≤ 10^5`      |
| Number of Queries | `1 ≤ q ≤ 10^5`      |
| Array Element     | `1 ≤ arr[i] ≤ 10^6` |
| Query Range       | `0 ≤ l ≤ r < n`     |

---

## Intuition

My first thought was to check every query by scanning the entire subarray.

That works for small inputs, but with up to `100000` queries, it quickly becomes too slow.

Then I noticed that every mountain subarray has only one direction change. It starts by moving upward (or staying equal) and then starts moving downward (or staying equal).

Instead of checking this pattern again and again for every query, I decided to preprocess the array once.

I stored how far I could continue moving to the right while the sequence remained non-decreasing. I also stored how far I could continue while it remained non-increasing.

Once those two helper arrays were ready, every query became just a few array lookups.

---

## Approach

The solution follows these steps:

1. Build an array called `up`.
2. For every position, store the farthest index that can be reached while the sequence stays non-decreasing.
3. Build another array called `down`.
4. For every position, store the farthest index that can be reached while the sequence stays non-increasing.
5. For each query, start from the left boundary.
6. Find the end of the increasing part using the `up` array.
7. If the increasing part already reaches the right boundary, the answer is `true`.
8. Otherwise, check whether the decreasing part can cover the remaining range using the `down` array.
9. If it can, the subarray is a mountain. Otherwise, it is not.

This preprocessing approach answers every query in constant time.

---

## Data Structures Used

### Array

The original input array stores all values.

### Helper Array (`up`)

Stores the farthest position reachable while remaining non-decreasing.

### Helper Array (`down`)

Stores the farthest position reachable while remaining non-increasing.

### Result Array

Stores the answer (`true` or `false`) for every query.

---

## Operations & Behavior Summary

The algorithm works in three major stages.

**Stage 1: Preprocessing Increasing Segments**

* Traverse the array from right to left.
* Compute how far every index can extend while remaining non-decreasing.

**Stage 2: Preprocessing Decreasing Segments**

* Traverse the array again from right to left.
* Compute how far every index can extend while remaining non-increasing.

**Stage 3: Process Queries**

* Read the query boundaries.
* Find the possible mountain peak.
* Check whether the remaining part satisfies the decreasing condition.
* Store the result.
* Repeat until every query has been answered.

---

## Complexity

| Operation     | Complexity | Explanation                                             |
| ------------- | ---------- | ------------------------------------------------------- |
| Preprocessing | `O(n)`     | Build both helper arrays once.                          |
| Each Query    | `O(1)`     | Only a few array accesses are required.                 |
| Total Time    | `O(n + q)` | `n` is the array size and `q` is the number of queries. |
| Space         | `O(n)`     | Two helper arrays are used for preprocessing.           |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<bool> processQueries(vector<int> &arr, vector<vector<int>> &queries) {
        int n = arr.size();

        // up[i] = farthest index reachable from i while array stays non-decreasing
        vector<int> up(n);

        // down[i] = farthest index reachable from i while array stays non-increasing
        vector<int> down(n);

        // Last element can reach only itself
        up[n - 1] = n - 1;

        // Build the non-decreasing reach array from right to left
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] <= arr[i + 1])
                up[i] = up[i + 1];
            else
                up[i] = i;
        }

        // Last element can also reach only itself
        down[n - 1] = n - 1;

        // Build the non-increasing reach array from right to left
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1])
                down[i] = down[i + 1];
            else
                down[i] = i;
        }

        vector<bool> ans;

        // Answer every query in O(1)
        for (auto &q : queries) {
            int l = q[0];
            int r = q[1];

            // End of the increasing part
            int peak = up[l];

            // Entire range is non-decreasing
            if (peak >= r)
                ans.push_back(true);

            // Check whether decreasing part covers the remaining range
            else
                ans.push_back(down[peak] >= r);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Boolean> processQueries(int[] arr, int[][] queries) {

        int n = arr.length;

        // up[i] = farthest index reachable while remaining non-decreasing
        int[] up = new int[n];

        // down[i] = farthest index reachable while remaining non-increasing
        int[] down = new int[n];

        // Base case for the last element
        up[n - 1] = n - 1;

        // Build non-decreasing reach array
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] <= arr[i + 1])
                up[i] = up[i + 1];
            else
                up[i] = i;
        }

        // Base case for the last element
        down[n - 1] = n - 1;

        // Build non-increasing reach array
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1])
                down[i] = down[i + 1];
            else
                down[i] = i;
        }

        ArrayList<Boolean> ans = new ArrayList<>();

        // Process every query
        for (int[] q : queries) {

            int l = q[0];
            int r = q[1];

            // End of increasing part
            int peak = up[l];

            // If increasing part already reaches r
            if (peak >= r)
                ans.add(true);

            // Otherwise decreasing part must cover the rest
            else
                ans.add(down[peak] >= r);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    processQueries(arr, queries) {

        const n = arr.length;

        // up[i] = farthest index reachable while non-decreasing
        const up = new Array(n);

        // down[i] = farthest index reachable while non-increasing
        const down = new Array(n);

        // Last element
        up[n - 1] = n - 1;

        // Build non-decreasing reach array
        for (let i = n - 2; i >= 0; i--) {
            if (arr[i] <= arr[i + 1])
                up[i] = up[i + 1];
            else
                up[i] = i;
        }

        // Last element
        down[n - 1] = n - 1;

        // Build non-increasing reach array
        for (let i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1])
                down[i] = down[i + 1];
            else
                down[i] = i;
        }

        const ans = [];

        // Answer every query
        for (const q of queries) {

            const l = q[0];
            const r = q[1];

            // End of increasing part
            const peak = up[l];

            // Entire range is non-decreasing
            if (peak >= r)
                ans.push(true);

            // Otherwise check decreasing part
            else
                ans.push(down[peak] >= r);
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def processQueries(self, arr, queries):
        n = len(arr)

        # up[i] = farthest index reachable while remaining non-decreasing
        up = [0] * n

        # down[i] = farthest index reachable while remaining non-increasing
        down = [0] * n

        # Last element
        up[n - 1] = n - 1

        # Build non-decreasing reach array
        for i in range(n - 2, -1, -1):
            if arr[i] <= arr[i + 1]:
                up[i] = up[i + 1]
            else:
                up[i] = i

        # Last element
        down[n - 1] = n - 1

        # Build non-increasing reach array
        for i in range(n - 2, -1, -1):
            if arr[i] >= arr[i + 1]:
                down[i] = down[i + 1]
            else:
                down[i] = i

        ans = []

        # Process every query
        for l, r in queries:

            # End of increasing part
            peak = up[l]

            # Entire range is non-decreasing
            if peak >= r:
                ans.append(True)

            # Otherwise decreasing part must cover the rest
            else:
                ans.append(down[peak] >= r)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The algorithm is identical in all four programming languages. Only the syntax changes.

First, two helper arrays are created.

The first helper array keeps track of how far each position can move while the values never decrease.

The second helper array keeps track of how far each position can move while the values never increase.

Both arrays are built from right to left because each position depends on information from the next position. By processing backwards, that information is already available.

Once preprocessing is complete, each query follows the same sequence.

The algorithm starts from the left boundary of the query.

Using the `up` array, it jumps directly to the end of the non-decreasing section.

If this position already reaches or passes the right boundary, the subarray is automatically a valid mountain because a completely non-decreasing sequence is allowed.

Otherwise, the algorithm switches to the `down` array.

It checks whether the non-increasing section beginning from the peak can reach the right boundary.

If it can, the entire subarray satisfies the mountain condition.

If it cannot, then the sequence changes direction more than once, which violates the definition of a mountain.

Because every query only performs a few array lookups, the solution remains extremely fast even for the largest test cases.

---

## Examples

### Example 1

**Input**

```text
arr = [2, 3, 2]
queries = [[0, 2]]
```

**Output**

```text
[true]
```

**Trace**

* Increase: `2 → 3`
* Decrease: `3 → 2`
* Valid mountain.

---

### Example 2

**Input**

```text
arr = [3, 2, 4]
queries = [[0, 2]]
```

**Output**

```text
[false]
```

**Trace**

* Decrease first.
* Then increase.
* Direction changes incorrectly.
* Not a mountain.

---

### Example 3

**Input**

```text
arr = [2, 2, 2, 2]
queries = [[0, 3]]
```

**Output**

```text
[true]
```

**Trace**

* Entire sequence remains equal.
* Equal values satisfy both non-decreasing and non-increasing conditions.
* Valid mountain.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd <repository-folder>
```

### C++

Compile the source file.

```bash
g++ solution.cpp -o solution
```

Run the executable.

```bash
./solution
```

---

### Java

Compile the program.

```bash
javac Solution.java
```

Run it.

```bash
java Solution
```

---

### JavaScript

Run the solution using Node.js.

```bash
node solution.js
```

---

### Python3

Run the Python solution.

```bash
python solution.py
```

---

## Notes & Optimizations

* This solution is optimized for competitive programming constraints.
* The preprocessing step is performed only once.
* Every query is answered in constant time.
* Equal values are handled naturally because the problem allows non-decreasing and non-increasing sequences.
* A brute-force approach would require checking every element inside every query, leading to a worst-case time complexity of `O(n × q)`, which is too slow.
* This preprocessing technique is a common optimization for range query problems where the same array is queried many times.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
