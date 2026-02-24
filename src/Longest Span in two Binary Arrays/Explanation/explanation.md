# Longest Span in Two Binary Arrays

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

Given two binary arrays `a1[]` and `a2[]` of equal length, I need to find the length of the longest span `(i, j)` such that the sum of elements from index `i` to `j` in `a1` is equal to the sum of elements from index `i` to `j` in `a2`.

In simple words, I must find the longest subarray where both arrays have the same total sum.

---

## Constraints

* 1 ≤ n ≤ 10^6
* 0 ≤ a1[i], a2[i] ≤ 1

Since `n` can be very large, I cannot use a brute force solution.

---

## Intuition

When I first looked at the problem, I thought about checking all subarrays. But that would take too much time.

Then I realized something important.

If I subtract both arrays element by element:

```bash
diff[i] = a1[i] - a2[i]
```

Now the problem becomes:

Find the longest subarray in `diff[]` whose sum is 0.

Because if the difference sum is zero, it means both arrays have equal sum in that span.

That changed the problem into a classic:

👉 Longest subarray with sum = 0

And I know how to solve that using prefix sum and a hashmap.

---

## Approach

Here is how I solved it step by step:

1. I initialized `prefixSum = 0`.
2. I used a hashmap to store the first occurrence of each prefix sum.
3. For every index:

   * I added `(a1[i] - a2[i])` to `prefixSum`.
4. If `prefixSum == 0`, then span from 0 to i is valid.
5. If the same prefix sum appears again, that means the subarray between those indices has sum zero.
6. I kept updating the maximum length.

This way I only traverse the array once.

---

## Data Structures Used

* HashMap / Unordered Map
* Integer variable for prefix sum

The hashmap stores:

```bash
prefixSum -> first index where it appeared
```

---

## Operations & Behavior Summary

* Traverse the array once
* Maintain running difference sum
* Check for zero prefix
* Use hashmap to detect repeated prefix sums
* Update maximum span length

---

## Complexity

**Time Complexity:** O(n)

I traverse the array only once.

**Space Complexity:** O(n)

In worst case, I store n prefix sums inside the hashmap.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int equalSumSpan(vector<int> &a1, vector<int> &a2) {
        int n = a1.size();
        unordered_map<int, int> mp;
        int prefixSum = 0;
        int maxLen = 0;
        
        for(int i = 0; i < n; i++) {
            prefixSum += (a1[i] - a2[i]);
            
            if(prefixSum == 0)
                maxLen = i + 1;
            
            if(mp.find(prefixSum) != mp.end()) {
                maxLen = max(maxLen, i - mp[prefixSum]);
            } else {
                mp[prefixSum] = i;
            }
        }
        return maxLen;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public int equalSumSpan(int[] a1, int[] a2) {
        int n = a1.length;
        HashMap<Integer, Integer> map = new HashMap<>();
        int prefixSum = 0;
        int maxLen = 0;
        
        for(int i = 0; i < n; i++) {
            prefixSum += (a1[i] - a2[i]);
            
            if(prefixSum == 0)
                maxLen = i + 1;
            
            if(map.containsKey(prefixSum)) {
                maxLen = Math.max(maxLen, i - map.get(prefixSum));
            } else {
                map.put(prefixSum, i);
            }
        }
        return maxLen;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    equalSumSpan(a1, a2) {
        let n = a1.length;
        let map = new Map();
        let prefixSum = 0;
        let maxLen = 0;
        
        for(let i = 0; i < n; i++) {
            prefixSum += (a1[i] - a2[i]);
            
            if(prefixSum === 0)
                maxLen = i + 1;
            
            if(map.has(prefixSum)) {
                maxLen = Math.max(maxLen, i - map.get(prefixSum));
            } else {
                map.set(prefixSum, i);
            }
        }
        return maxLen;
    }
}
```

---

### Python3

```python
class Solution:
    def equalSumSpan(self, a1, a2):
        prefix_sum = 0
        max_len = 0
        mp = {}
        
        for i in range(len(a1)):
            prefix_sum += (a1[i] - a2[i])
            
            if prefix_sum == 0:
                max_len = i + 1
            
            if prefix_sum in mp:
                max_len = max(max_len, i - mp[prefix_sum])
            else:
                mp[prefix_sum] = i
        
        return max_len
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Step 1:
I maintain a running prefix sum of differences.

Step 2:
If prefix sum becomes zero at index i, it means from index 0 to i both arrays have equal sum.

Step 3:
If the same prefix sum appears again, it means the elements between previous index+1 and current index sum to zero.

Step 4:
I always store only the first occurrence of a prefix sum to maximize span length.

Step 5:
Update maximum length whenever I find a valid span.

This logic is same in all four languages. Only syntax changes.

---

## Examples

Example 1:

Input:

```bash
a1 = [0,1,0,0,0,0]
a2 = [1,0,1,0,0,1]
```

Output:

```bash
4
```

Example 2:

```bash
a1 = [0,0,0]
a2 = [1,1,1]
```

Output:

```bash
0
```

---

## How to use / Run locally

1. Copy the solution code.
2. Paste it into your IDE or online compiler.
3. Provide input arrays.
4. Call the function `equalSumSpan()`.
5. Print the returned result.

---

## Notes & Optimizations

* Never overwrite first occurrence in hashmap.
* This is an optimized O(n) solution.
* Works efficiently for large constraints up to 10^6.
* Avoid brute force O(n^2).

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
