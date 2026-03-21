# Number of BST From Array

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an array of distinct integers, we need to determine for each element how many unique Binary Search Trees (BSTs) can be formed when that element is chosen as the root.

---

## Constraints

* 1 ≤ n ≤ 6
* 1 ≤ arr[i] ≤ 15
* All elements are distinct

---

## Intuition

I thought about how BSTs work. If I choose any element as root, then:

* All smaller elements go to the left subtree
* All greater elements go to the right subtree

So the structure only depends on how many elements are on the left and right, not on their actual values.

Then I remembered that the number of unique BSTs with `k` nodes is given by Catalan numbers.

So for each element:

* Left subtree size = count of smaller elements
* Right subtree size = count of greater elements

Answer = Catalan(left) × Catalan(right)

---

## Approach

1. Compute Catalan numbers up to n using Dynamic Programming
2. Sort the array to determine rank of each element
3. For each element:

   * left = rank
   * right = n - 1 - rank
   * result = catalan[left] * catalan[right]

---

## Data Structures Used

* Array (for Catalan numbers)
* HashMap / Dictionary (for rank mapping)
* Sorted array

---

## Operations & Behavior Summary

* Sorting helps determine relative ordering
* Catalan DP computes number of BSTs efficiently
* Each element is processed independently

---

## Complexity

* Time Complexity: O(n^2)

  * Catalan DP takes O(n^2)
  * Sorting takes O(n log n)

* Space Complexity: O(n)

  * Catalan array + rank map

---

## Multi-language Solutions

### C++

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> countBSTs(vector<int>& arr) {
        int n = arr.size();
        vector<int> ans(n);

        vector<int> catalan(n + 1, 0);
        catalan[0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                catalan[i] += catalan[j] * catalan[i - 1 - j];
            }
        }

        vector<int> sorted = arr;
        sort(sorted.begin(), sorted.end());

        unordered_map<int, int> rank;
        for (int i = 0; i < n; i++) {
            rank[sorted[i]] = i;
        }

        for (int i = 0; i < n; i++) {
            int left = rank[arr[i]];
            int right = n - 1 - left;
            ans[i] = catalan[left] * catalan[right];
        }

        return ans;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> countBSTs(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> ans = new ArrayList<>();

        int[] catalan = new int[n + 1];
        catalan[0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                catalan[i] += catalan[j] * catalan[i - 1 - j];
            }
        }

        int[] sorted = arr.clone();
        Arrays.sort(sorted);

        HashMap<Integer, Integer> rank = new HashMap<>();
        for (int i = 0; i < n; i++) {
            rank.put(sorted[i], i);
        }

        for (int val : arr) {
            int left = rank.get(val);
            int right = n - 1 - left;
            ans.add(catalan[left] * catalan[right]);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
  countBSTs(arr) {
    const n = arr.length;
    const ans = new Array(n).fill(0);

    const catalan = new Array(n + 1).fill(0);
    catalan[0] = 1;

    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        catalan[i] += catalan[j] * catalan[i - 1 - j];
      }
    }

    const sorted = [...arr].sort((a, b) => a - b);
    const rank = new Map();

    for (let i = 0; i < n; i++) {
      rank.set(sorted[i], i);
    }

    for (let i = 0; i < n; i++) {
      const left = rank.get(arr[i]);
      const right = n - 1 - left;
      ans[i] = catalan[left] * catalan[right];
    }

    return ans;
  }
}
```

### Python3

```python
class Solution:
    def countBSTs(self, arr):
        n = len(arr)

        catalan = [0] * (n + 1)
        catalan[0] = 1

        for i in range(1, n + 1):
            for j in range(i):
                catalan[i] += catalan[j] * catalan[i - 1 - j]

        sorted_arr = sorted(arr)
        rank = {val: i for i, val in enumerate(sorted_arr)}

        ans = []
        for val in arr:
            left = rank[val]
            right = n - 1 - left
            ans.append(catalan[left] * catalan[right])

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize Catalan array with base case catalan[0] = 1
2. Use nested loops to compute Catalan values
3. Sort the array to determine relative ordering
4. Create a rank map for quick lookup
5. For each element:

   * Find number of smaller elements (left)
   * Find number of larger elements (right)
   * Multiply Catalan(left) and Catalan(right)
6. Store result in answer array

---

## Examples

Input: [2, 1, 3]
Output: [1, 2, 2]

Input: [2, 1]
Output: [1, 1]

---

## How to use / Run locally

1. Copy the code into your preferred language file
2. Compile and run

C++:

```
g++ file.cpp -o output
./output
```

Java:

```
javac Solution.java
java Solution
```

Python:

```
python3 file.py
```

JavaScript:

```
node file.js
```

---

## Notes & Optimizations

* Catalan numbers grow fast but constraints are small
* Sorting helps avoid complex comparisons
* Approach is optimal for given constraints

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
