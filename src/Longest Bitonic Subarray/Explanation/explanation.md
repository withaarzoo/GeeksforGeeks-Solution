# Longest Bitonic Subarray | GeeksforGeeks Solution | O(n) Dynamic Programming Approach

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

The **Longest Bitonic Subarray** problem asks us to find the maximum length of a contiguous subarray whose elements first move in a non-decreasing order and then move in a non-increasing order.

The increasing part, the decreasing part, or both can contain equal values. A completely increasing or completely decreasing subarray is also considered bitonic.

### Input

- An integer array `arr[]`

### Output

- Return the length of the longest bitonic subarray.

This is a classic **array**, **dynamic programming**, and **linear traversal** problem where the goal is to achieve the best possible **O(n)** time complexity.

---

## Constraints

| Constraint | Value |
|------------|-------|
| `1 ≤ n ≤ 10^6` | Number of elements |
| `1 ≤ arr[i] ≤ 10^6` | Value of each element |

---

## Intuition

My first instinct was to check every possible subarray and verify whether it forms a bitonic sequence. That idea works, but it becomes far too slow for large inputs.

Then I noticed something important. Every bitonic subarray has a highest point, or peak. If I already know how far I can extend to the left while keeping the sequence non-decreasing, and how far I can extend to the right while keeping it non-increasing, then I can immediately calculate the longest bitonic subarray with that position as the peak.

Instead of repeatedly checking the same elements, I calculate this information only once for every index and reuse it. That reduces the solution to a simple linear scan.

---

## Approach

I solve the problem in three simple steps.

1. Traverse the array from left to right.
   - Store the length of the longest non-decreasing subarray ending at every index.

2. Traverse the array from right to left.
   - Store the length of the longest non-increasing subarray starting from every index.

3. Treat every index as the peak of a bitonic subarray.
   - Add the left and right lengths.
   - Subtract one because the peak gets counted twice.
   - Keep updating the maximum answer.

This approach visits every element only a few times, making it efficient even for very large arrays.

---

## Data Structures Used

### Array (`inc[]`)

Stores the length of the longest non-decreasing subarray ending at every index.

### Array (`dec[]`)

Stores the length of the longest non-increasing subarray starting at every index.

### Integer Variable

Keeps track of the maximum bitonic subarray length found so far.

---

## Operations & Behavior Summary

The algorithm works in the following order.

1. Initialize two helper arrays.
2. Build the increasing-length array from left to right.
3. Build the decreasing-length array from right to left.
4. Consider every index as a possible peak.
5. Combine the two lengths.
6. Remove the duplicate count of the peak.
7. Update the answer whenever a longer bitonic subarray is found.
8. Return the final maximum length.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n)** | The array is scanned a constant number of times. |
| Space Complexity | **O(n)** | Two helper arrays are used to store increasing and decreasing lengths. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int bitonic(vector<int> &arr) {
        int n = arr.size();

        // Stores length of non-decreasing subarray ending at each index
        vector<int> inc(n, 1);

        // Build the increasing information
        for (int i = 1; i < n; i++) {
            if (arr[i] >= arr[i - 1])
                inc[i] = inc[i - 1] + 1;
        }

        // Stores length of non-increasing subarray starting at each index
        vector<int> dec(n, 1);

        // Build the decreasing information from right to left
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1])
                dec[i] = dec[i + 1] + 1;
        }

        int ans = 1;

        // Treat every index as the peak of a bitonic subarray
        for (int i = 0; i < n; i++) {
            ans = max(ans, inc[i] + dec[i] - 1);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int bitonic(int[] arr) {

        int n = arr.length;

        // Stores length of non-decreasing subarray ending at each index
        int[] inc = new int[n];

        for (int i = 0; i < n; i++)
            inc[i] = 1;

        // Build increasing lengths
        for (int i = 1; i < n; i++) {
            if (arr[i] >= arr[i - 1])
                inc[i] = inc[i - 1] + 1;
        }

        // Stores length of non-increasing subarray starting at each index
        int[] dec = new int[n];

        for (int i = 0; i < n; i++)
            dec[i] = 1;

        // Build decreasing lengths
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1])
                dec[i] = dec[i + 1] + 1;
        }

        int ans = 1;

        // Calculate the best bitonic length
        for (int i = 0; i < n; i++) {
            ans = Math.max(ans, inc[i] + dec[i] - 1);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    bitonic(arr) {

        const n = arr.length;

        // Stores length of non-decreasing subarray ending at each index
        const inc = new Array(n).fill(1);

        // Build increasing lengths
        for (let i = 1; i < n; i++) {
            if (arr[i] >= arr[i - 1]) {
                inc[i] = inc[i - 1] + 1;
            }
        }

        // Stores length of non-increasing subarray starting at each index
        const dec = new Array(n).fill(1);

        // Build decreasing lengths
        for (let i = n - 2; i >= 0; i--) {
            if (arr[i] >= arr[i + 1]) {
                dec[i] = dec[i + 1] + 1;
            }
        }

        let ans = 1;

        // Treat every index as the peak
        for (let i = 0; i < n; i++) {
            ans = Math.max(ans, inc[i] + dec[i] - 1);
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
 def bitonic(self, arr):

  n = len(arr)

  # Stores length of non-decreasing subarray ending at each index
  inc = [1] * n

  # Build increasing lengths
  for i in range(1, n):
   if arr[i] >= arr[i - 1]:
    inc[i] = inc[i - 1] + 1

  # Stores length of non-increasing subarray starting at each index
  dec = [1] * n

  # Build decreasing lengths
  for i in range(n - 2, -1, -1):
   if arr[i] >= arr[i + 1]:
    dec[i] = dec[i + 1] + 1

  ans = 1

  # Try every index as the peak
  for i in range(n):
   ans = max(ans, inc[i] + dec[i] - 1)

  return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in every language. Only the syntax changes.

First, two helper arrays are created.

The first array stores how long the current non-decreasing sequence has become while moving from left to right.

If the current value is greater than or equal to the previous value, the sequence continues, so its length increases by one.

Otherwise, the sequence breaks and a new one begins from the current position.

Next, another helper array is filled while moving from right to left.

This array stores the longest non-increasing sequence starting from every index.

If the current value is greater than or equal to the next value, the decreasing sequence continues.

Otherwise, the sequence restarts.

Once both helper arrays are ready, every position is treated as the highest point of a possible bitonic subarray.

The increasing length from the left and the decreasing length from the right are added together.

Since the peak belongs to both parts, it gets counted twice, so one is subtracted.

The algorithm keeps the largest value found during this process.

Finally, the maximum length is returned.

Because each array is processed only once, the solution remains efficient even when the input contains one million elements.

---

## Examples

### Example 1

**Input**

```text
arr = [12, 4, 78, 90, 45, 23]
```

**Output**

```text
5
```

**Trace**

- Increasing sequence grows until `90`.
- From `90`, the values decrease.
- Longest bitonic subarray becomes:

```text
[4, 78, 90, 45, 23]
```

Length = **5**

---

### Example 2

**Input**

```text
arr = [10, 20, 30, 40]
```

**Output**

```text
4
```

**Trace**

The array is completely increasing.

A purely increasing array is still considered bitonic.

Answer = **4**

---

### Example 3

**Input**

```text
arr = [10, 10, 10, 10]
```

**Output**

```text
4
```

**Trace**

Equal elements satisfy both the non-decreasing and non-increasing conditions.

The complete array forms the longest bitonic subarray.

Answer = **4**

---

## How to Use / Run Locally

### C++

Compile

```bash
g++ main.cpp -o main
```

Run

```bash
./main
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

Run using Node.js

```bash
node Solution.js
```

---

### Python3

Run

```bash
python solution.py
```

---

## Notes & Optimizations

- The solution works correctly for arrays containing duplicate values because the problem allows non-decreasing and non-increasing sequences.
- A completely increasing array is also a valid bitonic array.
- A completely decreasing array is also a valid bitonic array.
- The algorithm performs only linear traversals, making it suitable for very large inputs.
- The helper arrays make the implementation simple and easy to understand.
- If constant extra space is required in a different variation of the problem, a more complex approach would be needed, but it would be harder to implement and reason about.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
