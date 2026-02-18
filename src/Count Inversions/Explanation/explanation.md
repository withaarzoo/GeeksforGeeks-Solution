# Count Inversions

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

Given an array of integers, I need to count the number of inversions in the array.

An inversion is a pair (i, j) such that:

* i < j
* arr[i] > arr[j]

In simple words, I count how many pairs are out of order.

---

## Constraints

* 1 ≤ N ≤ 10^5
* 1 ≤ arr[i] ≤ 10^4

Because N can be large, I cannot use a simple O(n^2) solution.

---

## Intuition

When I first thought about solving this problem, I considered using two loops.

For every element, I could check all elements after it and count how many are smaller.

But that would take O(n^2) time, which is too slow for large inputs.

Then I thought:
Can I count inversions while sorting?

That is when I remembered Merge Sort.

During merging, if an element from the right side is smaller than the left side element, it means all remaining elements in the left half are also greater.

So instead of counting one by one, I can count them in one step.

That is the key idea.

---

## Approach

1. Use Merge Sort.
2. Divide the array into two halves.
3. Recursively count inversions in left half.
4. Recursively count inversions in right half.
5. While merging:

   * If left element ≤ right element → no inversion.
   * If left element > right element → add (mid - i + 1) to count.
6. Return total inversion count.

---

## Data Structures Used

* Array (original input)
* Temporary array (used during merge process)

---

## Operations & Behavior Summary

* Divide array recursively
* Merge sorted halves
* Count cross inversions during merge
* Return final inversion count

---

## Complexity

**Time Complexity:** O(n log n)

* n = number of elements
* log n = recursive levels of merge sort

**Space Complexity:** O(n)

* Temporary array used for merging

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    long long mergeAndCount(vector<int>& arr, int left, int mid, int right) {
        vector<int> temp;
        int i = left, j = mid + 1;
        long long invCount = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp.push_back(arr[i++]);
            } else {
                temp.push_back(arr[j++]);
                invCount += (mid - i + 1);
            }
        }

        while (i <= mid) temp.push_back(arr[i++]);
        while (j <= right) temp.push_back(arr[j++]);

        for (int k = left; k <= right; k++) {
            arr[k] = temp[k - left];
        }

        return invCount;
    }

    long long mergeSort(vector<int>& arr, int left, int right) {
        long long invCount = 0;
        if (left < right) {
            int mid = left + (right - left) / 2;
            invCount += mergeSort(arr, left, mid);
            invCount += mergeSort(arr, mid + 1, right);
            invCount += mergeAndCount(arr, left, mid, right);
        }
        return invCount;
    }

    long long inversionCount(vector<int>& arr) {
        return mergeSort(arr, 0, arr.size() - 1);
    }
};
```

### Java

```java
class Solution {
    static long mergeAndCount(int arr[], int left, int mid, int right) {
        int temp[] = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        long invCount = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
                invCount += (mid - i + 1);
            }
        }

        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        for (i = left, k = 0; i <= right; i++, k++) {
            arr[i] = temp[k];
        }

        return invCount;
    }

    static long mergeSort(int arr[], int left, int right) {
        long invCount = 0;
        if (left < right) {
            int mid = left + (right - left) / 2;
            invCount += mergeSort(arr, left, mid);
            invCount += mergeSort(arr, mid + 1, right);
            invCount += mergeAndCount(arr, left, mid, right);
        }
        return invCount;
    }

    static long inversionCount(int arr[]) {
        return mergeSort(arr, 0, arr.length - 1);
    }
}
```

### JavaScript

```javascript
class Solution {
    inversionCount(arr) {
        return this.mergeSort(arr, 0, arr.length - 1);
    }

    mergeSort(arr, left, right) {
        let invCount = 0;
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
            invCount += this.mergeSort(arr, left, mid);
            invCount += this.mergeSort(arr, mid + 1, right);
            invCount += this.mergeAndCount(arr, left, mid, right);
        }
        return invCount;
    }

    mergeAndCount(arr, left, mid, right) {
        let temp = [];
        let i = left, j = mid + 1;
        let invCount = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp.push(arr[i++]);
            } else {
                temp.push(arr[j++]);
                invCount += (mid - i + 1);
            }
        }

        while (i <= mid) temp.push(arr[i++]);
        while (j <= right) temp.push(arr[j++]);

        for (let k = left; k <= right; k++) {
            arr[k] = temp[k - left];
        }

        return invCount;
    }
}
```

### Python3

```python
class Solution:
    def inversionCount(self, arr):
        return self.merge_sort(arr, 0, len(arr) - 1)

    def merge_sort(self, arr, left, right):
        inv_count = 0
        if left < right:
            mid = (left + right) // 2
            inv_count += self.merge_sort(arr, left, mid)
            inv_count += self.merge_sort(arr, mid + 1, right)
            inv_count += self.merge_and_count(arr, left, mid, right)
        return inv_count

    def merge_and_count(self, arr, left, mid, right):
        temp = []
        i, j = left, mid + 1
        inv_count = 0

        while i <= mid and j <= right:
            if arr[i] <= arr[j]:
                temp.append(arr[i])
                i += 1
            else:
                temp.append(arr[j])
                inv_count += (mid - i + 1)
                j += 1

        while i <= mid:
            temp.append(arr[i])
            i += 1

        while j <= right:
            temp.append(arr[j])
            j += 1

        for k in range(left, right + 1):
            arr[k] = temp[k - left]

        return inv_count
```

---

## Step-by-step Detailed Explanation

1. Divide the array until each part has one element.
2. Start merging two sorted halves.
3. Compare left and right element.
4. If left ≤ right → no inversion.
5. If left > right → count all remaining left elements.
6. Add that count using (mid - i + 1).
7. Continue merging until complete.
8. Final count is total inversions.

---

## Examples

Input: [2, 4, 1, 3, 5]
Output: 3
Explanation:
(2,1), (4,1), (4,3)

Input: [2, 3, 4, 5, 6]
Output: 0

---

## How to use / Run locally

C++:

* Compile using g++
* Run executable

Java:

* Compile using javac
* Run using java

Python:

* Run using python3 filename.py

JavaScript:

* Run using node filename.js

---

## Notes & Optimizations

* Do not use O(n^2) solution for large inputs.
* Always use long long for safety because inversion count can be large.
* Merge sort guarantees efficient counting.

---

## Author

* [Md Aarzoo Islam]([https://bento.me/](https://bento.me/)
