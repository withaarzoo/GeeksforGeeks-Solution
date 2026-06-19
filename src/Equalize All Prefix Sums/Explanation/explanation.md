# Equalize All Prefix Sums | GeeksforGeeks Solution

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

The **Equalize All Prefix Sums** problem asks us to find the minimum number of operations required to make every element in each prefix of a sorted array equal.

For every index `i`, we consider the prefix:

```text
arr[0 ... i]
```

In one operation, we can either:

* Increase an element by 1
* Decrease an element by 1

For every prefix, we must calculate the minimum operations needed to make all elements equal and return the answer as an array.

The important detail is that each prefix is processed independently using the original array.

This is a classic **median-based optimization problem** combined with **prefix sums** for efficient calculation.

Popular topics related to this problem:

* GeeksforGeeks DSA
* Prefix Sum
* Median Property
* Array Optimization
* Competitive Programming
* Greedy Observation
* Efficient Cost Calculation

---

## Constraints

| Constraint                | Value               |
| ------------------------- | ------------------- |
| Array Size                | 1 ≤ n ≤ 10⁵         |
| Array Elements            | -10⁴ ≤ arr[i] ≤ 10⁴ |
| Total n Across Test Cases | ≤ 10⁶               |
| Array Property            | Sorted              |

---

## Intuition

The first thing I noticed was that making all values equal while minimizing the total number of increment and decrement operations is a well-known median problem.

For any sorted array segment, the value that minimizes the sum of absolute differences is the median.

So instead of trying every possible target value, I only need to calculate the cost of converting all elements of a prefix into its median.

The next challenge is computing that cost efficiently for every prefix.

Doing it directly for every prefix would be too slow.

That led me to prefix sums, which allow range sum calculations in constant time.

Combining the median observation with prefix sums gives an optimal solution.

---

## Approach

1. Create a prefix sum array.
2. Process every prefix ending at index `i`.
3. Find the median index of the current prefix.
4. Use the median element as the target value.
5. Calculate the cost of converting all elements on the left side to the median.
6. Calculate the cost of converting all elements on the right side to the median.
7. Add both costs.
8. Store the result.
9. Repeat for every prefix.

Since the array is already sorted, finding the median is straightforward.

Using prefix sums allows every cost calculation to be performed in constant time.

---

## Data Structures Used

### Array

Used for storing the input values.

### Prefix Sum Array

Stores cumulative sums of the sorted array.

Why it is used:

* Fast range sum calculation
* Avoids repeated summation
* Reduces complexity from O(n²) to O(n)

### Result Array

Stores the minimum operations required for each prefix.

---

## Operations & Behavior Summary

The algorithm performs the following stages:

1. Read the sorted array.
2. Build a prefix sum array.
3. For each prefix:

   * Find the median position.
   * Calculate left-side adjustment cost.
   * Calculate right-side adjustment cost.
   * Add both costs.
4. Store the result.
5. Return the final answer array.

The median guarantees minimum operations.

Prefix sums guarantee fast computation.

---

## Complexity

| Metric           | Complexity | Explanation                                                                                |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------ |
| Time Complexity  | O(n)       | Each element is processed once while building prefix sums and once while computing answers |
| Space Complexity | O(n)       | Prefix sum array and output array are stored                                               |

Where:

* `n` = size of the input array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> optimalArray(vector<int> &arr) {
        int n = arr.size();

        // Prefix sums for fast range sum queries
        vector<long long> pref(n + 1, 0);

        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + arr[i];
        }

        vector<int> ans(n);

        for (int i = 0; i < n; i++) {

            // Median position in current prefix
            int mid = i / 2;

            long long median = arr[mid];

            // Cost to make left part equal to median
            long long leftCost =
                median * (mid + 1LL) - pref[mid + 1];

            // Cost to make right part equal to median
            long long rightCost =
                (pref[i + 1] - pref[mid + 1]) -
                median * (i - mid);

            ans[i] = (int)(leftCost + rightCost);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> optimalArray(int[] arr) {

        int n = arr.length;

        // Prefix sums for fast range sum queries
        long[] pref = new long[n + 1];

        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + arr[i];
        }

        ArrayList<Integer> ans = new ArrayList<>();

        for (int i = 0; i < n; i++) {

            // Median index of current prefix
            int mid = i / 2;

            long median = arr[mid];

            // Cost for left side
            long leftCost =
                median * (mid + 1L) - pref[mid + 1];

            // Cost for right side
            long rightCost =
                (pref[i + 1] - pref[mid + 1]) -
                median * (i - mid);

            ans.add((int)(leftCost + rightCost));
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    optimalArray(arr) {

        const n = arr.length;

        // Prefix sums
        const pref = new Array(n + 1).fill(0);

        for (let i = 0; i < n; i++) {
            pref[i + 1] = pref[i] + arr[i];
        }

        const ans = [];

        for (let i = 0; i < n; i++) {

            // Median index in current prefix
            const mid = Math.floor(i / 2);

            const median = arr[mid];

            // Cost for left side
            const leftCost =
                median * (mid + 1) - pref[mid + 1];

            // Cost for right side
            const rightCost =
                (pref[i + 1] - pref[mid + 1]) -
                median * (i - mid);

            ans.push(leftCost + rightCost);
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def optimalArray(self, arr):
        n = len(arr)

        # Prefix sums for fast range sum calculation
        pref = [0] * (n + 1)

        for i in range(n):
            pref[i + 1] = pref[i] + arr[i]

        ans = []

        for i in range(n):

            # Median index of current prefix
            mid = i // 2

            median = arr[mid]

            # Cost to convert left side into median
            left_cost = median * (mid + 1) - pref[mid + 1]

            # Cost to convert right side into median
            right_cost = (
                pref[i + 1] - pref[mid + 1]
            ) - median * (i - mid)

            ans.append(left_cost + right_cost)

        return ans
```

### C #

```csharp
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains identical across all language implementations.

### Step 1: Build Prefix Sums

The prefix sum array stores cumulative sums.

Example:

```text
arr = [1, 6, 9, 12]

prefix = [0, 1, 7, 16, 28]
```

This allows any range sum to be obtained instantly.

---

### Step 2: Process Every Prefix

For each index `i`, we consider:

```text
arr[0 ... i]
```

Each prefix is treated independently.

---

### Step 3: Find the Median

Because the array is sorted, the median index is:

```text
mid = i / 2
```

The median value becomes:

```text
arr[mid]
```

The median minimizes the sum of absolute differences.

---

### Step 4: Calculate Left Cost

All elements before the median must be increased toward the median value.

The cost depends on:

* Number of elements
* Sum of those elements
* Median value

Prefix sums make this calculation constant time.

---

### Step 5: Calculate Right Cost

Elements after the median must be decreased toward the median.

Again, prefix sums allow direct computation without traversing the range.

---

### Step 6: Combine Costs

Total operations:

```text
leftCost + rightCost
```

This gives the minimum operations required for the current prefix.

---

### Step 7: Store the Result

Add the computed cost into the answer array.

Repeat until all prefixes are processed.

---

## Examples

### Example 1

**Input**

```text
arr = [1, 6, 9, 12]
```

**Output**

```text
[0, 5, 8, 14]
```

**Trace**

Prefix `[1]`

```text
Already equal
Cost = 0
```

Prefix `[1, 6]`

```text
Median = 1
Cost = 5
```

Prefix `[1, 6, 9]`

```text
Median = 6
Cost = 8
```

Prefix `[1, 6, 9, 12]`

```text
Median = 6
Cost = 14
```

---

### Example 2

**Input**

```text
arr = [1, 1, 1, 7, 7, 10, 19]
```

**Output**

```text
[0, 0, 0, 6, 12, 21, 33]
```

**Trace**

First three prefixes already contain equal elements.

As larger values enter the prefix, the median remains the optimal target.

Operations accumulate accordingly.

---

### Example 3

**Input**

```text
arr = [2, 4, 6]
```

**Output**

```text
[0, 2, 4]
```

**Trace**

```text
[2] -> 0

[2,4]
Median = 2
Cost = 2

[2,4,6]
Median = 4
Cost = 4
```

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

---

### C #

Compile

```bash
csc Solution.cs
```

Run

```bash
Solution.exe
```

---

## Notes & Optimizations

* The array is already sorted, which makes median selection easy.
* Prefix sums eliminate repeated range summations.
* A brute-force solution would be far too slow for the maximum constraints.
* The median property is the key mathematical observation.
* This solution is commonly used in competitive programming when minimizing absolute differences.
* Works correctly with duplicate values.
* Works correctly with negative numbers.
* Handles single-element prefixes naturally.

Possible alternative approaches:

* Balanced BST
* Order Statistic Tree
* Fenwick Tree with coordinate compression

However, they are unnecessary because the array is already sorted.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
