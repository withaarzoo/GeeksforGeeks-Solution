# Count Subset With Target Sum II

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

Given an integer array `arr[]` and an integer `k`, my task is to **count the number of subsets** whose sum is exactly equal to `k`.

A subset can include or exclude any element, but each element can be used **only once**.

The final answer is guaranteed to fit inside a **32-bit integer**.

---

## Constraints

* `1 ≤ arr.size() ≤ 40`
* `-10^7 ≤ arr[i], k ≤ 10^7`

Important observation:

* Values can be **negative**
* Target `k` can also be **negative**
* Array size is small but **2^40 is too large**

---

## Intuition

When I first looked at the problem, my initial thought was:

* Try all subsets and count the valid ones

But quickly I realized:

* `2^40` subsets are impossible to generate directly

Then I remembered a powerful technique called **Meet in the Middle**.

So I thought:

* If I split the array into two halves
* And calculate all subset sums of both halves
* I can combine them smartly to reach the target sum

This reduces the problem from **2^40 → 2 × 2^20**, which is totally manageable.

---

## Approach

Here is exactly how I solved it step by step:

1. Split the array into two halves:

   * Left half
   * Right half

2. Generate **all possible subset sums** for:

   * Left half
   * Right half

3. Store frequencies of right subset sums using a hash map.

4. For every sum `x` in the left half:

   * I need `(k - x)` from the right half
   * Add how many times that value exists

5. The total count is the final answer.

This way, every subset is counted exactly once.

---

## Data Structures Used

* Dynamic arrays / lists to store subset sums
* Hash map / dictionary to store frequencies of sums
* Bit masking to generate subsets efficiently

---

## Operations & Behavior Summary

* Each subset is divided into left and right contributions
* Subset sums are generated using bit masks
* Hash map ensures fast lookup
* Supports negative numbers naturally
* Works within time and memory limits

---

## Complexity

* **Time Complexity:** `O(2^(n/2))`

  * `n` is the size of the array
  * Subset sums are generated for two halves

* **Space Complexity:** `O(2^(n/2))`

  * To store subset sums and their frequencies

This is the most optimized solution possible for `n ≤ 40`.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int countSubset(vector<int> &arr, int k) {
        int n = arr.size();
        int mid = n / 2;

        vector<int> left(arr.begin(), arr.begin() + mid);
        vector<int> right(arr.begin() + mid, arr.end());

        vector<long long> leftSums, rightSums;

        for (int mask = 0; mask < (1 << left.size()); mask++) {
            long long sum = 0;
            for (int i = 0; i < left.size(); i++)
                if (mask & (1 << i)) sum += left[i];
            leftSums.push_back(sum);
        }

        for (int mask = 0; mask < (1 << right.size()); mask++) {
            long long sum = 0;
            for (int i = 0; i < right.size(); i++)
                if (mask & (1 << i)) sum += right[i];
            rightSums.push_back(sum);
        }

        unordered_map<long long, int> freq;
        for (long long s : rightSums) freq[s]++;

        int count = 0;
        for (long long s : leftSums)
            count += freq[k - s];

        return count;
    }
};
```

---

### Java

```java
class Solution {
    public int countSubset(int[] arr, int k) {
        int n = arr.length;
        int mid = n / 2;

        int[] left = new int[mid];
        int[] right = new int[n - mid];

        for (int i = 0; i < mid; i++) left[i] = arr[i];
        for (int i = mid; i < n; i++) right[i - mid] = arr[i];

        ArrayList<Long> leftSums = new ArrayList<>();
        ArrayList<Long> rightSums = new ArrayList<>();

        for (int mask = 0; mask < (1 << left.length); mask++) {
            long sum = 0;
            for (int i = 0; i < left.length; i++)
                if ((mask & (1 << i)) != 0) sum += left[i];
            leftSums.add(sum);
        }

        for (int mask = 0; mask < (1 << right.length); mask++) {
            long sum = 0;
            for (int i = 0; i < right.length; i++)
                if ((mask & (1 << i)) != 0) sum += right[i];
            rightSums.add(sum);
        }

        HashMap<Long, Integer> freq = new HashMap<>();
        for (long s : rightSums)
            freq.put(s, freq.getOrDefault(s, 0) + 1);

        int count = 0;
        for (long s : leftSums)
            count += freq.getOrDefault(k - s, 0);

        return count;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    countSubset(arr, k) {
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        const leftSums = [];
        const rightSums = [];

        for (let mask = 0; mask < (1 << left.length); mask++) {
            let sum = 0;
            for (let i = 0; i < left.length; i++)
                if (mask & (1 << i)) sum += left[i];
            leftSums.push(sum);
        }

        for (let mask = 0; mask < (1 << right.length); mask++) {
            let sum = 0;
            for (let i = 0; i < right.length; i++)
                if (mask & (1 << i)) sum += right[i];
            rightSums.push(sum);
        }

        const freq = new Map();
        for (let s of rightSums)
            freq.set(s, (freq.get(s) || 0) + 1);

        let count = 0;
        for (let s of leftSums)
            count += freq.get(k - s) || 0;

        return count;
    }
}
```

---

### Python3

```python
class Solution:
    def countSubset(self, arr, k):
        mid = len(arr) // 2
        left, right = arr[:mid], arr[mid:]

        leftSums, rightSums = [], []

        for mask in range(1 << len(left)):
            s = 0
            for i in range(len(left)):
                if mask & (1 << i):
                    s += left[i]
            leftSums.append(s)

        for mask in range(1 << len(right)):
            s = 0
            for i in range(len(right)):
                if mask & (1 << i):
                    s += right[i]
            rightSums.append(s)

        from collections import Counter
        freq = Counter(rightSums)

        count = 0
        for s in leftSums:
            count += freq[k - s]

        return count
```

---

## Step-by-step Detailed Explanation

* I split the array into two halves
* Generated all subset sums using bit masking
* Stored right half sums with frequency
* For every left sum, I searched `(k - leftSum)`
* Added how many times it exists
* This guarantees correct counting of all subsets

---

## Examples

**Input**

```bash
arr = [1, 3, 2], k = 3
```

**Output**

```bash
2
```

**Explanation**

```bash
Valid subsets: [1,2], [3]
```

---

## How to use / Run locally

1. Copy the solution code for your language
2. Compile and run using standard compiler
3. Call `countSubset(arr, k)` with your input

---

## Notes & Optimizations

* This approach handles **negative numbers**
* No DP table required
* Optimal for `n ≤ 40`
* Much faster than brute force
* Commonly asked in interviews

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
