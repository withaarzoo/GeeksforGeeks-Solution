# Union of Arrays with Duplicates

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

We are given two arrays `a[]` and `b[]`.
Our task is to return the **Union** of both arrays.

Union means:

* Include all distinct elements present in either array.
* If an element appears multiple times, include it only once.
* Order does not matter (driver code prints in sorted order).

---

## Constraints

* 1 ≤ size of a, b ≤ 10^6
* 0 ≤ elements ≤ 10^5

This tells me that the solution must be efficient. I cannot use slow nested loops.

---

## Intuition

When I read the problem, the word **distinct elements** caught my attention.

I immediately thought about removing duplicates automatically.

Then I asked myself:
How can I store elements such that duplicates are not allowed?

The answer is simple — **Set**.

A set automatically stores only unique elements.
So I thought:

* Insert all elements from array `a` into a set.
* Insert all elements from array `b` into the same set.
* Convert the set to a list and return it.

Simple and efficient.

---

## Approach

Step 1: Create a Set.

Step 2: Traverse array `a` and insert every element into the set.

Step 3: Traverse array `b` and insert every element into the same set.

Step 4: Since set stores only distinct values, duplicates are automatically removed.

Step 5: Convert the set into a list/vector/ArrayList and return it.

No sorting required. No nested loops required.

---

## Data Structures Used

* Hash Set / Unordered Set

Why?

* O(1) average insertion
* Automatically removes duplicates
* Efficient for large inputs

---

## Operations & Behavior Summary

* Insert elements from array a → duplicates ignored automatically.
* Insert elements from array b → duplicates ignored automatically.
* Convert set to result list.

Final result contains only unique elements.

---

## Complexity

Let:

* n = size of array a
* m = size of array b

### Time Complexity: O(n + m)

We traverse both arrays once.
Each insertion in a hash set takes O(1) on average.

Total = O(n + m)

### Space Complexity: O(n + m)

In worst case, all elements are unique.
So the set may store up to n + m elements.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> findUnion(vector<int>& a, vector<int>& b) {
        unordered_set<int> st;
        
        for(int i = 0; i < a.size(); i++) {
            st.insert(a[i]);
        }
        
        for(int i = 0; i < b.size(); i++) {
            st.insert(b[i]);
        }
        
        vector<int> result(st.begin(), st.end());
        return result;
    }
};
```

---

### Java

```java
class Solution {
    public static ArrayList<Integer> findUnion(int[] a, int[] b) {
        HashSet<Integer> set = new HashSet<>();
        
        for(int num : a) {
            set.add(num);
        }
        
        for(int num : b) {
            set.add(num);
        }
        
        return new ArrayList<>(set);
    }
}
```

---

### JavaScript

```javascript
class Solution {
    findUnion(a, b) {
        const set = new Set();
        
        for (let num of a) {
            set.add(num);
        }
        
        for (let num of b) {
            set.add(num);
        }
        
        return Array.from(set);
    }
}
```

---

### Python3

```python
class Solution:    
    def findUnion(self, a, b):
        s = set()
        
        for num in a:
            s.add(num)
        
        for num in b:
            s.add(num)
        
        return list(s)
```

---

## Step-by-step Detailed Explanation

### Step 1: Create a Set

This set will store unique elements.

Example in C++:

```cpp
unordered_set<int> st;
```

This ensures duplicates are not stored.

---

### Step 2: Insert Elements of First Array

```cpp
for(int i = 0; i < a.size(); i++) {
    st.insert(a[i]);
}
```

Each element is inserted into the set.
If it already exists, it is ignored.

---

### Step 3: Insert Elements of Second Array

```cpp
for(int i = 0; i < b.size(); i++) {
    st.insert(b[i]);
}
```

Same process again.
Duplicates are automatically handled.

---

### Step 4: Convert Set to Result

```cpp
vector<int> result(st.begin(), st.end());
```

We convert the set into a vector (or list in other languages).

Return it.

---

## Examples

### Example 1

Input:
a = [1, 2, 3, 2, 1]
b = [3, 2, 2, 3, 3, 2]

Output:
[1, 2, 3]

---

### Example 2

Input:
a = [1, 2, 3]
b = [4, 5, 6]

Output:
[1, 2, 3, 4, 5, 6]

---

## How to use / Run locally

### C++

Compile using:

g++ filename.cpp -o output
./output

### Java

Compile using:

javac Solution.java
java Solution

### JavaScript

Run using Node.js:

node filename.js

### Python

Run using:

python filename.py

---

## Notes & Optimizations

* Using HashSet ensures average O(1) insertion.
* No need to sort manually.
* No need to use nested loops.
* Works efficiently for large inputs up to 10^6 size.

If sorted order is strictly required, we can sort the result before returning.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
