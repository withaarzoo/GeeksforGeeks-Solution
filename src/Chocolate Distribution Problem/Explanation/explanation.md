# Chocolate Distribution Problem

---

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

Given an array `arr[]` of positive integers where each element represents the number of chocolates in a packet. There are `m` students. Each student must receive exactly one packet.

The goal is to distribute the packets such that the difference between the maximum and minimum chocolates given to the students is minimum.

We need to return that minimum possible difference.

---

## Constraints

* 1 ≤ m ≤ arr.size ≤ 10^5
* 1 ≤ arr[i] ≤ 10^9

---

## Intuition

When I first looked at this problem, I understood that each student must get exactly one packet. So I only need to choose `m` packets from the array.

I thought like this:

If I sort the array, then similar chocolate values will come close to each other.

Now if I select any `m` consecutive packets from the sorted array, then:

* The first one will be the minimum.
* The last one will be the maximum.
* Their difference will be easy to calculate.

So instead of checking all combinations, I can just:

1. Sort the array.
2. Slide a window of size `m`.
3. Track the minimum difference.

That makes the solution simple and efficient.

---

## Approach

1. If `m` is 0 or greater than array size, return 0.

2. Sort the array in ascending order.

3. Initialize a variable `minDiff` with a very large value.

4. Run a loop from index 0 to `n - m`.

5. For each index `i`, calculate:

   `difference = arr[i + m - 1] - arr[i]`

6. Update `minDiff` with the minimum value.

7. Return `minDiff`.

---

## Data Structures Used

* Array (for storing packet values)
* No extra data structures used

---

## Operations & Behavior Summary

* Sorting groups similar values together.
* Sliding window ensures we only check valid groups of size `m`.
* Each window gives a potential answer.
* We keep updating the minimum difference.

---

## Complexity

**Time Complexity:** O(n log n)

* Sorting takes O(n log n)
* Sliding window takes O(n)
* Overall dominated by sorting

Here, `n` is the size of the array.

**Space Complexity:** O(1)

* No extra data structures used.
* Only a few variables.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int findMinDiff(vector<int>& a, int m) {
        int n = a.size();
        
        if (m == 0 || n == 0 || m > n)
            return 0;
        
        sort(a.begin(), a.end());
        
        int minDiff = INT_MAX;
        
        for (int i = 0; i <= n - m; i++) {
            int diff = a[i + m - 1] - a[i];
            minDiff = min(minDiff, diff);
        }
        
        return minDiff;
    }
};
```

---

### Java

```java
class Solution {
    public int findMinDiff(ArrayList<Integer> arr, int m) {
        int n = arr.size();
        
        if (m == 0 || n == 0 || m > n)
            return 0;
        
        Collections.sort(arr);
        
        int minDiff = Integer.MAX_VALUE;
        
        for (int i = 0; i <= n - m; i++) {
            int diff = arr.get(i + m - 1) - arr.get(i);
            minDiff = Math.min(minDiff, diff);
        }
        
        return minDiff;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    findMinDiff(arr, m) {
        let n = arr.length;
        
        if (m === 0 || n === 0 || m > n)
            return 0;
        
        arr.sort((a, b) => a - b);
        
        let minDiff = Number.MAX_SAFE_INTEGER;
        
        for (let i = 0; i <= n - m; i++) {
            let diff = arr[i + m - 1] - arr[i];
            minDiff = Math.min(minDiff, diff);
        }
        
        return minDiff;
    }
}
```

---

### Python3

```python
class Solution:

    def findMinDiff(self, arr, m):
        n = len(arr)
        
        if m == 0 or n == 0 or m > n:
            return 0
        
        arr.sort()
        
        minDiff = float('inf')
        
        for i in range(n - m + 1):
            diff = arr[i + m - 1] - arr[i]
            minDiff = min(minDiff, diff)
        
        return minDiff
```

---

## Step-by-step Detailed Explanation

First, I check if distribution is possible. If students are more than packets, I return 0.

Then I sort the array. Sorting helps me group similar chocolate values together.

After sorting, I run a loop from 0 to `n - m`.

At every index:

* `arr[i]` becomes the smallest packet in the window.
* `arr[i + m - 1]` becomes the largest packet in the window.
* I calculate their difference.

Since the array is sorted, this window guarantees the minimum spread within that group.

I keep updating the smallest difference found.

At the end, I return that minimum difference.

This avoids checking all combinations and keeps the solution efficient.

---

## Examples

Example 1:

Input:
arr = [3, 4, 1, 9, 56, 7, 9, 12]
m = 5

Output:
6

Example 2:

Input:
arr = [7, 3, 2, 4, 9, 12, 56]
m = 3

Output:
2

---

## How to use / Run locally

1. Copy the code into your preferred language editor.
2. Provide input array and value of m.
3. Call the function `findMinDiff`.
4. Print the result.

For C++:

Compile using:

```bash
g++ filename.cpp
./a.out
```

For Java:

```bash
javac Solution.java
java Solution
```

For Python:

```bash
python filename.py
```

---

## Notes & Optimizations

* Sorting is mandatory to group close values.
* No need for extra data structures.
* Sliding window ensures efficient scanning.
* Works efficiently even for large inputs up to 10^5.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
