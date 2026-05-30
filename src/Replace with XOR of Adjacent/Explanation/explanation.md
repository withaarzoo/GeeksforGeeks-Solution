# Replace with XOR of Adjacent | GeeksforGeeks Solution

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

Given an integer array, the goal is to replace every element with the XOR of its adjacent elements.

The update rules are:

* The first element becomes `arr[0] XOR arr[1]`
* The last element becomes `arr[n-1] XOR arr[n-2]`
* Every middle element becomes `arr[i-1] XOR arr[i+1]`

The challenge is that all replacements must be based on the original array values. If we update elements directly while traversing, future calculations may become incorrect.

This problem is a common array transformation and bit manipulation problem that tests understanding of XOR operations and in-place update limitations.

## Constraints

| Constraint     | Value            |
| -------------- | ---------------- |
| Array Size (n) | 2 ≤ n ≤ 10⁵      |
| Array Element  | 1 ≤ arr[i] ≤ 10⁷ |

## Intuition

The first thing I noticed was that every updated value depends on neighboring elements from the original array.

That immediately raises a problem. If I start modifying the array directly, some original values will be lost before they are used for later calculations.

To avoid that issue, I can compute all updated values in a separate array first. Once every value has been calculated, I can copy the result back into the original array.

This keeps every XOR operation based on the original data.

## Approach

1. Find the size of the array.
2. Create a temporary array of the same size.
3. Compute the first element using the first two elements.
4. Compute the last element using the last two elements.
5. Traverse all middle positions.
6. For each middle index, calculate the XOR of its left and right neighbors.
7. Store all results inside the temporary array.
8. Copy the temporary array back into the original array.

This guarantees that every calculation uses unchanged values.

## Data Structures Used

### Array / Vector

A temporary array is used to store the updated values before replacing the original array.

Why it is needed:

* Prevents overwriting original values
* Keeps calculations correct
* Simple and efficient for this problem

## Operations & Behavior Summary

The algorithm performs the following actions:

1. Read the original array.
2. Create a result array.
3. Calculate the first position using itself and the next element.
4. Calculate the last position using itself and the previous element.
5. Calculate every middle position using its adjacent neighbors.
6. Store each result in the temporary array.
7. Replace the original array contents with the new values.
8. Return the modified array.

## Complexity

| Metric           | Complexity | Explanation                                                    |
| ---------------- | ---------- | -------------------------------------------------------------- |
| Time Complexity  | O(n)       | The array is traversed a constant number of times.             |
| Space Complexity | O(n)       | An additional array of size n is used to store updated values. |

Where:

* `n` = number of elements in the array

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    void replaceElements(vector<int>& arr) {
        int n = arr.size();

        // Temporary array to store updated values
        vector<int> temp(n);

        // First element uses itself and next element
        temp[0] = arr[0] ^ arr[1];

        // Last element uses previous and itself
        temp[n - 1] = arr[n - 2] ^ arr[n - 1];

        // Middle elements use left and right neighbors
        for (int i = 1; i < n - 1; i++) {
            temp[i] = arr[i - 1] ^ arr[i + 1];
        }

        // Copy updated values back to original array
        arr = temp;
    }
};
```

### Java

```java
class Solution {
    public void replaceElements(int[] arr) {
        int n = arr.length;

        // Temporary array to store updated values
        int[] temp = new int[n];

        // First element
        temp[0] = arr[0] ^ arr[1];

        // Last element
        temp[n - 1] = arr[n - 2] ^ arr[n - 1];

        // Middle elements
        for (int i = 1; i < n - 1; i++) {
            temp[i] = arr[i - 1] ^ arr[i + 1];
        }

        // Copy result back into original array
        for (int i = 0; i < n; i++) {
            arr[i] = temp[i];
        }
    }
}
```

### JavaScript

```javascript
class Solution {
    replaceElements(arr) {
        const n = arr.length;

        // Temporary array to store updated values
        let temp = new Array(n);

        // First element
        temp[0] = arr[0] ^ arr[1];

        // Last element
        temp[n - 1] = arr[n - 2] ^ arr[n - 1];

        // Middle elements
        for (let i = 1; i < n - 1; i++) {
            temp[i] = arr[i - 1] ^ arr[i + 1];
        }

        // Copy values back to original array
        for (let i = 0; i < n; i++) {
            arr[i] = temp[i];
        }
    }
}
```

### Python3

```python
class Solution:
    def replaceElements(self, arr):
        n = len(arr)

        # Temporary array to store updated values
        temp = [0] * n

        # First element
        temp[0] = arr[0] ^ arr[1]

        # Last element
        temp[n - 1] = arr[n - 2] ^ arr[n - 1]

        # Middle elements
        for i in range(1, n - 1):
            temp[i] = arr[i - 1] ^ arr[i + 1]

        # Copy result back into original array
        for i in range(n):
            arr[i] = temp[i]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same across all languages.

### Step 1: Determine Array Size

The algorithm first finds the total number of elements.

This is necessary because the first and last elements follow special update rules.

### Step 2: Create a Temporary Array

A separate array is created to store updated values.

This is the most important part of the solution.

If we directly update the original array, later calculations may use modified values instead of original values, producing incorrect answers.

### Step 3: Update the First Element

The first position has only one adjacent element on the right.

So its new value becomes:

`arr[0] XOR arr[1]`

The result is stored inside the temporary array.

### Step 4: Update the Last Element

The last position has only one adjacent element on the left.

So its new value becomes:

`arr[n-2] XOR arr[n-1]`

Again, the result is stored inside the temporary array.

### Step 5: Process Middle Elements

For every index from `1` to `n-2`:

* Take the left neighbor
* Take the right neighbor
* Perform XOR
* Store the result

The current element itself is not used.

### Step 6: Copy Results Back

Once every updated value has been computed, the temporary array contains the final answer.

The contents are copied back into the original array.

### Why Not Update Directly?

Consider:

```text
[2, 1, 4, 7]
```

If the first element is updated immediately:

```text
[3, 1, 4, 7]
```

The original value `2` is gone.

When calculating the next position, the algorithm would accidentally use `3` instead of `2`, producing incorrect results.

That is why a separate array is required.

## Examples

### Example 1

Input

```text
arr = [2, 1, 4, 7]
```

Output

```text
[3, 6, 6, 3]
```

Trace

```text
Index 0 = 2 XOR 1 = 3
Index 1 = 2 XOR 4 = 6
Index 2 = 1 XOR 7 = 6
Index 3 = 4 XOR 7 = 3
```

Final Array

```text
[3, 6, 6, 3]
```

---

### Example 2

Input

```text
arr = [5, 9, 2, 6, 7]
```

Output

```text
[12, 7, 15, 5, 1]
```

Trace

```text
Index 0 = 5 XOR 9 = 12
Index 1 = 5 XOR 2 = 7
Index 2 = 9 XOR 6 = 15
Index 3 = 2 XOR 7 = 5
Index 4 = 6 XOR 7 = 1
```

Final Array

```text
[12, 7, 15, 5, 1]
```

---

### Example 3

Input

```text
arr = [1, 2]
```

Output

```text
[3, 3]
```

Trace

```text
First Element = 1 XOR 2 = 3
Last Element = 1 XOR 2 = 3
```

Final Array

```text
[3, 3]
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

* The temporary array is necessary because every update depends on original values.
* Direct in-place modification will produce incorrect results.
* The algorithm already runs in linear time.
* Since every element must be processed at least once, O(n) is the best possible time complexity.
* The solution is simple, easy to understand, and works efficiently for the maximum constraint size.
* This is a classic array manipulation and XOR operation problem frequently asked in coding interviews and online coding platforms.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
