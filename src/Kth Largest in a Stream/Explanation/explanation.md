# Kth Largest Element in a Stream — DSA Solution (Min-Heap / Priority Queue)

A clean, optimized solution to the classic **Kth Largest in a Stream** problem from GeeksforGeeks. This repository walks through the full approach using a **min-heap (priority queue)**, with solutions in C++, Java, JavaScript, and Python3. If you are preparing for coding interviews or competitive programming, this is one of those problems that teaches you how to think with heaps.

---

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations and Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes and Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

You are given an array `arr[]` of `n` integers that arrive one by one as part of a stream. After inserting each element into the stream, you need to find the **Kth largest element** among all elements seen so far.

Note that this is the Kth largest in terms of value, not the Kth largest unique value. So duplicates count as separate elements.

If fewer than K elements have been inserted at any point, the answer for that step is `-1`.

You return a list of size `n`, where each position holds the Kth largest value after the corresponding insertion.

**Input:** An array `arr[]` of integers and an integer `k`

**Output:** A list of `n` integers — each being the Kth largest after each insertion, or `-1` if not enough elements exist yet

---

## Constraints

| Constraint | Value |
|---|---|
| Minimum value of k | 1 |
| k is at most n | k <= n |
| Maximum value of n | 10^5 |
| Minimum value of arr[i] | 1 |
| Maximum value of arr[i] | 10^5 |

---

## Intuition

The first thing I noticed is that the problem is asking for a running answer — after every single insertion. That rules out sorting the array each time because that would be O(n^2 log n) in the worst case, which is way too slow for n up to 100,000.

Then I thought — what does the Kth largest element actually mean? If I take the K largest numbers I have seen so far and put them in a group, the Kth largest is just the smallest number in that group.

That is exactly what a **min-heap of size K** gives you. The smallest element sits at the top. Every time a new element comes in, I add it and trim the heap back to size K by removing the current minimum. The top of the heap after that is my answer.

This is a classic sliding window meets heap pattern. Once you see it, it becomes a go-to technique for stream problems.

---

## Approach

Here is the step-by-step strategy I used:

1. Create a min-heap (priority queue that gives the smallest element first).

2. Iterate through each element in the array one at a time, simulating the stream.

3. Push the current element into the heap.

4. If the heap size goes above K, pop the top element (the smallest). This keeps only the K largest elements in the heap.

5. If the heap size is less than K after the insertion, it means we do not have enough elements yet, so append -1 to the result.

6. If the heap size is exactly K, the top of the heap is the Kth largest. Append it to the result.

7. Return the result list after processing all elements.

---

## Data Structures Used

**Min-Heap (Priority Queue)**

A heap is a tree-based data structure where the root always holds the minimum (for a min-heap) or maximum (for a max-heap) value. Inserting into a heap and removing from it both take O(log n) time.

I used a min-heap here because I want to maintain the K largest elements, and I need quick access to the smallest among them (which is the Kth largest). A max-heap would not help directly because the Kth largest would be buried deep inside it and not easily accessible.

Keeping the heap at exactly size K means every insert and trim is O(log K), which is very efficient.

---

## Operations & Behavior Summary

**Stage 1 — Insert the new element**

Push the incoming stream element into the min-heap. The heap now has at most K+1 elements.

**Stage 2 — Trim the heap**

If the heap size exceeds K, pop the minimum element. Now the heap holds exactly the K largest elements seen so far.

**Stage 3 — Determine the answer**

If heap size is less than K, the Kth largest does not exist yet. Record -1. If heap size equals K, the top of the heap is the Kth largest. Record it.

**Stage 4 — Move to next element**

Repeat stages 1 through 3 for every element in the stream until the array is fully processed.

---

## Complexity

| Type | Complexity | Explanation |
|---|---|---|
| Time Complexity | O(n log k) | For each of the n elements, we do a push and possibly a pop on a heap of size k. Both heap operations cost O(log k). |
| Space Complexity | O(n + k) | O(k) for the heap itself, and O(n) for the result list we return. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> kthLargest(vector<int>& arr, int k) {
        // min-heap to store the k largest elements seen so far
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        vector<int> result;
        
        for (int num : arr) {
            minHeap.push(num); // add current element to heap
            
            // if heap grows beyond k, remove the smallest element
            // because we only care about the top k largest
            if ((int)minHeap.size() > k) {
                minHeap.pop();
            }
            
            // if we have fewer than k elements, kth largest doesn't exist yet
            if ((int)minHeap.size() < k) {
                result.push_back(-1);
            } else {
                // top of min-heap is the kth largest element
                result.push_back(minHeap.top());
            }
        }
        
        return result;
    }
};
```

### Java

```java
class Solution {
    static ArrayList<Integer> kthLargest(int[] arr, int k) {
        // PriorityQueue in Java is a min-heap by default
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        ArrayList<Integer> result = new ArrayList<>();
        
        for (int num : arr) {
            minHeap.offer(num); // insert current element into the heap
            
            // trim the heap if it exceeds size k
            // we only want the k largest, so smallest must go
            if (minHeap.size() > k) {
                minHeap.poll();
            }
            
            // not enough elements yet to determine kth largest
            if (minHeap.size() < k) {
                result.add(-1);
            } else {
                // heap top is the smallest of the k largest = kth largest
                result.add(minHeap.peek());
            }
        }
        
        return result;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number[]}
 */
class Solution {
    kthLargest(arr, k) {
        // JavaScript has no built-in heap, so I implement a simple min-heap
        const heap = [];
        const result = [];
        
        // push element into min-heap and bubble up to maintain heap property
        const push = (val) => {
            heap.push(val);
            let i = heap.length - 1;
            while (i > 0) {
                const parent = Math.floor((i - 1) / 2);
                if (heap[parent] > heap[i]) {
                    // swap with parent if parent is larger (min-heap property)
                    [heap[parent], heap[i]] = [heap[i], heap[parent]];
                    i = parent;
                } else break;
            }
        };
        
        // remove and return the minimum element, then fix heap downward
        const pop = () => {
            const top = heap[0];
            const last = heap.pop();
            if (heap.length > 0) {
                heap[0] = last;
                let i = 0;
                while (true) {
                    let smallest = i;
                    const l = 2 * i + 1, r = 2 * i + 2;
                    if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
                    if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
                    if (smallest === i) break;
                    [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
                    i = smallest;
                }
            }
            return top;
        };
        
        for (const num of arr) {
            push(num); // add new element to heap
            
            // if heap size exceeds k, remove the smallest
            // so heap always holds the k largest seen so far
            if (heap.length > k) pop();
            
            // fewer than k elements means kth largest doesn't exist yet
            if (heap.length < k) {
                result.push(-1);
            } else {
                result.push(heap[0]); // min of heap = kth largest
            }
        }
        
        return result;
    }
}
```

### Python3

```python
import heapq

class Solution:
    def kthLargest(self, arr, n):
        # Python's heapq is a min-heap by default — exactly what I need
        min_heap = []
        result = []
        k = n  # in this GFG signature, n is actually k (the rank)
        
        # Re-reading the problem: the function takes arr and k
        # GFG python signature uses 'n' as second param but it means k
        # I'll treat the second argument as k throughout
        
        for num in arr:
            heapq.heappush(min_heap, num)  # push new element into min-heap
            
            # if heap has more than k elements, evict the smallest
            # we only want the k largest elements to remain
            if len(min_heap) > k:
                heapq.heappop(min_heap)
            
            # not yet k elements in stream, kth largest is undefined
            if len(min_heap) < k:
                result.append(-1)
            else:
                # the top of the min-heap among k largest = kth largest
                result.append(min_heap[0])
        
        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Why I chose a min-heap over other structures

The most natural wrong instinct here is to keep a sorted array and binary search for the Kth element. That works, but insertion into a sorted array is O(n) due to shifting. For 10^5 elements that becomes a problem fast.

A min-heap keeps only K elements and handles insertion + removal in O(log K). That is the key insight.

### How the heap trimming works

When a new element arrives, it might or might not belong in the top K. By pushing it in first and then popping the minimum, I let the heap decide naturally. If the new element is smaller than all K existing elements, it gets evicted immediately. If it is larger than the current minimum, the old minimum gets removed instead, and the new element stays.

### Handling the -1 case

Before the heap fills up to K elements, I cannot give a valid Kth largest. The heap size itself tells me whether I have enough elements. If `heap.size() < k`, output -1. Simple as that.

### C++ specific notes

C++ uses `priority_queue<int, vector<int>, greater<int>>` to create a min-heap. By default, `priority_queue` in C++ is a max-heap, so the `greater<int>` comparator reverses the order. `top()` gives the smallest element, `push()` inserts, and `pop()` removes the top.

### Java specific notes

Java's `PriorityQueue` is a min-heap by default. No extra comparator needed. `offer()` inserts an element, `poll()` removes and returns the minimum, and `peek()` reads the top without removing it.

### JavaScript specific notes

JavaScript has no built-in heap, so I implemented one manually using an array. The push operation inserts at the end and bubbles the element up by comparing it with its parent, swapping when needed. The pop operation replaces the root with the last element and sinks it down by comparing with children. This is the standard heap implementation pattern.

### Python3 specific notes

Python's `heapq` module provides a min-heap out of the box. `heapq.heappush()` inserts an element and `heapq.heappop()` removes the smallest. Accessing `heap[0]` reads the top without modifying the heap. One thing to watch: the GFG function signature for Python uses `n` as the second parameter, but in context it represents `k` (the rank we want).

---

## Examples

### Example 1

**Input:** arr = [1, 2, 3, 4, 5, 6], k = 4

**Expected Output:** [-1, -1, -1, 1, 2, 3]

**Trace:**

- Insert 1: heap = [1], size 1 < 4, output -1
- Insert 2: heap = [1, 2], size 2 < 4, output -1
- Insert 3: heap = [1, 2, 3], size 3 < 4, output -1
- Insert 4: heap = [1, 2, 3, 4], size = 4, top = 1, output 1
- Insert 5: heap becomes [1, 2, 3, 4, 5], pop 1, heap = [2, 3, 4, 5], top = 2, output 2
- Insert 6: heap becomes [2, 3, 4, 5, 6], pop 2, heap = [3, 4, 5, 6], top = 3, output 3

### Example 2

**Input:** arr = [3, 2, 1, 3, 3], k = 2

**Expected Output:** [-1, 2, 2, 3, 3]

**Trace:**

- Insert 3: heap = [3], size 1 < 2, output -1
- Insert 2: heap = [2, 3], size = 2, top = 2, output 2
- Insert 1: heap = [1, 2, 3], pop 1, heap = [2, 3], top = 2, output 2
- Insert 3: heap = [2, 3, 3], pop 2, heap = [3, 3], top = 3, output 3
- Insert 3: heap = [3, 3, 3], pop 3, heap = [3, 3], top = 3, output 3

### Example 3

**Input:** arr = [5], k = 1

**Expected Output:** [5]

**Trace:**

- Insert 5: heap = [5], size = 1 = k, top = 5, output 5

When k equals 1, every insertion immediately gives an answer — it is just the current maximum of the stream.

---

## How to Use / Run Locally

### C++

Make sure you have a C++ compiler installed (g++ works fine).

```bash
g++ -o solution solution.cpp
./solution
```

### Java

You need the Java Development Kit (JDK) installed.

```bash
javac Solution.java
java Solution
```

### JavaScript

You need Node.js installed.

```bash
node solution.js
```

### Python3

You need Python 3 installed.

```bash
python3 solution.py
```

For each language, copy the solution code into a file with the matching name, add a main function or driver code that reads input and calls the solution class, then run the command above. If you are submitting directly on GeeksforGeeks, paste the solution class into their editor — the platform handles input/output automatically.

---

## Notes & Optimizations

**Edge case: k equals 1**

When k is 1, the answer after every insertion is simply the maximum element seen so far. The heap handles this correctly, but it is worth noting that you could also solve this special case with just a running maximum variable in O(n) time and O(1) space.

**Edge case: all elements are the same**

The heap handles duplicates correctly because it treats each insertion as a separate event. If the array is [3, 3, 3] with k = 2, the heap fills up with 3s and the answer is always 3.

**Alternative approach: Sorted list / order statistics tree**

You could maintain a sorted data structure and always read the Kth element. In languages that support order statistics trees or sorted lists with fast insertion, this gives O(n log n) overall, similar to the heap approach. But the heap is simpler to implement and more cache-friendly in practice.

**Can we do better than O(n log k)?**

For this specific problem where you must process every element and output an answer at each step, O(n log k) is essentially optimal. You cannot avoid seeing all n elements, and maintaining the Kth largest dynamically requires at least O(log k) per update with comparison-based structures.

**Why not just use a max-heap of all elements?**

A max-heap of all elements would let you find the largest element quickly, but finding the Kth largest would require K pops, making each query O(k log n). That adds up to O(nk log n) total, which is much worse.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
