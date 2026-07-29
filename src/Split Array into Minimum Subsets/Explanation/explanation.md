# Split Array into Minimum Subsets | GeeksforGeeks Solution

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

The **Split Array into Minimum Subsets** problem asks us to divide an array of **distinct positive integers** into the **minimum number of subsets**, where every subset contains only **consecutive numbers**.

The order of elements inside the original array does not matter. The goal is simply to group numbers so that every subset forms a continuous consecutive sequence.

### Input

- An array of distinct positive integers.

### Output

- Return the minimum number of consecutive subsets required.

This is a classic **Hashing**, **Arrays**, and **Greedy Observation** problem where recognizing the starting point of every consecutive sequence leads to an efficient solution.

---

## Constraints

| Constraint | Value |
| ------------ | ------- |
| `1 ≤ arr.size() ≤ 10^5` | Array size |
| `0 ≤ arr[i] ≤ 10^9` | Element value |
| All elements are distinct | Yes |

---

## Intuition

My first thought was to actually build every subset one by one.

After looking at a few examples, I realized I didn't really need to construct the subsets at all.

Every consecutive sequence has exactly one starting number.

A number becomes the start of a new subset only when its previous consecutive number does not exist in the array.

For example, if the array contains `100` but does not contain `99`, then `100` must start a new subset.

Instead of creating subsets, I only need to count these starting points.

That observation makes the solution much simpler and much faster.

---

## Approach

I solved the problem using a hash set.

1. Store every element inside a hash set.
2. Traverse every element in the array.
3. For each number, check whether its previous value (`x - 1`) exists.
4. If the previous value is missing, this number starts a brand-new consecutive subset.
5. Count every such starting number.
6. Return the final count.

Since hash set lookup takes constant time on average, the entire solution runs in linear time.

---

## Data Structures Used

| Data Structure | Why I Used It |
| --------------- | --------------- |
| Hash Set | Stores all numbers for fast lookup of previous consecutive values. |
| Integer Counter | Counts how many consecutive sequences start in the array. |

---

## Operations & Behavior Summary

The algorithm performs the following steps:

1. Read all numbers from the input array.
2. Insert every number into a hash set.
3. Visit every number once.
4. Check whether the previous consecutive number exists.
5. If it does not exist, increase the answer.
6. Continue until every element has been checked.
7. Return the total number of sequence starting points.

The algorithm never builds the actual subsets because doing so is unnecessary for finding the minimum count.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O(n)** | Each element is inserted once and checked once inside the hash set. |
| Space Complexity | **O(n)** | Extra space is used for storing the hash set containing all array elements. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minSubsets(vector<int>& arr) {
        // Store all numbers for O(1) average lookup
        unordered_set<int> st(arr.begin(), arr.end());

        int ans = 0;

        // Check every number
        for (int x : arr) {
            // If previous consecutive number does not exist,
            // then this number starts a new subset
            if (!st.count(x - 1))
                ans++;
        }

        // Return total number of starting points
        return ans;
    }
};
```

### Java

```java
class Solution {
    int minSubsets(int arr[]) {

        // Store all numbers for fast lookup
        HashSet<Integer> set = new HashSet<>();

        for (int x : arr) {
            set.add(x);
        }

        int ans = 0;

        // Count numbers that do not have a previous consecutive number
        for (int x : arr) {
            if (!set.contains(x - 1)) {
                ans++;
            }
        }

        // Return the minimum number of subsets
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    minSubsets(arr) {

        // Store all numbers for constant-time lookup
        const set = new Set(arr);

        let ans = 0;

        // Check whether each number is the start of a sequence
        for (const x of arr) {

            // If x-1 is missing, this starts a new subset
            if (!set.has(x - 1)) {
                ans++;
            }
        }

        // Return total subsets
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def minSubsets(self, arr):
        # Store all elements for O(1) average lookup
        st = set(arr)

        ans = 0

        # Count every number that has no previous consecutive number
        for x in arr:
            if x - 1 not in st:
                ans += 1

        # Return the answer
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The same algorithm is used in every language. Only the syntax changes.

First, all array elements are stored inside a hash set. This allows checking whether a number exists in constant time on average.

Next, every element is visited exactly once.

For each value, the algorithm asks one simple question:

"Does the previous consecutive number exist?"

If the answer is **yes**, the current number already belongs to an existing consecutive subset.

If the answer is **no**, there is no earlier number that can connect to it. This means the current number must begin a brand-new subset.

Every time a new starting point is found, the answer is increased.

Once the entire array has been processed, the counter represents the minimum number of subsets required.

Because every consecutive sequence has exactly one first element, counting these starting elements automatically gives the correct answer.

The implementation behaves identically in C++, Java, JavaScript, and Python3. Only the hash set syntax differs between languages.

---

## Examples

### Example 1

**Input**

```text
arr = [100, 56, 5, 6, 102, 58, 101, 57, 7, 103, 59]
```

**Output**

```text
3
```

**Trace**

- `5` starts a new subset.
- `56` starts another subset.
- `100` starts another subset.
- Every remaining number extends one of these sequences.

Subsets become:

```text
[5, 6, 7]
[56, 57, 58, 59]
[100, 101, 102, 103]
```

---

### Example 2

**Input**

```text
arr = [10, 100, 105]
```

**Output**

```text
3
```

**Trace**

- `10` has no previous number.
- `100` has no previous number.
- `105` has no previous number.

Each element forms its own subset.

---

### Example 3

**Input**

```text
arr = [8, 2, 3, 1, 9]
```

**Output**

```text
2
```

**Trace**

- `1` starts the sequence `1, 2, 3`
- `8` starts the sequence `8, 9`

Total subsets = 2.

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

---

## Notes & Optimizations

- The array contains distinct numbers, which makes the solution straightforward.
- Sorting the array would also work, but it would increase the time complexity to **O(n log n)**.
- Using a hash set avoids sorting and keeps the solution linear.
- The algorithm never creates the actual subsets because only the minimum count is required.
- Every consecutive sequence has exactly one starting element, which is why counting sequence starts is enough.
- This approach is commonly used in competitive programming problems involving consecutive numbers, hash sets, and greedy observations.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
