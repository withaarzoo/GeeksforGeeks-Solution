# Common in 3 Sorted Arrays

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

Given three sorted arrays in non-decreasing order, return all common elements present in all three arrays. The result should also be sorted and should not contain duplicates.

---

## Constraints

* 1 ≤ size of arrays ≤ 10^5
* -10^5 ≤ element values ≤ 10^5

---

## Intuition

I thought about how the arrays are already sorted. That means I don't need extra data structures like hash sets. I can take advantage of the sorted order.

So I decided to use three pointers, one for each array. I compare elements and move forward smartly instead of checking everything.

---

## Approach

1. Initialize three pointers i, j, k at index 0.
2. Compare elements at these pointers.
3. If all three are equal:

   * Add to result (avoid duplicates).
   * Move all pointers forward.
4. Otherwise:

   * Move pointer(s) pointing to the smallest value.
5. Continue until any array ends.

---

## Data Structures Used

* Array/List for storing result
* Three integer pointers

---

## Operations & Behavior Summary

* Compare current elements from all three arrays
* Move pointers based on smallest value
* Skip duplicates while adding results

---

## Complexity

* Time Complexity: O(n1 + n2 + n3)
* Space Complexity: O(1) (excluding output)

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> commonElements(vector<int> &a, vector<int> &b, vector<int> &c) {
        vector<int> ans;
        int i = 0, j = 0, k = 0;

        while (i < a.size() && j < b.size() && k < c.size()) {
            int x = a[i], y = b[j], z = c[k];

            if (x == y && y == z) {
                if (ans.empty() || ans.back() != x) ans.push_back(x);
                i++; j++; k++;
            } else {
                int mn = min(x, min(y, z));
                if (x == mn) i++;
                if (y == mn) j++;
                if (z == mn) k++;
            }
        }
        return ans;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<Integer> commonElements(int[] a, int[] b, int[] c) {
        ArrayList<Integer> ans = new ArrayList<>();
        int i = 0, j = 0, k = 0;

        while (i < a.length && j < b.length && k < c.length) {
            int x = a[i], y = b[j], z = c[k];

            if (x == y && y == z) {
                if (ans.isEmpty() || ans.get(ans.size() - 1) != x) ans.add(x);
                i++; j++; k++;
            } else {
                int mn = Math.min(x, Math.min(y, z));
                if (x == mn) i++;
                if (y == mn) j++;
                if (z == mn) k++;
            }
        }
        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    commonElements(a, b, c) {
        let ans = [];
        let i = 0, j = 0, k = 0;

        while (i < a.length && j < b.length && k < c.length) {
            let x = a[i], y = b[j], z = c[k];

            if (x === y && y === z) {
                if (ans.length === 0 || ans[ans.length - 1] !== x) ans.push(x);
                i++; j++; k++;
            } else {
                let mn = Math.min(x, y, z);
                if (x === mn) i++;
                if (y === mn) j++;
                if (z === mn) k++;
            }
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def commonElements(self, a, b, c):
        ans = []
        i = j = k = 0

        while i < len(a) and j < len(b) and k < len(c):
            x, y, z = a[i], b[j], c[k]

            if x == y == z:
                if not ans or ans[-1] != x:
                    ans.append(x)
                i += 1
                j += 1
                k += 1
            else:
                mn = min(x, y, z)
                if x == mn: i += 1
                if y == mn: j += 1
                if z == mn: k += 1

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize pointers i, j, k = 0
2. Loop while all pointers are valid
3. Compare values at each pointer
4. If equal:

   * Add to result
   * Move all pointers
5. Else:

   * Find minimum
   * Move pointer(s) with minimum value
6. Continue until one array ends

---

## Examples

Input:

```
a = [1, 5, 10, 20, 40, 80]
b = [6, 7, 20, 80, 100]
c = [3, 4, 15, 20, 30, 70, 80, 120]
```

Output:

```
[20, 80]
```

---

## How to use / Run locally

1. Copy the code into your compiler (GFG / LeetCode / local IDE)
2. Provide input arrays
3. Run the program
4. Check output

---

## Notes & Optimizations

* No need for extra memory like hash maps
* Sorted property helps reduce complexity
* Efficient pointer movement avoids nested loops

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
