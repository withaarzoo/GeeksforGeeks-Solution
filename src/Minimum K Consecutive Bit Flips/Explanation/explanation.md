# Minimum K Consecutive Bit Flips

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
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

You are given a binary array `arr[]` (only `0`s and `1`s) and an integer `k`.
In one operation you can choose a contiguous subarray of length `k` and flip all bits inside it (0 → 1, 1 → 0).
Return the **minimum** number of such operations required so that the entire array contains only `1`s. If it is impossible, return `-1`.

---

## Constraints

* `1 ≤ arr.size() ≤ 10^6`
* `1 ≤ k ≤ arr.size()`
* Bits are `0` or `1`.

---

## Intuition

I thought greedily. If at position `i` the **effective** bit (after considering any earlier flips that still affect `i`) is `0`, then I must flip the window starting at `i` — there is no benefit in delaying or flipping a later window because only windows that start at indices `≤ i` can affect `i`, and earlier decisions are already fixed.
To track which earlier flips still affect the current index without paying O(k) per flip, I keep a parity (0 or 1) that says whether an odd number of active flips are currently affecting `i`. I also mark flip starts so that when I pass beyond `i+k-1` I can remove that flip's effect. This yields an O(n) algorithm.

---

## Approach

1. Set `n = len(arr)`.
2. Maintain `flips` — the parity (0 or 1) of active flips affecting current index.
3. Iterate `i` from `0` to `n-1`:

   * If `i >= k` and a flip started at `i-k`, its effect ends now; toggle `flips`.
   * Effective bit = `(original bit) XOR flips`. If effective bit is `0`, we need to flip the window starting at `i`.
   * If `i + k > n`, flipping isn't possible → return `-1`.
   * Otherwise: increment answer, toggle `flips`, and mark that we started a flip at `i`.
4. Return the number of flips used.

**Key tricks:**

* Mark flip starts by adding `2` to the array element (or use a separate `diff` array). When reading the original bit use `(arr[i] & 1)` to ignore the mark.
* `flips` is toggled when a flip starts and when its effect ends (at index `i+k`).

---

## Data Structures Used

* The input array `arr` (we reuse it to mark flip starts with `+2`).
* A few integer variables (`flips`, `ans`, `n`).
* (Alternative) a `diff` array of length `n` (if we cannot modify input).

---

## Operations & Behavior Summary

* `O(1)` work per index: check end-of-effect, compute effective bit, start a flip if necessary.
* Marking flip starts allows O(1) detection when a flip effect expires.
* No nested loops and no repeated scanning of windows — every index is visited once.

---

## Complexity

* **Time Complexity:** `O(n)` where `n` is the number of elements in `arr`. Each index is processed exactly once with O(1) operations.
* **Space Complexity:** `O(1)` extra space when I reuse `arr` to mark flip starts (by adding 2). If I must not mutate the input, I can use a `diff` array and the extra space becomes `O(n)`.

---

## Multi-language Solutions

### C++

```c++
#include <vector>
using namespace std;

class Solution {
  public:
    int kBitFlips(vector<int>& arr, int k) {
        int n = arr.size();
        int flips = 0;   // parity of active flips (0 or 1)
        int ans = 0;     // total flips performed

        for (int i = 0; i < n; ++i) {
            // A flip that started at i-k stops affecting index i now.
            if (i >= k && arr[i - k] > 1) { // arr[x] > 1 indicates we added +2 as mark
                flips ^= 1;
            }

            // Effective bit after considering active flips:
            int bit = (arr[i] & 1) ^ flips;
            if (bit == 0) { // we must flip here
                if (i + k > n) return -1; // can't flip — window overflows
                ++ans;
                flips ^= 1;       // new flip now affects following indices
                arr[i] += 2;      // mark that a flip started at i
            }
        }
        return ans;
    }
};
```

---

### Java

```java
class Solution {
    public int kBitFlips(int[] arr, int k) {
        int n = arr.length;
        int flips = 0; // parity of active flips
        int ans = 0;

        for (int i = 0; i < n; ++i) {
            if (i >= k && arr[i - k] > 1) {
                flips ^= 1;
            }

            int bit = (arr[i] & 1) ^ flips;
            if (bit == 0) {
                if (i + k > n) return -1;
                ans++;
                flips ^= 1;
                arr[i] += 2;
            }
        }
        return ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
class Solution {
    kBitFlips(arr, k) {
        const n = arr.length;
        let flips = 0; // parity: 0 or 1
        let ans = 0;

        for (let i = 0; i < n; ++i) {
            if (i >= k && arr[i - k] > 1) {
                flips ^= 1;
            }

            const bit = (arr[i] & 1) ^ flips;
            if (bit === 0) {
                if (i + k > n) return -1;
                ans += 1;
                flips ^= 1;
                arr[i] += 2;
            }
        }
        return ans;
    }
}
```

---

### Python3

```python3
class Solution:
    def kBitFlips(self, arr, k):
        n = len(arr)
        flips = 0  # parity of active flips
        ans = 0

        for i in range(n):
            # If a flip started at i-k, it stops affecting i now.
            if i >= k and arr[i - k] > 1:
                flips ^= 1

            bit = (arr[i] & 1) ^ flips
            if bit == 0:
                if i + k > n:
                    return -1
                ans += 1
                flips ^= 1
                arr[i] += 2  # mark start of flip

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I'll explain the core idea and then map it to the code (same logic across all languages).

**1. Why greedy?**

* If at index `i` the effective bit is `0`, then some flip that includes `i` must flip it later. But any flip that starts after `i` cannot change `i`, and earlier flips are already fixed. So the only possible action to fix `i` is to start a flip at `i`. Hence greedy: fix `i` now if needed.

**2. Tracking active flips with parity:**

* `flips` indicates how many flips (mod 2) currently affect index `i`. If `flips == 1`, the original bit is toggled; if `0`, it stays original.
* When we start a flip at `i`, we `flips ^= 1`. When we pass index `i + k`, we must remove that flip's effect (toggle back `flips`).

**3. How to know when a past flip ends cheaply:**

* When we start a flip at index `i`, we mark `arr[i] += 2`. This doesn't change `(arr[i] & 1)`, so reading original bit remains correct.
* Later, when we get to index `j = i + k`, we inspect `arr[j - k]` and if it's `> 1` we know a flip started `k` positions ago; thus we toggle `flips` to remove that effect.

**4. Walk through the main loop (pseudo-annotated):**

```text
for i in 0..n-1:
  if i >= k and arr[i-k] > 1:
    flips ^= 1                # flip that started at i-k expired
  bit = (arr[i] & 1) ^ flips  # effective bit now
  if bit == 0:
    if i+k > n: return -1     # can't flip — not enough space
    ans += 1                  # we perform a flip starting at i
    flips ^= 1                # the flip starts affecting from i..i+k-1
    arr[i] += 2               # mark this start so we can detect its end later
```

**5. Important line explanations:**

* `(arr[i] & 1)`: fetches the original 0/1 ignoring our `+2` marks.
* `arr[i] += 2`: mark used to remember a flip start.
* `if (i + k > n) return -1`: If there's not enough room to flip a length-`k` window starting at `i`, it's impossible.

**6. Example walk-through (quick):**
`arr = [1,1,0,0,1,1,0,1,1,1], k = 2`

* i=0: effective 1 → do nothing
* i=1: effective 1 → do nothing
* i=2: effective 0 → flip at 2, mark arr[2]+=2, ans=1
* ... continue, track flips parity and remove marks when passing i-k. Final ans = 4.

---

## Examples

1. Example 1

* Input: `arr = [1,1,0,0,1,1,0,1,1,1]`, `k = 2`
* Output: `4`

2. Example 2

* Input: `arr = [0,0,1,1,1,0,0]`, `k = 3`
* Output: `-1`
* Explanation: You cannot make all bits `1` with any number of length-3 flips.

---

## How to use / Run locally

Below are small test harnesses and commands to compile/run each language. Copy the solution code into a file and add the shown `main` / test harness.

### C++

Create `main.cpp`:

```c++
#include <iostream>
#include <vector>
using namespace std;

// paste Solution class here (from above)

int main() {
    vector<int> arr = {1,1,0,0,1,1,0,1,1,1};
    int k = 2;
    Solution s;
    cout << s.kBitFlips(arr, k) << "\n"; // expected 4
    return 0;
}
```

Compile & run:

```bash
g++ -std=c++17 -O2 main.cpp -o run
./run
```

### Java

Create `Main.java`:

```java
public class Main {
    public static void main(String[] args) {
        int[] arr = {1,1,0,0,1,1,0,1,1,1};
        int k = 2;
        Solution sol = new Solution();
        System.out.println(sol.kBitFlips(arr, k)); // expected 4
    }
}

// paste Solution class here (from above)
```

Compile & run:

```bash
javac Main.java
java Main
```

### JavaScript (Node.js)

Create `run.js`:

```javascript
// paste Solution class here (from above)

const sol = new Solution();
const arr = [1,1,0,0,1,1,0,1,1,1];
const k = 2;
console.log(sol.kBitFlips(arr, k)); // expected 4
```

Run:

```bash
node run.js
```

### Python3

Create `run.py`:

```python3
# paste Solution class here (from above)

if __name__ == "__main__":
    arr = [1,1,0,0,1,1,0,1,1,1]
    k = 2
    sol = Solution()
    print(sol.kBitFlips(arr, k))  # expected 4
```

Run:

```bash
python3 run.py
```

> Note: All provided implementations **modify** `arr` (they add `2` to mark flip starts). If you must preserve the original array, either copy it first or use the alternative `diff` method described in the Notes.

---

## Notes & Optimizations

* **Why O(1) extra space?** I reuse `arr` to store markers (`+2`) and only keep a few ints for parity and answer — this avoids an additional `diff` array.
* **If input must not be mutated:** Use a `diff` array (or deque) technique:

  * Maintain `diff` (initialized 0s). When I start a flip at `i`, set `diff[i] = 1` and when passing `i+k` set `diff[i+k] = -1` (prefix sum gives active flips). This keeps O(n) time but uses O(n) extra space.
* **k == 1:** Trivial — count zeros (each zero needs one flip).
* **Large n constraints:** The O(n) algorithm handles `n` up to `10^6` easily if implemented carefully.
* **Alternative marking symbol:** Instead of `+2` you can store boolean `true` in a separate `started` array to mark starts (uses O(n) extra space).

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)
