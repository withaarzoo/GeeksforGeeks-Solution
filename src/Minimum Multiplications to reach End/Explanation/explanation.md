# Minimum Multiplications to Reach End

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

The "Minimum Multiplications to Reach End" problem is a popular Graph + BFS problem from GeeksforGeeks.

In this problem, we are given:

* An array `arr[]`
* A starting number `start`
* A target number `end`

At every operation, we can:

1. Pick any number from the array
2. Multiply the current number with it
3. Take modulo `1000`

The task is to find the minimum number of multiplications needed to reach the target value.

If it is impossible to reach the target, we return `-1`.

This problem looks mathematical at first, but the best solution actually comes from graph traversal using Breadth First Search (BFS).

Keywords naturally connected to this problem include:

* Minimum Multiplications to Reach End
* BFS graph problem
* shortest path algorithm
* modulo graph traversal
* GeeksforGeeks BFS solution
* graph-based state transition problem
* shortest operations problem

---

## Constraints

| Constraint                | Value                |
| ------------------------- | -------------------- |
| `1 <= arr.size() <= 10^3` | Array size           |
| `1 <= arr[i] <= 10^3`     | Array elements       |
| `0 <= start, end <= 10^3` | Start and end values |

---

## Intuition

The first thing I noticed was that every number can generate several new numbers.

For any current value:

```text
next = (current * arr[i]) % 1000
```

This means one number can move to many other numbers.

That started looking exactly like a graph problem.

I realized:

* Every number from `0` to `999` can be treated as a node
* Every multiplication creates an edge between nodes
* We need the minimum operations

Whenever a problem asks for the minimum number of moves or operations in an unweighted graph, BFS is usually the best choice.

Another important observation is that modulo `1000` limits the total number of states to only `1000`.

That makes BFS very efficient here.

---

## Approach

I used Breadth First Search to solve this shortest path problem.

Step-by-step strategy:

1. Treat every number from `0` to `999` as a graph node
2. Start BFS from the `start` value
3. From the current number:

   * Multiply it with every value in `arr`
   * Apply modulo `1000`
4. If the new value is not visited before:

   * Store its distance
   * Push it into the queue
5. Continue BFS until:

   * We reach `end`
   * Or all possible states are explored
6. If `end` is never reached, return `-1`

This works because BFS always finds the shortest path in an unweighted graph.

---

## Data Structures Used

| Data Structure | Why It Was Used                                  |
| -------------- | ------------------------------------------------ |
| Queue          | Used for BFS traversal level by level            |
| Distance Array | Stores minimum steps needed to reach each number |
| Array/List     | Used to iterate through multiplication values    |

---

## Operations & Behavior Summary

The algorithm works like this:

1. Start from the initial number
2. Push it into the BFS queue
3. Repeatedly:

   * Remove front element
   * Generate all possible next values
   * Check if they were already visited
4. Store minimum steps for every reachable number
5. Stop immediately when the target is found
6. Return `-1` if BFS finishes without reaching the target

Since only numbers from `0` to `999` are possible, the graph size always remains small and manageable.

---

## Complexity

| Type             | Complexity    | Explanation                                                                        |
| ---------------- | ------------- | ---------------------------------------------------------------------------------- |
| Time Complexity  | `O(1000 × n)` | `n` is the size of the array. For every possible state, we try all multiplications |
| Space Complexity | `O(1000)`     | Queue and distance array store at most 1000 states                                 |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int minSteps(vector<int>& arr, int start, int end) {
        
        // If start is already equal to end
        if(start == end)
            return 0;
        
        // Distance array to store minimum steps
        vector<int> dist(1000, 1e9);
        
        // Queue for BFS
        queue<int> q;
        
        // Starting point needs 0 steps
        dist[start] = 0;
        q.push(start);
        
        // BFS traversal
        while(!q.empty()) {
            
            // Get current number
            int current = q.front();
            q.pop();
            
            // Try multiplying with every element
            for(int num : arr) {
                
                // Generate next state
                int next = (current * num) % 1000;
                
                // If found shorter path
                if(dist[current] + 1 < dist[next]) {
                    
                    // Update distance
                    dist[next] = dist[current] + 1;
                    
                    // If end reached, return answer
                    if(next == end)
                        return dist[next];
                    
                    // Push new state into queue
                    q.push(next);
                }
            }
        }
        
        // End cannot be reached
        return -1;
    }
};
```

### Java

```java
class Solution {
    public int minSteps(int[] arr, int start, int end) {
        
        // If start is already equal to end
        if(start == end)
            return 0;
        
        // Distance array to store minimum steps
        int[] dist = new int[1000];
        
        // Initialize with large value
        Arrays.fill(dist, (int)1e9);
        
        // Queue for BFS
        Queue<Integer> q = new LinkedList<>();
        
        // Start node
        dist[start] = 0;
        q.offer(start);
        
        // BFS traversal
        while(!q.isEmpty()) {
            
            // Get current number
            int current = q.poll();
            
            // Try all multiplications
            for(int num : arr) {
                
                // Generate next state
                int next = (current * num) % 1000;
                
                // If shorter path found
                if(dist[current] + 1 < dist[next]) {
                    
                    // Update distance
                    dist[next] = dist[current] + 1;
                    
                    // If target reached
                    if(next == end)
                        return dist[next];
                    
                    // Push into queue
                    q.offer(next);
                }
            }
        }
        
        // Not possible to reach end
        return -1;
    }
}
```

### JavaScript

```javascript
class Solution {
    minSteps(arr, start, end) {
        
        // If start is already equal to end
        if(start === end)
            return 0;
        
        // Distance array
        let dist = new Array(1000).fill(Infinity);
        
        // Queue for BFS
        let queue = [];
        
        // Starting node
        dist[start] = 0;
        queue.push(start);
        
        // Pointer for efficient queue traversal
        let front = 0;
        
        // BFS traversal
        while(front < queue.length) {
            
            // Get current number
            let current = queue[front++];
            
            // Try multiplying with every array element
            for(let num of arr) {
                
                // Generate next state
                let next = (current * num) % 1000;
                
                // If shorter path found
                if(dist[current] + 1 < dist[next]) {
                    
                    // Update distance
                    dist[next] = dist[current] + 1;
                    
                    // If target reached
                    if(next === end)
                        return dist[next];
                    
                    // Push into queue
                    queue.push(next);
                }
            }
        }
        
        // End cannot be reached
        return -1;
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def minSteps(self, arr, start, end):
        
        # If start is already equal to end
        if start == end:
            return 0
        
        # Distance array to store minimum steps
        dist = [float('inf')] * 1000
        
        # Queue for BFS
        q = deque()
        
        # Starting node
        dist[start] = 0
        q.append(start)
        
        # BFS traversal
        while q:
            
            # Get current number
            current = q.popleft()
            
            # Try multiplying with every number
            for num in arr:
                
                # Generate next state
                next_num = (current * num) % 1000
                
                # If shorter path found
                if dist[current] + 1 < dist[next_num]:
                    
                    # Update distance
                    dist[next_num] = dist[current] + 1
                    
                    # If end reached
                    if next_num == end:
                        return dist[next_num]
                    
                    # Push into queue
                    q.append(next_num)
        
        # End cannot be reached
        return -1
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains almost identical in all four languages.

### Step 1 — Handle the Base Case

The very first check is whether:

```text
start == end
```

If both values are already equal, then no multiplication is needed.

So the answer becomes `0`.

---

### Step 2 — Create the Distance Array

A distance array of size `1000` is created.

Why `1000`?

Because after modulo operation:

```text
(current * value) % 1000
```

every result always stays between `0` and `999`.

So there are only `1000` possible states in the entire problem.

The distance array helps in two ways:

* It stores minimum operations
* It prevents unnecessary revisits

---

### Step 3 — Initialize BFS Queue

A queue is used for Breadth First Search.

BFS explores nodes level by level.

That is exactly what we need for minimum operations problems.

The start node is pushed into the queue first.

---

### Step 4 — Generate New States

For every current number:

* Loop through all values in `arr`
* Multiply current number
* Apply modulo `1000`

Example:

```text
current = 63
num = 65

63 * 65 = 4095
4095 % 1000 = 95
```

So from node `63`, we can move to node `95`.

---

### Step 5 — Check for Better Path

Before visiting a new node:

* Check whether this path gives fewer operations
* If yes:

  * Update distance
  * Push into queue

This avoids revisiting useless paths.

---

### Step 6 — Return Immediately When Target Is Found

The moment BFS reaches the `end` node, the answer is returned immediately.

This works because BFS guarantees the shortest path in an unweighted graph.

The first time we reach the target is always the minimum number of steps.

---

### Language Notes

#### C++

* `queue<int>` is commonly used for BFS
* `vector<int>` stores distances efficiently
* Fast and memory efficient for competitive programming

#### Java

* `Queue<Integer>` with `LinkedList` is used
* `Arrays.fill()` initializes distances
* Java implementation closely matches BFS textbook structure

#### JavaScript

* Arrays are used as queues
* A front pointer avoids expensive `shift()` operations
* Easy to understand and beginner friendly

#### Python3

* `collections.deque` is best for BFS
* Python syntax stays short and clean
* Great for explaining graph traversal problems

---

## Examples

### Example 1

#### Input

```text
arr[] = [2, 5, 7]
start = 3
end = 30
```

#### Output

```text
2
```

#### Explanation

```text
3 * 2 = 6
6 * 5 = 30
```

Minimum operations needed = `2`

---

### Example 2

#### Input

```text
arr[] = [3, 4, 65]
start = 7
end = 175
```

#### Output

```text
4
```

#### Explanation

```text
7 * 3 = 21
21 * 3 = 63
63 * 65 = 95
95 * 65 = 175
```

Total operations = `4`

---

### Example 3

#### Input

```text
arr[] = [2, 4]
start = 3
end = 5
```

#### Output

```text
-1
```

#### Explanation

After multiplying by even numbers, the result always stays even.

So it is impossible to reach `5`.

---

## How to Use / Run Locally

### C++

Compile and run:

```bash
g++ filename.cpp -o output
./output
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run:

```bash
python filename.py
```

or

```bash
python3 filename.py
```

---

## Notes & Optimizations

* BFS is the best approach because all operations have equal cost
* Using DFS would not guarantee minimum operations
* Since modulo `1000` limits states, memory usage stays very small
* Early stopping improves performance when target is found quickly
* A visited or distance array is necessary to avoid infinite loops
* This problem is a classic example of:

  * Graph BFS
  * Shortest path in unweighted graph
  * State-space traversal
  * Competitive programming BFS pattern

Possible alternative approaches:

* DFS with pruning
* Dijkstra (not needed because edge weights are equal)

BFS remains the cleanest and most optimal solution.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
