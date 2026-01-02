# Sort 0s, 1s and 2s

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
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an array that contains only three values: **0, 1, and 2**.
My task is to sort the array in **ascending order**.

Important rules:

* I cannot use any built-in sorting function.
* I must solve it efficiently.
* The solution should ideally work in **one pass** using **constant extra space**.

---

## Constraints

* 1 ≤ array size ≤ 10⁶
* Each element of the array is either 0, 1, or 2

---

## Intuition

When I saw that the array contains only **three unique values**, I immediately realized that normal sorting is unnecessary.

I thought:

* Why compare elements again and again?
* Why not directly place 0s, 1s, and 2s in their correct regions?

This reminded me of the **Dutch National Flag Algorithm**, which is perfect for problems with three distinct values.

My goal was simple:

* One loop
* No extra array
* In-place sorting

---

## Approach

I used **three pointers**:

* `low` → marks the position for the next 0
* `mid` → scans the array
* `high` → marks the position for the next 2

Steps I followed:

1. Initialize `low = 0`, `mid = 0`, `high = n - 1`
2. Traverse the array while `mid <= high`
3. If the current element is:

   * **0** → swap with `low`, move `low` and `mid`
   * **1** → just move `mid`
   * **2** → swap with `high`, move `high`
4. Stop when `mid` crosses `high`

This automatically places:

* All 0s at the start
* All 1s in the middle
* All 2s at the end

---

## Data Structures Used

* Array (input array only)
* No additional data structures are used

---

## Operations & Behavior Summary

* Swapping elements in place
* Single traversal of the array
* Pointer-based element placement
* No recursion
* No auxiliary memory

---

## Complexity

* **Time Complexity:** O(n)

  * `n` is the size of the array
  * Each element is visited at most once

* **Space Complexity:** O(1)

  * No extra space is used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    void sort012(vector<int>& arr) {
        int low = 0, mid = 0;
        int high = arr.size() - 1;

        while (mid <= high) {
            if (arr[mid] == 0) {
                swap(arr[low], arr[mid]);
                low++;
                mid++;
            } 
            else if (arr[mid] == 1) {
                mid++;
            } 
            else {
                swap(arr[mid], arr[high]);
                high--;
            }
        }
    }
};
```

---

### Java

```java
class Solution {
    public void sort012(int[] arr) {
        int low = 0, mid = 0;
        int high = arr.length - 1;

        while (mid <= high) {
            if (arr[mid] == 0) {
                int temp = arr[low];
                arr[low] = arr[mid];
                arr[mid] = temp;
                low++;
                mid++;
            } 
            else if (arr[mid] == 1) {
                mid++;
            } 
            else {
                int temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
            }
        }
    }
}
```

---

### JavaScript

```javascript
class Solution {
    sort012(arr) {
        let low = 0, mid = 0;
        let high = arr.length - 1;

        while (mid <= high) {
            if (arr[mid] === 0) {
                [arr[low], arr[mid]] = [arr[mid], arr[low]];
                low++;
                mid++;
            } 
            else if (arr[mid] === 1) {
                mid++;
            } 
            else {
                [arr[mid], arr[high]] = [arr[high], arr[mid]];
                high--;
            }
        }
    }
}
```

---

### Python3

```python
class Solution:
    def sort012(self, arr):
        low = 0
        mid = 0
        high = len(arr) - 1

        while mid <= high:
            if arr[mid] == 0:
                arr[low], arr[mid] = arr[mid], arr[low]
                low += 1
                mid += 1
            elif arr[mid] == 1:
                mid += 1
            else:
                arr[mid], arr[high] = arr[high], arr[mid]
                high -= 1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

* I start with three pointers.
* `mid` checks the current element.
* If I see a 0, I push it to the left side.
* If I see a 1, I leave it in the middle.
* If I see a 2, I push it to the right side.
* I continue until all elements are checked.

The same logic is applied in all four languages.
Only syntax changes, not the algorithm.

---

## Examples

Input:

```bash
[0, 1, 2, 0, 1, 2]
```

Output:

```bash
[0, 0, 1, 1, 2, 2]
```

---

Input:

```bash
[2, 0, 1, 2, 0, 1]
```

Output:

```bash
[0, 0, 1, 1, 2, 2]
```

---

## How to Use / Run Locally

1. Clone the repository
2. Choose your preferred language file
3. Compile and run using standard commands

Example (C++):

```bash
g++ sort012.cpp
./a.out
```

Example (Python):

```bash
python sort012.py
```

---

## Notes & Optimizations

* This is the **most optimal solution** for this problem
* Works well for very large inputs
* Frequently asked in interviews
* Known as **Dutch National Flag Algorithm**
* Avoids counting or extra arrays

---

## Author

* **Md Aarzoo Islam**

  * [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
