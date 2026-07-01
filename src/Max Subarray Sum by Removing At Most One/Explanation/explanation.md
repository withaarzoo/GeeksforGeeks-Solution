# Max Subarray Sum by Removing At Most One | GeeksforGeeks Solution (Kadane's Algorithm)

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

---

## Problem Summary

The **Max Subarray Sum by Removing At Most One** problem is a variation of the classic **Maximum Subarray Sum** problem solved using **Kadane's Algorithm**.

You are given an integer array, and your task is to find the maximum possible sum of a non-empty subarray. The twist is that you are allowed to remove **at most one element** from that subarray. Even after removing one element, the remaining subarray must still contain at least one element.

The input is an integer array, and the output is a single integer representing the largest subarray sum that can be achieved after optionally deleting one element.

This problem is commonly asked in coding interviews and competitive programming because it combines dynamic programming with Kadane's Algorithm in an efficient way.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | `1 ≤ arr.size() ≤ 10^6` |
| Element Value | `-10^3 ≤ arr[i] ≤ 10^3` |

---

## Intuition

When I first looked at this problem, I immediately thought about Kadane's Algorithm because it already finds the maximum subarray sum in linear time.

The only extra condition is that one element can be removed. That means I cannot rely on just one running sum anymore.

Instead, I keep track of two different situations while moving through the array.

- The best subarray ending at the current position without removing anything.
- The best subarray ending at the current position after removing one element.

By maintaining these two values together, I can decide whether it is better to continue the current subarray, start a new one, or delete the current element.

This allows the entire problem to be solved in one traversal.

---

## Approach

I process the array from left to right only once.

First, I maintain the maximum subarray sum ending at the current index without deleting any element.

Next, I maintain another value representing the maximum subarray sum ending at the current index after one deletion has already been used.

For every element, I update both values.

The first value follows the normal Kadane's Algorithm.

The second value decides between deleting the current element or extending a subarray where a deletion has already happened.

After updating both values, I compare them with the current answer.

Once every element has been processed, the stored answer is the maximum possible subarray sum.

---

## Data Structures Used

| Data Structure | Purpose |
|---------------|---------|
| Integer Variables | Store the running subarray sums and the final answer |
| Input Array | Holds the given numbers for processing |

No additional arrays, vectors, stacks, queues, or hash maps are required.

---

## Operations & Behavior Summary

The algorithm performs the following steps.

1. Initialize the running values using the first element.
2. Traverse the array from left to right.
3. Update the best subarray without deletion.
4. Update the best subarray after one deletion.
5. Compare both values with the current answer.
6. Continue until every element has been processed.
7. Return the maximum subarray sum found.

Since every element is processed exactly once, the solution remains very efficient.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n)** | Every array element is visited exactly once. |
| Space Complexity | **O(1)** | Only a few variables are used. No extra arrays or data structures are required. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxSumSubarray(vector<int>& arr) {
        // keep stores the maximum subarray sum ending here without deletion
        int keep = arr[0];

        // remove stores the maximum subarray sum ending here after one deletion
        int remove = 0;

        // Final answer
        int ans = arr[0];

        // Traverse the remaining elements
        for (int i = 1; i < arr.size(); i++) {

            // Either delete current element or extend previous deleted subarray
            remove = max(keep, remove + arr[i]);

            // Standard Kadane update
            keep = max(arr[i], keep + arr[i]);

            // Update the overall answer
            ans = max(ans, max(keep, remove));
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int maxSumSubarray(int[] arr) {

        // Maximum subarray ending here without deletion
        int keep = arr[0];

        // Maximum subarray ending here after one deletion
        int remove = 0;

        // Final answer
        int ans = arr[0];

        // Process each remaining element
        for (int i = 1; i < arr.length; i++) {

            // Either remove current element or continue previous removed subarray
            remove = Math.max(keep, remove + arr[i]);

            // Normal Kadane transition
            keep = Math.max(arr[i], keep + arr[i]);

            // Update answer
            ans = Math.max(ans, Math.max(keep, remove));
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxSumSubarray(arr) {

        // Maximum subarray ending here without deletion
        let keep = arr[0];

        // Maximum subarray ending here after one deletion
        let remove = 0;

        // Final answer
        let ans = arr[0];

        // Traverse remaining elements
        for (let i = 1; i < arr.length; i++) {

            // Either delete current element or extend previous deleted subarray
            remove = Math.max(keep, remove + arr[i]);

            // Standard Kadane update
            keep = Math.max(arr[i], keep + arr[i]);

            // Update answer
            ans = Math.max(ans, Math.max(keep, remove));
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maxSumSubarray(self, arr):

        # Maximum subarray ending here without deletion
        keep = arr[0]

        # Maximum subarray ending here after one deletion
        remove = 0

        # Final answer
        ans = arr[0]

        # Traverse the remaining elements
        for i in range(1, len(arr)):

            # Either remove current element or extend previous deleted subarray
            remove = max(keep, remove + arr[i])

            # Standard Kadane update
            keep = max(arr[i], keep + arr[i])

            # Update overall answer
            ans = max(ans, keep, remove)

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in every programming language. Only the syntax changes.

The algorithm begins by storing the first array element as the initial maximum subarray sum. This prevents problems when the array contains only negative numbers.

Next, it keeps another running value that represents the best subarray where one deletion has already been used.

As each new element is processed, two updates happen.

The first update follows the standard Kadane's Algorithm. It decides whether extending the previous subarray is better than starting a completely new one.

The second update considers the deletion case. At every position, there are only two possibilities.

The current element is deleted, or the deletion happened earlier and the current element simply extends that subarray.

The algorithm always keeps whichever option produces the larger sum.

Finally, after updating both running values, the answer is updated with the largest value seen so far.

Because each element is processed once and only a constant amount of extra memory is used, the solution stays optimal for very large arrays.

---

## Examples

### Example 1

**Input**

```text
arr = [1, 2, 3, -4, 5]
```

**Output**

```text
11
```

**Explanation**

Removing `-4` connects the positive values together.

The resulting subarray becomes:

```text
[1, 2, 3, 5]
```

The sum is `11`, which is the maximum possible answer.

---

### Example 2

**Input**

```text
arr = [-2, -3, 4, -1, -2, 1, 5, -3]
```

**Output**

```text
9
```

**Explanation**

Removing `-2` inside the optimal subarray produces:

```text
[4, -1, 1, 5]
```

The total sum becomes `9`.

---

### Example 3

**Input**

```text
arr = [5]
```

**Output**

```text
5
```

**Explanation**

Only one element exists.

Removing it would make the subarray empty, which is not allowed.

Therefore, the answer is simply `5`.

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

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- The solution is based on Kadane's Algorithm with one additional state for deletion.
- Only constant extra memory is required.
- The algorithm handles arrays containing all negative numbers correctly.
- The subarray must never become empty after deletion.
- This is the optimal solution for the given constraints because every element must be examined at least once.
- An approach using extra dynamic programming arrays also works, but it increases the memory usage to `O(n)` without improving the running time.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
