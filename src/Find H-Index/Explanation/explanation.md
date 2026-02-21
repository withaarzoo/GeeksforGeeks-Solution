# Find H-Index

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

Given an array `citations[]`, where each element represents the number of citations received by a paper, we need to calculate the researcher’s **H-Index**.

The H-Index is defined as the maximum value `H` such that the researcher has published at least `H` papers and each of those papers has at least `H` citations.

---

## Constraints

* 1 ≤ citations.size() ≤ 10^6
* 0 ≤ citations[i] ≤ 10^6

---

## Intuition

When I first looked at this problem, I thought very simply.

If I sort the citations, I can easily count how many papers have greater or equal citations.

After sorting:

If I am at index `i`, then the number of papers with citations ≥ citations[i] is:

n - i

So if:

citations[i] ≥ (n - i)

Then `(n - i)` can be a valid H-Index.

I just need to find the maximum such value.

---

## Approach

1. Sort the citations array in ascending order.

2. Let `n` be the total number of papers.

3. Traverse the array from left to right.

4. For each index `i`, calculate:

   papers = n - i

5. If `citations[i] >= papers`, then return `papers`.

6. If no such value exists, return 0.

---

## Data Structures Used

* Array (input citations array)
* No extra data structure required

---

## Operations & Behavior Summary

* Sorting arranges citations in increasing order.
* For every element, we calculate how many papers are to its right.
* We check if the citation count satisfies H-Index condition.
* The first valid match gives the maximum possible H-Index.

---

## Complexity

**Time Complexity:** O(n log n)

* Sorting takes O(n log n)
* Traversal takes O(n)

**Space Complexity:** O(1)

* No extra data structures used (in-place sorting).

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int n = citations.size();
        sort(citations.begin(), citations.end());
        
        for(int i = 0; i < n; i++) {
            int papers = n - i;
            if(citations[i] >= papers) {
                return papers;
            }
        }
        return 0;
    }
};
```

---

### Java

```java
import java.util.Arrays;

class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;
        Arrays.sort(citations);
        
        for(int i = 0; i < n; i++) {
            int papers = n - i;
            if(citations[i] >= papers) {
                return papers;
            }
        }
        return 0;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    hIndex(citations) {
        let n = citations.length;
        citations.sort((a, b) => a - b);
        
        for(let i = 0; i < n; i++) {
            let papers = n - i;
            if(citations[i] >= papers) {
                return papers;
            }
        }
        return 0;
    }
}
```

---

### Python3

```python
class Solution:
    def hIndex(self, citations):
        n = len(citations)
        citations.sort()
        
        for i in range(n):
            papers = n - i
            if citations[i] >= papers:
                return papers
        return 0
```

---

## Step-by-step Detailed Explanation

Let’s take an example:

citations = [3, 0, 5, 3, 0]

Step 1: Sort the array

[0, 0, 3, 3, 5]

n = 5

Now we check each position.

Index 0:

* citations[0] = 0
* papers = 5
* 0 < 5 → Not valid

Index 1:

* citations[1] = 0
* papers = 4
* 0 < 4 → Not valid

Index 2:

* citations[2] = 3
* papers = 3
* 3 ≥ 3 → Valid

So H-Index = 3

The same logic works in C++, Java, JavaScript, and Python.
Only syntax changes, logic remains identical.

---

## Examples

Example 1:
Input: [3, 0, 5, 3, 0]
Output: 3

Example 2:
Input: [5, 1, 2, 4, 1]
Output: 2

Example 3:
Input: [0, 0]
Output: 0

---

## How to use / Run locally

C++:

* Compile using g++
* Run the executable

Java:

* Compile using javac
* Run using java

Python:

* Run using python3 filename.py

JavaScript:

* Run using Node.js

---

## Notes & Optimizations

* Sorting approach is simple and clean.
* Works efficiently within given constraints.
* Can be further optimized to O(n) using counting technique.
* Current solution balances clarity and performance.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
