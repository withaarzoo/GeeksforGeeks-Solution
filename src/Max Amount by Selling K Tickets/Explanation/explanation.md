# Max Amount by Selling K Tickets

A greedy algorithm and max heap based solution for the GeeksforGeeks problem **Max Amount by Selling K Tickets**. This repository contains an optimized approach along with implementations in multiple programming languages. The solution is designed to be efficient, beginner-friendly, and easy to understand while meeting the expected time complexity.

---

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

You are given an array where each element represents the number of tickets available with a seller.

The price of a ticket is always equal to the number of tickets that seller currently has. After selling one ticket, the seller's remaining tickets decrease by one, which also reduces the price of the next ticket from that seller.

Your task is to sell at most **k** tickets in a way that produces the maximum possible total earnings.

Since the ticket prices keep changing after every sale, choosing the right seller at each step becomes the key part of the problem.

This problem is a classic example of a **Greedy Algorithm** combined with a **Max Heap (Priority Queue)**.

---

## Constraints

| Constraint | Value |
|------------|-------|
| `1 ≤ arr.size()` | `10^5` |
| `1 ≤ arr[i]` | `10^6` |
| `1 ≤ k` | `10^6` |

---

## Intuition

The first thing I noticed was that every ticket should be sold from the seller who currently offers the highest ticket price.

Since the ticket price is always equal to the seller's remaining tickets, selling from the seller with the largest value always gives the maximum profit for that particular sale.

The challenge is that after every sale, that seller's value changes. So I need a data structure that can quickly tell me which seller has the highest value after every update.

A Max Heap is perfect for this job because it lets me remove and insert the largest value efficiently.

---

## Approach

1. Create a Max Heap and insert the ticket count of every seller.
2. Repeat the process until either `k` tickets have been sold or no seller has tickets left.
3. Remove the seller with the highest ticket count.
4. Add that value to the answer because it is the current ticket price.
5. Decrease the seller's ticket count by one.
6. If the seller still has tickets remaining, insert the updated value back into the heap.
7. Return the final answer modulo `10^9 + 7`.

This greedy strategy always produces the maximum possible profit because every sale chooses the highest available ticket price.

---

## Data Structures Used

| Data Structure | Why It Is Used |
|---------------|----------------|
| Max Heap (Priority Queue) | Quickly finds the seller with the highest current ticket price. |
| Integer Variables | Store the running answer, current seller value, and modulo calculations. |

---

## Operations & Behavior Summary

The algorithm performs these steps repeatedly:

- Insert every seller into a Max Heap.
- Pick the seller with the highest remaining tickets.
- Sell one ticket.
- Add its current value to the answer.
- Reduce the seller's remaining tickets.
- Put the seller back into the heap if tickets are still available.
- Continue until all required tickets are sold or no tickets remain.

Since every heap operation takes logarithmic time, the solution stays efficient even for large inputs.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | **O((n + k) log n)** | Building the heap takes `O(n)` and every ticket sale performs heap operations in `O(log n)`. |
| Space Complexity | **O(n)** | The Max Heap stores at most one value for each seller. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int maxAmount(vector<int>& arr, int k) {
        // Modulo value given in the problem
        const int MOD = 1000000007;

        // Max heap to always get the seller with maximum tickets
        priority_queue<int> pq;

        // Insert all sellers into the heap
        for (int x : arr)
            if (x > 0)
                pq.push(x);

        long long ans = 0;

        // Sell at most k tickets
        while (k-- && !pq.empty()) {

            // Seller with highest current ticket count
            int cur = pq.top();
            pq.pop();

            // Add current ticket price
            ans = (ans + cur) % MOD;

            // One ticket is sold, so remaining tickets decrease by 1
            cur--;

            // Put seller back only if tickets are still left
            if (cur > 0)
                pq.push(cur);
        }

        // Return answer modulo MOD
        return (int)ans;
    }
};
```

### Java

```java
import java.util.PriorityQueue;
import java.util.Collections;

class Solution {
    public int maxAmount(int[] arr, int k) {

        // Modulo value given in the problem
        final int MOD = 1000000007;

        // Max heap to always get the seller with maximum tickets
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());

        // Insert every seller into the heap
        for (int x : arr) {
            if (x > 0)
                pq.offer(x);
        }

        long ans = 0;

        // Sell at most k tickets
        while (k > 0 && !pq.isEmpty()) {

            // Seller having maximum tickets
            int cur = pq.poll();

            // Add current ticket price
            ans = (ans + cur) % MOD;

            // One ticket has been sold
            cur--;

            // Insert back if tickets are still available
            if (cur > 0)
                pq.offer(cur);

            k--;
        }

        // Return answer modulo MOD
        return (int) ans;
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
    maxAmount(arr, k) {

        // Modulo value
        const MOD = 1000000007;

        // Simple Max Heap implementation
        class MaxHeap {
            constructor() {
                this.heap = [];
            }

            // Insert a new value
            push(val) {
                this.heap.push(val);
                let i = this.heap.length - 1;

                while (i > 0) {
                    let p = Math.floor((i - 1) / 2);
                    if (this.heap[p] >= this.heap[i]) break;

                    [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                    i = p;
                }
            }

            // Remove and return maximum value
            pop() {
                if (this.heap.length === 1) return this.heap.pop();

                let top = this.heap[0];
                this.heap[0] = this.heap.pop();

                let i = 0;

                while (true) {
                    let left = 2 * i + 1;
                    let right = 2 * i + 2;
                    let largest = i;

                    if (left < this.heap.length && this.heap[left] > this.heap[largest])
                        largest = left;

                    if (right < this.heap.length && this.heap[right] > this.heap[largest])
                        largest = right;

                    if (largest === i) break;

                    [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
                    i = largest;
                }

                return top;
            }

            // Return heap size
            size() {
                return this.heap.length;
            }
        }

        const heap = new MaxHeap();

        // Insert all sellers
        for (let x of arr) {
            if (x > 0)
                heap.push(x);
        }

        let ans = 0;

        // Sell at most k tickets
        while (k > 0 && heap.size() > 0) {

            // Seller with maximum tickets
            let cur = heap.pop();

            // Add current ticket price
            ans = (ans + cur) % MOD;

            // One ticket sold
            cur--;

            // Insert back if tickets remain
            if (cur > 0)
                heap.push(cur);

            k--;
        }

        return ans;
    }
}
```

### Python3

```python
import heapq

class Solution:
    def maxAmount(self, arr, k):

        # Modulo value
        MOD = 1000000007

        # Python has a min heap, so I store negative values
        heap = []

        # Insert every seller into the heap
        for x in arr:
            if x > 0:
                heapq.heappush(heap, -x)

        ans = 0

        # Sell at most k tickets
        while k > 0 and heap:

            # Get seller with maximum tickets
            cur = -heapq.heappop(heap)

            # Add current ticket price
            ans = (ans + cur) % MOD

            # One ticket has been sold
            cur -= 1

            # Insert back if tickets remain
            if cur > 0:
                heapq.heappush(heap, -cur)

            k -= 1

        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is exactly the same in every language. Only the syntax and library functions are different.

First, a Max Heap is created.

Its purpose is to always keep the seller with the largest number of remaining tickets at the top. This allows the algorithm to immediately choose the seller that gives the highest ticket price.

Next, every seller is inserted into the heap.

After the heap is ready, the algorithm starts selling tickets one by one.

For each ticket:

- Remove the seller with the highest ticket count.
- Add that value to the total earnings.
- Reduce the seller's ticket count by one.
- If tickets are still available, insert the updated value back into the heap.

This process repeats until exactly `k` tickets are sold or the heap becomes empty.

### C++

The C++ solution uses `priority_queue<int>`, which is a Max Heap by default. This makes the implementation short and efficient.

### Java

The Java solution uses `PriorityQueue` with `Collections.reverseOrder()` so that it behaves like a Max Heap.

### JavaScript

JavaScript does not include a built-in Priority Queue, so a custom Max Heap is typically implemented to support insertion and removal of the largest value efficiently.

### Python3

Python provides `heapq`, which is a Min Heap. To simulate a Max Heap, negative values are stored inside the heap.

Although the implementations look different, every version performs exactly the same greedy algorithm.

---

## Examples

### Example 1

**Input**

```
arr = [4, 3, 6, 2, 4]
k = 3
```

**Output**

```
15
```

**Trace**

- Sell from 6 → Earn 6
- Remaining becomes 5
- Sell from 5 → Earn 5
- Remaining becomes 4
- Sell from 4 → Earn 4

Total = **15**

---

### Example 2

**Input**

```
arr = [5, 3, 5, 2, 4, 4]
k = 2
```

**Output**

```
10
```

**Trace**

- Sell from first 5 → Earn 5
- Sell from second 5 → Earn 5

Total = **10**

---

### Example 3

**Input**

```
arr = [2]
k = 3
```

**Output**

```
3
```

**Trace**

- Sell ticket worth 2
- Sell ticket worth 1
- No tickets remain

Total = **3**

---

## How to Use / Run Locally

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project folder:

```bash
cd your-repository
```

### Run C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Run Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### Run JavaScript

Execute with Node.js:

```bash
node solution.js
```

---

### Run Python3

Execute:

```bash
python solution.py
```

---

## Notes & Optimizations

- A greedy approach works because choosing the highest available ticket price at every step can never reduce the final answer.
- A Max Heap makes it possible to always find the best seller efficiently.
- Brute force would repeatedly scan every seller, resulting in much slower performance.
- The algorithm naturally handles cases where `k` is larger than the total number of available tickets.
- The running answer should always be computed using modulo `10^9 + 7` to avoid integer overflow.
- This solution meets the expected constraints for GeeksforGeeks and is suitable for competitive programming contests.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
