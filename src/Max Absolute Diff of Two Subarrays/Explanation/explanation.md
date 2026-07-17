# Max Absolute Diff of Two Subarrays

An optimized Dynamic Programming and Kadane's Algorithm solution for the GeeksforGeeks problem **Max Absolute Diff of Two Subarrays**.

This repository explains the complete thought process behind the solution and provides implementations in **C++, Java, JavaScript, and Python**. The solution runs in **O(n)** time, making it suitable for the given constraints.

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

Given an integer array, the goal is to find **two non-overlapping contiguous subarrays** such that the **absolute difference between their sums is as large as possible**.

The challenge is that the chosen subarrays cannot overlap. A brute-force solution would require checking every possible pair of subarrays, which becomes far too slow for large inputs.

The optimized solution uses **Kadane's Algorithm** and **Dynamic Programming** to precompute the best possible maximum and minimum subarray sums from both directions. Once that information is available, every possible split of the array can be evaluated in constant time.

This is a classic Dynamic Programming interview problem that also demonstrates an advanced application of Kadane's Algorithm.

---

## Constraints

| Constraint    | Value                                     |
| ------------- | ----------------------------------------- |
| Array Size    | 2 ≤ n ≤ 10<sup>5</sup>                    |
| Element Value | -10<sup>3</sup> ≤ arr[i] ≤ 10<sup>3</sup> |

---

## Intuition

The first thing I noticed was that the two subarrays must never overlap.

That means there is always a dividing point somewhere in the array.

If I know the best subarray on the left side of every split and the best subarray on the right side of every split, then I never need to search again.

The maximum absolute difference can only happen in two situations.

* A very large positive subarray on the left and a very small negative subarray on the right.
* A very small negative subarray on the left and a very large positive subarray on the right.

So instead of comparing every possible pair of subarrays, I only need four precomputed arrays that store the best maximum and minimum subarray sums from both directions.

---

## Approach

I start by computing the maximum subarray sum from left to right using Kadane's Algorithm.

Next, I compute the minimum subarray sum from left to right by slightly modifying Kadane's Algorithm.

After that, I repeat the same two calculations from right to left.

Now I have four arrays.

* Best maximum subarray on the left.
* Best minimum subarray on the left.
* Best maximum subarray on the right.
* Best minimum subarray on the right.

Finally, I try every possible split between two consecutive elements.

For each split, I calculate both possible absolute differences.

* Left Maximum − Right Minimum
* Left Minimum − Right Maximum

The larger value becomes the answer.

Since every array is processed only once, the overall algorithm stays linear.

---

## Data Structures Used

| Data Structure    | Purpose                                                      |
| ----------------- | ------------------------------------------------------------ |
| Array             | Stores the input values                                      |
| Four DP Arrays    | Store maximum and minimum subarray sums from both directions |
| Integer Variables | Keep track of the running Kadane values and final answer     |

---

## Operations & Behavior Summary

1. Read the input array.
2. Compute the maximum subarray sums from left to right.
3. Compute the minimum subarray sums from left to right.
4. Compute the maximum subarray sums from right to left.
5. Compute the minimum subarray sums from right to left.
6. Try every possible split between adjacent elements.
7. Compare both possible absolute differences.
8. Keep updating the largest difference found.
9. Return the final answer.

---

## Complexity

| Complexity       | Value | Explanation                                                                          |
| ---------------- | ----- | ------------------------------------------------------------------------------------ |
| Time Complexity  | O(n)  | The array is scanned a constant number of times.                                     |
| Space Complexity | O(n)  | Four additional arrays are used for preprocessing maximum and minimum subarray sums. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxDiffSubArrays(vector<int>& arr) {
        int n = arr.size();

        // These arrays store the best values seen so far.
        vector<int> leftMax(n), leftMin(n), rightMax(n), rightMin(n);

        // Current maximum subarray ending at current index.
        int curr = arr[0];
        leftMax[0] = arr[0];

        // Kadane for maximum subarray from left.
        for (int i = 1; i < n; i++) {
            // Either extend the previous subarray or start a new one.
            curr = max(arr[i], curr + arr[i]);

            // Store the best maximum sum till this index.
            leftMax[i] = max(leftMax[i - 1], curr);
        }

        // Current minimum subarray ending at current index.
        curr = arr[0];
        leftMin[0] = arr[0];

        // Kadane for minimum subarray from left.
        for (int i = 1; i < n; i++) {
            // Either extend or start a new minimum subarray.
            curr = min(arr[i], curr + arr[i]);

            // Store the smallest sum till this index.
            leftMin[i] = min(leftMin[i - 1], curr);
        }

        // Current maximum subarray starting from current index.
        curr = arr[n - 1];
        rightMax[n - 1] = arr[n - 1];

        // Kadane from right for maximum subarray.
        for (int i = n - 2; i >= 0; i--) {
            curr = max(arr[i], curr + arr[i]);
            rightMax[i] = max(rightMax[i + 1], curr);
        }

        // Current minimum subarray starting from current index.
        curr = arr[n - 1];
        rightMin[n - 1] = arr[n - 1];

        // Kadane from right for minimum subarray.
        for (int i = n - 2; i >= 0; i--) {
            curr = min(arr[i], curr + arr[i]);
            rightMin[i] = min(rightMin[i + 1], curr);
        }

        int ans = 0;

        // Try every possible split.
        for (int i = 0; i < n - 1; i++) {
            // Left maximum with right minimum.
            ans = max(ans, abs(leftMax[i] - rightMin[i + 1]));

            // Left minimum with right maximum.
            ans = max(ans, abs(leftMin[i] - rightMax[i + 1]));
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int maxDiffSubArrays(int[] arr) {
        int n = arr.length;

        // Arrays to store best maximum/minimum sums.
        int[] leftMax = new int[n];
        int[] leftMin = new int[n];
        int[] rightMax = new int[n];
        int[] rightMin = new int[n];

        // Kadane for maximum subarray from left.
        int curr = arr[0];
        leftMax[0] = arr[0];

        for (int i = 1; i < n; i++) {
            // Extend previous subarray or start new one.
            curr = Math.max(arr[i], curr + arr[i]);

            // Best maximum till this index.
            leftMax[i] = Math.max(leftMax[i - 1], curr);
        }

        // Kadane for minimum subarray from left.
        curr = arr[0];
        leftMin[0] = arr[0];

        for (int i = 1; i < n; i++) {
            curr = Math.min(arr[i], curr + arr[i]);
            leftMin[i] = Math.min(leftMin[i - 1], curr);
        }

        // Kadane for maximum subarray from right.
        curr = arr[n - 1];
        rightMax[n - 1] = arr[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            curr = Math.max(arr[i], curr + arr[i]);
            rightMax[i] = Math.max(rightMax[i + 1], curr);
        }

        // Kadane for minimum subarray from right.
        curr = arr[n - 1];
        rightMin[n - 1] = arr[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            curr = Math.min(arr[i], curr + arr[i]);
            rightMin[i] = Math.min(rightMin[i + 1], curr);
        }

        int ans = 0;

        // Check every possible split.
        for (int i = 0; i < n - 1; i++) {
            ans = Math.max(ans, Math.abs(leftMax[i] - rightMin[i + 1]));
            ans = Math.max(ans, Math.abs(leftMin[i] - rightMax[i + 1]));
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxDiffSubArrays(arr) {
        const n = arr.length;

        // Arrays to store best values.
        const leftMax = new Array(n);
        const leftMin = new Array(n);
        const rightMax = new Array(n);
        const rightMin = new Array(n);

        // Kadane for maximum subarray from left.
        let curr = arr[0];
        leftMax[0] = arr[0];

        for (let i = 1; i < n; i++) {
            // Extend previous subarray or start new one.
            curr = Math.max(arr[i], curr + arr[i]);

            // Best maximum till this index.
            leftMax[i] = Math.max(leftMax[i - 1], curr);
        }

        // Kadane for minimum subarray from left.
        curr = arr[0];
        leftMin[0] = arr[0];

        for (let i = 1; i < n; i++) {
            curr = Math.min(arr[i], curr + arr[i]);
            leftMin[i] = Math.min(leftMin[i - 1], curr);
        }

        // Kadane for maximum subarray from right.
        curr = arr[n - 1];
        rightMax[n - 1] = arr[n - 1];

        for (let i = n - 2; i >= 0; i--) {
            curr = Math.max(arr[i], curr + arr[i]);
            rightMax[i] = Math.max(rightMax[i + 1], curr);
        }

        // Kadane for minimum subarray from right.
        curr = arr[n - 1];
        rightMin[n - 1] = arr[n - 1];

        for (let i = n - 2; i >= 0; i--) {
            curr = Math.min(arr[i], curr + arr[i]);
            rightMin[i] = Math.min(rightMin[i + 1], curr);
        }

        let ans = 0;

        // Try every split.
        for (let i = 0; i < n - 1; i++) {
            ans = Math.max(ans, Math.abs(leftMax[i] - rightMin[i + 1]));
            ans = Math.max(ans, Math.abs(leftMin[i] - rightMax[i + 1]));
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maxDiffSubArrays(self, arr):
        n = len(arr)

        # Arrays to store best values.
        leftMax = [0] * n
        leftMin = [0] * n
        rightMax = [0] * n
        rightMin = [0] * n

        # Kadane for maximum subarray from left.
        curr = arr[0]
        leftMax[0] = arr[0]

        for i in range(1, n):
            # Extend previous subarray or start a new one.
            curr = max(arr[i], curr + arr[i])

            # Best maximum till this index.
            leftMax[i] = max(leftMax[i - 1], curr)

        # Kadane for minimum subarray from left.
        curr = arr[0]
        leftMin[0] = arr[0]

        for i in range(1, n):
            curr = min(arr[i], curr + arr[i])
            leftMin[i] = min(leftMin[i - 1], curr)

        # Kadane for maximum subarray from right.
        curr = arr[-1]
        rightMax[-1] = arr[-1]

        for i in range(n - 2, -1, -1):
            curr = max(arr[i], curr + arr[i])
            rightMax[i] = max(rightMax[i + 1], curr)

        # Kadane for minimum subarray from right.
        curr = arr[-1]
        rightMin[-1] = arr[-1]

        for i in range(n - 2, -1, -1):
            curr = min(arr[i], curr + arr[i])
            rightMin[i] = min(rightMin[i + 1], curr)

        ans = 0

        # Try every possible split.
        for i in range(n - 1):
            ans = max(ans, abs(leftMax[i] - rightMin[i + 1]))
            ans = max(ans, abs(leftMin[i] - rightMax[i + 1]))

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four programming languages.

The solution begins by creating four Dynamic Programming arrays.

The first array stores the maximum subarray sum seen from the left side.

The second stores the minimum subarray sum from the left.

The third stores the maximum subarray sum from the right.

The fourth stores the minimum subarray sum from the right.

To build these arrays efficiently, Kadane's Algorithm is used.

Instead of remembering every possible subarray, Kadane only keeps track of the best subarray ending at the current position. This allows every element to be processed exactly once.

For the minimum subarray calculation, the same algorithm is used with `min()` replacing `max()`.

After preprocessing, the algorithm checks every possible split of the array.

For every split, the left side and right side are completely independent, so there are only two meaningful comparisons.

The first compares the largest left subarray with the smallest right subarray.

The second compares the smallest left subarray with the largest right subarray.

The maximum of these two values is compared with the current answer.

After checking every split, the largest absolute difference is returned.

Because every preprocessing step is linear and every split is examined only once, the solution achieves the expected **O(n)** time complexity.

---

## Examples

### Example 1

**Input**

```text
arr = [-2, -3, 4, -1, -2, 1, 5, -3]
```

**Output**

```text
12
```

**Trace**

* Best left minimum subarray = `[-2, -3]`
* Best right maximum subarray = `[4, -1, -2, 1, 5]`
* Absolute Difference = `|-5 - 7| = 12`

---

### Example 2

**Input**

```text
arr = [2, -1, -2, 1, -4, 2, 8]
```

**Output**

```text
16
```

**Trace**

* Best left minimum subarray = `[-1, -2, 1, -4]`
* Best right maximum subarray = `[2, 8]`
* Absolute Difference = `|-6 - 10| = 16`

---

### Example 3

**Input**

```text
arr = [5, -2, 4, -1]
```

**Output**

```text
8
```

**Trace**

One optimal split separates the first two elements from the last two.

The algorithm compares the best maximum and minimum subarrays from both sides and returns the largest absolute difference.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd <repository-name>
```

### C++

Compile the program.

```bash
g++ solution.cpp -o solution
```

Run it.

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

Run using Node.js.

```bash
node solution.js
```

---

### Python3

Run the program.

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

* A brute-force solution requires checking every pair of subarrays, which is much too slow for the given constraints.
* Kadane's Algorithm allows maximum and minimum subarray sums to be computed in linear time.
* Precomputing values from both directions avoids repeating work for every split.
* The solution naturally handles arrays containing all positive numbers, all negative numbers, or a mix of both.
* This is a common Dynamic Programming interview problem that combines prefix preprocessing with Kadane's Algorithm.
* The approach is optimal for the given constraints with **O(n)** time complexity.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
