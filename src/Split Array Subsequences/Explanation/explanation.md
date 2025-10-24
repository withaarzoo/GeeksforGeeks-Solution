# Split Array Subsequences

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

Given an integer array `arr` (not necessarily strictly increasing) we want to split it into one or more **consecutive** subsequences such that **each subsequence has length at least `k`**. A consecutive subsequence means numbers increase by exactly `1` each step (e.g., `[3,4,5]`). Determine whether it is possible to split the entire array into such subsequences.

> Example question from GeeksforGeeks / LeetCode-style: "Split Array into Consecutive Subsequences with minimum length `k`."

## Constraints

* `1 <= arr.length <= 10^5` (typical constraint — implement O(n log n) or O(n) average).
* Elements can repeat and the array might not be sorted (algorithm sorts or assumes sorted input).
* `k >= 1`.

> Note: If `k == 1` the answer is always `true` because singletons are allowed.

## Intuition

I thought about how subsequences can be built from left to right (after sorting). When I see a new number, I either have to start a new subsequence or extend an existing one that ends with the previous number. If I have multiple subsequences that could be extended, I should extend the **shortest** one first — because short subsequences are the most urgent to reach the required length `k`. This is a greedy idea and is the key to the solution.

I realized a min-heap that keeps subsequences ordered by their current **ending value** and their **length** (shortest first) lets me efficiently get the subsequence I should try to extend.

## Approach

1. (Optional) Sort the array if it's not guaranteed sorted.
2. Maintain a min-heap of pairs `(lastValue, length)` representing subsequences that currently end at `lastValue` and have `length` elements.
3. Iterate each number `x` in sorted `arr`:

   * While the heap is non-empty and the top subsequence's `lastValue` is more than `x-1` (i.e., `lastValue + 1 < x`), that top subsequence can never be extended; finalize it. If its `length < k`, return `false`.
   * If heap empty or top's `lastValue == x` then we cannot extend that top subsequence with `x` (it expects a `lastValue+1` to extend). So start a new subsequence `(x,1)`.
   * Else if top's `lastValue + 1 == x`, pop the top and push `(x, length+1)` — we extend the shortest subsequence ending at `x-1`.
4. After processing all numbers, check remaining subsequences in heap — any with `length < k` => `false`.
5. Otherwise, return `true`.

This greedy approach always extends the shortest eligible subsequence first and ensures we don't leave a short subsequence unfinished.

## Data Structures Used

* **Min-Heap (Priority Queue)** that stores `(lastValue, length)` pairs.
* Sorting uses O(n log n) if input is unsorted.

## Operations & Behavior Summary

* `push` new subsequence when starting a subsequence with an element.
* `pop` and `push` to extend the shortest subsequence ending at `x-1` with value `x`.
* `peek` to inspect the most urgent subsequence to finish/extend (smallest ending value and shortest length).

## Complexity

* **Time Complexity:** `O(n log n)` worst-case.

  * Sorting: `O(n log n)` (only if input not guaranteed sorted).
  * Each number causes at most a constant number of heap operations; each heap op is `O(log m)` where `m` ≤ `n`. So overall `O(n log n)`.
* **Space Complexity:** `O(n)` worst-case for the heap storing active subsequences.

## Multi-language Solutions

Below are precise, production-ready implementations for C++, Java, JavaScript, and Python3. Each implementation follows the same greedy + min-heap strategy and includes helpful comments.

---

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    bool isPossible(vector<int>& arr, int k) {
        sort(arr.begin(), arr.end());

        // Min-heap comparator: smallest lastValue first, for same lastValue smallest length first
        auto comp = [](const pair<int,int>& a, const pair<int,int>& b) {
            if (a.first == b.first) return a.second > b.second;
            return a.first > b.first;
        };

        priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(comp)> pq(comp);

        int i = 0, n = arr.size();
        while (i < n) {
            if (pq.empty()) {
                pq.push({arr[i], 1});
                ++i;
            } else {
                auto top = pq.top();
                if (arr[i] == top.first) {
                    // same value as an existing tail -> start a new subsequence
                    pq.push({arr[i], 1});
                    ++i;
                } else if (arr[i] == top.first + 1) {
                    // extend the shortest subsequence that ends at top.first
                    pq.pop();
                    pq.push({arr[i], top.second + 1});
                    ++i;
                } else {
                    // arr[i] > top.first + 1 => top subsequence cannot be extended anymore
                    if (top.second < k) return false;
                    pq.pop();
                }
            }
        }

        // All items processed. Check remaining subsequences length.
        while (!pq.empty()) {
            if (pq.top().second < k) return false;
            pq.pop();
        }
        return true;
    }
};
```

---

### Java

```java
import java.util.PriorityQueue;
import java.util.Arrays;
import java.util.Comparator;

class Solution {
    public boolean isPossible(int[] arr, int k) {
        Arrays.sort(arr);

        PriorityQueue<int[]> pq = new PriorityQueue<>(new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                if (a[0] == b[0]) return a[1] - b[1];
                return a[0] - b[0];
            }
        });

        int i = 0, n = arr.length;
        while (i < n) {
            if (pq.isEmpty()) {
                pq.add(new int[]{arr[i], 1});
                i++;
            } else {
                int[] top = pq.peek();
                if (arr[i] == top[0]) {
                    pq.add(new int[]{arr[i], 1});
                    i++;
                } else if (arr[i] == top[0] + 1) {
                    pq.poll();
                    pq.add(new int[]{arr[i], top[1] + 1});
                    i++;
                } else {
                    if (top[1] < k) return false;
                    pq.poll();
                }
            }
        }

        while (!pq.isEmpty()) {
            if (pq.peek()[1] < k) return false;
            pq.poll();
        }
        return true;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    isPossible(arr, k) {
        arr.sort((a,b) => a - b);

        class MinHeap {
            constructor() { this.a = []; }
            compare(i, j) {
                let A = this.a[i], B = this.a[j];
                if (A[0] !== B[0]) return A[0] < B[0];
                return A[1] < B[1];
            }
            swap(i, j) { [this.a[i], this.a[j]] = [this.a[j], this.a[i]]; }
            push(x) {
                this.a.push(x);
                let i = this.a.length - 1;
                while (i > 0) {
                    let p = Math.floor((i - 1) / 2);
                    if (this.compare(i, p)) { this.swap(i, p); i = p; } else break;
                }
            }
            pop() {
                if (this.a.length === 0) return null;
                let ret = this.a[0];
                if (this.a.length === 1) { this.a.pop(); return ret; }
                this.a[0] = this.a.pop();
                let i = 0, n = this.a.length;
                while (true) {
                    let l = 2*i + 1, r = 2*i + 2, smallest = i;
                    if (l < n && this.compare(l, smallest)) smallest = l;
                    if (r < n && this.compare(r, smallest)) smallest = r;
                    if (smallest !== i) { this.swap(i, smallest); i = smallest; } else break;
                }
                return ret;
            }
            peek() { return this.a.length ? this.a[0] : null; }
            isEmpty() { return this.a.length === 0; }
        }

        const pq = new MinHeap();
        let i = 0, n = arr.length;
        while (i < n) {
            if (pq.isEmpty()) {
                pq.push([arr[i], 1]);
                i++;
            } else {
                let top = pq.peek();
                if (arr[i] === top[0]) {
                    pq.push([arr[i], 1]);
                    i++;
                } else if (arr[i] === top[0] + 1) {
                    pq.pop();
                    pq.push([arr[i], top[1] + 1]);
                    i++;
                } else {
                    if (top[1] < k) return false;
                    pq.pop();
                }
            }
        }

        while (!pq.isEmpty()) {
            let t = pq.pop();
            if (t[1] < k) return false;
        }
        return true;
    }
}
```

---

### Python3

```python3
import heapq

class Solution:
    def isPossible(self, arr, k):
        arr.sort()
        pq = []  # heap of (lastValue, length)
        i, n = 0, len(arr)
        while i < n:
            if not pq:
                heapq.heappush(pq, (arr[i], 1))
                i += 1
            else:
                val, length = pq[0]
                if arr[i] == val:
                    heapq.heappush(pq, (arr[i], 1))
                    i += 1
                elif arr[i] == val + 1:
                    heapq.heappop(pq)
                    heapq.heappush(pq, (arr[i], length + 1))
                    i += 1
                else:
                    if length < k:
                        return False
                    heapq.heappop(pq)

        while pq:
            if pq[0][1] < k:
                return False
            heapq.heappop(pq)
        return True
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I explain the core logic in an easy step-by-step manner. The code in each language implements the same sequence of operations, so this explanation applies to all.

1. **Sort the array** (if input is not guaranteed sorted). Sorting ensures that when we iterate left-to-right we only need to consider extending subsequences with the next larger numbers.

2. **Use a min-heap** that stores pairs `(lastValue, length)`. The heap is ordered so the pair with the smallest `lastValue` is at the top; if `lastValue` ties, the subsequence with the smallest `length` comes first. That helps us always extend the shortest eligible subsequence.

3. **Iterate elements**: For each element `x`:

   * If heap is empty: start new subsequence `(x,1)`.
   * Else get top `(v,len)`:

     * If `x == v`: We cannot extend subsequence ending at `v` with `x` (it would require `v+1`). So we must start a new subsequence `(x,1)`.
     * If `x == v+1`: We can extend the top subsequence. Pop it and push `(x, len+1)`.
     * If `x > v+1`: The top subsequence can never be extended by current `x` or any future elements (since array sorted), so finalize it. If `len < k` return `false` because it's too short. Pop it and re-check with the same `x`.

4. **After loop**: Ensure every remaining subsequence in heap has `length >= k`. If any is shorter, return `false`.

5. **Return `true`** if all subsequences meet the length requirement.

This step-by-step greedy method ensures we always give priority to finishing short subsequences, which is necessary to avoid leaving a short subsequence that cannot be completed later.

## Examples

* Example 1: `arr = [1,2,3,3,4,4,5,5], k = 3` → `true`
  Possible split: `[1,2,3,4,5]` and `[3,4,5]` (or other equivalent splits).

* Example 2: `arr = [1,2,3,4], k = 3` → `false`
  We can build `[1,2,3]` and leftover `[4]` which has length 1 < 3.

* Example 3: `arr = [1,1,2,2,3,3], k = 3` → `true`
  Build `[1,2,3]` and `[1,2,3]`.

## How to use / Run locally

1. Create a project folder and a file for the language of your choice (e.g., `solution.cpp`, `Solution.java`, `solution.js`, `solution.py`).
2. Copy the corresponding code block into the file.
3. Compile/run:

   * **C++**: `g++ solution.cpp -O2 -std=c++17 -o solution && ./solution`
   * **Java**: `javac Solution.java && java Solution`
   * **JavaScript** (Node.js): `node solution.js`
   * **Python3**: `python3 solution.py`

Add a small driver or main function to feed input arrays and `k` to the `isPossible` function and print results. The included classes implement the logic; you can wrap them with I/O code as required.

## Notes & Optimizations

* There is an alternative O(n) average approach using two hash maps: a frequency map for remaining counts and a "tails" map for how many subsequences currently end at a certain value. That approach avoids an explicit heap and can be faster in practice. If you want, I can add that hash-map approach in all languages.
* If the input is guaranteed sorted by the problem statement, skip the sort to save `O(n log n)` time.
* If `k == 1`, the function always returns `true`.

## Author

* [Md. Aarzoo Islam](https://bento.me/withaarzoo)
