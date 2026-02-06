# Happiest Triplet (Smallest Difference Triplet From Three Arrays)

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

I am given three integer arrays `a`, `b`, and `c` of the same size.
I need to pick **one number from each array** and form a triplet.

My goal is to find a triplet such that:

* The difference `(maximum − minimum)` is **as small as possible**
* If multiple triplets have the same minimum difference, I choose the one with the **smallest sum**
* The final triplet must be printed in **decreasing order**

This triplet is called the **Happiest Triplet**.

---

## Constraints

* 1 ≤ size of `a`, `b`, `c` ≤ 10⁵
* 1 ≤ `a[i]`, `b[i]`, `c[i]` ≤ 10⁵

---

## Intuition

When I first looked at the problem, my initial thought was to try all possible triplets.
But that would take **O(n³)** time, which is not practical for large inputs.

Then I noticed something important:

* I only care about the **minimum and maximum** in a triplet
* If all arrays are **sorted**, I can move intelligently using pointers

So I decided to:

* Sort all three arrays
* Use a **three-pointer technique**
* Always move the pointer which is pointing to the **smallest value**, because that is the only way to reduce the difference

This greedy idea helps me reach the optimal solution efficiently.

---

## Approach

1. Sort arrays `a`, `b`, and `c`
2. Initialize three pointers `i`, `j`, `k` at index `0`
3. At every step:

   * Pick `a[i]`, `b[j]`, `c[k]`
   * Find `max` and `min`
   * Calculate `difference = max - min`
4. Update the best answer if:

   * Difference is smaller, or
   * Difference is same but sum is smaller
5. Move the pointer which has the **minimum value**
6. Repeat until any pointer reaches the end
7. Sort the final triplet in **decreasing order**

---

## Data Structures Used

* Arrays (for storing input)
* Variables for pointers and tracking best answer

No extra data structures are required.

---

## Operations & Behavior Summary

* Sorting helps in ordered traversal
* Three pointers reduce time complexity drastically
* Greedy movement ensures minimum difference
* Tie-breaking handled using sum comparison
* Output formatted as required

---

## Complexity

**Time Complexity:**
`O(n log n)`

* Sorting each array takes `O(n log n)`
* Single traversal using three pointers takes `O(n)`

**Space Complexity:**
`O(1)`

* No extra space used apart from variables

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> smallestDiff(vector<int>& a, vector<int>& b, vector<int>& c) {
        sort(a.begin(), a.end());
        sort(b.begin(), b.end());
        sort(c.begin(), c.end());

        int i = 0, j = 0, k = 0;
        long long bestDiff = LLONG_MAX;
        long long bestSum = LLONG_MAX;
        vector<int> ans(3);

        while (i < a.size() && j < b.size() && k < c.size()) {
            int x = a[i], y = b[j], z = c[k];

            int mx = max({x, y, z});
            int mn = min({x, y, z});

            long long diff = mx - mn;
            long long sum = (long long)x + y + z;

            if (diff < bestDiff || (diff == bestDiff && sum < bestSum)) {
                bestDiff = diff;
                bestSum = sum;
                ans = {x, y, z};
            }

            if (mn == x) i++;
            else if (mn == y) j++;
            else k++;
        }

        sort(ans.rbegin(), ans.rend());
        return ans;
    }
};
```

---

### Java

```java
class Solution {
    int[] smallestDiff(int a[], int b[], int c[]) {
        Arrays.sort(a);
        Arrays.sort(b);
        Arrays.sort(c);

        int i = 0, j = 0, k = 0;
        long bestDiff = Long.MAX_VALUE;
        long bestSum = Long.MAX_VALUE;
        int[] ans = new int[3];

        while (i < a.length && j < b.length && k < c.length) {
            int x = a[i], y = b[j], z = c[k];

            int mx = Math.max(x, Math.max(y, z));
            int mn = Math.min(x, Math.min(y, z));

            long diff = mx - mn;
            long sum = (long)x + y + z;

            if (diff < bestDiff || (diff == bestDiff && sum < bestSum)) {
                bestDiff = diff;
                bestSum = sum;
                ans[0] = x;
                ans[1] = y;
                ans[2] = z;
            }

            if (mn == x) i++;
            else if (mn == y) j++;
            else k++;
        }

        Arrays.sort(ans);
        return new int[]{ans[2], ans[1], ans[0]};
    }
}
```

---

### JavaScript

```javascript
class Solution {
    smallestDiff(a, b, c) {
        a.sort((x, y) => x - y);
        b.sort((x, y) => x - y);
        c.sort((x, y) => x - y);

        let i = 0, j = 0, k = 0;
        let bestDiff = Infinity;
        let bestSum = Infinity;
        let ans = [];

        while (i < a.length && j < b.length && k < c.length) {
            let x = a[i], y = b[j], z = c[k];

            let mx = Math.max(x, y, z);
            let mn = Math.min(x, y, z);

            let diff = mx - mn;
            let sum = x + y + z;

            if (diff < bestDiff || (diff === bestDiff && sum < bestSum)) {
                bestDiff = diff;
                bestSum = sum;
                ans = [x, y, z];
            }

            if (mn === x) i++;
            else if (mn === y) j++;
            else k++;
        }

        return ans.sort((x, y) => y - x);
    }
}
```

---

### Python3

```python
class Solution:
    def smallestDiff(self, a, b, c):
        a.sort()
        b.sort()
        c.sort()

        i = j = k = 0
        bestDiff = float('inf')
        bestSum = float('inf')
        ans = []

        while i < len(a) and j < len(b) and k < len(c):
            x, y, z = a[i], b[j], c[k]

            mx = max(x, y, z)
            mn = min(x, y, z)

            diff = mx - mn
            s = x + y + z

            if diff < bestDiff or (diff == bestDiff and s < bestSum):
                bestDiff = diff
                bestSum = s
                ans = [x, y, z]

            if mn == x:
                i += 1
            elif mn == y:
                j += 1
            else:
                k += 1

        return sorted(ans, reverse=True)
```

---

## Step-by-step Detailed Explanation

1. Sort all three arrays
2. Use three pointers to track current elements
3. Calculate max and min from the triplet
4. Update best answer if difference or sum improves
5. Move pointer of the smallest element
6. Continue until traversal ends
7. Return result in decreasing order

---

## Examples

**Input:**
`a = [5, 2, 8]`
`b = [10, 7, 12]`
`c = [9, 14, 6]`

**Output:**
`[7, 6, 5]`

---

## How to use / Run locally

1. Copy the code for your preferred language
2. Paste it into your IDE or online judge
3. Call the function with three arrays as input
4. Print the returned triplet

---

## Notes & Optimizations

* Brute force is avoided completely
* Works efficiently for large inputs
* Greedy + sorting gives optimal result
* Easy to extend or debug

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
