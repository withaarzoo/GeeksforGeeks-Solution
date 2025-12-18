# Sort in Specific Order

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

Given an array of integers, I need to sort it in a **specific order**:

* All **odd numbers** should appear first, sorted in **descending order**.
* All **even numbers** should appear after that, sorted in **ascending order**.

The final result must be stored back in the same array.

---

## Constraints

* 1 ≤ size of array ≤ 10^5
* 0 ≤ array[i] ≤ 10^9

---

## Intuition

When I read the problem, I noticed that it is not asking for a full sort. Instead, it is asking for **two different sorting rules** applied to **two different groups**.

So I thought:

* First, separate odd and even numbers.
* Then, sort each group in the required order.
* Finally, combine them back.

This keeps the logic simple and easy to debug.

---

## Approach

1. Traverse the array once.
2. Store odd numbers in one list and even numbers in another list.
3. Sort odd numbers in descending order.
4. Sort even numbers in ascending order.
5. Overwrite the original array with odds first, then evens.

---

## Data Structures Used

* Dynamic arrays / lists to temporarily store:

  * Odd numbers
  * Even numbers

---

## Operations & Behavior Summary

* Single traversal to split numbers.
* Built-in sorting for both lists.
* In-place overwrite of the original array.

---

## Complexity

* **Time Complexity:** O(n log n)

  * n = number of elements in the array
  * Sorting dominates the runtime

* **Space Complexity:** O(n)

  * Extra space used for odd and even lists

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    void sortIt(vector<int>& arr) {
        vector<int> odd, even;
        for (int x : arr) {
            if (x % 2) odd.push_back(x);
            else even.push_back(x);
        }
        sort(odd.begin(), odd.end(), greater<int>());
        sort(even.begin(), even.end());
        int i = 0;
        for (int x : odd) arr[i++] = x;
        for (int x : even) arr[i++] = x;
    }
};
```

### Java

```java
import java.util.*;
class Solution {
    public void sortIt(int[] arr) {
        List<Integer> odd = new ArrayList<>();
        List<Integer> even = new ArrayList<>();
        for (int x : arr) {
            if (x % 2 != 0) odd.add(x);
            else even.add(x);
        }
        Collections.sort(odd, Collections.reverseOrder());
        Collections.sort(even);
        int i = 0;
        for (int x : odd) arr[i++] = x;
        for (int x : even) arr[i++] = x;
    }
}
```

### JavaScript

```javascript
class Solution {
    sortIt(arr) {
        let odd = [], even = [];
        for (let x of arr) {
            if (x % 2 !== 0) odd.push(x);
            else even.push(x);
        }
        odd.sort((a, b) => b - a);
        even.sort((a, b) => a - b);
        let i = 0;
        for (let x of odd) arr[i++] = x;
        for (let x of even) arr[i++] = x;
    }
}
```

### Python3

```python
class Solution:
    def sortIt(self, arr):
        odd, even = [], []
        for x in arr:
            if x % 2 == 1:
                odd.append(x)
            else:
                even.append(x)
        odd.sort(reverse=True)
        even.sort()
        i = 0
        for x in odd:
            arr[i] = x
            i += 1
        for x in even:
            arr[i] = x
            i += 1
```

---

## Step-by-step Detailed Explanation

1. I loop through the array and split numbers into odd and even lists.
2. I sort odd numbers in descending order.
3. I sort even numbers in ascending order.
4. I copy both lists back into the original array.
5. The array now follows the required format.

This logic is the same across all languages.

---

## Examples

**Input:**

```
[1, 2, 3, 5, 4, 7, 10]
```

**Output:**

```
[7, 5, 3, 1, 2, 4, 10]
```

---

## How to Use / Run Locally

1. Copy the code for your preferred language.
2. Paste it into your local compiler or IDE.
3. Call the `sortIt()` function with the input array.
4. Print the array after execution.

---

## Notes & Optimizations

* This approach is easy to understand and debug.
* A custom comparator can reduce extra space, but it makes the code less readable.
* Current solution is best for interviews and competitive programming.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
