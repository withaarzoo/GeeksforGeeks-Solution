# Search Insert Position of K in a Sorted Array

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

---

## Problem Summary

I am given a **sorted array of distinct integers** and an integer `k`.

My task is simple:

* If `k` exists in the array, return its **index**
* If `k` does not exist, return the **index where it should be inserted** so the array remains sorted

The array uses **0-based indexing**.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^4`
* `-10^3 ≤ arr[i] ≤ 10^3`
* `-10^3 ≤ k ≤ 10^3`
* The array is **sorted in increasing order**
* All elements are **distinct**

---

## Intuition

When I saw that the array is already sorted, I immediately thought about **Binary Search**.

Instead of checking every element one by one, Binary Search helps me:

* reduce time
* work efficiently
* directly find the correct position of `k`

Even if `k` is not present, Binary Search naturally tells me **where it should be inserted**.

---

## Approach

1. I start with two pointers: `low` and `high`
2. I calculate the middle index `mid`
3. If `arr[mid] == k`, I return `mid`
4. If `arr[mid] < k`, I search in the right half
5. If `arr[mid] > k`, I search in the left half
6. If `k` is not found, `low` becomes the correct insert position

This guarantees the array stays sorted.

---

## Data Structures Used

* Array (given input)
* Integer variables (`low`, `high`, `mid`)

No extra data structures are used.

---

## Operations & Behavior Summary

* Uses **Binary Search**
* Works for both:

  * element present
  * element absent
* Maintains sorted order
* No modification of the array
* Efficient for large input sizes

---

## Complexity

* **Time Complexity:** `O(log n)`
  `n` is the number of elements in the array.
  Binary Search divides the search space by half every step.

* **Space Complexity:** `O(1)`
  Only constant extra variables are used.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int searchInsertK(vector<int> &arr, int k) {
        int low = 0, high = arr.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == k)
                return mid;
            else if (arr[mid] < k)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return low;
    }
};
```

---

### Java

```java
class Solution {
    public int searchInsertK(int arr[], int k) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == k)
                return mid;
            else if (arr[mid] < k)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return low;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    searchInsertK(arr, k) {
        let low = 0, high = arr.length - 1;

        while (low <= high) {
            let mid = Math.floor(low + (high - low) / 2);

            if (arr[mid] === k)
                return mid;
            else if (arr[mid] < k)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return low;
    }
}
```

---

### Python3

```python
class Solution:
    def searchInsertK(self, arr, k):
        low, high = 0, len(arr) - 1

        while low <= high:
            mid = low + (high - low) // 2

            if arr[mid] == k:
                return mid
            elif arr[mid] < k:
                low = mid + 1
            else:
                high = mid - 1

        return low
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize `low` and `high`
2. Run loop while `low <= high`
3. Calculate middle index
4. Compare middle element with `k`
5. Adjust search boundaries accordingly
6. If loop ends, return `low` as insert position

This logic is identical across all languages.

---

## Examples

### Example 1

Input:

```
arr = [1, 3, 5, 6], k = 5
```

Output:

```
2
```

### Example 2

Input:

```
arr = [1, 3, 5, 6], k = 2
```

Output:

```
1
```

### Example 3

Input:

```
arr = [2, 6, 7, 10, 14], k = 15
```

Output:

```
5
```

---

## How to use / Run locally

1. Clone the repository
2. Open the file in your preferred language
3. Compile and run:

   * C++: `g++ file.cpp && ./a.out`
   * Java: `javac Solution.java && java Solution`
   * JS: `node file.js`
   * Python: `python3 file.py`
4. Provide input as per the function signature

---

## Notes & Optimizations

* Binary Search is mandatory for optimal performance
* Linear search will fail time constraints
* This approach is interview-safe and production-ready
* Works perfectly for large arrays

---

## Author

* **[Md Aarzoo Islam](https://bento.me/withaarzoo)**
