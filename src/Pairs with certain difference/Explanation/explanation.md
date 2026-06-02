# Pairs with Certain Difference | GeeksforGeeks Solution

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

Given an array of integers and a value `k`, the goal is to find the maximum possible sum formed by disjoint pairs whose difference is strictly less than `k`.

A pair `(x, y)` is considered valid if:

* `|x - y| < k`
* Each element can be used only once
* The final answer is the sum of all numbers included in the selected pairs

If no valid pair exists, the answer is `0`.

This problem is a classic Greedy Algorithm and Array Sorting problem commonly asked in coding interviews, competitive programming contests, and GeeksforGeeks practice sheets.

## Constraints

| Constraint    | Value            |
| ------------- | ---------------- |
| Array Size    | 1 ≤ n ≤ 10⁵      |
| K Value       | 0 ≤ k ≤ 10⁵      |
| Array Element | 1 ≤ arr[i] ≤ 10⁴ |

## Intuition

When I first looked at the problem, I noticed that larger numbers contribute more to the final sum.

If I sort the array, numbers with small differences naturally become neighbors. That means I can quickly identify valid pairs by looking at adjacent elements.

Since I want the maximum possible sum, it makes sense to start from the largest values and greedily create pairs whenever the difference condition is satisfied.

By always taking the largest valid pair first, I avoid wasting large numbers on smaller combinations.

## Approach

1. Sort the array in ascending order.
2. Start traversing from the end of the sorted array.
3. Compare the current element with its immediate previous element.
4. If their difference is less than `k`:

   * Add both values to the answer.
   * Skip both elements because pairs must be disjoint.
5. Otherwise:

   * Ignore the current element.
   * Move one step left.
6. Continue until the entire array has been processed.
7. Return the accumulated sum.

This greedy strategy guarantees the maximum possible sum while respecting the disjoint pair requirement.

## Data Structures Used

### Array

The original array is sorted and reused throughout the solution.

Why I used it:

* Sorting makes nearby differences easy to evaluate.
* No additional complex data structure is required.
* Keeps memory usage minimal.

### Integer Variables

A few variables are used to store:

* Current index
* Running sum
* Array length

These help keep the solution efficient and simple.

## Operations & Behavior Summary

The algorithm performs the following major steps:

1. Sort all elements.
2. Begin from the largest element.
3. Check whether the current element and its neighbor can form a valid pair.
4. If a valid pair exists:

   * Add both numbers to the answer.
   * Mark them as used by skipping them.
5. If a valid pair does not exist:

   * Skip the larger element.
6. Repeat until all elements are processed.
7. Return the maximum sum obtained.

## Complexity

| Metric           | Complexity | Explanation                                                  |
| ---------------- | ---------- | ------------------------------------------------------------ |
| Time Complexity  | O(n log n) | Sorting dominates the overall runtime                        |
| Space Complexity | O(1)       | No extra data structures are used apart from a few variables |

Where:

* `n` = number of elements in the array

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int sumDiffPairs(vector<int>& arr, int k) {
        // Sort the array so nearby elements have minimum differences
        sort(arr.begin(), arr.end());

        int ans = 0;
        int n = arr.size();

        // Start from the largest element
        int i = n - 1;

        while (i > 0) {

            // If adjacent elements form a valid pair
            if (arr[i] - arr[i - 1] < k) {

                // Add both elements to answer
                ans += arr[i] + arr[i - 1];

                // Skip both because pairs must be disjoint
                i -= 2;
            }
            else {

                // Current element cannot be paired optimally
                i--;
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int sumDiffPairs(int[] arr, int k) {

        // Sort the array
        Arrays.sort(arr);

        int ans = 0;
        int i = arr.length - 1;

        // Traverse from largest element
        while (i > 0) {

            // Check whether adjacent elements form a valid pair
            if (arr[i] - arr[i - 1] < k) {

                // Add both elements to the result
                ans += arr[i] + arr[i - 1];

                // Skip both used elements
                i -= 2;
            } else {

                // Ignore current element
                i--;
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    sumDiffPairs(arr, k) {

        // Sort array in ascending order
        arr.sort((a, b) => a - b);

        let ans = 0;
        let i = arr.length - 1;

        // Process from right to left
        while (i > 0) {

            // Valid pair found
            if (arr[i] - arr[i - 1] < k) {

                // Add both values
                ans += arr[i] + arr[i - 1];

                // Skip both elements
                i -= 2;
            } else {

                // Skip current element
                i--;
            }
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def sumDiffPairs(self, arr, k):

        # Sort the array first
        arr.sort()

        ans = 0
        i = len(arr) - 1

        # Start from the largest element
        while i > 0:

            # Check if adjacent elements form a valid pair
            if arr[i] - arr[i - 1] < k:

                # Add both numbers to answer
                ans += arr[i] + arr[i - 1]

                # Skip both used elements
                i -= 2
            else:

                # Current element remains unused
                i -= 1

        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all language implementations.

### Step 1: Sort the Array

The first step is sorting.

Example:

```text
Before:
[3, 5, 10, 15, 17, 12, 9]

After:
[3, 5, 9, 10, 12, 15, 17]
```

Sorting groups similar values together.

Since valid pairs require a small difference, neighboring elements become the best candidates.

### Step 2: Start from the Largest Element

I begin from the last index because larger values contribute more to the final answer.

This allows the greedy choice to maximize the total sum.

### Step 3: Check Adjacent Elements

For each position:

```text
arr[i]
arr[i - 1]
```

I calculate:

```text
arr[i] - arr[i - 1]
```

If the result is smaller than `k`, the pair is valid.

### Step 4: Add Valid Pairs

Whenever a valid pair is found:

```text
answer += arr[i] + arr[i - 1]
```

Both numbers contribute to the final sum.

### Step 5: Skip Used Elements

Because pairs must be disjoint, both elements are considered used.

The traversal therefore jumps two positions left.

### Step 6: Ignore Invalid Elements

If the difference condition fails, the current largest element cannot participate in an optimal pair.

I simply move one position left and continue searching.

### Step 7: Return Final Sum

Once the traversal finishes, the accumulated value represents the maximum possible sum obtainable from valid disjoint pairs.

## Examples

### Example 1

Input

```text
arr = [3, 5, 10, 15, 17, 12, 9]
k = 4
```

Output

```text
62
```

Explanation

```text
Sorted:
[3, 5, 9, 10, 12, 15, 17]

Pairs:
(15,17)
(10,12)
(3,5)

Sum:
15 + 17 + 10 + 12 + 3 + 5 = 62
```

### Example 2

Input

```text
arr = [5, 15, 10, 300]
k = 12
```

Output

```text
25
```

Explanation

```text
Sorted:
[5, 10, 15, 300]

Best Pair:
(10,15)

Sum:
25
```

### Example 3

Input

```text
arr = [1, 20, 50]
k = 2
```

Output

```text
0
```

Explanation

```text
No valid pair exists.

Answer = 0
```

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

* Sorting is the key observation in this problem.
* A brute-force solution would be far too slow for large inputs.
* The greedy approach works because larger values should be paired whenever possible to maximize the final sum.
* No extra memory-heavy structures such as hash maps, heaps, or sets are required.
* The solution easily handles arrays containing up to 100,000 elements.
* This is a common Greedy + Sorting interview problem and a good example of making optimal local decisions that lead to a globally optimal answer.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
