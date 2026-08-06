# Minimum Increment or Double Operations to Convert | GFG Solution (C++, Java, JavaScript, Python)

A beginner-friendly and optimized solution for the GeeksforGeeks problem **Minimum Increment or Double Operations to Convert**. This repository explains the intuition, approach, algorithm, complexity analysis, and provides multi-language implementations in **C++, Java, JavaScript, and Python**.

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

You are given an integer array `arr`.

Initially, another array of the same size contains only `0`s.

In one operation, you can perform exactly one of these actions:

- Increase any one element by `1`.
- Double every element in the array at the same time.

Your task is to find the **minimum number of operations** required to convert the initial all-zero array into the given target array.

This is a classic **greedy algorithm** and **bit manipulation** problem where understanding how binary numbers are built leads to a very efficient solution.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Array Size | `1 ≤ arr.size() ≤ 10^5` |
| Array Element | `0 ≤ arr[i] ≤ 10^9` |

---

## Intuition

When I first looked at this problem, trying to build the target array from zeros felt complicated because every doubling changes the entire array at once.

Instead, I imagined running the process backwards.

Starting from the target array:

- If a number is odd, its last operation must have been an increment.
- If every remaining value is even, the previous operation could have been a global doubling.

This immediately connects the problem with binary representation.

Every `1` bit needs one increment, while the number of doubling operations depends only on the largest element in the array.

That observation makes the entire solution much simpler.

---

## Approach

I solve the problem in four simple steps.

1. Traverse every element in the array.
2. Count the number of set bits (`1`s) in each number and add them to the answer.
3. Keep track of the largest value in the array.
4. Count how many times the largest value can be divided by `2` before becoming `1`. That count represents the total doubling operations.

Finally, return:

```
Total Operations = Total Increments + Total Doublings
```

This avoids simulating operations and gives the minimum answer directly.

---

## Data Structures Used

| Data Structure | Purpose |
| --------------- | --------- |
| Integer Variables | Store the total increment count, maximum value, and doubling count |
| Input Array | Read each element exactly once |

No extra arrays, stacks, queues, or hash maps are required.

---

## Operations & Behavior Summary

The algorithm works in the following order.

1. Initialize counters.
2. Visit every number in the array.
3. Count its set bits.
4. Add the set bits to the increment counter.
5. Update the largest element whenever needed.
6. After processing every element, repeatedly divide the largest value by `2`.
7. Count each division as one doubling operation.
8. Return the sum of increment operations and doubling operations.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n × log(k))** | `n` is the array size and `k` is the maximum value in the array. Counting bits takes `O(log(k))` for each element. |
| Space Complexity | **O(1)** | Only a few integer variables are used. No additional data structures are required. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countMinOperations(vector<int>& arr) {
        // Stores total increment operations needed
        int increments = 0;

        // Stores the largest element in the array
        int maxValue = 0;

        // Process every element
        for (int num : arr) {

            // Count set bits because every set bit
            // represents one increment operation
            increments += __builtin_popcount(num);

            // Keep track of the largest element
            maxValue = max(maxValue, num);
        }

        // Counts global doubling operations
        int doubles = 0;

        // Every division by 2 in reverse
        // represents one doubling in forward direction
        while (maxValue > 1) {
            maxValue /= 2;
            doubles++;
        }

        // Total operations
        return increments + doubles;
    }
};
```

### Java

```java
class Solution {
    public int countMinOperations(int arr[]) {

        // Stores total increment operations
        int increments = 0;

        // Stores the maximum element
        int maxValue = 0;

        // Traverse the array
        for (int num : arr) {

            // Count set bits using Java's built-in function
            increments += Integer.bitCount(num);

            // Update maximum value
            maxValue = Math.max(maxValue, num);
        }

        // Counts doubling operations
        int doubles = 0;

        // Divide until the largest number becomes 1
        while (maxValue > 1) {
            maxValue /= 2;
            doubles++;
        }

        // Return total operations
        return increments + doubles;
    }
}
```

### JavaScript

```javascript
class Solution {
    countMinOperations(arr) {

        // Stores total increment operations
        let increments = 0;

        // Stores the maximum element
        let maxValue = 0;

        // Function to count set bits
        const popcount = (num) => {
            let count = 0;

            while (num > 0) {
                count += (num & 1);
                num >>= 1;
            }

            return count;
        };

        // Process every element
        for (let num of arr) {

            // Every set bit needs one increment
            increments += popcount(num);

            // Update maximum element
            if (num > maxValue) {
                maxValue = num;
            }
        }

        // Counts doubling operations
        let doubles = 0;

        // Divide largest element until it becomes 1
        while (maxValue > 1) {
            maxValue = Math.floor(maxValue / 2);
            doubles++;
        }

        // Return answer
        return increments + doubles;
    }
}
```

### Python3

```python
class Solution:
    def countMinOperations(self, arr):

        # Stores total increment operations
        increments = 0

        # Stores the largest element
        max_value = 0

        # Process every element
        for num in arr:

            # Count set bits using binary representation
            increments += bin(num).count("1")

            # Update maximum value
            max_value = max(max_value, num)

        # Counts doubling operations
        doubles = 0

        # Every division by 2 represents
        # one doubling operation in forward direction
        while max_value > 1:
            max_value //= 2
            doubles += 1

        # Return total operations
        return increments + doubles
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages.

First, create three variables.

- One for counting increment operations.
- One for storing the maximum value.
- One for counting doubling operations.

Next, loop through every element.

For each number:

- Count how many set bits it contains.
- Add that count to the increment counter.
- Update the maximum value if necessary.

After the loop finishes, focus only on the largest number.

Keep dividing it by `2` until it becomes `1`.

Each division represents one doubling operation that would have happened while constructing the array.

Finally, return the sum of both counters.

The only difference between languages is the syntax used for counting set bits.

- C++ uses a built-in bit counting function.
- Java uses `Integer.bitCount()`.
- JavaScript counts bits manually.
- Python counts the number of `'1'` characters in the binary representation.

The algorithm itself stays identical across all implementations.

---

## Examples

### Example 1

**Input**

```
arr = [16, 16, 16]
```

**Output**

```
7
```

**Explanation**

- Increment each element once.
- Perform four doubling operations.

```
[0,0,0]
→ [1,1,1]
→ [2,2,2]
→ [4,4,4]
→ [8,8,8]
→ [16,16,16]
```

Total operations = 3 increments + 4 doublings = 7.

---

### Example 2

**Input**

```
arr = [2,3]
```

**Output**

```
4
```

**Explanation**

```
[0,0]
→ [1,1]
→ [2,2]
→ [2,3]
```

Two increments, one doubling, and one final increment.

Total operations = 4.

---

### Example 3

**Input**

```
arr = [0,0,0]
```

**Output**

```
0
```

**Explanation**

The array already matches the target.

No operations are required.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project folder.

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

---

## Notes & Optimizations

- Building the array directly is much harder than thinking in reverse.
- Every set bit contributes exactly one increment operation.
- The largest element determines the total number of doubling operations.
- No simulation of the actual operations is necessary.
- The solution uses constant extra memory.
- This approach easily handles the maximum constraints.
- The algorithm combines greedy thinking with binary representation to achieve an optimal solution.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
