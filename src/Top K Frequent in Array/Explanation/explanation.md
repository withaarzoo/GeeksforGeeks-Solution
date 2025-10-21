# Problem Title

Top K Frequent in Array

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
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

Given a non-empty integer array `arr[]` and an integer `k`, return the top `k` elements which have the highest frequency in the array.
If two numbers have the same frequency, the larger number should have higher priority (appear earlier in the output).

**Goal:** Return the `k` integers sorted by:

1. Descending frequency, and
2. Descending value when frequencies tie.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^5`
* `-10^5 ≤ arr[i] ≤ 10^5` (values could be negative or positive depending on problem variant)
* `1 ≤ k ≤ number of distinct elements` (as per problem statement; if not, solutions can be adapted)

---

## Intuition

I thought: first count how often each number appears. Once I know frequencies, I only need to pick the `k` numbers with the largest `(frequency, value)` ordered by frequency descending, and value descending if frequencies tie. To do that efficiently I can:

* Use a frequency map to count occurrences.
* Use a heap of size `k` (min-heap by priority) to keep only the top `k` candidates while iterating distinct elements.
* Or if simplicity is preferred and `m` (distinct elements) is small, sort the distinct elements by the required comparator and take the first `k`.

---

## Approach

1. Build a frequency map `num -> count` by scanning `arr` once.
2. Use one of two selection strategies:

   * **Heap approach (recommended when k << m):**

     * Maintain a min-heap keyed by `(frequency, value)` where "smaller" means lower frequency or smaller value when tied.
     * Iterate distinct numbers, push `(freq, num)` to heap and pop when size > `k`. After iteration, heap contains top `k`.
     * Pop heap into result and reverse to get highest priority first.
   * **Sort approach (simple, O(m log m)):**

     * Build list of distinct numbers and sort them by `(frequency desc, value desc)`, then take first `k`.
3. Return the `k` values in required order (highest priority first).

---

## Data Structures Used

* Hash map (dictionary) to count frequencies.
* Priority queue (min-heap) of fixed size `k` OR temporary array/list of distinct elements for sorting.
* Output list/vector/array to store the final `k` elements.

---

## Operations & Behavior Summary

* Counting: `O(n)` by scanning input once.
* Heap insertion and optional pop: `O(log k)` each, only for `m` distinct items → `O(m log k)`.
* Sorting distinct items: `O(m log m)` (simpler but slower when `m` is large and `k` is small).
* The returned list is ordered highest-priority first: highest frequency, and among equal frequency, larger number first.

---

## Complexity

* **Time Complexity:**

  * Building frequency map — `O(n)` where `n` is `arr.size()`.
  * Selecting top `k` using heap — `O(m log k)` where `m` = number of distinct elements.
  * Alternatively, sorting approach — `O(m log m)`.
    Overall: `O(n + m log k)` (heap) or `O(n + m log m)` (sort).

* **Space Complexity:**

  * `O(m)` additional space for frequency map plus `O(k)` for heap (so `O(m + k)` which is `O(m)` worst-case).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    vector<int> topKFreq(vector<int> &arr, int k) {
        // Step 1: frequency map
        unordered_map<int,int> freq;
        for (int x : arr) freq[x]++;

        // Step 2: min-heap to keep top k elements.
        // heap stores pairs: (frequency, value)
        // comparator ensures the smallest frequency (or smallest value if tie) is on top
        auto cmp = [](const pair<int,int>& a, const pair<int,int>& b){
            if (a.first != b.first) return a.first > b.first; // min-heap by freq
            return a.second > b.second; // if freq equal, min-heap by value
        };
        priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);

        for (auto &p : freq) {
            pq.push({p.second, p.first}); // {frequency, value}
            if ((int)pq.size() > k) pq.pop();
        }

        // collect results and reverse
        vector<int> res;
        while (!pq.empty()) {
            res.push_back(pq.top().second);
            pq.pop();
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> topKFreq(int[] arr, int k) {
        // frequency map
        HashMap<Integer, Integer> freq = new HashMap<>();
        for (int x : arr) freq.put(x, freq.getOrDefault(x, 0) + 1);

        // min-heap storing {frequency, value}
        PriorityQueue<int[]> pq = new PriorityQueue<>(new Comparator<int[]>(){
            public int compare(int[] a, int[] b) {
                if (a[0] != b[0]) return Integer.compare(a[0], b[0]); // freq ascending
                return Integer.compare(a[1], b[1]); // value ascending
            }
        });

        for (Map.Entry<Integer,Integer> e : freq.entrySet()) {
            int val = e.getKey();
            int f = e.getValue();
            pq.offer(new int[]{f, val});
            if (pq.size() > k) pq.poll();
        }

        ArrayList<Integer> res = new ArrayList<>();
        while (!pq.isEmpty()) res.add(pq.poll()[1]);
        Collections.reverse(res);
        return res;
    }
}
```

### JavaScript

```javascript
/**
 * @param {Number[]} arr
 * @param {Number} k
 * @returns {Number[]}
 */
class Solution {
    topKFreq(arr, k) {
        // frequency map
        const freq = new Map();
        for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);

        // Convert to array of [value, frequency]
        const entries = Array.from(freq.entries()); // [value, freq]

        // Sort by frequency descending, then value descending
        entries.sort((a, b) => {
            if (b[1] !== a[1]) return b[1] - a[1]; // higher freq first
            return b[0] - a[0]; // if tie, larger value first
        });

        // pick top k values
        const result = [];
        for (let i = 0; i < k; ++i) result.push(entries[i][0]);
        return result;
    }
}
```

### Python3

```python
import heapq
from collections import Counter

class Solution:
    def topKFreq(self, arr, k):
        # Build frequency map
        cnt = Counter(arr)  # number -> frequency

        # Use heapq.nlargest which uses a heap of size k: O(m log k)
        # key is (frequency, value) so that higher frequency and higher value are larger
        topk = heapq.nlargest(k, cnt.keys(), key=lambda x: (cnt[x], x))
        return topk
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the approach line-by-line focusing on the Python code (most compact), then map ideas to other languages.

### Python (line-by-line)

```python
import heapq
from collections import Counter
```

* `Counter` quickly builds frequency counts.
* `heapq` provides `nlargest`, which finds top k items efficiently using a heap.

```python
cnt = Counter(arr)
```

* `cnt` maps each number to how many times it appears (e.g., `{4:2, 1:2, 3:1}`).

```python
topk = heapq.nlargest(k, cnt.keys(), key=lambda x: (cnt[x], x))
```

* We choose `k` keys (numbers) with largest `(frequency, value)` tuple.
* Tuples compare lexicographically: first frequency, then value. So higher frequency wins; for ties higher value wins.
* `nlargest` uses a heap internally, giving `O(m log k)` time complexity where `m` is number of distinct keys.

```python
return topk
```

* Return `topk`, already ordered from largest to smallest by the chosen key.

---

### How the C++/Java versions map

* **Frequency map:** `unordered_map<int,int>` (C++), `HashMap<Integer,Integer>` (Java).
* **Selection:** Use a fixed-size **min-heap** that holds candidate top `k` elements. The comparator ensures that the *least* desirable element (lowest frequency or lower value when tied) is at the top and popped when heap size exceeds `k`. After processing all distinct numbers we pop elements from heap to the result and reverse to get highest priority first.
* This approach avoids sorting all distinct elements and is efficient when `k` is small relative to `m`.

---

### JavaScript notes

* Native JS doesn't include a standard binary heap; for readability I used sorting which is `O(m log m)`. This is simple, robust, and fine for most inputs. If you need `O(m log k)`, implement a heap class or use a third-party library.

---

## Examples

**Example 1**

```
Input: arr = [3, 1, 4, 4, 5, 2, 1], k = 2
Frequencies: 4 -> 2, 1 -> 2, 3->1,5->1,2->1
Tie between 4 and 1 (freq 2): larger number (4) gets priority.
Output: [4, 1]
```

**Example 2**

```
Input: arr = [7,10,11,5,2,5,5,7,11,8,9], k = 4
Frequencies: 5->3, 11->2, 7->2, 10->1, 8->1, 9->1, 2->1
Sort by (freq desc, value desc) => [5, 11, 7, 10] (11 > 7 when freq tie)
Output: [5, 11, 7, 10]
```

---

## How to use / Run locally

### C++

1. Save code into `solution.cpp` (include `main()` wrapper for testing).
2. Compile:

   ```bash
   g++ -std=c++17 -O2 solution.cpp -o solution
   ```

3. Run:

   ```bash
   ./solution
   ```

### Java

1. Save code into `Solution.java`. Add a `main()` method to test.
2. Compile:

   ```bash
   javac Solution.java
   ```

3. Run:

   ```bash
   java Solution
   ```

### JavaScript (Node)

1. Save the class in `solution.js`. Add test harness lines at the bottom:

   ```javascript
   const sol = new Solution();
   console.log(sol.topKFreq([3,1,4,4,5,2,1], 2));
   ```

2. Run:

   ```bash
   node solution.js
   ```

### Python3

1. Save into `solution.py`. Add a test block:

   ```python
   if __name__ == "__main__":
       sol = Solution()
       print(sol.topKFreq([3,1,4,4,5,2,1], 2))
   ```

2. Run:

   ```bash
   python3 solution.py
   ```

---

## Notes & Optimizations

* If element values are in a small integer range and memory allows, **bucket sort** by frequency (buckets indexed by frequency) can achieve `O(n)` time. But bucket-sort requires `O(n + max_frequency)` space and is practical when value-range/frequency-range is manageable.
* Using a heap of size `k` is best when `k << m` (distinct elements). It avoids sorting all distinct elements.
* Sorting distinct elements is simpler to implement and easier to read, but has higher worst-case cost `O(m log m)`.
* Watch out for stable ordering: this problem requires explicit ordering by value on tie — ensure comparator handles ties correctly.
* If `k` may be greater than number of distinct elements, either validate `k` or clamp `k = min(k, m)` before selection.

---

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
