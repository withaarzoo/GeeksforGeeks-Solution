# Intersection of Two Sorted Arrays

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given two sorted arrays `a[]` and `b[]`, return all distinct common elements present in both arrays in sorted order.

The result should contain only unique common values.

### Example

```text
Input:
a[] = [1, 1, 2, 2, 2, 4]
b[] = [2, 2, 4, 4]

Output:
[2, 4]
```

---

## Constraints

```text
1 <= a.size(), b.size() <= 10^5
-10^9 <= a[i], b[i] <= 10^9
```

---

## Intuition

I thought about using the fact that both arrays are already sorted.

Because the arrays are sorted, I do not need to compare every element with every other element.

I can use two pointers:

* One pointer for array `a`
* One pointer for array `b`

If both values are equal, then I found a common element.

Since the problem asks for distinct elements only, after adding one common element, I skip all duplicate occurrences of that value in both arrays.

---

## Approach

1. Start two pointers:

   * `i = 0` for array `a`
   * `j = 0` for array `b`

2. Compare `a[i]` and `b[j]`

   * If `a[i] < b[j]`, move pointer `i`
   * If `a[i] > b[j]`, move pointer `j`
   * If both are equal:

     * Add the value to answer
     * Skip all duplicate occurrences of that value in both arrays

3. Continue until one array ends.

This way, I process both arrays only once.

---

## Data Structures Used

* Two integer pointers (`i` and `j`)
* One result array / list to store distinct common elements

No extra hash map or set is needed.

---

## Operations & Behavior Summary

| Condition      | Action                                    |
| -------------- | ----------------------------------------- |
| `a[i] < b[j]`  | Move `i` forward                          |
| `a[i] > b[j]`  | Move `j` forward                          |
| `a[i] == b[j]` | Add element to result and skip duplicates |

---

## Complexity

* **Time Complexity:** `O(n + m)`

  * `n` = size of array `a`
  * `m` = size of array `b`
  * Each element is visited at most once

* **Space Complexity:** `O(1)` auxiliary space

  * Only a few variables are used
  * Output array is not counted in auxiliary space

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> intersection(vector<int>& a, vector<int>& b) {
        vector<int> ans;
        
        int i = 0, j = 0;
        int n = a.size(), m = b.size();
        
        while (i < n && j < m) {
            if (a[i] < b[j]) {
                i++;
            }
            else if (a[i] > b[j]) {
                j++;
            }
            else {
                ans.push_back(a[i]);
                
                int current = a[i];
                
                while (i < n && a[i] == current) {
                    i++;
                }
                
                while (j < m && b[j] == current) {
                    j++;
                }
            }
        }
        
        return ans;
    }
};
```

### Java

```java
class Solution {
    ArrayList<Integer> intersection(int[] a, int[] b) {
        ArrayList<Integer> ans = new ArrayList<>();
        
        int i = 0, j = 0;
        int n = a.length, m = b.length;
        
        while (i < n && j < m) {
            if (a[i] < b[j]) {
                i++;
            }
            else if (a[i] > b[j]) {
                j++;
            }
            else {
                ans.add(a[i]);
                
                int current = a[i];
                
                while (i < n && a[i] == current) {
                    i++;
                }
                
                while (j < m && b[j] == current) {
                    j++;
                }
            }
        }
        
        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    intersection(a, b) {
        let ans = [];
        
        let i = 0, j = 0;
        let n = a.length, m = b.length;
        
        while (i < n && j < m) {
            if (a[i] < b[j]) {
                i++;
            }
            else if (a[i] > b[j]) {
                j++;
            }
            else {
                ans.push(a[i]);
                
                let current = a[i];
                
                while (i < n && a[i] === current) {
                    i++;
                }
                
                while (j < m && b[j] === current) {
                    j++;
                }
            }
        }
        
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def intersection(self, a, b):
        ans = []
        
        i, j = 0, 0
        n, m = len(a), len(b)
        
        while i < n and j < m:
            if a[i] < b[j]:
                i += 1
            elif a[i] > b[j]:
                j += 1
            else:
                ans.append(a[i])
                
                current = a[i]
                
                while i < n and a[i] == current:
                    i += 1
                
                while j < m and b[j] == current:
                    j += 1
        
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Create an answer list

```cpp
vector<int> ans;
```

This list stores all distinct common elements.

---

### Step 2: Initialize two pointers

```cpp
int i = 0, j = 0;
```

* `i` points to array `a`
* `j` points to array `b`

---

### Step 3: Run loop while both arrays have elements left

```cpp
while (i < n && j < m)
```

As long as both pointers are inside their arrays, continue comparing values.

---

### Step 4: If `a[i]` is smaller

```cpp
if (a[i] < b[j]) {
    i++;
}
```

The current value in array `a` cannot be part of the intersection because it is smaller.

So I move `i` forward.

---

### Step 5: If `b[j]` is smaller

```cpp
else if (a[i] > b[j]) {
    j++;
}
```

The current value in array `b` cannot be part of the intersection.

So I move `j` forward.

---

### Step 6: If both values are equal

```cpp
else {
    ans.push_back(a[i]);
}
```

This means the current value exists in both arrays.

So I add it to the answer.

---

### Step 7: Skip duplicate values

```cpp
int current = a[i];

while (i < n && a[i] == current) {
    i++;
}

while (j < m && b[j] == current) {
    j++;
}
```

Since the answer should contain only distinct common elements, I skip all duplicate occurrences in both arrays.

---

## Examples

### Example 1

```text
Input:
a[] = [1, 1, 2, 2, 2, 4]
b[] = [2, 2, 4, 4]

Output:
[2, 4]
```

### Example 2

```text
Input:
a[] = [1, 2]
b[] = [3, 4]

Output:
[]
```

### Example 3

```text
Input:
a[] = [1, 2, 3]
b[] = [1, 2, 3]

Output:
[1, 2, 3]
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* Since arrays are already sorted, two pointers are the best choice.
* No need to use extra sets or hash maps.
* Duplicate values are skipped immediately.
* The algorithm is optimal because every element is visited at most once.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
