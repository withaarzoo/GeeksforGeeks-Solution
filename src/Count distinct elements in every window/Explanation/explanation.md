# Count Distinct Elements in Every Window

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
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an integer array `arr[]` and a number `k`, I need to find the **count of distinct elements** in every **contiguous window of size `k`**.

For each window, I move from left to right and calculate how many unique numbers exist inside that window.

---

## Constraints

* `1 ≤ k ≤ arr.length ≤ 10^5`
* `1 ≤ arr[i] ≤ 10^5`
* Output size will be `arr.length - k + 1`

---

## Intuition

When I first saw this problem, my initial thought was to check every window separately and count unique elements.

But that approach would be slow because I would repeat the same work again and again.

Then I noticed something important:

* When a window moves, only **one element goes out**
* And **one new element comes in**

So instead of recalculating everything, I decided to **reuse previous results** using a **sliding window technique** with a **hash map**.

---

## Approach

1. I use a hash map to store the **frequency of elements** in the current window.
2. I process the **first window** of size `k`.
3. The number of distinct elements is simply the **size of the hash map**.
4. Then I slide the window:

   * Remove the outgoing element.
   * Decrease its frequency.
   * If frequency becomes zero, remove it from the map.
   * Add the incoming element.
5. After each slide, I store the map size as the answer.

This way, each element is processed only once.

---

## Data Structures Used

* **Hash Map**

  * To store element frequency inside the current window
* **Array / List**

  * To store the result of each window

---

## Operations & Behavior Summary

* Insert element into map → `O(1)`
* Remove element from map → `O(1)`
* Window slide → constant time
* Total traversal → one pass through array

---

## Complexity

* **Time Complexity:** `O(n)`
  Each element enters and exits the window exactly once.

* **Space Complexity:** `O(k)`
  At most `k` distinct elements can exist in the window.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> countDistinct(vector<int> &arr, int k) {
        unordered_map<int, int> freq;
        vector<int> result;

        for (int i = 0; i < k; i++)
            freq[arr[i]]++;

        result.push_back(freq.size());

        for (int i = k; i < arr.size(); i++) {
            freq[arr[i - k]]--;
            if (freq[arr[i - k]] == 0)
                freq.erase(arr[i - k]);

            freq[arr[i]]++;
            result.push_back(freq.size());
        }

        return result;
    }
};
```

---

### Java

```java
class Solution {
    ArrayList<Integer> countDistinct(int arr[], int k) {
        HashMap<Integer, Integer> freq = new HashMap<>();
        ArrayList<Integer> result = new ArrayList<>();

        for (int i = 0; i < k; i++)
            freq.put(arr[i], freq.getOrDefault(arr[i], 0) + 1);

        result.add(freq.size());

        for (int i = k; i < arr.length; i++) {
            freq.put(arr[i - k], freq.get(arr[i - k]) - 1);
            if (freq.get(arr[i - k]) == 0)
                freq.remove(arr[i - k]);

            freq.put(arr[i], freq.getOrDefault(arr[i], 0) + 1);
            result.add(freq.size());
        }

        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    countDistinct(arr, k) {
        const freq = new Map();
        const result = [];

        for (let i = 0; i < k; i++)
            freq.set(arr[i], (freq.get(arr[i]) || 0) + 1);

        result.push(freq.size);

        for (let i = k; i < arr.length; i++) {
            const out = arr[i - k];
            freq.set(out, freq.get(out) - 1);
            if (freq.get(out) === 0) freq.delete(out);

            freq.set(arr[i], (freq.get(arr[i]) || 0) + 1);
            result.push(freq.size);
        }

        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def countDistinct(self, arr, k):
        freq = {}
        result = []

        for i in range(k):
            freq[arr[i]] = freq.get(arr[i], 0) + 1

        result.append(len(freq))

        for i in range(k, len(arr)):
            freq[arr[i - k]] -= 1
            if freq[arr[i - k]] == 0:
                del freq[arr[i - k]]

            freq[arr[i]] = freq.get(arr[i], 0) + 1
            result.append(len(freq))

        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Create a frequency map.
2. Insert first `k` elements into the map.
3. Store map size as first answer.
4. Slide window one step:

   * Remove left element.
   * Update frequency.
   * Add new element.
5. Store map size after each slide.
6. Repeat until array ends.

The logic is exactly the same in all four languages.

---

## Examples

**Input**

```bash
arr = [1, 2, 1, 3, 4, 2, 3]
k = 4
```

**Output**

```bash
[3, 4, 4, 3]
```

---

## How to Use / Run Locally

1. Clone the repository
2. Choose your language file
3. Compile or run using standard commands

Example (C++):

```bash
g++ solution.cpp
./a.out
```

Example (Python):

```bash
python solution.py
```

---

## Notes & Optimizations

* Sliding Window avoids repeated computation.
* Hash Map ensures constant time operations.
* Works efficiently for large input sizes.
* Interview-ready and production-safe solution.

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
