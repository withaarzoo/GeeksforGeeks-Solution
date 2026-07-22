# Minimum Deletions to Make Sorted | Longest Increasing Subsequence (LIS) Solution

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

The goal is to find the minimum number of elements that need to be removed from an array so that the remaining elements form a **strictly increasing sequence** while keeping their original order.

Instead of directly deciding which elements to delete, I focused on finding the **Longest Increasing Subsequence (LIS)**. Every element that is not part of the LIS must be removed.

So the final answer becomes:

```
Minimum Deletions = Total Elements - Length of Longest Increasing Subsequence
```

This problem is a classic **Dynamic Programming** and **Longest Increasing Subsequence (LIS)** problem. The optimized solution uses **Binary Search** to achieve an `O(n log n)` time complexity.

---

## Constraints

| Constraint | Value |
|------------|-------|
| Number of elements (n) | `1 ≤ n ≤ 10^5` |
| Array element | `1 ≤ arr[i] ≤ 10^5` |

---

## Intuition

The first thing I noticed was that deleting elements is actually the opposite of keeping the correct ones.

Instead of asking, "Which elements should I remove?", I asked, "What is the largest increasing sequence I can keep?"

That immediately points to the **Longest Increasing Subsequence (LIS)**.

Once I know the length of the LIS, every remaining element has to be deleted.

Since the expected complexity is `O(n log n)`, the patience sorting technique combined with binary search is the perfect choice.

---

## Approach

I solve the problem in the following steps:

1. Create an empty array that helps maintain the smallest possible ending values of increasing subsequences.
2. Traverse the original array one element at a time.
3. If the current value is greater than the last value of the helper array, append it.
4. Otherwise, use binary search to find the first element greater than or equal to the current value.
5. Replace that value with the current element.
6. Continue until every element has been processed.
7. The size of the helper array gives the length of the Longest Increasing Subsequence.
8. Return:

```
n - LIS Length
```

This method never explicitly stores the actual subsequence. It only stores enough information to calculate its maximum possible length efficiently.

---

## Data Structures Used

### Dynamic Array (Vector / ArrayList / List / Array)

A dynamic array stores the smallest possible ending value for increasing subsequences of different lengths.

Why I use it:

- Fast insertion at the end
- Easy replacement during binary search
- Supports an efficient `O(log n)` search

---

## Operations & Behavior Summary

The algorithm performs these operations:

1. Start with an empty helper array.
2. Read every number from left to right.
3. Check whether the number can extend the current increasing sequence.
4. If yes, append it.
5. Otherwise, replace the first value that is greater than or equal to it.
6. Keep repeating this process until every element is processed.
7. Count how many elements belong to the LIS.
8. Remove every other element.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | `O(n log n)` | Every element is processed once, and binary search takes `O(log n)` time. |
| Space Complexity | `O(n)` | The helper array can store at most `n` elements. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minDeletions(vector<int>& arr) {
        // This array stores the smallest possible ending value
        // for increasing subsequences of different lengths.
        vector<int> lis;

        // Process every element in the array.
        for (int num : arr) {

            // If the current number is greater than the last value,
            // it can extend the current longest increasing subsequence.
            if (lis.empty() || num > lis.back()) {
                lis.push_back(num);
            } else {

                // Find the first element that is greater than or equal
                // to the current number.
                auto it = lower_bound(lis.begin(), lis.end(), num);

                // Replace it with the current number.
                // This keeps the ending value as small as possible.
                *it = num;
            }
        }

        // Elements not belonging to LIS must be deleted.
        return arr.size() - lis.size();
    }
};
```

### Java

```java
class Solution {
    public int minDeletions(int[] arr) {

        // Stores the smallest possible ending values
        // of increasing subsequences.
        ArrayList<Integer> lis = new ArrayList<>();

        // Process every element.
        for (int num : arr) {

            // If the current number extends the sequence,
            // simply append it.
            if (lis.isEmpty() || num > lis.get(lis.size() - 1)) {
                lis.add(num);
            } else {

                // Binary search to find the first element
                // greater than or equal to the current number.
                int left = 0;
                int right = lis.size() - 1;

                while (left <= right) {
                    int mid = left + (right - left) / 2;

                    if (lis.get(mid) >= num)
                        right = mid - 1;
                    else
                        left = mid + 1;
                }

                // Replace that element.
                lis.set(left, num);
            }
        }

        // Remaining elements are the deletions.
        return arr.length - lis.size();
    }
}
```

### JavaScript

```javascript
class Solution {
    minDeletions(arr) {

        // Stores the smallest possible ending values
        // of increasing subsequences.
        let lis = [];

        // Process every number.
        for (let num of arr) {

            // Extend the subsequence if possible.
            if (lis.length === 0 || num > lis[lis.length - 1]) {
                lis.push(num);
            } else {

                // Binary search for the first value
                // greater than or equal to num.
                let left = 0;
                let right = lis.length - 1;

                while (left <= right) {
                    let mid = Math.floor((left + right) / 2);

                    if (lis[mid] >= num)
                        right = mid - 1;
                    else
                        left = mid + 1;
                }

                // Replace the value to keep future options better.
                lis[left] = num;
            }
        }

        // Total deletions.
        return arr.length - lis.length;
    }
}
```

### Python3

```python
from bisect import bisect_left

class Solution:
    def minDeletions(self, arr):

        # Stores the smallest possible ending values
        # of increasing subsequences.
        lis = []

        # Process every element.
        for num in arr:

            # If the number extends the sequence,
            # append it.
            if not lis or num > lis[-1]:
                lis.append(num)
            else:
                # Find the first value greater than
                # or equal to the current number.
                idx = bisect_left(lis, num)

                # Replace it with the current number.
                lis[idx] = num

        # Elements outside LIS must be deleted.
        return len(arr) - len(lis)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall algorithm is exactly the same in every language. Only the syntax changes.

### Step 1

Create an empty helper array.

This array does **not** store the actual Longest Increasing Subsequence.

Instead, it stores the smallest possible ending value for increasing subsequences of different lengths.

This makes future extensions easier.

---

### Step 2

Traverse every element of the original array.

Each element is processed exactly one time.

No element is skipped.

---

### Step 3

Compare the current value with the last element of the helper array.

If it is larger, simply append it.

This increases the current LIS length.

---

### Step 4

If the value cannot extend the sequence, perform a binary search.

The binary search finds the first value that is greater than or equal to the current number.

That value is replaced.

The overall sequence length stays the same.

Only the ending value becomes smaller.

---

### Step 5

Continue this process until every element has been processed.

The helper array always remains sorted, making binary search possible throughout the algorithm.

---

### Step 6

Once the traversal is complete, the size of the helper array equals the length of the Longest Increasing Subsequence.

The required answer becomes:

```
Total Elements - LIS Length
```

---

### Language Notes

**C++**

Uses `vector` together with `lower_bound()` from the STL, making binary search straightforward and efficient.

**Java**

Uses `ArrayList` and performs binary search manually because Java's standard binary search is less convenient for this particular implementation.

**JavaScript**

Maintains a normal array and implements binary search using two pointers.

**Python3**

Uses the built-in `bisect_left()` function from the `bisect` module, which performs binary search efficiently.

---

## Examples

### Example 1

**Input**

```
arr = [5, 6, 1, 7, 4]
```

**Output**

```
2
```

**Trace**

```
Longest Increasing Subsequence

[5, 6, 7]

Length = 3

Total Elements = 5

Answer = 5 - 3 = 2
```

---

### Example 2

**Input**

```
arr = [1, 1, 1]
```

**Output**

```
2
```

**Trace**

```
Only one element can remain.

LIS Length = 1

Answer = 3 - 1 = 2
```

---

### Example 3

**Input**

```
arr = [1, 2, 3, 4]
```

**Output**

```
0
```

**Trace**

```
The array is already strictly increasing.

LIS Length = 4

Answer = 4 - 4 = 0
```

---

## How to Use / Run Locally

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project directory:

```bash
cd your-repository
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

- The optimized LIS algorithm runs in `O(n log n)` time.
- A classic Dynamic Programming solution also exists but takes `O(n²)` time.
- The helper array does not represent the actual Longest Increasing Subsequence.
- It only stores the smallest possible ending values needed to compute the LIS length efficiently.
- This approach easily handles the maximum constraints.
- Duplicate values are handled correctly because the sequence must remain **strictly increasing**.
- Binary search is the key optimization that reduces the running time from quadratic to logarithmic per element.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
