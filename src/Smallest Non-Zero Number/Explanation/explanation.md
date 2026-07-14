# Smallest Non-Zero Number | Greedy Reverse Traversal Solution (GeeksforGeeks)

A clean and optimized solution for the **Smallest Non-Zero Number** problem from GeeksforGeeks using a **Greedy Reverse Traversal** approach. This repository explains the idea in simple English and includes implementations in **C++, Java, JavaScript, and Python3**.

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

The goal is to find the **smallest positive starting number** such that, after processing every element of the given array one by one, the value never becomes negative.

For every array element, the current value changes according to the rule given in the problem. Although the statement presents two separate cases, both of them simplify to the same mathematical expression. This observation makes it possible to solve the problem efficiently without trying multiple starting values.

The input is an integer array, and the output is the minimum valid starting number.

This is a popular **GeeksforGeeks DSA problem** that can be solved using a simple **greedy reverse traversal algorithm** with **constant extra space**.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | `1 ≤ n ≤ 10^6` |
| Array Element | `1 ≤ arr[i] ≤ 10^4` |

---

## Intuition

When I first looked at the problem, the two conditions made it seem like I would have to simulate several different starting values or even use binary search.

After expanding both formulas, I noticed something interesting.

No matter which condition is used, the new value always becomes:

`newValue = 2 × currentValue − arrayElement`

That completely changes the problem.

Instead of guessing the answer, I can work backwards. If I already know the minimum value needed after processing an element, I can calculate the minimum value required before processing it.

This reverse thinking leads directly to an optimal linear-time solution.

---

## Approach

I begin from the last element of the array because the required starting value depends on what happens later.

Initially, I only need the value after the final operation to remain non-negative.

For every element while moving backwards:

1. Calculate the minimum value needed before this element.
2. Use ceiling division because the required value must always be an integer.
3. Update the required value.
4. Continue until the beginning of the array.

Once the traversal finishes, the remaining value is the smallest valid starting number.

This greedy reverse traversal avoids unnecessary simulation and works in a single pass.

---

## Data Structures Used

| Data Structure | Purpose |
|---------------|---------|
| Integer Variable | Stores the minimum value required while traversing backwards |
| Input Array | Holds the given numbers that are processed one by one |

No additional arrays, stacks, queues, hash maps, or other data structures are required.

---

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Start from the last array element.
2. Assume the minimum required value after the current element is already known.
3. Compute the minimum value required before the current element.
4. Move one position to the left.
5. Repeat until the first element is processed.
6. Return the final required value.

Since every element is visited exactly once, the solution remains fast even for very large arrays.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n)** | Every array element is processed exactly once. |
| Space Complexity | **O(1)** | Only one extra integer variable is used. |

Here, **n** represents the number of elements in the array.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int find(vector<int>& arr) {
        // Minimum value needed after processing all elements
        int need = 0;

        // Process the array from right to left
        for (int i = arr.size() - 1; i >= 0; i--) {

            // Minimum value required before this element
            // ceil((need + arr[i]) / 2)
            need = (need + arr[i] + 1) / 2;
        }

        // This is the smallest valid starting value
        return need;
    }
};
```

### Java

```java
class Solution {
    public int find(int[] arr) {

        // Minimum value needed after processing all elements
        int need = 0;

        // Traverse from right to left
        for (int i = arr.length - 1; i >= 0; i--) {

            // Compute the minimum value needed before this element
            // using ceiling division
            need = (need + arr[i] + 1) / 2;
        }

        // Smallest valid starting value
        return need;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
    find(arr) {

        // Minimum value needed after the last element
        let need = 0;

        // Traverse from right to left
        for (let i = arr.length - 1; i >= 0; i--) {

            // Ceiling of (need + arr[i]) / 2
            need = Math.floor((need + arr[i] + 1) / 2);
        }

        // Return the smallest valid starting value
        return need;
    }
}
```

### Python3

```python
class Solution:
    def find(self, arr):
        # Minimum value needed after processing all elements
        need = 0

        # Traverse from right to left
        for value in reversed(arr):

            # Ceiling of (need + value) / 2
            need = (need + value + 1) // 2

        # Smallest valid starting value
        return need
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in every programming language.

First, create a variable that stores the minimum value required after processing the current position. Initially, this value is zero because the final result only needs to stay non-negative.

Next, traverse the array from right to left.

For each element, calculate the smallest integer value that guarantees the next value will still satisfy the required minimum. Since the result can contain fractions, ceiling division is used to round upward.

After computing this new requirement, overwrite the previous value because only the latest minimum is needed.

Continue this process until the beginning of the array is reached.

Finally, return the computed value.

The implementation remains identical across C++, Java, JavaScript, and Python3. Only the syntax for loops and integer division changes.

---

## Examples

### Example 1

**Input**

```text
arr = [3, 4, 3, 2, 4]
```

**Output**

```text
4
```

**Trace**

- Start from the last element.
- Compute the required value for each previous position.
- Continue updating while moving backwards.
- The final required starting value becomes `4`.

---

### Example 2

**Input**

```text
arr = [4, 4]
```

**Output**

```text
3
```

**Trace**

- Process the last element.
- Move to the first element.
- The minimum required starting value becomes `3`.

---

### Example 3

**Input**

```text
arr = [1]
```

**Output**

```text
1
```

**Trace**

Only one element exists, so the smallest positive value that never becomes negative is `1`.

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

Run using Node.js

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

- The key observation is that both conditions in the problem simplify into the same mathematical expression.
- Reverse traversal makes the solution much simpler than forward simulation.
- No binary search is needed.
- No extra data structures are required.
- The algorithm uses constant extra memory.
- The solution works efficiently even for the maximum input size.
- Since every element is processed once, this is the optimal approach for the given constraints.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
