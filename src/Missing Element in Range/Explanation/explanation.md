# Missing Element in Range

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an array `arr[]` of distinct integers and a range `[low, high]`, the task is to return all the numbers within this range that are NOT present in the array.

The result must be returned in sorted order.

---

## Constraints

* 1 ≤ arr.size(), low, high ≤ 10^5
* 1 ≤ arr[i] ≤ 10^5

---

## Intuition

When I first saw this problem, I thought in a very simple way.

I need to check every number from `low` to `high`. For each number, I just need to know whether it exists in the array or not.

If it does not exist, then it is a missing number.

So the main question becomes: how can I check quickly if a number exists in the array?

The best way is to use a HashSet (or set in Python / Set in JavaScript). It allows me to check existence in constant time.

---

## Approach

1. Create a set to store elements of the array that lie within `[low, high]`.
2. Traverse the array and insert valid elements into the set.
3. Iterate from `low` to `high`.
4. For each number in this range:

   * If it is not present in the set, add it to the result list.
5. Return the result.

This guarantees sorted order automatically because we traverse from `low` to `high`.

---

## Data Structures Used

* HashSet / unordered_set / Set

  * Used for fast lookup in O(1) average time.
* Dynamic array (vector / ArrayList / list)

  * Used to store missing numbers.

---

## Operations & Behavior Summary

* Insert elements into set → O(1) average per operation
* Check presence → O(1) average
* Traverse range → O(high - low + 1)
* No sorting required

---

## Complexity

* Time Complexity: O(n + R)

  * n = size of array
  * R = high - low + 1

* Space Complexity: O(min(n, R))

  * For storing elements inside the range

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> missinRange(vector<int>& arr, int low, int high) {
        vector<int> result;
        unordered_set<int> present;

        for (int x : arr) {
            if (x >= low && x <= high)
                present.insert(x);
        }

        for (int v = low; v <= high; ++v) {
            if (present.find(v) == present.end())
                result.push_back(v);
        }

        return result;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> missingRange(int[] arr, int low, int high) {
        ArrayList<Integer> result = new ArrayList<>();
        HashSet<Integer> present = new HashSet<>();

        for (int x : arr) {
            if (x >= low && x <= high)
                present.add(x);
        }

        for (int v = low; v <= high; ++v) {
            if (!present.contains(v))
                result.add(v);
        }

        return result;
    }
}
```

### JavaScript

```javascript
class Solution {
    missingRange(arr, low, high) {
        const result = [];
        const present = new Set();

        for (const x of arr) {
            if (x >= low && x <= high)
                present.add(x);
        }

        for (let v = low; v <= high; v++) {
            if (!present.has(v))
                result.push(v);
        }

        return result;
    }
}
```

### Python3

```python
class Solution:
    def missingRange(self, arr, low, high):
        result = []
        present = set()

        for x in arr:
            if low <= x <= high:
                present.add(x)

        for v in range(low, high + 1):
            if v not in present:
                result.append(v)

        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Create an empty result list.
2. Create a set to store elements inside the range.
3. Loop through the array.

   * If element lies inside `[low, high]`, insert into set.
4. Loop from `low` to `high`.

   * If current number is not in set, add it to result.
5. Return result.

Key Idea:
We transform the problem into fast membership checking using hashing.

---

## Examples

Example 1
Input:
arr = [10, 12, 11, 15]
low = 10
high = 15

Output:
[13, 14]

Example 2
Input:
arr = [1, 4, 11, 51, 15]
low = 50
high = 55

Output:
[50, 52, 53, 54, 55]

---

## How to use / Run locally

C++

* Compile: g++ filename.cpp
* Run: ./a.out

Java

* Compile: javac Solution.java
* Run: java Solution

Python

* Run: python3 solution.py

JavaScript

* Run: node solution.js

---

## Notes & Optimizations

* We do not sort because output is naturally sorted.
* If memory is limited and range is small, we could use a boolean array instead of HashSet.
* If array size is very large but range is small, this approach is still efficient.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
