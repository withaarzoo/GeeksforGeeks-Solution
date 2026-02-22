# Count Subarrays with Given XOR

---

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given an array of integers `arr[]` and a number `k`, we need to count the number of subarrays whose XOR is equal to `k`.

A subarray is a continuous part of the array.

---

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 0 ≤ arr[i] ≤ 10^5
* 0 ≤ k ≤ 10^5

The result fits in a 32-bit integer.

---

## Intuition

When I first saw this problem, I thought about checking all possible subarrays.

But that would take O(n^2) time. That is too slow for large inputs.

Then I remembered an important XOR property.

If:

prefixXor[i] = XOR of elements from index 0 to i

Then:

XOR of subarray (l to r) = prefixXor[r] ^ prefixXor[l - 1]

If I want this equal to k, then:

prefixXor[r] ^ prefixXor[l - 1] = k

Rearranging:

prefixXor[l - 1] = prefixXor[r] ^ k

So for every index r, I just need to know how many times (prefixXor[r] ^ k) appeared before.

That is why I use a HashMap to store frequency of prefix XOR values.

---

## Approach

1. Initialize prefixXor = 0
2. Create a HashMap to store frequency of prefix XOR values
3. Put freq[0] = 1
4. Traverse the array

   * Update prefixXor ^= arr[i]
   * Check if (prefixXor ^ k) exists in map
   * If yes, add its frequency to answer
   * Increase frequency of prefixXor in map
5. Return the final count

This way, I solve it in one pass.

---

## Data Structures Used

* HashMap / unordered_map / dictionary

  * To store frequency of prefix XOR values

* Integer variables

  * prefixXor
  * count

---

## Operations & Behavior Summary

* Traverse array once
* Maintain running prefix XOR
* For each index, check if required XOR already appeared
* Add frequency to result
* Update current prefix XOR frequency

---

## Complexity

**Time Complexity:** O(n)

* We traverse the array once.
* Each HashMap operation is O(1) on average.

**Space Complexity:** O(n)

* In worst case, all prefix XOR values are unique.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    long subarrayXor(vector<int> &arr, int k) {
        unordered_map<int, long> freq;
        long count = 0;
        int prefixXor = 0;
        
        freq[0] = 1;
        
        for(int num : arr) {
            prefixXor ^= num;
            
            if(freq.find(prefixXor ^ k) != freq.end()) {
                count += freq[prefixXor ^ k];
            }
            
            freq[prefixXor]++;
        }
        
        return count;
    }
};
```

---

### Java

```java
import java.util.*;

class Solution {
    public long subarrayXor(int arr[], int k) {
        HashMap<Integer, Long> freq = new HashMap<>();
        long count = 0;
        int prefixXor = 0;
        
        freq.put(0, 1L);
        
        for(int num : arr) {
            prefixXor ^= num;
            
            if(freq.containsKey(prefixXor ^ k)) {
                count += freq.get(prefixXor ^ k);
            }
            
            freq.put(prefixXor, freq.getOrDefault(prefixXor, 0L) + 1);
        }
        
        return count;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    subarrayXor(arr, k) {
        let freq = new Map();
        let count = 0;
        let prefixXor = 0;
        
        freq.set(0, 1);
        
        for(let num of arr) {
            prefixXor ^= num;
            
            if(freq.has(prefixXor ^ k)) {
                count += freq.get(prefixXor ^ k);
            }
            
            freq.set(prefixXor, (freq.get(prefixXor) || 0) + 1);
        }
        
        return count;
    }
}
```

---

### Python3

```python
class Solution:
    def subarrayXor(self, arr, k):
        from collections import defaultdict
        
        freq = defaultdict(int)
        count = 0
        prefixXor = 0
        
        freq[0] = 1
        
        for num in arr:
            prefixXor ^= num
            
            count += freq[prefixXor ^ k]
            
            freq[prefixXor] += 1
        
        return count
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Step 1: Initialize

* prefixXor = 0
* count = 0
* freq[0] = 1

Why freq[0] = 1?

Because if prefixXor itself becomes equal to k, then prefixXor ^ k = 0.

So we need to count that case.

Step 2: Traverse the array

For each element:

prefixXor ^= current element

This keeps track of XOR from index 0 to current index.

Step 3: Check required prefix

We compute:

required = prefixXor ^ k

If required already appeared before, that means we found subarrays ending here with XOR k.

So we add freq[required] to count.

Step 4: Update frequency

We increment freq[prefixXor].

So future elements can use this prefix.

Step 5: Return result

Finally, return count.

---

## Examples

Input:
arr = [4, 2, 2, 6, 4]
k = 6

Output:
4

Subarrays:
[4, 2]
[4, 2, 2, 6, 4]
[2, 2, 6]
[6]

---

## How to use / Run locally

### C++

Compile:

```bash
g++ filename.cpp -o output
./output
```

### Java

```bash
javac Solution.java
java Solution
```

### Python

```bash
python filename.py
```

### JavaScript

```bash
node filename.js
```

---

## Notes & Optimizations

* Always initialize freq[0] = 1
* Use long for count because result can be large
* Avoid brute force O(n^2)
* Hashing gives O(n) optimized solution

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
