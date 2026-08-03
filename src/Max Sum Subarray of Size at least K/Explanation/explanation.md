# Max Sum Subarray of Size at least K | GeeksforGeeks Solution | Sliding Window + Kadane's Algorithm

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

In this problem, we are given an integer array and a value `k`. The goal is to find the maximum possible sum among all contiguous subarrays whose length is **greater than or equal to** `k`.

Unlike the classic maximum subarray problem, we cannot simply use Kadane's Algorithm because the subarray must contain at least `k` elements. At the same time, checking every possible subarray would be far too slow for the given constraints.

The challenge is to combine an efficient sliding window with Kadane's Algorithm so that every valid subarray is considered in linear time.

This is a popular GeeksforGeeks DSA problem that tests your understanding of arrays, dynamic programming, Kadane's Algorithm, and sliding window techniques.

---

## Constraints

| Constraint | Value |
| ------------ | ------- |
| Array Size | `1 ≤ n ≤ 10^5` |
| Array Element | `-10^4 ≤ arr[i] ≤ 10^4` |
| K | `1 ≤ k ≤ n` |

---

## Intuition

The first thing I noticed was that the subarray length is **at least** `k`, not exactly `k`.

If the length were exactly `k`, a normal sliding window would solve the problem immediately.

The tricky part is that I can also extend the current window if adding previous elements increases the total sum.

Instead of trying every possible extension, I realized I could first calculate the best possible subarray ending at every index using Kadane's Algorithm. Then, while sliding a window of size `k`, I can instantly decide whether attaching that previous subarray improves the answer.

This combines two well-known techniques into one efficient solution.

---

## Approach

I solve the problem in two passes.

First, I build an array where each position stores the maximum sum of a subarray ending exactly at that index. This is calculated using Kadane's Algorithm.

Next, I calculate the sum of the first `k` elements.

Then I slide the window one position at a time.

For every window, I consider two possibilities:

- Use only the current window.
- Extend the current window by attaching the best subarray that ends immediately before the window begins.

Whichever produces the larger sum becomes the candidate answer.

Since each element is processed only a constant number of times, the solution runs in linear time.

---

## Data Structures Used

| Data Structure | Purpose |
| --------------- | --------- |
| Array | Stores the original input values |
| Integer Variable | Maintains the current sliding window sum |
| Dynamic Array | Stores the maximum subarray sum ending at each index using Kadane's Algorithm |

No additional complex data structures such as stacks, queues, heaps, or trees are required.

---

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Read the input array.
2. Build the Kadane array containing the best subarray ending at every position.
3. Compute the sum of the first `k` elements.
4. Store it as the initial answer.
5. Slide the window across the array.
6. Update the window sum by removing one element and adding one new element.
7. Compare:
   - current window sum
   - current window sum plus the best previous subarray
8. Update the maximum answer.
9. Return the final result.

---

## Complexity

| Metric | Complexity | Explanation |
| --------- | ------------ | ------------- |
| Time Complexity | **O(n)** | The Kadane pass and sliding window pass each visit every element exactly once. |
| Space Complexity | **O(n)** | One additional array is used to store the maximum subarray sum ending at every index. |

Where:

- `n` is the number of elements in the input array.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxSumWithK(vector<int>& arr, int k) {
        int n = arr.size();

        // bestEndingHere[i] stores the maximum sum subarray
        // that ends exactly at index i.
        vector<int> bestEndingHere(n);

        // Base case for Kadane's algorithm.
        bestEndingHere[0] = arr[0];

        // Build Kadane array.
        for (int i = 1; i < n; i++) {
            // Either start fresh from arr[i]
            // or extend the previous subarray.
            bestEndingHere[i] = max(arr[i], bestEndingHere[i - 1] + arr[i]);
        }

        // Calculate the first window of size k.
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        // First valid answer.
        int ans = windowSum;

        // Slide the window.
        for (int i = k; i < n; i++) {

            // Remove the left element.
            windowSum -= arr[i - k];

            // Add the new right element.
            windowSum += arr[i];

            // Window alone is a valid answer.
            ans = max(ans, windowSum);

            // Extend the window using the best subarray
            // ending just before the window starts.
            ans = max(ans, windowSum + bestEndingHere[i - k]);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int maxSumWithK(int[] arr, int k) {

        int n = arr.length;

        // bestEndingHere[i] stores the maximum sum subarray
        // ending exactly at index i.
        int[] bestEndingHere = new int[n];

        // Base case.
        bestEndingHere[0] = arr[0];

        // Build Kadane array.
        for (int i = 1; i < n; i++) {
            // Either start new or extend previous.
            bestEndingHere[i] = Math.max(arr[i], bestEndingHere[i - 1] + arr[i]);
        }

        // Sum of first k elements.
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        // Initial answer.
        int ans = windowSum;

        // Slide the window.
        for (int i = k; i < n; i++) {

            // Remove left element.
            windowSum -= arr[i - k];

            // Add new right element.
            windowSum += arr[i];

            // Take only current window.
            ans = Math.max(ans, windowSum);

            // Extend using Kadane result.
            ans = Math.max(ans, windowSum + bestEndingHere[i - k]);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */

class Solution {
    maxSumWithK(arr, k) {

        const n = arr.length;

        // bestEndingHere[i] stores the maximum sum
        // of a subarray ending exactly at i.
        const bestEndingHere = new Array(n);

        // Base case.
        bestEndingHere[0] = arr[0];

        // Build Kadane array.
        for (let i = 1; i < n; i++) {

            // Either start new or extend previous.
            bestEndingHere[i] = Math.max(
                arr[i],
                bestEndingHere[i - 1] + arr[i]
            );
        }

        // First window sum.
        let windowSum = 0;

        for (let i = 0; i < k; i++) {
            windowSum += arr[i];
        }

        // Initial answer.
        let ans = windowSum;

        // Slide the window.
        for (let i = k; i < n; i++) {

            // Remove left element.
            windowSum -= arr[i - k];

            // Add new right element.
            windowSum += arr[i];

            // Current window only.
            ans = Math.max(ans, windowSum);

            // Current window + best previous extension.
            ans = Math.max(ans, windowSum + bestEndingHere[i - k]);
        }

        return ans;
    }
};
```

### Python3

```python
class Solution:
    def maxSumWithK(self, arr: list[int], k: int) -> int:

        n = len(arr)

        # bestEndingHere[i] stores the maximum sum
        # of a subarray ending exactly at index i.
        bestEndingHere = [0] * n

        # Base case.
        bestEndingHere[0] = arr[0]

        # Build Kadane array.
        for i in range(1, n):
            # Either start a new subarray
            # or extend the previous one.
            bestEndingHere[i] = max(
                arr[i],
                bestEndingHere[i - 1] + arr[i]
            )

        # Sum of first window of size k.
        windowSum = sum(arr[:k])

        # Initial answer.
        ans = windowSum

        # Slide the window.
        for i in range(k, n):

            # Remove left element.
            windowSum -= arr[i - k]

            # Add new right element.
            windowSum += arr[i]

            # Window alone.
            ans = max(ans, windowSum)

            # Window + best extension.
            ans = max(ans, windowSum + bestEndingHere[i - k])

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is exactly the same in every language. Only the syntax changes.

The first step is creating an array that stores the maximum subarray sum ending at every position.

For every element, there are only two choices.

Either start a completely new subarray from the current element, or extend the previous maximum subarray.

This is exactly how Kadane's Algorithm works.

Once this preprocessing is finished, the algorithm calculates the first window containing exactly `k` elements.

That window is already a valid answer because its size satisfies the condition.

Next, the algorithm moves the window one position at a time.

Instead of recalculating the entire window sum, it removes the leftmost element and adds the next element entering the window.

This keeps every update in constant time.

For every window, two answers are checked.

The first answer is simply the current window.

The second answer extends that window using the maximum subarray ending immediately before the window starts.

Since the Kadane array already contains that information, no additional searching is needed.

The larger value becomes the current best answer.

This process continues until the window reaches the end of the array.

Because every element participates in a constant number of operations, the entire algorithm runs efficiently even for the largest allowed input size.

---

## Examples

### Example 1

**Input**

```text
arr = [1, -2, 2, -3]
k = 3
```

**Output**

```text
1
```

**Trace**

- First valid window = `[1, -2, 2]`
- Sum = `1`
- Extending the window does not improve the answer.
- Final answer = `1`

---

### Example 2

**Input**

```text
arr = [1, 1, 1, 1, 1, 1]
k = 2
```

**Output**

```text
6
```

**Trace**

- Every extension increases the total sum.
- The entire array becomes the best valid subarray.
- Final answer = `6`

---

### Example 3

**Input**

```text
arr = [-4, -2, 1, -3]
k = 2
```

**Output**

```text
-1
```

**Trace**

- Window `[-4, -2]` gives `-6`
- Window `[-2, 1]` gives `-1`
- Window `[1, -3]` gives `-2`
- Maximum valid sum is `-1`

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
cd <repository-name>
```

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run using Node.js

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

or

```bash
python3 solution.py
```

---

## Notes & Optimizations

- A brute-force solution checks every possible subarray and requires `O(n²)` time.
- A simple sliding window alone cannot solve this problem because the subarray length can be larger than `k`.
- Kadane's Algorithm alone also cannot solve the problem because it does not enforce the minimum length requirement.
- Combining Kadane's Algorithm with a sliding window produces an optimal linear-time solution.
- This approach works correctly even when all numbers are negative.
- The algorithm processes every array element only a constant number of times, making it suitable for arrays with up to `10^5` elements.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
