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
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an array that contains only **0s, 1s, and 2s**, the task is to sort the array in **ascending order**.

Important condition:
We are **not allowed** to use any built-in sorting function.

The solution must be:

* Fast
* Memory efficient
* Preferably done in one pass

---

## Constraints

* 1 ≤ array size ≤ 10⁶
* 0 ≤ arr[i] ≤ 2
* Only three possible values exist in the array

---

## Intuition

When I looked at the problem, the first thing I noticed was that the array contains **only three values**.

So I thought:
If I already know the values are limited to 0, 1, and 2, then using a full sorting algorithm does not make sense.

I remembered a classic idea where:

* All 0s go to the left
* All 2s go to the right
* All 1s stay in the middle

If I can do this in a **single traversal**, the problem becomes very efficient.
This idea leads directly to the **Dutch National Flag algorithm**.

---

## Approach

1. I use **three pointers**:

   * `low` for placing 0s
   * `mid` for current element
   * `high` for placing 2s

2. I start with:

   * low = 0
   * mid = 0
   * high = n - 1

3. I loop while `mid <= high`:

   * If current element is 0
     → swap with `low`, move `low` and `mid`
   * If current element is 1
     → move `mid`
   * If current element is 2
     → swap with `high`, move `high`

4. After one pass, the array is sorted automatically.

---

## Data Structures Used

* Array only
* No extra data structures are used

---

## Operations & Behavior Summary

* Single pass traversal
* In-place swapping
* No extra memory usage
* Stable logical separation of 0s, 1s, and 2s

---

## Complexity

**Time Complexity:** O(n)
The array is scanned only once.

**Space Complexity:** O(1)
Only a few variables are used. No extra space.

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
            } else if (arr[mid] === 1) {
                mid++;
            } else {
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

## Step-by-step Detailed Explanation

1. `low` tracks the position where the next 0 should go
2. `mid` checks the current element
3. `high` tracks the position where the next 2 should go

If the current element is:

* 0 → move it to the left section
* 1 → leave it in the middle
* 2 → move it to the right section

The loop continues until all elements are processed.
No element is checked more than once.

---

## Examples

Input
[0, 1, 2, 0, 1, 2]

Output
[0, 0, 1, 1, 2, 2]

---

Input
[2, 0, 2, 1, 1, 0]

Output
[0, 0, 1, 1, 2, 2]

---

## How to use / Run locally

1. Copy the code for your preferred language
2. Create a main function or driver code
3. Pass an integer array to `sort012()`
4. Print the array after execution

Works on all standard compilers and interpreters.

---

## Notes & Optimizations

* Best possible solution for this problem
* Faster than counting-based solutions
* No extra memory
* Interview favorite problem
* Works well for large inputs

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
