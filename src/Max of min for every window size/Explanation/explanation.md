# Max of Min for Every Window Size

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

I am given an integer array `arr[]`. For every window size `k` (where `1 ≤ k ≤ n`, and `n = arr.length`), I must determine the maximum among all minimum values of every contiguous subarray of length `k`.

More plainly: for each window size `k`, consider every contiguous subarray of length `k`, take the minimum of each such subarray, and then take the maximum of those minima. Return an array `ans` of length `n` where `ans[k-1]` is the answer for window size `k`.

## Constraints

* `1 ≤ n = arr.length ≤ 10^5`
* `1 ≤ arr[i] ≤ 10^6`
* Time limits on platforms require `O(n)` or `O(n log n)` solutions — `O(n^2)` will TLE for large inputs.

## Intuition

I thought about how each element can serve as the minimum of multiple windows. If I know the largest window (span) where a given element remains the minimum, then that element is a candidate for that window length. So, for each element `arr[i]`, I want to find how far it can extend left and right without encountering a strictly smaller element. That span gives me the **maximum window length** where `arr[i]` is the minimum. I can then update the best (maximum) minimum for that length.

To compute the left/right limits efficiently, I used monotonic stacks (previous smaller and next smaller indices) which run in linear time.

## Approach

1. Compute `left[i]`: index of the previous smaller element to the left of `i` (or `-1` if none).
2. Compute `right[i]`: index of the next smaller element to the right of `i` (or `n` if none).
3. The maximum window length where `arr[i]` is minimum equals `len = right[i] - left[i] - 1`.
4. Maintain an `answer` array of size `n+1` where `answer[len] = max(answer[len], arr[i])`.
5. After processing all elements, some `answer[len]` might be `0` (no direct assignment). Those sizes should inherit the max from larger window sizes: iterate from `n-1` down to `1` and set `answer[len] = max(answer[len], answer[len+1])`.
6. Return `answer[1..n]`.

This is `O(n)` time and `O(n)` space.

## Data Structures Used

* Arrays (`vector<int>`, `int[]`, `[]`): to store `left`, `right`, and `answer`.
* Monotonic stack (implemented as `deque`, `ArrayDeque`, or plain `[]`/`vector`): to compute previous and next smaller indices efficiently.

## Operations & Behavior Summary

* Build `left[]` by iterating left-to-right and maintaining a strictly increasing stack of values' indices (pop while `arr[stack.top] >= arr[i]`).
* Build `right[]` by iterating right-to-left with the same monotonic logic.
* For each index, compute the span and update `answer[span]`.
* Propagate the maxima from larger spans to smaller spans to ensure every `k` gets the best possible value.

## Complexity

* **Time Complexity:** `O(n)` where `n = arr.length`. We perform two stack passes plus linear aggregation and propagation.
* **Space Complexity:** `O(n)` for `left`, `right`, and `answer` arrays (plus stack space which is `O(n)` in worst case).

## Multi-language Solutions

Below are complete and production-ready implementations for each language. Each snippet includes a small `main` / sample usage so you can run locally.

### C++

```c++
// File: max_of_min.cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> maxOfMins(const vector<int>& arr) {
    int n = arr.size();
    if (n == 0) return {};
    vector<int> left(n), right(n);
    deque<int> st;

    // previous smaller (strictly smaller)
    for (int i = 0; i < n; ++i) {
        while (!st.empty() && arr[st.back()] >= arr[i]) st.pop_back();
        left[i] = st.empty() ? -1 : st.back();
        st.push_back(i);
    }

    st.clear();

    // next smaller (strictly smaller)
    for (int i = n - 1; i >= 0; --i) {
        while (!st.empty() && arr[st.back()] >= arr[i]) st.pop_back();
        right[i] = st.empty() ? n : st.back();
        st.push_back(i);
    }

    vector<int> answer(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        int len = right[i] - left[i] - 1;
        answer[len] = max(answer[len], arr[i]);
    }

    for (int len = n - 1; len >= 1; --len)
        answer[len] = max(answer[len], answer[len + 1]);

    vector<int> res(n);
    for (int i = 1; i <= n; ++i) res[i - 1] = answer[i];
    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<int> arr = {10, 20, 30, 50, 10, 70, 30};
    auto res = maxOfMins(arr);
    for (int x : res) cout << x << " ";
    cout << '\n';
    return 0;
}
```

### Java

```java
// File: Main.java
import java.util.*;

public class Main {
    public static int[] maxOfMins(int[] arr) {
        int n = arr.length;
        if (n == 0) return new int[0];

        int[] left = new int[n];
        int[] right = new int[n];
        ArrayDeque<Integer> st = new ArrayDeque<>();

        // previous smaller
        for (int i = 0; i < n; ++i) {
            while (!st.isEmpty() && arr[st.peekLast()] >= arr[i]) st.removeLast();
            left[i] = st.isEmpty() ? -1 : st.peekLast();
            st.addLast(i);
        }

        st.clear();

        // next smaller
        for (int i = n - 1; i >= 0; --i) {
            while (!st.isEmpty() && arr[st.peekLast()] >= arr[i]) st.removeLast();
            right[i] = st.isEmpty() ? n : st.peekLast();
            st.addLast(i);
        }

        int[] answer = new int[n + 1]; // default 0
        for (int i = 0; i < n; ++i) {
            int len = right[i] - left[i] - 1;
            answer[len] = Math.max(answer[len], arr[i]);
        }

        for (int len = n - 1; len >= 1; --len)
            answer[len] = Math.max(answer[len], answer[len + 1]);

        int[] res = new int[n];
        for (int i = 1; i <= n; ++i) res[i - 1] = answer[i];
        return res;
    }

    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 50, 10, 70, 30};
        int[] res = maxOfMins(arr);
        System.out.println(Arrays.toString(res));
    }
}
```

### JavaScript

```javascript
// File: max_of_min.js
class Solution {
    maxOfMins(arr) {
        const n = arr.length;
        if (n === 0) return [];
        const left = new Array(n);
        const right = new Array(n);
        const st = [];

        // previous smaller
        for (let i = 0; i < n; ++i) {
            while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop();
            left[i] = st.length ? st[st.length - 1] : -1;
            st.push(i);
        }

        st.length = 0;

        // next smaller
        for (let i = n - 1; i >= 0; --i) {
            while (st.length && arr[st[st.length - 1]] >= arr[i]) st.pop();
            right[i] = st.length ? st[st.length - 1] : n;
            st.push(i);
        }

        const answer = new Array(n + 1).fill(0);
        for (let i = 0; i < n; ++i) {
            const len = right[i] - left[i] - 1;
            answer[len] = Math.max(answer[len], arr[i]);
        }

        for (let len = n - 1; len >= 1; --len) {
            answer[len] = Math.max(answer[len], answer[len + 1]);
        }

        const res = [];
        for (let i = 1; i <= n; ++i) res.push(answer[i]);
        return res;
    }
}

// sample usage
const arr = [10, 20, 30, 50, 10, 70, 30];
const sol = new Solution();
console.log(sol.maxOfMins(arr));
```

### Python3

```python3
# File: max_of_min.py

def max_of_mins(arr):
    n = len(arr)
    if n == 0:
        return []
    left = [-1] * n
    right = [n] * n
    st = []

    # previous smaller
    for i in range(n):
        while st and arr[st[-1]] >= arr[i]:
            st.pop()
        left[i] = st[-1] if st else -1
        st.append(i)

    st.clear()

    # next smaller
    for i in range(n - 1, -1, -1):
        while st and arr[st[-1]] >= arr[i]:
            st.pop()
        right[i] = st[-1] if st else n
        st.append(i)

    answer = [0] * (n + 1)
    for i in range(n):
        length = right[i] - left[i] - 1
        if arr[i] > answer[length]:
            answer[length] = arr[i]

    for length in range(n - 1, 0, -1):
        if answer[length + 1] > answer[length]:
            answer[length] = answer[length + 1]

    return answer[1:]

if __name__ == '__main__':
    arr = [10, 20, 30, 50, 10, 70, 30]
    print(max_of_mins(arr))
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I will explain the algorithm step-by-step and map it to the code above. The logic is identical across languages, only syntax differs.

1. **Find previous smaller index (`left[i]`) for every `i`:**

   * Walk left-to-right.
   * Maintain a stack of indices whose corresponding values are strictly increasing. When processing `i`, pop indices while `arr[stack.top] >= arr[i]` (because they cannot be previous smaller for future indexes). After pops, the top (if any) is `left[i]`.
   * Complexity: overall linear because each index is pushed and popped at most once.

2. **Find next smaller index (`right[i]`) for every `i`:**

   * Walk right-to-left with the same monotonic concept. After processing, `right[i]` stores the first index to the right with a strictly smaller value, or `n` if none.

3. **Compute maximum span for which `arr[i]` is the minimum:**

   * `len = right[i] - left[i] - 1`.
   * Update `answer[len] = max(answer[len], arr[i])`.

4. **Fill gaps by propagation:**

   * Some `answer[len]` may remain 0 because no element had exactly that maximal span. However, a value valid for a larger span `L` is also a candidate for smaller spans `< L`. So we iterate `len` from `n-1` down to `1` and set `answer[len] = max(answer[len], answer[len+1])`.

5. **Return `answer[1..n]`**

Each code file implements these steps with small syntax differences but the same logic.

## Examples

1. Input: `[10, 20, 30, 50, 10, 70, 30]`

   * Output: `[70, 30, 20, 10, 10, 10, 10]`

2. Input: `[10, 20, 30]`

   * Output: `[30, 20, 10]`

## How to use / Run locally

**C++**

```bash
g++ -std=c++17 max_of_min.cpp -O2 -o max_of_min
./max_of_min
```

**Java**

```bash
javac Main.java
java Main
```

**JavaScript (Node.js)**

```bash
node max_of_min.js
```

**Python3**

```bash
python3 max_of_min.py
```

**Go**

```bash
go run max_of_min.go
```

## Notes & Optimizations

* Using `>=` when popping from the stack ensures we find the first **strictly smaller** element on both sides and prevents counting equal elements twice incorrectly. This is the standard technique to define a unique span for each element.
* Use non-synchronized stacks / deques in languages like Java (`ArrayDeque`) to avoid overhead from synchronized `Stack`.
* Pre-allocate arrays (`ans`, `left`, `right`) to avoid dynamic growth and reduce GC overhead.
* Keep everything in primitive arrays (or equivalent) for speed in tight loops.
* The algorithm is linear and is the accepted solution on competitive platforms for the given constraints.

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
