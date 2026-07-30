# Maximum Subset XOR

A clean and optimized solution for the **Maximum Subset XOR** problem from GeeksforGeeks using the **XOR Basis (Linear Basis)** technique. This repository explains the intuition, approach, complexity analysis, and provides solutions in multiple programming languages. If you're preparing for coding interviews or competitive programming contests, this problem is a great way to understand bit manipulation and Gaussian Elimination over XOR.

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

The **Maximum Subset XOR** problem asks us to find the largest possible XOR value that can be formed by selecting any subset of the given array.

A subset may contain:

- One element
- Multiple elements
- Every element
- Or even none (although choosing elements always gives the maximum answer here)

Instead of checking every possible subset, which would take exponential time, we need an efficient algorithm that works even for very large arrays.

### Input

- An integer array `arr[]`

### Output

- Return the maximum XOR value that can be obtained from any subset of the array.

This problem is a classic **Bit Manipulation** and **XOR Basis (Linear Basis)** problem that frequently appears in coding interviews and competitive programming contests.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | `1 ≤ n ≤ 10^5` |
| Element Value | `1 ≤ arr[i] ≤ 10^6` |

---

## Intuition

The first idea that comes to mind is trying every possible subset and calculating its XOR value.

Unfortunately, an array with `n` elements has `2ⁿ` different subsets, which becomes impossible for large values of `n`.

After looking closely at how XOR works, I noticed something interesting.

Every number is simply a collection of binary bits. Instead of thinking about subsets, I can think about building a set of independent numbers where every number contributes a unique highest set bit.

This leads directly to the idea of building a **Linear Basis (XOR Basis)**.

Once the basis is built, every possible subset XOR can be generated from it, and finding the maximum XOR becomes a simple greedy process.

---

## Approach

I solve the problem in two major phases.

### Phase 1: Build the XOR Basis

- Start from the highest bit.
- Find a number that contains this bit.
- Move it into the current basis position.
- Remove this bit from every other number using XOR.
- Continue until every bit has been processed.

After this phase, every basis element has a unique highest set bit.

### Phase 2: Build the Maximum XOR

- Start with answer = 0.
- Visit every basis element.
- If XORing it increases the current answer, include it.
- Otherwise skip it.

The final answer is the maximum subset XOR.

---

## Data Structures Used

### Array

The original array is modified directly while building the XOR basis.

This avoids using extra memory and keeps the space complexity constant.

### Integer Variables

A few integer variables are used for:

- Current bit position
- Current basis index
- Final answer
- Temporary indices during elimination

No additional dynamic data structures are required.

---

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Process bits from the highest position to the lowest.
2. Search for an element containing the current bit.
3. Move that element into the basis.
4. Remove that bit from every other element.
5. Repeat until every bit has been processed.
6. Traverse the basis elements.
7. Greedily combine them to maximize the XOR value.
8. Return the final answer.

---

## Complexity

| Operation | Complexity | Explanation |
|-----------|------------|-------------|
| Time Complexity | `O(n × log(max(arr[i])))` | Every bit position is processed once while scanning the array. |
| Space Complexity | `O(1)` | The original array is modified in place without using extra data structures. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxSubsetXOR(vector<int> &arr) {
        int n = arr.size();

        // This index tells where the next basis element will be placed
        int index = 0;

        // Process bits from highest (31) to lowest (0)
        for (int bit = 31; bit >= 0; bit--) {

            int maxIndex = -1;

            // Find a number having the current bit set
            for (int i = index; i < n; i++) {
                if (arr[i] & (1 << bit)) {
                    maxIndex = i;
                    break;
                }
            }

            // If no number contains this bit, move to the next bit
            if (maxIndex == -1)
                continue;

            // Bring the selected number to the current basis position
            swap(arr[index], arr[maxIndex]);

            // Remove this bit from every other number
            for (int i = 0; i < n; i++) {
                if (i != index && (arr[i] & (1 << bit))) {
                    arr[i] ^= arr[index];
                }
            }

            // Move to the next basis position
            index++;
        }

        // Build the maximum XOR greedily
        int ans = 0;

        for (int i = 0; i < index; i++) {
            // Include the basis element only if it increases the answer
            ans = max(ans, ans ^ arr[i]);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int maxSubsetXOR(int[] arr) {

        int n = arr.length;

        // Position where the next basis element will be stored
        int index = 0;

        // Process every bit from highest to lowest
        for (int bit = 31; bit >= 0; bit--) {

            int maxIndex = -1;

            // Find an element with the current bit set
            for (int i = index; i < n; i++) {
                if ((arr[i] & (1 << bit)) != 0) {
                    maxIndex = i;
                    break;
                }
            }

            // No candidate found for this bit
            if (maxIndex == -1)
                continue;

            // Swap it into the current basis position
            int temp = arr[index];
            arr[index] = arr[maxIndex];
            arr[maxIndex] = temp;

            // Remove this bit from all other numbers
            for (int i = 0; i < n; i++) {
                if (i != index && (arr[i] & (1 << bit)) != 0) {
                    arr[i] ^= arr[index];
                }
            }

            index++;
        }

        // Construct the maximum XOR
        int ans = 0;

        for (int i = 0; i < index; i++) {
            ans = Math.max(ans, ans ^ arr[i]);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    maxSubsetXOR(arr) {

        const n = arr.length;

        // Position for storing the next basis element
        let index = 0;

        // Process bits from highest to lowest
        for (let bit = 31; bit >= 0; bit--) {

            let maxIndex = -1;

            // Find an element containing the current bit
            for (let i = index; i < n; i++) {
                if ((arr[i] & (1 << bit)) !== 0) {
                    maxIndex = i;
                    break;
                }
            }

            // Skip if no element has this bit
            if (maxIndex === -1)
                continue;

            // Swap the selected element into the basis position
            [arr[index], arr[maxIndex]] = [arr[maxIndex], arr[index]];

            // Eliminate the current bit from all other elements
            for (let i = 0; i < n; i++) {
                if (i !== index && ((arr[i] & (1 << bit)) !== 0)) {
                    arr[i] ^= arr[index];
                }
            }

            index++;
        }

        // Greedily build the largest XOR
        let ans = 0;

        for (let i = 0; i < index; i++) {
            ans = Math.max(ans, ans ^ arr[i]);
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def maxSubsetXOR(self, arr):

        n = len(arr)

        # Position where the next basis element will be placed
        index = 0

        # Process bits from highest to lowest
        for bit in range(31, -1, -1):

            maxIndex = -1

            # Find an element having the current bit set
            for i in range(index, n):
                if arr[i] & (1 << bit):
                    maxIndex = i
                    break

            # No element found for this bit
            if maxIndex == -1:
                continue

            # Move it into the basis position
            arr[index], arr[maxIndex] = arr[maxIndex], arr[index]

            # Remove the current bit from every other element
            for i in range(n):
                if i != index and (arr[i] & (1 << bit)):
                    arr[i] ^= arr[index]

            index += 1

        # Construct the maximum XOR greedily
        ans = 0

        for i in range(index):
            ans = max(ans, ans ^ arr[i])

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in every language. Only the syntax changes.

First, the algorithm creates a variable that points to the next position where a basis element should be stored.

Next, it starts checking every bit from the highest position down to the lowest one. Processing larger bits first is important because they contribute more to the final XOR value.

For each bit, the algorithm searches for a number that contains that bit.

If no such number exists, that bit cannot become part of the basis, so it simply moves to the next bit.

If a suitable number is found, it is moved into the current basis position.

After selecting that number, the algorithm removes the current highest bit from every other number by applying the XOR operation.

This elimination step is very similar to Gaussian Elimination used in linear algebra, except that XOR replaces normal subtraction.

When all bits have been processed, the first few elements of the array form the XOR basis.

Every basis element has a unique highest set bit, making them linearly independent.

Finally, the algorithm builds the answer greedily.

Starting with zero, it checks whether XORing the current basis element increases the answer.

If it does, the element is included.

Otherwise, it is skipped.

By the end of the traversal, the largest possible subset XOR has been constructed.

Since the algorithm only changes array values in place, the memory usage stays constant.

---

## Examples

### Example 1

**Input**

```text
arr = [2, 4, 5]
```

**Output**

```text
7
```

**Trace**

- Basis becomes independent.
- Combining `2` and `5` produces:

```
2 XOR 5 = 7
```

No other subset produces a larger value.

---

### Example 2

**Input**

```text
arr = [9, 8, 5]
```

**Output**

```text
13
```

**Trace**

The best subset is:

```
8 XOR 5 = 13
```

No other combination produces a larger XOR.

---

### Example 3

**Input**

```text
arr = [1, 2, 3]
```

**Output**

```text
3
```

**Trace**

Possible XOR values include:

```
1
2
3
1 XOR 2 = 3
1 XOR 3 = 2
2 XOR 3 = 1
1 XOR 2 XOR 3 = 0
```

The maximum value is `3`.

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

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run using Node.js:

```bash
node solution.js
```

---

### Python3

Run:

```bash
python solution.py
```

---

## Notes & Optimizations

- This is a classic **Bit Manipulation** problem.
- The solution is based on the **Linear Basis (XOR Basis)** algorithm.
- It is much faster than checking every subset.
- The algorithm modifies the input array directly, which helps achieve constant extra space.
- Processing bits from the highest position guarantees that larger values are considered first.
- This technique is commonly used in competitive programming, coding interviews, and advanced XOR problems.
- The same idea can also solve many related maximum XOR and subset XOR problems.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
