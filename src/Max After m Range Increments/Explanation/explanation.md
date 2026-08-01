# Max After m Range Increments | Difference Array Solution (C++, Java, JavaScript, Python)

A beginner-friendly and optimized solution for the **Max After m Range Increments** problem from GeeksforGeeks using the **Difference Array Algorithm** and **Prefix Sum Technique**. This repository explains the intuition, approach, complexity analysis, and provides solutions in multiple programming languages.

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

You are given an array of size `n`, where every element is initially `0`.

There are `m` range increment operations. Each operation is represented by three arrays:

- `a[i]` → starting index
- `b[i]` → ending index
- `k[i]` → value to add

For every operation, you need to add `k[i]` to every element from index `a[i]` to `b[i]`.

After applying all the operations, return the **maximum value present in the array**.

A straightforward solution updates every element in every range, but that becomes too slow for large inputs. The goal is to solve it efficiently using the **Difference Array** and **Prefix Sum** techniques.

---

## Constraints

| Constraint | Value |
| ------------ | ------- |
| `1 ≤ n ≤ 10^6` | Array size |
| `1 ≤ m ≤ 10^6` | Number of operations |
| `0 ≤ a[i] ≤ b[i] ≤ n-1` | Valid range |
| `0 ≤ k[i] ≤ 10^6` | Increment value |

---

## Intuition

My first thought was to update every element inside each range.

That approach works, but after looking at the constraints, it became clear that it would take far too much time. If every operation updates thousands or even millions of elements, the total work becomes enormous.

Then I realized something important.

I don't actually need to update every element immediately.

Instead, I only need to remember where an increment starts and where it ends. After processing every operation, one prefix sum is enough to rebuild the final array.

This is exactly what the **Difference Array Algorithm** is designed for.

---

## Approach

I start by creating a difference array of size `n + 1` filled with zeros.

For every range operation:

1. Add `k[i]` at index `a[i]`.
2. Subtract `k[i]` at index `b[i] + 1` if that index exists.

This records where the increment begins and where it should stop.

After processing every operation, I traverse the difference array from left to right.

While moving through the array:

- I maintain a running prefix sum.
- That running sum represents the actual value at the current index.
- I continuously keep track of the largest value seen so far.

At the end, that largest value is the answer.

---

## Data Structures Used

| Data Structure | Purpose |
| --------------- | --------- |
| Difference Array | Stores only the starting and ending effect of each range update. |
| Prefix Sum | Reconstructs the final array values from the difference array. |
| Integer Variables | Used for the running sum and maximum value. |

---

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Create a difference array initialized with zeros.
2. Process every range increment operation.
3. Mark where each increment starts.
4. Mark where each increment ends.
5. Traverse the difference array.
6. Compute the running prefix sum.
7. Update the maximum value while computing the prefix sum.
8. Return the maximum value.

This avoids updating every element of every range individually.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n + m)** | Each operation is processed once, and the array is traversed once. |
| Space Complexity | **O(n)** | One extra difference array of size `n + 1` is used. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findMax(int n, vector<int>& a, vector<int>& b, vector<int>& k) {
        
        // Difference array to store range updates
        vector<long long> diff(n + 1, 0);

        // Apply every range update in O(1)
        for (int i = 0; i < a.size(); i++) {

            // Increment starts from a[i]
            diff[a[i]] += k[i];

            // Stop increment after b[i]
            if (b[i] + 1 < n)
                diff[b[i] + 1] -= k[i];
        }

        long long current = 0;
        long long maximum = 0;

        // Build the final array using prefix sum
        for (int i = 0; i < n; i++) {

            // Current value at this index
            current += diff[i];

            // Update maximum value found so far
            maximum = max(maximum, current);
        }

        return (int)maximum;
    }
};
```

### Java

```java
class Solution {
    public int findMax(int n, int[] a, int[] b, int[] k) {

        // Difference array for efficient range updates
        long[] diff = new long[n + 1];

        // Process every operation
        for (int i = 0; i < a.length; i++) {

            // Increment starts here
            diff[a[i]] += k[i];

            // Increment stops after b[i]
            if (b[i] + 1 < n)
                diff[b[i] + 1] -= k[i];
        }

        long current = 0;
        long maximum = 0;

        // Convert difference array into actual values
        for (int i = 0; i < n; i++) {

            // Prefix sum gives the current element
            current += diff[i];

            // Store the largest value
            maximum = Math.max(maximum, current);
        }

        return (int)maximum;
    }
}
```

### JavaScript

```javascript
class Solution {
    findMax(n, a, b, k) {

        // Difference array initialized with 0
        const diff = new Array(n + 1).fill(0);

        // Apply each range update
        for (let i = 0; i < a.length; i++) {

            // Increment begins here
            diff[a[i]] += k[i];

            // Remove the increment after the range ends
            if (b[i] + 1 < n)
                diff[b[i] + 1] -= k[i];
        }

        let current = 0;
        let maximum = 0;

        // Build the final values using prefix sum
        for (let i = 0; i < n; i++) {

            // Current array value
            current += diff[i];

            // Update answer
            maximum = Math.max(maximum, current);
        }

        return maximum;
    }
}
```

### Python3

```python
class Solution:
    def findMax(self, n, a, b, k):

        # Difference array for range updates
        diff = [0] * (n + 1)

        # Process every operation
        for i in range(len(a)):

            # Increment starts here
            diff[a[i]] += k[i]

            # Stop increment after the range
            if b[i] + 1 < n:
                diff[b[i] + 1] -= k[i]

        current = 0
        maximum = 0

        # Prefix sum reconstructs the original array
        for i in range(n):

            # Current value at this index
            current += diff[i]

            # Keep track of the maximum value
            maximum = max(maximum, current)

        return maximum
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all four programming languages. Only the syntax changes.

The first step is creating a difference array.

Instead of storing the final values directly, the difference array stores where every range update begins and where it ends.

For every operation:

- Increase the value at the starting index.
- Decrease the value immediately after the ending index.

This means the increment automatically affects every position between those two points once we calculate the prefix sum.

After all operations are recorded, we move from left to right through the difference array.

At every index:

- Add the current difference value to the running sum.
- The running sum now represents the actual value of that position in the original array.
- Compare it with the current maximum value.
- Update the maximum whenever a larger value is found.

Because the maximum is updated while rebuilding the array, there is no need for another traversal.

The only language-specific difference is syntax:

- C++ uses `vector`.
- Java uses arrays and `long`.
- JavaScript uses dynamic arrays.
- Python uses lists.

The overall algorithm and behavior remain exactly the same.

---

## Examples

### Example 1

**Input**

```
n = 5

a = [0, 1, 2]

b = [1, 4, 3]

k = [100, 100, 100]
```

**Output**

```
200
```

**Trace**

- First operation updates indices `0–1`.
- Second operation updates indices `1–4`.
- Third operation updates indices `2–3`.
- Final array becomes:

```
[100, 200, 200, 200, 100]
```

Maximum value is:

```
200
```

---

### Example 2

**Input**

```
n = 4

a = [1, 0, 3]

b = [2, 0, 3]

k = [603, 286, 882]
```

**Output**

```
882
```

**Trace**

Final array becomes

```
[286, 603, 603, 882]
```

Maximum value is

```
882
```

---

### Example 3

**Input**

```
n = 6

a = [0, 2]

b = [5, 4]

k = [5, 3]
```

**Output**

```
8
```

**Trace**

After applying both operations

```
[5, 5, 8, 8, 8, 5]
```

Maximum value is

```
8
```

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project directory.

```bash
cd your-repository
```

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

---

## Notes & Optimizations

- The Difference Array technique is one of the best methods for solving multiple range update problems.
- A brute-force solution would update every element of every range, leading to a time complexity of **O(n × m)**.
- This optimized solution reduces the complexity to **O(n + m)**.
- Using a prefix sum allows all range updates to be applied in one final traversal.
- This technique is commonly used in competitive programming, coding interviews, and range update problems involving arrays.
- For very large inputs, using `long long` in C++ or `long` in Java helps avoid integer overflow.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
