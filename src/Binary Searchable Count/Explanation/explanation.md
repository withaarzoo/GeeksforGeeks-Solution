# Binary Searchable Count

A clean and optimized solution for the GeeksforGeeks Binary Searchable Count problem using a Binary Search Tree-style index traversal approach.

This repository contains an efficient solution along with a detailed explanation, complexity analysis, and multi-language implementations for competitive programming practice and interview preparation.

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

## Problem Summary

Given an array containing distinct integers, the goal is to find how many elements are **binary searchable**.

An element is considered binary searchable if the standard binary search process can successfully find that element in the given array without sorting the array first.

This problem is interesting because binary search normally requires a sorted array. Here, we need to determine which elements would still be discoverable even when the array is not sorted.

### Input

* An array of `n` distinct integers

### Output

* The maximum count of binary searchable elements

This is a popular data structures and algorithms problem that tests understanding of binary search behavior rather than traditional searching.

## Constraints

| Constraint                | Value         |
| ------------------------- | ------------- |
| 1 ≤ n ≤ 10⁵               | Array size    |
| 1 ≤ arr[i] ≤ 10⁵          | Element value |
| All elements are distinct | Guaranteed    |

## Intuition

My first observation was that binary search does not compare against every element.

It only visits specific middle positions while repeatedly dividing the search range.

That means an element can only be found if every comparison made along its search path pushes the algorithm toward the correct side of the array.

Instead of simulating binary search for every element, I can directly build the same recursive structure that binary search creates and verify whether each middle element satisfies all constraints imposed by previous decisions.

This turns the problem into a much cleaner and faster solution.

## Approach

1. Start with the entire array range.
2. Pick the middle index exactly like binary search.
3. Maintain a valid value range using:

   * Lower bound (`low`)
   * Upper bound (`high`)
4. Check whether the current value lies within that valid range.
5. If it does, count it as binary searchable.
6. Move to the left half:

   * Update the upper bound.
7. Move to the right half:

   * Update the lower bound.
8. Continue recursively until all positions have been processed.

Since every index is visited exactly once, the solution remains highly efficient.

## Data Structures Used

### Array

The input array stores the given distinct integers.

### Recursion Stack

Used to traverse the implicit binary-search decision tree.

No additional arrays, sets, maps, or heaps are required.

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Begin with the full array.
2. Compute the middle position.
3. Check whether the current value satisfies all previously established search constraints.
4. Count the value if it remains valid.
5. Recurse into the left half while tightening the upper limit.
6. Recurse into the right half while tightening the lower limit.
7. Continue until every position has been processed exactly once.
8. Return the final count.

This mirrors the exact behavior of binary search decisions.

## Complexity

| Metric           | Complexity | Explanation                                                 |
| ---------------- | ---------- | ----------------------------------------------------------- |
| Time Complexity  | O(n)       | Every index is visited exactly once                         |
| Space Complexity | O(log n)   | Recursion depth equals the height of the binary-search tree |

Where:

* `n` = number of elements in the array

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int binarySearchable(vector<int>& arr) {
        // I store the final count here and update it while traversing the binary-search tree.
        int count = 0;
        int n = (int)arr.size();

        // I use a recursive lambda to walk the same index tree that binary search creates.
        function<void(int, int, long long, long long)> dfs =
            [&](int l, int r, long long low, long long high) {
                // If the segment is empty, there is nothing to process.
                if (l > r) return;

                // I pick the middle index because binary search always checks this first.
                int mid = l + (r - l) / 2;
                long long val = arr[mid];

                // If the current value fits all ancestor constraints, then it is searchable.
                if (val > low && val < high) {
                    count++;
                }

                // Everything on the left must be smaller than the current middle value.
                dfs(l, mid - 1, low, min(high, val));

                // Everything on the right must be larger than the current middle value.
                dfs(mid + 1, r, max(low, val), high);
            };

        // I start with no lower or upper restriction at the root.
        dfs(0, n - 1, -(1LL << 60), (1LL << 60));

        return count;
    }
};
```

### Java

```java
class Solution {
    public int binarySearchable(int[] arr) {
        // I keep the answer in a field-like array so the nested helper can update it.
        int[] count = new int[1];

        // I start the recursive walk with the full index range and no value limits.
        dfs(arr, 0, arr.length - 1, Long.MIN_VALUE / 4, Long.MAX_VALUE / 4, count);

        return count[0];
    }

    private void dfs(int[] arr, int l, int r, long low, long high, int[] count) {
        // An empty segment means the binary-search path ends here.
        if (l > r) return;

        // The middle position is the same one binary search would inspect first.
        int mid = l + (r - l) / 2;
        long val = arr[mid];

        // If the value stays inside the allowed range, this index is searchable.
        if (val > low && val < high) {
            count[0]++;
        }

        // The left side must stay below the current value, so I tighten the upper bound.
        dfs(arr, l, mid - 1, low, Math.min(high, val), count);

        // The right side must stay above the current value, so I tighten the lower bound.
        dfs(arr, mid + 1, r, Math.max(low, val), high, count);
    }
};
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */

class Solution {
    binarySearchable(arr) {
        let count = 0;

        // I walk the implicit binary-search tree over index ranges.
        const dfs = (l, r, low, high) => {
            // An invalid range means there is nothing more to check.
            if (l > r) return;

            // I choose the same middle position binary search would use.
            const mid = Math.floor((l + r) / 2);
            const val = arr[mid];

            // If the current value respects all ancestor limits, I count it.
            if (val > low && val < high) {
                count++;
            }

            // Left half values must be smaller than the current middle value.
            dfs(l, mid - 1, low, Math.min(high, val));

            // Right half values must be larger than the current middle value.
            dfs(mid + 1, r, Math.max(low, val), high);
        };

        // I start with no restriction at the root.
        dfs(0, arr.length - 1, -Infinity, Infinity);

        return count;
    }
}
```

### Python3

```python
class Solution:
    def binarySearchable(self, arr):
        # I store the answer in a variable that the nested DFS updates.
        count = 0

        def dfs(l, r, low, high):
            nonlocal count

            # If the segment is empty, binary search would stop here.
            if l > r:
                return

            # I take the middle because binary search always checks it first.
            mid = (l + r) // 2
            val = arr[mid]

            # If the value fits the current range, this element is searchable.
            if low < val < high:
                count += 1

            # Left side elements must be smaller than the current value.
            dfs(l, mid - 1, low, min(high, val))

            # Right side elements must be larger than the current value.
            dfs(mid + 1, r, max(low, val), high)

        # I begin with the full range and no value restrictions.
        dfs(0, len(arr) - 1, float("-inf"), float("inf"))
        return count
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains identical across all language implementations.

### Step 1: Start With No Restrictions

Initially, any value can potentially be valid.

So we begin with:

* Negative infinity as the lower bound
* Positive infinity as the upper bound

This means no restrictions exist yet.

### Step 2: Visit the Middle Element

Binary search always checks the middle element first.

Therefore, we process the middle index of the current segment.

This guarantees our traversal matches the exact decision structure of binary search.

### Step 3: Validate the Current Value

The current value must satisfy:

* Greater than the lower bound
* Smaller than the upper bound

If both conditions hold, the element can be reached through valid binary search decisions.

So we count it.

### Step 4: Explore the Left Side

Every value in the left segment must be smaller than the current middle value.

To enforce that rule:

* Keep the same lower bound
* Reduce the upper bound

This preserves all previous constraints.

### Step 5: Explore the Right Side

Every value in the right segment must be larger than the current middle value.

To enforce that rule:

* Increase the lower bound
* Keep the same upper bound

Again, all previous constraints remain valid.

### Step 6: Continue Recursively

The process repeats until the search segment becomes empty.

At that point, the recursion stops.

### Step 7: Return the Final Count

After every index has been evaluated exactly once, the accumulated count represents the answer.

## Examples

### Example 1

Input

```text
arr = [1, 3, 2]
```

Output

```text
2
```

Explanation

* Binary search can find 1
* Binary search can find 3
* Binary search cannot find 2

Answer = 2

---

### Example 2

Input

```text
arr = [2, 1, 3, 5, 4, 6]
```

Output

```text
3
```

Explanation

Binary searchable elements:

* 1
* 5
* 6

Answer = 3

---

### Example 3

Input

```text
arr = [2, 1, 4, 3]
```

Output

```text
2
```

Explanation

Only some elements satisfy all binary-search path constraints.

Final count = 2

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

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

### JavaScript

Run

```bash
node solution.js
```

### Python3

Run

```bash
python solution.py
```

## Notes & Optimizations

* The array contains distinct values, which simplifies comparisons.
* Every index is processed exactly once.
* No sorting is required.
* No extra lookup structures are needed.
* The recursive traversal naturally models binary search behavior.
* This solution is optimal for the given constraints.
* An O(n log n) simulation approach would be slower and unnecessary.
* The O(n) traversal approach is preferred for competitive programming and coding interviews.

### Edge Cases

* Single element array
* Strictly increasing array
* Strictly decreasing array
* Large input size near 10⁵
* Values near constraint limits

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
