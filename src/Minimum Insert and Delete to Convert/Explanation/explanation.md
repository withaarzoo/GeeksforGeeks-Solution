# Minimum Insert and Delete to Convert | GFG Solution (LIS + Binary Search)

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

The goal is to make two arrays exactly the same using only two operations:

- Insert an element into array `a`
- Delete an element from array `a`

Array `b` is already sorted and contains only distinct elements, while array `a` may be unsorted and can contain duplicate values.

The task is to find the minimum number of insertions and deletions required to transform `a` into `b`.

A direct Dynamic Programming solution for the Longest Common Subsequence (LCS) is too slow for the given constraints. The optimized solution converts the problem into a Longest Increasing Subsequence (LIS) problem using index mapping, making it efficient enough for large inputs.

This problem is a great example of combining HashMap, Binary Search, and Longest Increasing Subsequence (LIS) to optimize an LCS-based problem.

---

## Constraints

| Constraint | Value |
|------------|-------|
| `1 ≤ n, m ≤ 10^5` | Size of the arrays |
| `1 ≤ a[i], b[i] ≤ 10^5` | Element values |
| `b` is sorted | Yes |
| All elements in `b` are distinct | Yes |

---

## Intuition

My first thought was to keep as many common elements as possible because every element that stays in place saves one operation.

Normally, this sounds like a Longest Common Subsequence (LCS) problem.

However, the input size is large, and the classic `O(n × m)` DP solution cannot pass.

Then I noticed something important: every element in `b` is unique.

That means I can replace every common value with its position in `b`. Once I do that, preserving the same order simply becomes finding the Longest Increasing Subsequence (LIS).

This reduces the overall complexity from quadratic time to `O(n log n)`.

---

## Approach

First, store the position of every element from array `b` inside a hash map.

Next, scan array `a`.

Whenever an element exists in `b`, replace it with its corresponding index from the hash map and store that index in a new array.

Now the original problem becomes much simpler.

Instead of comparing values, we only need to find the Longest Increasing Subsequence of these mapped indices.

The LIS represents the maximum number of elements that can remain unchanged.

Finally:

- Delete every element from `a` that is not part of the LIS.
- Insert every missing element from `b`.

The answer becomes:

```
(n - LIS) + (m - LIS)
```

---

## Data Structures Used

### Hash Map

Stores the index of every element in array `b`.

This allows constant-time lookup while scanning array `a`.

### Dynamic Array (Vector / ArrayList / List)

Stores the mapped indices of elements that appear in both arrays.

### LIS Array

Maintains the smallest possible ending value for increasing subsequences of different lengths.

It enables the Binary Search based LIS algorithm to run in `O(n log n)` time.

---

## Operations & Behavior Summary

1. Read both arrays.
2. Store every value of `b` along with its index.
3. Scan array `a`.
4. Ignore values that do not exist in `b`.
5. Replace matching values with their indices.
6. Build the Longest Increasing Subsequence using Binary Search.
7. Compute the number of deletions.
8. Compute the number of insertions.
9. Return the total operations required.

---

## Complexity

| Operation | Complexity | Explanation |
|-----------|------------|-------------|
| Building Hash Map | `O(m)` | Stores the position of every element in `b` |
| Mapping Array | `O(n)` | Processes every element in `a` once |
| Longest Increasing Subsequence | `O(n log n)` | Binary Search is used for each mapped element |
| Overall Time Complexity | `O(n log n)` | Efficient for the given constraints |
| Space Complexity | `O(n + m)` | Extra space for the hash map, mapped array, and LIS array |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minInsAndDel(vector<int> &a, vector<int> &b) {
        // Store the index of every value present in b
        unordered_map<int, int> pos;
        for (int i = 0; i < b.size(); i++) {
            pos[b[i]] = i;
        }

        // Store indices of elements from a that also exist in b
        vector<int> mapped;
        for (int x : a) {
            if (pos.count(x)) {
                mapped.push_back(pos[x]);
            }
        }

        // Compute LIS on the mapped indices
        vector<int> lis;
        for (int idx : mapped) {
            // Find the first position where idx can be placed
            auto it = lower_bound(lis.begin(), lis.end(), idx);

            if (it == lis.end()) {
                // Extend the LIS if idx is the largest so far
                lis.push_back(idx);
            } else {
                // Replace to keep future possibilities better
                *it = idx;
            }
        }

        // Elements not in LIS must be deleted or inserted
        return (a.size() - lis.size()) + (b.size() - lis.size());
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int minInsAndDel(int[] a, int[] b) {

        // Store the index of every value in b
        HashMap<Integer, Integer> pos = new HashMap<>();
        for (int i = 0; i < b.length; i++) {
            pos.put(b[i], i);
        }

        // Store mapped indices of common elements
        ArrayList<Integer> mapped = new ArrayList<>();
        for (int x : a) {
            if (pos.containsKey(x)) {
                mapped.add(pos.get(x));
            }
        }

        // List used for LIS
        ArrayList<Integer> lis = new ArrayList<>();

        for (int idx : mapped) {

            // Binary search for the insertion position
            int left = 0;
            int right = lis.size();

            while (left < right) {
                int mid = left + (right - left) / 2;

                if (lis.get(mid) < idx) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            if (left == lis.size()) {
                // Extend the LIS
                lis.add(idx);
            } else {
                // Replace to maintain the smallest possible tail
                lis.set(left, idx);
            }
        }

        // Remaining elements need insertion or deletion
        return (a.length - lis.size()) + (b.length - lis.size());
    }
}
```

### JavaScript

```javascript
class Solution {
    minInsAndDel(a, b) {

        // Store the index of every value in b
        const pos = new Map();
        for (let i = 0; i < b.length; i++) {
            pos.set(b[i], i);
        }

        // Store mapped indices of common elements
        const mapped = [];
        for (const x of a) {
            if (pos.has(x)) {
                mapped.push(pos.get(x));
            }
        }

        // Array used for LIS
        const lis = [];

        for (const idx of mapped) {

            // Binary search for the correct position
            let left = 0;
            let right = lis.length;

            while (left < right) {
                const mid = Math.floor((left + right) / 2);

                if (lis[mid] < idx) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            if (left === lis.length) {
                // Extend the LIS
                lis.push(idx);
            } else {
                // Replace to keep the tail minimum
                lis[left] = idx;
            }
        }

        // Calculate total operations
        return (a.length - lis.length) + (b.length - lis.length);
    }
}
```

### Python3

```python
from bisect import bisect_left

class Solution:
    def minInsAndDel(self, a, b):
        # Store the index of every value in b
        pos = {}
        for i, val in enumerate(b):
            pos[val] = i

        # Store mapped indices of common elements
        mapped = []
        for val in a:
            if val in pos:
                mapped.append(pos[val])

        # List used for LIS
        lis = []

        for idx in mapped:
            # Find the correct position using binary search
            p = bisect_left(lis, idx)

            if p == len(lis):
                # Extend the LIS
                lis.append(idx)
            else:
                # Replace to keep the smallest possible tail
                lis[p] = idx

        # Remaining elements need insertion or deletion
        return (len(a) - len(lis)) + (len(b) - len(lis))
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in every language.

The only difference is the syntax and the built-in data structures used.

The algorithm starts by storing every value from array `b` together with its position.

Since every element in `b` is unique, each value maps to exactly one index.

Next, the algorithm scans array `a`.

If a value does not exist in `b`, it can never become part of the final array without deleting it, so it is ignored.

If the value exists, its position inside `b` is stored instead of the original value.

This creates a new sequence containing only valid indices.

The next step is finding the Longest Increasing Subsequence.

Instead of checking every possible subsequence, the algorithm maintains an array that stores the smallest possible ending value for increasing subsequences of different lengths.

For every mapped index, Binary Search finds the first position where the current value can be placed.

If the value is larger than every existing element, the subsequence grows.

Otherwise, an existing value is replaced.

Although this replacement may seem unusual, it keeps the ending values as small as possible, increasing the chances of extending the subsequence later.

After processing every mapped index, the length of the LIS tells us how many elements can remain unchanged.

Every remaining element in array `a` must be deleted.

Every missing element from array `b` must be inserted.

Adding these two values gives the minimum number of operations.

---

## Examples

### Example 1

**Input**

```
a = [1, 2, 5, 3, 1]
b = [1, 3, 5]
```

**Output**

```
4
```

**Trace**

- Map indices of `b`
- Convert `a` into index sequence
- Sequence becomes `[0, 2, 1, 0]`
- LIS length = 2
- Deletions = 5 − 2 = 3
- Insertions = 3 − 2 = 1
- Total = 4

---

### Example 2

**Input**

```
a = [1, 4]
b = [1, 4]
```

**Output**

```
0
```

**Trace**

Both arrays are already identical.

No insertion or deletion is required.

---

### Example 3

**Input**

```
a = [5, 4, 3]
b = [3, 4, 5]
```

**Output**

```
4
```

**Trace**

Mapped sequence becomes:

```
[2, 1, 0]
```

LIS length is only 1.

Delete two elements.

Insert two elements.

Total operations = 4.

---

## How to Use / Run Locally

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

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- A standard Longest Common Subsequence solution requires `O(n × m)` time and is not suitable for large constraints.
- The uniqueness of elements in array `b` allows the problem to be transformed into a Longest Increasing Subsequence problem.
- Binary Search reduces the LIS computation from `O(n²)` to `O(n log n)`.
- Hash Map lookups ensure constant-time index retrieval.
- This is the optimal solution for the given constraints.
- The same idea is commonly used in competitive programming to optimize LCS problems when one sequence contains unique elements.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
