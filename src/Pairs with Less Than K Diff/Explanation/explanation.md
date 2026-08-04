# Pairs with Less Than K Diff | GeeksforGeeks Solution

A clean and optimized solution for the **Pairs with Less Than K Diff** problem from GeeksforGeeks using the **Sorting + Two Pointer Algorithm**. This repository explains the intuition, approach, complexity analysis, and provides implementations in multiple programming languages.

This solution is beginner-friendly and focuses on writing efficient code with an optimal `O(n log n)` time complexity.

---

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

Given an array of positive integers and an integer `k`, the goal is to count how many unique pairs have an **absolute difference strictly smaller than `k`**.

A pair `(i, j)` is considered the same as `(j, i)`, so each pair should only be counted once.

The challenge is to solve the problem efficiently because the array can contain up to `100,000` elements. A simple nested loop would be too slow, so an optimized algorithm is needed.

This problem is a good example of using the **Sorting Algorithm**, **Two Pointer Technique**, and **Array Traversal** to reduce the overall time complexity.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | `1 ≤ n ≤ 10^5` |
| K | `0 ≤ k ≤ 10^5` |
| Array Element | `1 ≤ arr[i] ≤ 10^5` |

---

## Intuition

The first thing I noticed was that checking every possible pair would require two nested loops, resulting in `O(n²)` time complexity. That approach becomes too slow for large inputs.

I realized that if I sort the array first, numbers that are close in value will also be close in position. This makes it much easier to find valid pairs.

Instead of restarting the search for every element, I can keep a second pointer moving only forward. This avoids unnecessary comparisons and allows me to count many valid pairs at once.

That naturally leads to the **Sorting + Two Pointer** approach.

---

## Approach

1. Sort the array in increasing order.
2. Keep two pointers:
   - The first pointer represents the current starting element.
   - The second pointer expands as long as the difference remains less than `k`.
3. For every starting element:
   - Move the second pointer forward while the condition is satisfied.
   - Every element between these pointers forms a valid pair.
4. Add the number of valid elements to the final answer.
5. Continue until every element has been processed.

Since each pointer only moves forward, the traversal after sorting is linear.

---

## Data Structures Used

### Array

The input array stores all numbers. After sorting, it becomes easier to compare nearby values.

### Integer Variables

A few integer variables are used for:

- Left pointer
- Right pointer
- Array size
- Final answer

No extra arrays, maps, sets, or hash tables are required.

---

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Sort the input array.
2. Start with two pointers.
3. Expand the right pointer while the difference is smaller than `k`.
4. Count every valid element between the pointers.
5. Move the left pointer forward.
6. Repeat until the entire array has been processed.
7. Return the total number of valid pairs.

The important observation is that the right pointer never moves backward, making the traversal very efficient.

---

## Complexity

| Type | Complexity | Explanation |
|------|------------|-------------|
| Time Complexity | `O(n log n)` | Sorting takes `O(n log n)` and the two-pointer traversal takes `O(n)`. |
| Space Complexity | `O(1)` | Only a few variables are used. No additional data structures are required. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countPairs(vector<int>& arr, int k) {
        // Sort the array so nearby values have smaller differences
        sort(arr.begin(), arr.end());

        int n = arr.size();
        int j = 1;
        int ans = 0;

        // Try every element as the first element of a pair
        for (int i = 0; i < n; i++) {

            // Make sure j always stays ahead of i
            if (j <= i)
                j = i + 1;

            // Expand the window while the difference is less than k
            while (j < n && arr[j] - arr[i] < k)
                j++;

            // All elements from i+1 to j-1 make valid pairs with arr[i]
            ans += (j - i - 1);
        }

        // Return total number of valid pairs
        return ans;
    }
};
```

### Java

```java
import java.util.Arrays;

class Solution {
    public static int countPairs(int arr[], int k) {

        // Sort the array so differences become easier to handle
        Arrays.sort(arr);

        int n = arr.length;
        int j = 1;
        int ans = 0;

        // Use every element as the first element of a pair
        for (int i = 0; i < n; i++) {

            // Keep j ahead of i
            if (j <= i)
                j = i + 1;

            // Extend the window while difference is less than k
            while (j < n && arr[j] - arr[i] < k)
                j++;

            // Count all valid pairs starting from i
            ans += (j - i - 1);
        }

        // Return the final answer
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */
class Solution {
    countPairs(arr, k) {

        // Sort the array in ascending order
        arr.sort((a, b) => a - b);

        const n = arr.length;
        let j = 1;
        let ans = 0;

        // Consider every element as the first element of a pair
        for (let i = 0; i < n; i++) {

            // Ensure j always stays ahead of i
            if (j <= i)
                j = i + 1;

            // Increase j while the pair remains valid
            while (j < n && arr[j] - arr[i] < k)
                j++;

            // Count all valid pairs with arr[i]
            ans += (j - i - 1);
        }

        // Return total pairs
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def countPairs(self, arr: list[int], k: int) -> int:
        # Sort the array so valid pairs appear together
        arr.sort()

        n = len(arr)
        j = 1
        ans = 0

        # Use every element as the first element of a pair
        for i in range(n):

            # Make sure j is always ahead of i
            if j <= i:
                j = i + 1

            # Expand the window while difference is less than k
            while j < n and arr[j] - arr[i] < k:
                j += 1

            # Every element between i+1 and j-1 forms a valid pair
            ans += j - i - 1

        # Return the total count
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in every programming language.

The first step is sorting the array. Sorting places smaller numbers before larger ones, allowing us to compare elements in order instead of checking every possible pair.

Next, two pointers are initialized.

The left pointer selects the current element.

The right pointer searches for the farthest element whose difference with the left pointer is still less than `k`.

Whenever the difference is valid, the right pointer keeps moving forward.

As soon as the difference becomes equal to or greater than `k`, the search stops.

Every element between the two pointers forms a valid pair with the current left pointer.

Instead of counting those pairs individually, the algorithm calculates how many valid elements exist between the pointers and adds that number directly to the answer.

The left pointer is then moved to the next position.

The right pointer is never reset because the array is sorted. This is the key optimization that keeps the traversal linear.

Finally, after every element has been processed, the total count is returned.

Although the syntax differs between C++, Java, JavaScript, and Python, the algorithm behaves exactly the same in each implementation.

---

## Examples

### Example 1

**Input**

```text
arr = [1, 10, 4, 2]
k = 3
```

**Output**

```text
2
```

**Trace**

Sorted array:

```text
[1, 2, 4, 10]
```

Valid pairs:

- (1, 2)
- (2, 4)

Total pairs = **2**

---

### Example 2

**Input**

```text
arr = [2, 3, 4]
k = 5
```

**Output**

```text
3
```

**Trace**

Sorted array:

```text
[2, 3, 4]
```

Valid pairs:

- (2, 3)
- (2, 4)
- (3, 4)

Total pairs = **3**

---

### Example 3

**Input**

```text
arr = [5, 5, 5]
k = 1
```

**Output**

```text
3
```

**Trace**

Every pair has a difference of `0`, which is smaller than `1`.

Valid pairs:

- First and Second
- First and Third
- Second and Third

Total pairs = **3**

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

### Run C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Run Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### Run JavaScript

Run using Node.js:

```bash
node solution.js
```

---

### Run Python3

Run:

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- Sorting is the key step that makes the two-pointer solution possible.
- A brute-force solution would require checking every pair, resulting in `O(n²)` time complexity.
- The two-pointer approach avoids repeated comparisons because the right pointer never moves backward.
- No additional memory is required beyond a few variables.
- The algorithm naturally handles duplicate values.
- If `k` is `0`, no pair can satisfy the condition because the difference must be strictly smaller than zero.
- This technique is commonly used in array problems involving ranges, pair counting, and difference-based comparisons.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
