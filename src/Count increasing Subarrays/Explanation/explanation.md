# Count Increasing Subarrays

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given an array of integers, I need to count all contiguous subarrays of size greater than or equal to 2 that are strictly increasing.

A subarray is strictly increasing if every next element is greater than the previous one.

Example:

```text
Input: [1, 4, 5, 3, 7, 9]
Output: 6
```

Increasing subarrays are:

```text
[1, 4]
[4, 5]
[1, 4, 5]
[3, 7]
[7, 9]
[3, 7, 9]
```

---

## Constraints

```text
1 <= arr.size() <= 10^5
1 <= arr[i] <= 10^7
```

---

## Intuition

At first, I thought about generating every possible subarray and checking whether it is strictly increasing or not.

But that would take too much time because there can be O(n²) subarrays.

Then I noticed that if I already have an increasing segment, every new increasing element can create new valid subarrays.

For example:

```text
[1, 4, 5]
```

When I reach `5`, I can form:

```text
[4, 5]
[1, 4, 5]
```

That means if the current increasing segment length is `len`, then I can add `len - 1` new increasing subarrays.

---

## Approach

1. Start with `answer = 0`
2. Keep track of the current increasing segment length using a variable `len`
3. Initialize `len = 1`
4. Traverse the array from left to right
5. If `arr[i] > arr[i - 1]`

   * Increase `len`
   * Add `len - 1` to answer
6. Otherwise

   * Reset `len = 1`
7. Return the final answer

---

## Data Structures Used

* Integer variable for storing answer
* Integer variable for storing current increasing segment length
* Input array

No extra data structure like stack, queue, map, or set is needed.

---

## Operations & Behavior Summary

| Condition                               | Action                      |
| --------------------------------------- | --------------------------- |
| Current element > previous element      | Continue increasing segment |
| Current element <= previous element     | Reset segment length        |
| Increasing segment length becomes `len` | Add `len - 1` to answer     |

---

## Complexity

* Time Complexity: `O(n)`

  * I traverse the array only once.

* Space Complexity: `O(1)`

  * I only use a few variables.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countIncreasing(vector<int>& arr) {
        int n = arr.size();
        int ans = 0;
        int len = 1;

        for (int i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                len++;
                ans += (len - 1);
            } else {
                len = 1;
            }
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int countIncreasing(int[] arr) {
        int n = arr.length;
        int ans = 0;
        int len = 1;

        for (int i = 1; i < n; i++) {
            if (arr[i] > arr[i - 1]) {
                len++;
                ans += (len - 1);
            } else {
                len = 1;
            }
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    countIncreasing(arr) {
        let ans = 0;
        let len = 1;

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) {
                len++;
                ans += (len - 1);
            } else {
                len = 1;
            }
        }

        return ans;
    }
}
```

### Python3

```python
class Solution:
    def countIncreasing(self, arr):
        ans = 0
        length = 1

        for i in range(1, len(arr)):
            if arr[i] > arr[i - 1]:
                length += 1
                ans += (length - 1)
            else:
                length = 1

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Suppose the input array is:

```text
[1, 4, 5, 3, 7, 9]
```

Initially:

```text
ans = 0
len = 1
```

### Step 1

Compare:

```text
4 > 1
```

So the increasing segment continues.

```text
len = 2
ans += 1
```

Now:

```text
ans = 1
```

Valid subarray:

```text
[1, 4]
```

### Step 2

Compare:

```text
5 > 4
```

Again, increasing continues.

```text
len = 3
ans += 2
```

Now:

```text
ans = 3
```

New subarrays formed:

```text
[4, 5]
[1, 4, 5]
```

### Step 3

Compare:

```text
3 <= 5
```

Increasing sequence breaks.

```text
len = 1
```

### Step 4

Compare:

```text
7 > 3
```

```text
len = 2
ans += 1
```

Now:

```text
ans = 4
```

New subarray:

```text
[3, 7]
```

### Step 5

Compare:

```text
9 > 7
```

```text
len = 3
ans += 2
```

Now:

```text
ans = 6
```

New subarrays:

```text
[7, 9]
[3, 7, 9]
```

Final answer:

```text
6
```

---

## Examples

### Example 1

```text
Input: [1, 4, 5, 3, 7, 9]
Output: 6
```

### Example 2

```text
Input: [1, 3, 3, 2, 3, 5]
Output: 4
```

### Example 3

```text
Input: [2, 2, 2, 2]
Output: 0
```

---

## How to use / Run locally

### C++

```bash
g++ main.cpp -o main
./main
```

### Java

```bash
javac Main.java
java Main
```

### JavaScript

```bash
node main.js
```

### Python3

```bash
python main.py
```

---

## Notes & Optimizations

* I do not generate all subarrays.
* I only keep track of the current increasing segment.
* This makes the solution much faster.
* The solution works efficiently even for large arrays up to `10^5`.
* Since only a few variables are used, memory usage stays constant.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
