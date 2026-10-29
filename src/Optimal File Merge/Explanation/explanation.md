# Optimal File Merge - GeeksforGeeks Solution

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

## Problem Summary

You are given an array of integers where each number represents the size of a file. Your task is to merge all these files into one single file while keeping the total computation cost as low as possible.

Whenever you merge two files of sizes x and y, you pay a cost of x + y. After the merge, a new file of size x + y is created and can be used in future merges.

The goal is to find the minimum total cost required to merge every file into one.

This is a classic minimum cost to merge files problem that appears frequently in competitive programming and DSA interviews. It is also closely related to the idea behind Huffman coding.

## Constraints

- 1 ≤ files.size() ≤ 10^5
- 1 ≤ files[i] ≤ 10^3
- The final answer is guaranteed to fit inside a 32-bit signed integer

## Intuition

The first thing I noticed is that the order of merges completely changes the total cost. If I keep merging large files early, those large numbers get added over and over again later. That makes the cost explode.

So the natural idea is to always merge the two smallest files that are currently available. By doing this, big values appear as late as possible and get added fewer times. This greedy choice is the same idea used in Huffman coding and works perfectly for the minimum cost file merge problem.

## Approach

I put every file size into a min-heap (priority queue) so the smallest values are always on top.

While more than one file remains:

- Pull out the two smallest sizes
- Add them to get the merge cost
- Add that cost to the running total
- Push the sum back into the heap as a new file

When only one file is left, the running total is the minimum cost needed.

If the array has only one file, the answer is simply zero because no merge is required.

## Data Structures Used

- Min-Heap (Priority Queue): Used to always extract the two smallest file sizes in logarithmic time. This is the core of the efficient solution for the optimal file merge problem.

## Operations & Behavior Summary

1. Insert all given file sizes into a min-heap.
2. Initialize total cost to zero.
3. While the heap contains more than one element:
   - Extract the smallest value (a)
   - Extract the next smallest value (b)
   - Compute sum = a + b
   - Add sum to the total cost
   - Insert sum back into the heap
4. When only one element remains, return the total cost.

## Complexity

| Type              | Complexity   | Explanation                                                                 |
|-------------------|--------------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n log n)   | Building the heap takes O(n). Each of the n-1 merges performs extract and insert operations that cost O(log n). |
| Space Complexity  | O(n)         | The heap stores up to n elements (original files plus intermediate merges). |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minComputation(vector<int> &files) {
        priority_queue<int, vector<int>, greater<int>> pq;
        for (int f : files) pq.push(f);
        long long cost = 0;
        while (pq.size() > 1) {
            int a = pq.top(); pq.pop();
            int b = pq.top(); pq.pop();
            int sum = a + b;
            cost += sum;
            pq.push(sum);
        }
        return (int)cost;
    }
};
```

### Java

```java
class Solution {
    public int minComputation(int[] files) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int f : files) pq.offer(f);
        long cost = 0;
        while (pq.size() > 1) {
            int a = pq.poll();
            int b = pq.poll();
            int sum = a + b;
            cost += sum;
            pq.offer(sum);
        }
        return (int)cost;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} files
 * @return {number}
 */
class Solution {
    minComputation(files) {
        const pq = new MinPriorityQueue();
        for (const f of files) pq.enqueue(f);
        let cost = 0;
        while (pq.size() > 1) {
            const a = pq.dequeue().element;
            const b = pq.dequeue().element;
            const sum = a + b;
            cost += sum;
            pq.enqueue(sum);
        }
        return cost;
    }
}
```

### Python3

```python
class Solution:
    def minComputation(self, files):
        import heapq
        heap = files[:]
        heapq.heapify(heap)
        cost = 0
        while len(heap) > 1:
            a = heapq.heappop(heap)
            b = heapq.heappop(heap)
            s = a + b
            cost += s
            heapq.heappush(heap, s)
        return cost
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Across all four languages the logic stays the same. I create a min-heap and push every file size into it. Then I repeatedly pull the two smallest values, add their sum to the answer, and push the sum back.

In C++ I use `priority_queue` with the greater comparator so it behaves as a min-heap. I keep the cost in a long long to avoid overflow during intermediate calculations even though the final answer fits in 32 bits.

In Java I use `PriorityQueue` which is a min-heap by default. The same long variable holds the running cost.

In JavaScript I rely on a MinPriorityQueue (available on most online judges). The rest of the flow is identical: dequeue two values, add their sum, enqueue the sum again.

In Python I copy the list and call `heapq.heapify`. The `heappop` and `heappush` operations give me the same min-heap behavior. The cost is accumulated in a normal integer because Python integers grow automatically.

Edge case handling is the same everywhere: if the heap has only one element at the start, the loop never runs and zero is returned.

## Examples

**Example 1**  
Input: [3, 2, 4]  
Output: 14  

Trace:  

- Heap starts as [2, 3, 4]  
- Merge 2 and 3 → cost 5, push 5 → heap [4, 5]  
- Merge 4 and 5 → cost 9, total becomes 14  
- Only one file left → answer is 14

**Example 2**  
Input: [2, 3, 6, 5, 7, 4]  
Output: 68  

Trace:  

- Always pick the two current smallest values  
- Possible sequence of merges produces intermediate costs 5 + 9 + 13 + 14 + 27 = 68  
- Any other order produces a higher or equal total, confirming the greedy min-heap approach is optimal.

**Example 3**  
Input: [1]  
Output: 0  

No merge is needed, so the cost is zero.

## How to Use / Run Locally

**C++**  

1. Copy the solution into a file named `main.cpp`.  
2. Compile with: `g++ -std=c++17 main.cpp -o main`  
3. Run: `./main`  
4. Feed the input according to the problem format or hard-code a test case inside `main`.

**Java**  

1. Save the class in `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
4. Add a main method that creates a Solution object and calls `minComputation` with a sample array.

**JavaScript**  

1. Paste the code into a file `solution.js`.  
2. Run with Node: `node solution.js`  
3. Make sure a MinPriorityQueue implementation is available or replace it with a simple array-based heap if testing offline.

**Python3**  

1. Save as `solution.py`.  
2. Run: `python3 solution.py`  
3. Add a small driver at the bottom that creates a Solution instance and prints the result for a few test arrays.

## Notes & Optimizations

- The min-heap approach is optimal for this problem. Sorting the array once and trying different orders does not guarantee the minimum cost.
- Because n can be as large as 10^5, any O(n²) dynamic programming solution will time out. The priority-queue method is the way to go.
- Intermediate sums can become large, so use a 64-bit type for the running cost in languages with fixed-size integers.
- When only one file is present, correctly return 0.
- This same technique appears in many “minimum cost to connect ropes / sticks / files” problems on GeeksforGeeks, LeetCode, and other platforms.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
